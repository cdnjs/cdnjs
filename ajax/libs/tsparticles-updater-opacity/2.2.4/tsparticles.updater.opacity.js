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
  "loadOpacityUpdater": () => (/* binding */ loadOpacityUpdater)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/browser/OpacityUpdater.js


function checkDestroy(particle, value, minValue, maxValue) {
  switch (particle.options.opacity.animation.destroy) {
    case "max"
    /* DestroyType.max */
    :
      if (value >= maxValue) {
        particle.destroy();
      }

      break;

    case "min"
    /* DestroyType.min */
    :
      if (value <= minValue) {
        particle.destroy();
      }

      break;
  }
}

function updateOpacity(particle, delta) {
  var _a, _b, _c, _d, _e, _f;

  if (!particle.opacity) {
    return;
  }

  const minValue = particle.opacity.min,
        maxValue = particle.opacity.max,
        decay = (_a = particle.opacity.decay) !== null && _a !== void 0 ? _a : 1;

  if (particle.destroyed || !particle.opacity.enable || ((_b = particle.opacity.maxLoops) !== null && _b !== void 0 ? _b : 0) > 0 && ((_c = particle.opacity.loops) !== null && _c !== void 0 ? _c : 0) > ((_d = particle.opacity.maxLoops) !== null && _d !== void 0 ? _d : 0)) {
    return;
  }

  switch (particle.opacity.status) {
    case 0
    /* AnimationStatus.increasing */
    :
      if (particle.opacity.value >= maxValue) {
        particle.opacity.status = 1
        /* AnimationStatus.decreasing */
        ;

        if (!particle.opacity.loops) {
          particle.opacity.loops = 0;
        }

        particle.opacity.loops++;
      } else {
        particle.opacity.value += ((_e = particle.opacity.velocity) !== null && _e !== void 0 ? _e : 0) * delta.factor;
      }

      break;

    case 1
    /* AnimationStatus.decreasing */
    :
      if (particle.opacity.value <= minValue) {
        particle.opacity.status = 0
        /* AnimationStatus.increasing */
        ;

        if (!particle.opacity.loops) {
          particle.opacity.loops = 0;
        }

        particle.opacity.loops++;
      } else {
        particle.opacity.value -= ((_f = particle.opacity.velocity) !== null && _f !== void 0 ? _f : 0) * delta.factor;
      }

      break;
  }

  if (particle.opacity.velocity && particle.opacity.decay !== 1) {
    particle.opacity.velocity *= decay;
  }

  checkDestroy(particle, particle.opacity.value, minValue, maxValue);

  if (!particle.destroyed) {
    particle.opacity.value = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.clamp)(particle.opacity.value, minValue, maxValue);
  }
}

class OpacityUpdater {
  constructor(container) {
    this.container = container;
  }

  init(particle) {
    /* opacity */
    const opacityOptions = particle.options.opacity;
    particle.opacity = {
      enable: opacityOptions.animation.enable,
      max: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMax)(opacityOptions.value),
      min: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMin)(opacityOptions.value),
      value: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(opacityOptions.value),
      loops: 0,
      maxLoops: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(opacityOptions.animation.count)
    };
    const opacityAnimation = opacityOptions.animation;

    if (opacityAnimation.enable) {
      particle.opacity.decay = 1 - (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(opacityAnimation.decay);
      particle.opacity.status = 0
      /* AnimationStatus.increasing */
      ;
      const opacityRange = opacityOptions.value;
      particle.opacity.min = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMin)(opacityRange);
      particle.opacity.max = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMax)(opacityRange);

      switch (opacityAnimation.startValue) {
        case "min"
        /* StartValueType.min */
        :
          particle.opacity.value = particle.opacity.min;
          particle.opacity.status = 0
          /* AnimationStatus.increasing */
          ;
          break;

        case "random"
        /* StartValueType.random */
        :
          particle.opacity.value = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)(particle.opacity);
          particle.opacity.status = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() >= 0.5 ? 0
          /* AnimationStatus.increasing */
          : 1
          /* AnimationStatus.decreasing */
          ;
          break;

        case "max"
        /* StartValueType.max */
        :
        default:
          particle.opacity.value = particle.opacity.max;
          particle.opacity.status = 1
          /* AnimationStatus.decreasing */
          ;
          break;
      }

      particle.opacity.velocity = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(opacityAnimation.speed) / 100 * this.container.retina.reduceFactor;

      if (!opacityAnimation.sync) {
        particle.opacity.velocity *= (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)();
      }
    }
  }

  isEnabled(particle) {
    var _a, _b, _c, _d;

    return !particle.destroyed && !particle.spawning && !!particle.opacity && particle.opacity.enable && (((_a = particle.opacity.maxLoops) !== null && _a !== void 0 ? _a : 0) <= 0 || ((_b = particle.opacity.maxLoops) !== null && _b !== void 0 ? _b : 0) > 0 && ((_c = particle.opacity.loops) !== null && _c !== void 0 ? _c : 0) < ((_d = particle.opacity.maxLoops) !== null && _d !== void 0 ? _d : 0));
  }

  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateOpacity(particle, delta);
  }

}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadOpacityUpdater(engine) {
  await engine.addParticleUpdater("opacity", container => new OpacityUpdater(container));
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});