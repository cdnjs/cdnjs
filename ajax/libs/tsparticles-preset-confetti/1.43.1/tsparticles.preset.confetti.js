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
		module.exports = factory(require("tsparticles"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles")) : factory(root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__764__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 764:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__764__;

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
  "confetti": function() { return /* reexport */ confetti; },
  "loadConfettiPreset": function() { return /* reexport */ loadConfettiPreset; }
});

;// CONCATENATED MODULE: ./dist/browser/ConfettiOptions.js
class ConfettiOptions {
  constructor() {
    this.angle = 90;
    this.count = 50;
    this.spread = 45;
    this.startVelocity = 45;
    this.decay = 0.9;
    this.gravity = 1;
    this.drift = 0;
    this.ticks = 200;
    this.position = {
      x: 50,
      y: 50
    };
    this.colors = ["#ffffff", "#ff0000"];
    this.shapes = ["square", "circle"];
    this.scalar = 1;
    this.zIndex = 100;
    this.disableForReducedMotion = true;
  }
  /**
   * @deprecated use count instead
   */


  get particleCount() {
    return this.count;
  }
  /**
   * @deprecated use count instead
   */


  set particleCount(value) {
    this.count = value;
  }
  /**
   * @deprecated use position instead
   */


  get origin() {
    return {
      x: this.position.x / 100,
      y: this.position.y / 100
    };
  }
  /**
   * @deprecated use position instead
   */


  set origin(value) {
    this.position.x = value.x * 100;
    this.position.y = value.y * 100;
  }

  load(data) {
    var _a, _b;

    if (!data) {
      return;
    }

    if (data.angle !== undefined) {
      this.angle = data.angle;
    }

    const count = (_a = data.count) !== null && _a !== void 0 ? _a : data.particleCount;

    if (count !== undefined) {
      this.count = count;
    }

    if (data.spread !== undefined) {
      this.spread = data.spread;
    }

    if (data.startVelocity !== undefined) {
      this.startVelocity = data.startVelocity;
    }

    if (data.decay !== undefined) {
      this.decay = data.decay;
    }

    if (data.gravity !== undefined) {
      this.gravity = data.gravity;
    }

    if (data.drift !== undefined) {
      this.drift = data.drift;
    }

    if (data.ticks !== undefined) {
      this.ticks = data.ticks;
    }

    const position = (_b = data.position) !== null && _b !== void 0 ? _b : this.position;

    if ((position === null || position === void 0 ? void 0 : position.x) !== undefined) {
      this.position.x = position.x;
    }

    if ((position === null || position === void 0 ? void 0 : position.y) !== undefined) {
      this.position.y = position.y;
    }

    if (data.colors !== undefined) {
      if (data.colors instanceof Array) {
        this.colors = [...data.colors];
      } else {
        this.colors = data.colors;
      }
    }

    if (data.shapes !== undefined) {
      if (data.shapes instanceof Array) {
        this.shapes = [...data.shapes];
      } else {
        this.shapes = data.shapes;
      }
    }

    if (data.scalar !== undefined) {
      this.scalar = data.scalar;
    }

    if (data.zIndex !== undefined) {
      this.zIndex = data.zIndex;
    }

    if (data.disableForReducedMotion !== undefined) {
      this.disableForReducedMotion = data.disableForReducedMotion;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/options.js

const loadOptions = confettiOptions => {
  const actualOptions = new ConfettiOptions();
  actualOptions.load(confettiOptions);
  return {
    fullScreen: {
      enable: true,
      zIndex: actualOptions.zIndex
    },
    fpsLimit: 120,
    particles: {
      number: {
        value: 0
      },
      color: {
        value: actualOptions.colors
      },
      shape: {
        type: actualOptions.shapes
      },
      opacity: {
        value: 1,
        animation: {
          enable: true,
          minimumValue: 0,
          speed: 0.5,
          startValue: "max",
          destroy: "min"
        }
      },
      size: {
        value: 5 * actualOptions.scalar
      },
      links: {
        enable: false
      },
      life: {
        duration: {
          sync: true,
          value: actualOptions.ticks / 60
        },
        count: 1
      },
      move: {
        angle: {
          value: actualOptions.spread,
          offset: 0
        },
        drift: {
          min: -actualOptions.drift,
          max: actualOptions.drift
        },
        enable: true,
        gravity: {
          enable: true,
          acceleration: actualOptions.gravity * 9.81
        },
        speed: actualOptions.startVelocity,
        decay: 1 - actualOptions.decay,
        direction: -actualOptions.angle,
        random: true,
        straight: false,
        outModes: {
          default: "none",
          bottom: "destroy"
        }
      },
      rotate: {
        value: {
          min: 0,
          max: 360
        },
        direction: "random",
        animation: {
          enable: true,
          speed: 60
        }
      },
      tilt: {
        direction: "random",
        enable: true,
        value: {
          min: 0,
          max: 360
        },
        animation: {
          enable: true,
          speed: 60
        }
      },
      roll: {
        darken: {
          enable: true,
          value: 25
        },
        enable: true,
        speed: {
          min: 15,
          max: 25
        }
      },
      wobble: {
        distance: 30,
        enable: true,
        speed: {
          min: -15,
          max: 15
        }
      }
    },
    detectRetina: true,
    motion: {
      disable: actualOptions.disableForReducedMotion
    },
    emitters: {
      startCount: actualOptions.count,
      position: actualOptions.position,
      size: {
        width: 0,
        height: 0
      },
      rate: {
        delay: 0,
        quantity: 0
      },
      life: {
        duration: 0.1,
        count: 1
      }
    }
  };
};
// EXTERNAL MODULE: external {"commonjs":"tsparticles","commonjs2":"tsparticles","amd":"tsparticles","root":"window"}
var external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_ = __webpack_require__(764);
;// CONCATENATED MODULE: ./dist/browser/preset.js



function loadPreset(engine, confettiOptions, override = false) {
  engine.addPreset("confetti", loadOptions(confettiOptions), override);
}

function loadConfettiPreset(main) {
  loadPreset(main, {}, true);
}
function confetti(idOrOptions, confettiOptions) {
  let options;
  let id;

  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = confettiOptions !== null && confettiOptions !== void 0 ? confettiOptions : {};
  } else {
    id = `tsparticles_${Math.floor(Math.random() * 1000)}`;
    options = idOrOptions;
  }

  loadPreset(external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.tsParticles, options, true);
  external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.tsParticles.load(id, {
    preset: "confetti"
  });
}
;// CONCATENATED MODULE: ./dist/browser/index.js


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});