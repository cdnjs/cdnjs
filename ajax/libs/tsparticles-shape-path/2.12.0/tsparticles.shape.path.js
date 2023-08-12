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
  loadPathShape: () => (/* binding */ loadPathShape)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Utils.js
function drawPath(ctx, radius, path) {
  ctx.moveTo(path.segments[0].values[0].x * radius, path.segments[0].values[0].y * radius);
  for (let i = 0; i < path.segments.length; i++) {
    const segment = path.segments[i];
    switch (segment.type) {
      case "line":
        ctx.lineTo(segment.values[0].x * radius, segment.values[0].y * radius);
        break;
      case "bezier":
        ctx.bezierCurveTo(segment.values[1].x * radius, segment.values[1].y * radius, segment.values[2].x * radius, segment.values[2].y * radius, segment.values[3].x * radius, segment.values[3].y * radius);
        break;
      case "quadratic":
        ctx.quadraticCurveTo(segment.values[1].x * radius, segment.values[1].y * radius, segment.values[2].x * radius, segment.values[2].y * radius);
        break;
      case "arc":
        ctx.arc(segment.values[0].x * radius, segment.values[0].y * radius, segment.values[1].x * radius, segment.values[2].x, segment.values[2].y);
        break;
      case "ellipse":
        ctx.ellipse(segment.values[0].x * radius, segment.values[0].y * radius, segment.values[1].x * radius, segment.values[1].y * radius, segment.values[2].x, segment.values[3].x, segment.values[3].y);
    }
  }
  if (!path.half) {
    return;
  }
  for (let i = path.segments.length - 1; i >= 0; i--) {
    const segment = path.segments[i];
    switch (segment.type) {
      case "line":
        ctx.lineTo(segment.values[0].x * -radius, segment.values[0].y * radius);
        break;
      case "bezier":
        ctx.bezierCurveTo(-segment.values[2].x * radius, segment.values[2].y * radius, -segment.values[1].x * radius, segment.values[1].y * radius, -segment.values[0].x * radius, segment.values[0].y * radius);
        break;
      case "quadratic":
        ctx.quadraticCurveTo(-segment.values[1].x * radius, segment.values[1].y * radius, -segment.values[2].x * radius, segment.values[2].y * radius);
        break;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/PathDrawer.js


class PathDrawer {
  draw(context, particle, radius) {
    if (!particle.pathData) {
      return;
    }
    drawPath(context, radius, particle.pathData);
  }
  particleInit(container, particle) {
    const shape = particle.shapeData;
    if (!shape) {
      return;
    }
    particle.pathData = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, shape);
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadPathShape(engine, refresh = true) {
  await engine.addShape("path", new PathDrawer(), refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});