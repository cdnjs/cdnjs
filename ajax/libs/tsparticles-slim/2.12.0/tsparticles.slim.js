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
		module.exports = factory(require("tsparticles-particles.js"), require("tsparticles-basic"), require("tsparticles-plugin-easing-quad"), require("tsparticles-interaction-external-attract"), require("tsparticles-interaction-external-bounce"), require("tsparticles-interaction-external-bubble"), require("tsparticles-interaction-external-connect"), require("tsparticles-interaction-external-grab"), require("tsparticles-interaction-external-pause"), require("tsparticles-interaction-external-push"), require("tsparticles-interaction-external-remove"), require("tsparticles-interaction-external-repulse"), require("tsparticles-interaction-external-slow"), require("tsparticles-shape-image"), require("tsparticles-updater-life"), require("tsparticles-shape-line"), require("tsparticles-move-parallax"), require("tsparticles-interaction-particles-attract"), require("tsparticles-interaction-particles-collisions"), require("tsparticles-interaction-particles-links"), require("tsparticles-shape-polygon"), require("tsparticles-updater-rotate"), require("tsparticles-shape-square"), require("tsparticles-shape-star"), require("tsparticles-updater-stroke-color"), require("tsparticles-shape-text"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-particles.js", "tsparticles-basic", "tsparticles-plugin-easing-quad", "tsparticles-interaction-external-attract", "tsparticles-interaction-external-bounce", "tsparticles-interaction-external-bubble", "tsparticles-interaction-external-connect", "tsparticles-interaction-external-grab", "tsparticles-interaction-external-pause", "tsparticles-interaction-external-push", "tsparticles-interaction-external-remove", "tsparticles-interaction-external-repulse", "tsparticles-interaction-external-slow", "tsparticles-shape-image", "tsparticles-updater-life", "tsparticles-shape-line", "tsparticles-move-parallax", "tsparticles-interaction-particles-attract", "tsparticles-interaction-particles-collisions", "tsparticles-interaction-particles-links", "tsparticles-shape-polygon", "tsparticles-updater-rotate", "tsparticles-shape-square", "tsparticles-shape-star", "tsparticles-updater-stroke-color", "tsparticles-shape-text"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-particles.js"), require("tsparticles-basic"), require("tsparticles-plugin-easing-quad"), require("tsparticles-interaction-external-attract"), require("tsparticles-interaction-external-bounce"), require("tsparticles-interaction-external-bubble"), require("tsparticles-interaction-external-connect"), require("tsparticles-interaction-external-grab"), require("tsparticles-interaction-external-pause"), require("tsparticles-interaction-external-push"), require("tsparticles-interaction-external-remove"), require("tsparticles-interaction-external-repulse"), require("tsparticles-interaction-external-slow"), require("tsparticles-shape-image"), require("tsparticles-updater-life"), require("tsparticles-shape-line"), require("tsparticles-move-parallax"), require("tsparticles-interaction-particles-attract"), require("tsparticles-interaction-particles-collisions"), require("tsparticles-interaction-particles-links"), require("tsparticles-shape-polygon"), require("tsparticles-updater-rotate"), require("tsparticles-shape-square"), require("tsparticles-shape-star"), require("tsparticles-updater-stroke-color"), require("tsparticles-shape-text")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__736__, __WEBPACK_EXTERNAL_MODULE__477__, __WEBPACK_EXTERNAL_MODULE__534__, __WEBPACK_EXTERNAL_MODULE__947__, __WEBPACK_EXTERNAL_MODULE__428__, __WEBPACK_EXTERNAL_MODULE__557__, __WEBPACK_EXTERNAL_MODULE__240__, __WEBPACK_EXTERNAL_MODULE__354__, __WEBPACK_EXTERNAL_MODULE__199__, __WEBPACK_EXTERNAL_MODULE__997__, __WEBPACK_EXTERNAL_MODULE__341__, __WEBPACK_EXTERNAL_MODULE__142__, __WEBPACK_EXTERNAL_MODULE__563__, __WEBPACK_EXTERNAL_MODULE__520__, __WEBPACK_EXTERNAL_MODULE__86__, __WEBPACK_EXTERNAL_MODULE__598__, __WEBPACK_EXTERNAL_MODULE__845__, __WEBPACK_EXTERNAL_MODULE__718__, __WEBPACK_EXTERNAL_MODULE__203__, __WEBPACK_EXTERNAL_MODULE__39__, __WEBPACK_EXTERNAL_MODULE__841__, __WEBPACK_EXTERNAL_MODULE__389__, __WEBPACK_EXTERNAL_MODULE__860__, __WEBPACK_EXTERNAL_MODULE__208__, __WEBPACK_EXTERNAL_MODULE__226__, __WEBPACK_EXTERNAL_MODULE__706__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 477:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__477__;

/***/ }),

/***/ 947:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__947__;

/***/ }),

/***/ 428:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__428__;

/***/ }),

/***/ 557:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__557__;

/***/ }),

/***/ 240:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__240__;

/***/ }),

/***/ 354:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__354__;

/***/ }),

/***/ 199:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__199__;

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__997__;

/***/ }),

/***/ 341:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__341__;

/***/ }),

/***/ 142:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__142__;

/***/ }),

/***/ 563:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__563__;

/***/ }),

/***/ 718:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__718__;

/***/ }),

/***/ 203:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__203__;

/***/ }),

/***/ 39:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__39__;

/***/ }),

/***/ 845:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__845__;

/***/ }),

/***/ 736:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__736__;

/***/ }),

/***/ 534:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__534__;

/***/ }),

/***/ 520:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__520__;

/***/ }),

/***/ 598:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__598__;

/***/ }),

/***/ 841:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__841__;

/***/ }),

/***/ 860:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__860__;

/***/ }),

/***/ 208:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__208__;

/***/ }),

/***/ 706:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__706__;

/***/ }),

/***/ 86:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__86__;

/***/ }),

/***/ 389:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__389__;

/***/ }),

/***/ 226:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__226__;

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
/* harmony export */   loadSlim: () => (/* binding */ loadSlim)
/* harmony export */ });
/* harmony import */ var tsparticles_particles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(736);
/* harmony import */ var tsparticles_particles_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tsparticles_particles_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tsparticles_basic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(477);
/* harmony import */ var tsparticles_basic__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tsparticles_basic__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tsparticles_plugin_easing_quad__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(534);
/* harmony import */ var tsparticles_plugin_easing_quad__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tsparticles_plugin_easing_quad__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tsparticles_interaction_external_attract__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(947);
/* harmony import */ var tsparticles_interaction_external_attract__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tsparticles_interaction_external_attract__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var tsparticles_interaction_external_bounce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(428);
/* harmony import */ var tsparticles_interaction_external_bounce__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(tsparticles_interaction_external_bounce__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var tsparticles_interaction_external_bubble__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(557);
/* harmony import */ var tsparticles_interaction_external_bubble__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(tsparticles_interaction_external_bubble__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var tsparticles_interaction_external_connect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(240);
/* harmony import */ var tsparticles_interaction_external_connect__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(tsparticles_interaction_external_connect__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var tsparticles_interaction_external_grab__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(354);
/* harmony import */ var tsparticles_interaction_external_grab__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(tsparticles_interaction_external_grab__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var tsparticles_interaction_external_pause__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(199);
/* harmony import */ var tsparticles_interaction_external_pause__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(tsparticles_interaction_external_pause__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var tsparticles_interaction_external_push__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(997);
/* harmony import */ var tsparticles_interaction_external_push__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(tsparticles_interaction_external_push__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var tsparticles_interaction_external_remove__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(341);
/* harmony import */ var tsparticles_interaction_external_remove__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(tsparticles_interaction_external_remove__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var tsparticles_interaction_external_repulse__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(142);
/* harmony import */ var tsparticles_interaction_external_repulse__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(tsparticles_interaction_external_repulse__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var tsparticles_interaction_external_slow__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(563);
/* harmony import */ var tsparticles_interaction_external_slow__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(tsparticles_interaction_external_slow__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var tsparticles_shape_image__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(520);
/* harmony import */ var tsparticles_shape_image__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(tsparticles_shape_image__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var tsparticles_updater_life__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(86);
/* harmony import */ var tsparticles_updater_life__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(tsparticles_updater_life__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var tsparticles_shape_line__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(598);
/* harmony import */ var tsparticles_shape_line__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(tsparticles_shape_line__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var tsparticles_move_parallax__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(845);
/* harmony import */ var tsparticles_move_parallax__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(tsparticles_move_parallax__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var tsparticles_interaction_particles_attract__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(718);
/* harmony import */ var tsparticles_interaction_particles_attract__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(tsparticles_interaction_particles_attract__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var tsparticles_interaction_particles_collisions__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(203);
/* harmony import */ var tsparticles_interaction_particles_collisions__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(tsparticles_interaction_particles_collisions__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var tsparticles_interaction_particles_links__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(39);
/* harmony import */ var tsparticles_interaction_particles_links__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(tsparticles_interaction_particles_links__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var tsparticles_shape_polygon__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(841);
/* harmony import */ var tsparticles_shape_polygon__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(tsparticles_shape_polygon__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var tsparticles_updater_rotate__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(389);
/* harmony import */ var tsparticles_updater_rotate__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(tsparticles_updater_rotate__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var tsparticles_shape_square__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(860);
/* harmony import */ var tsparticles_shape_square__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(tsparticles_shape_square__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var tsparticles_shape_star__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(208);
/* harmony import */ var tsparticles_shape_star__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(tsparticles_shape_star__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var tsparticles_updater_stroke_color__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(226);
/* harmony import */ var tsparticles_updater_stroke_color__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(tsparticles_updater_stroke_color__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var tsparticles_shape_text__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(706);
/* harmony import */ var tsparticles_shape_text__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(tsparticles_shape_text__WEBPACK_IMPORTED_MODULE_25__);


























async function loadSlim(engine, refresh = true) {
  (0,tsparticles_particles_js__WEBPACK_IMPORTED_MODULE_0__.initPjs)(engine);
  await (0,tsparticles_move_parallax__WEBPACK_IMPORTED_MODULE_16__.loadParallaxMover)(engine, false);
  await (0,tsparticles_interaction_external_attract__WEBPACK_IMPORTED_MODULE_3__.loadExternalAttractInteraction)(engine, false);
  await (0,tsparticles_interaction_external_bounce__WEBPACK_IMPORTED_MODULE_4__.loadExternalBounceInteraction)(engine, false);
  await (0,tsparticles_interaction_external_bubble__WEBPACK_IMPORTED_MODULE_5__.loadExternalBubbleInteraction)(engine, false);
  await (0,tsparticles_interaction_external_connect__WEBPACK_IMPORTED_MODULE_6__.loadExternalConnectInteraction)(engine, false);
  await (0,tsparticles_interaction_external_grab__WEBPACK_IMPORTED_MODULE_7__.loadExternalGrabInteraction)(engine, false);
  await (0,tsparticles_interaction_external_pause__WEBPACK_IMPORTED_MODULE_8__.loadExternalPauseInteraction)(engine, false);
  await (0,tsparticles_interaction_external_push__WEBPACK_IMPORTED_MODULE_9__.loadExternalPushInteraction)(engine, false);
  await (0,tsparticles_interaction_external_remove__WEBPACK_IMPORTED_MODULE_10__.loadExternalRemoveInteraction)(engine, false);
  await (0,tsparticles_interaction_external_repulse__WEBPACK_IMPORTED_MODULE_11__.loadExternalRepulseInteraction)(engine, false);
  await (0,tsparticles_interaction_external_slow__WEBPACK_IMPORTED_MODULE_12__.loadExternalSlowInteraction)(engine, false);
  await (0,tsparticles_interaction_particles_attract__WEBPACK_IMPORTED_MODULE_17__.loadParticlesAttractInteraction)(engine, false);
  await (0,tsparticles_interaction_particles_collisions__WEBPACK_IMPORTED_MODULE_18__.loadParticlesCollisionsInteraction)(engine, false);
  await (0,tsparticles_interaction_particles_links__WEBPACK_IMPORTED_MODULE_19__.loadParticlesLinksInteraction)(engine, false);
  await (0,tsparticles_plugin_easing_quad__WEBPACK_IMPORTED_MODULE_2__.loadEasingQuadPlugin)();
  await (0,tsparticles_shape_image__WEBPACK_IMPORTED_MODULE_13__.loadImageShape)(engine, false);
  await (0,tsparticles_shape_line__WEBPACK_IMPORTED_MODULE_15__.loadLineShape)(engine, false);
  await (0,tsparticles_shape_polygon__WEBPACK_IMPORTED_MODULE_20__.loadPolygonShape)(engine, false);
  await (0,tsparticles_shape_square__WEBPACK_IMPORTED_MODULE_22__.loadSquareShape)(engine, false);
  await (0,tsparticles_shape_star__WEBPACK_IMPORTED_MODULE_23__.loadStarShape)(engine, false);
  await (0,tsparticles_shape_text__WEBPACK_IMPORTED_MODULE_25__.loadTextShape)(engine, false);
  await (0,tsparticles_updater_life__WEBPACK_IMPORTED_MODULE_14__.loadLifeUpdater)(engine, false);
  await (0,tsparticles_updater_rotate__WEBPACK_IMPORTED_MODULE_21__.loadRotateUpdater)(engine, false);
  await (0,tsparticles_updater_stroke_color__WEBPACK_IMPORTED_MODULE_24__.loadStrokeColorUpdater)(engine, false);
  await (0,tsparticles_basic__WEBPACK_IMPORTED_MODULE_1__.loadBasic)(engine, refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});