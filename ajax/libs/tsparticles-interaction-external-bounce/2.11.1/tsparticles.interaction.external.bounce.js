/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.11.1
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
  Bounce: () => (/* reexport */ Bounce),
  loadExternalBounceInteraction: () => (/* binding */ loadExternalBounceInteraction)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Bounce.js
class Bounce {
  constructor() {
    this.distance = 200;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Bouncer.js


class Bouncer extends external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ExternalInteractorBase {
  constructor(container) {
    super(container);
    this._processBounce = (position, radius, area) => {
      const query = this.container.particles.quadTree.query(area, p => this.isEnabled(p));
      for (const particle of query) {
        if (area instanceof external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Circle) {
          (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.circleBounce)((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.circleBounceDataFromParticle)(particle), {
            position,
            radius,
            mass: radius ** 2 * Math.PI / 2,
            velocity: external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin,
            factor: external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin
          });
        } else if (area instanceof external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Rectangle) {
          (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.rectBounce)(particle, (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.calculateBounds)(position, radius));
        }
      }
    };
    this._processMouseBounce = () => {
      const container = this.container,
        pxRatio = container.retina.pixelRatio,
        tolerance = 10 * pxRatio,
        mousePos = container.interactivity.mouse.position,
        radius = container.retina.bounceModeDistance;
      if (!radius || radius < 0 || !mousePos) {
        return;
      }
      this._processBounce(mousePos, radius, new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Circle(mousePos.x, mousePos.y, radius + tolerance));
    };
    this._singleSelectorBounce = (selector, div) => {
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
          radius = elem.offsetWidth / 2 * pxRatio,
          tolerance = 10 * pxRatio,
          area = div.type === "circle" ? new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Circle(pos.x, pos.y, radius + tolerance) : new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * 2, elem.offsetHeight * pxRatio + tolerance * 2);
        this._processBounce(pos, radius, area);
      });
    };
  }
  clear() {}
  init() {
    const container = this.container,
      bounce = container.actualOptions.interactivity.modes.bounce;
    if (!bounce) {
      return;
    }
    container.retina.bounceModeDistance = bounce.distance * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container,
      options = container.actualOptions,
      events = options.interactivity.events,
      mouseMoveStatus = container.interactivity.status === external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.mouseMoveEvent,
      hoverEnabled = events.onHover.enable,
      hoverMode = events.onHover.mode,
      divs = events.onDiv;
    if (mouseMoveStatus && hoverEnabled && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("bounce", hoverMode)) {
      this._processMouseBounce();
    } else {
      (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.divModeExecute)("bounce", divs, (selector, div) => this._singleSelectorBounce(selector, div));
    }
  }
  isEnabled(particle) {
    const container = this.container,
      options = container.actualOptions,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? options.interactivity).events,
      divs = events.onDiv;
    return mouse.position && events.onHover.enable && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("bounce", events.onHover.mode) || (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isDivModeEnabled)("bounce", divs);
  }
  loadModeOptions(options, ...sources) {
    if (!options.bounce) {
      options.bounce = new Bounce();
    }
    for (const source of sources) {
      options.bounce.load(source?.bounce);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadExternalBounceInteraction(engine, refresh = true) {
  await engine.addInteractor("externalBounce", container => new Bouncer(container), refresh);
}


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});