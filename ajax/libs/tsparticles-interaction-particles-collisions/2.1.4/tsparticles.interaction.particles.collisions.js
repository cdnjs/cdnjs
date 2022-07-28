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
  "loadParticlesCollisionsInteraction": () => (/* binding */ loadParticlesCollisionsInteraction)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/browser/Absorb.js

function absorb(p1, p2, fps, pixelRatio) {
  if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
    p1.destroy();
  } else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
    p2.destroy();
  } else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
    if (p1.getRadius() >= p2.getRadius()) {
      const factor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.clamp)(p1.getRadius() / p2.getRadius(), 0, p2.getRadius()) * fps;
      p1.size.value += factor;
      p2.size.value -= factor;

      if (p2.getRadius() <= pixelRatio) {
        p2.size.value = 0;
        p2.destroy();
      }
    } else {
      const factor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.clamp)(p2.getRadius() / p1.getRadius(), 0, p1.getRadius()) * fps;
      p1.size.value -= factor;
      p2.size.value += factor;

      if (p1.getRadius() <= pixelRatio) {
        p1.size.value = 0;
        p1.destroy();
      }
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Bounce.js

function bounce(p1, p2) {
  (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.circleBounce)((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.circleBounceDataFromParticle)(p1), (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.circleBounceDataFromParticle)(p2));
}
;// CONCATENATED MODULE: ./dist/browser/Destroy.js

function destroy(p1, p2) {
  if (!p1.unbreakable && !p2.unbreakable) {
    bounce(p1, p2);
  }

  if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
    p1.destroy();
  } else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
    p2.destroy();
  } else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
    if (p1.getRadius() >= p2.getRadius()) {
      p2.destroy();
    } else {
      p1.destroy();
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/ResolveCollision.js



function resolveCollision(p1, p2, fps, pixelRatio) {
  switch (p1.options.collisions.mode) {
    case "absorb"
    /* CollisionMode.absorb */
    :
      {
        absorb(p1, p2, fps, pixelRatio);
        break;
      }

    case "bounce"
    /* CollisionMode.bounce */
    :
      {
        bounce(p1, p2);
        break;
      }

    case "destroy"
    /* CollisionMode.destroy */
    :
      {
        destroy(p1, p2);
        break;
      }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Collider.js


/**
 * @category Interactions
 */

class Collider extends external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }

  clear() {// do nothing
  }

  init() {// do nothing
  }

  async interact(p1) {
    const container = this.container,
          pos1 = p1.getPosition(),
          radius1 = p1.getRadius(),
          query = container.particles.quadTree.queryCircle(pos1, radius1 * 2);

    for (const p2 of query) {
      if (p1 === p2 || !p2.options.collisions.enable || p1.options.collisions.mode !== p2.options.collisions.mode || p2.destroyed || p2.spawning) {
        continue;
      }

      const pos2 = p2.getPosition();
      const radius2 = p2.getRadius();

      if (Math.abs(Math.round(pos1.z) - Math.round(pos2.z)) > radius1 + radius2) {
        continue;
      }

      const dist = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(pos1, pos2);
      const distP = radius1 + radius2;

      if (dist > distP) {
        continue;
      }

      resolveCollision(p1, p2, container.fpsLimit / 1000, container.retina.pixelRatio);
    }
  }

  isEnabled(particle) {
    return particle.options.collisions.enable;
  }

  reset() {// do nothing
  }

}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadParticlesCollisionsInteraction(engine) {
  await engine.addInteractor("particlesCollisions", container => new Collider(container));
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});