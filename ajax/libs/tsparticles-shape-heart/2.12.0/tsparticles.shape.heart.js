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
  loadHeartShape: () => (/* binding */ loadHeartShape)
});

;// CONCATENATED MODULE: ./dist/browser/HeartDrawer.js
class HeartDrawer {
  draw(context, _particle, radius) {
    const x = -radius,
      y = -radius;
    context.moveTo(x, y + radius / 2);
    context.quadraticCurveTo(x, y, x + radius / 2, y);
    context.quadraticCurveTo(x + radius, y, x + radius, y + radius / 2);
    context.quadraticCurveTo(x + radius, y, x + radius * 3 / 2, y);
    context.quadraticCurveTo(x + radius * 2, y, x + radius * 2, y + radius / 2);
    context.quadraticCurveTo(x + radius * 2, y + radius, x + radius * 3 / 2, y + radius * 3 / 2);
    context.lineTo(x + radius, y + radius * 2);
    context.lineTo(x + radius / 2, y + radius * 3 / 2);
    context.quadraticCurveTo(x, y + radius, x, y + radius / 2);
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadHeartShape(engine, refresh = true) {
  await engine.addShape("heart", new HeartDrawer(), refresh);
}
/******/ 	return __webpack_exports__;
/******/ })()
;
});