/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.0-beta.3
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-slim"), require("tsparticles-updater-tilt"), require("tsparticles-updater-roll"), require("tsparticles-updater-wobble"), require("tsparticles-interaction-external-trail"), require("tsparticles-plugin-absorbers"), require("tsparticles-plugin-emitters"), require("tsparticles-plugin-polygon-mask"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-slim", "tsparticles-updater-tilt", "tsparticles-updater-roll", "tsparticles-updater-wobble", "tsparticles-interaction-external-trail", "tsparticles-plugin-absorbers", "tsparticles-plugin-emitters", "tsparticles-plugin-polygon-mask"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-slim"), require("tsparticles-updater-tilt"), require("tsparticles-updater-roll"), require("tsparticles-updater-wobble"), require("tsparticles-interaction-external-trail"), require("tsparticles-plugin-absorbers"), require("tsparticles-plugin-emitters"), require("tsparticles-plugin-polygon-mask")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__208__, __WEBPACK_EXTERNAL_MODULE__950__, __WEBPACK_EXTERNAL_MODULE__281__, __WEBPACK_EXTERNAL_MODULE__304__, __WEBPACK_EXTERNAL_MODULE__165__, __WEBPACK_EXTERNAL_MODULE__502__, __WEBPACK_EXTERNAL_MODULE__949__, __WEBPACK_EXTERNAL_MODULE__742__) {
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
/* harmony import */ var tsparticles_slim__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(208);
/* harmony import */ var tsparticles_slim__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(tsparticles_slim__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var tsparticles_updater_tilt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(950);
/* harmony import */ var tsparticles_updater_tilt__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(tsparticles_updater_tilt__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var tsparticles_updater_roll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(281);
/* harmony import */ var tsparticles_updater_roll__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(tsparticles_updater_roll__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tsparticles_updater_wobble__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(304);
/* harmony import */ var tsparticles_updater_wobble__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(tsparticles_updater_wobble__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(165);
/* harmony import */ var tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(502);
/* harmony import */ var tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(949);
/* harmony import */ var tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var tsparticles_plugin_polygon_mask__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(742);
/* harmony import */ var tsparticles_plugin_polygon_mask__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(tsparticles_plugin_polygon_mask__WEBPACK_IMPORTED_MODULE_7__);
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};









function loadFull(tsParticles) {
  return __awaiter(this, void 0, void 0, function* () {
    yield (0,tsparticles_slim__WEBPACK_IMPORTED_MODULE_0__.loadSlim)(tsParticles);
    yield (0,tsparticles_updater_tilt__WEBPACK_IMPORTED_MODULE_1__.loadTiltUpdater)(tsParticles);
    yield (0,tsparticles_updater_roll__WEBPACK_IMPORTED_MODULE_2__.loadRollUpdater)(tsParticles);
    yield (0,tsparticles_updater_wobble__WEBPACK_IMPORTED_MODULE_3__.loadWobbleUpdater)(tsParticles);
    yield (0,tsparticles_interaction_external_trail__WEBPACK_IMPORTED_MODULE_4__.loadExternalTrailInteraction)(tsParticles);
    yield (0,tsparticles_plugin_absorbers__WEBPACK_IMPORTED_MODULE_5__.loadAbsorbersPlugin)(tsParticles);
    yield (0,tsparticles_plugin_emitters__WEBPACK_IMPORTED_MODULE_6__.loadEmittersPlugin)(tsParticles);
    yield (0,tsparticles_plugin_polygon_mask__WEBPACK_IMPORTED_MODULE_7__.loadPolygonMaskPlugin)(tsParticles);
  });
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});