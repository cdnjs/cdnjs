/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v3.3.0
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
		module.exports = factory(require("@tsparticles/slim"), require("@tsparticles/plugin-emitters-shape-square"), require("@tsparticles/plugin-emitters-shape-circle"), require("@tsparticles/plugin-emitters"), require("@tsparticles/plugin-absorbers"), require("@tsparticles/interaction-external-trail"), require("@tsparticles/shape-text"), require("@tsparticles/updater-wobble"), require("@tsparticles/updater-twinkle"), require("@tsparticles/updater-tilt"), require("@tsparticles/updater-roll"), require("@tsparticles/updater-destroy"));
	else if(typeof define === 'function' && define.amd)
		define(["@tsparticles/slim", "@tsparticles/plugin-emitters-shape-square", "@tsparticles/plugin-emitters-shape-circle", "@tsparticles/plugin-emitters", "@tsparticles/plugin-absorbers", "@tsparticles/interaction-external-trail", "@tsparticles/shape-text", "@tsparticles/updater-wobble", "@tsparticles/updater-twinkle", "@tsparticles/updater-tilt", "@tsparticles/updater-roll", "@tsparticles/updater-destroy"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("@tsparticles/slim"), require("@tsparticles/plugin-emitters-shape-square"), require("@tsparticles/plugin-emitters-shape-circle"), require("@tsparticles/plugin-emitters"), require("@tsparticles/plugin-absorbers"), require("@tsparticles/interaction-external-trail"), require("@tsparticles/shape-text"), require("@tsparticles/updater-wobble"), require("@tsparticles/updater-twinkle"), require("@tsparticles/updater-tilt"), require("@tsparticles/updater-roll"), require("@tsparticles/updater-destroy")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__tsparticles_slim__, __WEBPACK_EXTERNAL_MODULE__tsparticles_plugin_emitters_shape_square__, __WEBPACK_EXTERNAL_MODULE__tsparticles_plugin_emitters_shape_circle__, __WEBPACK_EXTERNAL_MODULE__tsparticles_plugin_emitters__, __WEBPACK_EXTERNAL_MODULE__tsparticles_plugin_absorbers__, __WEBPACK_EXTERNAL_MODULE__tsparticles_interaction_external_trail__, __WEBPACK_EXTERNAL_MODULE__tsparticles_shape_text__, __WEBPACK_EXTERNAL_MODULE__tsparticles_updater_wobble__, __WEBPACK_EXTERNAL_MODULE__tsparticles_updater_twinkle__, __WEBPACK_EXTERNAL_MODULE__tsparticles_updater_tilt__, __WEBPACK_EXTERNAL_MODULE__tsparticles_updater_roll__, __WEBPACK_EXTERNAL_MODULE__tsparticles_updater_destroy__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/browser/index.js":
/*!*******************************!*\
  !*** ./dist/browser/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadFull: () => (/* binding */ loadFull)\n/* harmony export */ });\nasync function loadFull(engine, refresh = true) {\n  const {\n      loadDestroyUpdater\n    } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! @tsparticles/updater-destroy */ \"@tsparticles/updater-destroy\", 23)),\n    {\n      loadRollUpdater\n    } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! @tsparticles/updater-roll */ \"@tsparticles/updater-roll\", 23)),\n    {\n      loadTiltUpdater\n    } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! @tsparticles/updater-tilt */ \"@tsparticles/updater-tilt\", 23)),\n    {\n      loadTwinkleUpdater\n    } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! @tsparticles/updater-twinkle */ \"@tsparticles/updater-twinkle\", 23)),\n    {\n      loadWobbleUpdater\n    } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! @tsparticles/updater-wobble */ \"@tsparticles/updater-wobble\", 23)),\n    {\n      loadTextShape\n    } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! @tsparticles/shape-text */ \"@tsparticles/shape-text\", 23)),\n    {\n      loadExternalTrailInteraction\n    } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! @tsparticles/interaction-external-trail */ \"@tsparticles/interaction-external-trail\", 23)),\n    {\n      loadAbsorbersPlugin\n    } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! @tsparticles/plugin-absorbers */ \"@tsparticles/plugin-absorbers\", 23)),\n    {\n      loadEmittersPlugin\n    } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! @tsparticles/plugin-emitters */ \"@tsparticles/plugin-emitters\", 23)),\n    {\n      loadEmittersShapeCircle\n    } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! @tsparticles/plugin-emitters-shape-circle */ \"@tsparticles/plugin-emitters-shape-circle\", 23)),\n    {\n      loadEmittersShapeSquare\n    } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! @tsparticles/plugin-emitters-shape-square */ \"@tsparticles/plugin-emitters-shape-square\", 23)),\n    {\n      loadSlim\n    } = await Promise.resolve(/*! import() */).then(__webpack_require__.t.bind(__webpack_require__, /*! @tsparticles/slim */ \"@tsparticles/slim\", 23));\n  await loadDestroyUpdater(engine, false);\n  await loadRollUpdater(engine, false);\n  await loadTiltUpdater(engine, false);\n  await loadTwinkleUpdater(engine, false);\n  await loadWobbleUpdater(engine, false);\n  await loadTextShape(engine, false);\n  await loadExternalTrailInteraction(engine, false);\n  await loadAbsorbersPlugin(engine, false);\n  await loadEmittersPlugin(engine, false);\n  await loadEmittersShapeCircle(engine, false);\n  await loadEmittersShapeSquare(engine, false);\n  await loadSlim(engine, refresh);\n}\n\n//# sourceURL=webpack://tsparticles/./dist/browser/index.js?");

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
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
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