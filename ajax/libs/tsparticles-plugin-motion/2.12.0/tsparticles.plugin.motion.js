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
  loadMotionPlugin: () => (/* binding */ loadMotionPlugin)
});

;// CONCATENATED MODULE: ./dist/browser/Options/Classes/MotionReduce.js
class MotionReduce {
  constructor() {
    this.factor = 4;
    this.value = true;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.factor !== undefined) {
      this.factor = data.factor;
    }
    if (data.value !== undefined) {
      this.value = data.value;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Motion.js

class Motion {
  constructor() {
    this.disable = false;
    this.reduce = new MotionReduce();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.disable !== undefined) {
      this.disable = data.disable;
    }
    this.reduce.load(data.reduce);
  }
}
// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/MotionInstance.js

class MotionInstance {
  constructor(container, engine) {
    this._handleMotionChange = mediaQuery => {
      const container = this._container,
        motion = container.actualOptions.motion;
      if (!motion) {
        return;
      }
      container.retina.reduceFactor = mediaQuery.matches ? motion.disable ? 0 : motion.reduce.value ? 1 / motion.reduce.factor : 1 : 1;
    };
    this._container = container;
    this._engine = engine;
  }
  async init() {
    const container = this._container,
      options = container.actualOptions.motion;
    if (!(options && (options.disable || options.reduce.value))) {
      container.retina.reduceFactor = 1;
      return;
    }
    const mediaQuery = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.safeMatchMedia)("(prefers-reduced-motion: reduce)");
    if (!mediaQuery) {
      container.retina.reduceFactor = 1;
      return;
    }
    this._handleMotionChange(mediaQuery);
    const handleChange = async () => {
      this._handleMotionChange(mediaQuery);
      try {
        await container.refresh();
      } catch {}
    };
    if (mediaQuery.addEventListener !== undefined) {
      mediaQuery.addEventListener("change", handleChange);
    } else if (mediaQuery.addListener !== undefined) {
      mediaQuery.addListener(handleChange);
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js


class MotionPlugin {
  constructor(engine) {
    this.id = "motion";
    this._engine = engine;
  }
  getPlugin(container) {
    return new MotionInstance(container, this._engine);
  }
  loadOptions(options, source) {
    if (!this.needsPlugin()) {
      return;
    }
    let motionOptions = options.motion;
    if (!motionOptions?.load) {
      options.motion = motionOptions = new Motion();
    }
    motionOptions.load(source?.motion);
  }
  needsPlugin() {
    return true;
  }
}
async function loadMotionPlugin(engine, refresh = true) {
  await engine.addPlugin(new MotionPlugin(engine), refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});