/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.9.3
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
  "AnimationOptions": () => (/* reexport */ AnimationOptions),
  "Background": () => (/* reexport */ Background),
  "BackgroundMask": () => (/* reexport */ BackgroundMask),
  "BackgroundMaskCover": () => (/* reexport */ BackgroundMaskCover),
  "Circle": () => (/* reexport */ Circle),
  "ClickEvent": () => (/* reexport */ ClickEvent),
  "Collisions": () => (/* reexport */ Collisions),
  "CollisionsAbsorb": () => (/* reexport */ CollisionsAbsorb),
  "CollisionsOverlap": () => (/* reexport */ CollisionsOverlap),
  "ColorAnimation": () => (/* reexport */ ColorAnimation),
  "DivEvent": () => (/* reexport */ DivEvent),
  "Events": () => (/* reexport */ Events),
  "ExternalInteractorBase": () => (/* reexport */ ExternalInteractorBase),
  "FullScreen": () => (/* reexport */ FullScreen),
  "HoverEvent": () => (/* reexport */ HoverEvent),
  "HslAnimation": () => (/* reexport */ HslAnimation),
  "HslColorManager": () => (/* reexport */ HslColorManager),
  "Interactivity": () => (/* reexport */ Interactivity),
  "ManualParticle": () => (/* reexport */ ManualParticle),
  "Modes": () => (/* reexport */ Modes),
  "Move": () => (/* reexport */ Move),
  "MoveAngle": () => (/* reexport */ MoveAngle),
  "MoveAttract": () => (/* reexport */ MoveAttract),
  "MoveCenter": () => (/* reexport */ MoveCenter),
  "MoveGravity": () => (/* reexport */ MoveGravity),
  "MovePath": () => (/* reexport */ MovePath),
  "MoveTrail": () => (/* reexport */ MoveTrail),
  "Opacity": () => (/* reexport */ Opacity),
  "OpacityAnimation": () => (/* reexport */ OpacityAnimation),
  "Options": () => (/* reexport */ Options),
  "OptionsColor": () => (/* reexport */ OptionsColor),
  "OutModes": () => (/* reexport */ OutModes),
  "Parallax": () => (/* reexport */ Parallax),
  "ParticlesBounce": () => (/* reexport */ ParticlesBounce),
  "ParticlesBounceFactor": () => (/* reexport */ ParticlesBounceFactor),
  "ParticlesDensity": () => (/* reexport */ ParticlesDensity),
  "ParticlesInteractorBase": () => (/* reexport */ ParticlesInteractorBase),
  "ParticlesNumber": () => (/* reexport */ ParticlesNumber),
  "ParticlesOptions": () => (/* reexport */ ParticlesOptions),
  "Point": () => (/* reexport */ Point),
  "Range": () => (/* reexport */ Range),
  "Rectangle": () => (/* reexport */ Rectangle),
  "ResizeEvent": () => (/* reexport */ ResizeEvent),
  "Responsive": () => (/* reexport */ Responsive),
  "RgbColorManager": () => (/* reexport */ RgbColorManager),
  "Shadow": () => (/* reexport */ Shadow),
  "Shape": () => (/* reexport */ Shape),
  "Size": () => (/* reexport */ Size),
  "SizeAnimation": () => (/* reexport */ SizeAnimation),
  "Spin": () => (/* reexport */ Spin),
  "Stroke": () => (/* reexport */ Stroke),
  "Theme": () => (/* reexport */ Theme),
  "ThemeDefault": () => (/* reexport */ ThemeDefault),
  "ValueWithRandom": () => (/* reexport */ ValueWithRandom),
  "Vector": () => (/* reexport */ Vector),
  "Vector3d": () => (/* reexport */ Vector3d),
  "ZIndex": () => (/* reexport */ ZIndex),
  "addColorManager": () => (/* reexport */ addColorManager),
  "addEasing": () => (/* reexport */ addEasing),
  "alterHsl": () => (/* reexport */ alterHsl),
  "animate": () => (/* reexport */ animate),
  "areBoundsInside": () => (/* reexport */ areBoundsInside),
  "arrayRandomIndex": () => (/* reexport */ arrayRandomIndex),
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
  "drawLine": () => (/* reexport */ drawLine),
  "drawParticle": () => (/* reexport */ drawParticle),
  "drawParticlePlugin": () => (/* reexport */ drawParticlePlugin),
  "drawPlugin": () => (/* reexport */ drawPlugin),
  "drawShape": () => (/* reexport */ drawShape),
  "drawShapeAfterEffect": () => (/* reexport */ drawShapeAfterEffect),
  "drawTriangle": () => (/* reexport */ drawTriangle),
  "executeOnSingleOrMultiple": () => (/* reexport */ executeOnSingleOrMultiple),
  "findItemFromSingleOrMultiple": () => (/* reexport */ findItemFromSingleOrMultiple),
  "generatedAttribute": () => (/* reexport */ generatedAttribute),
  "getDistance": () => (/* reexport */ getDistance),
  "getDistances": () => (/* reexport */ getDistances),
  "getEasing": () => (/* reexport */ getEasing),
  "getHslAnimationFromHsl": () => (/* reexport */ getHslAnimationFromHsl),
  "getHslFromAnimation": () => (/* reexport */ getHslFromAnimation),
  "getLinkColor": () => (/* reexport */ getLinkColor),
  "getLinkRandomColor": () => (/* reexport */ getLinkRandomColor),
  "getParticleBaseVelocity": () => (/* reexport */ getParticleBaseVelocity),
  "getParticleDirectionAngle": () => (/* reexport */ getParticleDirectionAngle),
  "getRandom": () => (/* reexport */ getRandom),
  "getRandomRgbColor": () => (/* reexport */ getRandomRgbColor),
  "getRangeMax": () => (/* reexport */ getRangeMax),
  "getRangeMin": () => (/* reexport */ getRangeMin),
  "getRangeValue": () => (/* reexport */ getRangeValue),
  "getStyleFromHsl": () => (/* reexport */ getStyleFromHsl),
  "getStyleFromRgb": () => (/* reexport */ getStyleFromRgb),
  "getValue": () => (/* reexport */ getValue),
  "hasMatchMedia": () => (/* reexport */ hasMatchMedia),
  "hslToRgb": () => (/* reexport */ hslToRgb),
  "hslaToRgba": () => (/* reexport */ hslaToRgba),
  "isDivModeEnabled": () => (/* reexport */ isDivModeEnabled),
  "isInArray": () => (/* reexport */ isInArray),
  "isPointInside": () => (/* reexport */ isPointInside),
  "isSsr": () => (/* reexport */ isSsr),
  "itemFromArray": () => (/* reexport */ itemFromArray),
  "itemFromSingleOrMultiple": () => (/* reexport */ itemFromSingleOrMultiple),
  "loadFont": () => (/* reexport */ loadFont),
  "loadOptions": () => (/* reexport */ loadOptions),
  "loadParticlesOptions": () => (/* reexport */ loadParticlesOptions),
  "loadSlim": () => (/* reexport */ loadSlim),
  "mix": () => (/* reexport */ mix),
  "mouseDownEvent": () => (/* reexport */ mouseDownEvent),
  "mouseLeaveEvent": () => (/* reexport */ mouseLeaveEvent),
  "mouseMoveEvent": () => (/* reexport */ mouseMoveEvent),
  "mouseOutEvent": () => (/* reexport */ mouseOutEvent),
  "mouseUpEvent": () => (/* reexport */ mouseUpEvent),
  "paintBase": () => (/* reexport */ paintBase),
  "paintImage": () => (/* reexport */ paintImage),
  "parseAlpha": () => (/* reexport */ parseAlpha),
  "randomInRange": () => (/* reexport */ randomInRange),
  "rangeColorToHsl": () => (/* reexport */ rangeColorToHsl),
  "rangeColorToRgb": () => (/* reexport */ rangeColorToRgb),
  "rectBounce": () => (/* reexport */ rectBounce),
  "resizeEvent": () => (/* reexport */ resizeEvent),
  "rgbToHsl": () => (/* reexport */ rgbToHsl),
  "safeMatchMedia": () => (/* reexport */ safeMatchMedia),
  "setRandom": () => (/* reexport */ setRandom),
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
class EventDispatcher {
  constructor() {
    this._listeners = new Map();
  }
  addEventListener(type, listener) {
    var _a;
    this.removeEventListener(type, listener);
    if (!this._listeners.get(type)) {
      this._listeners.set(type, []);
    }
    (_a = this._listeners.get(type)) === null || _a === void 0 ? void 0 : _a.push(listener);
  }
  dispatchEvent(type, args) {
    var _a;
    (_a = this._listeners.get(type)) === null || _a === void 0 ? void 0 : _a.forEach(handler => handler(args));
  }
  hasEventListener(type) {
    return !!this._listeners.get(type);
  }
  removeAllEventListeners(type) {
    if (!type) {
      this._listeners = new Map();
    } else {
      this._listeners.delete(type);
    }
  }
  removeEventListener(type, listener) {
    const arr = this._listeners.get(type);
    if (!arr) {
      return;
    }
    const length = arr.length,
      idx = arr.indexOf(listener);
    if (idx < 0) {
      return;
    }
    if (length === 1) {
      this._listeners.delete(type);
    } else {
      arr.splice(idx, 1);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Vector3d.js
class Vector3d {
  constructor(xOrCoords, y, z) {
    if (typeof xOrCoords !== "number" && xOrCoords) {
      this.x = xOrCoords.x;
      this.y = xOrCoords.y;
      const coords3d = xOrCoords;
      this.z = coords3d.z ? coords3d.z : 0;
    } else if (xOrCoords !== undefined && y !== undefined) {
      this.x = xOrCoords;
      this.y = y;
      this.z = z !== null && z !== void 0 ? z : 0;
    } else {
      throw new Error("tsParticles - Vector3d not initialized correctly");
    }
  }
  static get origin() {
    return Vector3d.create(0, 0, 0);
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
    return Vector3d.create(source.x, source.y, source.z);
  }
  static create(x, y, z) {
    return new Vector3d(x, y, z);
  }
  add(v) {
    return Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z);
  }
  addTo(v) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
  }
  copy() {
    return Vector3d.clone(this);
  }
  distanceTo(v) {
    return this.sub(v).length;
  }
  distanceToSq(v) {
    return this.sub(v).getLengthSq();
  }
  div(n) {
    return Vector3d.create(this.x / n, this.y / n, this.z / n);
  }
  divTo(n) {
    this.x /= n;
    this.y /= n;
    this.z /= n;
  }
  getLengthSq() {
    return this.x ** 2 + this.y ** 2;
  }
  mult(n) {
    return Vector3d.create(this.x * n, this.y * n, this.z * n);
  }
  multTo(n) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
  }
  rotate(angle) {
    return Vector3d.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle), 0);
  }
  setTo(c) {
    this.x = c.x;
    this.y = c.y;
    const v3d = c;
    this.z = v3d.z ? v3d.z : 0;
  }
  sub(v) {
    return Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z);
  }
  subFrom(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
  }
  updateFromAngle(angle, length) {
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Vector.js

class Vector extends Vector3d {
  constructor(xOrCoords, y) {
    super(xOrCoords, y, 0);
  }
  static get origin() {
    return Vector.create(0, 0);
  }
  static clone(source) {
    return Vector.create(source.x, source.y);
  }
  static create(x, y) {
    return new Vector(x, y);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/NumberUtils.js

let _random = Math.random;
const easings = new Map();
function addEasing(name, easing) {
  if (!easings.get(name)) {
    easings.set(name, easing);
  }
}
function getEasing(name) {
  return easings.get(name) || (value => value);
}
function setRandom(rnd = Math.random) {
  _random = rnd;
}
function getRandom() {
  return clamp(_random(), 0, 1 - 1e-16);
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
function getDistances(pointA, pointB) {
  const dx = pointA.x - pointB.x,
    dy = pointA.y - pointB.y;
  return {
    dx: dx,
    dy: dy,
    distance: Math.sqrt(dx ** 2 + dy ** 2)
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
      default:
        return getRandom() * Math.PI * 2;
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
function calcPositionFromSize(data) {
  return data.position && data.position.x !== undefined && data.position.y !== undefined ? {
    x: data.position.x * data.size.width / 100,
    y: data.position.y * data.size.height / 100
  } : undefined;
}
function calcPositionOrRandomFromSize(data) {
  var _a, _b, _c, _d;
  return {
    x: ((_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : getRandom() * 100) * data.size.width / 100,
    y: ((_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : getRandom() * 100) * data.size.height / 100
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
    x: (_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : getRandom() * data.size.width,
    y: (_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : getRandom() * data.size.height
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
function parseAlpha(input) {
  return input ? input.endsWith("%") ? parseFloat(input) / 100 : parseFloat(input) : 1;
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
  const res = executeOnSingleOrMultiple(selectors, selector => {
    return element.matches(selector);
  });
  return res instanceof Array ? res.some(t => t) : res;
}
function isSsr() {
  return typeof window === "undefined" || !window || typeof window.document === "undefined" || !window.document;
}
function hasMatchMedia() {
  return !isSsr() && typeof matchMedia !== "undefined";
}
function safeMatchMedia(query) {
  if (!hasMatchMedia()) {
    return;
  }
  return matchMedia(query);
}
function animate() {
  return isSsr() ? callback => setTimeout(callback) : callback => (requestAnimationFrame || setTimeout)(callback);
}
function cancelAnimation() {
  return isSsr() ? handle => clearTimeout(handle) : handle => (cancelAnimationFrame || clearTimeout)(handle);
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
  return Math.floor(getRandom() * array.length);
}
function itemFromArray(array, index, useIndex = true) {
  return array[index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array)];
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
  return !!findItemFromSingleOrMultiple(divs, t => t.enable && isInArray(mode, t.mode));
}
function divModeExecute(mode, divs, callback) {
  executeOnSingleOrMultiple(divs, div => {
    const divMode = div.mode,
      divEnabled = div.enable;
    if (divEnabled && isInArray(mode, divMode)) {
      singleDivModeExecute(div, callback);
    }
  });
}
function singleDivModeExecute(div, callback) {
  const selectors = div.selectors;
  executeOnSingleOrMultiple(selectors, selector => {
    callback(selector, div);
  });
}
function divMode(divs, element) {
  if (!element || !divs) {
    return;
  }
  return findItemFromSingleOrMultiple(divs, div => {
    return checkSelector(element, div.selectors);
  });
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
    bounds = calculateBounds(pPos, size),
    resH = rectSideBounce({
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
function executeOnSingleOrMultiple(obj, callback) {
  return obj instanceof Array ? obj.map((item, index) => callback(item, index)) : callback(obj, 0);
}
function itemFromSingleOrMultiple(obj, index, useIndex) {
  return obj instanceof Array ? itemFromArray(obj, index, useIndex) : obj;
}
function findItemFromSingleOrMultiple(obj, callback) {
  return obj instanceof Array ? obj.find((t, index) => callback(t, index)) : callback(obj, 0) ? obj : undefined;
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/ColorUtils.js


const randomColorValue = "random",
  midColorValue = "mid",
  colorManagers = new Map();
function addColorManager(manager) {
  colorManagers.set(manager.key, manager);
}
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
function colorToHsl(color, index, useIndex = true) {
  const rgb = colorToRgb(color, index, useIndex);
  return rgb ? rgbToHsl(rgb) : undefined;
}
function rangeColorToHsl(color, index, useIndex = true) {
  const rgb = rangeColorToRgb(color, index, useIndex);
  return rgb ? rgbToHsl(rgb) : undefined;
}
function rgbToHsl(color) {
  const r1 = color.r / 255,
    g1 = color.g / 255,
    b1 = color.b / 255,
    max = Math.max(r1, g1, b1),
    min = Math.min(r1, g1, b1),
    res = {
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
    },
    hslPercent = {
      h: hsl.h / 360,
      l: hsl.l / 100,
      s: hsl.s / 100
    };
  if (!hslPercent.s) {
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
  } else if (color === midColorValue) {
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
    colorValue.status = "increasing";
    colorValue.loops = 0;
    colorValue.maxLoops = getRangeValue(colorAnimation.count);
    if (!colorAnimation.sync) {
      colorValue.velocity *= getRandom();
      colorValue.value *= getRandom();
    }
    colorValue.initialValue = colorValue.value;
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
  context.fillStyle = baseColor !== null && baseColor !== void 0 ? baseColor : "rgba(0,0,0,0)";
  context.fillRect(0, 0, dimension.width, dimension.height);
}
function paintImage(context, dimension, image, opacity) {
  if (!image) {
    return;
  }
  context.globalAlpha = opacity;
  context.drawImage(image, 0, 0, dimension.width, dimension.height);
  context.globalAlpha = 1;
}
function clear(context, dimension) {
  context.clearRect(0, 0, dimension.width, dimension.height);
}
function drawParticle(data) {
  var _a, _b, _c, _d, _e;
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
  const pos = particle.getPosition(),
    angle = particle.rotation + (particle.pathRotation ? particle.velocity.angle : 0),
    rotateData = {
      sin: Math.sin(angle),
      cos: Math.cos(angle)
    },
    transformData = {
      a: rotateData.cos * ((_a = transform.a) !== null && _a !== void 0 ? _a : 1),
      b: rotateData.sin * ((_b = transform.b) !== null && _b !== void 0 ? _b : 1),
      c: -rotateData.sin * ((_c = transform.c) !== null && _c !== void 0 ? _c : 1),
      d: rotateData.cos * ((_d = transform.d) !== null && _d !== void 0 ? _d : 1)
    };
  context.setTransform(transformData.a, transformData.b, transformData.c, transformData.d, pos.x, pos.y);
  context.beginPath();
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
  const strokeWidth = (_e = particle.strokeWidth) !== null && _e !== void 0 ? _e : 0;
  context.lineWidth = strokeWidth;
  if (colorStyles.stroke) {
    context.strokeStyle = colorStyles.stroke;
  }
  drawShape(container, context, particle, radius, opacity, delta);
  if (strokeWidth > 0) {
    context.stroke();
  }
  if (particle.close) {
    context.closePath();
  }
  if (particle.fill) {
    context.fill();
  }
  drawShapeAfterEffect(container, context, particle, radius, opacity, delta);
  context.globalCompositeOperation = "source-over";
  context.setTransform(1, 0, 0, 1, 0, 0);
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
  plugin.draw(context, delta);
}
function drawParticlePlugin(context, plugin, particle, delta) {
  if (!plugin.drawParticle) {
    return;
  }
  plugin.drawParticle(context, particle, delta);
}
function alterHsl(color, type, value) {
  return {
    h: color.h,
    s: color.s,
    l: color.l + (type === "darken" ? -1 : 1) * value
  };
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Constants.js
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Canvas.js




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
    this.size = {
      height: 0,
      width: 0
    };
    this._context = null;
    this._generated = false;
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    this._resizePlugins = [];
    this._colorPlugins = [];
    this._mutationObserver = !isSsr() && typeof MutationObserver !== "undefined" ? new MutationObserver(records => {
      for (const record of records) {
        if (record.type === "attributes" && record.attributeName === "style") {
          this._repairStyle();
        }
      }
    }) : undefined;
  }
  get _fullScreen() {
    return this.container.actualOptions.fullScreen.enable;
  }
  clear() {
    const options = this.container.actualOptions,
      trail = options.particles.move.trail,
      trailFill = this._trailFill;
    if (options.backgroundMask.enable) {
      this.paint();
    } else if (trail.enable && trail.length > 0 && trailFill) {
      if (trailFill.color) {
        this._paintBase(getStyleFromRgb(trailFill.color, trailFill.opacity));
      } else if (trailFill.image) {
        this._paintImage(trailFill.image, trailFill.opacity);
      }
    } else {
      this.draw(ctx => {
        clear(ctx, this.size);
      });
    }
  }
  destroy() {
    var _a, _b;
    (_a = this._mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    if (this._generated) {
      (_b = this.element) === null || _b === void 0 ? void 0 : _b.remove();
    } else {
      this._resetOriginalStyle();
    }
    this.stop();
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    this._resizePlugins = [];
    this._colorPlugins = [];
  }
  draw(cb) {
    if (!this._context) {
      return;
    }
    return cb(this._context);
  }
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
    let [fColor, sColor] = this._getPluginParticleColors(particle);
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
      var _a, _b, _c, _d;
      const options = this.container.actualOptions,
        zIndexOptions = particle.options.zIndex,
        zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate,
        opacity = (_c = (_a = particle.bubble.opacity) !== null && _a !== void 0 ? _a : (_b = particle.opacity) === null || _b === void 0 ? void 0 : _b.value) !== null && _c !== void 0 ? _c : 1,
        strokeOpacity = (_d = particle.strokeOpacity) !== null && _d !== void 0 ? _d : opacity,
        zOpacity = opacity * zOpacityFactor,
        zStrokeOpacity = strokeOpacity * zOpacityFactor,
        transform = {},
        colorStyles = {
          fill: fColor ? getStyleFromHsl(fColor, zOpacity) : undefined
        };
      colorStyles.stroke = sColor ? getStyleFromHsl(sColor, zStrokeOpacity) : colorStyles.fill;
      this._applyPreDrawUpdaters(ctx, particle, radius, zOpacity, colorStyles, transform);
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
      this._applyPostDrawUpdaters(particle);
    });
  }
  drawParticlePlugin(plugin, particle, delta) {
    this.draw(ctx => {
      drawParticlePlugin(ctx, plugin, particle, delta);
    });
  }
  drawPlugin(plugin, delta) {
    this.draw(ctx => {
      drawPlugin(ctx, plugin, delta);
    });
  }
  async init() {
    var _a;
    this.resize();
    this._initStyle();
    this._initCover();
    try {
      await this._initTrail();
    } catch (e) {
      console.error(e);
    }
    this.initBackground();
    if (this.element) {
      (_a = this._mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.element, {
        attributes: true
      });
    }
    this.initUpdaters();
    this.initPlugins();
    this.paint();
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
  initPlugins() {
    this._resizePlugins = [];
    for (const [, plugin] of this.container.plugins) {
      if (plugin.resize) {
        this._resizePlugins.push(plugin);
      }
      if (plugin.particleFillColor || plugin.particleStrokeColor) {
        this._colorPlugins.push(plugin);
      }
    }
  }
  initUpdaters() {
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    for (const updater of this.container.particles.updaters) {
      if (updater.afterDraw) {
        this._postDrawUpdaters.push(updater);
      }
      if (updater.getColorStyles || updater.getTransformValues || updater.beforeDraw) {
        this._preDrawUpdaters.push(updater);
      }
    }
  }
  loadCanvas(canvas) {
    var _a, _b;
    if (this._generated) {
      (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
    }
    this._generated = canvas.dataset && generatedAttribute in canvas.dataset ? canvas.dataset[generatedAttribute] === "true" : this._generated;
    this.element = canvas;
    this.element.ariaHidden = "true";
    this._originalStyle = deepExtend({}, this.element.style);
    this.size.height = canvas.offsetHeight;
    this.size.width = canvas.offsetWidth;
    this._context = this.element.getContext("2d");
    (_b = this._mutationObserver) === null || _b === void 0 ? void 0 : _b.observe(this.element, {
      attributes: true
    });
    this.container.retina.init();
    this.initBackground();
  }
  paint() {
    const options = this.container.actualOptions;
    this.draw(ctx => {
      if (options.backgroundMask.enable && options.backgroundMask.cover) {
        clear(ctx, this.size);
        this._paintBase(this._coverColorStyle);
      } else {
        this._paintBase();
      }
    });
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
  stop() {
    this.draw(ctx => {
      clear(ctx, this.size);
    });
  }
  async windowResize() {
    if (!this.element) {
      return;
    }
    this.resize();
    const container = this.container,
      needsRefresh = container.updateActualOptions();
    container.particles.setDensity();
    this._applyResizePlugins();
    if (needsRefresh) {
      await container.refresh();
    }
  }
  _applyPostDrawUpdaters(particle) {
    var _a;
    for (const updater of this._postDrawUpdaters) {
      (_a = updater.afterDraw) === null || _a === void 0 ? void 0 : _a.call(updater, particle);
    }
  }
  _applyPreDrawUpdaters(ctx, particle, radius, zOpacity, colorStyles, transform) {
    var _a;
    for (const updater of this._preDrawUpdaters) {
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
  _applyResizePlugins() {
    for (const plugin of this._resizePlugins) {
      if (plugin.resize) {
        plugin.resize();
      }
    }
  }
  _getPluginParticleColors(particle) {
    let fColor, sColor;
    for (const plugin of this._colorPlugins) {
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
  _initCover() {
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
      this._coverColorStyle = getStyleFromRgb(coverColor, coverColor.a);
    }
  }
  _initStyle() {
    const element = this.element,
      options = this.container.actualOptions;
    if (!element) {
      return;
    }
    if (this._fullScreen) {
      this._originalStyle = deepExtend({}, element.style);
      this._setFullScreenStyle();
    } else {
      this._resetOriginalStyle();
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
  async _initTrail() {
    const options = this.container.actualOptions,
      trail = options.particles.move.trail,
      trailFill = trail.fill;
    if (!trail.enable) {
      return;
    }
    if (trailFill.color) {
      const fillColor = rangeColorToRgb(trailFill.color);
      if (!fillColor) {
        return;
      }
      const trail = options.particles.move.trail;
      this._trailFill = {
        color: Object.assign({}, fillColor),
        opacity: 1 / trail.length
      };
    } else {
      await new Promise((resolve, reject) => {
        if (!trailFill.image) {
          return;
        }
        const img = document.createElement("img");
        img.addEventListener("load", () => {
          this._trailFill = {
            image: img,
            opacity: 1 / trail.length
          };
          resolve();
        });
        img.addEventListener("error", evt => {
          reject(evt.error);
        });
        img.src = trailFill.image;
      });
    }
  }
  _paintBase(baseColor) {
    this.draw(ctx => {
      paintBase(ctx, this.size, baseColor);
    });
  }
  _paintImage(image, opacity) {
    this.draw(ctx => {
      paintImage(ctx, this.size, image, opacity);
    });
  }
  _repairStyle() {
    var _a, _b;
    const element = this.element;
    if (!element) {
      return;
    }
    (_a = this._mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    this._initStyle();
    this.initBackground();
    (_b = this._mutationObserver) === null || _b === void 0 ? void 0 : _b.observe(element, {
      attributes: true
    });
  }
  _resetOriginalStyle() {
    const element = this.element,
      originalStyle = this._originalStyle;
    if (!(element && originalStyle)) {
      return;
    }
    element.style.position = originalStyle.position;
    element.style.zIndex = originalStyle.zIndex;
    element.style.top = originalStyle.top;
    element.style.left = originalStyle.left;
    element.style.width = originalStyle.width;
    element.style.height = originalStyle.height;
  }
  _setFullScreenStyle() {
    const element = this.element;
    if (!element) {
      return;
    }
    const priority = "important";
    element.style.setProperty("position", "fixed", priority);
    element.style.setProperty("z-index", this.container.actualOptions.fullScreen.zIndex.toString(10), priority);
    element.style.setProperty("top", "0", priority);
    element.style.setProperty("left", "0", priority);
    element.style.setProperty("width", "100%", priority);
    element.style.setProperty("height", "100%", priority);
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
    this.handlers = {
      mouseMove: e => this.mouseTouchMove(e),
      touchStart: e => this.mouseTouchMove(e),
      touchMove: e => this.mouseTouchMove(e),
      touchEnd: () => this.mouseTouchFinish(),
      mouseLeave: () => this.mouseTouchFinish(),
      touchCancel: () => this.mouseTouchFinish(),
      touchEndClick: e => this.mouseTouchClick(e),
      mouseUp: e => this.mouseTouchClick(e),
      mouseDown: () => this.mouseDown(),
      visibilityChange: () => this.handleVisibilityChange(),
      themeChange: e => this.handleThemeChange(e),
      oldThemeChange: e => this.handleThemeChange(e),
      resize: () => this.handleWindowResize()
    };
  }
  addListeners() {
    this.manageListeners(true);
  }
  removeListeners() {
    this.manageListeners(false);
  }
  doMouseTouchClick(e) {
    const container = this.container,
      options = container.actualOptions;
    if (this.canPush) {
      const mouseInteractivity = container.interactivity.mouse,
        mousePos = mouseInteractivity.position;
      if (!mousePos) {
        return;
      }
      mouseInteractivity.clickPosition = Object.assign({}, mousePos);
      mouseInteractivity.clickTime = new Date().getTime();
      const onClick = options.interactivity.events.onClick;
      executeOnSingleOrMultiple(onClick.mode, mode => this.handleClickMode(mode));
    }
    if (e.type === "touchend") {
      setTimeout(() => this.mouseTouchFinish(), 500);
    }
  }
  handleClickMode(mode) {
    this.container.handleClickMode(mode);
  }
  handleThemeChange(e) {
    const mediaEvent = e,
      container = this.container,
      options = container.options,
      defaultThemes = options.defaultThemes,
      themeName = mediaEvent.matches ? defaultThemes.dark : defaultThemes.light,
      theme = options.themes.find(theme => theme.name === themeName);
    if (theme && theme.default.auto) {
      container.loadTheme(themeName);
    }
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
  handleWindowResize() {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
      delete this.resizeTimeout;
    }
    this.resizeTimeout = setTimeout(async () => {
      var _a;
      return (_a = this.container.canvas) === null || _a === void 0 ? void 0 : _a.windowResize();
    }, this.container.actualOptions.interactivity.events.resize.delay * 1000);
  }
  manageListeners(add) {
    var _a;
    const handlers = this.handlers,
      container = this.container,
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
    const mediaMatch = safeMatchMedia("(prefers-color-scheme: dark)");
    if (mediaMatch) {
      if (mediaMatch.addEventListener !== undefined) {
        manageListener(mediaMatch, "change", handlers.themeChange, add);
      } else if (mediaMatch.addListener !== undefined) {
        if (add) {
          mediaMatch.addListener(handlers.oldThemeChange);
        } else {
          mediaMatch.removeListener(handlers.oldThemeChange);
        }
      }
    }
    const interactivityEl = container.interactivity.element;
    if (!interactivityEl) {
      return;
    }
    const html = interactivityEl;
    if (options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable) {
      manageListener(interactivityEl, mouseMoveEvent, handlers.mouseMove, add);
      manageListener(interactivityEl, touchStartEvent, handlers.touchStart, add);
      manageListener(interactivityEl, touchMoveEvent, handlers.touchMove, add);
      if (!options.interactivity.events.onClick.enable) {
        manageListener(interactivityEl, touchEndEvent, handlers.touchEnd, add);
      } else {
        manageListener(interactivityEl, touchEndEvent, handlers.touchEndClick, add);
        manageListener(interactivityEl, mouseUpEvent, handlers.mouseUp, add);
        manageListener(interactivityEl, mouseDownEvent, handlers.mouseDown, add);
      }
      manageListener(interactivityEl, mouseLeaveTmpEvent, handlers.mouseLeave, add);
      manageListener(interactivityEl, touchCancelEvent, handlers.touchCancel, add);
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
        manageListener(window, resizeEvent, handlers.resize, add);
      }
    }
    if (document) {
      manageListener(document, visibilityChangeEvent, handlers.visibilityChange, add, false);
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
      } else if (options.interactivity.detectsOn === "parent") {
        const source = mouseEvent.target,
          target = mouseEvent.currentTarget,
          canvasEl = container.canvas.element;
        if (source && target && canvasEl) {
          const sourceRect = source.getBoundingClientRect(),
            targetRect = target.getBoundingClientRect(),
            canvasRect = canvasEl.getBoundingClientRect();
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
      } else if (mouseEvent.target === container.canvas.element) {
        pos = {
          x: (_d = mouseEvent.offsetX) !== null && _d !== void 0 ? _d : mouseEvent.clientX,
          y: (_e = mouseEvent.offsetY) !== null && _e !== void 0 ? _e : mouseEvent.clientY
        };
      }
    } else {
      this.canPush = e.type !== "touchmove";
      const touchEvent = e,
        lastTouch = touchEvent.touches[touchEvent.touches.length - 1],
        canvasRect = canvas === null || canvas === void 0 ? void 0 : canvas.getBoundingClientRect();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/FrameManager.js
function initDelta(value, fpsLimit = 60, smooth = false) {
  return {
    value,
    factor: smooth ? 60 / fpsLimit : 60 * value / 1000
  };
}
class FrameManager {
  constructor(container) {
    this.container = container;
  }
  async nextFrame(timestamp) {
    var _a;
    try {
      const container = this.container;
      if (!container.smooth && container.lastFrameTime !== undefined && timestamp < container.lastFrameTime + 1000 / container.fpsLimit) {
        container.draw(false);
        return;
      }
      (_a = container.lastFrameTime) !== null && _a !== void 0 ? _a : container.lastFrameTime = timestamp;
      const delta = initDelta(timestamp - container.lastFrameTime, container.fpsLimit, container.smooth);
      container.lifeTime += delta.value;
      container.lastFrameTime = timestamp;
      if (delta.value > 1000) {
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
    return executeOnSingleOrMultiple(this.selectors, t => t.replace("#", ""));
  }
  set ids(value) {
    this.selectors = executeOnSingleOrMultiple(value, t => `#${t}`);
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Events/ResizeEvent.js
class ResizeEvent {
  constructor() {
    this.delay = 0.5;
    this.enable = true;
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    if (data.delay !== undefined) {
      this.delay = data.delay;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Events/Events.js





class Events {
  constructor() {
    this.onClick = new ClickEvent();
    this.onDiv = new DivEvent();
    this.onHover = new HoverEvent();
    this.resize = new ResizeEvent();
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
      this.onDiv = executeOnSingleOrMultiple(onDiv, t => {
        const tmp = new DivEvent();
        tmp.load(t);
        return tmp;
      });
    }
    this.onHover.load((_c = data.onHover) !== null && _c !== void 0 ? _c : data.onhover);
    if (typeof data.resize === "boolean") {
      this.resize.enable = data.resize;
    } else {
      this.resize.load(data.resize);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Modes/Modes.js
class Modes {
  constructor(engine, container) {
    this._engine = engine;
    this._container = container;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (this._container) {
      const interactors = this._engine.plugins.interactors.get(this._container);
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Interactivity/Interactivity.js


class Interactivity {
  constructor(engine, container) {
    this.detectsOn = "window";
    this.events = new Events();
    this.modes = new Modes(engine, container);
  }
  get detect_on() {
    return this.detectsOn;
  }
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/ColorAnimation.js

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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Collisions/CollisionsAbsorb.js
class CollisionsAbsorb {
  constructor() {
    this.speed = 2;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.speed !== undefined) {
      this.speed = data.speed;
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
    this.absorb = new CollisionsAbsorb();
    this.bounce = new ParticlesBounce();
    this.enable = false;
    this.mode = "bounce";
    this.overlap = new CollisionsOverlap();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.absorb.load(data.absorb);
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/MoveCenter.js
class MoveCenter {
  constructor() {
    this.x = 50;
    this.y = 50;
    this.mode = "percent";
    this.radius = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.x !== undefined) {
      this.x = data.x;
    }
    if (data.y !== undefined) {
      this.y = data.y;
    }
    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
    if (data.radius !== undefined) {
      this.radius = data.radius;
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/Path/MovePath.js


class MovePath {
  constructor() {
    this.clamp = true;
    this.delay = new ValueWithRandom();
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/MoveTrailFill.js

class MoveTrailFill {
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
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Move/MoveTrail.js

class MoveTrail {
  constructor() {
    this.enable = false;
    this.length = 10;
    this.fill = new MoveTrailFill();
  }
  get fillColor() {
    return this.fill.color;
  }
  set fillColor(value) {
    this.fill.load({
      color: value
    });
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.fill !== undefined || data.fillColor !== undefined) {
      this.fill.load(data.fill || {
        color: data.fillColor
      });
    }
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
    this.center = new MoveCenter();
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
  get bounce() {
    return this.collisions;
  }
  set bounce(value) {
    this.collisions = value;
  }
  get collisions() {
    return false;
  }
  set collisions(_) {}
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
    this.angle.load(typeof data.angle === "number" ? {
      value: data.angle
    } : data.angle);
    this.attract.load(data.attract);
    this.center.load(data.center);
    if (data.decay !== undefined) {
      this.decay = setRangeValue(data.decay);
    }
    if (data.direction !== undefined) {
      this.direction = data.direction;
    }
    if (data.distance !== undefined) {
      this.distance = typeof data.distance === "number" ? {
        horizontal: data.distance,
        vertical: data.distance
      } : Object.assign({}, data.distance);
    }
    if (data.drift !== undefined) {
      this.drift = setRangeValue(data.drift);
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    this.gravity.load(data.gravity);
    const outModes = (_b = (_a = data.outModes) !== null && _a !== void 0 ? _a : data.outMode) !== null && _b !== void 0 ? _b : data.out_mode;
    if (outModes !== undefined) {
      if (typeof outModes === "object") {
        this.outModes.load(outModes);
      } else {
        this.outModes.load({
          default: outModes
        });
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Number/ParticlesDensity.js
class ParticlesDensity {
  constructor() {
    this.enable = false;
    this.width = 1920;
    this.height = 1080;
  }
  get area() {
    return this.width;
  }
  set area(value) {
    this.width = value;
  }
  get factor() {
    return this.height;
  }
  set factor(value) {
    this.height = value;
  }
  get value_area() {
    return this.area;
  }
  set value_area(value) {
    this.area = value;
  }
  load(data) {
    var _a, _b, _c;
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    const width = (_b = (_a = data.width) !== null && _a !== void 0 ? _a : data.area) !== null && _b !== void 0 ? _b : data.value_area;
    if (width !== undefined) {
      this.width = width;
    }
    const height = (_c = data.height) !== null && _c !== void 0 ? _c : data.factor;
    if (height !== undefined) {
      this.height = height;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Particles/Number/ParticlesNumber.js

class ParticlesNumber {
  constructor() {
    this.density = new ParticlesDensity();
    this.limit = 0;
    this.value = 0;
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

const charKey = "character",
  charAltKey = "char",
  imageKey = "image",
  imageAltKey = "images",
  polygonKey = "polygon",
  polygonAltKey = "star";
class Shape {
  constructor() {
    this.options = {};
    this.type = "circle";
  }
  get character() {
    var _a;
    return (_a = this.options[charKey]) !== null && _a !== void 0 ? _a : this.options[charAltKey];
  }
  set character(value) {
    this.options[charAltKey] = this.options[charKey] = value;
  }
  get custom() {
    return this.options;
  }
  set custom(value) {
    this.options = value;
  }
  get image() {
    var _a;
    return (_a = this.options[imageKey]) !== null && _a !== void 0 ? _a : this.options[imageAltKey];
  }
  set image(value) {
    this.options[imageAltKey] = this.options[imageKey] = value;
  }
  get images() {
    return this.image;
  }
  set images(value) {
    this.image = value;
  }
  get polygon() {
    var _a;
    return (_a = this.options[polygonKey]) !== null && _a !== void 0 ? _a : this.options[polygonAltKey];
  }
  set polygon(value) {
    this.options[polygonAltKey] = this.options[polygonKey] = value;
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
    this.loadShape(data.character, charKey, charAltKey, true);
    this.loadShape(data.polygon, polygonKey, polygonAltKey, false);
    this.loadShape((_c = data.image) !== null && _c !== void 0 ? _c : data.images, imageKey, imageAltKey, true);
    if (data.type !== undefined) {
      this.type = data.type;
    }
  }
  loadShape(item, mainKey, altKey, altOverride) {
    var _a, _b;
    if (!item) {
      return;
    }
    const isArray = item instanceof Array;
    const emptyValue = isArray ? [] : {},
      mainDifferentValues = isArray !== this.options[mainKey] instanceof Array,
      altDifferentValues = isArray !== this.options[altKey] instanceof Array;
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
      this.width = setRangeValue(data.width);
    }
    if (data.opacity !== undefined) {
      this.opacity = setRangeValue(data.opacity);
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
  constructor(engine, container) {
    this._engine = engine;
    this._container = container;
    this.bounce = new ParticlesBounce();
    this.collisions = new Collisions();
    this.color = new AnimatableColor();
    this.color.value = "#fff";
    this.groups = {};
    this.move = new Move();
    this.number = new ParticlesNumber();
    this.opacity = new Opacity();
    this.reduceDuplicates = false;
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
      this.stroke = executeOnSingleOrMultiple(strokeToLoad, t => {
        const tmp = new Stroke();
        tmp.load(t);
        return tmp;
      });
    }
    if (this._container) {
      const updaters = this._engine.plugins.updaters.get(this._container);
      if (updaters) {
        for (const updater of updaters) {
          if (updater.loadOptions) {
            updater.loadOptions(this, data);
          }
        }
      }
      const interactors = this._engine.plugins.interactors.get(this._container);
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/OptionsUtils.js

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
;// CONCATENATED MODULE: ../../engine/dist/esm/Options/Classes/Options.js










class Options {
  constructor(engine, container) {
    this._engine = engine;
    this._container = container;
    this.autoPlay = true;
    this.background = new Background();
    this.backgroundMask = new BackgroundMask();
    this.defaultThemes = {};
    this.delay = 0;
    this.fullScreen = new FullScreen();
    this.detectRetina = true;
    this.duration = 0;
    this.fpsLimit = 120;
    this.interactivity = new Interactivity(engine, container);
    this.manualParticles = [];
    this.particles = loadParticlesOptions(this._engine, this._container);
    this.pauseOnBlur = true;
    this.pauseOnOutsideViewport = true;
    this.responsive = [];
    this.smooth = false;
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
      executeOnSingleOrMultiple(data.preset, preset => this._importPreset(preset));
    }
    if (data.autoPlay !== undefined) {
      this.autoPlay = data.autoPlay;
    }
    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }
    const detectRetina = (_a = data.detectRetina) !== null && _a !== void 0 ? _a : data.retina_detect;
    if (detectRetina !== undefined) {
      this.detectRetina = detectRetina;
    }
    if (data.duration !== undefined) {
      this.duration = setRangeValue(data.duration);
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
    this.particles.load(data.particles);
    this.style = deepExtend(this.style, data.style);
    this._engine.plugins.loadOptions(this, data);
    if (data.smooth !== undefined) {
      this.smooth = data.smooth;
    }
    const interactors = this._engine.plugins.interactors.get(this._container);
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
        const existingTheme = this.themes.find(t => t.name === theme.name);
        if (!existingTheme) {
          const optTheme = new Theme();
          optTheme.load(theme);
          this.themes.push(optTheme);
        } else {
          existingTheme.load(theme);
        }
      }
    }
    this.defaultThemes.dark = (_d = this._findDefaultTheme("dark")) === null || _d === void 0 ? void 0 : _d.name;
    this.defaultThemes.light = (_e = this._findDefaultTheme("light")) === null || _e === void 0 ? void 0 : _e.name;
  }
  setResponsive(width, pxRatio, defaultOptions) {
    this.load(defaultOptions);
    const responsiveOptions = this.responsive.find(t => t.mode === "screen" && screen ? t.maxWidth > screen.availWidth : t.maxWidth * pxRatio > width);
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
      const mediaMatch = safeMatchMedia("(prefers-color-scheme: dark)"),
        clientDarkMode = mediaMatch && mediaMatch.matches,
        defaultTheme = this._findDefaultTheme(clientDarkMode ? "dark" : "light");
      if (defaultTheme) {
        this.load(defaultTheme.options);
      }
    }
  }
  _findDefaultTheme(mode) {
    var _a;
    return (_a = this.themes.find(theme => theme.default.value && theme.default.mode === mode)) !== null && _a !== void 0 ? _a : this.themes.find(theme => theme.default.value && theme.default.mode === "any");
  }
  _importPreset(preset) {
    this.load(this._engine.plugins.getPreset(preset));
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/InteractionManager.js
class InteractionManager {
  constructor(engine, container) {
    this.container = container;
    this._engine = engine;
    this._interactors = this._engine.plugins.getInteractors(this.container, true);
    this._externalInteractors = [];
    this._particleInteractors = [];
  }
  async externalInteract(delta) {
    for (const interactor of this._externalInteractors) {
      if (interactor.isEnabled()) {
        await interactor.interact(delta);
      }
    }
  }
  handleClickMode(mode) {
    for (const interactor of this._externalInteractors) {
      if (interactor.handleClickMode) {
        interactor.handleClickMode(mode);
      }
    }
  }
  init() {
    this._externalInteractors = [];
    this._particleInteractors = [];
    for (const interactor of this._interactors) {
      switch (interactor.type) {
        case "external":
          this._externalInteractors.push(interactor);
          break;
        case "particles":
          this._particleInteractors.push(interactor);
          break;
      }
      interactor.init();
    }
  }
  async particlesInteract(particle, delta) {
    for (const interactor of this._externalInteractors) {
      interactor.clear(particle, delta);
    }
    for (const interactor of this._particleInteractors) {
      if (interactor.isEnabled(particle)) {
        await interactor.interact(particle, delta);
      }
    }
  }
  async reset(particle) {
    for (const interactor of this._externalInteractors) {
      if (interactor.isEnabled()) {
        await interactor.reset(particle);
      }
    }
    for (const interactor of this._particleInteractors) {
      if (interactor.isEnabled(particle)) {
        await interactor.reset(particle);
      }
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Particle.js








const fixOutMode = data => {
  if (!isInArray(data.outMode, data.checkModes)) {
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
    this.container = container;
    this._engine = engine;
    this.init(id, position, overrideOptions, group);
  }
  destroy(override) {
    var _a;
    if (this.unbreakable || this.destroyed) {
      return;
    }
    this.destroyed = true;
    this.bubble.inRange = false;
    this.slow.inRange = false;
    for (const [, plugin] of this.container.plugins) {
      if (plugin.particleDestroyed) {
        plugin.particleDestroyed(this, override);
      }
    }
    for (const updater of this.container.particles.updaters) {
      if (updater.particleDestroyed) {
        updater.particleDestroyed(this, override);
      }
    }
    (_a = this.pathGenerator) === null || _a === void 0 ? void 0 : _a.reset(this);
  }
  draw(delta) {
    const container = this.container;
    for (const [, plugin] of container.plugins) {
      container.canvas.drawParticlePlugin(plugin, this, delta);
    }
    container.canvas.drawParticle(this, delta);
  }
  getFillColor() {
    var _a;
    return this._getRollColor((_a = this.bubble.color) !== null && _a !== void 0 ? _a : getHslFromAnimation(this.color));
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
    var _a;
    return this._getRollColor((_a = this.bubble.color) !== null && _a !== void 0 ? _a : getHslFromAnimation(this.strokeColor));
  }
  init(id, position, overrideOptions, group) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const container = this.container,
      engine = this._engine;
    this.id = id;
    this.group = group;
    this.fill = true;
    this.pathRotation = false;
    this.close = true;
    this.lastPathTime = 0;
    this.destroyed = false;
    this.unbreakable = false;
    this.rotation = 0;
    this.misplaced = false;
    this.retina = {
      maxDistance: {}
    };
    this.outType = "normal";
    this.ignoresResizeRatio = true;
    const pxRatio = container.retina.pixelRatio,
      mainOptions = container.actualOptions,
      particlesOptions = loadParticlesOptions(this._engine, container, mainOptions.particles),
      shapeType = particlesOptions.shape.type,
      {
        reduceDuplicates
      } = particlesOptions;
    this.shape = itemFromSingleOrMultiple(shapeType, this.id, reduceDuplicates);
    const shapeOptions = particlesOptions.shape;
    if (overrideOptions && overrideOptions.shape && overrideOptions.shape.type) {
      const overrideShapeType = overrideOptions.shape.type,
        shape = itemFromSingleOrMultiple(overrideShapeType, this.id, reduceDuplicates);
      if (shape) {
        this.shape = shape;
        shapeOptions.load(overrideOptions.shape);
      }
    }
    this.shapeData = this._loadShapeData(shapeOptions, reduceDuplicates);
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
      this.pathGenerator = this._engine.plugins.getPathGenerator(pathOptions.generator);
      if (this.pathGenerator && container.addPath(pathOptions.generator, this.pathGenerator)) {
        this.pathGenerator.init(container);
      }
    }
    const zIndexValue = getRangeValue(this.options.zIndex.value);
    container.retina.initParticle(this);
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
      this.size.status = "increasing";
      this.size.decay = 1 - getRangeValue(sizeAnimation.decay);
      switch (sizeAnimation.startValue) {
        case "min":
          this.size.value = this.size.min;
          this.size.status = "increasing";
          break;
        case "random":
          this.size.value = randomInRange(this.size);
          this.size.status = getRandom() >= 0.5 ? "increasing" : "decreasing";
          break;
        case "max":
        default:
          this.size.value = this.size.max;
          this.size.status = "decreasing";
          break;
      }
    }
    this.size.initialValue = this.size.value;
    this.bubble = {
      inRange: false
    };
    this.slow = {
      inRange: false,
      factor: 1
    };
    this.position = this._calcPosition(container, position, clamp(zIndexValue, 0, container.zLayers));
    this.initialPosition = this.position.copy();
    const canvasSize = container.canvas.size,
      moveCenter = Object.assign({}, this.options.move.center),
      isCenterPercent = moveCenter.mode === "percent";
    this.moveCenter = {
      x: moveCenter.x * (isCenterPercent ? canvasSize.width / 100 : 1),
      y: moveCenter.y * (isCenterPercent ? canvasSize.height / 100 : 1),
      radius: (_f = this.options.move.center.radius) !== null && _f !== void 0 ? _f : 0,
      mode: (_g = this.options.move.center.mode) !== null && _g !== void 0 ? _g : "percent"
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
    this.initialVelocity = this._calculateVelocity();
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
      drawer = this._engine.plugins.getShapeDrawer(this.shape);
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
      updater.init(this);
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
  isInsideCanvas() {
    const radius = this.getRadius(),
      canvasSize = this.container.canvas.size;
    return this.position.x >= -radius && this.position.y >= -radius && this.position.y <= canvasSize.height + radius && this.position.x <= canvasSize.width + radius;
  }
  isVisible() {
    return !this.destroyed && !this.spawning && this.isInsideCanvas();
  }
  reset() {
    var _a;
    for (const updater of this.container.particles.updaters) {
      (_a = updater.reset) === null || _a === void 0 ? void 0 : _a.call(updater, this);
    }
  }
  _calcPosition(container, position, zIndex, tryCount = 0) {
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
    if (this._checkOverlap(pos, tryCount)) {
      return this._calcPosition(container, undefined, zIndex, tryCount + 1);
    }
    return pos;
  }
  _calculateVelocity() {
    const baseVelocity = getParticleBaseVelocity(this.direction),
      res = baseVelocity.copy(),
      moveOptions = this.options.move;
    if (moveOptions.direction === "inside" || moveOptions.direction === "outside") {
      return res;
    }
    const rad = Math.PI / 180 * getRangeValue(moveOptions.angle.value),
      radOffset = Math.PI / 180 * getRangeValue(moveOptions.angle.offset),
      range = {
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
  _checkOverlap(pos, tryCount = 0) {
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
  _getRollColor(color) {
    var _a;
    if (!color || !this.roll || !this.backColor && !this.roll.alter) {
      return color;
    }
    const backFactor = this.roll.horizontal && this.roll.vertical ? 2 : 1,
      backSum = this.roll.horizontal ? Math.PI / 2 : 0,
      rolled = Math.floor((((_a = this.roll.angle) !== null && _a !== void 0 ? _a : 0) + backSum) / (Math.PI / backFactor)) % 2;
    if (!rolled) {
      return color;
    }
    if (this.backColor) {
      return this.backColor;
    }
    if (this.roll.alter) {
      return alterHsl(color, this.roll.alter.type, this.roll.alter.value);
    }
    return color;
  }
  _loadShapeData(shapeOptions, reduceDuplicates) {
    const shapeData = shapeOptions.options[this.shape];
    if (shapeData) {
      return deepExtend({}, itemFromSingleOrMultiple(shapeData, this.id, reduceDuplicates));
    }
  }
}
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
      distPos = {
        x: Math.abs(pos2.x - pos1.x),
        y: Math.abs(pos2.y - pos1.y)
      },
      r = this.radius;
    if (circle.radius !== undefined) {
      const rSum = r + circle.radius,
        dist = Math.sqrt(distPos.x ** 2 + distPos.y ** 2);
      return rSum > dist;
    } else if (rect.size !== undefined) {
      const w = rect.size.width,
        h = rect.size.height,
        edges = Math.pow(distPos.x - w, 2) + Math.pow(distPos.y - h, 2);
      return edges <= r ** 2 || distPos.x <= r + w && distPos.y <= r + h || distPos.x <= w || distPos.y <= h;
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
    if (range instanceof Circle) {
      range.intersects(this);
    }
    const w = this.size.width,
      h = this.size.height,
      pos1 = this.position,
      pos2 = range.position,
      size2 = range instanceof Rectangle ? range.size : {
        width: 0,
        height: 0
      },
      w2 = size2.width,
      h2 = size2.height;
    return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/QuadTree.js



class QuadTree {
  constructor(rectangle, capacity) {
    this.rectangle = rectangle;
    this.capacity = capacity;
    this._points = [];
    this._divided = false;
  }
  insert(point) {
    var _a, _b, _c, _d, _e;
    if (!this.rectangle.contains(point.position)) {
      return false;
    }
    if (this._points.length < this.capacity) {
      this._points.push(point);
      return true;
    }
    if (!this._divided) {
      this.subdivide();
    }
    return (_e = ((_a = this._NE) === null || _a === void 0 ? void 0 : _a.insert(point)) || ((_b = this._NW) === null || _b === void 0 ? void 0 : _b.insert(point)) || ((_c = this._SE) === null || _c === void 0 ? void 0 : _c.insert(point)) || ((_d = this._SW) === null || _d === void 0 ? void 0 : _d.insert(point))) !== null && _e !== void 0 ? _e : false;
  }
  query(range, check, found) {
    var _a, _b, _c, _d;
    const res = found !== null && found !== void 0 ? found : [];
    if (!range.intersects(this.rectangle)) {
      return [];
    }
    for (const p of this._points) {
      if (!range.contains(p.position) && getDistance(range.position, p.position) > p.particle.getRadius() && (!check || check(p.particle))) {
        continue;
      }
      res.push(p.particle);
    }
    if (this._divided) {
      (_a = this._NE) === null || _a === void 0 ? void 0 : _a.query(range, check, res);
      (_b = this._NW) === null || _b === void 0 ? void 0 : _b.query(range, check, res);
      (_c = this._SE) === null || _c === void 0 ? void 0 : _c.query(range, check, res);
      (_d = this._SW) === null || _d === void 0 ? void 0 : _d.query(range, check, res);
    }
    return res;
  }
  queryCircle(position, radius, check) {
    return this.query(new Circle(position.x, position.y, radius), check);
  }
  queryRectangle(position, size, check) {
    return this.query(new Rectangle(position.x, position.y, size.width, size.height), check);
  }
  subdivide() {
    const x = this.rectangle.position.x,
      y = this.rectangle.position.y,
      w = this.rectangle.size.width,
      h = this.rectangle.size.height,
      capacity = this.capacity;
    this._NE = new QuadTree(new Rectangle(x, y, w / 2, h / 2), capacity);
    this._NW = new QuadTree(new Rectangle(x + w / 2, y, w / 2, h / 2), capacity);
    this._SE = new QuadTree(new Rectangle(x, y + h / 2, w / 2, h / 2), capacity);
    this._SW = new QuadTree(new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2), capacity);
    this._divided = true;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Particles.js






class Particles {
  constructor(engine, container) {
    this.container = container;
    this._engine = engine;
    this.nextId = 0;
    this.array = [];
    this.zArray = [];
    this.pool = [];
    this.limit = 0;
    this.needsSort = false;
    this.lastZIndex = 0;
    this.interactionManager = new InteractionManager(this._engine, container);
    const canvasSize = this.container.canvas.size;
    this.quadTree = new QuadTree(new Rectangle(-canvasSize.width / 4, -canvasSize.height / 4, canvasSize.width * 3 / 2, canvasSize.height * 3 / 2), 4);
    this.movers = this._engine.plugins.getMovers(container, true);
    this.updaters = this._engine.plugins.getUpdaters(container, true);
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
  addParticle(position, overrideOptions, group, initializer) {
    const container = this.container,
      options = container.actualOptions,
      limit = options.particles.number.limit;
    if (limit > 0) {
      const countToRemove = this.count + 1 - limit;
      if (countToRemove > 0) {
        this.removeQuantity(countToRemove);
      }
    }
    return this._pushParticle(position, overrideOptions, group, initializer);
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
  handleClickMode(mode) {
    this.interactionManager.handleClickMode(mode);
  }
  init() {
    var _a;
    const container = this.container,
      options = container.actualOptions;
    this.lastZIndex = 0;
    this.needsSort = false;
    let handled = false;
    this.updaters = this._engine.plugins.getUpdaters(container, true);
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
    if (index < 0 || index > this.count) {
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
      this.pool.push(particle);
      deleted++;
      this._engine.dispatchEvent("particleRemoved", {
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
      this._applyDensity(options.particles.groups[group], 0, group);
    }
    this._applyDensity(options.particles, options.manualParticles.length);
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
      const resizeFactor = container.canvas.resizeFactor;
      if (resizeFactor && !particle.ignoresResizeRatio) {
        particle.position.x *= resizeFactor.width;
        particle.position.y *= resizeFactor.height;
        particle.initialPosition.x *= resizeFactor.width;
        particle.initialPosition.y *= resizeFactor.height;
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
    await this.interactionManager.externalInteract(delta);
    for (const particle of this.array) {
      for (const updater of this.updaters) {
        updater.update(particle, delta);
      }
      if (!particle.destroyed && !particle.spawning) {
        await this.interactionManager.particlesInteract(particle, delta);
      }
    }
    delete container.canvas.resizeFactor;
  }
  _applyDensity(options, manualCount, group) {
    var _a;
    if (!((_a = options.number.density) === null || _a === void 0 ? void 0 : _a.enable)) {
      return;
    }
    const numberOptions = options.number,
      densityFactor = this._initDensityFactor(numberOptions.density),
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
  _initDensityFactor(densityOptions) {
    const container = this.container;
    if (!container.canvas.element || !densityOptions.enable) {
      return 1;
    }
    const canvas = container.canvas.element,
      pxRatio = container.retina.pixelRatio;
    return canvas.width * canvas.height / (densityOptions.factor * pxRatio ** 2 * densityOptions.area);
  }
  _pushParticle(position, overrideOptions, group, initializer) {
    try {
      let particle = this.pool.pop();
      if (particle) {
        particle.init(this.nextId, position, overrideOptions, group);
      } else {
        particle = new Particle(this._engine, this.nextId, this.container, position, overrideOptions, group);
      }
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
      this._engine.dispatchEvent("particleAdded", {
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Retina.js


class Retina {
  constructor(container) {
    this.container = container;
  }
  init() {
    const container = this.container,
      options = container.actualOptions;
    this.pixelRatio = !options.detectRetina || isSsr() ? 1 : window.devicePixelRatio;
    this.reduceFactor = 1;
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
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Container.js









function guardCheck(container) {
  return container && !container.destroyed;
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
    init: () => {},
    update: () => {},
    reset: () => {}
  };
class Container {
  constructor(engine, id, sourceOptions) {
    this.id = id;
    this._engine = engine;
    this.fpsLimit = 120;
    this.smooth = false;
    this._delay = 0;
    this.duration = 0;
    this.lifeTime = 0;
    this._firstStart = true;
    this.started = false;
    this.destroyed = false;
    this._paused = true;
    this.lastFrameTime = 0;
    this.zLayers = 100;
    this.pageHidden = false;
    this._sourceOptions = sourceOptions;
    this._initialSourceOptions = sourceOptions;
    this.retina = new Retina(this);
    this.canvas = new Canvas(this);
    this.particles = new Particles(this._engine, this);
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
    this._options = loadContainerOptions(this._engine, this);
    this.actualOptions = loadContainerOptions(this._engine, this);
    this._eventListeners = new EventListeners(this);
    if (typeof IntersectionObserver !== "undefined" && IntersectionObserver) {
      this._intersectionObserver = new IntersectionObserver(entries => this._intersectionManager(entries));
    }
    this._engine.dispatchEvent("containerBuilt", {
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
        const element = this.canvas.element,
          canvasRect = element ? element.getBoundingClientRect() : undefined,
          pos = {
            x: lastTouch.clientX - (canvasRect ? canvasRect.left : 0),
            y: lastTouch.clientY - (canvasRect ? canvasRect.top : 0)
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
    let touched = false,
      touchMoved = false;
    el.addEventListener("click", clickHandler);
    el.addEventListener("touchstart", touchStartHandler);
    el.addEventListener("touchmove", touchMoveHandler);
    el.addEventListener("touchend", touchEndHandler);
    el.addEventListener("touchcancel", touchCancelHandler);
  }
  addPath(key, generator, override = false) {
    if (!guardCheck(this) || !override && this.pathGenerators.has(key)) {
      return false;
    }
    this.pathGenerators.set(key, generator !== null && generator !== void 0 ? generator : defaultPathGenerator);
    return true;
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
    this._engine.plugins.destroy(this);
    this.destroyed = true;
    const mainArr = this._engine.dom(),
      idx = mainArr.findIndex(t => t === this);
    if (idx >= 0) {
      mainArr.splice(idx, 1);
    }
    this._engine.dispatchEvent("containerDestroyed", {
      container: this
    });
  }
  draw(force) {
    if (!guardCheck(this)) {
      return;
    }
    let refreshTime = force;
    this._drawAnimationFrame = animate()(async timestamp => {
      if (refreshTime) {
        this.lastFrameTime = undefined;
        refreshTime = false;
      }
      await this.frameManager.nextFrame(timestamp);
    });
  }
  exportConfiguration() {
    return JSON.stringify(this.actualOptions, (key, value) => {
      if (key === "_engine" || key === "_container") {
        return;
      }
      return value;
    }, 2);
  }
  exportImage(callback, type, quality) {
    const element = this.canvas.element;
    if (element) {
      element.toBlob(callback, type !== null && type !== void 0 ? type : "image/png", quality);
    }
  }
  exportImg(callback) {
    this.exportImage(callback);
  }
  getAnimationStatus() {
    return !this._paused && !this.pageHidden && guardCheck(this);
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
    const shapes = this._engine.plugins.getSupportedShapes();
    for (const type of shapes) {
      const drawer = this._engine.plugins.getShapeDrawer(type);
      if (drawer) {
        this.drawers.set(type, drawer);
      }
    }
    this._options = loadContainerOptions(this._engine, this, this._initialSourceOptions, this.sourceOptions);
    this.actualOptions = loadContainerOptions(this._engine, this, this._options);
    const availablePlugins = this._engine.plugins.getAvailablePlugins(this);
    for (const [id, plugin] of availablePlugins) {
      this.plugins.set(id, plugin);
    }
    this.retina.init();
    await this.canvas.init();
    this.updateActualOptions();
    this.canvas.initBackground();
    this.canvas.resize();
    this.zLayers = this.actualOptions.zLayers;
    this.duration = getRangeValue(this.actualOptions.duration) * 1000;
    this._delay = getRangeValue(this.actualOptions.delay) * 1000;
    this.lifeTime = 0;
    this.fpsLimit = this.actualOptions.fpsLimit > 0 ? this.actualOptions.fpsLimit : 120;
    this.smooth = this.actualOptions.smooth;
    for (const [, drawer] of this.drawers) {
      if (drawer.init) {
        await drawer.init(this);
      }
    }
    for (const [, plugin] of this.plugins) {
      if (plugin.init) {
        await plugin.init();
      }
    }
    this._engine.dispatchEvent("containerInit", {
      container: this
    });
    this.particles.init();
    this.particles.setDensity();
    for (const [, plugin] of this.plugins) {
      if (plugin.particlesSetup) {
        plugin.particlesSetup();
      }
    }
    this._engine.dispatchEvent("particlesSetup", {
      container: this
    });
  }
  async loadTheme(name) {
    if (!guardCheck(this)) {
      return;
    }
    this._currentTheme = name;
    await this.refresh();
  }
  pause() {
    if (!guardCheck(this)) {
      return;
    }
    if (this._drawAnimationFrame !== undefined) {
      cancelAnimation()(this._drawAnimationFrame);
      delete this._drawAnimationFrame;
    }
    if (this._paused) {
      return;
    }
    for (const [, plugin] of this.plugins) {
      if (plugin.pause) {
        plugin.pause();
      }
    }
    if (!this.pageHidden) {
      this._paused = true;
    }
    this._engine.dispatchEvent("containerPaused", {
      container: this
    });
  }
  play(force) {
    if (!guardCheck(this)) {
      return;
    }
    const needsUpdate = this._paused || force;
    if (this._firstStart && !this.actualOptions.autoPlay) {
      this._firstStart = false;
      return;
    }
    if (this._paused) {
      this._paused = false;
    }
    if (needsUpdate) {
      for (const [, plugin] of this.plugins) {
        if (plugin.play) {
          plugin.play();
        }
      }
    }
    this._engine.dispatchEvent("containerPlay", {
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
    this._options = loadContainerOptions(this._engine, this);
    return this.refresh();
  }
  setNoise(noiseOrGenerator, init, update) {
    if (!guardCheck(this)) {
      return;
    }
    this.setPath(noiseOrGenerator, init, update);
  }
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
  async start() {
    if (!guardCheck(this) || this.started) {
      return;
    }
    await this.init();
    this.started = true;
    await new Promise(resolve => {
      this._delayTimeout = setTimeout(async () => {
        this._eventListeners.addListeners();
        if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
          this._intersectionObserver.observe(this.interactivity.element);
        }
        for (const [, plugin] of this.plugins) {
          if (plugin.start) {
            await plugin.start();
          }
        }
        this._engine.dispatchEvent("containerStarted", {
          container: this
        });
        this.play();
        resolve();
      }, this._delay);
    });
  }
  stop() {
    if (!guardCheck(this) || !this.started) {
      return;
    }
    if (this._delayTimeout) {
      clearTimeout(this._delayTimeout);
      delete this._delayTimeout;
    }
    this._firstStart = true;
    this.started = false;
    this._eventListeners.removeListeners();
    this.pause();
    this.particles.clear();
    this.canvas.stop();
    if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
      this._intersectionObserver.unobserve(this.interactivity.element);
    }
    for (const [, plugin] of this.plugins) {
      if (plugin.stop) {
        plugin.stop();
      }
    }
    for (const key of this.plugins.keys()) {
      this.plugins.delete(key);
    }
    this._sourceOptions = this._options;
    this._engine.dispatchEvent("containerStopped", {
      container: this
    });
  }
  updateActualOptions() {
    this.actualOptions.responsive = [];
    const newMaxWidth = this.actualOptions.setResponsive(this.canvas.size.width, this.retina.pixelRatio, this._options);
    this.actualOptions.setTheme(this._currentTheme);
    if (this.responsiveMaxWidth === newMaxWidth) {
      return false;
    }
    this.responsiveMaxWidth = newMaxWidth;
    return true;
  }
  _intersectionManager(entries) {
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Loader.js




async function getDataFromUrl(jsonUrl, index) {
  const url = itemFromSingleOrMultiple(jsonUrl, index);
  if (!url) {
    return;
  }
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  console.error(`tsParticles - Error ${response.status} while retrieving config file`);
}
class Loader {
  constructor(engine) {
    this._engine = engine;
  }
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
  async loadOptions(params) {
    var _a, _b, _c;
    const tagId = (_a = params.tagId) !== null && _a !== void 0 ? _a : `tsparticles${Math.floor(getRandom() * 10000)}`,
      {
        index,
        url: jsonUrl,
        remote
      } = params,
      options = remote ? await getDataFromUrl(jsonUrl, index) : params.options;
    let domContainer = (_b = params.element) !== null && _b !== void 0 ? _b : document.getElementById(tagId);
    if (!domContainer) {
      domContainer = document.createElement("div");
      domContainer.id = tagId;
      (_c = document.querySelector("body")) === null || _c === void 0 ? void 0 : _c.append(domContainer);
    }
    const currentOptions = itemFromSingleOrMultiple(options, index),
      dom = this._engine.dom(),
      oldIndex = dom.findIndex(v => v.id === tagId);
    if (oldIndex >= 0) {
      const old = this._engine.domItem(oldIndex);
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
    const newItem = new Container(this._engine, tagId, currentOptions);
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/Plugins.js

function getItemsFromInitializer(container, map, initializers, force = false) {
  let res = map.get(container);
  if (!res || force) {
    res = [...initializers.values()].map(t => t(container));
    map.set(container, res);
  }
  return res;
}
class Plugins {
  constructor(engine) {
    this._engine = engine;
    this.plugins = [];
    this._initializers = {
      interactors: new Map(),
      movers: new Map(),
      updaters: new Map()
    };
    this.interactors = new Map();
    this.movers = new Map();
    this.updaters = new Map();
    this.presets = new Map();
    this.drawers = new Map();
    this.pathGenerators = new Map();
  }
  addInteractor(name, initInteractor) {
    this._initializers.interactors.set(name, initInteractor);
  }
  addParticleMover(name, initMover) {
    this._initializers.movers.set(name, initMover);
  }
  addParticleUpdater(name, initUpdater) {
    this._initializers.updaters.set(name, initUpdater);
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
  addShapeDrawer(types, drawer) {
    executeOnSingleOrMultiple(types, type => {
      if (!this.getShapeDrawer(type)) {
        this.drawers.set(type, drawer);
      }
    });
  }
  destroy(container) {
    this.updaters.delete(container);
    this.movers.delete(container);
    this.interactors.delete(container);
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
  getInteractors(container, force = false) {
    return getItemsFromInitializer(container, this.interactors, this._initializers.interactors, force);
  }
  getMovers(container, force = false) {
    return getItemsFromInitializer(container, this.movers, this._initializers.movers, force);
  }
  getPathGenerator(type) {
    return this.pathGenerators.get(type);
  }
  getPlugin(plugin) {
    return this.plugins.find(t => t.id === plugin);
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
    return getItemsFromInitializer(container, this.updaters, this._initializers.updaters, force);
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
;// CONCATENATED MODULE: ../../engine/dist/esm/engine.js



class Engine {
  constructor() {
    this._domArray = [];
    this._eventDispatcher = new EventDispatcher();
    this._initialized = false;
    this._loader = new Loader(this);
    this.plugins = new Plugins(this);
  }
  get version() {
    return "2.9.3";
  }
  addEventListener(type, listener) {
    this._eventDispatcher.addEventListener(type, listener);
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
    this._eventDispatcher.dispatchEvent(type, args);
  }
  dom() {
    return this._domArray;
  }
  domItem(index) {
    const dom = this.dom(),
      item = dom[index];
    if (item && !item.destroyed) {
      return item;
    }
    dom.splice(index, 1);
  }
  init() {
    if (!this._initialized) {
      this._initialized = true;
    }
  }
  async load(tagId, options) {
    return this._loader.load(tagId, options);
  }
  async loadFromArray(tagId, options, index) {
    return this._loader.load(tagId, options, index);
  }
  async loadJSON(tagId, pathConfigJson, index) {
    return this._loader.loadJSON(tagId, pathConfigJson, index);
  }
  async refresh() {
    for (const instance of this.dom()) {
      await instance.refresh();
    }
  }
  removeEventListener(type, listener) {
    this._eventDispatcher.removeEventListener(type, listener);
  }
  async set(id, element, options) {
    return this._loader.set(id, element, options);
  }
  async setJSON(id, element, pathConfigJson, index) {
    return this._loader.setJSON(id, element, pathConfigJson, index);
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/HslColorManager.js


class HslColorManager {
  constructor() {
    this.key = "hsl";
    this.stringPrefix = "hsl";
  }
  handleColor(color) {
    var _a;
    const colorValue = color.value,
      hslColor = (_a = colorValue.hsl) !== null && _a !== void 0 ? _a : color.value;
    if (hslColor.h !== undefined && hslColor.s !== undefined && hslColor.l !== undefined) {
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Utils/RgbColorManager.js

class RgbColorManager {
  constructor() {
    this.key = "rgb";
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
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/ExternalInteractorBase.js
class ExternalInteractorBase {
  constructor(container) {
    this.container = container;
    this.type = "external";
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/Core/Utils/ParticlesInteractorBase.js
class ParticlesInteractorBase {
  constructor(container) {
    this.container = container;
    this.type = "particles";
  }
}
;// CONCATENATED MODULE: ../../engine/dist/esm/index.js




const rgbColorManager = new RgbColorManager(),
  hslColorManager = new HslColorManager();
addColorManager(rgbColorManager);
addColorManager(hslColorManager);
const tsParticles = new Engine();
tsParticles.init();























































































































































































;// CONCATENATED MODULE: ../../updaters/angle/dist/esm/Options/Classes/RotateAnimation.js

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
;// CONCATENATED MODULE: ../../updaters/angle/dist/esm/Options/Classes/Rotate.js


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
;// CONCATENATED MODULE: ../../updaters/angle/dist/esm/RotateUpdater.js


function updateAngle(particle, delta) {
  var _a, _b;
  const rotate = particle.rotate,
    rotateOptions = particle.options.rotate;
  if (!rotate || !rotateOptions) {
    return;
  }
  const rotateAnimation = rotateOptions.animation,
    speed = ((_a = rotate.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor,
    max = 2 * Math.PI,
    decay = (_b = rotate.decay) !== null && _b !== void 0 ? _b : 1;
  if (!rotateAnimation.enable) {
    return;
  }
  switch (rotate.status) {
    case "increasing":
      rotate.value += speed;
      if (rotate.value > max) {
        rotate.value -= max;
      }
      break;
    case "decreasing":
    default:
      rotate.value -= speed;
      if (rotate.value < 0) {
        rotate.value += max;
      }
      break;
  }
  if (rotate.velocity && decay !== 1) {
    rotate.velocity *= decay;
  }
}
class RotateUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const rotateOptions = particle.options.rotate;
    if (!rotateOptions) {
      return;
    }
    particle.rotate = {
      enable: rotateOptions.animation.enable,
      value: getRangeValue(rotateOptions.value) * Math.PI / 180
    };
    particle.pathRotation = rotateOptions.path;
    let rotateDirection = rotateOptions.direction;
    if (rotateDirection === "random") {
      const index = Math.floor(getRandom() * 2);
      rotateDirection = index > 0 ? "counter-clockwise" : "clockwise";
    }
    switch (rotateDirection) {
      case "counter-clockwise":
      case "counterClockwise":
        particle.rotate.status = "decreasing";
        break;
      case "clockwise":
        particle.rotate.status = "increasing";
        break;
    }
    const rotateAnimation = rotateOptions.animation;
    if (rotateAnimation.enable) {
      particle.rotate.decay = 1 - getRangeValue(rotateAnimation.decay);
      particle.rotate.velocity = getRangeValue(rotateAnimation.speed) / 360 * this.container.retina.reduceFactor;
      if (!rotateAnimation.sync) {
        particle.rotate.velocity *= getRandom();
      }
    }
    particle.rotation = particle.rotate.value;
  }
  isEnabled(particle) {
    const rotate = particle.options.rotate;
    if (!rotate) {
      return false;
    }
    return !particle.destroyed && !particle.spawning && rotate.animation.enable && !rotate.path;
  }
  loadOptions(options, ...sources) {
    if (!options.rotate) {
      options.rotate = new Rotate();
    }
    for (const source of sources) {
      options.rotate.load(source === null || source === void 0 ? void 0 : source.rotate);
    }
  }
  update(particle, delta) {
    var _a, _b;
    if (!this.isEnabled(particle)) {
      return;
    }
    updateAngle(particle, delta);
    particle.rotation = (_b = (_a = particle.rotate) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 0;
  }
}
;// CONCATENATED MODULE: ../../updaters/angle/dist/esm/index.js

async function loadAngleUpdater(engine) {
  await engine.addParticleUpdater("rotate", container => new RotateUpdater(container));
}
;// CONCATENATED MODULE: ../../move/base/dist/esm/Utils.js

function applyDistance(particle) {
  const initialPosition = particle.initialPosition,
    {
      dx,
      dy
    } = getDistances(initialPosition, particle.position),
    dxFixed = Math.abs(dx),
    dyFixed = Math.abs(dy),
    hDistance = particle.retina.maxDistance.horizontal,
    vDistance = particle.retina.maxDistance.vertical;
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
      vel.x *= -getRandom();
    }
    if (vDistance && (pos.y < initialPosition.y && vel.y < 0 || pos.y > initialPosition.y && vel.y > 0)) {
      vel.y *= -getRandom();
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
  var _a;
  const particlesOptions = particle.options,
    pathOptions = particlesOptions.move.path,
    pathEnabled = pathOptions.enable;
  if (!pathEnabled) {
    return;
  }
  if (particle.lastPathTime <= particle.pathDelay) {
    particle.lastPathTime += delta.value;
    return;
  }
  const path = (_a = particle.pathGenerator) === null || _a === void 0 ? void 0 : _a.generate(particle);
  if (path) {
    particle.velocity.addTo(path);
  }
  if (pathOptions.clamp) {
    particle.velocity.x = clamp(particle.velocity.x, -1, 1);
    particle.velocity.y = clamp(particle.velocity.y, -1, 1);
  }
  particle.lastPathTime -= particle.pathDelay;
}
function getProximitySpeedFactor(particle) {
  return particle.slow.inRange ? particle.slow.factor : 1;
}
;// CONCATENATED MODULE: ../../move/base/dist/esm/BaseMover.js


class BaseMover {
  init(particle) {
    var _a;
    const container = particle.container,
      options = particle.options,
      gravityOptions = options.move.gravity,
      spinOptions = options.move.spin;
    particle.gravity = {
      enable: gravityOptions.enable,
      acceleration: getRangeValue(gravityOptions.acceleration),
      inverse: gravityOptions.inverse
    };
    if (spinOptions.enable) {
      const spinPos = (_a = spinOptions.position) !== null && _a !== void 0 ? _a : {
          x: 50,
          y: 50
        },
        spinCenter = {
          x: spinPos.x / 100 * container.canvas.size.width,
          y: spinPos.y / 100 * container.canvas.size.height
        },
        pos = particle.getPosition(),
        distance = getDistance(pos, spinCenter),
        spinAcceleration = getRangeValue(spinOptions.acceleration);
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
    if (moveOptions.spin.enable) {
      spin(particle, moveSpeed);
    } else {
      applyPath(particle, delta);
      const gravityOptions = particle.gravity,
        gravityFactor = (gravityOptions === null || gravityOptions === void 0 ? void 0 : gravityOptions.enable) && gravityOptions.inverse ? -1 : 1;
      if ((gravityOptions === null || gravityOptions === void 0 ? void 0 : gravityOptions.enable) && moveSpeed) {
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
      if ((gravityOptions === null || gravityOptions === void 0 ? void 0 : gravityOptions.enable) && maxSpeed > 0 && (!gravityOptions.inverse && velocity.y >= 0 && velocity.y >= maxSpeed || gravityOptions.inverse && velocity.y <= 0 && velocity.y <= -maxSpeed)) {
        velocity.y = gravityFactor * maxSpeed;
        if (moveSpeed) {
          particle.velocity.y = velocity.y / moveSpeed;
        }
      }
      const zIndexOptions = particle.options.zIndex,
        zVelocityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.velocityRate;
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
  draw(context, particle, radius) {
    if (!particle.circleRange) {
      particle.circleRange = {
        min: 0,
        max: Math.PI * 2
      };
    }
    const circleRange = particle.circleRange;
    context.arc(0, 0, radius, circleRange.min, circleRange.max, false);
  }
  getSidesCount() {
    return 12;
  }
  particleInit(container, particle) {
    var _a;
    const shapeData = particle.shapeData,
      angle = (_a = shapeData === null || shapeData === void 0 ? void 0 : shapeData.angle) !== null && _a !== void 0 ? _a : {
        max: 360,
        min: 0
      };
    particle.circleRange = typeof angle !== "object" ? {
      min: 0,
      max: angle * Math.PI / 180
    } : {
      min: angle.min * Math.PI / 180,
      max: angle.max * Math.PI / 180
    };
  }
}
;// CONCATENATED MODULE: ../../shapes/circle/dist/esm/index.js

async function loadCircleShape(engine) {
  await engine.addShape("circle", new CircleDrawer());
}
;// CONCATENATED MODULE: ../../updaters/color/dist/esm/ColorUpdater.js

function updateColorValue(delta, value, valueAnimation, max, decrease) {
  var _a, _b;
  const colorValue = value;
  if (!colorValue || !valueAnimation.enable || colorValue.loops !== undefined && colorValue.maxLoops !== undefined && colorValue.maxLoops > 0 && colorValue.loops >= colorValue.maxLoops) {
    return;
  }
  const offset = randomInRange(valueAnimation.offset),
    velocity = ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor + offset * 3.6,
    decay = (_b = value.decay) !== null && _b !== void 0 ? _b : 1;
  if (!decrease || colorValue.status === "increasing") {
    colorValue.value += velocity;
    if (colorValue.value > max) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      if (decrease) {
        colorValue.status = "decreasing";
        colorValue.value -= colorValue.value % max;
      }
    }
  } else {
    colorValue.value -= velocity;
    if (colorValue.value < 0) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      colorValue.status = "increasing";
      colorValue.value += colorValue.value;
    }
  }
  if (colorValue.velocity && decay !== 1) {
    colorValue.velocity *= decay;
  }
  if (colorValue.value > max) {
    colorValue.value %= max;
  }
}
function updateColor(particle, delta) {
  var _a, _b, _c;
  const animationOptions = particle.options.color.animation;
  const h = (_a = particle.color) === null || _a === void 0 ? void 0 : _a.h,
    s = (_b = particle.color) === null || _b === void 0 ? void 0 : _b.s,
    l = (_c = particle.color) === null || _c === void 0 ? void 0 : _c.l;
  if (h) {
    updateColorValue(delta, h, animationOptions.h, 360, false);
  }
  if (s) {
    updateColorValue(delta, s, animationOptions.s, 100, true);
  }
  if (l) {
    updateColorValue(delta, l, animationOptions.l, 100, true);
  }
}
class ColorUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const hslColor = rangeColorToHsl(particle.options.color, particle.id, particle.options.reduceDuplicates);
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
;// CONCATENATED MODULE: ../../interactions/external/attract/dist/esm/Options/Classes/Attract.js
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
;// CONCATENATED MODULE: ../../interactions/external/attract/dist/esm/Attractor.js


class Attractor extends ExternalInteractorBase {
  constructor(engine, container) {
    super(container);
    this._engine = engine;
    if (!container.attract) {
      container.attract = {
        particles: []
      };
    }
    this.handleClickMode = mode => {
      const options = this.container.actualOptions,
        attract = options.interactivity.modes.attract;
      if (!attract || mode !== "attract") {
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
        if (!this.isEnabled(particle)) {
          continue;
        }
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
      }, attract.duration * 1000);
    };
  }
  clear() {}
  init() {
    const container = this.container,
      attract = container.actualOptions.interactivity.modes.attract;
    if (!attract) {
      return;
    }
    container.retina.attractModeDistance = attract.distance * container.retina.pixelRatio;
  }
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
  isEnabled(particle) {
    var _a;
    const container = this.container,
      options = container.actualOptions,
      mouse = container.interactivity.mouse,
      events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : options.interactivity).events;
    if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
      return false;
    }
    const hoverMode = events.onHover.mode,
      clickMode = events.onClick.mode;
    return isInArray("attract", hoverMode) || isInArray("attract", clickMode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.attract) {
      options.attract = new Attract();
    }
    for (const source of sources) {
      options.attract.load(source === null || source === void 0 ? void 0 : source.attract);
    }
  }
  reset() {}
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
      const mousePos = container.interactivity.mouse.clickPosition,
        attractRadius = container.retina.attractModeDistance;
      if (!attractRadius || attractRadius < 0 || !mousePos) {
        return;
      }
      this.processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
    } else if (container.attract.clicking === false) {
      container.attract.particles = [];
    }
    return;
  }
  hoverAttract() {
    const container = this.container,
      mousePos = container.interactivity.mouse.position,
      attractRadius = container.retina.attractModeDistance;
    if (!attractRadius || attractRadius < 0 || !mousePos) {
      return;
    }
    this.processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
  }
  processAttract(position, attractRadius, area) {
    const container = this.container,
      attractOptions = container.actualOptions.interactivity.modes.attract;
    if (!attractOptions) {
      return;
    }
    const query = container.particles.quadTree.query(area, p => this.isEnabled(p));
    for (const particle of query) {
      const {
        dx,
        dy,
        distance
      } = getDistances(particle.position, position);
      const velocity = attractOptions.speed * attractOptions.factor;
      const attractFactor = clamp(getEasing(attractOptions.easing)(1 - distance / attractRadius) * velocity, 0, attractOptions.maxSpeed);
      const normVec = Vector.create(distance === 0 ? velocity : dx / distance * attractFactor, distance === 0 ? velocity : dy / distance * attractFactor);
      particle.position.subFrom(normVec);
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/attract/dist/esm/index.js

async function loadExternalAttractInteraction(engine) {
  await engine.addInteractor("externalAttract", container => new Attractor(engine, container));
}


;// CONCATENATED MODULE: ../../interactions/external/bounce/dist/esm/Options/Classes/Bounce.js
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
;// CONCATENATED MODULE: ../../interactions/external/bounce/dist/esm/Bouncer.js


class Bouncer extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {}
  init() {
    const container = this.container,
      bounce = container.actualOptions.interactivity.modes.bounce;
    if (!bounce) {
      return;
    }
    container.retina.bounceModeDistance = bounce.distance * container.retina.pixelRatio;
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
  isEnabled(particle) {
    var _a;
    const container = this.container,
      options = container.actualOptions,
      mouse = container.interactivity.mouse,
      events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : options.interactivity).events,
      divs = events.onDiv;
    return mouse.position && events.onHover.enable && isInArray("bounce", events.onHover.mode) || isDivModeEnabled("bounce", divs);
  }
  loadModeOptions(options, ...sources) {
    if (!options.bounce) {
      options.bounce = new Bounce();
    }
    for (const source of sources) {
      options.bounce.load(source === null || source === void 0 ? void 0 : source.bounce);
    }
  }
  reset() {}
  processBounce(position, radius, area) {
    const query = this.container.particles.quadTree.query(area, p => this.isEnabled(p));
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
  processMouseBounce() {
    const container = this.container,
      pxRatio = container.retina.pixelRatio,
      tolerance = 10 * pxRatio,
      mousePos = container.interactivity.mouse.position,
      radius = container.retina.bounceModeDistance;
    if (!radius || radius < 0 || !mousePos) {
      return;
    }
    this.processBounce(mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance));
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
}
;// CONCATENATED MODULE: ../../interactions/external/bounce/dist/esm/index.js

async function loadExternalBounceInteraction(engine) {
  await engine.addInteractor("externalBounce", container => new Bouncer(container));
}


;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/esm/Options/Classes/BubbleBase.js

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
      const sourceColor = this.color instanceof Array ? undefined : this.color;
      this.color = executeOnSingleOrMultiple(data.color, color => {
        return OptionsColor.create(sourceColor, color);
      });
    }
    if (data.size !== undefined) {
      this.size = data.size;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/esm/Options/Classes/BubbleDiv.js


class BubbleDiv extends BubbleBase {
  constructor() {
    super();
    this.selectors = [];
  }
  get ids() {
    return executeOnSingleOrMultiple(this.selectors, t => t.replace("#", ""));
  }
  set ids(value) {
    this.selectors = executeOnSingleOrMultiple(value, t => `#${t}`);
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
;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/esm/Options/Classes/Bubble.js



class Bubble extends BubbleBase {
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    this.divs = executeOnSingleOrMultiple(data.divs, div => {
      const tmp = new BubbleDiv();
      tmp.load(div);
      return tmp;
    });
  }
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
  clear(particle, delta, force) {
    if (particle.bubble.inRange && !force) {
      return;
    }
    delete particle.bubble.div;
    delete particle.bubble.opacity;
    delete particle.bubble.radius;
    delete particle.bubble.color;
  }
  init() {
    const container = this.container,
      bubble = container.actualOptions.interactivity.modes.bubble;
    if (!bubble) {
      return;
    }
    container.retina.bubbleModeDistance = bubble.distance * container.retina.pixelRatio;
    if (bubble.size !== undefined) {
      container.retina.bubbleModeSize = bubble.size * container.retina.pixelRatio;
    }
  }
  async interact(delta) {
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
      this.hoverBubble(delta);
    } else if (clickEnabled && isInArray("bubble", clickMode)) {
      this.clickBubble(delta);
    } else {
      divModeExecute("bubble", divs, (selector, div) => this.singleSelectorHover(delta, selector, div));
    }
  }
  isEnabled(particle) {
    var _a;
    const container = this.container,
      options = container.actualOptions,
      mouse = container.interactivity.mouse,
      events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : options.interactivity).events,
      divs = events.onDiv,
      divBubble = isDivModeEnabled("bubble", divs);
    if (!(divBubble || events.onHover.enable && mouse.position || events.onClick.enable && mouse.clickPosition)) {
      return false;
    }
    const hoverMode = events.onHover.mode;
    const clickMode = events.onClick.mode;
    return isInArray("bubble", hoverMode) || isInArray("bubble", clickMode) || divBubble;
  }
  loadModeOptions(options, ...sources) {
    if (!options.bubble) {
      options.bubble = new Bubble();
    }
    for (const source of sources) {
      options.bubble.load(source === null || source === void 0 ? void 0 : source.bubble);
    }
  }
  reset(particle) {
    particle.bubble.inRange = false;
  }
  clickBubble(delta) {
    var _a, _b;
    const container = this.container,
      options = container.actualOptions,
      mouseClickPos = container.interactivity.mouse.clickPosition,
      bubble = options.interactivity.modes.bubble;
    if (!bubble || !mouseClickPos) {
      return;
    }
    if (!container.bubble) {
      container.bubble = {};
    }
    const distance = container.retina.bubbleModeDistance;
    if (!distance || distance < 0) {
      return;
    }
    const query = container.particles.quadTree.queryCircle(mouseClickPos, distance, p => this.isEnabled(p));
    for (const particle of query) {
      if (!container.bubble.clicking) {
        continue;
      }
      particle.bubble.inRange = !container.bubble.durationEnd;
      const pos = particle.getPosition(),
        distMouse = getDistance(pos, mouseClickPos),
        timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime || 0)) / 1000;
      if (timeSpent > bubble.duration) {
        container.bubble.durationEnd = true;
      }
      if (timeSpent > bubble.duration * 2) {
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
          optValue: bubble.opacity,
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
        if (distMouse <= distance) {
          this.hoverBubbleColor(particle, distMouse);
        } else {
          delete particle.bubble.color;
        }
      } else {
        delete particle.bubble.color;
      }
    }
  }
  hoverBubble(delta) {
    const container = this.container,
      mousePos = container.interactivity.mouse.position,
      distance = container.retina.bubbleModeDistance;
    if (!distance || distance < 0 || mousePos === undefined) {
      return;
    }
    const query = container.particles.quadTree.queryCircle(mousePos, distance, p => this.isEnabled(p));
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
  hoverBubbleColor(particle, ratio, divBubble) {
    const options = this.container.actualOptions;
    const bubbleOptions = divBubble !== null && divBubble !== void 0 ? divBubble : options.interactivity.modes.bubble;
    if (!bubbleOptions) {
      return;
    }
    if (!particle.bubble.finalColor) {
      const modeColor = bubbleOptions.color;
      if (!modeColor) {
        return;
      }
      const bubbleColor = itemFromSingleOrMultiple(modeColor);
      particle.bubble.finalColor = rangeColorToHsl(bubbleColor);
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
  hoverBubbleOpacity(particle, ratio, divBubble) {
    var _a, _b, _c, _d;
    const container = this.container,
      options = container.actualOptions,
      modeOpacity = (_a = divBubble === null || divBubble === void 0 ? void 0 : divBubble.opacity) !== null && _a !== void 0 ? _a : (_b = options.interactivity.modes.bubble) === null || _b === void 0 ? void 0 : _b.opacity;
    if (!modeOpacity) {
      return;
    }
    const optOpacity = particle.options.opacity.value;
    const pOpacity = (_d = (_c = particle.opacity) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 1;
    const opacity = calculateBubbleValue(pOpacity, modeOpacity, getRangeMax(optOpacity), ratio);
    if (opacity !== undefined) {
      particle.bubble.opacity = opacity;
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
  process(particle, distMouse, timeSpent, data) {
    const container = this.container,
      bubbleParam = data.bubbleObj.optValue,
      options = container.actualOptions,
      bubble = options.interactivity.modes.bubble;
    if (!bubble || bubbleParam === undefined) {
      return;
    }
    const bubbleDuration = bubble.duration,
      bubbleDistance = container.retina.bubbleModeDistance,
      particlesParam = data.particlesObj.optValue,
      pObjBubble = data.bubbleObj.value,
      pObj = data.particlesObj.value || 0,
      type = data.type;
    if (!bubbleDistance || bubbleDistance < 0 || bubbleParam === particlesParam) {
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
  singleSelectorHover(delta, selector, div) {
    const container = this.container,
      selectors = document.querySelectorAll(selector),
      bubble = container.actualOptions.interactivity.modes.bubble;
    if (!bubble || !selectors.length) {
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
        query = container.particles.quadTree.query(area, p => this.isEnabled(p));
      for (const particle of query) {
        if (!area.contains(particle.getPosition())) {
          continue;
        }
        particle.bubble.inRange = true;
        const divs = bubble.divs;
        const divBubble = divMode(divs, elem);
        if (!particle.bubble.div || particle.bubble.div !== elem) {
          this.clear(particle, delta, true);
          particle.bubble.div = elem;
        }
        this.hoverBubbleSize(particle, 1, divBubble);
        this.hoverBubbleOpacity(particle, 1, divBubble);
        this.hoverBubbleColor(particle, 1, divBubble);
      }
    });
  }
}
;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/esm/index.js

async function loadExternalBubbleInteraction(engine) {
  await engine.addInteractor("externalBubble", container => new Bubbler(container));
}






;// CONCATENATED MODULE: ../../interactions/external/connect/dist/esm/Options/Classes/ConnectLinks.js
class ConnectLinks {
  constructor() {
    this.opacity = 0.5;
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
;// CONCATENATED MODULE: ../../interactions/external/connect/dist/esm/Options/Classes/Connect.js

class Connect {
  constructor() {
    this.distance = 80;
    this.links = new ConnectLinks();
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
;// CONCATENATED MODULE: ../../interactions/external/connect/dist/esm/Connector.js


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
function drawConnectLine(context, width, lineStyle, begin, end) {
  drawLine(context, begin, end);
  context.lineWidth = width;
  context.strokeStyle = lineStyle;
  context.stroke();
}
function lineStyle(container, ctx, p1, p2) {
  const options = container.actualOptions,
    connectOptions = options.interactivity.modes.connect;
  if (!connectOptions) {
    return;
  }
  return gradient(ctx, p1, p2, connectOptions.links.opacity);
}
function drawConnection(container, p1, p2) {
  container.canvas.draw(ctx => {
    var _a;
    const ls = lineStyle(container, ctx, p1, p2);
    if (!ls) {
      return;
    }
    const pos1 = p1.getPosition(),
      pos2 = p2.getPosition();
    drawConnectLine(ctx, (_a = p1.retina.linksWidth) !== null && _a !== void 0 ? _a : 0, ls, pos1, pos2);
  });
}
class Connector extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {}
  init() {
    const container = this.container,
      connect = container.actualOptions.interactivity.modes.connect;
    if (!connect) {
      return;
    }
    container.retina.connectModeDistance = connect.distance * container.retina.pixelRatio;
    container.retina.connectModeRadius = connect.radius * container.retina.pixelRatio;
  }
  async interact() {
    const container = this.container,
      options = container.actualOptions;
    if (options.interactivity.events.onHover.enable && container.interactivity.status === "pointermove") {
      const mousePos = container.interactivity.mouse.position;
      if (!container.retina.connectModeDistance || container.retina.connectModeDistance < 0 || !container.retina.connectModeRadius || container.retina.connectModeRadius < 0 || !mousePos) {
        return;
      }
      const distance = Math.abs(container.retina.connectModeRadius),
        query = container.particles.quadTree.queryCircle(mousePos, distance, p => this.isEnabled(p));
      let i = 0;
      for (const p1 of query) {
        const pos1 = p1.getPosition();
        for (const p2 of query.slice(i + 1)) {
          const pos2 = p2.getPosition(),
            distMax = Math.abs(container.retina.connectModeDistance),
            xDiff = Math.abs(pos1.x - pos2.x),
            yDiff = Math.abs(pos1.y - pos2.y);
          if (xDiff < distMax && yDiff < distMax) {
            drawConnection(container, p1, p2);
          }
        }
        ++i;
      }
    }
  }
  isEnabled(particle) {
    var _a;
    const container = this.container,
      mouse = container.interactivity.mouse,
      events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : container.actualOptions.interactivity).events;
    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }
    return isInArray("connect", events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.connect) {
      options.connect = new Connect();
    }
    for (const source of sources) {
      options.connect.load(source === null || source === void 0 ? void 0 : source.connect);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/connect/dist/esm/index.js

async function loadExternalConnectInteraction(engine) {
  await engine.addInteractor("externalConnect", container => new Connector(container));
}




;// CONCATENATED MODULE: ../../interactions/external/grab/dist/esm/Options/Classes/GrabLinks.js

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
;// CONCATENATED MODULE: ../../interactions/external/grab/dist/esm/Options/Classes/Grab.js

class Grab {
  constructor() {
    this.distance = 100;
    this.links = new GrabLinks();
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
;// CONCATENATED MODULE: ../../interactions/external/grab/dist/esm/Grabber.js


function drawGrabLine(context, width, begin, end, colorLine, opacity) {
  drawLine(context, begin, end);
  context.strokeStyle = getStyleFromRgb(colorLine, opacity);
  context.lineWidth = width;
  context.stroke();
}
function drawGrab(container, particle, lineColor, opacity, mousePos) {
  container.canvas.draw(ctx => {
    var _a;
    const beginPos = particle.getPosition();
    drawGrabLine(ctx, (_a = particle.retina.linksWidth) !== null && _a !== void 0 ? _a : 0, beginPos, mousePos, lineColor, opacity);
  });
}
class Grabber extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {}
  init() {
    const container = this.container,
      grab = container.actualOptions.interactivity.modes.grab;
    if (!grab) {
      return;
    }
    container.retina.grabModeDistance = grab.distance * container.retina.pixelRatio;
  }
  async interact() {
    var _a, _b;
    const container = this.container,
      options = container.actualOptions,
      interactivity = options.interactivity;
    if (!interactivity.modes.grab || !interactivity.events.onHover.enable || container.interactivity.status !== mouseMoveEvent) {
      return;
    }
    const mousePos = container.interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    const distance = container.retina.grabModeDistance;
    if (!distance || distance < 0) {
      return;
    }
    const query = container.particles.quadTree.queryCircle(mousePos, distance, p => this.isEnabled(p));
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
      const optColor = (_a = grabLineOptions.color) !== null && _a !== void 0 ? _a : (_b = particle.options.links) === null || _b === void 0 ? void 0 : _b.color;
      if (!container.particles.grabLineColor && optColor) {
        const linksOptions = interactivity.modes.grab.links;
        container.particles.grabLineColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);
      }
      const colorLine = getLinkColor(particle, undefined, container.particles.grabLineColor);
      if (!colorLine) {
        return;
      }
      drawGrab(container, particle, colorLine, opacityLine, mousePos);
    }
  }
  isEnabled(particle) {
    var _a;
    const container = this.container,
      mouse = container.interactivity.mouse,
      events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : container.actualOptions.interactivity).events;
    return events.onHover.enable && !!mouse.position && isInArray("grab", events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.grab) {
      options.grab = new Grab();
    }
    for (const source of sources) {
      options.grab.load(source === null || source === void 0 ? void 0 : source.grab);
    }
  }
  reset() {}
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
  clear() {}
  init() {}
  async interact() {}
  isEnabled() {
    return true;
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/pause/dist/esm/index.js

function loadExternalPauseInteraction(engine) {
  engine.addInteractor("externalPause", container => new Pauser(container));
}
;// CONCATENATED MODULE: ../../interactions/external/push/dist/esm/Options/Classes/Push.js
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
;// CONCATENATED MODULE: ../../interactions/external/push/dist/esm/Pusher.js



class Pusher extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = mode => {
      if (mode !== "push") {
        return;
      }
      const container = this.container,
        options = container.actualOptions,
        pushOptions = options.interactivity.modes.push;
      if (!pushOptions) {
        return;
      }
      const pushNb = pushOptions.quantity;
      if (pushNb <= 0) {
        return;
      }
      const group = itemFromArray([undefined, ...pushOptions.groups]),
        groupOptions = group !== undefined ? container.actualOptions.particles.groups[group] : undefined;
      container.particles.push(pushNb, container.interactivity.mouse, groupOptions, group);
    };
  }
  clear() {}
  init() {}
  async interact() {}
  isEnabled() {
    return true;
  }
  loadModeOptions(options, ...sources) {
    if (!options.push) {
      options.push = new Push();
    }
    for (const source of sources) {
      options.push.load(source === null || source === void 0 ? void 0 : source.push);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/push/dist/esm/index.js

async function loadExternalPushInteraction(engine) {
  await engine.addInteractor("externalPush", container => new Pusher(container));
}


;// CONCATENATED MODULE: ../../interactions/external/remove/dist/esm/Options/Classes/Remove.js
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
;// CONCATENATED MODULE: ../../interactions/external/remove/dist/esm/Remover.js


class Remover extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = mode => {
      const container = this.container,
        options = container.actualOptions;
      if (!options.interactivity.modes.remove || mode !== "remove") {
        return;
      }
      const removeNb = options.interactivity.modes.remove.quantity;
      container.particles.removeQuantity(removeNb);
    };
  }
  clear() {}
  init() {}
  async interact() {}
  isEnabled() {
    return true;
  }
  loadModeOptions(options, ...sources) {
    if (!options.remove) {
      options.remove = new Remove();
    }
    for (const source of sources) {
      options.remove.load(source === null || source === void 0 ? void 0 : source.remove);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/remove/dist/esm/index.js

function loadExternalRemoveInteraction(engine) {
  engine.addInteractor("externalRemove", container => new Remover(container));
}


;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/esm/Options/Classes/RepulseBase.js
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
;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/esm/Options/Classes/RepulseDiv.js


class RepulseDiv extends RepulseBase {
  constructor() {
    super();
    this.selectors = [];
  }
  get ids() {
    return executeOnSingleOrMultiple(this.selectors, t => t.replace("#", ""));
  }
  set ids(value) {
    this.selectors = executeOnSingleOrMultiple(value, t => `#${t}`);
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
;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/esm/Options/Classes/Repulse.js



class Repulse extends RepulseBase {
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    this.divs = executeOnSingleOrMultiple(data.divs, div => {
      const tmp = new RepulseDiv();
      tmp.load(div);
      return tmp;
    });
  }
}
;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/esm/Repulser.js


class Repulser extends ExternalInteractorBase {
  constructor(engine, container) {
    super(container);
    this._engine = engine;
    if (!container.repulse) {
      container.repulse = {
        particles: []
      };
    }
    this.handleClickMode = mode => {
      const options = this.container.actualOptions,
        repulse = options.interactivity.modes.repulse;
      if (!repulse || mode !== "repulse") {
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
        if (!this.isEnabled(particle)) {
          continue;
        }
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
      }, repulse.duration * 1000);
    };
  }
  clear() {}
  init() {
    const container = this.container,
      repulse = container.actualOptions.interactivity.modes.repulse;
    if (!repulse) {
      return;
    }
    container.retina.repulseModeDistance = repulse.distance * container.retina.pixelRatio;
  }
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
  isEnabled(particle) {
    var _a;
    const container = this.container,
      options = container.actualOptions,
      mouse = container.interactivity.mouse,
      events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : options.interactivity).events,
      divs = events.onDiv,
      divRepulse = isDivModeEnabled("repulse", divs);
    if (!(divRepulse || events.onHover.enable && mouse.position || events.onClick.enable && mouse.clickPosition)) {
      return false;
    }
    const hoverMode = events.onHover.mode,
      clickMode = events.onClick.mode;
    return isInArray("repulse", hoverMode) || isInArray("repulse", clickMode) || divRepulse;
  }
  loadModeOptions(options, ...sources) {
    if (!options.repulse) {
      options.repulse = new Repulse();
    }
    for (const source of sources) {
      options.repulse.load(source === null || source === void 0 ? void 0 : source.repulse);
    }
  }
  reset() {}
  clickRepulse() {
    const container = this.container,
      repulse = container.actualOptions.interactivity.modes.repulse;
    if (!repulse) {
      return;
    }
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
      const repulseDistance = container.retina.repulseModeDistance;
      if (!repulseDistance || repulseDistance < 0) {
        return;
      }
      const repulseRadius = Math.pow(repulseDistance / 6, 3),
        mouseClickPos = container.interactivity.mouse.clickPosition;
      if (mouseClickPos === undefined) {
        return;
      }
      const range = new Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius),
        query = container.particles.quadTree.query(range, p => this.isEnabled(p));
      for (const particle of query) {
        const {
            dx,
            dy,
            distance
          } = getDistances(mouseClickPos, particle.position),
          d = distance ** 2,
          velocity = repulse.speed,
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
  hoverRepulse() {
    const container = this.container,
      mousePos = container.interactivity.mouse.position,
      repulseRadius = container.retina.repulseModeDistance;
    if (!repulseRadius || repulseRadius < 0 || !mousePos) {
      return;
    }
    this.processRepulse(mousePos, repulseRadius, new Circle(mousePos.x, mousePos.y, repulseRadius));
  }
  processRepulse(position, repulseRadius, area, divRepulse) {
    var _a;
    const container = this.container,
      query = container.particles.quadTree.query(area, p => this.isEnabled(p)),
      repulseOptions = container.actualOptions.interactivity.modes.repulse;
    if (!repulseOptions) {
      return;
    }
    for (const particle of query) {
      const {
          dx,
          dy,
          distance
        } = getDistances(particle.position, position),
        velocity = ((_a = divRepulse === null || divRepulse === void 0 ? void 0 : divRepulse.speed) !== null && _a !== void 0 ? _a : repulseOptions.speed) * repulseOptions.factor,
        repulseFactor = clamp(getEasing(repulseOptions.easing)(1 - distance / repulseRadius) * velocity, 0, repulseOptions.maxSpeed),
        normVec = Vector.create(distance === 0 ? velocity : dx / distance * repulseFactor, distance === 0 ? velocity : dy / distance * repulseFactor);
      particle.position.addTo(normVec);
    }
  }
  singleSelectorRepulse(selector, div) {
    const container = this.container,
      repulse = container.actualOptions.interactivity.modes.repulse;
    if (!repulse) {
      return;
    }
    const query = document.querySelectorAll(selector);
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
        divs = repulse.divs,
        divRepulse = divMode(divs, elem);
      this.processRepulse(pos, repulseRadius, area, divRepulse);
    });
  }
}
;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/esm/index.js

async function loadExternalRepulseInteraction(engine) {
  await engine.addInteractor("externalRepulse", container => new Repulser(engine, container));
}






;// CONCATENATED MODULE: ../../interactions/external/slow/dist/esm/Options/Classes/Slow.js
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
;// CONCATENATED MODULE: ../../interactions/external/slow/dist/esm/Slower.js


class Slower extends ExternalInteractorBase {
  constructor(container) {
    super(container);
  }
  clear(particle, delta, force) {
    if (particle.slow.inRange && !force) {
      return;
    }
    particle.slow.factor = 1;
  }
  init() {
    const container = this.container,
      slow = container.actualOptions.interactivity.modes.slow;
    if (!slow) {
      return;
    }
    container.retina.slowModeRadius = slow.radius * container.retina.pixelRatio;
  }
  async interact() {}
  isEnabled(particle) {
    var _a;
    const container = this.container,
      mouse = container.interactivity.mouse,
      events = ((_a = particle === null || particle === void 0 ? void 0 : particle.interactivity) !== null && _a !== void 0 ? _a : container.actualOptions.interactivity).events;
    return events.onHover.enable && !!mouse.position && isInArray("slow", events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.slow) {
      options.slow = new Slow();
    }
    for (const source of sources) {
      options.slow.load(source === null || source === void 0 ? void 0 : source.slow);
    }
  }
  reset(particle) {
    particle.slow.inRange = false;
    const container = this.container,
      options = container.actualOptions,
      mousePos = container.interactivity.mouse.position,
      radius = container.retina.slowModeRadius,
      slow = options.interactivity.modes.slow;
    if (!slow || !radius || radius < 0 || !mousePos) {
      return;
    }
    const particlePos = particle.getPosition(),
      dist = getDistance(mousePos, particlePos),
      proximityFactor = dist / radius,
      slowFactor = slow.factor;
    if (dist <= radius) {
      particle.slow.inRange = true;
      particle.slow.factor = proximityFactor / slowFactor;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/slow/dist/esm/index.js

async function loadExternalSlowInteraction(engine) {
  await engine.addInteractor("externalSlow", container => new Slower(container));
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
    image.element = img;
    img.addEventListener("load", () => {
      image.loading = false;
      resolve();
    });
    img.addEventListener("error", () => {
      image.element = undefined;
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
  if (!response.ok) {
    console.error("Error tsParticles - Image not found");
    image.error = true;
  }
  if (!image.error) {
    image.svgData = await response.text();
  }
  image.loading = false;
}
function replaceImageColor(image, imageData, color, particle) {
  var _a, _b, _c;
  const svgColoredData = replaceColorSvg(image, color, (_b = (_a = particle.opacity) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : 1),
    imageRes = {
      color,
      data: Object.assign(Object.assign({}, image), {
        svgData: svgColoredData
      }),
      loaded: false,
      ratio: imageData.width / imageData.height,
      replaceColor: (_c = imageData.replaceColor) !== null && _c !== void 0 ? _c : imageData.replace_color,
      source: imageData.src
    };
  return new Promise(resolve => {
    const svg = new Blob([svgColoredData], {
        type: "image/svg+xml"
      }),
      domUrl = URL || window.URL || window.webkitURL || window,
      url = domUrl.createObjectURL(svg),
      img = new Image();
    img.addEventListener("load", () => {
      imageRes.loaded = true;
      imageRes.element = img;
      resolve(imageRes);
      domUrl.revokeObjectURL(url);
    });
    img.addEventListener("error", async () => {
      domUrl.revokeObjectURL(url);
      const img2 = Object.assign(Object.assign({}, image), {
        error: false,
        loading: true
      });
      await loadImage(img2);
      imageRes.loaded = true;
      imageRes.element = img2.element;
      resolve(imageRes);
    });
    img.src = url;
  });
}
;// CONCATENATED MODULE: ../../shapes/image/dist/esm/ImageDrawer.js

class ImageDrawer {
  constructor() {
    this._images = [];
  }
  addImage(container, image) {
    const containerImages = this.getImages(container);
    containerImages === null || containerImages === void 0 ? void 0 : containerImages.images.push(image);
  }
  destroy() {
    this._images = [];
  }
  draw(context, particle, radius, opacity) {
    var _a;
    const image = particle.image,
      element = image === null || image === void 0 ? void 0 : image.element;
    if (!element) {
      return;
    }
    const ratio = (_a = image === null || image === void 0 ? void 0 : image.ratio) !== null && _a !== void 0 ? _a : 1,
      pos = {
        x: -radius,
        y: -radius
      };
    context.globalAlpha = opacity;
    context.drawImage(element, pos.x, pos.y, radius * 2, radius * 2 / ratio);
    context.globalAlpha = 1;
  }
  getImages(container) {
    const containerImages = this._images.find(t => t.id === container.id);
    if (!containerImages) {
      this._images.push({
        id: container.id,
        images: []
      });
      return this.getImages(container);
    } else {
      return containerImages;
    }
  }
  getSidesCount() {
    return 12;
  }
  loadShape(particle) {
    if (particle.shape !== "image" && particle.shape !== "images") {
      return;
    }
    const container = particle.container,
      images = this.getImages(container).images,
      imageData = particle.shapeData,
      image = images.find(t => t.source === imageData.src);
    if (!image) {
      this.loadImageShape(container, imageData).then(() => {
        this.loadShape(particle);
      });
    }
  }
  particleInit(container, particle) {
    var _a;
    if (particle.shape !== "image" && particle.shape !== "images") {
      return;
    }
    const images = this.getImages(container).images,
      imageData = particle.shapeData,
      color = particle.getFillColor(),
      replaceColor = (_a = imageData.replaceColor) !== null && _a !== void 0 ? _a : imageData.replace_color,
      image = images.find(t => t.source === imageData.src);
    if (!image) {
      return;
    }
    if (image.loading) {
      setTimeout(() => {
        this.particleInit(container, particle);
      });
      return;
    }
    (async () => {
      var _a, _b;
      let imageRes;
      if (image.svgData && color) {
        imageRes = await replaceImageColor(image, imageData, color, particle);
      } else {
        imageRes = {
          color,
          data: image,
          element: image.element,
          loaded: true,
          ratio: imageData.width / imageData.height,
          replaceColor: replaceColor,
          source: imageData.src
        };
      }
      if (!imageRes.ratio) {
        imageRes.ratio = 1;
      }
      const fill = (_a = imageData.fill) !== null && _a !== void 0 ? _a : particle.fill,
        close = (_b = imageData.close) !== null && _b !== void 0 ? _b : particle.close,
        imageShape = {
          image: imageRes,
          fill,
          close
        };
      particle.image = imageShape.image;
      particle.fill = imageShape.fill;
      particle.close = imageShape.close;
    })();
  }
  async loadImageShape(container, imageShape) {
    var _a;
    const source = imageShape.src;
    if (!source) {
      throw new Error("Error tsParticles - No image.src");
    }
    try {
      const image = {
        source: source,
        type: source.substring(source.length - 3),
        error: false,
        loading: true
      };
      this.addImage(container, image);
      const imageFunc = ((_a = imageShape.replaceColor) !== null && _a !== void 0 ? _a : imageShape.replace_color) ? downloadSvgImage : loadImage;
      await imageFunc(image);
    } catch (_b) {
      throw new Error(`tsParticles error - ${imageShape.src} not found`);
    }
  }
}
;// CONCATENATED MODULE: ../../shapes/image/dist/esm/index.js

async function loadImageShape(engine) {
  await engine.addShape(["image", "images"], new ImageDrawer());
}
;// CONCATENATED MODULE: ../../updaters/life/dist/esm/Options/Classes/LifeDelay.js

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
;// CONCATENATED MODULE: ../../updaters/life/dist/esm/Options/Classes/LifeDuration.js

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
;// CONCATENATED MODULE: ../../updaters/life/dist/esm/Options/Classes/Life.js


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
;// CONCATENATED MODULE: ../../updaters/life/dist/esm/LifeUpdater.js


class LifeUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const container = this.container,
      particlesOptions = particle.options,
      lifeOptions = particlesOptions.life;
    if (!lifeOptions) {
      return;
    }
    particle.life = {
      delay: container.retina.reduceFactor ? getRangeValue(lifeOptions.delay.value) * (lifeOptions.delay.sync ? 1 : getRandom()) / container.retina.reduceFactor * 1000 : 0,
      delayTime: 0,
      duration: container.retina.reduceFactor ? getRangeValue(lifeOptions.duration.value) * (lifeOptions.duration.sync ? 1 : getRandom()) / container.retina.reduceFactor * 1000 : 0,
      time: 0,
      count: lifeOptions.count
    };
    if (particle.life.duration <= 0) {
      particle.life.duration = -1;
    }
    if (particle.life.count <= 0) {
      particle.life.count = -1;
    }
    if (particle.life) {
      particle.spawning = particle.life.delay > 0;
    }
  }
  isEnabled(particle) {
    return !particle.destroyed;
  }
  loadOptions(options, ...sources) {
    if (!options.life) {
      options.life = new Life();
    }
    for (const source of sources) {
      options.life.load(source === null || source === void 0 ? void 0 : source.life);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle) || !particle.life) {
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
    if (lifeOptions) {
      life.delay = getRangeValue(lifeOptions.delay.value) * 1000;
      life.duration = getRangeValue(lifeOptions.duration.value) * 1000;
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/life/dist/esm/index.js

async function loadLifeUpdater(engine) {
  await engine.addParticleUpdater("life", container => new LifeUpdater(container));
}
;// CONCATENATED MODULE: ../../shapes/line/dist/esm/LineDrawer.js
class LineDrawer {
  draw(context, particle, radius) {
    context.moveTo(-radius / 2, 0);
    context.lineTo(radius / 2, 0);
  }
  getSidesCount() {
    return 1;
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
  var _a, _b, _c, _d, _e, _f;
  if (!particle.opacity) {
    return;
  }
  const minValue = particle.opacity.min,
    maxValue = particle.opacity.max,
    decay = (_a = particle.opacity.decay) !== null && _a !== void 0 ? _a : 1;
  if (particle.destroyed || !particle.opacity.enable || ((_b = particle.opacity.maxLoops) !== null && _b !== void 0 ? _b : 0) > 0 && ((_c = particle.opacity.loops) !== null && _c !== void 0 ? _c : 0) > ((_d = particle.opacity.maxLoops) !== null && _d !== void 0 ? _d : 0)) {
    return;
  }
  switch (particle.opacity.status) {
    case "increasing":
      if (particle.opacity.value >= maxValue) {
        particle.opacity.status = "decreasing";
        if (!particle.opacity.loops) {
          particle.opacity.loops = 0;
        }
        particle.opacity.loops++;
      } else {
        particle.opacity.value += ((_e = particle.opacity.velocity) !== null && _e !== void 0 ? _e : 0) * delta.factor;
      }
      break;
    case "decreasing":
      if (particle.opacity.value <= minValue) {
        particle.opacity.status = "increasing";
        if (!particle.opacity.loops) {
          particle.opacity.loops = 0;
        }
        particle.opacity.loops++;
      } else {
        particle.opacity.value -= ((_f = particle.opacity.velocity) !== null && _f !== void 0 ? _f : 0) * delta.factor;
      }
      break;
  }
  if (particle.opacity.velocity && particle.opacity.decay !== 1) {
    particle.opacity.velocity *= decay;
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
      particle.opacity.decay = 1 - getRangeValue(opacityAnimation.decay);
      particle.opacity.status = "increasing";
      const opacityRange = opacityOptions.value;
      particle.opacity.min = getRangeMin(opacityRange);
      particle.opacity.max = getRangeMax(opacityRange);
      switch (opacityAnimation.startValue) {
        case "min":
          particle.opacity.value = particle.opacity.min;
          particle.opacity.status = "increasing";
          break;
        case "random":
          particle.opacity.value = randomInRange(particle.opacity);
          particle.opacity.status = getRandom() >= 0.5 ? "increasing" : "decreasing";
          break;
        case "max":
        default:
          particle.opacity.value = particle.opacity.max;
          particle.opacity.status = "decreasing";
          break;
      }
      particle.opacity.velocity = getRangeValue(opacityAnimation.speed) / 100 * this.container.retina.reduceFactor;
      if (!opacityAnimation.sync) {
        particle.opacity.velocity *= getRandom();
      }
    }
    particle.opacity.initialValue = particle.opacity.value;
  }
  isEnabled(particle) {
    var _a, _b, _c, _d;
    return !particle.destroyed && !particle.spawning && !!particle.opacity && particle.opacity.enable && (((_a = particle.opacity.maxLoops) !== null && _a !== void 0 ? _a : 0) <= 0 || ((_b = particle.opacity.maxLoops) !== null && _b !== void 0 ? _b : 0) > 0 && ((_c = particle.opacity.loops) !== null && _c !== void 0 ? _c : 0) < ((_d = particle.opacity.maxLoops) !== null && _d !== void 0 ? _d : 0));
  }
  reset(particle) {
    if (particle.opacity) {
      particle.opacity.loops = 0;
    }
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
  if (data.outMode !== "bounce" && data.outMode !== "bounce-horizontal" && data.outMode !== "bounceHorizontal" && data.outMode !== "split") {
    return;
  }
  if (data.bounds.right < 0) {
    data.particle.position.x = data.size + data.offset.x;
  } else if (data.bounds.left > data.canvasSize.width) {
    data.particle.position.x = data.canvasSize.width - data.size - data.offset.x;
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
  if (data.outMode !== "bounce" && data.outMode !== "bounce-vertical" && data.outMode !== "bounceVertical" && data.outMode !== "split") {
    return;
  }
  if (data.bounds.bottom < 0) {
    data.particle.position.y = data.size + data.offset.y;
  } else if (data.bounds.top > data.canvasSize.height) {
    data.particle.position.y = data.canvasSize.height - data.size - data.offset.y;
  }
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
                    particle.position.y = getRandom() * canvasSize.height;
                    particle.initialPosition.y = particle.position.y;
                  }
                } else if (direction === "left" && nextBounds.right < -particle.offset.x) {
                  particle.position.x = newPos.right;
                  particle.initialPosition.x = particle.position.x;
                  if (!wrap) {
                    particle.position.y = getRandom() * canvasSize.height;
                    particle.initialPosition.y = particle.position.y;
                  }
                }
                if (direction === "bottom" && nextBounds.top > canvasSize.height + particle.offset.y) {
                  if (!wrap) {
                    particle.position.x = getRandom() * canvasSize.width;
                    particle.initialPosition.x = particle.position.x;
                  }
                  particle.position.y = newPos.top;
                  particle.initialPosition.y = particle.position.y;
                } else if (direction === "top" && nextBounds.bottom < -particle.offset.y) {
                  if (!wrap) {
                    particle.position.x = getRandom() * canvasSize.width;
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
  clear() {}
  init() {}
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

function updateAbsorb(p1, r1, p2, r2, delta, pixelRatio) {
  const factor = clamp(p1.options.collisions.absorb.speed * delta.factor / 10, 0, r2);
  p1.size.value += factor / 2;
  p2.size.value -= factor;
  if (r2 <= pixelRatio) {
    p2.size.value = 0;
    p2.destroy();
  }
}
function absorb(p1, p2, delta, pixelRatio) {
  const r1 = p1.getRadius(),
    r2 = p2.getRadius();
  if (r1 === undefined && r2 !== undefined) {
    p1.destroy();
  } else if (r1 !== undefined && r2 === undefined) {
    p2.destroy();
  } else if (r1 !== undefined && r2 !== undefined) {
    if (r1 >= r2) {
      updateAbsorb(p1, r1, p2, r2, delta, pixelRatio);
    } else {
      updateAbsorb(p2, r2, p1, r1, delta, pixelRatio);
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
    const deleteP = p1.getRadius() >= p2.getRadius() ? p1 : p2;
    deleteP.destroy();
  }
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/esm/ResolveCollision.js



function resolveCollision(p1, p2, delta, pixelRatio) {
  switch (p1.options.collisions.mode) {
    case "absorb":
      {
        absorb(p1, p2, delta, pixelRatio);
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
  clear() {}
  init() {}
  async interact(p1, delta) {
    const container = this.container,
      pos1 = p1.getPosition(),
      radius1 = p1.getRadius(),
      query = container.particles.quadTree.queryCircle(pos1, radius1 * 2);
    for (const p2 of query) {
      if (p1 === p2 || !p2.options.collisions.enable || p1.options.collisions.mode !== p2.options.collisions.mode || p2.destroyed || p2.spawning) {
        continue;
      }
      const pos2 = p2.getPosition(),
        radius2 = p2.getRadius();
      if (Math.abs(Math.round(pos1.z) - Math.round(pos2.z)) > radius1 + radius2) {
        continue;
      }
      const dist = getDistance(pos1, pos2),
        distP = radius1 + radius2;
      if (dist > distP) {
        continue;
      }
      resolveCollision(p1, p2, delta, container.retina.pixelRatio);
    }
  }
  isEnabled(particle) {
    return particle.options.collisions.enable;
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/esm/index.js

async function loadParticlesCollisionsInteraction(engine) {
  await engine.addInteractor("particlesCollisions", container => new Collider(container));
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/CircleWarp.js

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
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/Options/Classes/LinksShadow.js

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
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/Options/Classes/LinksTriangle.js

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
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/esm/Options/Classes/Links.js



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
    this.linkContainer = container;
  }
  clear() {}
  init() {
    this.linkContainer.particles.linksColor = undefined;
    this.linkContainer.particles.linksColors = new Map();
  }
  async interact(p1) {
    var _a;
    if (!p1.options.links) {
      return;
    }
    p1.links = [];
    const pos1 = p1.getPosition(),
      container = this.container,
      canvasSize = container.canvas.size;
    if (pos1.x < 0 || pos1.y < 0 || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
      return;
    }
    const linkOpt1 = p1.options.links,
      optOpacity = linkOpt1.opacity,
      optDistance = (_a = p1.retina.linksDistance) !== null && _a !== void 0 ? _a : 0,
      warp = linkOpt1.warp,
      range = warp ? new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize) : new Circle(pos1.x, pos1.y, optDistance),
      query = container.particles.quadTree.query(range);
    for (const p2 of query) {
      const linkOpt2 = p2.options.links;
      if (p1 === p2 || !(linkOpt2 === null || linkOpt2 === void 0 ? void 0 : linkOpt2.enable) || linkOpt1.id !== linkOpt2.id || p2.spawning || p2.destroyed || !p2.links || p1.links.map(t => t.destination).indexOf(p2) !== -1 || p2.links.map(t => t.destination).indexOf(p1) !== -1) {
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
  isEnabled(particle) {
    var _a;
    return !!((_a = particle.options.links) === null || _a === void 0 ? void 0 : _a.enable);
  }
  loadParticlesOptions(options, ...sources) {
    var _a, _b;
    if (!options.links) {
      options.links = new Links();
    }
    for (const source of sources) {
      options.links.load((_b = (_a = source === null || source === void 0 ? void 0 : source.links) !== null && _a !== void 0 ? _a : source === null || source === void 0 ? void 0 : source.lineLinked) !== null && _b !== void 0 ? _b : source === null || source === void 0 ? void 0 : source.line_linked);
    }
  }
  reset() {}
  setColor(p1) {
    if (!p1.options.links) {
      return;
    }
    const container = this.linkContainer,
      linksOptions = p1.options.links;
    let linkColor = linksOptions.id === undefined ? container.particles.linksColor : container.particles.linksColors.get(linksOptions.id);
    if (linkColor) {
      return;
    }
    const optColor = linksOptions.color;
    linkColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);
    if (linksOptions.id === undefined) {
      container.particles.linksColor = linkColor;
    } else {
      container.particles.linksColors.set(linksOptions.id, linkColor);
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
    const shadowColor = rangeColorToRgb(shadow.color);
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


function getLinkKey(ids) {
  ids.sort((a, b) => a - b);
  return ids.join("_");
}
function setLinkFrequency(particles, dictionary) {
  const key = getLinkKey(particles.map(t => t.id));
  let res = dictionary.get(key);
  if (res === undefined) {
    res = getRandom();
    dictionary.set(key, res);
  }
  return res;
}
class LinkInstance {
  constructor(container) {
    this.container = container;
    this._freqs = {
      links: new Map(),
      triangles: new Map()
    };
  }
  drawParticle(context, particle) {
    var _a;
    const pOptions = particle.options;
    if (!particle.links || particle.links.length <= 0) {
      return;
    }
    const p1Links = particle.links.filter(l => pOptions.links && this.getLinkFrequency(particle, l.destination) <= pOptions.links.frequency);
    for (const link of p1Links) {
      this.drawTriangles(pOptions, particle, link, p1Links);
      if (link.opacity > 0 && ((_a = particle.retina.linksWidth) !== null && _a !== void 0 ? _a : 0) > 0) {
        this.drawLinkLine(particle, link);
      }
    }
  }
  async init() {
    this._freqs.links = new Map();
    this._freqs.triangles = new Map();
  }
  particleCreated(particle) {
    particle.links = [];
    if (!particle.options.links) {
      return;
    }
    const ratio = this.container.retina.pixelRatio;
    particle.retina.linksDistance = particle.options.links.distance * ratio;
    particle.retina.linksWidth = particle.options.links.width * ratio;
  }
  particleDestroyed(particle) {
    particle.links = [];
  }
  drawLinkLine(p1, link) {
    const container = this.container,
      options = container.actualOptions,
      p2 = link.destination,
      pos1 = p1.getPosition(),
      pos2 = p2.getPosition();
    let opacity = link.opacity;
    container.canvas.draw(ctx => {
      var _a, _b, _c;
      if (!p1.options.links) {
        return;
      }
      let colorLine;
      const twinkle = (_a = p1.options.twinkle) === null || _a === void 0 ? void 0 : _a.lines;
      if (twinkle === null || twinkle === void 0 ? void 0 : twinkle.enable) {
        const twinkleFreq = twinkle.frequency,
          twinkleRgb = rangeColorToRgb(twinkle.color),
          twinkling = getRandom() < twinkleFreq;
        if (twinkling && twinkleRgb) {
          colorLine = twinkleRgb;
          opacity = getRangeValue(twinkle.opacity);
        }
      }
      if (!colorLine) {
        const linksOptions = p1.options.links,
          linkColor = (linksOptions === null || linksOptions === void 0 ? void 0 : linksOptions.id) !== undefined ? container.particles.linksColors.get(linksOptions.id) : container.particles.linksColor;
        colorLine = getLinkColor(p1, p2, linkColor);
      }
      if (!colorLine) {
        return;
      }
      const width = (_b = p1.retina.linksWidth) !== null && _b !== void 0 ? _b : 0,
        maxDistance = (_c = p1.retina.linksDistance) !== null && _c !== void 0 ? _c : 0;
      drawLinkLine(ctx, width, pos1, pos2, maxDistance, container.canvas.size, p1.options.links.warp, options.backgroundMask.enable, options.backgroundMask.composite, colorLine, opacity, p1.options.links.shadow);
    });
  }
  drawLinkTriangle(p1, link1, link2) {
    var _a;
    if (!p1.options.links) {
      return;
    }
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
      var _a;
      const pos1 = p1.getPosition(),
        pos2 = p2.getPosition(),
        pos3 = p3.getPosition(),
        linksDistance = (_a = p1.retina.linksDistance) !== null && _a !== void 0 ? _a : 0;
      if (getDistance(pos1, pos2) > linksDistance || getDistance(pos3, pos2) > linksDistance || getDistance(pos3, pos1) > linksDistance) {
        return;
      }
      let colorTriangle = rangeColorToRgb(triangleOptions.color);
      if (!colorTriangle) {
        const linksOptions = p1.options.links,
          linkColor = (linksOptions === null || linksOptions === void 0 ? void 0 : linksOptions.id) !== undefined ? container.particles.linksColors.get(linksOptions.id) : container.particles.linksColor;
        colorTriangle = getLinkColor(p1, p2, linkColor);
      }
      if (!colorTriangle) {
        return;
      }
      drawLinkTriangle(ctx, pos1, pos2, pos3, options.backgroundMask.enable, options.backgroundMask.composite, colorTriangle, opacityTriangle);
    });
  }
  drawTriangles(options, p1, link, p1Links) {
    var _a, _b, _c;
    const p2 = link.destination;
    if (!(((_a = options.links) === null || _a === void 0 ? void 0 : _a.triangles.enable) && ((_b = p2.options.links) === null || _b === void 0 ? void 0 : _b.triangles.enable))) {
      return;
    }
    const vertices = (_c = p2.links) === null || _c === void 0 ? void 0 : _c.filter(t => {
      const linkFreq = this.getLinkFrequency(p2, t.destination);
      return p2.options.links && linkFreq <= p2.options.links.frequency && p1Links.findIndex(l => l.destination === t.destination) >= 0;
    });
    if (!(vertices === null || vertices === void 0 ? void 0 : vertices.length)) {
      return;
    }
    for (const vertex of vertices) {
      const p3 = vertex.destination,
        triangleFreq = this.getTriangleFrequency(p1, p2, p3);
      if (triangleFreq > options.links.triangles.frequency) {
        continue;
      }
      this.drawLinkTriangle(p1, link, vertex);
    }
  }
  getLinkFrequency(p1, p2) {
    return setLinkFrequency([p1, p2], this._freqs.links);
  }
  getTriangleFrequency(p1, p2, p3) {
    return setLinkFrequency([p1, p2, p3], this._freqs.triangles);
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
  loadOptions() {}
  needsPlugin() {
    return true;
  }
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
  draw(context, particle, radius) {
    const start = this.getCenter(particle, radius),
      side = this.getSidesData(particle, radius),
      sideCount = side.count.numerator * side.count.denominator,
      decimalSides = side.count.numerator / side.count.denominator,
      interiorAngleDegrees = 180 * (decimalSides - 2) / decimalSides,
      interiorAngle = Math.PI - Math.PI * interiorAngleDegrees / 180;
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
  getSidesCount(particle) {
    var _a, _b;
    const polygon = particle.shapeData,
      sides = Math.round(getRangeValue((_b = (_a = polygon === null || polygon === void 0 ? void 0 : polygon.sides) !== null && _a !== void 0 ? _a : polygon === null || polygon === void 0 ? void 0 : polygon.nb_sides) !== null && _b !== void 0 ? _b : 5));
    return sides;
  }
}
;// CONCATENATED MODULE: ../../shapes/polygon/dist/esm/PolygonDrawer.js

class PolygonDrawer extends PolygonDrawerBase {
  getCenter(particle, radius) {
    return {
      x: -radius / (particle.sides / 3.5),
      y: -radius / (2.66 / 3.5)
    };
  }
  getSidesData(particle, radius) {
    const sides = particle.sides;
    return {
      count: {
        denominator: 1,
        numerator: sides
      },
      length: radius * 2.66 / (sides / 3)
    };
  }
}
;// CONCATENATED MODULE: ../../shapes/polygon/dist/esm/TriangleDrawer.js

class TriangleDrawer extends PolygonDrawerBase {
  getCenter(particle, radius) {
    return {
      x: -radius,
      y: radius / 1.66
    };
  }
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
  var _a, _b, _c, _d, _e;
  const sizeVelocity = ((_a = particle.size.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor,
    minValue = particle.size.min,
    maxValue = particle.size.max,
    decay = (_b = particle.size.decay) !== null && _b !== void 0 ? _b : 1;
  if (particle.destroyed || !particle.size.enable || ((_c = particle.size.maxLoops) !== null && _c !== void 0 ? _c : 0) > 0 && ((_d = particle.size.loops) !== null && _d !== void 0 ? _d : 0) > ((_e = particle.size.maxLoops) !== null && _e !== void 0 ? _e : 0)) {
    return;
  }
  switch (particle.size.status) {
    case "increasing":
      if (particle.size.value >= maxValue) {
        particle.size.status = "decreasing";
        if (!particle.size.loops) {
          particle.size.loops = 0;
        }
        particle.size.loops++;
      } else {
        particle.size.value += sizeVelocity;
      }
      break;
    case "decreasing":
      if (particle.size.value <= minValue) {
        particle.size.status = "increasing";
        if (!particle.size.loops) {
          particle.size.loops = 0;
        }
        particle.size.loops++;
      } else {
        particle.size.value -= sizeVelocity;
      }
  }
  if (particle.size.velocity && decay !== 1) {
    particle.size.velocity *= decay;
  }
  SizeUpdater_checkDestroy(particle, particle.size.value, minValue, maxValue);
  if (!particle.destroyed) {
    particle.size.value = clamp(particle.size.value, minValue, maxValue);
  }
}
class SizeUpdater {
  init(particle) {
    var _a;
    const container = particle.container,
      sizeOptions = particle.options.size,
      sizeAnimation = sizeOptions.animation;
    if (sizeAnimation.enable) {
      particle.size.velocity = ((_a = particle.retina.sizeAnimationSpeed) !== null && _a !== void 0 ? _a : container.retina.sizeAnimationSpeed) / 100 * container.retina.reduceFactor;
      if (!sizeAnimation.sync) {
        particle.size.velocity *= getRandom();
      }
    }
  }
  isEnabled(particle) {
    var _a, _b, _c, _d;
    return !particle.destroyed && !particle.spawning && particle.size.enable && (((_a = particle.size.maxLoops) !== null && _a !== void 0 ? _a : 0) <= 0 || ((_b = particle.size.maxLoops) !== null && _b !== void 0 ? _b : 0) > 0 && ((_c = particle.size.loops) !== null && _c !== void 0 ? _c : 0) < ((_d = particle.size.maxLoops) !== null && _d !== void 0 ? _d : 0));
  }
  reset(particle) {
    particle.size.loops = 0;
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
  draw(context, particle, radius) {
    context.rect(-radius / fixFactor, -radius / fixFactor, radius * 2 / fixFactor, radius * 2 / fixFactor);
  }
  getSidesCount() {
    return 4;
  }
}
;// CONCATENATED MODULE: ../../shapes/square/dist/esm/index.js

async function loadSquareShape(engine) {
  const drawer = new SquareDrawer();
  await engine.addShape(["edge", "square"], drawer);
}
;// CONCATENATED MODULE: ../../shapes/star/dist/esm/StarDrawer.js

class StarDrawer {
  draw(context, particle, radius) {
    var _a;
    const sides = particle.sides,
      inset = (_a = particle.starInset) !== null && _a !== void 0 ? _a : 2;
    context.moveTo(0, 0 - radius);
    for (let i = 0; i < sides; i++) {
      context.rotate(Math.PI / sides);
      context.lineTo(0, 0 - radius * inset);
      context.rotate(Math.PI / sides);
      context.lineTo(0, 0 - radius);
    }
  }
  getSidesCount(particle) {
    var _a, _b;
    const star = particle.shapeData;
    return Math.round(getRangeValue((_b = (_a = star === null || star === void 0 ? void 0 : star.sides) !== null && _a !== void 0 ? _a : star === null || star === void 0 ? void 0 : star.nb_sides) !== null && _b !== void 0 ? _b : 5));
  }
  particleInit(container, particle) {
    var _a;
    const star = particle.shapeData,
      inset = getRangeValue((_a = star === null || star === void 0 ? void 0 : star.inset) !== null && _a !== void 0 ? _a : 2);
    particle.starInset = inset;
  }
}
;// CONCATENATED MODULE: ../../shapes/star/dist/esm/index.js

async function loadStarShape(engine) {
  await engine.addShape("star", new StarDrawer());
}
;// CONCATENATED MODULE: ../../updaters/strokeColor/dist/esm/StrokeColorUpdater.js

function StrokeColorUpdater_updateColorValue(delta, value, valueAnimation, max, decrease) {
  var _a, _b;
  const colorValue = value;
  if (!colorValue || !colorValue.enable || colorValue.loops !== undefined && colorValue.maxLoops !== undefined && colorValue.maxLoops > 0 && colorValue.loops >= colorValue.maxLoops) {
    return;
  }
  const offset = randomInRange(valueAnimation.offset),
    velocity = ((_a = value.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor + offset * 3.6,
    decay = (_b = value.decay) !== null && _b !== void 0 ? _b : 1;
  if (!decrease || colorValue.status === "increasing") {
    colorValue.value += velocity;
    if (colorValue.value > max) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      if (decrease) {
        colorValue.status = "decreasing";
        colorValue.value -= colorValue.value % max;
      }
    }
  } else {
    colorValue.value -= velocity;
    if (colorValue.value < 0) {
      if (!colorValue.loops) {
        colorValue.loops = 0;
      }
      colorValue.loops++;
      colorValue.status = "increasing";
      colorValue.value += colorValue.value;
    }
  }
  if (colorValue.velocity && decay !== 1) {
    colorValue.velocity *= decay;
  }
  if (colorValue.value > max) {
    colorValue.value %= max;
  }
}
function updateStrokeColor(particle, delta) {
  if (!particle.strokeColor || !particle.strokeAnimation) {
    return;
  }
  const h = particle.strokeColor.h;
  if (h) {
    StrokeColorUpdater_updateColorValue(delta, h, particle.strokeAnimation.h, 360, false);
  }
  const s = particle.strokeColor.s;
  if (s) {
    StrokeColorUpdater_updateColorValue(delta, s, particle.strokeAnimation.s, 100, true);
  }
  const l = particle.strokeColor.l;
  if (l) {
    StrokeColorUpdater_updateColorValue(delta, l, particle.strokeAnimation.l, 100, true);
  }
}
class StrokeColorUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    var _a, _b, _c;
    const container = this.container;
    const stroke = itemFromSingleOrMultiple(particle.options.stroke, particle.id, particle.options.reduceDuplicates);
    particle.strokeWidth = getRangeValue(stroke.width) * container.retina.pixelRatio;
    particle.strokeOpacity = getRangeValue((_a = stroke.opacity) !== null && _a !== void 0 ? _a : 1);
    particle.strokeAnimation = (_b = stroke.color) === null || _b === void 0 ? void 0 : _b.animation;
    const strokeHslColor = (_c = rangeColorToHsl(stroke.color)) !== null && _c !== void 0 ? _c : particle.getFillColor();
    if (strokeHslColor) {
      particle.strokeColor = getHslAnimationFromHsl(strokeHslColor, particle.strokeAnimation, container.retina.reduceFactor);
    }
  }
  isEnabled(particle) {
    var _a, _b, _c;
    const color = particle.strokeAnimation;
    return !particle.destroyed && !particle.spawning && !!color && (((_a = particle.strokeColor) === null || _a === void 0 ? void 0 : _a.h.value) !== undefined && particle.strokeColor.h.enable || ((_b = particle.strokeColor) === null || _b === void 0 ? void 0 : _b.s.value) !== undefined && particle.strokeColor.s.enable || ((_c = particle.strokeColor) === null || _c === void 0 ? void 0 : _c.l.value) !== undefined && particle.strokeColor.l.enable);
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
      textParticle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
    }
    const text = textParticle.text,
      style = (_a = character.style) !== null && _a !== void 0 ? _a : "",
      weight = (_b = character.weight) !== null && _b !== void 0 ? _b : "400",
      size = Math.round(radius) * 2,
      font = (_c = character.font) !== null && _c !== void 0 ? _c : "Verdana",
      fill = particle.fill,
      offsetX = text.length * radius / 2;
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
  getSidesCount() {
    return 12;
  }
  async init(container) {
    const options = container.actualOptions;
    if (validTypes.find(t => isInArray(t, options.particles.shape.type))) {
      const shapeOptions = validTypes.map(t => options.particles.shape.options[t]).find(t => !!t),
        promises = [];
      executeOnSingleOrMultiple(shapeOptions, shape => {
        promises.push(loadFont(shape.font, shape.weight));
      });
      await Promise.all(promises);
    }
  }
}
;// CONCATENATED MODULE: ../../shapes/text/dist/esm/index.js

async function loadTextShape(engine) {
  await engine.addShape(validTypes, new TextDrawer());
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
  await loadExternalSlowInteraction(engine);
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