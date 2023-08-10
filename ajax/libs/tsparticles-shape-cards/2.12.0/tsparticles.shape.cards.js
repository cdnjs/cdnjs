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
  loadCardsShape: () => (/* binding */ loadCardsShape)
});

;// CONCATENATED MODULE: ./dist/browser/Utils.js
function drawPath(ctx, radius, path) {
  if (!path.segments.length || !path.segments[0].values.length) {
    return;
  }
  ctx.moveTo(path.segments[0].values[0].x * radius, path.segments[0].values[0].y * radius);
  for (let i = 0; i < path.segments.length; i++) {
    const segment = path.segments[i];
    ctx.bezierCurveTo(segment.values[1].x * radius, segment.values[1].y * radius, segment.values[2].x * radius, segment.values[2].y * radius, segment.values[3].x * radius, segment.values[3].y * radius);
  }
  for (let i = path.segments.length - 1; i >= 0; i--) {
    const segment = path.segments[i];
    ctx.bezierCurveTo(-segment.values[2].x * radius, segment.values[2].y * radius, -segment.values[1].x * radius, segment.values[1].y * radius, -segment.values[0].x * radius, segment.values[0].y * radius);
  }
}
const n = 1.0 / 2;
const paths = {
  heart: {
    segments: [{
      values: [{
        x: 0,
        y: n
      }, {
        x: 0,
        y: n
      }, {
        x: n,
        y: 0
      }, {
        x: n,
        y: -n / 2
      }]
    }, {
      values: [{
        x: n,
        y: -n / 2
      }, {
        x: n,
        y: -n / 2
      }, {
        x: n,
        y: -n
      }, {
        x: n / 2,
        y: -n
      }]
    }, {
      values: [{
        x: n / 2,
        y: -n
      }, {
        x: n / 2,
        y: -n
      }, {
        x: 0,
        y: -n
      }, {
        x: 0,
        y: -n / 2
      }]
    }]
  },
  diamond: {
    segments: [{
      values: [{
        x: 0,
        y: n
      }, {
        x: 0,
        y: n
      }, {
        x: 3 * n / 4,
        y: 0
      }, {
        x: 3 * n / 4,
        y: 0
      }]
    }, {
      values: [{
        x: 3 * n / 4,
        y: 0
      }, {
        x: 3 * n / 4,
        y: 0
      }, {
        x: 0,
        y: -n
      }, {
        x: 0,
        y: -n
      }]
    }]
  },
  club: {
    segments: [{
      values: [{
        x: 0,
        y: -n
      }, {
        x: 0,
        y: -n
      }, {
        x: n / 2,
        y: -n
      }, {
        x: n / 2,
        y: -n / 2
      }]
    }, {
      values: [{
        x: n / 2,
        y: -n / 2
      }, {
        x: n / 2,
        y: -n / 2
      }, {
        x: n,
        y: -n / 2
      }, {
        x: n,
        y: 0
      }]
    }, {
      values: [{
        x: n,
        y: 0
      }, {
        x: n,
        y: 0
      }, {
        x: n,
        y: n / 2
      }, {
        x: n / 2,
        y: n / 2
      }]
    }, {
      values: [{
        x: n / 2,
        y: n / 2
      }, {
        x: n / 2,
        y: n / 2
      }, {
        x: n / 8,
        y: n / 2
      }, {
        x: n / 8,
        y: n / 8
      }]
    }, {
      values: [{
        x: n / 8,
        y: n / 8
      }, {
        x: n / 8,
        y: n / 2
      }, {
        x: n / 2,
        y: n
      }, {
        x: n / 2,
        y: n
      }]
    }, {
      values: [{
        x: n / 2,
        y: n
      }, {
        x: n / 2,
        y: n
      }, {
        x: 0,
        y: n
      }, {
        x: 0,
        y: n
      }]
    }]
  },
  spade: {
    segments: [{
      values: [{
        x: 0,
        y: -n
      }, {
        x: 0,
        y: -n
      }, {
        x: n,
        y: -n / 2
      }, {
        x: n,
        y: 0
      }]
    }, {
      values: [{
        x: n,
        y: 0
      }, {
        x: n,
        y: 0
      }, {
        x: n,
        y: n / 2
      }, {
        x: n / 2,
        y: n / 2
      }]
    }, {
      values: [{
        x: n / 2,
        y: n / 2
      }, {
        x: n / 2,
        y: n / 2
      }, {
        x: n / 8,
        y: n / 2
      }, {
        x: n / 8,
        y: n / 8
      }]
    }, {
      values: [{
        x: n / 8,
        y: n / 8
      }, {
        x: n / 8,
        y: n / 2
      }, {
        x: n / 2,
        y: n
      }, {
        x: n / 2,
        y: n
      }]
    }, {
      values: [{
        x: n / 2,
        y: n
      }, {
        x: n / 2,
        y: n
      }, {
        x: 0,
        y: n
      }, {
        x: 0,
        y: n
      }]
    }]
  }
};
;// CONCATENATED MODULE: ./dist/browser/CardsSuitsDrawers.js

class SpadeDrawer {
  draw(context, _particle, radius) {
    drawPath(context, radius, paths.spade);
  }
}
class HeartDrawer {
  draw(context, _particle, radius) {
    drawPath(context, radius, paths.heart);
  }
}
class DiamondDrawer {
  draw(context, _particle, radius) {
    drawPath(context, radius, paths.diamond);
  }
}
class ClubDrawer {
  draw(context, _particle, radius) {
    drawPath(context, radius, paths.club);
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js

async function loadCardsShape(engine, refresh = true) {
  await engine.addShape(["spade", "spades"], new SpadeDrawer(), refresh);
  await engine.addShape(["heart", "hearts"], new HeartDrawer(), refresh);
  await engine.addShape(["diamond", "diamonds"], new DiamondDrawer(), refresh);
  await engine.addShape(["club", "clubs"], new ClubDrawer(), refresh);
}
/******/ 	return __webpack_exports__;
/******/ })()
;
});