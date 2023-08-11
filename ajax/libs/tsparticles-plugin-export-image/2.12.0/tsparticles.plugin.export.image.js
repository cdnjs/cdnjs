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
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  loadExportImagePlugin: () => (/* binding */ loadExportImagePlugin)
});

;// CONCATENATED MODULE: ./dist/browser/ExportImageInstance.js
class ExportImageInstance {
  constructor(container, engine) {
    this._exportImage = async data => {
      const element = this._container.canvas.element;
      if (!element) {
        return;
      }
      return new Promise(resolve => {
        element.toBlob(blob => {
          if (!blob) {
            resolve(undefined);
            return;
          }
          resolve(blob);
        }, data.type ?? "image/png", data.quality);
      });
    };
    this._container = container;
    this._engine = engine;
  }
  async export(type, data) {
    const res = {
      supported: false
    };
    switch (type) {
      case "image":
        res.supported = true;
        res.blob = await this._exportImage(data);
        break;
    }
    return res;
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js

class ExportImagePlugin {
  constructor(engine) {
    this.id = "export-image";
    this._engine = engine;
  }
  getPlugin(container) {
    return new ExportImageInstance(container, this._engine);
  }
  loadOptions() {}
  needsPlugin() {
    return true;
  }
}
async function loadExportImagePlugin(engine, refresh = true) {
  await engine.addPlugin(new ExportImagePlugin(engine), refresh);
}
/******/ 	return __webpack_exports__;
/******/ })()
;
});