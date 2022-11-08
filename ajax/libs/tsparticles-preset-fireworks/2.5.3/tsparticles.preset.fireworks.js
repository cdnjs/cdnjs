/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.5.3
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-updater-angle"), require("tsparticles-move-base"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-updater-destroy"), require("tsparticles-plugin-emitters"), require("tsparticles-updater-life"), require("tsparticles-shape-line"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-size"), require("tsparticles-updater-stroke-color"), require("tsparticles-engine"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-updater-angle", "tsparticles-move-base", "tsparticles-shape-circle", "tsparticles-updater-color", "tsparticles-updater-destroy", "tsparticles-plugin-emitters", "tsparticles-updater-life", "tsparticles-shape-line", "tsparticles-updater-opacity", "tsparticles-updater-out-modes", "tsparticles-updater-size", "tsparticles-updater-stroke-color", "tsparticles-engine"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-updater-angle"), require("tsparticles-move-base"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-updater-destroy"), require("tsparticles-plugin-emitters"), require("tsparticles-updater-life"), require("tsparticles-shape-line"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-size"), require("tsparticles-updater-stroke-color"), require("tsparticles-engine")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__490__, __WEBPACK_EXTERNAL_MODULE__565__, __WEBPACK_EXTERNAL_MODULE__851__, __WEBPACK_EXTERNAL_MODULE__613__, __WEBPACK_EXTERNAL_MODULE__731__, __WEBPACK_EXTERNAL_MODULE__716__, __WEBPACK_EXTERNAL_MODULE__86__, __WEBPACK_EXTERNAL_MODULE__598__, __WEBPACK_EXTERNAL_MODULE__515__, __WEBPACK_EXTERNAL_MODULE__509__, __WEBPACK_EXTERNAL_MODULE__694__, __WEBPACK_EXTERNAL_MODULE__226__, __WEBPACK_EXTERNAL_MODULE__961__) => {
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

/***/ 851:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__851__;

/***/ }),

/***/ 598:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__598__;

/***/ }),

/***/ 490:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__490__;

/***/ }),

/***/ 613:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__613__;

/***/ }),

/***/ 731:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__731__;

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

/***/ 694:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__694__;

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
  "loadFireworksPreset": () => (/* binding */ loadFireworksPreset)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-angle","commonjs2":"tsparticles-updater-angle","amd":"tsparticles-updater-angle","root":"window"}
var external_commonjs_tsparticles_updater_angle_commonjs2_tsparticles_updater_angle_amd_tsparticles_updater_angle_root_window_ = __webpack_require__(490);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-move-base","commonjs2":"tsparticles-move-base","amd":"tsparticles-move-base","root":"window"}
var external_commonjs_tsparticles_move_base_commonjs2_tsparticles_move_base_amd_tsparticles_move_base_root_window_ = __webpack_require__(565);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-shape-circle","commonjs2":"tsparticles-shape-circle","amd":"tsparticles-shape-circle","root":"window"}
var external_commonjs_tsparticles_shape_circle_commonjs2_tsparticles_shape_circle_amd_tsparticles_shape_circle_root_window_ = __webpack_require__(851);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-color","commonjs2":"tsparticles-updater-color","amd":"tsparticles-updater-color","root":"window"}
var external_commonjs_tsparticles_updater_color_commonjs2_tsparticles_updater_color_amd_tsparticles_updater_color_root_window_ = __webpack_require__(613);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-destroy","commonjs2":"tsparticles-updater-destroy","amd":"tsparticles-updater-destroy","root":"window"}
var external_commonjs_tsparticles_updater_destroy_commonjs2_tsparticles_updater_destroy_amd_tsparticles_updater_destroy_root_window_ = __webpack_require__(731);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-plugin-emitters","commonjs2":"tsparticles-plugin-emitters","amd":"tsparticles-plugin-emitters","root":"window"}
var external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_ = __webpack_require__(716);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-life","commonjs2":"tsparticles-updater-life","amd":"tsparticles-updater-life","root":"window"}
var external_commonjs_tsparticles_updater_life_commonjs2_tsparticles_updater_life_amd_tsparticles_updater_life_root_window_ = __webpack_require__(86);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-shape-line","commonjs2":"tsparticles-shape-line","amd":"tsparticles-shape-line","root":"window"}
var external_commonjs_tsparticles_shape_line_commonjs2_tsparticles_shape_line_amd_tsparticles_shape_line_root_window_ = __webpack_require__(598);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-opacity","commonjs2":"tsparticles-updater-opacity","amd":"tsparticles-updater-opacity","root":"window"}
var external_commonjs_tsparticles_updater_opacity_commonjs2_tsparticles_updater_opacity_amd_tsparticles_updater_opacity_root_window_ = __webpack_require__(515);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-out-modes","commonjs2":"tsparticles-updater-out-modes","amd":"tsparticles-updater-out-modes","root":"window"}
var external_commonjs_tsparticles_updater_out_modes_commonjs2_tsparticles_updater_out_modes_amd_tsparticles_updater_out_modes_root_window_ = __webpack_require__(509);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-size","commonjs2":"tsparticles-updater-size","amd":"tsparticles-updater-size","root":"window"}
var external_commonjs_tsparticles_updater_size_commonjs2_tsparticles_updater_size_amd_tsparticles_updater_size_root_window_ = __webpack_require__(694);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-stroke-color","commonjs2":"tsparticles-updater-stroke-color","amd":"tsparticles-updater-stroke-color","root":"window"}
var external_commonjs_tsparticles_updater_stroke_color_commonjs2_tsparticles_updater_stroke_color_amd_tsparticles_updater_stroke_color_root_window_ = __webpack_require__(226);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/options.js

const fixRange = (value, min, max) => {
  const diffSMax = value.max > max ? value.max - max : 0;
  let res = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(value);
  if (diffSMax) {
    res = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(value.min - diffSMax, max);
  }
  const diffSMin = value.min < min ? value.min : 0;
  if (diffSMin) {
    res = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(0, value.max + diffSMin);
  }
  return res;
};
const fireworksOptions = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"].map(color => {
  const rgb = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.stringToRgb)(color);
  if (!rgb) {
    return undefined;
  }
  const hsl = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.rgbToHsl)(rgb),
    sRange = fixRange({
      min: hsl.s - 20,
      max: hsl.s + 20
    }, 0, 100),
    lRange = fixRange({
      min: hsl.l - 20,
      max: hsl.l + 20
    }, 0, 100);
  return {
    color: {
      value: {
        h: hsl.h,
        s: sRange,
        l: lRange
      }
    },
    stroke: {
      width: 0
    },
    number: {
      value: 0
    },
    collisions: {
      enable: false
    },
    opacity: {
      value: {
        min: 0.1,
        max: 1
      },
      animation: {
        enable: true,
        speed: 0.7,
        sync: false,
        startValue: "max",
        destroy: "min"
      }
    },
    shape: {
      type: "circle"
    },
    size: {
      value: {
        min: 1,
        max: 2
      },
      animation: {
        enable: true,
        speed: 5,
        count: 1,
        sync: false,
        startValue: "min",
        destroy: "none"
      }
    },
    life: {
      count: 1,
      duration: {
        value: {
          min: 1,
          max: 2
        }
      }
    },
    move: {
      decay: 0.05,
      enable: true,
      gravity: {
        enable: true,
        inverse: false,
        acceleration: 5
      },
      speed: {
        min: 5,
        max: 10
      },
      direction: "none",
      outModes: "destroy"
    }
  };
}).filter(t => t !== undefined);
const options = {
  detectRetina: true,
  background: {
    color: "#000"
  },
  fpsLimit: 120,
  emitters: {
    direction: "top",
    life: {
      count: 0,
      duration: 0.1,
      delay: 0.1
    },
    rate: {
      delay: 0.15,
      quantity: 1
    },
    size: {
      width: 100,
      height: 0
    },
    position: {
      y: 100,
      x: 50
    }
  },
  particles: {
    number: {
      value: 0
    },
    destroy: {
      mode: "split",
      split: {
        count: 1,
        factor: {
          value: 0.333333
        },
        rate: {
          value: 100
        },
        particles: fireworksOptions
      }
    },
    life: {
      count: 1
    },
    shape: {
      type: "line"
    },
    size: {
      value: {
        min: 0.1,
        max: 50
      },
      animation: {
        enable: true,
        sync: true,
        speed: 90,
        startValue: "max",
        destroy: "min"
      }
    },
    stroke: {
      color: {
        value: "#ffffff"
      },
      width: 1
    },
    rotate: {
      path: true
    },
    move: {
      enable: true,
      gravity: {
        acceleration: 15,
        enable: true,
        inverse: true,
        maxSpeed: 100
      },
      speed: {
        min: 10,
        max: 20
      },
      outModes: {
        default: "destroy",
        top: "none"
      },
      trail: {
        fillColor: "#000",
        enable: true,
        length: 10
      }
    }
  }
};
;// CONCATENATED MODULE: ./dist/browser/index.js













async function loadFireworksPreset(engine) {
  await (0,external_commonjs_tsparticles_move_base_commonjs2_tsparticles_move_base_amd_tsparticles_move_base_root_window_.loadBaseMover)(engine);
  await (0,external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_.loadEmittersPlugin)(engine);
  await (0,external_commonjs_tsparticles_shape_circle_commonjs2_tsparticles_shape_circle_amd_tsparticles_shape_circle_root_window_.loadCircleShape)(engine);
  await (0,external_commonjs_tsparticles_shape_line_commonjs2_tsparticles_shape_line_amd_tsparticles_shape_line_root_window_.loadLineShape)(engine);
  await (0,external_commonjs_tsparticles_updater_angle_commonjs2_tsparticles_updater_angle_amd_tsparticles_updater_angle_root_window_.loadAngleUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_color_commonjs2_tsparticles_updater_color_amd_tsparticles_updater_color_root_window_.loadColorUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_destroy_commonjs2_tsparticles_updater_destroy_amd_tsparticles_updater_destroy_root_window_.loadDestroyUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_life_commonjs2_tsparticles_updater_life_amd_tsparticles_updater_life_root_window_.loadLifeUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_opacity_commonjs2_tsparticles_updater_opacity_amd_tsparticles_updater_opacity_root_window_.loadOpacityUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_out_modes_commonjs2_tsparticles_updater_out_modes_amd_tsparticles_updater_out_modes_root_window_.loadOutModesUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_size_commonjs2_tsparticles_updater_size_amd_tsparticles_updater_size_root_window_.loadSizeUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_stroke_color_commonjs2_tsparticles_updater_stroke_color_amd_tsparticles_updater_stroke_color_root_window_.loadStrokeColorUpdater)(engine);
  await engine.addPreset("fireworks", options);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});