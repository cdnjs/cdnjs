"use strict";
exports.id = 2608;
exports.ids = [2608];
exports.modules = {

/***/ 2608:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ skins_MiniSkin)
});

// UNUSED EXPORTS: MiniSkin

// EXTERNAL MODULE: ./src/skins/Skin.js + 9 modules
var Skin = __webpack_require__(757);
// EXTERNAL MODULE: ./src/skins/DefaultSkin.js + 13 modules
var DefaultSkin = __webpack_require__(1588);
;// ./src/skins/assets/mini.css
const mini_namespaceObject = ".ID {\n  background-color: #F4F4F4;\n}\n\n.ID .JClicPlayerCnt {\n  margin: 4px;\n}\n\n.ID .JClicCtrlCnt {\n  margin: 0 2px 4px 2px;\n}\n\n.ID .JClicMsgBox {\n  height: 25px;\n}\n";
;// ./src/skins/MiniSkin.js
/**
 *  File    : skins/MiniSkin.js
 *  Created : 05/07/2016
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




// Use Webpack to import CSS and SVG files


/**
 * This is a variant of the default {@link module:skins/Skin.Skin Skin} used by JClic.js
 * It differs from {@link module:skins/DefaultSkin.DefaultSkin DefaultSkin} in colors and sizes
 * @extends module:skins/DefaultSkin.DefaultSkin
 */
class MiniSkin extends DefaultSkin["default"] {
  /**
   * MiniSkin constructor
   *
   * @param {module:JClicPlayer.JClicPlayer} ps - The PlayStation (currently a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) used to load and
   * realize the media objects meeded tot build the Skin.
   * @param {string} [name] - The skin class name
   * @param {object} [options] - Optional parameter with additional options
   */
  constructor(ps, name = null, options = {}) {
    // MiniSkin extends [DefaultSkin](DefaultSkin.html)
    super(ps, name, Object.assign({}, options, { counters: false, reportsBtn: true }));
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

Object.assign(MiniSkin.prototype, {
  /**
   * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
   * @name MiniSkin#skinId
   * @override
   * @type {string}
   */
  skinId: 'JClicMiniSkin',
  // Buttons and other graphical resources used by this skin.
  //
  /**
   * Icon width
   * @name MiniSkin#iconWidth
   * @override
   * @type {number} */
  iconWidth: 18,
  /**
   * Icon height
   * @name MiniSkin#iconHeight
   * @override
   * @type {number} */
  iconHeight: 18,
  /**
   * Fill color for icons
   * @name MiniSkin#iconFill
   * @override
   * @type {string} */
  iconFill: '#080808',
  /**
   * Fill-in color for counters
   * @name MiniSkin#counterIconFill
   * @override
   * @type {string} */
  counterIconFill: '#080808',
  /**
   * Default margin between elements
   * @name MiniSkin#margin
   * @override
   * @type {number} */
  margin: 8,
  /**
   * Styles used in this skin
   * @name MiniSkin#skinCSS
   * @type {string} */
  skinCSS: mini_namespaceObject,
  /**
   * Styles used in this skin, sized to half its regular size.
   * (_null_ here because MiniSkin it's already very small)
   * @name MiniSkin#mainCSSHalf
   * @override
   * @type {string} */
  mainCSSHalf: '',
  /**
   * Styles used in this skin, sized to two thirds of its regular size
   * (_null_ here because MiniSkin it's already very small)
   * @name MiniSkin#mainCSSTwoThirds
   * @override
   * @type {string} */
  mainCSSTwoThirds: '',
});

// Register this class in the list of available skins
/* harmony default export */ const skins_MiniSkin = (Skin["default"].registerClass('mini', MiniSkin));


/***/ })

};
;
//# sourceMappingURL=2608.jclic-node.js.map