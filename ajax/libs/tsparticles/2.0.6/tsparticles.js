/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.6
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-plugin-absorbers"), require("tsparticles-plugin-emitters"), require("tsparticles-interaction-external-trail"), require("tsparticles-plugin-polygon-mask"), require("tsparticles-updater-roll"), require("tsparticles-slim"), require("tsparticles-updater-tilt"), require("tsparticles-engine"), require("tsparticles-updater-wobble"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-plugin-absorbers", "tsparticles-plugin-emitters", "tsparticles-interaction-external-trail", "tsparticles-plugin-polygon-mask", "tsparticles-updater-roll", "tsparticles-slim", "tsparticles-updater-tilt", "tsparticles-engine", "tsparticles-updater-wobble"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-plugin-absorbers"), require("tsparticles-plugin-emitters"), require("tsparticles-interaction-external-trail"), require("tsparticles-plugin-polygon-mask"), require("tsparticles-updater-roll"), require("tsparticles-slim"), require("tsparticles-updater-tilt"), require("tsparticles-engine"), require("tsparticles-updater-wobble")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__502__, __WEBPACK_EXTERNAL_MODULE__949__, __WEBPACK_EXTERNAL_MODULE__165__, __WEBPACK_EXTERNAL_MODULE__742__, __WEBPACK_EXTERNAL_MODULE__281__, __WEBPACK_EXTERNAL_MODULE__208__, __WEBPACK_EXTERNAL_MODULE__950__, __WEBPACK_EXTERNAL_MODULE__818__, __WEBPACK_EXTERNAL_MODULE__304__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 818:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__818__;

/***/ }),

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
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "loadFull": () => (/* binding */ loadFull)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-plugin-absorbers","commonjs2":"tsparticles-plugin-absorbers","amd":"tsparticles-plugin-absorbers","root":"window"}
var external_commonjs_tsparticles_plugin_absorbers_commonjs2_tsparticles_plugin_absorbers_amd_tsparticles_plugin_absorbers_root_window_ = __webpack_require__(502);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-plugin-emitters","commonjs2":"tsparticles-plugin-emitters","amd":"tsparticles-plugin-emitters","root":"window"}
var external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_ = __webpack_require__(949);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-interaction-external-trail","commonjs2":"tsparticles-interaction-external-trail","amd":"tsparticles-interaction-external-trail","root":"window"}
var external_commonjs_tsparticles_interaction_external_trail_commonjs2_tsparticles_interaction_external_trail_amd_tsparticles_interaction_external_trail_root_window_ = __webpack_require__(165);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-plugin-polygon-mask","commonjs2":"tsparticles-plugin-polygon-mask","amd":"tsparticles-plugin-polygon-mask","root":"window"}
var external_commonjs_tsparticles_plugin_polygon_mask_commonjs2_tsparticles_plugin_polygon_mask_amd_tsparticles_plugin_polygon_mask_root_window_ = __webpack_require__(742);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-roll","commonjs2":"tsparticles-updater-roll","amd":"tsparticles-updater-roll","root":"window"}
var external_commonjs_tsparticles_updater_roll_commonjs2_tsparticles_updater_roll_amd_tsparticles_updater_roll_root_window_ = __webpack_require__(281);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-slim","commonjs2":"tsparticles-slim","amd":"tsparticles-slim","root":"window"}
var external_commonjs_tsparticles_slim_commonjs2_tsparticles_slim_amd_tsparticles_slim_root_window_ = __webpack_require__(208);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-tilt","commonjs2":"tsparticles-updater-tilt","amd":"tsparticles-updater-tilt","root":"window"}
var external_commonjs_tsparticles_updater_tilt_commonjs2_tsparticles_updater_tilt_amd_tsparticles_updater_tilt_root_window_ = __webpack_require__(950);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ../../updaters/twinkle/dist/esm/TwinkleUpdater.js

class TwinkleUpdater {
  getColorStyles(particle, context, radius, opacity) {
    const pOptions = particle.options,
          twinkle = pOptions.twinkle.particles,
          twinkling = twinkle.enable && Math.random() < twinkle.frequency,
          zIndexOptions = particle.options.zIndex,
          zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate,
          twinklingOpacity = twinkling ? (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(twinkle.opacity) * zOpacityFactor : opacity,
          twinkleRgb = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.colorToHsl)(twinkle.color),
          twinkleStyle = twinkleRgb ? (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromHsl)(twinkleRgb, twinklingOpacity) : undefined,
          res = {},
          needsTwinkle = twinkling && twinkleStyle;
    res.fill = needsTwinkle ? twinkleStyle : undefined;
    res.stroke = needsTwinkle ? twinkleStyle : undefined;
    return res;
  }

  init() {}

  isEnabled(particle) {
    return particle.options.twinkle.particles.enable;
  }

  update() {}

}
;// CONCATENATED MODULE: ../../updaters/twinkle/dist/esm/index.js

async function loadTwinkleUpdater(engine) {
  await engine.addParticleUpdater("twinkle", () => new TwinkleUpdater());
}
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-wobble","commonjs2":"tsparticles-updater-wobble","amd":"tsparticles-updater-wobble","root":"window"}
var external_commonjs_tsparticles_updater_wobble_commonjs2_tsparticles_updater_wobble_amd_tsparticles_updater_wobble_root_window_ = __webpack_require__(304);
;// CONCATENATED MODULE: ./dist/browser/index.js









async function loadFull(engine) {
  await (0,external_commonjs_tsparticles_slim_commonjs2_tsparticles_slim_amd_tsparticles_slim_root_window_.loadSlim)(engine);
  await (0,external_commonjs_tsparticles_updater_roll_commonjs2_tsparticles_updater_roll_amd_tsparticles_updater_roll_root_window_.loadRollUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_tilt_commonjs2_tsparticles_updater_tilt_amd_tsparticles_updater_tilt_root_window_.loadTiltUpdater)(engine);
  await loadTwinkleUpdater(engine);
  await (0,external_commonjs_tsparticles_updater_wobble_commonjs2_tsparticles_updater_wobble_amd_tsparticles_updater_wobble_root_window_.loadWobbleUpdater)(engine);
  await (0,external_commonjs_tsparticles_interaction_external_trail_commonjs2_tsparticles_interaction_external_trail_amd_tsparticles_interaction_external_trail_root_window_.loadExternalTrailInteraction)(engine);
  await (0,external_commonjs_tsparticles_plugin_absorbers_commonjs2_tsparticles_plugin_absorbers_amd_tsparticles_plugin_absorbers_root_window_.loadAbsorbersPlugin)(engine);
  await (0,external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_.loadEmittersPlugin)(engine);
  await (0,external_commonjs_tsparticles_plugin_polygon_mask_commonjs2_tsparticles_plugin_polygon_mask_amd_tsparticles_plugin_polygon_mask_root_window_.loadPolygonMaskPlugin)(engine);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});