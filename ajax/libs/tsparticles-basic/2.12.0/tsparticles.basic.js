/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.12.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-move-base"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-size"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-move-base", "tsparticles-shape-circle", "tsparticles-updater-color", "tsparticles-updater-opacity", "tsparticles-updater-out-modes", "tsparticles-updater-size"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-move-base"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-size")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__565__, __WEBPACK_EXTERNAL_MODULE__851__, __WEBPACK_EXTERNAL_MODULE__613__, __WEBPACK_EXTERNAL_MODULE__515__, __WEBPACK_EXTERNAL_MODULE__509__, __WEBPACK_EXTERNAL_MODULE__694__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 565:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__565__;

/***/ }),

/***/ 851:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__851__;

/***/ }),

/***/ 613:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__613__;

/***/ }),

/***/ 515:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__515__;

/***/ }),

/***/ 509:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__509__;

/***/ }),

/***/ 694:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__694__;

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
/* harmony export */   loadBasic: () => (/* binding */ loadBasic)
/* harmony export */ });
/* harmony import */ var tsparticles_move_base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(565);
/* harmony import */ var tsparticles_move_base__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tsparticles_move_base__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tsparticles_shape_circle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(851);
/* harmony import */ var tsparticles_shape_circle__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tsparticles_shape_circle__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tsparticles_updater_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(613);
/* harmony import */ var tsparticles_updater_color__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tsparticles_updater_color__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tsparticles_updater_opacity__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(515);
/* harmony import */ var tsparticles_updater_opacity__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tsparticles_updater_opacity__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var tsparticles_updater_out_modes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(509);
/* harmony import */ var tsparticles_updater_out_modes__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(tsparticles_updater_out_modes__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var tsparticles_updater_size__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(694);
/* harmony import */ var tsparticles_updater_size__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(tsparticles_updater_size__WEBPACK_IMPORTED_MODULE_5__);






async function loadBasic(engine, refresh = true) {
  await (0,tsparticles_move_base__WEBPACK_IMPORTED_MODULE_0__.loadBaseMover)(engine, false);
  await (0,tsparticles_shape_circle__WEBPACK_IMPORTED_MODULE_1__.loadCircleShape)(engine, false);
  await (0,tsparticles_updater_color__WEBPACK_IMPORTED_MODULE_2__.loadColorUpdater)(engine, false);
  await (0,tsparticles_updater_opacity__WEBPACK_IMPORTED_MODULE_3__.loadOpacityUpdater)(engine, false);
  await (0,tsparticles_updater_out_modes__WEBPACK_IMPORTED_MODULE_4__.loadOutModesUpdater)(engine, false);
  await (0,tsparticles_updater_size__WEBPACK_IMPORTED_MODULE_5__.loadSizeUpdater)(engine, false);
  await engine.refresh(refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});