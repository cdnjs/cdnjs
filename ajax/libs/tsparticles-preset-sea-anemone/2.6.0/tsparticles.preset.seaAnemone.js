/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.6.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-path-curves"), require("tsparticles-move-base"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-plugin-emitters"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-size"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-path-curves", "tsparticles-move-base", "tsparticles-shape-circle", "tsparticles-updater-color", "tsparticles-plugin-emitters", "tsparticles-updater-opacity", "tsparticles-updater-out-modes", "tsparticles-updater-size"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-path-curves"), require("tsparticles-move-base"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-plugin-emitters"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-size")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__432__, __WEBPACK_EXTERNAL_MODULE__565__, __WEBPACK_EXTERNAL_MODULE__851__, __WEBPACK_EXTERNAL_MODULE__613__, __WEBPACK_EXTERNAL_MODULE__716__, __WEBPACK_EXTERNAL_MODULE__515__, __WEBPACK_EXTERNAL_MODULE__509__, __WEBPACK_EXTERNAL_MODULE__694__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 565:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__565__;

/***/ }),

/***/ 432:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__432__;

/***/ }),

/***/ 716:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__716__;

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
  "loadSeaAnemonePreset": () => (/* binding */ loadSeaAnemonePreset)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-path-curves","commonjs2":"tsparticles-path-curves","amd":"tsparticles-path-curves","root":"window"}
var external_commonjs_tsparticles_path_curves_commonjs2_tsparticles_path_curves_amd_tsparticles_path_curves_root_window_ = __webpack_require__(432);
;// CONCATENATED MODULE: ./dist/browser/options.js

const presetName = "seaAnemone";
const options = {
  fpsLimit: 120,
  particles: {
    color: {
      value: "#FF0000"
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "destroy"
      },
      path: {
        clamp: false,
        enable: true,
        delay: {
          value: 0
        },
        generator: external_commonjs_tsparticles_path_curves_commonjs2_tsparticles_path_curves_amd_tsparticles_path_curves_root_window_.curvesPathName
      },
      random: false,
      speed: 2,
      straight: false,
      trail: {
        fillColor: "#000",
        length: 30,
        enable: true
      }
    },
    number: {
      value: 0,
      limit: 300
    },
    opacity: {
      value: 1
    },
    shape: {
      type: "circle"
    },
    size: {
      value: {
        min: 1,
        max: 10
      },
      animation: {
        count: 1,
        startValue: "min",
        enable: true,
        speed: 10,
        sync: true
      }
    }
  },
  background: {
    color: "#000"
  },
  detectRetina: true,
  emitters: {
    direction: "none",
    rate: {
      quantity: 10,
      delay: 0.3
    },
    size: {
      width: 0,
      height: 0,
      mode: "precise"
    },
    spawnColor: {
      value: "#ff0000",
      animation: {
        h: {
          enable: true,
          offset: {
            min: -1.4,
            max: 1.4
          },
          speed: 5,
          sync: false
        },
        l: {
          enable: true,
          offset: {
            min: 20,
            max: 80
          },
          speed: 0,
          sync: false
        }
      }
    },
    position: {
      x: 50,
      y: 50
    }
  }
};
// EXTERNAL MODULE: external {"commonjs":"tsparticles-move-base","commonjs2":"tsparticles-move-base","amd":"tsparticles-move-base","root":"window"}
var external_commonjs_tsparticles_move_base_commonjs2_tsparticles_move_base_amd_tsparticles_move_base_root_window_ = __webpack_require__(565);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-shape-circle","commonjs2":"tsparticles-shape-circle","amd":"tsparticles-shape-circle","root":"window"}
var external_commonjs_tsparticles_shape_circle_commonjs2_tsparticles_shape_circle_amd_tsparticles_shape_circle_root_window_ = __webpack_require__(851);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-color","commonjs2":"tsparticles-updater-color","amd":"tsparticles-updater-color","root":"window"}
var external_commonjs_tsparticles_updater_color_commonjs2_tsparticles_updater_color_amd_tsparticles_updater_color_root_window_ = __webpack_require__(613);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-plugin-emitters","commonjs2":"tsparticles-plugin-emitters","amd":"tsparticles-plugin-emitters","root":"window"}
var external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_ = __webpack_require__(716);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-opacity","commonjs2":"tsparticles-updater-opacity","amd":"tsparticles-updater-opacity","root":"window"}
var external_commonjs_tsparticles_updater_opacity_commonjs2_tsparticles_updater_opacity_amd_tsparticles_updater_opacity_root_window_ = __webpack_require__(515);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-out-modes","commonjs2":"tsparticles-updater-out-modes","amd":"tsparticles-updater-out-modes","root":"window"}
var external_commonjs_tsparticles_updater_out_modes_commonjs2_tsparticles_updater_out_modes_amd_tsparticles_updater_out_modes_root_window_ = __webpack_require__(509);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-size","commonjs2":"tsparticles-updater-size","amd":"tsparticles-updater-size","root":"window"}
var external_commonjs_tsparticles_updater_size_commonjs2_tsparticles_updater_size_amd_tsparticles_updater_size_root_window_ = __webpack_require__(694);
;// CONCATENATED MODULE: ./dist/browser/index.js









async function loadSeaAnemonePreset(engine) {
  await (0,external_commonjs_tsparticles_move_base_commonjs2_tsparticles_move_base_amd_tsparticles_move_base_root_window_.loadBaseMover)(engine);
  await (0,external_commonjs_tsparticles_shape_circle_commonjs2_tsparticles_shape_circle_amd_tsparticles_shape_circle_root_window_.loadCircleShape)(engine);
  await (0,external_commonjs_tsparticles_updater_color_commonjs2_tsparticles_updater_color_amd_tsparticles_updater_color_root_window_.loadColorUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_opacity_commonjs2_tsparticles_updater_opacity_amd_tsparticles_updater_opacity_root_window_.loadOpacityUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_out_modes_commonjs2_tsparticles_updater_out_modes_amd_tsparticles_updater_out_modes_root_window_.loadOutModesUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_size_commonjs2_tsparticles_updater_size_amd_tsparticles_updater_size_root_window_.loadSizeUpdater)(engine);
  await (0,external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_.loadEmittersPlugin)(engine);
  await (0,external_commonjs_tsparticles_path_curves_commonjs2_tsparticles_path_curves_amd_tsparticles_path_curves_root_window_.loadCurvesPath)(engine);
  await engine.addPreset(presetName, options);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});