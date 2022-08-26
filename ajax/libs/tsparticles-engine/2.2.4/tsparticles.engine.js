/*!
 * tsParticles Engine v2.2.4
 * Author: Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Website: https://particles.js.org/
 * Confetti Website: https://confetti.js.org
 * GitHub: https://www.github.com/matteobruni/tsparticles
 * How to use?: Check the GitHub README
 * ------------------------------------------------------
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
})(this, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "AnimatableColor": function() { return /* reexport */ AnimatableColor; },
  "AnimationOptions": function() { return /* reexport */ AnimationOptions; },
  "Background": function() { return /* reexport */ Background; },
  "BackgroundMask": function() { return /* reexport */ BackgroundMask; },
  "BackgroundMaskCover": function() { return /* reexport */ BackgroundMaskCover; },
  "Circle": function() { return /* reexport */ Circle; },
  "CircleWarp": function() { return /* reexport */ CircleWarp; },
  "ClickEvent": function() { return /* reexport */ ClickEvent; },
  "Collisions": function() { return /* reexport */ Collisions; },
  "CollisionsOverlap": function() { return /* reexport */ CollisionsOverlap; },
  "ColorAnimation": function() { return /* reexport */ ColorAnimation; },
  "Destroy": function() { return /* reexport */ Destroy; },
  "DivEvent": function() { return /* reexport */ DivEvent; },
  "Events": function() { return /* reexport */ Events; },
  "ExternalInteractorBase": function() { return /* reexport */ ExternalInteractorBase; },
  "FullScreen": function() { return /* reexport */ FullScreen; },
  "HoverEvent": function() { return /* reexport */ HoverEvent; },
  "HslAnimation": function() { return /* reexport */ HslAnimation; },
  "HslColorManager": function() { return /* reexport */ HslColorManager; },
  "Interactivity": function() { return /* reexport */ Interactivity; },
  "ManualParticle": function() { return /* reexport */ ManualParticle; },
  "Modes": function() { return /* reexport */ Modes; },
  "Motion": function() { return /* reexport */ Motion; },
  "MotionReduce": function() { return /* reexport */ MotionReduce; },
  "Move": function() { return /* reexport */ Move; },
  "MoveAngle": function() { return /* reexport */ MoveAngle; },
  "MoveAttract": function() { return /* reexport */ MoveAttract; },
  "MoveGravity": function() { return /* reexport */ MoveGravity; },
  "MovePath": function() { return /* reexport */ MovePath; },
  "MovePathDelay": function() { return /* reexport */ MovePathDelay; },
  "MoveTrail": function() { return /* reexport */ MoveTrail; },
  "Opacity": function() { return /* reexport */ Opacity; },
  "OpacityAnimation": function() { return /* reexport */ OpacityAnimation; },
  "Options": function() { return /* reexport */ Options; },
  "OptionsColor": function() { return /* reexport */ OptionsColor; },
  "OutModes": function() { return /* reexport */ OutModes; },
  "Parallax": function() { return /* reexport */ Parallax; },
  "ParticlesBounce": function() { return /* reexport */ ParticlesBounce; },
  "ParticlesBounceFactor": function() { return /* reexport */ ParticlesBounceFactor; },
  "ParticlesDensity": function() { return /* reexport */ ParticlesDensity; },
  "ParticlesInteractorBase": function() { return /* reexport */ ParticlesInteractorBase; },
  "ParticlesNumber": function() { return /* reexport */ ParticlesNumber; },
  "ParticlesOptions": function() { return /* reexport */ ParticlesOptions; },
  "Point": function() { return /* reexport */ Point; },
  "Range": function() { return /* reexport */ Range; },
  "Rectangle": function() { return /* reexport */ Rectangle; },
  "Responsive": function() { return /* reexport */ Responsive; },
  "RgbColorManager": function() { return /* reexport */ RgbColorManager; },
  "Rotate": function() { return /* reexport */ Rotate; },
  "RotateAnimation": function() { return /* reexport */ RotateAnimation; },
  "Shadow": function() { return /* reexport */ Shadow; },
  "Shape": function() { return /* reexport */ Shape; },
  "Size": function() { return /* reexport */ Size; },
  "SizeAnimation": function() { return /* reexport */ SizeAnimation; },
  "Slow": function() { return /* reexport */ Slow; },
  "Spin": function() { return /* reexport */ Spin; },
  "Split": function() { return /* reexport */ Split; },
  "SplitFactor": function() { return /* reexport */ SplitFactor; },
  "SplitRate": function() { return /* reexport */ SplitRate; },
  "Stroke": function() { return /* reexport */ Stroke; },
  "Theme": function() { return /* reexport */ Theme; },
  "ThemeDefault": function() { return /* reexport */ ThemeDefault; },
  "ValueWithRandom": function() { return /* reexport */ ValueWithRandom; },
  "Vector": function() { return /* reexport */ Vector; },
  "Vector3d": function() { return /* reexport */ Vector3d; },
  "ZIndex": function() { return /* reexport */ ZIndex; },
  "addColorManager": function() { return /* reexport */ addColorManager; },
  "alterHsl": function() { return /* reexport */ alterHsl; },
  "animate": function() { return /* reexport */ animate; },
  "areBoundsInside": function() { return /* reexport */ areBoundsInside; },
  "arrayRandomIndex": function() { return /* reexport */ arrayRandomIndex; },
  "calcEasing": function() { return /* reexport */ calcEasing; },
  "calcExactPositionOrRandomFromSize": function() { return /* reexport */ calcExactPositionOrRandomFromSize; },
  "calcExactPositionOrRandomFromSizeRanged": function() { return /* reexport */ calcExactPositionOrRandomFromSizeRanged; },
  "calcPositionFromSize": function() { return /* reexport */ calcPositionFromSize; },
  "calcPositionOrRandomFromSize": function() { return /* reexport */ calcPositionOrRandomFromSize; },
  "calcPositionOrRandomFromSizeRanged": function() { return /* reexport */ calcPositionOrRandomFromSizeRanged; },
  "calculateBounds": function() { return /* reexport */ calculateBounds; },
  "cancelAnimation": function() { return /* reexport */ cancelAnimation; },
  "circleBounce": function() { return /* reexport */ circleBounce; },
  "circleBounceDataFromParticle": function() { return /* reexport */ circleBounceDataFromParticle; },
  "clamp": function() { return /* reexport */ clamp; },
  "clear": function() { return /* reexport */ clear; },
  "collisionVelocity": function() { return /* reexport */ collisionVelocity; },
  "colorMix": function() { return /* reexport */ colorMix; },
  "colorToHsl": function() { return /* reexport */ colorToHsl; },
  "colorToRgb": function() { return /* reexport */ colorToRgb; },
  "deepExtend": function() { return /* reexport */ deepExtend; },
  "divMode": function() { return /* reexport */ divMode; },
  "divModeExecute": function() { return /* reexport */ divModeExecute; },
  "drawLine": function() { return /* reexport */ drawLine; },
  "drawParticle": function() { return /* reexport */ drawParticle; },
  "drawParticlePlugin": function() { return /* reexport */ drawParticlePlugin; },
  "drawPlugin": function() { return /* reexport */ drawPlugin; },
  "drawShape": function() { return /* reexport */ drawShape; },
  "drawShapeAfterEffect": function() { return /* reexport */ drawShapeAfterEffect; },
  "drawTriangle": function() { return /* reexport */ drawTriangle; },
  "generatedAttribute": function() { return /* reexport */ generatedAttribute; },
  "getDistance": function() { return /* reexport */ getDistance; },
  "getDistances": function() { return /* reexport */ getDistances; },
  "getHslAnimationFromHsl": function() { return /* reexport */ getHslAnimationFromHsl; },
  "getHslFromAnimation": function() { return /* reexport */ getHslFromAnimation; },
  "getLinkColor": function() { return /* reexport */ getLinkColor; },
  "getLinkRandomColor": function() { return /* reexport */ getLinkRandomColor; },
  "getParticleBaseVelocity": function() { return /* reexport */ getParticleBaseVelocity; },
  "getParticleDirectionAngle": function() { return /* reexport */ getParticleDirectionAngle; },
  "getRandom": function() { return /* reexport */ getRandom; },
  "getRandomRgbColor": function() { return /* reexport */ getRandomRgbColor; },
  "getRangeMax": function() { return /* reexport */ getRangeMax; },
  "getRangeMin": function() { return /* reexport */ getRangeMin; },
  "getRangeValue": function() { return /* reexport */ getRangeValue; },
  "getStyleFromHsl": function() { return /* reexport */ getStyleFromHsl; },
  "getStyleFromRgb": function() { return /* reexport */ getStyleFromRgb; },
  "getValue": function() { return /* reexport */ getValue; },
  "hslToRgb": function() { return /* reexport */ hslToRgb; },
  "hslaToRgba": function() { return /* reexport */ hslaToRgba; },
  "isDivModeEnabled": function() { return /* reexport */ isDivModeEnabled; },
  "isInArray": function() { return /* reexport */ isInArray; },
  "isPointInside": function() { return /* reexport */ isPointInside; },
  "isSsr": function() { return /* reexport */ isSsr; },
  "itemFromArray": function() { return /* reexport */ itemFromArray; },
  "loadFont": function() { return /* reexport */ loadFont; },
  "loadOptions": function() { return /* reexport */ loadOptions; },
  "loadParticlesOptions": function() { return /* reexport */ loadParticlesOptions; },
  "mix": function() { return /* reexport */ mix; },
  "mouseDownEvent": function() { return /* reexport */ mouseDownEvent; },
  "mouseLeaveEvent": function() { return /* reexport */ mouseLeaveEvent; },
  "mouseMoveEvent": function() { return /* reexport */ mouseMoveEvent; },
  "mouseOutEvent": function() { return /* reexport */ mouseOutEvent; },
  "mouseUpEvent": function() { return /* reexport */ mouseUpEvent; },
  "noPolygonDataLoaded": function() { return /* reexport */ noPolygonDataLoaded; },
  "noPolygonFound": function() { return /* reexport */ noPolygonFound; },
  "paintBase": function() { return /* reexport */ paintBase; },
  "parseAlpha": function() { return /* reexport */ parseAlpha; },
  "randomInRange": function() { return /* reexport */ randomInRange; },
  "rangeColorToHsl": function() { return /* reexport */ rangeColorToHsl; },
  "rangeColorToRgb": function() { return /* reexport */ rangeColorToRgb; },
  "rectBounce": function() { return /* reexport */ rectBounce; },
  "resizeEvent": function() { return /* reexport */ resizeEvent; },
  "rgbToHsl": function() { return /* reexport */ rgbToHsl; },
  "setRandom": function() { return /* reexport */ setRandom; },
  "setRangeValue": function() { return /* reexport */ setRangeValue; },
  "singleDivModeExecute": function() { return /* reexport */ singleDivModeExecute; },
  "stringToAlpha": function() { return /* reexport */ stringToAlpha; },
  "stringToRgb": function() { return /* reexport */ stringToRgb; },
  "touchCancelEvent": function() { return /* reexport */ touchCancelEvent; },
  "touchEndEvent": function() { return /* reexport */ touchEndEvent; },
  "touchMoveEvent": function() { return /* reexport */ touchMoveEvent; },
  "touchStartEvent": function() { return /* reexport */ touchStartEvent; },
  "tsParticles": function() { return /* binding */ tsParticles; },
  "visibilityChangeEvent": function() { return /* reexport */ visibilityChangeEvent; }
});

;// CONCATENATED MODULE: ./dist/browser/Utils/EventDispatcher.js
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

  dispatchEvent(type, args) {
    var _a;

    (_a = __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type)) === null || _a === void 0 ? void 0 : _a.forEach(handler => handler(args));
  }

  hasEventListener(type) {
    return !!__classPrivateFieldGet(this, _EventDispatcher_listeners, "f").get(type);
  }

  removeAllEventListeners(type) {
    if (!type) {
      __classPrivateFieldSet(this, _EventDispatcher_listeners, new Map(), "f");
    } else {
      __classPrivateFieldGet(this, _EventDispatcher_listeners, "f").delete(type);
    }
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

}
_EventDispatcher_listeners = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/Core/Utils/Vector.js
/**
 * @category Utils
 */
class Vector {
  /**
   * Vector constructor, creating an instance with the given coordinates
   * @param xOrCoords X coordinate or the whole [[ICoordinates]] object
   * @param y Y coordinate
   * @protected
   */
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
  /**
   * A new vector, with coordinates in the origin point
   */


  static get origin() {
    return Vector.create(0, 0);
  }
  /**
   * Returns the current vector angle, based on x,y values
   */


  get angle() {
    return Math.atan2(this.y, this.x);
  }
  /**
   * Sets the x,y values using an angle, length must be greater than 0
   * @param angle the angle to set
   */


  set angle(angle) {
    this.updateFromAngle(angle, this.length);
  }
  /**
   * Returns the current vector length, based on x,y values
   */


  get length() {
    return Math.sqrt(this.getLengthSq());
  }
  /**
   * Sets the x,y values using the length
   * @param length the length to set
   */


  set length(length) {
    this.updateFromAngle(this.angle, length);
  }
  /**
   * Clones the given vector
   * @param source the vector to clone
   * @returns a new vector instance, created from the given one
   */


  static clone(source) {
    return Vector.create(source.x, source.y);
  }
  /**
   * Creates a new vector instance
   * @param x X coordinate
   * @param y Y coordinate
   * @returns the new vector created
   */


  static create(x, y) {
    return new Vector(x, y);
  }
  /**
   * Adds the current and the given vector together, without modifying them
   * @param v the vector used for the sum operation
   * @returns the sum vector
   */


  add(v) {
    return Vector.create(this.x + v.x, this.y + v.y);
  }
  /**
   * Adds the given vector to the current one, modifying it
   * @param v the vector to add to the current one
   */


  addTo(v) {
    this.x += v.x;
    this.y += v.y;
  }
  /**
   * Copies the current vector, cloning it
   * @returns the cloned current vector
   */


  copy() {
    return Vector.clone(this);
  }
  /**
   * Calculates the distance between the current vector and the given one
   * @param v the vector used for calculating the distance from the current one
   * @returns the distance between the vectors
   */


  distanceTo(v) {
    return this.sub(v).length;
  }
  /**
   * Get the distance squared between two vectors
   * @param v the vector used for calculating the distance from the current one
   * @returns the distance squared between the vectors
   */


  distanceToSq(v) {
    return this.sub(v).getLengthSq();
  }
  /**
   * Divides the given scalar and the current vector together, without modifying it
   * @param n the scalar value to divide from the current vector
   */


  div(n) {
    return Vector.create(this.x / n, this.y / n);
  }
  /**
   * Divides the given scalar from the current vector, modifying it
   * @param n the scalar value to divide from the current vector
   */


  divTo(n) {
    this.x /= n;
    this.y /= n;
  }
  /**
   * Get the squared length value
   * @returns the squared length value
   */


  getLengthSq() {
    return this.x ** 2 + this.y ** 2;
  }
  /**
   * Returns the Manhattan distance between all vectors
   * @param v the vector used for calculating the distance from the current one
   * @returns the Manhattan distance between the vectors
   */


  manhattanDistanceTo(v) {
    return Math.abs(v.x - this.x) + Math.abs(v.y - this.y);
  }
  /**
   * Multiplies the given scalar and the current vector together, without modifying it
   * @param n the scalar value to multiply to the vector
   * @returns the multiplied vector
   */


  mult(n) {
    return Vector.create(this.x * n, this.y * n);
  }
  /**
   * Multiplies the given scalar to the current vector, modifying it
   * @param n the scalar value to multiply to the vector
   */


  multTo(n) {
    this.x *= n;
    this.y *= n;
  }
  /**
   * Creates a new vector, rotating the current one, without modifying it
   * @param angle the rotation angle
   */


  rotate(angle) {
    return Vector.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
  }
  /**
   * Set the vector to the specified velocity
   * @param v the Vector used to set the current vector
   */


  setTo(v) {
    this.x = v.x;
    this.y = v.y;
  }
  /**
   * Subtracts the current and the given vector together, without modifying them
   * @param v the vector used for the subtract operation
   * @returns the subtracted vector
   */


  sub(v) {
    return Vector.create(this.x - v.x, this.y - v.y);
  }
  /**
   * Subtracts the given vector from the current one, modifying it
   * @param v the vector to subtract from the current one
   */


  subFrom(v) {
    this.x -= v.x;
    this.y -= v.y;
  }
  /**
   * Updates the current vector, using angle and length values, instead of x and y
   * @param angle the new angle
   * @param length the new length
   * @private
   */


  updateFromAngle(angle, length) {
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Utils/NumberUtils.js

let _random = Math.random;
/**
 * Replaces the library random function with a custom one.
 * @param rnd A random function that returns a number between 0 and 1.
 */

function setRandom(rnd = Math.random) {
  _random = rnd;
}
/**
 * Returns a random number between 0 and 1 using the library random function.
 */

function getRandom() {
  return clamp(_random(), 0, 1 - 1e-16);
}
/**
 * Clamps a number between a minimum and maximum value
 * @param num the source number
 * @param min the minimum value
 * @param max the maximum value
 */

function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
/**
 *
 * @param comp1
 * @param comp2
 * @param weight1
 * @param weight2
 */

function mix(comp1, comp2, weight1, weight2) {
  return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
function randomInRange(r) {
  const max = getRangeMax(r);
  let min = getRangeMin(r);

  if (max === min) {
    min = 0;
  }

  return getRandom() * (max - min) + min;
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
/**
 * Gets the distance between two coordinates
 * @param pointA the first coordinate
 * @param pointB the second coordinate
 */

function getDistances(pointA, pointB) {
  const dx = pointA.x - pointB.x,
        dy = pointA.y - pointB.y;
  return {
    dx: dx,
    dy: dy,
    distance: Math.sqrt(dx * dx + dy * dy)
  };
}
/**
 * Gets the distance between two coordinates
 * @param pointA the first coordinate
 * @param pointB the second coordinate
 */

function getDistance(pointA, pointB) {
  return getDistances(pointA, pointB).distance;
}
function getParticleDirectionAngle(direction, position, center) {
  if (typeof direction === "number") {
    return direction * Math.PI / 180;
  } else {
    switch (direction) {
      case "top"
      /* MoveDirection.top */
      :
        return -Math.PI / 2;

      case "top-right"
      /* MoveDirection.topRight */
      :
        return -Math.PI / 4;

      case "right"
      /* MoveDirection.right */
      :
        return 0;

      case "bottom-right"
      /* MoveDirection.bottomRight */
      :
        return Math.PI / 4;

      case "bottom"
      /* MoveDirection.bottom */
      :
        return Math.PI / 2;

      case "bottom-left"
      /* MoveDirection.bottomLeft */
      :
        return 3 * Math.PI / 4;

      case "left"
      /* MoveDirection.left */
      :
        return Math.PI;

      case "top-left"
      /* MoveDirection.topLeft */
      :
        return -3 * Math.PI / 4;

      case "inside"
      /* MoveDirection.inside */
      :
        return Math.atan2(center.y - position.y, center.x - position.x);

      case "outside"
      /* MoveDirection.outside */
      :
        return Math.atan2(position.y - center.y, position.x - center.x);

      case "none"
      /* MoveDirection.none */
      :
      default:
        return getRandom() * Math.PI * 2;
    }
  }
}
/**
 * Get Particle base velocity
 * @param direction the direction to use for calculating the velocity
 */

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
    case "ease-out-quad"
    /* EasingType.easeOutQuad */
    :
      return 1 - (1 - value) ** 2;

    case "ease-out-cubic"
    /* EasingType.easeOutCubic */
    :
      return 1 - (1 - value) ** 3;

    case "ease-out-quart"
    /* EasingType.easeOutQuart */
    :
      return 1 - (1 - value) ** 4;

    case "ease-out-quint"
    /* EasingType.easeOutQuint */
    :
      return 1 - (1 - value) ** 5;

    case "ease-out-expo"
    /* EasingType.easeOutExpo */
    :
      return value === 1 ? 1 : 1 - Math.pow(2, -10 * value);

    case "ease-out-sine"
    /* EasingType.easeOutSine */
    :
      return Math.sin(value * Math.PI / 2);

    case "ease-out-back"
    /* EasingType.easeOutBack */
    :
      {
        const c1 = 1.70158,
              c3 = c1 + 1;
        return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
      }

    case "ease-out-circ"
    /* EasingType.easeOutCirc */
    :
      return Math.sqrt(1 - Math.pow(value - 1, 2));

    default:
      return value;
  }
}
/**
 * Gets exact position from percent position based on the given size
 * @param data the data to use for calculating the position
 * @returns the exact position
 */

function calcPositionFromSize(data) {
  var _a, _b;

  return ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined && ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? {
    x: data.position.x * data.size.width / 100,
    y: data.position.y * data.size.height / 100
  } : undefined;
}
/**
 * Gets exact position from percent position, or a random one if not specified, based on the given size
 * @param data the data to use for calculating the position
 * @returns the exact position
 */

function calcPositionOrRandomFromSize(data) {
  var _a, _b, _c, _d;

  return {
    x: ((_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : getRandom() * 100) * data.size.width / 100,
    y: ((_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : getRandom() * 100) * data.size.height / 100
  };
}
/**
 * Gets exact position from percent position, or a random one if not specified, based on the given size
 * @param data the data to use for calculating the position
 * @returns the exact position
 */

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
/**
 * Gets exact position from exact position, or a random one if not specified, based on the given size
 * @param data the data to use for calculating the position
 * @returns the exact position
 */

function calcExactPositionOrRandomFromSize(data) {
  var _a, _b, _c, _d;

  return {
    x: (_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : getRandom() * data.size.width,
    y: (_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : getRandom() * data.size.height
  };
}
/**
 * Gets exact position from exact position, or a random one if not specified, based on the given size
 * @param data the data to use for calculating the position
 * @returns the exact position
 */

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
function parseAlpha(input) {
  return input.endsWith("%") ? parseFloat(input) / 100 : parseFloat(input);
}
;// CONCATENATED MODULE: ./dist/browser/Utils/Utils.js


/**
 * Calculates the bounce on a rectangle side
 * @hidden
 * @param pSide particle bounce side
 * @param pOtherSide particle bounce other side
 * @param rectSide rectangle bounce side
 * @param rectOtherSide rectangle bounce other side
 * @param velocity particle velocity
 * @param factor bounce factor
 */

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
/**
 * Checks if the given selectors matches the element
 * @hidden
 * @param element element to check
 * @param selectors selectors to check
 */


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
/**
 * Checks if the script is executed server side
 */


function isSsr() {
  return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
}
/**
 * Calls the requestAnimationFrame function or a polyfill
 */

function animate() {
  return isSsr() ? callback => setTimeout(callback) : callback => (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.setTimeout)(callback);
}
/**
 * Cancels the requestAnimationFrame function or a polyfill
 */

function cancelAnimation() {
  return isSsr() ? handle => clearTimeout(handle) : handle => (window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.clearTimeout)(handle);
}
/**
 * Checks if a value is equal to the destination, if same type, or is in the provided array
 * @param value the value to check
 * @param array the data array or single value
 * @returns true if the value is equal to the destination, if same type, or is in the provided array
 */

function isInArray(value, array) {
  return value === array || array instanceof Array && array.indexOf(value) > -1;
}
/**
 * Loads a font for the canvas
 * @param font font name
 * @param weight font weight
 */

async function loadFont(font, weight) {
  try {
    await document.fonts.load(`${weight !== null && weight !== void 0 ? weight : "400"} 36px '${font !== null && font !== void 0 ? font : "Verdana"}'`);
  } catch (_a) {// ignores any error
  }
}
/**
 * Returns a random array index
 * @param array the array to get the index from
 * @returns a random array index
 */

function arrayRandomIndex(array) {
  return Math.floor(getRandom() * array.length);
}
/**
 * Returns a random object from the given array
 * @param array the array to get the object from
 * @param index the index to get the object from
 * @param useIndex if true, the index will be used instead of a random index
 */

function itemFromArray(array, index, useIndex = true) {
  const fixedIndex = index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array);
  return array[fixedIndex];
}
/**
 * Checks if the given point is inside the given rectangle
 * @param point the point to check
 * @param size the rectangle size
 * @param offset position offset
 * @param radius the point radius
 * @param direction the point direction
 * @returns true if the point is inside the rectangle
 */

function isPointInside(point, size, offset, radius, direction) {
  return areBoundsInside(calculateBounds(point, radius !== null && radius !== void 0 ? radius : 0), size, offset, direction);
}
/**
 * Checks if the given shape bounds are inside the given rectangle
 * @param bounds the shape bounds to check
 * @param size the rectangle size
 * @param offset position offset
 * @param direction the shape direction
 */

function areBoundsInside(bounds, size, offset, direction) {
  let inside = true;

  if (!direction || direction === "bottom"
  /* OutModeDirection.bottom */
  ) {
    inside = bounds.top < size.height + offset.x;
  }

  if (inside && (!direction || direction === "left"
  /* OutModeDirection.left */
  )) {
    inside = bounds.right > offset.x;
  }

  if (inside && (!direction || direction === "right"
  /* OutModeDirection.right */
  )) {
    inside = bounds.left < size.width + offset.y;
  }

  if (inside && (!direction || direction === "top"
  /* OutModeDirection.top */
  )) {
    inside = bounds.bottom > offset.y;
  }

  return inside;
}
/**
 * Calculates the bounds of the given point
 * @param point the point to calculate the bounds from
 * @param radius the point radius
 * @returns the bounds of the given point
 */

function calculateBounds(point, radius) {
  return {
    bottom: point.y + radius,
    left: point.x - radius,
    right: point.x + radius,
    top: point.y - radius
  };
}
/**
 * Merges the whole source objects into the destination object
 * @param destination the destination object
 * @param sources the source objects
 * @returns the merged destination object
 */

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
/**
 * Checks if the given div mode is enabled in the given div elements
 * @param mode the div mode to check
 * @param divs the div elements to check
 * @returns true if the div mode is enabled
 */

function isDivModeEnabled(mode, divs) {
  return divs instanceof Array ? !!divs.find(t => t.enable && isInArray(mode, t.mode)) : isInArray(mode, divs.mode);
}
/**
 * Execute the given callback if div mode in the given div elements is enabled
 * @param mode the div mode to check
 * @param divs the div elements to check
 * @param callback the callback to execute
 */

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
/**
 * Execute the given callback for the given div event
 * @param div the div event to execute the callback for
 * @param callback the callback to execute
 */

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
/**
 * Checks if the given element targets any of the div modes
 * @param divs the div elements to check
 * @param element the element to check
 * @returns true if the element targets any of the div modes
 */

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
/**
 * Returns circle bounce data for the given particle
 * @param p the particle to get the circle bounds data for
 * @returns the circle bounce data for the given particle
 */

function circleBounceDataFromParticle(p) {
  return {
    position: p.getPosition(),
    radius: p.getRadius(),
    mass: p.getMass(),
    velocity: p.velocity,
    factor: Vector.create(getValue(p.options.bounce.horizontal), getValue(p.options.bounce.vertical))
  };
}
/**
 * Executes the circle bounce between two particles
 * @param p1 the first particle
 * @param p2 the second particle
 */

function circleBounce(p1, p2) {
  const {
    x: xVelocityDiff,
    y: yVelocityDiff
  } = p1.velocity.sub(p2.velocity),
        [pos1, pos2] = [p1.position, p2.position],
        {
    dx: xDist,
    dy: yDist
  } = getDistances(pos2, pos1); // Prevent accidental overlap of particles

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
/**
 * Executes the bounce between a particle and div bounds
 * @param particle the particle to bounce
 * @param divBounds the div bounds to bounce
 */

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
;// CONCATENATED MODULE: ./dist/browser/Utils/ColorUtils.js


const randomColorValue = "random",
      midColorValue = "mid",
      colorManagers = new Map();
function addColorManager(key, manager) {
  colorManagers.set(key, manager);
}
/**
 * Converts hue to RGB values.
 * @hidden
 * @param p
 * @param q
 * @param t
 */

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
/**
 * Converts a string to a RGBA color.
 * @param input A string that represents a color.
 */


function stringToRgba(input) {
  for (const [, manager] of colorManagers) {
    if (input.startsWith(manager.stringPrefix)) {
      return manager.parseString(input);
    }
  }

  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i,
        hexFixed = input.replace(shorthandRegex, (_, r, g, b, a) => {
    return r + r + g + g + b + b + (a !== undefined ? a + a : "");
  }),
        regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i,
        result = regex.exec(hexFixed);
  return result ? {
    a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
    b: parseInt(result[3], 16),
    g: parseInt(result[2], 16),
    r: parseInt(result[1], 16)
  } : undefined;
}
/**
 * Gets the particles color
 * @param input the input color to convert in [[IRgb]] object
 * @param index the array index, if needed
 * @param useIndex set to false for ignoring the index parameter
 */


function rangeColorToRgb(input, index, useIndex = true) {
  if (!input) {
    return;
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

  for (const [, manager] of colorManagers) {
    const res = manager.handleRangeColor(color);

    if (res) {
      return res;
    }
  }
}
/**
 * Gets the particles color
 * @param input the input color to convert in [[IRgb]] object
 * @param index the array index, if needed
 * @param useIndex set to false to ignore the index parameter
 */

function colorToRgb(input, index, useIndex = true) {
  if (!input) {
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

  for (const [, manager] of colorManagers) {
    const res = manager.handleColor(color);

    if (res) {
      return res;
    }
  }
}
/**
 * Gets the particles color
 * @param color the input color to convert in [[IHsl]] object
 * @param index the array index, if needed
 * @param useIndex set to false to ignore the index parameter
 * @returns the [[IHsl]] object
 */

function colorToHsl(color, index, useIndex = true) {
  const rgb = colorToRgb(color, index, useIndex);
  return rgb ? rgbToHsl(rgb) : undefined;
}
/**
 * Gets the particles color
 * @param color the input color to convert in [[IHsl]] object
 * @param index the array index, if needed
 * @param useIndex set to false to ignore the index parameter
 * @returns the [[IHsl]] object
 */

function rangeColorToHsl(color, index, useIndex = true) {
  const rgb = rangeColorToRgb(color, index, useIndex);
  return rgb ? rgbToHsl(rgb) : undefined;
}
/**
 * Converts rgb color to hsl color
 * @param color rgb color to convert
 * @returns hsl color
 */

function rgbToHsl(color) {
  const r1 = color.r / 255,
        g1 = color.g / 255,
        b1 = color.b / 255,
        max = Math.max(r1, g1, b1),
        min = Math.min(r1, g1, b1),
        //Calculate L:
  res = {
    h: 0,
    l: (max + min) / 2,
    s: 0
  };

  if (max !== min) {
    //Calculate S:
    res.s = res.l < 0.5 ? (max - min) / (max + min) : (max - min) / (2.0 - max - min); //Calculate H:

    res.h = r1 === max ? (g1 - b1) / (max - min) : res.h = g1 === max ? 2.0 + (b1 - r1) / (max - min) : 4.0 + (r1 - g1) / (max - min);
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
/**
 * Gets alpha value from string color
 * @param input the input color to convert in alpha value
 * @returns the alpha value
 */

function stringToAlpha(input) {
  var _a;

  return (_a = stringToRgba(input)) === null || _a === void 0 ? void 0 : _a.a;
}
/**
 * Converts hexadecimal string (HTML color code) in a [[IRgb]] object
 * @param input the hexadecimal string (#f70 or #ff7700)
 * @returns the [[IRgb]] object
 */

function stringToRgb(input) {
  return stringToRgba(input);
}
/**
 * Converts a Hue Saturation Lightness ([[IHsl]]) object in a [[IRgb]] object
 * @param hsl the Hue Saturation Lightness ([[IHsl]]) object
 * @returns the [[IRgb]] object
 */

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

  if (!hslPercent.s) {
    result.b = hslPercent.l; // achromatic

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
/**
 * Converts HSLA color to RGBA color
 * @param hsla the HSLA color to convert
 * @returns the RGBA color
 */

function hslaToRgba(hsla) {
  const rgbResult = hslToRgb(hsla);
  return {
    a: hsla.a,
    b: rgbResult.b,
    g: rgbResult.g,
    r: rgbResult.r
  };
}
/**
 * Returns a random ([[IRgb]]) color
 * @param min the minimum value for the color
 * @returns the random ([[IRgb]]) color
 */

function getRandomRgbColor(min) {
  const fixedMin = min !== null && min !== void 0 ? min : 0;
  return {
    b: Math.floor(randomInRange(setRangeValue(fixedMin, 256))),
    g: Math.floor(randomInRange(setRangeValue(fixedMin, 256))),
    r: Math.floor(randomInRange(setRangeValue(fixedMin, 256)))
  };
}
/**
 * Gets a CSS style string from a [[IRgb]] object and opacity value
 * @param color the [[IRgb]] input color
 * @param opacity the opacity value
 * @returns the CSS style string
 */

function getStyleFromRgb(color, opacity) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
}
/**
 * Gets a CSS style string from a [[IHsl]] object and opacity value
 * @param color the [[IHsl]] input color
 * @param opacity the opacity value
 * @returns the CSS style string
 */

function getStyleFromHsl(color, opacity) {
  return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
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
  } else if (linkColor === midColorValue) {
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
  /* color */
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
    colorValue.status = 0
    /* AnimationStatus.increasing */
    ;

    if (!colorAnimation.sync) {
      colorValue.velocity *= getRandom();
      colorValue.value *= getRandom();
    }
  } else {
    colorValue.velocity = 0;
  }
}
;// CONCATENATED MODULE: ./dist/browser/Utils/CanvasUtils.js

/**
 * Draws a line between two points using canvas API in the given context.
 * @hidden
 * @param context - The canvas context to draw on.
 * @param begin - The start point of the line.
 * @param end - The end point of the line.
 */

function drawLine(context, begin, end) {
  context.beginPath();
  context.moveTo(begin.x, begin.y);
  context.lineTo(end.x, end.y);
  context.closePath();
}
/**
 * Draws a triangle with three points using canvas API in the given context.
 * @param context - The canvas context to draw on.
 * @param p1 - The first point of the triangle.
 * @param p2 - The second point of the triangle.
 * @param p3 - The third point of the triangle.
 */

function drawTriangle(context, p1, p2, p3) {
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.lineTo(p3.x, p3.y);
  context.closePath();
}
/**
 * Fills a rectangle with the given color for the whole canvas.
 * @param context - The canvas context to draw on.
 * @param dimension - The dimension of the rectangle.
 * @param baseColor - The base color of the rectangle, if not specified a transparent color will be used.
 */

function paintBase(context, dimension, baseColor) {
  context.save();
  context.fillStyle = baseColor !== null && baseColor !== void 0 ? baseColor : "rgba(0,0,0,0)";
  context.fillRect(0, 0, dimension.width, dimension.height);
  context.restore();
}
/**
 * Clears the canvas.
 * @param context - The canvas context to clear.
 * @param dimension - The dimension of the canvas.
 */

function clear(context, dimension) {
  context.clearRect(0, 0, dimension.width, dimension.height);
}
/**
 * Draws the particle using canvas API in the given context.
 * @param data - The function parameters.
 */

function drawParticle(data) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;

  const {
    container,
    context,
    particle,
    delta,
    colorStyles,
    backgroundMask,
    composite,
    radius,
    opacity,
    shadow,
    transform
  } = data;
  const pos = particle.getPosition();
  context.save();

  if (transform.a !== undefined || transform.b !== undefined || transform.c !== undefined || transform.d !== undefined) {
    context.setTransform((_a = transform.a) !== null && _a !== void 0 ? _a : 1, (_b = transform.b) !== null && _b !== void 0 ? _b : 0, (_c = transform.c) !== null && _c !== void 0 ? _c : 0, (_d = transform.d) !== null && _d !== void 0 ? _d : 1, pos.x, pos.y);
  } else {
    context.translate(pos.x, pos.y);
  }

  context.beginPath();
  const angle = particle.rotation + (particle.options.rotate.path ? particle.velocity.angle : 0);

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
  context.lineWidth = (_e = particle.strokeWidth) !== null && _e !== void 0 ? _e : 0;

  if (colorStyles.stroke) {
    context.strokeStyle = colorStyles.stroke;
  }

  drawShape(container, context, particle, radius, opacity, delta);

  if (((_f = stroke === null || stroke === void 0 ? void 0 : stroke.width) !== null && _f !== void 0 ? _f : 0) > 0) {
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
    context.setTransform((_g = transform.a) !== null && _g !== void 0 ? _g : 1, (_h = transform.b) !== null && _h !== void 0 ? _h : 0, (_j = transform.c) !== null && _j !== void 0 ? _j : 0, (_k = transform.d) !== null && _k !== void 0 ? _k : 1, pos.x, pos.y);
  } else {
    context.translate(pos.x, pos.y);
  }

  if (particle.rotation) {
    context.rotate(particle.rotation);
  }

  if (backgroundMask) {
    context.globalCompositeOperation = composite;
  }

  drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
  context.restore();
}
/**
 * Draws the particle shape using the plugin's shape renderer.
 * @param container The container of the particle.
 * @param context The canvas context.
 * @param particle The particle to draw.
 * @param radius The radius of the particle.
 * @param opacity The opacity of the particle.
 * @param delta this variable contains the delta between the current frame and the previous frame
 */

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
/**
 * Draws the particle effect after the plugin's shape renderer.
 * @param container The container of the particle.
 * @param context The canvas context.
 * @param particle The particle to draw.
 * @param radius The radius of the particle.
 * @param opacity The opacity of the particle.
 * @param delta this variable contains the delta between the current frame and the previous frame
 */

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
/**
 * Draws the given plugin in the canvas.
 * @param context The canvas context.
 * @param plugin The plugin to draw.
 * @param delta this variable contains the delta between the current frame and the previous frame
 */

function drawPlugin(context, plugin, delta) {
  if (!plugin.draw) {
    return;
  }

  context.save();
  plugin.draw(context, delta);
  context.restore();
}
/**
 * Draws the given particle plugin in the canvas.
 * @param context The canvas context.
 * @param plugin The particle plugin to draw.
 * @param particle The particle to draw.
 * @param delta this variable contains the delta between the current frame and the previous frame
 */

function drawParticlePlugin(context, plugin, particle, delta) {
  if (!plugin.drawParticle) {
    return;
  }

  context.save();
  plugin.drawParticle(context, particle, delta);
  context.restore();
}
/**
 * Alters HSL values for enlighten or darken the given color.
 * @param color The color to enlighten or darken.
 * @param type The type of alteration.
 * @param value The value of the alteration.
 */

function alterHsl(color, type, value) {
  return {
    h: color.h,
    s: color.s,
    l: color.l + (type === "darken"
    /* AlterType.darken */
    ? -1 : 1) * value
  };
}
;// CONCATENATED MODULE: ./dist/browser/Core/Utils/Constants.js
/**
 * Project's constants
 * @category Utils
 */
const generatedAttribute = "generated";
const touchEndEvent = "touchend";
const mouseDownEvent = "pointerdown";
const mouseUpEvent = "pointerup";
const mouseMoveEvent = "pointermove";
const touchStartEvent = "touchstart";
const touchMoveEvent = "touchmove";
const mouseLeaveEvent = "pointerleave";
const mouseOutEvent = "pointerout";
const touchCancelEvent = "touchcancel";
const resizeEvent = "resize";
const visibilityChangeEvent = "visibilitychange";
const noPolygonDataLoaded = "No polygon data loaded.";
const noPolygonFound = "No polygon found, you need to specify SVG url in config.";
;// CONCATENATED MODULE: ./dist/browser/Core/Canvas.js
var Canvas_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var Canvas_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Canvas_colorPlugins, _Canvas_context, _Canvas_postDrawUpdaters, _Canvas_preDrawUpdaters, _Canvas_resizePlugins;






function setTransformValue(factor, newFactor, key) {
  var _a;

  const newValue = newFactor[key];

  if (newValue !== undefined) {
    factor[key] = ((_a = factor[key]) !== null && _a !== void 0 ? _a : 1) * newValue;
  }
}
/**
 * Canvas manager
 * @category Core
 */


class Canvas {
  /**
   * Constructor of canvas manager
   * @param container the parent container
   */
  constructor(container) {
    this.container = container;

    _Canvas_colorPlugins.set(this, void 0);
    /**
     * The particles canvas context
     */


    _Canvas_context.set(this, void 0);

    _Canvas_postDrawUpdaters.set(this, void 0);

    _Canvas_preDrawUpdaters.set(this, void 0);

    _Canvas_resizePlugins.set(this, void 0);

    this.size = {
      height: 0,
      width: 0
    };

    Canvas_classPrivateFieldSet(this, _Canvas_context, null, "f");

    this.generatedCanvas = false;

    Canvas_classPrivateFieldSet(this, _Canvas_preDrawUpdaters, [], "f");

    Canvas_classPrivateFieldSet(this, _Canvas_postDrawUpdaters, [], "f");

    Canvas_classPrivateFieldSet(this, _Canvas_resizePlugins, [], "f");

    Canvas_classPrivateFieldSet(this, _Canvas_colorPlugins, [], "f");
  }
  /**
   * Clears the canvas content
   */


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
  /**
   * Destroying object actions
   */


  destroy() {
    var _a;

    if (this.generatedCanvas) {
      (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
    } else {
      this.resetOriginalStyle();
    }

    this.draw(ctx => {
      clear(ctx, this.size);
    });

    Canvas_classPrivateFieldSet(this, _Canvas_preDrawUpdaters, [], "f");

    Canvas_classPrivateFieldSet(this, _Canvas_postDrawUpdaters, [], "f");

    Canvas_classPrivateFieldSet(this, _Canvas_resizePlugins, [], "f");

    Canvas_classPrivateFieldSet(this, _Canvas_colorPlugins, [], "f");
  }
  /**
   * Generic draw method, for drawing stuff on the canvas context
   * @param cb
   */


  draw(cb) {
    if (!Canvas_classPrivateFieldGet(this, _Canvas_context, "f")) {
      return;
    }

    return cb(Canvas_classPrivateFieldGet(this, _Canvas_context, "f"));
  }
  /**
   * Draws the specified particle in the canvas
   * @param particle the particle to draw
   * @param delta the frame delta time values
   */


  drawParticle(particle, delta) {
    var _a;

    if (particle.spawning || particle.destroyed) {
      return;
    }

    const radius = particle.getRadius();

    if (radius <= 0) {
      return;
    }

    const pfColor = particle.getFillColor(),
          psColor = (_a = particle.getStrokeColor()) !== null && _a !== void 0 ? _a : pfColor;
    let [fColor, sColor] = this.getPluginParticleColors(particle);

    if (!fColor) {
      fColor = pfColor;
    }

    if (!sColor) {
      sColor = psColor;
    }

    if (!fColor && !sColor) {
      return;
    }

    this.draw(ctx => {
      var _a, _b, _c, _d, _e;

      const options = this.container.actualOptions,
            zIndexOptions = particle.options.zIndex,
            zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate,
            opacity = (_c = (_a = particle.bubble.opacity) !== null && _a !== void 0 ? _a : (_b = particle.opacity) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : 1,
            strokeOpacity = (_e = (_d = particle.stroke) === null || _d === void 0 ? void 0 : _d.opacity) !== null && _e !== void 0 ? _e : opacity,
            zOpacity = opacity * zOpacityFactor,
            zStrokeOpacity = strokeOpacity * zOpacityFactor,
            transform = {},
            colorStyles = {
        fill: fColor ? getStyleFromHsl(fColor, zOpacity) : undefined
      };
      colorStyles.stroke = sColor ? getStyleFromHsl(sColor, zStrokeOpacity) : colorStyles.fill;
      this.applyPreDrawUpdaters(ctx, particle, radius, zOpacity, colorStyles, transform);
      drawParticle({
        container: this.container,
        context: ctx,
        particle,
        delta,
        colorStyles,
        backgroundMask: options.backgroundMask.enable,
        composite: options.backgroundMask.composite,
        radius: radius * (1 - particle.zIndexFactor) ** zIndexOptions.sizeRate,
        opacity: zOpacity,
        shadow: particle.options.shadow,
        transform
      });
      this.applyPostDrawUpdaters(particle);
    });
  }
  /**
   * Draws stuff using the given plugin, using the given particle
   * @param plugin the plugin to use for drawing stuff
   * @param particle the particle used
   * @param delta the frame delta time values
   */


  drawParticlePlugin(plugin, particle, delta) {
    this.draw(ctx => {
      drawParticlePlugin(ctx, plugin, particle, delta);
    });
  }
  /**
   * Draws stuff using the given plugin
   * @param plugin the plugin to use for drawing stuff
   * @param delta the frame delta time values
   */


  drawPlugin(plugin, delta) {
    this.draw(ctx => {
      drawPlugin(ctx, plugin, delta);
    });
  }
  /**
   * Initializes the canvas element
   */


  init() {
    this.resize();
    this.initStyle();
    this.initCover();
    this.initTrail();
    this.initBackground();
    this.initUpdaters();
    this.initPlugins();
    this.paint();
  }
  /**
   * Initializes the canvas background
   */


  initBackground() {
    const options = this.container.actualOptions,
          background = options.background,
          element = this.element,
          elementStyle = element === null || element === void 0 ? void 0 : element.style;

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
  /**
   * Initializes the plugins needed by canvas
   */


  initPlugins() {
    Canvas_classPrivateFieldSet(this, _Canvas_resizePlugins, [], "f");

    for (const [, plugin] of this.container.plugins) {
      if (plugin.resize) {
        Canvas_classPrivateFieldGet(this, _Canvas_resizePlugins, "f").push(plugin);
      }

      if (plugin.particleFillColor || plugin.particleStrokeColor) {
        Canvas_classPrivateFieldGet(this, _Canvas_colorPlugins, "f").push(plugin);
      }
    }
  }
  /**
   * Initializes the updaters needed by canvas
   */


  initUpdaters() {
    Canvas_classPrivateFieldSet(this, _Canvas_preDrawUpdaters, [], "f");

    Canvas_classPrivateFieldSet(this, _Canvas_postDrawUpdaters, [], "f");

    for (const updater of this.container.particles.updaters) {
      if (updater.afterDraw) {
        Canvas_classPrivateFieldGet(this, _Canvas_postDrawUpdaters, "f").push(updater);
      }

      if (updater.getColorStyles || updater.getTransformValues || updater.beforeDraw) {
        Canvas_classPrivateFieldGet(this, _Canvas_preDrawUpdaters, "f").push(updater);
      }
    }
  }
  /**
   * Loads the canvas html element
   * @param canvas the canvas html element
   */


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
  /**
   * Paints the canvas background
   */


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
  /**
   * Calculates the size of the canvas
   */


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
  /**
   * The window resize event handler
   */


  async windowResize() {
    if (!this.element) {
      return;
    }

    this.resize();
    const container = this.container,
          needsRefresh = container.updateActualOptions();
    /* density particles enabled */

    container.particles.setDensity();
    this.applyResizePlugins();

    if (needsRefresh) {
      await container.refresh();
    }
  }

  applyPostDrawUpdaters(particle) {
    var _a;

    for (const updater of Canvas_classPrivateFieldGet(this, _Canvas_postDrawUpdaters, "f")) {
      (_a = updater.afterDraw) === null || _a === void 0 ? void 0 : _a.call(updater, particle);
    }
  }

  applyPreDrawUpdaters(ctx, particle, radius, zOpacity, colorStyles, transform) {
    var _a;

    for (const updater of Canvas_classPrivateFieldGet(this, _Canvas_preDrawUpdaters, "f")) {
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

      if (updater.getTransformValues) {
        const updaterTransform = updater.getTransformValues(particle);

        for (const key in updaterTransform) {
          setTransformValue(transform, updaterTransform, key);
        }
      }

      (_a = updater.beforeDraw) === null || _a === void 0 ? void 0 : _a.call(updater, particle);
    }
  }

  applyResizePlugins() {
    var _a;

    for (const plugin of Canvas_classPrivateFieldGet(this, _Canvas_resizePlugins, "f")) {
      (_a = plugin.resize) === null || _a === void 0 ? void 0 : _a.call(plugin);
    }
  }

  getPluginParticleColors(particle) {
    let fColor, sColor;

    for (const plugin of Canvas_classPrivateFieldGet(this, _Canvas_colorPlugins, "f")) {
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

    return [fColor, sColor];
  }

  initCover() {
    const options = this.container.actualOptions,
          cover = options.backgroundMask.cover,
          color = cover.color,
          coverRgb = rangeColorToRgb(color);

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
    const element = this.element,
          options = this.container.actualOptions;

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
    const options = this.container.actualOptions,
          trail = options.particles.move.trail,
          fillColor = rangeColorToRgb(trail.fillColor);

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
    this.draw(ctx => {
      paintBase(ctx, this.size, baseColor);
    });
  }

  resetOriginalStyle() {
    const element = this.element,
          originalStyle = this.originalStyle;

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
_Canvas_colorPlugins = new WeakMap(), _Canvas_context = new WeakMap(), _Canvas_postDrawUpdaters = new WeakMap(), _Canvas_preDrawUpdaters = new WeakMap(), _Canvas_resizePlugins = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/Core/Utils/EventListeners.js


/**
 * Manage the given event listeners
 * @param element the event listener receiver
 * @param event the event to listen
 * @param handler the handler called once the event is triggered
 * @param add flag for adding or removing the event listener
 * @param options event listener options object
 */

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
/**
 * Particles container event listeners manager
 * @category Utils
 */


class EventListeners {
  /**
   * Events listener constructor
   * @param container the calling container
   */
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
  /**
   * Adding all listeners
   */


  addListeners() {
    this.manageListeners(true);
  }
  /**
   * Removing all listeners
   */


  removeListeners() {
    this.manageListeners(false);
  }
  /**
   * Mouse/Touch click/tap event implementation
   * @param e the click event arguments
   */


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
  /**
   * Handles click mode event
   * @param mode Click mode type
   * @private
   */


  handleClickMode(mode) {
    this.container.handleClickMode(mode);
  }
  /**
   * Handle browser theme change
   * @param e the media query event
   * @private
   */


  handleThemeChange(e) {
    const mediaEvent = e,
          themeName = mediaEvent.matches ? this.container.options.defaultDarkTheme : this.container.options.defaultLightTheme,
          theme = this.container.options.themes.find(theme => theme.name === themeName);

    if (theme && theme.default.auto) {
      this.container.loadTheme(themeName);
    }
  }
  /**
   * Handles blur event
   * @private
   */


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
  /**
   * Handles window resize event
   * @private
   */


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
  /**
   * Initializing event listeners
   */


  manageListeners(add) {
    var _a;

    const container = this.container,
          options = container.actualOptions,
          detectType = options.interactivity.detectsOn;
    let mouseLeaveTmpEvent = mouseLeaveEvent;
    /* events target element */

    if (detectType === "window"
    /* InteractivityDetect.window */
    ) {
      container.interactivity.element = window;
      mouseLeaveTmpEvent = mouseOutEvent;
    } else if (detectType === "parent"
    /* InteractivityDetect.parent */
    && container.canvas.element) {
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
    /* detect mouse pos - on hover / click event */

    if (!interactivityEl) {
      return;
    }

    const html = interactivityEl;

    if (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable) {
      /* el on mousemove */
      manageListener(interactivityEl, mouseMoveEvent, this.mouseMoveHandler, add);
      /* el on touchstart */

      manageListener(interactivityEl, touchStartEvent, this.touchStartHandler, add);
      /* el on touchmove */

      manageListener(interactivityEl, touchMoveEvent, this.touchMoveHandler, add);

      if (!options.interactivity.events.onClick.enable) {
        /* el on touchend */
        manageListener(interactivityEl, touchEndEvent, this.touchEndHandler, add);
      } else {
        manageListener(interactivityEl, touchEndEvent, this.touchEndClickHandler, add);
        manageListener(interactivityEl, mouseUpEvent, this.mouseUpHandler, add);
        manageListener(interactivityEl, mouseDownEvent, this.mouseDownHandler, add);
      }
      /* el on onmouseleave */


      manageListener(interactivityEl, mouseLeaveTmpEvent, this.mouseLeaveHandler, add);
      /* el on touchcancel */

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
  /**
   * Handle mouse down event
   * @private
   */


  mouseDown() {
    const interactivity = this.container.interactivity;

    if (interactivity) {
      const mouse = interactivity.mouse;
      mouse.clicking = true;
      mouse.downPosition = mouse.position;
    }
  }
  /**
   * Mouse/Touch click/tap event
   * @param e the click event arguments
   */


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
  /**
   * Mouse/Touch event finish
   */


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
  /**
   * Mouse/Touch move event
   * @param e the event arguments
   */


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

    if (e.type.startsWith("pointer")) {
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
      } else if (options.interactivity.detectsOn === "parent"
      /* InteractivityDetect.parent */
      ) {
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
;// CONCATENATED MODULE: ./dist/browser/Core/Utils/FrameManager.js
/**
 * @category Core
 */
class FrameManager {
  constructor(container) {
    this.container = container;
  }
  /**
   * Handles the rAF method preparing the next animation frame to be drawn
   * limiting it if it's needed by the current configuration
   * @param timestamp the new frame timestamp
   */


  async nextFrame(timestamp) {
    var _a;

    try {
      const container = this.container; // FPS limit logic - if we are too fast, just draw without updating

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/OptionsColor.js
/**
 * [[include:Color.md]]
 * @category Options
 */
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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Background/Background.js

/**
 * [[include:Options/Background.md]]
 * @category Options
 */

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/BackgroundMask/BackgroundMaskCover.js

/**
 * @category Options
 */

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/BackgroundMask/BackgroundMask.js

/**
 * [[include:Options/BackgroundMask.md]]
 * @category Options
 */

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/FullScreen/FullScreen.js
/**
 * The options to set the particles in the background using CSS `fixed` position
 * The [[zIndex]] property sets the background CSS `z-index` property
 * [[include:Options/FullScreen.md]]
 * @category Options
 */
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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Events/ClickEvent.js
/**
 * [[include:Options/Interactivity/Click.md]]
 * @category Options
 */
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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Events/DivEvent.js
/**
 * [[include:Options/Interactivity/Div.md]]
 * @category Options
 */
class DivEvent {
  constructor() {
    this.selectors = [];
    this.enable = false;
    this.mode = [];
    this.type = "circle"
    /* DivType.circle */
    ;
  }
  /**
   * The element id to detect the event
   * @deprecated this property is obsolete, please use the new selectors
   */


  get el() {
    return this.elementId;
  }
  /**
   * The element id to detect the event
   * @deprecated this property is obsolete, please use the new selectors
   * @param value
   */


  set el(value) {
    this.elementId = value;
  }
  /**
   * The element id to detect the event
   * @deprecated this property is obsolete, please use the new selectors
   */


  get elementId() {
    return this.ids;
  }
  /**
   * The element id to detect the event
   * @deprecated this property is obsolete, please use the new selectors
   * @param value
   */


  set elementId(value) {
    this.ids = value;
  }
  /**
   * The element id to detect the event
   * @deprecated this property is obsolete, please use the new ids
   */


  get ids() {
    return this.selectors instanceof Array ? this.selectors.map(t => t.replace("#", "")) : this.selectors.replace("#", ""); // this is the best we can do, if a non-id selector is used the old property won't work
    // but ids is deprecated so who cares.
  }
  /**
   * The element id to detect the event
   * @deprecated this property is obsolete, please use the new ids
   * @param value
   */


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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Events/Parallax.js
/**
 * @category Options
 */
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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Events/HoverEvent.js

/**
 * [[include:Options/Interactivity/Hover.md]]
 * @category Options
 */

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Events/Events.js



/**
 * [[include:Options/Interactivity/Events.md]]
 * @category Options
 */

class Events {
  constructor() {
    this.onClick = new ClickEvent();
    this.onDiv = new DivEvent();
    this.onHover = new HoverEvent();
    this.resize = true;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new onClick
   */


  get onclick() {
    return this.onClick;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new onClick
   * @param value
   */


  set onclick(value) {
    this.onClick = value;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new onDiv
   */


  get ondiv() {
    return this.onDiv;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new onDiv
   * @param value
   */


  set ondiv(value) {
    this.onDiv = value;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new onHover
   */


  get onhover() {
    return this.onHover;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new onHover
   * @param value
   */


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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/Slow.js
/**
 * @category Options
 */
class Slow {
  constructor() {
    this.factor = 3;
    this.radius = 200;
  }

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Modes/Modes.js
var Modes_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var Modes_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _Modes_container, _Modes_engine;


/**
 * [[include:Options/Interactivity/Modes.md]]
 * @category Options
 */

class Modes {
  constructor(engine, container) {
    _Modes_container.set(this, void 0);

    _Modes_engine.set(this, void 0);

    Modes_classPrivateFieldSet(this, _Modes_engine, engine, "f");

    Modes_classPrivateFieldSet(this, _Modes_container, container, "f");

    this.slow = new Slow();
  }

  load(data) {
    if (!data) {
      return;
    }

    this.slow.load(data.slow);

    if (Modes_classPrivateFieldGet(this, _Modes_container, "f")) {
      const interactors = Modes_classPrivateFieldGet(this, _Modes_engine, "f").plugins.interactors.get(Modes_classPrivateFieldGet(this, _Modes_container, "f"));

      if (interactors) {
        for (const interactor of interactors) {
          if (interactor.loadModeOptions) {
            interactor.loadModeOptions(this, data);
          }
        }
      }
    }
  }

}
_Modes_container = new WeakMap(), _Modes_engine = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Interactivity/Interactivity.js
var Interactivity_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var _Interactivity_container, _Interactivity_engine;



/**
 * [[include:Options/Interactivity.md]]
 * @category Options
 */

class Interactivity {
  constructor(engine, container) {
    _Interactivity_container.set(this, void 0);

    _Interactivity_engine.set(this, void 0);

    Interactivity_classPrivateFieldSet(this, _Interactivity_engine, engine, "f");

    Interactivity_classPrivateFieldSet(this, _Interactivity_container, container, "f");

    this.detectsOn = "window"
    /* InteractivityDetect.window */
    ;
    this.events = new Events();
    this.modes = new Modes(engine, container);
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new detectsOn
   */


  get detect_on() {
    return this.detectsOn;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new detectsOn
   * @param value
   */


  set detect_on(value) {
    this.detectsOn = value;
  }

  load(data) {
    var _a;

    if (!data) {
      return;
    }

    const detectsOn = (_a = data.detectsOn) !== null && _a !== void 0 ? _a : data.detect_on;

    if (detectsOn !== undefined) {
      this.detectsOn = detectsOn;
    }

    this.events.load(data.events);
    this.modes.load(data.modes);
  }

}
_Interactivity_container = new WeakMap(), _Interactivity_engine = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/ManualParticle.js

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Motion/MotionReduce.js
/**
 * @category Options
 */
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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Motion/Motion.js

/**
 * [[include:Options/Motion.md]]
 * @category Options
 */

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Responsive.js

class Responsive {
  constructor() {
    this.maxWidth = Infinity;
    this.options = {};
    this.mode = "canvas"
    /* ResponsiveMode.canvas */
    ;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.maxWidth !== undefined) {
      this.maxWidth = data.maxWidth;
    }

    if (data.mode !== undefined) {
      // not enforcing an error here as this should largely be an opt-in setting
      if (data.mode === "screen"
      /* ResponsiveMode.screen */
      ) {
        this.mode = "screen"
        /* ResponsiveMode.screen */
        ;
      } else {
        this.mode = "canvas"
        /* ResponsiveMode.canvas */
        ;
      }
    }

    if (data.options !== undefined) {
      this.options = deepExtend({}, data.options);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Theme/ThemeDefault.js
class ThemeDefault {
  constructor() {
    this.auto = false;
    this.mode = "any"
    /* ThemeMode.any */
    ;
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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Theme/Theme.js


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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/ColorAnimation.js

/**
 * @category Options
 */

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/HslAnimation.js

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/AnimatableColor.js


/**
 * [[include:Options/Particles/Color.md]]
 * @category Options
 */

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Collisions/CollisionsOverlap.js
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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Random.js
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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/ValueWithRandom.js


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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js

class ParticlesBounceFactor extends ValueWithRandom {
  constructor() {
    super();
    this.random.minimumValue = 0.1;
    this.value = 1;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Bounce/ParticlesBounce.js

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Collisions/Collisions.js


/**
 * @category Options
 * [[include:Collisions.md]]
 */

class Collisions {
  constructor() {
    this.bounce = new ParticlesBounce();
    this.enable = false;
    this.mode = "bounce"
    /* CollisionMode.bounce */
    ;
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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Destroy/SplitFactor.js

class SplitFactor extends ValueWithRandom {
  constructor() {
    super();
    this.value = 3;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Destroy/SplitRate.js

class SplitRate extends ValueWithRandom {
  constructor() {
    super();
    this.value = {
      min: 4,
      max: 9
    };
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Destroy/Split.js



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
      if (data.particles instanceof Array) {
        this.particles = data.particles.map(s => {
          return deepExtend({}, s);
        });
      } else {
        this.particles = deepExtend({}, data.particles);
      }
    }

    if (data.sizeOffset !== undefined) {
      this.sizeOffset = data.sizeOffset;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Destroy/Destroy.js

class Destroy {
  constructor() {
    this.mode = "none"
    /* DestroyMode.none */
    ;
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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/MoveAngle.js

/**
 * @category Options
 */

class MoveAngle {
  constructor() {
    this.offset = 0; //45;

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/MoveAttract.js

/**
 * @category Options
 */

class MoveAttract {
  constructor() {
    this.distance = 200;
    this.enable = false;
    this.rotate = {
      x: 3000,
      y: 3000
    };
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new rotate.x
   */


  get rotateX() {
    return this.rotate.x;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new rotate.x
   * @param value
   */


  set rotateX(value) {
    this.rotate.x = value;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new rotate.y
   */


  get rotateY() {
    return this.rotate.y;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new rotate.y
   * @param value
   */


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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/MoveGravity.js

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/Path/MovePathDelay.js

class MovePathDelay extends ValueWithRandom {
  constructor() {
    super();
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/Path/MovePath.js


/**
 * @category Options
 */

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/MoveTrail.js

/**
 * @category Options
 */

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/OutModes.js
class OutModes {
  constructor() {
    this.default = "out"
    /* OutMode.out */
    ;
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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/Spin.js


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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Move/Move.js









/**
 * [[include:Options/Particles/Move.md]]
 * @category Options
 */

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
    this.direction = "none"
    /* MoveDirection.none */
    ;
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
  /**
   * @deprecated this property is obsolete, please use the new collisions object on particles options
   */


  get bounce() {
    return this.collisions;
  }
  /**
   * @deprecated this property is obsolete, please use the new collisions object on particles options
   * @param value
   */


  set bounce(value) {
    this.collisions = value;
  }
  /**
   * @deprecated this property is obsolete, please use the new collisions object on particles options
   */


  get collisions() {
    return false;
  }
  /**
   * @deprecated this property is obsolete, please use the new collisions object on particles options
   * @param value
   */


  set collisions(value) {// deprecated
  }
  /**
   * @deprecated use the new [[path]] property instead
   */


  get noise() {
    return this.path;
  }
  /**
   * @deprecated use the new [[path]] property instead
   */


  set noise(value) {
    this.path = value;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new outMode
   */


  get outMode() {
    return this.outModes.default;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new outMode
   * @param value
   */


  set outMode(value) {
    this.outModes.default = value;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new outMode
   */


  get out_mode() {
    return this.outMode;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new outMode
   * @param value
   */


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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/AnimationOptions.js

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Opacity/OpacityAnimation.js

/**
 * @category Options
 */

class OpacityAnimation extends AnimationOptions {
  constructor() {
    super();
    this.destroy = "none"
    /* DestroyType.none */
    ;
    this.enable = false;
    this.speed = 2;
    this.startValue = "random"
    /* StartValueType.random */
    ;
    this.sync = false;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new minimumValue
   */


  get opacity_min() {
    return this.minimumValue;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new minimumValue
   * @param value
   */


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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Opacity/Opacity.js



/**
 * [[include:Options/Particles/Opacity.md]]
 * @category Options
 */

class Opacity extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new OpacityAnimation();
    this.random.minimumValue = 0.1;
    this.value = 1;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new animation
   */


  get anim() {
    return this.animation;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new animation
   * @param value
   */


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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Number/ParticlesDensity.js
/**
 * @category Options
 */
class ParticlesDensity {
  constructor() {
    this.enable = false;
    this.area = 800;
    this.factor = 1000;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new area
   */


  get value_area() {
    return this.area;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new area
   * @param value
   */


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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Number/ParticlesNumber.js

/**
 * [[include:Options/Particles/Number.md]]
 * @category Options
 */

class ParticlesNumber {
  constructor() {
    this.density = new ParticlesDensity();
    this.limit = 0;
    this.value = 100;
  }
  /**
   * @deprecated the max property is deprecated, please use the new limit
   */


  get max() {
    return this.limit;
  }
  /**
   * @deprecated the max property is deprecated, please use the new limit
   */


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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Rotate/RotateAnimation.js

/**
 * @category Options
 */

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Rotate/Rotate.js


/**
 * [[include:Options/Particles/Rotate.md]]
 * @category Options
 */

class Rotate extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new RotateAnimation();
    this.direction = "clockwise"
    /* RotateDirection.clockwise */
    ;
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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Shadow.js

/**
 * @category Options
 * [[include:Shadow.md]]
 */

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Shape/Shape.js

/**
 * [[include:Options/Particles/Shape.md]]
 * @category Options
 */

class Shape {
  constructor() {
    this.options = {};
    this.type = "circle";
  }
  /**
   * @deprecated this property was integrated in custom shape management
   */


  get character() {
    var _a;

    return (_a = this.options["character"]) !== null && _a !== void 0 ? _a : this.options["char"];
  }
  /**
   * @deprecated this property was integrated in custom shape management
   */


  set character(value) {
    this.options["character"] = value;
    this.options["char"] = value;
  }
  /**
   * @deprecated This options has been renamed options
   */


  get custom() {
    return this.options;
  }
  /**
   * @deprecated This options has been renamed options
   * @param value
   */


  set custom(value) {
    this.options = value;
  }
  /**
   * @deprecated this property was integrated in custom shape management
   */


  get image() {
    var _a;

    return (_a = this.options["image"]) !== null && _a !== void 0 ? _a : this.options["images"];
  }
  /**
   * @deprecated this property was integrated in custom shape management
   * @param value
   */


  set image(value) {
    this.options["image"] = value;
    this.options["images"] = value;
  }
  /**
   * @deprecated the property images is deprecated, please use the image property, it works with one and many
   */


  get images() {
    return this.image;
  }
  /**
   * @deprecated the property images is deprecated, please use the image property, it works with one and many
   */


  set images(value) {
    this.image = value;
  }
  /**
   * @deprecated this property was integrated in custom shape management
   */


  get polygon() {
    var _a;

    return (_a = this.options["polygon"]) !== null && _a !== void 0 ? _a : this.options["star"];
  }
  /**
   * @deprecated this property was integrated in custom shape management
   */


  set polygon(value) {
    this.options["polygon"] = value;
    this.options["star"] = value;
  }
  /**
   * @deprecated this property was moved to particles section
   */


  get stroke() {
    return [];
  }
  /**
   * @deprecated this property was moved to particles section
   */


  set stroke(_value) {// deprecated
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
    var _a, _b;

    if (!item) {
      return;
    }

    const emptyValue = item instanceof Array ? [] : {},
          mainDifferentValues = item instanceof Array !== this.options[mainKey] instanceof Array,
          altDifferentValues = item instanceof Array !== this.options[altKey] instanceof Array;

    if (mainDifferentValues) {
      this.options[mainKey] = emptyValue;
    }

    if (altDifferentValues && altOverride) {
      this.options[altKey] = emptyValue;
    }

    this.options[mainKey] = deepExtend((_a = this.options[mainKey]) !== null && _a !== void 0 ? _a : emptyValue, item);

    if (!this.options[altKey] || altOverride) {
      this.options[altKey] = deepExtend((_b = this.options[altKey]) !== null && _b !== void 0 ? _b : emptyValue, item);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Size/SizeAnimation.js

/**
 * @category Options
 */

class SizeAnimation extends AnimationOptions {
  constructor() {
    super();
    this.destroy = "none"
    /* DestroyType.none */
    ;
    this.enable = false;
    this.speed = 5;
    this.startValue = "random"
    /* StartValueType.random */
    ;
    this.sync = false;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new minimumValue
   */


  get size_min() {
    return this.minimumValue;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new minimumValue
   * @param value
   */


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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Size/Size.js



/**
 * [[include:Options/Particles/Size.md]]
 * @category Options
 */

class Size extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new SizeAnimation();
    this.random.minimumValue = 1;
    this.value = 3;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new animation
   */


  get anim() {
    return this.animation;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new animation
   * @param value
   */


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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/Stroke.js

/**
 * [[include:Options/Particles/Stroke.md]]
 * @category Options
 */

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/ZIndex/ZIndex.js

/**
 * @category Options
 */

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Particles/ParticlesOptions.js
var ParticlesOptions_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var ParticlesOptions_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _ParticlesOptions_container, _ParticlesOptions_engine;















/**
 * [[include:Options/Particles.md]]
 * @category Options
 */

class ParticlesOptions {
  constructor(engine, container) {
    _ParticlesOptions_container.set(this, void 0);

    _ParticlesOptions_engine.set(this, void 0);

    ParticlesOptions_classPrivateFieldSet(this, _ParticlesOptions_engine, engine, "f");

    ParticlesOptions_classPrivateFieldSet(this, _ParticlesOptions_container, container, "f");

    this.bounce = new ParticlesBounce();
    this.collisions = new Collisions();
    this.color = new AnimatableColor();
    this.color.value = "#fff";
    this.destroy = new Destroy();
    this.groups = {};
    this.move = new Move();
    this.number = new ParticlesNumber();
    this.opacity = new Opacity();
    this.reduceDuplicates = false;
    this.rotate = new Rotate();
    this.shadow = new Shadow();
    this.shape = new Shape();
    this.size = new Size();
    this.stroke = new Stroke();
    this.zIndex = new ZIndex();
  }

  load(data) {
    var _a, _b, _c, _d, _e, _f;

    if (!data) {
      return;
    }

    this.bounce.load(data.bounce);
    this.color.load(AnimatableColor.create(this.color, data.color));
    this.destroy.load(data.destroy);

    if (data.groups !== undefined) {
      for (const group in data.groups) {
        const item = data.groups[group];

        if (item !== undefined) {
          this.groups[group] = deepExtend((_a = this.groups[group]) !== null && _a !== void 0 ? _a : {}, item);
        }
      }
    }

    this.move.load(data.move);
    this.number.load(data.number);
    this.opacity.load(data.opacity);

    if (data.reduceDuplicates !== undefined) {
      this.reduceDuplicates = data.reduceDuplicates;
    }

    this.rotate.load(data.rotate);
    this.shape.load(data.shape);
    this.size.load(data.size);
    this.shadow.load(data.shadow);
    this.zIndex.load(data.zIndex);
    const collisions = (_c = (_b = data.move) === null || _b === void 0 ? void 0 : _b.collisions) !== null && _c !== void 0 ? _c : (_d = data.move) === null || _d === void 0 ? void 0 : _d.bounce;

    if (collisions !== undefined) {
      this.collisions.enable = collisions;
    }

    this.collisions.load(data.collisions);

    if (data.interactivity !== undefined) {
      this.interactivity = deepExtend({}, data.interactivity);
    }

    const strokeToLoad = (_e = data.stroke) !== null && _e !== void 0 ? _e : (_f = data.shape) === null || _f === void 0 ? void 0 : _f.stroke;

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

    if (ParticlesOptions_classPrivateFieldGet(this, _ParticlesOptions_container, "f")) {
      const updaters = ParticlesOptions_classPrivateFieldGet(this, _ParticlesOptions_engine, "f").plugins.updaters.get(ParticlesOptions_classPrivateFieldGet(this, _ParticlesOptions_container, "f"));

      if (updaters) {
        for (const updater of updaters) {
          if (updater.loadOptions) {
            updater.loadOptions(this, data);
          }
        }
      }

      const interactors = ParticlesOptions_classPrivateFieldGet(this, _ParticlesOptions_engine, "f").plugins.interactors.get(ParticlesOptions_classPrivateFieldGet(this, _ParticlesOptions_container, "f"));

      if (interactors) {
        for (const interactor of interactors) {
          if (interactor.loadParticlesOptions) {
            interactor.loadParticlesOptions(this, data);
          }
        }
      }
    }
  }

}
_ParticlesOptions_container = new WeakMap(), _ParticlesOptions_engine = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/Utils/OptionsUtils.js

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
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/Options.js
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

var _Options_instances, _Options_container, _Options_engine, _Options_findDefaultTheme;











/**
 * [[include:Options.md]]
 * @category Options
 */

class Options {
  constructor(engine, container) {
    _Options_instances.add(this);

    _Options_container.set(this, void 0);

    _Options_engine.set(this, void 0);

    Options_classPrivateFieldSet(this, _Options_engine, engine, "f");

    Options_classPrivateFieldSet(this, _Options_container, container, "f");

    this.autoPlay = true;
    this.background = new Background();
    this.backgroundMask = new BackgroundMask();
    this.fullScreen = new FullScreen();
    this.detectRetina = true;
    this.duration = 0;
    this.fpsLimit = 120;
    this.interactivity = new Interactivity(engine, container);
    this.manualParticles = [];
    this.motion = new Motion();
    this.particles = loadParticlesOptions(Options_classPrivateFieldGet(this, _Options_engine, "f"), Options_classPrivateFieldGet(this, _Options_container, "f"));
    this.pauseOnBlur = true;
    this.pauseOnOutsideViewport = true;
    this.responsive = [];
    this.style = {};
    this.themes = [];
    this.zLayers = 100;
  }
  /**
   * @deprecated this property is obsolete, please use the new fullScreen
   */


  get backgroundMode() {
    return this.fullScreen;
  }
  /**
   * @deprecated this property is obsolete, please use the new fullScreen
   * @param value
   */


  set backgroundMode(value) {
    this.fullScreen.load(value);
  }
  /**
   * @deprecated this property is obsolete, please use the new fpsLimit
   */


  get fps_limit() {
    return this.fpsLimit;
  }
  /**
   *
   * @deprecated this property is obsolete, please use the new fpsLimit
   * @param value
   */


  set fps_limit(value) {
    this.fpsLimit = value;
  }
  /**
   * @deprecated this property is obsolete, please use the new retinaDetect
   */


  get retina_detect() {
    return this.detectRetina;
  }
  /**
   * @deprecated this property is obsolete, please use the new retinaDetect
   * @param value
   */


  set retina_detect(value) {
    this.detectRetina = value;
  }
  /**
   * This methods loads the source object in the current instance
   * @param data the source data to load into the instance
   */


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

    const interactors = Options_classPrivateFieldGet(this, _Options_engine, "f").plugins.interactors.get(Options_classPrivateFieldGet(this, _Options_container, "f"));

    if (interactors) {
      for (const interactor of interactors) {
        if (interactor.loadOptions) {
          interactor.loadOptions(this, data);
        }
      }
    }

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

    this.defaultDarkTheme = (_d = Options_classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, "dark"
    /* ThemeMode.dark */
    )) === null || _d === void 0 ? void 0 : _d.name;
    this.defaultLightTheme = (_e = Options_classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, "light"
    /* ThemeMode.light */
    )) === null || _e === void 0 ? void 0 : _e.name;
  }

  setResponsive(width, pxRatio, defaultOptions) {
    this.load(defaultOptions);
    const responsiveOptions = this.responsive.find(t => t.mode === "screen"
    /* ResponsiveMode.screen */
    && screen ? t.maxWidth > screen.availWidth : t.maxWidth * pxRatio > width);
    this.load(responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.options);
    return responsiveOptions === null || responsiveOptions === void 0 ? void 0 : responsiveOptions.maxWidth;
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
            defaultTheme = Options_classPrivateFieldGet(this, _Options_instances, "m", _Options_findDefaultTheme).call(this, clientDarkMode ? "dark"
      /* ThemeMode.dark */
      : "light"
      /* ThemeMode.light */
      );

      if (defaultTheme) {
        this.load(defaultTheme.options);
      }
    }
  }

  importPreset(preset) {
    this.load(Options_classPrivateFieldGet(this, _Options_engine, "f").plugins.getPreset(preset));
  }

}
_Options_container = new WeakMap(), _Options_engine = new WeakMap(), _Options_instances = new WeakSet(), _Options_findDefaultTheme = function _Options_findDefaultTheme(mode) {
  var _a;

  return (_a = this.themes.find(theme => theme.default.value && theme.default.mode === mode)) !== null && _a !== void 0 ? _a : this.themes.find(theme => theme.default.value && theme.default.mode === "any"
  /* ThemeMode.any */
  );
};
;// CONCATENATED MODULE: ./dist/browser/Core/Utils/InteractionManager.js
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

var _InteractionManager_engine, _InteractionManager_interactors;

class InteractionManager {
  /**
   * The constructor of the interaction manager
   * @param engine the parent engine
   * @param container the parent container
   */
  constructor(engine, container) {
    this.container = container;
    /**
     * The engine used for registering the interactions managers
     * @private
     */

    _InteractionManager_engine.set(this, void 0);
    /**
     * The interactors that are used for initialization
     * @private
     */


    _InteractionManager_interactors.set(this, void 0);

    InteractionManager_classPrivateFieldSet(this, _InteractionManager_engine, engine, "f");

    InteractionManager_classPrivateFieldSet(this, _InteractionManager_interactors, InteractionManager_classPrivateFieldGet(this, _InteractionManager_engine, "f").plugins.getInteractors(this.container, true), "f");

    this.externalInteractors = [];
    this.particleInteractors = [];
  }
  /**
   * Iterates through the external interactivity manager and call the interact method, if they are enabled
   * @param delta this variable contains the delta between the current frame and the previous frame
   */


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
  /**
   * Initializes the interaction manager, loading all the engine registered managers into the container
   */


  init() {
    this.externalInteractors = [];
    this.particleInteractors = [];

    for (const interactor of InteractionManager_classPrivateFieldGet(this, _InteractionManager_interactors, "f")) {
      switch (interactor.type) {
        case 0
        /* InteractorType.External */
        :
          this.externalInteractors.push(interactor);
          break;

        case 1
        /* InteractorType.Particles */
        :
          this.particleInteractors.push(interactor);
          break;
      }

      interactor.init();
    }
  }
  /**
   * Iterates through the particles interactions manager and call the interact method, if they are enabled
   * @param particle the particle responsible for the current interaction
   * @param delta this variable contains the delta between the current frame and the previous frame
   */


  async particlesInteract(particle, delta) {
    for (const interactor of this.externalInteractors) {
      interactor.clear(particle);
    }
    /* interaction auto between particles */


    for (const interactor of this.particleInteractors) {
      if (interactor.isEnabled(particle)) {
        await interactor.interact(particle, delta);
      }
    }
  }
  /**
   * Iterates through the external interactivity manager and call the interact method, if they are enabled
   * @param particle the particle to reset
   */


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
_InteractionManager_engine = new WeakMap(), _InteractionManager_interactors = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/Core/Utils/Vector3d.js

/**
 * @category Utils
 */

class Vector3d extends Vector {
  /**
   * Vector constructor, creating an instance with the given coordinates
   * @param xOrCoords X coordinate or the whole [[ICoordinates]] object
   * @param y Y coordinate
   * @param z Z coordinate
   * @protected
   */
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
  /**
   * A new vector, with coordinates in the origin point
   */


  static get origin() {
    return Vector3d.create(0, 0, 0);
  }
  /**
   * Clones the given vector
   * @param source the vector to clone
   * @returns a new vector instance, created from the given one
   */


  static clone(source) {
    return Vector3d.create(source.x, source.y, source.z);
  }
  /**
   * Creates a new vector instance
   * @param x X coordinate
   * @param y Y coordinate
   * @param z Z coordinate
   * @returns the new vector created
   */


  static create(x, y, z) {
    return new Vector3d(x, y, z);
  }
  /**
   * Adds the current and the given vector together, without modifying them
   * @param v the vector used for the sum operation
   * @returns the sum vector
   */


  add(v) {
    return v instanceof Vector3d ? Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z) : super.add(v);
  }
  /**
   * Adds the given vector to the current one, modifying it
   * @param v the vector to add to the current one
   */


  addTo(v) {
    super.addTo(v);

    if (v instanceof Vector3d) {
      this.z += v.z;
    }
  }
  /**
   * Copies the current vector, cloning it
   * @returns the cloned current vector
   */


  copy() {
    return Vector3d.clone(this);
  }
  /**
   * Divides the given scalar and the current vector together, without modifying it
   * @param n the scalar value to divide from the current vector
   */


  div(n) {
    return Vector3d.create(this.x / n, this.y / n, this.z / n);
  }
  /**
   * Divides the given scalar from the current vector, modifying it
   * @param n the scalar value to divide from the current vector
   */


  divTo(n) {
    super.divTo(n);
    this.z /= n;
  }
  /**
   * Multiplies the given scalar and the current vector together, without modifying it
   * @param n the scalar value to multiply to the vector
   * @returns the multiplied vector
   */


  mult(n) {
    return Vector3d.create(this.x * n, this.y * n, this.z * n);
  }
  /**
   * Multiplies the given scalar to the current vector, modifying it
   * @param n the scalar value to multiply to the vector
   */


  multTo(n) {
    super.multTo(n);
    this.z *= n;
  }
  /**
   * Set the vector to the specified velocity
   * @param v the Vector used to set the current vector
   */


  setTo(v) {
    super.setTo(v);
    const v3d = v;

    if (v3d.z !== undefined) {
      this.z = v3d.z;
    }
  }
  /**
   * Subtracts the current and the given vector together, without modifying them
   * @param v the vector used for the subtract operation
   * @returns the subtracted vector
   */


  sub(v) {
    return v instanceof Vector3d ? Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z) : super.sub(v);
  }
  /**
   * Subtracts the given vector from the current one, modifying it
   * @param v the vector to subtract from the current one
   */


  subFrom(v) {
    super.subFrom(v);

    if (v instanceof Vector3d) {
      this.z -= v.z;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/Particle.js
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










/**
 * fixes out mode, calling the given callback if needed
 * @param data
 */

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
/**
 * The single particle object
 * @category Core
 */


class Particle {
  constructor(engine, id, container, position, overrideOptions, group) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;

    this.id = id;
    this.container = container;
    this.group = group;
    /**
     * Gets the particle containing engine instance
     * @private
     */

    _Particle_engine.set(this, void 0);

    Particle_classPrivateFieldSet(this, _Particle_engine, engine, "f");

    this.fill = true;
    this.close = true;
    this.lastPathTime = 0;
    this.destroyed = false;
    this.unbreakable = false;
    this.splitCount = 0;
    this.rotation = 0;
    this.misplaced = false;
    this.retina = {
      maxDistance: {}
    };
    this.outType = "normal"
    /* ParticleOutType.normal */
    ;
    this.ignoresResizeRatio = true;
    const pxRatio = container.retina.pixelRatio,
          mainOptions = container.actualOptions,
          particlesOptions = loadParticlesOptions(Particle_classPrivateFieldGet(this, _Particle_engine, "f"), container, mainOptions.particles);
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

    particlesOptions.load(overrideOptions);
    particlesOptions.load((_a = this.shapeData) === null || _a === void 0 ? void 0 : _a.particles);
    this.interactivity = new Interactivity(engine, container);
    this.interactivity.load(container.actualOptions.interactivity);
    this.interactivity.load(particlesOptions.interactivity);
    this.fill = (_c = (_b = this.shapeData) === null || _b === void 0 ? void 0 : _b.fill) !== null && _c !== void 0 ? _c : this.fill;
    this.close = (_e = (_d = this.shapeData) === null || _d === void 0 ? void 0 : _d.close) !== null && _e !== void 0 ? _e : this.close;
    this.options = particlesOptions;
    const pathOptions = this.options.move.path;
    this.pathDelay = getValue(pathOptions.delay) * 1000;

    if (pathOptions.generator) {
      this.pathGenerator = Particle_classPrivateFieldGet(this, _Particle_engine, "f").plugins.getPathGenerator(pathOptions.generator);

      if (this.pathGenerator && container.addPath(pathOptions.generator, this.pathGenerator)) {
        this.pathGenerator.init(container);
      }
    }

    const zIndexValue = getRangeValue(this.options.zIndex.value);
    container.retina.initParticle(this);
    /* size */

    const sizeOptions = this.options.size,
          sizeRange = sizeOptions.value,
          sizeAnimation = sizeOptions.animation;
    this.size = {
      enable: sizeOptions.animation.enable,
      value: getRangeValue(sizeOptions.value) * container.retina.pixelRatio,
      max: getRangeMax(sizeRange) * pxRatio,
      min: getRangeMin(sizeRange) * pxRatio,
      loops: 0,
      maxLoops: getRangeValue(sizeOptions.animation.count)
    };

    if (sizeAnimation.enable) {
      this.size.status = 0
      /* AnimationStatus.increasing */
      ;
      this.size.decay = 1 - getRangeValue(sizeAnimation.decay);

      switch (sizeAnimation.startValue) {
        case "min"
        /* StartValueType.min */
        :
          this.size.value = this.size.min;
          this.size.status = 0
          /* AnimationStatus.increasing */
          ;
          break;

        case "random"
        /* StartValueType.random */
        :
          this.size.value = randomInRange(this.size) * pxRatio;
          this.size.status = getRandom() >= 0.5 ? 0
          /* AnimationStatus.increasing */
          : 1
          /* AnimationStatus.decreasing */
          ;
          break;

        case "max"
        /* StartValueType.max */
        :
        default:
          this.size.value = this.size.max;
          this.size.status = 1
          /* AnimationStatus.decreasing */
          ;
          break;
      }

      this.size.velocity = ((_f = this.retina.sizeAnimationSpeed) !== null && _f !== void 0 ? _f : container.retina.sizeAnimationSpeed) / 100 * container.retina.reduceFactor;

      if (!sizeAnimation.sync) {
        this.size.velocity *= getRandom();
      }
    }
    /* position */


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
      case "inside"
      /* MoveDirection.inside */
      :
        this.outType = "inside"
        /* ParticleOutType.inside */
        ;
        break;

      case "outside"
      /* MoveDirection.outside */
      :
        this.outType = "outside"
        /* ParticleOutType.outside */
        ;
        break;
    }
    /* animation - velocity for speed */


    this.initialVelocity = this.calculateVelocity();
    this.velocity = this.initialVelocity.copy();
    this.moveDecay = 1 - getRangeValue(this.options.move.decay);
    /* parallax */

    this.offset = Vector.origin;
    const particles = container.particles;
    particles.needsSort = particles.needsSort || particles.lastZIndex < this.position.z;
    particles.lastZIndex = this.position.z; // Scale z-index factor

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
      (_g = updater.init) === null || _g === void 0 ? void 0 : _g.call(updater, this);
    }

    for (const mover of container.particles.movers) {
      (_h = mover.init) === null || _h === void 0 ? void 0 : _h.call(mover, this);
    }

    if (drawer === null || drawer === void 0 ? void 0 : drawer.particleInit) {
      drawer.particleInit(container, this);
    }

    for (const [, plugin] of container.plugins) {
      (_j = plugin.particleCreated) === null || _j === void 0 ? void 0 : _j.call(plugin, this);
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

    if (destroyOptions.mode === "split"
    /* DestroyMode.split */
    ) {
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
      const backFactor = this.roll.horizontal && this.roll.vertical ? 2 : 1,
            backSum = this.roll.horizontal ? Math.PI / 2 : 0,
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
    const radius = this.getRadius(),
          canvasSize = this.container.canvas.size;
    return this.position.x >= -radius && this.position.y >= -radius && this.position.y <= canvasSize.height + radius && this.position.x <= canvasSize.width + radius;
  }

  isVisible() {
    return !this.destroyed && !this.spawning && this.isInsideCanvas();
  }
  /**
   * This method is used when the particle has lost a life and needs some value resets
   */


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

    const canvasSize = container.canvas.size,
          exactPosition = calcExactPositionOrRandomFromSize({
      size: canvasSize,
      position: position
    }),
          pos = Vector3d.create(exactPosition.x, exactPosition.y, zIndex),
          radius = this.getRadius(),

    /* check position - into the canvas */
    outModes = this.options.move.outModes,
          fixHorizontal = outMode => {
      fixOutMode({
        outMode,
        checkModes: ["bounce"
        /* OutMode.bounce */
        , "bounce-horizontal"
        /* OutMode.bounceHorizontal */
        ],
        coord: pos.x,
        maxCoord: container.canvas.size.width,
        setCb: value => pos.x += value,
        radius
      });
    },
          fixVertical = outMode => {
      fixOutMode({
        outMode,
        checkModes: ["bounce"
        /* OutMode.bounce */
        , "bounce-vertical"
        /* OutMode.bounceVertical */
        ],
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

  calculateVelocity() {
    const baseVelocity = getParticleBaseVelocity(this.direction);
    const res = baseVelocity.copy();
    const moveOptions = this.options.move;

    if (moveOptions.direction === "inside"
    /* MoveDirection.inside */
    || moveOptions.direction === "outside"
    /* MoveDirection.outside */
    ) {
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
      res.length *= getRandom();
    }

    return res;
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

    const rate = getValue(splitOptions.rate),
          particlesSplitOptions = splitOptions.particles instanceof Array ? itemFromArray(splitOptions.particles) : splitOptions.particles;

    for (let i = 0; i < rate; i++) {
      this.container.particles.addSplitParticle(this, particlesSplitOptions);
    }
  }

}
_Particle_engine = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/Core/Utils/Point.js
/**
 * @category Utils
 */
class Point {
  /**
   * The point constructor, initializing its position
   * @param position the point position
   * @param particle the particle assigned to this point
   */
  constructor(position, particle) {
    this.position = position;
    this.particle = particle;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/Utils/Range.js
/**
 * @category Utils
 */
class Range {
  /**
   * Range constructor, initializes the position
   * @param x X coordinate of the position
   * @param y Y coordinate of the position
   * @protected
   */
  constructor(x, y) {
    this.position = {
      x: x,
      y: y
    };
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/Utils/Circle.js


/**
 * @category Utils
 */

class Circle extends Range {
  /**
   * Circle constructor, initialized position and radius
   * @param x X coordinate of the position
   * @param y Y coordinate of the position
   * @param radius Circle's radius
   */
  constructor(x, y, radius) {
    super(x, y);
    this.radius = radius;
  }
  /**
   * Check if the given point is inside the circle
   * @param point the point to check
   * @returns true or false, checking if the given point is inside the circle
   */


  contains(point) {
    return getDistance(point, this.position) <= this.radius;
  }
  /**
   * Check if the given range intersects the circle
   * @param range the range to check
   * @returns true or false, checking if the range is intersecting with the circle
   */


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
;// CONCATENATED MODULE: ./dist/browser/Core/Utils/Rectangle.js

/**
 * @category Utils
 */

class Rectangle extends Range {
  /**
   * The rectangle constructor, initializes position and size
   * @param x X coordinate of the position
   * @param y Y coordinate of the position
   * @param width Rectangle width
   * @param height Rectangle height
   */
  constructor(x, y, width, height) {
    super(x, y);
    this.size = {
      height: height,
      width: width
    };
  }
  /**
   * Check if the given point is inside the rectangle
   * @param point the point to check
   * @returns true or false, checking if the given point is inside the rectangle
   */


  contains(point) {
    const w = this.size.width,
          h = this.size.height,
          pos = this.position;
    return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;
  }
  /**
   * Check if another range intersects the rectangle
   * @param range the range to check
   * @returns true or false, checking if the range is intersecting with the rectangle
   */


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
;// CONCATENATED MODULE: ./dist/browser/Core/Utils/CircleWarp.js


/**
 * @category Utils
 */

class CircleWarp extends Circle {
  /**
   * Circle constructor, initialized position and radius
   * @param x X coordinate of the position
   * @param y Y coordinate of the position
   * @param radius Circle's radius
   * @param canvasSize the canvas size, used for warp formulas
   */
  constructor(x, y, radius, canvasSize) {
    super(x, y, radius);
    this.canvasSize = canvasSize;
    this.canvasSize = Object.assign({}, canvasSize);
  }
  /**
   * Check if the given point is inside the circle
   * @param point the point to check
   * @returns true or false, checking if the given point is inside the circle
   */


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
  /**
   * Check if the given range intersects the circle
   * @param range the range to check
   * @returns true or false, checking if the range is intersecting with the circle
   */


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
;// CONCATENATED MODULE: ./dist/browser/Core/Utils/QuadTree.js




/**
 * @category Utils
 */

class QuadTree {
  /**
   * Initializes the instance with a rectangle and a capacity
   * @param rectangle the instance rectangle area
   * @param capacity the points capacity
   */
  constructor(rectangle, capacity) {
    this.rectangle = rectangle;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }
  /**
   * Inserts the given point in the instance, or to its subtrees
   * @param point the point to insert
   * @returns true if the point is added to the instance or one of its subtrees, false if it's not
   */


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
  /**
   * Queries the instance using a [[Rectangle]] object, with the given position and the given size
   * @param range the range to use for querying the tree
   * @param check the function to check if the particle can be added to the result
   * @param found found particles array, output parameter
   * @returns the particles inside the given range
   */


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
  /**
   * Queries the instance using a [[Circle]] object, with the given position and the given radius
   * @param position the circle position
   * @param radius the circle radius
   * @param check the function to check if the particle can be added to the result
   * @returns the particles inside the given circle
   */


  queryCircle(position, radius, check) {
    return this.query(new Circle(position.x, position.y, radius), check);
  }
  /**
   * Queries the instance using a [[CircleWarp]] object, with the given position and the given radius
   * @param position the circle position
   * @param radius the circle radius
   * @param containerOrSize the container canvas size
   * @param check the function to check if the particle can be added to the result
   * @returns the particles inside the given circle
   */


  queryCircleWarp(position, radius, containerOrSize, check) {
    const container = containerOrSize,
          size = containerOrSize;
    return this.query(new CircleWarp(position.x, position.y, radius, container.canvas !== undefined ? container.canvas.size : size), check);
  }
  /**
   * Queries the instance using a [[Rectangle]] object, with the given position and the given size
   * @param position the rectangle position
   * @param size the rectangle size
   * @param check the function to check if the particle can be added to the result
   * @returns the particles inside the given rectangle
   */


  queryRectangle(position, size, check) {
    return this.query(new Rectangle(position.x, position.y, size.width, size.height), check);
  }
  /**
   * Creates the subtrees, making the instance a branch
   */


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
;// CONCATENATED MODULE: ./dist/browser/Core/Particles.js
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








/**
 * Particles manager object
 * @category Core
 */

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
    this.quadTree = new QuadTree(new Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, canvasSize.width * 3 / 2, canvasSize.height * 3 / 2), 4);
    this.movers = Particles_classPrivateFieldGet(this, _Particles_engine, "f").plugins.getMovers(container, true);
    this.updaters = Particles_classPrivateFieldGet(this, _Particles_engine, "f").plugins.getUpdaters(container, true);
  }

  get count() {
    return this.array.length;
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

  addParticle(position, overrideOptions, group) {
    const container = this.container,
          options = container.actualOptions,
          limit = options.particles.number.limit;

    if (limit > 0) {
      const countToRemove = this.count + 1 - limit;

      if (countToRemove > 0) {
        this.removeQuantity(countToRemove);
      }
    }

    return this.pushParticle(position, overrideOptions, group);
  }

  addSplitParticle(parent, splitParticlesOptions) {
    const splitOptions = parent.options.destroy.split,
          options = loadParticlesOptions(Particles_classPrivateFieldGet(this, _Particles_engine, "f"), this.container, parent.options),
          factor = getValue(splitOptions.factor);
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
  /**
   * Removes all particles from the array
   */


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
    const container = this.container,
          canvasSize = this.container.canvas.size;
    this.quadTree = new QuadTree(new Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, canvasSize.width * 3 / 2, canvasSize.height * 3 / 2), 4);
    /* clear canvas */

    container.canvas.clear();
    /* update each particles param */

    await this.update(delta);

    if (this.needsSort) {
      this.zArray.sort((a, b) => b.position.z - a.position.z || a.id - b.id);
      this.lastZIndex = this.zArray[this.zArray.length - 1].position.z;
      this.needsSort = false;
    }
    /* draw polygon shape in debug mode */


    for (const [, plugin] of container.plugins) {
      container.canvas.drawPlugin(plugin, delta);
    }
    /*if (container.canvas.context) {
        this.quadTree.draw(container.canvas.context);
    }*/

    /* draw each particle */


    for (const p of this.zArray) {
      p.draw(delta);
    }
  }

  getLinkFrequency(p1, p2) {
    const range = setRangeValue(p1.id, p2.id),
          key = `${getRangeMin(range)}_${getRangeMax(range)}`;
    let res = this.freqs.links.get(key);

    if (res === undefined) {
      res = getRandom();
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
      res = getRandom();
      this.freqs.triangles.set(key, res);
    }

    return res;
  }

  handleClickMode(mode) {
    this.interactionManager.handleClickMode(mode);
  }
  /* --------- tsParticles functions - particles ----------- */


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

    this.interactionManager.init();

    for (const [, pathGenerator] of container.pathGenerators) {
      pathGenerator.init(container);
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

      Particles_classPrivateFieldGet(this, _Particles_engine, "f").dispatchEvent("particleRemoved"
      /* EventType.particleRemoved */
      , {
        container: this.container,
        data: {
          particle
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
    var _a, _b;

    const container = this.container,
          particlesToDelete = [];

    for (const [, pathGenerator] of container.pathGenerators) {
      pathGenerator.update();
    }

    for (const [, plugin] of container.plugins) {
      (_a = plugin.update) === null || _a === void 0 ? void 0 : _a.call(plugin, delta);
    }

    for (const particle of this.array) {
      // let d = ( dx = container.interactivity.mouse.click_pos_x - p.x ) * dx +
      //         ( dy = container.interactivity.mouse.click_pos_y - p.y ) * dy;
      // let f = -BANG_SIZE / d;
      // if ( d < BANG_SIZE ) {
      //     let t = Math.atan2( dy, dx );
      //     p.vx = f * Math.cos(t);
      //     p.vy = f * Math.sin(t);
      // }
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

        (_b = plugin.particleUpdate) === null || _b === void 0 ? void 0 : _b.call(plugin, particle, delta);
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

    await this.interactionManager.externalInteract(delta); // this loop is required to be done after mouse interactions

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

      Particles_classPrivateFieldGet(this, _Particles_engine, "f").dispatchEvent("particleAdded"
      /* EventType.particleAdded */
      , {
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
;// CONCATENATED MODULE: ./dist/browser/Core/Retina.js


/**
 * @category Core
 */

class Retina {
  constructor(container) {
    this.container = container;
  }
  /**
   * Initializes all the values needing a pixel ratio factor (sizes, widths, distances)
   */


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
          // Check if the media query matches or is not available.
          this.handleMotionChange(mediaQuery); // Ads an event listener to check for changes in the media query's value.

          const handleChange = () => {
            this.handleMotionChange(mediaQuery);
            container.refresh().catch(() => {// ignore
            });
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
    this.sizeAnimationSpeed = getRangeValue(particles.size.animation.speed) * ratio;
    this.maxSpeed = getRangeValue(particles.move.gravity.maxSpeed) * ratio;
    const modes = options.interactivity.modes;
    this.slowModeRadius = modes.slow.radius * ratio;
  }

  initParticle(particle) {
    const options = particle.options,
          ratio = this.pixelRatio,
          moveDistance = options.move.distance,
          props = particle.retina;
    props.attractDistance = getRangeValue(options.move.attract.distance) * ratio;
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
;// CONCATENATED MODULE: ./dist/browser/Core/Container.js
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

var _Container_engine, _Container_eventListeners, _Container_intersectionObserver, _Container_options, _Container_sourceOptions;
/**
 * [[include:Container.md]]
 * @packageDocumentation
 */











/**
 * Checks if the container is still usable
 * @param container the container to check
 * @returns true if the container is still usable
 */

function guardCheck(container) {
  return container !== undefined && !container.destroyed;
}

function loadContainerOptions(engine, container, ...sourceOptionsArr) {
  const options = new Options(engine, container);
  loadOptions(options, ...sourceOptionsArr);
  return options;
}

const defaultPathGeneratorKey = "default",
      defaultPathGenerator = {
  generate: p => {
    const v = p.velocity.copy();
    v.angle += v.length * Math.PI / 180;
    return v;
  },
  init: () => {// nothing required
  },
  update: () => {// nothing required
  }
};
/**
 * The object loaded into an HTML element, it'll contain options loaded and all data to let everything working
 * [[include:Container.md]]
 * @category Core
 */

class Container {
  /**
   * This is the core class, create an instance to have a new working particles manager
   * @constructor
   * @param engine the engine used by container
   * @param id the id to identify this instance
   * @param sourceOptions the options to load
   */
  constructor(engine, id, sourceOptions) {
    this.id = id;

    _Container_engine.set(this, void 0);

    _Container_eventListeners.set(this, void 0);

    _Container_intersectionObserver.set(this, void 0);

    _Container_options.set(this, void 0);

    _Container_sourceOptions.set(this, void 0);

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

    Container_classPrivateFieldSet(this, _Container_sourceOptions, sourceOptions, "f");

    this._initialSourceOptions = sourceOptions;
    this.retina = new Retina(this);
    this.canvas = new Canvas(this);
    this.particles = new Particles(Container_classPrivateFieldGet(this, _Container_engine, "f"), this);
    this.frameManager = new FrameManager(this);
    this.pathGenerators = new Map();
    this.interactivity = {
      mouse: {
        clicking: false,
        inside: false
      }
    };
    this.plugins = new Map();
    this.drawers = new Map();
    /* tsParticles variables with default values */

    Container_classPrivateFieldSet(this, _Container_options, loadContainerOptions(Container_classPrivateFieldGet(this, _Container_engine, "f"), this), "f");

    this.actualOptions = loadContainerOptions(Container_classPrivateFieldGet(this, _Container_engine, "f"), this);
    /* ---------- tsParticles - start ------------ */

    Container_classPrivateFieldSet(this, _Container_eventListeners, new EventListeners(this), "f");

    if (typeof IntersectionObserver !== "undefined" && IntersectionObserver) {
      Container_classPrivateFieldSet(this, _Container_intersectionObserver, new IntersectionObserver(entries => this.intersectionManager(entries)), "f");
    }

    Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerBuilt"
    /* EventType.containerBuilt */
    , {
      container: this
    });
  }
  /**
   * The options used by the container, it's a full [[Options]] object
   */


  get options() {
    return Container_classPrivateFieldGet(this, _Container_options, "f");
  }
  /**
   * The options that were initially passed to the container
   */


  get sourceOptions() {
    return Container_classPrivateFieldGet(this, _Container_sourceOptions, "f");
  }
  /**
   * Adds a click handler to the container
   * @param callback the callback to be called when the click event occurs
   */


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

      const pxRatio = this.retina.pixelRatio,
            posRetina = {
        x: pos.x * pxRatio,
        y: pos.y * pxRatio
      },
            particles = this.particles.quadTree.queryCircle(posRetina, radius * pxRatio);
      callback(e, particles);
    };

    const clickHandler = e => {
      if (!guardCheck(this)) {
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
  /**
   * Add a new path generator to the container
   * @param key the key to identify the path generator
   * @param generator the path generator
   * @param override if true, override the existing path generator
   */


  addPath(key, generator, override = false) {
    if (!guardCheck(this) || !override && this.pathGenerators.has(key)) {
      return false;
    }

    this.pathGenerators.set(key, generator !== null && generator !== void 0 ? generator : defaultPathGenerator);
    return true;
  }
  /**
   * Destroys the current container, invalidating it
   */


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

    Container_classPrivateFieldGet(this, _Container_engine, "f").plugins.destroy(this);

    this.destroyed = true;

    const mainArr = Container_classPrivateFieldGet(this, _Container_engine, "f").dom(),
          idx = mainArr.findIndex(t => t === this);

    if (idx >= 0) {
      mainArr.splice(idx, 1);
    }

    Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerDestroyed"
    /* EventType.containerDestroyed */
    , {
      container: this
    });
  }
  /**
   * Draws a frame
   */


  draw(force) {
    if (!guardCheck(this)) {
      return;
    }

    let refreshTime = force;
    this.drawAnimationFrame = animate()(async timestamp => {
      if (refreshTime) {
        this.lastFrameTime = undefined;
        refreshTime = false;
      }

      await this.frameManager.nextFrame(timestamp);
    });
  }
  /**
   * Exports the current configuration using `options` property
   * @returns a JSON string created from `options` property
   */


  exportConfiguration() {
    return JSON.stringify(this.actualOptions, undefined, 2);
  }
  /**
   * Exports the current canvas image, `background` property of `options` won't be rendered because it's css related
   * @param callback The callback to handle the image
   * @param type The exported image type
   * @param quality The exported image quality
   */


  exportImage(callback, type, quality) {
    var _a;

    return (_a = this.canvas.element) === null || _a === void 0 ? void 0 : _a.toBlob(callback, type !== null && type !== void 0 ? type : "image/png", quality);
  }
  /**
   * @deprecated this method is deprecated, please use the exportImage method
   * @param callback The callback to handle the image
   */


  exportImg(callback) {
    this.exportImage(callback);
  }
  /**
   * Gets the animation status
   * @returns `true` is playing, `false` is paused
   */


  getAnimationStatus() {
    return !this.paused && !this.pageHidden && guardCheck(this);
  }
  /**
   * Handles click event in the container
   * @param mode click mode to handle
   */


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
  /**
   * Initializes the container
   */


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
    /* options settings */


    Container_classPrivateFieldSet(this, _Container_options, loadContainerOptions(Container_classPrivateFieldGet(this, _Container_engine, "f"), this, this._initialSourceOptions, this.sourceOptions), "f");

    this.actualOptions = loadContainerOptions(Container_classPrivateFieldGet(this, _Container_engine, "f"), this, Container_classPrivateFieldGet(this, _Container_options, "f"));
    /* init canvas + particles */

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

    Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerInit"
    /* EventType.containerInit */
    , {
      container: this
    });

    this.particles.init();
    this.particles.setDensity();

    for (const [, plugin] of this.plugins) {
      if (plugin.particlesSetup !== undefined) {
        plugin.particlesSetup();
      }
    }

    Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("particlesSetup"
    /* EventType.particlesSetup */
    , {
      container: this
    });
  }
  /**
   * Loads the given theme, overriding the options
   * @param name the theme name, if `undefined` resets the default options or the default theme
   */


  async loadTheme(name) {
    if (!guardCheck(this)) {
      return;
    }

    this.currentTheme = name;
    await this.refresh();
  }
  /**
   * Pauses animations
   */


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

    Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerPaused"
    /* EventType.containerPaused */
    , {
      container: this
    });
  }
  /**
   * Starts animations and resume from pause
   * @param force
   */


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

    Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerPlay"
    /* EventType.containerPlay */
    , {
      container: this
    });

    this.draw(needsUpdate || false);
  }
  /**
   * Restarts the container, just a [[stop]]/[[start]] alias
   */


  async refresh() {
    if (!guardCheck(this)) {
      return;
    }
    /* restart */


    this.stop();
    return this.start();
  }

  async reset() {
    if (!guardCheck(this)) {
      return;
    }

    Container_classPrivateFieldSet(this, _Container_options, loadContainerOptions(Container_classPrivateFieldGet(this, _Container_engine, "f"), this), "f");

    return this.refresh();
  }
  /**
   * Customise path generation
   * @deprecated Use the new setPath
   * @param noiseOrGenerator the [[IMovePathGenerator]] object or a function that generates a [[Vector]] object from [[Particle]]
   * @param init the [[IMovePathGenerator]] init function, if the first parameter is a generator function
   * @param update the [[IMovePathGenerator]] update function, if the first parameter is a generator function
   */


  setNoise(noiseOrGenerator, init, update) {
    if (!guardCheck(this)) {
      return;
    }

    this.setPath(noiseOrGenerator, init, update);
  }
  /**
   * Customise path generation
   * @deprecated Use the new addPath
   * @param pathOrGenerator the [[IMovePathGenerator]] object or a function that generates a [[Vector]] object from [[Particle]]
   * @param init the [[IMovePathGenerator]] init function, if the first parameter is a generator function
   * @param update the [[IMovePathGenerator]] update function, if the first parameter is a generator function
   */


  setPath(pathOrGenerator, init, update) {
    if (!pathOrGenerator || !guardCheck(this)) {
      return;
    }

    const pathGenerator = Object.assign({}, defaultPathGenerator);

    if (typeof pathOrGenerator === "function") {
      pathGenerator.generate = pathOrGenerator;

      if (init) {
        pathGenerator.init = init;
      }

      if (update) {
        pathGenerator.update = update;
      }
    } else {
      const oldGenerator = pathGenerator;
      pathGenerator.generate = pathOrGenerator.generate || oldGenerator.generate;
      pathGenerator.init = pathOrGenerator.init || oldGenerator.init;
      pathGenerator.update = pathOrGenerator.update || oldGenerator.update;
    }

    this.addPath(defaultPathGeneratorKey, pathGenerator, true);
  }
  /**
   * Starts the container, initializes what are needed to create animations and event handling
   */


  async start() {
    if (this.started || !guardCheck(this)) {
      return;
    }

    await this.init();
    this.started = true;

    Container_classPrivateFieldGet(this, _Container_eventListeners, "f").addListeners();

    if (this.interactivity.element instanceof HTMLElement && Container_classPrivateFieldGet(this, _Container_intersectionObserver, "f")) {
      Container_classPrivateFieldGet(this, _Container_intersectionObserver, "f").observe(this.interactivity.element);
    }

    for (const [, plugin] of this.plugins) {
      if (plugin.startAsync !== undefined) {
        await plugin.startAsync();
      } else if (plugin.start !== undefined) {
        plugin.start();
      }
    }

    Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerStarted"
    /* EventType.containerStarted */
    , {
      container: this
    });

    this.play();
  }
  /**
   * Stops the container, opposite to `start`. Clears some resources and stops events.
   */


  stop() {
    var _a;

    if (!this.started || !guardCheck(this)) {
      return;
    }

    this.firstStart = true;
    this.started = false;

    Container_classPrivateFieldGet(this, _Container_eventListeners, "f").removeListeners();

    this.pause();
    this.particles.clear();
    this.canvas.clear();

    if (this.interactivity.element instanceof HTMLElement && Container_classPrivateFieldGet(this, _Container_intersectionObserver, "f")) {
      Container_classPrivateFieldGet(this, _Container_intersectionObserver, "f").unobserve(this.interactivity.element);
    }

    for (const [, plugin] of this.plugins) {
      (_a = plugin.stop) === null || _a === void 0 ? void 0 : _a.call(plugin);
    }

    for (const key of this.plugins.keys()) {
      this.plugins.delete(key);
    }

    Container_classPrivateFieldSet(this, _Container_sourceOptions, Container_classPrivateFieldGet(this, _Container_options, "f"), "f");

    Container_classPrivateFieldGet(this, _Container_engine, "f").dispatchEvent("containerStopped"
    /* EventType.containerStopped */
    , {
      container: this
    });
  }
  /**
   * Updates the container options
   */


  updateActualOptions() {
    this.actualOptions.responsive = [];
    const newMaxWidth = this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, Container_classPrivateFieldGet(this, _Container_options, "f"));
    this.actualOptions.setTheme(this.currentTheme);

    if (this.responsiveMaxWidth != newMaxWidth) {
      this.responsiveMaxWidth = newMaxWidth;
      return true;
    }

    return false;
  }

  intersectionManager(entries) {
    if (!guardCheck(this) || !this.actualOptions.pauseOnOutsideViewport) {
      return;
    }

    for (const entry of entries) {
      if (entry.target !== this.interactivity.element) {
        continue;
      }

      (entry.isIntersecting ? this.play : this.pause)();
    }
  }

}
_Container_engine = new WeakMap(), _Container_eventListeners = new WeakMap(), _Container_intersectionObserver = new WeakMap(), _Container_options = new WeakMap(), _Container_sourceOptions = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/Core/Loader.js
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





/**
 * Default fetch error catcher
 * @param statusCode the fecth status code error
 */

function fetchError(statusCode) {
  console.error(`tsParticles - Error ${statusCode} while retrieving config file`);
}

async function getDataFromUrl(jsonUrl, index) {
  const url = jsonUrl instanceof Array ? itemFromArray(jsonUrl, index) : jsonUrl;

  if (!url) {
    return;
  }

  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }

  fetchError(response.status);
}
/**
 * Main class for creating the [[Container]] objects
 * @category Core
 */


class Loader {
  /**
   * Loader constructor, assigns the engine
   * @param engine the engine containing this Loader instance
   */
  constructor(engine) {
    /**
     * The engine containing this Loader instance
     * @private
     */
    _Loader_engine.set(this, void 0);

    Loader_classPrivateFieldSet(this, _Loader_engine, engine, "f");
  }
  /**
   * Loads the provided options to create a [[Container]] object.
   * @param tagId the particles container element id
   * @param options the options object to initialize the [[Container]]
   * @param index if an options array is provided, this will retrieve the exact index of that array
   */


  load(tagId, options, index) {
    const params = {
      index,
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
  /**
   * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
   * This method is async, so if you need a callback refer to JavaScript function `fetch`
   * @param tagId the particles container element id
   * @param jsonUrl the json path (or paths array) to use in the GET request
   * @param index the index of the paths array, if a single path is passed this value is ignored
   * @returns A Promise with the [[Container]] object created
   */


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
      index,
      remote: true
    });
  }
  /**
   * Starts an animation in a container, starting from the given options
   * @param params all the parameters required for loading options in the current animation
   */


  async loadOptions(params) {
    var _a, _b, _c;

    const tagId = (_a = params.tagId) !== null && _a !== void 0 ? _a : `tsparticles${Math.floor(getRandom() * 10000)}`,
          {
      index,
      url: jsonUrl,
      remote
    } = params,
          options = remote ? await getDataFromUrl(jsonUrl, index) : params.options;
    /* elements */

    let domContainer = (_b = params.element) !== null && _b !== void 0 ? _b : document.getElementById(tagId);

    if (!domContainer) {
      domContainer = document.createElement("div");
      domContainer.id = tagId;
      (_c = document.querySelector("body")) === null || _c === void 0 ? void 0 : _c.append(domContainer);
    }

    const currentOptions = options instanceof Array ? itemFromArray(options, index) : options,
          dom = Loader_classPrivateFieldGet(this, _Loader_engine, "f").dom(),
          oldIndex = dom.findIndex(v => v.id === tagId);

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
      /* get existing canvas if present, otherwise a new one will be created */

      if (existingCanvases.length) {
        canvasEl = existingCanvases[0];
        canvasEl.dataset[generatedAttribute] = "false";
      } else {
        /* create canvas element */
        canvasEl = document.createElement("canvas");
        canvasEl.dataset[generatedAttribute] = "true";
        /* append canvas */

        domContainer.appendChild(canvasEl);
      }
    }

    if (!canvasEl.style.width) {
      canvasEl.style.width = "100%";
    }

    if (!canvasEl.style.height) {
      canvasEl.style.height = "100%";
    }
    /* launch tsParticles */


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
  /**
   * Starts an animation in a container, starting from the given remote options
   * @param params all the parameters required for loading a remote url into options in the current animation
   */


  async loadRemoteOptions(params) {
    return this.loadOptions(params);
  }
  /**
   * Loads the provided options to create a [[Container]] object.
   * @param id the particles container element id
   * @param domContainer the dom container
   * @param options the options object to initialize the [[Container]]
   * @param index if an options array is provided, this will retrieve the exact index of that array
   */


  async set(id, domContainer, options, index) {
    const params = {
      index,
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
  /**
   * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
   * This method is async, so if you need a callback refer to JavaScript function `fetch`
   * @param id the particles container element id
   * @param domContainer the container used to contains the particles
   * @param jsonUrl the json path (or paths array) to use in the GET request
   * @param index the index of the paths array, if a single path is passed this value is ignored
   * @returns A Promise with the [[Container]] object created
   */


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
      element,
      remote: true
    });
  }

}
_Loader_engine = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/Core/Utils/Plugins.js
var Plugins_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var _Plugins_engine;
/**
 * @category Utils
 */


class Plugins {
  /**
   * The constructor of the plugin manager
   * @param engine the parent engine
   */
  constructor(engine) {
    /**
     * The engine used for registering plugins
     * @private
     */
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
  /**
   * Adds an interaction manager to the current collection
   * @param name the interaction manager name
   * @param initInteractor the interaction manager initializer
   */


  addInteractor(name, initInteractor) {
    this.interactorsInitializers.set(name, initInteractor);
  }

  addParticleMover(name, initMover) {
    this.moversInitializers.set(name, initMover);
  }
  /**
   * Adds a particle updater to the collection
   * @param name the particle updater name used as a key
   * @param initUpdater the particle updater initializer
   */


  addParticleUpdater(name, initUpdater) {
    this.updatersInitializers.set(name, initUpdater);
  }
  /**
   * Adds a path generator to the current collection
   * @param type the type used as a key in the collection
   * @param pathGenerator the path generator to add
   */


  addPathGenerator(type, pathGenerator) {
    if (!this.getPathGenerator(type)) {
      this.pathGenerators.set(type, pathGenerator);
    }
  }
  /**
   * Adds a plugin to the plugin system, if the plugin already exists, is not added
   * @param plugin the plugin to add
   */


  addPlugin(plugin) {
    if (!this.getPlugin(plugin.id)) {
      this.plugins.push(plugin);
    }
  }
  /**
   * Adds a preset to the existing collection
   * @param presetKey the preset name
   * @param options the options to load with the preset name
   * @param override if true, overwrites the existing preset
   */


  addPreset(presetKey, options, override = false) {
    if (override || !this.getPreset(presetKey)) {
      this.presets.set(presetKey, options);
    }
  }
  /**
   * Adds a shape drawer (additional particle shape) to the current collection
   * @param type the shape drawer type (particle shape name)
   * @param drawer the shape drawer
   */


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
  /**
   * Gets all the available plugins, for the specified container
   * @param container the container used to check which are the valid plugins
   * @returns a map containing all enabled plugins, with the id as a key
   */


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
  /**
   * Returns all the container interaction managers
   * @param container the container used to check which interaction managers are compatible
   * @param force if true reloads the interaction managers collection for the given container
   * @returns the array of interaction managers for the given container
   */


  getInteractors(container, force = false) {
    let res = this.interactors.get(container);

    if (!res || force) {
      res = [...this.interactorsInitializers.values()].map(t => t(container));
      this.interactors.set(container, res);
    }

    return res;
  }

  getMovers(container, force = false) {
    let res = this.movers.get(container);

    if (!res || force) {
      res = [...this.moversInitializers.values()].map(t => t(container));
      this.movers.set(container, res);
    }

    return res;
  }
  /**
   * Searches the path generator with the given type name
   * @param type the path generator type to search
   * @returns the path generator if found, or undefined
   */


  getPathGenerator(type) {
    return this.pathGenerators.get(type);
  }
  /**
   * Searches if the specified plugin exists and returns it
   * @param plugin the plugin name
   * @returns the plugin if found, or undefined
   */


  getPlugin(plugin) {
    return this.plugins.find(t => t.id === plugin);
  }
  /**
   * Searches the preset with the given name
   * @param preset the preset name to search
   * @returns the preset if found, or undefined
   */


  getPreset(preset) {
    return this.presets.get(preset);
  }
  /**
   * Searches the given shape drawer type with the given type name
   * @param type the shape drawer type name
   * @returns the shape drawer if found, or undefined
   */


  getShapeDrawer(type) {
    return this.drawers.get(type);
  }
  /**
   * This method returns all the supported shapes with this Plugins instance
   * @returns all the supported shapes type name
   */


  getSupportedShapes() {
    return this.drawers.keys();
  }
  /**
   * Returns all the container particle updaters
   * @param container the container used to check which particle updaters are enabled
   * @param force if true reloads the updater collection for the given container
   * @returns the array of updaters for the given container
   */


  getUpdaters(container, force = false) {
    let res = this.updaters.get(container);

    if (!res || force) {
      res = [...this.updatersInitializers.values()].map(t => t(container));
      this.updaters.set(container, res);
    }

    return res;
  }
  /**
   * Load the given options for all the plugins
   * @param options the actual options to set
   * @param sourceOptions the source options to read
   */


  loadOptions(options, sourceOptions) {
    for (const plugin of this.plugins) {
      plugin.loadOptions(options, sourceOptions);
    }
  }
  /**
   * Load the given particles options for all the updaters
   * @param container the container of the updaters
   * @param options the actual options to set
   * @param sourceOptions the source options to read
   */


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
_Plugins_engine = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/engine.js
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

var _Engine_domArray, _Engine_eventDispatcher, _Engine_initialized, _Engine_loader;




/**
 * Engine class for creating the singleton on window.
 * It's a singleton proxy to the Loader class for initializing [[Container]] instances,
 * and for Plugins class responsible for every external feature
 * @category Engine
 */

class Engine {
  /**
   * Engine constructor, initializes plugins, loader and the containers array
   */
  constructor() {
    /**
     * Contains all the [[Container]] instances of the current engine instance
     */
    _Engine_domArray.set(this, void 0);

    _Engine_eventDispatcher.set(this, void 0);
    /**
     * Checks if the engine instance is initialized
     */


    _Engine_initialized.set(this, void 0);
    /**
     * Contains the [[Loader]] engine instance
     * @private
     */


    _Engine_loader.set(this, void 0);

    engine_classPrivateFieldSet(this, _Engine_domArray, [], "f");

    engine_classPrivateFieldSet(this, _Engine_eventDispatcher, new EventDispatcher(), "f");

    engine_classPrivateFieldSet(this, _Engine_initialized, false, "f");

    engine_classPrivateFieldSet(this, _Engine_loader, new Loader(this), "f");

    this.plugins = new Plugins(this);
  }
  /**
   * Adds a listener to the specified event
   * @param type The event to listen to
   * @param listener The listener of the specified event
   */


  addEventListener(type, listener) {
    engine_classPrivateFieldGet(this, _Engine_eventDispatcher, "f").addEventListener(type, listener);
  }
  /**
   *
   * @param name
   * @param interactorInitializer
   */


  async addInteractor(name, interactorInitializer) {
    this.plugins.addInteractor(name, interactorInitializer);
    await this.refresh();
  }

  async addMover(name, moverInitializer) {
    this.plugins.addParticleMover(name, moverInitializer);
    await this.refresh();
  }
  /**
   *
   * @param name
   * @param updaterInitializer
   */


  async addParticleUpdater(name, updaterInitializer) {
    this.plugins.addParticleUpdater(name, updaterInitializer);
    await this.refresh();
  }
  /**
   * addPathGenerator adds a named path generator to tsParticles, this can be called by options
   * @param name the path generator name
   * @param generator the path generator object
   */


  async addPathGenerator(name, generator) {
    this.plugins.addPathGenerator(name, generator);
    await this.refresh();
  }
  /**
   * addPlugin adds plugin to tsParticles, if an instance needs it it will be loaded
   * @param plugin the plugin implementation of [[IPlugin]]
   */


  async addPlugin(plugin) {
    this.plugins.addPlugin(plugin);
    await this.refresh();
  }
  /**
   * addPreset adds preset to tsParticles, it will be available to all future instances created
   * @param preset the preset name
   * @param options the options to add to the preset
   * @param override if true, the preset will override any existing with the same name
   */


  async addPreset(preset, options, override = false) {
    this.plugins.addPreset(preset, options, override);
    await this.refresh();
  }
  /**
   * addShape adds shape to tsParticles, it will be available to all future instances created
   * @param shape the shape name
   * @param drawer the shape drawer function or class instance that draws the shape in the canvas
   * @param init Optional: the shape drawer init function, used only if the drawer parameter is a function
   * @param afterEffect Optional: the shape drawer after effect function, used only if the drawer parameter is a function
   * @param destroy Optional: the shape drawer destroy function, used only if the drawer parameter is a function
   */


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
  /**
   * Dispatches an event that will be listened from listeners
   * @param type The event to dispatch
   * @param args The event parameters
   */


  dispatchEvent(type, args) {
    engine_classPrivateFieldGet(this, _Engine_eventDispatcher, "f").dispatchEvent(type, args);
  }
  /**
   * All the [[Container]] objects loaded
   * @returns All the [[Container]] objects loaded
   */


  dom() {
    return engine_classPrivateFieldGet(this, _Engine_domArray, "f");
  }
  /**
   * Retrieves a [[Container]] from all the objects loaded
   * @param index The object index
   * @returns The [[Container]] object at specified index, if present or not destroyed, otherwise undefined
   */


  domItem(index) {
    const dom = this.dom(),
          item = dom[index];

    if (item && !item.destroyed) {
      return item;
    }

    dom.splice(index, 1);
  }
  /**
   * init method, used by imports
   */


  init() {
    if (!engine_classPrivateFieldGet(this, _Engine_initialized, "f")) {
      engine_classPrivateFieldSet(this, _Engine_initialized, true, "f");
    }
  }
  /**
   * Loads the provided options to create a [[Container]] object.
   * @param tagId The particles container element id
   * @param options The options object to initialize the [[Container]]
   * @returns A Promise with the [[Container]] object created
   */


  async load(tagId, options) {
    return engine_classPrivateFieldGet(this, _Engine_loader, "f").load(tagId, options);
  }
  /**
   * Loads an options object from the provided array to create a [[Container]] object.
   * @param tagId The particles container element id
   * @param options The options array to get the item from
   * @param index If provided gets the corresponding item from the array
   * @returns A Promise with the [[Container]] object created
   */


  async loadFromArray(tagId, options, index) {
    return engine_classPrivateFieldGet(this, _Engine_loader, "f").load(tagId, options, index);
  }
  /**
   * Loads the provided json with a GET request. The content will be used to create a [[Container]] object.
   * This method is async, so if you need a callback refer to JavaScript function `fetch`
   * @param tagId the particles container element id
   * @param pathConfigJson the json path (or paths array) to use in the GET request
   * @param index the index of the paths array, if a single path is passed this value is ignored
   * @returns A Promise with the [[Container]] object created
   */


  async loadJSON(tagId, pathConfigJson, index) {
    return engine_classPrivateFieldGet(this, _Engine_loader, "f").loadJSON(tagId, pathConfigJson, index);
  }
  /**
   * Reloads all existing tsParticles loaded instances
   */


  async refresh() {
    for (const instance of this.dom()) {
      await instance.refresh();
    }
  }
  /**
   * Removes a listener from the specified event
   * @param type The event to stop listening to
   * @param listener The listener of the specified event
   */


  removeEventListener(type, listener) {
    engine_classPrivateFieldGet(this, _Engine_eventDispatcher, "f").removeEventListener(type, listener);
  }
  /**
   * Loads the provided option to create a [[Container]] object using the element parameter as a container
   * @param id The particles container id
   * @param element The dom element used to contain the particles
   * @param options The options object to initialize the [[Container]]
   */


  async set(id, element, options) {
    return engine_classPrivateFieldGet(this, _Engine_loader, "f").set(id, element, options);
  }
  /**
   * Loads the provided option to create a [[Container]] object using the element parameter as a container
   * @param id The particles container id
   * @param element The dom element used to contain the particles
   * @param pathConfigJson the json path (or paths array) to use in the GET request
   * @param index the index of the paths array, if a single path is passed this value is ignored
   * @returns A Promise with the [[Container]] object created
   */


  async setJSON(id, element, pathConfigJson, index) {
    return engine_classPrivateFieldGet(this, _Engine_loader, "f").setJSON(id, element, pathConfigJson, index);
  }
  /**
   * Adds an additional click handler to all the loaded [[Container]] objects.
   * @param callback The function called after the click event is fired
   */


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
_Engine_domArray = new WeakMap(), _Engine_eventDispatcher = new WeakMap(), _Engine_initialized = new WeakMap(), _Engine_loader = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/Utils/HslColorManager.js


class HslColorManager {
  constructor() {
    this.stringPrefix = "hsl";
  }

  handleColor(color) {
    var _a;

    const colorValue = color.value,
          hslColor = (_a = colorValue.hsl) !== null && _a !== void 0 ? _a : color.value;

    if (hslColor.h !== undefined && hslColor.l !== undefined) {
      return hslToRgb(hslColor);
    }
  }

  handleRangeColor(color) {
    var _a;

    const colorValue = color.value,
          hslColor = (_a = colorValue.hsl) !== null && _a !== void 0 ? _a : color.value;

    if (hslColor.h !== undefined && hslColor.l !== undefined) {
      return hslToRgb({
        h: getRangeValue(hslColor.h),
        l: getRangeValue(hslColor.l),
        s: getRangeValue(hslColor.s)
      });
    }
  }

  parseString(input) {
    if (!input.startsWith("hsl")) {
      return;
    }

    const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.%]+)\s*)?\)/i,
          result = regex.exec(input);
    return result ? hslaToRgba({
      a: result.length > 4 ? parseAlpha(result[5]) : 1,
      h: parseInt(result[1], 10),
      l: parseInt(result[3], 10),
      s: parseInt(result[2], 10)
    }) : undefined;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Utils/RgbColorManager.js

class RgbColorManager {
  constructor() {
    this.stringPrefix = "rgb";
  }

  handleColor(color) {
    var _a;

    const colorValue = color.value,
          rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;

    if (rgbColor.r !== undefined) {
      return rgbColor;
    }
  }

  handleRangeColor(color) {
    var _a;

    const colorValue = color.value,
          rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;

    if (rgbColor.r !== undefined) {
      return {
        r: getRangeValue(rgbColor.r),
        g: getRangeValue(rgbColor.g),
        b: getRangeValue(rgbColor.b)
      };
    }
  }

  parseString(input) {
    if (!input.startsWith(this.stringPrefix)) {
      return;
    }

    const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.%]+)\s*)?\)/i,
          result = regex.exec(input);
    return result ? {
      a: result.length > 4 ? parseAlpha(result[5]) : 1,
      b: parseInt(result[3], 10),
      g: parseInt(result[2], 10),
      r: parseInt(result[1], 10)
    } : undefined;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/Utils/ExternalInteractorBase.js
/**
 * External Interactivity manager, base abstract class
 */
class ExternalInteractorBase {
  /**
   * Constructor of external interactivity manager
   * @param container the parent container
   * @protected
   */
  constructor(container) {
    this.container = container;
    /**
     * External Interactivity type
     */

    this.type = 0
    /* InteractorType.External */
    ;
  }

}
;// CONCATENATED MODULE: ./dist/browser/Core/Utils/ParticlesInteractorBase.js
/**
 * Particles interactions manager, base abstract class
 */
class ParticlesInteractorBase {
  /**
   * The particles interactions manager constructor
   * @param container the parent container
   * @protected
   */
  constructor(container) {
    this.container = container;
    /**
     * Particles interactions type
     */

    this.type = 1
    /* InteractorType.Particles */
    ;
  }

}
;// CONCATENATED MODULE: ./dist/browser/index.js




const rgbColorManager = new RgbColorManager(),
      hslColorManager = new HslColorManager();
addColorManager("rgb", rgbColorManager);
addColorManager("hsl", hslColorManager);
/**
 * The exposed tsParticles instance
 */

const tsParticles = new Engine();
tsParticles.init();

































































































































































































/******/ 	return __webpack_exports__;
/******/ })()
;
});