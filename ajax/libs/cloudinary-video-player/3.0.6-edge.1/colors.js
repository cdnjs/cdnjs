/*!
 * Cloudinary Video Player v3.0.6-edge.1
 * Built on 2025-07-03T11:32:08.169Z
 * https://github.com/cloudinary/cloudinary-video-player
 */
"use strict";
(self["cloudinaryVideoPlayerChunkLoading"] = self["cloudinaryVideoPlayerChunkLoading"] || []).push([["colors"],{

/***/ "./plugins/colors/colors.js":
/*!**********************************!*\
  !*** ./plugins/colors/colors.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   getDefaultPlayerColor: () => (/* binding */ getDefaultPlayerColor)
/* harmony export */ });
/* harmony import */ var _video_player_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../video-player.utils */ "./video-player.utils.js");
/* harmony import */ var _colors_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colors.scss */ "./plugins/colors/colors.scss");


const defaults = {
  colorsDark: {
    'base': '#000000',
    'accent': '#0D9AFF',
    'text': '#FFFFFF'
  },
  colorsLight: {
    'base': '#FFFFFF',
    'accent': '#0D9AFF',
    'text': '#000000'
  }
};
const getDefaultPlayerColor = options => {
  return (0,_video_player_utils__WEBPACK_IMPORTED_MODULE_0__.isLight)(options) ? defaults.colorsLight : defaults.colorsDark;
};
const colorsPlugin = function (player) {
  let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const skinDefaults = getDefaultPlayerColor(player.options_);
  opts.colors = Object.assign({}, skinDefaults, opts.colors);

  // Set CSS custom properties on the player element
  const playerEl = player.el();
  if (opts.colors.base) {
    playerEl.style.setProperty('--color-base', opts.colors.base);
  }
  if (opts.colors.accent) {
    playerEl.style.setProperty('--color-accent', opts.colors.accent);
  }
  if (opts.colors.text) {
    playerEl.style.setProperty('--color-text', opts.colors.text);
  }

  // Return an object with methods to update colors if needed
  return {
    updateColors: newColors => {
      const updatedColors = Object.assign({}, opts.colors, newColors);
      if (updatedColors.base) {
        playerEl.style.setProperty('--color-base', updatedColors.base);
      }
      if (updatedColors.accent) {
        playerEl.style.setProperty('--color-accent', updatedColors.accent);
      }
      if (updatedColors.text) {
        playerEl.style.setProperty('--color-text', updatedColors.text);
      }
      opts.colors = updatedColors;
    },
    getColors: () => opts.colors
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (colorsPlugin);

/***/ }),

/***/ "./plugins/colors/colors.scss":
/*!************************************!*\
  !*** ./plugins/colors/colors.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=colors.js.map