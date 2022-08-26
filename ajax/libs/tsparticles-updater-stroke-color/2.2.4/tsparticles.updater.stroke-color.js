/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.2.4
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
})(this, (__WEBPACK_EXTERNAL_MODULE__818__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 818:
/***/ ((module) => {

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
  "loadStrokeColorUpdater": () => (/* binding */ loadStrokeColorUpdater)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/browser/StrokeColorUpdater.js


function updateColorValue(delta, value, valueAnimation, max, decrease) {
  var _a, _b;

  const colorValue = value;

  if (!colorValue || !colorValue.enable) {
    return;
  }

  const offset = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)(valueAnimation.offset),
        velocity = ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor + offset * 3.6,
        decay = (_b = value.decay) !== null && _b !== void 0 ? _b : 1;

  if (!decrease || colorValue.status === 0
  /* AnimationStatus.increasing */
  ) {
    colorValue.value += velocity;

    if (decrease && colorValue.value > max) {
      colorValue.status = 1
      /* AnimationStatus.decreasing */
      ;
      colorValue.value -= colorValue.value % max;
    }
  } else {
    colorValue.value -= velocity;

    if (colorValue.value < 0) {
      colorValue.status = 0
      /* AnimationStatus.increasing */
      ;
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

function updateStrokeColor(particle, delta) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;

  if (!((_a = particle.stroke) === null || _a === void 0 ? void 0 : _a.color)) {
    return;
  }

  const animationOptions = particle.stroke.color.animation,
        h = (_c = (_b = particle.strokeColor) === null || _b === void 0 ? void 0 : _b.h) !== null && _c !== void 0 ? _c : (_d = particle.color) === null || _d === void 0 ? void 0 : _d.h;

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
    /* strokeColor */

    particle.stroke = particle.options.stroke instanceof Array ? (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(particle.options.stroke, particle.id, particle.options.reduceDuplicates) : particle.options.stroke;
    particle.strokeWidth = particle.stroke.width * container.retina.pixelRatio;
    const strokeHslColor = (_a = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.rangeColorToHsl)(particle.stroke.color)) !== null && _a !== void 0 ? _a : particle.getFillColor();

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
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadStrokeColorUpdater(engine) {
  await engine.addParticleUpdater("strokeColor", container => new StrokeColorUpdater(container));
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});