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
  "loadExternalRepulseInteraction": () => (/* binding */ loadExternalRepulseInteraction)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/browser/Repulser.js

/**
 * Particle repulse manager
 * @category Interactions
 */

class Repulser extends external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ExternalInteractorBase {
  constructor(container) {
    super(container);

    if (!container.repulse) {
      container.repulse = {
        particles: []
      };
    }

    this.handleClickMode = mode => {
      const options = this.container.actualOptions;

      if (mode !== "repulse"
      /* ClickMode.repulse */
      ) {
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
      }, options.interactivity.modes.repulse.duration * 1000);
    };
  }

  clear() {// do nothing
  }

  init() {// do nothing
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

    if (mouseMoveStatus && hoverEnabled && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("repulse"
    /* HoverMode.repulse */
    , hoverMode)) {
      this.hoverRepulse();
    } else if (clickEnabled && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("repulse"
    /* ClickMode.repulse */
    , clickMode)) {
      this.clickRepulse();
    } else {
      (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.divModeExecute)("repulse"
      /* DivMode.repulse */
      , divs, (selector, div) => this.singleSelectorRepulse(selector, div));
    }
  }

  isEnabled(particle) {
    var _a;

    const container = this.container,
          options = container.actualOptions,
          mouse = container.interactivity.mouse,
          events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : options.interactivity).events,
          divs = events.onDiv,
          divRepulse = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isDivModeEnabled)("repulse"
    /* DivMode.repulse */
    , divs);

    if (!(divRepulse || events.onHover.enable && mouse.position || events.onClick.enable && mouse.clickPosition)) {
      return false;
    }

    const hoverMode = events.onHover.mode,
          clickMode = events.onClick.mode;
    return (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("repulse"
    /* HoverMode.repulse */
    , hoverMode) || (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("repulse"
    /* ClickMode.repulse */
    , clickMode) || divRepulse;
  }

  reset() {// do nothing
  }

  clickRepulse() {
    const container = this.container;

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
      const repulseDistance = container.retina.repulseModeDistance,
            repulseRadius = Math.pow(repulseDistance / 6, 3),
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
              velocity = container.actualOptions.interactivity.modes.repulse.speed,
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
          mousePos = container.interactivity.mouse.position;

    if (!mousePos) {
      return;
    }

    const repulseRadius = container.retina.repulseModeDistance;
    this.processRepulse(mousePos, repulseRadius, new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Circle(mousePos.x, mousePos.y, repulseRadius));
  }

  processRepulse(position, repulseRadius, area, divRepulse) {
    var _a;

    const container = this.container,
          query = container.particles.quadTree.query(area, p => this.isEnabled(p)),
          repulseOptions = container.actualOptions.interactivity.modes.repulse;

    for (const particle of query) {
      const {
        dx,
        dy,
        distance
      } = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(particle.position, position),
            velocity = ((_a = divRepulse === null || divRepulse === void 0 ? void 0 : divRepulse.speed) !== null && _a !== void 0 ? _a : repulseOptions.speed) * repulseOptions.factor,
            repulseFactor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.clamp)((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.calcEasing)(1 - distance / repulseRadius, repulseOptions.easing) * velocity, 0, repulseOptions.maxSpeed),
            normVec = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.create(distance === 0 ? velocity : dx / distance * repulseFactor, distance === 0 ? velocity : dy / distance * repulseFactor);
      particle.position.addTo(normVec);
    }
  }

  singleSelectorRepulse(selector, div) {
    const container = this.container,
          query = document.querySelectorAll(selector);

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
            area = div.type === "circle"
      /* DivType.circle */
      ? new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Circle(pos.x, pos.y, repulseRadius) : new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio),
            divs = container.actualOptions.interactivity.modes.repulse.divs,
            divRepulse = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.divMode)(divs, elem);
      this.processRepulse(pos, repulseRadius, area, divRepulse);
    });
  }

}
/* Ready for a future release, breaking change. It's behavior seems more correct than the current.
export class Repulser implements IExternalInteractor {
    constructor(private readonly container: Container) {}

    public isEnabled(): boolean {
        const container = this.container;
        const options = container.options;

        const mouse = container.interactivity.mouse;
        const events = options.interactivity.events;
        const divs = events.onDiv;

        const divRepulse = isDivModeEnabled(DivMode.repulse, divs);

        if (
            !(divRepulse || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))
        ) {
            return false;
        }

        const hoverMode = events.onHover.mode;
        const clickMode = events.onClick.mode;

        return (
            isInArray(HoverMode.repulse, hoverMode) || isInArray(ClickMode.repulse, clickMode) || divRepulse
        );
    }

    public reset(): void {
        // do nothing
    }

    public interact(): void {
        const container = this.container;
        const options = container.options;
        const mouseMoveStatus = container.interactivity.status === mouseMoveEvent;
        const events = options.interactivity.events;
        const hoverEnabled = events.onHover.enable;
        const hoverMode = events.onHover.mode;
        const clickEnabled = events.onClick.enable;
        const clickMode = events.onClick.mode;
        const divs = events.onDiv;

        if (mouseMoveStatus && hoverEnabled && isInArray(HoverMode.repulse, hoverMode)) {
            this.hoverRepulse();
        } else if (clickEnabled && isInArray(ClickMode.repulse, clickMode)) {
            this.clickRepulse();
        } else {
            divModeExecute(DivMode.repulse, divs, (selector, div): void => this.singleDivRepulse(selector, div));
        }
    }

    private singleDivRepulse(selector: string, div: DivEvent): void {
        const container = this.container;
        const query = document.querySelectorAll(selector);

        if (!query.length) {
            return;
        }

        query.forEach(item => {
                const elem = item as HTMLElement;
            const pxRatio = container.retina.pixelRatio;
            const pos = {
                x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
            };
            const repulseRadius = (elem.offsetWidth / 2) * pxRatio;

            const area =
                div.type === DivType.circle
                    ? new Circle(pos.x, pos.y, repulseRadius)
                    : new Rectangle(
                    elem.offsetLeft * pxRatio,
                    elem.offsetTop * pxRatio,
                    elem.offsetWidth * pxRatio,
                    elem.offsetHeight * pxRatio
                    );

            const divs = container.options.interactivity.modes.repulse.divs;
            const divRepulse = divMode(divs, selector);
            const velocity = (divRepulse?.speed ?? container.options.interactivity.modes.repulse.speed) * 100;

            this.processRepulse(pos, repulseRadius, velocity, area, divRepulse);
        });
    }

    private hoverRepulse(): void {
        const container = this.container;
        const mousePos = container.interactivity.mouse.position;

        if (!mousePos) {
            return;
        }

        const repulseRadius = container.retina.repulseModeDistance;
        const velocity = container.options.interactivity.modes.repulse.speed * 100;

        this.processRepulse(mousePos, repulseRadius, velocity, new Circle(mousePos.x, mousePos.y, repulseRadius));
    }

    private clickRepulse(): void {
        const container = this.container;

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
            const mousePos = container.interactivity.mouse.clickPosition;

            if (!mousePos) {
                return;
            }

            const repulseRadius = container.retina.repulseModeDistance;
            const velocity = container.options.interactivity.modes.repulse.speed * 10;

            this.processRepulse(mousePos, repulseRadius, velocity, new Circle(mousePos.x, mousePos.y, repulseRadius));
        } else if (container.repulse.clicking === false) {
            container.repulse.particles = [];
        }
    }

    private processRepulse(
        position: ICoordinates,
        repulseRadius: number,
        velocity: number,
        area: Range,
        divRepulse?: RepulseDiv
    ): void {
        const container = this.container;
        const query = container.particles.quadTree.query(area, p => this.isEnabled(p));

        for (const particle of query) {
            const { dx, dy, distance } = getDistances(particle.position, position);
            const normVec = {
                x: dx / distance,
                y: dy / distance,
            };

            const repulseFactor = clamp((1 - Math.pow(distance / repulseRadius, 2)) * velocity, 0, 50);

            particle.position.x += normVec.x * repulseFactor;
            particle.position.y += normVec.y * repulseFactor;
        }
    }
}
 */
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadExternalRepulseInteraction(engine) {
  await engine.addInteractor("externalRepulse", container => new Repulser(container));
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});