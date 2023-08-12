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
		module.exports = factory(require("tsparticles-engine"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-engine"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-engine")) : factory(root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__961__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 961:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__961__;

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
  loadGradientUpdater: () => (/* binding */ loadGradientUpdater)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/GradientColorOpacityAnimation.js

class GradientColorOpacityAnimation {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 0;
    this.decay = 0;
    this.delay = 0;
    this.sync = false;
    this.startValue = "random";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.count !== undefined) {
      this.count = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.count);
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.speed !== undefined) {
      this.speed = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.speed);
    }
    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
    if (data.startValue !== undefined) {
      this.startValue = data.startValue;
    }
    if (data.decay !== undefined) {
      this.decay = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.decay);
    }
    if (data.delay !== undefined) {
      this.delay = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.delay);
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/GradientColorOpacity.js


class GradientColorOpacity {
  constructor() {
    this.value = 0;
    this.animation = new GradientColorOpacityAnimation();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.animation.load(data.animation);
    if (data.value !== undefined) {
      this.value = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.value);
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/AnimatableGradientColor.js


class AnimatableGradientColor {
  constructor() {
    this.stop = 0;
    this.value = new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.AnimatableColor();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.stop !== undefined) {
      this.stop = data.stop;
    }
    this.value = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.AnimatableColor.create(this.value, data.value);
    if (data.opacity !== undefined) {
      this.opacity = new GradientColorOpacity();
      if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isNumber)(data.opacity)) {
        this.opacity.value = data.opacity;
      } else {
        this.opacity.load(data.opacity);
      }
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/GradientAngleAnimation.js

class GradientAngleAnimation {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 0;
    this.decay = 0;
    this.delay = 0;
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.count !== undefined) {
      this.count = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.count);
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
    if (data.delay !== undefined) {
      this.delay = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.delay);
    }
    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/GradientAngle.js


class GradientAngle {
  constructor() {
    this.value = 0;
    this.animation = new GradientAngleAnimation();
    this.direction = "clockwise";
  }
  load(data) {
    if (!data) {
      return;
    }
    this.animation.load(data.animation);
    if (data.value !== undefined) {
      this.value = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.value);
    }
    if (data.direction !== undefined) {
      this.direction = data.direction;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/AnimatableGradient.js


class AnimatableGradient {
  constructor() {
    this.angle = new GradientAngle();
    this.colors = [];
    this.type = "random";
  }
  load(data) {
    if (!data) {
      return;
    }
    this.angle.load(data.angle);
    if (data.colors !== undefined) {
      this.colors = data.colors.map(s => {
        const tmp = new AnimatableGradientColor();
        tmp.load(s);
        return tmp;
      });
    }
    if (data.type !== undefined) {
      this.type = data.type;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Utils.js
function updateColorOpacity(delta, value) {
  if (!value.enable) {
    return;
  }
  const decay = value.decay ?? 1;
  switch (value.status) {
    case "increasing":
      if (value.value >= value.max) {
        value.status = "decreasing";
      } else {
        value.value += (value.velocity ?? 0) * delta.factor;
      }
      break;
    case "decreasing":
      if (value.value <= value.min) {
        value.status = "increasing";
      } else {
        value.value -= (value.velocity ?? 0) * delta.factor;
      }
      break;
  }
  if (value.velocity && decay !== 1) {
    value.velocity *= decay;
  }
}
function updateColorValue(delta, colorValue, max, decrease) {
  if (!colorValue || !colorValue.enable) {
    return;
  }
  if (!colorValue.time) {
    colorValue.time = 0;
  }
  if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
    colorValue.time += delta.value;
  }
  if ((colorValue.delayTime ?? 0) > 0 && colorValue.time < (colorValue.delayTime ?? 0)) {
    return;
  }
  const velocity = (colorValue.velocity ?? 0) * delta.factor,
    decay = colorValue.decay ?? 1;
  if (!decrease || colorValue.status === "increasing") {
    colorValue.value += velocity;
    if (decrease && colorValue.value > max) {
      colorValue.status = "decreasing";
      colorValue.value -= colorValue.value % max;
    }
  } else {
    colorValue.value -= velocity;
    if (colorValue.value < 0) {
      colorValue.status = "increasing";
      colorValue.value += colorValue.value;
    }
  }
  if (colorValue.value > max) {
    colorValue.value %= max;
  }
  if (colorValue.velocity && decay !== 1) {
    colorValue.velocity *= decay;
  }
}
function updateAngle(delta, angle) {
  const speed = (angle.velocity ?? 0) * delta.factor,
    max = 2 * Math.PI,
    decay = angle.decay ?? 1;
  if (!angle.enable) {
    return;
  }
  switch (angle.status) {
    case "increasing":
      angle.value += speed;
      if (angle.value > max) {
        angle.value -= max;
      }
      break;
    case "decreasing":
    default:
      angle.value -= speed;
      if (angle.value < 0) {
        angle.value += max;
      }
      break;
  }
  if (angle.velocity && decay !== 1) {
    angle.velocity *= decay;
  }
}
function updateGradient(particle, delta) {
  const {
    gradient
  } = particle;
  if (!gradient) {
    return;
  }
  updateAngle(delta, gradient.angle);
  for (const color of gradient.colors) {
    if (particle.color?.h !== undefined) {
      updateColorValue(delta, color.value.h, 360, false);
    }
    if (particle.color?.s !== undefined) {
      updateColorValue(delta, color.value.s, 100, true);
    }
    if (particle.color?.l !== undefined) {
      updateColorValue(delta, color.value.l, 100, true);
    }
    if (color.opacity) {
      updateColorOpacity(delta, color.opacity);
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/GradientUpdater.js



class GradientUpdater {
  getColorStyles(particle, context, radius, opacity) {
    const gradient = particle.gradient;
    if (!gradient) {
      return {};
    }
    const gradientAngle = gradient.angle.value,
      fillGradient = gradient.type === "radial" ? context.createRadialGradient(0, 0, 0, 0, 0, radius) : context.createLinearGradient(Math.cos(gradientAngle) * -radius, Math.sin(gradientAngle) * -radius, Math.cos(gradientAngle) * radius, Math.sin(gradientAngle) * radius);
    for (const {
      stop,
      value,
      opacity: cOpacity
    } of gradient.colors) {
      fillGradient.addColorStop(stop, (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromHsl)({
        h: value.h.value,
        s: value.s.value,
        l: value.l.value
      }, cOpacity?.value ?? opacity));
    }
    return {
      fill: fillGradient
    };
  }
  init(particle) {
    const gradient = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromSingleOrMultiple)(particle.options.gradient);
    if (!gradient) {
      return;
    }
    const {
      angle
    } = gradient;
    particle.gradient = {
      angle: {
        value: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(angle.value),
        enable: angle.animation.enable,
        velocity: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(angle.animation.speed) / 360 * particle.container.retina.reduceFactor,
        decay: 1 - (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(angle.animation.decay),
        delayTime: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(angle.animation.delay) * 1000,
        time: 0
      },
      type: gradient.type,
      colors: []
    };
    let rotateDirection = gradient.angle.direction;
    if (rotateDirection === "random") {
      rotateDirection = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() > 0.5 ? "counter-clockwise" : "clockwise";
    }
    switch (rotateDirection) {
      case "counter-clockwise":
      case "counterClockwise":
        particle.gradient.angle.status = "decreasing";
        break;
      case "clockwise":
        particle.gradient.angle.status = "increasing";
        break;
    }
    const reduceDuplicates = particle.options.reduceDuplicates;
    for (const grColor of gradient.colors) {
      const grHslColor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.rangeColorToHsl)(grColor.value, particle.id, reduceDuplicates);
      if (!grHslColor) {
        continue;
      }
      const grHslAnimation = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getHslAnimationFromHsl)(grHslColor, grColor.value.animation, particle.container.retina.reduceFactor),
        addColor = {
          stop: grColor.stop,
          value: grHslAnimation,
          opacity: grColor.opacity ? {
            enable: grColor.opacity.animation.enable,
            max: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMax)(grColor.opacity.value),
            min: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMin)(grColor.opacity.value),
            status: "increasing",
            value: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(grColor.opacity.value),
            velocity: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(grColor.opacity.animation.speed) / 100 * particle.container.retina.reduceFactor,
            decay: 1 - (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(grColor.opacity.animation.decay),
            delayTime: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(grColor.opacity.animation.delay) * 1000,
            time: 0
          } : undefined
        };
      const {
        opacity: addOpacity
      } = addColor;
      if (grColor.opacity && addOpacity) {
        const opacityRange = grColor.opacity.value;
        addOpacity.min = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMin)(opacityRange);
        addOpacity.max = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMax)(opacityRange);
        const opacityAnimation = grColor.opacity.animation;
        switch (opacityAnimation.startValue) {
          case "min":
            addOpacity.value = addOpacity.min;
            addOpacity.status = "increasing";
            break;
          case "max":
            addOpacity.value = addOpacity.max;
            addOpacity.status = "decreasing";
            break;
          case "random":
          default:
            addOpacity.value = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)(addOpacity);
            addOpacity.status = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() >= 0.5 ? "increasing" : "decreasing";
            break;
        }
      }
      particle.gradient.colors.push(addColor);
    }
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning && (particle.gradient?.angle.enable || (particle.gradient?.colors.some(c => c.value.h.enable || c.value.s.enable || c.value.l.enable) ?? false));
  }
  loadOptions(options, ...sources) {
    for (const source of sources) {
      if (!source?.gradient) {
        continue;
      }
      const gradientToLoad = source.gradient;
      if (!gradientToLoad) {
        continue;
      }
      options.gradient = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(gradientToLoad, gradient => {
        const tmp = new AnimatableGradient();
        tmp.load(gradient);
        return tmp;
      });
    }
  }
  update(particle, delta) {
    updateGradient(particle, delta);
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadGradientUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("gradient", () => new GradientUpdater(), refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});