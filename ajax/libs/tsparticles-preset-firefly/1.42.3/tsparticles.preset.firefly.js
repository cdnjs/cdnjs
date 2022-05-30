/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v1.42.3
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
  "loadFireflyPreset": function() { return /* binding */ loadFireflyPreset; }
});

;// CONCATENATED MODULE: ./dist/options.js
const options = {
  fullScreen: {
    enable: true,
    zIndex: -1
  },
  fpsLimit: 120,
  particles: {
    number: {
      value: 0
    },
    color: {
      value: "#fff"
    },
    life: {
      duration: {
        value: 5,
        sync: false
      },
      count: 1
    },
    opacity: {
      value: 1,
      animation: {
        enable: true,
        speed: 3
      }
    },
    size: {
      value: {
        min: 3,
        max: 6
      }
    },
    move: {
      enable: true,
      speed: 3,
      random: false,
      size: true
    }
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "trail"
      },
      resize: true
    },
    modes: {
      trail: {
        delay: 0.5,
        pauseOnStop: true,
        quantity: 4
      }
    }
  },
  background: {
    color: "#000"
  }
};
;// CONCATENATED MODULE: ./dist/index.js

function loadFireflyPreset(engine) {
  engine.addPreset("firefly", options);
}
/******/ 	return __webpack_exports__;
/******/ })()
;
});