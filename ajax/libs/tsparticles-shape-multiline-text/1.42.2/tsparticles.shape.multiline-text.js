/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v1.42.2
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

// EXTERNAL MODULE: external {"commonjs":"tsparticles","commonjs2":"tsparticles","amd":"tsparticles","root":"window"}
var external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_ = __webpack_require__(764);
;// CONCATENATED MODULE: ./dist/MultilineTextDrawer.js
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};


class MultilineTextDrawer {
  init(container) {
    return __awaiter(this, void 0, void 0, function* () {
      const options = container.options;
      const shapeType = "multiline-text";

      if ((0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.isInArray)(shapeType, options.particles.shape.type)) {
        const shapeOptions = options.particles.shape.options[shapeType];

        if (shapeOptions instanceof Array) {
          for (const character of shapeOptions) {
            yield (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.loadFont)(character);
          }
        } else {
          if (shapeOptions !== undefined) {
            yield (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.loadFont)(shapeOptions);
          }
        }
      }
    });
  }

  draw(context, particle, radius) {
    const character = particle.shapeData;

    if (character === undefined) {
      return;
    }

    const textData = character.value;

    if (textData === undefined) {
      return;
    }

    const textParticle = particle;

    if (textParticle.text === undefined) {
      textParticle.text = textData instanceof Array ? (0,external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.itemFromArray)(textData, particle.randomIndexData) : textData;
    }

    const text = textParticle.text;
    const style = character.style;
    const weight = character.weight;
    const size = Math.round(radius) * 2;
    const font = character.font;
    const fill = particle.fill;
    context.font = `${style} ${weight} ${size}px "${font}"`;

    if (fill) {
      text === null || text === void 0 ? void 0 : text.split("\n").forEach((line, index) => {
        const offsetX = line.length * radius / 2;
        const pos = {
          x: -offsetX,
          y: radius / 2
        };
        context.fillText(line, pos.x, pos.y + radius * 2 * index);
      });
    } else {
      text === null || text === void 0 ? void 0 : text.split("\n").forEach((line, index) => {
        const offsetX = line.length * radius / 2;
        const pos = {
          x: -offsetX,
          y: radius / 2
        };
        context.strokeText(line, pos.x, pos.y + radius * 2 * index);
      });
    }
  }

}
;// CONCATENATED MODULE: ./dist/shape.js

function loadMultilineTextShape(engine) {
  engine.addShape("multiline-text", new MultilineTextDrawer());
}
;// CONCATENATED MODULE: ./dist/index.js


loadMultilineTextShape(external_commonjs_tsparticles_commonjs2_tsparticles_amd_tsparticles_root_window_.tsParticles);
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});