/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.11.1
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
  loadColorUpdater: () => (/* binding */ loadColorUpdater)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Utils.js

function updateColorValue(delta, colorValue, valueAnimation, max, decrease) {
  if (!colorValue || !valueAnimation.enable || (colorValue.maxLoops ?? 0) > 0 && (colorValue.loops ?? 0) > (colorValue.maxLoops ?? 0)) {
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
  const offset = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)(valueAnimation.offset),
    velocity = (colorValue.velocity ?? 0) * delta.factor + offset * 3.6,
    decay = colorValue.decay ?? 1;
  if (!decrease || colorValue.status === "increasing") {
    colorValue.value += velocity;
    if (colorValue.value > max) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      if (decrease) {
        colorValue.status = "decreasing";
        colorValue.value -= colorValue.value % max;
      }
    }
  } else {
    colorValue.value -= velocity;
    if (colorValue.value < 0) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      colorValue.status = "increasing";
      colorValue.value += colorValue.value;
    }
  }
  if (colorValue.velocity && decay !== 1) {
    colorValue.velocity *= decay;
  }
  if (colorValue.value > max) {
    colorValue.value %= max;
  }
}
function updateColor(particle, delta) {
  const {
      h: hAnimation,
      s: sAnimation,
      l: lAnimation
    } = particle.options.color.animation,
    {
      color
    } = particle;
  if (!color) {
    return;
  }
  const {
    h,
    s,
    l
  } = color;
  if (h) {
    updateColorValue(delta, h, hAnimation, 360, false);
  }
  if (s) {
    updateColorValue(delta, s, sAnimation, 100, true);
  }
  if (l) {
    updateColorValue(delta, l, lAnimation, 100, true);
  }
}
;// CONCATENATED MODULE: ./dist/browser/ColorUpdater.js


class ColorUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const hslColor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.rangeColorToHsl)(particle.options.color, particle.id, particle.options.reduceDuplicates);
    if (hslColor) {
      particle.color = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getHslAnimationFromHsl)(hslColor, particle.options.color.animation, this.container.retina.reduceFactor);
    }
  }
  isEnabled(particle) {
    const {
        h: hAnimation,
        s: sAnimation,
        l: lAnimation
      } = particle.options.color.animation,
      {
        color
      } = particle;
    return !particle.destroyed && !particle.spawning && (color?.h.value !== undefined && hAnimation.enable || color?.s.value !== undefined && sAnimation.enable || color?.l.value !== undefined && lAnimation.enable);
  }
  update(particle, delta) {
    updateColor(particle, delta);
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadColorUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("color", container => new ColorUpdater(container), refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});