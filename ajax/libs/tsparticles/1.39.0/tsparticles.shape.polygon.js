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
      loadGenericPolygonShape: function() {
        return loadGenericPolygonShape;
      },
      loadPolygonShape: function() {
        return loadPolygonShape;
      },
      loadTriangleShape: function() {
        return loadTriangleShape;
      }
    });
    class PolygonDrawerBase {
      getSidesCount(particle) {
        var _a, _b;
        const polygon = particle.shapeData;
        return (_b = (_a = polygon === null || polygon === void 0 ? void 0 : polygon.sides) !== null && _a !== void 0 ? _a : polygon === null || polygon === void 0 ? void 0 : polygon.nb_sides) !== null && _b !== void 0 ? _b : 5;
      }
      draw(context, particle, radius) {
        const start = this.getCenter(particle, radius);
        const side = this.getSidesData(particle, radius);
        const sideCount = side.count.numerator * side.count.denominator;
        const decimalSides = side.count.numerator / side.count.denominator;
        const interiorAngleDegrees = 180 * (decimalSides - 2) / decimalSides;
        const interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180;
        if (!context) {
          return;
        }
        context.beginPath();
        context.translate(start.x, start.y);
        context.moveTo(0, 0);
        for (let i = 0; i < sideCount; i++) {
          context.lineTo(side.length, 0);
          context.translate(side.length, 0);
          context.rotate(interiorAngle);
        }
      }
    }
    class PolygonDrawer extends PolygonDrawerBase {
      getSidesData(particle, radius) {
        var _a, _b;
        const polygon = particle.shapeData;
        const sides = (_b = (_a = polygon === null || polygon === void 0 ? void 0 : polygon.sides) !== null && _a !== void 0 ? _a : polygon === null || polygon === void 0 ? void 0 : polygon.nb_sides) !== null && _b !== void 0 ? _b : 5;
        return {
          count: {
            denominator: 1,
            numerator: sides
          },
          length: radius * 2.66 / (sides / 3)
        };
      }
      getCenter(particle, radius) {
        const sides = this.getSidesCount(particle);
        return {
          x: -radius / (sides / 3.5),
          y: -radius / (2.66 / 3.5)
        };
      }
    }
    class TriangleDrawer extends PolygonDrawerBase {
      getSidesCount() {
        return 3;
      }
      getSidesData(particle, radius) {
        return {
          count: {
            denominator: 2,
            numerator: 3
          },
          length: radius * 2
        };
      }
      getCenter(particle, radius) {
        return {
          x: -radius,
          y: radius / 1.66
        };
      }
    }
    async function loadGenericPolygonShape(tsParticles) {
      await tsParticles.addShape("polygon", new PolygonDrawer);
    }
    async function loadTriangleShape(tsParticles) {
      await tsParticles.addShape("triangle", new TriangleDrawer);
    }
    async function loadPolygonShape(tsParticles) {
      await loadGenericPolygonShape(tsParticles);
      await loadTriangleShape(tsParticles);
    }
    return __webpack_exports__;
  }();
}));