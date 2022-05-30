/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.5
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
/******/ 	var __webpack_modules__ = ({

/***/ 647:
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SpiralDrawer = void 0;

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

exports.SpiralDrawer = SpiralDrawer;

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
var exports = __webpack_exports__;


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.loadSpiralShape = void 0;

const SpiralDrawer_1 = __webpack_require__(647);

function loadSpiralShape(engine) {
  engine.addShape("spiral", new SpiralDrawer_1.SpiralDrawer());
}

exports.loadSpiralShape = loadSpiralShape;
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});