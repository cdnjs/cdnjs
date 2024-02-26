"use strict";
(self["webpackChunkcloudinary_video_player"] = self["webpackChunkcloudinary_video_player"] || []).push([["defaultProfiles"],{

/***/ "./config/profiles/index.js":
/*!**********************************!*\
  !*** ./config/profiles/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultProfiles: () => (/* binding */ defaultProfiles)
/* harmony export */ });
/* harmony import */ var _cldDefault_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cldDefault.json */ "./config/profiles/cldDefault.json");
/* harmony import */ var _cldLooping_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cldLooping.json */ "./config/profiles/cldLooping.json");
/* harmony import */ var _cldAdaptiveStream_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cldAdaptiveStream.json */ "./config/profiles/cldAdaptiveStream.json");



const defaultProfiles = {
  cldDefault: _cldDefault_json__WEBPACK_IMPORTED_MODULE_0__,
  cldLooping: _cldLooping_json__WEBPACK_IMPORTED_MODULE_1__,
  cldAdaptiveStream: _cldAdaptiveStream_json__WEBPACK_IMPORTED_MODULE_2__
};

/***/ }),

/***/ "./config/profiles/cldAdaptiveStream.json":
/*!************************************************!*\
  !*** ./config/profiles/cldAdaptiveStream.json ***!
  \************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"playerOptions":{"fluid":true,"controls":true,"controlBar":{"fullscreenToggle":false},"showJumpControls":true,"hideContextMenu":false,"floatingWhenNotVisible":"none"},"sourceOptions":{"chapters":true,"sourceTypes":["hls"],"transformation":[{"effect":["volume:auto"]}]}}');

/***/ }),

/***/ "./config/profiles/cldDefault.json":
/*!*****************************************!*\
  !*** ./config/profiles/cldDefault.json ***!
  \*****************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"playerOptions":{},"sourceOptions":{}}');

/***/ }),

/***/ "./config/profiles/cldLooping.json":
/*!*****************************************!*\
  !*** ./config/profiles/cldLooping.json ***!
  \*****************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"playerOptions":{"fluid":true,"controls":false,"muted":true,"floatingWhenNotVisible":"none","hideContextMenu":false,"autoplay":true,"loop":true},"sourceOptions":{}}');

/***/ })

}]);
//# sourceMappingURL=defaultProfiles.js.map