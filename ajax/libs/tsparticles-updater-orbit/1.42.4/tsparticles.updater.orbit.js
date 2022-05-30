/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v1.42.4
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles")) : factory(root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__764__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 764:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__764__;

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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "loadOrbitUpdater": function() { return /* binding */ loadOrbitUpdater; }
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles","commonjs2":"tsparticles","amd":"tsparticles","root":"window"}
var external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_ = __webpack_require__(764);
;// CONCATENATED MODULE: ./dist/OrbitUpdater.js

class OrbitUpdater {
  constructor(container) {
    this.container = container;
  }

  init(particle) {
    const particlesOptions = particle.options;
    const orbitOptions = particlesOptions.orbit;

    if (orbitOptions.enable) {
      particle.orbitRotation = (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.getRangeValue)(orbitOptions.rotation.value);
      particle.orbitColor = (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.colorToHsl)(orbitOptions.color);
      particle.retina.orbitRadius = (orbitOptions === null || orbitOptions === void 0 ? void 0 : orbitOptions.radius) !== undefined ? (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.getRangeValue)(orbitOptions.radius) * this.container.retina.pixelRatio : undefined;
      particle.orbitAnimationSpeed = orbitOptions.animation.enable ? (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.getRangeValue)(orbitOptions.animation.speed) : 0;
      particle.orbitWidth = (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.getRangeValue)(orbitOptions.width);
      particle.orbitOpacity = (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.getRangeValue)(orbitOptions.opacity);
    }
  }

  isEnabled(particle) {
    const orbitAnimations = particle.options.orbit.animation;
    return !particle.destroyed && !particle.spawning && orbitAnimations.enable;
  }

  update(particle, delta) {
    var _a;

    if (!this.isEnabled(particle)) {
      return;
    }

    if (particle.orbitRotation === undefined) {
      particle.orbitRotation = 0;
    }

    particle.orbitRotation += ((_a = particle.orbitAnimationSpeed) !== null && _a !== void 0 ? _a : 0 / (Math.PI * 2)) * delta.factor;
  }

  beforeDraw(particle) {
    const orbitOptions = particle.options.orbit;

    if (orbitOptions.enable) {
      this.drawOrbit(particle, "back");
    }
  }

  afterDraw(particle) {
    const orbitOptions = particle.options.orbit;

    if (orbitOptions.enable) {
      this.drawOrbit(particle, "front");
    }
  }

  drawOrbit(particle, type) {
    const container = this.container;
    let start;
    let end;

    switch (type) {
      case "back":
        start = Math.PI / 2;
        end = Math.PI * 3 / 2;
        break;

      case "front":
        start = Math.PI * 3 / 2;
        end = Math.PI / 2;
        break;

      default:
        start = 0;
        end = 2 * Math.PI;
    }

    container.canvas.draw(ctx => {
      var _a, _b, _c, _d, _e, _f;

      (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.drawEllipse)(ctx, particle, (_a = particle.orbitColor) !== null && _a !== void 0 ? _a : particle.getFillColor(), (_c = (_b = particle.retina.orbitRadius) !== null && _b !== void 0 ? _b : container.retina.orbitRadius) !== null && _c !== void 0 ? _c : particle.getRadius(), (_d = particle.orbitOpacity) !== null && _d !== void 0 ? _d : 1, (_e = particle.orbitWidth) !== null && _e !== void 0 ? _e : 1, ((_f = particle.orbitRotation) !== null && _f !== void 0 ? _f : 0) * container.retina.pixelRatio, start, end);
    });
  }

}
;// CONCATENATED MODULE: ./dist/index.js

function loadOrbitUpdater(engine) {
  engine.addParticleUpdater("orbit", container => new OrbitUpdater(container));
}
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});