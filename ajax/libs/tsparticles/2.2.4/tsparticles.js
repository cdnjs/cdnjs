/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.2.4
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-plugin-absorbers"), require("tsparticles-plugin-emitters"), require("tsparticles-interaction-external-trail"), require("tsparticles-plugin-polygon-mask"), require("tsparticles-updater-roll"), require("tsparticles-slim"), require("tsparticles-updater-tilt"), require("tsparticles-updater-twinkle"), require("tsparticles-updater-wobble"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-plugin-absorbers", "tsparticles-plugin-emitters", "tsparticles-interaction-external-trail", "tsparticles-plugin-polygon-mask", "tsparticles-updater-roll", "tsparticles-slim", "tsparticles-updater-tilt", "tsparticles-updater-twinkle", "tsparticles-updater-wobble"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-plugin-absorbers"), require("tsparticles-plugin-emitters"), require("tsparticles-interaction-external-trail"), require("tsparticles-plugin-polygon-mask"), require("tsparticles-updater-roll"), require("tsparticles-slim"), require("tsparticles-updater-tilt"), require("tsparticles-updater-twinkle"), require("tsparticles-updater-wobble")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__502__, __WEBPACK_EXTERNAL_MODULE__949__, __WEBPACK_EXTERNAL_MODULE__165__, __WEBPACK_EXTERNAL_MODULE__742__, __WEBPACK_EXTERNAL_MODULE__281__, __WEBPACK_EXTERNAL_MODULE__208__, __WEBPACK_EXTERNAL_MODULE__950__, __WEBPACK_EXTERNAL_MODULE__30__, __WEBPACK_EXTERNAL_MODULE__304__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 165:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__165__;

/***/ }),

/***/ 502:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__502__;

/***/ }),

/***/ 949:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__949__;

/***/ }),

/***/ 742:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__742__;

/***/ }),

/***/ 208:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__208__;

/***/ }),

/***/ 281:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__281__;

/***/ }),

/***/ 950:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__950__;

/***/ }),

/***/ 30:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__30__;

/***/ }),

/***/ 304:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__304__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadFull": () => (/* binding */ loadFull)
/* harmony export */ });
/* harmony import */ var tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(502);
/* harmony import */ var tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(949);
/* harmony import */ var tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(165);
/* harmony import */ var tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tsparticles_plugin_polygon_mask__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(742);
/* harmony import */ var tsparticles_plugin_polygon_mask__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tsparticles_plugin_polygon_mask__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var tsparticles_updater_roll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(281);
/* harmony import */ var tsparticles_updater_roll__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(tsparticles_updater_roll__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var tsparticles_slim__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(208);
/* harmony import */ var tsparticles_slim__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(tsparticles_slim__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var tsparticles_updater_tilt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(950);
/* harmony import */ var tsparticles_updater_tilt__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(tsparticles_updater_tilt__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var tsparticles_updater_twinkle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);
/* harmony import */ var tsparticles_updater_twinkle__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(tsparticles_updater_twinkle__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var tsparticles_updater_wobble__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(304);
/* harmony import */ var tsparticles_updater_wobble__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(tsparticles_updater_wobble__WEBPACK_IMPORTED_MODULE_8__);









async function loadFull(engine) {
  await (0,tsparticles_slim__WEBPACK_IMPORTED_MODULE_5__.loadSlim)(engine);
  await (0,tsparticles_updater_roll__WEBPACK_IMPORTED_MODULE_4__.loadRollUpdater)(engine);
  await (0,tsparticles_updater_tilt__WEBPACK_IMPORTED_MODULE_6__.loadTiltUpdater)(engine);
  await (0,tsparticles_updater_twinkle__WEBPACK_IMPORTED_MODULE_7__.loadTwinkleUpdater)(engine);
  await (0,tsparticles_updater_wobble__WEBPACK_IMPORTED_MODULE_8__.loadWobbleUpdater)(engine);
  await (0,tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_2__.loadExternalTrailInteraction)(engine);
  await (0,tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_0__.loadAbsorbersPlugin)(engine);
  await (0,tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_1__.loadEmittersPlugin)(engine);
  await (0,tsparticles_plugin_polygon_mask__WEBPACK_IMPORTED_MODULE_3__.loadPolygonMaskPlugin)(engine);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});