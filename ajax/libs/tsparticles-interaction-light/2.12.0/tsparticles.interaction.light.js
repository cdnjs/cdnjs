/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.12.0
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
  Light: () => (/* reexport */ Light),
  LightArea: () => (/* reexport */ LightArea),
  LightGradient: () => (/* reexport */ LightGradient),
  LightShadow: () => (/* reexport */ LightShadow),
  loadLightInteraction: () => (/* binding */ loadLightInteraction)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/LightGradient.js

class LightGradient {
  constructor() {
    this.start = new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor();
    this.stop = new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor();
    this.start.value = "#ffffff";
    this.stop.value = "#000000";
  }
  load(data) {
    if (!data) {
      return;
    }
    this.start = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor.create(this.start, data.start);
    this.stop = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor.create(this.stop, data.stop);
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/LightArea.js

class LightArea {
  constructor() {
    this.gradient = new LightGradient();
    this.radius = 1000;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.gradient.load(data.gradient);
    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/LightShadow.js

class LightShadow {
  constructor() {
    this.color = new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor();
    this.color.value = "#000000";
    this.length = 2000;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.color = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor.create(this.color, data.color);
    if (data.length !== undefined) {
      this.length = data.length;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Light.js


class Light {
  constructor() {
    this.area = new LightArea();
    this.shadow = new LightShadow();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.area.load(data.area);
    this.shadow.load(data.shadow);
  }
}
;// CONCATENATED MODULE: ./dist/browser/Utils.js

function drawLight(container, context, mousePos) {
  const lightOptions = container.actualOptions.interactivity.modes.light?.area;
  if (!lightOptions) {
    return;
  }
  context.beginPath();
  context.arc(mousePos.x, mousePos.y, lightOptions.radius, 0, 2 * Math.PI);
  const gradientAmbientLight = context.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, lightOptions.radius);
  const gradientRgb = container.canvas.mouseLight;
  if (!gradientRgb || !gradientRgb.start || !gradientRgb.stop) {
    return;
  }
  gradientAmbientLight.addColorStop(0, (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromRgb)(gradientRgb.start));
  gradientAmbientLight.addColorStop(1, (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromRgb)(gradientRgb.stop));
  context.fillStyle = gradientAmbientLight;
  context.fill();
}
function drawParticleShadow(container, context, particle, mousePos) {
  const pos = particle.getPosition(),
    shadowOptions = container.actualOptions.interactivity.modes.light?.shadow;
  if (!shadowOptions) {
    return;
  }
  const shadowRgb = particle.lightShadow;
  if (!shadowRgb) {
    return;
  }
  const radius = particle.getRadius(),
    sides = particle.sides,
    full = Math.PI * 2 / sides,
    angle = -particle.rotation + Math.PI / 4,
    factor = 1,
    dots = [];
  for (let i = 0; i < sides; i++) {
    dots.push({
      x: pos.x + radius * Math.sin(angle + full * i) * factor,
      y: pos.y + radius * Math.cos(angle + full * i) * factor
    });
  }
  const points = [],
    shadowLength = shadowOptions.length;
  for (const dot of dots) {
    const dotAngle = Math.atan2(mousePos.y - dot.y, mousePos.x - dot.x),
      end = {
        x: dot.x + shadowLength * Math.sin(-dotAngle - Math.PI / 2),
        y: dot.y + shadowLength * Math.cos(-dotAngle - Math.PI / 2)
      };
    points.push({
      end: end,
      start: dot
    });
  }
  const shadowColor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromRgb)(shadowRgb),
    last = points.length - 1;
  for (let i = last, n = 0; i >= 0; n = i--) {
    context.beginPath();
    context.moveTo(points[i].start.x, points[i].start.y);
    context.lineTo(points[n].start.x, points[n].start.y);
    context.lineTo(points[n].end.x, points[n].end.y);
    context.lineTo(points[i].end.x, points[i].end.y);
    context.fillStyle = shadowColor;
    context.fill();
  }
}
;// CONCATENATED MODULE: ./dist/browser/ExternalLighter.js



class ExternalLighter extends external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {}
  init() {}
  async interact() {
    const container = this.container,
      options = container.actualOptions,
      interactivity = container.interactivity;
    if (!options.interactivity.events.onHover.enable || interactivity.status !== "pointermove") {
      return;
    }
    const mousePos = interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    container.canvas.draw(ctx => {
      drawLight(container, ctx, mousePos);
    });
  }
  isEnabled(particle) {
    const container = this.container,
      mouse = container.interactivity.mouse,
      interactivity = particle?.interactivity ?? container.actualOptions.interactivity,
      events = interactivity.events;
    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }
    const res = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("light", events.onHover.mode);
    if (res && interactivity.modes.light) {
      const lightGradient = interactivity.modes.light.area.gradient;
      container.canvas.mouseLight = {
        start: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.rangeColorToRgb)(lightGradient.start),
        stop: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.rangeColorToRgb)(lightGradient.stop)
      };
    }
    return res;
  }
  loadModeOptions(options, ...sources) {
    if (!options.light) {
      options.light = new Light();
    }
    for (const source of sources) {
      options.light.load(source?.light);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ./dist/browser/ParticlesLighter.js


class ParticlesLighter extends external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {}
  init() {}
  async interact(particle) {
    const container = this.container,
      options = container.actualOptions,
      interactivity = container.interactivity;
    if (!options.interactivity.events.onHover.enable || interactivity.status !== "pointermove") {
      return;
    }
    const mousePos = interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    container.canvas.draw(ctx => {
      drawParticleShadow(container, ctx, particle, mousePos);
    });
  }
  isEnabled(particle) {
    const container = this.container,
      interactivity = particle.interactivity ?? container.actualOptions.interactivity,
      mouse = container.interactivity.mouse,
      events = interactivity.events;
    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }
    const res = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("light", events.onHover.mode);
    if (res && interactivity.modes.light) {
      const shadowOptions = interactivity.modes.light.shadow;
      particle.lightShadow = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.rangeColorToRgb)(shadowOptions.color);
    }
    return res;
  }
  reset() {}
}
;// CONCATENATED MODULE: ./dist/browser/index.js


async function loadLightInteraction(engine, refresh = true) {
  await engine.addInteractor("externalLight", container => new ExternalLighter(container), refresh);
  await engine.addInteractor("particlesLight", container => new ParticlesLighter(container), refresh);
}








})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});