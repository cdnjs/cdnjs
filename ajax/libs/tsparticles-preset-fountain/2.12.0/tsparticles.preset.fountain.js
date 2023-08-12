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
		module.exports = factory(require("tsparticles-basic"), require("tsparticles-updater-destroy"), require("tsparticles-plugin-emitters"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-basic", "tsparticles-updater-destroy", "tsparticles-plugin-emitters"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-basic"), require("tsparticles-updater-destroy"), require("tsparticles-plugin-emitters")) : factory(root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__477__, __WEBPACK_EXTERNAL_MODULE__731__, __WEBPACK_EXTERNAL_MODULE__716__) => {
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

/***/ 731:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__731__;

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
  loadFountainPreset: () => (/* binding */ loadFountainPreset)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-basic","commonjs2":"tsparticles-basic","amd":"tsparticles-basic","root":"window"}
var external_commonjs_tsparticles_basic_commonjs2_tsparticles_basic_amd_tsparticles_basic_root_window_ = __webpack_require__(477);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-destroy","commonjs2":"tsparticles-updater-destroy","amd":"tsparticles-updater-destroy","root":"window"}
var external_commonjs_tsparticles_updater_destroy_commonjs2_tsparticles_updater_destroy_amd_tsparticles_updater_destroy_root_window_ = __webpack_require__(731);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-plugin-emitters","commonjs2":"tsparticles-plugin-emitters","amd":"tsparticles-plugin-emitters","root":"window"}
var external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_ = __webpack_require__(716);
;// CONCATENATED MODULE: ./dist/browser/options.js
const options = {
  fpsLimit: 120,
  particles: {
    bounce: {
      vertical: {
        value: {
          min: 0.75,
          max: 0.85
        }
      }
    },
    color: {
      value: ["#3998D0", "#2EB6AF", "#A9BD33", "#FEC73B", "#F89930", "#F45623", "#D62E32", "#EB586E", "#9952CF"]
    },
    number: {
      value: 0
    },
    destroy: {
      mode: "split",
      split: {
        count: 2,
        factor: {
          value: {
            min: 1.1,
            max: 2
          }
        },
        rate: {
          value: {
            min: 2,
            max: 3
          }
        }
      }
    },
    opacity: {
      value: 0.5
    },
    size: {
      value: {
        min: 10,
        max: 20
      }
    },
    move: {
      enable: true,
      gravity: {
        enable: true,
        maxSpeed: 50
      },
      speed: {
        min: 10,
        max: 20
      },
      direction: "none",
      random: false,
      straight: false,
      outModes: {
        bottom: "split",
        default: "bounce",
        top: "none"
      },
      trail: {
        enable: true,
        fillColor: "#fff",
        length: 3
      }
    }
  },
  detectRetina: true,
  background: {
    color: "#fff"
  },
  emitters: {
    direction: "top",
    life: {
      count: 0,
      duration: 0.15,
      delay: 3
    },
    rate: {
      delay: 0.1,
      quantity: 5
    },
    size: {
      width: 0,
      height: 0
    }
  }
};
;// CONCATENATED MODULE: ./dist/browser/index.js




async function loadFountainPreset(engine, refresh = true) {
  await (0,external_commonjs_tsparticles_basic_commonjs2_tsparticles_basic_amd_tsparticles_basic_root_window_.loadBasic)(engine, false);
  await (0,external_commonjs_tsparticles_updater_destroy_commonjs2_tsparticles_updater_destroy_amd_tsparticles_updater_destroy_root_window_.loadDestroyUpdater)(engine, false);
  await (0,external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_.loadEmittersPlugin)(engine, false);
  await engine.addPreset("fountain", options, refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});