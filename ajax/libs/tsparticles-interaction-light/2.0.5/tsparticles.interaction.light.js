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

/***/ 310:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ExternalLighter = void 0;

const tsparticles_engine_1 = __webpack_require__(818);

const Utils_1 = __webpack_require__(364);

class ExternalLighter extends tsparticles_engine_1.ExternalInteractorBase {
  constructor(container) {
    super(container);
  }

  interact() {
    return __awaiter(this, void 0, void 0, function* () {
      const container = this.container,
            options = container.actualOptions;

      if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
        const mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
          return;
        }

        container.canvas.draw(ctx => {
          (0, Utils_1.drawLight)(container, ctx, mousePos);
        });
      }
    });
  }

  isEnabled() {
    const container = this.container,
          mouse = container.interactivity.mouse,
          events = container.actualOptions.interactivity.events;

    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }

    return (0, tsparticles_engine_1.isInArray)("light", events.onHover.mode);
  }

  reset() {}

}

exports.ExternalLighter = ExternalLighter;

/***/ }),

/***/ 328:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ParticlesLighter = void 0;

const tsparticles_engine_1 = __webpack_require__(818);

const Utils_1 = __webpack_require__(364);

class ParticlesLighter extends tsparticles_engine_1.ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }

  interact(particle) {
    return __awaiter(this, void 0, void 0, function* () {
      const container = this.container,
            options = container.actualOptions;

      if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
        const mousePos = this.container.interactivity.mouse.position;

        if (mousePos) {
          container.canvas.draw(ctx => {
            (0, Utils_1.drawParticleShadow)(container, ctx, particle, mousePos);
          });
        }
      }
    });
  }

  isEnabled() {
    const container = this.container,
          mouse = container.interactivity.mouse,
          events = container.actualOptions.interactivity.events;

    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }

    return (0, tsparticles_engine_1.isInArray)("light", events.onHover.mode);
  }

  reset() {}

}

exports.ParticlesLighter = ParticlesLighter;

/***/ }),

/***/ 364:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.drawParticleShadow = exports.drawLight = void 0;

const tsparticles_engine_1 = __webpack_require__(818);

function drawLight(container, context, mousePos) {
  const lightOptions = container.actualOptions.interactivity.modes.light.area;
  context.beginPath();
  context.arc(mousePos.x, mousePos.y, lightOptions.radius, 0, 2 * Math.PI);
  const gradientAmbientLight = context.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, lightOptions.radius);
  const lightGradient = lightOptions.gradient;
  const gradientRgb = {
    start: (0, tsparticles_engine_1.colorToRgb)(lightGradient.start),
    stop: (0, tsparticles_engine_1.colorToRgb)(lightGradient.stop)
  };

  if (!gradientRgb.start || !gradientRgb.stop) {
    return;
  }

  gradientAmbientLight.addColorStop(0, (0, tsparticles_engine_1.getStyleFromRgb)(gradientRgb.start));
  gradientAmbientLight.addColorStop(1, (0, tsparticles_engine_1.getStyleFromRgb)(gradientRgb.stop));
  context.fillStyle = gradientAmbientLight;
  context.fill();
}

exports.drawLight = drawLight;

function drawParticleShadow(container, context, particle, mousePos) {
  var _a, _b;

  const pos = particle.getPosition();
  const shadowOptions = container.actualOptions.interactivity.modes.light.shadow;
  context.save();
  const radius = particle.getRadius();
  const sides = particle.sides;
  const full = Math.PI * 2 / sides;
  const angle = -((_b = (_a = particle.rotate) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0) + Math.PI / 4;
  const factor = 1;
  const dots = [];

  for (let i = 0; i < sides; i++) {
    dots.push({
      x: pos.x + radius * Math.sin(angle + full * i) * factor,
      y: pos.y + radius * Math.cos(angle + full * i) * factor
    });
  }

  const points = [];
  const shadowLength = shadowOptions.length;

  for (const dot of dots) {
    const dotAngle = Math.atan2(mousePos.y - dot.y, mousePos.x - dot.x);
    const endX = dot.x + shadowLength * Math.sin(-dotAngle - Math.PI / 2);
    const endY = dot.y + shadowLength * Math.cos(-dotAngle - Math.PI / 2);
    points.push({
      endX: endX,
      endY: endY,
      startX: dot.x,
      startY: dot.y
    });
  }

  const shadowRgb = (0, tsparticles_engine_1.colorToRgb)(shadowOptions.color);

  if (!shadowRgb) {
    return;
  }

  const shadowColor = (0, tsparticles_engine_1.getStyleFromRgb)(shadowRgb);

  for (let i = points.length - 1; i >= 0; i--) {
    const n = i == points.length - 1 ? 0 : i + 1;
    context.beginPath();
    context.moveTo(points[i].startX, points[i].startY);
    context.lineTo(points[n].startX, points[n].startY);
    context.lineTo(points[n].endX, points[n].endY);
    context.lineTo(points[i].endX, points[i].endY);
    context.fillStyle = shadowColor;
    context.fill();
  }

  context.restore();
}

exports.drawParticleShadow = drawParticleShadow;

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
exports.loadLightInteraction = void 0;

const ExternalLighter_1 = __webpack_require__(310);

const ParticlesLighter_1 = __webpack_require__(328);

function loadLightInteraction(engine) {
  engine.addInteractor("externalLight", container => new ExternalLighter_1.ExternalLighter(container));
  engine.addInteractor("particlesLight", container => new ParticlesLighter_1.ParticlesLighter(container));
}

exports.loadLightInteraction = loadLightInteraction;
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});