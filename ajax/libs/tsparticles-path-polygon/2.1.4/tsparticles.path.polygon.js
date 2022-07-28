/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.1.4
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "loadPolygonPath": function() { return /* binding */ loadPolygonPath; },
  "polygonPathName": function() { return /* binding */ polygonPathName; }
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/browser/PolygonPathGenerator.js

class PolygonPathGenerator {
  constructor() {
    this.dirsList = [];
    this.options = {
      sides: 6,
      turnSteps: 20,
      angle: 30
    };
  }

  generate(p) {
    if (p.hexStep === undefined) {
      p.hexStep = 0;
    }

    if (p.hexDirection === undefined) {
      p.hexDirection = this.options.sides === 6 ? (Math.random() * 3 | 0) * 2 : Math.random() * this.options.sides | 0;
    }

    if (p.hexSpeed === undefined) {
      p.hexSpeed = p.velocity.length;
    }

    if (p.hexStep % this.options.turnSteps === 0) {
      p.hexDirection = Math.random() > 0.5 ? (p.hexDirection + 1) % this.options.sides : (p.hexDirection + this.options.sides - 1) % this.options.sides;
    }

    p.velocity.x = 0;
    p.velocity.y = 0;
    p.hexStep++;
    return external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.create(this.dirsList[p.hexDirection].x * p.hexSpeed, this.dirsList[p.hexDirection].y * p.hexSpeed);
  }

  init(container) {
    var _a;

    const options = container.actualOptions.particles.move.path.options;
    this.options.sides = options.sides > 0 ? options.sides : 6;
    this.options.angle = (_a = options.angle) !== null && _a !== void 0 ? _a : 30;
    this.options.turnSteps = options.turnSteps >= 0 ? options.turnSteps : 20;
    this.createDirs();
  }

  update() {// do nothing
  }

  createDirs() {
    this.dirsList = [];

    for (let i = 0; i < 360; i += 360 / this.options.sides) {
      const angle = this.options.angle + i;
      this.dirsList.push(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.create(Math.cos(angle * Math.PI / 180), Math.sin(angle * Math.PI / 180)));
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/index.js

const polygonPathName = "polygonPathGenerator";
function loadPolygonPath(engine) {
  engine.addPathGenerator(polygonPathName, new PolygonPathGenerator());
}
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});