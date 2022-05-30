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
		module.exports = factory(require("tsparticles-updater-angle"), require("tsparticles-move-base"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-plugin-emitters"), require("tsparticles-updater-life"), require("tsparticles-shape-line"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-size"), require("tsparticles-engine"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-updater-angle", "tsparticles-move-base", "tsparticles-shape-circle", "tsparticles-updater-color", "tsparticles-plugin-emitters", "tsparticles-updater-life", "tsparticles-shape-line", "tsparticles-updater-opacity", "tsparticles-updater-out-modes", "tsparticles-updater-size", "tsparticles-engine"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-updater-angle"), require("tsparticles-move-base"), require("tsparticles-shape-circle"), require("tsparticles-updater-color"), require("tsparticles-plugin-emitters"), require("tsparticles-updater-life"), require("tsparticles-shape-line"), require("tsparticles-updater-opacity"), require("tsparticles-updater-out-modes"), require("tsparticles-updater-size"), require("tsparticles-engine")) : factory(root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"], root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__1__, __WEBPACK_EXTERNAL_MODULE__919__, __WEBPACK_EXTERNAL_MODULE__941__, __WEBPACK_EXTERNAL_MODULE__841__, __WEBPACK_EXTERNAL_MODULE__949__, __WEBPACK_EXTERNAL_MODULE__489__, __WEBPACK_EXTERNAL_MODULE__45__, __WEBPACK_EXTERNAL_MODULE__838__, __WEBPACK_EXTERNAL_MODULE__364__, __WEBPACK_EXTERNAL_MODULE__328__, __WEBPACK_EXTERNAL_MODULE__818__) {
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
exports.loadFireworksPreset = void 0;

const tsparticles_updater_angle_1 = __webpack_require__(1);

const tsparticles_move_base_1 = __webpack_require__(919);

const tsparticles_shape_circle_1 = __webpack_require__(941);

const tsparticles_updater_color_1 = __webpack_require__(841);

const tsparticles_plugin_emitters_1 = __webpack_require__(949);

const tsparticles_updater_life_1 = __webpack_require__(489);

const tsparticles_shape_line_1 = __webpack_require__(45);

const tsparticles_updater_opacity_1 = __webpack_require__(838);

const tsparticles_updater_out_modes_1 = __webpack_require__(364);

const tsparticles_updater_size_1 = __webpack_require__(328);

const tsparticles_updater_stroke_color_1 = __webpack_require__(856);

const options_1 = __webpack_require__(689);

function loadFireworksPreset(engine) {
  return __awaiter(this, void 0, void 0, function* () {
    yield (0, tsparticles_move_base_1.loadBaseMover)(engine);
    yield (0, tsparticles_plugin_emitters_1.loadEmittersPlugin)(engine);
    yield (0, tsparticles_shape_circle_1.loadCircleShape)(engine);
    yield (0, tsparticles_shape_line_1.loadLineShape)(engine);
    yield (0, tsparticles_updater_angle_1.loadAngleUpdater)(engine);
    yield (0, tsparticles_updater_color_1.loadColorUpdater)(engine);
    yield (0, tsparticles_updater_life_1.loadLifeUpdater)(engine);
    yield (0, tsparticles_updater_opacity_1.loadOpacityUpdater)(engine);
    yield (0, tsparticles_updater_out_modes_1.loadOutModesUpdater)(engine);
    yield (0, tsparticles_updater_size_1.loadSizeUpdater)(engine);
    yield (0, tsparticles_updater_stroke_color_1.loadStrokeColorUpdater)(engine);
    yield engine.addPreset("fireworks", options_1.options);
  });
}

exports.loadFireworksPreset = loadFireworksPreset;

/***/ }),

/***/ 689:
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.options = void 0;
exports.options = {
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
      delay: 0.5,
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
    destroy: {
      mode: "split",
      split: {
        count: 1,
        factor: {
          value: 0.333333
        },
        rate: {
          value: 100
        },
        particles: {
          color: {
            value: ["#ff595e", "#ffca3a", "#8ac926", "#1982c4", "#6a4c93"]
          },
          stroke: {
            width: 0
          },
          number: {
            value: 0
          },
          collisions: {
            enable: false
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
            value: 2,
            animation: {
              enable: false
            }
          },
          life: {
            count: 1,
            duration: {
              value: {
                min: 1,
                max: 2
              }
            }
          },
          move: {
            enable: true,
            gravity: {
              enable: false
            },
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
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
      width: 1
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
  }
};

/***/ }),

/***/ 856:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "loadStrokeColorUpdater": function() { return /* binding */ loadStrokeColorUpdater; }
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ../../updaters/strokeColor/dist/StrokeColorUpdater.js


function updateColorValue(delta, value, valueAnimation, max, decrease) {
  var _a;

  const colorValue = value;

  if (!colorValue || !colorValue.enable) {
    return;
  }

  const offset = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)(valueAnimation.offset);
  const velocity = ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor + offset * 3.6;

  if (!decrease || colorValue.status === 0) {
    colorValue.value += velocity;

    if (decrease && colorValue.value > max) {
      colorValue.status = 1;
      colorValue.value -= colorValue.value % max;
    }
  } else {
    colorValue.value -= velocity;

    if (colorValue.value < 0) {
      colorValue.status = 0;
      colorValue.value += colorValue.value;
    }
  }

  if (colorValue.value > max) {
    colorValue.value %= max;
  }
}

function updateStrokeColor(particle, delta) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;

  if (!((_a = particle.stroke) === null || _a === void 0 ? void 0 : _a.color)) {
    return;
  }

  const animationOptions = particle.stroke.color.animation;
  const h = (_c = (_b = particle.strokeColor) === null || _b === void 0 ? void 0 : _b.h) !== null && _c !== void 0 ? _c : (_d = particle.color) === null || _d === void 0 ? void 0 : _d.h;

  if (h) {
    updateColorValue(delta, h, animationOptions.h, 360, false);
  }

  const s = (_f = (_e = particle.strokeColor) === null || _e === void 0 ? void 0 : _e.s) !== null && _f !== void 0 ? _f : (_g = particle.color) === null || _g === void 0 ? void 0 : _g.s;

  if (s) {
    updateColorValue(delta, s, animationOptions.s, 100, true);
  }

  const l = (_j = (_h = particle.strokeColor) === null || _h === void 0 ? void 0 : _h.l) !== null && _j !== void 0 ? _j : (_k = particle.color) === null || _k === void 0 ? void 0 : _k.l;

  if (l) {
    updateColorValue(delta, l, animationOptions.l, 100, true);
  }
}

class StrokeColorUpdater {
  constructor(container) {
    this.container = container;
  }

  init(particle) {
    var _a, _b;

    const container = this.container;
    particle.stroke = particle.options.stroke instanceof Array ? (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(particle.options.stroke, particle.id, particle.options.reduceDuplicates) : particle.options.stroke;
    particle.strokeWidth = particle.stroke.width * container.retina.pixelRatio;
    const strokeHslColor = (_a = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.colorToHsl)(particle.stroke.color)) !== null && _a !== void 0 ? _a : particle.getFillColor();

    if (strokeHslColor) {
      particle.strokeColor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getHslAnimationFromHsl)(strokeHslColor, (_b = particle.stroke.color) === null || _b === void 0 ? void 0 : _b.animation, container.retina.reduceFactor);
    }
  }

  isEnabled(particle) {
    var _a, _b, _c, _d;

    const color = (_a = particle.stroke) === null || _a === void 0 ? void 0 : _a.color;
    return !particle.destroyed && !particle.spawning && !!color && (((_b = particle.strokeColor) === null || _b === void 0 ? void 0 : _b.h.value) !== undefined && color.animation.h.enable || ((_c = particle.strokeColor) === null || _c === void 0 ? void 0 : _c.s.value) !== undefined && color.animation.s.enable || ((_d = particle.strokeColor) === null || _d === void 0 ? void 0 : _d.l.value) !== undefined && color.animation.l.enable);
  }

  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateStrokeColor(particle, delta);
  }

}
;// CONCATENATED MODULE: ../../updaters/strokeColor/dist/index.js
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


function loadStrokeColorUpdater(engine) {
  return __awaiter(this, void 0, void 0, function* () {
    yield engine.addParticleUpdater("strokeColor", container => new StrokeColorUpdater(container));
  });
}

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

/***/ 45:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__45__;

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