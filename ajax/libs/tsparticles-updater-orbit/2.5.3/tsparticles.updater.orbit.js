/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.5.3
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
  "loadOrbitUpdater": () => (/* binding */ loadOrbitUpdater)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/OrbitRotation.js

class OrbitRotation extends external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ValueWithRandom {
  constructor() {
    super();
    this.value = 45;
    this.random.enable = false;
    this.random.minimumValue = 0;
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    super.load(data);
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Orbit.js


class Orbit {
  constructor() {
    this.animation = new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.AnimationOptions();
    this.enable = false;
    this.opacity = 1;
    this.rotation = new OrbitRotation();
    this.width = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.animation.load(data.animation);
    this.rotation.load(data.rotation);
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.opacity !== undefined) {
      this.opacity = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.opacity);
    }
    if (data.width !== undefined) {
      this.width = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.width);
    }
    if (data.radius !== undefined) {
      this.radius = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)(data.radius);
    }
    if (data.color !== undefined) {
      this.color = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor.create(this.color, data.color);
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/OrbitUpdater.js


function drawEllipse(context, particle, fillColorValue, radius, opacity, width, rotation, start, end) {
  if (width <= 0) {
    return;
  }
  const pos = particle.getPosition();
  if (fillColorValue) {
    context.strokeStyle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromHsl)(fillColorValue, opacity);
  }
  context.lineWidth = width;
  const rotationRadian = rotation * Math.PI / 180;
  context.beginPath();
  context.ellipse(pos.x, pos.y, radius / 2, radius * 2, rotationRadian, start, end);
  context.stroke();
}
class OrbitUpdater {
  constructor(container) {
    this.container = container;
  }
  afterDraw(particle) {
    const orbitOptions = particle.options.orbit;
    if (orbitOptions === null || orbitOptions === void 0 ? void 0 : orbitOptions.enable) {
      this.drawOrbit(particle, "front");
    }
  }
  beforeDraw(particle) {
    const orbitOptions = particle.options.orbit;
    if (orbitOptions === null || orbitOptions === void 0 ? void 0 : orbitOptions.enable) {
      this.drawOrbit(particle, "back");
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
      drawEllipse(ctx, particle, (_a = particle.orbitColor) !== null && _a !== void 0 ? _a : particle.getFillColor(), (_c = (_b = particle.retina.orbitRadius) !== null && _b !== void 0 ? _b : container.retina.orbitRadius) !== null && _c !== void 0 ? _c : particle.getRadius(), (_d = particle.orbitOpacity) !== null && _d !== void 0 ? _d : 1, (_e = particle.orbitWidth) !== null && _e !== void 0 ? _e : 1, ((_f = particle.orbitRotation) !== null && _f !== void 0 ? _f : 0) * container.retina.pixelRatio, start, end);
    });
  }
  init(particle) {
    const container = this.container,
      particlesOptions = particle.options,
      orbitOptions = particlesOptions.orbit;
    if (!(orbitOptions === null || orbitOptions === void 0 ? void 0 : orbitOptions.enable)) {
      return;
    }
    particle.orbitRotation = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(orbitOptions.rotation.value);
    particle.orbitColor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.rangeColorToHsl)(orbitOptions.color);
    particle.retina.orbitRadius = orbitOptions.radius !== undefined ? (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(orbitOptions.radius) * container.retina.pixelRatio : undefined;
    container.retina.orbitRadius = particle.retina.orbitRadius;
    particle.orbitAnimationSpeed = orbitOptions.animation.enable ? (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(orbitOptions.animation.speed) : 0;
    particle.orbitWidth = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(orbitOptions.width);
    particle.orbitOpacity = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(orbitOptions.opacity);
  }
  isEnabled(particle) {
    var _a;
    const orbitAnimations = (_a = particle.options.orbit) === null || _a === void 0 ? void 0 : _a.animation;
    return !particle.destroyed && !particle.spawning && !!(orbitAnimations === null || orbitAnimations === void 0 ? void 0 : orbitAnimations.enable);
  }
  loadOptions(options, ...sources) {
    if (!options.orbit) {
      options.orbit = new Orbit();
    }
    for (const source of sources) {
      options.orbit.load(source === null || source === void 0 ? void 0 : source.orbit);
    }
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
}
;// CONCATENATED MODULE: ./dist/browser/index.js

function loadOrbitUpdater(engine) {
  engine.addParticleUpdater("orbit", container => new OrbitUpdater(container));
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});