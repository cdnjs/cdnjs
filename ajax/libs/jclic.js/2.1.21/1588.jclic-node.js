"use strict";
exports.id = 1588;
exports.ids = [1588,6777];
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


/***/ }),

/***/ 1588:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ skins_DefaultSkin)
});

// UNUSED EXPORTS: DefaultSkin

// EXTERNAL MODULE: external "jquery"
var external_jquery_ = __webpack_require__(7750);
var external_jquery_default = /*#__PURE__*/__webpack_require__.n(external_jquery_);
// EXTERNAL MODULE: ./src/AWT.js
var AWT = __webpack_require__(7912);
// EXTERNAL MODULE: ./src/skins/Skin.js + 9 modules
var Skin = __webpack_require__(757);
// EXTERNAL MODULE: ./src/boxes/ActiveBox.js
var ActiveBox = __webpack_require__(1725);
// EXTERNAL MODULE: ./src/skins/Counter.js
var Counter = __webpack_require__(6777);
// EXTERNAL MODULE: ./src/Utils.js
var Utils = __webpack_require__(1253);
;// ./src/skins/assets/main.css
const main_namespaceObject = ".ID .JClicCtrlCnt {\n  margin: 0 9px 18px 9px;\n  display: -webkit-flex;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n}\n\n.ID .JClicCountCnt {\n  display: -webkit-flex;\n  display: flex;\n  flex-direction: column;\n}\n\n.ID .JClicMsgBox {\n  height: 60px;\n  flex-grow: 1;\n  background-color: lightblue;\n}\n\n.ID .JClicBtn {\n  cursor: pointer;\n  line-height: 0;\n}\n\n.ID .JClicBtn:disabled {\n  cursor: inherit;\n  opacity: 0.3;\n}\n\n.ID .JClicCounter {\n  width: 40px;\n  height: 20px;\n  padding-left: 20px;\n  color: white;\n  cursor: pointer;\n  font-family: Roboto, Sans-serif;\n  font-size: 18px;\n  text-align: center;\n  background-repeat: no-repeat;\n  background-position: left;\n  box-sizing: content-box;\n}\n";
;// ./src/skins/assets/mainHalf.css
const mainHalf_namespaceObject = ".ID .JClicPlayerCnt {\n  margin: 9px;\n}\n\n.ID .JClicCtrlCnt {\n  margin: 0 4px 9px 4px;\n}\n\n.ID .JClicCtrlCnt button svg, img {\n  width: 18px;\n  height: 18px;\n}\n\n.ID .JClicMsgBox {\n  height: 30px;\n}\n\n.ID .JClicCounter {\n  width: 20px;\n  height: 10px;\n  margin-left: -15px;\n  transform: scale(0.5);\n}\n";
;// ./src/skins/assets/mainTwoThirds.css
const mainTwoThirds_namespaceObject = ".ID .JClicPlayerCnt {\n  margin: 12px;\n}\n\n.ID .JClicCtrlCnt {\n  margin: 0 6px 12px 6px;\n}\n\n.ID .JClicCtrlCnt button svg, img {\n  width: 24px;\n  height: 24px;\n}\n\n.ID .JClicMsgBox {\n  height: 40px;\n}\n\n.ID .JClicCounter {\n  width: 27px;\n  height: 13px;\n  margin-left: -10px;\n  transform: scale(0.666);\n}\n";
;// ./src/skins/assets/prevIcon.svg
const prevIcon_namespaceObject = "<svg fill=\"#FFFFFF\" viewBox=\"0 0 24 24\" width=\"36\" height=\"36\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\" />\n</svg>\n";
;// ./src/skins/assets/nextIcon.svg
const nextIcon_namespaceObject = "<svg fill=\"#FFFFFF\" viewBox=\"0 0 24 24\" width=\"36\" height=\"36\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\" />\n</svg>\n";
;// ./src/skins/assets/fullScreenIcon.svg
const fullScreenIcon_namespaceObject = "<svg fill=\"#FFFFFF\" viewBox=\"0 0 24 24\" width=\"36\" height=\"36\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z\" />\n</svg>\n";
;// ./src/skins/assets/fullScreenExitIcon.svg
const fullScreenExitIcon_namespaceObject = "<svg fill=\"#FFFFFF\" viewBox=\"0 0 24 24\" width=\"36\" height=\"36\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z\" />\n</svg>\n";
;// ./src/skins/assets/closeIcon.svg
const closeIcon_namespaceObject = "<svg fill=\"#FFFFFF\" viewBox=\"0 0 24 24\" width=\"36\" height=\"36\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z\" />\n</svg>\n";
;// ./src/skins/assets/infoIcon.svg
const infoIcon_namespaceObject = "<svg fill=\"#FFFFFF\" viewBox=\"0 0 24 24\" width=\"36\" height=\"36\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z\" />\n</svg>\n";
;// ./src/skins/assets/reportsIcon.svg
const reportsIcon_namespaceObject = "<svg fill=\"#FFFFFF\" viewBox=\"0 0 24 24\" width=\"36\" height=\"36\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z\" />\n</svg>\n";
;// ./src/skins/assets/timeIcon.svg
const timeIcon_namespaceObject = "<svg fill=\"#FFFFFF\" viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\" />\n  <path d=\"M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z\" />\n</svg>\n";
;// ./src/skins/assets/scoreIcon.svg
const scoreIcon_namespaceObject = "<svg fill=\"#FFFFFF\" viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z\" />\n</svg>\n";
;// ./src/skins/assets/actionsIcon.svg
const actionsIcon_namespaceObject = "<svg fill=\"#FFFFFF\" viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" xmlns=\"http://www.w3.org/2000/svg\">\n  <path d=\"M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z\" />\n</svg>\n";
;// ./src/skins/DefaultSkin.js
/**
 *  File    : skins/DefaultSkin.js
 *  Created : 12/05/2015
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

/* global document */








// Use Webpack to import CSS and SVG files














/**
 * This is the default {@link module:skins/Skin.Skin Skin} used by JClic.js
 * @extends module:skins/Skin.Skin
 */
class DefaultSkin extends Skin["default"] {
  /**
   * DefaultSkin constructor
   * @param {module:JClicPlayer.JClicPlayer} ps - The PlayStation (currently a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) used to load and
   * realize the media objects needed tot build the Skin.
   * @param {string} [name] - The skin class name
   * @param {object} [options] - Optional parameter with additional options, used by subclasses
   * this skin. When `null` or `undefined`, a new one will be created.
   */
  constructor(ps, name = null, options = {}) {
    // DefaultSkin extends [Skin](Skin.html)
    super(ps, name, options);
    let msg = '';

    AWT/* Font */.KQ.loadGoogleFonts(this.cssFonts);

    // Create the main container for buttons, counters and message box
    this.$ctrlCnt = external_jquery_default()('<div/>', { class: 'JClicCtrlCnt unselectableText', role: 'navigation' });
    this.$div.append(this.$ctrlCnt);

    // Add `prev` button
    msg = (0,Utils/* getMsg */.qG)('Previous activity');
    this.buttons.prev = external_jquery_default()('<button/>', { class: 'JClicBtn', title: msg, 'aria-label': msg })
      .append(external_jquery_default()((0,Utils/* getSvg */.r4)(this.prevIcon, this.iconWidth, this.iconHeight, this.iconFill)))
      .on('click', evt => {
        if (this.ps)
          this.ps.actions.prev.processEvent(evt);
      });
    this.$ctrlCnt.append(this.buttons.prev);

    // Add message box
    this.msgBox = new ActiveBox["default"]();
    this.msgBox.role = 'message';
    this.$msgBoxDiv = external_jquery_default()('<div/>', { class: 'JClicMsgBox' })
      .on('click', () => {
        this.msgBox.playMedia(ps);
        return false;
      });
    this.$ctrlCnt.append(this.$msgBoxDiv);

    // Add `next` button
    msg = (0,Utils/* getMsg */.qG)('Next activity');
    this.buttons.next = external_jquery_default()('<button/>', { class: 'JClicBtn', title: msg, 'aria-label': msg })
      .append(external_jquery_default()((0,Utils/* getSvg */.r4)(this.nextIcon, this.iconWidth, this.iconHeight, this.iconFill)))
      .on('click', evt => {
        if (this.ps)
          this.ps.actions.next.processEvent(evt);
      });
    this.$ctrlCnt.append(this.buttons.next);

    // Add counters
    if (false !== this.ps.options.counters && false !== options.counters) {
      // Create counters
      msg = (0,Utils/* getMsg */.qG)('Reports');
      const $countCnt = external_jquery_default()('<button/>', { class: 'JClicCountCnt', 'aria-label': msg })
        .on('click', evt => {
          if (this.ps)
            this.ps.actions.reports.processEvent(evt);
        });
      external_jquery_default().each(Skin["default"].prototype.counters, (name, _val) => {
        msg = (0,Utils/* getMsg */.qG)(name);
        this.counters[name] = new Counter["default"](name, external_jquery_default()('<div/>', { class: 'JClicCounter', title: msg, 'aria-label': msg })
          .css({
            'background-image': `url(${(0,Utils/* svgToURI */.g8)(this[name + 'Icon'], this.counterIconWidth, this.counterIconHeight, this.counterIconFill)})`,
            color: this.counterIconFill
          })
          .html('000')
          .appendTo($countCnt));
      });
      this.$ctrlCnt.append($countCnt);
    }

    // Add info button
    if (true === this.ps.options.info || true === options.info) {
      msg = (0,Utils/* getMsg */.qG)('Information');
      this.buttons.info = external_jquery_default()('<button/>', { class: 'JClicBtn', title: msg, 'aria-label': msg })
        .append(external_jquery_default()((0,Utils/* getSvg */.r4)(this.infoIcon, this.iconWidth, this.iconHeight, this.iconFill)))
        .on('click', evt => {
          if (this.ps)
            this.ps.actions.info.processEvent(evt);
        });
      this.$ctrlCnt.append(this.buttons.info);
    }

    // Add reports button
    if (true === this.ps.options.reportsBtn || true === options.reportsBtn) {
      msg = (0,Utils/* getMsg */.qG)('Reports');
      this.buttons.about = external_jquery_default()('<button/>', { class: 'JClicBtn', title: msg, 'aria-label': msg })
        .append(external_jquery_default()((0,Utils/* getSvg */.r4)(this.reportsIcon, this.iconWidth, this.iconHeight, this.iconFill)))
        .on('click', evt => {
          if (this.ps)
            this.ps.actions.reports.processEvent(evt);
        });
      this.$ctrlCnt.append(this.buttons.about);
    }

    // Add `full screen` button
    if (document && document.fullscreenEnabled) {
      msg = (0,Utils/* getMsg */.qG)('Toggle full screen');
      this.buttons.fullscreen = external_jquery_default()('<button/>', { class: 'JClicBtn', title: msg, 'aria-label': msg })
        .append(external_jquery_default()('<img/>', { src: (0,Utils/* svgToURI */.g8)(this.fullScreenIcon, this.iconWidth, this.iconHeight, this.iconFill) }))
        .on('click', () => {
          this.setScreenFull(null);
        });
      this.$ctrlCnt.append(this.buttons.fullscreen);
    }

    // Add `close` button
    if (typeof this.ps.options.closeFn === 'function') {
      msg = (0,Utils/* getMsg */.qG)('Close');
      const closeFn = this.ps.options.closeFn;
      this.buttons.close = external_jquery_default()('<button/>', { class: 'JClicBtn', title: msg, 'aria-label': msg })
        .append(external_jquery_default()((0,Utils/* getSvg */.r4)(this.closeIcon, this.iconWidth, this.iconHeight, this.iconFill)))
        .on('click', () => {
          (0,Utils/* log */.Rm)('info', 'Closing the player');
          closeFn();
        });
      this.$ctrlCnt.append(this.buttons.close);
    }

    // Workaround for a bug in Edge and Explorer: SVG objects not implementing `blur` and `focus` methods
    // See: [https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8479637/]
    // This affects Polymer `iron-overlay-behavior`. See: [https://github.com/PolymerElements/iron-overlay-behavior/pull/211]
    let nilFunc = null;
    external_jquery_default().each(this.buttons, (_key, value) => {
      if (value && (typeof value[0].focus !== 'function' || typeof value[0].blur !== 'function')) {
        if (nilFunc === null)
          nilFunc = () => (0,Utils/* log */.Rm)('error', '"blur" and "focus" not defined for SVG objects in Explorer/Edge');
        value[0].focus = value[0].blur = nilFunc;
      }
    });
  }

  /**
   * Returns the CSS styles used by this skin. This method should be called only from
   * the `Skin` constructor, and overridded by subclasses if needed.
   * @param {string} media - A specific media size. Possible values are: 'default', 'half' and 'twoThirds'
   * @returns {string}
   */
  _getStyleSheets(media = 'default') {
    return `${super._getStyleSheets(media)}${media === 'default' ? this.mainCSS : media === 'half' ? this.mainCSSHalf : media === 'twoThirds' ? this.mainCSSTwoThirds : ''}`;
  }

  /**
   * Main method used to build the content of the skin. Resizes and places internal objects.
   * @override
   */
  doLayout() {
    // Call method on ancestor
    super.doLayout();

    // Set the fullScreen icon
    if (this.buttons.fullscreen)
      this.buttons.fullscreen.find('img').get(-1).src = (0,Utils/* svgToURI */.g8)(
        this[(document && document.fullscreenElement) ? 'fullScreenExitIcon' : 'fullScreenIcon'],
        this.iconWidth, this.iconHeight, this.iconFill);
  }

  /**
   * Enables or disables the `tabindex` attribute of the main buttons. Useful when a modal dialog
   * overlay is active, to avoid direct access to controls not related with the dialog.
   * @param {boolean} status - `true` to make main controls navigable, `false` otherwise
   */
  enableMainButtons(status) {
    this.$ctrlCnt.find('.JClicBtn,.JClicCountCnt').attr('tabindex', status ? '0' : '-1');
  }
}

Object.assign(DefaultSkin.prototype, {
  /**
   * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
   * @name module:skins/DefaultSkin.DefaultSkin#skinId
   * @override
   * @type {string}
   */
  skinId: 'JClicDefaultSkin',
  /**
   * The HTML div where buttons, counters and message box are placed
   * @name module:skins/DefaultSkin.DefaultSkin#$ctrlCnt
   * @type {external:jQuery} */
  $ctrlCnt: null,
  /**
   * Space (pixels) between the components of this {@link module:skins/Skin.Skin Skin}
   * @name module:skins/DefaultSkin.DefaultSkin#margin
   * @type {number} */
  margin: 18,
  /**
   * Height of {@link module:skins/DefaultSkin.DefaultSkin#msgBox msgBox}
   * @name module:skins/DefaultSkin.DefaultSkin#msgBoxHeight
   * @type {number} */
  msgBoxHeight: 60,
  /**
   * Width of counters, in pixels
   * @name module:skins/DefaultSkin.DefaultSkin#countersWidth
   * @type {number} */
  countersWidth: 60,
  /**
   * Height of counters, in pixels
   * @name module:skins/DefaultSkin.DefaultSkin#countersHeight
   * @type {number} */
  countersHeight: 20,
  //
  //Buttons and other graphical resources used by this skin.
  //
  /**
   * Styles used in this skin
   * @name module:skins/DefaultSkin.DefaultSkin#mainCSS
   * @type {string} */
  mainCSS: main_namespaceObject,
  /**
   * Styles used in this skin, sized to half its regular size
   * @name module:skins/DefaultSkin.DefaultSkin#mainCSSHalf
   * @type {string} */
  mainCSSHalf: mainHalf_namespaceObject,
  /**
   * Styles used in this skin, sized to two thirds of its regular size
   * @name module:skins/DefaultSkin.DefaultSkin#mainCSSTwoThirds
   * @type {string} */
  mainCSSTwoThirds: mainTwoThirds_namespaceObject,
  /**
   * Fonts used in this skin
   * @name module:skins/DefaultSkin.DefaultSkin#cssFonts
   * @type {string[]} */
  cssFonts: ['Roboto'],
  //
  // Default settings for icons (can be overridden in subclasses):
  /**
   * Icon width
   * @name module:skins/DefaultSkin.DefaultSkin#iconWidth
   * @type {number} */
  iconWidth: 36,
  /**
   * Icon height
   * @name module:skins/DefaultSkin.DefaultSkin#iconHeight
   * @type {number} */
  iconHeight: 36,
  /**
   * Fill color for icons
   * @name module:skins/DefaultSkin.DefaultSkin#iconFill
   * @type {string} */
  iconFill: '#FFFFFF',
  //
  // SVG images for action buttons
  // Based on [Google Material design Icons](https://google.github.io/material-design-icons/)
  //
  /**
   * Icon for 'previous activity' button
   * @name module:skins/DefaultSkin.DefaultSkin#prevIcon
   * @type {string} */
  prevIcon: prevIcon_namespaceObject,
  /**
   * Icon for 'next activity' button
   * @name module:skins/DefaultSkin.DefaultSkin#nextIcon
   * @type {string} */
  nextIcon: nextIcon_namespaceObject,
  /**
   * Full screen on icon
   * @name module:skins/DefaultSkin.DefaultSkin#fullScreenIcon
   * @type {string} */
  fullScreenIcon: fullScreenIcon_namespaceObject,
  /**
   * Full screen off icon
   * @name module:skins/DefaultSkin.DefaultSkin#fullScreenExitIcon
   * @type {string} */
  fullScreenExitIcon: fullScreenExitIcon_namespaceObject,
  /**
   * Close button
   * @name module:skins/DefaultSkin.DefaultSkin#closeIcon
   * @type {string} */
  closeIcon: closeIcon_namespaceObject,
  /**
   * Info button
   * @name module:skins/DefaultSkin.DefaultSkin#infoIcon
   * @type {string} */
  infoIcon: infoIcon_namespaceObject,
  /**
   * Reports button
   * @name module:skins/DefaultSkin.DefaultSkin#reportsIcon
   * @type {string} */
  reportsIcon: reportsIcon_namespaceObject,
  //
  // Settings for counters:
  /**
   * Counter icon width
   * @name module:skins/DefaultSkin.DefaultSkin#counterIconWidth
   * @type {number} */
  counterIconWidth: 18,
  /**
   * Counter icon height
   * @name module:skins/DefaultSkin.DefaultSkin#counterIconHeight
   * @type {number} */
  counterIconHeight: 18,
  /**
   * Counter icon fill color
   * @name module:skins/DefaultSkin.DefaultSkin#counterIconFill
   * @type {string} */
  counterIconFill: '#FFFFFF',
  // Counters:
  /**
   * Time icon
   * @name module:skins/DefaultSkin.DefaultSkin#timeIcon
   * @type {string} */
  timeIcon: timeIcon_namespaceObject,
  /**
   * Score icon
   * @name module:skins/DefaultSkin.DefaultSkin#scoreIcon
   * @type {string} */
  scoreIcon: scoreIcon_namespaceObject,
  /**
   * Actions icon
   * @name module:skins/DefaultSkin.DefaultSkin#actionsIcon
   * @type {string} */
  actionsIcon: actionsIcon_namespaceObject,
});

// Register this class in the list of available skins
/* harmony default export */ const skins_DefaultSkin = (Skin["default"].registerClass('default', DefaultSkin));


/***/ })

};
;
//# sourceMappingURL=1588.jclic-node.js.map