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
  loadSVGPath: () => (/* binding */ loadSVGPath),
  svgPathName: () => (/* binding */ svgPathName)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/SVGPathGenerator.js

class SVGPathGenerator {
  constructor() {
    this._paths = [];
    this._reverse = false;
    this._size = {
      width: 0,
      height: 0
    };
    this._scale = 1;
    this._offset = {
      x: 0,
      y: 0,
      mode: "percent"
    };
    this._width = 0;
  }
  generate(particle, delta) {
    const container = particle.container,
      pxRatio = container.retina.pixelRatio;
    if (particle.svgDirection === undefined) {
      particle.svgDirection = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() > 0.5 ? 0 : 1;
    }
    if (particle.svgPathIndex === undefined) {
      particle.svgPathIndex = Math.floor(Math.random() * this._paths.length);
    }
    if (particle.svgSpeed === undefined) {
      particle.svgSpeed = particle.velocity.mult((particle.retina.moveSpeed ?? 1) / 2).length;
    }
    if (particle.svgStep === undefined) {
      particle.svgStep = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)({
        min: 0,
        max: this._paths[particle.svgPathIndex].length
      }) * pxRatio;
    }
    if (particle.svgOffset === undefined) {
      particle.svgOffset = {
        width: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)({
          min: -this._width / 2,
          max: this._width / 2
        }) * pxRatio,
        height: (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.randomInRange)({
          min: -this._width / 2,
          max: this._width / 2
        }) * pxRatio
      };
    }
    if (particle.svgInitialPosition === undefined) {
      particle.svgInitialPosition = {
        ...particle.position
      };
    }
    particle.velocity.x = 0;
    particle.velocity.y = 0;
    if (particle.svgDirection === 0) {
      particle.svgStep += particle.svgSpeed * delta.factor;
    } else {
      particle.svgStep -= particle.svgSpeed * delta.factor;
    }
    let path = this._paths[particle.svgPathIndex];
    if (path) {
      const pathLength = path.length;
      if (particle.svgStep >= pathLength) {
        particle.svgPathIndex = particle.svgPathIndex + 1;
        if (particle.svgPathIndex >= this._paths.length) {
          if (this._reverse) {
            particle.svgPathIndex = this._paths.length - 1;
            particle.svgDirection = 1;
          } else {
            particle.svgPathIndex = 0;
            particle.svgStep = 0;
          }
        }
      } else if (particle.svgStep <= 0) {
        particle.svgPathIndex = particle.svgPathIndex - 1;
        if (particle.svgPathIndex < 0) {
          if (this._reverse) {
            particle.svgPathIndex = 0;
            particle.svgDirection = 0;
          } else {
            particle.svgPathIndex = this._paths.length - 1;
            path = this._paths[particle.svgPathIndex];
            particle.svgStep = path.length;
          }
        }
      }
      path = this._paths[particle.svgPathIndex];
    }
    if (path) {
      const pathElement = path.element,
        pos = pathElement.getPointAtLength(particle.svgStep),
        canvasSize = particle.container.canvas.size,
        offset = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getPosition)(this._offset, canvasSize),
        scale = this._scale * pxRatio;
      particle.position.x = (pos.x - this._size.width / 2) * scale + particle.svgInitialPosition.x + offset.x + particle.svgOffset.width;
      particle.position.y = (pos.y - this._size.height / 2) * scale + particle.svgInitialPosition.y + offset.y + particle.svgOffset.height;
    }
    return external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin;
  }
  init(container) {
    const options = container.actualOptions.particles.move.path.options,
      position = options.position ?? this._offset;
    this._reverse = options.reverse ?? this._reverse;
    this._scale = options.scale ?? 1;
    this._offset.x = position.x;
    this._offset.y = position.y;
    this._offset.mode = position.mode;
    this._width = options.width ?? 0;
    if (options.url && !options.path) {
      const url = options.url;
      (async () => {
        const response = await fetch(url),
          data = await response.text();
        const parser = new DOMParser(),
          doc = parser.parseFromString(data, "image/svg+xml"),
          svg = doc.getElementsByTagName("svg")[0];
        let svgPaths = svg.getElementsByTagName("path");
        if (!svgPaths.length) {
          svgPaths = doc.getElementsByTagName("path");
        }
        this._paths = [];
        for (let i = 0; i < svgPaths.length; i++) {
          const path = svgPaths.item(i);
          if (path) {
            this._paths.push({
              element: path,
              length: path.getTotalLength()
            });
          }
        }
        this._size.height = parseFloat(svg.getAttribute("height") ?? "0");
        this._size.width = parseFloat(svg.getAttribute("width") ?? "0");
      })();
    } else if (options.path) {
      const path = options.path;
      this._paths = [];
      for (const item of path.data) {
        const element = document.createElementNS("http://www.w3.org/2000/svg", "path");
        element.setAttribute("d", item);
        this._paths.push({
          element,
          length: element.getTotalLength()
        });
      }
      this._size.height = path.size.height;
      this._size.width = path.size.width;
    }
  }
  reset() {}
  update() {}
}
;// CONCATENATED MODULE: ./dist/browser/index.js

const svgPathName = "svgPathGenerator";
async function loadSVGPath(engine, refresh = true) {
  await engine.addPathGenerator(svgPathName, new SVGPathGenerator(), refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});