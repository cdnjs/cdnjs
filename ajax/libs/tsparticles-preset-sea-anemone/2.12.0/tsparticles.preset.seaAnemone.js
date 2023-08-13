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
		module.exports = factory(require("tsparticles-path-curves"), require("tsparticles-basic"), require("tsparticles-plugin-emitters"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-path-curves", "tsparticles-basic", "tsparticles-plugin-emitters"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-path-curves"), require("tsparticles-basic"), require("tsparticles-plugin-emitters")) : factory(root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__432__, __WEBPACK_EXTERNAL_MODULE__477__, __WEBPACK_EXTERNAL_MODULE__716__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 477:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__477__;

/***/ }),

/***/ 432:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__432__;

/***/ }),

/***/ 716:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__716__;

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
  loadSeaAnemonePreset: () => (/* binding */ loadSeaAnemonePreset)
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
// EXTERNAL MODULE: external {"commonjs":"tsparticles-basic","commonjs2":"tsparticles-basic","amd":"tsparticles-basic","root":"window"}
var external_commonjs_tsparticles_basic_commonjs2_tsparticles_basic_amd_tsparticles_basic_root_window_ = __webpack_require__(477);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-plugin-emitters","commonjs2":"tsparticles-plugin-emitters","amd":"tsparticles-plugin-emitters","root":"window"}
var external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_ = __webpack_require__(716);
;// CONCATENATED MODULE: ./dist/browser/index.js




async function loadSeaAnemonePreset(engine, refresh = true) {
  await (0,external_commonjs_tsparticles_basic_commonjs2_tsparticles_basic_amd_tsparticles_basic_root_window_.loadBasic)(engine, false);
  await (0,external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_.loadEmittersPlugin)(engine, false);
  await (0,external_commonjs_tsparticles_path_curves_commonjs2_tsparticles_path_curves_amd_tsparticles_path_curves_root_window_.loadCurvesPath)(engine, false);
  await engine.addPreset(presetName, options, refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});