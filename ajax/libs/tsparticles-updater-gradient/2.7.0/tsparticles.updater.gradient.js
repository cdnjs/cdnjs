/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.7.0
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
  "loadGradientUpdater": () => (/* binding */ loadGradientUpdater)
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
      if (typeof data.opacity === "number") {
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
      this.value = data.value;
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
;// CONCATENATED MODULE: ./dist/browser/GradientUpdater.js


function updateColorOpacity(delta, value) {
  var _a, _b, _c;
  if (!value.enable) {
    return;
  }
  const decay = (_a = value.decay) !== null && _a !== void 0 ? _a : 1;
  switch (value.status) {
    case "increasing":
      if (value.value >= value.max) {
        value.status = "decreasing";
      } else {
        value.value += ((_b = value.velocity) !== null && _b !== void 0 ? _b : 0) * delta.factor;
      }
      break;
    case "decreasing":
      if (value.value <= value.min) {
        value.status = "increasing";
      } else {
        value.value -= ((_c = value.velocity) !== null && _c !== void 0 ? _c : 0) * delta.factor;
      }
      break;
  }
  if (value.velocity && decay !== 1) {
    value.velocity *= decay;
  }
}
function updateColorValue(delta, value, max, decrease) {
  var _a, _b;
  const colorValue = value;
  if (!colorValue || !colorValue.enable) {
    return;
  }
  const velocity = ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor,
    decay = (_b = value.decay) !== null && _b !== void 0 ? _b : 1;
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
  if (value.velocity && decay !== 1) {
    value.velocity *= decay;
  }
}
function updateAngle(delta, angle) {
  var _a, _b;
  const speed = ((_a = angle.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor,
    max = 2 * Math.PI,
    decay = (_b = angle.decay) !== null && _b !== void 0 ? _b : 1;
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
  getColorStyles(particle, context, radius, opacity) {
    var _a, _b;
    const gradient = particle.gradient;
    if (!gradient) {
      return {};
    }
    const gradientAngle = gradient.angle.value,
      fillGradient = gradient.type === "radial" ? context.createRadialGradient(0, 0, 0, 0, 0, radius) : context.createLinearGradient(Math.cos(gradientAngle) * -radius, Math.sin(gradientAngle) * -radius, Math.cos(gradientAngle) * radius, Math.sin(gradientAngle) * radius);
    for (const color of gradient.colors) {
      fillGradient.addColorStop(color.stop, (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromHsl)({
        h: color.value.h.value,
        s: color.value.s.value,
        l: color.value.l.value
      }, (_b = (_a = color.opacity) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : opacity));
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
    particle.gradient = {
      angle: {
        value: gradient.angle.value,
        enable: gradient.angle.animation.enable,
        velocity: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(gradient.angle.animation.speed) / 360 * particle.container.retina.reduceFactor,
        decay: 1 - (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(gradient.angle.animation.decay)
      },
      type: gradient.type,
      colors: []
    };
    let rotateDirection = gradient.angle.direction;
    if (rotateDirection === "random") {
      const index = Math.floor((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * 2);
      rotateDirection = index > 0 ? "counter-clockwise" : "clockwise";
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
            decay: 1 - (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(grColor.opacity.animation.decay)
          } : undefined
        };
      if (grColor.opacity && addColor.opacity) {
        const opacityRange = grColor.opacity.value;
        addColor.opacity.min = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMin)(opacityRange);
        addColor.opacity.max = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMax)(opacityRange);
        const opacityAnimation = grColor.opacity.animation;
        switch (opacityAnimation.startValue) {
          case "min":
            addColor.opacity.value = addColor.opacity.min;
            addColor.opacity.status = "increasing";
            break;
          case "random":
            addColor.opacity.value = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)(addColor.opacity);
            addColor.opacity.status = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() >= 0.5 ? "increasing" : "decreasing";
            break;
          case "max":
          default:
            addColor.opacity.value = addColor.opacity.max;
            addColor.opacity.status = "decreasing";
            break;
        }
      }
      particle.gradient.colors.push(addColor);
    }
  }
  isEnabled(particle) {
    var _a, _b, _c;
    return !particle.destroyed && !particle.spawning && (((_a = particle.gradient) === null || _a === void 0 ? void 0 : _a.angle.enable) || ((_c = (_b = particle.gradient) === null || _b === void 0 ? void 0 : _b.colors.some(c => c.value.h.enable || c.value.s.enable || c.value.l.enable)) !== null && _c !== void 0 ? _c : false));
  }
  loadOptions(options, ...sources) {
    for (const source of sources) {
      if (!(source === null || source === void 0 ? void 0 : source.gradient)) {
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

function loadGradientUpdater(engine) {
  engine.addParticleUpdater("gradient", () => new GradientUpdater());
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});