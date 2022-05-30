/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.5
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
})(this, function(__WEBPACK_EXTERNAL_MODULE__818__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 766:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.OrbitUpdater = void 0;

const tsparticles_engine_1 = __webpack_require__(818);

class OrbitUpdater {
  constructor(container) {
    this.container = container;
  }

  init(particle) {
    const container = this.container,
          particlesOptions = particle.options,
          orbitOptions = particlesOptions.orbit;

    if (orbitOptions.enable) {
      particle.orbitRotation = (0, tsparticles_engine_1.getRangeValue)(orbitOptions.rotation.value);
      particle.orbitColor = (0, tsparticles_engine_1.colorToHsl)(orbitOptions.color);
      particle.retina.orbitRadius = (orbitOptions === null || orbitOptions === void 0 ? void 0 : orbitOptions.radius) !== undefined ? (0, tsparticles_engine_1.getRangeValue)(orbitOptions.radius) * container.retina.pixelRatio : undefined;
      container.retina.orbitRadius = particle.retina.orbitRadius;
      particle.orbitAnimationSpeed = orbitOptions.animation.enable ? (0, tsparticles_engine_1.getRangeValue)(orbitOptions.animation.speed) : 0;
      particle.orbitWidth = (0, tsparticles_engine_1.getRangeValue)(orbitOptions.width);
      particle.orbitOpacity = (0, tsparticles_engine_1.getRangeValue)(orbitOptions.opacity);
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
    let start, end;

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

      (0, tsparticles_engine_1.drawEllipse)(ctx, particle, (_a = particle.orbitColor) !== null && _a !== void 0 ? _a : particle.getFillColor(), (_c = (_b = particle.retina.orbitRadius) !== null && _b !== void 0 ? _b : container.retina.orbitRadius) !== null && _c !== void 0 ? _c : particle.getRadius(), (_d = particle.orbitOpacity) !== null && _d !== void 0 ? _d : 1, (_e = particle.orbitWidth) !== null && _e !== void 0 ? _e : 1, ((_f = particle.orbitRotation) !== null && _f !== void 0 ? _f : 0) * container.retina.pixelRatio, start, end);
    });
  }

}

exports.OrbitUpdater = OrbitUpdater;

/***/ }),

/***/ 818:
/***/ (function(module) {

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
var exports = __webpack_exports__;


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.loadOrbitUpdater = void 0;

const OrbitUpdater_1 = __webpack_require__(766);

function loadOrbitUpdater(engine) {
  engine.addParticleUpdater("orbit", container => new OrbitUpdater_1.OrbitUpdater(container));
}

exports.loadOrbitUpdater = loadOrbitUpdater;
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});