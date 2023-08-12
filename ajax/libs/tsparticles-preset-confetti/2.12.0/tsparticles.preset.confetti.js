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
		module.exports = factory(require("tsparticles-basic"), require("tsparticles-plugin-emitters"), require("tsparticles-updater-life"), require("tsparticles-plugin-motion"), require("tsparticles-updater-roll"), require("tsparticles-updater-rotate"), require("tsparticles-shape-square"), require("tsparticles-updater-tilt"), require("tsparticles-updater-wobble"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-basic", "tsparticles-plugin-emitters", "tsparticles-updater-life", "tsparticles-plugin-motion", "tsparticles-updater-roll", "tsparticles-updater-rotate", "tsparticles-shape-square", "tsparticles-updater-tilt", "tsparticles-updater-wobble"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-basic"), require("tsparticles-plugin-emitters"), require("tsparticles-updater-life"), require("tsparticles-plugin-motion"), require("tsparticles-updater-roll"), require("tsparticles-updater-rotate"), require("tsparticles-shape-square"), require("tsparticles-updater-tilt"), require("tsparticles-updater-wobble")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__477__, __WEBPACK_EXTERNAL_MODULE__716__, __WEBPACK_EXTERNAL_MODULE__86__, __WEBPACK_EXTERNAL_MODULE__255__, __WEBPACK_EXTERNAL_MODULE__852__, __WEBPACK_EXTERNAL_MODULE__389__, __WEBPACK_EXTERNAL_MODULE__860__, __WEBPACK_EXTERNAL_MODULE__95__, __WEBPACK_EXTERNAL_MODULE__585__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 477:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__477__;

/***/ }),

/***/ 716:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__716__;

/***/ }),

/***/ 255:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__255__;

/***/ }),

/***/ 860:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__860__;

/***/ }),

/***/ 86:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__86__;

/***/ }),

/***/ 852:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__852__;

/***/ }),

/***/ 389:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__389__;

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
  loadConfettiPreset: () => (/* binding */ loadConfettiPreset)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-basic","commonjs2":"tsparticles-basic","amd":"tsparticles-basic","root":"window"}
var external_commonjs_tsparticles_basic_commonjs2_tsparticles_basic_amd_tsparticles_basic_root_window_ = __webpack_require__(477);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-plugin-emitters","commonjs2":"tsparticles-plugin-emitters","amd":"tsparticles-plugin-emitters","root":"window"}
var external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_ = __webpack_require__(716);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-life","commonjs2":"tsparticles-updater-life","amd":"tsparticles-updater-life","root":"window"}
var external_commonjs_tsparticles_updater_life_commonjs2_tsparticles_updater_life_amd_tsparticles_updater_life_root_window_ = __webpack_require__(86);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-plugin-motion","commonjs2":"tsparticles-plugin-motion","amd":"tsparticles-plugin-motion","root":"window"}
var external_commonjs_tsparticles_plugin_motion_commonjs2_tsparticles_plugin_motion_amd_tsparticles_plugin_motion_root_window_ = __webpack_require__(255);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-roll","commonjs2":"tsparticles-updater-roll","amd":"tsparticles-updater-roll","root":"window"}
var external_commonjs_tsparticles_updater_roll_commonjs2_tsparticles_updater_roll_amd_tsparticles_updater_roll_root_window_ = __webpack_require__(852);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-rotate","commonjs2":"tsparticles-updater-rotate","amd":"tsparticles-updater-rotate","root":"window"}
var external_commonjs_tsparticles_updater_rotate_commonjs2_tsparticles_updater_rotate_amd_tsparticles_updater_rotate_root_window_ = __webpack_require__(389);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-shape-square","commonjs2":"tsparticles-shape-square","amd":"tsparticles-shape-square","root":"window"}
var external_commonjs_tsparticles_shape_square_commonjs2_tsparticles_shape_square_amd_tsparticles_shape_square_root_window_ = __webpack_require__(860);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-tilt","commonjs2":"tsparticles-updater-tilt","amd":"tsparticles-updater-tilt","root":"window"}
var external_commonjs_tsparticles_updater_tilt_commonjs2_tsparticles_updater_tilt_amd_tsparticles_updater_tilt_root_window_ = __webpack_require__(95);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-wobble","commonjs2":"tsparticles-updater-wobble","amd":"tsparticles-updater-wobble","root":"window"}
var external_commonjs_tsparticles_updater_wobble_commonjs2_tsparticles_updater_wobble_amd_tsparticles_updater_wobble_root_window_ = __webpack_require__(585);
;// CONCATENATED MODULE: ./dist/browser/options.js
const options = {
  fullScreen: {
    enable: true,
    zIndex: 100
  },
  fpsLimit: 120,
  particles: {
    number: {
      value: 0
    },
    color: {
      value: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"]
    },
    shape: {
      type: ["square", "circle"]
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
      value: 5
    },
    links: {
      enable: false
    },
    life: {
      duration: {
        sync: true,
        value: 20 / 6
      },
      count: 1
    },
    move: {
      angle: {
        value: 45,
        offset: 0
      },
      drift: 0,
      enable: true,
      gravity: {
        enable: true,
        acceleration: 9.81
      },
      speed: 45,
      decay: 0.1,
      direction: -90,
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
    disable: true
  },
  emitters: {
    name: "confetti",
    startCount: 50,
    position: {
      x: 50,
      y: 50
    },
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
;// CONCATENATED MODULE: ./dist/browser/index.js










async function loadPreset(engine, refresh = true) {
  await (0,external_commonjs_tsparticles_basic_commonjs2_tsparticles_basic_amd_tsparticles_basic_root_window_.loadBasic)(engine, false);
  await (0,external_commonjs_tsparticles_shape_square_commonjs2_tsparticles_shape_square_amd_tsparticles_shape_square_root_window_.loadSquareShape)(engine, false);
  await (0,external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_.loadEmittersPlugin)(engine, false);
  await (0,external_commonjs_tsparticles_plugin_motion_commonjs2_tsparticles_plugin_motion_amd_tsparticles_plugin_motion_root_window_.loadMotionPlugin)(engine, false);
  await (0,external_commonjs_tsparticles_updater_wobble_commonjs2_tsparticles_updater_wobble_amd_tsparticles_updater_wobble_root_window_.loadWobbleUpdater)(engine, false);
  await (0,external_commonjs_tsparticles_updater_roll_commonjs2_tsparticles_updater_roll_amd_tsparticles_updater_roll_root_window_.loadRollUpdater)(engine, false);
  await (0,external_commonjs_tsparticles_updater_rotate_commonjs2_tsparticles_updater_rotate_amd_tsparticles_updater_rotate_root_window_.loadRotateUpdater)(engine, false);
  await (0,external_commonjs_tsparticles_updater_tilt_commonjs2_tsparticles_updater_tilt_amd_tsparticles_updater_tilt_root_window_.loadTiltUpdater)(engine, false);
  await (0,external_commonjs_tsparticles_updater_life_commonjs2_tsparticles_updater_life_amd_tsparticles_updater_life_root_window_.loadLifeUpdater)(engine, false);
  await engine.addPreset("confetti", options, refresh);
}
async function loadConfettiPreset(engine) {
  await loadPreset(engine);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});