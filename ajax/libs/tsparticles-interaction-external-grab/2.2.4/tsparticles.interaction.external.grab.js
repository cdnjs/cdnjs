/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.2.4
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
  "Grab": () => (/* reexport */ Grab),
  "GrabLinks": () => (/* reexport */ GrabLinks),
  "loadExternalGrabInteraction": () => (/* binding */ loadExternalGrabInteraction)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/GrabLinks.js

/**
 * @category Options
 */

class GrabLinks {
  constructor() {
    this.blink = false;
    this.consent = false;
    this.opacity = 1;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.blink !== undefined) {
      this.blink = data.blink;
    }

    if (data.color !== undefined) {
      this.color = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor.create(this.color, data.color);
    }

    if (data.consent !== undefined) {
      this.consent = data.consent;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Grab.js

/**
 * @category Options
 */

class Grab {
  constructor() {
    this.distance = 100;
    this.links = new GrabLinks();
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new links
   */


  get lineLinked() {
    return this.links;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new links
   * @param value
   */


  set lineLinked(value) {
    this.links = value;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new links
   */


  get line_linked() {
    return this.links;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new links
   * @param value
   */


  set line_linked(value) {
    this.links = value;
  }

  load(data) {
    var _a, _b;

    if (!data) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = data.distance;
    }

    this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Grabber.js
var __classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var __classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Grabber_container;



/**
 * Draws a grab line between two points using canvas API in the given context.
 * @param context - The canvas context to draw on.
 * @param width - The width of the line.
 * @param begin - The first position of the line.
 * @param end - The second position of the line.
 * @param colorLine - The color of the line.
 * @param opacity - The opacity of the line.
 */

function drawGrabLine(context, width, begin, end, colorLine, opacity) {
  context.save();
  (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.drawLine)(context, begin, end);
  context.strokeStyle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromRgb)(colorLine, opacity);
  context.lineWidth = width;
  context.stroke();
  context.restore();
}

function drawGrab(container, particle, lineColor, opacity, mousePos) {
  container.canvas.draw(ctx => {
    var _a;

    const beginPos = particle.getPosition();
    drawGrabLine(ctx, (_a = particle.retina.linksWidth) !== null && _a !== void 0 ? _a : 0, beginPos, mousePos, lineColor, opacity);
  });
}
/**
 * Particle grab manager
 * @category Interactions
 */


class Grabber extends external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ExternalInteractorBase {
  constructor(container) {
    super(container);

    _Grabber_container.set(this, void 0);

    __classPrivateFieldSet(this, _Grabber_container, container, "f");
  }

  clear() {// do nothing
  }

  init() {
    const container = __classPrivateFieldGet(this, _Grabber_container, "f"),
          grab = container.actualOptions.interactivity.modes.grab;

    if (!grab) {
      return;
    }

    container.retina.grabModeDistance = grab.distance * container.retina.pixelRatio;
  }

  async interact() {
    var _a, _b;

    const container = __classPrivateFieldGet(this, _Grabber_container, "f"),
          options = container.actualOptions,
          interactivity = options.interactivity;

    if (!interactivity.modes.grab || !interactivity.events.onHover.enable || container.interactivity.status !== external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.mouseMoveEvent) {
      return;
    }

    const mousePos = container.interactivity.mouse.position;

    if (!mousePos) {
      return;
    }

    const distance = container.retina.grabModeDistance;

    if (!distance || distance < 0) {
      return;
    }

    const query = container.particles.quadTree.queryCircle(mousePos, distance, p => this.isEnabled(p));

    for (const particle of query) {
      /*
         draw a line between the cursor and the particle
         if the distance between them is under the config distance
      */
      const pos = particle.getPosition(),
            pointDistance = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(pos, mousePos);

      if (pointDistance > distance) {
        continue;
      }

      const grabLineOptions = interactivity.modes.grab.links,
            lineOpacity = grabLineOptions.opacity,
            opacityLine = lineOpacity - pointDistance * lineOpacity / distance;

      if (opacityLine <= 0) {
        continue;
      }

      const optColor = (_a = grabLineOptions.color) !== null && _a !== void 0 ? _a : (_b = particle.options.links) === null || _b === void 0 ? void 0 : _b.color;

      if (!container.particles.grabLineColor && optColor) {
        const linksOptions = interactivity.modes.grab.links;
        container.particles.grabLineColor = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getLinkRandomColor)(optColor, linksOptions.blink, linksOptions.consent);
      }

      const colorLine = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getLinkColor)(particle, undefined, container.particles.grabLineColor);

      if (!colorLine) {
        return;
      }

      drawGrab(container, particle, colorLine, opacityLine, mousePos);
    }
  }

  isEnabled(particle) {
    var _a;

    const container = this.container,
          mouse = container.interactivity.mouse,
          events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : container.actualOptions.interactivity).events;
    return events.onHover.enable && !!mouse.position && (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)("grab"
    /* HoverMode.grab */
    , events.onHover.mode);
  }

  loadModeOptions(options, ...sources) {
    if (!options.grab) {
      options.grab = new Grab();
    }

    for (const source of sources) {
      options.grab.load(source === null || source === void 0 ? void 0 : source.grab);
    }
  }

  reset() {// do nothing
  }

}
_Grabber_container = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadExternalGrabInteraction(engine) {
  await engine.addInteractor("externalGrab", container => new Grabber(container));
}




})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});