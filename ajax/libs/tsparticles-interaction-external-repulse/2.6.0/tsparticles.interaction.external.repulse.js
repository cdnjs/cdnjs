/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.6.0
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
  "Repulse": () => (/* reexport */ Repulse),
  "RepulseBase": () => (/* reexport */ RepulseBase),
  "RepulseDiv": () => (/* reexport */ RepulseDiv),
  "loadExternalRepulseInteraction": () => (/* binding */ loadExternalRepulseInteraction)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/RepulseBase.js
class RepulseBase {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
    this.factor = 100;
    this.speed = 1;
    this.maxSpeed = 50;
    this.easing = "ease-out-quad";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
    if (data.duration !== undefined) {
      this.duration = data.duration;
    }
    if (data.easing !== undefined) {
      this.easing = data.easing;
    }
    if (data.factor !== undefined) {
      this.factor = data.factor;
    }
    if (data.speed !== undefined) {
      this.speed = data.speed;
    }
    if (data.maxSpeed !== undefined) {
      this.maxSpeed = data.maxSpeed;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/RepulseDiv.js


class RepulseDiv extends RepulseBase {
  constructor() {
    super();
    this.selectors = [];
  }
  get ids() {
    return (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(this.selectors, t => t.replace("#", ""));
  }
  set ids(value) {
    this.selectors = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(value, t => `#${t}`);
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.ids !== undefined) {
      this.ids = data.ids;
    }
    if (data.selectors !== undefined) {
      this.selectors = data.selectors;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Repulse.js



class Repulse extends RepulseBase {
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    this.divs = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.executeOnSingleOrMultiple)(data.divs, div => {
      const tmp = new RepulseDiv();
      tmp.load(div);
      return tmp;
    });
  }
}
;// CONCATENATED MODULE: ./dist/browser/Repulser.js


class Repulser extends external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ExternalInteractorBase {
  constructor(engine, container) {
    super(container);
    this._engine = engine;
    if (!container.repulse) {
      container.repulse = {
        particles: []
      };
    }
    this.handleClickMode = mode => {
      const options = this.container.actualOptions,
        repulse = options.interactivity.modes.repulse;
      if (!repulse || mode !== "repulse") {
        return;
      }
      if (!container.repulse) {
        container.repulse = {
          particles: []
        };
      }
      container.repulse.clicking = true;
      container.repulse.count = 0;
      for (const particle of container.repulse.particles) {
        if (!this.isEnabled(particle)) {
          continue;
        }
        particle.velocity.setTo(particle.initialVelocity);
      }
      container.repulse.particles = [];
      container.repulse.finish = false;
      setTimeout(() => {
        if (!container.destroyed) {
          if (!container.repulse) {
            container.repulse = {
              particles: []
            };
          }
          container.repulse.clicking = false;
        }
      }, repulse.duration * 1000);
    };
  }
  clear() {}
  init() {
    const container = this.container,
      repulse = container.actualOptions.interactivity.modes.repulse;
    if (!repulse) {
      return;
    }
    container.retina.repulseModeDistance = repulse.distance * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container,
      options = container.actualOptions,
      mouseMoveStatus = container.interactivity.status === external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.mouseMoveEvent,
      events = options.interactivity.events,
      hoverEnabled = events.onHover.enable,
      hoverMode = events.onHover.mode,
      clickEnabled = events.onClick.enable,
      clickMode = events.onClick.mode,
      divs = events.onDiv;
    if (mouseMoveStatus && hoverEnabled && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("repulse", hoverMode)) {
      this.hoverRepulse();
    } else if (clickEnabled && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("repulse", clickMode)) {
      this.clickRepulse();
    } else {
      (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.divModeExecute)("repulse", divs, (selector, div) => this.singleSelectorRepulse(selector, div));
    }
  }
  isEnabled(particle) {
    var _a;
    const container = this.container,
      options = container.actualOptions,
      mouse = container.interactivity.mouse,
      events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : options.interactivity).events,
      divs = events.onDiv,
      divRepulse = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isDivModeEnabled)("repulse", divs);
    if (!(divRepulse || events.onHover.enable && mouse.position || events.onClick.enable && mouse.clickPosition)) {
      return false;
    }
    const hoverMode = events.onHover.mode,
      clickMode = events.onClick.mode;
    return (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("repulse", hoverMode) || (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("repulse", clickMode) || divRepulse;
  }
  loadModeOptions(options, ...sources) {
    if (!options.repulse) {
      options.repulse = new Repulse();
    }
    for (const source of sources) {
      options.repulse.load(source === null || source === void 0 ? void 0 : source.repulse);
    }
  }
  reset() {}
  clickRepulse() {
    const container = this.container,
      repulse = container.actualOptions.interactivity.modes.repulse;
    if (!repulse) {
      return;
    }
    if (!container.repulse) {
      container.repulse = {
        particles: []
      };
    }
    if (!container.repulse.finish) {
      if (!container.repulse.count) {
        container.repulse.count = 0;
      }
      container.repulse.count++;
      if (container.repulse.count === container.particles.count) {
        container.repulse.finish = true;
      }
    }
    if (container.repulse.clicking) {
      const repulseDistance = container.retina.repulseModeDistance;
      if (!repulseDistance || repulseDistance < 0) {
        return;
      }
      const repulseRadius = Math.pow(repulseDistance / 6, 3),
        mouseClickPos = container.interactivity.mouse.clickPosition;
      if (mouseClickPos === undefined) {
        return;
      }
      const range = new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius),
        query = container.particles.quadTree.query(range, p => this.isEnabled(p));
      for (const particle of query) {
        const {
            dx,
            dy,
            distance
          } = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(mouseClickPos, particle.position),
          d = distance ** 2,
          velocity = repulse.speed,
          force = -repulseRadius * velocity / d;
        if (d <= repulseRadius) {
          container.repulse.particles.push(particle);
          const vect = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.create(dx, dy);
          vect.length = force;
          particle.velocity.setTo(vect);
        }
      }
    } else if (container.repulse.clicking === false) {
      for (const particle of container.repulse.particles) {
        particle.velocity.setTo(particle.initialVelocity);
      }
      container.repulse.particles = [];
    }
  }
  hoverRepulse() {
    const container = this.container,
      mousePos = container.interactivity.mouse.position,
      repulseRadius = container.retina.repulseModeDistance;
    if (!repulseRadius || repulseRadius < 0 || !mousePos) {
      return;
    }
    this.processRepulse(mousePos, repulseRadius, new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Circle(mousePos.x, mousePos.y, repulseRadius));
  }
  processRepulse(position, repulseRadius, area, divRepulse) {
    var _a;
    const container = this.container,
      query = container.particles.quadTree.query(area, p => this.isEnabled(p)),
      repulseOptions = container.actualOptions.interactivity.modes.repulse;
    if (!repulseOptions) {
      return;
    }
    for (const particle of query) {
      const {
          dx,
          dy,
          distance
        } = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(particle.position, position),
        velocity = ((_a = divRepulse === null || divRepulse === void 0 ? void 0 : divRepulse.speed) !== null && _a !== void 0 ? _a : repulseOptions.speed) * repulseOptions.factor,
        repulseFactor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.clamp)((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getEasing)(repulseOptions.easing)(1 - distance / repulseRadius) * velocity, 0, repulseOptions.maxSpeed),
        normVec = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.create(distance === 0 ? velocity : dx / distance * repulseFactor, distance === 0 ? velocity : dy / distance * repulseFactor);
      particle.position.addTo(normVec);
    }
  }
  singleSelectorRepulse(selector, div) {
    const container = this.container,
      repulse = container.actualOptions.interactivity.modes.repulse;
    if (!repulse) {
      return;
    }
    const query = document.querySelectorAll(selector);
    if (!query.length) {
      return;
    }
    query.forEach(item => {
      const elem = item,
        pxRatio = container.retina.pixelRatio,
        pos = {
          x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
          y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
        },
        repulseRadius = elem.offsetWidth / 2 * pxRatio,
        area = div.type === "circle" ? new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Circle(pos.x, pos.y, repulseRadius) : new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio),
        divs = repulse.divs,
        divRepulse = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.divMode)(divs, elem);
      this.processRepulse(pos, repulseRadius, area, divRepulse);
    });
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadExternalRepulseInteraction(engine) {
  await engine.addInteractor("externalRepulse", container => new Repulser(engine, container));
}






})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});