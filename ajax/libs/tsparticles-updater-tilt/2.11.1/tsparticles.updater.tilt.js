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
  loadTiltUpdater: () => (/* binding */ loadTiltUpdater)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/TiltAnimation.js

class TiltAnimation {
  constructor() {
    this.enable = false;
    this.speed = 0;
    this.decay = 0;
    this.sync = false;
  }
  load(data) {
    if (!data) {
      return;
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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Tilt.js


class Tilt extends external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ValueWithRandom {
  constructor() {
    super();
    this.animation = new TiltAnimation();
    this.direction = "clockwise";
    this.enable = false;
    this.value = 0;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    this.animation.load(data.animation);
    if (data.direction !== undefined) {
      this.direction = data.direction;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Utils.js
function updateTilt(particle, delta) {
  if (!particle.tilt || !particle.options.tilt) {
    return;
  }
  const tilt = particle.options.tilt,
    tiltAnimation = tilt.animation,
    speed = (particle.tilt.velocity ?? 0) * delta.factor,
    max = 2 * Math.PI,
    decay = particle.tilt.decay ?? 1;
  if (!tiltAnimation.enable) {
    return;
  }
  switch (particle.tilt.status) {
    case "increasing":
      particle.tilt.value += speed;
      if (particle.tilt.value > max) {
        particle.tilt.value -= max;
      }
      break;
    case "decreasing":
    default:
      particle.tilt.value -= speed;
      if (particle.tilt.value < 0) {
        particle.tilt.value += max;
      }
      break;
  }
  if (particle.tilt.velocity && decay !== 1) {
    particle.tilt.velocity *= decay;
  }
}
;// CONCATENATED MODULE: ./dist/browser/TiltUpdater.js



class TiltUpdater {
  constructor(container) {
    this.container = container;
  }
  getTransformValues(particle) {
    const tilt = particle.tilt?.enable && particle.tilt;
    return {
      b: tilt ? Math.cos(tilt.value) * tilt.cosDirection : undefined,
      c: tilt ? Math.sin(tilt.value) * tilt.sinDirection : undefined
    };
  }
  init(particle) {
    const tiltOptions = particle.options.tilt;
    if (!tiltOptions) {
      return;
    }
    particle.tilt = {
      enable: tiltOptions.enable,
      value: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(tiltOptions.value) * Math.PI / 180,
      sinDirection: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() >= 0.5 ? 1 : -1,
      cosDirection: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() >= 0.5 ? 1 : -1
    };
    let tiltDirection = tiltOptions.direction;
    if (tiltDirection === "random") {
      const index = Math.floor((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * 2);
      tiltDirection = index > 0 ? "counter-clockwise" : "clockwise";
    }
    switch (tiltDirection) {
      case "counter-clockwise":
      case "counterClockwise":
        particle.tilt.status = "decreasing";
        break;
      case "clockwise":
        particle.tilt.status = "increasing";
        break;
    }
    const tiltAnimation = particle.options.tilt?.animation;
    if (tiltAnimation?.enable) {
      particle.tilt.decay = 1 - (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(tiltAnimation.decay);
      particle.tilt.velocity = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(tiltAnimation.speed) / 360 * this.container.retina.reduceFactor;
      if (!tiltAnimation.sync) {
        particle.tilt.velocity *= (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)();
      }
    }
  }
  isEnabled(particle) {
    const tiltAnimation = particle.options.tilt?.animation;
    return !particle.destroyed && !particle.spawning && !!tiltAnimation?.enable;
  }
  loadOptions(options, ...sources) {
    if (!options.tilt) {
      options.tilt = new Tilt();
    }
    for (const source of sources) {
      options.tilt.load(source?.tilt);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateTilt(particle, delta);
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadTiltUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("tilt", container => new TiltUpdater(container), refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});