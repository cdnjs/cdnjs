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
      loadExternalTrailInteraction: function() {
        return loadExternalTrailInteraction;
      }
    });
    class ExternalInteractorBase {
      constructor(container) {
        this.container = container;
        this.type = 0;
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
    class TrailMaker extends ExternalInteractorBase {
      constructor(container) {
        super(container);
        this.delay = 0;
      }
      async interact(delta) {
        var _a, _b, _c, _d;
        if (!this.container.retina.reduceFactor) {
          return;
        }
        const container = this.container, options = container.actualOptions, trailOptions = options.interactivity.modes.trail, optDelay = trailOptions.delay * 1e3 / this.container.retina.reduceFactor;
        if (this.delay < optDelay) {
          this.delay += delta.value;
        }
        if (this.delay < optDelay) {
          return;
        }
        let canEmit = true;
        if (trailOptions.pauseOnStop) {
          if (container.interactivity.mouse.position === this.lastPosition || ((_a = container.interactivity.mouse.position) === null || _a === void 0 ? void 0 : _a.x) === ((_b = this.lastPosition) === null || _b === void 0 ? void 0 : _b.x) && ((_c = container.interactivity.mouse.position) === null || _c === void 0 ? void 0 : _c.y) === ((_d = this.lastPosition) === null || _d === void 0 ? void 0 : _d.y)) {
            canEmit = false;
          }
        }
        if (container.interactivity.mouse.position) {
          this.lastPosition = {
            x: container.interactivity.mouse.position.x,
            y: container.interactivity.mouse.position.y
          };
        } else {
          delete this.lastPosition;
        }
        if (canEmit) {
          container.particles.push(trailOptions.quantity, container.interactivity.mouse, trailOptions.particles);
        }
        this.delay -= optDelay;
      }
      isEnabled() {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = options.interactivity.events;
        return mouse.clicking && mouse.inside && !!mouse.position && isInArray("trail", events.onClick.mode) || mouse.inside && !!mouse.position && isInArray("trail", events.onHover.mode);
      }
      reset() {}
    }
    async function loadExternalTrailInteraction(engine) {
      await engine.addInteractor("externalTrail", (container => new TrailMaker(container)));
    }
    return __webpack_exports__;
  }();
}));