/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.4
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-engine"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-engine"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-engine")) : factory(root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__818__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 474:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GradientUpdater = void 0;

const tsparticles_engine_1 = __webpack_require__(818);

function updateColorOpacity(delta, value) {
  var _a, _b;

  if (!value.enable) {
    return;
  }

  switch (value.status) {
    case 0:
      if (value.value >= value.max) {
        value.status = 1;
      } else {
        value.value += ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
      }

      break;

    case 1:
      if (value.value <= value.min) {
        value.status = 0;
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
  }

  const velocity = ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;

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

function updateAngle(delta, angle) {
  var _a;

  const speed = ((_a = angle.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
  const max = 2 * Math.PI;

  if (!angle.enable) {
    return;
  }

  switch (angle.status) {
    case 0:
      angle.value += speed;

      if (angle.value > max) {
        angle.value -= max;
      }

      break;

    case 1:
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
    const gradient = particle.options.gradient instanceof Array ? (0, tsparticles_engine_1.itemFromArray)(particle.options.gradient) : particle.options.gradient;

    if (gradient) {
      particle.gradient = {
        angle: {
          value: gradient.angle.value,
          enable: gradient.angle.animation.enable,
          velocity: (0, tsparticles_engine_1.getRangeValue)(gradient.angle.animation.speed) / 360 * particle.container.retina.reduceFactor
        },
        type: gradient.type,
        colors: []
      };
      let rotateDirection = gradient.angle.direction;

      if (rotateDirection === "random") {
        const index = Math.floor(Math.random() * 2);
        rotateDirection = index > 0 ? "counter-clockwise" : "clockwise";
      }

      switch (rotateDirection) {
        case "counter-clockwise":
        case "counterClockwise":
          particle.gradient.angle.status = 1;
          break;

        case "clockwise":
          particle.gradient.angle.status = 0;
          break;
      }

      const reduceDuplicates = particle.options.reduceDuplicates;

      for (const grColor of gradient.colors) {
        const grHslColor = (0, tsparticles_engine_1.colorToHsl)(grColor.value, particle.id, reduceDuplicates);

        if (grHslColor) {
          const grHslAnimation = (0, tsparticles_engine_1.getHslAnimationFromHsl)(grHslColor, grColor.value.animation, particle.container.retina.reduceFactor);
          const addColor = {
            stop: grColor.stop,
            value: grHslAnimation,
            opacity: grColor.opacity ? {
              enable: grColor.opacity.animation.enable,
              max: (0, tsparticles_engine_1.getRangeMax)(grColor.opacity.value),
              min: (0, tsparticles_engine_1.getRangeMin)(grColor.opacity.value),
              status: 0,
              value: (0, tsparticles_engine_1.getRangeValue)(grColor.opacity.value),
              velocity: (0, tsparticles_engine_1.getRangeValue)(grColor.opacity.animation.speed) / 100 * particle.container.retina.reduceFactor
            } : undefined
          };

          if (grColor.opacity && addColor.opacity) {
            const opacityRange = grColor.opacity.value;
            addColor.opacity.min = (0, tsparticles_engine_1.getRangeMin)(opacityRange);
            addColor.opacity.max = (0, tsparticles_engine_1.getRangeMax)(opacityRange);
            const opacityAnimation = grColor.opacity.animation;

            switch (opacityAnimation.startValue) {
              case "min":
                addColor.opacity.value = addColor.opacity.min;
                addColor.opacity.status = 0;
                break;

              case "random":
                addColor.opacity.value = (0, tsparticles_engine_1.randomInRange)(addColor.opacity);
                addColor.opacity.status = Math.random() >= 0.5 ? 0 : 1;
                break;

              case "max":
              default:
                addColor.opacity.value = addColor.opacity.max;
                addColor.opacity.status = 1;
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
          fillGradient = gradient.type === "radial" ? context.createRadialGradient(0, 0, 0, 0, 0, radius) : context.createLinearGradient(Math.cos(gradientAngle) * -radius, Math.sin(gradientAngle) * -radius, Math.cos(gradientAngle) * radius, Math.sin(gradientAngle) * radius);

    for (const color of gradient.colors) {
      fillGradient.addColorStop(color.stop, (0, tsparticles_engine_1.getStyleFromHsl)({
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

exports.GradientUpdater = GradientUpdater;

/***/ }),

/***/ 818:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__818__;

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
var exports = __webpack_exports__;


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.loadGradientUpdater = void 0;

const GradientUpdater_1 = __webpack_require__(474);

function loadGradientUpdater(engine) {
  engine.addParticleUpdater("gradient", () => new GradientUpdater_1.GradientUpdater());
}

exports.loadGradientUpdater = loadGradientUpdater;
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});