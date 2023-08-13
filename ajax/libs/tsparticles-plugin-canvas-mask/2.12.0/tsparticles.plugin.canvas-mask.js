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
  loadCanvasMaskPlugin: () => (/* binding */ loadCanvasMaskPlugin)
});

;// CONCATENATED MODULE: ./dist/browser/Options/Classes/CanvasMaskOverride.js
class CanvasMaskOverride {
  constructor() {
    this.color = true;
    this.opacity = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== undefined) {
      this.color = data.color;
    }
    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }
}
// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/CanvasMaskPixels.js

class CanvasMaskPixels {
  constructor() {
    this.filter = pixel => pixel.a > 0;
    this.offset = 4;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.filter !== undefined) {
      if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isString)(data.filter)) {
        if (Object.hasOwn(window, data.filter)) {
          const filter = window[data.filter];
          if ((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isFunction)(filter)) {
            this.filter = filter;
          }
        }
      } else {
        this.filter = data.filter;
      }
    }
    if (data.offset !== undefined) {
      this.offset = data.offset;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/ImageMask.js
class ImageMask {
  constructor() {
    this.src = "";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.src !== undefined) {
      this.src = data.src;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/FontTextMask.js
class FontTextMask {
  constructor() {
    this.family = "sans-serif";
    this.size = 100;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.family !== undefined) {
      this.family = data.family;
    }
    if (data.size !== undefined) {
      this.size = data.size;
    }
    if (data.style !== undefined) {
      this.style = data.style;
    }
    if (data.variant !== undefined) {
      this.variant = data.variant;
    }
    if (data.weight !== undefined) {
      this.weight = data.weight;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/TextMaskLine.js
class TextMaskLine {
  constructor() {
    this.separator = "\n";
    this.spacing = 10;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.separator !== undefined) {
      this.separator = data.separator;
    }
    if (data.spacing !== undefined) {
      this.spacing = data.spacing;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/TextMask.js


class TextMask {
  constructor() {
    this.color = "#000000";
    this.font = new FontTextMask();
    this.lines = new TextMaskLine();
    this.text = "";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== undefined) {
      this.color = data.color;
    }
    this.font.load(data.font);
    this.lines.load(data.lines);
    if (data.text !== undefined) {
      this.text = data.text;
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/CanvasMask.js




class CanvasMask {
  constructor() {
    this.enable = false;
    this.override = new CanvasMaskOverride();
    this.pixels = new CanvasMaskPixels();
    this.position = {
      x: 50,
      y: 50
    };
    this.scale = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.element !== undefined && data.element instanceof HTMLCanvasElement) {
      this.element = data.element;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.image) {
      if (!this.image) {
        this.image = new ImageMask();
      }
      this.image.load(data.image);
    }
    this.pixels.load(data.pixels);
    if (data.position) {
      this.position = {
        x: data.position.x ?? this.position.x,
        y: data.position.y ?? this.position.y
      };
    }
    this.override.load(data.override);
    if (data.scale !== undefined) {
      this.scale = data.scale;
    }
    if (data.selector !== undefined) {
      this.selector = data.selector;
    }
    if (data.text) {
      if (!this.text) {
        this.text = new TextMask();
      }
      this.text.load(data.text);
    }
  }
}
;// CONCATENATED MODULE: ./dist/browser/utils.js

function shuffle(array) {
  for (let currentIndex = array.length - 1; currentIndex >= 0; currentIndex--) {
    const randomIndex = Math.floor((0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getRandom)() * currentIndex);
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
function addParticlesFromCanvasPixels(container, data, position, scale, override, filter) {
  const {
      height,
      width
    } = data,
    numPixels = height * width,
    indexArray = shuffle(range(numPixels)),
    maxParticles = Math.min(numPixels, container.actualOptions.particles.number.value),
    canvasSize = container.canvas.size;
  let selectedPixels = 0;
  const positionOffset = {
    x: canvasSize.width * position.x / 100 - width * scale / 2,
    y: canvasSize.height * position.y / 100 - height * scale / 2
  };
  while (selectedPixels < maxParticles && indexArray.length) {
    const nextIndex = indexArray.pop() || 0,
      pixelPos = {
        x: nextIndex % width,
        y: Math.floor(nextIndex / width)
      },
      pixel = data.pixels[pixelPos.y][pixelPos.x],
      shouldCreateParticle = filter(pixel);
    if (shouldCreateParticle) {
      const pos = {
        x: pixelPos.x * scale + positionOffset.x,
        y: pixelPos.y * scale + positionOffset.y
      };
      const pOptions = {};
      if (override.color) {
        pOptions.color = {
          value: pixel
        };
      }
      if (override.opacity) {
        pOptions.opacity = {
          value: pixel.a
        };
      }
      container.particles.addParticle(pos, pOptions);
      selectedPixels++;
    }
  }
}
function getCanvasImageData(ctx, size, offset, clear = true) {
  const imageData = ctx.getImageData(0, 0, size.width, size.height).data;
  if (clear) {
    ctx.clearRect(0, 0, size.width, size.height);
  }
  const pixels = [];
  for (let i = 0; i < imageData.length; i += offset) {
    const idx = i / offset,
      pos = {
        x: idx % size.width,
        y: Math.floor(idx / size.width)
      };
    if (!pixels[pos.y]) {
      pixels[pos.y] = [];
    }
    pixels[pos.y][pos.x] = {
      r: imageData[i],
      g: imageData[i + 1],
      b: imageData[i + 2],
      a: imageData[i + 3] / 255
    };
  }
  return {
    pixels,
    width: Math.min(...pixels.map(row => row.length)),
    height: pixels.length
  };
}
function getImageData(src, offset) {
  const image = new Image();
  image.crossOrigin = "Anonymous";
  const p = new Promise((resolve, reject) => {
    image.onerror = reject;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");
      if (!context) {
        return reject(new Error(`${external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.errorPrefix} Could not get canvas context`));
      }
      context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
      resolve(getCanvasImageData(context, canvas, offset));
    };
  });
  image.src = src;
  return p;
}
function getTextData(textOptions, offset) {
  const canvas = document.createElement("canvas"),
    context = canvas.getContext("2d"),
    {
      font,
      text,
      lines: linesOptions,
      color
    } = textOptions;
  if (!text || !context) {
    return;
  }
  const lines = text.split(linesOptions.separator),
    fontSize = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isNumber)(font.size) ? `${font.size}px` : font.size,
    linesData = [];
  let maxWidth = 0,
    totalHeight = 0;
  for (const line of lines) {
    context.font = `${font.style || ""} ${font.variant || ""} ${font.weight || ""} ${fontSize} ${font.family}`;
    const measure = context.measureText(line),
      lineData = {
        measure,
        text: line,
        height: measure.actualBoundingBoxAscent + measure.actualBoundingBoxDescent,
        width: measure.width
      };
    maxWidth = Math.max(maxWidth || 0, lineData.width);
    totalHeight += lineData.height + linesOptions.spacing;
    linesData.push(lineData);
  }
  canvas.width = maxWidth;
  canvas.height = totalHeight;
  let currentHeight = 0;
  for (const line of linesData) {
    context.font = `${font.style || ""} ${font.variant || ""} ${font.weight || ""} ${fontSize} ${font.family}`;
    context.fillStyle = color;
    context.fillText(line.text, 0, currentHeight + line.measure.actualBoundingBoxAscent);
    currentHeight += line.height + linesOptions.spacing;
  }
  return getCanvasImageData(context, canvas, offset);
}
const range = n => [...Array(n).keys()];
;// CONCATENATED MODULE: ./dist/browser/CanvasMaskInstance.js

class CanvasMaskInstance {
  constructor(container, engine) {
    this._container = container;
    this._engine = engine;
  }
  async init() {
    const container = this._container,
      options = container.actualOptions.canvasMask;
    if (!options?.enable) {
      return;
    }
    let pixelData = {
      pixels: [],
      height: 0,
      width: 0
    };
    const offset = options.pixels.offset;
    if (options.image) {
      const url = options.image.src;
      if (!url) {
        return;
      }
      pixelData = await getImageData(url, offset);
    } else if (options.text) {
      const textOptions = options.text;
      const data = getTextData(textOptions, offset);
      if (!data) {
        return;
      }
      pixelData = data;
    } else if (options.element || options.selector) {
      const canvas = options.element || options.selector && document.querySelector(options.selector);
      if (!canvas) {
        return;
      }
      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }
      pixelData = getCanvasImageData(context, canvas, offset);
    }
    addParticlesFromCanvasPixels(container, pixelData, options.position, options.scale, options.override, options.pixels.filter);
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js


class CanvasMaskPlugin {
  constructor(engine) {
    this.id = "canvasMask";
    this._engine = engine;
  }
  getPlugin(container) {
    return new CanvasMaskInstance(container, this._engine);
  }
  loadOptions(options, source) {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }
    let canvasMaskOptions = options.canvasMask;
    if (canvasMaskOptions?.load === undefined) {
      options.canvasMask = canvasMaskOptions = new CanvasMask();
    }
    canvasMaskOptions.load(source?.canvasMask);
  }
  needsPlugin(options) {
    return options?.canvasMask?.enable ?? false;
  }
}
async function loadCanvasMaskPlugin(engine, refresh = true) {
  await engine.addPlugin(new CanvasMaskPlugin(engine), refresh);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});