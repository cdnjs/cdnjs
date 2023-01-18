/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.8.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-engine"), require("tsparticles-updater-angle"), require("tsparticles-move-base"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-plugin-emitters"), require("tsparticles-updater-life"), require("tsparticles-plugin-motion"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-roll"), require("tsparticles-updater-size"), require("tsparticles-shape-square"), require("tsparticles-updater-tilt"), require("tsparticles-updater-wobble"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-engine", "tsparticles-updater-angle", "tsparticles-move-base", "tsparticles-shape-circle", "tsparticles-updater-color", "tsparticles-plugin-emitters", "tsparticles-updater-life", "tsparticles-plugin-motion", "tsparticles-updater-opacity", "tsparticles-updater-out-modes", "tsparticles-updater-roll", "tsparticles-updater-size", "tsparticles-shape-square", "tsparticles-updater-tilt", "tsparticles-updater-wobble"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-engine"), require("tsparticles-updater-angle"), require("tsparticles-move-base"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-plugin-emitters"), require("tsparticles-updater-life"), require("tsparticles-plugin-motion"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-roll"), require("tsparticles-updater-size"), require("tsparticles-shape-square"), require("tsparticles-updater-tilt"), require("tsparticles-updater-wobble")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__961__, __WEBPACK_EXTERNAL_MODULE__490__, __WEBPACK_EXTERNAL_MODULE__565__, __WEBPACK_EXTERNAL_MODULE__851__, __WEBPACK_EXTERNAL_MODULE__613__, __WEBPACK_EXTERNAL_MODULE__716__, __WEBPACK_EXTERNAL_MODULE__86__, __WEBPACK_EXTERNAL_MODULE__255__, __WEBPACK_EXTERNAL_MODULE__515__, __WEBPACK_EXTERNAL_MODULE__509__, __WEBPACK_EXTERNAL_MODULE__852__, __WEBPACK_EXTERNAL_MODULE__694__, __WEBPACK_EXTERNAL_MODULE__860__, __WEBPACK_EXTERNAL_MODULE__95__, __WEBPACK_EXTERNAL_MODULE__585__) => {
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

/***/ 851:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__851__;

/***/ }),

/***/ 860:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__860__;

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
  "confetti": () => (/* binding */ confetti),
  "loadConfettiPreset": () => (/* binding */ loadConfettiPreset)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-angle","commonjs2":"tsparticles-updater-angle","amd":"tsparticles-updater-angle","root":"window"}
var external_commonjs_tsparticles_updater_angle_commonjs2_tsparticles_updater_angle_amd_tsparticles_updater_angle_root_window_ = __webpack_require__(490);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-move-base","commonjs2":"tsparticles-move-base","amd":"tsparticles-move-base","root":"window"}
var external_commonjs_tsparticles_move_base_commonjs2_tsparticles_move_base_amd_tsparticles_move_base_root_window_ = __webpack_require__(565);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-shape-circle","commonjs2":"tsparticles-shape-circle","amd":"tsparticles-shape-circle","root":"window"}
var external_commonjs_tsparticles_shape_circle_commonjs2_tsparticles_shape_circle_amd_tsparticles_shape_circle_root_window_ = __webpack_require__(851);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-color","commonjs2":"tsparticles-updater-color","amd":"tsparticles-updater-color","root":"window"}
var external_commonjs_tsparticles_updater_color_commonjs2_tsparticles_updater_color_amd_tsparticles_updater_color_root_window_ = __webpack_require__(613);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-plugin-emitters","commonjs2":"tsparticles-plugin-emitters","amd":"tsparticles-plugin-emitters","root":"window"}
var external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_ = __webpack_require__(716);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-life","commonjs2":"tsparticles-updater-life","amd":"tsparticles-updater-life","root":"window"}
var external_commonjs_tsparticles_updater_life_commonjs2_tsparticles_updater_life_amd_tsparticles_updater_life_root_window_ = __webpack_require__(86);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-plugin-motion","commonjs2":"tsparticles-plugin-motion","amd":"tsparticles-plugin-motion","root":"window"}
var external_commonjs_tsparticles_plugin_motion_commonjs2_tsparticles_plugin_motion_amd_tsparticles_plugin_motion_root_window_ = __webpack_require__(255);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-opacity","commonjs2":"tsparticles-updater-opacity","amd":"tsparticles-updater-opacity","root":"window"}
var external_commonjs_tsparticles_updater_opacity_commonjs2_tsparticles_updater_opacity_amd_tsparticles_updater_opacity_root_window_ = __webpack_require__(515);
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
    this.colors = ["#ffffff", "#ff0000"];
    this.shapes = ["square", "circle"];
    this.scalar = 1;
    this.zIndex = 100;
    this.disableForReducedMotion = true;
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
    const position = (_b = data.position) !== null && _b !== void 0 ? _b : this.position;
    if ((position === null || position === void 0 ? void 0 : position.x) !== undefined) {
      this.position.x = position.x;
    }
    if ((position === null || position === void 0 ? void 0 : position.y) !== undefined) {
      this.position.y = position.y;
    }
    if (data.colors !== undefined) {
      if (data.colors instanceof Array) {
        this.colors = [...data.colors];
      } else {
        this.colors = data.colors;
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
;// CONCATENATED MODULE: ./dist/browser/options.js

const loadOptions = confettiOptions => {
  const actualOptions = new ConfettiOptions();
  actualOptions.load(confettiOptions);
  return {
    fullScreen: {
      enable: true,
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
        type: actualOptions.shapes
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
        speed: actualOptions.startVelocity,
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
};
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-out-modes","commonjs2":"tsparticles-updater-out-modes","amd":"tsparticles-updater-out-modes","root":"window"}
var external_commonjs_tsparticles_updater_out_modes_commonjs2_tsparticles_updater_out_modes_amd_tsparticles_updater_out_modes_root_window_ = __webpack_require__(509);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-roll","commonjs2":"tsparticles-updater-roll","amd":"tsparticles-updater-roll","root":"window"}
var external_commonjs_tsparticles_updater_roll_commonjs2_tsparticles_updater_roll_amd_tsparticles_updater_roll_root_window_ = __webpack_require__(852);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-size","commonjs2":"tsparticles-updater-size","amd":"tsparticles-updater-size","root":"window"}
var external_commonjs_tsparticles_updater_size_commonjs2_tsparticles_updater_size_amd_tsparticles_updater_size_root_window_ = __webpack_require__(694);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-shape-square","commonjs2":"tsparticles-shape-square","amd":"tsparticles-shape-square","root":"window"}
var external_commonjs_tsparticles_shape_square_commonjs2_tsparticles_shape_square_amd_tsparticles_shape_square_root_window_ = __webpack_require__(860);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-tilt","commonjs2":"tsparticles-updater-tilt","amd":"tsparticles-updater-tilt","root":"window"}
var external_commonjs_tsparticles_updater_tilt_commonjs2_tsparticles_updater_tilt_amd_tsparticles_updater_tilt_root_window_ = __webpack_require__(95);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-wobble","commonjs2":"tsparticles-updater-wobble","amd":"tsparticles-updater-wobble","root":"window"}
var external_commonjs_tsparticles_updater_wobble_commonjs2_tsparticles_updater_wobble_amd_tsparticles_updater_wobble_root_window_ = __webpack_require__(585);
;// CONCATENATED MODULE: ./dist/browser/index.js
















async function loadPreset(engine, confettiOptions, override = false) {
  await (0,external_commonjs_tsparticles_move_base_commonjs2_tsparticles_move_base_amd_tsparticles_move_base_root_window_.loadBaseMover)(engine);
  await (0,external_commonjs_tsparticles_shape_circle_commonjs2_tsparticles_shape_circle_amd_tsparticles_shape_circle_root_window_.loadCircleShape)(engine);
  await (0,external_commonjs_tsparticles_shape_square_commonjs2_tsparticles_shape_square_amd_tsparticles_shape_square_root_window_.loadSquareShape)(engine);
  await (0,external_commonjs_tsparticles_updater_color_commonjs2_tsparticles_updater_color_amd_tsparticles_updater_color_root_window_.loadColorUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_size_commonjs2_tsparticles_updater_size_amd_tsparticles_updater_size_root_window_.loadSizeUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_opacity_commonjs2_tsparticles_updater_opacity_amd_tsparticles_updater_opacity_root_window_.loadOpacityUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_out_modes_commonjs2_tsparticles_updater_out_modes_amd_tsparticles_updater_out_modes_root_window_.loadOutModesUpdater)(engine);
  await (0,external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_.loadEmittersPlugin)(engine);
  await (0,external_commonjs_tsparticles_plugin_motion_commonjs2_tsparticles_plugin_motion_amd_tsparticles_plugin_motion_root_window_.loadMotionPlugin)(engine);
  await (0,external_commonjs_tsparticles_updater_wobble_commonjs2_tsparticles_updater_wobble_amd_tsparticles_updater_wobble_root_window_.loadWobbleUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_roll_commonjs2_tsparticles_updater_roll_amd_tsparticles_updater_roll_root_window_.loadRollUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_angle_commonjs2_tsparticles_updater_angle_amd_tsparticles_updater_angle_root_window_.loadAngleUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_tilt_commonjs2_tsparticles_updater_tilt_amd_tsparticles_updater_tilt_root_window_.loadTiltUpdater)(engine);
  await (0,external_commonjs_tsparticles_updater_life_commonjs2_tsparticles_updater_life_amd_tsparticles_updater_life_root_window_.loadLifeUpdater)(engine);
  await engine.addPreset("confetti", loadOptions(confettiOptions), override);
}
async function loadConfettiPreset(main) {
  await loadPreset(main, {}, true);
}
async function confetti(idOrOptions, confettiOptions) {
  let options;
  let id;
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = confettiOptions !== null && confettiOptions !== void 0 ? confettiOptions : {};
  } else {
    id = `tsparticles_${Math.floor((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * 1000)}`;
    options = idOrOptions;
  }
  await loadPreset(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles, options, true);
  await external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles.load(id, {
    preset: "confetti"
  });
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});