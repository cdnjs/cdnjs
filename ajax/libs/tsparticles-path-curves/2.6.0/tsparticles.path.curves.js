/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.6.0
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
  "curvesPathName": () => (/* binding */ curvesPathName),
  "loadCurvesPath": () => (/* binding */ loadCurvesPath)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Curves.js

function CurvesPathGen(rndFunc, period, nbHarmonics, attenHarmonics, lowValue = 0, highValue = 1) {
  const arP0 = [],
    arP1 = [],
    amplitudes = [],
    increments = [],
    phases = [],
    randomFunc = rndFunc !== null && rndFunc !== void 0 ? rndFunc : external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom;
  let globAmplitude = 0;
  if (nbHarmonics < 1) nbHarmonics = 1;
  for (let kh = 1; kh <= nbHarmonics; ++kh) {
    arP0[kh] = randomFunc();
    arP1[kh] = randomFunc();
    amplitudes[kh] = kh === 1 ? 1 : amplitudes[kh - 1] * attenHarmonics;
    globAmplitude += amplitudes[kh];
    increments[kh] = kh / period;
    phases[kh] = randomFunc();
  }
  amplitudes.forEach((value, kh) => amplitudes[kh] = value / globAmplitude * (highValue - lowValue));
  return () => {
    let pf,
      pfl,
      signal = 0;
    for (let kh = nbHarmonics; kh >= 1; --kh) {
      pf = phases[kh] += increments[kh];
      if (phases[kh] >= 1) {
        pf = phases[kh] -= 1;
        arP0[kh] = arP1[kh];
        arP1[kh] = randomFunc();
      }
      pfl = pf ** 2 * (3 - 2 * pf);
      signal += (arP0[kh] * (1 - pfl) + arP1[kh] * pfl) * amplitudes[kh];
    }
    return signal + lowValue;
  };
}
;// CONCATENATED MODULE: ./dist/browser/CurvesPathGenerator.js



class CurvesPathGenerator {
  constructor() {
    this.options = {
      rndFunc: null,
      period: 100,
      nbHarmonics: 2,
      attenHarmonics: 0.8,
      lowValue: -0.03,
      highValue: 0.03
    };
  }
  generate(p) {
    if (p.pathGen === undefined) {
      const options = this.options;
      p.pathGen = CurvesPathGen(options.rndFunc, options.period, options.nbHarmonics, options.attenHarmonics, options.lowValue, options.highValue);
    }
    if (p.curveVelocity === undefined) {
      p.curveVelocity = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin;
      p.curveVelocity.length = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * 0.6 + 0.8;
      p.curveVelocity.angle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * Math.PI * 2;
    } else {
      p.curveVelocity.length += 0.01;
      p.curveVelocity.angle = (p.curveVelocity.angle + p.pathGen()) % (Math.PI * 2);
    }
    p.velocity.x = 0;
    p.velocity.y = 0;
    return p.curveVelocity;
  }
  init(container) {
    var _a, _b, _c, _d, _e;
    const sourceOptions = container.actualOptions.particles.move.path.options;
    if (typeof sourceOptions.rndFunc === "function") {
      this.options.rndFunc = sourceOptions.rndFunc;
    } else if (typeof sourceOptions.rndFunc === "string") {
      this.options.rndFunc = window[sourceOptions.rndFunc] || this.options.rndFunc;
    }
    this.options.period = (_a = sourceOptions.period) !== null && _a !== void 0 ? _a : this.options.period;
    this.options.nbHarmonics = (_b = sourceOptions.nbHarmonics) !== null && _b !== void 0 ? _b : this.options.nbHarmonics;
    this.options.attenHarmonics = (_c = sourceOptions.attenHarmonics) !== null && _c !== void 0 ? _c : this.options.attenHarmonics;
    this.options.lowValue = (_d = sourceOptions.lowValue) !== null && _d !== void 0 ? _d : this.options.lowValue;
    this.options.highValue = (_e = sourceOptions.highValue) !== null && _e !== void 0 ? _e : this.options.highValue;
  }
  reset(particle) {
    delete particle.pathGen;
    delete particle.curveVelocity;
  }
  update() {}
}
;// CONCATENATED MODULE: ./dist/browser/index.js

const curvesPathName = "curvesPathGenerator";
function loadCurvesPath(engine) {
  engine.addPathGenerator(curvesPathName, new CurvesPathGenerator());
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});