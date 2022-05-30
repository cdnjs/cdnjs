/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.0-beta.5
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
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 818:
/***/ ((module) => {

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
  "initPjs": () => (/* binding */ initPjs)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/fixOptions.js


const fixOptions = options => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;

  if (options.retina_detect !== undefined) {
    options.detectRetina = options.retina_detect;
  }

  const particlesOptions = options.particles;

  if (particlesOptions) {
    particlesOptions.links = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)(particlesOptions.links, particlesOptions.line_linked);
    const moveOptions = particlesOptions.move;

    if (moveOptions) {
      if (moveOptions.attract) {
        if (!moveOptions.attract.rotate) {
          moveOptions.attract.rotate = {};
        }

        if (moveOptions.attract.rotateX !== undefined) {
          moveOptions.attract.rotate.x = moveOptions.attract.rotateX;
        }

        if (moveOptions.attract.rotateY !== undefined) {
          moveOptions.attract.rotate.y = moveOptions.attract.rotateY;
        }
      }

      if (moveOptions.out_mode !== undefined) {
        if (!moveOptions.outModes) {
          moveOptions.outModes = {
            default: moveOptions.out_mode
          };
        } else {
          if (typeof moveOptions.outModes === "object") {
            moveOptions.outModes.default = moveOptions.out_mode;
          } else {
            moveOptions.outModes = moveOptions.out_mode;
          }
        }
      }
    }

    if (((_b = (_a = particlesOptions.number) === null || _a === void 0 ? void 0 : _a.density) === null || _b === void 0 ? void 0 : _b.value_area) !== undefined) {
      particlesOptions.number.density.area = particlesOptions.number.density.value_area;
    }

    const opacityOptions = particlesOptions.opacity;

    if (opacityOptions) {
      if (opacityOptions.random) {
        opacityOptions.value = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)((_c = opacityOptions.value) !== null && _c !== void 0 ? _c : 1, 0);
      }

      if (opacityOptions.anim) {
        opacityOptions.animation = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)(opacityOptions.animation, opacityOptions.anim);

        if (opacityOptions.anim.enable && opacityOptions.anim.opacity_min !== undefined) {
          opacityOptions.value = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)((_d = opacityOptions.value) !== null && _d !== void 0 ? _d : opacityOptions.anim.opacity_min, opacityOptions.anim.opacity_min);
        }
      }
    }

    if ((_e = particlesOptions.shape) === null || _e === void 0 ? void 0 : _e.stroke) {
      particlesOptions.stroke = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)(particlesOptions.stroke, particlesOptions.shape.stroke);
    }

    if ((_f = particlesOptions.shape) === null || _f === void 0 ? void 0 : _f.polygon) {
      if (!particlesOptions.shape.options) {
        particlesOptions.shape.options = {};
      }

      particlesOptions.shape.options.polygon = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)(particlesOptions.shape.options.polygon, particlesOptions.shape.polygon);
    }

    if ((_g = particlesOptions.shape) === null || _g === void 0 ? void 0 : _g.image) {
      if (!particlesOptions.shape.options) {
        particlesOptions.shape.options = {};
      }

      particlesOptions.shape.options.image = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)(particlesOptions.shape.options.image, particlesOptions.shape.image);
    }

    const sizeOptions = particlesOptions.size;

    if (sizeOptions) {
      if (sizeOptions.random) {
        sizeOptions.value = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)((_h = sizeOptions.value) !== null && _h !== void 0 ? _h : 1, 0);
      }

      if (sizeOptions.anim) {
        sizeOptions.animation = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)(sizeOptions.animation, sizeOptions.anim);

        if (sizeOptions.anim.enable && sizeOptions.anim.size_min !== undefined) {
          sizeOptions.value = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.setRangeValue)((_j = sizeOptions.value) !== null && _j !== void 0 ? _j : sizeOptions.anim.size_min, sizeOptions.anim.size_min);
        }
      }
    }
  }

  const interactivityOptions = options.interactivity;

  if (interactivityOptions) {
    if (interactivityOptions.detect_on !== undefined) {
      interactivityOptions.detectsOn = interactivityOptions.detect_on;
    }

    const eventsOptions = interactivityOptions.events;

    if (eventsOptions) {
      if (eventsOptions.onclick) {
        eventsOptions.onClick = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)(eventsOptions.onClick, eventsOptions.onclick);
      }

      if (eventsOptions.onhover) {
        eventsOptions.onHover = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)(eventsOptions.onHover, eventsOptions.onhover);
      }
    }

    const modesOptions = interactivityOptions.modes;

    if (modesOptions) {
      if ((_k = modesOptions.grab) === null || _k === void 0 ? void 0 : _k.line_linked) {
        modesOptions.grab.links = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)(modesOptions.grab.links, modesOptions.grab.line_linked);
      }

      if (((_l = modesOptions.push) === null || _l === void 0 ? void 0 : _l.particles_nb) !== undefined) {
        modesOptions.push.quantity = modesOptions.push.particles_nb;
      }

      if (((_m = modesOptions.remove) === null || _m === void 0 ? void 0 : _m.particles_nb) !== undefined) {
        modesOptions.remove.quantity = modesOptions.remove.particles_nb;
      }
    }
  }

  return options;
};


;// CONCATENATED MODULE: ./dist/particlesJSPlugin.js

class ParticlesJSPlugin {
  constructor() {
    this.id = "particles-js-plugin";
  }

  needsPlugin() {
    return true;
  }

  getPlugin() {
    return {};
  }

  loadOptions(options) {
    fixOptions(options);
  }

}
;// CONCATENATED MODULE: ./dist/index.js


const initPjs = engine => {
  engine.addPlugin(new ParticlesJSPlugin());

  const particlesJS = (tagId, options) => {
    return engine.load(tagId, options);
  };

  particlesJS.load = (tagId, pathConfigJson, callback) => {
    engine.loadJSON(tagId, pathConfigJson).then(container => {
      if (container) {
        callback(container);
      }
    }).catch(() => {
      callback(undefined);
    });
  };

  particlesJS.setOnClickHandler = callback => {
    engine.setOnClickHandler(callback);
  };

  const pJSDom = engine.dom();
  return {
    particlesJS,
    pJSDom
  };
};


})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});