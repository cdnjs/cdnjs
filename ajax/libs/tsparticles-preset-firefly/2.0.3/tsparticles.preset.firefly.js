/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.3
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-move-base"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-interaction-external-trail"), require("tsparticles-updater-life"), require("tsparticles-updater-opacity"), require("tsparticles-updater-size"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-move-base", "tsparticles-shape-circle", "tsparticles-updater-color", "tsparticles-interaction-external-trail", "tsparticles-updater-life", "tsparticles-updater-opacity", "tsparticles-updater-size"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-move-base"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-interaction-external-trail"), require("tsparticles-updater-life"), require("tsparticles-updater-opacity"), require("tsparticles-updater-size")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__919__, __WEBPACK_EXTERNAL_MODULE__941__, __WEBPACK_EXTERNAL_MODULE__841__, __WEBPACK_EXTERNAL_MODULE__165__, __WEBPACK_EXTERNAL_MODULE__489__, __WEBPACK_EXTERNAL_MODULE__838__, __WEBPACK_EXTERNAL_MODULE__328__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 165:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__165__;

/***/ }),

/***/ 919:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__919__;

/***/ }),

/***/ 941:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__941__;

/***/ }),

/***/ 841:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__841__;

/***/ }),

/***/ 489:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__489__;

/***/ }),

/***/ 838:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__838__;

/***/ }),

/***/ 328:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__328__;

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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "loadFireflyPreset": function() { return /* binding */ loadFireflyPreset; }
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-move-base","commonjs2":"tsparticles-move-base","amd":"tsparticles-move-base","root":"window"}
var external_commonjs_tsparticles_move_base_commonjs2_tsparticles_move_base_amd_tsparticles_move_base_root_window_ = __webpack_require__(919);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-shape-circle","commonjs2":"tsparticles-shape-circle","amd":"tsparticles-shape-circle","root":"window"}
var external_commonjs_tsparticles_shape_circle_commonjs2_tsparticles_shape_circle_amd_tsparticles_shape_circle_root_window_ = __webpack_require__(941);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-color","commonjs2":"tsparticles-updater-color","amd":"tsparticles-updater-color","root":"window"}
var external_commonjs_tsparticles_updater_color_commonjs2_tsparticles_updater_color_amd_tsparticles_updater_color_root_window_ = __webpack_require__(841);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-interaction-external-trail","commonjs2":"tsparticles-interaction-external-trail","amd":"tsparticles-interaction-external-trail","root":"window"}
var external_commonjs_tsparticles_interaction_external_trail_commonjs2_tsparticles_interaction_external_trail_amd_tsparticles_interaction_external_trail_root_window_ = __webpack_require__(165);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-life","commonjs2":"tsparticles-updater-life","amd":"tsparticles-updater-life","root":"window"}
var external_commonjs_tsparticles_updater_life_commonjs2_tsparticles_updater_life_amd_tsparticles_updater_life_root_window_ = __webpack_require__(489);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-opacity","commonjs2":"tsparticles-updater-opacity","amd":"tsparticles-updater-opacity","root":"window"}
var external_commonjs_tsparticles_updater_opacity_commonjs2_tsparticles_updater_opacity_amd_tsparticles_updater_opacity_root_window_ = __webpack_require__(838);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-size","commonjs2":"tsparticles-updater-size","amd":"tsparticles-updater-size","root":"window"}
var external_commonjs_tsparticles_updater_size_commonjs2_tsparticles_updater_size_amd_tsparticles_updater_size_root_window_ = __webpack_require__(328);
;// CONCATENATED MODULE: ./dist/options.js
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
;// CONCATENATED MODULE: ./dist/index.js
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









function loadFireflyPreset(engine) {
  return __awaiter(this, void 0, void 0, function* () {
    yield (0,external_commonjs_tsparticles_move_base_commonjs2_tsparticles_move_base_amd_tsparticles_move_base_root_window_.loadBaseMover)(engine);
    yield (0,external_commonjs_tsparticles_interaction_external_trail_commonjs2_tsparticles_interaction_external_trail_amd_tsparticles_interaction_external_trail_root_window_.loadExternalTrailInteraction)(engine);
    yield (0,external_commonjs_tsparticles_shape_circle_commonjs2_tsparticles_shape_circle_amd_tsparticles_shape_circle_root_window_.loadCircleShape)(engine);
    yield (0,external_commonjs_tsparticles_updater_color_commonjs2_tsparticles_updater_color_amd_tsparticles_updater_color_root_window_.loadColorUpdater)(engine);
    yield (0,external_commonjs_tsparticles_updater_life_commonjs2_tsparticles_updater_life_amd_tsparticles_updater_life_root_window_.loadLifeUpdater)(engine);
    yield (0,external_commonjs_tsparticles_updater_opacity_commonjs2_tsparticles_updater_opacity_amd_tsparticles_updater_opacity_root_window_.loadOpacityUpdater)(engine);
    yield (0,external_commonjs_tsparticles_updater_size_commonjs2_tsparticles_updater_size_amd_tsparticles_updater_size_root_window_.loadSizeUpdater)(engine);
    yield engine.addPreset("firefly", options);
  });
}
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});