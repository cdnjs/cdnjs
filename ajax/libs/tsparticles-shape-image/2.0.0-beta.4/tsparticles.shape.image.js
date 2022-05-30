/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.0-beta.4
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
  "loadImageShape": () => (/* binding */ loadImageShape)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/Utils.js
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


function loadImage(source) {
  return new Promise((resolve, reject) => {
    if (!source) {
      reject("Error tsParticles - No image.src");
      return;
    }

    const image = {
      source: source,
      type: source.substr(source.length - 3)
    };
    const img = new Image();
    img.addEventListener("load", () => {
      image.element = img;
      resolve(image);
    });
    img.addEventListener("error", () => {
      reject(`Error tsParticles - loading image: ${source}`);
    });
    img.src = source;
  });
}
function downloadSvgImage(source) {
  return __awaiter(this, void 0, void 0, function* () {
    if (!source) {
      throw new Error("Error tsParticles - No image.src");
    }

    const image = {
      source: source,
      type: source.substr(source.length - 3)
    };

    if (image.type !== "svg") {
      return loadImage(source);
    }

    const response = yield fetch(image.source);

    if (!response.ok) {
      throw new Error("Error tsParticles - Image not found");
    }

    image.svgData = yield response.text();
    return image;
  });
}
function replaceColorSvg(imageShape, color, opacity) {
  const {
    svgData
  } = imageShape;

  if (!svgData) {
    return "";
  }

  if (svgData.includes("fill")) {
    const currentColor = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;
    return svgData.replace(currentColor, () => (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromHsl)(color, opacity));
  }

  const preFillIndex = svgData.indexOf(">");
  return `${svgData.substring(0, preFillIndex)} fill="${(0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromHsl)(color, opacity)}"${svgData.substring(preFillIndex)}`;
}
;// CONCATENATED MODULE: ./dist/ImageDrawer.js
var ImageDrawer_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
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

var __classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var __classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _ImageDrawer_images;



class ImageDrawer {
  constructor() {
    _ImageDrawer_images.set(this, void 0);

    __classPrivateFieldSet(this, _ImageDrawer_images, [], "f");
  }

  getSidesCount() {
    return 12;
  }

  getImages(container) {
    const containerImages = __classPrivateFieldGet(this, _ImageDrawer_images, "f").find(t => t.id === container.id);

    if (!containerImages) {
      __classPrivateFieldGet(this, _ImageDrawer_images, "f").push({
        id: container.id,
        images: []
      });

      return this.getImages(container);
    } else {
      return containerImages;
    }
  }

  addImage(container, image) {
    const containerImages = this.getImages(container);
    containerImages === null || containerImages === void 0 ? void 0 : containerImages.images.push(image);
  }

  init(container) {
    return ImageDrawer_awaiter(this, void 0, void 0, function* () {
      yield this.loadImagesFromParticlesOptions(container, container.actualOptions.particles);
      yield this.loadImagesFromParticlesOptions(container, container.actualOptions.interactivity.modes.trail.particles);

      for (const manualParticle of container.actualOptions.manualParticles) {
        yield this.loadImagesFromParticlesOptions(container, manualParticle.options);
      }

      const emitterOptions = container.actualOptions;

      if (emitterOptions.emitters) {
        if (emitterOptions.emitters instanceof Array) {
          for (const emitter of emitterOptions.emitters) {
            yield this.loadImagesFromParticlesOptions(container, emitter.particles);
          }
        } else {
          yield this.loadImagesFromParticlesOptions(container, emitterOptions.emitters.particles);
        }
      }

      const interactiveEmitters = emitterOptions.interactivity.modes.emitters;

      if (interactiveEmitters) {
        if (interactiveEmitters instanceof Array) {
          for (const emitter of interactiveEmitters) {
            yield this.loadImagesFromParticlesOptions(container, emitter.particles);
          }
        } else {
          yield this.loadImagesFromParticlesOptions(container, interactiveEmitters.particles);
        }
      }
    });
  }

  destroy() {
    __classPrivateFieldSet(this, _ImageDrawer_images, [], "f");
  }

  loadImagesFromParticlesOptions(container, options) {
    var _a, _b, _c;

    return ImageDrawer_awaiter(this, void 0, void 0, function* () {
      const shapeOptions = options === null || options === void 0 ? void 0 : options.shape;

      if (!(shapeOptions === null || shapeOptions === void 0 ? void 0 : shapeOptions.type) || !shapeOptions.options || !(0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ShapeType.image, shapeOptions.type) && !(0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isInArray)(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ShapeType.images, shapeOptions.type)) {
        return;
      }

      const idx = __classPrivateFieldGet(this, _ImageDrawer_images, "f").findIndex(t => t.id === container.id);

      if (idx >= 0) {
        __classPrivateFieldGet(this, _ImageDrawer_images, "f").splice(idx, 1);
      }

      const imageOptions = (_a = shapeOptions.options[external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ShapeType.images]) !== null && _a !== void 0 ? _a : shapeOptions.options[external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.ShapeType.image];

      if (imageOptions instanceof Array) {
        for (const optionsImage of imageOptions) {
          yield this.loadImageShape(container, optionsImage);
        }
      } else {
        yield this.loadImageShape(container, imageOptions);
      }

      if (options === null || options === void 0 ? void 0 : options.groups) {
        for (const groupName in options.groups) {
          const group = options.groups[groupName];
          yield this.loadImagesFromParticlesOptions(container, group);
        }
      }

      if ((_c = (_b = options === null || options === void 0 ? void 0 : options.destroy) === null || _b === void 0 ? void 0 : _b.split) === null || _c === void 0 ? void 0 : _c.particles) {
        yield this.loadImagesFromParticlesOptions(container, options === null || options === void 0 ? void 0 : options.destroy.split.particles);
      }
    });
  }

  loadImageShape(container, imageShape) {
    return ImageDrawer_awaiter(this, void 0, void 0, function* () {
      try {
        const imageFunc = imageShape.replaceColor ? downloadSvgImage : loadImage;
        const image = yield imageFunc(imageShape.src);

        if (image) {
          this.addImage(container, image);
        }
      } catch (_a) {
        console.warn(`tsParticles error - ${imageShape.src} not found`);
      }
    });
  }

  draw(context, particle, radius, opacity) {
    var _a, _b;

    if (!context) {
      return;
    }

    const image = particle.image;
    const element = (_a = image === null || image === void 0 ? void 0 : image.data) === null || _a === void 0 ? void 0 : _a.element;

    if (!element) {
      return;
    }

    const ratio = (_b = image === null || image === void 0 ? void 0 : image.ratio) !== null && _b !== void 0 ? _b : 1;
    const pos = {
      x: -radius,
      y: -radius
    };

    if (!(image === null || image === void 0 ? void 0 : image.data.svgData) || !(image === null || image === void 0 ? void 0 : image.replaceColor)) {
      context.globalAlpha = opacity;
    }

    context.drawImage(element, pos.x, pos.y, radius * 2, radius * 2 / ratio);

    if (!(image === null || image === void 0 ? void 0 : image.data.svgData) || !(image === null || image === void 0 ? void 0 : image.replaceColor)) {
      context.globalAlpha = 1;
    }
  }

  loadShape(particle) {
    var _a, _b, _c, _d, _e, _f, _g;

    if (particle.shape !== "image" && particle.shape !== "images") {
      return;
    }

    const images = this.getImages(particle.container).images;
    const imageData = particle.shapeData;
    const image = (_a = images.find(t => t.source === imageData.src)) !== null && _a !== void 0 ? _a : images[0];
    const color = particle.getFillColor();
    let imageRes;

    if (!image) {
      return;
    }

    if (image.svgData !== undefined && imageData.replaceColor && color) {
      const svgColoredData = replaceColorSvg(image, color, (_c = (_b = particle.opacity) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : 1);
      const svg = new Blob([svgColoredData], {
        type: "image/svg+xml"
      });
      const domUrl = URL || window.URL || window.webkitURL || window;
      const url = domUrl.createObjectURL(svg);
      const img = new Image();
      imageRes = {
        data: Object.assign(Object.assign({}, image), {
          svgData: svgColoredData
        }),
        ratio: imageData.width / imageData.height,
        replaceColor: (_d = imageData.replaceColor) !== null && _d !== void 0 ? _d : imageData.replace_color,
        source: imageData.src
      };
      img.addEventListener("load", () => {
        const pImage = particle.image;

        if (pImage) {
          pImage.loaded = true;
          image.element = img;
        }

        domUrl.revokeObjectURL(url);
      });
      img.addEventListener("error", () => {
        domUrl.revokeObjectURL(url);
        loadImage(imageData.src).then(img2 => {
          const pImage = particle.image;

          if (pImage) {
            image.element = img2 === null || img2 === void 0 ? void 0 : img2.element;
            pImage.loaded = true;
          }
        });
      });
      img.src = url;
    } else {
      imageRes = {
        data: image,
        loaded: true,
        ratio: imageData.width / imageData.height,
        replaceColor: (_e = imageData.replaceColor) !== null && _e !== void 0 ? _e : imageData.replace_color,
        source: imageData.src
      };
    }

    if (!imageRes.ratio) {
      imageRes.ratio = 1;
    }

    const fill = (_f = imageData.fill) !== null && _f !== void 0 ? _f : particle.fill;
    const close = (_g = imageData.close) !== null && _g !== void 0 ? _g : particle.close;
    const imageShape = {
      image: imageRes,
      fill,
      close
    };
    particle.image = imageShape.image;
    particle.fill = imageShape.fill;
    particle.close = imageShape.close;
  }

}
_ImageDrawer_images = new WeakMap();
;// CONCATENATED MODULE: ./dist/index.js
var dist_awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
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


function loadImageShape(tsParticles) {
  return dist_awaiter(this, void 0, void 0, function* () {
    const imageDrawer = new ImageDrawer();
    yield tsParticles.addShape("image", imageDrawer);
    yield tsParticles.addShape("images", imageDrawer);
  });
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});