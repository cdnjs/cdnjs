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
		module.exports = factory(require("tsparticles-basic"), require("tsparticles-interaction-external-trail"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-basic", "tsparticles-interaction-external-trail"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-basic"), require("tsparticles-interaction-external-trail")) : factory(root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__477__, __WEBPACK_EXTERNAL_MODULE__955__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 477:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__477__;

/***/ }),

/***/ 955:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__955__;

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
  loadFireflyPreset: () => (/* binding */ loadFireflyPreset)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-basic","commonjs2":"tsparticles-basic","amd":"tsparticles-basic","root":"window"}
var external_commonjs_tsparticles_basic_commonjs2_tsparticles_basic_amd_tsparticles_basic_root_window_ = __webpack_require__(477);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-interaction-external-trail","commonjs2":"tsparticles-interaction-external-trail","amd":"tsparticles-interaction-external-trail","root":"window"}
var external_commonjs_tsparticles_interaction_external_trail_commonjs2_tsparticles_interaction_external_trail_amd_tsparticles_interaction_external_trail_root_window_ = __webpack_require__(955);
;// CONCATENATED MODULE: ./dist/browser/options.js
const options = {
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  fpsLimit: 120,
  particles: {
    number: {
      value: 0
    },
    color: {
      value: "#fff"
    },
    life: {
      duration: {
        value: 5,
        sync: false
      },
      count: 1
    },
    opacity: {
      value: {
        min: 0.1,
        max: 1
      },
      animation: {
        enable: true,
        speed: 3
      }
    },
    size: {
      value: {
        min: 3,
        max: 6
      }
    },
    move: {
      enable: true,
      speed: 3,
      random: false,
      size: true
    }
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "trail"
      },
      resize: true
    },
    modes: {
      trail: {
        delay: 0.5,
        pauseOnStop: true,
        quantity: 4
      }
    }
  },
  background: {
    color: "#000"
  }
};
;// CONCATENATED MODULE: ./dist/browser/index.js



async function loadFireflyPreset(engine, refresh = true) {
  await (0,external_commonjs_tsparticles_basic_commonjs2_tsparticles_basic_amd_tsparticles_basic_root_window_.loadBasic)(engine, false);
  await (0,external_commonjs_tsparticles_interaction_external_trail_commonjs2_tsparticles_interaction_external_trail_amd_tsparticles_interaction_external_trail_root_window_.loadExternalTrailInteraction)(engine, false);
  await engine.addPreset("firefly", options, refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});