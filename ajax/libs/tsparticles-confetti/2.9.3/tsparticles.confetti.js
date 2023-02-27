/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.9.3
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-engine"), require("tsparticles-updater-angle"), require("tsparticles-move-base"), require("tsparticles-shape-cards"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-plugin-emitters"), require("tsparticles-shape-heart"), require("tsparticles-shape-image"), require("tsparticles-updater-life"), require("tsparticles-plugin-motion"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-shape-polygon"), require("tsparticles-updater-roll"), require("tsparticles-updater-size"), require("tsparticles-shape-square"), require("tsparticles-shape-star"), require("tsparticles-shape-text"), require("tsparticles-updater-tilt"), require("tsparticles-updater-wobble"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-engine", "tsparticles-updater-angle", "tsparticles-move-base", "tsparticles-shape-cards", "tsparticles-shape-circle", "tsparticles-updater-color", "tsparticles-plugin-emitters", "tsparticles-shape-heart", "tsparticles-shape-image", "tsparticles-updater-life", "tsparticles-plugin-motion", "tsparticles-updater-opacity", "tsparticles-updater-out-modes", "tsparticles-shape-polygon", "tsparticles-updater-roll", "tsparticles-updater-size", "tsparticles-shape-square", "tsparticles-shape-star", "tsparticles-shape-text", "tsparticles-updater-tilt", "tsparticles-updater-wobble"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-engine"), require("tsparticles-updater-angle"), require("tsparticles-move-base"), require("tsparticles-shape-cards"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-plugin-emitters"), require("tsparticles-shape-heart"), require("tsparticles-shape-image"), require("tsparticles-updater-life"), require("tsparticles-plugin-motion"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-shape-polygon"), require("tsparticles-updater-roll"), require("tsparticles-updater-size"), require("tsparticles-shape-square"), require("tsparticles-shape-star"), require("tsparticles-shape-text"), require("tsparticles-updater-tilt"), require("tsparticles-updater-wobble")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__961__, __WEBPACK_EXTERNAL_MODULE__490__, __WEBPACK_EXTERNAL_MODULE__565__, __WEBPACK_EXTERNAL_MODULE__522__, __WEBPACK_EXTERNAL_MODULE__851__, __WEBPACK_EXTERNAL_MODULE__613__, __WEBPACK_EXTERNAL_MODULE__716__, __WEBPACK_EXTERNAL_MODULE__516__, __WEBPACK_EXTERNAL_MODULE__520__, __WEBPACK_EXTERNAL_MODULE__86__, __WEBPACK_EXTERNAL_MODULE__255__, __WEBPACK_EXTERNAL_MODULE__515__, __WEBPACK_EXTERNAL_MODULE__509__, __WEBPACK_EXTERNAL_MODULE__841__, __WEBPACK_EXTERNAL_MODULE__852__, __WEBPACK_EXTERNAL_MODULE__694__, __WEBPACK_EXTERNAL_MODULE__860__, __WEBPACK_EXTERNAL_MODULE__208__, __WEBPACK_EXTERNAL_MODULE__706__, __WEBPACK_EXTERNAL_MODULE__95__, __WEBPACK_EXTERNAL_MODULE__585__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 961:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__961__;

/***/ }),

/***/ 565:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__565__;

/***/ }),

/***/ 716:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__716__;

/***/ }),

/***/ 255:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__255__;

/***/ }),

/***/ 522:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__522__;

/***/ }),

/***/ 851:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__851__;

/***/ }),

/***/ 516:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__516__;

/***/ }),

/***/ 520:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__520__;

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

/***/ 490:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__490__;

/***/ }),

/***/ 613:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__613__;

/***/ }),

/***/ 86:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__86__;

/***/ }),

/***/ 515:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__515__;

/***/ }),

/***/ 509:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__509__;

/***/ }),

/***/ 852:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__852__;

/***/ }),

/***/ 694:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__694__;

/***/ }),

/***/ 95:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__95__;

/***/ }),

/***/ 585:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__585__;

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
  "confetti": () => (/* reexport */ confetti)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/ConfettiOptions.js

class ConfettiOptions {
  constructor() {
    this.angle = 90;
    this.count = 50;
    this.spread = 45;
    this.startVelocity = 45;
    this.decay = 0.9;
    this.gravity = 1;
    this.drift = 0;
    this.ticks = 200;
    this.position = {
      x: 50,
      y: 50
    };
    this.colors = ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"];
    this.shapes = ["square", "circle"];
    this.scalar = 1;
    this.zIndex = 100;
    this.disableForReducedMotion = true;
    this.shapeOptions = {};
  }
  get origin() {
    return {
      x: this.position.x / 100,
      y: this.position.y / 100
    };
  }
  set origin(value) {
    this.position.x = value.x * 100;
    this.position.y = value.y * 100;
  }
  get particleCount() {
    return this.count;
  }
  set particleCount(value) {
    this.count = value;
  }
  load(data) {
    var _a, _b;
    if (!data) {
      return;
    }
    if (data.angle !== undefined) {
      this.angle = data.angle;
    }
    const count = (_a = data.count) !== null && _a !== void 0 ? _a : data.particleCount;
    if (count !== undefined) {
      this.count = count;
    }
    if (data.spread !== undefined) {
      this.spread = data.spread;
    }
    if (data.startVelocity !== undefined) {
      this.startVelocity = data.startVelocity;
    }
    if (data.decay !== undefined) {
      this.decay = data.decay;
    }
    if (data.gravity !== undefined) {
      this.gravity = data.gravity;
    }
    if (data.drift !== undefined) {
      this.drift = data.drift;
    }
    if (data.ticks !== undefined) {
      this.ticks = data.ticks;
    }
    const origin = data.origin;
    if (origin && !data.position) {
      data.position = {
        x: origin.x !== undefined ? origin.x * 100 : undefined,
        y: origin.y !== undefined ? origin.y * 100 : undefined
      };
    }
    const position = data.position;
    if (position) {
      if (position.x !== undefined) {
        this.position.x = position.x;
      }
      if (position.y !== undefined) {
        this.position.y = position.y;
      }
    }
    if (data.colors !== undefined) {
      if (data.colors instanceof Array) {
        this.colors = [...data.colors];
      } else {
        this.colors = data.colors;
      }
    }
    const options = data.shapeOptions;
    if (options !== undefined) {
      for (const shape in options) {
        const item = options[shape];
        if (item) {
          this.shapeOptions[shape] = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)((_b = this.shapeOptions[shape]) !== null && _b !== void 0 ? _b : {}, item);
        }
      }
    }
    if (data.shapes !== undefined) {
      if (data.shapes instanceof Array) {
        this.shapes = [...data.shapes];
      } else {
        this.shapes = data.shapes;
      }
    }
    if (data.scalar !== undefined) {
      this.scalar = data.scalar;
    }
    if (data.zIndex !== undefined) {
      this.zIndex = data.zIndex;
    }
    if (data.disableForReducedMotion !== undefined) {
      this.disableForReducedMotion = data.disableForReducedMotion;
    }
  }
}
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-angle","commonjs2":"tsparticles-updater-angle","amd":"tsparticles-updater-angle","root":"window"}
var external_commonjs_tsparticles_updater_angle_commonjs2_tsparticles_updater_angle_amd_tsparticles_updater_angle_root_window_ = __webpack_require__(490);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-move-base","commonjs2":"tsparticles-move-base","amd":"tsparticles-move-base","root":"window"}
var external_commonjs_tsparticles_move_base_commonjs2_tsparticles_move_base_amd_tsparticles_move_base_root_window_ = __webpack_require__(565);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-shape-cards","commonjs2":"tsparticles-shape-cards","amd":"tsparticles-shape-cards","root":"window"}
var external_commonjs_tsparticles_shape_cards_commonjs2_tsparticles_shape_cards_amd_tsparticles_shape_cards_root_window_ = __webpack_require__(522);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-shape-circle","commonjs2":"tsparticles-shape-circle","amd":"tsparticles-shape-circle","root":"window"}
var external_commonjs_tsparticles_shape_circle_commonjs2_tsparticles_shape_circle_amd_tsparticles_shape_circle_root_window_ = __webpack_require__(851);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-color","commonjs2":"tsparticles-updater-color","amd":"tsparticles-updater-color","root":"window"}
var external_commonjs_tsparticles_updater_color_commonjs2_tsparticles_updater_color_amd_tsparticles_updater_color_root_window_ = __webpack_require__(613);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-plugin-emitters","commonjs2":"tsparticles-plugin-emitters","amd":"tsparticles-plugin-emitters","root":"window"}
var external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_ = __webpack_require__(716);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-shape-heart","commonjs2":"tsparticles-shape-heart","amd":"tsparticles-shape-heart","root":"window"}
var external_commonjs_tsparticles_shape_heart_commonjs2_tsparticles_shape_heart_amd_tsparticles_shape_heart_root_window_ = __webpack_require__(516);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-shape-image","commonjs2":"tsparticles-shape-image","amd":"tsparticles-shape-image","root":"window"}
var external_commonjs_tsparticles_shape_image_commonjs2_tsparticles_shape_image_amd_tsparticles_shape_image_root_window_ = __webpack_require__(520);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-life","commonjs2":"tsparticles-updater-life","amd":"tsparticles-updater-life","root":"window"}
var external_commonjs_tsparticles_updater_life_commonjs2_tsparticles_updater_life_amd_tsparticles_updater_life_root_window_ = __webpack_require__(86);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-plugin-motion","commonjs2":"tsparticles-plugin-motion","amd":"tsparticles-plugin-motion","root":"window"}
var external_commonjs_tsparticles_plugin_motion_commonjs2_tsparticles_plugin_motion_amd_tsparticles_plugin_motion_root_window_ = __webpack_require__(255);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-opacity","commonjs2":"tsparticles-updater-opacity","amd":"tsparticles-updater-opacity","root":"window"}
var external_commonjs_tsparticles_updater_opacity_commonjs2_tsparticles_updater_opacity_amd_tsparticles_updater_opacity_root_window_ = __webpack_require__(515);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-out-modes","commonjs2":"tsparticles-updater-out-modes","amd":"tsparticles-updater-out-modes","root":"window"}
var external_commonjs_tsparticles_updater_out_modes_commonjs2_tsparticles_updater_out_modes_amd_tsparticles_updater_out_modes_root_window_ = __webpack_require__(509);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-shape-polygon","commonjs2":"tsparticles-shape-polygon","amd":"tsparticles-shape-polygon","root":"window"}
var external_commonjs_tsparticles_shape_polygon_commonjs2_tsparticles_shape_polygon_amd_tsparticles_shape_polygon_root_window_ = __webpack_require__(841);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-roll","commonjs2":"tsparticles-updater-roll","amd":"tsparticles-updater-roll","root":"window"}
var external_commonjs_tsparticles_updater_roll_commonjs2_tsparticles_updater_roll_amd_tsparticles_updater_roll_root_window_ = __webpack_require__(852);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-size","commonjs2":"tsparticles-updater-size","amd":"tsparticles-updater-size","root":"window"}
var external_commonjs_tsparticles_updater_size_commonjs2_tsparticles_updater_size_amd_tsparticles_updater_size_root_window_ = __webpack_require__(694);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-shape-square","commonjs2":"tsparticles-shape-square","amd":"tsparticles-shape-square","root":"window"}
var external_commonjs_tsparticles_shape_square_commonjs2_tsparticles_shape_square_amd_tsparticles_shape_square_root_window_ = __webpack_require__(860);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-shape-star","commonjs2":"tsparticles-shape-star","amd":"tsparticles-shape-star","root":"window"}
var external_commonjs_tsparticles_shape_star_commonjs2_tsparticles_shape_star_amd_tsparticles_shape_star_root_window_ = __webpack_require__(208);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-shape-text","commonjs2":"tsparticles-shape-text","amd":"tsparticles-shape-text","root":"window"}
var external_commonjs_tsparticles_shape_text_commonjs2_tsparticles_shape_text_amd_tsparticles_shape_text_root_window_ = __webpack_require__(706);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-tilt","commonjs2":"tsparticles-updater-tilt","amd":"tsparticles-updater-tilt","root":"window"}
var external_commonjs_tsparticles_updater_tilt_commonjs2_tsparticles_updater_tilt_amd_tsparticles_updater_tilt_root_window_ = __webpack_require__(95);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-wobble","commonjs2":"tsparticles-updater-wobble","amd":"tsparticles-updater-wobble","root":"window"}
var external_commonjs_tsparticles_updater_wobble_commonjs2_tsparticles_updater_wobble_amd_tsparticles_updater_wobble_root_window_ = __webpack_require__(585);
;// CONCATENATED MODULE: ./dist/browser/confetti.js






















let initialized = false;
let initializing = false;
const ids = new Map();
async function initPlugins() {
  if (initialized) {
    return;
  }
  if (initializing) {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (initialized) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }
  initializing = true;
  await (0,external_commonjs_tsparticles_move_base_commonjs2_tsparticles_move_base_amd_tsparticles_move_base_root_window_.loadBaseMover)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_.loadEmittersPlugin)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_plugin_motion_commonjs2_tsparticles_plugin_motion_amd_tsparticles_plugin_motion_root_window_.loadMotionPlugin)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_shape_cards_commonjs2_tsparticles_shape_cards_amd_tsparticles_shape_cards_root_window_.loadCardsShape)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_shape_circle_commonjs2_tsparticles_shape_circle_amd_tsparticles_shape_circle_root_window_.loadCircleShape)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_shape_heart_commonjs2_tsparticles_shape_heart_amd_tsparticles_shape_heart_root_window_.loadHeartShape)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_shape_image_commonjs2_tsparticles_shape_image_amd_tsparticles_shape_image_root_window_.loadImageShape)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_shape_polygon_commonjs2_tsparticles_shape_polygon_amd_tsparticles_shape_polygon_root_window_.loadPolygonShape)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_shape_square_commonjs2_tsparticles_shape_square_amd_tsparticles_shape_square_root_window_.loadSquareShape)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_shape_star_commonjs2_tsparticles_shape_star_amd_tsparticles_shape_star_root_window_.loadStarShape)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_shape_text_commonjs2_tsparticles_shape_text_amd_tsparticles_shape_text_root_window_.loadTextShape)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_updater_angle_commonjs2_tsparticles_updater_angle_amd_tsparticles_updater_angle_root_window_.loadAngleUpdater)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_updater_color_commonjs2_tsparticles_updater_color_amd_tsparticles_updater_color_root_window_.loadColorUpdater)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_updater_life_commonjs2_tsparticles_updater_life_amd_tsparticles_updater_life_root_window_.loadLifeUpdater)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_updater_opacity_commonjs2_tsparticles_updater_opacity_amd_tsparticles_updater_opacity_root_window_.loadOpacityUpdater)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_updater_out_modes_commonjs2_tsparticles_updater_out_modes_amd_tsparticles_updater_out_modes_root_window_.loadOutModesUpdater)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_updater_roll_commonjs2_tsparticles_updater_roll_amd_tsparticles_updater_roll_root_window_.loadRollUpdater)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_updater_size_commonjs2_tsparticles_updater_size_amd_tsparticles_updater_size_root_window_.loadSizeUpdater)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_updater_tilt_commonjs2_tsparticles_updater_tilt_amd_tsparticles_updater_tilt_root_window_.loadTiltUpdater)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_updater_wobble_commonjs2_tsparticles_updater_wobble_amd_tsparticles_updater_wobble_root_window_.loadWobbleUpdater)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  initializing = false;
  initialized = true;
}
async function setConfetti(params) {
  const actualOptions = new ConfettiOptions();
  actualOptions.load(params.options);
  let container;
  if (ids.has(params.id)) {
    container = ids.get(params.id);
    if (container && !container.destroyed) {
      const alias = container;
      if (alias.addEmitter) {
        alias.addEmitter({
          startCount: actualOptions.count,
          position: actualOptions.position,
          size: {
            width: 0,
            height: 0
          },
          rate: {
            delay: 0,
            quantity: 0
          },
          life: {
            duration: 0.1,
            count: 1
          },
          particles: {
            color: {
              value: actualOptions.colors
            },
            shape: {
              type: actualOptions.shapes,
              options: actualOptions.shapeOptions
            },
            size: {
              value: 5 * actualOptions.scalar
            },
            life: {
              duration: {
                value: actualOptions.ticks / 60
              }
            },
            move: {
              angle: {
                value: actualOptions.spread,
                offset: 0
              },
              drift: {
                min: -actualOptions.drift,
                max: actualOptions.drift
              },
              gravity: {
                acceleration: actualOptions.gravity * 9.81
              },
              speed: actualOptions.startVelocity * 3,
              decay: 1 - actualOptions.decay,
              direction: -actualOptions.angle
            }
          }
        });
        return;
      }
    }
  }
  const particlesOptions = {
    fullScreen: {
      enable: !params.canvas,
      zIndex: actualOptions.zIndex
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 0
      },
      color: {
        value: actualOptions.colors
      },
      shape: {
        type: actualOptions.shapes,
        options: actualOptions.shapeOptions
      },
      opacity: {
        value: {
          min: 0,
          max: 1
        },
        animation: {
          enable: true,
          speed: 0.5,
          startValue: "max",
          destroy: "min"
        }
      },
      size: {
        value: 5 * actualOptions.scalar
      },
      links: {
        enable: false
      },
      life: {
        duration: {
          sync: true,
          value: actualOptions.ticks / 60
        },
        count: 1
      },
      move: {
        angle: {
          value: actualOptions.spread,
          offset: 0
        },
        drift: {
          min: -actualOptions.drift,
          max: actualOptions.drift
        },
        enable: true,
        gravity: {
          enable: true,
          acceleration: actualOptions.gravity * 9.81
        },
        speed: actualOptions.startVelocity * 3,
        decay: 1 - actualOptions.decay,
        direction: -actualOptions.angle,
        random: true,
        straight: false,
        outModes: {
          default: "none",
          bottom: "destroy"
        }
      },
      rotate: {
        value: {
          min: 0,
          max: 360
        },
        direction: "random",
        animation: {
          enable: true,
          speed: 60
        }
      },
      tilt: {
        direction: "random",
        enable: true,
        value: {
          min: 0,
          max: 360
        },
        animation: {
          enable: true,
          speed: 60
        }
      },
      roll: {
        darken: {
          enable: true,
          value: 25
        },
        enable: true,
        speed: {
          min: 15,
          max: 25
        }
      },
      wobble: {
        distance: 30,
        enable: true,
        speed: {
          min: -15,
          max: 15
        }
      }
    },
    detectRetina: true,
    motion: {
      disable: actualOptions.disableForReducedMotion
    },
    emitters: {
      name: "confetti",
      startCount: actualOptions.count,
      position: actualOptions.position,
      size: {
        width: 0,
        height: 0
      },
      rate: {
        delay: 0,
        quantity: 0
      },
      life: {
        duration: 0.1,
        count: 1
      }
    }
  };
  if (params.id) {
    container = await external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles.load(params.id, particlesOptions);
  } else if (params.canvas) {
    container = await external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles.set(params.id, params.canvas, particlesOptions);
  }
  ids.set(params.id, container);
  return container;
}
async function confetti(idOrOptions, confettiOptions) {
  await initPlugins();
  let options;
  let id;
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = confettiOptions !== null && confettiOptions !== void 0 ? confettiOptions : {};
  } else {
    id = "confetti";
    options = idOrOptions;
  }
  return setConfetti({
    id,
    options
  });
}
confetti.create = async (canvas, options) => {
  if (!canvas) {
    return confetti;
  }
  await initPlugins();
  const id = canvas.getAttribute("id") || "confetti";
  canvas.setAttribute("id", id);
  return async (idOrOptions, confettiOptions) => {
    let subOptions;
    let subId;
    if (typeof idOrOptions === "string") {
      subId = idOrOptions;
      subOptions = confettiOptions !== null && confettiOptions !== void 0 ? confettiOptions : options;
    } else {
      subId = id;
      subOptions = idOrOptions;
    }
    return setConfetti({
      id: subId,
      canvas,
      options: subOptions
    });
  };
};
;// CONCATENATED MODULE: ./dist/browser/index.js

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});