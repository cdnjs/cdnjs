(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === "object" && typeof module === "object") module.exports = factory(); else if (typeof define === "function" && define.amd) define([], factory); else {
    var a = factory();
    for (var i in a) (typeof exports === "object" ? exports : root)[i] = a[i];
  }
})(window, (function() {
  return function() {
    "use strict";
    var __webpack_require__ = {};
    !function() {
      __webpack_require__.d = function(exports, definition) {
        for (var key in definition) {
          if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, {
              enumerable: true,
              get: definition[key]
            });
          }
        }
      };
    }();
    !function() {
      __webpack_require__.o = function(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      };
    }();
    !function() {
      __webpack_require__.r = function(exports) {
        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
          Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
          });
        }
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
      };
    }();
    var __webpack_exports__ = {};
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      loadImageShape: function() {
        return loadImageShape;
      }
    });
    class Constants_Constants {}
    Constants_Constants.generatedAttribute = "generated";
    Constants_Constants.randomColorValue = "random";
    Constants_Constants.midColorValue = "mid";
    Constants_Constants.touchEndEvent = "touchend";
    Constants_Constants.mouseDownEvent = "mousedown";
    Constants_Constants.mouseUpEvent = "mouseup";
    Constants_Constants.mouseMoveEvent = "mousemove";
    Constants_Constants.touchStartEvent = "touchstart";
    Constants_Constants.touchMoveEvent = "touchmove";
    Constants_Constants.mouseLeaveEvent = "mouseleave";
    Constants_Constants.mouseOutEvent = "mouseout";
    Constants_Constants.touchCancelEvent = "touchcancel";
    Constants_Constants.resizeEvent = "resize";
    Constants_Constants.visibilityChangeEvent = "visibilitychange";
    Constants_Constants.noPolygonDataLoaded = "No polygon data loaded.";
    Constants_Constants.noPolygonFound = "No polygon found, you need to specify SVG url in config.";
    function hue2rgb(p, q, t) {
      let tCalc = t;
      if (tCalc < 0) {
        tCalc += 1;
      }
      if (tCalc > 1) {
        tCalc -= 1;
      }
      if (tCalc < 1 / 6) {
        return p + (q - p) * 6 * tCalc;
      }
      if (tCalc < 1 / 2) {
        return q;
      }
      if (tCalc < 2 / 3) {
        return p + (q - p) * (2 / 3 - tCalc) * 6;
      }
      return p;
    }
    function stringToRgba(input) {
      if (input.startsWith("rgb")) {
        const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)/i;
        const result = regex.exec(input);
        return result ? {
          a: result.length > 4 ? parseFloat(result[5]) : 1,
          b: parseInt(result[3], 10),
          g: parseInt(result[2], 10),
          r: parseInt(result[1], 10)
        } : undefined;
      } else if (input.startsWith("hsl")) {
        const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
        const result = regex.exec(input);
        return result ? hslaToRgba({
          a: result.length > 4 ? parseFloat(result[5]) : 1,
          h: parseInt(result[1], 10),
          l: parseInt(result[3], 10),
          s: parseInt(result[2], 10)
        }) : undefined;
      } else if (input.startsWith("hsv")) {
        const regex = /hsva?\(\s*(\d+)°\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
        const result = regex.exec(input);
        return result ? hsvaToRgba({
          a: result.length > 4 ? parseFloat(result[5]) : 1,
          h: parseInt(result[1], 10),
          s: parseInt(result[2], 10),
          v: parseInt(result[3], 10)
        }) : undefined;
      } else {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
        const hexFixed = input.replace(shorthandRegex, ((_m, r, g, b, a) => r + r + g + g + b + b + (a !== undefined ? a + a : "")));
        const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
        const result = regex.exec(hexFixed);
        return result ? {
          a: result[4] !== undefined ? parseInt(result[4], 16) / 255 : 1,
          b: parseInt(result[3], 16),
          g: parseInt(result[2], 16),
          r: parseInt(result[1], 16)
        } : undefined;
      }
    }
    function colorToRgb(input, index, useIndex = true) {
      var _a, _b, _c;
      if (input === undefined) {
        return;
      }
      const color = typeof input === "string" ? {
        value: input
      } : input;
      let res;
      if (typeof color.value === "string") {
        res = color.value === Constants.randomColorValue ? getRandomRgbColor() : stringToRgb(color.value);
      } else {
        if (color.value instanceof Array) {
          const colorSelected = itemFromArray(color.value, index, useIndex);
          res = colorToRgb({
            value: colorSelected
          });
        } else {
          const colorValue = color.value, rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;
          if (rgbColor.r !== undefined) {
            res = rgbColor;
          } else {
            const hslColor = (_b = colorValue.hsl) !== null && _b !== void 0 ? _b : color.value;
            if (hslColor.h !== undefined && hslColor.l !== undefined) {
              res = hslToRgb(hslColor);
            } else {
              const hsvColor = (_c = colorValue.hsv) !== null && _c !== void 0 ? _c : color.value;
              if (hsvColor.h !== undefined && hsvColor.v !== undefined) {
                res = hsvToRgb(hsvColor);
              }
            }
          }
        }
      }
      return res;
    }
    function colorToHsl(color, index, useIndex = true) {
      const rgb = colorToRgb(color, index, useIndex);
      return rgb !== undefined ? rgbToHsl(rgb) : undefined;
    }
    function rgbToHsl(color) {
      const r1 = color.r / 255, g1 = color.g / 255, b1 = color.b / 255;
      const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
      const res = {
        h: 0,
        l: (max + min) / 2,
        s: 0
      };
      if (max !== min) {
        res.s = res.l < .5 ? (max - min) / (max + min) : (max - min) / (2 - max - min);
        res.h = r1 === max ? (g1 - b1) / (max - min) : res.h = g1 === max ? 2 + (b1 - r1) / (max - min) : 4 + (r1 - g1) / (max - min);
      }
      res.l *= 100;
      res.s *= 100;
      res.h *= 60;
      if (res.h < 0) {
        res.h += 360;
      }
      return res;
    }
    function stringToAlpha(input) {
      var _a;
      return (_a = stringToRgba(input)) === null || _a === void 0 ? void 0 : _a.a;
    }
    function stringToRgb(input) {
      return stringToRgba(input);
    }
    function hslToRgb(hsl) {
      const result = {
        b: 0,
        g: 0,
        r: 0
      }, hslPercent = {
        h: hsl.h / 360,
        l: hsl.l / 100,
        s: hsl.s / 100
      };
      if (hslPercent.s === 0) {
        result.b = hslPercent.l;
        result.g = hslPercent.l;
        result.r = hslPercent.l;
      } else {
        const q = hslPercent.l < .5 ? hslPercent.l * (1 + hslPercent.s) : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s, p = 2 * hslPercent.l - q;
        result.r = hue2rgb(p, q, hslPercent.h + 1 / 3);
        result.g = hue2rgb(p, q, hslPercent.h);
        result.b = hue2rgb(p, q, hslPercent.h - 1 / 3);
      }
      result.r = Math.floor(result.r * 255);
      result.g = Math.floor(result.g * 255);
      result.b = Math.floor(result.b * 255);
      return result;
    }
    function hslaToRgba(hsla) {
      const rgbResult = hslToRgb(hsla);
      return {
        a: hsla.a,
        b: rgbResult.b,
        g: rgbResult.g,
        r: rgbResult.r
      };
    }
    function hslToHsv(hsl) {
      const l = hsl.l / 100, sl = hsl.s / 100, v = l + sl * Math.min(l, 1 - l), sv = !v ? 0 : 2 * (1 - l / v);
      return {
        h: hsl.h,
        s: sv * 100,
        v: v * 100
      };
    }
    function hslaToHsva(hsla) {
      const hsvResult = hslToHsv(hsla);
      return {
        a: hsla.a,
        h: hsvResult.h,
        s: hsvResult.s,
        v: hsvResult.v
      };
    }
    function hsvToHsl(hsv) {
      const v = hsv.v / 100, sv = hsv.s / 100, l = v * (1 - sv / 2), sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
      return {
        h: hsv.h,
        l: l * 100,
        s: sl * 100
      };
    }
    function hsvaToHsla(hsva) {
      const hslResult = hsvToHsl(hsva);
      return {
        a: hsva.a,
        h: hslResult.h,
        l: hslResult.l,
        s: hslResult.s
      };
    }
    function hsvToRgb(hsv) {
      const result = {
        b: 0,
        g: 0,
        r: 0
      }, hsvPercent = {
        h: hsv.h / 60,
        s: hsv.s / 100,
        v: hsv.v / 100
      };
      const c = hsvPercent.v * hsvPercent.s, x = c * (1 - Math.abs(hsvPercent.h % 2 - 1));
      let tempRgb;
      if (hsvPercent.h >= 0 && hsvPercent.h <= 1) {
        tempRgb = {
          r: c,
          g: x,
          b: 0
        };
      } else if (hsvPercent.h > 1 && hsvPercent.h <= 2) {
        tempRgb = {
          r: x,
          g: c,
          b: 0
        };
      } else if (hsvPercent.h > 2 && hsvPercent.h <= 3) {
        tempRgb = {
          r: 0,
          g: c,
          b: x
        };
      } else if (hsvPercent.h > 3 && hsvPercent.h <= 4) {
        tempRgb = {
          r: 0,
          g: x,
          b: c
        };
      } else if (hsvPercent.h > 4 && hsvPercent.h <= 5) {
        tempRgb = {
          r: x,
          g: 0,
          b: c
        };
      } else if (hsvPercent.h > 5 && hsvPercent.h <= 6) {
        tempRgb = {
          r: c,
          g: 0,
          b: x
        };
      }
      if (tempRgb) {
        const m = hsvPercent.v - c;
        result.r = Math.floor((tempRgb.r + m) * 255);
        result.g = Math.floor((tempRgb.g + m) * 255);
        result.b = Math.floor((tempRgb.b + m) * 255);
      }
      return result;
    }
    function hsvaToRgba(hsva) {
      const rgbResult = hsvToRgb(hsva);
      return {
        a: hsva.a,
        b: rgbResult.b,
        g: rgbResult.g,
        r: rgbResult.r
      };
    }
    function rgbToHsv(rgb) {
      const rgbPercent = {
        r: rgb.r / 255,
        g: rgb.g / 255,
        b: rgb.b / 255
      }, xMax = Math.max(rgbPercent.r, rgbPercent.g, rgbPercent.b), xMin = Math.min(rgbPercent.r, rgbPercent.g, rgbPercent.b), v = xMax, c = xMax - xMin;
      let h = 0;
      if (v === rgbPercent.r) {
        h = 60 * ((rgbPercent.g - rgbPercent.b) / c);
      } else if (v === rgbPercent.g) {
        h = 60 * (2 + (rgbPercent.b - rgbPercent.r) / c);
      } else if (v === rgbPercent.b) {
        h = 60 * (4 + (rgbPercent.r - rgbPercent.g) / c);
      }
      const s = !v ? 0 : c / v;
      return {
        h: h,
        s: s * 100,
        v: v * 100
      };
    }
    function rgbaToHsva(rgba) {
      const hsvResult = rgbToHsv(rgba);
      return {
        a: rgba.a,
        h: hsvResult.h,
        s: hsvResult.s,
        v: hsvResult.v
      };
    }
    function getRandomRgbColor(min) {
      const fixedMin = min !== null && min !== void 0 ? min : 0;
      return {
        b: Math.floor(randomInRange(setRangeValue(fixedMin, 256))),
        g: Math.floor(randomInRange(setRangeValue(fixedMin, 256))),
        r: Math.floor(randomInRange(setRangeValue(fixedMin, 256)))
      };
    }
    function getStyleFromRgb(color, opacity) {
      return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
    }
    function getStyleFromHsl(color, opacity) {
      return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
    }
    function getStyleFromHsv(color, opacity) {
      return getStyleFromHsl(hsvToHsl(color), opacity);
    }
    function colorMix(color1, color2, size1, size2) {
      let rgb1 = color1, rgb2 = color2;
      if (rgb1.r === undefined) {
        rgb1 = hslToRgb(color1);
      }
      if (rgb2.r === undefined) {
        rgb2 = hslToRgb(color2);
      }
      return {
        b: mix(rgb1.b, rgb2.b, size1, size2),
        g: mix(rgb1.g, rgb2.g, size1, size2),
        r: mix(rgb1.r, rgb2.r, size1, size2)
      };
    }
    function getLinkColor(p1, p2, linkColor) {
      var _a, _b;
      if (linkColor === Constants.randomColorValue) {
        return getRandomRgbColor();
      } else if (linkColor === "mid") {
        const sourceColor = (_a = p1.getFillColor()) !== null && _a !== void 0 ? _a : p1.getStrokeColor(), destColor = (_b = p2 === null || p2 === void 0 ? void 0 : p2.getFillColor()) !== null && _b !== void 0 ? _b : p2 === null || p2 === void 0 ? void 0 : p2.getStrokeColor();
        if (sourceColor && destColor && p2) {
          return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
        } else {
          const hslColor = sourceColor !== null && sourceColor !== void 0 ? sourceColor : destColor;
          if (hslColor) {
            return hslToRgb(hslColor);
          }
        }
      } else {
        return linkColor;
      }
    }
    function getLinkRandomColor(optColor, blink, consent) {
      const color = typeof optColor === "string" ? optColor : optColor.value;
      if (color === Constants.randomColorValue) {
        if (consent) {
          return colorToRgb({
            value: color
          });
        } else if (blink) {
          return Constants.randomColorValue;
        } else {
          return Constants.midColorValue;
        }
      } else {
        return colorToRgb({
          value: color
        });
      }
    }
    function getHslFromAnimation(animation) {
      return animation !== undefined ? {
        h: animation.h.value,
        s: animation.s.value,
        l: animation.l.value
      } : undefined;
    }
    function getHslAnimationFromHsl(hsl, animationOptions, reduceFactor) {
      const resColor = {
        h: {
          enable: false,
          value: hsl.h
        },
        s: {
          enable: false,
          value: hsl.s
        },
        l: {
          enable: false,
          value: hsl.l
        }
      };
      if (animationOptions) {
        setColorAnimation(resColor.h, animationOptions.h, reduceFactor);
        setColorAnimation(resColor.s, animationOptions.s, reduceFactor);
        setColorAnimation(resColor.l, animationOptions.l, reduceFactor);
      }
      return resColor;
    }
    function setColorAnimation(colorValue, colorAnimation, reduceFactor) {
      colorValue.enable = colorAnimation.enable;
      if (colorValue.enable) {
        colorValue.velocity = getRangeValue(colorAnimation.speed) / 100 * reduceFactor;
        if (colorAnimation.sync) {
          return;
        }
        colorValue.status = 0;
        colorValue.velocity *= Math.random();
        if (colorValue.value) {
          colorValue.value *= Math.random();
        }
      } else {
        colorValue.velocity = 0;
      }
    }
    const currentColorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;
    function replaceColorSvg(imageShape, color, opacity) {
      const {svgData: svgData} = imageShape;
      if (!svgData) {
        return "";
      }
      const colorStyle = getStyleFromHsl(color, opacity);
      if (svgData.includes("fill")) {
        return svgData.replace(currentColorRegex, (() => colorStyle));
      }
      const preFillIndex = svgData.indexOf(">");
      return `${svgData.substring(0, preFillIndex)} fill="${colorStyle}"${svgData.substring(preFillIndex)}`;
    }
    async function loadImage(image) {
      return new Promise((resolve => {
        image.loading = true;
        const img = new Image;
        img.addEventListener("load", (() => {
          image.element = img;
          image.loading = false;
          resolve();
        }));
        img.addEventListener("error", (() => {
          image.error = true;
          image.loading = false;
          console.error(`Error tsParticles - loading image: ${image.source}`);
          resolve();
        }));
        img.src = image.source;
      }));
    }
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
    function replaceImageColor(image, imageData, color, particle) {
      var _a, _b, _c;
      const svgColoredData = replaceColorSvg(image, color, (_b = (_a = particle.opacity) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 1);
      const svg = new Blob([ svgColoredData ], {
        type: "image/svg+xml"
      });
      const domUrl = URL || window.URL || window.webkitURL || window;
      const url = domUrl.createObjectURL(svg);
      const img = new Image;
      const imageRes = {
        data: Object.assign(Object.assign({}, image), {
          svgData: svgColoredData
        }),
        ratio: imageData.width / imageData.height,
        replaceColor: (_c = imageData.replaceColor) !== null && _c !== void 0 ? _c : imageData.replace_color,
        source: imageData.src
      };
      img.addEventListener("load", (() => {
        const pImage = particle.image;
        if (pImage) {
          pImage.loaded = true;
          image.element = img;
        }
        domUrl.revokeObjectURL(url);
      }));
      img.addEventListener("error", (() => {
        domUrl.revokeObjectURL(url);
        const img2 = Object.assign(Object.assign({}, image), {
          error: false,
          loading: true
        });
        loadImage(img2).then((() => {
          const pImage = particle.image;
          if (pImage) {
            image.element = img2.element;
            pImage.loaded = true;
          }
        }));
      }));
      img.src = url;
      return imageRes;
    }
    var __classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), 
      value;
    };
    var __classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function(receiver, state, kind, f) {
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
        const containerImages = __classPrivateFieldGet(this, _ImageDrawer_images, "f").find((t => t.id === container.id));
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
      destroy() {
        __classPrivateFieldSet(this, _ImageDrawer_images, [], "f");
      }
      draw(context, particle, radius, opacity) {
        var _a, _b;
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
        var _a, _b, _c;
        if (particle.shape !== "image" && particle.shape !== "images") {
          return;
        }
        const images = this.getImages(particle.container).images;
        const imageData = particle.shapeData;
        const image = images.find((t => t.source === imageData.src));
        let imageRes;
        if (!image) {
          this.loadImageShape(particle.container, imageData).then((() => {
            this.loadShape(particle);
          }));
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
        const fill = (_b = imageData.fill) !== null && _b !== void 0 ? _b : particle.fill;
        const close = (_c = imageData.close) !== null && _c !== void 0 ? _c : particle.close;
        const imageShape = {
          image: imageRes,
          fill: fill,
          close: close
        };
        particle.image = imageShape.image;
        particle.fill = imageShape.fill;
        particle.close = imageShape.close;
      }
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
    _ImageDrawer_images = new WeakMap;
    async function loadImageShape(engine) {
      const imageDrawer = new ImageDrawer;
      await engine.addShape("image", imageDrawer);
      await engine.addShape("images", imageDrawer);
    }
    return __webpack_exports__;
  }();
}));