/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.0.6
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
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
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "AnimatableColor": () => (/* reexport */ AnimatableColor),
  "AnimatableGradient": () => (/* reexport */ AnimatableGradient),
  "AnimatableGradientColor": () => (/* reexport */ AnimatableGradientColor),
  "AnimationOptions": () => (/* reexport */ AnimationOptions),
  "Attract": () => (/* reexport */ Attract),
  "Background": () => (/* reexport */ Background),
  "BackgroundMask": () => (/* reexport */ BackgroundMask),
  "BackgroundMaskCover": () => (/* reexport */ BackgroundMaskCover),
  "Bounce": () => (/* reexport */ Bounce),
  "Bubble": () => (/* reexport */ Bubble),
  "BubbleBase": () => (/* reexport */ BubbleBase),
  "BubbleDiv": () => (/* reexport */ BubbleDiv),
  "Canvas": () => (/* reexport */ Canvas),
  "Circle": () => (/* reexport */ Circle),
  "CircleWarp": () => (/* reexport */ CircleWarp),
  "ClickEvent": () => (/* reexport */ ClickEvent),
  "Collisions": () => (/* reexport */ Collisions),
  "CollisionsOverlap": () => (/* reexport */ CollisionsOverlap),
  "ColorAnimation": () => (/* reexport */ ColorAnimation),
  "Connect": () => (/* reexport */ Connect),
  "ConnectLinks": () => (/* reexport */ ConnectLinks),
  "Container": () => (/* reexport */ Container),
  "Destroy": () => (/* reexport */ Destroy),
  "DivEvent": () => (/* reexport */ DivEvent),
  "Engine": () => (/* reexport */ Engine),
  "EventListeners": () => (/* reexport */ EventListeners),
  "Events": () => (/* reexport */ Events),
  "ExternalInteractorBase": () => (/* reexport */ ExternalInteractorBase),
  "FrameManager": () => (/* reexport */ FrameManager),
  "FullScreen": () => (/* reexport */ FullScreen),
  "Grab": () => (/* reexport */ Grab),
  "GrabLinks": () => (/* reexport */ GrabLinks),
  "GradientAngle": () => (/* reexport */ GradientAngle),
  "GradientAngleAnimation": () => (/* reexport */ GradientAngleAnimation),
  "GradientColorOpacity": () => (/* reexport */ GradientColorOpacity),
  "GradientColorOpacityAnimation": () => (/* reexport */ GradientColorOpacityAnimation),
  "HoverEvent": () => (/* reexport */ HoverEvent),
  "HslAnimation": () => (/* reexport */ HslAnimation),
  "InteractionManager": () => (/* reexport */ InteractionManager),
  "Interactivity": () => (/* reexport */ Interactivity),
  "Life": () => (/* reexport */ Life),
  "LifeDelay": () => (/* reexport */ LifeDelay),
  "LifeDuration": () => (/* reexport */ LifeDuration),
  "Light": () => (/* reexport */ Light),
  "LightArea": () => (/* reexport */ LightArea),
  "LightGradient": () => (/* reexport */ LightGradient),
  "LightShadow": () => (/* reexport */ LightShadow),
  "Links": () => (/* reexport */ Links),
  "LinksShadow": () => (/* reexport */ LinksShadow),
  "LinksTriangle": () => (/* reexport */ LinksTriangle),
  "Loader": () => (/* reexport */ Loader),
  "Main": () => (/* reexport */ Engine),
  "ManualParticle": () => (/* reexport */ ManualParticle),
  "Modes": () => (/* reexport */ Modes),
  "Motion": () => (/* reexport */ Motion),
  "MotionReduce": () => (/* reexport */ MotionReduce),
  "Move": () => (/* reexport */ Move),
  "MoveAngle": () => (/* reexport */ MoveAngle),
  "MoveAttract": () => (/* reexport */ MoveAttract),
  "MoveGravity": () => (/* reexport */ MoveGravity),
  "MovePath": () => (/* reexport */ MovePath),
  "MovePathDelay": () => (/* reexport */ MovePathDelay),
  "MoveTrail": () => (/* reexport */ MoveTrail),
  "Opacity": () => (/* reexport */ Opacity),
  "OpacityAnimation": () => (/* reexport */ OpacityAnimation),
  "Options": () => (/* reexport */ Options),
  "OptionsColor": () => (/* reexport */ OptionsColor),
  "Orbit": () => (/* reexport */ Orbit),
  "OrbitRotation": () => (/* reexport */ OrbitRotation),
  "OutModes": () => (/* reexport */ OutModes),
  "Parallax": () => (/* reexport */ Parallax),
  "Particle": () => (/* reexport */ Particle),
  "Particles": () => (/* reexport */ Particles),
  "ParticlesBounce": () => (/* reexport */ ParticlesBounce),
  "ParticlesBounceFactor": () => (/* reexport */ ParticlesBounceFactor),
  "ParticlesDensity": () => (/* reexport */ ParticlesDensity),
  "ParticlesInteractorBase": () => (/* reexport */ ParticlesInteractorBase),
  "ParticlesNumber": () => (/* reexport */ ParticlesNumber),
  "ParticlesOptions": () => (/* reexport */ ParticlesOptions),
  "ParticlesRepulse": () => (/* reexport */ ParticlesRepulse),
  "Plugins": () => (/* reexport */ Plugins),
  "Point": () => (/* reexport */ Point),
  "Push": () => (/* reexport */ Push),
  "QuadTree": () => (/* reexport */ QuadTree),
  "Range": () => (/* reexport */ Range),
  "Rectangle": () => (/* reexport */ Rectangle),
  "Remove": () => (/* reexport */ Remove),
  "Repulse": () => (/* reexport */ Repulse),
  "RepulseBase": () => (/* reexport */ RepulseBase),
  "RepulseDiv": () => (/* reexport */ RepulseDiv),
  "Responsive": () => (/* reexport */ Responsive),
  "Retina": () => (/* reexport */ Retina),
  "Roll": () => (/* reexport */ Roll),
  "RollLight": () => (/* reexport */ RollLight),
  "Rotate": () => (/* reexport */ Rotate),
  "RotateAnimation": () => (/* reexport */ RotateAnimation),
  "Shadow": () => (/* reexport */ Shadow),
  "Shape": () => (/* reexport */ Shape),
  "Size": () => (/* reexport */ Size),
  "SizeAnimation": () => (/* reexport */ SizeAnimation),
  "Slow": () => (/* reexport */ Slow),
  "Spin": () => (/* reexport */ Spin),
  "Split": () => (/* reexport */ Split),
  "SplitFactor": () => (/* reexport */ SplitFactor),
  "SplitRate": () => (/* reexport */ SplitRate),
  "Stroke": () => (/* reexport */ Stroke),
  "Theme": () => (/* reexport */ Theme),
  "ThemeDefault": () => (/* reexport */ ThemeDefault),
  "Tilt": () => (/* reexport */ Tilt),
  "TiltAnimation": () => (/* reexport */ TiltAnimation),
  "Trail": () => (/* reexport */ Trail),
  "Twinkle": () => (/* reexport */ Twinkle),
  "TwinkleValues": () => (/* reexport */ TwinkleValues),
  "ValueWithRandom": () => (/* reexport */ ValueWithRandom),
  "Vector": () => (/* reexport */ Vector),
  "Vector3d": () => (/* reexport */ Vector3d),
  "Wobble": () => (/* reexport */ Wobble),
  "ZIndex": () => (/* reexport */ ZIndex),
  "alterHsl": () => (/* reexport */ alterHsl),
  "animate": () => (/* reexport */ animate),
  "areBoundsInside": () => (/* reexport */ areBoundsInside),
  "arrayRandomIndex": () => (/* reexport */ arrayRandomIndex),
  "calcEasing": () => (/* reexport */ calcEasing),
  "calcExactPositionOrRandomFromSize": () => (/* reexport */ calcExactPositionOrRandomFromSize),
  "calcExactPositionOrRandomFromSizeRanged": () => (/* reexport */ calcExactPositionOrRandomFromSizeRanged),
  "calcPositionFromSize": () => (/* reexport */ calcPositionFromSize),
  "calcPositionOrRandomFromSize": () => (/* reexport */ calcPositionOrRandomFromSize),
  "calcPositionOrRandomFromSizeRanged": () => (/* reexport */ calcPositionOrRandomFromSizeRanged),
  "calculateBounds": () => (/* reexport */ calculateBounds),
  "cancelAnimation": () => (/* reexport */ cancelAnimation),
  "circleBounce": () => (/* reexport */ circleBounce),
  "circleBounceDataFromParticle": () => (/* reexport */ circleBounceDataFromParticle),
  "clamp": () => (/* reexport */ clamp),
  "clear": () => (/* reexport */ clear),
  "collisionVelocity": () => (/* reexport */ collisionVelocity),
  "colorMix": () => (/* reexport */ colorMix),
  "colorToHsl": () => (/* reexport */ colorToHsl),
  "colorToRgb": () => (/* reexport */ colorToRgb),
  "deepExtend": () => (/* reexport */ deepExtend),
  "divMode": () => (/* reexport */ divMode),
  "divModeExecute": () => (/* reexport */ divModeExecute),
  "drawConnectLine": () => (/* reexport */ drawConnectLine),
  "drawEllipse": () => (/* reexport */ drawEllipse),
  "drawGrabLine": () => (/* reexport */ drawGrabLine),
  "drawLine": () => (/* reexport */ drawLine),
  "drawParticle": () => (/* reexport */ drawParticle),
  "drawParticlePlugin": () => (/* reexport */ drawParticlePlugin),
  "drawPlugin": () => (/* reexport */ drawPlugin),
  "drawShape": () => (/* reexport */ drawShape),
  "drawShapeAfterEffect": () => (/* reexport */ drawShapeAfterEffect),
  "drawTriangle": () => (/* reexport */ drawTriangle),
  "generatedAttribute": () => (/* reexport */ generatedAttribute),
  "getDistance": () => (/* reexport */ getDistance),
  "getDistances": () => (/* reexport */ getDistances),
  "getHslAnimationFromHsl": () => (/* reexport */ getHslAnimationFromHsl),
  "getHslFromAnimation": () => (/* reexport */ getHslFromAnimation),
  "getLinkColor": () => (/* reexport */ getLinkColor),
  "getLinkRandomColor": () => (/* reexport */ getLinkRandomColor),
  "getParticleBaseVelocity": () => (/* reexport */ getParticleBaseVelocity),
  "getParticleDirectionAngle": () => (/* reexport */ getParticleDirectionAngle),
  "getRandomRgbColor": () => (/* reexport */ getRandomRgbColor),
  "getRangeMax": () => (/* reexport */ getRangeMax),
  "getRangeMin": () => (/* reexport */ getRangeMin),
  "getRangeValue": () => (/* reexport */ getRangeValue),
  "getStyleFromHsl": () => (/* reexport */ getStyleFromHsl),
  "getStyleFromHsv": () => (/* reexport */ getStyleFromHsv),
  "getStyleFromRgb": () => (/* reexport */ getStyleFromRgb),
  "getValue": () => (/* reexport */ getValue),
  "gradient": () => (/* reexport */ gradient),
  "hslToHsv": () => (/* reexport */ hslToHsv),
  "hslToRgb": () => (/* reexport */ hslToRgb),
  "hslaToHsva": () => (/* reexport */ hslaToHsva),
  "hslaToRgba": () => (/* reexport */ hslaToRgba),
  "hsvToHsl": () => (/* reexport */ hsvToHsl),
  "hsvToRgb": () => (/* reexport */ hsvToRgb),
  "hsvaToHsla": () => (/* reexport */ hsvaToHsla),
  "hsvaToRgba": () => (/* reexport */ hsvaToRgba),
  "isDivModeEnabled": () => (/* reexport */ isDivModeEnabled),
  "isInArray": () => (/* reexport */ isInArray),
  "isPointInside": () => (/* reexport */ isPointInside),
  "isSsr": () => (/* reexport */ isSsr),
  "itemFromArray": () => (/* reexport */ itemFromArray),
  "loadContainerOptions": () => (/* reexport */ loadContainerOptions),
  "loadFont": () => (/* reexport */ loadFont),
  "loadParticlesOptions": () => (/* reexport */ loadParticlesOptions),
  "loadSlim": () => (/* reexport */ loadSlim),
  "midColorValue": () => (/* reexport */ midColorValue),
  "mix": () => (/* reexport */ mix),
  "mouseDownEvent": () => (/* reexport */ mouseDownEvent),
  "mouseLeaveEvent": () => (/* reexport */ mouseLeaveEvent),
  "mouseMoveEvent": () => (/* reexport */ mouseMoveEvent),
  "mouseOutEvent": () => (/* reexport */ mouseOutEvent),
  "mouseUpEvent": () => (/* reexport */ mouseUpEvent),
  "noPolygonDataLoaded": () => (/* reexport */ noPolygonDataLoaded),
  "noPolygonFound": () => (/* reexport */ noPolygonFound),
  "paintBase": () => (/* reexport */ paintBase),
  "randomColorValue": () => (/* reexport */ randomColorValue),
  "randomInRange": () => (/* reexport */ randomInRange),
  "rectBounce": () => (/* reexport */ rectBounce),
  "resizeEvent": () => (/* reexport */ resizeEvent),
  "rgbToHsl": () => (/* reexport */ rgbToHsl),
  "rgbToHsv": () => (/* reexport */ rgbToHsv),
  "rgbaToHsva": () => (/* reexport */ rgbaToHsva),
  "setRangeValue": () => (/* reexport */ setRangeValue),
  "singleDivModeExecute": () => (/* reexport */ singleDivModeExecute),
  "stringToAlpha": () => (/* reexport */ stringToAlpha),
  "stringToRgb": () => (/* reexport */ stringToRgb),
  "touchCancelEvent": () => (/* reexport */ touchCancelEvent),
  "touchEndEvent": () => (/* reexport */ touchEndEvent),
  "touchMoveEvent": () => (/* reexport */ touchMoveEvent),
  "touchStartEvent": () => (/* reexport */ touchStartEvent),
  "tsParticles": () => (/* reexport */ tsParticles),
  "visibilityChangeEvent": () => (/* reexport */ visibilityChangeEvent)
});

;// CONCATENATED MODULE: ../pjs/dist/esm/index.js
const initPjs = engine => {
  const particlesJS = (tagId, options) => {
    return engine.load(tagId, options);
  };

  particlesJS.load = (tagId, pathConfigJson, callback) => {
    engine.loadJSON(tagId, pathConfigJson).then(container => {
      if (container) {
        callback(container);
      }
    }).catch(() => {
      callback(undefined);
    });
  };

  particlesJS.setOnClickHandler = callback => {
    engine.setOnClickHandler(callback);
  };

  const pJSDom = engine.dom();
  return {
    particlesJS,
    pJSDom
  };
};


;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/EventDispatcher.js
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

var _EventDispatcher_listeners;

class EventDispatcher {
  constructor() {
    _EventDispatcher_listeners.set(this, void 0);

    __classPrivateFieldSet(this, _EventDispatcher_listeners, new Map(), "f");
  }

  addEventListener(type, listener) {
    var _a;

    this.removeEventListener(type, listener);

    if (!__classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type)) {
      __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").set(type, []);
    }

    (_a = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type)) === null || _a === void 0 ? void 0 : _a.push(listener);
  }

  removeEventListener(type, listener) {
    const arr = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type);

    if (!arr) {
      return;
    }

    const length = arr.length,
          idx = arr.indexOf(listener);

    if (idx < 0) {
      return;
    }

    if (length === 1) {
      __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").delete(type);
    } else {
      arr.splice(idx, 1);
    }
  }

  removeAllEventListeners(type) {
    if (!type) {
      __classPrivateFieldSet(this, _EventDispatcher_listeners, new Map(), "f");
    } else {
      __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").delete(type);
    }
  }

  dispatchEvent(type, args) {
    var _a;

    (_a = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type)) === null || _a === void 0 ? void 0 : _a.forEach(handler => handler(args));
  }

  hasEventListener(type) {
    return !!__classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type);
  }

}
_EventDispatcher_listeners = new WeakMap();
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Vector.js
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

  static clone(source) {
    return Vector.create(source.x, source.y);
  }

  static create(x, y) {
    return new Vector(x, y);
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

  add(v) {
    return Vector.create(this.x + v.x, this.y + v.y);
  }

  addTo(v) {
    this.x += v.x;
    this.y += v.y;
  }

  sub(v) {
    return Vector.create(this.x - v.x, this.y - v.y);
  }

  subFrom(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  mult(n) {
    return Vector.create(this.x * n, this.y * n);
  }

  multTo(n) {
    this.x *= n;
    this.y *= n;
  }

  div(n) {
    return Vector.create(this.x / n, this.y / n);
  }

  divTo(n) {
    this.x /= n;
    this.y /= n;
  }

  distanceTo(v) {
    return this.sub(v).length;
  }

  getLengthSq() {
    return this.x ** 2 + this.y ** 2;
  }

  distanceToSq(v) {
    return this.sub(v).getLengthSq();
  }

  manhattanDistanceTo(v) {
    return Math.abs(v.x - this.x) + Math.abs(v.y - this.y);
  }

  copy() {
    return Vector.clone(this);
  }

  setTo(v) {
    this.x = v.x;
    this.y = v.y;
  }

  rotate(angle) {
    return Vector.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
  }

  updateFromAngle(angle, length) {
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/NumberUtils.js

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

  const min = getRangeMin(source),
        max = getRangeMax(source);
  return value !== undefined ? {
    min: Math.min(min, value),
    max: Math.max(max, value)
  } : setRangeValue(min, max);
}
function getValue(options) {
  const random = options.random,
        {
    enable,
    minimumValue
  } = typeof random === "boolean" ? {
    enable: random,
    minimumValue: 0
  } : random;
  return enable ? getRangeValue(setRangeValue(options.value, minimumValue)) : getRangeValue(options.value);
}
function getDistances(pointA, pointB) {
  const dx = pointA.x - pointB.x,
        dy = pointA.y - pointB.y;
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
        const c1 = 1.70158,
              c3 = c1 + 1;
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
    position
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
    position
  });
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/OptionsColor.js
class OptionsColor {
  constructor() {
    this.value = "";
  }

  static create(source, data) {
    const color = new OptionsColor();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Background/Background.js

class Background {
  constructor() {
    this.color = new OptionsColor();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/BackgroundMask/BackgroundMaskCover.js

class BackgroundMaskCover {
  constructor() {
    this.color = new OptionsColor();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/BackgroundMask/BackgroundMask.js

class BackgroundMask {
  constructor() {
    this.composite = "destination-out";
    this.cover = new BackgroundMaskCover();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/FullScreen/FullScreen.js
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Events/ClickEvent.js
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Events/DivEvent.js
class DivEvent {
  constructor() {
    this.selectors = [];
    this.enable = false;
    this.mode = [];
    this.type = "circle";
  }

  get elementId() {
    return this.ids;
  }

  set elementId(value) {
    this.ids = value;
  }

  get el() {
    return this.elementId;
  }

  set el(value) {
    this.elementId = value;
  }

  get ids() {
    return this.selectors instanceof Array ? this.selectors.map(t => t.replace("#", "")) : this.selectors.replace("#", "");
  }

  set ids(value) {
    this.selectors = value instanceof Array ? value.map(t => `#${t}`) : `#${value}`;
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Events/Parallax.js
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Events/HoverEvent.js

class HoverEvent {
  constructor() {
    this.enable = false;
    this.mode = [];
    this.parallax = new Parallax();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Events/Events.js



class Events {
  constructor() {
    this.onClick = new ClickEvent();
    this.onDiv = new DivEvent();
    this.onHover = new HoverEvent();
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
        this.onDiv = onDiv.map(div => {
          const tmp = new DivEvent();
          tmp.load(div);
          return tmp;
        });
      } else {
        this.onDiv = new DivEvent();
        this.onDiv.load(onDiv);
      }
    }

    this.onHover.load((_c = data.onHover) !== null && _c !== void 0 ? _c : data.onhover);

    if (data.resize !== undefined) {
      this.resize = data.resize;
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/Attract.js
class Attract {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/Bounce.js
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/BubbleBase.js

class BubbleBase {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
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
        this.color = data.color.map(s => OptionsColor.create(undefined, s));
      } else {
        if (this.color instanceof Array) {
          this.color = new OptionsColor();
        }

        this.color = OptionsColor.create(this.color, data.color);
      }
    }

    if (data.size !== undefined) {
      this.size = data.size;
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/BubbleDiv.js

class BubbleDiv extends BubbleBase {
  constructor() {
    super();
    this.selectors = [];
  }

  get ids() {
    return this.selectors instanceof Array ? this.selectors.map(t => t.replace("#", "")) : this.selectors.replace("#", "");
  }

  set ids(value) {
    this.selectors = value instanceof Array ? value.map(t => `#${t}`) : `#${value}`;
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/Bubble.js


class Bubble extends BubbleBase {
  load(data) {
    super.load(data);

    if (!data) {
      return;
    }

    if (data.divs instanceof Array) {
      this.divs = data.divs.map(s => {
        const tmp = new BubbleDiv();
        tmp.load(s);
        return tmp;
      });
    } else {
      if (this.divs instanceof Array || !this.divs) {
        this.divs = new BubbleDiv();
      }

      this.divs.load(data.divs);
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/ConnectLinks.js
class ConnectLinks {
  constructor() {
    this.opacity = 0.5;
  }

  load(data) {
    if (!(data !== undefined && data.opacity !== undefined)) {
      return;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/Connect.js

class Connect {
  constructor() {
    this.distance = 80;
    this.links = new ConnectLinks();
    this.radius = 60;
  }

  get line_linked() {
    return this.links;
  }

  set line_linked(value) {
    this.links = value;
  }

  get lineLinked() {
    return this.links;
  }

  set lineLinked(value) {
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/GrabLinks.js

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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/Grab.js

class Grab {
  constructor() {
    this.distance = 100;
    this.links = new GrabLinks();
  }

  get line_linked() {
    return this.links;
  }

  set line_linked(value) {
    this.links = value;
  }

  get lineLinked() {
    return this.links;
  }

  set lineLinked(value) {
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/LightGradient.js

class LightGradient {
  constructor() {
    this.start = new OptionsColor();
    this.stop = new OptionsColor();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/LightArea.js

class LightArea {
  constructor() {
    this.gradient = new LightGradient();
    this.radius = 1000;
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/LightShadow.js

class LightShadow {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "#000000";
    this.length = 2000;
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/Light.js


class Light {
  constructor() {
    this.area = new LightArea();
    this.shadow = new LightShadow();
  }

  load(data) {
    if (!data) {
      return;
    }

    this.area.load(data.area);
    this.shadow.load(data.shadow);
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/Push.js
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
      this.groups = data.groups.map(t => t);
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/Remove.js
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/RepulseBase.js
class RepulseBase {
  constructor() {
    this.distance = 200;
    this.duration = 0.4;
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/RepulseDiv.js

class RepulseDiv extends RepulseBase {
  constructor() {
    super();
    this.selectors = [];
  }

  get ids() {
    if (this.selectors instanceof Array) {
      return this.selectors.map(t => t.replace("#", ""));
    } else {
      return this.selectors.replace("#", "");
    }
  }

  set ids(value) {
    if (value instanceof Array) {
      this.selectors = value.map(() => `#${value}`);
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/Repulse.js


class Repulse extends RepulseBase {
  load(data) {
    super.load(data);

    if (!data) {
      return;
    }

    if (data.divs instanceof Array) {
      this.divs = data.divs.map(s => {
        const tmp = new RepulseDiv();
        tmp.load(s);
        return tmp;
      });
    } else {
      if (this.divs instanceof Array || !this.divs) {
        this.divs = new RepulseDiv();
      }

      this.divs.load(data.divs);
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/Slow.js
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/Trail.js

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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/Modes.js











class Modes {
  constructor() {
    this.attract = new Attract();
    this.bounce = new Bounce();
    this.bubble = new Bubble();
    this.connect = new Connect();
    this.grab = new Grab();
    this.light = new Light();
    this.push = new Push();
    this.remove = new Remove();
    this.repulse = new Repulse();
    this.slow = new Slow();
    this.trail = new Trail();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Interactivity.js


class Interactivity {
  constructor() {
    this.detectsOn = "window";
    this.events = new Events();
    this.modes = new Modes();
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
        this.events.onHover.mode = [this.events.onHover.mode, "slow"];
      }
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/ManualParticle.js

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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Motion/MotionReduce.js
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Motion/Motion.js

class Motion {
  constructor() {
    this.disable = false;
    this.reduce = new MotionReduce();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Responsive.js

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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Theme/ThemeDefault.js
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Theme/Theme.js


class Theme {
  constructor() {
    this.name = "";
    this.default = new ThemeDefault();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Options.js
var Options_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var Options_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Options_instances, _Options_engine, _Options_findDefaultTheme;










class Options {
  constructor(engine) {
    _Options_instances.add(this);

    _Options_engine.set(this, void 0);

    Options_classPrivateFieldSet(this, _Options_engine, engine, "f");

    this.autoPlay = true;
    this.background = new Background();
    this.backgroundMask = new BackgroundMask();
    this.fullScreen = new FullScreen();
    this.detectRetina = true;
    this.duration = 0;
    this.fpsLimit = 120;
    this.interactivity = new Interactivity();
    this.manualParticles = [];
    this.motion = new Motion();
    this.particles = loadParticlesOptions();
    this.pauseOnBlur = true;
    this.pauseOnOutsideViewport = true;
    this.responsive = [];
    this.style = {};
    this.themes = [];
    this.zLayers = 100;
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

  get backgroundMode() {
    return this.fullScreen;
  }

  set backgroundMode(value) {
    this.fullScreen.load(value);
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
      this.manualParticles = data.manualParticles.map(t => {
        const tmp = new ManualParticle();
        tmp.load(t);
        return tmp;
      });
    }

    this.motion.load(data.motion);
    this.particles.load(data.particles);
    this.style = deepExtend(this.style, data.style);

    Options_classPrivateFieldGet(this, _Options_engine, "f").plugins.loadOptions(this, data);

    if (data.responsive !== undefined) {
      for (const responsive of data.responsive) {
        const optResponsive = new Responsive();
        optResponsive.load(responsive);
        this.responsive.push(optResponsive);
      }
    }

    this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);

    if (data.themes !== undefined) {
      for (const theme of data.themes) {
        const optTheme = new Theme();
        optTheme.load(theme);
        this.themes.push(optTheme);
      }
    }

    this.defaultDarkTheme = (_d = Options_classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, "dark")) === null || _d === void 0 ? void 0 : _d.name;
    this.defaultLightTheme = (_e = Options_classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, "light")) === null || _e === void 0 ? void 0 : _e.name;
  }

  setTheme(name) {
    if (name) {
      const chosenTheme = this.themes.find(theme => theme.name === name);

      if (chosenTheme) {
        this.load(chosenTheme.options);
      }
    } else {
      const mediaMatch = typeof matchMedia !== "undefined" && matchMedia("(prefers-color-scheme: dark)"),
            clientDarkMode = mediaMatch && mediaMatch.matches,
            defaultTheme = Options_classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, clientDarkMode ? "dark" : "light");

      if (defaultTheme) {
        this.load(defaultTheme.options);
      }
    }
  }

  setResponsive(width, pxRatio, defaultOptions) {
    this.load(defaultOptions);
    const responsiveOptions = this.responsive.find(t => t.mode === "screen" && screen ? t.maxWidth * pxRatio > screen.availWidth : t.maxWidth * pxRatio > width);
    this.load(responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.options);
    return responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.maxWidth;
  }

  importPreset(preset) {
    this.load(Options_classPrivateFieldGet(this, _Options_engine, "f").plugins.getPreset(preset));
  }

}
_Options_engine = new WeakMap(), _Options_instances = new WeakSet(), _Options_findDefaultTheme = function _Options_findDefaultTheme(mode) {
  var _a;

  return (_a = this.themes.find(theme => theme.default.value && theme.default.mode === mode)) !== null && _a !== void 0 ? _a : this.themes.find(theme => theme.default.value && theme.default.mode === "any");
};
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/ColorAnimation.js

class ColorAnimation {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.offset = 0;
    this.speed = 1;
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

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/HslAnimation.js

class HslAnimation {
  constructor() {
    this.h = new ColorAnimation();
    this.s = new ColorAnimation();
    this.l = new ColorAnimation();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/AnimatableColor.js


class AnimatableColor extends OptionsColor {
  constructor() {
    super();
    this.animation = new HslAnimation();
  }

  static create(source, data) {
    const color = new AnimatableColor();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/AnimatableGradient.js


class AnimatableGradient {
  constructor() {
    this.angle = new GradientAngle();
    this.colors = [];
    this.type = "random";
  }

  load(data) {
    if (!data) {
      return;
    }

    this.angle.load(data.angle);

    if (data.colors !== undefined) {
      this.colors = data.colors.map(s => {
        const tmp = new AnimatableGradientColor();
        tmp.load(s);
        return tmp;
      });
    }

    if (data.type !== undefined) {
      this.type = data.type;
    }
  }

}
class GradientAngle {
  constructor() {
    this.value = 0;
    this.animation = new GradientAngleAnimation();
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
class GradientColorOpacity {
  constructor() {
    this.value = 0;
    this.animation = new GradientColorOpacityAnimation();
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
    this.value = new AnimatableColor();
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
      this.opacity = new GradientColorOpacity();

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

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}
class GradientColorOpacityAnimation {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 0;
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Collisions/CollisionsOverlap.js
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Random.js
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/ValueWithRandom.js


class ValueWithRandom {
  constructor() {
    this.random = new Random();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js

class ParticlesBounceFactor extends ValueWithRandom {
  constructor() {
    super();
    this.random.minimumValue = 0.1;
    this.value = 1;
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Bounce/ParticlesBounce.js

class ParticlesBounce {
  constructor() {
    this.horizontal = new ParticlesBounceFactor();
    this.vertical = new ParticlesBounceFactor();
  }

  load(data) {
    if (!data) {
      return;
    }

    this.horizontal.load(data.horizontal);
    this.vertical.load(data.vertical);
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Collisions/Collisions.js


class Collisions {
  constructor() {
    this.bounce = new ParticlesBounce();
    this.enable = false;
    this.mode = "bounce";
    this.overlap = new CollisionsOverlap();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Destroy/SplitFactor.js

class SplitFactor extends ValueWithRandom {
  constructor() {
    super();
    this.value = 3;
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Destroy/SplitRate.js

class SplitRate extends ValueWithRandom {
  constructor() {
    super();
    this.value = {
      min: 4,
      max: 9
    };
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Destroy/Split.js



class Split {
  constructor() {
    this.count = 1;
    this.factor = new SplitFactor();
    this.rate = new SplitRate();
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
      this.particles = deepExtend({}, data.particles);
    }

    if (data.sizeOffset !== undefined) {
      this.sizeOffset = data.sizeOffset;
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Destroy/Destroy.js

class Destroy {
  constructor() {
    this.mode = "none";
    this.split = new Split();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Life/LifeDelay.js

class LifeDelay extends ValueWithRandom {
  constructor() {
    super();
    this.sync = false;
  }

  load(data) {
    if (!data) {
      return;
    }

    super.load(data);

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Life/LifeDuration.js

class LifeDuration extends ValueWithRandom {
  constructor() {
    super();
    this.random.minimumValue = 0.0001;
    this.sync = false;
  }

  load(data) {
    if (!data) {
      return;
    }

    super.load(data);

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Life/Life.js


class Life {
  constructor() {
    this.count = 0;
    this.delay = new LifeDelay();
    this.duration = new LifeDuration();
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.count !== undefined) {
      this.count = data.count;
    }

    this.delay.load(data.delay);
    this.duration.load(data.duration);
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Links/LinksShadow.js

class LinksShadow {
  constructor() {
    this.blur = 5;
    this.color = new OptionsColor();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Links/LinksTriangle.js

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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Links/Links.js



class Links {
  constructor() {
    this.blink = false;
    this.color = new OptionsColor();
    this.color.value = "#fff";
    this.consent = false;
    this.distance = 100;
    this.enable = false;
    this.frequency = 1;
    this.opacity = 1;
    this.shadow = new LinksShadow();
    this.triangles = new LinksTriangle();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/MoveAngle.js

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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/MoveAttract.js

class MoveAttract {
  constructor() {
    this.distance = 200;
    this.enable = false;
    this.rotate = {
      x: 3000,
      y: 3000
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/MoveGravity.js

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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/Path/MovePathDelay.js

class MovePathDelay extends ValueWithRandom {
  constructor() {
    super();
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/Path/MovePath.js


class MovePath {
  constructor() {
    this.clamp = true;
    this.delay = new MovePathDelay();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/MoveTrail.js

class MoveTrail {
  constructor() {
    this.enable = false;
    this.length = 10;
    this.fillColor = new OptionsColor();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/OutModes.js
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/Spin.js


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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/Move.js









class Move {
  constructor() {
    this.angle = new MoveAngle();
    this.attract = new MoveAttract();
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
    this.gravity = new MoveGravity();
    this.path = new MovePath();
    this.outModes = new OutModes();
    this.random = false;
    this.size = false;
    this.speed = 2;
    this.spin = new Spin();
    this.straight = false;
    this.trail = new MoveTrail();
    this.vibrate = false;
    this.warp = false;
  }

  get collisions() {
    return false;
  }

  set collisions(value) {}

  get bounce() {
    return this.collisions;
  }

  set bounce(value) {
    this.collisions = value;
  }

  get out_mode() {
    return this.outMode;
  }

  set out_mode(value) {
    this.outMode = value;
  }

  get outMode() {
    return this.outModes.default;
  }

  set outMode(value) {
    this.outModes.default = value;
  }

  get noise() {
    return this.path;
  }

  set noise(value) {
    this.path = value;
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/AnimationOptions.js

class AnimationOptions {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 1;
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

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Opacity/OpacityAnimation.js

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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Opacity/Opacity.js



class Opacity extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new OpacityAnimation();
    this.random.minimumValue = 0.1;
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Orbit/OrbitRotation.js

class OrbitRotation extends ValueWithRandom {
  constructor() {
    super();
    this.value = 45;
    this.random.enable = false;
    this.random.minimumValue = 0;
  }

  load(data) {
    if (data === undefined) {
      return;
    }

    super.load(data);
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Orbit/Orbit.js




class Orbit {
  constructor() {
    this.animation = new AnimationOptions();
    this.enable = false;
    this.opacity = 1;
    this.rotation = new OrbitRotation();
    this.width = 1;
  }

  load(data) {
    if (!data) {
      return;
    }

    this.animation.load(data.animation);
    this.rotation.load(data.rotation);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.opacity !== undefined) {
      this.opacity = setRangeValue(data.opacity);
    }

    if (data.width !== undefined) {
      this.width = setRangeValue(data.width);
    }

    if (data.radius !== undefined) {
      this.radius = setRangeValue(data.radius);
    }

    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Number/ParticlesDensity.js
class ParticlesDensity {
  constructor() {
    this.enable = false;
    this.area = 800;
    this.factor = 1000;
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Number/ParticlesNumber.js

class ParticlesNumber {
  constructor() {
    this.density = new ParticlesDensity();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Repulse/ParticlesRepulse.js


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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Roll/RollLight.js

class RollLight {
  constructor() {
    this.enable = false;
    this.value = 0;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.value !== undefined) {
      this.value = setRangeValue(data.value);
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Roll/Roll.js



class Roll {
  constructor() {
    this.darken = new RollLight();
    this.enable = false;
    this.enlighten = new RollLight();
    this.mode = "vertical";
    this.speed = 25;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.backColor !== undefined) {
      this.backColor = OptionsColor.create(this.backColor, data.backColor);
    }

    this.darken.load(data.darken);

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    this.enlighten.load(data.enlighten);

    if (data.mode !== undefined) {
      this.mode = data.mode;
    }

    if (data.speed !== undefined) {
      this.speed = setRangeValue(data.speed);
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Rotate/RotateAnimation.js

class RotateAnimation {
  constructor() {
    this.enable = false;
    this.speed = 0;
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

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Rotate/Rotate.js


class Rotate extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new RotateAnimation();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Shadow.js

class Shadow {
  constructor() {
    this.blur = 0;
    this.color = new OptionsColor();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Shape/Shape.js

class Shape {
  constructor() {
    this.options = {};
    this.type = "circle";
  }

  get image() {
    var _a;

    return (_a = this.options["image"]) !== null && _a !== void 0 ? _a : this.options["images"];
  }

  set image(value) {
    this.options["image"] = value;
    this.options["images"] = value;
  }

  get custom() {
    return this.options;
  }

  set custom(value) {
    this.options = value;
  }

  get images() {
    return this.image;
  }

  set images(value) {
    this.image = value;
  }

  get stroke() {
    return [];
  }

  set stroke(_value) {}

  get character() {
    var _a;

    return (_a = this.options["character"]) !== null && _a !== void 0 ? _a : this.options["char"];
  }

  set character(value) {
    this.options["character"] = value;
    this.options["char"] = value;
  }

  get polygon() {
    var _a;

    return (_a = this.options["polygon"]) !== null && _a !== void 0 ? _a : this.options["star"];
  }

  set polygon(value) {
    this.options["polygon"] = value;
    this.options["star"] = value;
  }

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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Size/SizeAnimation.js

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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Size/Size.js



class Size extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new SizeAnimation();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Stroke.js

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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Tilt/TiltAnimation.js

class TiltAnimation {
  constructor() {
    this.enable = false;
    this.speed = 0;
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

    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Tilt/Tilt.js


class Tilt extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new TiltAnimation();
    this.direction = "clockwise";
    this.enable = false;
    this.value = 0;
  }

  load(data) {
    super.load(data);

    if (!data) {
      return;
    }

    this.animation.load(data.animation);

    if (data.direction !== undefined) {
      this.direction = data.direction;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Twinkle/TwinkleValues.js


class TwinkleValues {
  constructor() {
    this.enable = false;
    this.frequency = 0.05;
    this.opacity = 1;
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
      this.opacity = setRangeValue(data.opacity);
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Twinkle/Twinkle.js

class Twinkle {
  constructor() {
    this.lines = new TwinkleValues();
    this.particles = new TwinkleValues();
  }

  load(data) {
    if (!data) {
      return;
    }

    this.lines.load(data.lines);
    this.particles.load(data.particles);
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Wobble/Wobble.js

class Wobble {
  constructor() {
    this.distance = 5;
    this.enable = false;
    this.speed = 50;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.distance !== undefined) {
      this.distance = setRangeValue(data.distance);
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    if (data.speed !== undefined) {
      this.speed = setRangeValue(data.speed);
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/ZIndex/ZIndex.js

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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/ParticlesOptions.js























class ParticlesOptions {
  constructor() {
    this.bounce = new ParticlesBounce();
    this.collisions = new Collisions();
    this.color = new AnimatableColor();
    this.color.value = "#fff";
    this.destroy = new Destroy();
    this.gradient = [];
    this.groups = {};
    this.life = new Life();
    this.links = new Links();
    this.move = new Move();
    this.number = new ParticlesNumber();
    this.opacity = new Opacity();
    this.orbit = new Orbit();
    this.reduceDuplicates = false;
    this.repulse = new ParticlesRepulse();
    this.roll = new Roll();
    this.rotate = new Rotate();
    this.shadow = new Shadow();
    this.shape = new Shape();
    this.size = new Size();
    this.stroke = new Stroke();
    this.tilt = new Tilt();
    this.twinkle = new Twinkle();
    this.wobble = new Wobble();
    this.zIndex = new ZIndex();
  }

  get line_linked() {
    return this.links;
  }

  set line_linked(value) {
    this.links = value;
  }

  get lineLinked() {
    return this.links;
  }

  set lineLinked(value) {
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
    this.life.load(data.life);
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
    this.orbit.load(data.orbit);

    if (data.reduceDuplicates !== undefined) {
      this.reduceDuplicates = data.reduceDuplicates;
    }

    this.repulse.load(data.repulse);
    this.roll.load(data.roll);
    this.rotate.load(data.rotate);
    this.shape.load(data.shape);
    this.size.load(data.size);
    this.shadow.load(data.shadow);
    this.tilt.load(data.tilt);
    this.twinkle.load(data.twinkle);
    this.wobble.load(data.wobble);
    this.zIndex.load(data.zIndex);
    const collisions = (_e = (_d = data.move) === null || _d === void 0 ? void 0 : _d.collisions) !== null && _e !== void 0 ? _e : (_f = data.move) === null || _f === void 0 ? void 0 : _f.bounce;

    if (collisions !== undefined) {
      this.collisions.enable = collisions;
    }

    this.collisions.load(data.collisions);
    const strokeToLoad = (_g = data.stroke) !== null && _g !== void 0 ? _g : (_h = data.shape) === null || _h === void 0 ? void 0 : _h.stroke;

    if (strokeToLoad) {
      if (strokeToLoad instanceof Array) {
        this.stroke = strokeToLoad.map(s => {
          const tmp = new Stroke();
          tmp.load(s);
          return tmp;
        });
      } else {
        if (this.stroke instanceof Array) {
          this.stroke = new Stroke();
        }

        this.stroke.load(strokeToLoad);
      }
    }

    const gradientToLoad = data.gradient;

    if (gradientToLoad) {
      if (gradientToLoad instanceof Array) {
        this.gradient = gradientToLoad.map(s => {
          const tmp = new AnimatableGradient();
          tmp.load(s);
          return tmp;
        });
      } else {
        if (this.gradient instanceof Array) {
          this.gradient = new AnimatableGradient();
        }

        this.gradient.load(gradientToLoad);
      }
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/Utils.js





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

      const sourceDict = source,
            value = sourceDict[key],
            isObject = typeof value === "object",
            destDict = destination;
      destDict[key] = isObject && Array.isArray(value) ? value.map(v => deepExtend(destDict[key], v)) : deepExtend(destDict[key], value);
    }
  }

  return destination;
}
function isDivModeEnabled(mode, divs) {
  return divs instanceof Array ? !!divs.find(t => t.enable && isInArray(mode, t.mode)) : isInArray(mode, divs.mode);
}
function divModeExecute(mode, divs, callback) {
  if (divs instanceof Array) {
    for (const div of divs) {
      const divMode = div.mode,
            divEnabled = div.enable;

      if (divEnabled && isInArray(mode, divMode)) {
        singleDivModeExecute(div, callback);
      }
    }
  } else {
    const divMode = divs.mode,
          divEnabled = divs.enable;

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
    return divs.find(d => checkSelector(element, d.selectors));
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
  const {
    x: xVelocityDiff,
    y: yVelocityDiff
  } = p1.velocity.sub(p2.velocity),
        [pos1, pos2] = [p1.position, p2.position],
        {
    dx: xDist,
    dy: yDist
  } = getDistances(pos2, pos1);

  if (xVelocityDiff * xDist + yVelocityDiff * yDist < 0) {
    return;
  }

  const angle = -Math.atan2(yDist, xDist),
        m1 = p1.mass,
        m2 = p2.mass,
        u1 = p1.velocity.rotate(angle),
        u2 = p2.velocity.rotate(angle),
        v1 = collisionVelocity(u1, u2, m1, m2),
        v2 = collisionVelocity(u2, u1, m1, m2),
        vFinal1 = v1.rotate(-angle),
        vFinal2 = v2.rotate(-angle);
  p1.velocity.x = vFinal1.x * p1.factor.x;
  p1.velocity.y = vFinal1.y * p1.factor.y;
  p2.velocity.x = vFinal2.x * p2.factor.x;
  p2.velocity.y = vFinal2.y * p2.factor.y;
}
function rectBounce(particle, divBounds) {
  const pPos = particle.getPosition(),
        size = particle.getRadius(),
        bounds = calculateBounds(pPos, size);
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

function loadOptions(options, ...sourceOptionsArr) {
  for (const sourceOptions of sourceOptionsArr) {
    options.load(sourceOptions);
  }
}

function loadContainerOptions(engine, ...sourceOptionsArr) {
  const options = new Options(engine);
  loadOptions(options, ...sourceOptionsArr);
  return options;
}
function loadParticlesOptions(...sourceOptionsArr) {
  const options = new ParticlesOptions();
  loadOptions(options, ...sourceOptionsArr);
  return options;
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Constants.js
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/ColorUtils.js




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
    const hexFixed = input.replace(shorthandRegex, (_m, r, g, b, a) => {
      return r + r + g + g + b + b + (a !== undefined ? a + a : "");
    });
    const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
    const result = regex.exec(hexFixed);
    return result ? {
      a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
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
    res = color.value === randomColorValue ? getRandomRgbColor() : stringToRgb(color.value);
  } else {
    if (color.value instanceof Array) {
      const colorSelected = itemFromArray(color.value, index, useIndex);
      res = colorToRgb({
        value: colorSelected
      });
    } else {
      const colorValue = color.value,
            rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;

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
  const r1 = color.r / 255,
        g1 = color.g / 255,
        b1 = color.b / 255;
  const max = Math.max(r1, g1, b1),
        min = Math.min(r1, g1, b1);
  const res = {
    h: 0,
    l: (max + min) / 2,
    s: 0
  };

  if (max !== min) {
    res.s = res.l < 0.5 ? (max - min) / (max + min) : (max - min) / (2.0 - max - min);
    res.h = r1 === max ? (g1 - b1) / (max - min) : res.h = g1 === max ? 2.0 + (b1 - r1) / (max - min) : 4.0 + (r1 - g1) / (max - min);
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
  },
        hslPercent = {
    h: hsl.h / 360,
    l: hsl.l / 100,
    s: hsl.s / 100
  };

  if (hslPercent.s === 0) {
    result.b = hslPercent.l;
    result.g = hslPercent.l;
    result.r = hslPercent.l;
  } else {
    const q = hslPercent.l < 0.5 ? hslPercent.l * (1 + hslPercent.s) : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s,
          p = 2 * hslPercent.l - q;
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
  const l = hsl.l / 100,
        sl = hsl.s / 100,
        v = l + sl * Math.min(l, 1 - l),
        sv = !v ? 0 : 2 * (1 - l / v);
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
  const v = hsv.v / 100,
        sv = hsv.s / 100,
        l = v * (1 - sv / 2),
        sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
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
  },
        hsvPercent = {
    h: hsv.h / 60,
    s: hsv.s / 100,
    v: hsv.v / 100
  };
  const c = hsvPercent.v * hsvPercent.s,
        x = c * (1 - Math.abs(hsvPercent.h % 2 - 1));
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
  },
        xMax = Math.max(rgbPercent.r, rgbPercent.g, rgbPercent.b),
        xMin = Math.min(rgbPercent.r, rgbPercent.g, rgbPercent.b),
        v = xMax,
        c = xMax - xMin;
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
    h,
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
  let rgb1 = color1,
      rgb2 = color2;

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
    const sourceColor = (_a = p1.getFillColor()) !== null && _a !== void 0 ? _a : p1.getStrokeColor(),
          destColor = (_b = p2 === null || p2 === void 0 ? void 0 : p2.getFillColor()) !== null && _b !== void 0 ? _b : p2 === null || p2 === void 0 ? void 0 : p2.getStrokeColor();

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
      return colorToRgb({
        value: color
      });
    } else if (blink) {
      return randomColorValue;
    } else {
      return midColorValue;
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/CanvasUtils.js

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
function drawConnectLine(context, width, lineStyle, begin, end) {
  context.save();
  drawLine(context, begin, end);
  context.lineWidth = width;
  context.strokeStyle = lineStyle;
  context.stroke();
  context.restore();
}
function gradient(context, p1, p2, opacity) {
  const gradStop = Math.floor(p2.getRadius() / p1.getRadius()),
        color1 = p1.getFillColor(),
        color2 = p2.getFillColor();

  if (!color1 || !color2) {
    return;
  }

  const sourcePos = p1.getPosition(),
        destPos = p2.getPosition(),
        midRgb = colorMix(color1, color2, p1.getRadius(), p2.getRadius()),
        grad = context.createLinearGradient(sourcePos.x, sourcePos.y, destPos.x, destPos.y);
  grad.addColorStop(0, getStyleFromHsl(color1, opacity));
  grad.addColorStop(gradStop > 1 ? 1 : gradStop, getStyleFromRgb(midRgb, opacity));
  grad.addColorStop(1, getStyleFromHsl(color2, opacity));
  return grad;
}
function drawGrabLine(context, width, begin, end, colorLine, opacity) {
  context.save();
  drawLine(context, begin, end);
  context.strokeStyle = getStyleFromRgb(colorLine, opacity);
  context.lineWidth = width;
  context.stroke();
  context.restore();
}
function drawParticle(container, context, particle, delta, colorStyles, backgroundMask, composite, radius, opacity, shadow) {
  var _a, _b, _c, _d;

  const pos = particle.getPosition(),
        tiltOptions = particle.options.tilt,
        rollOptions = particle.options.roll;
  context.save();

  if (tiltOptions.enable || rollOptions.enable) {
    const roll = rollOptions.enable && particle.roll,
          tilt = tiltOptions.enable && particle.tilt,
          rollHorizontal = roll && (rollOptions.mode === "horizontal" || rollOptions.mode === "both"),
          rollVertical = roll && (rollOptions.mode === "vertical" || rollOptions.mode === "both");
    context.setTransform(rollHorizontal ? Math.cos(particle.roll.angle) : 1, tilt ? Math.cos(particle.tilt.value) * particle.tilt.cosDirection : 0, tilt ? Math.sin(particle.tilt.value) * particle.tilt.sinDirection : 0, rollVertical ? Math.sin(particle.roll.angle) : 1, pos.x, pos.y);
  } else {
    context.translate(pos.x, pos.y);
  }

  context.beginPath();
  const angle = ((_b = (_a = particle.rotate) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0) + (particle.options.rotate.path ? particle.velocity.angle : 0);

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
  context.lineWidth = (_c = particle.strokeWidth) !== null && _c !== void 0 ? _c : 0;

  if (colorStyles.stroke) {
    context.strokeStyle = colorStyles.stroke;
  }

  drawShape(container, context, particle, radius, opacity, delta);

  if (((_d = stroke === null || stroke === void 0 ? void 0 : stroke.width) !== null && _d !== void 0 ? _d : 0) > 0) {
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

  if (tiltOptions.enable && particle.tilt) {
    context.setTransform(1, Math.cos(particle.tilt.value) * particle.tilt.cosDirection, Math.sin(particle.tilt.value) * particle.tilt.sinDirection, 1, pos.x, pos.y);
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Canvas.js




class Canvas {
  constructor(container) {
    this.container = container;
    this.size = {
      height: 0,
      width: 0
    };
    this.context = null;
    this.generatedCanvas = false;
  }

  init() {
    this.resize();
    this.initStyle();
    this.initCover();
    this.initTrail();
    this.initBackground();
    this.paint();
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
    this.context = this.element.getContext("2d");
    this.container.retina.init();
    this.initBackground();
  }

  destroy() {
    var _a;

    if (this.generatedCanvas) {
      (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
    }

    this.draw(ctx => {
      clear(ctx, this.size);
    });
  }

  paint() {
    const options = this.container.actualOptions;
    this.draw(ctx => {
      if (options.backgroundMask.enable && options.backgroundMask.cover) {
        clear(ctx, this.size);
        this.paintBase(this.coverColorStyle);
      } else {
        this.paintBase();
      }
    });
  }

  clear() {
    const options = this.container.actualOptions,
          trail = options.particles.move.trail;

    if (options.backgroundMask.enable) {
      this.paint();
    } else if (trail.enable && trail.length > 0 && this.trailFillColor) {
      this.paintBase(getStyleFromRgb(this.trailFillColor, 1 / trail.length));
    } else {
      this.draw(ctx => {
        clear(ctx, this.size);
      });
    }
  }

  async windowResize() {
    if (!this.element) {
      return;
    }

    this.resize();
    const container = this.container,
          needsRefresh = container.updateActualOptions();
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

  resize() {
    if (!this.element) {
      return;
    }

    const container = this.container,
          pxRatio = container.retina.pixelRatio,
          size = container.canvas.size,
          newSize = {
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

  drawConnectLine(p1, p2) {
    this.draw(ctx => {
      var _a;

      const lineStyle = this.lineStyle(p1, p2);

      if (!lineStyle) {
        return;
      }

      const pos1 = p1.getPosition(),
            pos2 = p2.getPosition();
      drawConnectLine(ctx, (_a = p1.retina.linksWidth) !== null && _a !== void 0 ? _a : this.container.retina.linksWidth, lineStyle, pos1, pos2);
    });
  }

  drawGrabLine(particle, lineColor, opacity, mousePos) {
    const container = this.container;
    this.draw(ctx => {
      var _a;

      const beginPos = particle.getPosition();
      drawGrabLine(ctx, (_a = particle.retina.linksWidth) !== null && _a !== void 0 ? _a : container.retina.linksWidth, beginPos, mousePos, lineColor, opacity);
    });
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

    const pfColor = particle.getFillColor(),
          psColor = (_a = particle.getStrokeColor()) !== null && _a !== void 0 ? _a : pfColor;

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

    const options = this.container.actualOptions,
          zIndexOptions = particle.options.zIndex,
          zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate,
          opacity = (_d = (_b = particle.bubble.opacity) !== null && _b !== void 0 ? _b : (_c = particle.opacity) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 1,
          strokeOpacity = (_f = (_e = particle.stroke) === null || _e === void 0 ? void 0 : _e.opacity) !== null && _f !== void 0 ? _f : opacity,
          zOpacity = opacity * zOpacityFactor,
          zStrokeOpacity = strokeOpacity * zOpacityFactor;
    const colorStyles = {
      fill: fColor ? getStyleFromHsl(fColor, zOpacity) : undefined
    };
    colorStyles.stroke = sColor ? getStyleFromHsl(sColor, zStrokeOpacity) : colorStyles.fill;
    this.draw(ctx => {
      const zSizeFactor = (1 - particle.zIndexFactor) ** zIndexOptions.sizeRate,
            container = this.container;

      for (const updater of container.particles.updaters) {
        if (updater.beforeDraw) {
          updater.beforeDraw(particle);
        }

        if (updater.getColorStyles) {
          const {
            fill,
            stroke
          } = updater.getColorStyles(particle, ctx, radius, zOpacity);

          if (fill) {
            colorStyles.fill = fill;
          }

          if (stroke) {
            colorStyles.stroke = stroke;
          }
        }
      }

      drawParticle(container, ctx, particle, delta, colorStyles, options.backgroundMask.enable, options.backgroundMask.composite, radius * zSizeFactor, zOpacity, particle.options.shadow);

      for (const updater of container.particles.updaters) {
        if (updater.afterDraw) {
          updater.afterDraw(particle);
        }
      }
    });
  }

  drawPlugin(plugin, delta) {
    this.draw(ctx => {
      drawPlugin(ctx, plugin, delta);
    });
  }

  drawParticlePlugin(plugin, particle, delta) {
    this.draw(ctx => {
      drawParticlePlugin(ctx, plugin, particle, delta);
    });
  }

  initBackground() {
    const options = this.container.actualOptions,
          background = options.background,
          element = this.element,
          elementStyle = element === null || element === void 0 ? void 0 : element.style;

    if (!elementStyle) {
      return;
    }

    if (background.color) {
      const color = colorToRgb(background.color);
      elementStyle.backgroundColor = color ? getStyleFromRgb(color, background.opacity) : "";
    } else {
      elementStyle.backgroundColor = "";
    }

    elementStyle.backgroundImage = background.image || "";
    elementStyle.backgroundPosition = background.position || "";
    elementStyle.backgroundRepeat = background.repeat || "";
    elementStyle.backgroundSize = background.size || "";
  }

  draw(cb) {
    if (!this.context) {
      return;
    }

    return cb(this.context);
  }

  initCover() {
    const options = this.container.actualOptions,
          cover = options.backgroundMask.cover,
          color = cover.color,
          coverRgb = colorToRgb(color);

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

  initTrail() {
    const options = this.container.actualOptions,
          trail = options.particles.move.trail,
          fillColor = colorToRgb(trail.fillColor);

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

  getPluginParticleColors(particle) {
    let fColor, sColor;

    for (const [, plugin] of this.container.plugins) {
      if (!fColor && plugin.particleFillColor) {
        fColor = colorToHsl(plugin.particleFillColor(particle));
      }

      if (!sColor && plugin.particleStrokeColor) {
        sColor = colorToHsl(plugin.particleStrokeColor(particle));
      }

      if (fColor && sColor) {
        break;
      }
    }

    return [fColor, sColor];
  }

  initStyle() {
    const element = this.element,
          options = this.container.actualOptions;

    if (!element) {
      return;
    }

    const originalStyle = this.originalStyle;

    if (options.fullScreen.enable) {
      this.originalStyle = deepExtend({}, element.style);
      element.style.setProperty("position", "fixed", "important");
      element.style.setProperty("z-index", options.fullScreen.zIndex.toString(10), "important");
      element.style.setProperty("top", "0", "important");
      element.style.setProperty("left", "0", "important");
      element.style.setProperty("width", "100%", "important");
      element.style.setProperty("height", "100%", "important");
    } else if (originalStyle) {
      element.style.position = originalStyle.position;
      element.style.zIndex = originalStyle.zIndex;
      element.style.top = originalStyle.top;
      element.style.left = originalStyle.left;
      element.style.width = originalStyle.width;
      element.style.height = originalStyle.height;
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

  paintBase(baseColor) {
    this.draw(ctx => {
      paintBase(ctx, this.size, baseColor);
    });
  }

  lineStyle(p1, p2) {
    return this.draw(ctx => {
      const options = this.container.actualOptions,
            connectOptions = options.interactivity.modes.connect;
      return gradient(ctx, p1, p2, connectOptions.links.opacity);
    });
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/EventListeners.js



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

  manageListeners(add) {
    var _a;

    const container = this.container,
          options = container.actualOptions,
          detectType = options.interactivity.detectsOn;
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
          this.resizeObserver = new ResizeObserver(entries => {
            const entry = entries.find(e => e.target === container.canvas.element);

            if (!entry) {
              return;
            }

            this.handleWindowResize();
          });
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

  handleWindowResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      delete this.resizeTimeout;
    }

    this.resizeTimeout = setTimeout(async () => {
      var _a;

      return (_a = this.container.canvas) === null || _a === void 0 ? void 0 : _a.windowResize();
    }, 500);
  }

  handleVisibilityChange() {
    const container = this.container,
          options = container.actualOptions;
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

  mouseDown() {
    const interactivity = this.container.interactivity;

    if (interactivity) {
      const mouse = interactivity.mouse;
      mouse.clicking = true;
      mouse.downPosition = mouse.position;
    }
  }

  mouseTouchMove(e) {
    var _a, _b, _c, _d, _e, _f, _g;

    const container = this.container,
          options = container.actualOptions;

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

  mouseTouchClick(e) {
    const container = this.container,
          options = container.actualOptions,
          mouse = container.interactivity.mouse;
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

  doMouseTouchClick(e) {
    const container = this.container,
          options = container.actualOptions;

    if (this.canPush) {
      const mousePos = container.interactivity.mouse.position;

      if (!mousePos) {
        return;
      }

      container.interactivity.mouse.clickPosition = {
        x: mousePos.x,
        y: mousePos.y
      };
      container.interactivity.mouse.clickTime = new Date().getTime();
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
      setTimeout(() => this.mouseTouchFinish(), 500);
    }
  }

  handleThemeChange(e) {
    const mediaEvent = e,
          themeName = mediaEvent.matches ? this.container.options.defaultDarkTheme : this.container.options.defaultLightTheme,
          theme = this.container.options.themes.find(theme => theme.name === themeName);

    if (theme && theme.default.auto) {
      this.container.loadTheme(themeName);
    }
  }

  handleClickMode(mode) {
    this.container.handleClickMode(mode);
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/FrameManager.js
class FrameManager {
  constructor(container) {
    this.container = container;
  }

  async nextFrame(timestamp) {
    var _a;

    try {
      const container = this.container;

      if (container.lastFrameTime !== undefined && timestamp < container.lastFrameTime + 1000 / container.fpsLimit) {
        container.draw(false);
        return;
      }

      (_a = container.lastFrameTime) !== null && _a !== void 0 ? _a : container.lastFrameTime = timestamp;
      const deltaValue = timestamp - container.lastFrameTime,
            delta = {
        value: deltaValue,
        factor: 60 * deltaValue / 1000
      };
      container.lifeTime += delta.value;
      container.lastFrameTime = timestamp;

      if (deltaValue > 1000) {
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/InteractionManager.js
var InteractionManager_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var InteractionManager_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
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
    this.init();
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
    }
  }

  async externalInteract(delta) {
    for (const interactor of this.externalInteractors) {
      if (interactor.isEnabled()) {
        await interactor.interact(delta);
      }
    }
  }

  async particlesInteract(particle, delta) {
    for (const interactor of this.externalInteractors) {
      interactor.reset(particle);
    }

    for (const interactor of this.particleInteractors) {
      if (interactor.isEnabled(particle)) {
        await interactor.interact(particle, delta);
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

}
_InteractionManager_engine = new WeakMap();
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Vector3d.js

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

  static clone(source) {
    return Vector3d.create(source.x, source.y, source.z);
  }

  static create(x, y, z) {
    return new Vector3d(x, y, z);
  }

  static get origin() {
    return Vector3d.create(0, 0, 0);
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

  sub(v) {
    return v instanceof Vector3d ? Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z) : super.sub(v);
  }

  subFrom(v) {
    super.subFrom(v);

    if (v instanceof Vector3d) {
      this.z -= v.z;
    }
  }

  mult(n) {
    return Vector3d.create(this.x * n, this.y * n, this.z * n);
  }

  multTo(n) {
    super.multTo(n);
    this.z *= n;
  }

  div(n) {
    return Vector3d.create(this.x / n, this.y / n, this.z / n);
  }

  divTo(n) {
    super.divTo(n);
    this.z /= n;
  }

  copy() {
    return Vector3d.clone(this);
  }

  setTo(v) {
    super.setTo(v);
    const v3d = v;

    if (v3d.z !== undefined) {
      this.z = v3d.z;
    }
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Particle.js
var Particle_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var Particle_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
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
    var _a, _b, _c, _d, _e, _f, _g;

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
    const pxRatio = container.retina.pixelRatio,
          mainOptions = container.actualOptions,
          particlesOptions = loadParticlesOptions(mainOptions.particles);
    const shapeType = particlesOptions.shape.type,
          reduceDuplicates = particlesOptions.reduceDuplicates;
    this.shape = shapeType instanceof Array ? itemFromArray(shapeType, this.id, reduceDuplicates) : shapeType;

    if (overrideOptions === null || overrideOptions === void 0 ? void 0 : overrideOptions.shape) {
      if (overrideOptions.shape.type) {
        const overrideShapeType = overrideOptions.shape.type;
        this.shape = overrideShapeType instanceof Array ? itemFromArray(overrideShapeType, this.id, reduceDuplicates) : overrideShapeType;
      }

      const shapeOptions = new Shape();
      shapeOptions.load(overrideOptions.shape);

      if (this.shape) {
        this.shapeData = this.loadShapeData(shapeOptions, reduceDuplicates);
      }
    } else {
      this.shapeData = this.loadShapeData(particlesOptions.shape, reduceDuplicates);
    }

    if (overrideOptions !== undefined) {
      particlesOptions.load(overrideOptions);
    }

    if (((_a = this.shapeData) === null || _a === void 0 ? void 0 : _a.particles) !== undefined) {
      particlesOptions.load((_b = this.shapeData) === null || _b === void 0 ? void 0 : _b.particles);
    }

    this.fill = (_d = (_c = this.shapeData) === null || _c === void 0 ? void 0 : _c.fill) !== null && _d !== void 0 ? _d : this.fill;
    this.close = (_f = (_e = this.shapeData) === null || _e === void 0 ? void 0 : _e.close) !== null && _f !== void 0 ? _f : this.close;
    this.options = particlesOptions;
    this.pathDelay = getValue(this.options.move.path.delay) * 1000;
    const zIndexValue = getRangeValue(this.options.zIndex.value);
    container.retina.initParticle(this);
    const sizeOptions = this.options.size,
          sizeRange = sizeOptions.value;
    this.size = {
      enable: sizeOptions.animation.enable,
      value: getRangeValue(sizeOptions.value) * container.retina.pixelRatio,
      max: getRangeMax(sizeRange) * pxRatio,
      min: getRangeMin(sizeRange) * pxRatio,
      loops: 0,
      maxLoops: getRangeValue(sizeOptions.animation.count)
    };
    const sizeAnimation = sizeOptions.animation;

    if (sizeAnimation.enable) {
      this.size.status = 0;

      switch (sizeAnimation.startValue) {
        case "min":
          this.size.value = this.size.min;
          this.size.status = 0;
          break;

        case "random":
          this.size.value = randomInRange(this.size) * pxRatio;
          this.size.status = Math.random() >= 0.5 ? 0 : 1;
          break;

        case "max":
        default:
          this.size.value = this.size.max;
          this.size.status = 1;
          break;
      }

      this.size.velocity = ((_g = this.retina.sizeAnimationSpeed) !== null && _g !== void 0 ? _g : container.retina.sizeAnimationSpeed) / 100 * container.retina.reduceFactor;

      if (!sizeAnimation.sync) {
        this.size.velocity *= Math.random();
      }
    }

    this.bubble = {
      inRange: false
    };
    this.position = this.calcPosition(container, position, clamp(zIndexValue, 0, container.zLayers));
    this.initialPosition = this.position.copy();
    const canvasSize = container.canvas.size,
          moveCenterPerc = this.options.move.center;
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
    const gravityOptions = this.options.move.gravity;
    this.gravity = {
      enable: gravityOptions.enable,
      acceleration: getRangeValue(gravityOptions.acceleration),
      inverse: gravityOptions.inverse
    };
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

    this.life = this.loadLife();
    this.spawning = this.life.delay > 0;
    this.shadowColor = colorToRgb(this.options.shadow.color);

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

  isVisible() {
    return !this.destroyed && !this.spawning && this.isInsideCanvas();
  }

  isInsideCanvas() {
    const radius = this.getRadius(),
          canvasSize = this.container.canvas.size;
    return this.position.x >= -radius && this.position.y >= -radius && this.position.y <= canvasSize.height + radius && this.position.x <= canvasSize.width + radius;
  }

  draw(delta) {
    const container = this.container;

    for (const [, plugin] of container.plugins) {
      container.canvas.drawParticlePlugin(plugin, this, delta);
    }

    container.canvas.drawParticle(this, delta);
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

  getMass() {
    return this.getRadius() ** 2 * Math.PI / 2;
  }

  getFillColor() {
    var _a, _b;

    const color = (_a = this.bubble.color) !== null && _a !== void 0 ? _a : getHslFromAnimation(this.color);

    if (color && this.roll && (this.backColor || this.roll.alter)) {
      const backFactor = this.options.roll.mode === "both" ? 2 : 1,
            backSum = this.options.roll.mode === "horizontal" ? Math.PI / 2 : 0,
            rolled = Math.floor((((_b = this.roll.angle) !== null && _b !== void 0 ? _b : 0) + backSum) / (Math.PI / backFactor)) % 2;

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

  getStrokeColor() {
    var _a, _b;

    return (_b = (_a = this.bubble.color) !== null && _a !== void 0 ? _a : getHslFromAnimation(this.strokeColor)) !== null && _b !== void 0 ? _b : this.getFillColor();
  }

  destroy(override) {
    this.destroyed = true;
    this.bubble.inRange = false;

    if (this.unbreakable) {
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

  reset() {
    if (this.opacity) {
      this.opacity.loops = 0;
    }

    this.size.loops = 0;
  }

  split() {
    const splitOptions = this.options.destroy.split;

    if (splitOptions.count >= 0 && this.splitCount++ > splitOptions.count) {
      return;
    }

    const rate = getValue(splitOptions.rate);

    for (let i = 0; i < rate; i++) {
      this.container.particles.addSplitParticle(this);
    }
  }

  calcPosition(container, position, zIndex, tryCount = 0) {
    var _a, _b, _c, _d;

    for (const [, plugin] of container.plugins) {
      const pluginPos = plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;

      if (pluginPos !== undefined) {
        return Vector3d.create(pluginPos.x, pluginPos.y, zIndex);
      }
    }

    const canvasSize = container.canvas.size,
          exactPosition = calcExactPositionOrRandomFromSize({
      size: canvasSize,
      position: position
    }),
          pos = Vector3d.create(exactPosition.x, exactPosition.y, zIndex),
          radius = this.getRadius(),
          outModes = this.options.move.outModes,
          fixHorizontal = outMode => {
      fixOutMode({
        outMode,
        checkModes: ["bounce", "bounce-horizontal"],
        coord: pos.x,
        maxCoord: container.canvas.size.width,
        setCb: value => pos.x += value,
        radius
      });
    },
          fixVertical = outMode => {
      fixOutMode({
        outMode,
        checkModes: ["bounce", "bounce-vertical"],
        coord: pos.y,
        maxCoord: container.canvas.size.height,
        setCb: value => pos.y += value,
        radius
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

  checkOverlap(pos, tryCount = 0) {
    const collisionsOptions = this.options.collisions,
          radius = this.getRadius();

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

  loadShapeData(shapeOptions, reduceDuplicates) {
    const shapeData = shapeOptions.options[this.shape];

    if (shapeData) {
      return deepExtend({}, shapeData instanceof Array ? itemFromArray(shapeData, this.id, reduceDuplicates) : shapeData);
    }
  }

  loadLife() {
    const container = this.container,
          particlesOptions = this.options,
          lifeOptions = particlesOptions.life,
          life = {
      delay: container.retina.reduceFactor ? getRangeValue(lifeOptions.delay.value) * (lifeOptions.delay.sync ? 1 : Math.random()) / container.retina.reduceFactor * 1000 : 0,
      delayTime: 0,
      duration: container.retina.reduceFactor ? getRangeValue(lifeOptions.duration.value) * (lifeOptions.duration.sync ? 1 : Math.random()) / container.retina.reduceFactor * 1000 : 0,
      time: 0,
      count: particlesOptions.life.count
    };

    if (life.duration <= 0) {
      life.duration = -1;
    }

    if (life.count <= 0) {
      life.count = -1;
    }

    return life;
  }

}
_Particle_engine = new WeakMap();
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Point.js
class Point {
  constructor(position, particle) {
    this.position = position;
    this.particle = particle;
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Range.js
class Range {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y
    };
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Circle.js


class Circle extends Range {
  constructor(x, y, radius) {
    super(x, y);
    this.radius = radius;
  }

  contains(point) {
    return getDistance(point, this.position) <= this.radius;
  }

  intersects(range) {
    const rect = range,
          circle = range,
          pos1 = this.position,
          pos2 = range.position,
          xDist = Math.abs(pos2.x - pos1.x),
          yDist = Math.abs(pos2.y - pos1.y),
          r = this.radius;

    if (circle.radius !== undefined) {
      const rSum = r + circle.radius,
            dist = Math.sqrt(xDist * xDist + yDist + yDist);
      return rSum > dist;
    } else if (rect.size !== undefined) {
      const w = rect.size.width,
            h = rect.size.height,
            edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2);

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
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Rectangle.js

class Rectangle extends Range {
  constructor(x, y, width, height) {
    super(x, y);
    this.size = {
      height: height,
      width: width
    };
  }

  contains(point) {
    const w = this.size.width,
          h = this.size.height,
          pos = this.position;
    return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
  }

  intersects(range) {
    const rect = range,
          circle = range,
          w = this.size.width,
          h = this.size.height,
          pos1 = this.position,
          pos2 = range.position;

    if (circle.radius !== undefined) {
      return circle.intersects(this);
    }

    if (!rect.size) {
      return false;
    }

    const size2 = rect.size,
          w2 = size2.width,
          h2 = size2.height;
    return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/CircleWarp.js


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

    const rect = range,
          circle = range,
          newPos = {
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/QuadTree.js




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

  queryCircle(position, radius) {
    return this.query(new Circle(position.x, position.y, radius));
  }

  queryCircleWarp(position, radius, containerOrSize) {
    const container = containerOrSize,
          size = containerOrSize;
    return this.query(new CircleWarp(position.x, position.y, radius, container.canvas !== undefined ? container.canvas.size : size));
  }

  queryRectangle(position, size) {
    return this.query(new Rectangle(position.x, position.y, size.width, size.height));
  }

  query(range, found) {
    var _a, _b, _c, _d;

    const res = found !== null && found !== void 0 ? found : [];

    if (!range.intersects(this.rectangle)) {
      return [];
    }

    for (const p of this.points) {
      if (!range.contains(p.position) && getDistance(range.position, p.position) > p.particle.getRadius()) {
        continue;
      }

      res.push(p.particle);
    }

    if (this.divided) {
      (_a = this.northEast) === null || _a === void 0 ? void 0 : _a.query(range, res);
      (_b = this.northWest) === null || _b === void 0 ? void 0 : _b.query(range, res);
      (_c = this.southEast) === null || _c === void 0 ? void 0 : _c.query(range, res);
      (_d = this.southWest) === null || _d === void 0 ? void 0 : _d.query(range, res);
    }

    return res;
  }

  subdivide() {
    const x = this.rectangle.position.x,
          y = this.rectangle.position.y,
          w = this.rectangle.size.width,
          h = this.rectangle.size.height,
          capacity = this.capacity;
    this.northEast = new QuadTree(new Rectangle(x, y, w / 2, h / 2), capacity);
    this.northWest = new QuadTree(new Rectangle(x + w / 2, y, w / 2, h / 2), capacity);
    this.southEast = new QuadTree(new Rectangle(x, y + h / 2, w / 2, h / 2), capacity);
    this.southWest = new QuadTree(new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), capacity);
    this.divided = true;
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Particles.js
var Particles_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var Particles_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
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
      links: new Map(),
      triangles: new Map()
    };
    this.interactionManager = new InteractionManager(Particles_classPrivateFieldGet(this, _Particles_engine, "f"), container);
    const canvasSize = this.container.canvas.size;
    this.linksColors = new Map();
    this.quadTree = new QuadTree(new Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, canvasSize.width * 3 / 2, canvasSize.height * 3 / 2), 4);
    this.movers = Particles_classPrivateFieldGet(this, _Particles_engine, "f").plugins.getMovers(container, true);
    this.updaters = Particles_classPrivateFieldGet(this, _Particles_engine, "f").plugins.getUpdaters(container, true);
  }

  get count() {
    return this.array.length;
  }

  init() {
    var _a;

    const container = this.container,
          options = container.actualOptions;
    this.lastZIndex = 0;
    this.needsSort = false;
    this.freqs.links = new Map();
    this.freqs.triangles = new Map();
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

        for (let i = this.count, j = 0; j < ((_a = groupOptions.number) === null || _a === void 0 ? void 0 : _a.value) && i < options.particles.number.value; i++, j++) {
          this.addParticle(undefined, groupOptions, group);
        }
      }

      for (let i = this.count; i < options.particles.number.value; i++) {
        this.addParticle();
      }
    }

    container.pathGenerator.init(container);
  }

  async redraw() {
    this.clear();
    this.init();
    await this.draw({
      value: 0,
      factor: 0
    });
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
          particle
        }
      });
    }
  }

  remove(particle, group, override) {
    this.removeAt(this.array.indexOf(particle), undefined, group, override);
  }

  async update(delta) {
    const container = this.container,
          particlesToDelete = [];
    container.pathGenerator.update();

    for (const [, plugin] of container.plugins) {
      if (plugin.update !== undefined) {
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
      particle.bubble.inRange = false;

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

  async draw(delta) {
    const container = this.container,
          canvasSize = this.container.canvas.size;
    this.quadTree = new QuadTree(new Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, canvasSize.width * 3 / 2, canvasSize.height * 3 / 2), 4);
    container.canvas.clear();
    await this.update(delta);

    if (this.needsSort) {
      this.zArray.sort((a, b) => b.position.z - a.position.z || a.id - b.id);
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

  clear() {
    this.array = [];
    this.zArray = [];
  }

  push(nb, mouse, overrideOptions, group) {
    this.pushing = true;

    for (let i = 0; i < nb; i++) {
      this.addParticle(mouse === null || mouse === void 0 ? void 0 : mouse.position, overrideOptions, group);
    }

    this.pushing = false;
  }

  addParticle(position, overrideOptions, group) {
    const container = this.container,
          options = container.actualOptions,
          limit = options.particles.number.limit * container.density;

    if (limit > 0) {
      const countToRemove = this.count + 1 - limit;

      if (countToRemove > 0) {
        this.removeQuantity(countToRemove);
      }
    }

    return this.pushParticle(position, overrideOptions, group);
  }

  addSplitParticle(parent) {
    const splitOptions = parent.options.destroy.split;
    const options = loadParticlesOptions(parent.options);
    const factor = getValue(splitOptions.factor);
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

    options.load(splitOptions.particles);
    const offset = splitOptions.sizeOffset ? setRangeValue(-parent.size.value, parent.size.value) : 0,
          position = {
      x: parent.position.x + randomInRange(offset),
      y: parent.position.y + randomInRange(offset)
    };
    return this.pushParticle(position, options, parent.group, particle => {
      if (particle.size.value < 0.5) {
        return false;
      }

      particle.velocity.length = randomInRange(setRangeValue(parent.velocity.length, particle.velocity.length));
      particle.splitCount = parent.splitCount + 1;
      particle.unbreakable = true;
      setTimeout(() => {
        particle.unbreakable = false;
      }, 500);
      return true;
    });
  }

  removeQuantity(quantity, group) {
    this.removeAt(0, quantity, group);
  }

  getLinkFrequency(p1, p2) {
    const range = setRangeValue(p1.id, p2.id),
          key = `${getRangeMin(range)}_${getRangeMax(range)}`;
    let res = this.freqs.links.get(key);

    if (res === undefined) {
      res = Math.random();
      this.freqs.links.set(key, res);
    }

    return res;
  }

  getTriangleFrequency(p1, p2, p3) {
    let [id1, id2, id3] = [p1.id, p2.id, p3.id];

    if (id1 > id2) {
      [id2, id1] = [id1, id2];
    }

    if (id2 > id3) {
      [id3, id2] = [id2, id3];
    }

    if (id1 > id3) {
      [id3, id1] = [id1, id3];
    }

    const key = `${id1}_${id2}_${id3}`;
    let res = this.freqs.triangles.get(key);

    if (res === undefined) {
      res = Math.random();
      this.freqs.triangles.set(key, res);
    }

    return res;
  }

  addManualParticles() {
    const container = this.container,
          options = container.actualOptions;

    for (const particle of options.manualParticles) {
      this.addParticle(calcPositionFromSize({
        size: container.canvas.size,
        position: particle.position
      }), particle.options);
    }
  }

  setDensity() {
    const options = this.container.actualOptions;

    for (const group in options.particles.groups) {
      this.applyDensity(options.particles.groups[group], 0, group);
    }

    this.applyDensity(options.particles, options.manualParticles.length);
  }

  handleClickMode(mode) {
    this.interactionManager.handleClickMode(mode);
  }

  applyDensity(options, manualCount, group) {
    var _a;

    if (!((_a = options.number.density) === null || _a === void 0 ? void 0 : _a.enable)) {
      return;
    }

    const numberOptions = options.number,
          densityFactor = this.initDensityFactor(numberOptions.density),
          optParticlesNumber = numberOptions.value,
          optParticlesLimit = numberOptions.limit > 0 ? numberOptions.limit : optParticlesNumber,
          particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount,
          particlesCount = Math.min(this.count, this.array.filter(t => t.group === group).length);
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

    const canvas = container.canvas.element,
          pxRatio = container.retina.pixelRatio;
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
          particle
        }
      });

      return particle;
    } catch (e) {
      console.warn(`error adding particle: ${e}`);
      return;
    }
  }

}
_Particles_engine = new WeakMap();
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Retina.js


class Retina {
  constructor(container) {
    this.container = container;
  }

  init() {
    const container = this.container,
          options = container.actualOptions;
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
            container.refresh().catch(() => {});
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
    const options = particle.options,
          ratio = this.pixelRatio,
          moveDistance = options.move.distance,
          props = particle.retina;
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Container.js
var Container_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var Container_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Container_engine;








class Container {
  constructor(engine, id, sourceOptions) {
    this.id = id;

    _Container_engine.set(this, void 0);

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
    this.plugins = new Map();
    this.drawers = new Map();
    this.density = 1;
    this._options = loadContainerOptions(Container_classPrivateFieldGet(this, _Container_engine, "f"));
    this.actualOptions = loadContainerOptions(Container_classPrivateFieldGet(this, _Container_engine, "f"));
    this.eventListeners = new EventListeners(this);

    if (typeof IntersectionObserver !== "undefined" && IntersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(entries => this.intersectionManager(entries));
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

  play(force) {
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

  pause() {
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

  draw(force) {
    let refreshTime = force;
    this.drawAnimationFrame = animate()(async timestamp => {
      if (refreshTime) {
        this.lastFrameTime = undefined;
        refreshTime = false;
      }

      await this.drawer.nextFrame(timestamp);
    });
  }

  getAnimationStatus() {
    return !this.paused && !this.pageHidden;
  }

  setNoise(noiseOrGenerator, init, update) {
    this.setPath(noiseOrGenerator, init, update);
  }

  setPath(pathOrGenerator, init, update) {
    var _a, _b, _c;

    if (!pathOrGenerator) {
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

  destroy() {
    this.stop();
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

    Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerDestroyed", {
      container: this
    });
  }

  exportImg(callback) {
    this.exportImage(callback);
  }

  exportImage(callback, type, quality) {
    var _a;

    return (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.toBlob(callback, type !== null && type !== void 0 ? type : "image/png", quality);
  }

  exportConfiguration() {
    return JSON.stringify(this.actualOptions, undefined, 2);
  }

  refresh() {
    this.stop();
    return this.start();
  }

  reset() {
    this._options = loadContainerOptions(Container_classPrivateFieldGet(this, _Container_engine, "f"));
    return this.refresh();
  }

  stop() {
    if (!this.started) {
      return;
    }

    this.firstStart = true;
    this.started = false;
    this.eventListeners.removeListeners();
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

    this.particles.linksColors = new Map();
    delete this.particles.grabLineColor;
    delete this.particles.linksColor;
    this._sourceOptions = this._options;

    Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerStopped", {
      container: this
    });
  }

  async loadTheme(name) {
    this.currentTheme = name;
    await this.refresh();
  }

  async start() {
    if (this.started) {
      return;
    }

    await this.init();
    this.started = true;
    this.eventListeners.addListeners();

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

  addClickHandler(callback) {
    const el = this.interactivity.element;

    if (!el) {
      return;
    }

    const clickOrTouchHandler = (e, pos, radius) => {
      if (this.destroyed) {
        return;
      }

      const pxRatio = this.retina.pixelRatio,
            posRetina = {
        x: pos.x * pxRatio,
        y: pos.y * pxRatio
      },
            particles = this.particles.quadTree.queryCircle(posRetina, radius * pxRatio);
      callback(e, particles);
    };

    const clickHandler = e => {
      if (this.destroyed) {
        return;
      }

      const mouseEvent = e,
            pos = {
        x: mouseEvent.offsetX || mouseEvent.clientX,
        y: mouseEvent.offsetY || mouseEvent.clientY
      };
      clickOrTouchHandler(e, pos, 1);
    };

    const touchStartHandler = () => {
      if (this.destroyed) {
        return;
      }

      touched = true;
      touchMoved = false;
    };

    const touchMoveHandler = () => {
      if (this.destroyed) {
        return;
      }

      touchMoved = true;
    };

    const touchEndHandler = e => {
      var _a, _b, _c;

      if (this.destroyed) {
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

        const canvasRect = (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect(),
              pos = {
          x: lastTouch.clientX - ((_b = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) !== null && _b !== void 0 ? _b : 0),
          y: lastTouch.clientY - ((_c = canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) !== null && _c !== void 0 ? _c : 0)
        };
        clickOrTouchHandler(e, pos, Math.max(lastTouch.radiusX, lastTouch.radiusY));
      }

      touched = false;
      touchMoved = false;
    };

    const touchCancelHandler = () => {
      if (this.destroyed) {
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

  handleClickMode(mode) {
    this.particles.handleClickMode(mode);

    for (const [, plugin] of this.plugins) {
      if (plugin.handleClickMode) {
        plugin.handleClickMode(mode);
      }
    }
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

  async init() {
    const shapes = Container_classPrivateFieldGet(this, _Container_engine, "f").plugins.getSupportedShapes();

    for (const type of shapes) {
      const drawer = Container_classPrivateFieldGet(this, _Container_engine, "f").plugins.getShapeDrawer(type);

      if (drawer) {
        this.drawers.set(type, drawer);
      }
    }

    this._options = loadContainerOptions(Container_classPrivateFieldGet(this, _Container_engine, "f"), this._initialSourceOptions, this.sourceOptions);
    this.actualOptions = loadContainerOptions(Container_classPrivateFieldGet(this, _Container_engine, "f"), this._options);
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
_Container_engine = new WeakMap();
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Loader.js
var Loader_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var Loader_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Loader_engine;





function fetchError(statusCode) {
  console.error(`Error tsParticles - fetch status: ${statusCode}`);
  console.error("Error tsParticles - File config not found");
}

class Loader {
  constructor(engine) {
    _Loader_engine.set(this, void 0);

    Loader_classPrivateFieldSet(this, _Loader_engine, engine, "f");
  }

  dom() {
    return Loader_classPrivateFieldGet(this, _Loader_engine, "f").domArray;
  }

  domItem(index) {
    const dom = this.dom();
    const item = dom[index];

    if (item && !item.destroyed) {
      return item;
    }

    dom.splice(index, 1);
  }

  async loadOptions(params) {
    var _a, _b, _c;

    const tagId = (_a = params.tagId) !== null && _a !== void 0 ? _a : `tsparticles${Math.floor(Math.random() * 10000)}`,
          {
      options,
      index
    } = params;
    let domContainer = (_b = params.element) !== null && _b !== void 0 ? _b : document.getElementById(tagId);

    if (!domContainer) {
      domContainer = document.createElement("div");
      domContainer.id = tagId;
      (_c = document.querySelector("body")) === null || _c === void 0 ? void 0 : _c.append(domContainer);
    }

    const currentOptions = options instanceof Array ? itemFromArray(options, index) : options,
          dom = this.dom(),
          oldIndex = dom.findIndex(v => v.id === tagId);

    if (oldIndex >= 0) {
      const old = this.domItem(oldIndex);

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
        canvasEl.style.width = "100%";
        canvasEl.style.height = "100%";
        domContainer.appendChild(canvasEl);
      }
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
    const {
      url: jsonUrl,
      index
    } = params,
          url = jsonUrl instanceof Array ? itemFromArray(jsonUrl, index) : jsonUrl;

    if (!url) {
      return;
    }

    const response = await fetch(url);

    if (!response.ok) {
      fetchError(response.status);
      return;
    }

    const data = await response.json();
    return this.loadOptions({
      tagId: params.tagId,
      element: params.element,
      index,
      options: data
    });
  }

  load(tagId, options, index) {
    const params = {
      index
    };

    if (typeof tagId === "string") {
      params.tagId = tagId;
    } else {
      params.options = tagId;
    }

    if (typeof options === "number") {
      params.index = options !== null && options !== void 0 ? options : params.index;
    } else {
      params.options = options !== null && options !== void 0 ? options : params.options;
    }

    return this.loadOptions(params);
  }

  async set(id, domContainer, options, index) {
    const params = {
      index
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
      url,
      index
    });
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
      url,
      index: newIndex,
      element
    });
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

  addEventListener(type, listener) {
    Loader_classPrivateFieldGet(this, _Loader_engine, "f").eventDispatcher.addEventListener(type, listener);
  }

  removeEventListener(type, listener) {
    Loader_classPrivateFieldGet(this, _Loader_engine, "f").eventDispatcher.removeEventListener(type, listener);
  }

  dispatchEvent(type, args) {
    Loader_classPrivateFieldGet(this, _Loader_engine, "f").eventDispatcher.dispatchEvent(type, args);
  }

}
_Loader_engine = new WeakMap();
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Plugins.js
var Plugins_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var _Plugins_engine;

class Plugins {
  constructor(engine) {
    _Plugins_engine.set(this, void 0);

    Plugins_classPrivateFieldSet(this, _Plugins_engine, engine, "f");

    this.plugins = [];
    this.interactorsInitializers = new Map();
    this.moversInitializers = new Map();
    this.updatersInitializers = new Map();
    this.interactors = new Map();
    this.movers = new Map();
    this.updaters = new Map();
    this.presets = new Map();
    this.drawers = new Map();
    this.pathGenerators = new Map();
  }

  getPlugin(plugin) {
    return this.plugins.find(t => t.id === plugin);
  }

  addPlugin(plugin) {
    if (!this.getPlugin(plugin.id)) {
      this.plugins.push(plugin);
    }
  }

  getAvailablePlugins(container) {
    const res = new Map();

    for (const plugin of this.plugins) {
      if (!plugin.needsPlugin(container.actualOptions)) {
        continue;
      }

      res.set(plugin.id, plugin.getPlugin(container));
    }

    return res;
  }

  loadOptions(options, sourceOptions) {
    for (const plugin of this.plugins) {
      plugin.loadOptions(options, sourceOptions);
    }
  }

  getPreset(preset) {
    return this.presets.get(preset);
  }

  addPreset(presetKey, options, override = false) {
    if (override || !this.getPreset(presetKey)) {
      this.presets.set(presetKey, options);
    }
  }

  getShapeDrawer(type) {
    return this.drawers.get(type);
  }

  addShapeDrawer(type, drawer) {
    if (!this.getShapeDrawer(type)) {
      this.drawers.set(type, drawer);
    }
  }

  getSupportedShapes() {
    return this.drawers.keys();
  }

  getPathGenerator(type) {
    return this.pathGenerators.get(type);
  }

  addPathGenerator(type, pathGenerator) {
    if (!this.getPathGenerator(type)) {
      this.pathGenerators.set(type, pathGenerator);
    }
  }

  getInteractors(container, force = false) {
    let res = this.interactors.get(container);

    if (!res || force) {
      res = [...this.interactorsInitializers.values()].map(t => t(container));
      this.interactors.set(container, res);
    }

    return res;
  }

  addInteractor(name, initInteractor) {
    this.interactorsInitializers.set(name, initInteractor);
  }

  getUpdaters(container, force = false) {
    let res = this.updaters.get(container);

    if (!res || force) {
      res = [...this.updatersInitializers.values()].map(t => t(container));
      this.updaters.set(container, res);
    }

    return res;
  }

  addParticleUpdater(name, initUpdater) {
    this.updatersInitializers.set(name, initUpdater);
  }

  getMovers(container, force = false) {
    let res = this.movers.get(container);

    if (!res || force) {
      res = [...this.moversInitializers.values()].map(t => t(container));
      this.movers.set(container, res);
    }

    return res;
  }

  addParticleMover(name, initMover) {
    this.moversInitializers.set(name, initMover);
  }

}
_Plugins_engine = new WeakMap();
;// CONCATENATED MODULE: ../../engine/dist/esm/engine.js
var engine_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var engine_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Engine_initialized, _Engine_loader;




class Engine {
  constructor() {
    _Engine_initialized.set(this, void 0);

    _Engine_loader.set(this, void 0);

    this.domArray = [];
    this.eventDispatcher = new EventDispatcher();

    engine_classPrivateFieldSet(this, _Engine_initialized, false, "f");

    engine_classPrivateFieldSet(this, _Engine_loader, new Loader(this), "f");

    this.plugins = new Plugins(this);
  }

  init() {
    if (!engine_classPrivateFieldGet(this, _Engine_initialized, "f")) {
      engine_classPrivateFieldSet(this, _Engine_initialized, true, "f");
    }
  }

  async loadFromArray(tagId, options, index) {
    return engine_classPrivateFieldGet(this, _Engine_loader, "f").load(tagId, options, index);
  }

  async load(tagId, options) {
    return engine_classPrivateFieldGet(this, _Engine_loader, "f").load(tagId, options);
  }

  async set(id, element, options) {
    return engine_classPrivateFieldGet(this, _Engine_loader, "f").set(id, element, options);
  }

  async loadJSON(tagId, pathConfigJson, index) {
    return engine_classPrivateFieldGet(this, _Engine_loader, "f").loadJSON(tagId, pathConfigJson, index);
  }

  async setJSON(id, element, pathConfigJson, index) {
    return engine_classPrivateFieldGet(this, _Engine_loader, "f").setJSON(id, element, pathConfigJson, index);
  }

  setOnClickHandler(callback) {
    engine_classPrivateFieldGet(this, _Engine_loader, "f").setOnClickHandler(callback);
  }

  dom() {
    return engine_classPrivateFieldGet(this, _Engine_loader, "f").dom();
  }

  domItem(index) {
    return engine_classPrivateFieldGet(this, _Engine_loader, "f").domItem(index);
  }

  async refresh() {
    for (const instance of this.dom()) {
      await instance.refresh();
    }
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

  async addPreset(preset, options, override = false) {
    this.plugins.addPreset(preset, options, override);
    await this.refresh();
  }

  async addPlugin(plugin) {
    this.plugins.addPlugin(plugin);
    await this.refresh();
  }

  async addPathGenerator(name, generator) {
    this.plugins.addPathGenerator(name, generator);
    await this.refresh();
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

  addEventListener(type, listener) {
    engine_classPrivateFieldGet(this, _Engine_loader, "f").addEventListener(type, listener);
  }

  removeEventListener(type, listener) {
    engine_classPrivateFieldGet(this, _Engine_loader, "f").removeEventListener(type, listener);
  }

  dispatchEvent(type, args) {
    engine_classPrivateFieldGet(this, _Engine_loader, "f").dispatchEvent(type, args);
  }

}
_Engine_initialized = new WeakMap(), _Engine_loader = new WeakMap();
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/ExternalInteractorBase.js
class ExternalInteractorBase {
  constructor(container) {
    this.container = container;
    this.type = 0;
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/ParticlesInteractorBase.js
class ParticlesInteractorBase {
  constructor(container) {
    this.container = container;
    this.type = 1;
  }

}
;// CONCATENATED MODULE: ../../engine/dist/esm/index.js

const tsParticles = new Engine();
tsParticles.init();






















































































































































































































































































;// CONCATENATED MODULE: ../../updaters/angle/dist/esm/AngleUpdater.js


function updateAngle(particle, delta) {
  var _a;

  const rotate = particle.rotate;

  if (!rotate) {
    return;
  }

  const rotateOptions = particle.options.rotate;
  const rotateAnimation = rotateOptions.animation;
  const speed = ((_a = rotate.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
  const max = 2 * Math.PI;

  if (!rotateAnimation.enable) {
    return;
  }

  switch (rotate.status) {
    case 0:
      rotate.value += speed;

      if (rotate.value > max) {
        rotate.value -= max;
      }

      break;

    case 1:
    default:
      rotate.value -= speed;

      if (rotate.value < 0) {
        rotate.value += max;
      }

      break;
  }
}

class AngleUpdater {
  constructor(container) {
    this.container = container;
  }

  init(particle) {
    const rotateOptions = particle.options.rotate;
    particle.rotate = {
      enable: rotateOptions.animation.enable,
      value: getRangeValue(rotateOptions.value) * Math.PI / 180
    };
    let rotateDirection = rotateOptions.direction;

    if (rotateDirection === "random") {
      const index = Math.floor(Math.random() * 2);
      rotateDirection = index > 0 ? "counter-clockwise" : "clockwise";
    }

    switch (rotateDirection) {
      case "counter-clockwise":
      case "counterClockwise":
        particle.rotate.status = 1;
        break;

      case "clockwise":
        particle.rotate.status = 0;
        break;
    }

    const rotateAnimation = particle.options.rotate.animation;

    if (rotateAnimation.enable) {
      particle.rotate.velocity = getRangeValue(rotateAnimation.speed) / 360 * this.container.retina.reduceFactor;

      if (!rotateAnimation.sync) {
        particle.rotate.velocity *= Math.random();
      }
    }
  }

  isEnabled(particle) {
    const rotate = particle.options.rotate;
    const rotateAnimation = rotate.animation;
    return !particle.destroyed && !particle.spawning && !rotate.path && rotateAnimation.enable;
  }

  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateAngle(particle, delta);
  }

}
;// CONCATENATED MODULE: ../../updaters/angle/dist/esm/index.js

async function loadAngleUpdater(engine) {
  await engine.addParticleUpdater("angle", container => new AngleUpdater(container));
}
;// CONCATENATED MODULE: ../../move/base/dist/esm/Utils.js

function applyDistance(particle) {
  const initialPosition = particle.initialPosition;
  const {
    dx,
    dy
  } = getDistances(initialPosition, particle.position);
  const dxFixed = Math.abs(dx),
        dyFixed = Math.abs(dy);
  const hDistance = particle.retina.maxDistance.horizontal;
  const vDistance = particle.retina.maxDistance.vertical;

  if (!hDistance && !vDistance) {
    return;
  }

  if ((hDistance && dxFixed >= hDistance || vDistance && dyFixed >= vDistance) && !particle.misplaced) {
    particle.misplaced = !!hDistance && dxFixed > hDistance || !!vDistance && dyFixed > vDistance;

    if (hDistance) {
      particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
    }

    if (vDistance) {
      particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
    }
  } else if ((!hDistance || dxFixed < hDistance) && (!vDistance || dyFixed < vDistance) && particle.misplaced) {
    particle.misplaced = false;
  } else if (particle.misplaced) {
    const pos = particle.position,
          vel = particle.velocity;

    if (hDistance && (pos.x < initialPosition.x && vel.x < 0 || pos.x > initialPosition.x && vel.x > 0)) {
      vel.x *= -Math.random();
    }

    if (vDistance && (pos.y < initialPosition.y && vel.y < 0 || pos.y > initialPosition.y && vel.y > 0)) {
      vel.y *= -Math.random();
    }
  }
}
function spin(particle, moveSpeed) {
  const container = particle.container;

  if (!particle.spin) {
    return;
  }

  const updateFunc = {
    x: particle.spin.direction === "clockwise" ? Math.cos : Math.sin,
    y: particle.spin.direction === "clockwise" ? Math.sin : Math.cos
  };
  particle.position.x = particle.spin.center.x + particle.spin.radius * updateFunc.x(particle.spin.angle);
  particle.position.y = particle.spin.center.y + particle.spin.radius * updateFunc.y(particle.spin.angle);
  particle.spin.radius += particle.spin.acceleration;
  const maxCanvasSize = Math.max(container.canvas.size.width, container.canvas.size.height);

  if (particle.spin.radius > maxCanvasSize / 2) {
    particle.spin.radius = maxCanvasSize / 2;
    particle.spin.acceleration *= -1;
  } else if (particle.spin.radius < 0) {
    particle.spin.radius = 0;
    particle.spin.acceleration *= -1;
  }

  particle.spin.angle += moveSpeed / 100 * (1 - particle.spin.radius / maxCanvasSize);
}
function applyPath(particle, delta) {
  const particlesOptions = particle.options;
  const pathOptions = particlesOptions.move.path;
  const pathEnabled = pathOptions.enable;

  if (!pathEnabled) {
    return;
  }

  const container = particle.container;

  if (particle.lastPathTime <= particle.pathDelay) {
    particle.lastPathTime += delta.value;
    return;
  }

  const path = container.pathGenerator.generate(particle);
  particle.velocity.addTo(path);

  if (pathOptions.clamp) {
    particle.velocity.x = clamp(particle.velocity.x, -1, 1);
    particle.velocity.y = clamp(particle.velocity.y, -1, 1);
  }

  particle.lastPathTime -= particle.pathDelay;
}
function getProximitySpeedFactor(particle) {
  const container = particle.container;
  const options = container.actualOptions;
  const active = isInArray("slow", options.interactivity.events.onHover.mode);

  if (!active) {
    return 1;
  }

  const mousePos = particle.container.interactivity.mouse.position;

  if (!mousePos) {
    return 1;
  }

  const particlePos = particle.getPosition();
  const dist = getDistance(mousePos, particlePos);
  const radius = container.retina.slowModeRadius;

  if (dist > radius) {
    return 1;
  }

  const proximityFactor = dist / radius || 0;
  const slowFactor = options.interactivity.modes.slow.factor;
  return proximityFactor / slowFactor;
}
;// CONCATENATED MODULE: ../../move/base/dist/esm/BaseMover.js


class BaseMover {
  init(particle) {
    var _a;

    const container = particle.container,
          options = particle.options,
          spinOptions = options.move.spin;

    if (spinOptions.enable) {
      const spinPos = (_a = spinOptions.position) !== null && _a !== void 0 ? _a : {
        x: 50,
        y: 50
      };
      const spinCenter = {
        x: spinPos.x / 100 * container.canvas.size.width,
        y: spinPos.y / 100 * container.canvas.size.height
      };
      const pos = particle.getPosition();
      const distance = getDistance(pos, spinCenter);
      const spinAcceleration = getRangeValue(spinOptions.acceleration);
      particle.retina.spinAcceleration = spinAcceleration * container.retina.pixelRatio;
      particle.spin = {
        center: spinCenter,
        direction: particle.velocity.x >= 0 ? "clockwise" : "counter-clockwise",
        angle: particle.velocity.angle,
        radius: distance,
        acceleration: particle.retina.spinAcceleration
      };
    }
  }

  isEnabled(particle) {
    return !particle.destroyed && particle.options.move.enable;
  }

  move(particle, delta) {
    var _a, _b, _c;

    var _d, _e;

    const particleOptions = particle.options,
          moveOptions = particleOptions.move;

    if (!moveOptions.enable) {
      return;
    }

    const container = particle.container,
          slowFactor = getProximitySpeedFactor(particle),
          baseSpeed = ((_a = (_d = particle.retina).moveSpeed) !== null && _a !== void 0 ? _a : _d.moveSpeed = getRangeValue(moveOptions.speed) * container.retina.pixelRatio) * container.retina.reduceFactor,
          moveDrift = (_b = (_e = particle.retina).moveDrift) !== null && _b !== void 0 ? _b : _e.moveDrift = getRangeValue(particle.options.move.drift) * container.retina.pixelRatio,
          maxSize = getRangeMax(particleOptions.size.value) * container.retina.pixelRatio,
          sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : 1,
          speedFactor = sizeFactor * slowFactor * (delta.factor || 1),
          diffFactor = 2,
          moveSpeed = baseSpeed * speedFactor / diffFactor;
    applyPath(particle, delta);
    const gravityOptions = particle.gravity,
          gravityFactor = gravityOptions.enable && gravityOptions.inverse ? -1 : 1;

    if (gravityOptions.enable && moveSpeed) {
      particle.velocity.y += gravityFactor * (gravityOptions.acceleration * delta.factor) / (60 * moveSpeed);
    }

    if (moveDrift && moveSpeed) {
      particle.velocity.x += moveDrift * delta.factor / (60 * moveSpeed);
    }

    const decay = particle.moveDecay;

    if (decay != 1) {
      particle.velocity.multTo(decay);
    }

    const velocity = particle.velocity.mult(moveSpeed),
          maxSpeed = (_c = particle.retina.maxSpeed) !== null && _c !== void 0 ? _c : container.retina.maxSpeed;

    if (gravityOptions.enable && maxSpeed > 0 && (!gravityOptions.inverse && velocity.y >= 0 && velocity.y >= maxSpeed || gravityOptions.inverse && velocity.y <= 0 && velocity.y <= -maxSpeed)) {
      velocity.y = gravityFactor * maxSpeed;

      if (moveSpeed) {
        particle.velocity.y = velocity.y / moveSpeed;
      }
    }

    const zIndexOptions = particle.options.zIndex,
          zVelocityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.velocityRate;

    if (moveOptions.spin.enable) {
      spin(particle, moveSpeed);
    } else {
      if (zVelocityFactor != 1) {
        velocity.multTo(zVelocityFactor);
      }

      particle.position.addTo(velocity);

      if (moveOptions.vibrate) {
        particle.position.x += Math.sin(particle.position.x * Math.cos(particle.position.y));
        particle.position.y += Math.cos(particle.position.y * Math.sin(particle.position.x));
      }
    }

    applyDistance(particle);
  }

}
;// CONCATENATED MODULE: ../../move/base/dist/esm/index.js

async function loadBaseMover(engine) {
  engine.addMover("base", () => new BaseMover());
}
;// CONCATENATED MODULE: ../../shapes/circle/dist/esm/CircleDrawer.js
class CircleDrawer {
  getSidesCount() {
    return 12;
  }

  draw(context, particle, radius) {
    context.arc(0, 0, radius, 0, Math.PI * 2, false);
  }

}
;// CONCATENATED MODULE: ../../shapes/circle/dist/esm/index.js

async function loadCircleShape(engine) {
  await engine.addShape("circle", new CircleDrawer());
}
;// CONCATENATED MODULE: ../../updaters/color/dist/esm/ColorUpdater.js


function updateColorValue(delta, value, valueAnimation, max, decrease) {
  var _a;

  const colorValue = value;

  if (!colorValue || !valueAnimation.enable) {
    return;
  }

  const offset = randomInRange(valueAnimation.offset);
  const velocity = ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor + offset * 3.6;

  if (!decrease || colorValue.status === 0) {
    colorValue.value += velocity;

    if (decrease && colorValue.value > max) {
      colorValue.status = 1;
      colorValue.value -= colorValue.value % max;
    }
  } else {
    colorValue.value -= velocity;

    if (colorValue.value < 0) {
      colorValue.status = 0;
      colorValue.value += colorValue.value;
    }
  }

  if (colorValue.value > max) {
    colorValue.value %= max;
  }
}

function updateColor(particle, delta) {
  var _a, _b, _c;

  const animationOptions = particle.options.color.animation;

  if (((_a = particle.color) === null || _a === void 0 ? void 0 : _a.h) !== undefined) {
    updateColorValue(delta, particle.color.h, animationOptions.h, 360, false);
  }

  if (((_b = particle.color) === null || _b === void 0 ? void 0 : _b.s) !== undefined) {
    updateColorValue(delta, particle.color.s, animationOptions.s, 100, true);
  }

  if (((_c = particle.color) === null || _c === void 0 ? void 0 : _c.l) !== undefined) {
    updateColorValue(delta, particle.color.l, animationOptions.l, 100, true);
  }
}

class ColorUpdater {
  constructor(container) {
    this.container = container;
  }

  init(particle) {
    const hslColor = colorToHsl(particle.options.color, particle.id, particle.options.reduceDuplicates);

    if (hslColor) {
      particle.color = getHslAnimationFromHsl(hslColor, particle.options.color.animation, this.container.retina.reduceFactor);
    }
  }

  isEnabled(particle) {
    var _a, _b, _c;

    const animationOptions = particle.options.color.animation;
    return !particle.destroyed && !particle.spawning && (((_a = particle.color) === null || _a === void 0 ? void 0 : _a.h.value) !== undefined && animationOptions.h.enable || ((_b = particle.color) === null || _b === void 0 ? void 0 : _b.s.value) !== undefined && animationOptions.s.enable || ((_c = particle.color) === null || _c === void 0 ? void 0 : _c.l.value) !== undefined && animationOptions.l.enable);
  }

  update(particle, delta) {
    updateColor(particle, delta);
  }

}
;// CONCATENATED MODULE: ../../updaters/color/dist/esm/index.js

async function loadColorUpdater(engine) {
  await engine.addParticleUpdater("color", container => new ColorUpdater(container));
}
;// CONCATENATED MODULE: ../../interactions/external/attract/dist/esm/Attractor.js

class Attractor extends ExternalInteractorBase {
  constructor(container) {
    super(container);

    if (!container.attract) {
      container.attract = {
        particles: []
      };
    }

    this.handleClickMode = mode => {
      const options = this.container.actualOptions;

      if (mode !== "attract") {
        return;
      }

      if (!container.attract) {
        container.attract = {
          particles: []
        };
      }

      container.attract.clicking = true;
      container.attract.count = 0;

      for (const particle of container.attract.particles) {
        particle.velocity.setTo(particle.initialVelocity);
      }

      container.attract.particles = [];
      container.attract.finish = false;
      setTimeout(() => {
        if (!container.destroyed) {
          if (!container.attract) {
            container.attract = {
              particles: []
            };
          }

          container.attract.clicking = false;
        }
      }, options.interactivity.modes.attract.duration * 1000);
    };
  }

  isEnabled() {
    const container = this.container,
          options = container.actualOptions,
          mouse = container.interactivity.mouse,
          events = options.interactivity.events;

    if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
      return false;
    }

    const hoverMode = events.onHover.mode,
          clickMode = events.onClick.mode;
    return isInArray("attract", hoverMode) || isInArray("attract", clickMode);
  }

  reset() {}

  async interact() {
    const container = this.container,
          options = container.actualOptions,
          mouseMoveStatus = container.interactivity.status === mouseMoveEvent,
          events = options.interactivity.events,
          hoverEnabled = events.onHover.enable,
          hoverMode = events.onHover.mode,
          clickEnabled = events.onClick.enable,
          clickMode = events.onClick.mode;

    if (mouseMoveStatus && hoverEnabled && isInArray("attract", hoverMode)) {
      this.hoverAttract();
    } else if (clickEnabled && isInArray("attract", clickMode)) {
      this.clickAttract();
    }
  }

  hoverAttract() {
    const container = this.container;
    const mousePos = container.interactivity.mouse.position;

    if (!mousePos) {
      return;
    }

    const attractRadius = container.retina.attractModeDistance;
    this.processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
  }

  processAttract(position, attractRadius, area) {
    const container = this.container;
    const attractOptions = container.actualOptions.interactivity.modes.attract;
    const query = container.particles.quadTree.query(area);

    for (const particle of query) {
      const {
        dx,
        dy,
        distance
      } = getDistances(particle.position, position);
      const velocity = attractOptions.speed * attractOptions.factor;
      const attractFactor = clamp(calcEasing(1 - distance / attractRadius, attractOptions.easing) * velocity, 0, attractOptions.maxSpeed);
      const normVec = Vector.create(distance === 0 ? velocity : dx / distance * attractFactor, distance === 0 ? velocity : dy / distance * attractFactor);
      particle.position.subFrom(normVec);
    }
  }

  clickAttract() {
    const container = this.container;

    if (!container.attract) {
      container.attract = {
        particles: []
      };
    }

    if (!container.attract.finish) {
      if (!container.attract.count) {
        container.attract.count = 0;
      }

      container.attract.count++;

      if (container.attract.count === container.particles.count) {
        container.attract.finish = true;
      }
    }

    if (container.attract.clicking) {
      const mousePos = container.interactivity.mouse.clickPosition;

      if (!mousePos) {
        return;
      }

      const attractRadius = container.retina.attractModeDistance;
      this.processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
    } else if (container.attract.clicking === false) {
      container.attract.particles = [];
    }

    return;
  }

}
;// CONCATENATED MODULE: ../../interactions/external/attract/dist/esm/index.js

async function loadExternalAttractInteraction(engine) {
  await engine.addInteractor("externalAttract", container => new Attractor(container));
}
;// CONCATENATED MODULE: ../../interactions/external/bounce/dist/esm/Bouncer.js

class Bouncer extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }

  isEnabled() {
    const container = this.container,
          options = container.actualOptions,
          mouse = container.interactivity.mouse,
          events = options.interactivity.events,
          divs = events.onDiv;
    return mouse.position && events.onHover.enable && isInArray("bounce", events.onHover.mode) || isDivModeEnabled("bounce", divs);
  }

  async interact() {
    const container = this.container,
          options = container.actualOptions,
          events = options.interactivity.events,
          mouseMoveStatus = container.interactivity.status === mouseMoveEvent,
          hoverEnabled = events.onHover.enable,
          hoverMode = events.onHover.mode,
          divs = events.onDiv;

    if (mouseMoveStatus && hoverEnabled && isInArray("bounce", hoverMode)) {
      this.processMouseBounce();
    } else {
      divModeExecute("bounce", divs, (selector, div) => this.singleSelectorBounce(selector, div));
    }
  }

  reset() {}

  processMouseBounce() {
    const container = this.container,
          pxRatio = container.retina.pixelRatio,
          tolerance = 10 * pxRatio,
          mousePos = container.interactivity.mouse.position,
          radius = container.retina.bounceModeDistance;

    if (mousePos) {
      this.processBounce(mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance));
    }
  }

  singleSelectorBounce(selector, div) {
    const container = this.container,
          query = document.querySelectorAll(selector);

    if (!query.length) {
      return;
    }

    query.forEach(item => {
      const elem = item,
            pxRatio = container.retina.pixelRatio,
            pos = {
        x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
        y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
      },
            radius = elem.offsetWidth / 2 * pxRatio,
            tolerance = 10 * pxRatio,
            area = div.type === "circle" ? new Circle(pos.x, pos.y, radius + tolerance) : new Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * 2, elem.offsetHeight * pxRatio + tolerance * 2);
      this.processBounce(pos, radius, area);
    });
  }

  processBounce(position, radius, area) {
    const query = this.container.particles.quadTree.query(area);

    for (const particle of query) {
      if (area instanceof Circle) {
        circleBounce(circleBounceDataFromParticle(particle), {
          position,
          radius,
          mass: radius ** 2 * Math.PI / 2,
          velocity: Vector.origin,
          factor: Vector.origin
        });
      } else if (area instanceof Rectangle) {
        rectBounce(particle, calculateBounds(position, radius));
      }
    }
  }

}
;// CONCATENATED MODULE: ../../interactions/external/bounce/dist/esm/index.js

async function loadExternalBounceInteraction(engine) {
  await engine.addInteractor("externalBounce", container => new Bouncer(container));
}
;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/esm/Bubbler.js


function calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
  if (modeValue >= optionsValue) {
    const value = particleValue + (modeValue - optionsValue) * ratio;
    return clamp(value, particleValue, modeValue);
  } else if (modeValue < optionsValue) {
    const value = particleValue - (optionsValue - modeValue) * ratio;
    return clamp(value, modeValue, particleValue);
  }
}

class Bubbler extends ExternalInteractorBase {
  constructor(container) {
    super(container);

    if (!container.bubble) {
      container.bubble = {};
    }

    this.handleClickMode = mode => {
      if (mode !== "bubble") {
        return;
      }

      if (!container.bubble) {
        container.bubble = {};
      }

      container.bubble.clicking = true;
    };
  }

  isEnabled() {
    const container = this.container,
          options = container.actualOptions,
          mouse = container.interactivity.mouse,
          events = options.interactivity.events,
          divs = events.onDiv,
          divBubble = isDivModeEnabled("bubble", divs);

    if (!(divBubble || events.onHover.enable && mouse.position || events.onClick.enable && mouse.clickPosition)) {
      return false;
    }

    const hoverMode = events.onHover.mode;
    const clickMode = events.onClick.mode;
    return isInArray("bubble", hoverMode) || isInArray("bubble", clickMode) || divBubble;
  }

  reset(particle, force) {
    if (!(!particle.bubble.inRange || force)) {
      return;
    }

    delete particle.bubble.div;
    delete particle.bubble.opacity;
    delete particle.bubble.radius;
    delete particle.bubble.color;
  }

  async interact() {
    const options = this.container.actualOptions,
          events = options.interactivity.events,
          onHover = events.onHover,
          onClick = events.onClick,
          hoverEnabled = onHover.enable,
          hoverMode = onHover.mode,
          clickEnabled = onClick.enable,
          clickMode = onClick.mode,
          divs = events.onDiv;

    if (hoverEnabled && isInArray("bubble", hoverMode)) {
      this.hoverBubble();
    } else if (clickEnabled && isInArray("bubble", clickMode)) {
      this.clickBubble();
    } else {
      divModeExecute("bubble", divs, (selector, div) => this.singleSelectorHover(selector, div));
    }
  }

  singleSelectorHover(selector, div) {
    const container = this.container,
          selectors = document.querySelectorAll(selector);

    if (!selectors.length) {
      return;
    }

    selectors.forEach(item => {
      const elem = item,
            pxRatio = container.retina.pixelRatio,
            pos = {
        x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
        y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
      },
            repulseRadius = elem.offsetWidth / 2 * pxRatio,
            area = div.type === "circle" ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio),
            query = container.particles.quadTree.query(area);

      for (const particle of query) {
        if (!area.contains(particle.getPosition())) {
          continue;
        }

        particle.bubble.inRange = true;
        const divs = container.actualOptions.interactivity.modes.bubble.divs;
        const divBubble = divMode(divs, elem);

        if (!particle.bubble.div || particle.bubble.div !== elem) {
          this.reset(particle, true);
          particle.bubble.div = elem;
        }

        this.hoverBubbleSize(particle, 1, divBubble);
        this.hoverBubbleOpacity(particle, 1, divBubble);
        this.hoverBubbleColor(particle, 1, divBubble);
      }
    });
  }

  process(particle, distMouse, timeSpent, data) {
    const container = this.container,
          bubbleParam = data.bubbleObj.optValue;

    if (bubbleParam === undefined) {
      return;
    }

    const options = container.actualOptions,
          bubbleDuration = options.interactivity.modes.bubble.duration,
          bubbleDistance = container.retina.bubbleModeDistance,
          particlesParam = data.particlesObj.optValue,
          pObjBubble = data.bubbleObj.value,
          pObj = data.particlesObj.value || 0,
          type = data.type;

    if (bubbleParam === particlesParam) {
      return;
    }

    if (!container.bubble) {
      container.bubble = {};
    }

    if (!container.bubble.durationEnd) {
      if (distMouse <= bubbleDistance) {
        const obj = pObjBubble !== null && pObjBubble !== void 0 ? pObjBubble : pObj;

        if (obj !== bubbleParam) {
          const value = pObj - timeSpent * (pObj - bubbleParam) / bubbleDuration;

          if (type === "size") {
            particle.bubble.radius = value;
          }

          if (type === "opacity") {
            particle.bubble.opacity = value;
          }
        }
      } else {
        if (type === "size") {
          delete particle.bubble.radius;
        }

        if (type === "opacity") {
          delete particle.bubble.opacity;
        }
      }
    } else if (pObjBubble) {
      if (type === "size") {
        delete particle.bubble.radius;
      }

      if (type === "opacity") {
        delete particle.bubble.opacity;
      }
    }
  }

  clickBubble() {
    var _a, _b;

    const container = this.container,
          options = container.actualOptions,
          mouseClickPos = container.interactivity.mouse.clickPosition;

    if (!mouseClickPos) {
      return;
    }

    if (!container.bubble) {
      container.bubble = {};
    }

    const distance = container.retina.bubbleModeDistance,
          query = container.particles.quadTree.queryCircle(mouseClickPos, distance);

    for (const particle of query) {
      if (!container.bubble.clicking) {
        continue;
      }

      particle.bubble.inRange = !container.bubble.durationEnd;
      const pos = particle.getPosition(),
            distMouse = getDistance(pos, mouseClickPos),
            timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1000;

      if (timeSpent > options.interactivity.modes.bubble.duration) {
        container.bubble.durationEnd = true;
      }

      if (timeSpent > options.interactivity.modes.bubble.duration * 2) {
        container.bubble.clicking = false;
        container.bubble.durationEnd = false;
      }

      const sizeData = {
        bubbleObj: {
          optValue: container.retina.bubbleModeSize,
          value: particle.bubble.radius
        },
        particlesObj: {
          optValue: getRangeMax(particle.options.size.value) * container.retina.pixelRatio,
          value: particle.size.value
        },
        type: "size"
      };
      this.process(particle, distMouse, timeSpent, sizeData);
      const opacityData = {
        bubbleObj: {
          optValue: options.interactivity.modes.bubble.opacity,
          value: particle.bubble.opacity
        },
        particlesObj: {
          optValue: getRangeMax(particle.options.opacity.value),
          value: (_b = (_a = particle.opacity) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 1
        },
        type: "opacity"
      };
      this.process(particle, distMouse, timeSpent, opacityData);

      if (!container.bubble.durationEnd) {
        if (distMouse <= container.retina.bubbleModeDistance) {
          this.hoverBubbleColor(particle, distMouse);
        } else {
          delete particle.bubble.color;
        }
      } else {
        delete particle.bubble.color;
      }
    }
  }

  hoverBubble() {
    const container = this.container,
          mousePos = container.interactivity.mouse.position;

    if (mousePos === undefined) {
      return;
    }

    const distance = container.retina.bubbleModeDistance,
          query = container.particles.quadTree.queryCircle(mousePos, distance);

    for (const particle of query) {
      particle.bubble.inRange = true;
      const pos = particle.getPosition(),
            pointDistance = getDistance(pos, mousePos),
            ratio = 1 - pointDistance / distance;

      if (pointDistance <= distance) {
        if (ratio >= 0 && container.interactivity.status === mouseMoveEvent) {
          this.hoverBubbleSize(particle, ratio);
          this.hoverBubbleOpacity(particle, ratio);
          this.hoverBubbleColor(particle, ratio);
        }
      } else {
        this.reset(particle);
      }

      if (container.interactivity.status === mouseLeaveEvent) {
        this.reset(particle);
      }
    }
  }

  hoverBubbleSize(particle, ratio, divBubble) {
    const container = this.container,
          modeSize = (divBubble === null || divBubble === void 0 ? void 0 : divBubble.size) ? divBubble.size * container.retina.pixelRatio : container.retina.bubbleModeSize;

    if (modeSize === undefined) {
      return;
    }

    const optSize = getRangeMax(particle.options.size.value) * container.retina.pixelRatio;
    const pSize = particle.size.value;
    const size = calculateBubbleValue(pSize, modeSize, optSize, ratio);

    if (size !== undefined) {
      particle.bubble.radius = size;
    }
  }

  hoverBubbleOpacity(particle, ratio, divBubble) {
    var _a, _b, _c;

    const container = this.container,
          options = container.actualOptions,
          modeOpacity = (_a = divBubble === null || divBubble === void 0 ? void 0 : divBubble.opacity) !== null && _a !== void 0 ? _a : options.interactivity.modes.bubble.opacity;

    if (!modeOpacity) {
      return;
    }

    const optOpacity = particle.options.opacity.value;
    const pOpacity = (_c = (_b = particle.opacity) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : 1;
    const opacity = calculateBubbleValue(pOpacity, modeOpacity, getRangeMax(optOpacity), ratio);

    if (opacity !== undefined) {
      particle.bubble.opacity = opacity;
    }
  }

  hoverBubbleColor(particle, ratio, divBubble) {
    const options = this.container.actualOptions;
    const bubbleOptions = divBubble !== null && divBubble !== void 0 ? divBubble : options.interactivity.modes.bubble;

    if (!particle.bubble.finalColor) {
      const modeColor = bubbleOptions.color;

      if (!modeColor) {
        return;
      }

      const bubbleColor = modeColor instanceof Array ? itemFromArray(modeColor) : modeColor;
      particle.bubble.finalColor = colorToHsl(bubbleColor);
    }

    if (!particle.bubble.finalColor) {
      return;
    }

    if (bubbleOptions.mix) {
      particle.bubble.color = undefined;
      const pColor = particle.getFillColor();
      particle.bubble.color = pColor ? rgbToHsl(colorMix(pColor, particle.bubble.finalColor, 1 - ratio, ratio)) : particle.bubble.finalColor;
    } else {
      particle.bubble.color = particle.bubble.finalColor;
    }
  }

}
;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/esm/index.js

async function loadExternalBubbleInteraction(engine) {
  await engine.addInteractor("externalBubble", container => new Bubbler(container));
}
;// CONCATENATED MODULE: ../../interactions/external/connect/dist/esm/Connector.js

class Connector extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }

  isEnabled() {
    const container = this.container,
          mouse = container.interactivity.mouse,
          events = container.actualOptions.interactivity.events;

    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }

    return isInArray("connect", events.onHover.mode);
  }

  reset() {}

  async interact() {
    const container = this.container,
          options = container.actualOptions;

    if (options.interactivity.events.onHover.enable && container.interactivity.status === "mousemove") {
      const mousePos = container.interactivity.mouse.position;

      if (!mousePos) {
        return;
      }

      const distance = Math.abs(container.retina.connectModeRadius),
            query = container.particles.quadTree.queryCircle(mousePos, distance);
      let i = 0;

      for (const p1 of query) {
        const pos1 = p1.getPosition();

        for (const p2 of query.slice(i + 1)) {
          const pos2 = p2.getPosition(),
                distMax = Math.abs(container.retina.connectModeDistance),
                xDiff = Math.abs(pos1.x - pos2.x),
                yDiff = Math.abs(pos1.y - pos2.y);

          if (xDiff < distMax && yDiff < distMax) {
            container.canvas.drawConnectLine(p1, p2);
          }
        }

        ++i;
      }
    }
  }

}
;// CONCATENATED MODULE: ../../interactions/external/connect/dist/esm/index.js

async function loadExternalConnectInteraction(engine) {
  await engine.addInteractor("externalConnect", container => new Connector(container));
}
;// CONCATENATED MODULE: ../../interactions/external/grab/dist/esm/Grabber.js

class Grabber extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }

  isEnabled() {
    const container = this.container,
          mouse = container.interactivity.mouse,
          events = container.actualOptions.interactivity.events;
    return events.onHover.enable && !!mouse.position && isInArray("grab", events.onHover.mode);
  }

  reset() {}

  async interact() {
    var _a;

    const container = this.container,
          options = container.actualOptions,
          interactivity = options.interactivity;

    if (!interactivity.events.onHover.enable || container.interactivity.status !== mouseMoveEvent) {
      return;
    }

    const mousePos = container.interactivity.mouse.position;

    if (!mousePos) {
      return;
    }

    const distance = container.retina.grabModeDistance,
          query = container.particles.quadTree.queryCircle(mousePos, distance);

    for (const particle of query) {
      const pos = particle.getPosition(),
            pointDistance = getDistance(pos, mousePos);

      if (pointDistance > distance) {
        continue;
      }

      const grabLineOptions = interactivity.modes.grab.links,
            lineOpacity = grabLineOptions.opacity,
            opacityLine = lineOpacity - pointDistance * lineOpacity / distance;

      if (opacityLine <= 0) {
        continue;
      }

      const optColor = (_a = grabLineOptions.color) !== null && _a !== void 0 ? _a : particle.options.links.color;

      if (!container.particles.grabLineColor) {
        const linksOptions = options.interactivity.modes.grab.links;
        container.particles.grabLineColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);
      }

      const colorLine = getLinkColor(particle, undefined, container.particles.grabLineColor);

      if (!colorLine) {
        return;
      }

      container.canvas.drawGrabLine(particle, colorLine, opacityLine, mousePos);
    }
  }

}
;// CONCATENATED MODULE: ../../interactions/external/grab/dist/esm/index.js

async function loadExternalGrabInteraction(engine) {
  await engine.addInteractor("externalGrab", container => new Grabber(container));
}
;// CONCATENATED MODULE: ../../interactions/external/pause/dist/esm/Pauser.js

class Pauser extends ExternalInteractorBase {
  constructor(container) {
    super(container);

    this.handleClickMode = mode => {
      if (mode !== "pause") {
        return;
      }

      const container = this.container;

      if (container.getAnimationStatus()) {
        container.pause();
      } else {
        container.play();
      }
    };
  }

  isEnabled() {
    return true;
  }

  reset() {}

  async interact() {}

}
;// CONCATENATED MODULE: ../../interactions/external/pause/dist/esm/index.js

function loadExternalPauseInteraction(engine) {
  engine.addInteractor("externalPause", container => new Pauser(container));
}
;// CONCATENATED MODULE: ../../interactions/external/push/dist/esm/Pusher.js


class Pusher extends ExternalInteractorBase {
  constructor(container) {
    super(container);

    this.handleClickMode = mode => {
      if (mode !== "push") {
        return;
      }

      const container = this.container;
      const options = container.actualOptions;
      const pushNb = options.interactivity.modes.push.quantity;

      if (pushNb <= 0) {
        return;
      }

      const pushOptions = options.interactivity.modes.push;
      const group = itemFromArray([undefined, ...pushOptions.groups]);
      const groupOptions = group !== undefined ? container.actualOptions.particles.groups[group] : undefined;
      container.particles.push(pushNb, container.interactivity.mouse, groupOptions, group);
    };
  }

  isEnabled() {
    return true;
  }

  reset() {}

  async interact() {}

}
;// CONCATENATED MODULE: ../../interactions/external/push/dist/esm/index.js

async function loadExternalPushInteraction(engine) {
  await engine.addInteractor("externalPush", container => new Pusher(container));
}
;// CONCATENATED MODULE: ../../interactions/external/remove/dist/esm/Remover.js

class Remover extends ExternalInteractorBase {
  constructor(container) {
    super(container);

    this.handleClickMode = mode => {
      if (mode !== "remove") {
        return;
      }

      const container = this.container;
      const options = container.actualOptions;
      const removeNb = options.interactivity.modes.remove.quantity;
      container.particles.removeQuantity(removeNb);
    };
  }

  isEnabled() {
    return true;
  }

  reset() {}

  async interact() {}

}
;// CONCATENATED MODULE: ../../interactions/external/remove/dist/esm/index.js

function loadExternalRemoveInteraction(engine) {
  engine.addInteractor("externalRemove", container => new Remover(container));
}
;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/esm/Repulser.js

class Repulser extends ExternalInteractorBase {
  constructor(container) {
    super(container);

    if (!container.repulse) {
      container.repulse = {
        particles: []
      };
    }

    this.handleClickMode = mode => {
      const options = this.container.actualOptions;

      if (mode !== "repulse") {
        return;
      }

      if (!container.repulse) {
        container.repulse = {
          particles: []
        };
      }

      container.repulse.clicking = true;
      container.repulse.count = 0;

      for (const particle of container.repulse.particles) {
        particle.velocity.setTo(particle.initialVelocity);
      }

      container.repulse.particles = [];
      container.repulse.finish = false;
      setTimeout(() => {
        if (!container.destroyed) {
          if (!container.repulse) {
            container.repulse = {
              particles: []
            };
          }

          container.repulse.clicking = false;
        }
      }, options.interactivity.modes.repulse.duration * 1000);
    };
  }

  isEnabled() {
    const container = this.container,
          options = container.actualOptions,
          mouse = container.interactivity.mouse,
          events = options.interactivity.events,
          divs = events.onDiv,
          divRepulse = isDivModeEnabled("repulse", divs);

    if (!(divRepulse || events.onHover.enable && mouse.position || events.onClick.enable && mouse.clickPosition)) {
      return false;
    }

    const hoverMode = events.onHover.mode,
          clickMode = events.onClick.mode;
    return isInArray("repulse", hoverMode) || isInArray("repulse", clickMode) || divRepulse;
  }

  reset() {}

  async interact() {
    const container = this.container,
          options = container.actualOptions,
          mouseMoveStatus = container.interactivity.status === mouseMoveEvent,
          events = options.interactivity.events,
          hoverEnabled = events.onHover.enable,
          hoverMode = events.onHover.mode,
          clickEnabled = events.onClick.enable,
          clickMode = events.onClick.mode,
          divs = events.onDiv;

    if (mouseMoveStatus && hoverEnabled && isInArray("repulse", hoverMode)) {
      this.hoverRepulse();
    } else if (clickEnabled && isInArray("repulse", clickMode)) {
      this.clickRepulse();
    } else {
      divModeExecute("repulse", divs, (selector, div) => this.singleSelectorRepulse(selector, div));
    }
  }

  singleSelectorRepulse(selector, div) {
    const container = this.container,
          query = document.querySelectorAll(selector);

    if (!query.length) {
      return;
    }

    query.forEach(item => {
      const elem = item,
            pxRatio = container.retina.pixelRatio,
            pos = {
        x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
        y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio
      },
            repulseRadius = elem.offsetWidth / 2 * pxRatio,
            area = div.type === "circle" ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio),
            divs = container.actualOptions.interactivity.modes.repulse.divs,
            divRepulse = divMode(divs, elem);
      this.processRepulse(pos, repulseRadius, area, divRepulse);
    });
  }

  hoverRepulse() {
    const container = this.container,
          mousePos = container.interactivity.mouse.position;

    if (!mousePos) {
      return;
    }

    const repulseRadius = container.retina.repulseModeDistance;
    this.processRepulse(mousePos, repulseRadius, new Circle(mousePos.x, mousePos.y, repulseRadius));
  }

  processRepulse(position, repulseRadius, area, divRepulse) {
    var _a;

    const container = this.container,
          query = container.particles.quadTree.query(area),
          repulseOptions = container.actualOptions.interactivity.modes.repulse;

    for (const particle of query) {
      const {
        dx,
        dy,
        distance
      } = getDistances(particle.position, position),
            velocity = ((_a = divRepulse === null || divRepulse === void 0 ? void 0 : divRepulse.speed) !== null && _a !== void 0 ? _a : repulseOptions.speed) * repulseOptions.factor,
            repulseFactor = clamp(calcEasing(1 - distance / repulseRadius, repulseOptions.easing) * velocity, 0, repulseOptions.maxSpeed),
            normVec = Vector.create(distance === 0 ? velocity : dx / distance * repulseFactor, distance === 0 ? velocity : dy / distance * repulseFactor);
      particle.position.addTo(normVec);
    }
  }

  clickRepulse() {
    const container = this.container;

    if (!container.repulse) {
      container.repulse = {
        particles: []
      };
    }

    if (!container.repulse.finish) {
      if (!container.repulse.count) {
        container.repulse.count = 0;
      }

      container.repulse.count++;

      if (container.repulse.count === container.particles.count) {
        container.repulse.finish = true;
      }
    }

    if (container.repulse.clicking) {
      const repulseDistance = container.retina.repulseModeDistance,
            repulseRadius = Math.pow(repulseDistance / 6, 3),
            mouseClickPos = container.interactivity.mouse.clickPosition;

      if (mouseClickPos === undefined) {
        return;
      }

      const range = new Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius),
            query = container.particles.quadTree.query(range);

      for (const particle of query) {
        const {
          dx,
          dy,
          distance
        } = getDistances(mouseClickPos, particle.position),
              d = distance ** 2,
              velocity = container.actualOptions.interactivity.modes.repulse.speed,
              force = -repulseRadius * velocity / d;

        if (d <= repulseRadius) {
          container.repulse.particles.push(particle);
          const vect = Vector.create(dx, dy);
          vect.length = force;
          particle.velocity.setTo(vect);
        }
      }
    } else if (container.repulse.clicking === false) {
      for (const particle of container.repulse.particles) {
        particle.velocity.setTo(particle.initialVelocity);
      }

      container.repulse.particles = [];
    }
  }

}
;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/esm/index.js

async function loadExternalRepulseInteraction(engine) {
  await engine.addInteractor("externalRepulse", container => new Repulser(container));
}
;// CONCATENATED MODULE: ../../shapes/image/dist/esm/Utils.js

const currentColorRegex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d.]+%?\))|currentcolor/gi;

function replaceColorSvg(imageShape, color, opacity) {
  const {
    svgData
  } = imageShape;

  if (!svgData) {
    return "";
  }

  const colorStyle = getStyleFromHsl(color, opacity);

  if (svgData.includes("fill")) {
    return svgData.replace(currentColorRegex, () => colorStyle);
  }

  const preFillIndex = svgData.indexOf(">");
  return `${svgData.substring(0, preFillIndex)} fill="${colorStyle}"${svgData.substring(preFillIndex)}`;
}

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
  const svg = new Blob([svgColoredData], {
    type: "image/svg+xml"
  });
  const domUrl = URL || window.URL || window.webkitURL || window;
  const url = domUrl.createObjectURL(svg);
  const img = new Image();
  const imageRes = {
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
    });
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
;// CONCATENATED MODULE: ../../shapes/image/dist/esm/ImageDrawer.js
var ImageDrawer_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var ImageDrawer_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _ImageDrawer_images;


class ImageDrawer {
  constructor() {
    _ImageDrawer_images.set(this, void 0);

    ImageDrawer_classPrivateFieldSet(this, _ImageDrawer_images, [], "f");
  }

  getSidesCount() {
    return 12;
  }

  getImages(container) {
    const containerImages = ImageDrawer_classPrivateFieldGet(this, _ImageDrawer_images, "f").find(t => t.id === container.id);

    if (!containerImages) {
      ImageDrawer_classPrivateFieldGet(this, _ImageDrawer_images, "f").push({
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
    ImageDrawer_classPrivateFieldSet(this, _ImageDrawer_images, [], "f");
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
    const image = images.find(t => t.source === imageData.src);
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

    const fill = (_b = imageData.fill) !== null && _b !== void 0 ? _b : particle.fill;
    const close = (_c = imageData.close) !== null && _c !== void 0 ? _c : particle.close;
    const imageShape = {
      image: imageRes,
      fill,
      close
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
_ImageDrawer_images = new WeakMap();
;// CONCATENATED MODULE: ../../shapes/image/dist/esm/index.js

async function loadImageShape(engine) {
  const imageDrawer = new ImageDrawer();
  await engine.addShape("image", imageDrawer);
  await engine.addShape("images", imageDrawer);
}
;// CONCATENATED MODULE: ../../updaters/life/dist/esm/LifeUpdater.js

class LifeUpdater {
  constructor(container) {
    this.container = container;
  }

  init() {}

  isEnabled(particle) {
    return !particle.destroyed;
  }

  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }

    const life = particle.life;
    let justSpawned = false;

    if (particle.spawning) {
      life.delayTime += delta.value;

      if (life.delayTime >= particle.life.delay) {
        justSpawned = true;
        particle.spawning = false;
        life.delayTime = 0;
        life.time = 0;
      } else {
        return;
      }
    }

    if (life.duration === -1) {
      return;
    }

    if (particle.spawning) {
      return;
    }

    if (justSpawned) {
      life.time = 0;
    } else {
      life.time += delta.value;
    }

    if (life.time < life.duration) {
      return;
    }

    life.time = 0;

    if (particle.life.count > 0) {
      particle.life.count--;
    }

    if (particle.life.count === 0) {
      particle.destroy();
      return;
    }

    const canvasSize = this.container.canvas.size,
          widthRange = setRangeValue(0, canvasSize.width),
          heightRange = setRangeValue(0, canvasSize.width);
    particle.position.x = randomInRange(widthRange);
    particle.position.y = randomInRange(heightRange);
    particle.spawning = true;
    life.delayTime = 0;
    life.time = 0;
    particle.reset();
    const lifeOptions = particle.options.life;
    life.delay = getRangeValue(lifeOptions.delay.value) * 1000;
    life.duration = getRangeValue(lifeOptions.duration.value) * 1000;
  }

}
;// CONCATENATED MODULE: ../../updaters/life/dist/esm/index.js

async function loadLifeUpdater(engine) {
  await engine.addParticleUpdater("life", container => new LifeUpdater(container));
}
;// CONCATENATED MODULE: ../../shapes/line/dist/esm/LineDrawer.js
class LineDrawer {
  getSidesCount() {
    return 1;
  }

  draw(context, particle, radius) {
    context.moveTo(-radius / 2, 0);
    context.lineTo(radius / 2, 0);
  }

}
;// CONCATENATED MODULE: ../../shapes/line/dist/esm/index.js

async function loadLineShape(engine) {
  await engine.addShape("line", new LineDrawer());
}
;// CONCATENATED MODULE: ../../updaters/opacity/dist/esm/OpacityUpdater.js


function checkDestroy(particle, value, minValue, maxValue) {
  switch (particle.options.opacity.animation.destroy) {
    case "max":
      if (value >= maxValue) {
        particle.destroy();
      }

      break;

    case "min":
      if (value <= minValue) {
        particle.destroy();
      }

      break;
  }
}

function updateOpacity(particle, delta) {
  var _a, _b, _c, _d, _e;

  if (!particle.opacity) {
    return;
  }

  const minValue = particle.opacity.min;
  const maxValue = particle.opacity.max;

  if (particle.destroyed || !particle.opacity.enable || ((_a = particle.opacity.maxLoops) !== null && _a !== void 0 ? _a : 0) > 0 && ((_b = particle.opacity.loops) !== null && _b !== void 0 ? _b : 0) > ((_c = particle.opacity.maxLoops) !== null && _c !== void 0 ? _c : 0)) {
    return;
  }

  switch (particle.opacity.status) {
    case 0:
      if (particle.opacity.value >= maxValue) {
        particle.opacity.status = 1;

        if (!particle.opacity.loops) {
          particle.opacity.loops = 0;
        }

        particle.opacity.loops++;
      } else {
        particle.opacity.value += ((_d = particle.opacity.velocity) !== null && _d !== void 0 ? _d : 0) * delta.factor;
      }

      break;

    case 1:
      if (particle.opacity.value <= minValue) {
        particle.opacity.status = 0;

        if (!particle.opacity.loops) {
          particle.opacity.loops = 0;
        }

        particle.opacity.loops++;
      } else {
        particle.opacity.value -= ((_e = particle.opacity.velocity) !== null && _e !== void 0 ? _e : 0) * delta.factor;
      }

      break;
  }

  checkDestroy(particle, particle.opacity.value, minValue, maxValue);

  if (!particle.destroyed) {
    particle.opacity.value = clamp(particle.opacity.value, minValue, maxValue);
  }
}

class OpacityUpdater {
  constructor(container) {
    this.container = container;
  }

  init(particle) {
    const opacityOptions = particle.options.opacity;
    particle.opacity = {
      enable: opacityOptions.animation.enable,
      max: getRangeMax(opacityOptions.value),
      min: getRangeMin(opacityOptions.value),
      value: getRangeValue(opacityOptions.value),
      loops: 0,
      maxLoops: getRangeValue(opacityOptions.animation.count)
    };
    const opacityAnimation = opacityOptions.animation;

    if (opacityAnimation.enable) {
      particle.opacity.status = 0;
      const opacityRange = opacityOptions.value;
      particle.opacity.min = getRangeMin(opacityRange);
      particle.opacity.max = getRangeMax(opacityRange);

      switch (opacityAnimation.startValue) {
        case "min":
          particle.opacity.value = particle.opacity.min;
          particle.opacity.status = 0;
          break;

        case "random":
          particle.opacity.value = randomInRange(particle.opacity);
          particle.opacity.status = Math.random() >= 0.5 ? 0 : 1;
          break;

        case "max":
        default:
          particle.opacity.value = particle.opacity.max;
          particle.opacity.status = 1;
          break;
      }

      particle.opacity.velocity = getRangeValue(opacityAnimation.speed) / 100 * this.container.retina.reduceFactor;

      if (!opacityAnimation.sync) {
        particle.opacity.velocity *= Math.random();
      }
    }
  }

  isEnabled(particle) {
    var _a, _b, _c, _d;

    return !particle.destroyed && !particle.spawning && !!particle.opacity && particle.opacity.enable && (((_a = particle.opacity.maxLoops) !== null && _a !== void 0 ? _a : 0) <= 0 || ((_b = particle.opacity.maxLoops) !== null && _b !== void 0 ? _b : 0) > 0 && ((_c = particle.opacity.loops) !== null && _c !== void 0 ? _c : 0) < ((_d = particle.opacity.maxLoops) !== null && _d !== void 0 ? _d : 0));
  }

  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateOpacity(particle, delta);
  }

}
;// CONCATENATED MODULE: ../../updaters/opacity/dist/esm/index.js

async function loadOpacityUpdater(engine) {
  await engine.addParticleUpdater("opacity", container => new OpacityUpdater(container));
}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/esm/Utils.js

function bounceHorizontal(data) {
  if (!(data.outMode === "bounce" || data.outMode === "bounce-horizontal" || data.outMode === "bounceHorizontal" || data.outMode === "split")) {
    return;
  }

  const velocity = data.particle.velocity.x;
  let bounced = false;

  if (data.direction === "right" && data.bounds.right >= data.canvasSize.width && velocity > 0 || data.direction === "left" && data.bounds.left <= 0 && velocity < 0) {
    const newVelocity = getValue(data.particle.options.bounce.horizontal);
    data.particle.velocity.x *= -newVelocity;
    bounced = true;
  }

  if (!bounced) {
    return;
  }

  const minPos = data.offset.x + data.size;

  if (data.bounds.right >= data.canvasSize.width) {
    data.particle.position.x = data.canvasSize.width - minPos;
  } else if (data.bounds.left <= 0) {
    data.particle.position.x = minPos;
  }

  if (data.outMode === "split") {
    data.particle.destroy();
  }
}
function bounceVertical(data) {
  if (data.outMode === "bounce" || data.outMode === "bounce-vertical" || data.outMode === "bounceVertical" || data.outMode === "split") {
    const velocity = data.particle.velocity.y;
    let bounced = false;

    if (data.direction === "bottom" && data.bounds.bottom >= data.canvasSize.height && velocity > 0 || data.direction === "top" && data.bounds.top <= 0 && velocity < 0) {
      const newVelocity = getValue(data.particle.options.bounce.vertical);
      data.particle.velocity.y *= -newVelocity;
      bounced = true;
    }

    if (!bounced) {
      return;
    }

    const minPos = data.offset.y + data.size;

    if (data.bounds.bottom >= data.canvasSize.height) {
      data.particle.position.y = data.canvasSize.height - minPos;
    } else if (data.bounds.top <= 0) {
      data.particle.position.y = minPos;
    }

    if (data.outMode === "split") {
      data.particle.destroy();
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/esm/BounceOutMode.js


class BounceOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["bounce", "bounce-vertical", "bounce-horizontal", "bounceVertical", "bounceHorizontal", "split"];
  }

  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }

    const container = this.container;
    let handled = false;

    for (const [, plugin] of container.plugins) {
      if (plugin.particleBounce !== undefined) {
        handled = plugin.particleBounce(particle, delta, direction);
      }

      if (handled) {
        break;
      }
    }

    if (handled) {
      return;
    }

    const pos = particle.getPosition(),
          offset = particle.offset,
          size = particle.getRadius(),
          bounds = calculateBounds(pos, size),
          canvasSize = container.canvas.size;
    bounceHorizontal({
      particle,
      outMode,
      direction,
      bounds,
      canvasSize,
      offset,
      size
    });
    bounceVertical({
      particle,
      outMode,
      direction,
      bounds,
      canvasSize,
      offset,
      size
    });
  }

}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/esm/DestroyOutMode.js

class DestroyOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["destroy"];
  }

  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }

    const container = this.container;

    switch (particle.outType) {
      case "normal":
      case "outside":
        if (isPointInside(particle.position, container.canvas.size, Vector.origin, particle.getRadius(), direction)) {
          return;
        }

        break;

      case "inside":
        {
          const {
            dx,
            dy
          } = getDistances(particle.position, particle.moveCenter);
          const {
            x: vx,
            y: vy
          } = particle.velocity;

          if (vx < 0 && dx > particle.moveCenter.radius || vy < 0 && dy > particle.moveCenter.radius || vx >= 0 && dx < -particle.moveCenter.radius || vy >= 0 && dy < -particle.moveCenter.radius) {
            return;
          }

          break;
        }
    }

    container.particles.remove(particle, undefined, true);
  }

}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/esm/NoneOutMode.js

class NoneOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["none"];
  }

  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }

    if (particle.options.move.distance.horizontal && (direction === "left" || direction === "right") || particle.options.move.distance.vertical && (direction === "top" || direction === "bottom")) {
      return;
    }

    const gravityOptions = particle.options.move.gravity,
          container = this.container;
    const canvasSize = container.canvas.size;
    const pRadius = particle.getRadius();

    if (!gravityOptions.enable) {
      if (particle.velocity.y > 0 && particle.position.y <= canvasSize.height + pRadius || particle.velocity.y < 0 && particle.position.y >= -pRadius || particle.velocity.x > 0 && particle.position.x <= canvasSize.width + pRadius || particle.velocity.x < 0 && particle.position.x >= -pRadius) {
        return;
      }

      if (!isPointInside(particle.position, container.canvas.size, Vector.origin, pRadius, direction)) {
        container.particles.remove(particle);
      }
    } else {
      const position = particle.position;

      if (!gravityOptions.inverse && position.y > canvasSize.height + pRadius && direction === "bottom" || gravityOptions.inverse && position.y < -pRadius && direction === "top") {
        container.particles.remove(particle);
      }
    }
  }

}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/esm/OutOutMode.js

class OutOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["out"];
  }

  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }

    const container = this.container;

    switch (particle.outType) {
      case "inside":
        {
          const {
            x: vx,
            y: vy
          } = particle.velocity;
          const circVec = Vector.origin;
          circVec.length = particle.moveCenter.radius;
          circVec.angle = particle.velocity.angle + Math.PI;
          circVec.addTo(Vector.create(particle.moveCenter));
          const {
            dx,
            dy
          } = getDistances(particle.position, circVec);

          if (vx <= 0 && dx >= 0 || vy <= 0 && dy >= 0 || vx >= 0 && dx <= 0 || vy >= 0 && dy <= 0) {
            return;
          }

          particle.position.x = Math.floor(randomInRange({
            min: 0,
            max: container.canvas.size.width
          }));
          particle.position.y = Math.floor(randomInRange({
            min: 0,
            max: container.canvas.size.height
          }));
          const {
            dx: newDx,
            dy: newDy
          } = getDistances(particle.position, particle.moveCenter);
          particle.direction = Math.atan2(-newDy, -newDx);
          particle.velocity.angle = particle.direction;
          break;
        }

      default:
        {
          if (isPointInside(particle.position, container.canvas.size, Vector.origin, particle.getRadius(), direction)) {
            return;
          }

          switch (particle.outType) {
            case "outside":
              {
                particle.position.x = Math.floor(randomInRange({
                  min: -particle.moveCenter.radius,
                  max: particle.moveCenter.radius
                })) + particle.moveCenter.x;
                particle.position.y = Math.floor(randomInRange({
                  min: -particle.moveCenter.radius,
                  max: particle.moveCenter.radius
                })) + particle.moveCenter.y;
                const {
                  dx,
                  dy
                } = getDistances(particle.position, particle.moveCenter);

                if (particle.moveCenter.radius) {
                  particle.direction = Math.atan2(dy, dx);
                  particle.velocity.angle = particle.direction;
                }

                break;
              }

            case "normal":
              {
                const wrap = particle.options.move.warp,
                      canvasSize = container.canvas.size,
                      newPos = {
                  bottom: canvasSize.height + particle.getRadius() + particle.offset.y,
                  left: -particle.getRadius() - particle.offset.x,
                  right: canvasSize.width + particle.getRadius() + particle.offset.x,
                  top: -particle.getRadius() - particle.offset.y
                },
                      sizeValue = particle.getRadius(),
                      nextBounds = calculateBounds(particle.position, sizeValue);

                if (direction === "right" && nextBounds.left > canvasSize.width + particle.offset.x) {
                  particle.position.x = newPos.left;
                  particle.initialPosition.x = particle.position.x;

                  if (!wrap) {
                    particle.position.y = Math.random() * canvasSize.height;
                    particle.initialPosition.y = particle.position.y;
                  }
                } else if (direction === "left" && nextBounds.right < -particle.offset.x) {
                  particle.position.x = newPos.right;
                  particle.initialPosition.x = particle.position.x;

                  if (!wrap) {
                    particle.position.y = Math.random() * canvasSize.height;
                    particle.initialPosition.y = particle.position.y;
                  }
                }

                if (direction === "bottom" && nextBounds.top > canvasSize.height + particle.offset.y) {
                  if (!wrap) {
                    particle.position.x = Math.random() * canvasSize.width;
                    particle.initialPosition.x = particle.position.x;
                  }

                  particle.position.y = newPos.top;
                  particle.initialPosition.y = particle.position.y;
                } else if (direction === "top" && nextBounds.bottom < -particle.offset.y) {
                  if (!wrap) {
                    particle.position.x = Math.random() * canvasSize.width;
                    particle.initialPosition.x = particle.position.x;
                  }

                  particle.position.y = newPos.bottom;
                  particle.initialPosition.y = particle.position.y;
                }

                break;
              }
          }

          break;
        }
    }
  }

}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/esm/OutOfCanvasUpdater.js




class OutOfCanvasUpdater {
  constructor(container) {
    this.container = container;
    this.updaters = [new BounceOutMode(container), new DestroyOutMode(container), new OutOutMode(container), new NoneOutMode(container)];
  }

  init() {}

  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning;
  }

  update(particle, delta) {
    var _a, _b, _c, _d;

    const outModes = particle.options.move.outModes;
    this.updateOutMode(particle, delta, (_a = outModes.bottom) !== null && _a !== void 0 ? _a : outModes.default, "bottom");
    this.updateOutMode(particle, delta, (_b = outModes.left) !== null && _b !== void 0 ? _b : outModes.default, "left");
    this.updateOutMode(particle, delta, (_c = outModes.right) !== null && _c !== void 0 ? _c : outModes.default, "right");
    this.updateOutMode(particle, delta, (_d = outModes.top) !== null && _d !== void 0 ? _d : outModes.default, "top");
  }

  updateOutMode(particle, delta, outMode, direction) {
    for (const updater of this.updaters) {
      updater.update(particle, direction, delta, outMode);
    }
  }

}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/esm/index.js

async function loadOutModesUpdater(engine) {
  await engine.addParticleUpdater("outModes", container => new OutOfCanvasUpdater(container));
}
;// CONCATENATED MODULE: ../../move/parallax/dist/esm/ParallaxMover.js

class ParallaxMover {
  init() {}

  isEnabled(particle) {
    return !isSsr() && !particle.destroyed && particle.container.actualOptions.interactivity.events.onHover.parallax.enable;
  }

  move(particle) {
    const container = particle.container,
          options = container.actualOptions;

    if (isSsr() || !options.interactivity.events.onHover.parallax.enable) {
      return;
    }

    const parallaxForce = options.interactivity.events.onHover.parallax.force,
          mousePos = container.interactivity.mouse.position;

    if (!mousePos) {
      return;
    }

    const canvasCenter = {
      x: container.canvas.size.width / 2,
      y: container.canvas.size.height / 2
    },
          parallaxSmooth = options.interactivity.events.onHover.parallax.smooth,
          factor = particle.getRadius() / parallaxForce,
          centerDistance = {
      x: (mousePos.x - canvasCenter.x) * factor,
      y: (mousePos.y - canvasCenter.y) * factor
    };
    particle.offset.x += (centerDistance.x - particle.offset.x) / parallaxSmooth;
    particle.offset.y += (centerDistance.y - particle.offset.y) / parallaxSmooth;
  }

}
;// CONCATENATED MODULE: ../../move/parallax/dist/esm/index.js

async function loadParallaxMover(engine) {
  engine.addMover("parallax", () => new ParallaxMover());
}
;// CONCATENATED MODULE: ../../interactions/particles/attract/dist/esm/Attractor.js

class Attractor_Attractor extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }

  async interact(p1) {
    var _a;

    const container = this.container,
          distance = (_a = p1.retina.attractDistance) !== null && _a !== void 0 ? _a : container.retina.attractDistance,
          pos1 = p1.getPosition(),
          query = container.particles.quadTree.queryCircle(pos1, distance);

    for (const p2 of query) {
      if (p1 === p2 || !p2.options.move.attract.enable || p2.destroyed || p2.spawning) {
        continue;
      }

      const pos2 = p2.getPosition(),
            {
        dx,
        dy
      } = getDistances(pos1, pos2),
            rotate = p1.options.move.attract.rotate,
            ax = dx / (rotate.x * 1000),
            ay = dy / (rotate.y * 1000),
            p1Factor = p2.size.value / p1.size.value,
            p2Factor = 1 / p1Factor;
      p1.velocity.x -= ax * p1Factor;
      p1.velocity.y -= ay * p1Factor;
      p2.velocity.x += ax * p2Factor;
      p2.velocity.y += ay * p2Factor;
    }
  }

  isEnabled(particle) {
    return particle.options.move.attract.enable;
  }

  reset() {}

}
;// CONCATENATED MODULE: ../../interactions/particles/attract/dist/esm/index.js

async function loadParticlesAttractInteraction(engine) {
  await engine.addInteractor("particlesAttract", container => new Attractor_Attractor(container));
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/esm/Absorb.js

function absorb(p1, p2, fps, pixelRatio) {
  if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
    p1.destroy();
  } else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
    p2.destroy();
  } else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
    if (p1.getRadius() >= p2.getRadius()) {
      const factor = clamp(p1.getRadius() / p2.getRadius(), 0, p2.getRadius()) * fps;
      p1.size.value += factor;
      p2.size.value -= factor;

      if (p2.getRadius() <= pixelRatio) {
        p2.size.value = 0;
        p2.destroy();
      }
    } else {
      const factor = clamp(p2.getRadius() / p1.getRadius(), 0, p1.getRadius()) * fps;
      p1.size.value -= factor;
      p2.size.value += factor;

      if (p1.getRadius() <= pixelRatio) {
        p1.size.value = 0;
        p1.destroy();
      }
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/esm/Bounce.js

function bounce(p1, p2) {
  circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/esm/Destroy.js

function destroy(p1, p2) {
  if (!p1.unbreakable && !p2.unbreakable) {
    bounce(p1, p2);
  }

  if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
    p1.destroy();
  } else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
    p2.destroy();
  } else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
    if (p1.getRadius() >= p2.getRadius()) {
      p2.destroy();
    } else {
      p1.destroy();
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/esm/ResolveCollision.js



function resolveCollision(p1, p2, fps, pixelRatio) {
  switch (p1.options.collisions.mode) {
    case "absorb":
      {
        absorb(p1, p2, fps, pixelRatio);
        break;
      }

    case "bounce":
      {
        bounce(p1, p2);
        break;
      }

    case "destroy":
      {
        destroy(p1, p2);
        break;
      }
  }
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/esm/Collider.js


class Collider extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }

  isEnabled(particle) {
    return particle.options.collisions.enable;
  }

  reset() {}

  async interact(p1) {
    const container = this.container,
          pos1 = p1.getPosition(),
          radius1 = p1.getRadius(),
          query = container.particles.quadTree.queryCircle(pos1, radius1 * 2);

    for (const p2 of query) {
      if (p1 === p2 || !p2.options.collisions.enable || p1.options.collisions.mode !== p2.options.collisions.mode || p2.destroyed || p2.spawning) {
        continue;
      }

      const pos2 = p2.getPosition();
      const radius2 = p2.getRadius();

      if (Math.abs(Math.round(pos1.z) - Math.round(pos2.z)) > radius1 + radius2) {
        continue;
      }

      const dist = getDistance(pos1, pos2);
      const distP = radius1 + radius2;

      if (dist > distP) {
        continue;
      }

      resolveCollision(p1, p2, container.fpsLimit / 1000, container.retina.pixelRatio);
    }
  }

}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/esm/index.js

async function loadParticlesCollisionsInteraction(engine) {
  await engine.addInteractor("particlesCollisions", container => new Collider(container));
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/Linker.js


function getLinkDistance(pos1, pos2, optDistance, canvasSize, warp) {
  let distance = getDistance(pos1, pos2);

  if (!warp || distance <= optDistance) {
    return distance;
  }

  const pos2NE = {
    x: pos2.x - canvasSize.width,
    y: pos2.y
  };
  distance = getDistance(pos1, pos2NE);

  if (distance <= optDistance) {
    return distance;
  }

  const pos2SE = {
    x: pos2.x - canvasSize.width,
    y: pos2.y - canvasSize.height
  };
  distance = getDistance(pos1, pos2SE);

  if (distance <= optDistance) {
    return distance;
  }

  const pos2SW = {
    x: pos2.x,
    y: pos2.y - canvasSize.height
  };
  distance = getDistance(pos1, pos2SW);
  return distance;
}

class Linker extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }

  isEnabled(particle) {
    return particle.options.links.enable;
  }

  reset() {}

  async interact(p1) {
    var _a;

    p1.links = [];
    const pos1 = p1.getPosition(),
          container = this.container,
          canvasSize = container.canvas.size;

    if (pos1.x < 0 || pos1.y < 0 || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
      return;
    }

    const linkOpt1 = p1.options.links,
          optOpacity = linkOpt1.opacity,
          optDistance = (_a = p1.retina.linksDistance) !== null && _a !== void 0 ? _a : container.retina.linksDistance,
          warp = linkOpt1.warp,
          range = warp ? new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize) : new Circle(pos1.x, pos1.y, optDistance),
          query = container.particles.quadTree.query(range);

    for (const p2 of query) {
      const linkOpt2 = p2.options.links;

      if (p1 === p2 || !linkOpt2.enable || linkOpt1.id !== linkOpt2.id || p2.spawning || p2.destroyed || p1.links.map(t => t.destination).indexOf(p2) !== -1 || p2.links.map(t => t.destination).indexOf(p1) !== -1) {
        continue;
      }

      const pos2 = p2.getPosition();

      if (pos2.x < 0 || pos2.y < 0 || pos2.x > canvasSize.width || pos2.y > canvasSize.height) {
        continue;
      }

      const distance = getLinkDistance(pos1, pos2, optDistance, canvasSize, warp && linkOpt2.warp);

      if (distance > optDistance) {
        return;
      }

      const opacityLine = (1 - distance / optDistance) * optOpacity;
      this.setColor(p1);
      p1.links.push({
        destination: p2,
        opacity: opacityLine
      });
    }
  }

  setColor(p1) {
    const container = this.container,
          linksOptions = p1.options.links;
    let linkColor = linksOptions.id === undefined ? container.particles.linksColor : container.particles.linksColors.get(linksOptions.id);

    if (!linkColor) {
      const optColor = linksOptions.color;
      linkColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);

      if (linksOptions.id === undefined) {
        container.particles.linksColor = linkColor;
      } else {
        container.particles.linksColors.set(linksOptions.id, linkColor);
      }
    }
  }

}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/interaction.js

async function loadInteraction(engine) {
  await engine.addInteractor("particlesLinks", container => new Linker(container));
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/Utils.js

function drawLinkLine(context, width, begin, end, maxDistance, canvasSize, warp, backgroundMask, composite, colorLine, opacity, shadow) {
  let drawn = false;

  if (getDistance(begin, end) <= maxDistance) {
    drawLine(context, begin, end);
    drawn = true;
  } else if (warp) {
    let pi1;
    let pi2;
    const endNE = {
      x: end.x - canvasSize.width,
      y: end.y
    };
    const d1 = getDistances(begin, endNE);

    if (d1.distance <= maxDistance) {
      const yi = begin.y - d1.dy / d1.dx * begin.x;
      pi1 = {
        x: 0,
        y: yi
      };
      pi2 = {
        x: canvasSize.width,
        y: yi
      };
    } else {
      const endSW = {
        x: end.x,
        y: end.y - canvasSize.height
      };
      const d2 = getDistances(begin, endSW);

      if (d2.distance <= maxDistance) {
        const yi = begin.y - d2.dy / d2.dx * begin.x;
        const xi = -yi / (d2.dy / d2.dx);
        pi1 = {
          x: xi,
          y: 0
        };
        pi2 = {
          x: xi,
          y: canvasSize.height
        };
      } else {
        const endSE = {
          x: end.x - canvasSize.width,
          y: end.y - canvasSize.height
        };
        const d3 = getDistances(begin, endSE);

        if (d3.distance <= maxDistance) {
          const yi = begin.y - d3.dy / d3.dx * begin.x;
          const xi = -yi / (d3.dy / d3.dx);
          pi1 = {
            x: xi,
            y: yi
          };
          pi2 = {
            x: pi1.x + canvasSize.width,
            y: pi1.y + canvasSize.height
          };
        }
      }
    }

    if (pi1 && pi2) {
      drawLine(context, begin, pi1);
      drawLine(context, end, pi2);
      drawn = true;
    }
  }

  if (!drawn) {
    return;
  }

  context.lineWidth = width;

  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }

  context.strokeStyle = getStyleFromRgb(colorLine, opacity);

  if (shadow.enable) {
    const shadowColor = colorToRgb(shadow.color);

    if (shadowColor) {
      context.shadowBlur = shadow.blur;
      context.shadowColor = getStyleFromRgb(shadowColor);
    }
  }

  context.stroke();
}
function drawLinkTriangle(context, pos1, pos2, pos3, backgroundMask, composite, colorTriangle, opacityTriangle) {
  drawTriangle(context, pos1, pos2, pos3);

  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }

  context.fillStyle = getStyleFromRgb(colorTriangle, opacityTriangle);
  context.fill();
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/LinkInstance.js


class LinkInstance {
  constructor(container) {
    this.container = container;
  }

  particleCreated(particle) {
    const linkParticle = particle;
    linkParticle.links = [];
  }

  particleDestroyed(particle) {
    const linkParticle = particle;
    linkParticle.links = [];
  }

  drawParticle(context, particle) {
    const linkParticle = particle,
          container = this.container,
          particles = container.particles,
          pOptions = particle.options;

    if (linkParticle.links.length <= 0) {
      return;
    }

    context.save();
    const p1Links = linkParticle.links.filter(l => {
      const linkFreq = container.particles.getLinkFrequency(linkParticle, l.destination);
      return linkFreq <= pOptions.links.frequency;
    });

    for (const link of p1Links) {
      const p2 = link.destination;

      if (pOptions.links.triangles.enable) {
        const links = p1Links.map(l => l.destination),
              vertices = p2.links.filter(t => {
          const linkFreq = container.particles.getLinkFrequency(p2, t.destination);
          return linkFreq <= p2.options.links.frequency && links.indexOf(t.destination) >= 0;
        });

        if (vertices.length) {
          for (const vertex of vertices) {
            const p3 = vertex.destination,
                  triangleFreq = particles.getTriangleFrequency(linkParticle, p2, p3);

            if (triangleFreq > pOptions.links.triangles.frequency) {
              continue;
            }

            this.drawLinkTriangle(linkParticle, link, vertex);
          }
        }
      }

      if (link.opacity > 0 && container.retina.linksWidth > 0) {
        this.drawLinkLine(linkParticle, link);
      }
    }

    context.restore();
  }

  drawLinkTriangle(p1, link1, link2) {
    var _a;

    const container = this.container,
          options = container.actualOptions,
          p2 = link1.destination,
          p3 = link2.destination,
          triangleOptions = p1.options.links.triangles,
          opacityTriangle = (_a = triangleOptions.opacity) !== null && _a !== void 0 ? _a : (link1.opacity + link2.opacity) / 2;

    if (opacityTriangle <= 0) {
      return;
    }

    container.canvas.draw(ctx => {
      const pos1 = p1.getPosition();
      const pos2 = p2.getPosition();
      const pos3 = p3.getPosition();

      if (getDistance(pos1, pos2) > container.retina.linksDistance || getDistance(pos3, pos2) > container.retina.linksDistance || getDistance(pos3, pos1) > container.retina.linksDistance) {
        return;
      }

      let colorTriangle = colorToRgb(triangleOptions.color);

      if (!colorTriangle) {
        const linksOptions = p1.options.links,
              linkColor = linksOptions.id !== undefined ? container.particles.linksColors.get(linksOptions.id) : container.particles.linksColor;
        colorTriangle = getLinkColor(p1, p2, linkColor);
      }

      if (!colorTriangle) {
        return;
      }

      drawLinkTriangle(ctx, pos1, pos2, pos3, options.backgroundMask.enable, options.backgroundMask.composite, colorTriangle, opacityTriangle);
    });
  }

  drawLinkLine(p1, link) {
    const container = this.container,
          options = container.actualOptions,
          p2 = link.destination,
          pos1 = p1.getPosition(),
          pos2 = p2.getPosition();
    let opacity = link.opacity;
    container.canvas.draw(ctx => {
      var _a, _b;

      let colorLine;
      const twinkle = p1.options.twinkle.lines;

      if (twinkle.enable) {
        const twinkleFreq = twinkle.frequency,
              twinkleRgb = colorToRgb(twinkle.color),
              twinkling = Math.random() < twinkleFreq;

        if (twinkling && twinkleRgb) {
          colorLine = twinkleRgb;
          opacity = getRangeValue(twinkle.opacity);
        }
      }

      if (!colorLine) {
        const linksOptions = p1.options.links,
              linkColor = linksOptions.id !== undefined ? container.particles.linksColors.get(linksOptions.id) : container.particles.linksColor;
        colorLine = getLinkColor(p1, p2, linkColor);
      }

      if (!colorLine) {
        return;
      }

      const width = (_a = p1.retina.linksWidth) !== null && _a !== void 0 ? _a : container.retina.linksWidth,
            maxDistance = (_b = p1.retina.linksDistance) !== null && _b !== void 0 ? _b : container.retina.linksDistance;
      drawLinkLine(ctx, width, pos1, pos2, maxDistance, container.canvas.size, p1.options.links.warp, options.backgroundMask.enable, options.backgroundMask.composite, colorLine, opacity, p1.options.links.shadow);
    });
  }

}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/plugin.js


class LinksPlugin {
  constructor() {
    this.id = "links";
  }

  getPlugin(container) {
    return new LinkInstance(container);
  }

  needsPlugin() {
    return true;
  }

  loadOptions() {}

}

async function loadPlugin(engine) {
  const plugin = new LinksPlugin();
  await engine.addPlugin(plugin);
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/index.js


async function loadParticlesLinksInteraction(engine) {
  await loadInteraction(engine);
  await loadPlugin(engine);
}
;// CONCATENATED MODULE: ../../shapes/polygon/dist/esm/PolygonDrawerBase.js
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
;// CONCATENATED MODULE: ../../shapes/polygon/dist/esm/PolygonDrawer.js

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
;// CONCATENATED MODULE: ../../shapes/polygon/dist/esm/TriangleDrawer.js

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
;// CONCATENATED MODULE: ../../shapes/polygon/dist/esm/index.js


async function loadGenericPolygonShape(engine) {
  await engine.addShape("polygon", new PolygonDrawer());
}
async function loadTriangleShape(engine) {
  await engine.addShape("triangle", new TriangleDrawer());
}
async function loadPolygonShape(engine) {
  await loadGenericPolygonShape(engine);
  await loadTriangleShape(engine);
}
;// CONCATENATED MODULE: ../../updaters/size/dist/esm/SizeUpdater.js


function SizeUpdater_checkDestroy(particle, value, minValue, maxValue) {
  switch (particle.options.size.animation.destroy) {
    case "max":
      if (value >= maxValue) {
        particle.destroy();
      }

      break;

    case "min":
      if (value <= minValue) {
        particle.destroy();
      }

      break;
  }
}

function updateSize(particle, delta) {
  var _a, _b, _c, _d;

  const sizeVelocity = ((_a = particle.size.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
  const minValue = particle.size.min;
  const maxValue = particle.size.max;

  if (particle.destroyed || !particle.size.enable || ((_b = particle.size.maxLoops) !== null && _b !== void 0 ? _b : 0) > 0 && ((_c = particle.size.loops) !== null && _c !== void 0 ? _c : 0) > ((_d = particle.size.maxLoops) !== null && _d !== void 0 ? _d : 0)) {
    return;
  }

  switch (particle.size.status) {
    case 0:
      if (particle.size.value >= maxValue) {
        particle.size.status = 1;

        if (!particle.size.loops) {
          particle.size.loops = 0;
        }

        particle.size.loops++;
      } else {
        particle.size.value += sizeVelocity;
      }

      break;

    case 1:
      if (particle.size.value <= minValue) {
        particle.size.status = 0;

        if (!particle.size.loops) {
          particle.size.loops = 0;
        }

        particle.size.loops++;
      } else {
        particle.size.value -= sizeVelocity;
      }

  }

  SizeUpdater_checkDestroy(particle, particle.size.value, minValue, maxValue);

  if (!particle.destroyed) {
    particle.size.value = clamp(particle.size.value, minValue, maxValue);
  }
}

class SizeUpdater {
  init() {}

  isEnabled(particle) {
    var _a, _b, _c, _d;

    return !particle.destroyed && !particle.spawning && particle.size.enable && (((_a = particle.size.maxLoops) !== null && _a !== void 0 ? _a : 0) <= 0 || ((_b = particle.size.maxLoops) !== null && _b !== void 0 ? _b : 0) > 0 && ((_c = particle.size.loops) !== null && _c !== void 0 ? _c : 0) < ((_d = particle.size.maxLoops) !== null && _d !== void 0 ? _d : 0));
  }

  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateSize(particle, delta);
  }

}
;// CONCATENATED MODULE: ../../updaters/size/dist/esm/index.js

async function loadSizeUpdater(engine) {
  await engine.addParticleUpdater("size", () => new SizeUpdater());
}
;// CONCATENATED MODULE: ../../shapes/square/dist/esm/SquareDrawer.js
const fixFactor = Math.sqrt(2);
class SquareDrawer {
  getSidesCount() {
    return 4;
  }

  draw(context, particle, radius) {
    context.rect(-radius / fixFactor, -radius / fixFactor, radius * 2 / fixFactor, radius * 2 / fixFactor);
  }

}
;// CONCATENATED MODULE: ../../shapes/square/dist/esm/index.js

async function loadSquareShape(engine) {
  const drawer = new SquareDrawer();
  await engine.addShape("edge", drawer);
  await engine.addShape("square", drawer);
}
;// CONCATENATED MODULE: ../../shapes/star/dist/esm/StarDrawer.js
class StarDrawer {
  getSidesCount(particle) {
    var _a, _b;

    const star = particle.shapeData;
    return (_b = (_a = star === null || star === void 0 ? void 0 : star.sides) !== null && _a !== void 0 ? _a : star === null || star === void 0 ? void 0 : star.nb_sides) !== null && _b !== void 0 ? _b : 5;
  }

  draw(context, particle, radius) {
    var _a;

    const star = particle.shapeData;
    const sides = this.getSidesCount(particle);
    const inset = (_a = star === null || star === void 0 ? void 0 : star.inset) !== null && _a !== void 0 ? _a : 2;
    context.moveTo(0, 0 - radius);

    for (let i = 0; i < sides; i++) {
      context.rotate(Math.PI / sides);
      context.lineTo(0, 0 - radius * inset);
      context.rotate(Math.PI / sides);
      context.lineTo(0, 0 - radius);
    }
  }

}
;// CONCATENATED MODULE: ../../shapes/star/dist/esm/index.js

async function loadStarShape(engine) {
  await engine.addShape("star", new StarDrawer());
}
;// CONCATENATED MODULE: ../../updaters/strokeColor/dist/esm/StrokeColorUpdater.js


function StrokeColorUpdater_updateColorValue(delta, value, valueAnimation, max, decrease) {
  var _a;

  const colorValue = value;

  if (!colorValue || !colorValue.enable) {
    return;
  }

  const offset = randomInRange(valueAnimation.offset);
  const velocity = ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor + offset * 3.6;

  if (!decrease || colorValue.status === 0) {
    colorValue.value += velocity;

    if (decrease && colorValue.value > max) {
      colorValue.status = 1;
      colorValue.value -= colorValue.value % max;
    }
  } else {
    colorValue.value -= velocity;

    if (colorValue.value < 0) {
      colorValue.status = 0;
      colorValue.value += colorValue.value;
    }
  }

  if (colorValue.value > max) {
    colorValue.value %= max;
  }
}

function updateStrokeColor(particle, delta) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;

  if (!((_a = particle.stroke) === null || _a === void 0 ? void 0 : _a.color)) {
    return;
  }

  const animationOptions = particle.stroke.color.animation;
  const h = (_c = (_b = particle.strokeColor) === null || _b === void 0 ? void 0 : _b.h) !== null && _c !== void 0 ? _c : (_d = particle.color) === null || _d === void 0 ? void 0 : _d.h;

  if (h) {
    StrokeColorUpdater_updateColorValue(delta, h, animationOptions.h, 360, false);
  }

  const s = (_f = (_e = particle.strokeColor) === null || _e === void 0 ? void 0 : _e.s) !== null && _f !== void 0 ? _f : (_g = particle.color) === null || _g === void 0 ? void 0 : _g.s;

  if (s) {
    StrokeColorUpdater_updateColorValue(delta, s, animationOptions.s, 100, true);
  }

  const l = (_j = (_h = particle.strokeColor) === null || _h === void 0 ? void 0 : _h.l) !== null && _j !== void 0 ? _j : (_k = particle.color) === null || _k === void 0 ? void 0 : _k.l;

  if (l) {
    StrokeColorUpdater_updateColorValue(delta, l, animationOptions.l, 100, true);
  }
}

class StrokeColorUpdater {
  constructor(container) {
    this.container = container;
  }

  init(particle) {
    var _a, _b;

    const container = this.container;
    particle.stroke = particle.options.stroke instanceof Array ? itemFromArray(particle.options.stroke, particle.id, particle.options.reduceDuplicates) : particle.options.stroke;
    particle.strokeWidth = particle.stroke.width * container.retina.pixelRatio;
    const strokeHslColor = (_a = colorToHsl(particle.stroke.color)) !== null && _a !== void 0 ? _a : particle.getFillColor();

    if (strokeHslColor) {
      particle.strokeColor = getHslAnimationFromHsl(strokeHslColor, (_b = particle.stroke.color) === null || _b === void 0 ? void 0 : _b.animation, container.retina.reduceFactor);
    }
  }

  isEnabled(particle) {
    var _a, _b, _c, _d;

    const color = (_a = particle.stroke) === null || _a === void 0 ? void 0 : _a.color;
    return !particle.destroyed && !particle.spawning && !!color && (((_b = particle.strokeColor) === null || _b === void 0 ? void 0 : _b.h.value) !== undefined && color.animation.h.enable || ((_c = particle.strokeColor) === null || _c === void 0 ? void 0 : _c.s.value) !== undefined && color.animation.s.enable || ((_d = particle.strokeColor) === null || _d === void 0 ? void 0 : _d.l.value) !== undefined && color.animation.l.enable);
  }

  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }

    updateStrokeColor(particle, delta);
  }

}
;// CONCATENATED MODULE: ../../updaters/strokeColor/dist/esm/index.js

async function loadStrokeColorUpdater(engine) {
  await engine.addParticleUpdater("strokeColor", container => new StrokeColorUpdater(container));
}
;// CONCATENATED MODULE: ../../shapes/text/dist/esm/TextDrawer.js

const validTypes = ["text", "character", "char"];
class TextDrawer {
  getSidesCount() {
    return 12;
  }

  async init(container) {
    const options = container.actualOptions;

    if (validTypes.find(t => isInArray(t, options.particles.shape.type))) {
      const shapeOptions = validTypes.map(t => options.particles.shape.options[t]).find(t => !!t);

      if (shapeOptions instanceof Array) {
        const promises = [];

        for (const character of shapeOptions) {
          const charShape = character;
          promises.push(loadFont(charShape.font, charShape.weight));
        }

        await Promise.allSettled(promises);
      } else {
        if (shapeOptions !== undefined) {
          const charShape = shapeOptions;
          await loadFont(charShape.font, charShape.weight);
        }
      }
    }
  }

  draw(context, particle, radius, opacity) {
    var _a, _b, _c;

    const character = particle.shapeData;

    if (character === undefined) {
      return;
    }

    const textData = character.value;

    if (textData === undefined) {
      return;
    }

    const textParticle = particle;

    if (textParticle.text === undefined) {
      textParticle.text = textData instanceof Array ? itemFromArray(textData, particle.randomIndexData) : textData;
    }

    const text = textParticle.text;
    const style = (_a = character.style) !== null && _a !== void 0 ? _a : "";
    const weight = (_b = character.weight) !== null && _b !== void 0 ? _b : "400";
    const size = Math.round(radius) * 2;
    const font = (_c = character.font) !== null && _c !== void 0 ? _c : "Verdana";
    const fill = particle.fill;
    const offsetX = text.length * radius / 2;
    context.font = `${style} ${weight} ${size}px "${font}"`;
    const pos = {
      x: -offsetX,
      y: radius / 2
    };
    context.globalAlpha = opacity;

    if (fill) {
      context.fillText(text, pos.x, pos.y);
    } else {
      context.strokeText(text, pos.x, pos.y);
    }

    context.globalAlpha = 1;
  }

}
;// CONCATENATED MODULE: ../../shapes/text/dist/esm/index.js

async function loadTextShape(engine) {
  const drawer = new TextDrawer();

  for (const type of validTypes) {
    await engine.addShape(type, drawer);
  }
}
;// CONCATENATED MODULE: ./dist/browser/index.js





























async function loadSlim(engine) {
  await loadBaseMover(engine);
  await loadParallaxMover(engine);
  await loadExternalAttractInteraction(engine);
  await loadExternalBounceInteraction(engine);
  await loadExternalBubbleInteraction(engine);
  await loadExternalConnectInteraction(engine);
  await loadExternalGrabInteraction(engine);
  await loadExternalPauseInteraction(engine);
  await loadExternalPushInteraction(engine);
  await loadExternalRemoveInteraction(engine);
  await loadExternalRepulseInteraction(engine);
  await loadParticlesAttractInteraction(engine);
  await loadParticlesCollisionsInteraction(engine);
  await loadParticlesLinksInteraction(engine);
  await loadCircleShape(engine);
  await loadImageShape(engine);
  await loadLineShape(engine);
  await loadPolygonShape(engine);
  await loadSquareShape(engine);
  await loadStarShape(engine);
  await loadTextShape(engine);
  await loadLifeUpdater(engine);
  await loadOpacityUpdater(engine);
  await loadSizeUpdater(engine);
  await loadAngleUpdater(engine);
  await loadColorUpdater(engine);
  await loadStrokeColorUpdater(engine);
  await loadOutModesUpdater(engine);
  await initPjs(engine);
}
;// CONCATENATED MODULE: ./dist/browser/bundle.js


loadSlim(tsParticles);


/******/ 	return __webpack_exports__;
/******/ })()
;
});