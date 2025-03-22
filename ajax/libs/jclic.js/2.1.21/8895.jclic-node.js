"use strict";
exports.id = 8895;
exports.ids = [8895];
exports.modules = {

/***/ 8895:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export SessionStorageReporter */
/* harmony import */ var _Reporter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6782);
/**
 *  File    : report/SessionStorageReporter.js
 *  Created : 06/09/2017
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
 * This JClic {@link module:Reporter.Reporter Reporter} writes persistent data to the browser local session storage. It uses some of
 * the {@link https://github.com/projectestac/jclic/wiki/JClic-Reports-developers-guide JClic Reports API}.
 * Connection parameters (`key`, `context`...) are passed through the `options` element of {@link module:JClicPlayer.JClicPlayer JClicPlayer} (acting as {@link module:JClicPlayer.JClicPlayer JClicPlayer}).
 * Set `storage=local` in `options` to store reports in [`window.localStorage`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage}
 * instead of [`window.sessionStorage`]{@link https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage} (default).
 * @extends module:reports/Reporter.Reporter
 */
class SessionStorageReporter extends _Reporter_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * SessionStorageReporter constructor
   * @param {module:JClicPlayer.JClicPlayer} ps - The {@link module:JClicPlayer.JClicPlayer JClicPlayer} used to retrieve settings and localized messages
   */
  constructor(ps) {
    super(ps);
    this.key = `jclic_${(new Date()).toISOString()}#${Math.ceil(Math.random() * 1000)}`;
  }

  /**
   * Initializes this report system with an optional set of parameters.
   * Returns a Promise, fulfilled when the reporter is fully initialized.
   * @override
   * @param {object} [options] - Initial settings passed to the reporting system
   * @returns {external:Promise}
   */
  init(options) {
    if (typeof options === 'undefined' || options === null)
      options = this.ps.options;
    if (options.storage === 'local') {
      this.storage = window.localStorage;
      this.descriptionKey = 'Reporting to local storage';
    }
    return _Reporter_js__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.init.call(this, options);
  }

  /**
   *
   * Saves the current report data to sessionStorage
   */
  saveCurrentReport() {
    // Update results out of current thread
    window.setTimeout(() => {
      this.storage.setItem(this.key, JSON.stringify(this.getData()));
    }, 0);
  }

  /**
   * Finalizes the current sequence
   * @override
   */
  endSequence() {
    super.endSequence();
    this.saveCurrentReport();
  }

  /**
   * This method should be called when the current activity finishes. Data about user's final results
   * on the activity will then be saved.
   * @override
   * @param {number} score - The final score, usually in a 0-100 scale.
   * @param {number} numActions - The total number of actions done by the user to solve the activity
   * @param {boolean} solved - `true` if the activity was finally solved, `false` otherwise.
   */
  endActivity(score, numActions, solved) {
    super.endActivity(score, numActions, solved);
    this.saveCurrentReport();
  }
}

Object.assign(SessionStorageReporter.prototype, {
  /**
   * Type of storage to be used. Defaults to `window.sessionStorage`
   * @name module:report/SessionStorageReporter.SessionStorageReporter#storage
   * @type {external:Storage} */
  storage: window.sessionStorage,
  /**
   * Description of this reporting system
   * @name module:report/SessionStorageReporter.SessionStorageReporter#descriptionKey
   * @override
   * @type {string} */
  descriptionKey: 'Reporting to session storage',
  /**
   * Additional info to display after the reporter's `description`
   * @name module:report/SessionStorageReporter.SessionStorageReporter#descriptionDetail
   * @override
   * @type {string} */
  descriptionDetail: '(browser session)',
  /**
   * Key used to save the report into sessionStorage
   * @name module:report/SessionStorageReporter.SessionStorageReporter#key
   * @type {string} */
  key: null,
});

// Register class in Reporter.CLASSES
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Reporter_js__WEBPACK_IMPORTED_MODULE_0__["default"].registerClass('SessionStorageReporter', SessionStorageReporter));


/***/ })

};
;
//# sourceMappingURL=8895.jclic-node.js.map