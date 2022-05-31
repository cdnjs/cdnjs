/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.6
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
  "loadTiltUpdater": () => (/* binding */ loadTiltUpdater)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/browser/TiltUpdater.js


function updateTilt(particle, delta) {
  var _a;

  if (!particle.tilt) {
    return;
  }

  const tilt = particle.options.tilt;
  const tiltAnimation = tilt.animation;
  const speed = ((_a = particle.tilt.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
  const max = 2 * Math.PI;

  if (!tiltAnimation.enable) {
    return;
  }

  switch (particle.tilt.status) {
    case 0
    /* increasing */
    :
      particle.tilt.value += speed;

      if (particle.tilt.value > max) {
        particle.tilt.value -= max;
      }

      break;

    case 1
    /* decreasing */
    :
    default:
      particle.tilt.value -= speed;

      if (particle.tilt.value < 0) {
        particle.tilt.value += max;
      }

      break;
  }
}

class TiltUpdater {
  constructor(container) {
    this.container = container;
  }

  init(particle) {
    const tiltOptions = particle.options.tilt;
    particle.tilt = {
      enable: tiltOptions.enable,
      value: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(tiltOptions.value) * Math.PI / 180,
      sinDirection: Math.random() >= 0.5 ? 1 : -1,
      cosDirection: Math.random() >= 0.5 ? 1 : -1
    };
    let tiltDirection = tiltOptions.direction;

    if (tiltDirection === "random"
    /* random */
    ) {
      const index = Math.floor(Math.random() * 2);
      tiltDirection = index > 0 ? "counter-clockwise"
      /* counterClockwise */
      : "clockwise"
      /* clockwise */
      ;
    }

    switch (tiltDirection) {
      case "counter-clockwise"
      /* counterClockwise */
      :
      case "counterClockwise":
        particle.tilt.status = 1
        /* decreasing */
        ;
        break;

      case "clockwise"
      /* clockwise */
      :
        particle.tilt.status = 0
        /* increasing */
        ;
        break;
    }

    const tiltAnimation = particle.options.tilt.animation;

    if (tiltAnimation.enable) {
      particle.tilt.velocity = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(tiltAnimation.speed) / 360 * this.container.retina.reduceFactor;

      if (!tiltAnimation.sync) {
        particle.tilt.velocity *= Math.random();
      }
    }
  }

  isEnabled(particle) {
    const tilt = particle.options.tilt;
    const tiltAnimation = tilt.animation;
    return !particle.destroyed && !particle.spawning && tiltAnimation.enable;
  }

  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateTilt(particle, delta);
  }

}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadTiltUpdater(engine) {
  await engine.addParticleUpdater("tilt", container => new TiltUpdater(container));
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});