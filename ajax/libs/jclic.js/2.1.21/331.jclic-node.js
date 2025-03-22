"use strict";
exports.id = 331;
exports.ids = [331];
exports.modules = {

/***/ 331:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export GreenSkin */
/* harmony import */ var _Skin_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(757);
/* harmony import */ var _DefaultSkin_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1588);
/**
 *  File    : skins/GreenSkin.js
 *  Created : 04/07/2016
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
 * This is a variant of the default {@link module:skins/Skin.Skin Skin} used by JClic.js
 * It differs from {@link module:skins/DefaultSkin.DefaultSkin DefaultSkin} only in some colors
 * @extends module:skins/DefaultSkin.DefaultSkin
 */
class GreenSkin extends _DefaultSkin_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
   * GreenSkin constructor
   *
   * @param {module:JClicPlayer.JClicPlayer} ps - The PlayStation (currently a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) used to load and
   * realize the media objects needed to build this Skin.
   * @param {string} [name] - The skin class name
   * @param {object} [options] - Optional parameter with additional options
   */
  constructor(ps, name = null, options = {}) {
    // GreenSkin extends [DefaultSkin](DefaultSkin.html)
    super(ps, name, options);
  }

  /**
   * Returns the CSS styles used by this skin. This method should be called only from
   * the `Skin` constructor, and overridded by subclasses if needed.
   * @param {string} media - A specific media size. Possible values are: 'default', 'half' and 'twoThirds'
   * @returns {string}
   */
  _getStyleSheets(media = 'default') {
    return super._getStyleSheets(media) + (media === 'default' ? this.skinCSS : '');
  }
}

Object.assign(GreenSkin.prototype, {
  /**
   * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
   * @name module:skins/GreenSkin.GreenSkin#skinId
   * @override
   * @type {string} */
  skinId: 'JClicGreenSkin',
  //
  // Buttons and other graphical resources used by this skin:
  /**
   * Fill color for icons
   * @name module:skins/GreenSkin.GreenSkin#iconFill
   * @override
   * @type {string} */
  iconFill: '#20640E',
  /**
   * Fill-in color for counters
   * @name module:skins/GreenSkin.GreenSkin#counterIconFill
   * @override
   * @type {string} */
  counterIconFill: '#20640E',
  /**
   * Styles used in this skin
   * @name module:skins/GreenSkin.GreenSkin#skinCSS
   * @type {string} */
  skinCSS: '.ID {background-color:#4AFF19;}'
});

// Register this class in the list of available skins
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Skin_js__WEBPACK_IMPORTED_MODULE_0__["default"].registerClass('green', GreenSkin));


/***/ })

};
;
//# sourceMappingURL=331.jclic-node.js.map