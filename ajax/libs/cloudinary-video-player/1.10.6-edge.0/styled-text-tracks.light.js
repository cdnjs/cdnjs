"use strict";
(self["webpackChunkcloudinary_video_player"] = self["webpackChunkcloudinary_video_player"] || []).push([["styled-text-tracks"],{

/***/ "./plugins/styled-text-tracks/styled-text-tracks.js":
/*!**********************************************************!*\
  !*** ./plugins/styled-text-tracks/styled-text-tracks.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var utils_fontFace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! utils/fontFace */ "./utils/fontFace.js");
/* harmony import */ var utils_css_prefix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! utils/css-prefix */ "./utils/css-prefix.js");
/* harmony import */ var _styled_text_tracks_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styled-text-tracks.scss */ "./plugins/styled-text-tracks/styled-text-tracks.scss");



const styledTextTracks = (config, player) => {
  const options = {
    theme: config.theme || 'default',
    fontFace: config.fontFace,
    fontSize: config.fontSize,
    gravity: config.gravity || 'bottom',
    box: config.box,
    style: config.style
  };

  // Class Names - Theme/Gravity
  const classNames = player.textTrackDisplay.el().classList;
  classNames.forEach(className => {
    // Remove previously added theme/gravity classes
    if (className.startsWith('cld-styled-text-tracks')) {
      classNames.remove(className);
    }
  });
  classNames.add('cld-styled-text-tracks');
  classNames.add(`cld-styled-text-tracks-theme-${options.theme}`);
  options.gravity.split('-').forEach(gravity => {
    classNames.add(`cld-styled-text-tracks-gravity-${gravity}`);
  });

  // Font
  if (options.fontFace) {
    (0,utils_fontFace__WEBPACK_IMPORTED_MODULE_0__.fontFace)(player.textTrackDisplay.el(), options.fontFace);
  }
  const applyImportantStyle = (style, selector) => {
    const styleEl = document.createElement('style');
    if (Object.entries(style)) {
      const css = Object.entries(style).reduce((acc, _ref) => {
        let [key, value] = _ref;
        return acc + `${key}: ${value} !important; `;
      }, '');
      styleEl.innerHTML = `
      .${(0,utils_css_prefix__WEBPACK_IMPORTED_MODULE_1__.playerClassPrefix)(player)} ${selector} {
          ${css}
        }
      `;
      player.el_.appendChild(styleEl);
    }
  };

  // Custom bounding box
  if (options.box) {
    const {
      x,
      y,
      width,
      height
    } = options.box;
    applyImportantStyle({
      translate: `${x ? x : 0} ${y ? y : 0}`,
      ...(width ? {
        width
      } : undefined),
      ...(height ? {
        height
      } : undefined)
    }, '.vjs-text-track-display.cld-styled-text-tracks');
  }

  // Custom font-size
  if (options.fontSize) {
    applyImportantStyle({
      'font-size': options.fontSize
    }, '.vjs-text-track-display.cld-styled-text-tracks .vjs-text-track-cue > div');
  }

  // Custom styles
  if (options.style) {
    applyImportantStyle(options.style, '.vjs-text-track-display.cld-styled-text-tracks .vjs-text-track-cue > div');
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (styledTextTracks);

/***/ }),

/***/ "./plugins/styled-text-tracks/styled-text-tracks.scss":
/*!************************************************************!*\
  !*** ./plugins/styled-text-tracks/styled-text-tracks.scss ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

}]);
//# sourceMappingURL=styled-text-tracks.light.js.map