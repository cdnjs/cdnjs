/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.1.4
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
})(this, (__WEBPACK_EXTERNAL_MODULE__818__) => {
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
;// CONCATENATED MODULE: ./dist/browser/Utils.js

/**
 * The color regex for replacing values in SVG data
 */

const currentColorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;
/**
 * Replaces the color in SVG files when replace color is set
 * @param imageShape the image used for replacing SVG data
 * @param color the replace color value
 * @param opacity the color opacity
 * @returns the new SVG data
 */

function replaceColorSvg(imageShape, color, opacity) {
  const {
    svgData
  } = imageShape;

  if (!svgData) {
    return "";
  }

  const colorStyle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromHsl)(color, opacity);
  /* set color to svg element */

  if (svgData.includes("fill")) {
    return svgData.replace(currentColorRegex, () => colorStyle);
  }

  const preFillIndex = svgData.indexOf(">");
  return `${svgData.substring(0, preFillIndex)} fill="${colorStyle}"${svgData.substring(preFillIndex)}`;
}
/**
 * Loads the given image
 * @param image the image to load
 */


async function loadImage(image) {
  return new Promise(resolve => {
    image.loading = true;
    const img = new Image();
    img.addEventListener("load", () => {
      image.element = img;
      image.loading = false;
      resolve();
    });
    img.addEventListener("error", () => {
      image.error = true;
      image.loading = false;
      console.error(`Error tsParticles - loading image: ${image.source}`);
      resolve();
    });
    img.src = image.source;
  });
}
/**
 * Downloads the SVG image data, using `fetch`
 * @param image the image to download
 */

async function downloadSvgImage(image) {
  if (image.type !== "svg") {
    await loadImage(image);
    return;
  }

  image.loading = true;
  const response = await fetch(image.source);
  image.loading = false;

  if (!response.ok) {
    console.error("Error tsParticles - Image not found");
    image.error = true;
  }

  if (!image.error) {
    image.svgData = await response.text();
  }
}
/**
 * Replaces the color in a SVG image
 * @param image the SVG image to replace
 * @param imageData the image shape data
 * @param color the replace color
 * @param particle the particle where the replaced data is going to be used
 */

function replaceImageColor(image, imageData, color, particle) {
  var _a, _b, _c;

  const svgColoredData = replaceColorSvg(image, color, (_b = (_a = particle.opacity) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 1),
        svg = new Blob([svgColoredData], {
    type: "image/svg+xml"
  })
  /* prepare to create img with colored svg */
  ,
        domUrl = URL || window.URL || window.webkitURL || window,
        url = domUrl.createObjectURL(svg),
        img = new Image()
  /* create particle img obj */
  ,
        imageRes = {
    data: Object.assign(Object.assign({}, image), {
      svgData: svgColoredData
    }),
    ratio: imageData.width / imageData.height,
    replaceColor: (_c = imageData.replaceColor) !== null && _c !== void 0 ? _c : imageData.replace_color,
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
    const img2 = Object.assign(Object.assign({}, image), {
      error: false,
      loading: true
    }); // deepcode ignore PromiseNotCaughtGeneral: catch can be ignored

    loadImage(img2).then(() => {
      const pImage = particle.image;

      if (pImage) {
        image.element = img2.element;
        pImage.loaded = true;
      }
    });
  });
  img.src = url;
  return imageRes;
}
;// CONCATENATED MODULE: ./dist/browser/ImageDrawer.js
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


/**
 * @category Shape Drawers
 */

class ImageDrawer {
  /**
   * Image drawer constructor, initializing the image set collection
   */
  constructor() {
    /**
     * The image set collection
     * @private
     */
    _ImageDrawer_images.set(this, void 0);

    __classPrivateFieldSet(this, _ImageDrawer_images, [], "f");
  }
  /**
   * Adds an image to the given container
   * @param container the container where the image is going to be added
   * @param image the image to add to the container collection
   */


  addImage(container, image) {
    const containerImages = this.getImages(container);
    containerImages === null || containerImages === void 0 ? void 0 : containerImages.images.push(image);
  }
  /**
   * Resets the image general collection
   */


  destroy() {
    __classPrivateFieldSet(this, _ImageDrawer_images, [], "f");
  }
  /**
   * The draw image method
   * @param context the context used for drawing
   * @param particle the particle to be drawn
   * @param radius the particle radius
   * @param opacity the particle opacity
   */


  draw(context, particle, radius, opacity) {
    var _a, _b;

    const image = particle.image,
          element = (_a = image === null || image === void 0 ? void 0 : image.data) === null || _a === void 0 ? void 0 : _a.element;

    if (!element) {
      return;
    }

    const ratio = (_b = image === null || image === void 0 ? void 0 : image.ratio) !== null && _b !== void 0 ? _b : 1,
          pos = {
      x: -radius,
      y: -radius
    };
    context.globalAlpha = opacity;
    context.drawImage(element, pos.x, pos.y, radius * 2, radius * 2 / ratio);
    context.globalAlpha = 1;
  }
  /**
   * Gets the image collection of the given container
   * @param container the container requesting the image collection
   * @returns the container image collection
   */


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
  /**
   * Returning the side count for the image, defaults to 12 for using the inner circle as rendering
   * When using non-transparent images this can be an issue with shadows
   */


  getSidesCount() {
    return 12;
  }
  /**
   * Loads the image shape to the given particle
   * @param particle the particle loading the image shape
   */


  loadShape(particle) {
    var _a, _b, _c;

    if (particle.shape !== "image" && particle.shape !== "images") {
      return;
    }

    const images = this.getImages(particle.container).images,
          imageData = particle.shapeData,
          image = images.find(t => t.source === imageData.src);
    let imageRes;

    if (!image) {
      this.loadImageShape(particle.container, imageData).then(() => {
        this.loadShape(particle);
      });
      return;
    }

    if (image.error) {
      return;
    }

    const color = particle.getFillColor();

    if (image.svgData && imageData.replaceColor && color) {
      imageRes = replaceImageColor(image, imageData, color, particle);
    } else {
      imageRes = {
        data: image,
        loaded: true,
        ratio: imageData.width / imageData.height,
        replaceColor: (_a = imageData.replaceColor) !== null && _a !== void 0 ? _a : imageData.replace_color,
        source: imageData.src
      };
    }

    if (!imageRes.ratio) {
      imageRes.ratio = 1;
    }

    const fill = (_b = imageData.fill) !== null && _b !== void 0 ? _b : particle.fill,
          close = (_c = imageData.close) !== null && _c !== void 0 ? _c : particle.close,
          imageShape = {
      image: imageRes,
      fill,
      close
    };
    particle.image = imageShape.image;
    particle.fill = imageShape.fill;
    particle.close = imageShape.close;
  }
  /**
   * Loads the image shape
   * @param container the container used for searching images
   * @param imageShape the image shape to load
   * @private
   */


  async loadImageShape(container, imageShape) {
    const source = imageShape.src;

    if (!source) {
      throw new Error("Error tsParticles - No image.src");
    }

    try {
      const image = {
        source: source,
        type: source.substr(source.length - 3),
        error: false,
        loading: true
      };
      this.addImage(container, image);
      const imageFunc = imageShape.replaceColor ? downloadSvgImage : loadImage;
      await imageFunc(image);
    } catch (_a) {
      throw new Error(`tsParticles error - ${imageShape.src} not found`);
    }
  }

}
_ImageDrawer_images = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/index.js

/**
 * Loads the image shape in the given engine
 * @param engine the engine where the image shape is going to be added
 */

async function loadImageShape(engine) {
  const imageDrawer = new ImageDrawer();
  await engine.addShape("image", imageDrawer);
  await engine.addShape("images", imageDrawer);
}
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});