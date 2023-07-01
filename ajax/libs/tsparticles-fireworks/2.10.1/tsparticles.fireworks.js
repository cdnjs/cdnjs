/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.10.1
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-engine"), require("tsparticles-move-base"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-updater-destroy"), require("tsparticles-plugin-emitters"), require("tsparticles-updater-life"), require("tsparticles-shape-line"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-size"), require("tsparticles-plugin-sounds"), require("tsparticles-updater-stroke-color"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-engine", "tsparticles-move-base", "tsparticles-shape-circle", "tsparticles-updater-color", "tsparticles-updater-destroy", "tsparticles-plugin-emitters", "tsparticles-updater-life", "tsparticles-shape-line", "tsparticles-updater-opacity", "tsparticles-updater-out-modes", "tsparticles-updater-size", "tsparticles-plugin-sounds", "tsparticles-updater-stroke-color"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-engine"), require("tsparticles-move-base"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-updater-destroy"), require("tsparticles-plugin-emitters"), require("tsparticles-updater-life"), require("tsparticles-shape-line"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-size"), require("tsparticles-plugin-sounds"), require("tsparticles-updater-stroke-color")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__961__, __WEBPACK_EXTERNAL_MODULE__565__, __WEBPACK_EXTERNAL_MODULE__851__, __WEBPACK_EXTERNAL_MODULE__613__, __WEBPACK_EXTERNAL_MODULE__731__, __WEBPACK_EXTERNAL_MODULE__716__, __WEBPACK_EXTERNAL_MODULE__86__, __WEBPACK_EXTERNAL_MODULE__598__, __WEBPACK_EXTERNAL_MODULE__515__, __WEBPACK_EXTERNAL_MODULE__509__, __WEBPACK_EXTERNAL_MODULE__694__, __WEBPACK_EXTERNAL_MODULE__415__, __WEBPACK_EXTERNAL_MODULE__226__) => {
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

/***/ 415:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__415__;

/***/ }),

/***/ 851:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__851__;

/***/ }),

/***/ 598:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__598__;

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
  fireworks: () => (/* reexport */ fireworks)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/FireworkOptions.js

class FireworkOptions {
  constructor() {
    this.brightness = {
      min: -30,
      max: 30
    };
    this.colors = ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"];
    this.gravity = 5;
    this.minHeight = {
      min: 10,
      max: 30
    };
    this.rate = 20;
    this.saturation = {
      min: -30,
      max: 30
    };
    this.sounds = true;
    this.speed = {
      min: 5,
      max: 15
    };
    this.splitCount = {
      min: 75,
      max: 150
    };
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.colors !== undefined) {
      if (data.colors instanceof Array) {
        this.colors = [...data.colors];
      } else {
        this.colors = data.colors;
      }
    }
    if (data.brightness !== undefined) {
      this.brightness = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.brightness);
    }
    if (data.gravity !== undefined) {
      this.gravity = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.gravity);
    }
    if (data.minHeight !== undefined) {
      this.minHeight = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.minHeight);
    }
    if (data.rate !== undefined) {
      this.rate = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.rate);
    }
    if (data.saturation !== undefined) {
      this.saturation = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.saturation);
    }
    if (data.sounds !== undefined) {
      this.sounds = data.sounds;
    }
    if (data.speed !== undefined) {
      this.speed = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.speed);
    }
    if (data.splitCount !== undefined) {
      this.splitCount = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.splitCount);
    }
  }
}
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
;// CONCATENATED MODULE: ../../updaters/rotate/dist/esm/Options/Classes/RotateAnimation.js

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
;// CONCATENATED MODULE: ../../updaters/rotate/dist/esm/Options/Classes/Rotate.js


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
;// CONCATENATED MODULE: ../../updaters/rotate/dist/esm/RotateUpdater.js


function updateRotate(particle, delta) {
  const rotate = particle.rotate,
    rotateOptions = particle.options.rotate;
  if (!rotate || !rotateOptions) {
    return;
  }
  const rotateAnimation = rotateOptions.animation,
    speed = (rotate.velocity ?? 0) * delta.factor,
    max = 2 * Math.PI,
    decay = rotate.decay ?? 1;
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
      value: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(rotateOptions.value) * Math.PI / 180
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
      particle.rotate.velocity = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(rotateAnimation.speed) / 360 * this.container.retina.reduceFactor;
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
;// CONCATENATED MODULE: ../../updaters/rotate/dist/esm/index.js

async function loadRotateUpdater(engine) {
  await engine.addParticleUpdater("rotate", container => new RotateUpdater(container));
}
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-size","commonjs2":"tsparticles-updater-size","amd":"tsparticles-updater-size","root":"window"}
var external_commonjs_tsparticles_updater_size_commonjs2_tsparticles_updater_size_amd_tsparticles_updater_size_root_window_ = __webpack_require__(694);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-plugin-sounds","commonjs2":"tsparticles-plugin-sounds","amd":"tsparticles-plugin-sounds","root":"window"}
var external_commonjs_tsparticles_plugin_sounds_commonjs2_tsparticles_plugin_sounds_amd_tsparticles_plugin_sounds_root_window_ = __webpack_require__(415);
// EXTERNAL MODULE: external {"commonjs":"tsparticles-updater-stroke-color","commonjs2":"tsparticles-updater-stroke-color","amd":"tsparticles-updater-stroke-color","root":"window"}
var external_commonjs_tsparticles_updater_stroke_color_commonjs2_tsparticles_updater_stroke_color_amd_tsparticles_updater_stroke_color_root_window_ = __webpack_require__(226);
;// CONCATENATED MODULE: ./dist/browser/fireworks.js















let initialized = false;
let initializing = false;
const explodeSoundCheck = args => {
  const data = args.data;
  return data.particle.shape === "line";
};
class FireworksInstance {
  constructor(container) {
    this._container = container;
  }
  pause() {
    this._container.pause();
  }
  play() {
    this._container.play();
  }
  stop() {
    this._container.stop();
  }
}
async function initPlugins() {
  if (initialized) {
    return;
  }
  if (initializing) {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (!initialized) {
          return;
        }
        clearInterval(interval);
        resolve();
      }, 100);
    });
  }
  initializing = true;
  await (0,external_commonjs_tsparticles_move_base_commonjs2_tsparticles_move_base_amd_tsparticles_move_base_root_window_.loadBaseMover)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_plugin_emitters_commonjs2_tsparticles_plugin_emitters_amd_tsparticles_plugin_emitters_root_window_.loadEmittersPlugin)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_plugin_sounds_commonjs2_tsparticles_plugin_sounds_amd_tsparticles_plugin_sounds_root_window_.loadSoundsPlugin)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_shape_circle_commonjs2_tsparticles_shape_circle_amd_tsparticles_shape_circle_root_window_.loadCircleShape)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_shape_line_commonjs2_tsparticles_shape_line_amd_tsparticles_shape_line_root_window_.loadLineShape)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await loadRotateUpdater(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_updater_color_commonjs2_tsparticles_updater_color_amd_tsparticles_updater_color_root_window_.loadColorUpdater)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_updater_destroy_commonjs2_tsparticles_updater_destroy_amd_tsparticles_updater_destroy_root_window_.loadDestroyUpdater)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_updater_life_commonjs2_tsparticles_updater_life_amd_tsparticles_updater_life_root_window_.loadLifeUpdater)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_updater_opacity_commonjs2_tsparticles_updater_opacity_amd_tsparticles_updater_opacity_root_window_.loadOpacityUpdater)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_updater_out_modes_commonjs2_tsparticles_updater_out_modes_amd_tsparticles_updater_out_modes_root_window_.loadOutModesUpdater)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_updater_size_commonjs2_tsparticles_updater_size_amd_tsparticles_updater_size_root_window_.loadSizeUpdater)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  await (0,external_commonjs_tsparticles_updater_stroke_color_commonjs2_tsparticles_updater_stroke_color_amd_tsparticles_updater_stroke_color_root_window_.loadStrokeColorUpdater)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles);
  initializing = false;
  initialized = true;
}
async function fireworks(idOrOptions, sourceOptions) {
  await initPlugins();
  let id;
  const options = new FireworkOptions();
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options.load(sourceOptions);
  } else {
    id = "fireworks";
    options.load(idOrOptions);
  }
  const particlesOptions = {
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
        delay: typeof options.rate === "number" ? 1 / options.rate : {
          min: 1 / (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMin)(options.rate),
          max: 1 / (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMax)(options.rate)
        },
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
      color: {
        value: options.colors
      },
      destroy: {
        mode: "split",
        bounds: {
          top: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(options.minHeight)
        },
        split: {
          sizeOffset: false,
          count: 1,
          factor: {
            value: 0.333333
          },
          rate: {
            value: options.splitCount
          },
          colorOffset: {
            s: options.saturation,
            l: options.brightness
          },
          particles: {
            stroke: {
              width: 0
            },
            number: {
              value: 0
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
                  min: 0.25,
                  max: 0.5
                }
              }
            },
            move: {
              decay: {
                min: 0.05,
                max: 0.1
              },
              enable: true,
              gravity: {
                enable: true,
                inverse: false,
                acceleration: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(options.gravity)
              },
              speed: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(options.speed),
              direction: "none",
              outModes: "destroy"
            }
          }
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
        width: 0.5
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
    },
    sounds: {
      enable: options.sounds,
      events: [{
        event: "particleRemoved",
        filter: explodeSoundCheck,
        audio: ["https://particles.js.org/audio/explosion0.mp3", "https://particles.js.org/audio/explosion1.mp3", "https://particles.js.org/audio/explosion2.mp3"]
      }],
      volume: 50
    }
  };
  const container = await external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles.load(id, particlesOptions);
  if (!container) {
    return;
  }
  return new FireworksInstance(container);
}
fireworks.version = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles.version;
if (!(0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isSsr)()) {
  window.fireworks = fireworks;
}
;// CONCATENATED MODULE: ./dist/browser/index.js

})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});