"use strict";
exports.id = 222;
exports.ids = [222];
exports.modules = {

/***/ 222:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ skins_SimpleSkin)
});

// UNUSED EXPORTS: SimpleSkin

// EXTERNAL MODULE: external "jquery"
var external_jquery_ = __webpack_require__(7750);
var external_jquery_default = /*#__PURE__*/__webpack_require__.n(external_jquery_);
// EXTERNAL MODULE: ./src/skins/Skin.js + 9 modules
var Skin = __webpack_require__(757);
// EXTERNAL MODULE: ./src/skins/DefaultSkin.js + 13 modules
var DefaultSkin = __webpack_require__(1588);
;// ./src/skins/assets/simple.css
const simple_namespaceObject = ".ID {\n  background-color: #888888;\n}\n\n.ID .JClicCtrlCnt {\n  margin: 9px;\n}\n\n.ID .JClicPlayerCnt {\n  margin: 0px 18px 18px;\n}\n\n.ID .JClicMsgBox {\n  flex-grow: 0;\n  margin: 0 18px 18px 18px;\n}\n";
;// ./src/skins/assets/simpleHalf.css
const simpleHalf_namespaceObject = ".ID .JClicCtrlCnt {\n  margin: 4px;\n}\n\n.ID .JClicPlayerCnt {\n  margin: 0px 9px 9px;\n}\n\n.ID .JClicMsgBox {\n  margin: 0 9px 9px 9px;\n}\n";
;// ./src/skins/assets/simpleTwoThirds.css
const simpleTwoThirds_namespaceObject = ".ID .JClicCtrlCnt {\n  margin: 6px;\n}\n\n.ID .JClicPlayerCnt {\n  margin: 0px 12px 12px;\n}\n\n.ID .JClicMsgBox {\n  margin: 0 12px 12px 12px;\n}\n";
;// ./src/skins/SimpleSkin.js
/**
 *  File    : skins/SimpleSkin.js
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





// Use Webpack to import CSS and SVG files




/**
 * This is a variant of the default {@link module:skins/Skin.Skin Skin} used by JClic.js
 * It has the buttons at top, and don't has counters.
 * @extends module:skins/DefaultSkin.DefaultSkin
 */
class SimpleSkin extends DefaultSkin["default"] {
  /**
   * SimpleSkin constructor
   * @param {module:JClicPlayer.JClicPlayer} ps - The PlayStation (currently a {@link module:JClicPlayer.JClicPlayer JClicPlayer}) used to load and
   * realize the media objects meeded tot build the Skin.
   * @param {string} [name] - The skin class name
   * @param {object} [options] - Optional parameter with additional options
   */
  constructor(ps, name = null, options = {}) {
    // OrangeSkin extends [DefaultSkin](DefaultSkin.html)
    super(ps, name, Object.assign({}, options, { counters: false, reportsBtn: true }));

    this.$ctrlCnt.detach().prependTo(this.$div);
    this.$msgBoxDiv.detach().appendTo(this.$div);
    // Add a spacing div in substitution of msgBox
    external_jquery_default()('<div/>').css({ 'flex-grow': 1 }).insertAfter(this.$ctrlCnt.children(':nth-child(2)'));
  }

  /**
   * Returns the CSS styles used by this skin. This method should be called only from
   * the `Skin` constructor, and overridded by subclasses if needed.
   * @param {string} media - A specific media size. Possible values are: 'default', 'half' and 'twoThirds'
   * @returns {string}
   */
  _getStyleSheets(media = 'default') {
    return `${super._getStyleSheets(media)}${media === 'default' ? this.skinCSS : media === 'half' ? this.skinCSSHalf : media === 'twoThirds' ? this.skinCSSTwoThirds : ''}`;
  }
}

Object.assign(SimpleSkin.prototype, {
  /**
   * Class name of this skin. It will be used as a base selector in the definition of all CSS styles.
   * @name module:skins/SimpleSkin.SimpleSkin#skinId
   * @override
   * @type {string} */
  skinId: 'JClicSimpleSkin',
  /**
   * Styles used in this skin
   * @name module:skins/SimpleSkin.SimpleSkin#skinCSS
   * @type {string} */
  skinCSS: simple_namespaceObject,
  skinCSSHalf: simpleHalf_namespaceObject,
  skinCSSTwoThirds: simpleTwoThirds_namespaceObject,
});

// Register this class in the list of available skins
/* harmony default export */ const skins_SimpleSkin = (Skin["default"].registerClass('simple', SimpleSkin));


/***/ })

};
;
//# sourceMappingURL=222.jclic-node.js.map