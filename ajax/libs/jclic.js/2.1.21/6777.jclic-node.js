"use strict";
exports.id = 6777;
exports.ids = [6777];
exports.modules = {

/***/ 6777:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export Counter */
/**
 *  File    : skins/Counter.js
 *  Created : 07/05/2015
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
 * This class encapsulates the operation of a numeric counter, used to display the current
 * values of score, actions and time.
 */
class Counter {
  /**
   * Counter constructor
   * @param {string} id - The type of information stored on this counter
   * @param {external:jQuery} [$div] - The HTML element where this counter will show values (can be _null_)
   */
  constructor(id, $div) {
    if (id)
      this.id = id;
    if ($div)
      this.$div = $div;
  }

  /**
   * Gets the current display value of this counter
   * @returns {number}
   */
  getDisplayValue() {
    let result = this.countDown > 0 ? this.countDown - this.value : this.value;
    if (this.displayDiffFrom)
      result = result - this.displayDiffFrom.value;
    return Math.max(0, Math.min(this.MAX_DISPLAY_VALUE, result));
  }

  /**
   * Paints the value of this counter on screen
   * (method to be overridden by subclasses)
   */
  refreshDisplay() {
    if (this.$div)
      this.$div.html(this.enabled ? (this.getDisplayValue() + 1000).toString().substring(1) : '000');
  }

  /**
   * Enables or disables this counter
   * @param {boolean} enabled - State been assigned to this counter
   */
  setEnabled(enabled) {
    if (this.enabled !== enabled) {
      this.enabled = enabled;
      if (this.$div) {
        this.refreshDisplay();
        this.$div.css('opacity', this.enabled ? 1.0 : 0.3);
      }
    }
  }

  /**
   * Sets the initial value of the counter
   * @param {number} maxValue - Value from which the countdown will start
   */
  setCountDown(maxValue) {
    if (this.countDown !== (this.countDown = maxValue))
      this.refreshDisplay();
  }

  /**
   * Increments by one the value of this counter
   */
  incValue() {
    this.value++;
    if (this.enabled)
      this.refreshDisplay();
  }

  /**
   * Sets a specific value to this counter
   * @param {number} value - The value to set
   */
  setValue(value) {
    if (this.enabled && this.value !== (this.value = value))
      this.refreshDisplay();
  }
}

Object.assign(Counter.prototype, {
  /**
   * Type of counter (usually: `score`, `actions` or `time`)
   * @name module:skins/Counter.Counter#id
   * @type {string} */
  id: '',
  /**
   * The HTML element where this counter shows its value
   * @name module:skins/Counter.Counter#$div
   * @type {external:jQuery}
   */
  $div: null,
  /**
   * Current value of this counter
   * @name module:skins/Counter.Counter#value
   * @type {number} */
  value: 0,
  /**
   * When set, the counter displays a countdown from this value to zero
   * @name module:skins/Counter.Counter#countDown
   * @type {number} */
  countDown: 0,
  /**
   * Flag indicating if this counter is currently enabled
   * @name module:skins/Counter.Counter#enabled
   * @type {boolean} */
  enabled: true,
  /**
   * Maximum value to be displayed by this counter
   * @name module:skins/Counter.Counter#MAX_DISPLAY_VALUE
   * @type {number} */
  MAX_DISPLAY_VALUE: 999,
  /**
   * An optional Counter used as a subtractor to display the current value.
   * Useful to display `errors` subtracting `score` from `actions`.
   * @name module:skins/Counter.Counter#displayDiffFrom
   * @type {module:skins/Counter.Counter}
   */
  displayDiffFrom: null,
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Counter);


/***/ })

};
;
//# sourceMappingURL=6777.jclic-node.js.map