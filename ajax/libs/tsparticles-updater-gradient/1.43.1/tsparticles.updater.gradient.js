/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v1.43.1
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles")) : factory(root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__764__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 764:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__764__;

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
  "loadGradientUpdater": function() { return /* binding */ loadGradientUpdater; }
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles","commonjs2":"tsparticles","amd":"tsparticles","root":"window"}
var external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_ = __webpack_require__(764);
;// CONCATENATED MODULE: ./dist/browser/GradientUpdater.js


function updateColorOpacity(delta, value) {
  var _a, _b;

  if (!value.enable) {
    return;
  }

  switch (value.status) {
    case 0
    /* increasing */
    :
      if (value.value >= value.max) {
        value.status = 1
        /* decreasing */
        ;
      } else {
        value.value += ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
      }

      break;

    case 1
    /* decreasing */
    :
      if (value.value <= value.min) {
        value.status = 0
        /* increasing */
        ;
      } else {
        value.value -= ((_b = value.velocity) !== null && _b !== void 0 ? _b : 0) * delta.factor;
      }

      break;
  }
}

function updateColorValue(delta, value, max, decrease) {
  var _a;

  const colorValue = value;

  if (!colorValue || !colorValue.enable) {
    return;
  } //const offset = NumberUtils.randomInRange(valueAnimation.offset);


  const velocity = ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor; // + offset * 3.6;

  if (!decrease || colorValue.status === 0
  /* increasing */
  ) {
    colorValue.value += velocity;

    if (decrease && colorValue.value > max) {
      colorValue.status = 1
      /* decreasing */
      ;
      colorValue.value -= colorValue.value % max;
    }
  } else {
    colorValue.value -= velocity;

    if (colorValue.value < 0) {
      colorValue.status = 0
      /* increasing */
      ;
      colorValue.value += colorValue.value;
    }
  }

  if (colorValue.value > max) {
    colorValue.value %= max;
  }
}

function updateAngle(delta, angle) {
  var _a;

  const speed = ((_a = angle.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
  const max = 2 * Math.PI;

  if (!angle.enable) {
    return;
  }

  switch (angle.status) {
    case 0
    /* increasing */
    :
      angle.value += speed;

      if (angle.value > max) {
        angle.value -= max;
      }

      break;

    case 1
    /* decreasing */
    :
    default:
      angle.value -= speed;

      if (angle.value < 0) {
        angle.value += max;
      }

      break;
  }
}

function updateGradient(particle, delta) {
  var _a, _b, _c;

  const gradient = particle.gradient;

  if (!gradient) {
    return;
  }

  updateAngle(delta, gradient.angle);

  for (const color of gradient.colors) {
    if (((_a = particle.color) === null || _a === void 0 ? void 0 : _a.h) !== undefined) {
      updateColorValue(delta, color.value.h, 360, false);
    }

    if (((_b = particle.color) === null || _b === void 0 ? void 0 : _b.s) !== undefined) {
      updateColorValue(delta, color.value.s, 100, true);
    }

    if (((_c = particle.color) === null || _c === void 0 ? void 0 : _c.l) !== undefined) {
      updateColorValue(delta, color.value.l, 100, true);
    }

    if (color.opacity) {
      updateColorOpacity(delta, color.opacity);
    }
  }
}

class GradientUpdater {
  init(particle) {
    const gradient = particle.options.gradient instanceof Array ? (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.itemFromArray)(particle.options.gradient) : particle.options.gradient;

    if (gradient) {
      particle.gradient = {
        angle: {
          value: gradient.angle.value,
          enable: gradient.angle.animation.enable,
          velocity: (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.getRangeValue)(gradient.angle.animation.speed) / 360 * particle.container.retina.reduceFactor
        },
        type: gradient.type,
        colors: []
      };
      let rotateDirection = gradient.angle.direction;

      if (rotateDirection === "random"
      /* random */
      ) {
        const index = Math.floor(Math.random() * 2);
        rotateDirection = index > 0 ? "counter-clockwise"
        /* counterClockwise */
        : "clockwise"
        /* clockwise */
        ;
      }

      switch (rotateDirection) {
        case "counter-clockwise"
        /* counterClockwise */
        :
        case "counterClockwise":
          particle.gradient.angle.status = 1
          /* decreasing */
          ;
          break;

        case "clockwise"
        /* clockwise */
        :
          particle.gradient.angle.status = 0
          /* increasing */
          ;
          break;
      }

      const reduceDuplicates = particle.options.reduceDuplicates;

      for (const grColor of gradient.colors) {
        const grHslColor = (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.colorToHsl)(grColor.value, particle.id, reduceDuplicates);

        if (grHslColor) {
          const grHslAnimation = (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.getHslAnimationFromHsl)(grHslColor, grColor.value.animation, particle.container.retina.reduceFactor);
          const addColor = {
            stop: grColor.stop,
            value: grHslAnimation,
            opacity: grColor.opacity ? {
              enable: grColor.opacity.animation.enable,
              max: (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.getRangeMax)(grColor.opacity.value),
              min: (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.getRangeMin)(grColor.opacity.value),
              status: 0
              /* increasing */
              ,
              value: (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.getRangeValue)(grColor.opacity.value),
              velocity: (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.getRangeValue)(grColor.opacity.animation.speed) / 100 * particle.container.retina.reduceFactor
            } : undefined
          };

          if (grColor.opacity && addColor.opacity) {
            const opacityRange = grColor.opacity.value;
            addColor.opacity.min = (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.getRangeMin)(opacityRange);
            addColor.opacity.max = (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.getRangeMax)(opacityRange);
            const opacityAnimation = grColor.opacity.animation;

            switch (opacityAnimation.startValue) {
              case "min"
              /* min */
              :
                addColor.opacity.value = addColor.opacity.min;
                addColor.opacity.status = 0
                /* increasing */
                ;
                break;

              case "random"
              /* random */
              :
                addColor.opacity.value = (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.randomInRange)(addColor.opacity);
                addColor.opacity.status = Math.random() >= 0.5 ? 0
                /* increasing */
                : 1
                /* decreasing */
                ;
                break;

              case "max"
              /* max */
              :
              default:
                addColor.opacity.value = addColor.opacity.max;
                addColor.opacity.status = 1
                /* decreasing */
                ;
                break;
            }
          }

          particle.gradient.colors.push(addColor);
        }
      }
    }
  }

  isEnabled(particle) {
    var _a, _b, _c;

    return !particle.destroyed && !particle.spawning && (((_a = particle.gradient) === null || _a === void 0 ? void 0 : _a.angle.enable) || ((_c = (_b = particle.gradient) === null || _b === void 0 ? void 0 : _b.colors.some(c => c.value.h.enable || c.value.s.enable || c.value.l.enable)) !== null && _c !== void 0 ? _c : false));
  }

  getColorStyles(particle, context, radius, opacity) {
    var _a, _b;

    const gradient = particle.gradient;

    if (!gradient) {
      return {};
    }

    const gradientAngle = gradient.angle.value,
          fillGradient = gradient.type === "radial"
    /* radial */
    ? context.createRadialGradient(0, 0, 0, 0, 0, radius) : context.createLinearGradient(Math.cos(gradientAngle) * -radius, Math.sin(gradientAngle) * -radius, Math.cos(gradientAngle) * radius, Math.sin(gradientAngle) * radius);

    for (const color of gradient.colors) {
      fillGradient.addColorStop(color.stop, (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.getStyleFromHsl)({
        h: color.value.h.value,
        s: color.value.s.value,
        l: color.value.l.value
      }, (_b = (_a = color.opacity) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : opacity));
    }

    return {
      fill: fillGradient
    };
  }

  update(particle, delta) {
    updateGradient(particle, delta);
  }

}
;// CONCATENATED MODULE: ./dist/browser/index.js

function loadGradientUpdater(engine) {
  engine.addParticleUpdater("gradient", () => new GradientUpdater());
}
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});