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
  loadRoundedRectShape: () => (/* binding */ loadRoundedRectShape)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/RoundedRectDrawer.js

const fixFactor = Math.sqrt(2),
  drawRoundedRect = (ctx, info, radius = {
    topRight: 4,
    bottomRight: 4,
    bottomLeft: 4,
    topLeft: 4
  }) => {
    const {
        x,
        y,
        width,
        height
      } = info,
      r = x + width,
      b = y + height;
    ctx.moveTo(x + radius.topLeft, y);
    ctx.lineTo(r - radius.topRight, y);
    ctx.quadraticCurveTo(r, y, r, y + radius.topRight);
    ctx.lineTo(r, y + height - radius.bottomRight);
    ctx.quadraticCurveTo(r, b, r - radius.bottomRight, b);
    ctx.lineTo(x + radius.bottomLeft, b);
    ctx.quadraticCurveTo(x, b, x, b - radius.bottomLeft);
    ctx.lineTo(x, y + radius.topLeft);
    ctx.quadraticCurveTo(x, y, x + radius.topLeft, y);
  };
class RoundedRectDrawer {
  draw(context, particle, radius) {
    const fixedRadius = radius / fixFactor,
      fixedDiameter = fixedRadius * 2,
      borderRadius = particle.borderRadius ?? 5;
    if ("roundRect" in context) {
      context.roundRect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter, borderRadius);
    } else {
      drawRoundedRect(context, {
        x: -fixedRadius,
        y: -fixedRadius,
        height: fixedDiameter,
        width: fixedDiameter
      }, {
        topLeft: borderRadius,
        topRight: borderRadius,
        bottomLeft: borderRadius,
        bottomRight: borderRadius
      });
    }
  }
  particleInit(container, particle) {
    const shapeData = particle.shapeData;
    particle.borderRadius = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(shapeData?.radius ?? 5) * container.retina.pixelRatio;
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadRoundedRectShape(engine, refresh = true) {
  await engine.addShape("rounded-rect", new RoundedRectDrawer(), refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});