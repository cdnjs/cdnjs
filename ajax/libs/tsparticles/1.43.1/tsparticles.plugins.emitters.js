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
      loadEmittersPlugin: function() {
        return loadEmittersPlugin;
      }
    });
    class CircleShape {
      randomPosition(position, size, fill) {
        const generateTheta = (x, y) => {
          const u = Math.random() / 4, theta = Math.atan(y / x * Math.tan(2 * Math.PI * u)), v = Math.random();
          if (v < .25) {
            return theta;
          } else if (v < .5) {
            return Math.PI - theta;
          } else if (v < .75) {
            return Math.PI + theta;
          } else {
            return -theta;
          }
        }, radius = (x, y, theta) => x * y / Math.sqrt((y * Math.cos(theta)) ** 2 + (x * Math.sin(theta)) ** 2), [a, b] = [ size.width / 2, size.height / 2 ], randomTheta = generateTheta(a, b), maxRadius = radius(a, b, randomTheta), randomRadius = fill ? maxRadius * Math.sqrt(Math.random()) : maxRadius;
        return {
          x: position.x + randomRadius * Math.cos(randomTheta),
          y: position.y + randomRadius * Math.sin(randomTheta)
        };
      }
    }
    function clamp(num, min, max) {
      return Math.min(Math.max(num, min), max);
    }
    function NumberUtils_mix(comp1, comp2, weight1, weight2) {
      return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
    }
    function randomInRange(r) {
      const max = getRangeMax(r);
      let min = getRangeMin(r);
      if (max === min) {
        min = 0;
      }
      return Math.random() * (max - min) + min;
    }
    function NumberUtils_getRangeValue(value) {
      return typeof value === "number" ? value : randomInRange(value);
    }
    function getRangeMin(value) {
      return typeof value === "number" ? value : value.min;
    }
    function getRangeMax(value) {
      return typeof value === "number" ? value : value.max;
    }
    function setRangeValue(source, value) {
      if (source === value || value === undefined && typeof source === "number") {
        return source;
      }
      const min = getRangeMin(source), max = getRangeMax(source);
      return value !== undefined ? {
        min: Math.min(min, value),
        max: Math.max(max, value)
      } : setRangeValue(min, max);
    }
    function NumberUtils_getValue(options) {
      const random = options.random, {enable: enable, minimumValue: minimumValue} = typeof random === "boolean" ? {
        enable: random,
        minimumValue: 0
      } : random;
      return enable ? NumberUtils_getRangeValue(setRangeValue(options.value, minimumValue)) : NumberUtils_getRangeValue(options.value);
    }
    function NumberUtils_getDistances(pointA, pointB) {
      const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y;
      return {
        dx: dx,
        dy: dy,
        distance: Math.sqrt(dx * dx + dy * dy)
      };
    }
    function getDistance(pointA, pointB) {
      return NumberUtils_getDistances(pointA, pointB).distance;
    }
    function getParticleDirectionAngle(direction) {
      if (typeof direction === "number") {
        return direction * Math.PI / 180;
      } else {
        switch (direction) {
         case "top":
          return -Math.PI / 2;

         case "top-right":
          return -Math.PI / 4;

         case "right":
          return 0;

         case "bottom-right":
          return Math.PI / 4;

         case "bottom":
          return Math.PI / 2;

         case "bottom-left":
          return 3 * Math.PI / 4;

         case "left":
          return Math.PI;

         case "top-left":
          return -3 * Math.PI / 4;

         case "none":
         default:
          return Math.random() * Math.PI * 2;
        }
      }
    }
    function getParticleBaseVelocity(direction) {
      const baseVelocity = Vector.origin;
      baseVelocity.length = 1;
      baseVelocity.angle = direction;
      return baseVelocity;
    }
    function NumberUtils_collisionVelocity(v1, v2, m1, m2) {
      return Vector.create(v1.x * (m1 - m2) / (m1 + m2) + v2.x * 2 * m2 / (m1 + m2), v1.y);
    }
    function calcEasing(value, type) {
      switch (type) {
       case "ease-out-quad":
        return 1 - (1 - value) ** 2;

       case "ease-out-cubic":
        return 1 - (1 - value) ** 3;

       case "ease-out-quart":
        return 1 - (1 - value) ** 4;

       case "ease-out-quint":
        return 1 - (1 - value) ** 5;

       case "ease-out-expo":
        return value === 1 ? 1 : 1 - Math.pow(2, -10 * value);

       case "ease-out-sine":
        return Math.sin(value * Math.PI / 2);

       case "ease-out-back":
        {
          const c1 = 1.70158, c3 = c1 + 1;
          return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
        }

       case "ease-out-circ":
        return Math.sqrt(1 - Math.pow(value - 1, 2));

       default:
        return value;
      }
    }
    function calcPositionFromSize(data) {
      var _a, _b;
      return ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined && ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? {
        x: data.position.x * data.size.width / 100,
        y: data.position.y * data.size.height / 100
      } : undefined;
    }
    function calcPositionOrRandomFromSize(data) {
      var _a, _b, _c, _d;
      return {
        x: ((_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : Math.random() * 100) * data.size.width / 100,
        y: ((_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : Math.random() * 100) * data.size.height / 100
      };
    }
    function calcPositionOrRandomFromSizeRanged(data) {
      var _a, _b;
      const position = {
        x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? NumberUtils_getRangeValue(data.position.x) : undefined,
        y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? NumberUtils_getRangeValue(data.position.y) : undefined
      };
      return calcPositionOrRandomFromSize({
        size: data.size,
        position: position
      });
    }
    function calcExactPositionOrRandomFromSize(data) {
      var _a, _b, _c, _d;
      return {
        x: (_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : Math.random() * data.size.width,
        y: (_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : Math.random() * data.size.height
      };
    }
    function calcExactPositionOrRandomFromSizeRanged(data) {
      var _a, _b;
      const position = {
        x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? NumberUtils_getRangeValue(data.position.x) : undefined,
        y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? NumberUtils_getRangeValue(data.position.y) : undefined
      };
      return calcExactPositionOrRandomFromSize({
        size: data.size,
        position: position
      });
    }
    class ColorAnimation {
      constructor() {
        this.count = 0;
        this.enable = false;
        this.offset = 0;
        this.speed = 1;
        this.sync = true;
      }
      load(data) {
        if (data === undefined) {
          return;
        }
        if (data.count !== undefined) {
          this.count = setRangeValue(data.count);
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.offset !== undefined) {
          this.offset = setRangeValue(data.offset);
        }
        if (data.speed !== undefined) {
          this.speed = setRangeValue(data.speed);
        }
        if (data.sync !== undefined) {
          this.sync = data.sync;
        }
      }
    }
    class HslAnimation {
      constructor() {
        this.h = new ColorAnimation;
        this.s = new ColorAnimation;
        this.l = new ColorAnimation;
      }
      load(data) {
        if (!data) {
          return;
        }
        this.h.load(data.h);
        this.s.load(data.s);
        this.l.load(data.l);
      }
    }
    class OptionsColor {
      constructor() {
        this.value = "#fff";
      }
      static create(source, data) {
        const color = new OptionsColor;
        color.load(source);
        if (data !== undefined) {
          if (typeof data === "string" || data instanceof Array) {
            color.load({
              value: data
            });
          } else {
            color.load(data);
          }
        }
        return color;
      }
      load(data) {
        if ((data === null || data === void 0 ? void 0 : data.value) === undefined) {
          return;
        }
        this.value = data.value;
      }
    }
    class AnimatableColor extends OptionsColor {
      constructor() {
        super();
        this.animation = new HslAnimation;
      }
      static create(source, data) {
        const color = new AnimatableColor;
        color.load(source);
        if (data !== undefined) {
          if (typeof data === "string" || data instanceof Array) {
            color.load({
              value: data
            });
          } else {
            color.load(data);
          }
        }
        return color;
      }
      load(data) {
        super.load(data);
        if (!data) {
          return;
        }
        const colorAnimation = data.animation;
        if (colorAnimation !== undefined) {
          if (colorAnimation.enable !== undefined) {
            this.animation.h.load(colorAnimation);
          } else {
            this.animation.load(data.animation);
          }
        }
      }
    }
    class EmitterLife {
      constructor() {
        this.wait = false;
      }
      load(data) {
        if (data === undefined) {
          return;
        }
        if (data.count !== undefined) {
          this.count = data.count;
        }
        if (data.delay !== undefined) {
          this.delay = data.delay;
        }
        if (data.duration !== undefined) {
          this.duration = data.duration;
        }
        if (data.wait !== undefined) {
          this.wait = data.wait;
        }
      }
    }
    class EmitterRate {
      constructor() {
        this.quantity = 1;
        this.delay = .1;
      }
      load(data) {
        if (data === undefined) {
          return;
        }
        if (data.quantity !== undefined) {
          this.quantity = setRangeValue(data.quantity);
        }
        if (data.delay !== undefined) {
          this.delay = setRangeValue(data.delay);
        }
      }
    }
    class EmitterSize {
      constructor() {
        this.mode = "percent";
        this.height = 0;
        this.width = 0;
      }
      load(data) {
        if (data === undefined) {
          return;
        }
        if (data.mode !== undefined) {
          this.mode = data.mode;
        }
        if (data.height !== undefined) {
          this.height = data.height;
        }
        if (data.width !== undefined) {
          this.width = data.width;
        }
      }
    }
    function rectSideBounce(pSide, pOtherSide, rectSide, rectOtherSide, velocity, factor) {
      const res = {
        bounced: false
      };
      if (pOtherSide.min < rectOtherSide.min || pOtherSide.min > rectOtherSide.max || pOtherSide.max < rectOtherSide.min || pOtherSide.max > rectOtherSide.max) {
        return res;
      }
      if (pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) / 2 && velocity > 0 || pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) / 2 && velocity < 0) {
        res.velocity = velocity * -factor;
        res.bounced = true;
      }
      return res;
    }
    function checkSelector(element, selectors) {
      if (!(selectors instanceof Array)) {
        return element.matches(selectors);
      }
      for (const selector of selectors) {
        if (element.matches(selector)) {
          return true;
        }
      }
      return false;
    }
    function isSsr() {
      return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
    }
    function animate() {
      return isSsr() ? callback => setTimeout(callback) : callback => (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.setTimeout)(callback);
    }
    function cancelAnimation() {
      return isSsr() ? handle => clearTimeout(handle) : handle => (window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.clearTimeout)(handle);
    }
    function isInArray(value, array) {
      return value === array || array instanceof Array && array.indexOf(value) > -1;
    }
    async function loadFont(character) {
      var _a, _b;
      try {
        await document.fonts.load(`${(_a = character.weight) !== null && _a !== void 0 ? _a : "400"} 36px '${(_b = character.font) !== null && _b !== void 0 ? _b : "Verdana"}'`);
      } catch (_c) {}
    }
    function arrayRandomIndex(array) {
      return Math.floor(Math.random() * array.length);
    }
    function itemFromArray(array, index, useIndex = true) {
      const fixedIndex = index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array);
      return array[fixedIndex];
    }
    function isPointInside(point, size, radius, direction) {
      return areBoundsInside(calculateBounds(point, radius !== null && radius !== void 0 ? radius : 0), size, direction);
    }
    function areBoundsInside(bounds, size, direction) {
      let inside = true;
      if (!direction || direction === "bottom") {
        inside = bounds.top < size.height;
      }
      if (inside && (!direction || direction === "left")) {
        inside = bounds.right > 0;
      }
      if (inside && (!direction || direction === "right")) {
        inside = bounds.left < size.width;
      }
      if (inside && (!direction || direction === "top")) {
        inside = bounds.bottom > 0;
      }
      return inside;
    }
    function calculateBounds(point, radius) {
      return {
        bottom: point.y + radius,
        left: point.x - radius,
        right: point.x + radius,
        top: point.y - radius
      };
    }
    function deepExtend(destination, ...sources) {
      for (const source of sources) {
        if (source === undefined || source === null) {
          continue;
        }
        if (typeof source !== "object") {
          destination = source;
          continue;
        }
        const sourceIsArray = Array.isArray(source);
        if (sourceIsArray && (typeof destination !== "object" || !destination || !Array.isArray(destination))) {
          destination = [];
        } else if (!sourceIsArray && (typeof destination !== "object" || !destination || Array.isArray(destination))) {
          destination = {};
        }
        for (const key in source) {
          if (key === "__proto__") {
            continue;
          }
          const sourceDict = source, value = sourceDict[key], isObject = typeof value === "object", destDict = destination;
          destDict[key] = isObject && Array.isArray(value) ? value.map((v => deepExtend(destDict[key], v))) : deepExtend(destDict[key], value);
        }
      }
      return destination;
    }
    function isDivModeEnabled(mode, divs) {
      return divs instanceof Array ? !!divs.find((t => t.enable && isInArray(mode, t.mode))) : isInArray(mode, divs.mode);
    }
    function divModeExecute(mode, divs, callback) {
      if (divs instanceof Array) {
        for (const div of divs) {
          const divMode = div.mode, divEnabled = div.enable;
          if (divEnabled && isInArray(mode, divMode)) {
            singleDivModeExecute(div, callback);
          }
        }
      } else {
        const divMode = divs.mode, divEnabled = divs.enable;
        if (divEnabled && isInArray(mode, divMode)) {
          singleDivModeExecute(divs, callback);
        }
      }
    }
    function singleDivModeExecute(div, callback) {
      const selectors = div.selectors;
      if (selectors instanceof Array) {
        for (const selector of selectors) {
          callback(selector, div);
        }
      } else {
        callback(selectors, div);
      }
    }
    function divMode(divs, element) {
      if (!element || !divs) {
        return;
      }
      if (divs instanceof Array) {
        return divs.find((d => checkSelector(element, d.selectors)));
      } else if (checkSelector(element, divs.selectors)) {
        return divs;
      }
    }
    function circleBounceDataFromParticle(p) {
      return {
        position: p.getPosition(),
        radius: p.getRadius(),
        mass: p.getMass(),
        velocity: p.velocity,
        factor: Vector.create(getValue(p.options.bounce.horizontal), getValue(p.options.bounce.vertical))
      };
    }
    function circleBounce(p1, p2) {
      const {x: xVelocityDiff, y: yVelocityDiff} = p1.velocity.sub(p2.velocity), [pos1, pos2] = [ p1.position, p2.position ], {dx: xDist, dy: yDist} = getDistances(pos2, pos1);
      if (xVelocityDiff * xDist + yVelocityDiff * yDist < 0) {
        return;
      }
      const angle = -Math.atan2(yDist, xDist), m1 = p1.mass, m2 = p2.mass, u1 = p1.velocity.rotate(angle), u2 = p2.velocity.rotate(angle), v1 = collisionVelocity(u1, u2, m1, m2), v2 = collisionVelocity(u2, u1, m1, m2), vFinal1 = v1.rotate(-angle), vFinal2 = v2.rotate(-angle);
      p1.velocity.x = vFinal1.x * p1.factor.x;
      p1.velocity.y = vFinal1.y * p1.factor.y;
      p2.velocity.x = vFinal2.x * p2.factor.x;
      p2.velocity.y = vFinal2.y * p2.factor.y;
    }
    function rectBounce(particle, divBounds) {
      const pPos = particle.getPosition(), size = particle.getRadius(), bounds = calculateBounds(pPos, size);
      const resH = rectSideBounce({
        min: bounds.left,
        max: bounds.right
      }, {
        min: bounds.top,
        max: bounds.bottom
      }, {
        min: divBounds.left,
        max: divBounds.right
      }, {
        min: divBounds.top,
        max: divBounds.bottom
      }, particle.velocity.x, getValue(particle.options.bounce.horizontal));
      if (resH.bounced) {
        if (resH.velocity !== undefined) {
          particle.velocity.x = resH.velocity;
        }
        if (resH.position !== undefined) {
          particle.position.x = resH.position;
        }
      }
      const resV = rectSideBounce({
        min: bounds.top,
        max: bounds.bottom
      }, {
        min: bounds.left,
        max: bounds.right
      }, {
        min: divBounds.top,
        max: divBounds.bottom
      }, {
        min: divBounds.left,
        max: divBounds.right
      }, particle.velocity.y, getValue(particle.options.bounce.vertical));
      if (resV.bounced) {
        if (resV.velocity !== undefined) {
          particle.velocity.y = resV.velocity;
        }
        if (resV.position !== undefined) {
          particle.position.y = resV.position;
        }
      }
    }
    class Emitter {
      constructor() {
        this.autoPlay = true;
        this.fill = true;
        this.life = new EmitterLife;
        this.rate = new EmitterRate;
        this.shape = "square";
        this.startCount = 0;
      }
      load(data) {
        if (data === undefined) {
          return;
        }
        if (data.autoPlay !== undefined) {
          this.autoPlay = data.autoPlay;
        }
        if (data.size !== undefined) {
          if (this.size === undefined) {
            this.size = new EmitterSize;
          }
          this.size.load(data.size);
        }
        if (data.direction !== undefined) {
          this.direction = data.direction;
        }
        this.domId = data.domId;
        if (data.fill !== undefined) {
          this.fill = data.fill;
        }
        this.life.load(data.life);
        this.name = data.name;
        if (data.particles !== undefined) {
          this.particles = deepExtend({}, data.particles);
        }
        this.rate.load(data.rate);
        if (data.shape !== undefined) {
          this.shape = data.shape;
        }
        if (data.position !== undefined) {
          this.position = {};
          if (data.position.x !== undefined) {
            this.position.x = setRangeValue(data.position.x);
          }
          if (data.position.y !== undefined) {
            this.position.y = setRangeValue(data.position.y);
          }
        }
        if (data.spawnColor !== undefined) {
          if (this.spawnColor === undefined) {
            this.spawnColor = new AnimatableColor;
          }
          this.spawnColor.load(data.spawnColor);
        }
        if (data.startCount !== undefined) {
          this.startCount = data.startCount;
        }
      }
    }
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
        res = color.value === Constants_Constants.randomColorValue ? getRandomRgbColor() : stringToRgb(color.value);
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
    var _EmitterInstance_firstSpawn, _EmitterInstance_startParticlesAdded, _EmitterInstance_engine;
    class EmitterInstance {
      constructor(engine, emitters, container, options, position) {
        var _a, _b, _c, _d, _e, _f, _g;
        var _h;
        this.emitters = emitters;
        this.container = container;
        _EmitterInstance_firstSpawn.set(this, void 0);
        _EmitterInstance_startParticlesAdded.set(this, void 0);
        _EmitterInstance_engine.set(this, void 0);
        __classPrivateFieldSet(this, _EmitterInstance_engine, engine, "f");
        this.currentDuration = 0;
        this.currentEmitDelay = 0;
        this.currentSpawnDelay = 0;
        this.initialPosition = position;
        if (options instanceof Emitter) {
          this.options = options;
        } else {
          this.options = new Emitter;
          this.options.load(options);
        }
        this.spawnDelay = ((_a = this.options.life.delay) !== null && _a !== void 0 ? _a : 0) * 1e3 / this.container.retina.reduceFactor;
        this.position = (_b = this.initialPosition) !== null && _b !== void 0 ? _b : this.calcPosition();
        this.name = this.options.name;
        this.shape = (_c = __classPrivateFieldGet(this, _EmitterInstance_engine, "f").emitterShapeManager) === null || _c === void 0 ? void 0 : _c.getShape(this.options.shape);
        this.fill = this.options.fill;
        __classPrivateFieldSet(this, _EmitterInstance_firstSpawn, !this.options.life.wait, "f");
        __classPrivateFieldSet(this, _EmitterInstance_startParticlesAdded, false, "f");
        let particlesOptions = deepExtend({}, this.options.particles);
        particlesOptions !== null && particlesOptions !== void 0 ? particlesOptions : particlesOptions = {};
        (_d = particlesOptions.move) !== null && _d !== void 0 ? _d : particlesOptions.move = {};
        (_e = (_h = particlesOptions.move).direction) !== null && _e !== void 0 ? _e : _h.direction = this.options.direction;
        if (this.options.spawnColor) {
          this.spawnColor = colorToHsl(this.options.spawnColor);
        }
        this.paused = !this.options.autoPlay;
        this.particlesOptions = particlesOptions;
        this.size = (_f = this.options.size) !== null && _f !== void 0 ? _f : (() => {
          const size = new EmitterSize;
          size.load({
            height: 0,
            mode: "percent",
            width: 0
          });
          return size;
        })();
        this.lifeCount = (_g = this.options.life.count) !== null && _g !== void 0 ? _g : -1;
        this.immortal = this.lifeCount <= 0;
        this.play();
      }
      externalPlay() {
        this.paused = false;
        this.play();
      }
      externalPause() {
        this.paused = true;
        this.pause();
      }
      play() {
        var _a;
        if (this.paused) {
          return;
        }
        if (!(this.container.retina.reduceFactor && (this.lifeCount > 0 || this.immortal || !this.options.life.count) && (__classPrivateFieldGet(this, _EmitterInstance_firstSpawn, "f") || this.currentSpawnDelay >= ((_a = this.spawnDelay) !== null && _a !== void 0 ? _a : 0)))) {
          return;
        }
        if (this.emitDelay === undefined) {
          const delay = NumberUtils_getRangeValue(this.options.rate.delay);
          this.emitDelay = 1e3 * delay / this.container.retina.reduceFactor;
        }
        if (this.lifeCount > 0 || this.immortal) {
          this.prepareToDie();
        }
      }
      pause() {
        if (this.paused) {
          return;
        }
        delete this.emitDelay;
      }
      resize() {
        const initialPosition = this.initialPosition;
        this.position = initialPosition && isPointInside(initialPosition, this.container.canvas.size) ? initialPosition : this.calcPosition();
      }
      update(delta) {
        var _a, _b, _c;
        if (this.paused) {
          return;
        }
        if (__classPrivateFieldGet(this, _EmitterInstance_firstSpawn, "f")) {
          __classPrivateFieldSet(this, _EmitterInstance_firstSpawn, false, "f");
          this.currentSpawnDelay = (_a = this.spawnDelay) !== null && _a !== void 0 ? _a : 0;
          this.currentEmitDelay = (_b = this.emitDelay) !== null && _b !== void 0 ? _b : 0;
        }
        if (!__classPrivateFieldGet(this, _EmitterInstance_startParticlesAdded, "f")) {
          __classPrivateFieldSet(this, _EmitterInstance_startParticlesAdded, true, "f");
          this.emitParticles(this.options.startCount);
        }
        if (this.duration !== undefined) {
          this.currentDuration += delta.value;
          if (this.currentDuration >= this.duration) {
            this.pause();
            if (this.spawnDelay !== undefined) {
              delete this.spawnDelay;
            }
            if (!this.immortal) {
              this.lifeCount--;
            }
            if (this.lifeCount > 0 || this.immortal) {
              this.position = this.calcPosition();
              this.spawnDelay = ((_c = this.options.life.delay) !== null && _c !== void 0 ? _c : 0) * 1e3 / this.container.retina.reduceFactor;
            } else {
              this.destroy();
            }
            this.currentDuration -= this.duration;
            delete this.duration;
          }
        }
        if (this.spawnDelay !== undefined) {
          this.currentSpawnDelay += delta.value;
          if (this.currentSpawnDelay >= this.spawnDelay) {
            this.play();
            this.currentSpawnDelay -= this.currentSpawnDelay;
            delete this.spawnDelay;
          }
        }
        if (this.emitDelay !== undefined) {
          this.currentEmitDelay += delta.value;
          if (this.currentEmitDelay >= this.emitDelay) {
            this.emit();
            this.currentEmitDelay -= this.emitDelay;
          }
        }
      }
      getPosition() {
        if (this.options.domId) {
          const container = this.container, element = document.getElementById(this.options.domId);
          if (element) {
            const elRect = element.getBoundingClientRect();
            return {
              x: (elRect.x + elRect.width / 2) * container.retina.pixelRatio,
              y: (elRect.y + elRect.height / 2) * container.retina.pixelRatio
            };
          }
        }
        return this.position;
      }
      getSize() {
        const container = this.container;
        if (this.options.domId) {
          const element = document.getElementById(this.options.domId);
          if (element) {
            const elRect = element.getBoundingClientRect();
            return {
              width: elRect.width * container.retina.pixelRatio,
              height: elRect.height * container.retina.pixelRatio
            };
          }
        }
        return {
          width: this.size.mode === "percent" ? container.canvas.size.width * this.size.width / 100 : this.size.width,
          height: this.size.mode === "percent" ? container.canvas.size.height * this.size.height / 100 : this.size.height
        };
      }
      prepareToDie() {
        var _a;
        if (this.paused) {
          return;
        }
        const duration = (_a = this.options.life) === null || _a === void 0 ? void 0 : _a.duration;
        if (this.container.retina.reduceFactor && (this.lifeCount > 0 || this.immortal) && duration !== undefined && duration > 0) {
          this.duration = duration * 1e3;
        }
      }
      destroy() {
        this.emitters.removeEmitter(this);
      }
      calcPosition() {
        return calcPositionOrRandomFromSizeRanged({
          size: this.container.canvas.size,
          position: this.options.position
        });
      }
      emit() {
        if (this.paused) {
          return;
        }
        const quantity = NumberUtils_getRangeValue(this.options.rate.quantity);
        this.emitParticles(quantity);
      }
      emitParticles(quantity) {
        var _a, _b, _c;
        const position = this.getPosition(), size = this.getSize();
        for (let i = 0; i < quantity; i++) {
          const particlesOptions = deepExtend({}, this.particlesOptions);
          if (this.spawnColor) {
            const hslAnimation = (_a = this.options.spawnColor) === null || _a === void 0 ? void 0 : _a.animation;
            if (hslAnimation) {
              this.spawnColor.h = this.setColorAnimation(hslAnimation.h, this.spawnColor.h, 360);
              this.spawnColor.s = this.setColorAnimation(hslAnimation.s, this.spawnColor.s, 100);
              this.spawnColor.l = this.setColorAnimation(hslAnimation.l, this.spawnColor.l, 100);
            }
            if (!particlesOptions.color) {
              particlesOptions.color = {
                value: this.spawnColor
              };
            } else {
              particlesOptions.color.value = this.spawnColor;
            }
          }
          if (!position) {
            return;
          }
          const pPosition = (_c = (_b = this.shape) === null || _b === void 0 ? void 0 : _b.randomPosition(position, size, this.fill)) !== null && _c !== void 0 ? _c : position;
          this.container.particles.addParticle(pPosition, particlesOptions);
        }
      }
      setColorAnimation(animation, initValue, maxValue) {
        var _a;
        const container = this.container;
        if (!animation.enable) {
          return initValue;
        }
        const colorOffset = randomInRange(animation.offset), delay = NumberUtils_getRangeValue(this.options.rate.delay), emitFactor = 1e3 * delay / container.retina.reduceFactor, colorSpeed = NumberUtils_getRangeValue((_a = animation.speed) !== null && _a !== void 0 ? _a : 0);
        return (initValue + colorSpeed * container.fpsLimit / emitFactor + colorOffset * 3.6) % maxValue;
      }
    }
    _EmitterInstance_firstSpawn = new WeakMap, _EmitterInstance_startParticlesAdded = new WeakMap, 
    _EmitterInstance_engine = new WeakMap;
    var Emitters_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), 
      value;
    };
    var Emitters_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _Emitters_engine;
    class Emitters {
      constructor(engine, container) {
        this.container = container;
        _Emitters_engine.set(this, void 0);
        Emitters_classPrivateFieldSet(this, _Emitters_engine, engine, "f");
        this.array = [];
        this.emitters = [];
        this.interactivityEmitters = [];
        const overridableContainer = container;
        overridableContainer.getEmitter = idxOrName => idxOrName === undefined || typeof idxOrName === "number" ? this.array[idxOrName || 0] : this.array.find((t => t.name === idxOrName));
        overridableContainer.addEmitter = (options, position) => this.addEmitter(options, position);
        overridableContainer.removeEmitter = idxOrName => {
          const emitter = overridableContainer.getEmitter(idxOrName);
          if (emitter) {
            this.removeEmitter(emitter);
          }
        };
        overridableContainer.playEmitter = idxOrName => {
          const emitter = overridableContainer.getEmitter(idxOrName);
          if (emitter) {
            emitter.externalPlay();
          }
        };
        overridableContainer.pauseEmitter = idxOrName => {
          const emitter = overridableContainer.getEmitter(idxOrName);
          if (emitter) {
            emitter.externalPause();
          }
        };
      }
      init(options) {
        var _a, _b;
        if (!options) {
          return;
        }
        if (options.emitters) {
          if (options.emitters instanceof Array) {
            this.emitters = options.emitters.map((s => {
              const tmp = new Emitter;
              tmp.load(s);
              return tmp;
            }));
          } else {
            if (this.emitters instanceof Array) {
              this.emitters = new Emitter;
            }
            this.emitters.load(options.emitters);
          }
        }
        const interactivityEmitters = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.emitters;
        if (interactivityEmitters) {
          if (interactivityEmitters instanceof Array) {
            this.interactivityEmitters = interactivityEmitters.map((s => {
              const tmp = new Emitter;
              tmp.load(s);
              return tmp;
            }));
          } else {
            if (this.interactivityEmitters instanceof Array) {
              this.interactivityEmitters = new Emitter;
            }
            this.interactivityEmitters.load(interactivityEmitters);
          }
        }
        if (this.emitters instanceof Array) {
          for (const emitterOptions of this.emitters) {
            this.addEmitter(emitterOptions);
          }
        } else {
          this.addEmitter(this.emitters);
        }
      }
      play() {
        for (const emitter of this.array) {
          emitter.play();
        }
      }
      pause() {
        for (const emitter of this.array) {
          emitter.pause();
        }
      }
      stop() {
        this.array = [];
      }
      update(delta) {
        for (const emitter of this.array) {
          emitter.update(delta);
        }
      }
      handleClickMode(mode) {
        const emitterOptions = this.emitters, modeEmitters = this.interactivityEmitters;
        if (mode === "emitter") {
          let emitterModeOptions;
          if (modeEmitters instanceof Array) {
            if (modeEmitters.length > 0) {
              emitterModeOptions = itemFromArray(modeEmitters);
            }
          } else {
            emitterModeOptions = modeEmitters;
          }
          const emittersOptions = emitterModeOptions !== null && emitterModeOptions !== void 0 ? emitterModeOptions : emitterOptions instanceof Array ? itemFromArray(emitterOptions) : emitterOptions, ePosition = this.container.interactivity.mouse.clickPosition;
          this.addEmitter(deepExtend({}, emittersOptions), ePosition);
        }
      }
      resize() {
        for (const emitter of this.array) {
          emitter.resize();
        }
      }
      addEmitter(options, position) {
        const emitterOptions = new Emitter;
        emitterOptions.load(options);
        const emitter = new EmitterInstance(Emitters_classPrivateFieldGet(this, _Emitters_engine, "f"), this, this.container, emitterOptions, position);
        this.array.push(emitter);
        return emitter;
      }
      removeEmitter(emitter) {
        const index = this.array.indexOf(emitter);
        if (index >= 0) {
          this.array.splice(index, 1);
        }
      }
    }
    _Emitters_engine = new WeakMap;
    var ShapeManager_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), 
      value;
    };
    var _ShapeManager_engine;
    const shapes = new Map;
    class ShapeManager {
      constructor(engine) {
        _ShapeManager_engine.set(this, void 0);
        ShapeManager_classPrivateFieldSet(this, _ShapeManager_engine, engine, "f");
      }
      addShape(name, drawer) {
        if (!this.getShape(name)) {
          shapes.set(name, drawer);
        }
      }
      getShape(name) {
        return shapes.get(name);
      }
      getSupportedShapes() {
        return shapes.keys();
      }
    }
    _ShapeManager_engine = new WeakMap;
    function randomSquareCoordinate(position, offset) {
      return position + offset * (Math.random() - .5);
    }
    class SquareShape {
      randomPosition(position, size, fill) {
        if (fill) {
          return {
            x: randomSquareCoordinate(position.x, size.width),
            y: randomSquareCoordinate(position.y, size.height)
          };
        } else {
          const halfW = size.width / 2, halfH = size.height / 2, side = Math.floor(Math.random() * 4), v = (Math.random() - .5) * 2;
          switch (side) {
           case 0:
            return {
              x: position.x + v * halfW,
              y: position.y - halfH
            };

           case 1:
            return {
              x: position.x - halfW,
              y: position.y + v * halfH
            };

           case 2:
            return {
              x: position.x + v * halfW,
              y: position.y + halfH
            };

           case 3:
           default:
            return {
              x: position.x + halfW,
              y: position.y + v * halfH
            };
          }
        }
      }
    }
    var Plugins_Emitters_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), 
      value;
    };
    var Plugins_Emitters_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _EmittersPlugin_engine;
    class EmittersPlugin {
      constructor(engine) {
        _EmittersPlugin_engine.set(this, void 0);
        Plugins_Emitters_classPrivateFieldSet(this, _EmittersPlugin_engine, engine, "f");
        this.id = "emitters";
      }
      getPlugin(container) {
        return new Emitters(Plugins_Emitters_classPrivateFieldGet(this, _EmittersPlugin_engine, "f"), container);
      }
      needsPlugin(options) {
        var _a, _b, _c;
        if (options === undefined) {
          return false;
        }
        const emitters = options.emitters;
        return emitters instanceof Array && !!emitters.length || emitters !== undefined || !!((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) && isInArray("emitter", options.interactivity.events.onClick.mode);
      }
      loadOptions(options, source) {
        var _a, _b;
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
          return;
        }
        const optionsCast = options;
        if (source === null || source === void 0 ? void 0 : source.emitters) {
          if ((source === null || source === void 0 ? void 0 : source.emitters) instanceof Array) {
            optionsCast.emitters = source === null || source === void 0 ? void 0 : source.emitters.map((s => {
              const tmp = new Emitter;
              tmp.load(s);
              return tmp;
            }));
          } else {
            let emitterOptions = optionsCast.emitters;
            if ((emitterOptions === null || emitterOptions === void 0 ? void 0 : emitterOptions.load) === undefined) {
              optionsCast.emitters = emitterOptions = new Emitter;
            }
            emitterOptions.load(source === null || source === void 0 ? void 0 : source.emitters);
          }
        }
        const interactivityEmitters = (_b = (_a = source === null || source === void 0 ? void 0 : source.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.emitters;
        if (interactivityEmitters) {
          if (interactivityEmitters instanceof Array) {
            optionsCast.interactivity.modes.emitters = interactivityEmitters.map((s => {
              const tmp = new Emitter;
              tmp.load(s);
              return tmp;
            }));
          } else {
            let emitterOptions = optionsCast.interactivity.modes.emitters;
            if ((emitterOptions === null || emitterOptions === void 0 ? void 0 : emitterOptions.load) === undefined) {
              optionsCast.interactivity.modes.emitters = emitterOptions = new Emitter;
            }
            emitterOptions.load(interactivityEmitters);
          }
        }
      }
    }
    _EmittersPlugin_engine = new WeakMap;
    async function loadEmittersPlugin(engine) {
      if (!engine.emitterShapeManager) {
        engine.emitterShapeManager = new ShapeManager(engine);
      }
      if (!engine.addEmitterShape) {
        engine.addEmitterShape = (name, shape) => {
          var _a;
          (_a = engine.emitterShapeManager) === null || _a === void 0 ? void 0 : _a.addShape(name, shape);
        };
      }
      const plugin = new EmittersPlugin(engine);
      await engine.addPlugin(plugin);
      engine.addEmitterShape("circle", new CircleShape);
      engine.addEmitterShape("square", new SquareShape);
    }
    return __webpack_exports__;
  }();
}));