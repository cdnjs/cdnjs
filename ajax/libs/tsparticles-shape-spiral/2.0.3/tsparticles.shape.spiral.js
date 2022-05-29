/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.3
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
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
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
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "loadSpiralShape": function() { return /* binding */ loadSpiralShape; }
});

;// CONCATENATED MODULE: ./dist/SpiralDrawer.js
class SpiralDrawer {
  particleInit(container, particle) {
    var _a, _b;

    const pixelRatio = container.retina.pixelRatio,
          shapeData = particle.shapeData,
          spiral = particle;
    spiral.spiralInnerRadius = ((_a = shapeData.innerRadius) !== null && _a !== void 0 ? _a : 1) * pixelRatio;
    spiral.spiralLineSpacing = ((_b = shapeData.lineSpacing) !== null && _b !== void 0 ? _b : 1) * pixelRatio;
  }

  draw(context, particle, radius) {
    const spiral = particle,
          realWidth = (radius - spiral.spiralInnerRadius) / spiral.spiralLineSpacing;

    for (let i = 0; i < realWidth * 10; i++) {
      const angle = 0.1 * i,
            positionFactor = spiral.spiralInnerRadius + spiral.spiralLineSpacing * angle,
            x = positionFactor * Math.cos(angle),
            y = positionFactor * Math.sin(angle);
      context.lineTo(x, y);
    }
  }

}
;// CONCATENATED MODULE: ./dist/index.js

function loadSpiralShape(engine) {
  engine.addShape("spiral", new SpiralDrawer());
}
/******/ 	return __webpack_exports__;
/******/ })()
;
});