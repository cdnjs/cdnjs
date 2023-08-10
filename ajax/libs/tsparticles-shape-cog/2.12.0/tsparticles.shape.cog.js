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
  loadCogShape: () => (/* binding */ loadCogShape)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/CogDrawer.js

class CogDrawer {
  afterEffect(ctx, particle, radius) {
    if (particle.cogHoleRadius === undefined || particle.cogInnerRadius === undefined || particle.cogInnerTaper === undefined || particle.cogNotches === undefined || particle.cogOuterTaper === undefined) {
      return;
    }
    const pi2 = 2 * Math.PI,
      holeRadius = radius * particle.cogHoleRadius / 100;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.moveTo(holeRadius, 0);
    ctx.arc(0, 0, holeRadius, 0, pi2);
    ctx.closePath();
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
  }
  draw(ctx, particle, radius) {
    if (particle.cogHoleRadius === undefined || particle.cogInnerRadius === undefined || particle.cogInnerTaper === undefined || particle.cogNotches === undefined || particle.cogOuterTaper === undefined) {
      return;
    }
    const pi2 = 2 * Math.PI,
      angle = pi2 / (particle.cogNotches * 2),
      taperAI = angle * particle.cogInnerTaper * 0.005,
      taperAO = angle * particle.cogOuterTaper * 0.005,
      innerRadius = radius * particle.cogInnerRadius / 100;
    let a = angle,
      toggle = false;
    ctx.moveTo(radius * Math.cos(taperAO), radius * Math.sin(taperAO));
    for (; a <= pi2; a += angle) {
      if (toggle) {
        ctx.lineTo(innerRadius * Math.cos(a - taperAI), innerRadius * Math.sin(a - taperAI));
        ctx.lineTo(radius * Math.cos(a + taperAO), radius * Math.sin(a + taperAO));
      } else {
        ctx.lineTo(radius * Math.cos(a - taperAO), radius * Math.sin(a - taperAO));
        ctx.lineTo(innerRadius * Math.cos(a + taperAI), innerRadius * Math.sin(a + taperAI));
      }
      toggle = !toggle;
    }
  }
  particleInit(container, particle) {
    const shapeData = particle.shapeData;
    particle.cogHoleRadius = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(shapeData?.holeRadius ?? 44);
    particle.cogInnerRadius = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(shapeData?.innerRadius ?? 72);
    particle.cogInnerTaper = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(shapeData?.innerTaper ?? 35);
    particle.cogNotches = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(shapeData?.notches ?? 7);
    particle.cogOuterTaper = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRangeValue)(shapeData?.outerTaper ?? 50);
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadCogShape(engine, refresh = true) {
  await engine.addShape("cog", new CogDrawer(), refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});