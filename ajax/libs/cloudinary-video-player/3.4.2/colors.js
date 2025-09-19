/*!
 * Cloudinary Video Player v3.4.2
 * Built on 2025-09-19T06:00:10.952Z
 * https://github.com/cloudinary/cloudinary-video-player
 */
"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["cloudinaryVideoPlayerChunkLoading"] = self["cloudinaryVideoPlayerChunkLoading"] || []).push([["colors"],{

/***/ "./plugins/colors/colors.js":
/*!**********************************!*\
  !*** ./plugins/colors/colors.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   getDefaultPlayerColor: () => (/* binding */ getDefaultPlayerColor)\n/* harmony export */ });\n/* harmony import */ var _video_player_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../video-player.utils */ \"./video-player.utils.js\");\n/* harmony import */ var _colors_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colors.scss */ \"./plugins/colors/colors.scss\");\n\n\nconst defaults = {\n  colorsDark: {\n    'base': '#000000',\n    'accent': '#0D9AFF',\n    'text': '#FFFFFF'\n  },\n  colorsLight: {\n    'base': '#FFFFFF',\n    'accent': '#0D9AFF',\n    'text': '#000000'\n  }\n};\nconst getDefaultPlayerColor = options => {\n  return (0,_video_player_utils__WEBPACK_IMPORTED_MODULE_0__.isLight)(options) ? defaults.colorsLight : defaults.colorsDark;\n};\nconst colorsPlugin = function (player) {\n  let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n  const skinDefaults = getDefaultPlayerColor(player.options_);\n  opts.colors = Object.assign({}, skinDefaults, opts.colors);\n\n  // Set CSS custom properties on the player element\n  const playerEl = player.el();\n  if (opts.colors.base) {\n    playerEl.style.setProperty('--color-base', opts.colors.base);\n  }\n  if (opts.colors.accent) {\n    playerEl.style.setProperty('--color-accent', opts.colors.accent);\n  }\n  if (opts.colors.text) {\n    playerEl.style.setProperty('--color-text', opts.colors.text);\n  }\n\n  // Return an object with methods to update colors if needed\n  return {\n    updateColors: newColors => {\n      const updatedColors = Object.assign({}, opts.colors, newColors);\n      if (updatedColors.base) {\n        playerEl.style.setProperty('--color-base', updatedColors.base);\n      }\n      if (updatedColors.accent) {\n        playerEl.style.setProperty('--color-accent', updatedColors.accent);\n      }\n      if (updatedColors.text) {\n        playerEl.style.setProperty('--color-text', updatedColors.text);\n      }\n      opts.colors = updatedColors;\n    },\n    getColors: () => opts.colors\n  };\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (colorsPlugin);\n\n//# sourceURL=webpack://cloudinary-video-player/./plugins/colors/colors.js?");

/***/ }),

/***/ "./plugins/colors/colors.scss":
/*!************************************!*\
  !*** ./plugins/colors/colors.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://cloudinary-video-player/./plugins/colors/colors.scss?");

/***/ })

}]);