/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.0-beta.1
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-slim"), require("tsparticles-interaction-external-trail"), require("tsparticles-plugin-absorbers"), require("tsparticles-plugin-emitters"), require("tsparticles-plugin-polygon-mask"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-slim", "tsparticles-interaction-external-trail", "tsparticles-plugin-absorbers", "tsparticles-plugin-emitters", "tsparticles-plugin-polygon-mask"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-slim"), require("tsparticles-interaction-external-trail"), require("tsparticles-plugin-absorbers"), require("tsparticles-plugin-emitters"), require("tsparticles-plugin-polygon-mask")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__208__, __WEBPACK_EXTERNAL_MODULE__165__, __WEBPACK_EXTERNAL_MODULE__502__, __WEBPACK_EXTERNAL_MODULE__949__, __WEBPACK_EXTERNAL_MODULE__742__) {
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
/* harmony import */ var tsparticles_slim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(208);
/* harmony import */ var tsparticles_slim__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tsparticles_slim__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(165);
/* harmony import */ var tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(502);
/* harmony import */ var tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(949);
/* harmony import */ var tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var tsparticles_plugin_polygon_mask__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(742);
/* harmony import */ var tsparticles_plugin_polygon_mask__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(tsparticles_plugin_polygon_mask__WEBPACK_IMPORTED_MODULE_4__);





function loadFull(tsParticles) {
  (0,tsparticles_slim__WEBPACK_IMPORTED_MODULE_0__.loadSlim)(tsParticles);
  (0,tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_1__.loadExternalTrailInteraction)(tsParticles);
  (0,tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_2__.loadAbsorbersPlugin)(tsParticles);
  (0,tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_3__.loadEmittersPlugin)(tsParticles);
  (0,tsparticles_plugin_polygon_mask__WEBPACK_IMPORTED_MODULE_4__.loadPolygonMaskPlugin)(tsParticles);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});