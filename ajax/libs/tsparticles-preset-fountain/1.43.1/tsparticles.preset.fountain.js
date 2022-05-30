/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v1.43.1
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
  "loadFountainPreset": function() { return /* binding */ loadFountainPreset; }
});

;// CONCATENATED MODULE: ./dist/browser/options.js
const options = {
  fpsLimit: 120,
  particles: {
    bounce: {
      vertical: {
        value: 0.85,
        random: {
          enable: true,
          minimumValue: 0.75
        }
      }
    },
    color: {
      value: ["#3998D0", "#2EB6AF", "#A9BD33", "#FEC73B", "#F89930", "#F45623", "#D62E32", "#EB586E", "#9952CF"]
    },
    number: {
      value: 0
    },
    destroy: {
      mode: "split"
      /* split */
      ,
      split: {
        count: 2,
        factor: {
          value: 2,
          random: {
            enable: true,
            minimumValue: 1.1
          }
        },
        rate: {
          value: 3,
          random: {
            enable: true,
            minimumValue: 2
          }
        }
      }
    },
    shape: {
      type: "circle"
    },
    opacity: {
      value: 0.5
    },
    size: {
      value: 20,
      random: {
        enable: true,
        minimumValue: 10
      }
    },
    move: {
      enable: true,
      gravity: {
        enable: true,
        maxSpeed: 50
      },
      speed: {
        min: 10,
        max: 20
      },
      direction: "none"
      /* none */
      ,
      random: false,
      straight: false,
      outModes: {
        bottom: "split"
        /* split */
        ,
        default: "bounce"
        /* bounce */
        ,
        top: "none"
        /* none */

      },
      trail: {
        enable: true,
        fillColor: "#fff",
        length: 3
      }
    }
  },
  detectRetina: true,
  background: {
    color: "#fff"
  },
  emitters: {
    direction: "top"
    /* top */
    ,
    life: {
      count: 0,
      duration: 0.15,
      delay: 3
    },
    rate: {
      delay: 0.1,
      quantity: 5
    },
    size: {
      width: 0,
      height: 0
    }
  }
};
;// CONCATENATED MODULE: ./dist/browser/index.js

function loadFountainPreset(engine) {
  engine.addPreset("fountain", options);
}
/******/ 	return __webpack_exports__;
/******/ })()
;
});