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
  "loadExternalBubbleInteraction": () => (/* binding */ loadExternalBubbleInteraction)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/browser/Bubbler.js


function calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
  if (modeValue >= optionsValue) {
    const value = particleValue + (modeValue - optionsValue) * ratio;
    return (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.clamp)(value, particleValue, modeValue);
  } else if (modeValue < optionsValue) {
    const value = particleValue - (optionsValue - modeValue) * ratio;
    return (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.clamp)(value, modeValue, particleValue);
  }
}
/**
 * Particle bubble manager
 * @category Interactions
 */


class Bubbler extends external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ExternalInteractorBase {
  constructor(container) {
    super(container);

    if (!container.bubble) {
      container.bubble = {};
    }

    this.handleClickMode = mode => {
      if (mode !== "bubble"
      /* ClickMode.bubble */
      ) {
        return;
      }

      if (!container.bubble) {
        container.bubble = {};
      }

      container.bubble.clicking = true;
    };
  }

  clear(particle, force) {
    if (particle.bubble.inRange && !force) {
      return;
    }

    delete particle.bubble.div;
    delete particle.bubble.opacity;
    delete particle.bubble.radius;
    delete particle.bubble.color;
  }

  init() {// do nothing
  }

  async interact() {
    const options = this.container.actualOptions,
          events = options.interactivity.events,
          onHover = events.onHover,
          onClick = events.onClick,
          hoverEnabled = onHover.enable,
          hoverMode = onHover.mode,
          clickEnabled = onClick.enable,
          clickMode = onClick.mode,
          divs = events.onDiv;
    /* on hover event */

    if (hoverEnabled && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("bubble"
    /* HoverMode.bubble */
    , hoverMode)) {
      this.hoverBubble();
    } else if (clickEnabled && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("bubble"
    /* ClickMode.bubble */
    , clickMode)) {
      this.clickBubble();
    } else {
      (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.divModeExecute)("bubble"
      /* DivMode.bubble */
      , divs, (selector, div) => this.singleSelectorHover(selector, div));
    }
  }

  isEnabled(particle) {
    var _a;

    const container = this.container,
          options = container.actualOptions,
          mouse = container.interactivity.mouse,
          events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : options.interactivity).events,
          divs = events.onDiv,
          divBubble = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isDivModeEnabled)("bubble"
    /* DivMode.bubble */
    , divs);

    if (!(divBubble || events.onHover.enable && mouse.position || events.onClick.enable && mouse.clickPosition)) {
      return false;
    }

    const hoverMode = events.onHover.mode;
    const clickMode = events.onClick.mode;
    return (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("bubble"
    /* HoverMode.bubble */
    , hoverMode) || (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("bubble"
    /* ClickMode.bubble */
    , clickMode) || divBubble;
  }

  reset(particle) {
    particle.bubble.inRange = false;
  }

  clickBubble() {
    var _a, _b;

    const container = this.container,
          options = container.actualOptions,
          mouseClickPos = container.interactivity.mouse.clickPosition;

    if (!mouseClickPos) {
      return;
    }

    if (!container.bubble) {
      container.bubble = {};
    }

    const distance = container.retina.bubbleModeDistance,
          query = container.particles.quadTree.queryCircle(mouseClickPos, distance, p => this.isEnabled(p));

    for (const particle of query) {
      if (!container.bubble.clicking) {
        continue;
      }

      particle.bubble.inRange = !container.bubble.durationEnd;
      const pos = particle.getPosition(),
            distMouse = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(pos, mouseClickPos),
            timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1000;

      if (timeSpent > options.interactivity.modes.bubble.duration) {
        container.bubble.durationEnd = true;
      }

      if (timeSpent > options.interactivity.modes.bubble.duration * 2) {
        container.bubble.clicking = false;
        container.bubble.durationEnd = false;
      }

      const sizeData = {
        bubbleObj: {
          optValue: container.retina.bubbleModeSize,
          value: particle.bubble.radius
        },
        particlesObj: {
          optValue: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMax)(particle.options.size.value) * container.retina.pixelRatio,
          value: particle.size.value
        },
        type: "size"
        /* ProcessBubbleType.size */

      };
      this.process(particle, distMouse, timeSpent, sizeData);
      const opacityData = {
        bubbleObj: {
          optValue: options.interactivity.modes.bubble.opacity,
          value: particle.bubble.opacity
        },
        particlesObj: {
          optValue: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMax)(particle.options.opacity.value),
          value: (_b = (_a = particle.opacity) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 1
        },
        type: "opacity"
        /* ProcessBubbleType.opacity */

      };
      this.process(particle, distMouse, timeSpent, opacityData);

      if (!container.bubble.durationEnd) {
        if (distMouse <= container.retina.bubbleModeDistance) {
          this.hoverBubbleColor(particle, distMouse);
        } else {
          delete particle.bubble.color;
        }
      } else {
        delete particle.bubble.color;
      }
    }
  }

  hoverBubble() {
    const container = this.container,
          mousePos = container.interactivity.mouse.position;

    if (mousePos === undefined) {
      return;
    }

    const distance = container.retina.bubbleModeDistance,
          query = container.particles.quadTree.queryCircle(mousePos, distance, p => this.isEnabled(p)); //for (const { distance, particle } of query) {

    for (const particle of query) {
      particle.bubble.inRange = true;
      const pos = particle.getPosition(),
            pointDistance = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(pos, mousePos),
            ratio = 1 - pointDistance / distance;
      /* mousemove - check ratio */

      if (pointDistance <= distance) {
        if (ratio >= 0 && container.interactivity.status === external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.mouseMoveEvent) {
          /* size */
          this.hoverBubbleSize(particle, ratio);
          /* opacity */

          this.hoverBubbleOpacity(particle, ratio);
          /* color */

          this.hoverBubbleColor(particle, ratio);
        }
      } else {
        this.reset(particle);
      }
      /* mouseleave */


      if (container.interactivity.status === external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.mouseLeaveEvent) {
        this.reset(particle);
      }
    }
  }

  hoverBubbleColor(particle, ratio, divBubble) {
    const options = this.container.actualOptions;
    const bubbleOptions = divBubble !== null && divBubble !== void 0 ? divBubble : options.interactivity.modes.bubble;

    if (!particle.bubble.finalColor) {
      const modeColor = bubbleOptions.color;

      if (!modeColor) {
        return;
      }

      const bubbleColor = modeColor instanceof Array ? (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(modeColor) : modeColor;
      particle.bubble.finalColor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.rangeColorToHsl)(bubbleColor);
    }

    if (!particle.bubble.finalColor) {
      return;
    }

    if (bubbleOptions.mix) {
      particle.bubble.color = undefined;
      const pColor = particle.getFillColor();
      particle.bubble.color = pColor ? (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.rgbToHsl)((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.colorMix)(pColor, particle.bubble.finalColor, 1 - ratio, ratio)) : particle.bubble.finalColor;
    } else {
      particle.bubble.color = particle.bubble.finalColor;
    }
  }

  hoverBubbleOpacity(particle, ratio, divBubble) {
    var _a, _b, _c;

    const container = this.container,
          options = container.actualOptions,
          modeOpacity = (_a = divBubble === null || divBubble === void 0 ? void 0 : divBubble.opacity) !== null && _a !== void 0 ? _a : options.interactivity.modes.bubble.opacity;

    if (!modeOpacity) {
      return;
    }

    const optOpacity = particle.options.opacity.value;
    const pOpacity = (_c = (_b = particle.opacity) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : 1;
    const opacity = calculateBubbleValue(pOpacity, modeOpacity, (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMax)(optOpacity), ratio);

    if (opacity !== undefined) {
      particle.bubble.opacity = opacity;
    }
  }

  hoverBubbleSize(particle, ratio, divBubble) {
    const container = this.container,
          modeSize = (divBubble === null || divBubble === void 0 ? void 0 : divBubble.size) ? divBubble.size * container.retina.pixelRatio : container.retina.bubbleModeSize;

    if (modeSize === undefined) {
      return;
    }

    const optSize = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeMax)(particle.options.size.value) * container.retina.pixelRatio;
    const pSize = particle.size.value;
    const size = calculateBubbleValue(pSize, modeSize, optSize, ratio);

    if (size !== undefined) {
      particle.bubble.radius = size;
    }
  }

  process(particle, distMouse, timeSpent, data) {
    const container = this.container,
          bubbleParam = data.bubbleObj.optValue;

    if (bubbleParam === undefined) {
      return;
    }

    const options = container.actualOptions,
          bubbleDuration = options.interactivity.modes.bubble.duration,
          bubbleDistance = container.retina.bubbleModeDistance,
          particlesParam = data.particlesObj.optValue,
          pObjBubble = data.bubbleObj.value,
          pObj = data.particlesObj.value || 0,
          type = data.type;

    if (bubbleParam === particlesParam) {
      return;
    }

    if (!container.bubble) {
      container.bubble = {};
    }

    if (!container.bubble.durationEnd) {
      if (distMouse <= bubbleDistance) {
        const obj = pObjBubble !== null && pObjBubble !== void 0 ? pObjBubble : pObj;

        if (obj !== bubbleParam) {
          const value = pObj - timeSpent * (pObj - bubbleParam) / bubbleDuration;

          if (type === "size"
          /* ProcessBubbleType.size */
          ) {
            particle.bubble.radius = value;
          }

          if (type === "opacity"
          /* ProcessBubbleType.opacity */
          ) {
            particle.bubble.opacity = value;
          }
        }
      } else {
        if (type === "size"
        /* ProcessBubbleType.size */
        ) {
          delete particle.bubble.radius;
        }

        if (type === "opacity"
        /* ProcessBubbleType.opacity */
        ) {
          delete particle.bubble.opacity;
        }
      }
    } else if (pObjBubble) {
      if (type === "size"
      /* ProcessBubbleType.size */
      ) {
        delete particle.bubble.radius;
      }

      if (type === "opacity"
      /* ProcessBubbleType.opacity */
      ) {
        delete particle.bubble.opacity;
      }
    }
  }

  singleSelectorHover(selector, div) {
    const container = this.container,
          selectors = document.querySelectorAll(selector);

    if (!selectors.length) {
      return;
    }

    selectors.forEach(item => {
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
            query = container.particles.quadTree.query(area, p => this.isEnabled(p));

      for (const particle of query) {
        if (!area.contains(particle.getPosition())) {
          continue;
        }

        particle.bubble.inRange = true;
        const divs = container.actualOptions.interactivity.modes.bubble.divs;
        const divBubble = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.divMode)(divs, elem);

        if (!particle.bubble.div || particle.bubble.div !== elem) {
          this.clear(particle, true);
          particle.bubble.div = elem;
        }
        /* size */


        this.hoverBubbleSize(particle, 1, divBubble);
        /* opacity */

        this.hoverBubbleOpacity(particle, 1, divBubble);
        /* color */

        this.hoverBubbleColor(particle, 1, divBubble);
      }
    });
  }

}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadExternalBubbleInteraction(engine) {
  await engine.addInteractor("externalBubble", container => new Bubbler(container));
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});