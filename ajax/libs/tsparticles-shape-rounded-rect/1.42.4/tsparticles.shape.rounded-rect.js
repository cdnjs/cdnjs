/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v1.42.4
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles")) : factory(root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__764__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 764:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__764__;

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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"commonjs":"tsparticles","commonjs2":"tsparticles","amd":"tsparticles","root":"window"}
var external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_ = __webpack_require__(764);
;// CONCATENATED MODULE: ./dist/RoundedRectDrawer.js
const drawRoundedRect = (ctx, info, radius = {
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
  } = info;
  const r = x + width;
  const b = y + height;
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
  particleInit(container, particle) {
    var _a;

    const shapeData = particle.shapeData;
    const roundedRect = particle;
    roundedRect.borderRadius = ((_a = shapeData === null || shapeData === void 0 ? void 0 : shapeData.radius) !== null && _a !== void 0 ? _a : 4) * container.retina.pixelRatio;
  }

  draw(context, particle, radius) {
    const roundedRect = particle;
    drawRoundedRect(context, {
      x: 0,
      y: 0,
      height: radius,
      width: radius
    }, {
      topLeft: roundedRect.borderRadius,
      topRight: roundedRect.borderRadius,
      bottomLeft: roundedRect.borderRadius,
      bottomRight: roundedRect.borderRadius
    });
  }

}
;// CONCATENATED MODULE: ./dist/shape.js

function loadRoundedRectShape(engine) {
  engine.addShape("rounded-rect", new RoundedRectDrawer());
}
;// CONCATENATED MODULE: ./dist/index.js


loadRoundedRectShape(external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.tsParticles);
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});