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
  loadPerlinNoisePath: () => (/* binding */ loadPerlinNoisePath),
  perlinNoisePathName: () => (/* binding */ perlinNoisePathName)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Grad.js
class Grad {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  dot2(x, y) {
    return this.x * x + this.y * y;
  }
  dot3(x, y, z) {
    return this.dot2(x, y) + this.z * z;
  }
}
;// CONCATENATED MODULE: ./dist/browser/PerlinNoise.js

const grad3 = [new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0), new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1), new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)];
const p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180];
const perm = new Array(512);
const gradP = new Array(512);
function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
function lerp(a, b, t) {
  return (1 - t) * a + t * b;
}
class PerlinNoise {
  noise(x, y, z) {
    let X = Math.floor(x),
      Y = Math.floor(y),
      Z = Math.floor(z);
    x = x - X;
    y = y - Y;
    z = z - Z;
    X = X & 255;
    Y = Y & 255;
    Z = Z & 255;
    const n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z),
      n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1),
      n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z),
      n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1),
      n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z),
      n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1),
      n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z),
      n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(x - 1, y - 1, z - 1),
      u = fade(x),
      v = fade(y),
      w = fade(z);
    return lerp(lerp(lerp(n000, n100, u), lerp(n001, n101, u), w), lerp(lerp(n010, n110, u), lerp(n011, n111, u), w), v);
  }
  seed(inputSeed) {
    let seed = inputSeed;
    if (seed > 0 && seed < 1) {
      seed *= 65536;
    }
    seed = Math.floor(seed);
    if (seed < 256) {
      seed |= seed << 8;
    }
    for (let i = 0; i < 256; i++) {
      const v = i & 1 ? p[i] ^ seed & 255 : p[i] ^ seed >> 8 & 255;
      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/PerlinNoiseGenerator.js


class PerlinNoiseGenerator {
  constructor() {
    this._calculateField = () => {
      const {
        field,
        noiseGen,
        options
      } = this;
      for (let x = 0; x < options.columns; x++) {
        const column = field[x];
        for (let y = 0; y < options.rows; y++) {
          const cell = column[y];
          cell.length = noiseGen.noise(x / 100 + 40000, y / 100 + 40000, this.noiseZ);
          cell.angle = noiseGen.noise(x / 50, y / 50, this.noiseZ) * Math.PI * 2;
        }
      }
    };
    this._drawField = ctx => {
      const {
        field,
        options
      } = this;
      for (let x = 0; x < options.columns; x++) {
        const column = field[x];
        for (let y = 0; y < options.rows; y++) {
          const cell = column[y],
            {
              angle,
              length
            } = cell;
          ctx.setTransform(1, 0, 0, 1, x * this.options.size, y * this.options.size);
          ctx.rotate(angle);
          ctx.strokeStyle = "white";
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, this.options.size * length);
          ctx.stroke();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
      }
    };
    this._initField = () => {
      const {
        columns,
        rows
      } = this.options;
      this.field = new Array(columns);
      for (let x = 0; x < columns; x++) {
        this.field[x] = new Array(rows);
        for (let y = 0; y < rows; y++) {
          this.field[x][y] = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin;
        }
      }
    };
    this._resetField = container => {
      const sourceOptions = container.actualOptions.particles.move.path.options,
        {
          options
        } = this;
      options.size = sourceOptions.size > 0 ? sourceOptions.size : 20;
      options.increment = sourceOptions.increment > 0 ? sourceOptions.increment : 0.004;
      options.draw = !!sourceOptions.draw;
      options.width = container.canvas.size.width;
      options.height = container.canvas.size.height;
      this.noiseGen.seed(sourceOptions.seed ?? (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)());
      options.columns = Math.floor(this.options.width / this.options.size) + 1;
      options.rows = Math.floor(this.options.height / this.options.size) + 1;
      this._initField();
    };
    this._setup = container => {
      this.noiseZ = 0;
      this._resetField(container);
      window.addEventListener("resize", () => this._resetField(container));
    };
    this.noiseGen = new PerlinNoise();
    this.field = [];
    this.noiseZ = 0;
    this.options = {
      draw: false,
      size: 20,
      increment: 0.004,
      columns: 0,
      rows: 0,
      width: 0,
      height: 0
    };
  }
  generate(particle) {
    const pos = particle.getPosition(),
      {
        size
      } = this.options,
      point = {
        x: Math.max(Math.floor(pos.x / size), 0),
        y: Math.max(Math.floor(pos.y / size), 0)
      },
      {
        field
      } = this;
    return !field || !field[point.x] || !field[point.x][point.y] ? external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.origin : field[point.x][point.y].copy();
  }
  init(container) {
    this.container = container;
    this._setup(container);
  }
  reset() {}
  update() {
    if (!this.container) {
      return;
    }
    this._calculateField();
    this.noiseZ += this.options.increment;
    if (this.options.draw) {
      this.container.canvas.draw(ctx => this._drawField(ctx));
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js

const perlinNoisePathName = "perlinNoise";
async function loadPerlinNoisePath(engine, refresh = true) {
  await engine.addPathGenerator(perlinNoisePathName, new PerlinNoiseGenerator(), refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});