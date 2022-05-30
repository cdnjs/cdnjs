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
		module.exports = factory(require("tsparticles-engine"), require("tsparticles-move-base"), require("tsparticles-plugin-emitters"), require("tsparticles-shape-circle"), require("tsparticles-shape-square"), require("tsparticles-updater-angle"), require("tsparticles-updater-color"), require("tsparticles-updater-life"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-roll"), require("tsparticles-updater-size"), require("tsparticles-updater-tilt"), require("tsparticles-updater-wobble"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-engine", "tsparticles-move-base", "tsparticles-plugin-emitters", "tsparticles-shape-circle", "tsparticles-shape-square", "tsparticles-updater-angle", "tsparticles-updater-color", "tsparticles-updater-life", "tsparticles-updater-opacity", "tsparticles-updater-out-modes", "tsparticles-updater-roll", "tsparticles-updater-size", "tsparticles-updater-tilt", "tsparticles-updater-wobble"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-engine"), require("tsparticles-move-base"), require("tsparticles-plugin-emitters"), require("tsparticles-shape-circle"), require("tsparticles-shape-square"), require("tsparticles-updater-angle"), require("tsparticles-updater-color"), require("tsparticles-updater-life"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-roll"), require("tsparticles-updater-size"), require("tsparticles-updater-tilt"), require("tsparticles-updater-wobble")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__818__, __WEBPACK_EXTERNAL_MODULE__919__, __WEBPACK_EXTERNAL_MODULE__949__, __WEBPACK_EXTERNAL_MODULE__941__, __WEBPACK_EXTERNAL_MODULE__295__, __WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__841__, __WEBPACK_EXTERNAL_MODULE__489__, __WEBPACK_EXTERNAL_MODULE__838__, __WEBPACK_EXTERNAL_MODULE__364__, __WEBPACK_EXTERNAL_MODULE__281__, __WEBPACK_EXTERNAL_MODULE__328__, __WEBPACK_EXTERNAL_MODULE__950__, __WEBPACK_EXTERNAL_MODULE__304__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 345:
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ConfettiOptions = void 0;

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

  get particleCount() {
    return this.count;
  }

  set particleCount(value) {
    this.count = value;
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

exports.ConfettiOptions = ConfettiOptions;

/***/ }),

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
exports.confetti = exports.loadConfettiPreset = void 0;

const tsparticles_updater_angle_1 = __webpack_require__(1);

const tsparticles_move_base_1 = __webpack_require__(919);

const tsparticles_shape_circle_1 = __webpack_require__(941);

const tsparticles_updater_color_1 = __webpack_require__(841);

const tsparticles_plugin_emitters_1 = __webpack_require__(949);

const tsparticles_updater_life_1 = __webpack_require__(489);

const tsparticles_updater_opacity_1 = __webpack_require__(838);

const options_1 = __webpack_require__(689);

const tsparticles_updater_out_modes_1 = __webpack_require__(364);

const tsparticles_updater_roll_1 = __webpack_require__(281);

const tsparticles_updater_size_1 = __webpack_require__(328);

const tsparticles_shape_square_1 = __webpack_require__(295);

const tsparticles_updater_tilt_1 = __webpack_require__(950);

const tsparticles_updater_wobble_1 = __webpack_require__(304);

const tsparticles_engine_1 = __webpack_require__(818);

function loadPreset(engine, confettiOptions, override = false) {
  return __awaiter(this, void 0, void 0, function* () {
    yield (0, tsparticles_move_base_1.loadBaseMover)(engine);
    yield (0, tsparticles_shape_circle_1.loadCircleShape)(engine);
    yield (0, tsparticles_shape_square_1.loadSquareShape)(engine);
    yield (0, tsparticles_updater_color_1.loadColorUpdater)(engine);
    yield (0, tsparticles_updater_size_1.loadSizeUpdater)(engine);
    yield (0, tsparticles_updater_opacity_1.loadOpacityUpdater)(engine);
    yield (0, tsparticles_updater_out_modes_1.loadOutModesUpdater)(engine);
    yield (0, tsparticles_plugin_emitters_1.loadEmittersPlugin)(engine);
    yield (0, tsparticles_updater_wobble_1.loadWobbleUpdater)(engine);
    yield (0, tsparticles_updater_roll_1.loadRollUpdater)(engine);
    yield (0, tsparticles_updater_angle_1.loadAngleUpdater)(engine);
    yield (0, tsparticles_updater_tilt_1.loadTiltUpdater)(engine);
    yield (0, tsparticles_updater_life_1.loadLifeUpdater)(engine);
    yield engine.addPreset("confetti", (0, options_1.loadOptions)(confettiOptions), override);
  });
}

function loadConfettiPreset(main) {
  return __awaiter(this, void 0, void 0, function* () {
    yield loadPreset(main, {}, true);
  });
}

exports.loadConfettiPreset = loadConfettiPreset;

function confetti(idOrOptions, confettiOptions) {
  return __awaiter(this, void 0, void 0, function* () {
    let options;
    let id;

    if (typeof idOrOptions === "string") {
      id = idOrOptions;
      options = confettiOptions !== null && confettiOptions !== void 0 ? confettiOptions : {};
    } else {
      id = `tsparticles_${Math.floor(Math.random() * 1000)}`;
      options = idOrOptions;
    }

    yield loadPreset(tsparticles_engine_1.tsParticles, options, true);
    yield tsparticles_engine_1.tsParticles.load(id, {
      preset: "confetti"
    });
  });
}

exports.confetti = confetti;

/***/ }),

/***/ 689:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.loadOptions = void 0;

const ConfettiOptions_1 = __webpack_require__(345);

const loadOptions = confettiOptions => {
  const actualOptions = new ConfettiOptions_1.ConfettiOptions();
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

exports.loadOptions = loadOptions;

/***/ }),

/***/ 818:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__818__;

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

/***/ 295:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__295__;

/***/ }),

/***/ 1:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__1__;

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

/***/ 364:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__364__;

/***/ }),

/***/ 281:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__281__;

/***/ }),

/***/ 328:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__328__;

/***/ }),

/***/ 950:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__950__;

/***/ }),

/***/ 304:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__304__;

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