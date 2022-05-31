/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.5
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-move-base"), require("tsparticles-plugin-emitters"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-size"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-move-base", "tsparticles-plugin-emitters", "tsparticles-shape-circle", "tsparticles-updater-color", "tsparticles-updater-opacity", "tsparticles-updater-out-modes", "tsparticles-updater-size"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-move-base"), require("tsparticles-plugin-emitters"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-size")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__919__, __WEBPACK_EXTERNAL_MODULE__949__, __WEBPACK_EXTERNAL_MODULE__941__, __WEBPACK_EXTERNAL_MODULE__841__, __WEBPACK_EXTERNAL_MODULE__838__, __WEBPACK_EXTERNAL_MODULE__364__, __WEBPACK_EXTERNAL_MODULE__328__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 153:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.loadBigCirclesPreset = void 0;

const tsparticles_move_base_1 = __webpack_require__(919);

const tsparticles_shape_circle_1 = __webpack_require__(941);

const tsparticles_updater_color_1 = __webpack_require__(841);

const tsparticles_plugin_emitters_1 = __webpack_require__(949);

const tsparticles_updater_opacity_1 = __webpack_require__(838);

const tsparticles_updater_out_modes_1 = __webpack_require__(364);

const tsparticles_updater_size_1 = __webpack_require__(328);

const options_1 = __webpack_require__(689);

function loadBigCirclesPreset(engine) {
  return __awaiter(this, void 0, void 0, function* () {
    yield (0, tsparticles_move_base_1.loadBaseMover)(engine);
    yield (0, tsparticles_shape_circle_1.loadCircleShape)(engine);
    yield (0, tsparticles_updater_color_1.loadColorUpdater)(engine);
    yield (0, tsparticles_updater_size_1.loadSizeUpdater)(engine);
    yield (0, tsparticles_updater_opacity_1.loadOpacityUpdater)(engine);
    yield (0, tsparticles_updater_out_modes_1.loadOutModesUpdater)(engine);
    yield (0, tsparticles_plugin_emitters_1.loadEmittersPlugin)(engine);
    yield engine.addPreset("bigCircles", options_1.options);
    yield engine.addPreset("big-circles", options_1.options);
  });
}

exports.loadBigCirclesPreset = loadBigCirclesPreset;

/***/ }),

/***/ 689:
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.options = void 0;
exports.options = {
  fpsLimit: 120,
  background: {
    color: "#fff"
  },
  particles: {
    number: {
      value: 50
    },
    color: {
      value: ["#3998D0", "#2EB6AF", "#A9BD33", "#FEC73B", "#F89930", "#F45623", "#D62E32", "#EB586E", "#9952CF"]
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5
    },
    size: {
      value: {
        min: 200,
        max: 400
      }
    },
    move: {
      enable: true,
      angle: {
        value: 30,
        offset: 0
      },
      speed: {
        min: 10,
        max: 20
      },
      direction: "top",
      outModes: {
        default: "destroy",
        bottom: "none"
      }
    }
  },
  detectRetina: true,
  emitters: {
    position: {
      x: 50,
      y: 150
    },
    rate: {
      delay: 0.2,
      quantity: 3
    },
    size: {
      width: 100,
      height: 50
    }
  }
};

/***/ }),

/***/ 919:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__919__;

/***/ }),

/***/ 949:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__949__;

/***/ }),

/***/ 941:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__941__;

/***/ }),

/***/ 841:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__841__;

/***/ }),

/***/ 838:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__838__;

/***/ }),

/***/ 364:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__364__;

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(153);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});