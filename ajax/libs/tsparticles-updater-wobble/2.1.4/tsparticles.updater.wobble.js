/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.1.4
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
  "loadWobbleUpdater": () => (/* binding */ loadWobbleUpdater)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/WobbleSpeed.js

class WobbleSpeed {
  constructor() {
    this.angle = 50;
    this.move = 10;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.angle !== undefined) {
      this.angle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.angle);
    }

    if (data.move !== undefined) {
      this.move = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.move);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Wobble.js


class Wobble {
  constructor() {
    this.distance = 5;
    this.enable = false;
    this.speed = new WobbleSpeed();
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.distance);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.speed !== undefined) {
      if (typeof data.speed === "number") {
        this.speed.load({
          angle: data.speed
        });
      } else {
        const rangeSpeed = data.speed;

        if (rangeSpeed.min !== undefined) {
          this.speed.load({
            angle: rangeSpeed
          });
        } else {
          this.speed.load(data.speed);
        }
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/WobbleUpdater.js


/**
 * Updates particle wobbling values
 * @param particle the particle to update
 * @param delta this variable contains the delta between the current frame and the previous frame
 */

function updateWobble(particle, delta) {
  var _a;

  const wobble = particle.options.wobble;

  if (!(wobble === null || wobble === void 0 ? void 0 : wobble.enable) || !particle.wobble) {
    return;
  }

  const angleSpeed = particle.wobble.angleSpeed * delta.factor,
        moveSpeed = particle.wobble.moveSpeed * delta.factor,
        distance = moveSpeed * (((_a = particle.retina.wobbleDistance) !== null && _a !== void 0 ? _a : 0) * delta.factor) / (1000 / 60),
        max = 2 * Math.PI;
  particle.wobble.angle += angleSpeed;

  if (particle.wobble.angle > max) {
    particle.wobble.angle -= max;
  }

  particle.position.x += distance * Math.cos(particle.wobble.angle);
  particle.position.y += distance * Math.abs(Math.sin(particle.wobble.angle));
}
/**
 * The Wobble updater plugin
 */


class WobbleUpdater {
  /**
   * The Wobble updater plugin constructor, assigns the container using the plugin
   * @param container the container using the plugin
   */
  constructor(container) {
    this.container = container;
  }
  /**
   * Initializing the particle for wobble animation
   * @param particle the particle to init
   */


  init(particle) {
    var _a;

    const wobbleOpt = particle.options.wobble;

    if (wobbleOpt === null || wobbleOpt === void 0 ? void 0 : wobbleOpt.enable) {
      particle.wobble = {
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(wobbleOpt.speed.angle) / 360,
        moveSpeed: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(wobbleOpt.speed.move) / 10
      };
    } else {
      particle.wobble = {
        angle: 0,
        angleSpeed: 0,
        moveSpeed: 0
      };
    }

    particle.retina.wobbleDistance = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)((_a = wobbleOpt === null || wobbleOpt === void 0 ? void 0 : wobbleOpt.distance) !== null && _a !== void 0 ? _a : 0) * this.container.retina.pixelRatio;
  }
  /**
   * Checks if the given particle needs the wobble animation
   * @param particle
   */


  isEnabled(particle) {
    var _a;

    return !particle.destroyed && !particle.spawning && !!((_a = particle.options.wobble) === null || _a === void 0 ? void 0 : _a.enable);
  }

  loadOptions(options, ...sources) {
    for (const source of sources) {
      if (!(source === null || source === void 0 ? void 0 : source.wobble)) {
        continue;
      }

      if (!options.wobble) {
        options.wobble = new Wobble();
      }

      options.wobble.load(source.wobble);
    }
  }
  /**
   * Updates the particle wobble animation
   * @param particle the particle to update
   * @param delta this variable contains the delta between the current frame and the previous frame
   */


  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateWobble(particle, delta);
  }

}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadWobbleUpdater(engine) {
  await engine.addParticleUpdater("wobble", container => new WobbleUpdater(container));
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});