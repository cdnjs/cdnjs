/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.11.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-move-base"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-plugin-emitters"), require("tsparticles-updater-life"), require("tsparticles-plugin-motion"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-roll"), require("tsparticles-updater-size"), require("tsparticles-shape-square"), require("tsparticles-updater-tilt"), require("tsparticles-updater-wobble"), require("tsparticles-engine"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-move-base", "tsparticles-shape-circle", "tsparticles-updater-color", "tsparticles-plugin-emitters", "tsparticles-updater-life", "tsparticles-plugin-motion", "tsparticles-updater-opacity", "tsparticles-updater-out-modes", "tsparticles-updater-roll", "tsparticles-updater-size", "tsparticles-shape-square", "tsparticles-updater-tilt", "tsparticles-updater-wobble", "tsparticles-engine"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-move-base"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-plugin-emitters"), require("tsparticles-updater-life"), require("tsparticles-plugin-motion"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-roll"), require("tsparticles-updater-size"), require("tsparticles-shape-square"), require("tsparticles-updater-tilt"), require("tsparticles-updater-wobble"), require("tsparticles-engine")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__565__, __WEBPACK_EXTERNAL_MODULE__851__, __WEBPACK_EXTERNAL_MODULE__613__, __WEBPACK_EXTERNAL_MODULE__716__, __WEBPACK_EXTERNAL_MODULE__86__, __WEBPACK_EXTERNAL_MODULE__255__, __WEBPACK_EXTERNAL_MODULE__515__, __WEBPACK_EXTERNAL_MODULE__509__, __WEBPACK_EXTERNAL_MODULE__852__, __WEBPACK_EXTERNAL_MODULE__694__, __WEBPACK_EXTERNAL_MODULE__860__, __WEBPACK_EXTERNAL_MODULE__95__, __WEBPACK_EXTERNAL_MODULE__585__, __WEBPACK_EXTERNAL_MODULE__961__) => {
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
  loadConfettiPreset: () => (/* binding */ loadConfettiPreset)
});

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
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-out-modes","commonjs2":"tsparticles-updater-out-modes","amd":"tsparticles-updater-out-modes","root":"window"}
var external_commonjs_tsparticles_updater_out_modes_commonjs2_tsparticles_updater_out_modes_amd_tsparticles_updater_out_modes_root_window_ = __webpack_require__(509);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-roll","commonjs2":"tsparticles-updater-roll","amd":"tsparticles-updater-roll","root":"window"}
var external_commonjs_tsparticles_updater_roll_commonjs2_tsparticles_updater_roll_amd_tsparticles_updater_roll_root_window_ = __webpack_require__(852);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ../../node_modules/.pnpm/tsparticles-updater-rotate@2.11.0/node_modules/tsparticles-updater-rotate/esm/Options/Classes/RotateAnimation.js

class RotateAnimation {
    constructor() {
        this.enable = false;
        this.speed = 0;
        this.decay = 0;
        this.sync = false;
    }
    load(data) {
        if (!data) {
            return;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        if (data.speed !== undefined) {
            this.speed = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.speed);
        }
        if (data.decay !== undefined) {
            this.decay = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.decay);
        }
        if (data.sync !== undefined) {
            this.sync = data.sync;
        }
    }
}

;// CONCATENATED MODULE: ../../node_modules/.pnpm/tsparticles-updater-rotate@2.11.0/node_modules/tsparticles-updater-rotate/esm/Options/Classes/Rotate.js


class Rotate extends external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ValueWithRandom {
    constructor() {
        super();
        this.animation = new RotateAnimation();
        this.direction = "clockwise";
        this.path = false;
        this.value = 0;
    }
    load(data) {
        if (!data) {
            return;
        }
        super.load(data);
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        this.animation.load(data.animation);
        if (data.path !== undefined) {
            this.path = data.path;
        }
    }
}

;// CONCATENATED MODULE: ../../node_modules/.pnpm/tsparticles-updater-rotate@2.11.0/node_modules/tsparticles-updater-rotate/esm/RotateUpdater.js


function updateRotate(particle, delta) {
    const rotate = particle.rotate, rotateOptions = particle.options.rotate;
    if (!rotate || !rotateOptions) {
        return;
    }
    const rotateAnimation = rotateOptions.animation, speed = (rotate.velocity ?? 0) * delta.factor, max = 2 * Math.PI, decay = rotate.decay ?? 1;
    if (!rotateAnimation.enable) {
        return;
    }
    switch (rotate.status) {
        case "increasing":
            rotate.value += speed;
            if (rotate.value > max) {
                rotate.value -= max;
            }
            break;
        case "decreasing":
        default:
            rotate.value -= speed;
            if (rotate.value < 0) {
                rotate.value += max;
            }
            break;
    }
    if (rotate.velocity && decay !== 1) {
        rotate.velocity *= decay;
    }
}
class RotateUpdater {
    constructor(container) {
        this.container = container;
    }
    init(particle) {
        const rotateOptions = particle.options.rotate;
        if (!rotateOptions) {
            return;
        }
        particle.rotate = {
            enable: rotateOptions.animation.enable,
            value: ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(rotateOptions.value) * Math.PI) / 180,
        };
        particle.pathRotation = rotateOptions.path;
        let rotateDirection = rotateOptions.direction;
        if (rotateDirection === "random") {
            const index = Math.floor((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * 2);
            rotateDirection = index > 0 ? "counter-clockwise" : "clockwise";
        }
        switch (rotateDirection) {
            case "counter-clockwise":
            case "counterClockwise":
                particle.rotate.status = "decreasing";
                break;
            case "clockwise":
                particle.rotate.status = "increasing";
                break;
        }
        const rotateAnimation = rotateOptions.animation;
        if (rotateAnimation.enable) {
            particle.rotate.decay = 1 - (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(rotateAnimation.decay);
            particle.rotate.velocity =
                ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(rotateAnimation.speed) / 360) * this.container.retina.reduceFactor;
            if (!rotateAnimation.sync) {
                particle.rotate.velocity *= (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)();
            }
        }
        particle.rotation = particle.rotate.value;
    }
    isEnabled(particle) {
        const rotate = particle.options.rotate;
        if (!rotate) {
            return false;
        }
        return !particle.destroyed && !particle.spawning && rotate.animation.enable && !rotate.path;
    }
    loadOptions(options, ...sources) {
        if (!options.rotate) {
            options.rotate = new Rotate();
        }
        for (const source of sources) {
            options.rotate.load(source?.rotate);
        }
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateRotate(particle, delta);
        particle.rotation = particle.rotate?.value ?? 0;
    }
}

;// CONCATENATED MODULE: ../../node_modules/.pnpm/tsparticles-updater-rotate@2.11.0/node_modules/tsparticles-updater-rotate/esm/index.js

async function loadRotateUpdater(engine, refresh = true) {
    await engine.addParticleUpdater("rotate", (container) => new RotateUpdater(container), refresh);
}

// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-size","commonjs2":"tsparticles-updater-size","amd":"tsparticles-updater-size","root":"window"}
var external_commonjs_tsparticles_updater_size_commonjs2_tsparticles_updater_size_amd_tsparticles_updater_size_root_window_ = __webpack_require__(694);
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
  await (0,external_commonjs_tsparticles_move_base_commonjs2_tsparticles_move_base_amd_tsparticles_move_base_root_window_.loadBaseMover)(engine, false);
  await (0,external_commonjs_tsparticles_shape_circle_commonjs2_tsparticles_shape_circle_amd_tsparticles_shape_circle_root_window_.loadCircleShape)(engine, false);
  await (0,external_commonjs_tsparticles_shape_square_commonjs2_tsparticles_shape_square_amd_tsparticles_shape_square_root_window_.loadSquareShape)(engine, false);
  await (0,external_commonjs_tsparticles_updater_color_commonjs2_tsparticles_updater_color_amd_tsparticles_updater_color_root_window_.loadColorUpdater)(engine, false);
  await (0,external_commonjs_tsparticles_updater_size_commonjs2_tsparticles_updater_size_amd_tsparticles_updater_size_root_window_.loadSizeUpdater)(engine, false);
  await (0,external_commonjs_tsparticles_updater_opacity_commonjs2_tsparticles_updater_opacity_amd_tsparticles_updater_opacity_root_window_.loadOpacityUpdater)(engine, false);
  await (0,external_commonjs_tsparticles_updater_out_modes_commonjs2_tsparticles_updater_out_modes_amd_tsparticles_updater_out_modes_root_window_.loadOutModesUpdater)(engine, false);
  await (0,external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_.loadEmittersPlugin)(engine, false);
  await (0,external_commonjs_tsparticles_plugin_motion_commonjs2_tsparticles_plugin_motion_amd_tsparticles_plugin_motion_root_window_.loadMotionPlugin)(engine, false);
  await (0,external_commonjs_tsparticles_updater_wobble_commonjs2_tsparticles_updater_wobble_amd_tsparticles_updater_wobble_root_window_.loadWobbleUpdater)(engine, false);
  await (0,external_commonjs_tsparticles_updater_roll_commonjs2_tsparticles_updater_roll_amd_tsparticles_updater_roll_root_window_.loadRollUpdater)(engine, false);
  await loadRotateUpdater(engine, false);
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