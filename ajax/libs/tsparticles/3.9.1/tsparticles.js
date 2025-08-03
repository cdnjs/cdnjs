/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v3.9.1
 */
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@tsparticles/plugin-absorbers"), require("@tsparticles/updater-destroy"), require("@tsparticles/plugin-emitters"), require("@tsparticles/plugin-emitters-shape-circle"), require("@tsparticles/plugin-emitters-shape-square"), require("@tsparticles/interaction-external-trail"), require("@tsparticles/updater-roll"), require("@tsparticles/slim"), require("@tsparticles/shape-text"), require("@tsparticles/updater-tilt"), require("@tsparticles/updater-twinkle"), require("@tsparticles/updater-wobble"));
	else if(typeof define === 'function' && define.amd)
		define(["@tsparticles/plugin-absorbers", "@tsparticles/updater-destroy", "@tsparticles/plugin-emitters", "@tsparticles/plugin-emitters-shape-circle", "@tsparticles/plugin-emitters-shape-square", "@tsparticles/interaction-external-trail", "@tsparticles/updater-roll", "@tsparticles/slim", "@tsparticles/shape-text", "@tsparticles/updater-tilt", "@tsparticles/updater-twinkle", "@tsparticles/updater-wobble"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("@tsparticles/plugin-absorbers"), require("@tsparticles/updater-destroy"), require("@tsparticles/plugin-emitters"), require("@tsparticles/plugin-emitters-shape-circle"), require("@tsparticles/plugin-emitters-shape-square"), require("@tsparticles/interaction-external-trail"), require("@tsparticles/updater-roll"), require("@tsparticles/slim"), require("@tsparticles/shape-text"), require("@tsparticles/updater-tilt"), require("@tsparticles/updater-twinkle"), require("@tsparticles/updater-wobble")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__tsparticles_plugin_absorbers__, __WEBPACK_EXTERNAL_MODULE__tsparticles_updater_destroy__, __WEBPACK_EXTERNAL_MODULE__tsparticles_plugin_emitters__, __WEBPACK_EXTERNAL_MODULE__tsparticles_plugin_emitters_shape_circle__, __WEBPACK_EXTERNAL_MODULE__tsparticles_plugin_emitters_shape_square__, __WEBPACK_EXTERNAL_MODULE__tsparticles_interaction_external_trail__, __WEBPACK_EXTERNAL_MODULE__tsparticles_updater_roll__, __WEBPACK_EXTERNAL_MODULE__tsparticles_slim__, __WEBPACK_EXTERNAL_MODULE__tsparticles_shape_text__, __WEBPACK_EXTERNAL_MODULE__tsparticles_updater_tilt__, __WEBPACK_EXTERNAL_MODULE__tsparticles_updater_twinkle__, __WEBPACK_EXTERNAL_MODULE__tsparticles_updater_wobble__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/browser/index.js":
/*!*******************************!*\
  !*** ./dist/browser/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadFull: () => (/* binding */ loadFull)\n/* harmony export */ });\n/* harmony import */ var _tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tsparticles/plugin-absorbers */ \"@tsparticles/plugin-absorbers\");\n/* harmony import */ var _tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _tsparticles_updater_destroy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tsparticles/updater-destroy */ \"@tsparticles/updater-destroy\");\n/* harmony import */ var _tsparticles_updater_destroy__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_tsparticles_updater_destroy__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tsparticles/plugin-emitters */ \"@tsparticles/plugin-emitters\");\n/* harmony import */ var _tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _tsparticles_plugin_emitters_shape_circle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @tsparticles/plugin-emitters-shape-circle */ \"@tsparticles/plugin-emitters-shape-circle\");\n/* harmony import */ var _tsparticles_plugin_emitters_shape_circle__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_tsparticles_plugin_emitters_shape_circle__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _tsparticles_plugin_emitters_shape_square__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tsparticles/plugin-emitters-shape-square */ \"@tsparticles/plugin-emitters-shape-square\");\n/* harmony import */ var _tsparticles_plugin_emitters_shape_square__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_tsparticles_plugin_emitters_shape_square__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tsparticles/interaction-external-trail */ \"@tsparticles/interaction-external-trail\");\n/* harmony import */ var _tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _tsparticles_updater_roll__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tsparticles/updater-roll */ \"@tsparticles/updater-roll\");\n/* harmony import */ var _tsparticles_updater_roll__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_tsparticles_updater_roll__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _tsparticles_slim__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tsparticles/slim */ \"@tsparticles/slim\");\n/* harmony import */ var _tsparticles_slim__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_tsparticles_slim__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _tsparticles_shape_text__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @tsparticles/shape-text */ \"@tsparticles/shape-text\");\n/* harmony import */ var _tsparticles_shape_text__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_tsparticles_shape_text__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _tsparticles_updater_tilt__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @tsparticles/updater-tilt */ \"@tsparticles/updater-tilt\");\n/* harmony import */ var _tsparticles_updater_tilt__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_tsparticles_updater_tilt__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _tsparticles_updater_twinkle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @tsparticles/updater-twinkle */ \"@tsparticles/updater-twinkle\");\n/* harmony import */ var _tsparticles_updater_twinkle__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_tsparticles_updater_twinkle__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _tsparticles_updater_wobble__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @tsparticles/updater-wobble */ \"@tsparticles/updater-wobble\");\n/* harmony import */ var _tsparticles_updater_wobble__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_tsparticles_updater_wobble__WEBPACK_IMPORTED_MODULE_11__);\n\n\n\n\n\n\n\n\n\n\n\n\nasync function loadFull(engine, refresh = true) {\n  engine.checkVersion(\"3.9.1\");\n  await (0,_tsparticles_updater_destroy__WEBPACK_IMPORTED_MODULE_1__.loadDestroyUpdater)(engine, false);\n  await (0,_tsparticles_updater_roll__WEBPACK_IMPORTED_MODULE_6__.loadRollUpdater)(engine, false);\n  await (0,_tsparticles_updater_tilt__WEBPACK_IMPORTED_MODULE_9__.loadTiltUpdater)(engine, false);\n  await (0,_tsparticles_updater_twinkle__WEBPACK_IMPORTED_MODULE_10__.loadTwinkleUpdater)(engine, false);\n  await (0,_tsparticles_updater_wobble__WEBPACK_IMPORTED_MODULE_11__.loadWobbleUpdater)(engine, false);\n  await (0,_tsparticles_shape_text__WEBPACK_IMPORTED_MODULE_8__.loadTextShape)(engine, false);\n  await (0,_tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_5__.loadExternalTrailInteraction)(engine, false);\n  await (0,_tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_0__.loadAbsorbersPlugin)(engine, false);\n  await (0,_tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_2__.loadEmittersPlugin)(engine, false);\n  await (0,_tsparticles_plugin_emitters_shape_circle__WEBPACK_IMPORTED_MODULE_3__.loadEmittersShapeCircle)(engine, false);\n  await (0,_tsparticles_plugin_emitters_shape_square__WEBPACK_IMPORTED_MODULE_4__.loadEmittersShapeSquare)(engine, false);\n  await (0,_tsparticles_slim__WEBPACK_IMPORTED_MODULE_7__.loadSlim)(engine, refresh);\n}\n\n//# sourceURL=webpack://tsparticles/./dist/browser/index.js?\n}");

/***/ }),

/***/ "@tsparticles/interaction-external-trail":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** external {"commonjs":"@tsparticles/interaction-external-trail","commonjs2":"@tsparticles/interaction-external-trail","amd":"@tsparticles/interaction-external-trail","root":"window"} ***!
  \*********************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__tsparticles_interaction_external_trail__;

/***/ }),

/***/ "@tsparticles/plugin-absorbers":
/*!***************************************************************************************************************************************************************!*\
  !*** external {"commonjs":"@tsparticles/plugin-absorbers","commonjs2":"@tsparticles/plugin-absorbers","amd":"@tsparticles/plugin-absorbers","root":"window"} ***!
  \***************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__tsparticles_plugin_absorbers__;

/***/ }),

/***/ "@tsparticles/plugin-emitters":
/*!************************************************************************************************************************************************************!*\
  !*** external {"commonjs":"@tsparticles/plugin-emitters","commonjs2":"@tsparticles/plugin-emitters","amd":"@tsparticles/plugin-emitters","root":"window"} ***!
  \************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__tsparticles_plugin_emitters__;

/***/ }),

/***/ "@tsparticles/plugin-emitters-shape-circle":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** external {"commonjs":"@tsparticles/plugin-emitters-shape-circle","commonjs2":"@tsparticles/plugin-emitters-shape-circle","amd":"@tsparticles/plugin-emitters-shape-circle","root":"window"} ***!
  \***************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__tsparticles_plugin_emitters_shape_circle__;

/***/ }),

/***/ "@tsparticles/plugin-emitters-shape-square":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** external {"commonjs":"@tsparticles/plugin-emitters-shape-square","commonjs2":"@tsparticles/plugin-emitters-shape-square","amd":"@tsparticles/plugin-emitters-shape-square","root":"window"} ***!
  \***************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__tsparticles_plugin_emitters_shape_square__;

/***/ }),

/***/ "@tsparticles/shape-text":
/*!*********************************************************************************************************************************************!*\
  !*** external {"commonjs":"@tsparticles/shape-text","commonjs2":"@tsparticles/shape-text","amd":"@tsparticles/shape-text","root":"window"} ***!
  \*********************************************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__tsparticles_shape_text__;

/***/ }),

/***/ "@tsparticles/slim":
/*!***************************************************************************************************************************!*\
  !*** external {"commonjs":"@tsparticles/slim","commonjs2":"@tsparticles/slim","amd":"@tsparticles/slim","root":"window"} ***!
  \***************************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__tsparticles_slim__;

/***/ }),

/***/ "@tsparticles/updater-destroy":
/*!************************************************************************************************************************************************************!*\
  !*** external {"commonjs":"@tsparticles/updater-destroy","commonjs2":"@tsparticles/updater-destroy","amd":"@tsparticles/updater-destroy","root":"window"} ***!
  \************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__tsparticles_updater_destroy__;

/***/ }),

/***/ "@tsparticles/updater-roll":
/*!***************************************************************************************************************************************************!*\
  !*** external {"commonjs":"@tsparticles/updater-roll","commonjs2":"@tsparticles/updater-roll","amd":"@tsparticles/updater-roll","root":"window"} ***!
  \***************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__tsparticles_updater_roll__;

/***/ }),

/***/ "@tsparticles/updater-tilt":
/*!***************************************************************************************************************************************************!*\
  !*** external {"commonjs":"@tsparticles/updater-tilt","commonjs2":"@tsparticles/updater-tilt","amd":"@tsparticles/updater-tilt","root":"window"} ***!
  \***************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__tsparticles_updater_tilt__;

/***/ }),

/***/ "@tsparticles/updater-twinkle":
/*!************************************************************************************************************************************************************!*\
  !*** external {"commonjs":"@tsparticles/updater-twinkle","commonjs2":"@tsparticles/updater-twinkle","amd":"@tsparticles/updater-twinkle","root":"window"} ***!
  \************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__tsparticles_updater_twinkle__;

/***/ }),

/***/ "@tsparticles/updater-wobble":
/*!*********************************************************************************************************************************************************!*\
  !*** external {"commonjs":"@tsparticles/updater-wobble","commonjs2":"@tsparticles/updater-wobble","amd":"@tsparticles/updater-wobble","root":"window"} ***!
  \*********************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__tsparticles_updater_wobble__;

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/browser/index.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});