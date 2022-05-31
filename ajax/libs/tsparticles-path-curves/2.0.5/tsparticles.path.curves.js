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
		module.exports = factory(require("tsparticles-engine"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-engine"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-engine")) : factory(root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__818__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 864:
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CurvesPathGen = void 0;

function CurvesPathGen(rndFunc, period, nbHarmonics, attenHarmonics, lowValue = 0, highValue = 1) {
  const arP0 = [],
        arP1 = [],
        amplitudes = [],
        increments = [],
        phases = [],
        randomFunc = rndFunc !== null && rndFunc !== void 0 ? rndFunc : Math.random;
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

      pfl = Math.pow(pf, 2) * (3 - 2 * pf);
      signal += (arP0[kh] * (1 - pfl) + arP1[kh] * pfl) * amplitudes[kh];
    }

    return signal + lowValue;
  };
}

exports.CurvesPathGen = CurvesPathGen;

/***/ }),

/***/ 759:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CurvesPathGenerator = void 0;

const Curves_1 = __webpack_require__(864);

const tsparticles_engine_1 = __webpack_require__(818);

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
      p.pathGen = (0, Curves_1.CurvesPathGen)(options.rndFunc, options.period, options.nbHarmonics, options.attenHarmonics, options.lowValue, options.highValue);
    }

    if (p.curveVelocity === undefined) {
      p.curveVelocity = tsparticles_engine_1.Vector.origin;
      p.curveVelocity.length = Math.random() * 0.6 + 0.8;
      p.curveVelocity.angle = Math.random() * Math.PI * 2;
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

  update() {}

}

exports.CurvesPathGenerator = CurvesPathGenerator;

/***/ }),

/***/ 153:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.loadCurvesPath = exports.curvesPathName = void 0;

const CurvesPathGenerator_1 = __webpack_require__(759);

exports.curvesPathName = "curvesPathGenerator";

function loadCurvesPath(engine) {
  engine.addPathGenerator(exports.curvesPathName, new CurvesPathGenerator_1.CurvesPathGenerator());
}

exports.loadCurvesPath = loadCurvesPath;

/***/ }),

/***/ 818:
/***/ (function(module) {

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(153);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});