/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v1.43.0
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
  "loadBigCirclesPreset": function() { return /* binding */ loadBigCirclesPreset; }
});

;// CONCATENATED MODULE: ./dist/browser/options.js
const options = {
  fpsLimit: 120,
  background: {
    color: "#fff"
  },
  particles: {
    number: {
      value: 50
    },
    color: {
      value: ["#3998D0", "#2EB6AF", "#A9BD33", "#FEC73B", "#F89930", "#F45623", "#D62E32", "#EB586E", "#9952CF"]
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5
    },
    size: {
      value: 400,
      random: {
        enable: true,
        minimumValue: 200
      }
    },
    move: {
      enable: true,
      angle: {
        value: 30,
        offset: 0
      },
      speed: {
        min: 10,
        max: 20
      },
      direction: "top"
      /* top */
      ,
      outModes: {
        default: "destroy"
        /* destroy */
        ,
        bottom: "none"
        /* none */

      }
    }
  },
  detectRetina: true,
  emitters: {
    direction: "top"
    /* top */
    ,
    position: {
      x: 50,
      y: 150
    },
    rate: {
      delay: 0.2,
      quantity: 3
    },
    size: {
      width: 100,
      height: 50
    }
  }
};
;// CONCATENATED MODULE: ./dist/browser/index.js

function loadBigCirclesPreset(engine) {
  engine.addPreset("bigCircles", options);
  engine.addPreset("big-circles", options);
}
/******/ 	return __webpack_exports__;
/******/ })()
;
});