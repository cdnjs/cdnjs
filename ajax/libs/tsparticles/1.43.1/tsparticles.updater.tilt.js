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
      loadTiltUpdater: function() {
        return loadTiltUpdater;
      }
    });
    function clamp(num, min, max) {
      return Math.min(Math.max(num, min), max);
    }
    function mix(comp1, comp2, weight1, weight2) {
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
    function getRangeValue(value) {
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
    function getValue(options) {
      const random = options.random, {enable: enable, minimumValue: minimumValue} = typeof random === "boolean" ? {
        enable: random,
        minimumValue: 0
      } : random;
      return enable ? getRangeValue(setRangeValue(options.value, minimumValue)) : getRangeValue(options.value);
    }
    function getDistances(pointA, pointB) {
      const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y;
      return {
        dx: dx,
        dy: dy,
        distance: Math.sqrt(dx * dx + dy * dy)
      };
    }
    function getDistance(pointA, pointB) {
      return getDistances(pointA, pointB).distance;
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
    function collisionVelocity(v1, v2, m1, m2) {
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
        x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? getRangeValue(data.position.x) : undefined,
        y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? getRangeValue(data.position.y) : undefined
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
        x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? getRangeValue(data.position.x) : undefined,
        y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? getRangeValue(data.position.y) : undefined
      };
      return calcExactPositionOrRandomFromSize({
        size: data.size,
        position: position
      });
    }
    function updateTilt(particle, delta) {
      var _a;
      if (!particle.tilt) {
        return;
      }
      const tilt = particle.options.tilt;
      const tiltAnimation = tilt.animation;
      const speed = ((_a = particle.tilt.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
      const max = 2 * Math.PI;
      if (!tiltAnimation.enable) {
        return;
      }
      switch (particle.tilt.status) {
       case 0:
        particle.tilt.value += speed;
        if (particle.tilt.value > max) {
          particle.tilt.value -= max;
        }
        break;

       case 1:
       default:
        particle.tilt.value -= speed;
        if (particle.tilt.value < 0) {
          particle.tilt.value += max;
        }
        break;
      }
    }
    class TiltUpdater {
      constructor(container) {
        this.container = container;
      }
      init(particle) {
        const tiltOptions = particle.options.tilt;
        particle.tilt = {
          enable: tiltOptions.enable,
          value: getRangeValue(tiltOptions.value) * Math.PI / 180,
          sinDirection: Math.random() >= .5 ? 1 : -1,
          cosDirection: Math.random() >= .5 ? 1 : -1
        };
        let tiltDirection = tiltOptions.direction;
        if (tiltDirection === "random") {
          const index = Math.floor(Math.random() * 2);
          tiltDirection = index > 0 ? "counter-clockwise" : "clockwise";
        }
        switch (tiltDirection) {
         case "counter-clockwise":
         case "counterClockwise":
          particle.tilt.status = 1;
          break;

         case "clockwise":
          particle.tilt.status = 0;
          break;
        }
        const tiltAnimation = particle.options.tilt.animation;
        if (tiltAnimation.enable) {
          particle.tilt.velocity = getRangeValue(tiltAnimation.speed) / 360 * this.container.retina.reduceFactor;
          if (!tiltAnimation.sync) {
            particle.tilt.velocity *= Math.random();
          }
        }
      }
      isEnabled(particle) {
        const tilt = particle.options.tilt;
        const tiltAnimation = tilt.animation;
        return !particle.destroyed && !particle.spawning && tiltAnimation.enable;
      }
      update(particle, delta) {
        if (!this.isEnabled(particle)) {
          return;
        }
        updateTilt(particle, delta);
      }
    }
    async function loadTiltUpdater(engine) {
      await engine.addParticleUpdater("tilt", (container => new TiltUpdater(container)));
    }
    return __webpack_exports__;
  }();
}));