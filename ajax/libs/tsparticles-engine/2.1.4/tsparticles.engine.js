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
      AnimatableColor: function() {
        return AnimatableColor;
      },
      AnimatableGradient: function() {
        return AnimatableGradient;
      },
      AnimatableGradientColor: function() {
        return AnimatableGradientColor;
      },
      AnimationOptions: function() {
        return AnimationOptions;
      },
      Attract: function() {
        return Attract;
      },
      Background: function() {
        return Background;
      },
      BackgroundMask: function() {
        return BackgroundMask;
      },
      BackgroundMaskCover: function() {
        return BackgroundMaskCover;
      },
      Bounce: function() {
        return Bounce;
      },
      Bubble: function() {
        return Bubble;
      },
      BubbleBase: function() {
        return BubbleBase;
      },
      BubbleDiv: function() {
        return BubbleDiv;
      },
      Canvas: function() {
        return Canvas;
      },
      Circle: function() {
        return Circle;
      },
      CircleWarp: function() {
        return CircleWarp;
      },
      ClickEvent: function() {
        return ClickEvent;
      },
      Collisions: function() {
        return Collisions;
      },
      CollisionsOverlap: function() {
        return CollisionsOverlap;
      },
      ColorAnimation: function() {
        return ColorAnimation;
      },
      Connect: function() {
        return Connect;
      },
      ConnectLinks: function() {
        return ConnectLinks;
      },
      Container: function() {
        return Container;
      },
      Destroy: function() {
        return Destroy;
      },
      DivEvent: function() {
        return DivEvent;
      },
      EventListeners: function() {
        return EventListeners;
      },
      Events: function() {
        return Events;
      },
      ExternalInteractorBase: function() {
        return ExternalInteractorBase;
      },
      FrameManager: function() {
        return FrameManager;
      },
      FullScreen: function() {
        return FullScreen;
      },
      Grab: function() {
        return Grab;
      },
      GrabLinks: function() {
        return GrabLinks;
      },
      GradientAngle: function() {
        return GradientAngle;
      },
      GradientAngleAnimation: function() {
        return GradientAngleAnimation;
      },
      GradientColorOpacity: function() {
        return GradientColorOpacity;
      },
      GradientColorOpacityAnimation: function() {
        return GradientColorOpacityAnimation;
      },
      HoverEvent: function() {
        return HoverEvent;
      },
      HslAnimation: function() {
        return HslAnimation;
      },
      InteractionManager: function() {
        return InteractionManager;
      },
      Interactivity: function() {
        return Interactivity;
      },
      Light: function() {
        return Light;
      },
      LightArea: function() {
        return LightArea;
      },
      LightGradient: function() {
        return LightGradient;
      },
      LightShadow: function() {
        return LightShadow;
      },
      Links: function() {
        return Links;
      },
      LinksShadow: function() {
        return LinksShadow;
      },
      LinksTriangle: function() {
        return LinksTriangle;
      },
      Loader: function() {
        return Loader;
      },
      ManualParticle: function() {
        return ManualParticle;
      },
      Modes: function() {
        return Modes;
      },
      Motion: function() {
        return Motion;
      },
      MotionReduce: function() {
        return MotionReduce;
      },
      Move: function() {
        return Move;
      },
      MoveAngle: function() {
        return MoveAngle;
      },
      MoveAttract: function() {
        return MoveAttract;
      },
      MoveGravity: function() {
        return MoveGravity;
      },
      MovePath: function() {
        return MovePath;
      },
      MovePathDelay: function() {
        return MovePathDelay;
      },
      MoveTrail: function() {
        return MoveTrail;
      },
      Opacity: function() {
        return Opacity;
      },
      OpacityAnimation: function() {
        return OpacityAnimation;
      },
      Options: function() {
        return Options;
      },
      OptionsColor: function() {
        return OptionsColor;
      },
      OutModes: function() {
        return OutModes;
      },
      Parallax: function() {
        return Parallax;
      },
      Particle: function() {
        return Particle;
      },
      Particles: function() {
        return Particles;
      },
      ParticlesBounce: function() {
        return ParticlesBounce;
      },
      ParticlesBounceFactor: function() {
        return ParticlesBounceFactor;
      },
      ParticlesDensity: function() {
        return ParticlesDensity;
      },
      ParticlesInteractorBase: function() {
        return ParticlesInteractorBase;
      },
      ParticlesNumber: function() {
        return ParticlesNumber;
      },
      ParticlesOptions: function() {
        return ParticlesOptions;
      },
      ParticlesRepulse: function() {
        return ParticlesRepulse;
      },
      Plugins: function() {
        return Plugins;
      },
      Point: function() {
        return Point;
      },
      Push: function() {
        return Push;
      },
      QuadTree: function() {
        return QuadTree;
      },
      Range: function() {
        return Range;
      },
      Rectangle: function() {
        return Rectangle;
      },
      Remove: function() {
        return Remove;
      },
      Repulse: function() {
        return Repulse;
      },
      RepulseBase: function() {
        return RepulseBase;
      },
      RepulseDiv: function() {
        return RepulseDiv;
      },
      Responsive: function() {
        return Responsive;
      },
      Retina: function() {
        return Retina;
      },
      Rotate: function() {
        return Rotate;
      },
      RotateAnimation: function() {
        return RotateAnimation;
      },
      Shadow: function() {
        return Shadow;
      },
      Shape: function() {
        return Shape;
      },
      Size: function() {
        return Size;
      },
      SizeAnimation: function() {
        return SizeAnimation;
      },
      Slow: function() {
        return Slow;
      },
      Spin: function() {
        return Spin;
      },
      Split: function() {
        return Split;
      },
      SplitFactor: function() {
        return SplitFactor;
      },
      SplitRate: function() {
        return SplitRate;
      },
      Stroke: function() {
        return Stroke;
      },
      Theme: function() {
        return Theme;
      },
      ThemeDefault: function() {
        return ThemeDefault;
      },
      Trail: function() {
        return Trail;
      },
      ValueWithRandom: function() {
        return ValueWithRandom;
      },
      Vector: function() {
        return Vector;
      },
      Vector3d: function() {
        return Vector3d;
      },
      ZIndex: function() {
        return ZIndex;
      },
      alterHsl: function() {
        return alterHsl;
      },
      animate: function() {
        return animate;
      },
      areBoundsInside: function() {
        return areBoundsInside;
      },
      arrayRandomIndex: function() {
        return arrayRandomIndex;
      },
      calcEasing: function() {
        return calcEasing;
      },
      calcExactPositionOrRandomFromSize: function() {
        return calcExactPositionOrRandomFromSize;
      },
      calcExactPositionOrRandomFromSizeRanged: function() {
        return calcExactPositionOrRandomFromSizeRanged;
      },
      calcPositionFromSize: function() {
        return calcPositionFromSize;
      },
      calcPositionOrRandomFromSize: function() {
        return calcPositionOrRandomFromSize;
      },
      calcPositionOrRandomFromSizeRanged: function() {
        return calcPositionOrRandomFromSizeRanged;
      },
      calculateBounds: function() {
        return calculateBounds;
      },
      cancelAnimation: function() {
        return cancelAnimation;
      },
      circleBounce: function() {
        return circleBounce;
      },
      circleBounceDataFromParticle: function() {
        return circleBounceDataFromParticle;
      },
      clamp: function() {
        return clamp;
      },
      clear: function() {
        return clear;
      },
      collisionVelocity: function() {
        return collisionVelocity;
      },
      colorMix: function() {
        return colorMix;
      },
      colorToHsl: function() {
        return colorToHsl;
      },
      colorToRgb: function() {
        return colorToRgb;
      },
      deepExtend: function() {
        return deepExtend;
      },
      divMode: function() {
        return divMode;
      },
      divModeExecute: function() {
        return divModeExecute;
      },
      drawEllipse: function() {
        return drawEllipse;
      },
      drawLine: function() {
        return drawLine;
      },
      drawParticle: function() {
        return drawParticle;
      },
      drawParticlePlugin: function() {
        return drawParticlePlugin;
      },
      drawPlugin: function() {
        return drawPlugin;
      },
      drawShape: function() {
        return drawShape;
      },
      drawShapeAfterEffect: function() {
        return drawShapeAfterEffect;
      },
      drawTriangle: function() {
        return drawTriangle;
      },
      generatedAttribute: function() {
        return generatedAttribute;
      },
      getDistance: function() {
        return getDistance;
      },
      getDistances: function() {
        return getDistances;
      },
      getHslAnimationFromHsl: function() {
        return getHslAnimationFromHsl;
      },
      getHslFromAnimation: function() {
        return getHslFromAnimation;
      },
      getLinkColor: function() {
        return getLinkColor;
      },
      getLinkRandomColor: function() {
        return getLinkRandomColor;
      },
      getParticleBaseVelocity: function() {
        return getParticleBaseVelocity;
      },
      getParticleDirectionAngle: function() {
        return getParticleDirectionAngle;
      },
      getRandomRgbColor: function() {
        return getRandomRgbColor;
      },
      getRangeMax: function() {
        return getRangeMax;
      },
      getRangeMin: function() {
        return getRangeMin;
      },
      getRangeValue: function() {
        return getRangeValue;
      },
      getStyleFromHsl: function() {
        return getStyleFromHsl;
      },
      getStyleFromHsv: function() {
        return getStyleFromHsv;
      },
      getStyleFromRgb: function() {
        return getStyleFromRgb;
      },
      getValue: function() {
        return getValue;
      },
      gradient: function() {
        return gradient;
      },
      hslToHsv: function() {
        return hslToHsv;
      },
      hslToRgb: function() {
        return hslToRgb;
      },
      hslaToHsva: function() {
        return hslaToHsva;
      },
      hslaToRgba: function() {
        return hslaToRgba;
      },
      hsvToHsl: function() {
        return hsvToHsl;
      },
      hsvToRgb: function() {
        return hsvToRgb;
      },
      hsvaToHsla: function() {
        return hsvaToHsla;
      },
      hsvaToRgba: function() {
        return hsvaToRgba;
      },
      isDivModeEnabled: function() {
        return isDivModeEnabled;
      },
      isInArray: function() {
        return isInArray;
      },
      isPointInside: function() {
        return isPointInside;
      },
      isSsr: function() {
        return isSsr;
      },
      itemFromArray: function() {
        return itemFromArray;
      },
      loadFont: function() {
        return loadFont;
      },
      loadOptions: function() {
        return loadOptions;
      },
      loadParticlesOptions: function() {
        return loadParticlesOptions;
      },
      midColorValue: function() {
        return midColorValue;
      },
      mix: function() {
        return mix;
      },
      mouseDownEvent: function() {
        return mouseDownEvent;
      },
      mouseLeaveEvent: function() {
        return mouseLeaveEvent;
      },
      mouseMoveEvent: function() {
        return mouseMoveEvent;
      },
      mouseOutEvent: function() {
        return mouseOutEvent;
      },
      mouseUpEvent: function() {
        return mouseUpEvent;
      },
      noPolygonDataLoaded: function() {
        return noPolygonDataLoaded;
      },
      noPolygonFound: function() {
        return noPolygonFound;
      },
      paintBase: function() {
        return paintBase;
      },
      randomColorValue: function() {
        return randomColorValue;
      },
      randomInRange: function() {
        return randomInRange;
      },
      rangeColorToHsl: function() {
        return rangeColorToHsl;
      },
      rangeColorToRgb: function() {
        return rangeColorToRgb;
      },
      rectBounce: function() {
        return rectBounce;
      },
      resizeEvent: function() {
        return resizeEvent;
      },
      rgbToHsl: function() {
        return rgbToHsl;
      },
      rgbToHsv: function() {
        return rgbToHsv;
      },
      rgbaToHsva: function() {
        return rgbaToHsva;
      },
      setRangeValue: function() {
        return setRangeValue;
      },
      singleDivModeExecute: function() {
        return singleDivModeExecute;
      },
      stringToAlpha: function() {
        return stringToAlpha;
      },
      stringToRgb: function() {
        return stringToRgb;
      },
      touchCancelEvent: function() {
        return touchCancelEvent;
      },
      touchEndEvent: function() {
        return touchEndEvent;
      },
      touchMoveEvent: function() {
        return touchMoveEvent;
      },
      touchStartEvent: function() {
        return touchStartEvent;
      },
      tsParticles: function() {
        return tsParticles;
      },
      visibilityChangeEvent: function() {
        return visibilityChangeEvent;
      }
    });
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
    var _EventDispatcher_listeners;
    class EventDispatcher {
      constructor() {
        _EventDispatcher_listeners.set(this, void 0);
        __classPrivateFieldSet(this, _EventDispatcher_listeners, new Map, "f");
      }
      addEventListener(type, listener) {
        var _a;
        this.removeEventListener(type, listener);
        if (!__classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type)) {
          __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").set(type, []);
        }
        (_a = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type)) === null || _a === void 0 ? void 0 : _a.push(listener);
      }
      dispatchEvent(type, args) {
        var _a;
        (_a = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type)) === null || _a === void 0 ? void 0 : _a.forEach((handler => handler(args)));
      }
      hasEventListener(type) {
        return !!__classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type);
      }
      removeAllEventListeners(type) {
        if (!type) {
          __classPrivateFieldSet(this, _EventDispatcher_listeners, new Map, "f");
        } else {
          __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").delete(type);
        }
      }
      removeEventListener(type, listener) {
        const arr = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type);
        if (!arr) {
          return;
        }
        const length = arr.length, idx = arr.indexOf(listener);
        if (idx < 0) {
          return;
        }
        if (length === 1) {
          __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").delete(type);
        } else {
          arr.splice(idx, 1);
        }
      }
    }
    _EventDispatcher_listeners = new WeakMap;
    class Vector {
      constructor(xOrCoords, y) {
        if (typeof xOrCoords !== "number" && xOrCoords) {
          this.x = xOrCoords.x;
          this.y = xOrCoords.y;
        } else if (xOrCoords !== undefined && y !== undefined) {
          this.x = xOrCoords;
          this.y = y;
        } else {
          throw new Error("tsParticles - Vector not initialized correctly");
        }
      }
      static get origin() {
        return Vector.create(0, 0);
      }
      get angle() {
        return Math.atan2(this.y, this.x);
      }
      set angle(angle) {
        this.updateFromAngle(angle, this.length);
      }
      get length() {
        return Math.sqrt(this.getLengthSq());
      }
      set length(length) {
        this.updateFromAngle(this.angle, length);
      }
      static clone(source) {
        return Vector.create(source.x, source.y);
      }
      static create(x, y) {
        return new Vector(x, y);
      }
      add(v) {
        return Vector.create(this.x + v.x, this.y + v.y);
      }
      addTo(v) {
        this.x += v.x;
        this.y += v.y;
      }
      copy() {
        return Vector.clone(this);
      }
      distanceTo(v) {
        return this.sub(v).length;
      }
      distanceToSq(v) {
        return this.sub(v).getLengthSq();
      }
      div(n) {
        return Vector.create(this.x / n, this.y / n);
      }
      divTo(n) {
        this.x /= n;
        this.y /= n;
      }
      getLengthSq() {
        return this.x ** 2 + this.y ** 2;
      }
      manhattanDistanceTo(v) {
        return Math.abs(v.x - this.x) + Math.abs(v.y - this.y);
      }
      mult(n) {
        return Vector.create(this.x * n, this.y * n);
      }
      multTo(n) {
        this.x *= n;
        this.y *= n;
      }
      rotate(angle) {
        return Vector.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
      }
      setTo(v) {
        this.x = v.x;
        this.y = v.y;
      }
      sub(v) {
        return Vector.create(this.x - v.x, this.y - v.y);
      }
      subFrom(v) {
        this.x -= v.x;
        this.y -= v.y;
      }
      updateFromAngle(angle, length) {
        this.x = Math.cos(angle) * length;
        this.y = Math.sin(angle) * length;
      }
    }
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
    function getParticleDirectionAngle(direction, position, center) {
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

         case "inside":
          return Math.atan2(center.y - position.y, center.x - position.x);

         case "outside":
          return Math.atan2(position.y - center.y, position.x - center.x);

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
    async function loadFont(font, weight) {
      try {
        await document.fonts.load(`${weight !== null && weight !== void 0 ? weight : "400"} 36px '${font !== null && font !== void 0 ? font : "Verdana"}'`);
      } catch (_a) {}
    }
    function arrayRandomIndex(array) {
      return Math.floor(Math.random() * array.length);
    }
    function itemFromArray(array, index, useIndex = true) {
      const fixedIndex = index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array);
      return array[fixedIndex];
    }
    function isPointInside(point, size, offset, radius, direction) {
      return areBoundsInside(calculateBounds(point, radius !== null && radius !== void 0 ? radius : 0), size, offset, direction);
    }
    function areBoundsInside(bounds, size, offset, direction) {
      let inside = true;
      if (!direction || direction === "bottom") {
        inside = bounds.top < size.height + offset.x;
      }
      if (inside && (!direction || direction === "left")) {
        inside = bounds.right > offset.x;
      }
      if (inside && (!direction || direction === "right")) {
        inside = bounds.left < size.width + offset.y;
      }
      if (inside && (!direction || direction === "top")) {
        inside = bounds.bottom > offset.y;
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
    const generatedAttribute = "generated";
    const randomColorValue = "random";
    const midColorValue = "mid";
    const touchEndEvent = "touchend";
    const mouseDownEvent = "mousedown";
    const mouseUpEvent = "mouseup";
    const mouseMoveEvent = "mousemove";
    const touchStartEvent = "touchstart";
    const touchMoveEvent = "touchmove";
    const mouseLeaveEvent = "mouseleave";
    const mouseOutEvent = "mouseout";
    const touchCancelEvent = "touchcancel";
    const resizeEvent = "resize";
    const visibilityChangeEvent = "visibilitychange";
    const noPolygonDataLoaded = "No polygon data loaded.";
    const noPolygonFound = "No polygon found, you need to specify SVG url in config.";
    function hue2rgb(p, q, t) {
      if (t < 0) {
        t += 1;
      }
      if (t > 1) {
        t -= 1;
      }
      if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
      }
      if (t < 1 / 2) {
        return q;
      }
      if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
      }
      return p;
    }
    function stringToRgba(input) {
      if (input.startsWith("rgb")) {
        const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)/i, result = regex.exec(input);
        return result ? {
          a: result.length > 4 ? parseFloat(result[5]) : 1,
          b: parseInt(result[3], 10),
          g: parseInt(result[2], 10),
          r: parseInt(result[1], 10)
        } : undefined;
      } else if (input.startsWith("hsl")) {
        const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i, result = regex.exec(input);
        return result ? hslaToRgba({
          a: result.length > 4 ? parseFloat(result[5]) : 1,
          h: parseInt(result[1], 10),
          l: parseInt(result[3], 10),
          s: parseInt(result[2], 10)
        }) : undefined;
      } else if (input.startsWith("hsv")) {
        const regex = /hsva?\(\s*(\d+)°\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i, result = regex.exec(input);
        return result ? hsvaToRgba({
          a: result.length > 4 ? parseFloat(result[5]) : 1,
          h: parseInt(result[1], 10),
          s: parseInt(result[2], 10),
          v: parseInt(result[3], 10)
        }) : undefined;
      } else {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i, hexFixed = input.replace(shorthandRegex, ((_, r, g, b, a) => r + r + g + g + b + b + (a !== undefined ? a + a : ""))), regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i, result = regex.exec(hexFixed);
        return result ? {
          a: result[4] !== undefined ? parseInt(result[4], 16) / 255 : 1,
          b: parseInt(result[3], 16),
          g: parseInt(result[2], 16),
          r: parseInt(result[1], 16)
        } : undefined;
      }
    }
    function rangeColorToRgb(input, index, useIndex = true) {
      var _a, _b, _c;
      if (input === undefined) {
        return undefined;
      }
      const color = typeof input === "string" ? {
        value: input
      } : input;
      if (typeof color.value === "string") {
        return colorToRgb(color.value, index, useIndex);
      }
      if (color.value instanceof Array) {
        return rangeColorToRgb({
          value: itemFromArray(color.value, index, useIndex)
        });
      }
      const colorValue = color.value, rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;
      if (rgbColor.r !== undefined) {
        return {
          r: getRangeValue(rgbColor.r),
          g: getRangeValue(rgbColor.g),
          b: getRangeValue(rgbColor.b)
        };
      }
      const hslColor = (_b = colorValue.hsl) !== null && _b !== void 0 ? _b : color.value;
      if (hslColor.h !== undefined && hslColor.l !== undefined) {
        return hslToRgb({
          h: getRangeValue(hslColor.h),
          l: getRangeValue(hslColor.l),
          s: getRangeValue(hslColor.s)
        });
      }
      const hsvColor = (_c = colorValue.hsv) !== null && _c !== void 0 ? _c : color.value;
      if (hsvColor.h !== undefined && hsvColor.v !== undefined) {
        const res = hsvToRgb({
          h: getRangeValue(hsvColor.h),
          s: getRangeValue(hsvColor.s),
          v: getRangeValue(hsvColor.v)
        });
        return res;
      }
      return undefined;
    }
    function colorToRgb(input, index, useIndex = true) {
      var _a, _b, _c;
      if (input === undefined) {
        return;
      }
      const color = typeof input === "string" ? {
        value: input
      } : input;
      if (typeof color.value === "string") {
        return color.value === randomColorValue ? getRandomRgbColor() : stringToRgb(color.value);
      }
      if (color.value instanceof Array) {
        return colorToRgb({
          value: itemFromArray(color.value, index, useIndex)
        });
      }
      const colorValue = color.value, rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;
      if (rgbColor.r !== undefined) {
        return rgbColor;
      }
      const hslColor = (_b = colorValue.hsl) !== null && _b !== void 0 ? _b : color.value;
      if (hslColor.h !== undefined && hslColor.l !== undefined) {
        return hslToRgb(hslColor);
      }
      const hsvColor = (_c = colorValue.hsv) !== null && _c !== void 0 ? _c : color.value;
      if (hsvColor.h !== undefined && hsvColor.v !== undefined) {
        return hsvToRgb(hsvColor);
      }
      return undefined;
    }
    function colorToHsl(color, index, useIndex = true) {
      const rgb = colorToRgb(color, index, useIndex);
      return rgb !== undefined ? rgbToHsl(rgb) : undefined;
    }
    function rangeColorToHsl(color, index, useIndex = true) {
      const rgb = rangeColorToRgb(color, index, useIndex);
      return rgb !== undefined ? rgbToHsl(rgb) : undefined;
    }
    function rgbToHsl(color) {
      const r1 = color.r / 255, g1 = color.g / 255, b1 = color.b / 255, max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1), res = {
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
      if (res.h >= 360) {
        res.h -= 360;
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
      if (!hslPercent.s) {
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
      return Object.assign({
        a: hsla.a
      }, hslToHsv(hsla));
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
      return Object.assign({
        a: hsva.a
      }, hsvToHsl(hsva));
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
      }, c = hsvPercent.v * hsvPercent.s, x = c * (1 - Math.abs(hsvPercent.h % 2 - 1));
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
      return Object.assign({
        a: hsva.a
      }, hsvToRgb(hsva));
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
      return Object.assign({
        a: rgba.a
      }, rgbToHsv(rgba));
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
      if (linkColor === randomColorValue) {
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
      if (color === randomColorValue) {
        if (consent) {
          return rangeColorToRgb({
            value: color
          });
        }
        if (blink) {
          return randomColorValue;
        }
        return midColorValue;
      } else {
        return rangeColorToRgb({
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
        colorValue.decay = 1 - getRangeValue(colorAnimation.decay);
        colorValue.status = 0;
        if (!colorAnimation.sync) {
          colorValue.velocity *= Math.random();
          colorValue.value *= Math.random();
        }
      } else {
        colorValue.velocity = 0;
      }
    }
    function drawLine(context, begin, end) {
      context.beginPath();
      context.moveTo(begin.x, begin.y);
      context.lineTo(end.x, end.y);
      context.closePath();
    }
    function drawTriangle(context, p1, p2, p3) {
      context.beginPath();
      context.moveTo(p1.x, p1.y);
      context.lineTo(p2.x, p2.y);
      context.lineTo(p3.x, p3.y);
      context.closePath();
    }
    function paintBase(context, dimension, baseColor) {
      context.save();
      context.fillStyle = baseColor !== null && baseColor !== void 0 ? baseColor : "rgba(0,0,0,0)";
      context.fillRect(0, 0, dimension.width, dimension.height);
      context.restore();
    }
    function clear(context, dimension) {
      context.clearRect(0, 0, dimension.width, dimension.height);
    }
    function gradient(context, p1, p2, opacity) {
      const gradStop = Math.floor(p2.getRadius() / p1.getRadius()), color1 = p1.getFillColor(), color2 = p2.getFillColor();
      if (!color1 || !color2) {
        return;
      }
      const sourcePos = p1.getPosition(), destPos = p2.getPosition(), midRgb = colorMix(color1, color2, p1.getRadius(), p2.getRadius()), grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
      grad.addColorStop(0, getStyleFromHsl(color1, opacity));
      grad.addColorStop(gradStop > 1 ? 1 : gradStop, getStyleFromRgb(midRgb, opacity));
      grad.addColorStop(1, getStyleFromHsl(color2, opacity));
      return grad;
    }
    function drawParticle(container, context, particle, delta, colorStyles, backgroundMask, composite, radius, opacity, shadow, transform) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
      const pos = particle.getPosition();
      context.save();
      if (transform.a !== undefined || transform.b !== undefined || transform.c !== undefined || transform.d !== undefined) {
        context.setTransform((_a = transform.a) !== null && _a !== void 0 ? _a : 1, (_b = transform.b) !== null && _b !== void 0 ? _b : 0, (_c = transform.c) !== null && _c !== void 0 ? _c : 0, (_d = transform.d) !== null && _d !== void 0 ? _d : 1, pos.x, pos.y);
      } else {
        context.translate(pos.x, pos.y);
      }
      context.beginPath();
      const angle = ((_f = (_e = particle.rotate) === null || _e === void 0 ? void 0 : _e.value) !== null && _f !== void 0 ? _f : 0) + (particle.options.rotate.path ? particle.velocity.angle : 0);
      if (angle !== 0) {
        context.rotate(angle);
      }
      if (backgroundMask) {
        context.globalCompositeOperation = composite;
      }
      const shadowColor = particle.shadowColor;
      if (shadow.enable && shadowColor) {
        context.shadowBlur = shadow.blur;
        context.shadowColor = getStyleFromRgb(shadowColor);
        context.shadowOffsetX = shadow.offset.x;
        context.shadowOffsetY = shadow.offset.y;
      }
      if (colorStyles.fill) {
        context.fillStyle = colorStyles.fill;
      }
      const stroke = particle.stroke;
      context.lineWidth = (_g = particle.strokeWidth) !== null && _g !== void 0 ? _g : 0;
      if (colorStyles.stroke) {
        context.strokeStyle = colorStyles.stroke;
      }
      drawShape(container, context, particle, radius, opacity, delta);
      if (((_h = stroke === null || stroke === void 0 ? void 0 : stroke.width) !== null && _h !== void 0 ? _h : 0) > 0) {
        context.stroke();
      }
      if (particle.close) {
        context.closePath();
      }
      if (particle.fill) {
        context.fill();
      }
      context.restore();
      context.save();
      if (transform.a !== undefined || transform.b !== undefined || transform.c !== undefined || transform.d !== undefined) {
        context.setTransform((_j = transform.a) !== null && _j !== void 0 ? _j : 1, (_k = transform.b) !== null && _k !== void 0 ? _k : 0, (_l = transform.c) !== null && _l !== void 0 ? _l : 0, (_m = transform.d) !== null && _m !== void 0 ? _m : 1, pos.x, pos.y);
      } else {
        context.translate(pos.x, pos.y);
      }
      if (angle !== 0) {
        context.rotate(angle);
      }
      if (backgroundMask) {
        context.globalCompositeOperation = composite;
      }
      drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
      context.restore();
    }
    function drawShape(container, context, particle, radius, opacity, delta) {
      if (!particle.shape) {
        return;
      }
      const drawer = container.drawers.get(particle.shape);
      if (!drawer) {
        return;
      }
      drawer.draw(context, particle, radius, opacity, delta, container.retina.pixelRatio);
    }
    function drawShapeAfterEffect(container, context, particle, radius, opacity, delta) {
      if (!particle.shape) {
        return;
      }
      const drawer = container.drawers.get(particle.shape);
      if (!(drawer === null || drawer === void 0 ? void 0 : drawer.afterEffect)) {
        return;
      }
      drawer.afterEffect(context, particle, radius, opacity, delta, container.retina.pixelRatio);
    }
    function drawPlugin(context, plugin, delta) {
      if (!plugin.draw) {
        return;
      }
      context.save();
      plugin.draw(context, delta);
      context.restore();
    }
    function drawParticlePlugin(context, plugin, particle, delta) {
      if (!plugin.drawParticle) {
        return;
      }
      context.save();
      plugin.drawParticle(context, particle, delta);
      context.restore();
    }
    function drawEllipse(context, particle, fillColorValue, radius, opacity, width, rotation, start, end) {
      if (width <= 0) {
        return;
      }
      const pos = particle.getPosition();
      if (fillColorValue) {
        context.strokeStyle = getStyleFromHsl(fillColorValue, opacity);
      }
      context.lineWidth = width;
      const rotationRadian = rotation * Math.PI / 180;
      context.beginPath();
      context.ellipse(pos.x, pos.y, radius / 2, radius * 2, rotationRadian, start, end);
      context.stroke();
    }
    function alterHsl(color, type, value) {
      return {
        h: color.h,
        s: color.s,
        l: color.l + (type === "darken" ? -1 : 1) * value
      };
    }
    var Canvas_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), 
      value;
    };
    var Canvas_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _Canvas_context;
    function setTransformValue(factor, newFactor, key) {
      var _a;
      const newValue = newFactor[key];
      if (newValue !== undefined) {
        factor[key] = ((_a = factor[key]) !== null && _a !== void 0 ? _a : 1) * newValue;
      }
    }
    class Canvas {
      constructor(container) {
        this.container = container;
        _Canvas_context.set(this, void 0);
        this.size = {
          height: 0,
          width: 0
        };
        Canvas_classPrivateFieldSet(this, _Canvas_context, null, "f");
        this.generatedCanvas = false;
      }
      clear() {
        const options = this.container.actualOptions, trail = options.particles.move.trail;
        if (options.backgroundMask.enable) {
          this.paint();
        } else if (trail.enable && trail.length > 0 && this.trailFillColor) {
          this.paintBase(getStyleFromRgb(this.trailFillColor, 1 / trail.length));
        } else {
          this.draw((ctx => {
            clear(ctx, this.size);
          }));
        }
      }
      destroy() {
        var _a;
        if (this.generatedCanvas) {
          (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
        } else {
          this.resetOriginalStyle();
        }
        this.draw((ctx => {
          clear(ctx, this.size);
        }));
      }
      draw(cb) {
        if (!Canvas_classPrivateFieldGet(this, _Canvas_context, "f")) {
          return;
        }
        return cb(Canvas_classPrivateFieldGet(this, _Canvas_context, "f"));
      }
      drawParticle(particle, delta) {
        var _a, _b, _c, _d, _e, _f;
        if (particle.spawning || particle.destroyed) {
          return;
        }
        const radius = particle.getRadius();
        if (radius <= 0) {
          return;
        }
        const pfColor = particle.getFillColor(), psColor = (_a = particle.getStrokeColor()) !== null && _a !== void 0 ? _a : pfColor;
        if (!pfColor && !psColor) {
          return;
        }
        let [fColor, sColor] = this.getPluginParticleColors(particle);
        if (!fColor || !sColor) {
          if (!fColor) {
            fColor = pfColor ? pfColor : undefined;
          }
          if (!sColor) {
            sColor = psColor ? psColor : undefined;
          }
        }
        const options = this.container.actualOptions, zIndexOptions = particle.options.zIndex, zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate, opacity = (_d = (_b = particle.bubble.opacity) !== null && _b !== void 0 ? _b : (_c = particle.opacity) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 1, strokeOpacity = (_f = (_e = particle.stroke) === null || _e === void 0 ? void 0 : _e.opacity) !== null && _f !== void 0 ? _f : opacity, zOpacity = opacity * zOpacityFactor, zStrokeOpacity = strokeOpacity * zOpacityFactor;
        const colorStyles = {
          fill: fColor ? getStyleFromHsl(fColor, zOpacity) : undefined
        };
        colorStyles.stroke = sColor ? getStyleFromHsl(sColor, zStrokeOpacity) : colorStyles.fill;
        this.draw((ctx => {
          const transform = {};
          const zSizeFactor = (1 - particle.zIndexFactor) ** zIndexOptions.sizeRate, container = this.container;
          for (const updater of container.particles.updaters) {
            if (updater.beforeDraw) {
              updater.beforeDraw(particle);
            }
            if (updater.getColorStyles) {
              const {fill: fill, stroke: stroke} = updater.getColorStyles(particle, ctx, radius, zOpacity);
              if (fill) {
                colorStyles.fill = fill;
              }
              if (stroke) {
                colorStyles.stroke = stroke;
              }
            }
            if (updater.getTransformValues) {
              const updaterTransform = updater.getTransformValues(particle);
              for (const key in updaterTransform) {
                setTransformValue(transform, updaterTransform, key);
              }
            }
          }
          drawParticle(container, ctx, particle, delta, colorStyles, options.backgroundMask.enable, options.backgroundMask.composite, radius * zSizeFactor, zOpacity, particle.options.shadow, transform);
          for (const updater of container.particles.updaters) {
            if (updater.afterDraw) {
              updater.afterDraw(particle);
            }
          }
        }));
      }
      drawParticlePlugin(plugin, particle, delta) {
        this.draw((ctx => {
          drawParticlePlugin(ctx, plugin, particle, delta);
        }));
      }
      drawPlugin(plugin, delta) {
        this.draw((ctx => {
          drawPlugin(ctx, plugin, delta);
        }));
      }
      init() {
        this.resize();
        this.initStyle();
        this.initCover();
        this.initTrail();
        this.initBackground();
        this.paint();
      }
      initBackground() {
        const options = this.container.actualOptions, background = options.background, element = this.element, elementStyle = element === null || element === void 0 ? void 0 : element.style;
        if (!elementStyle) {
          return;
        }
        if (background.color) {
          const color = rangeColorToRgb(background.color);
          elementStyle.backgroundColor = color ? getStyleFromRgb(color, background.opacity) : "";
        } else {
          elementStyle.backgroundColor = "";
        }
        elementStyle.backgroundImage = background.image || "";
        elementStyle.backgroundPosition = background.position || "";
        elementStyle.backgroundRepeat = background.repeat || "";
        elementStyle.backgroundSize = background.size || "";
      }
      loadCanvas(canvas) {
        var _a;
        if (this.generatedCanvas) {
          (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
        }
        this.generatedCanvas = canvas.dataset && generatedAttribute in canvas.dataset ? canvas.dataset[generatedAttribute] === "true" : this.generatedCanvas;
        this.element = canvas;
        this.originalStyle = deepExtend({}, this.element.style);
        this.size.height = canvas.offsetHeight;
        this.size.width = canvas.offsetWidth;
        Canvas_classPrivateFieldSet(this, _Canvas_context, this.element.getContext("2d"), "f");
        this.container.retina.init();
        this.initBackground();
      }
      paint() {
        const options = this.container.actualOptions;
        this.draw((ctx => {
          if (options.backgroundMask.enable && options.backgroundMask.cover) {
            clear(ctx, this.size);
            this.paintBase(this.coverColorStyle);
          } else {
            this.paintBase();
          }
        }));
      }
      resize() {
        if (!this.element) {
          return;
        }
        const container = this.container, pxRatio = container.retina.pixelRatio, size = container.canvas.size, newSize = {
          width: this.element.offsetWidth * pxRatio,
          height: this.element.offsetHeight * pxRatio
        };
        if (newSize.height === size.height && newSize.width === size.width && newSize.height === this.element.height && newSize.width === this.element.width) {
          return;
        }
        const oldSize = Object.assign({}, size);
        this.element.width = size.width = this.element.offsetWidth * pxRatio;
        this.element.height = size.height = this.element.offsetHeight * pxRatio;
        if (this.container.started) {
          this.resizeFactor = {
            width: size.width / oldSize.width,
            height: size.height / oldSize.height
          };
        }
      }
      async windowResize() {
        if (!this.element) {
          return;
        }
        this.resize();
        const container = this.container, needsRefresh = container.updateActualOptions();
        container.particles.setDensity();
        for (const [, plugin] of container.plugins) {
          if (plugin.resize !== undefined) {
            plugin.resize();
          }
        }
        if (needsRefresh) {
          await container.refresh();
        }
      }
      getPluginParticleColors(particle) {
        let fColor, sColor;
        for (const [, plugin] of this.container.plugins) {
          if (!fColor && plugin.particleFillColor) {
            fColor = rangeColorToHsl(plugin.particleFillColor(particle));
          }
          if (!sColor && plugin.particleStrokeColor) {
            sColor = rangeColorToHsl(plugin.particleStrokeColor(particle));
          }
          if (fColor && sColor) {
            break;
          }
        }
        return [ fColor, sColor ];
      }
      initCover() {
        const options = this.container.actualOptions, cover = options.backgroundMask.cover, color = cover.color, coverRgb = rangeColorToRgb(color);
        if (coverRgb) {
          const coverColor = {
            r: coverRgb.r,
            g: coverRgb.g,
            b: coverRgb.b,
            a: cover.opacity
          };
          this.coverColorStyle = getStyleFromRgb(coverColor, coverColor.a);
        }
      }
      initStyle() {
        const element = this.element, options = this.container.actualOptions;
        if (!element) {
          return;
        }
        if (options.fullScreen.enable) {
          this.originalStyle = deepExtend({}, element.style);
          element.style.setProperty("position", "fixed", "important");
          element.style.setProperty("z-index", options.fullScreen.zIndex.toString(10), "important");
          element.style.setProperty("top", "0", "important");
          element.style.setProperty("left", "0", "important");
          element.style.setProperty("width", "100%", "important");
          element.style.setProperty("height", "100%", "important");
        } else {
          this.resetOriginalStyle();
        }
        for (const key in options.style) {
          if (!key || !options.style) {
            continue;
          }
          const value = options.style[key];
          if (!value) {
            continue;
          }
          element.style.setProperty(key, value, "important");
        }
      }
      initTrail() {
        const options = this.container.actualOptions, trail = options.particles.move.trail, fillColor = rangeColorToRgb(trail.fillColor);
        if (fillColor) {
          const trail = options.particles.move.trail;
          this.trailFillColor = {
            r: fillColor.r,
            g: fillColor.g,
            b: fillColor.b,
            a: 1 / trail.length
          };
        }
      }
      paintBase(baseColor) {
        this.draw((ctx => {
          paintBase(ctx, this.size, baseColor);
        }));
      }
      resetOriginalStyle() {
        const element = this.element, originalStyle = this.originalStyle;
        if (element && originalStyle) {
          element.style.position = originalStyle.position;
          element.style.zIndex = originalStyle.zIndex;
          element.style.top = originalStyle.top;
          element.style.left = originalStyle.left;
          element.style.width = originalStyle.width;
          element.style.height = originalStyle.height;
        }
      }
    }
    _Canvas_context = new WeakMap;
    function manageListener(element, event, handler, add, options) {
      if (add) {
        let addOptions = {
          passive: true
        };
        if (typeof options === "boolean") {
          addOptions.capture = options;
        } else if (options !== undefined) {
          addOptions = options;
        }
        element.addEventListener(event, handler, addOptions);
      } else {
        const removeOptions = options;
        element.removeEventListener(event, handler, removeOptions);
      }
    }
    class EventListeners {
      constructor(container) {
        this.container = container;
        this.canPush = true;
        this.mouseMoveHandler = e => this.mouseTouchMove(e);
        this.touchStartHandler = e => this.mouseTouchMove(e);
        this.touchMoveHandler = e => this.mouseTouchMove(e);
        this.touchEndHandler = () => this.mouseTouchFinish();
        this.mouseLeaveHandler = () => this.mouseTouchFinish();
        this.touchCancelHandler = () => this.mouseTouchFinish();
        this.touchEndClickHandler = e => this.mouseTouchClick(e);
        this.mouseUpHandler = e => this.mouseTouchClick(e);
        this.mouseDownHandler = () => this.mouseDown();
        this.visibilityChangeHandler = () => this.handleVisibilityChange();
        this.themeChangeHandler = e => this.handleThemeChange(e);
        this.oldThemeChangeHandler = e => this.handleThemeChange(e);
        this.resizeHandler = () => this.handleWindowResize();
      }
      addListeners() {
        this.manageListeners(true);
      }
      removeListeners() {
        this.manageListeners(false);
      }
      doMouseTouchClick(e) {
        const container = this.container, options = container.actualOptions;
        if (this.canPush) {
          const mousePos = container.interactivity.mouse.position;
          if (!mousePos) {
            return;
          }
          container.interactivity.mouse.clickPosition = {
            x: mousePos.x,
            y: mousePos.y
          };
          container.interactivity.mouse.clickTime = (new Date).getTime();
          const onClick = options.interactivity.events.onClick;
          if (onClick.mode instanceof Array) {
            for (const mode of onClick.mode) {
              this.handleClickMode(mode);
            }
          } else {
            this.handleClickMode(onClick.mode);
          }
        }
        if (e.type === "touchend") {
          setTimeout((() => this.mouseTouchFinish()), 500);
        }
      }
      handleClickMode(mode) {
        this.container.handleClickMode(mode);
      }
      handleThemeChange(e) {
        const mediaEvent = e, themeName = mediaEvent.matches ? this.container.options.defaultDarkTheme : this.container.options.defaultLightTheme, theme = this.container.options.themes.find((theme => theme.name === themeName));
        if (theme && theme.default.auto) {
          this.container.loadTheme(themeName);
        }
      }
      handleVisibilityChange() {
        const container = this.container, options = container.actualOptions;
        this.mouseTouchFinish();
        if (!options.pauseOnBlur) {
          return;
        }
        if (document === null || document === void 0 ? void 0 : document.hidden) {
          container.pageHidden = true;
          container.pause();
        } else {
          container.pageHidden = false;
          if (container.getAnimationStatus()) {
            container.play(true);
          } else {
            container.draw(true);
          }
        }
      }
      handleWindowResize() {
        if (this.resizeTimeout) {
          clearTimeout(this.resizeTimeout);
          delete this.resizeTimeout;
        }
        this.resizeTimeout = setTimeout((async () => {
          var _a;
          return (_a = this.container.canvas) === null || _a === void 0 ? void 0 : _a.windowResize();
        }), 500);
      }
      manageListeners(add) {
        var _a;
        const container = this.container, options = container.actualOptions, detectType = options.interactivity.detectsOn;
        let mouseLeaveTmpEvent = mouseLeaveEvent;
        if (detectType === "window") {
          container.interactivity.element = window;
          mouseLeaveTmpEvent = mouseOutEvent;
        } else if (detectType === "parent" && container.canvas.element) {
          const canvasEl = container.canvas.element;
          container.interactivity.element = (_a = canvasEl.parentElement) !== null && _a !== void 0 ? _a : canvasEl.parentNode;
        } else {
          container.interactivity.element = container.canvas.element;
        }
        const mediaMatch = !isSsr() && typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)");
        if (mediaMatch) {
          if (mediaMatch.addEventListener !== undefined) {
            manageListener(mediaMatch, "change", this.themeChangeHandler, add);
          } else if (mediaMatch.addListener !== undefined) {
            if (add) {
              mediaMatch.addListener(this.oldThemeChangeHandler);
            } else {
              mediaMatch.removeListener(this.oldThemeChangeHandler);
            }
          }
        }
        const interactivityEl = container.interactivity.element;
        if (!interactivityEl) {
          return;
        }
        const html = interactivityEl;
        if (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable) {
          manageListener(interactivityEl, mouseMoveEvent, this.mouseMoveHandler, add);
          manageListener(interactivityEl, touchStartEvent, this.touchStartHandler, add);
          manageListener(interactivityEl, touchMoveEvent, this.touchMoveHandler, add);
          if (!options.interactivity.events.onClick.enable) {
            manageListener(interactivityEl, touchEndEvent, this.touchEndHandler, add);
          } else {
            manageListener(interactivityEl, touchEndEvent, this.touchEndClickHandler, add);
            manageListener(interactivityEl, mouseUpEvent, this.mouseUpHandler, add);
            manageListener(interactivityEl, mouseDownEvent, this.mouseDownHandler, add);
          }
          manageListener(interactivityEl, mouseLeaveTmpEvent, this.mouseLeaveHandler, add);
          manageListener(interactivityEl, touchCancelEvent, this.touchCancelHandler, add);
        }
        if (container.canvas.element) {
          container.canvas.element.style.pointerEvents = html === container.canvas.element ? "initial" : "none";
        }
        if (options.interactivity.events.resize) {
          if (typeof ResizeObserver !== "undefined") {
            if (this.resizeObserver && !add) {
              if (container.canvas.element) {
                this.resizeObserver.unobserve(container.canvas.element);
              }
              this.resizeObserver.disconnect();
              delete this.resizeObserver;
            } else if (!this.resizeObserver && add && container.canvas.element) {
              this.resizeObserver = new ResizeObserver((entries => {
                const entry = entries.find((e => e.target === container.canvas.element));
                if (!entry) {
                  return;
                }
                this.handleWindowResize();
              }));
              this.resizeObserver.observe(container.canvas.element);
            }
          } else {
            manageListener(window, resizeEvent, this.resizeHandler, add);
          }
        }
        if (document) {
          manageListener(document, visibilityChangeEvent, this.visibilityChangeHandler, add, false);
        }
      }
      mouseDown() {
        const interactivity = this.container.interactivity;
        if (interactivity) {
          const mouse = interactivity.mouse;
          mouse.clicking = true;
          mouse.downPosition = mouse.position;
        }
      }
      mouseTouchClick(e) {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse;
        mouse.inside = true;
        let handled = false;
        const mousePosition = mouse.position;
        if (!mousePosition || !options.interactivity.events.onClick.enable) {
          return;
        }
        for (const [, plugin] of container.plugins) {
          if (!plugin.clickPositionValid) {
            continue;
          }
          handled = plugin.clickPositionValid(mousePosition);
          if (handled) {
            break;
          }
        }
        if (!handled) {
          this.doMouseTouchClick(e);
        }
        mouse.clicking = false;
      }
      mouseTouchFinish() {
        const interactivity = this.container.interactivity;
        if (!interactivity) {
          return;
        }
        const mouse = interactivity.mouse;
        delete mouse.position;
        delete mouse.clickPosition;
        delete mouse.downPosition;
        interactivity.status = mouseLeaveEvent;
        mouse.inside = false;
        mouse.clicking = false;
      }
      mouseTouchMove(e) {
        var _a, _b, _c, _d, _e, _f, _g;
        const container = this.container, options = container.actualOptions;
        if (!((_a = container.interactivity) === null || _a === void 0 ? void 0 : _a.element)) {
          return;
        }
        container.interactivity.mouse.inside = true;
        let pos;
        const canvas = container.canvas.element;
        if (e.type.startsWith("mouse")) {
          this.canPush = true;
          const mouseEvent = e;
          if (container.interactivity.element === window) {
            if (canvas) {
              const clientRect = canvas.getBoundingClientRect();
              pos = {
                x: mouseEvent.clientX - clientRect.left,
                y: mouseEvent.clientY - clientRect.top
              };
            }
          } else if (options.interactivity.detectsOn === "parent") {
            const source = mouseEvent.target;
            const target = mouseEvent.currentTarget;
            const canvasEl = container.canvas.element;
            if (source && target && canvasEl) {
              const sourceRect = source.getBoundingClientRect();
              const targetRect = target.getBoundingClientRect();
              const canvasRect = canvasEl.getBoundingClientRect();
              pos = {
                x: mouseEvent.offsetX + 2 * sourceRect.left - (targetRect.left + canvasRect.left),
                y: mouseEvent.offsetY + 2 * sourceRect.top - (targetRect.top + canvasRect.top)
              };
            } else {
              pos = {
                x: (_b = mouseEvent.offsetX) !== null && _b !== void 0 ? _b : mouseEvent.clientX,
                y: (_c = mouseEvent.offsetY) !== null && _c !== void 0 ? _c : mouseEvent.clientY
              };
            }
          } else {
            if (mouseEvent.target === container.canvas.element) {
              pos = {
                x: (_d = mouseEvent.offsetX) !== null && _d !== void 0 ? _d : mouseEvent.clientX,
                y: (_e = mouseEvent.offsetY) !== null && _e !== void 0 ? _e : mouseEvent.clientY
              };
            }
          }
        } else {
          this.canPush = e.type !== "touchmove";
          const touchEvent = e;
          const lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
          const canvasRect = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();
          pos = {
            x: lastTouch.clientX - ((_f = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _f !== void 0 ? _f : 0),
            y: lastTouch.clientY - ((_g = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _g !== void 0 ? _g : 0)
          };
        }
        const pxRatio = container.retina.pixelRatio;
        if (pos) {
          pos.x *= pxRatio;
          pos.y *= pxRatio;
        }
        container.interactivity.mouse.position = pos;
        container.interactivity.status = mouseMoveEvent;
      }
    }
    class FrameManager {
      constructor(container) {
        this.container = container;
      }
      async nextFrame(timestamp) {
        var _a;
        try {
          const container = this.container;
          if (container.lastFrameTime !== undefined && timestamp < container.lastFrameTime + 1e3 / container.fpsLimit) {
            container.draw(false);
            return;
          }
          (_a = container.lastFrameTime) !== null && _a !== void 0 ? _a : container.lastFrameTime = timestamp;
          const deltaValue = timestamp - container.lastFrameTime, delta = {
            value: deltaValue,
            factor: 60 * deltaValue / 1e3
          };
          container.lifeTime += delta.value;
          container.lastFrameTime = timestamp;
          if (deltaValue > 1e3) {
            container.draw(false);
            return;
          }
          await container.particles.draw(delta);
          if (container.duration > 0 && container.lifeTime > container.duration) {
            container.destroy();
            return;
          }
          if (container.getAnimationStatus()) {
            container.draw(false);
          }
        } catch (e) {
          console.error("tsParticles error in animation loop", e);
        }
      }
    }
    class OptionsColor {
      constructor() {
        this.value = "";
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
    class Background {
      constructor() {
        this.color = new OptionsColor;
        this.color.value = "";
        this.image = "";
        this.position = "";
        this.repeat = "";
        this.size = "";
        this.opacity = 1;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.color !== undefined) {
          this.color = OptionsColor.create(this.color, data.color);
        }
        if (data.image !== undefined) {
          this.image = data.image;
        }
        if (data.position !== undefined) {
          this.position = data.position;
        }
        if (data.repeat !== undefined) {
          this.repeat = data.repeat;
        }
        if (data.size !== undefined) {
          this.size = data.size;
        }
        if (data.opacity !== undefined) {
          this.opacity = data.opacity;
        }
      }
    }
    class BackgroundMaskCover {
      constructor() {
        this.color = new OptionsColor;
        this.color.value = "#fff";
        this.opacity = 1;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.color !== undefined) {
          this.color = OptionsColor.create(this.color, data.color);
        }
        if (data.opacity !== undefined) {
          this.opacity = data.opacity;
        }
      }
    }
    class BackgroundMask {
      constructor() {
        this.composite = "destination-out";
        this.cover = new BackgroundMaskCover;
        this.enable = false;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.composite !== undefined) {
          this.composite = data.composite;
        }
        if (data.cover !== undefined) {
          const cover = data.cover;
          const color = typeof data.cover === "string" ? {
            color: data.cover
          } : data.cover;
          this.cover.load(cover.color !== undefined ? cover : {
            color: color
          });
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
      }
    }
    class FullScreen {
      constructor() {
        this.enable = true;
        this.zIndex = 0;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.zIndex !== undefined) {
          this.zIndex = data.zIndex;
        }
      }
    }
    class ClickEvent {
      constructor() {
        this.enable = false;
        this.mode = [];
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.mode !== undefined) {
          this.mode = data.mode;
        }
      }
    }
    class DivEvent {
      constructor() {
        this.selectors = [];
        this.enable = false;
        this.mode = [];
        this.type = "circle";
      }
      get el() {
        return this.elementId;
      }
      set el(value) {
        this.elementId = value;
      }
      get elementId() {
        return this.ids;
      }
      set elementId(value) {
        this.ids = value;
      }
      get ids() {
        return this.selectors instanceof Array ? this.selectors.map((t => t.replace("#", ""))) : this.selectors.replace("#", "");
      }
      set ids(value) {
        this.selectors = value instanceof Array ? value.map((t => `#${t}`)) : `#${value}`;
      }
      load(data) {
        var _a, _b;
        if (!data) {
          return;
        }
        const ids = (_b = (_a = data.ids) !== null && _a !== void 0 ? _a : data.elementId) !== null && _b !== void 0 ? _b : data.el;
        if (ids !== undefined) {
          this.ids = ids;
        }
        if (data.selectors !== undefined) {
          this.selectors = data.selectors;
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.mode !== undefined) {
          this.mode = data.mode;
        }
        if (data.type !== undefined) {
          this.type = data.type;
        }
      }
    }
    class Parallax {
      constructor() {
        this.enable = false;
        this.force = 2;
        this.smooth = 10;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.force !== undefined) {
          this.force = data.force;
        }
        if (data.smooth !== undefined) {
          this.smooth = data.smooth;
        }
      }
    }
    class HoverEvent {
      constructor() {
        this.enable = false;
        this.mode = [];
        this.parallax = new Parallax;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.mode !== undefined) {
          this.mode = data.mode;
        }
        this.parallax.load(data.parallax);
      }
    }
    class Events {
      constructor() {
        this.onClick = new ClickEvent;
        this.onDiv = new DivEvent;
        this.onHover = new HoverEvent;
        this.resize = true;
      }
      get onclick() {
        return this.onClick;
      }
      set onclick(value) {
        this.onClick = value;
      }
      get ondiv() {
        return this.onDiv;
      }
      set ondiv(value) {
        this.onDiv = value;
      }
      get onhover() {
        return this.onHover;
      }
      set onhover(value) {
        this.onHover = value;
      }
      load(data) {
        var _a, _b, _c;
        if (!data) {
          return;
        }
        this.onClick.load((_a = data.onClick) !== null && _a !== void 0 ? _a : data.onclick);
        const onDiv = (_b = data.onDiv) !== null && _b !== void 0 ? _b : data.ondiv;
        if (onDiv !== undefined) {
          if (onDiv instanceof Array) {
            this.onDiv = onDiv.map((div => {
              const tmp = new DivEvent;
              tmp.load(div);
              return tmp;
            }));
          } else {
            this.onDiv = new DivEvent;
            this.onDiv.load(onDiv);
          }
        }
        this.onHover.load((_c = data.onHover) !== null && _c !== void 0 ? _c : data.onhover);
        if (data.resize !== undefined) {
          this.resize = data.resize;
        }
      }
    }
    class Attract {
      constructor() {
        this.distance = 200;
        this.duration = .4;
        this.easing = "ease-out-quad";
        this.factor = 1;
        this.maxSpeed = 50;
        this.speed = 1;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.distance !== undefined) {
          this.distance = data.distance;
        }
        if (data.duration !== undefined) {
          this.duration = data.duration;
        }
        if (data.easing !== undefined) {
          this.easing = data.easing;
        }
        if (data.factor !== undefined) {
          this.factor = data.factor;
        }
        if (data.maxSpeed !== undefined) {
          this.maxSpeed = data.maxSpeed;
        }
        if (data.speed !== undefined) {
          this.speed = data.speed;
        }
      }
    }
    class Bounce {
      constructor() {
        this.distance = 200;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.distance !== undefined) {
          this.distance = data.distance;
        }
      }
    }
    class BubbleBase {
      constructor() {
        this.distance = 200;
        this.duration = .4;
        this.mix = false;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.distance !== undefined) {
          this.distance = data.distance;
        }
        if (data.duration !== undefined) {
          this.duration = data.duration;
        }
        if (data.mix !== undefined) {
          this.mix = data.mix;
        }
        if (data.opacity !== undefined) {
          this.opacity = data.opacity;
        }
        if (data.color !== undefined) {
          if (data.color instanceof Array) {
            this.color = data.color.map((s => OptionsColor.create(undefined, s)));
          } else {
            if (this.color instanceof Array) {
              this.color = new OptionsColor;
            }
            this.color = OptionsColor.create(this.color, data.color);
          }
        }
        if (data.size !== undefined) {
          this.size = data.size;
        }
      }
    }
    class BubbleDiv extends BubbleBase {
      constructor() {
        super();
        this.selectors = [];
      }
      get ids() {
        return this.selectors instanceof Array ? this.selectors.map((t => t.replace("#", ""))) : this.selectors.replace("#", "");
      }
      set ids(value) {
        this.selectors = value instanceof Array ? value.map((t => `#${t}`)) : `#${value}`;
      }
      load(data) {
        super.load(data);
        if (!data) {
          return;
        }
        if (data.ids !== undefined) {
          this.ids = data.ids;
        }
        if (data.selectors !== undefined) {
          this.selectors = data.selectors;
        }
      }
    }
    class Bubble extends BubbleBase {
      load(data) {
        super.load(data);
        if (!data) {
          return;
        }
        if (data.divs instanceof Array) {
          this.divs = data.divs.map((s => {
            const tmp = new BubbleDiv;
            tmp.load(s);
            return tmp;
          }));
        } else {
          if (this.divs instanceof Array || !this.divs) {
            this.divs = new BubbleDiv;
          }
          this.divs.load(data.divs);
        }
      }
    }
    class ConnectLinks {
      constructor() {
        this.opacity = .5;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.opacity !== undefined) {
          this.opacity = data.opacity;
        }
      }
    }
    class Connect {
      constructor() {
        this.distance = 80;
        this.links = new ConnectLinks;
        this.radius = 60;
      }
      get lineLinked() {
        return this.links;
      }
      set lineLinked(value) {
        this.links = value;
      }
      get line_linked() {
        return this.links;
      }
      set line_linked(value) {
        this.links = value;
      }
      load(data) {
        var _a, _b;
        if (!data) {
          return;
        }
        if (data.distance !== undefined) {
          this.distance = data.distance;
        }
        this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);
        if (data.radius !== undefined) {
          this.radius = data.radius;
        }
      }
    }
    class GrabLinks {
      constructor() {
        this.blink = false;
        this.consent = false;
        this.opacity = 1;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.blink !== undefined) {
          this.blink = data.blink;
        }
        if (data.color !== undefined) {
          this.color = OptionsColor.create(this.color, data.color);
        }
        if (data.consent !== undefined) {
          this.consent = data.consent;
        }
        if (data.opacity !== undefined) {
          this.opacity = data.opacity;
        }
      }
    }
    class Grab {
      constructor() {
        this.distance = 100;
        this.links = new GrabLinks;
      }
      get lineLinked() {
        return this.links;
      }
      set lineLinked(value) {
        this.links = value;
      }
      get line_linked() {
        return this.links;
      }
      set line_linked(value) {
        this.links = value;
      }
      load(data) {
        var _a, _b;
        if (!data) {
          return;
        }
        if (data.distance !== undefined) {
          this.distance = data.distance;
        }
        this.links.load((_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked);
      }
    }
    class LightGradient {
      constructor() {
        this.start = new OptionsColor;
        this.stop = new OptionsColor;
        this.start.value = "#ffffff";
        this.stop.value = "#000000";
      }
      load(data) {
        if (!data) {
          return;
        }
        this.start = OptionsColor.create(this.start, data.start);
        this.stop = OptionsColor.create(this.stop, data.stop);
      }
    }
    class LightArea {
      constructor() {
        this.gradient = new LightGradient;
        this.radius = 1e3;
      }
      load(data) {
        if (!data) {
          return;
        }
        this.gradient.load(data.gradient);
        if (data.radius !== undefined) {
          this.radius = data.radius;
        }
      }
    }
    class LightShadow {
      constructor() {
        this.color = new OptionsColor;
        this.color.value = "#000000";
        this.length = 2e3;
      }
      load(data) {
        if (!data) {
          return;
        }
        this.color = OptionsColor.create(this.color, data.color);
        if (data.length !== undefined) {
          this.length = data.length;
        }
      }
    }
    class Light {
      constructor() {
        this.area = new LightArea;
        this.shadow = new LightShadow;
      }
      load(data) {
        if (!data) {
          return;
        }
        this.area.load(data.area);
        this.shadow.load(data.shadow);
      }
    }
    class Push {
      constructor() {
        this.default = true;
        this.groups = [];
        this.quantity = 4;
      }
      get particles_nb() {
        return this.quantity;
      }
      set particles_nb(value) {
        this.quantity = value;
      }
      load(data) {
        var _a;
        if (!data) {
          return;
        }
        if (data.default !== undefined) {
          this.default = data.default;
        }
        if (data.groups !== undefined) {
          this.groups = data.groups.map((t => t));
        }
        if (!this.groups.length) {
          this.default = true;
        }
        const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;
        if (quantity !== undefined) {
          this.quantity = quantity;
        }
      }
    }
    class Remove {
      constructor() {
        this.quantity = 2;
      }
      get particles_nb() {
        return this.quantity;
      }
      set particles_nb(value) {
        this.quantity = value;
      }
      load(data) {
        var _a;
        if (!data) {
          return;
        }
        const quantity = (_a = data.quantity) !== null && _a !== void 0 ? _a : data.particles_nb;
        if (quantity !== undefined) {
          this.quantity = quantity;
        }
      }
    }
    class RepulseBase {
      constructor() {
        this.distance = 200;
        this.duration = .4;
        this.factor = 100;
        this.speed = 1;
        this.maxSpeed = 50;
        this.easing = "ease-out-quad";
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.distance !== undefined) {
          this.distance = data.distance;
        }
        if (data.duration !== undefined) {
          this.duration = data.duration;
        }
        if (data.easing !== undefined) {
          this.easing = data.easing;
        }
        if (data.factor !== undefined) {
          this.factor = data.factor;
        }
        if (data.speed !== undefined) {
          this.speed = data.speed;
        }
        if (data.maxSpeed !== undefined) {
          this.maxSpeed = data.maxSpeed;
        }
      }
    }
    class RepulseDiv extends RepulseBase {
      constructor() {
        super();
        this.selectors = [];
      }
      get ids() {
        if (this.selectors instanceof Array) {
          return this.selectors.map((t => t.replace("#", "")));
        } else {
          return this.selectors.replace("#", "");
        }
      }
      set ids(value) {
        if (value instanceof Array) {
          this.selectors = value.map((() => `#${value}`));
        } else {
          this.selectors = `#${value}`;
        }
      }
      load(data) {
        super.load(data);
        if (!data) {
          return;
        }
        if (data.ids !== undefined) {
          this.ids = data.ids;
        }
        if (data.selectors !== undefined) {
          this.selectors = data.selectors;
        }
      }
    }
    class Repulse extends RepulseBase {
      load(data) {
        super.load(data);
        if (!data) {
          return;
        }
        if (data.divs instanceof Array) {
          this.divs = data.divs.map((s => {
            const tmp = new RepulseDiv;
            tmp.load(s);
            return tmp;
          }));
        } else {
          if (this.divs instanceof Array || !this.divs) {
            this.divs = new RepulseDiv;
          }
          this.divs.load(data.divs);
        }
      }
    }
    class Slow {
      constructor() {
        this.factor = 3;
        this.radius = 200;
      }
      get active() {
        return false;
      }
      set active(_value) {}
      load(data) {
        if (!data) {
          return;
        }
        if (data.factor !== undefined) {
          this.factor = data.factor;
        }
        if (data.radius !== undefined) {
          this.radius = data.radius;
        }
      }
    }
    class Trail {
      constructor() {
        this.delay = 1;
        this.pauseOnStop = false;
        this.quantity = 1;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.delay !== undefined) {
          this.delay = data.delay;
        }
        if (data.quantity !== undefined) {
          this.quantity = data.quantity;
        }
        if (data.particles !== undefined) {
          this.particles = deepExtend({}, data.particles);
        }
        if (data.pauseOnStop !== undefined) {
          this.pauseOnStop = data.pauseOnStop;
        }
      }
    }
    class Modes {
      constructor() {
        this.attract = new Attract;
        this.bounce = new Bounce;
        this.bubble = new Bubble;
        this.connect = new Connect;
        this.grab = new Grab;
        this.light = new Light;
        this.push = new Push;
        this.remove = new Remove;
        this.repulse = new Repulse;
        this.slow = new Slow;
        this.trail = new Trail;
      }
      load(data) {
        if (!data) {
          return;
        }
        this.attract.load(data.attract);
        this.bubble.load(data.bubble);
        this.connect.load(data.connect);
        this.grab.load(data.grab);
        this.light.load(data.light);
        this.push.load(data.push);
        this.remove.load(data.remove);
        this.repulse.load(data.repulse);
        this.slow.load(data.slow);
        this.trail.load(data.trail);
      }
    }
    class Interactivity {
      constructor() {
        this.detectsOn = "window";
        this.events = new Events;
        this.modes = new Modes;
      }
      get detect_on() {
        return this.detectsOn;
      }
      set detect_on(value) {
        this.detectsOn = value;
      }
      load(data) {
        var _a, _b, _c;
        if (!data) {
          return;
        }
        const detectsOn = (_a = data.detectsOn) !== null && _a !== void 0 ? _a : data.detect_on;
        if (detectsOn !== undefined) {
          this.detectsOn = detectsOn;
        }
        this.events.load(data.events);
        this.modes.load(data.modes);
        if (((_c = (_b = data.modes) === null || _b === void 0 ? void 0 : _b.slow) === null || _c === void 0 ? void 0 : _c.active) === true) {
          if (this.events.onHover.mode instanceof Array) {
            if (this.events.onHover.mode.indexOf("slow") < 0) {
              this.events.onHover.mode.push("slow");
            }
          } else if (this.events.onHover.mode !== "slow") {
            this.events.onHover.mode = [ this.events.onHover.mode, "slow" ];
          }
        }
      }
    }
    class ManualParticle {
      load(data) {
        var _a, _b;
        if (!data) {
          return;
        }
        if (data.position !== undefined) {
          this.position = {
            x: (_a = data.position.x) !== null && _a !== void 0 ? _a : 50,
            y: (_b = data.position.y) !== null && _b !== void 0 ? _b : 50
          };
        }
        if (data.options !== undefined) {
          this.options = deepExtend({}, data.options);
        }
      }
    }
    class MotionReduce {
      constructor() {
        this.factor = 4;
        this.value = true;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.factor !== undefined) {
          this.factor = data.factor;
        }
        if (data.value !== undefined) {
          this.value = data.value;
        }
      }
    }
    class Motion {
      constructor() {
        this.disable = false;
        this.reduce = new MotionReduce;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.disable !== undefined) {
          this.disable = data.disable;
        }
        this.reduce.load(data.reduce);
      }
    }
    class Responsive {
      constructor() {
        this.maxWidth = Infinity;
        this.options = {};
        this.mode = "canvas";
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.maxWidth !== undefined) {
          this.maxWidth = data.maxWidth;
        }
        if (data.mode !== undefined) {
          if (data.mode === "screen") {
            this.mode = "screen";
          } else {
            this.mode = "canvas";
          }
        }
        if (data.options !== undefined) {
          this.options = deepExtend({}, data.options);
        }
      }
    }
    class ThemeDefault {
      constructor() {
        this.auto = false;
        this.mode = "any";
        this.value = false;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.auto !== undefined) {
          this.auto = data.auto;
        }
        if (data.mode !== undefined) {
          this.mode = data.mode;
        }
        if (data.value !== undefined) {
          this.value = data.value;
        }
      }
    }
    class Theme {
      constructor() {
        this.name = "";
        this.default = new ThemeDefault;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.name !== undefined) {
          this.name = data.name;
        }
        this.default.load(data.default);
        if (data.options !== undefined) {
          this.options = deepExtend({}, data.options);
        }
      }
    }
    class ColorAnimation {
      constructor() {
        this.count = 0;
        this.enable = false;
        this.offset = 0;
        this.speed = 1;
        this.decay = 0;
        this.sync = true;
      }
      load(data) {
        if (!data) {
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
        if (data.decay !== undefined) {
          this.decay = setRangeValue(data.decay);
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
    class GradientColorOpacityAnimation {
      constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 0;
        this.decay = 0;
        this.sync = false;
        this.startValue = "random";
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.count !== undefined) {
          this.count = setRangeValue(data.count);
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.speed !== undefined) {
          this.speed = setRangeValue(data.speed);
        }
        if (data.sync !== undefined) {
          this.sync = data.sync;
        }
        if (data.startValue !== undefined) {
          this.startValue = data.startValue;
        }
      }
    }
    class GradientColorOpacity {
      constructor() {
        this.value = 0;
        this.animation = new GradientColorOpacityAnimation;
      }
      load(data) {
        if (!data) {
          return;
        }
        this.animation.load(data.animation);
        if (data.value !== undefined) {
          this.value = setRangeValue(data.value);
        }
      }
    }
    class AnimatableGradientColor {
      constructor() {
        this.stop = 0;
        this.value = new AnimatableColor;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.stop !== undefined) {
          this.stop = data.stop;
        }
        this.value = AnimatableColor.create(this.value, data.value);
        if (data.opacity !== undefined) {
          this.opacity = new GradientColorOpacity;
          if (typeof data.opacity === "number") {
            this.opacity.value = data.opacity;
          } else {
            this.opacity.load(data.opacity);
          }
        }
      }
    }
    class GradientAngleAnimation {
      constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 0;
        this.decay = 0;
        this.sync = false;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.count !== undefined) {
          this.count = setRangeValue(data.count);
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.speed !== undefined) {
          this.speed = setRangeValue(data.speed);
        }
        if (data.decay !== undefined) {
          this.decay = setRangeValue(data.decay);
        }
        if (data.sync !== undefined) {
          this.sync = data.sync;
        }
      }
    }
    class GradientAngle {
      constructor() {
        this.value = 0;
        this.animation = new GradientAngleAnimation;
        this.direction = "clockwise";
      }
      load(data) {
        if (!data) {
          return;
        }
        this.animation.load(data.animation);
        if (data.value !== undefined) {
          this.value = data.value;
        }
        if (data.direction !== undefined) {
          this.direction = data.direction;
        }
      }
    }
    class AnimatableGradient {
      constructor() {
        this.angle = new GradientAngle;
        this.colors = [];
        this.type = "random";
      }
      load(data) {
        if (!data) {
          return;
        }
        this.angle.load(data.angle);
        if (data.colors !== undefined) {
          this.colors = data.colors.map((s => {
            const tmp = new AnimatableGradientColor;
            tmp.load(s);
            return tmp;
          }));
        }
        if (data.type !== undefined) {
          this.type = data.type;
        }
      }
    }
    class CollisionsOverlap {
      constructor() {
        this.enable = true;
        this.retries = 0;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.retries !== undefined) {
          this.retries = data.retries;
        }
      }
    }
    class Random {
      constructor() {
        this.enable = false;
        this.minimumValue = 0;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.minimumValue !== undefined) {
          this.minimumValue = data.minimumValue;
        }
      }
    }
    class ValueWithRandom {
      constructor() {
        this.random = new Random;
        this.value = 0;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (typeof data.random === "boolean") {
          this.random.enable = data.random;
        } else {
          this.random.load(data.random);
        }
        if (data.value !== undefined) {
          this.value = setRangeValue(data.value, this.random.enable ? this.random.minimumValue : undefined);
        }
      }
    }
    class ParticlesBounceFactor extends ValueWithRandom {
      constructor() {
        super();
        this.random.minimumValue = .1;
        this.value = 1;
      }
    }
    class ParticlesBounce {
      constructor() {
        this.horizontal = new ParticlesBounceFactor;
        this.vertical = new ParticlesBounceFactor;
      }
      load(data) {
        if (!data) {
          return;
        }
        this.horizontal.load(data.horizontal);
        this.vertical.load(data.vertical);
      }
    }
    class Collisions {
      constructor() {
        this.bounce = new ParticlesBounce;
        this.enable = false;
        this.mode = "bounce";
        this.overlap = new CollisionsOverlap;
      }
      load(data) {
        if (!data) {
          return;
        }
        this.bounce.load(data.bounce);
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.mode !== undefined) {
          this.mode = data.mode;
        }
        this.overlap.load(data.overlap);
      }
    }
    class SplitFactor extends ValueWithRandom {
      constructor() {
        super();
        this.value = 3;
      }
    }
    class SplitRate extends ValueWithRandom {
      constructor() {
        super();
        this.value = {
          min: 4,
          max: 9
        };
      }
    }
    class Split {
      constructor() {
        this.count = 1;
        this.factor = new SplitFactor;
        this.rate = new SplitRate;
        this.sizeOffset = true;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.count !== undefined) {
          this.count = data.count;
        }
        this.factor.load(data.factor);
        this.rate.load(data.rate);
        if (data.particles !== undefined) {
          if (data.particles instanceof Array) {
            this.particles = data.particles.map((s => deepExtend({}, s)));
          } else {
            this.particles = deepExtend({}, data.particles);
          }
        }
        if (data.sizeOffset !== undefined) {
          this.sizeOffset = data.sizeOffset;
        }
      }
    }
    class Destroy {
      constructor() {
        this.mode = "none";
        this.split = new Split;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.mode !== undefined) {
          this.mode = data.mode;
        }
        this.split.load(data.split);
      }
    }
    class LinksShadow {
      constructor() {
        this.blur = 5;
        this.color = new OptionsColor;
        this.color.value = "#000";
        this.enable = false;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.blur !== undefined) {
          this.blur = data.blur;
        }
        this.color = OptionsColor.create(this.color, data.color);
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
      }
    }
    class LinksTriangle {
      constructor() {
        this.enable = false;
        this.frequency = 1;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.color !== undefined) {
          this.color = OptionsColor.create(this.color, data.color);
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.frequency !== undefined) {
          this.frequency = data.frequency;
        }
        if (data.opacity !== undefined) {
          this.opacity = data.opacity;
        }
      }
    }
    class Links {
      constructor() {
        this.blink = false;
        this.color = new OptionsColor;
        this.color.value = "#fff";
        this.consent = false;
        this.distance = 100;
        this.enable = false;
        this.frequency = 1;
        this.opacity = 1;
        this.shadow = new LinksShadow;
        this.triangles = new LinksTriangle;
        this.width = 1;
        this.warp = false;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.id !== undefined) {
          this.id = data.id;
        }
        if (data.blink !== undefined) {
          this.blink = data.blink;
        }
        this.color = OptionsColor.create(this.color, data.color);
        if (data.consent !== undefined) {
          this.consent = data.consent;
        }
        if (data.distance !== undefined) {
          this.distance = data.distance;
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.frequency !== undefined) {
          this.frequency = data.frequency;
        }
        if (data.opacity !== undefined) {
          this.opacity = data.opacity;
        }
        this.shadow.load(data.shadow);
        this.triangles.load(data.triangles);
        if (data.width !== undefined) {
          this.width = data.width;
        }
        if (data.warp !== undefined) {
          this.warp = data.warp;
        }
      }
    }
    class MoveAngle {
      constructor() {
        this.offset = 0;
        this.value = 90;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.offset !== undefined) {
          this.offset = setRangeValue(data.offset);
        }
        if (data.value !== undefined) {
          this.value = setRangeValue(data.value);
        }
      }
    }
    class MoveAttract {
      constructor() {
        this.distance = 200;
        this.enable = false;
        this.rotate = {
          x: 3e3,
          y: 3e3
        };
      }
      get rotateX() {
        return this.rotate.x;
      }
      set rotateX(value) {
        this.rotate.x = value;
      }
      get rotateY() {
        return this.rotate.y;
      }
      set rotateY(value) {
        this.rotate.y = value;
      }
      load(data) {
        var _a, _b, _c, _d;
        if (!data) {
          return;
        }
        if (data.distance !== undefined) {
          this.distance = setRangeValue(data.distance);
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        const rotateX = (_b = (_a = data.rotate) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : data.rotateX;
        if (rotateX !== undefined) {
          this.rotate.x = rotateX;
        }
        const rotateY = (_d = (_c = data.rotate) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : data.rotateY;
        if (rotateY !== undefined) {
          this.rotate.y = rotateY;
        }
      }
    }
    class MoveGravity {
      constructor() {
        this.acceleration = 9.81;
        this.enable = false;
        this.inverse = false;
        this.maxSpeed = 50;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.acceleration !== undefined) {
          this.acceleration = setRangeValue(data.acceleration);
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.inverse !== undefined) {
          this.inverse = data.inverse;
        }
        if (data.maxSpeed !== undefined) {
          this.maxSpeed = setRangeValue(data.maxSpeed);
        }
      }
    }
    class MovePathDelay extends ValueWithRandom {
      constructor() {
        super();
      }
    }
    class MovePath {
      constructor() {
        this.clamp = true;
        this.delay = new MovePathDelay;
        this.enable = false;
        this.options = {};
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.clamp !== undefined) {
          this.clamp = data.clamp;
        }
        this.delay.load(data.delay);
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        this.generator = data.generator;
        if (data.options) {
          this.options = deepExtend(this.options, data.options);
        }
      }
    }
    class MoveTrail {
      constructor() {
        this.enable = false;
        this.length = 10;
        this.fillColor = new OptionsColor;
        this.fillColor.value = "#000000";
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        this.fillColor = OptionsColor.create(this.fillColor, data.fillColor);
        if (data.length !== undefined) {
          this.length = data.length;
        }
      }
    }
    class OutModes {
      constructor() {
        this.default = "out";
      }
      load(data) {
        var _a, _b, _c, _d;
        if (!data) {
          return;
        }
        if (data.default !== undefined) {
          this.default = data.default;
        }
        this.bottom = (_a = data.bottom) !== null && _a !== void 0 ? _a : data.default;
        this.left = (_b = data.left) !== null && _b !== void 0 ? _b : data.default;
        this.right = (_c = data.right) !== null && _c !== void 0 ? _c : data.default;
        this.top = (_d = data.top) !== null && _d !== void 0 ? _d : data.default;
      }
    }
    class Spin {
      constructor() {
        this.acceleration = 0;
        this.enable = false;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.acceleration !== undefined) {
          this.acceleration = setRangeValue(data.acceleration);
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        this.position = data.position ? deepExtend({}, data.position) : undefined;
      }
    }
    class Move {
      constructor() {
        this.angle = new MoveAngle;
        this.attract = new MoveAttract;
        this.center = {
          x: 50,
          y: 50,
          radius: 0
        };
        this.decay = 0;
        this.distance = {};
        this.direction = "none";
        this.drift = 0;
        this.enable = false;
        this.gravity = new MoveGravity;
        this.path = new MovePath;
        this.outModes = new OutModes;
        this.random = false;
        this.size = false;
        this.speed = 2;
        this.spin = new Spin;
        this.straight = false;
        this.trail = new MoveTrail;
        this.vibrate = false;
        this.warp = false;
      }
      get bounce() {
        return this.collisions;
      }
      set bounce(value) {
        this.collisions = value;
      }
      get collisions() {
        return false;
      }
      set collisions(value) {}
      get noise() {
        return this.path;
      }
      set noise(value) {
        this.path = value;
      }
      get outMode() {
        return this.outModes.default;
      }
      set outMode(value) {
        this.outModes.default = value;
      }
      get out_mode() {
        return this.outMode;
      }
      set out_mode(value) {
        this.outMode = value;
      }
      load(data) {
        var _a, _b, _c;
        if (!data) {
          return;
        }
        if (data.angle !== undefined) {
          if (typeof data.angle === "number") {
            this.angle.value = data.angle;
          } else {
            this.angle.load(data.angle);
          }
        }
        this.attract.load(data.attract);
        this.center = deepExtend(this.center, data.center);
        if (data.decay !== undefined) {
          this.decay = data.decay;
        }
        if (data.direction !== undefined) {
          this.direction = data.direction;
        }
        if (data.distance !== undefined) {
          this.distance = typeof data.distance === "number" ? {
            horizontal: data.distance,
            vertical: data.distance
          } : deepExtend({}, data.distance);
        }
        if (data.drift !== undefined) {
          this.drift = setRangeValue(data.drift);
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        this.gravity.load(data.gravity);
        const outMode = (_a = data.outMode) !== null && _a !== void 0 ? _a : data.out_mode;
        if (data.outModes !== undefined || outMode !== undefined) {
          if (typeof data.outModes === "string" || data.outModes === undefined && outMode !== undefined) {
            this.outModes.load({
              default: (_b = data.outModes) !== null && _b !== void 0 ? _b : outMode
            });
          } else {
            this.outModes.load(data.outModes);
          }
        }
        this.path.load((_c = data.path) !== null && _c !== void 0 ? _c : data.noise);
        if (data.random !== undefined) {
          this.random = data.random;
        }
        if (data.size !== undefined) {
          this.size = data.size;
        }
        if (data.speed !== undefined) {
          this.speed = setRangeValue(data.speed);
        }
        this.spin.load(data.spin);
        if (data.straight !== undefined) {
          this.straight = data.straight;
        }
        this.trail.load(data.trail);
        if (data.vibrate !== undefined) {
          this.vibrate = data.vibrate;
        }
        if (data.warp !== undefined) {
          this.warp = data.warp;
        }
      }
    }
    class AnimationOptions {
      constructor() {
        this.count = 0;
        this.enable = false;
        this.speed = 1;
        this.decay = 0;
        this.sync = false;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.count !== undefined) {
          this.count = setRangeValue(data.count);
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.speed !== undefined) {
          this.speed = setRangeValue(data.speed);
        }
        if (data.decay !== undefined) {
          this.decay = setRangeValue(data.decay);
        }
        if (data.sync !== undefined) {
          this.sync = data.sync;
        }
      }
    }
    class OpacityAnimation extends AnimationOptions {
      constructor() {
        super();
        this.destroy = "none";
        this.enable = false;
        this.speed = 2;
        this.startValue = "random";
        this.sync = false;
      }
      get opacity_min() {
        return this.minimumValue;
      }
      set opacity_min(value) {
        this.minimumValue = value;
      }
      load(data) {
        var _a;
        if (!data) {
          return;
        }
        super.load(data);
        if (data.destroy !== undefined) {
          this.destroy = data.destroy;
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        this.minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.opacity_min;
        if (data.speed !== undefined) {
          this.speed = data.speed;
        }
        if (data.startValue !== undefined) {
          this.startValue = data.startValue;
        }
        if (data.sync !== undefined) {
          this.sync = data.sync;
        }
      }
    }
    class Opacity extends ValueWithRandom {
      constructor() {
        super();
        this.animation = new OpacityAnimation;
        this.random.minimumValue = .1;
        this.value = 1;
      }
      get anim() {
        return this.animation;
      }
      set anim(value) {
        this.animation = value;
      }
      load(data) {
        var _a;
        if (!data) {
          return;
        }
        super.load(data);
        const animation = (_a = data.animation) !== null && _a !== void 0 ? _a : data.anim;
        if (animation !== undefined) {
          this.animation.load(animation);
          this.value = setRangeValue(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
        }
      }
    }
    class ParticlesDensity {
      constructor() {
        this.enable = false;
        this.area = 800;
        this.factor = 1e3;
      }
      get value_area() {
        return this.area;
      }
      set value_area(value) {
        this.area = value;
      }
      load(data) {
        var _a;
        if (!data) {
          return;
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        const area = (_a = data.area) !== null && _a !== void 0 ? _a : data.value_area;
        if (area !== undefined) {
          this.area = area;
        }
        if (data.factor !== undefined) {
          this.factor = data.factor;
        }
      }
    }
    class ParticlesNumber {
      constructor() {
        this.density = new ParticlesDensity;
        this.limit = 0;
        this.value = 100;
      }
      get max() {
        return this.limit;
      }
      set max(value) {
        this.limit = value;
      }
      load(data) {
        var _a;
        if (!data) {
          return;
        }
        this.density.load(data.density);
        const limit = (_a = data.limit) !== null && _a !== void 0 ? _a : data.max;
        if (limit !== undefined) {
          this.limit = limit;
        }
        if (data.value !== undefined) {
          this.value = data.value;
        }
      }
    }
    class ParticlesRepulse extends ValueWithRandom {
      constructor() {
        super();
        this.enabled = false;
        this.distance = 1;
        this.duration = 1;
        this.factor = 1;
        this.speed = 1;
      }
      load(data) {
        super.load(data);
        if (!data) {
          return;
        }
        if (data.enabled !== undefined) {
          this.enabled = data.enabled;
        }
        if (data.distance !== undefined) {
          this.distance = setRangeValue(data.distance);
        }
        if (data.duration !== undefined) {
          this.duration = setRangeValue(data.duration);
        }
        if (data.factor !== undefined) {
          this.factor = setRangeValue(data.factor);
        }
        if (data.speed !== undefined) {
          this.speed = setRangeValue(data.speed);
        }
      }
    }
    class RotateAnimation {
      constructor() {
        this.enable = false;
        this.speed = 0;
        this.decay = 0;
        this.sync = false;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.speed !== undefined) {
          this.speed = setRangeValue(data.speed);
        }
        if (data.decay !== undefined) {
          this.decay = setRangeValue(data.decay);
        }
        if (data.sync !== undefined) {
          this.sync = data.sync;
        }
      }
    }
    class Rotate extends ValueWithRandom {
      constructor() {
        super();
        this.animation = new RotateAnimation;
        this.direction = "clockwise";
        this.path = false;
        this.value = 0;
      }
      load(data) {
        if (!data) {
          return;
        }
        super.load(data);
        if (data.direction !== undefined) {
          this.direction = data.direction;
        }
        this.animation.load(data.animation);
        if (data.path !== undefined) {
          this.path = data.path;
        }
      }
    }
    class Shadow {
      constructor() {
        this.blur = 0;
        this.color = new OptionsColor;
        this.enable = false;
        this.offset = {
          x: 0,
          y: 0
        };
        this.color.value = "#000";
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.blur !== undefined) {
          this.blur = data.blur;
        }
        this.color = OptionsColor.create(this.color, data.color);
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        if (data.offset === undefined) {
          return;
        }
        if (data.offset.x !== undefined) {
          this.offset.x = data.offset.x;
        }
        if (data.offset.y !== undefined) {
          this.offset.y = data.offset.y;
        }
      }
    }
    class Shape {
      constructor() {
        this.options = {};
        this.type = "circle";
      }
      get character() {
        var _a;
        return (_a = this.options["character"]) !== null && _a !== void 0 ? _a : this.options["char"];
      }
      set character(value) {
        this.options["character"] = value;
        this.options["char"] = value;
      }
      get custom() {
        return this.options;
      }
      set custom(value) {
        this.options = value;
      }
      get image() {
        var _a;
        return (_a = this.options["image"]) !== null && _a !== void 0 ? _a : this.options["images"];
      }
      set image(value) {
        this.options["image"] = value;
        this.options["images"] = value;
      }
      get images() {
        return this.image;
      }
      set images(value) {
        this.image = value;
      }
      get polygon() {
        var _a;
        return (_a = this.options["polygon"]) !== null && _a !== void 0 ? _a : this.options["star"];
      }
      set polygon(value) {
        this.options["polygon"] = value;
        this.options["star"] = value;
      }
      get stroke() {
        return [];
      }
      set stroke(_value) {}
      load(data) {
        var _a, _b, _c;
        if (!data) {
          return;
        }
        const options = (_a = data.options) !== null && _a !== void 0 ? _a : data.custom;
        if (options !== undefined) {
          for (const shape in options) {
            const item = options[shape];
            if (item) {
              this.options[shape] = deepExtend((_b = this.options[shape]) !== null && _b !== void 0 ? _b : {}, item);
            }
          }
        }
        this.loadShape(data.character, "character", "char", true);
        this.loadShape(data.polygon, "polygon", "star", false);
        this.loadShape((_c = data.image) !== null && _c !== void 0 ? _c : data.images, "image", "images", true);
        if (data.type !== undefined) {
          this.type = data.type;
        }
      }
      loadShape(item, mainKey, altKey, altOverride) {
        var _a, _b, _c, _d;
        if (item === undefined) {
          return;
        }
        if (item instanceof Array) {
          if (!(this.options[mainKey] instanceof Array)) {
            this.options[mainKey] = [];
            if (!this.options[altKey] || altOverride) {
              this.options[altKey] = [];
            }
          }
          this.options[mainKey] = deepExtend((_a = this.options[mainKey]) !== null && _a !== void 0 ? _a : [], item);
          if (!this.options[altKey] || altOverride) {
            this.options[altKey] = deepExtend((_b = this.options[altKey]) !== null && _b !== void 0 ? _b : [], item);
          }
        } else {
          if (this.options[mainKey] instanceof Array) {
            this.options[mainKey] = {};
            if (!this.options[altKey] || altOverride) {
              this.options[altKey] = {};
            }
          }
          this.options[mainKey] = deepExtend((_c = this.options[mainKey]) !== null && _c !== void 0 ? _c : {}, item);
          if (!this.options[altKey] || altOverride) {
            this.options[altKey] = deepExtend((_d = this.options[altKey]) !== null && _d !== void 0 ? _d : {}, item);
          }
        }
      }
    }
    class SizeAnimation extends AnimationOptions {
      constructor() {
        super();
        this.destroy = "none";
        this.enable = false;
        this.speed = 5;
        this.startValue = "random";
        this.sync = false;
      }
      get size_min() {
        return this.minimumValue;
      }
      set size_min(value) {
        this.minimumValue = value;
      }
      load(data) {
        var _a;
        super.load(data);
        if (!data) {
          return;
        }
        if (data.destroy !== undefined) {
          this.destroy = data.destroy;
        }
        if (data.enable !== undefined) {
          this.enable = data.enable;
        }
        this.minimumValue = (_a = data.minimumValue) !== null && _a !== void 0 ? _a : data.size_min;
        if (data.speed !== undefined) {
          this.speed = data.speed;
        }
        if (data.startValue !== undefined) {
          this.startValue = data.startValue;
        }
        if (data.sync !== undefined) {
          this.sync = data.sync;
        }
      }
    }
    class Size extends ValueWithRandom {
      constructor() {
        super();
        this.animation = new SizeAnimation;
        this.random.minimumValue = 1;
        this.value = 3;
      }
      get anim() {
        return this.animation;
      }
      set anim(value) {
        this.animation = value;
      }
      load(data) {
        var _a;
        super.load(data);
        if (!data) {
          return;
        }
        const animation = (_a = data.animation) !== null && _a !== void 0 ? _a : data.anim;
        if (animation !== undefined) {
          this.animation.load(animation);
          this.value = setRangeValue(this.value, this.animation.enable ? this.animation.minimumValue : undefined);
        }
      }
    }
    class Stroke {
      constructor() {
        this.width = 0;
      }
      load(data) {
        if (!data) {
          return;
        }
        if (data.color !== undefined) {
          this.color = AnimatableColor.create(this.color, data.color);
        }
        if (data.width !== undefined) {
          this.width = data.width;
        }
        if (data.opacity !== undefined) {
          this.opacity = data.opacity;
        }
      }
    }
    class ZIndex extends ValueWithRandom {
      constructor() {
        super();
        this.opacityRate = 1;
        this.sizeRate = 1;
        this.velocityRate = 1;
      }
      load(data) {
        super.load(data);
        if (!data) {
          return;
        }
        if (data.opacityRate !== undefined) {
          this.opacityRate = data.opacityRate;
        }
        if (data.sizeRate !== undefined) {
          this.sizeRate = data.sizeRate;
        }
        if (data.velocityRate !== undefined) {
          this.velocityRate = data.velocityRate;
        }
      }
    }
    var ParticlesOptions_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), 
      value;
    };
    var ParticlesOptions_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _ParticlesOptions_container, _ParticlesOptions_engine;
    class ParticlesOptions {
      constructor(engine, container) {
        _ParticlesOptions_container.set(this, void 0);
        _ParticlesOptions_engine.set(this, void 0);
        ParticlesOptions_classPrivateFieldSet(this, _ParticlesOptions_engine, engine, "f");
        ParticlesOptions_classPrivateFieldSet(this, _ParticlesOptions_container, container, "f");
        this.bounce = new ParticlesBounce;
        this.collisions = new Collisions;
        this.color = new AnimatableColor;
        this.color.value = "#fff";
        this.destroy = new Destroy;
        this.gradient = [];
        this.groups = {};
        this.links = new Links;
        this.move = new Move;
        this.number = new ParticlesNumber;
        this.opacity = new Opacity;
        this.reduceDuplicates = false;
        this.repulse = new ParticlesRepulse;
        this.rotate = new Rotate;
        this.shadow = new Shadow;
        this.shape = new Shape;
        this.size = new Size;
        this.stroke = new Stroke;
        this.zIndex = new ZIndex;
      }
      get lineLinked() {
        return this.links;
      }
      set lineLinked(value) {
        this.links = value;
      }
      get line_linked() {
        return this.links;
      }
      set line_linked(value) {
        this.links = value;
      }
      load(data) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (!data) {
          return;
        }
        this.bounce.load(data.bounce);
        this.color.load(AnimatableColor.create(this.color, data.color));
        this.destroy.load(data.destroy);
        const links = (_b = (_a = data.links) !== null && _a !== void 0 ? _a : data.lineLinked) !== null && _b !== void 0 ? _b : data.line_linked;
        if (links !== undefined) {
          this.links.load(links);
        }
        if (data.groups !== undefined) {
          for (const group in data.groups) {
            const item = data.groups[group];
            if (item !== undefined) {
              this.groups[group] = deepExtend((_c = this.groups[group]) !== null && _c !== void 0 ? _c : {}, item);
            }
          }
        }
        this.move.load(data.move);
        this.number.load(data.number);
        this.opacity.load(data.opacity);
        if (data.reduceDuplicates !== undefined) {
          this.reduceDuplicates = data.reduceDuplicates;
        }
        this.repulse.load(data.repulse);
        this.rotate.load(data.rotate);
        this.shape.load(data.shape);
        this.size.load(data.size);
        this.shadow.load(data.shadow);
        this.zIndex.load(data.zIndex);
        const collisions = (_e = (_d = data.move) === null || _d === void 0 ? void 0 : _d.collisions) !== null && _e !== void 0 ? _e : (_f = data.move) === null || _f === void 0 ? void 0 : _f.bounce;
        if (collisions !== undefined) {
          this.collisions.enable = collisions;
        }
        this.collisions.load(data.collisions);
        if (data.interactivity !== undefined) {
          this.interactivity = deepExtend({}, data.interactivity);
        }
        const strokeToLoad = (_g = data.stroke) !== null && _g !== void 0 ? _g : (_h = data.shape) === null || _h === void 0 ? void 0 : _h.stroke;
        if (strokeToLoad) {
          if (strokeToLoad instanceof Array) {
            this.stroke = strokeToLoad.map((s => {
              const tmp = new Stroke;
              tmp.load(s);
              return tmp;
            }));
          } else {
            if (this.stroke instanceof Array) {
              this.stroke = new Stroke;
            }
            this.stroke.load(strokeToLoad);
          }
        }
        const gradientToLoad = data.gradient;
        if (gradientToLoad) {
          if (gradientToLoad instanceof Array) {
            this.gradient = gradientToLoad.map((s => {
              const tmp = new AnimatableGradient;
              tmp.load(s);
              return tmp;
            }));
          } else {
            if (this.gradient instanceof Array) {
              this.gradient = new AnimatableGradient;
            }
            this.gradient.load(gradientToLoad);
          }
        }
        if (ParticlesOptions_classPrivateFieldGet(this, _ParticlesOptions_container, "f")) {
          const updaters = ParticlesOptions_classPrivateFieldGet(this, _ParticlesOptions_engine, "f").plugins.updaters.get(ParticlesOptions_classPrivateFieldGet(this, _ParticlesOptions_container, "f"));
          if (updaters) {
            for (const updater of updaters) {
              if (updater.loadOptions) {
                updater.loadOptions(this, data);
              }
            }
          }
        }
      }
    }
    _ParticlesOptions_container = new WeakMap, _ParticlesOptions_engine = new WeakMap;
    function loadOptions(options, ...sourceOptionsArr) {
      for (const sourceOptions of sourceOptionsArr) {
        options.load(sourceOptions);
      }
    }
    function loadParticlesOptions(engine, container, ...sourceOptionsArr) {
      const options = new ParticlesOptions(engine, container);
      loadOptions(options, ...sourceOptionsArr);
      return options;
    }
    var Options_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), 
      value;
    };
    var Options_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _Options_instances, _Options_container, _Options_engine, _Options_findDefaultTheme;
    class Options {
      constructor(engine, container) {
        _Options_instances.add(this);
        _Options_container.set(this, void 0);
        _Options_engine.set(this, void 0);
        Options_classPrivateFieldSet(this, _Options_engine, engine, "f");
        Options_classPrivateFieldSet(this, _Options_container, container, "f");
        this.autoPlay = true;
        this.background = new Background;
        this.backgroundMask = new BackgroundMask;
        this.fullScreen = new FullScreen;
        this.detectRetina = true;
        this.duration = 0;
        this.fpsLimit = 120;
        this.interactivity = new Interactivity;
        this.manualParticles = [];
        this.motion = new Motion;
        this.particles = loadParticlesOptions(Options_classPrivateFieldGet(this, _Options_engine, "f"), Options_classPrivateFieldGet(this, _Options_container, "f"));
        this.pauseOnBlur = true;
        this.pauseOnOutsideViewport = true;
        this.responsive = [];
        this.style = {};
        this.themes = [];
        this.zLayers = 100;
      }
      get backgroundMode() {
        return this.fullScreen;
      }
      set backgroundMode(value) {
        this.fullScreen.load(value);
      }
      get fps_limit() {
        return this.fpsLimit;
      }
      set fps_limit(value) {
        this.fpsLimit = value;
      }
      get retina_detect() {
        return this.detectRetina;
      }
      set retina_detect(value) {
        this.detectRetina = value;
      }
      load(data) {
        var _a, _b, _c, _d, _e;
        if (!data) {
          return;
        }
        if (data.preset !== undefined) {
          if (data.preset instanceof Array) {
            for (const preset of data.preset) {
              this.importPreset(preset);
            }
          } else {
            this.importPreset(data.preset);
          }
        }
        if (data.autoPlay !== undefined) {
          this.autoPlay = data.autoPlay;
        }
        const detectRetina = (_a = data.detectRetina) !== null && _a !== void 0 ? _a : data.retina_detect;
        if (detectRetina !== undefined) {
          this.detectRetina = detectRetina;
        }
        if (data.duration !== undefined) {
          this.duration = data.duration;
        }
        const fpsLimit = (_b = data.fpsLimit) !== null && _b !== void 0 ? _b : data.fps_limit;
        if (fpsLimit !== undefined) {
          this.fpsLimit = fpsLimit;
        }
        if (data.pauseOnBlur !== undefined) {
          this.pauseOnBlur = data.pauseOnBlur;
        }
        if (data.pauseOnOutsideViewport !== undefined) {
          this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;
        }
        if (data.zLayers !== undefined) {
          this.zLayers = data.zLayers;
        }
        this.background.load(data.background);
        const fullScreen = (_c = data.fullScreen) !== null && _c !== void 0 ? _c : data.backgroundMode;
        if (typeof fullScreen === "boolean") {
          this.fullScreen.enable = fullScreen;
        } else {
          this.fullScreen.load(fullScreen);
        }
        this.backgroundMask.load(data.backgroundMask);
        this.interactivity.load(data.interactivity);
        if (data.manualParticles !== undefined) {
          this.manualParticles = data.manualParticles.map((t => {
            const tmp = new ManualParticle;
            tmp.load(t);
            return tmp;
          }));
        }
        this.motion.load(data.motion);
        this.particles.load(data.particles);
        this.style = deepExtend(this.style, data.style);
        Options_classPrivateFieldGet(this, _Options_engine, "f").plugins.loadOptions(this, data);
        if (data.responsive !== undefined) {
          for (const responsive of data.responsive) {
            const optResponsive = new Responsive;
            optResponsive.load(responsive);
            this.responsive.push(optResponsive);
          }
        }
        this.responsive.sort(((a, b) => a.maxWidth - b.maxWidth));
        if (data.themes !== undefined) {
          for (const theme of data.themes) {
            const optTheme = new Theme;
            optTheme.load(theme);
            this.themes.push(optTheme);
          }
        }
        this.defaultDarkTheme = (_d = Options_classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, "dark")) === null || _d === void 0 ? void 0 : _d.name;
        this.defaultLightTheme = (_e = Options_classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, "light")) === null || _e === void 0 ? void 0 : _e.name;
      }
      setResponsive(width, pxRatio, defaultOptions) {
        this.load(defaultOptions);
        const responsiveOptions = this.responsive.find((t => t.mode === "screen" && screen ? t.maxWidth * pxRatio > screen.availWidth : t.maxWidth * pxRatio > width));
        this.load(responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.options);
        return responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.maxWidth;
      }
      setTheme(name) {
        if (name) {
          const chosenTheme = this.themes.find((theme => theme.name === name));
          if (chosenTheme) {
            this.load(chosenTheme.options);
          }
        } else {
          const mediaMatch = typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)"), clientDarkMode = mediaMatch && mediaMatch.matches, defaultTheme = Options_classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, clientDarkMode ? "dark" : "light");
          if (defaultTheme) {
            this.load(defaultTheme.options);
          }
        }
      }
      importPreset(preset) {
        this.load(Options_classPrivateFieldGet(this, _Options_engine, "f").plugins.getPreset(preset));
      }
    }
    _Options_container = new WeakMap, _Options_engine = new WeakMap, _Options_instances = new WeakSet, 
    _Options_findDefaultTheme = function _Options_findDefaultTheme(mode) {
      var _a;
      return (_a = this.themes.find((theme => theme.default.value && theme.default.mode === mode))) !== null && _a !== void 0 ? _a : this.themes.find((theme => theme.default.value && theme.default.mode === "any"));
    };
    var InteractionManager_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), 
      value;
    };
    var InteractionManager_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _InteractionManager_engine;
    class InteractionManager {
      constructor(engine, container) {
        this.container = container;
        _InteractionManager_engine.set(this, void 0);
        InteractionManager_classPrivateFieldSet(this, _InteractionManager_engine, engine, "f");
        this.externalInteractors = [];
        this.particleInteractors = [];
      }
      async externalInteract(delta) {
        for (const interactor of this.externalInteractors) {
          if (interactor.isEnabled()) {
            await interactor.interact(delta);
          }
        }
      }
      handleClickMode(mode) {
        for (const interactor of this.externalInteractors) {
          if (interactor.handleClickMode) {
            interactor.handleClickMode(mode);
          }
        }
      }
      init() {
        const interactors = InteractionManager_classPrivateFieldGet(this, _InteractionManager_engine, "f").plugins.getInteractors(this.container, true);
        this.externalInteractors = [];
        this.particleInteractors = [];
        for (const interactor of interactors) {
          switch (interactor.type) {
           case 0:
            this.externalInteractors.push(interactor);
            break;

           case 1:
            this.particleInteractors.push(interactor);
            break;
          }
          interactor.init();
        }
      }
      async particlesInteract(particle, delta) {
        for (const interactor of this.externalInteractors) {
          interactor.clear(particle);
        }
        for (const interactor of this.particleInteractors) {
          if (interactor.isEnabled(particle)) {
            await interactor.interact(particle, delta);
          }
        }
      }
      async reset(particle) {
        for (const interactor of this.externalInteractors) {
          if (interactor.isEnabled()) {
            await interactor.reset(particle);
          }
        }
        for (const interactor of this.particleInteractors) {
          if (interactor.isEnabled(particle)) {
            await interactor.reset(particle);
          }
        }
      }
    }
    _InteractionManager_engine = new WeakMap;
    class Vector3d extends Vector {
      constructor(xOrCoords, y, z) {
        super(xOrCoords, y);
        if (typeof xOrCoords !== "number" && xOrCoords) {
          this.z = xOrCoords.z;
        } else if (z !== undefined) {
          this.z = z;
        } else {
          throw new Error("tsParticles - Vector not initialized correctly");
        }
      }
      static get origin() {
        return Vector3d.create(0, 0, 0);
      }
      static clone(source) {
        return Vector3d.create(source.x, source.y, source.z);
      }
      static create(x, y, z) {
        return new Vector3d(x, y, z);
      }
      add(v) {
        return v instanceof Vector3d ? Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z) : super.add(v);
      }
      addTo(v) {
        super.addTo(v);
        if (v instanceof Vector3d) {
          this.z += v.z;
        }
      }
      copy() {
        return Vector3d.clone(this);
      }
      div(n) {
        return Vector3d.create(this.x / n, this.y / n, this.z / n);
      }
      divTo(n) {
        super.divTo(n);
        this.z /= n;
      }
      mult(n) {
        return Vector3d.create(this.x * n, this.y * n, this.z * n);
      }
      multTo(n) {
        super.multTo(n);
        this.z *= n;
      }
      setTo(v) {
        super.setTo(v);
        const v3d = v;
        if (v3d.z !== undefined) {
          this.z = v3d.z;
        }
      }
      sub(v) {
        return v instanceof Vector3d ? Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z) : super.sub(v);
      }
      subFrom(v) {
        super.subFrom(v);
        if (v instanceof Vector3d) {
          this.z -= v.z;
        }
      }
    }
    var Particle_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), 
      value;
    };
    var Particle_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _Particle_engine;
    const fixOutMode = data => {
      if (!(isInArray(data.outMode, data.checkModes) || isInArray(data.outMode, data.checkModes))) {
        return;
      }
      if (data.coord > data.maxCoord - data.radius * 2) {
        data.setCb(-data.radius);
      } else if (data.coord < data.radius * 2) {
        data.setCb(data.radius);
      }
    };
    class Particle {
      constructor(engine, id, container, position, overrideOptions, group) {
        var _a, _b, _c, _d, _e, _f;
        this.id = id;
        this.container = container;
        this.group = group;
        _Particle_engine.set(this, void 0);
        Particle_classPrivateFieldSet(this, _Particle_engine, engine, "f");
        this.fill = true;
        this.close = true;
        this.lastPathTime = 0;
        this.destroyed = false;
        this.unbreakable = false;
        this.splitCount = 0;
        this.misplaced = false;
        this.retina = {
          maxDistance: {}
        };
        this.outType = "normal";
        this.ignoresResizeRatio = true;
        const pxRatio = container.retina.pixelRatio, mainOptions = container.actualOptions, particlesOptions = loadParticlesOptions(Particle_classPrivateFieldGet(this, _Particle_engine, "f"), container, mainOptions.particles);
        const shapeType = particlesOptions.shape.type, reduceDuplicates = particlesOptions.reduceDuplicates;
        this.shape = shapeType instanceof Array ? itemFromArray(shapeType, this.id, reduceDuplicates) : shapeType;
        if (overrideOptions === null || overrideOptions === void 0 ? void 0 : overrideOptions.shape) {
          if (overrideOptions.shape.type) {
            const overrideShapeType = overrideOptions.shape.type;
            this.shape = overrideShapeType instanceof Array ? itemFromArray(overrideShapeType, this.id, reduceDuplicates) : overrideShapeType;
          }
          const shapeOptions = new Shape;
          shapeOptions.load(overrideOptions.shape);
          if (this.shape) {
            this.shapeData = this.loadShapeData(shapeOptions, reduceDuplicates);
          }
        } else {
          this.shapeData = this.loadShapeData(particlesOptions.shape, reduceDuplicates);
        }
        particlesOptions.load(overrideOptions);
        particlesOptions.load((_a = this.shapeData) === null || _a === void 0 ? void 0 : _a.particles);
        this.interactivity = new Interactivity;
        this.interactivity.load(container.actualOptions.interactivity);
        this.interactivity.load(particlesOptions.interactivity);
        this.fill = (_c = (_b = this.shapeData) === null || _b === void 0 ? void 0 : _b.fill) !== null && _c !== void 0 ? _c : this.fill;
        this.close = (_e = (_d = this.shapeData) === null || _d === void 0 ? void 0 : _d.close) !== null && _e !== void 0 ? _e : this.close;
        this.options = particlesOptions;
        this.pathDelay = getValue(this.options.move.path.delay) * 1e3;
        const zIndexValue = getRangeValue(this.options.zIndex.value);
        container.retina.initParticle(this);
        const sizeOptions = this.options.size, sizeRange = sizeOptions.value, sizeAnimation = sizeOptions.animation;
        this.size = {
          enable: sizeOptions.animation.enable,
          value: getRangeValue(sizeOptions.value) * container.retina.pixelRatio,
          max: getRangeMax(sizeRange) * pxRatio,
          min: getRangeMin(sizeRange) * pxRatio,
          loops: 0,
          maxLoops: getRangeValue(sizeOptions.animation.count)
        };
        if (sizeAnimation.enable) {
          this.size.status = 0;
          this.size.decay = 1 - getRangeValue(sizeAnimation.decay);
          switch (sizeAnimation.startValue) {
           case "min":
            this.size.value = this.size.min;
            this.size.status = 0;
            break;

           case "random":
            this.size.value = randomInRange(this.size) * pxRatio;
            this.size.status = Math.random() >= .5 ? 0 : 1;
            break;

           case "max":
           default:
            this.size.value = this.size.max;
            this.size.status = 1;
            break;
          }
          this.size.velocity = ((_f = this.retina.sizeAnimationSpeed) !== null && _f !== void 0 ? _f : container.retina.sizeAnimationSpeed) / 100 * container.retina.reduceFactor;
          if (!sizeAnimation.sync) {
            this.size.velocity *= Math.random();
          }
        }
        this.bubble = {
          inRange: false
        };
        this.position = this.calcPosition(container, position, clamp(zIndexValue, 0, container.zLayers));
        this.initialPosition = this.position.copy();
        const canvasSize = container.canvas.size, moveCenterPerc = this.options.move.center;
        this.moveCenter = {
          x: canvasSize.width * moveCenterPerc.x / 100,
          y: canvasSize.height * moveCenterPerc.y / 100,
          radius: this.options.move.center.radius
        };
        this.direction = getParticleDirectionAngle(this.options.move.direction, this.position, this.moveCenter);
        switch (this.options.move.direction) {
         case "inside":
          this.outType = "inside";
          break;

         case "outside":
          this.outType = "outside";
          break;
        }
        this.initialVelocity = this.calculateVelocity();
        this.velocity = this.initialVelocity.copy();
        this.moveDecay = 1 - getRangeValue(this.options.move.decay);
        this.offset = Vector.origin;
        const particles = container.particles;
        particles.needsSort = particles.needsSort || particles.lastZIndex < this.position.z;
        particles.lastZIndex = this.position.z;
        this.zIndexFactor = this.position.z / container.zLayers;
        this.sides = 24;
        let drawer = container.drawers.get(this.shape);
        if (!drawer) {
          drawer = Particle_classPrivateFieldGet(this, _Particle_engine, "f").plugins.getShapeDrawer(this.shape);
          if (drawer) {
            container.drawers.set(this.shape, drawer);
          }
        }
        if (drawer === null || drawer === void 0 ? void 0 : drawer.loadShape) {
          drawer === null || drawer === void 0 ? void 0 : drawer.loadShape(this);
        }
        const sideCountFunc = drawer === null || drawer === void 0 ? void 0 : drawer.getSidesCount;
        if (sideCountFunc) {
          this.sides = sideCountFunc(this);
        }
        this.spawning = false;
        this.shadowColor = rangeColorToRgb(this.options.shadow.color);
        for (const updater of container.particles.updaters) {
          if (updater.init) {
            updater.init(this);
          }
        }
        for (const mover of container.particles.movers) {
          if (mover.init) {
            mover.init(this);
          }
        }
        if (drawer && drawer.particleInit) {
          drawer.particleInit(container, this);
        }
        for (const [, plugin] of container.plugins) {
          if (plugin.particleCreated) {
            plugin.particleCreated(this);
          }
        }
      }
      destroy(override) {
        if (this.unbreakable || this.destroyed) {
          return;
        }
        this.destroyed = true;
        this.bubble.inRange = false;
        for (const [, plugin] of this.container.plugins) {
          if (plugin.particleDestroyed) {
            plugin.particleDestroyed(this, override);
          }
        }
        if (override) {
          return;
        }
        const destroyOptions = this.options.destroy;
        if (destroyOptions.mode === "split") {
          this.split();
        }
      }
      draw(delta) {
        const container = this.container;
        for (const [, plugin] of container.plugins) {
          container.canvas.drawParticlePlugin(plugin, this, delta);
        }
        container.canvas.drawParticle(this, delta);
      }
      getFillColor() {
        var _a, _b;
        const color = (_a = this.bubble.color) !== null && _a !== void 0 ? _a : getHslFromAnimation(this.color);
        if (color && this.roll && (this.backColor || this.roll.alter)) {
          const backFactor = this.roll.horizontal && this.roll.vertical ? 2 : 1, backSum = this.roll.horizontal ? Math.PI / 2 : 0, rolled = Math.floor((((_b = this.roll.angle) !== null && _b !== void 0 ? _b : 0) + backSum) / (Math.PI / backFactor)) % 2;
          if (rolled) {
            if (this.backColor) {
              return this.backColor;
            }
            if (this.roll.alter) {
              return alterHsl(color, this.roll.alter.type, this.roll.alter.value);
            }
          }
        }
        return color;
      }
      getMass() {
        return this.getRadius() ** 2 * Math.PI / 2;
      }
      getPosition() {
        return {
          x: this.position.x + this.offset.x,
          y: this.position.y + this.offset.y,
          z: this.position.z
        };
      }
      getRadius() {
        var _a;
        return (_a = this.bubble.radius) !== null && _a !== void 0 ? _a : this.size.value;
      }
      getStrokeColor() {
        var _a, _b;
        return (_b = (_a = this.bubble.color) !== null && _a !== void 0 ? _a : getHslFromAnimation(this.strokeColor)) !== null && _b !== void 0 ? _b : this.getFillColor();
      }
      isInsideCanvas() {
        const radius = this.getRadius(), canvasSize = this.container.canvas.size;
        return this.position.x >= -radius && this.position.y >= -radius && this.position.y <= canvasSize.height + radius && this.position.x <= canvasSize.width + radius;
      }
      isVisible() {
        return !this.destroyed && !this.spawning && this.isInsideCanvas();
      }
      reset() {
        if (this.opacity) {
          this.opacity.loops = 0;
        }
        this.size.loops = 0;
      }
      calcPosition(container, position, zIndex, tryCount = 0) {
        var _a, _b, _c, _d;
        for (const [, plugin] of container.plugins) {
          const pluginPos = plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;
          if (pluginPos !== undefined) {
            return Vector3d.create(pluginPos.x, pluginPos.y, zIndex);
          }
        }
        const canvasSize = container.canvas.size, exactPosition = calcExactPositionOrRandomFromSize({
          size: canvasSize,
          position: position
        }), pos = Vector3d.create(exactPosition.x, exactPosition.y, zIndex), radius = this.getRadius(), outModes = this.options.move.outModes, fixHorizontal = outMode => {
          fixOutMode({
            outMode: outMode,
            checkModes: [ "bounce", "bounce-horizontal" ],
            coord: pos.x,
            maxCoord: container.canvas.size.width,
            setCb: value => pos.x += value,
            radius: radius
          });
        }, fixVertical = outMode => {
          fixOutMode({
            outMode: outMode,
            checkModes: [ "bounce", "bounce-vertical" ],
            coord: pos.y,
            maxCoord: container.canvas.size.height,
            setCb: value => pos.y += value,
            radius: radius
          });
        };
        fixHorizontal((_a = outModes.left) !== null && _a !== void 0 ? _a : outModes.default);
        fixHorizontal((_b = outModes.right) !== null && _b !== void 0 ? _b : outModes.default);
        fixVertical((_c = outModes.top) !== null && _c !== void 0 ? _c : outModes.default);
        fixVertical((_d = outModes.bottom) !== null && _d !== void 0 ? _d : outModes.default);
        if (this.checkOverlap(pos, tryCount)) {
          return this.calcPosition(container, undefined, zIndex, tryCount + 1);
        }
        return pos;
      }
      calculateVelocity() {
        const baseVelocity = getParticleBaseVelocity(this.direction);
        const res = baseVelocity.copy();
        const moveOptions = this.options.move;
        if (moveOptions.direction === "inside" || moveOptions.direction === "outside") {
          return res;
        }
        const rad = Math.PI / 180 * getRangeValue(moveOptions.angle.value);
        const radOffset = Math.PI / 180 * getRangeValue(moveOptions.angle.offset);
        const range = {
          left: radOffset - rad / 2,
          right: radOffset + rad / 2
        };
        if (!moveOptions.straight) {
          res.angle += randomInRange(setRangeValue(range.left, range.right));
        }
        if (moveOptions.random && typeof moveOptions.speed === "number") {
          res.length *= Math.random();
        }
        return res;
      }
      checkOverlap(pos, tryCount = 0) {
        const collisionsOptions = this.options.collisions, radius = this.getRadius();
        if (!collisionsOptions.enable) {
          return false;
        }
        const overlapOptions = collisionsOptions.overlap;
        if (overlapOptions.enable) {
          return false;
        }
        const retries = overlapOptions.retries;
        if (retries >= 0 && tryCount > retries) {
          throw new Error("Particle is overlapping and can't be placed");
        }
        let overlaps = false;
        for (const particle of this.container.particles.array) {
          if (getDistance(pos, particle.position) < radius + particle.getRadius()) {
            overlaps = true;
            break;
          }
        }
        return overlaps;
      }
      loadShapeData(shapeOptions, reduceDuplicates) {
        const shapeData = shapeOptions.options[this.shape];
        if (shapeData) {
          return deepExtend({}, shapeData instanceof Array ? itemFromArray(shapeData, this.id, reduceDuplicates) : shapeData);
        }
      }
      split() {
        const splitOptions = this.options.destroy.split;
        if (splitOptions.count >= 0 && this.splitCount++ > splitOptions.count) {
          return;
        }
        const rate = getValue(splitOptions.rate), particlesSplitOptions = splitOptions.particles instanceof Array ? itemFromArray(splitOptions.particles) : splitOptions.particles;
        for (let i = 0; i < rate; i++) {
          this.container.particles.addSplitParticle(this, particlesSplitOptions);
        }
      }
    }
    _Particle_engine = new WeakMap;
    class Point {
      constructor(position, particle) {
        this.position = position;
        this.particle = particle;
      }
    }
    class Range {
      constructor(x, y) {
        this.position = {
          x: x,
          y: y
        };
      }
    }
    class Circle extends Range {
      constructor(x, y, radius) {
        super(x, y);
        this.radius = radius;
      }
      contains(point) {
        return getDistance(point, this.position) <= this.radius;
      }
      intersects(range) {
        const rect = range, circle = range, pos1 = this.position, pos2 = range.position, xDist = Math.abs(pos2.x - pos1.x), yDist = Math.abs(pos2.y - pos1.y), r = this.radius;
        if (circle.radius !== undefined) {
          const rSum = r + circle.radius, dist = Math.sqrt(xDist * xDist + yDist + yDist);
          return rSum > dist;
        } else if (rect.size !== undefined) {
          const w = rect.size.width, h = rect.size.height, edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);
          if (xDist > r + w || yDist > r + h) {
            return false;
          }
          if (xDist <= w || yDist <= h) {
            return true;
          }
          return edges <= r * r;
        }
        return false;
      }
    }
    class Rectangle extends Range {
      constructor(x, y, width, height) {
        super(x, y);
        this.size = {
          height: height,
          width: width
        };
      }
      contains(point) {
        const w = this.size.width, h = this.size.height, pos = this.position;
        return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
      }
      intersects(range) {
        const rect = range, circle = range, w = this.size.width, h = this.size.height, pos1 = this.position, pos2 = range.position;
        if (circle.radius !== undefined) {
          return circle.intersects(this);
        }
        if (!rect.size) {
          return false;
        }
        const size2 = rect.size, w2 = size2.width, h2 = size2.height;
        return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
      }
    }
    class CircleWarp extends Circle {
      constructor(x, y, radius, canvasSize) {
        super(x, y, radius);
        this.canvasSize = canvasSize;
        this.canvasSize = Object.assign({}, canvasSize);
      }
      contains(point) {
        if (super.contains(point)) {
          return true;
        }
        const posNE = {
          x: point.x - this.canvasSize.width,
          y: point.y
        };
        if (super.contains(posNE)) {
          return true;
        }
        const posSE = {
          x: point.x - this.canvasSize.width,
          y: point.y - this.canvasSize.height
        };
        if (super.contains(posSE)) {
          return true;
        }
        const posSW = {
          x: point.x,
          y: point.y - this.canvasSize.height
        };
        return super.contains(posSW);
      }
      intersects(range) {
        if (super.intersects(range)) {
          return true;
        }
        const rect = range, circle = range, newPos = {
          x: range.position.x - this.canvasSize.width,
          y: range.position.y - this.canvasSize.height
        };
        if (circle.radius !== undefined) {
          const biggerCircle = new Circle(newPos.x, newPos.y, circle.radius * 2);
          return super.intersects(biggerCircle);
        } else if (rect.size !== undefined) {
          const rectSW = new Rectangle(newPos.x, newPos.y, rect.size.width * 2, rect.size.height * 2);
          return super.intersects(rectSW);
        }
        return false;
      }
    }
    class QuadTree {
      constructor(rectangle, capacity) {
        this.rectangle = rectangle;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
      }
      insert(point) {
        var _a, _b, _c, _d, _e;
        if (!this.rectangle.contains(point.position)) {
          return false;
        }
        if (this.points.length < this.capacity) {
          this.points.push(point);
          return true;
        }
        if (!this.divided) {
          this.subdivide();
        }
        return (_e = ((_a = this.northEast) === null || _a === void 0 ? void 0 : _a.insert(point)) || ((_b = this.northWest) === null || _b === void 0 ? void 0 : _b.insert(point)) || ((_c = this.southEast) === null || _c === void 0 ? void 0 : _c.insert(point)) || ((_d = this.southWest) === null || _d === void 0 ? void 0 : _d.insert(point))) !== null && _e !== void 0 ? _e : false;
      }
      query(range, check, found) {
        var _a, _b, _c, _d;
        const res = found !== null && found !== void 0 ? found : [];
        if (!range.intersects(this.rectangle)) {
          return [];
        }
        for (const p of this.points) {
          if (!range.contains(p.position) && getDistance(range.position, p.position) > p.particle.getRadius() && (!check || check(p.particle))) {
            continue;
          }
          res.push(p.particle);
        }
        if (this.divided) {
          (_a = this.northEast) === null || _a === void 0 ? void 0 : _a.query(range, check, res);
          (_b = this.northWest) === null || _b === void 0 ? void 0 : _b.query(range, check, res);
          (_c = this.southEast) === null || _c === void 0 ? void 0 : _c.query(range, check, res);
          (_d = this.southWest) === null || _d === void 0 ? void 0 : _d.query(range, check, res);
        }
        return res;
      }
      queryCircle(position, radius, check) {
        return this.query(new Circle(position.x, position.y, radius), check);
      }
      queryCircleWarp(position, radius, containerOrSize, check) {
        const container = containerOrSize, size = containerOrSize;
        return this.query(new CircleWarp(position.x, position.y, radius, container.canvas !== undefined ? container.canvas.size : size), check);
      }
      queryRectangle(position, size, check) {
        return this.query(new Rectangle(position.x, position.y, size.width, size.height), check);
      }
      subdivide() {
        const x = this.rectangle.position.x, y = this.rectangle.position.y, w = this.rectangle.size.width, h = this.rectangle.size.height, capacity = this.capacity;
        this.northEast = new QuadTree(new Rectangle(x, y, w / 2, h / 2), capacity);
        this.northWest = new QuadTree(new Rectangle(x + w / 2, y, w / 2, h / 2), capacity);
        this.southEast = new QuadTree(new Rectangle(x, y + h / 2, w / 2, h / 2), capacity);
        this.southWest = new QuadTree(new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), capacity);
        this.divided = true;
      }
    }
    var Particles_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), 
      value;
    };
    var Particles_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _Particles_engine;
    class Particles {
      constructor(engine, container) {
        this.container = container;
        _Particles_engine.set(this, void 0);
        Particles_classPrivateFieldSet(this, _Particles_engine, engine, "f");
        this.nextId = 0;
        this.array = [];
        this.zArray = [];
        this.limit = 0;
        this.needsSort = false;
        this.lastZIndex = 0;
        this.freqs = {
          links: new Map,
          triangles: new Map
        };
        this.interactionManager = new InteractionManager(Particles_classPrivateFieldGet(this, _Particles_engine, "f"), container);
        const canvasSize = this.container.canvas.size;
        this.quadTree = new QuadTree(new Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, canvasSize.width * 3 / 2, canvasSize.height * 3 / 2), 4);
        this.movers = Particles_classPrivateFieldGet(this, _Particles_engine, "f").plugins.getMovers(container, true);
        this.updaters = Particles_classPrivateFieldGet(this, _Particles_engine, "f").plugins.getUpdaters(container, true);
      }
      get count() {
        return this.array.length;
      }
      addManualParticles() {
        const container = this.container, options = container.actualOptions;
        for (const particle of options.manualParticles) {
          this.addParticle(calcPositionFromSize({
            size: container.canvas.size,
            position: particle.position
          }), particle.options);
        }
      }
      addParticle(position, overrideOptions, group) {
        const container = this.container, options = container.actualOptions, limit = options.particles.number.limit * container.density;
        if (limit > 0) {
          const countToRemove = this.count + 1 - limit;
          if (countToRemove > 0) {
            this.removeQuantity(countToRemove);
          }
        }
        return this.pushParticle(position, overrideOptions, group);
      }
      addSplitParticle(parent, splitParticlesOptions) {
        const splitOptions = parent.options.destroy.split, options = loadParticlesOptions(Particles_classPrivateFieldGet(this, _Particles_engine, "f"), this.container, parent.options), factor = getValue(splitOptions.factor);
        options.color.load({
          value: {
            hsl: parent.getFillColor()
          }
        });
        if (typeof options.size.value === "number") {
          options.size.value /= factor;
        } else {
          options.size.value.min /= factor;
          options.size.value.max /= factor;
        }
        options.load(splitParticlesOptions);
        const offset = splitOptions.sizeOffset ? setRangeValue(-parent.size.value, parent.size.value) : 0, position = {
          x: parent.position.x + randomInRange(offset),
          y: parent.position.y + randomInRange(offset)
        };
        return this.pushParticle(position, options, parent.group, (particle => {
          if (particle.size.value < .5) {
            return false;
          }
          particle.velocity.length = randomInRange(setRangeValue(parent.velocity.length, particle.velocity.length));
          particle.splitCount = parent.splitCount + 1;
          particle.unbreakable = true;
          setTimeout((() => {
            particle.unbreakable = false;
          }), 500);
          return true;
        }));
      }
      clear() {
        this.array = [];
        this.zArray = [];
      }
      destroy() {
        this.array = [];
        this.zArray = [];
        this.movers = [];
        this.updaters = [];
      }
      async draw(delta) {
        const container = this.container, canvasSize = this.container.canvas.size;
        this.quadTree = new QuadTree(new Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, canvasSize.width * 3 / 2, canvasSize.height * 3 / 2), 4);
        container.canvas.clear();
        await this.update(delta);
        if (this.needsSort) {
          this.zArray.sort(((a, b) => b.position.z - a.position.z || a.id - b.id));
          this.lastZIndex = this.zArray[this.zArray.length - 1].position.z;
          this.needsSort = false;
        }
        for (const [, plugin] of container.plugins) {
          container.canvas.drawPlugin(plugin, delta);
        }
        for (const p of this.zArray) {
          p.draw(delta);
        }
      }
      getLinkFrequency(p1, p2) {
        const range = setRangeValue(p1.id, p2.id), key = `${getRangeMin(range)}_${getRangeMax(range)}`;
        let res = this.freqs.links.get(key);
        if (res === undefined) {
          res = Math.random();
          this.freqs.links.set(key, res);
        }
        return res;
      }
      getTriangleFrequency(p1, p2, p3) {
        let [id1, id2, id3] = [ p1.id, p2.id, p3.id ];
        if (id1 > id2) {
          [id2, id1] = [ id1, id2 ];
        }
        if (id2 > id3) {
          [id3, id2] = [ id2, id3 ];
        }
        if (id1 > id3) {
          [id3, id1] = [ id1, id3 ];
        }
        const key = `${id1}_${id2}_${id3}`;
        let res = this.freqs.triangles.get(key);
        if (res === undefined) {
          res = Math.random();
          this.freqs.triangles.set(key, res);
        }
        return res;
      }
      handleClickMode(mode) {
        this.interactionManager.handleClickMode(mode);
      }
      init() {
        var _a;
        const container = this.container, options = container.actualOptions;
        this.lastZIndex = 0;
        this.needsSort = false;
        this.freqs.links = new Map;
        this.freqs.triangles = new Map;
        let handled = false;
        this.updaters = Particles_classPrivateFieldGet(this, _Particles_engine, "f").plugins.getUpdaters(container, true);
        this.interactionManager.init();
        for (const [, plugin] of container.plugins) {
          if (plugin.particlesInitialization !== undefined) {
            handled = plugin.particlesInitialization();
          }
          if (handled) {
            break;
          }
        }
        this.addManualParticles();
        if (!handled) {
          for (const group in options.particles.groups) {
            const groupOptions = options.particles.groups[group];
            for (let i = this.count, j = 0; j < ((_a = groupOptions.number) === null || _a === void 0 ? void 0 : _a.value) && i < options.particles.number.value; i++, 
            j++) {
              this.addParticle(undefined, groupOptions, group);
            }
          }
          for (let i = this.count; i < options.particles.number.value; i++) {
            this.addParticle();
          }
        }
        this.interactionManager.init();
        container.pathGenerator.init(container);
      }
      push(nb, mouse, overrideOptions, group) {
        this.pushing = true;
        for (let i = 0; i < nb; i++) {
          this.addParticle(mouse === null || mouse === void 0 ? void 0 : mouse.position, overrideOptions, group);
        }
        this.pushing = false;
      }
      async redraw() {
        this.clear();
        this.init();
        await this.draw({
          value: 0,
          factor: 0
        });
      }
      remove(particle, group, override) {
        this.removeAt(this.array.indexOf(particle), undefined, group, override);
      }
      removeAt(index, quantity = 1, group, override) {
        if (!(index >= 0 && index <= this.count)) {
          return;
        }
        let deleted = 0;
        for (let i = index; deleted < quantity && i < this.count; i++) {
          const particle = this.array[i];
          if (!particle || particle.group !== group) {
            continue;
          }
          particle.destroy(override);
          this.array.splice(i--, 1);
          const zIdx = this.zArray.indexOf(particle);
          this.zArray.splice(zIdx, 1);
          deleted++;
          Particles_classPrivateFieldGet(this, _Particles_engine, "f").dispatchEvent("particleRemoved", {
            container: this.container,
            data: {
              particle: particle
            }
          });
        }
      }
      removeQuantity(quantity, group) {
        this.removeAt(0, quantity, group);
      }
      setDensity() {
        const options = this.container.actualOptions;
        for (const group in options.particles.groups) {
          this.applyDensity(options.particles.groups[group], 0, group);
        }
        this.applyDensity(options.particles, options.manualParticles.length);
      }
      async update(delta) {
        const container = this.container, particlesToDelete = [];
        container.pathGenerator.update();
        for (const [, plugin] of container.plugins) {
          if (plugin.update) {
            plugin.update(delta);
          }
        }
        for (const particle of this.array) {
          const resizeFactor = container.canvas.resizeFactor;
          if (resizeFactor && !particle.ignoresResizeRatio) {
            particle.position.x *= resizeFactor.width;
            particle.position.y *= resizeFactor.height;
          }
          particle.ignoresResizeRatio = false;
          await this.interactionManager.reset(particle);
          for (const [, plugin] of this.container.plugins) {
            if (particle.destroyed) {
              break;
            }
            if (plugin.particleUpdate) {
              plugin.particleUpdate(particle, delta);
            }
          }
          for (const mover of this.movers) {
            if (mover.isEnabled(particle)) {
              mover.move(particle, delta);
            }
          }
          if (particle.destroyed) {
            particlesToDelete.push(particle);
            continue;
          }
          this.quadTree.insert(new Point(particle.getPosition(), particle));
        }
        for (const particle of particlesToDelete) {
          this.remove(particle);
        }
        await this.interactionManager.externalInteract(delta);
        for (const particle of container.particles.array) {
          for (const updater of this.updaters) {
            updater.update(particle, delta);
          }
          if (!particle.destroyed && !particle.spawning) {
            await this.interactionManager.particlesInteract(particle, delta);
          }
        }
        delete container.canvas.resizeFactor;
      }
      applyDensity(options, manualCount, group) {
        var _a;
        if (!((_a = options.number.density) === null || _a === void 0 ? void 0 : _a.enable)) {
          return;
        }
        const numberOptions = options.number, densityFactor = this.initDensityFactor(numberOptions.density), optParticlesNumber = numberOptions.value, optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber, particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount, particlesCount = Math.min(this.count, this.array.filter((t => t.group === group)).length);
        this.limit = numberOptions.limit * densityFactor;
        if (particlesCount < particlesNumber) {
          this.push(Math.abs(particlesNumber - particlesCount), undefined, options, group);
        } else if (particlesCount > particlesNumber) {
          this.removeQuantity(particlesCount - particlesNumber, group);
        }
      }
      initDensityFactor(densityOptions) {
        const container = this.container;
        if (!container.canvas.element || !densityOptions.enable) {
          return 1;
        }
        const canvas = container.canvas.element, pxRatio = container.retina.pixelRatio;
        return canvas.width * canvas.height / (densityOptions.factor * pxRatio ** 2 * densityOptions.area);
      }
      pushParticle(position, overrideOptions, group, initializer) {
        try {
          const particle = new Particle(Particles_classPrivateFieldGet(this, _Particles_engine, "f"), this.nextId, this.container, position, overrideOptions, group);
          let canAdd = true;
          if (initializer) {
            canAdd = initializer(particle);
          }
          if (!canAdd) {
            return;
          }
          this.array.push(particle);
          this.zArray.push(particle);
          this.nextId++;
          Particles_classPrivateFieldGet(this, _Particles_engine, "f").dispatchEvent("particleAdded", {
            container: this.container,
            data: {
              particle: particle
            }
          });
          return particle;
        } catch (e) {
          console.warn(`error adding particle: ${e}`);
          return;
        }
      }
    }
    _Particles_engine = new WeakMap;
    class Retina {
      constructor(container) {
        this.container = container;
      }
      init() {
        const container = this.container, options = container.actualOptions;
        this.pixelRatio = !options.detectRetina || isSsr() ? 1 : window.devicePixelRatio;
        const motionOptions = this.container.actualOptions.motion;
        if (motionOptions && (motionOptions.disable || motionOptions.reduce.value)) {
          if (isSsr() || typeof matchMedia === "undefined" || !matchMedia) {
            this.reduceFactor = 1;
          } else {
            const mediaQuery = matchMedia("(prefers-reduced-motion: reduce)");
            if (mediaQuery) {
              this.handleMotionChange(mediaQuery);
              const handleChange = () => {
                this.handleMotionChange(mediaQuery);
                container.refresh().catch((() => {}));
              };
              if (mediaQuery.addEventListener !== undefined) {
                mediaQuery.addEventListener("change", handleChange);
              } else if (mediaQuery.addListener !== undefined) {
                mediaQuery.addListener(handleChange);
              }
            }
          }
        } else {
          this.reduceFactor = 1;
        }
        const ratio = this.pixelRatio;
        if (container.canvas.element) {
          const element = container.canvas.element;
          container.canvas.size.width = element.offsetWidth * ratio;
          container.canvas.size.height = element.offsetHeight * ratio;
        }
        const particles = options.particles;
        this.attractDistance = getRangeValue(particles.move.attract.distance) * ratio;
        this.linksDistance = particles.links.distance * ratio;
        this.linksWidth = particles.links.width * ratio;
        this.sizeAnimationSpeed = getRangeValue(particles.size.animation.speed) * ratio;
        this.maxSpeed = getRangeValue(particles.move.gravity.maxSpeed) * ratio;
        const modes = options.interactivity.modes;
        this.connectModeDistance = modes.connect.distance * ratio;
        this.connectModeRadius = modes.connect.radius * ratio;
        this.grabModeDistance = modes.grab.distance * ratio;
        this.repulseModeDistance = modes.repulse.distance * ratio;
        this.bounceModeDistance = modes.bounce.distance * ratio;
        this.attractModeDistance = modes.attract.distance * ratio;
        this.slowModeRadius = modes.slow.radius * ratio;
        this.bubbleModeDistance = modes.bubble.distance * ratio;
        if (modes.bubble.size) {
          this.bubbleModeSize = modes.bubble.size * ratio;
        }
      }
      initParticle(particle) {
        const options = particle.options, ratio = this.pixelRatio, moveDistance = options.move.distance, props = particle.retina;
        props.attractDistance = getRangeValue(options.move.attract.distance) * ratio;
        props.linksDistance = options.links.distance * ratio;
        props.linksWidth = options.links.width * ratio;
        props.moveDrift = getRangeValue(options.move.drift) * ratio;
        props.moveSpeed = getRangeValue(options.move.speed) * ratio;
        props.sizeAnimationSpeed = getRangeValue(options.size.animation.speed) * ratio;
        const maxDistance = props.maxDistance;
        maxDistance.horizontal = moveDistance.horizontal !== undefined ? moveDistance.horizontal * ratio : undefined;
        maxDistance.vertical = moveDistance.vertical !== undefined ? moveDistance.vertical * ratio : undefined;
        props.maxSpeed = getRangeValue(options.move.gravity.maxSpeed) * ratio;
      }
      handleMotionChange(mediaQuery) {
        const options = this.container.actualOptions;
        if (mediaQuery.matches) {
          const motion = options.motion;
          this.reduceFactor = motion.disable ? 0 : motion.reduce.value ? 1 / motion.reduce.factor : 1;
        } else {
          this.reduceFactor = 1;
        }
      }
    }
    var Container_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), 
      value;
    };
    var Container_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _Container_engine, _Container_eventListeners;
    function guardCheck(container) {
      return !container.destroyed;
    }
    function loadContainerOptions(engine, container, ...sourceOptionsArr) {
      const options = new Options(engine, container);
      loadOptions(options, ...sourceOptionsArr);
      return options;
    }
    class Container {
      constructor(engine, id, sourceOptions) {
        this.id = id;
        _Container_engine.set(this, void 0);
        _Container_eventListeners.set(this, void 0);
        Container_classPrivateFieldSet(this, _Container_engine, engine, "f");
        this.fpsLimit = 120;
        this.duration = 0;
        this.lifeTime = 0;
        this.firstStart = true;
        this.started = false;
        this.destroyed = false;
        this.paused = true;
        this.lastFrameTime = 0;
        this.zLayers = 100;
        this.pageHidden = false;
        this._sourceOptions = sourceOptions;
        this._initialSourceOptions = sourceOptions;
        this.retina = new Retina(this);
        this.canvas = new Canvas(this);
        this.particles = new Particles(Container_classPrivateFieldGet(this, _Container_engine, "f"), this);
        this.drawer = new FrameManager(this);
        this.pathGenerator = {
          generate: p => {
            const v = p.velocity.copy();
            v.angle += v.length * Math.PI / 180;
            return v;
          },
          init: () => {},
          update: () => {}
        };
        this.interactivity = {
          mouse: {
            clicking: false,
            inside: false
          }
        };
        this.plugins = new Map;
        this.drawers = new Map;
        this.density = 1;
        this._options = loadContainerOptions(Container_classPrivateFieldGet(this, _Container_engine, "f"), this);
        this.actualOptions = loadContainerOptions(Container_classPrivateFieldGet(this, _Container_engine, "f"), this);
        Container_classPrivateFieldSet(this, _Container_eventListeners, new EventListeners(this), "f");
        if (typeof IntersectionObserver !== "undefined" && IntersectionObserver) {
          this.intersectionObserver = new IntersectionObserver((entries => this.intersectionManager(entries)));
        }
        Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerBuilt", {
          container: this
        });
      }
      get options() {
        return this._options;
      }
      get sourceOptions() {
        return this._sourceOptions;
      }
      addClickHandler(callback) {
        if (!guardCheck(this)) {
          return;
        }
        const el = this.interactivity.element;
        if (!el) {
          return;
        }
        const clickOrTouchHandler = (e, pos, radius) => {
          if (!guardCheck(this)) {
            return;
          }
          const pxRatio = this.retina.pixelRatio, posRetina = {
            x: pos.x * pxRatio,
            y: pos.y * pxRatio
          }, particles = this.particles.quadTree.queryCircle(posRetina, radius * pxRatio);
          callback(e, particles);
        };
        const clickHandler = e => {
          if (!guardCheck(this)) {
            return;
          }
          const mouseEvent = e, pos = {
            x: mouseEvent.offsetX || mouseEvent.clientX,
            y: mouseEvent.offsetY || mouseEvent.clientY
          };
          clickOrTouchHandler(e, pos, 1);
        };
        const touchStartHandler = () => {
          if (!guardCheck(this)) {
            return;
          }
          touched = true;
          touchMoved = false;
        };
        const touchMoveHandler = () => {
          if (!guardCheck(this)) {
            return;
          }
          touchMoved = true;
        };
        const touchEndHandler = e => {
          var _a, _b, _c;
          if (!guardCheck(this)) {
            return;
          }
          if (touched && !touchMoved) {
            const touchEvent = e;
            let lastTouch = touchEvent.touches[touchEvent.touches.length - 1];
            if (!lastTouch) {
              lastTouch = touchEvent.changedTouches[touchEvent.changedTouches.length - 1];
              if (!lastTouch) {
                return;
              }
            }
            const canvasRect = (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect(), pos = {
              x: lastTouch.clientX - ((_b = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _b !== void 0 ? _b : 0),
              y: lastTouch.clientY - ((_c = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _c !== void 0 ? _c : 0)
            };
            clickOrTouchHandler(e, pos, Math.max(lastTouch.radiusX, lastTouch.radiusY));
          }
          touched = false;
          touchMoved = false;
        };
        const touchCancelHandler = () => {
          if (!guardCheck(this)) {
            return;
          }
          touched = false;
          touchMoved = false;
        };
        let touched = false;
        let touchMoved = false;
        el.addEventListener("click", clickHandler);
        el.addEventListener("touchstart", touchStartHandler);
        el.addEventListener("touchmove", touchMoveHandler);
        el.addEventListener("touchend", touchEndHandler);
        el.addEventListener("touchcancel", touchCancelHandler);
      }
      destroy() {
        if (!guardCheck(this)) {
          return;
        }
        this.stop();
        this.particles.destroy();
        this.canvas.destroy();
        for (const [, drawer] of this.drawers) {
          if (drawer.destroy) {
            drawer.destroy(this);
          }
        }
        for (const key of this.drawers.keys()) {
          this.drawers.delete(key);
        }
        this.destroyed = true;
        const mainArr = Container_classPrivateFieldGet(this, _Container_engine, "f").dom(), idx = mainArr.findIndex((t => t === this));
        if (idx >= 0) {
          mainArr.splice(idx, 1);
        }
        Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerDestroyed", {
          container: this
        });
      }
      draw(force) {
        if (!guardCheck(this)) {
          return;
        }
        let refreshTime = force;
        this.drawAnimationFrame = animate()((async timestamp => {
          if (refreshTime) {
            this.lastFrameTime = undefined;
            refreshTime = false;
          }
          await this.drawer.nextFrame(timestamp);
        }));
      }
      exportConfiguration() {
        return JSON.stringify(this.actualOptions, undefined, 2);
      }
      exportImage(callback, type, quality) {
        var _a;
        return (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.toBlob(callback, type !== null && type !== void 0 ? type : "image/png", quality);
      }
      exportImg(callback) {
        this.exportImage(callback);
      }
      getAnimationStatus() {
        return !this.paused && !this.pageHidden && guardCheck(this);
      }
      handleClickMode(mode) {
        if (!guardCheck(this)) {
          return;
        }
        this.particles.handleClickMode(mode);
        for (const [, plugin] of this.plugins) {
          if (plugin.handleClickMode) {
            plugin.handleClickMode(mode);
          }
        }
      }
      async init() {
        if (!guardCheck(this)) {
          return;
        }
        const shapes = Container_classPrivateFieldGet(this, _Container_engine, "f").plugins.getSupportedShapes();
        for (const type of shapes) {
          const drawer = Container_classPrivateFieldGet(this, _Container_engine, "f").plugins.getShapeDrawer(type);
          if (drawer) {
            this.drawers.set(type, drawer);
          }
        }
        this._options = loadContainerOptions(Container_classPrivateFieldGet(this, _Container_engine, "f"), this, this._initialSourceOptions, this.sourceOptions);
        this.actualOptions = loadContainerOptions(Container_classPrivateFieldGet(this, _Container_engine, "f"), this, this._options);
        this.retina.init();
        this.canvas.init();
        this.updateActualOptions();
        this.canvas.initBackground();
        this.canvas.resize();
        this.zLayers = this.actualOptions.zLayers;
        this.duration = getRangeValue(this.actualOptions.duration);
        this.lifeTime = 0;
        this.fpsLimit = this.actualOptions.fpsLimit > 0 ? this.actualOptions.fpsLimit : 120;
        const availablePlugins = Container_classPrivateFieldGet(this, _Container_engine, "f").plugins.getAvailablePlugins(this);
        for (const [id, plugin] of availablePlugins) {
          this.plugins.set(id, plugin);
        }
        for (const [, drawer] of this.drawers) {
          if (drawer.init) {
            await drawer.init(this);
          }
        }
        for (const [, plugin] of this.plugins) {
          if (plugin.init) {
            plugin.init(this.actualOptions);
          } else if (plugin.initAsync !== undefined) {
            await plugin.initAsync(this.actualOptions);
          }
        }
        const pathOptions = this.actualOptions.particles.move.path;
        if (pathOptions.generator) {
          this.setPath(Container_classPrivateFieldGet(this, _Container_engine, "f").plugins.getPathGenerator(pathOptions.generator));
        }
        Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerInit", {
          container: this
        });
        this.particles.init();
        this.particles.setDensity();
        for (const [, plugin] of this.plugins) {
          if (plugin.particlesSetup !== undefined) {
            plugin.particlesSetup();
          }
        }
        Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("particlesSetup", {
          container: this
        });
      }
      async loadTheme(name) {
        if (!guardCheck(this)) {
          return;
        }
        this.currentTheme = name;
        await this.refresh();
      }
      pause() {
        if (!guardCheck(this)) {
          return;
        }
        if (this.drawAnimationFrame !== undefined) {
          cancelAnimation()(this.drawAnimationFrame);
          delete this.drawAnimationFrame;
        }
        if (this.paused) {
          return;
        }
        for (const [, plugin] of this.plugins) {
          if (plugin.pause) {
            plugin.pause();
          }
        }
        if (!this.pageHidden) {
          this.paused = true;
        }
        Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerPaused", {
          container: this
        });
      }
      play(force) {
        if (!guardCheck(this)) {
          return;
        }
        const needsUpdate = this.paused || force;
        if (this.firstStart && !this.actualOptions.autoPlay) {
          this.firstStart = false;
          return;
        }
        if (this.paused) {
          this.paused = false;
        }
        if (needsUpdate) {
          for (const [, plugin] of this.plugins) {
            if (plugin.play) {
              plugin.play();
            }
          }
        }
        Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerPlay", {
          container: this
        });
        this.draw(needsUpdate || false);
      }
      async refresh() {
        if (!guardCheck(this)) {
          return;
        }
        this.stop();
        return this.start();
      }
      async reset() {
        if (!guardCheck(this)) {
          return;
        }
        this._options = loadContainerOptions(Container_classPrivateFieldGet(this, _Container_engine, "f"), this);
        return this.refresh();
      }
      setNoise(noiseOrGenerator, init, update) {
        if (!guardCheck(this)) {
          return;
        }
        this.setPath(noiseOrGenerator, init, update);
      }
      setPath(pathOrGenerator, init, update) {
        var _a, _b, _c;
        if (!pathOrGenerator || !guardCheck(this)) {
          return;
        }
        if (typeof pathOrGenerator === "function") {
          this.pathGenerator.generate = pathOrGenerator;
          if (init) {
            this.pathGenerator.init = init;
          }
          if (update) {
            this.pathGenerator.update = update;
          }
        } else {
          const oldGenerator = this.pathGenerator;
          this.pathGenerator = pathOrGenerator;
          (_a = this.pathGenerator).generate || (_a.generate = oldGenerator.generate);
          (_b = this.pathGenerator).init || (_b.init = oldGenerator.init);
          (_c = this.pathGenerator).update || (_c.update = oldGenerator.update);
        }
      }
      async start() {
        if (this.started || !guardCheck(this)) {
          return;
        }
        await this.init();
        this.started = true;
        Container_classPrivateFieldGet(this, _Container_eventListeners, "f").addListeners();
        if (this.interactivity.element instanceof HTMLElement && this.intersectionObserver) {
          this.intersectionObserver.observe(this.interactivity.element);
        }
        for (const [, plugin] of this.plugins) {
          if (plugin.startAsync !== undefined) {
            await plugin.startAsync();
          } else if (plugin.start !== undefined) {
            plugin.start();
          }
        }
        Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerStarted", {
          container: this
        });
        this.play();
      }
      stop() {
        if (!this.started || !guardCheck(this)) {
          return;
        }
        this.firstStart = true;
        this.started = false;
        Container_classPrivateFieldGet(this, _Container_eventListeners, "f").removeListeners();
        this.pause();
        this.particles.clear();
        this.canvas.clear();
        if (this.interactivity.element instanceof HTMLElement && this.intersectionObserver) {
          this.intersectionObserver.unobserve(this.interactivity.element);
        }
        for (const [, plugin] of this.plugins) {
          if (plugin.stop) {
            plugin.stop();
          }
        }
        for (const key of this.plugins.keys()) {
          this.plugins.delete(key);
        }
        Container_classPrivateFieldGet(this, _Container_engine, "f").plugins.destroy(this);
        delete this.particles.grabLineColor;
        this._sourceOptions = this._options;
        Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerStopped", {
          container: this
        });
      }
      updateActualOptions() {
        this.actualOptions.responsive = [];
        const newMaxWidth = this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, this._options);
        this.actualOptions.setTheme(this.currentTheme);
        if (this.responsiveMaxWidth != newMaxWidth) {
          this.responsiveMaxWidth = newMaxWidth;
          return true;
        }
        return false;
      }
      intersectionManager(entries) {
        if (!this.actualOptions.pauseOnOutsideViewport) {
          return;
        }
        for (const entry of entries) {
          if (entry.target !== this.interactivity.element) {
            continue;
          }
          if (entry.isIntersecting) {
            this.play();
          } else {
            this.pause();
          }
        }
      }
    }
    _Container_engine = new WeakMap, _Container_eventListeners = new WeakMap;
    var Loader_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), 
      value;
    };
    var Loader_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _Loader_engine;
    function fetchError(statusCode) {
      console.error(`Error tsParticles - fetch status: ${statusCode}`);
      console.error("Error tsParticles - File config not found");
    }
    async function getDataFromUrl(jsonUrl, index) {
      const url = jsonUrl instanceof Array ? itemFromArray(jsonUrl, index) : jsonUrl;
      if (!url) {
        return;
      }
      const response = await fetch(url);
      if (!response.ok) {
        fetchError(response.status);
        return;
      }
      return response.json();
    }
    class Loader {
      constructor(engine) {
        _Loader_engine.set(this, void 0);
        Loader_classPrivateFieldSet(this, _Loader_engine, engine, "f");
      }
      load(tagId, options, index) {
        const params = {
          index: index,
          remote: false
        };
        if (typeof tagId === "string") {
          params.tagId = tagId;
        } else {
          params.options = tagId;
        }
        if (typeof options === "number") {
          params.index = options;
        } else {
          params.options = options !== null && options !== void 0 ? options : params.options;
        }
        return this.loadOptions(params);
      }
      async loadJSON(tagId, jsonUrl, index) {
        let url, id;
        if (typeof jsonUrl === "number" || jsonUrl === undefined) {
          url = tagId;
        } else {
          id = tagId;
          url = jsonUrl;
        }
        return this.loadRemoteOptions({
          tagId: id,
          url: url,
          index: index,
          remote: true
        });
      }
      async loadOptions(params) {
        var _a, _b, _c;
        const tagId = (_a = params.tagId) !== null && _a !== void 0 ? _a : `tsparticles${Math.floor(Math.random() * 1e4)}`, {index: index, url: jsonUrl, remote: remote} = params, options = remote ? await getDataFromUrl(jsonUrl, index) : params.options;
        let domContainer = (_b = params.element) !== null && _b !== void 0 ? _b : document.getElementById(tagId);
        if (!domContainer) {
          domContainer = document.createElement("div");
          domContainer.id = tagId;
          (_c = document.querySelector("body")) === null || _c === void 0 ? void 0 : _c.append(domContainer);
        }
        const currentOptions = options instanceof Array ? itemFromArray(options, index) : options, dom = Loader_classPrivateFieldGet(this, _Loader_engine, "f").dom(), oldIndex = dom.findIndex((v => v.id === tagId));
        if (oldIndex >= 0) {
          const old = Loader_classPrivateFieldGet(this, _Loader_engine, "f").domItem(oldIndex);
          if (old && !old.destroyed) {
            old.destroy();
            dom.splice(oldIndex, 1);
          }
        }
        let canvasEl;
        if (domContainer.tagName.toLowerCase() === "canvas") {
          canvasEl = domContainer;
          canvasEl.dataset[generatedAttribute] = "false";
        } else {
          const existingCanvases = domContainer.getElementsByTagName("canvas");
          if (existingCanvases.length) {
            canvasEl = existingCanvases[0];
            canvasEl.dataset[generatedAttribute] = "false";
          } else {
            canvasEl = document.createElement("canvas");
            canvasEl.dataset[generatedAttribute] = "true";
            domContainer.appendChild(canvasEl);
          }
        }
        if (!canvasEl.style.width) {
          canvasEl.style.width = "100%";
        }
        if (!canvasEl.style.height) {
          canvasEl.style.height = "100%";
        }
        const newItem = new Container(Loader_classPrivateFieldGet(this, _Loader_engine, "f"), tagId, currentOptions);
        if (oldIndex >= 0) {
          dom.splice(oldIndex, 0, newItem);
        } else {
          dom.push(newItem);
        }
        newItem.canvas.loadCanvas(canvasEl);
        await newItem.start();
        return newItem;
      }
      async loadRemoteOptions(params) {
        return this.loadOptions(params);
      }
      async set(id, domContainer, options, index) {
        const params = {
          index: index,
          remote: false
        };
        if (typeof id === "string") {
          params.tagId = id;
        } else {
          params.element = id;
        }
        if (domContainer instanceof HTMLElement) {
          params.element = domContainer;
        } else {
          params.options = domContainer;
        }
        if (typeof options === "number") {
          params.index = options;
        } else {
          params.options = options !== null && options !== void 0 ? options : params.options;
        }
        return this.loadOptions(params);
      }
      async setJSON(id, domContainer, jsonUrl, index) {
        let url, newId, newIndex, element;
        if (id instanceof HTMLElement) {
          element = id;
          url = domContainer;
          newIndex = jsonUrl;
        } else {
          newId = id;
          element = domContainer;
          url = jsonUrl;
          newIndex = index;
        }
        return this.loadRemoteOptions({
          tagId: newId,
          url: url,
          index: newIndex,
          element: element,
          remote: true
        });
      }
    }
    _Loader_engine = new WeakMap;
    var Plugins_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), 
      value;
    };
    var _Plugins_engine;
    class Plugins {
      constructor(engine) {
        _Plugins_engine.set(this, void 0);
        Plugins_classPrivateFieldSet(this, _Plugins_engine, engine, "f");
        this.plugins = [];
        this.interactorsInitializers = new Map;
        this.moversInitializers = new Map;
        this.updatersInitializers = new Map;
        this.interactors = new Map;
        this.movers = new Map;
        this.updaters = new Map;
        this.presets = new Map;
        this.drawers = new Map;
        this.pathGenerators = new Map;
      }
      addInteractor(name, initInteractor) {
        this.interactorsInitializers.set(name, initInteractor);
      }
      addParticleMover(name, initMover) {
        this.moversInitializers.set(name, initMover);
      }
      addParticleUpdater(name, initUpdater) {
        this.updatersInitializers.set(name, initUpdater);
      }
      addPathGenerator(type, pathGenerator) {
        if (!this.getPathGenerator(type)) {
          this.pathGenerators.set(type, pathGenerator);
        }
      }
      addPlugin(plugin) {
        if (!this.getPlugin(plugin.id)) {
          this.plugins.push(plugin);
        }
      }
      addPreset(presetKey, options, override = false) {
        if (override || !this.getPreset(presetKey)) {
          this.presets.set(presetKey, options);
        }
      }
      addShapeDrawer(type, drawer) {
        if (!this.getShapeDrawer(type)) {
          this.drawers.set(type, drawer);
        }
      }
      destroy(container) {
        this.updaters.delete(container);
        this.movers.delete(container);
        this.interactors.delete(container);
      }
      getAvailablePlugins(container) {
        const res = new Map;
        for (const plugin of this.plugins) {
          if (!plugin.needsPlugin(container.actualOptions)) {
            continue;
          }
          res.set(plugin.id, plugin.getPlugin(container));
        }
        return res;
      }
      getInteractors(container, force = false) {
        let res = this.interactors.get(container);
        if (!res || force) {
          res = [ ...this.interactorsInitializers.values() ].map((t => t(container)));
          this.interactors.set(container, res);
        }
        return res;
      }
      getMovers(container, force = false) {
        let res = this.movers.get(container);
        if (!res || force) {
          res = [ ...this.moversInitializers.values() ].map((t => t(container)));
          this.movers.set(container, res);
        }
        return res;
      }
      getPathGenerator(type) {
        return this.pathGenerators.get(type);
      }
      getPlugin(plugin) {
        return this.plugins.find((t => t.id === plugin));
      }
      getPreset(preset) {
        return this.presets.get(preset);
      }
      getShapeDrawer(type) {
        return this.drawers.get(type);
      }
      getSupportedShapes() {
        return this.drawers.keys();
      }
      getUpdaters(container, force = false) {
        let res = this.updaters.get(container);
        if (!res || force) {
          res = [ ...this.updatersInitializers.values() ].map((t => t(container)));
          this.updaters.set(container, res);
        }
        return res;
      }
      loadOptions(options, sourceOptions) {
        for (const plugin of this.plugins) {
          plugin.loadOptions(options, sourceOptions);
        }
      }
      loadParticlesOptions(container, options, ...sourceOptions) {
        const updaters = this.updaters.get(container);
        if (!updaters) {
          return;
        }
        for (const updater of updaters) {
          if (updater.loadOptions) {
            updater.loadOptions(options, ...sourceOptions);
          }
        }
      }
    }
    _Plugins_engine = new WeakMap;
    var engine_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
      if (kind === "m") throw new TypeError("Private method is not writable");
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
      return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), 
      value;
    };
    var engine_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function(receiver, state, kind, f) {
      if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
      if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
      return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };
    var _Engine_domArray, _Engine_eventDispatcher, _Engine_initialized, _Engine_loader;
    class Engine {
      constructor() {
        _Engine_domArray.set(this, void 0);
        _Engine_eventDispatcher.set(this, void 0);
        _Engine_initialized.set(this, void 0);
        _Engine_loader.set(this, void 0);
        engine_classPrivateFieldSet(this, _Engine_domArray, [], "f");
        engine_classPrivateFieldSet(this, _Engine_eventDispatcher, new EventDispatcher, "f");
        engine_classPrivateFieldSet(this, _Engine_initialized, false, "f");
        engine_classPrivateFieldSet(this, _Engine_loader, new Loader(this), "f");
        this.plugins = new Plugins(this);
      }
      addEventListener(type, listener) {
        engine_classPrivateFieldGet(this, _Engine_eventDispatcher, "f").addEventListener(type, listener);
      }
      async addInteractor(name, interactorInitializer) {
        this.plugins.addInteractor(name, interactorInitializer);
        await this.refresh();
      }
      async addMover(name, moverInitializer) {
        this.plugins.addParticleMover(name, moverInitializer);
        await this.refresh();
      }
      async addParticleUpdater(name, updaterInitializer) {
        this.plugins.addParticleUpdater(name, updaterInitializer);
        await this.refresh();
      }
      async addPathGenerator(name, generator) {
        this.plugins.addPathGenerator(name, generator);
        await this.refresh();
      }
      async addPlugin(plugin) {
        this.plugins.addPlugin(plugin);
        await this.refresh();
      }
      async addPreset(preset, options, override = false) {
        this.plugins.addPreset(preset, options, override);
        await this.refresh();
      }
      async addShape(shape, drawer, init, afterEffect, destroy) {
        let customDrawer;
        if (typeof drawer === "function") {
          customDrawer = {
            afterEffect: afterEffect,
            destroy: destroy,
            draw: drawer,
            init: init
          };
        } else {
          customDrawer = drawer;
        }
        this.plugins.addShapeDrawer(shape, customDrawer);
        await this.refresh();
      }
      dispatchEvent(type, args) {
        engine_classPrivateFieldGet(this, _Engine_eventDispatcher, "f").dispatchEvent(type, args);
      }
      dom() {
        return engine_classPrivateFieldGet(this, _Engine_domArray, "f");
      }
      domItem(index) {
        const dom = this.dom(), item = dom[index];
        if (item && !item.destroyed) {
          return item;
        }
        dom.splice(index, 1);
      }
      init() {
        if (!engine_classPrivateFieldGet(this, _Engine_initialized, "f")) {
          engine_classPrivateFieldSet(this, _Engine_initialized, true, "f");
        }
      }
      async load(tagId, options) {
        return engine_classPrivateFieldGet(this, _Engine_loader, "f").load(tagId, options);
      }
      async loadFromArray(tagId, options, index) {
        return engine_classPrivateFieldGet(this, _Engine_loader, "f").load(tagId, options, index);
      }
      async loadJSON(tagId, pathConfigJson, index) {
        return engine_classPrivateFieldGet(this, _Engine_loader, "f").loadJSON(tagId, pathConfigJson, index);
      }
      async refresh() {
        for (const instance of this.dom()) {
          await instance.refresh();
        }
      }
      removeEventListener(type, listener) {
        engine_classPrivateFieldGet(this, _Engine_eventDispatcher, "f").removeEventListener(type, listener);
      }
      async set(id, element, options) {
        return engine_classPrivateFieldGet(this, _Engine_loader, "f").set(id, element, options);
      }
      async setJSON(id, element, pathConfigJson, index) {
        return engine_classPrivateFieldGet(this, _Engine_loader, "f").setJSON(id, element, pathConfigJson, index);
      }
      setOnClickHandler(callback) {
        const dom = this.dom();
        if (!dom.length) {
          throw new Error("Can only set click handlers after calling tsParticles.load() or tsParticles.loadJSON()");
        }
        for (const domItem of dom) {
          domItem.addClickHandler(callback);
        }
      }
    }
    _Engine_domArray = new WeakMap, _Engine_eventDispatcher = new WeakMap, _Engine_initialized = new WeakMap, 
    _Engine_loader = new WeakMap;
    class ExternalInteractorBase {
      constructor(container) {
        this.container = container;
        this.type = 0;
      }
    }
    class ParticlesInteractorBase {
      constructor(container) {
        this.container = container;
        this.type = 1;
      }
    }
    const tsParticles = new Engine;
    tsParticles.init();
    return __webpack_exports__;
  }();
}));