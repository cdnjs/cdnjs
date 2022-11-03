/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.5.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "loadRoundedRectShape": () => (/* binding */ loadRoundedRectShape)
});

;// CONCATENATED MODULE: ./dist/browser/RoundedRectDrawer.js
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
  particleInit(container, particle) {
    var _a;
    const shapeData = particle.shapeData;
    const roundedRect = particle;
    roundedRect.borderRadius = ((_a = shapeData === null || shapeData === void 0 ? void 0 : shapeData.radius) !== null && _a !== void 0 ? _a : 4) * container.retina.pixelRatio;
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js

function loadRoundedRectShape(engine) {
  engine.addShape("rounded-rect", new RoundedRectDrawer());
}
/******/ 	return __webpack_exports__;
/******/ })()
;
});