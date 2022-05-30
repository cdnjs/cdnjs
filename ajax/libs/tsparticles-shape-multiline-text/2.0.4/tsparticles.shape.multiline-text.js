/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.4
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

/***/ 23:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
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

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.MultilineTextDrawer = void 0;

const tsparticles_engine_1 = __webpack_require__(818);

class MultilineTextDrawer {
  init(container) {
    return __awaiter(this, void 0, void 0, function* () {
      const options = container.options;
      const shapeType = "multiline-text";

      if ((0, tsparticles_engine_1.isInArray)(shapeType, options.particles.shape.type)) {
        const shapeOptions = options.particles.shape.options[shapeType];

        if (shapeOptions instanceof Array) {
          for (const character of shapeOptions) {
            yield (0, tsparticles_engine_1.loadFont)(character.font, character.weight);
          }
        } else {
          if (shapeOptions !== undefined) {
            yield (0, tsparticles_engine_1.loadFont)(shapeOptions.font, shapeOptions.weight);
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
      textParticle.text = textData instanceof Array ? (0, tsparticles_engine_1.itemFromArray)(textData, particle.randomIndexData) : textData;
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

exports.MultilineTextDrawer = MultilineTextDrawer;

/***/ }),

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
var exports = __webpack_exports__;


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.loadMultilineTextShape = void 0;

const MultilineTextDrawer_1 = __webpack_require__(23);

function loadMultilineTextShape(engine) {
  engine.addShape("multiline-text", new MultilineTextDrawer_1.MultilineTextDrawer());
}

exports.loadMultilineTextShape = loadMultilineTextShape;
}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});