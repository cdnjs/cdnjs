/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v3.1.0
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
  AnimatableColor: () => (/* reexport */ AnimatableColor),
  AnimationOptions: () => (/* reexport */ AnimationOptions),
  AnimationValueWithRandom: () => (/* reexport */ AnimationValueWithRandom),
  Background: () => (/* reexport */ Background),
  BackgroundMask: () => (/* reexport */ BackgroundMask),
  BackgroundMaskCover: () => (/* reexport */ BackgroundMaskCover),
  Circle: () => (/* reexport */ Circle),
  ClickEvent: () => (/* reexport */ ClickEvent),
  Collisions: () => (/* reexport */ Collisions),
  CollisionsAbsorb: () => (/* reexport */ CollisionsAbsorb),
  CollisionsOverlap: () => (/* reexport */ CollisionsOverlap),
  ColorAnimation: () => (/* reexport */ ColorAnimation),
  DivEvent: () => (/* reexport */ DivEvent),
  Events: () => (/* reexport */ Events),
  ExternalInteractorBase: () => (/* reexport */ ExternalInteractorBase),
  FullScreen: () => (/* reexport */ FullScreen),
  HoverEvent: () => (/* reexport */ HoverEvent),
  HslAnimation: () => (/* reexport */ HslAnimation),
  HslColorManager: () => (/* reexport */ HslColorManager),
  Interactivity: () => (/* reexport */ Interactivity),
  ManualParticle: () => (/* reexport */ ManualParticle),
  Modes: () => (/* reexport */ Modes),
  Move: () => (/* reexport */ Move),
  MoveAngle: () => (/* reexport */ MoveAngle),
  MoveAttract: () => (/* reexport */ MoveAttract),
  MoveCenter: () => (/* reexport */ MoveCenter),
  MoveGravity: () => (/* reexport */ MoveGravity),
  MovePath: () => (/* reexport */ MovePath),
  MoveTrail: () => (/* reexport */ MoveTrail),
  Opacity: () => (/* reexport */ Opacity),
  OpacityAnimation: () => (/* reexport */ OpacityAnimation),
  Options: () => (/* reexport */ Options),
  OptionsColor: () => (/* reexport */ OptionsColor),
  OutModes: () => (/* reexport */ OutModes),
  Parallax: () => (/* reexport */ Parallax),
  ParticlesBounce: () => (/* reexport */ ParticlesBounce),
  ParticlesBounceFactor: () => (/* reexport */ ParticlesBounceFactor),
  ParticlesDensity: () => (/* reexport */ ParticlesDensity),
  ParticlesInteractorBase: () => (/* reexport */ ParticlesInteractorBase),
  ParticlesNumber: () => (/* reexport */ ParticlesNumber),
  ParticlesNumberLimit: () => (/* reexport */ ParticlesNumberLimit),
  ParticlesOptions: () => (/* reexport */ ParticlesOptions),
  Point: () => (/* reexport */ Point),
  Range: () => (/* reexport */ Range),
  RangedAnimationOptions: () => (/* reexport */ RangedAnimationOptions),
  RangedAnimationValueWithRandom: () => (/* reexport */ RangedAnimationValueWithRandom),
  Rectangle: () => (/* reexport */ Rectangle),
  ResizeEvent: () => (/* reexport */ ResizeEvent),
  Responsive: () => (/* reexport */ Responsive),
  RgbColorManager: () => (/* reexport */ RgbColorManager),
  Shadow: () => (/* reexport */ Shadow),
  Shape: () => (/* reexport */ Shape),
  Size: () => (/* reexport */ Size),
  SizeAnimation: () => (/* reexport */ SizeAnimation),
  Spin: () => (/* reexport */ Spin),
  Stroke: () => (/* reexport */ Stroke),
  Theme: () => (/* reexport */ Theme),
  ThemeDefault: () => (/* reexport */ ThemeDefault),
  ValueWithRandom: () => (/* reexport */ ValueWithRandom),
  Vector: () => (/* reexport */ Vector),
  Vector3d: () => (/* reexport */ Vector3d),
  ZIndex: () => (/* reexport */ ZIndex),
  addColorManager: () => (/* reexport */ addColorManager),
  addEasing: () => (/* reexport */ addEasing),
  alterHsl: () => (/* reexport */ alterHsl),
  areBoundsInside: () => (/* reexport */ areBoundsInside),
  arrayRandomIndex: () => (/* reexport */ arrayRandomIndex),
  calcExactPositionOrRandomFromSize: () => (/* reexport */ calcExactPositionOrRandomFromSize),
  calcExactPositionOrRandomFromSizeRanged: () => (/* reexport */ calcExactPositionOrRandomFromSizeRanged),
  calcPositionFromSize: () => (/* reexport */ calcPositionFromSize),
  calcPositionOrRandomFromSize: () => (/* reexport */ calcPositionOrRandomFromSize),
  calcPositionOrRandomFromSizeRanged: () => (/* reexport */ calcPositionOrRandomFromSizeRanged),
  calculateBounds: () => (/* reexport */ calculateBounds),
  circleBounce: () => (/* reexport */ circleBounce),
  circleBounceDataFromParticle: () => (/* reexport */ circleBounceDataFromParticle),
  clamp: () => (/* reexport */ clamp),
  clear: () => (/* reexport */ clear),
  collisionVelocity: () => (/* reexport */ collisionVelocity),
  colorMix: () => (/* reexport */ colorMix),
  colorToHsl: () => (/* reexport */ colorToHsl),
  colorToRgb: () => (/* reexport */ colorToRgb),
  deepExtend: () => (/* reexport */ deepExtend),
  degToRad: () => (/* reexport */ degToRad),
  divMode: () => (/* reexport */ divMode),
  divModeExecute: () => (/* reexport */ divModeExecute),
  drawEffect: () => (/* reexport */ drawEffect),
  drawLine: () => (/* reexport */ drawLine),
  drawParticle: () => (/* reexport */ drawParticle),
  drawParticlePlugin: () => (/* reexport */ drawParticlePlugin),
  drawPlugin: () => (/* reexport */ drawPlugin),
  drawShape: () => (/* reexport */ drawShape),
  drawShapeAfterDraw: () => (/* reexport */ drawShapeAfterDraw),
  errorPrefix: () => (/* reexport */ errorPrefix),
  executeOnSingleOrMultiple: () => (/* reexport */ executeOnSingleOrMultiple),
  findItemFromSingleOrMultiple: () => (/* reexport */ findItemFromSingleOrMultiple),
  generatedAttribute: () => (/* reexport */ generatedAttribute),
  getDistance: () => (/* reexport */ getDistance),
  getDistances: () => (/* reexport */ getDistances),
  getEasing: () => (/* reexport */ getEasing),
  getHslAnimationFromHsl: () => (/* reexport */ getHslAnimationFromHsl),
  getHslFromAnimation: () => (/* reexport */ getHslFromAnimation),
  getLinkColor: () => (/* reexport */ getLinkColor),
  getLinkRandomColor: () => (/* reexport */ getLinkRandomColor),
  getLogger: () => (/* reexport */ getLogger),
  getParticleBaseVelocity: () => (/* reexport */ getParticleBaseVelocity),
  getParticleDirectionAngle: () => (/* reexport */ getParticleDirectionAngle),
  getPosition: () => (/* reexport */ getPosition),
  getRandom: () => (/* reexport */ getRandom),
  getRandomRgbColor: () => (/* reexport */ getRandomRgbColor),
  getRangeMax: () => (/* reexport */ getRangeMax),
  getRangeMin: () => (/* reexport */ getRangeMin),
  getRangeValue: () => (/* reexport */ getRangeValue),
  getSize: () => (/* reexport */ getSize),
  getStyleFromHsl: () => (/* reexport */ getStyleFromHsl),
  getStyleFromRgb: () => (/* reexport */ getStyleFromRgb),
  halfRandom: () => (/* reexport */ halfRandom),
  hasMatchMedia: () => (/* reexport */ hasMatchMedia),
  hslToRgb: () => (/* reexport */ hslToRgb),
  hslaToRgba: () => (/* reexport */ hslaToRgba),
  initParticleNumericAnimationValue: () => (/* reexport */ initParticleNumericAnimationValue),
  isArray: () => (/* reexport */ isArray),
  isBoolean: () => (/* reexport */ isBoolean),
  isDivModeEnabled: () => (/* reexport */ isDivModeEnabled),
  isFunction: () => (/* reexport */ isFunction),
  isInArray: () => (/* reexport */ isInArray),
  isNumber: () => (/* reexport */ isNumber),
  isObject: () => (/* reexport */ isObject),
  isPointInside: () => (/* reexport */ isPointInside),
  isSsr: () => (/* reexport */ isSsr),
  isString: () => (/* reexport */ isString),
  itemFromArray: () => (/* reexport */ itemFromArray),
  itemFromSingleOrMultiple: () => (/* reexport */ itemFromSingleOrMultiple),
  loadFont: () => (/* reexport */ loadFont),
  loadFull: () => (/* reexport */ loadFull),
  loadOptions: () => (/* reexport */ loadOptions),
  loadParticlesOptions: () => (/* reexport */ loadParticlesOptions),
  loadSlim: () => (/* reexport */ loadSlim),
  millisecondsToSeconds: () => (/* reexport */ millisecondsToSeconds),
  mix: () => (/* reexport */ mix),
  mouseDownEvent: () => (/* reexport */ mouseDownEvent),
  mouseLeaveEvent: () => (/* reexport */ mouseLeaveEvent),
  mouseMoveEvent: () => (/* reexport */ mouseMoveEvent),
  mouseOutEvent: () => (/* reexport */ mouseOutEvent),
  mouseUpEvent: () => (/* reexport */ mouseUpEvent),
  paintBase: () => (/* reexport */ paintBase),
  paintImage: () => (/* reexport */ paintImage),
  parseAlpha: () => (/* reexport */ parseAlpha),
  percentDenominator: () => (/* reexport */ percentDenominator),
  randomInRange: () => (/* reexport */ randomInRange),
  rangeColorToHsl: () => (/* reexport */ rangeColorToHsl),
  rangeColorToRgb: () => (/* reexport */ rangeColorToRgb),
  rectBounce: () => (/* reexport */ rectBounce),
  resizeEvent: () => (/* reexport */ resizeEvent),
  rgbToHsl: () => (/* reexport */ rgbToHsl),
  safeIntersectionObserver: () => (/* reexport */ safeIntersectionObserver),
  safeMatchMedia: () => (/* reexport */ safeMatchMedia),
  safeMutationObserver: () => (/* reexport */ safeMutationObserver),
  setLogger: () => (/* reexport */ setLogger),
  setRandom: () => (/* reexport */ setRandom),
  setRangeValue: () => (/* reexport */ setRangeValue),
  singleDivModeExecute: () => (/* reexport */ singleDivModeExecute),
  stringToAlpha: () => (/* reexport */ stringToAlpha),
  stringToRgb: () => (/* reexport */ stringToRgb),
  touchCancelEvent: () => (/* reexport */ touchCancelEvent),
  touchEndEvent: () => (/* reexport */ touchEndEvent),
  touchMoveEvent: () => (/* reexport */ touchMoveEvent),
  touchStartEvent: () => (/* reexport */ touchStartEvent),
  tsParticles: () => (/* reexport */ tsParticles),
  updateAnimation: () => (/* reexport */ updateAnimation),
  updateColor: () => (/* reexport */ updateColor),
  updateColorValue: () => (/* reexport */ updateColorValue),
  visibilityChangeEvent: () => (/* reexport */ visibilityChangeEvent)
});

;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Utils/Constants.js
const generatedAttribute = "generated";
const mouseDownEvent = "pointerdown";
const mouseUpEvent = "pointerup";
const mouseLeaveEvent = "pointerleave";
const mouseOutEvent = "pointerout";
const mouseMoveEvent = "pointermove";
const touchStartEvent = "touchstart";
const touchEndEvent = "touchend";
const touchMoveEvent = "touchmove";
const touchCancelEvent = "touchcancel";
const resizeEvent = "resize";
const visibilityChangeEvent = "visibilitychange";
const errorPrefix = "tsParticles - Error";
const percentDenominator = 100;
const halfRandom = 0.5;
const millisecondsToSeconds = 1000;
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Utils/Vector3d.js


const origin = {
    x: 0,
    y: 0,
    z: 0
  },
  squareExp = 2,
  inverseFactorNumerator = 1.0;
class Vector3d {
  constructor(xOrCoords, y, z) {
    this._updateFromAngle = (angle, length) => {
      this.x = Math.cos(angle) * length;
      this.y = Math.sin(angle) * length;
    };
    if (!isNumber(xOrCoords) && xOrCoords) {
      this.x = xOrCoords.x;
      this.y = xOrCoords.y;
      const coords3d = xOrCoords;
      this.z = coords3d.z ? coords3d.z : origin.z;
    } else if (xOrCoords !== undefined && y !== undefined) {
      this.x = xOrCoords;
      this.y = y;
      this.z = z ?? origin.z;
    } else {
      throw new Error(`${errorPrefix} Vector3d not initialized correctly`);
    }
  }
  static get origin() {
    return Vector3d.create(origin.x, origin.y, origin.z);
  }
  get angle() {
    return Math.atan2(this.y, this.x);
  }
  set angle(angle) {
    this._updateFromAngle(angle, this.length);
  }
  get length() {
    return Math.sqrt(this.getLengthSq());
  }
  set length(length) {
    this._updateFromAngle(this.angle, length);
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
    return this.x ** squareExp + this.y ** squareExp;
  }
  mult(n) {
    return Vector3d.create(this.x * n, this.y * n, this.z * n);
  }
  multTo(n) {
    this.x *= n;
    this.y *= n;
    this.z *= n;
  }
  normalize() {
    const length = this.length,
      noLength = 0;
    if (length != noLength) {
      this.multTo(inverseFactorNumerator / length);
    }
  }
  rotate(angle) {
    return Vector3d.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle), origin.z);
  }
  setTo(c) {
    this.x = c.x;
    this.y = c.y;
    const v3d = c;
    this.z = v3d.z ? v3d.z : origin.z;
  }
  sub(v) {
    return Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z);
  }
  subFrom(v) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Utils/Vector.js

const Vector_origin = {
  x: 0,
  y: 0,
  z: 0
};
class Vector extends Vector3d {
  constructor(xOrCoords, y) {
    super(xOrCoords, y, Vector_origin.z);
  }
  static get origin() {
    return Vector.create(Vector_origin.x, Vector_origin.y);
  }
  static clone(source) {
    return Vector.create(source.x, source.y);
  }
  static create(x, y) {
    return new Vector(x, y);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Utils/NumberUtils.js



let _random = Math.random;
const easings = new Map(),
  NumberUtils_double = 2,
  doublePI = Math.PI * NumberUtils_double;
function addEasing(name, easing) {
  if (easings.get(name)) {
    return;
  }
  easings.set(name, easing);
}
function getEasing(name) {
  return easings.get(name) ?? (value => value);
}
function setRandom(rnd = Math.random) {
  _random = rnd;
}
function getRandom() {
  const min = 0,
    max = 1;
  return clamp(_random(), min, max - Number.EPSILON);
}
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function mix(comp1, comp2, weight1, weight2) {
  return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
function randomInRange(r) {
  const max = getRangeMax(r),
    minOffset = 0;
  let min = getRangeMin(r);
  if (max === min) {
    min = minOffset;
  }
  return getRandom() * (max - min) + min;
}
function getRangeValue(value) {
  return isNumber(value) ? value : randomInRange(value);
}
function getRangeMin(value) {
  return isNumber(value) ? value : value.min;
}
function getRangeMax(value) {
  return isNumber(value) ? value : value.max;
}
function setRangeValue(source, value) {
  if (source === value || value === undefined && isNumber(source)) {
    return source;
  }
  const min = getRangeMin(source),
    max = getRangeMax(source);
  return value !== undefined ? {
    min: Math.min(min, value),
    max: Math.max(max, value)
  } : setRangeValue(min, max);
}
function getDistances(pointA, pointB) {
  const dx = pointA.x - pointB.x,
    dy = pointA.y - pointB.y,
    squareExp = 2;
  return {
    dx: dx,
    dy: dy,
    distance: Math.sqrt(dx ** squareExp + dy ** squareExp)
  };
}
function getDistance(pointA, pointB) {
  return getDistances(pointA, pointB).distance;
}
function degToRad(degrees) {
  const PIDeg = 180;
  return degrees * Math.PI / PIDeg;
}
function getParticleDirectionAngle(direction, position, center) {
  if (isNumber(direction)) {
    return degToRad(direction);
  }
  const empty = 0,
    half = 0.5,
    quarter = 0.25,
    threeQuarter = half + quarter;
  switch (direction) {
    case "top":
      return -Math.PI * half;
    case "top-right":
      return -Math.PI * quarter;
    case "right":
      return empty;
    case "bottom-right":
      return Math.PI * quarter;
    case "bottom":
      return Math.PI * half;
    case "bottom-left":
      return Math.PI * threeQuarter;
    case "left":
      return Math.PI;
    case "top-left":
      return -Math.PI * threeQuarter;
    case "inside":
      return Math.atan2(center.y - position.y, center.x - position.x);
    case "outside":
      return Math.atan2(position.y - center.y, position.x - center.x);
    default:
      return getRandom() * doublePI;
  }
}
function getParticleBaseVelocity(direction) {
  const baseVelocity = Vector.origin;
  baseVelocity.length = 1;
  baseVelocity.angle = direction;
  return baseVelocity;
}
function collisionVelocity(v1, v2, m1, m2) {
  const double = 2;
  return Vector.create(v1.x * (m1 - m2) / (m1 + m2) + v2.x * double * m2 / (m1 + m2), v1.y);
}
function calcPositionFromSize(data) {
  return data.position?.x !== undefined && data.position.y !== undefined ? {
    x: data.position.x * data.size.width / percentDenominator,
    y: data.position.y * data.size.height / percentDenominator
  } : undefined;
}
function calcPositionOrRandomFromSize(data) {
  return {
    x: (data.position?.x ?? getRandom() * percentDenominator) * data.size.width / percentDenominator,
    y: (data.position?.y ?? getRandom() * percentDenominator) * data.size.height / percentDenominator
  };
}
function calcPositionOrRandomFromSizeRanged(data) {
  const position = {
    x: data.position?.x !== undefined ? getRangeValue(data.position.x) : undefined,
    y: data.position?.y !== undefined ? getRangeValue(data.position.y) : undefined
  };
  return calcPositionOrRandomFromSize({
    size: data.size,
    position
  });
}
function calcExactPositionOrRandomFromSize(data) {
  return {
    x: data.position?.x ?? getRandom() * data.size.width,
    y: data.position?.y ?? getRandom() * data.size.height
  };
}
function calcExactPositionOrRandomFromSizeRanged(data) {
  const position = {
    x: data.position?.x !== undefined ? getRangeValue(data.position.x) : undefined,
    y: data.position?.y !== undefined ? getRangeValue(data.position.y) : undefined
  };
  return calcExactPositionOrRandomFromSize({
    size: data.size,
    position
  });
}
function parseAlpha(input) {
  const defaultAlpha = 1;
  if (!input) {
    return defaultAlpha;
  }
  return input.endsWith("%") ? parseFloat(input) / percentDenominator : parseFloat(input);
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Utils/Utils.js



const _logger = {
  debug: console.debug,
  error: console.error,
  info: console.info,
  log: console.log,
  verbose: console.log,
  warning: console.warn
};
function setLogger(logger) {
  _logger.debug = logger.debug || _logger.debug;
  _logger.error = logger.error || _logger.error;
  _logger.info = logger.info || _logger.info;
  _logger.log = logger.log || _logger.log;
  _logger.verbose = logger.verbose || _logger.verbose;
  _logger.warning = logger.warning || _logger.warning;
}
function getLogger() {
  return _logger;
}
function rectSideBounce(data) {
  const res = {
      bounced: false
    },
    {
      pSide,
      pOtherSide,
      rectSide,
      rectOtherSide,
      velocity,
      factor
    } = data,
    half = 0.5,
    minVelocity = 0;
  if (pOtherSide.min < rectOtherSide.min || pOtherSide.min > rectOtherSide.max || pOtherSide.max < rectOtherSide.min || pOtherSide.max > rectOtherSide.max) {
    return res;
  }
  if (pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) * half && velocity > minVelocity || pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) * half && velocity < minVelocity) {
    res.velocity = velocity * -factor;
    res.bounced = true;
  }
  return res;
}
function checkSelector(element, selectors) {
  const res = executeOnSingleOrMultiple(selectors, selector => {
    return element.matches(selector);
  });
  return isArray(res) ? res.some(t => t) : res;
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
function safeIntersectionObserver(callback) {
  if (isSsr() || typeof IntersectionObserver === "undefined") {
    return;
  }
  return new IntersectionObserver(callback);
}
function safeMutationObserver(callback) {
  if (isSsr() || typeof MutationObserver === "undefined") {
    return;
  }
  return new MutationObserver(callback);
}
function isInArray(value, array) {
  const invalidIndex = -1;
  return value === array || isArray(array) && array.indexOf(value) > invalidIndex;
}
async function loadFont(font, weight) {
  try {
    await document.fonts.load(`${weight ?? "400"} 36px '${font ?? "Verdana"}'`);
  } catch {}
}
function arrayRandomIndex(array) {
  return Math.floor(getRandom() * array.length);
}
function itemFromArray(array, index, useIndex = true) {
  return array[index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array)];
}
function isPointInside(point, size, offset, radius, direction) {
  const minRadius = 0;
  return areBoundsInside(calculateBounds(point, radius ?? minRadius), size, offset, direction);
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
    if (!isObject(source)) {
      destination = source;
      continue;
    }
    const sourceIsArray = Array.isArray(source);
    if (sourceIsArray && (isObject(destination) || !destination || !Array.isArray(destination))) {
      destination = [];
    } else if (!sourceIsArray && (isObject(destination) || !destination || Array.isArray(destination))) {
      destination = {};
    }
    for (const key in source) {
      if (key === "__proto__") {
        continue;
      }
      const sourceDict = source,
        value = sourceDict[key],
        destDict = destination;
      destDict[key] = isObject(value) && Array.isArray(value) ? value.map(v => deepExtend(destDict[key], v)) : deepExtend(destDict[key], value);
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
    factor: Vector.create(getRangeValue(p.options.bounce.horizontal.value), getRangeValue(p.options.bounce.vertical.value))
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
    } = getDistances(pos2, pos1),
    minimumDistance = 0;
  if (xVelocityDiff * xDist + yVelocityDiff * yDist < minimumDistance) {
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
    bounceOptions = particle.options.bounce,
    resH = rectSideBounce({
      pSide: {
        min: bounds.left,
        max: bounds.right
      },
      pOtherSide: {
        min: bounds.top,
        max: bounds.bottom
      },
      rectSide: {
        min: divBounds.left,
        max: divBounds.right
      },
      rectOtherSide: {
        min: divBounds.top,
        max: divBounds.bottom
      },
      velocity: particle.velocity.x,
      factor: getRangeValue(bounceOptions.horizontal.value)
    });
  if (resH.bounced) {
    if (resH.velocity !== undefined) {
      particle.velocity.x = resH.velocity;
    }
    if (resH.position !== undefined) {
      particle.position.x = resH.position;
    }
  }
  const resV = rectSideBounce({
    pSide: {
      min: bounds.top,
      max: bounds.bottom
    },
    pOtherSide: {
      min: bounds.left,
      max: bounds.right
    },
    rectSide: {
      min: divBounds.top,
      max: divBounds.bottom
    },
    rectOtherSide: {
      min: divBounds.left,
      max: divBounds.right
    },
    velocity: particle.velocity.y,
    factor: getRangeValue(bounceOptions.vertical.value)
  });
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
  const defaultIndex = 0;
  return isArray(obj) ? obj.map((item, index) => callback(item, index)) : callback(obj, defaultIndex);
}
function itemFromSingleOrMultiple(obj, index, useIndex) {
  return isArray(obj) ? itemFromArray(obj, index, useIndex) : obj;
}
function findItemFromSingleOrMultiple(obj, callback) {
  if (isArray(obj)) {
    return obj.find((t, index) => callback(t, index));
  }
  const defaultIndex = 0;
  return callback(obj, defaultIndex) ? obj : undefined;
}
function initParticleNumericAnimationValue(options, pxRatio) {
  const valueRange = options.value,
    animationOptions = options.animation,
    res = {
      delayTime: getRangeValue(animationOptions.delay) * millisecondsToSeconds,
      enable: animationOptions.enable,
      value: getRangeValue(options.value) * pxRatio,
      max: getRangeMax(valueRange) * pxRatio,
      min: getRangeMin(valueRange) * pxRatio,
      loops: 0,
      maxLoops: getRangeValue(animationOptions.count),
      time: 0
    },
    decayOffset = 1;
  if (animationOptions.enable) {
    res.decay = decayOffset - getRangeValue(animationOptions.decay);
    switch (animationOptions.mode) {
      case "increase":
        res.status = "increasing";
        break;
      case "decrease":
        res.status = "decreasing";
        break;
      case "random":
        res.status = getRandom() >= halfRandom ? "increasing" : "decreasing";
        break;
    }
    const autoStatus = animationOptions.mode === "auto";
    switch (animationOptions.startValue) {
      case "min":
        res.value = res.min;
        if (autoStatus) {
          res.status = "increasing";
        }
        break;
      case "max":
        res.value = res.max;
        if (autoStatus) {
          res.status = "decreasing";
        }
        break;
      case "random":
      default:
        res.value = randomInRange(res);
        if (autoStatus) {
          res.status = getRandom() >= halfRandom ? "increasing" : "decreasing";
        }
        break;
    }
  }
  res.initialValue = res.value;
  return res;
}
function getPositionOrSize(positionOrSize, canvasSize) {
  const isPercent = positionOrSize.mode === "percent";
  if (!isPercent) {
    const {
      mode: _,
      ...rest
    } = positionOrSize;
    return rest;
  }
  const isPosition = ("x" in positionOrSize);
  if (isPosition) {
    return {
      x: positionOrSize.x / percentDenominator * canvasSize.width,
      y: positionOrSize.y / percentDenominator * canvasSize.height
    };
  } else {
    return {
      width: positionOrSize.width / percentDenominator * canvasSize.width,
      height: positionOrSize.height / percentDenominator * canvasSize.height
    };
  }
}
function getPosition(position, canvasSize) {
  return getPositionOrSize(position, canvasSize);
}
function getSize(size, canvasSize) {
  return getPositionOrSize(size, canvasSize);
}
function isBoolean(arg) {
  return typeof arg === "boolean";
}
function isString(arg) {
  return typeof arg === "string";
}
function isNumber(arg) {
  return typeof arg === "number";
}
function isFunction(arg) {
  return typeof arg === "function";
}
function isObject(arg) {
  return typeof arg === "object" && arg !== null;
}
function isArray(arg) {
  return Array.isArray(arg);
}
function checkDestroy(particle, destroyType, value, minValue, maxValue) {
  switch (destroyType) {
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
function updateAnimation(particle, data, changeDirection, destroyType, delta) {
  const minLoops = 0,
    minDelay = 0,
    identity = 1,
    minVelocity = 0,
    minDecay = 1;
  if (particle.destroyed || !data || !data.enable || (data.maxLoops ?? minLoops) > minLoops && (data.loops ?? minLoops) > (data.maxLoops ?? minLoops)) {
    return;
  }
  const velocity = (data.velocity ?? minVelocity) * delta.factor,
    minValue = data.min,
    maxValue = data.max,
    decay = data.decay ?? minDecay;
  if (!data.time) {
    data.time = 0;
  }
  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
    data.time += delta.value;
  }
  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
    return;
  }
  switch (data.status) {
    case "increasing":
      if (data.value >= maxValue) {
        if (changeDirection) {
          data.status = "decreasing";
        } else {
          data.value -= maxValue;
        }
        if (!data.loops) {
          data.loops = minLoops;
        }
        data.loops++;
      } else {
        data.value += velocity;
      }
      break;
    case "decreasing":
      if (data.value <= minValue) {
        if (changeDirection) {
          data.status = "increasing";
        } else {
          data.value += maxValue;
        }
        if (!data.loops) {
          data.loops = minLoops;
        }
        data.loops++;
      } else {
        data.value -= velocity;
      }
  }
  if (data.velocity && decay !== identity) {
    data.velocity *= decay;
  }
  checkDestroy(particle, destroyType, data.value, minValue, maxValue);
  if (!particle.destroyed) {
    data.value = clamp(data.value, minValue, maxValue);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Utils/ColorUtils.js



const randomColorValue = "random",
  midColorValue = "mid",
  colorManagers = new Map();
function addColorManager(manager) {
  colorManagers.set(manager.key, manager);
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
    result = regex.exec(hexFixed),
    radix = 16,
    defaultAlpha = 1,
    alphaFactor = 0xff;
  return result ? {
    a: result[4] !== undefined ? parseInt(result[4], radix) / alphaFactor : defaultAlpha,
    b: parseInt(result[3], radix),
    g: parseInt(result[2], radix),
    r: parseInt(result[1], radix)
  } : undefined;
}
function rangeColorToRgb(input, index, useIndex = true) {
  if (!input) {
    return;
  }
  const color = isString(input) ? {
    value: input
  } : input;
  if (isString(color.value)) {
    return colorToRgb(color.value, index, useIndex);
  }
  if (isArray(color.value)) {
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
  const color = isString(input) ? {
    value: input
  } : input;
  if (isString(color.value)) {
    return color.value === randomColorValue ? getRandomRgbColor() : stringToRgb(color.value);
  }
  if (isArray(color.value)) {
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
  const rgbMax = 255,
    hMax = 360,
    sMax = 100,
    lMax = 100,
    hMin = 0,
    sMin = 0,
    hPhase = 60,
    half = 0.5,
    double = 2,
    r1 = color.r / rgbMax,
    g1 = color.g / rgbMax,
    b1 = color.b / rgbMax,
    max = Math.max(r1, g1, b1),
    min = Math.min(r1, g1, b1),
    res = {
      h: hMin,
      l: (max + min) * half,
      s: sMin
    };
  if (max !== min) {
    res.s = res.l < half ? (max - min) / (max + min) : (max - min) / (double - max - min);
    res.h = r1 === max ? (g1 - b1) / (max - min) : res.h = g1 === max ? double + (b1 - r1) / (max - min) : double * double + (r1 - g1) / (max - min);
  }
  res.l *= lMax;
  res.s *= sMax;
  res.h *= hPhase;
  if (res.h < hMin) {
    res.h += hMax;
  }
  if (res.h >= hMax) {
    res.h -= hMax;
  }
  return res;
}
function stringToAlpha(input) {
  return stringToRgba(input)?.a;
}
function stringToRgb(input) {
  return stringToRgba(input);
}
function hslToRgb(hsl) {
  const hMax = 360,
    sMax = 100,
    lMax = 100,
    sMin = 0,
    lMin = 0,
    h = (hsl.h % hMax + hMax) % hMax,
    s = Math.max(sMin, Math.min(sMax, hsl.s)),
    l = Math.max(lMin, Math.min(lMax, hsl.l)),
    hNormalized = h / hMax,
    sNormalized = s / sMax,
    lNormalized = l / lMax,
    rgbFactor = 255,
    triple = 3;
  if (s === sMin) {
    const grayscaleValue = Math.round(lNormalized * rgbFactor);
    return {
      r: grayscaleValue,
      g: grayscaleValue,
      b: grayscaleValue
    };
  }
  const half = 0.5,
    double = 2,
    channel = (temp1, temp2, temp3) => {
      const temp3Min = 0,
        temp3Max = 1,
        sextuple = 6;
      if (temp3 < temp3Min) {
        temp3++;
      }
      if (temp3 > temp3Max) {
        temp3--;
      }
      if (temp3 * sextuple < temp3Max) {
        return temp1 + (temp2 - temp1) * sextuple * temp3;
      }
      if (temp3 * double < temp3Max) {
        return temp2;
      }
      if (temp3 * triple < temp3Max * double) {
        const temp3Offset = double / triple;
        return temp1 + (temp2 - temp1) * (temp3Offset - temp3) * sextuple;
      }
      return temp1;
    },
    sNormalizedOffset = 1,
    temp1 = lNormalized < half ? lNormalized * (sNormalizedOffset + sNormalized) : lNormalized + sNormalized - lNormalized * sNormalized,
    temp2 = double * lNormalized - temp1,
    phaseNumerator = 1,
    phaseThird = phaseNumerator / triple,
    red = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized + phaseThird)),
    green = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized)),
    blue = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized - phaseThird));
  return {
    r: Math.round(red),
    g: Math.round(green),
    b: Math.round(blue)
  };
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
  const defaultMin = 0,
    fixedMin = min ?? defaultMin,
    rgbMax = 256;
  return {
    b: Math.floor(randomInRange(setRangeValue(fixedMin, rgbMax))),
    g: Math.floor(randomInRange(setRangeValue(fixedMin, rgbMax))),
    r: Math.floor(randomInRange(setRangeValue(fixedMin, rgbMax)))
  };
}
function getStyleFromRgb(color, opacity) {
  const defaultOpacity = 1;
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity ?? defaultOpacity})`;
}
function getStyleFromHsl(color, opacity) {
  const defaultOpacity = 1;
  return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity ?? defaultOpacity})`;
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
  if (linkColor === randomColorValue) {
    return getRandomRgbColor();
  } else if (linkColor === midColorValue) {
    const sourceColor = p1.getFillColor() ?? p1.getStrokeColor(),
      destColor = p2?.getFillColor() ?? p2?.getStrokeColor();
    if (sourceColor && destColor && p2) {
      return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
    } else {
      const hslColor = sourceColor ?? destColor;
      if (hslColor) {
        return hslToRgb(hslColor);
      }
    }
  } else {
    return linkColor;
  }
}
function getLinkRandomColor(optColor, blink, consent) {
  const color = isString(optColor) ? optColor : optColor.value;
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
  const defaultVelocity = 0,
    decayOffset = 1,
    defaultLoops = 0,
    defaultTime = 0;
  if (colorValue.enable) {
    colorValue.velocity = getRangeValue(colorAnimation.speed) / percentDenominator * reduceFactor;
    colorValue.decay = decayOffset - getRangeValue(colorAnimation.decay);
    colorValue.status = "increasing";
    colorValue.loops = defaultLoops;
    colorValue.maxLoops = getRangeValue(colorAnimation.count);
    colorValue.time = defaultTime;
    colorValue.delayTime = getRangeValue(colorAnimation.delay) * millisecondsToSeconds;
    if (!colorAnimation.sync) {
      colorValue.velocity *= getRandom();
      colorValue.value *= getRandom();
    }
    colorValue.initialValue = colorValue.value;
    colorValue.offset = setRangeValue(colorAnimation.offset);
  } else {
    colorValue.velocity = defaultVelocity;
  }
}
function updateColorValue(data, range, decrease, delta) {
  const minLoops = 0,
    minDelay = 0,
    identity = 1,
    minVelocity = 0,
    minOffset = 0,
    velocityFactor = 3.6;
  if (!data || !data.enable || (data.maxLoops ?? minLoops) > minLoops && (data.loops ?? minLoops) > (data.maxLoops ?? minLoops)) {
    return;
  }
  if (!data.time) {
    data.time = 0;
  }
  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
    data.time += delta.value;
  }
  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {
    return;
  }
  const offset = data.offset ? randomInRange(data.offset) : minOffset,
    velocity = (data.velocity ?? minVelocity) * delta.factor + offset * velocityFactor,
    decay = data.decay ?? identity,
    max = getRangeMax(range),
    min = getRangeMin(range);
  if (!decrease || data.status === "increasing") {
    data.value += velocity;
    if (data.value > max) {
      if (!data.loops) {
        data.loops = 0;
      }
      data.loops++;
      if (decrease) {
        data.status = "decreasing";
      } else {
        data.value -= max;
      }
    }
  } else {
    data.value -= velocity;
    const minValue = 0;
    if (data.value < minValue) {
      if (!data.loops) {
        data.loops = 0;
      }
      data.loops++;
      data.status = "increasing";
    }
  }
  if (data.velocity && decay !== identity) {
    data.velocity *= decay;
  }
  data.value = clamp(data.value, min, max);
}
function updateColor(color, delta) {
  if (!color) {
    return;
  }
  const {
    h,
    s,
    l
  } = color;
  const ranges = {
    h: {
      min: 0,
      max: 360
    },
    s: {
      min: 0,
      max: 100
    },
    l: {
      min: 0,
      max: 100
    }
  };
  if (h) {
    updateColorValue(h, ranges.h, false, delta);
  }
  if (s) {
    updateColorValue(s, ranges.s, true, delta);
  }
  if (l) {
    updateColorValue(l, ranges.l, true, delta);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Utils/CanvasUtils.js

const CanvasUtils_origin = {
  x: 0,
  y: 0
};
function drawLine(context, begin, end) {
  context.beginPath();
  context.moveTo(begin.x, begin.y);
  context.lineTo(end.x, end.y);
  context.closePath();
}
function paintBase(context, dimension, baseColor) {
  context.fillStyle = baseColor ?? "rgba(0,0,0,0)";
  context.fillRect(CanvasUtils_origin.x, CanvasUtils_origin.y, dimension.width, dimension.height);
}
function paintImage(context, dimension, image, opacity) {
  if (!image) {
    return;
  }
  context.globalAlpha = opacity;
  context.drawImage(image, CanvasUtils_origin.x, CanvasUtils_origin.y, dimension.width, dimension.height);
  context.globalAlpha = 1;
}
function clear(context, dimension) {
  context.clearRect(CanvasUtils_origin.x, CanvasUtils_origin.y, dimension.width, dimension.height);
}
function drawParticle(data) {
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
    } = data,
    pos = particle.getPosition(),
    defaultAngle = 0,
    angle = particle.rotation + (particle.pathRotation ? particle.velocity.angle : defaultAngle),
    rotateData = {
      sin: Math.sin(angle),
      cos: Math.cos(angle)
    },
    defaultTransformFactor = 1,
    transformData = {
      a: rotateData.cos * (transform.a ?? defaultTransformFactor),
      b: rotateData.sin * (transform.b ?? defaultTransformFactor),
      c: -rotateData.sin * (transform.c ?? defaultTransformFactor),
      d: rotateData.cos * (transform.d ?? defaultTransformFactor)
    };
  context.setTransform(transformData.a, transformData.b, transformData.c, transformData.d, pos.x, pos.y);
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
  const minStrokeWidth = 0,
    strokeWidth = particle.strokeWidth ?? minStrokeWidth;
  context.lineWidth = strokeWidth;
  if (colorStyles.stroke) {
    context.strokeStyle = colorStyles.stroke;
  }
  const drawData = {
    container,
    context,
    particle,
    radius,
    opacity,
    delta,
    transformData,
    strokeWidth
  };
  drawShape(drawData);
  drawShapeAfterDraw(drawData);
  drawEffect(drawData);
  context.globalCompositeOperation = "source-over";
  context.resetTransform();
}
function drawEffect(data) {
  const {
    container,
    context,
    particle,
    radius,
    opacity,
    delta,
    transformData
  } = data;
  if (!particle.effect) {
    return;
  }
  const drawer = container.effectDrawers.get(particle.effect);
  if (!drawer) {
    return;
  }
  drawer.draw({
    context,
    particle,
    radius,
    opacity,
    delta,
    pixelRatio: container.retina.pixelRatio,
    transformData: {
      ...transformData
    }
  });
}
function drawShape(data) {
  const {
      container,
      context,
      particle,
      radius,
      opacity,
      delta,
      strokeWidth,
      transformData
    } = data,
    minStrokeWidth = 0;
  if (!particle.shape) {
    return;
  }
  const drawer = container.shapeDrawers.get(particle.shape);
  if (!drawer) {
    return;
  }
  context.beginPath();
  drawer.draw({
    context,
    particle,
    radius,
    opacity,
    delta,
    pixelRatio: container.retina.pixelRatio,
    transformData: {
      ...transformData
    }
  });
  if (particle.shapeClose) {
    context.closePath();
  }
  if (strokeWidth > minStrokeWidth) {
    context.stroke();
  }
  if (particle.shapeFill) {
    context.fill();
  }
}
function drawShapeAfterDraw(data) {
  const {
    container,
    context,
    particle,
    radius,
    opacity,
    delta,
    transformData
  } = data;
  if (!particle.shape) {
    return;
  }
  const drawer = container.shapeDrawers.get(particle.shape);
  if (!drawer?.afterDraw) {
    return;
  }
  drawer.afterDraw({
    context,
    particle,
    radius,
    opacity,
    delta,
    pixelRatio: container.retina.pixelRatio,
    transformData: {
      ...transformData
    }
  });
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
  const lFactor = 1;
  return {
    h: color.h,
    s: color.s,
    l: color.l + (type === "darken" ? -lFactor : lFactor) * value
  };
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Canvas.js




function setTransformValue(factor, newFactor, key) {
  const newValue = newFactor[key],
    defaultValue = 1;
  if (newValue !== undefined) {
    factor[key] = (factor[key] ?? defaultValue) * newValue;
  }
}
class Canvas {
  constructor(container) {
    this.container = container;
    this._applyPostDrawUpdaters = particle => {
      for (const updater of this._postDrawUpdaters) {
        updater.afterDraw?.(particle);
      }
    };
    this._applyPreDrawUpdaters = (ctx, particle, radius, zOpacity, colorStyles, transform) => {
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
        updater.beforeDraw?.(particle);
      }
    };
    this._applyResizePlugins = () => {
      for (const plugin of this._resizePlugins) {
        plugin.resize?.();
      }
    };
    this._getPluginParticleColors = particle => {
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
    };
    this._initCover = () => {
      const options = this.container.actualOptions,
        cover = options.backgroundMask.cover,
        color = cover.color,
        coverRgb = rangeColorToRgb(color);
      if (coverRgb) {
        const coverColor = {
          ...coverRgb,
          a: cover.opacity
        };
        this._coverColorStyle = getStyleFromRgb(coverColor, coverColor.a);
      }
    };
    this._initStyle = () => {
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
    };
    this._initTrail = async () => {
      const options = this.container.actualOptions,
        trail = options.particles.move.trail,
        trailFill = trail.fill;
      if (!trail.enable) {
        return;
      }
      const factorNumerator = 1,
        opacity = factorNumerator / trail.length;
      if (trailFill.color) {
        const fillColor = rangeColorToRgb(trailFill.color);
        if (!fillColor) {
          return;
        }
        this._trailFill = {
          color: {
            ...fillColor
          },
          opacity
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
              opacity
            };
            resolve();
          });
          img.addEventListener("error", evt => {
            reject(evt.error);
          });
          img.src = trailFill.image;
        });
      }
    };
    this._paintBase = baseColor => {
      this.draw(ctx => paintBase(ctx, this.size, baseColor));
    };
    this._paintImage = (image, opacity) => {
      this.draw(ctx => paintImage(ctx, this.size, image, opacity));
    };
    this._repairStyle = () => {
      const element = this.element;
      if (!element) {
        return;
      }
      this._safeMutationObserver(observer => observer.disconnect());
      this._initStyle();
      this.initBackground();
      this._safeMutationObserver(observer => observer.observe(element, {
        attributes: true
      }));
    };
    this._resetOriginalStyle = () => {
      const element = this.element,
        originalStyle = this._originalStyle;
      if (!(element && originalStyle)) {
        return;
      }
      const style = element.style;
      style.position = originalStyle.position;
      style.zIndex = originalStyle.zIndex;
      style.top = originalStyle.top;
      style.left = originalStyle.left;
      style.width = originalStyle.width;
      style.height = originalStyle.height;
    };
    this._safeMutationObserver = callback => {
      if (!this._mutationObserver) {
        return;
      }
      callback(this._mutationObserver);
    };
    this._setFullScreenStyle = () => {
      const element = this.element;
      if (!element) {
        return;
      }
      const priority = "important",
        style = element.style,
        radix = 10;
      style.setProperty("position", "fixed", priority);
      style.setProperty("z-index", this.container.actualOptions.fullScreen.zIndex.toString(radix), priority);
      style.setProperty("top", "0", priority);
      style.setProperty("left", "0", priority);
      style.setProperty("width", "100%", priority);
      style.setProperty("height", "100%", priority);
    };
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
  }
  get _fullScreen() {
    return this.container.actualOptions.fullScreen.enable;
  }
  clear() {
    const options = this.container.actualOptions,
      trail = options.particles.move.trail,
      trailFill = this._trailFill,
      minimumLength = 0;
    if (options.backgroundMask.enable) {
      this.paint();
    } else if (trail.enable && trail.length > minimumLength && trailFill) {
      if (trailFill.color) {
        this._paintBase(getStyleFromRgb(trailFill.color, trailFill.opacity));
      } else if (trailFill.image) {
        this._paintImage(trailFill.image, trailFill.opacity);
      }
    } else if (options.clear) {
      this.draw(ctx => {
        clear(ctx, this.size);
      });
    }
  }
  destroy() {
    this.stop();
    if (this._generated) {
      const element = this.element;
      element?.remove();
    } else {
      this._resetOriginalStyle();
    }
    this._preDrawUpdaters = [];
    this._postDrawUpdaters = [];
    this._resizePlugins = [];
    this._colorPlugins = [];
  }
  draw(cb) {
    const ctx = this._context;
    if (!ctx) {
      return;
    }
    return cb(ctx);
  }
  drawParticle(particle, delta) {
    if (particle.spawning || particle.destroyed) {
      return;
    }
    const radius = particle.getRadius(),
      minimumSize = 0;
    if (radius <= minimumSize) {
      return;
    }
    const pfColor = particle.getFillColor(),
      psColor = particle.getStrokeColor() ?? pfColor;
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
      const container = this.container,
        options = container.actualOptions,
        zIndexOptions = particle.options.zIndex,
        zIndexFactorOffset = 1,
        zIndexFactor = zIndexFactorOffset - particle.zIndexFactor,
        zOpacityFactor = zIndexFactor ** zIndexOptions.opacityRate,
        defaultOpacity = 1,
        opacity = particle.bubble.opacity ?? particle.opacity?.value ?? defaultOpacity,
        strokeOpacity = particle.strokeOpacity ?? opacity,
        zOpacity = opacity * zOpacityFactor,
        zStrokeOpacity = strokeOpacity * zOpacityFactor,
        transform = {},
        colorStyles = {
          fill: fColor ? getStyleFromHsl(fColor, zOpacity) : undefined
        };
      colorStyles.stroke = sColor ? getStyleFromHsl(sColor, zStrokeOpacity) : colorStyles.fill;
      this._applyPreDrawUpdaters(ctx, particle, radius, zOpacity, colorStyles, transform);
      drawParticle({
        container,
        context: ctx,
        particle,
        delta,
        colorStyles,
        backgroundMask: options.backgroundMask.enable,
        composite: options.backgroundMask.composite,
        radius: radius * zIndexFactor ** zIndexOptions.sizeRate,
        opacity: zOpacity,
        shadow: particle.options.shadow,
        transform
      });
      this._applyPostDrawUpdaters(particle);
    });
  }
  drawParticlePlugin(plugin, particle, delta) {
    this.draw(ctx => drawParticlePlugin(ctx, plugin, particle, delta));
  }
  drawPlugin(plugin, delta) {
    this.draw(ctx => drawPlugin(ctx, plugin, delta));
  }
  async init() {
    this._safeMutationObserver(obs => obs.disconnect());
    this._mutationObserver = safeMutationObserver(records => {
      for (const record of records) {
        if (record.type === "attributes" && record.attributeName === "style") {
          this._repairStyle();
        }
      }
    });
    this.resize();
    this._initStyle();
    this._initCover();
    try {
      await this._initTrail();
    } catch (e) {
      getLogger().error(e);
    }
    this.initBackground();
    this._safeMutationObserver(obs => {
      if (!this.element) {
        return;
      }
      obs.observe(this.element, {
        attributes: true
      });
    });
    this.initUpdaters();
    this.initPlugins();
    this.paint();
  }
  initBackground() {
    const options = this.container.actualOptions,
      background = options.background,
      element = this.element;
    if (!element) {
      return;
    }
    const elementStyle = element.style;
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
      if (plugin.particleFillColor ?? plugin.particleStrokeColor) {
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
      if (updater.getColorStyles ?? updater.getTransformValues ?? updater.beforeDraw) {
        this._preDrawUpdaters.push(updater);
      }
    }
  }
  loadCanvas(canvas) {
    if (this._generated && this.element) {
      this.element.remove();
    }
    this._generated = canvas.dataset && generatedAttribute in canvas.dataset ? canvas.dataset[generatedAttribute] === "true" : this._generated;
    this.element = canvas;
    this.element.ariaHidden = "true";
    this._originalStyle = deepExtend({}, this.element.style);
    this.size.height = canvas.offsetHeight;
    this.size.width = canvas.offsetWidth;
    this._context = this.element.getContext("2d");
    this._safeMutationObserver(obs => {
      if (!this.element) {
        return;
      }
      obs.observe(this.element, {
        attributes: true
      });
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
      return false;
    }
    const container = this.container,
      pxRatio = container.retina.pixelRatio,
      size = container.canvas.size,
      newSize = {
        width: this.element.offsetWidth * pxRatio,
        height: this.element.offsetHeight * pxRatio
      };
    if (newSize.height === size.height && newSize.width === size.width && newSize.height === this.element.height && newSize.width === this.element.width) {
      return false;
    }
    const oldSize = {
      ...size
    };
    this.element.width = size.width = this.element.offsetWidth * pxRatio;
    this.element.height = size.height = this.element.offsetHeight * pxRatio;
    if (this.container.started) {
      container.particles.setResizeFactor({
        width: size.width / oldSize.width,
        height: size.height / oldSize.height
      });
    }
    return true;
  }
  stop() {
    this._safeMutationObserver(obs => obs.disconnect());
    this._mutationObserver = undefined;
    this.draw(ctx => clear(ctx, this.size));
  }
  async windowResize() {
    if (!this.element || !this.resize()) {
      return;
    }
    const container = this.container,
      needsRefresh = container.updateActualOptions();
    container.particles.setDensity();
    this._applyResizePlugins();
    if (needsRefresh) {
      await container.refresh();
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Utils/EventListeners.js


const EventListeners_double = 2;
function manageListener(element, event, handler, add, options) {
  if (add) {
    let addOptions = {
      passive: true
    };
    if (isBoolean(options)) {
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
    this._doMouseTouchClick = e => {
      const container = this.container,
        options = container.actualOptions;
      if (this._canPush) {
        const mouseInteractivity = container.interactivity.mouse,
          mousePos = mouseInteractivity.position;
        if (!mousePos) {
          return;
        }
        mouseInteractivity.clickPosition = {
          ...mousePos
        };
        mouseInteractivity.clickTime = new Date().getTime();
        const onClick = options.interactivity.events.onClick;
        executeOnSingleOrMultiple(onClick.mode, mode => this.container.handleClickMode(mode));
      }
      if (e.type === "touchend") {
        const touchDelay = 500;
        setTimeout(() => this._mouseTouchFinish(), touchDelay);
      }
    };
    this._handleThemeChange = e => {
      const mediaEvent = e,
        container = this.container,
        options = container.options,
        defaultThemes = options.defaultThemes,
        themeName = mediaEvent.matches ? defaultThemes.dark : defaultThemes.light,
        theme = options.themes.find(theme => theme.name === themeName);
      if (theme && theme.default.auto) {
        void container.loadTheme(themeName);
      }
    };
    this._handleVisibilityChange = () => {
      const container = this.container,
        options = container.actualOptions;
      this._mouseTouchFinish();
      if (!options.pauseOnBlur) {
        return;
      }
      if (document && document.hidden) {
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
    };
    this._handleWindowResize = () => {
      if (this._resizeTimeout) {
        clearTimeout(this._resizeTimeout);
        delete this._resizeTimeout;
      }
      const handleResize = async () => {
        const canvas = this.container.canvas;
        await canvas?.windowResize();
      };
      this._resizeTimeout = setTimeout(() => void handleResize(), this.container.actualOptions.interactivity.events.resize.delay * millisecondsToSeconds);
    };
    this._manageInteractivityListeners = (mouseLeaveTmpEvent, add) => {
      const handlers = this._handlers,
        container = this.container,
        options = container.actualOptions;
      const interactivityEl = container.interactivity.element;
      if (!interactivityEl) {
        return;
      }
      const html = interactivityEl,
        canvasEl = container.canvas.element;
      if (canvasEl) {
        canvasEl.style.pointerEvents = html === canvasEl ? "initial" : "none";
      }
      if (!(options.interactivity.events.onHover.enable || options.interactivity.events.onClick.enable)) {
        return;
      }
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
    };
    this._manageListeners = add => {
      const handlers = this._handlers,
        container = this.container,
        options = container.actualOptions,
        detectType = options.interactivity.detectsOn,
        canvasEl = container.canvas.element;
      let mouseLeaveTmpEvent = mouseLeaveEvent;
      if (detectType === "window") {
        container.interactivity.element = window;
        mouseLeaveTmpEvent = mouseOutEvent;
      } else if (detectType === "parent" && canvasEl) {
        container.interactivity.element = canvasEl.parentElement ?? canvasEl.parentNode;
      } else {
        container.interactivity.element = canvasEl;
      }
      this._manageMediaMatch(add);
      this._manageResize(add);
      this._manageInteractivityListeners(mouseLeaveTmpEvent, add);
      if (document) {
        manageListener(document, visibilityChangeEvent, handlers.visibilityChange, add, false);
      }
    };
    this._manageMediaMatch = add => {
      const handlers = this._handlers,
        mediaMatch = safeMatchMedia("(prefers-color-scheme: dark)");
      if (!mediaMatch) {
        return;
      }
      if (mediaMatch.addEventListener !== undefined) {
        manageListener(mediaMatch, "change", handlers.themeChange, add);
        return;
      }
      if (mediaMatch.addListener === undefined) {
        return;
      }
      if (add) {
        mediaMatch.addListener(handlers.oldThemeChange);
      } else {
        mediaMatch.removeListener(handlers.oldThemeChange);
      }
    };
    this._manageResize = add => {
      const handlers = this._handlers,
        container = this.container,
        options = container.actualOptions;
      if (!options.interactivity.events.resize) {
        return;
      }
      if (typeof ResizeObserver === "undefined") {
        manageListener(window, resizeEvent, handlers.resize, add);
        return;
      }
      const canvasEl = container.canvas.element;
      if (this._resizeObserver && !add) {
        if (canvasEl) {
          this._resizeObserver.unobserve(canvasEl);
        }
        this._resizeObserver.disconnect();
        delete this._resizeObserver;
      } else if (!this._resizeObserver && add && canvasEl) {
        this._resizeObserver = new ResizeObserver(entries => {
          const entry = entries.find(e => e.target === canvasEl);
          if (!entry) {
            return;
          }
          this._handleWindowResize();
        });
        this._resizeObserver.observe(canvasEl);
      }
    };
    this._mouseDown = () => {
      const {
        interactivity
      } = this.container;
      if (!interactivity) {
        return;
      }
      const {
        mouse
      } = interactivity;
      mouse.clicking = true;
      mouse.downPosition = mouse.position;
    };
    this._mouseTouchClick = e => {
      const container = this.container,
        options = container.actualOptions,
        {
          mouse
        } = container.interactivity;
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
        this._doMouseTouchClick(e);
      }
      mouse.clicking = false;
    };
    this._mouseTouchFinish = () => {
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
    };
    this._mouseTouchMove = e => {
      const container = this.container,
        options = container.actualOptions,
        interactivity = container.interactivity,
        canvasEl = container.canvas.element;
      if (!interactivity?.element) {
        return;
      }
      interactivity.mouse.inside = true;
      let pos;
      if (e.type.startsWith("pointer")) {
        this._canPush = true;
        const mouseEvent = e;
        if (interactivity.element === window) {
          if (canvasEl) {
            const clientRect = canvasEl.getBoundingClientRect();
            pos = {
              x: mouseEvent.clientX - clientRect.left,
              y: mouseEvent.clientY - clientRect.top
            };
          }
        } else if (options.interactivity.detectsOn === "parent") {
          const source = mouseEvent.target,
            target = mouseEvent.currentTarget;
          if (source && target && canvasEl) {
            const sourceRect = source.getBoundingClientRect(),
              targetRect = target.getBoundingClientRect(),
              canvasRect = canvasEl.getBoundingClientRect();
            pos = {
              x: mouseEvent.offsetX + EventListeners_double * sourceRect.left - (targetRect.left + canvasRect.left),
              y: mouseEvent.offsetY + EventListeners_double * sourceRect.top - (targetRect.top + canvasRect.top)
            };
          } else {
            pos = {
              x: mouseEvent.offsetX ?? mouseEvent.clientX,
              y: mouseEvent.offsetY ?? mouseEvent.clientY
            };
          }
        } else if (mouseEvent.target === canvasEl) {
          pos = {
            x: mouseEvent.offsetX ?? mouseEvent.clientX,
            y: mouseEvent.offsetY ?? mouseEvent.clientY
          };
        }
      } else {
        this._canPush = e.type !== "touchmove";
        if (canvasEl) {
          const touchEvent = e,
            lengthOffset = 1,
            lastTouch = touchEvent.touches[touchEvent.touches.length - lengthOffset],
            canvasRect = canvasEl.getBoundingClientRect(),
            defaultCoordinate = 0;
          pos = {
            x: lastTouch.clientX - (canvasRect.left ?? defaultCoordinate),
            y: lastTouch.clientY - (canvasRect.top ?? defaultCoordinate)
          };
        }
      }
      const pxRatio = container.retina.pixelRatio;
      if (pos) {
        pos.x *= pxRatio;
        pos.y *= pxRatio;
      }
      interactivity.mouse.position = pos;
      interactivity.status = mouseMoveEvent;
    };
    this._touchEnd = e => {
      const evt = e,
        touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        this._touches.delete(touch.identifier);
      }
      this._mouseTouchFinish();
    };
    this._touchEndClick = e => {
      const evt = e,
        touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        this._touches.delete(touch.identifier);
      }
      this._mouseTouchClick(e);
    };
    this._touchStart = e => {
      const evt = e,
        touches = Array.from(evt.changedTouches);
      for (const touch of touches) {
        this._touches.set(touch.identifier, performance.now());
      }
      this._mouseTouchMove(e);
    };
    this._canPush = true;
    this._touches = new Map();
    this._handlers = {
      mouseDown: () => this._mouseDown(),
      mouseLeave: () => this._mouseTouchFinish(),
      mouseMove: e => this._mouseTouchMove(e),
      mouseUp: e => this._mouseTouchClick(e),
      touchStart: e => this._touchStart(e),
      touchMove: e => this._mouseTouchMove(e),
      touchEnd: e => this._touchEnd(e),
      touchCancel: e => this._touchEnd(e),
      touchEndClick: e => this._touchEndClick(e),
      visibilityChange: () => this._handleVisibilityChange(),
      themeChange: e => this._handleThemeChange(e),
      oldThemeChange: e => this._handleThemeChange(e),
      resize: () => {
        this._handleWindowResize();
      }
    };
  }
  addListeners() {
    this._manageListeners(true);
  }
  removeListeners() {
    this._manageListeners(false);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/OptionsColor.js

class OptionsColor {
  constructor() {
    this.value = "";
  }
  static create(source, data) {
    const color = new OptionsColor();
    color.load(source);
    if (data !== undefined) {
      if (isString(data) || isArray(data)) {
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
    if (data?.value === undefined) {
      return;
    }
    this.value = data.value;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Background/Background.js

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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/BackgroundMask/BackgroundMaskCover.js

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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/BackgroundMask/BackgroundMask.js


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
      const cover = data.cover,
        color = isString(data.cover) ? {
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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/FullScreen/FullScreen.js
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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Interactivity/Events/ClickEvent.js
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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Interactivity/Events/DivEvent.js
class DivEvent {
  constructor() {
    this.selectors = [];
    this.enable = false;
    this.mode = [];
    this.type = "circle";
  }
  load(data) {
    if (!data) {
      return;
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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Interactivity/Events/Parallax.js
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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Interactivity/Events/HoverEvent.js

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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Interactivity/Events/ResizeEvent.js
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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Interactivity/Events/Events.js





class Events {
  constructor() {
    this.onClick = new ClickEvent();
    this.onDiv = new DivEvent();
    this.onHover = new HoverEvent();
    this.resize = new ResizeEvent();
  }
  load(data) {
    if (!data) {
      return;
    }
    this.onClick.load(data.onClick);
    const onDiv = data.onDiv;
    if (onDiv !== undefined) {
      this.onDiv = executeOnSingleOrMultiple(onDiv, t => {
        const tmp = new DivEvent();
        tmp.load(t);
        return tmp;
      });
    }
    this.onHover.load(data.onHover);
    this.resize.load(data.resize);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Interactivity/Modes/Modes.js
class Modes {
  constructor(engine, container) {
    this._engine = engine;
    this._container = container;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (!this._container) {
      return;
    }
    const interactors = this._engine.interactors.get(this._container);
    if (!interactors) {
      return;
    }
    for (const interactor of interactors) {
      if (!interactor.loadModeOptions) {
        continue;
      }
      interactor.loadModeOptions(this, data);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Interactivity/Interactivity.js


class Interactivity {
  constructor(engine, container) {
    this.detectsOn = "window";
    this.events = new Events();
    this.modes = new Modes(engine, container);
  }
  load(data) {
    if (!data) {
      return;
    }
    const detectsOn = data.detectsOn;
    if (detectsOn !== undefined) {
      this.detectsOn = detectsOn;
    }
    this.events.load(data.events);
    this.modes.load(data.modes);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/ManualParticle.js

const defaultPosition = 50;
class ManualParticle {
  load(data) {
    if (!data) {
      return;
    }
    if (data.position) {
      this.position = {
        x: data.position.x ?? defaultPosition,
        y: data.position.y ?? defaultPosition,
        mode: data.position.mode ?? "percent"
      };
    }
    if (data.options) {
      this.options = deepExtend({}, data.options);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Responsive.js

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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Theme/ThemeDefault.js
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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Theme/Theme.js


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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/AnimationOptions.js

class AnimationOptions {
  constructor() {
    this.count = 0;
    this.enable = false;
    this.speed = 1;
    this.decay = 0;
    this.delay = 0;
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
    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }
    if (data.sync !== undefined) {
      this.sync = data.sync;
    }
  }
}
class RangedAnimationOptions extends AnimationOptions {
  constructor() {
    super();
    this.mode = "auto";
    this.startValue = "random";
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
    if (data.startValue !== undefined) {
      this.startValue = data.startValue;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/ColorAnimation.js


class ColorAnimation extends AnimationOptions {
  constructor() {
    super();
    this.offset = 0;
    this.sync = true;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.offset !== undefined) {
      this.offset = setRangeValue(data.offset);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/HslAnimation.js

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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/AnimatableColor.js



class AnimatableColor extends OptionsColor {
  constructor() {
    super();
    this.animation = new HslAnimation();
  }
  static create(source, data) {
    const color = new AnimatableColor();
    color.load(source);
    if (data !== undefined) {
      if (isString(data) || isArray(data)) {
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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Collisions/CollisionsAbsorb.js
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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Collisions/CollisionsOverlap.js
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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/ValueWithRandom.js


class ValueWithRandom {
  constructor() {
    this.value = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.value !== undefined) {
      this.value = setRangeValue(data.value);
    }
  }
}
class AnimationValueWithRandom extends ValueWithRandom {
  constructor() {
    super();
    this.animation = new AnimationOptions();
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    const animation = data.animation;
    if (animation !== undefined) {
      this.animation.load(animation);
    }
  }
}
class RangedAnimationValueWithRandom extends AnimationValueWithRandom {
  constructor() {
    super();
    this.animation = new RangedAnimationOptions();
  }
  load(data) {
    super.load(data);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js

class ParticlesBounceFactor extends ValueWithRandom {
  constructor() {
    super();
    this.value = 1;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Bounce/ParticlesBounce.js

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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Collisions/Collisions.js




class Collisions {
  constructor() {
    this.absorb = new CollisionsAbsorb();
    this.bounce = new ParticlesBounce();
    this.enable = false;
    this.maxSpeed = 50;
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
    if (data.maxSpeed !== undefined) {
      this.maxSpeed = setRangeValue(data.maxSpeed);
    }
    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
    this.overlap.load(data.overlap);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Effect/Effect.js

class Effect {
  constructor() {
    this.close = true;
    this.fill = true;
    this.options = {};
    this.type = [];
  }
  load(data) {
    if (!data) {
      return;
    }
    const options = data.options;
    if (options !== undefined) {
      for (const effect in options) {
        const item = options[effect];
        if (item) {
          this.options[effect] = deepExtend(this.options[effect] ?? {}, item);
        }
      }
    }
    if (data.close !== undefined) {
      this.close = data.close;
    }
    if (data.fill !== undefined) {
      this.fill = data.fill;
    }
    if (data.type !== undefined) {
      this.type = data.type;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Move/MoveAngle.js

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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Move/MoveAttract.js

class MoveAttract {
  constructor() {
    this.distance = 200;
    this.enable = false;
    this.rotate = {
      x: 3000,
      y: 3000
    };
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
    if (data.rotate) {
      const rotateX = data.rotate.x;
      if (rotateX !== undefined) {
        this.rotate.x = rotateX;
      }
      const rotateY = data.rotate.y;
      if (rotateY !== undefined) {
        this.rotate.y = rotateY;
      }
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Move/MoveCenter.js
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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Move/MoveGravity.js

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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Move/Path/MovePath.js


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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Move/MoveTrailFill.js

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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Move/MoveTrail.js

class MoveTrail {
  constructor() {
    this.enable = false;
    this.length = 10;
    this.fill = new MoveTrailFill();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    if (data.fill !== undefined) {
      this.fill.load(data.fill);
    }
    if (data.length !== undefined) {
      this.length = data.length;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Move/OutModes.js
class OutModes {
  constructor() {
    this.default = "out";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.default !== undefined) {
      this.default = data.default;
    }
    this.bottom = data.bottom ?? data.default;
    this.left = data.left ?? data.default;
    this.right = data.right ?? data.default;
    this.top = data.top ?? data.default;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Move/Spin.js


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
    if (data.position) {
      this.position = deepExtend({}, data.position);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Move/Move.js










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
  load(data) {
    if (!data) {
      return;
    }
    this.angle.load(isNumber(data.angle) ? {
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
      this.distance = isNumber(data.distance) ? {
        horizontal: data.distance,
        vertical: data.distance
      } : {
        ...data.distance
      };
    }
    if (data.drift !== undefined) {
      this.drift = setRangeValue(data.drift);
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    this.gravity.load(data.gravity);
    const outModes = data.outModes;
    if (outModes !== undefined) {
      if (isObject(outModes)) {
        this.outModes.load(outModes);
      } else {
        this.outModes.load({
          default: outModes
        });
      }
    }
    this.path.load(data.path);
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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Opacity/OpacityAnimation.js

class OpacityAnimation extends RangedAnimationOptions {
  constructor() {
    super();
    this.destroy = "none";
    this.speed = 2;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.destroy !== undefined) {
      this.destroy = data.destroy;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Opacity/Opacity.js


class Opacity extends RangedAnimationValueWithRandom {
  constructor() {
    super();
    this.animation = new OpacityAnimation();
    this.value = 1;
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    const animation = data.animation;
    if (animation !== undefined) {
      this.animation.load(animation);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesDensity.js
class ParticlesDensity {
  constructor() {
    this.enable = false;
    this.width = 1920;
    this.height = 1080;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.enable !== undefined) {
      this.enable = data.enable;
    }
    const width = data.width;
    if (width !== undefined) {
      this.width = width;
    }
    const height = data.height;
    if (height !== undefined) {
      this.height = height;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesNumberLimit.js
class ParticlesNumberLimit {
  constructor() {
    this.mode = "delete";
    this.value = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.mode !== undefined) {
      this.mode = data.mode;
    }
    if (data.value !== undefined) {
      this.value = data.value;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesNumber.js


class ParticlesNumber {
  constructor() {
    this.density = new ParticlesDensity();
    this.limit = new ParticlesNumberLimit();
    this.value = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    this.density.load(data.density);
    this.limit.load(data.limit);
    if (data.value !== undefined) {
      this.value = data.value;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Shadow.js

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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Shape/Shape.js

class Shape {
  constructor() {
    this.close = true;
    this.fill = true;
    this.options = {};
    this.type = "circle";
  }
  load(data) {
    if (!data) {
      return;
    }
    const options = data.options;
    if (options !== undefined) {
      for (const shape in options) {
        const item = options[shape];
        if (item) {
          this.options[shape] = deepExtend(this.options[shape] ?? {}, item);
        }
      }
    }
    if (data.close !== undefined) {
      this.close = data.close;
    }
    if (data.fill !== undefined) {
      this.fill = data.fill;
    }
    if (data.type !== undefined) {
      this.type = data.type;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Size/SizeAnimation.js

class SizeAnimation extends RangedAnimationOptions {
  constructor() {
    super();
    this.destroy = "none";
    this.speed = 5;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.destroy !== undefined) {
      this.destroy = data.destroy;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Size/Size.js


class Size extends RangedAnimationValueWithRandom {
  constructor() {
    super();
    this.animation = new SizeAnimation();
    this.value = 3;
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    const animation = data.animation;
    if (animation !== undefined) {
      this.animation.load(animation);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/Stroke.js


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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/ZIndex/ZIndex.js

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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Particles/ParticlesOptions.js













class ParticlesOptions {
  constructor(engine, container) {
    this._engine = engine;
    this._container = container;
    this.bounce = new ParticlesBounce();
    this.collisions = new Collisions();
    this.color = new AnimatableColor();
    this.color.value = "#fff";
    this.effect = new Effect();
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
    if (!data) {
      return;
    }
    if (data.groups !== undefined) {
      for (const group of Object.keys(data.groups)) {
        if (!Object.hasOwn(data.groups, group)) {
          continue;
        }
        const item = data.groups[group];
        if (item !== undefined) {
          this.groups[group] = deepExtend(this.groups[group] ?? {}, item);
        }
      }
    }
    if (data.reduceDuplicates !== undefined) {
      this.reduceDuplicates = data.reduceDuplicates;
    }
    this.bounce.load(data.bounce);
    this.color.load(AnimatableColor.create(this.color, data.color));
    this.effect.load(data.effect);
    this.move.load(data.move);
    this.number.load(data.number);
    this.opacity.load(data.opacity);
    this.shape.load(data.shape);
    this.size.load(data.size);
    this.shadow.load(data.shadow);
    this.zIndex.load(data.zIndex);
    this.collisions.load(data.collisions);
    if (data.interactivity !== undefined) {
      this.interactivity = deepExtend({}, data.interactivity);
    }
    const strokeToLoad = data.stroke;
    if (strokeToLoad) {
      this.stroke = executeOnSingleOrMultiple(strokeToLoad, t => {
        const tmp = new Stroke();
        tmp.load(t);
        return tmp;
      });
    }
    if (this._container) {
      const updaters = this._engine.updaters.get(this._container);
      if (updaters) {
        for (const updater of updaters) {
          if (updater.loadOptions) {
            updater.loadOptions(this, data);
          }
        }
      }
      const interactors = this._engine.interactors.get(this._container);
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
;// CONCATENATED MODULE: ../../engine/dist/browser/Utils/OptionsUtils.js

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
;// CONCATENATED MODULE: ../../engine/dist/browser/Options/Classes/Options.js










class Options {
  constructor(engine, container) {
    this._findDefaultTheme = mode => {
      return this.themes.find(theme => theme.default.value && theme.default.mode === mode) ?? this.themes.find(theme => theme.default.value && theme.default.mode === "any");
    };
    this._importPreset = preset => {
      this.load(this._engine.getPreset(preset));
    };
    this._engine = engine;
    this._container = container;
    this.autoPlay = true;
    this.background = new Background();
    this.backgroundMask = new BackgroundMask();
    this.clear = true;
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
  load(data) {
    if (!data) {
      return;
    }
    if (data.preset !== undefined) {
      executeOnSingleOrMultiple(data.preset, preset => this._importPreset(preset));
    }
    if (data.autoPlay !== undefined) {
      this.autoPlay = data.autoPlay;
    }
    if (data.clear !== undefined) {
      this.clear = data.clear;
    }
    if (data.key !== undefined) {
      this.key = data.key;
    }
    if (data.name !== undefined) {
      this.name = data.name;
    }
    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }
    const detectRetina = data.detectRetina;
    if (detectRetina !== undefined) {
      this.detectRetina = detectRetina;
    }
    if (data.duration !== undefined) {
      this.duration = setRangeValue(data.duration);
    }
    const fpsLimit = data.fpsLimit;
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
    const fullScreen = data.fullScreen;
    if (isBoolean(fullScreen)) {
      this.fullScreen.enable = fullScreen;
    } else {
      this.fullScreen.load(fullScreen);
    }
    this.backgroundMask.load(data.backgroundMask);
    this.interactivity.load(data.interactivity);
    if (data.manualParticles) {
      this.manualParticles = data.manualParticles.map(t => {
        const tmp = new ManualParticle();
        tmp.load(t);
        return tmp;
      });
    }
    this.particles.load(data.particles);
    this.style = deepExtend(this.style, data.style);
    this._engine.loadOptions(this, data);
    if (data.smooth !== undefined) {
      this.smooth = data.smooth;
    }
    const interactors = this._engine.interactors.get(this._container);
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
    this.defaultThemes.dark = this._findDefaultTheme("dark")?.name;
    this.defaultThemes.light = this._findDefaultTheme("light")?.name;
  }
  setResponsive(width, pxRatio, defaultOptions) {
    this.load(defaultOptions);
    const responsiveOptions = this.responsive.find(t => t.mode === "screen" && screen ? t.maxWidth > screen.availWidth : t.maxWidth * pxRatio > width);
    this.load(responsiveOptions?.options);
    return responsiveOptions?.maxWidth;
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
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Utils/InteractionManager.js
class InteractionManager {
  constructor(engine, container) {
    this.container = container;
    this._engine = engine;
    this._interactors = engine.getInteractors(this.container, true);
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
      interactor.handleClickMode?.(mode);
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
  reset(particle) {
    for (const interactor of this._externalInteractors) {
      if (interactor.isEnabled()) {
        interactor.reset(particle);
      }
    }
    for (const interactor of this._particleInteractors) {
      if (interactor.isEnabled(particle)) {
        interactor.reset(particle);
      }
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Particle.js









const defaultRetryCount = 0,
  Particle_double = 2,
  half = 0.5,
  Particle_squareExp = 2;
function loadEffectData(effect, effectOptions, id, reduceDuplicates) {
  const effectData = effectOptions.options[effect];
  if (!effectData) {
    return;
  }
  return deepExtend({
    close: effectOptions.close,
    fill: effectOptions.fill
  }, itemFromSingleOrMultiple(effectData, id, reduceDuplicates));
}
function loadShapeData(shape, shapeOptions, id, reduceDuplicates) {
  const shapeData = shapeOptions.options[shape];
  if (!shapeData) {
    return;
  }
  return deepExtend({
    close: shapeOptions.close,
    fill: shapeOptions.fill
  }, itemFromSingleOrMultiple(shapeData, id, reduceDuplicates));
}
function fixOutMode(data) {
  if (!isInArray(data.outMode, data.checkModes)) {
    return;
  }
  const diameter = data.radius * Particle_double;
  if (data.coord > data.maxCoord - diameter) {
    data.setCb(-data.radius);
  } else if (data.coord < diameter) {
    data.setCb(data.radius);
  }
}
class Particle {
  constructor(engine, id, container, position, overrideOptions, group) {
    this.container = container;
    this._calcPosition = (container, position, zIndex, tryCount = defaultRetryCount) => {
      for (const [, plugin] of container.plugins) {
        const pluginPos = plugin.particlePosition !== undefined ? plugin.particlePosition(position, this) : undefined;
        if (pluginPos) {
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
      fixHorizontal(outModes.left ?? outModes.default);
      fixHorizontal(outModes.right ?? outModes.default);
      fixVertical(outModes.top ?? outModes.default);
      fixVertical(outModes.bottom ?? outModes.default);
      if (this._checkOverlap(pos, tryCount)) {
        const increment = 1;
        return this._calcPosition(container, undefined, zIndex, tryCount + increment);
      }
      return pos;
    };
    this._calculateVelocity = () => {
      const baseVelocity = getParticleBaseVelocity(this.direction),
        res = baseVelocity.copy(),
        moveOptions = this.options.move;
      if (moveOptions.direction === "inside" || moveOptions.direction === "outside") {
        return res;
      }
      const rad = degToRad(getRangeValue(moveOptions.angle.value)),
        radOffset = degToRad(getRangeValue(moveOptions.angle.offset)),
        range = {
          left: radOffset - rad * half,
          right: radOffset + rad * half
        };
      if (!moveOptions.straight) {
        res.angle += randomInRange(setRangeValue(range.left, range.right));
      }
      if (moveOptions.random && typeof moveOptions.speed === "number") {
        res.length *= getRandom();
      }
      return res;
    };
    this._checkOverlap = (pos, tryCount = defaultRetryCount) => {
      const collisionsOptions = this.options.collisions,
        radius = this.getRadius();
      if (!collisionsOptions.enable) {
        return false;
      }
      const overlapOptions = collisionsOptions.overlap;
      if (overlapOptions.enable) {
        return false;
      }
      const retries = overlapOptions.retries,
        minRetries = 0;
      if (retries >= minRetries && tryCount > retries) {
        throw new Error(`${errorPrefix} particle is overlapping and can't be placed`);
      }
      return !!this.container.particles.find(particle => getDistance(pos, particle.position) < radius + particle.getRadius());
    };
    this._getRollColor = color => {
      if (!color || !this.roll || !this.backColor && !this.roll.alter) {
        return color;
      }
      const rollFactor = 1,
        none = 0,
        backFactor = this.roll.horizontal && this.roll.vertical ? Particle_double * rollFactor : rollFactor,
        backSum = this.roll.horizontal ? Math.PI * half : none,
        rolled = Math.floor(((this.roll.angle ?? none) + backSum) / (Math.PI / backFactor)) % Particle_double;
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
    };
    this._initPosition = position => {
      const container = this.container,
        zIndexValue = getRangeValue(this.options.zIndex.value),
        minZ = 0;
      this.position = this._calcPosition(container, position, clamp(zIndexValue, minZ, container.zLayers));
      this.initialPosition = this.position.copy();
      const canvasSize = container.canvas.size,
        defaultRadius = 0;
      this.moveCenter = {
        ...getPosition(this.options.move.center, canvasSize),
        radius: this.options.move.center.radius ?? defaultRadius,
        mode: this.options.move.center.mode ?? "percent"
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
      this.offset = Vector.origin;
    };
    this._engine = engine;
    this.init(id, position, overrideOptions, group);
  }
  destroy(override) {
    if (this.unbreakable || this.destroyed) {
      return;
    }
    this.destroyed = true;
    this.bubble.inRange = false;
    this.slow.inRange = false;
    const container = this.container,
      pathGenerator = this.pathGenerator,
      shapeDrawer = container.shapeDrawers.get(this.shape);
    shapeDrawer?.particleDestroy?.(this);
    for (const [, plugin] of container.plugins) {
      plugin.particleDestroyed?.(this, override);
    }
    for (const updater of container.particles.updaters) {
      updater.particleDestroyed?.(this, override);
    }
    pathGenerator?.reset(this);
    this._engine.dispatchEvent("particleDestroyed", {
      container: this.container,
      data: {
        particle: this
      }
    });
  }
  draw(delta) {
    const container = this.container,
      canvas = container.canvas;
    for (const [, plugin] of container.plugins) {
      canvas.drawParticlePlugin(plugin, this, delta);
    }
    canvas.drawParticle(this, delta);
  }
  getFillColor() {
    return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.color));
  }
  getMass() {
    return this.getRadius() ** Particle_squareExp * Math.PI * half;
  }
  getPosition() {
    return {
      x: this.position.x + this.offset.x,
      y: this.position.y + this.offset.y,
      z: this.position.z
    };
  }
  getRadius() {
    return this.bubble.radius ?? this.size.value;
  }
  getStrokeColor() {
    return this._getRollColor(this.bubble.color ?? getHslFromAnimation(this.strokeColor));
  }
  init(id, position, overrideOptions, group) {
    const container = this.container,
      engine = this._engine;
    this.id = id;
    this.group = group;
    this.effectClose = true;
    this.effectFill = true;
    this.shapeClose = true;
    this.shapeFill = true;
    this.pathRotation = false;
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
      effectType = particlesOptions.effect.type,
      shapeType = particlesOptions.shape.type,
      {
        reduceDuplicates
      } = particlesOptions;
    this.effect = itemFromSingleOrMultiple(effectType, this.id, reduceDuplicates);
    this.shape = itemFromSingleOrMultiple(shapeType, this.id, reduceDuplicates);
    const effectOptions = particlesOptions.effect,
      shapeOptions = particlesOptions.shape;
    if (overrideOptions) {
      if (overrideOptions.effect?.type) {
        const overrideEffectType = overrideOptions.effect.type,
          effect = itemFromSingleOrMultiple(overrideEffectType, this.id, reduceDuplicates);
        if (effect) {
          this.effect = effect;
          effectOptions.load(overrideOptions.effect);
        }
      }
      if (overrideOptions.shape?.type) {
        const overrideShapeType = overrideOptions.shape.type,
          shape = itemFromSingleOrMultiple(overrideShapeType, this.id, reduceDuplicates);
        if (shape) {
          this.shape = shape;
          shapeOptions.load(overrideOptions.shape);
        }
      }
    }
    this.effectData = loadEffectData(this.effect, effectOptions, this.id, reduceDuplicates);
    this.shapeData = loadShapeData(this.shape, shapeOptions, this.id, reduceDuplicates);
    particlesOptions.load(overrideOptions);
    const effectData = this.effectData;
    if (effectData) {
      particlesOptions.load(effectData.particles);
    }
    const shapeData = this.shapeData;
    if (shapeData) {
      particlesOptions.load(shapeData.particles);
    }
    const interactivity = new Interactivity(engine, container);
    interactivity.load(container.actualOptions.interactivity);
    interactivity.load(particlesOptions.interactivity);
    this.interactivity = interactivity;
    this.effectFill = effectData?.fill ?? particlesOptions.effect.fill;
    this.effectClose = effectData?.close ?? particlesOptions.effect.close;
    this.shapeFill = shapeData?.fill ?? particlesOptions.shape.fill;
    this.shapeClose = shapeData?.close ?? particlesOptions.shape.close;
    this.options = particlesOptions;
    const pathOptions = this.options.move.path;
    this.pathDelay = getRangeValue(pathOptions.delay.value) * millisecondsToSeconds;
    if (pathOptions.generator) {
      this.pathGenerator = this._engine.getPathGenerator(pathOptions.generator);
      if (this.pathGenerator && container.addPath(pathOptions.generator, this.pathGenerator)) {
        this.pathGenerator.init(container);
      }
    }
    container.retina.initParticle(this);
    this.size = initParticleNumericAnimationValue(this.options.size, pxRatio);
    this.bubble = {
      inRange: false
    };
    this.slow = {
      inRange: false,
      factor: 1
    };
    this._initPosition(position);
    this.initialVelocity = this._calculateVelocity();
    this.velocity = this.initialVelocity.copy();
    const decayOffset = 1;
    this.moveDecay = decayOffset - getRangeValue(this.options.move.decay);
    const particles = container.particles;
    particles.setLastZIndex(this.position.z);
    this.zIndexFactor = this.position.z / container.zLayers;
    this.sides = 24;
    let effectDrawer = container.effectDrawers.get(this.effect);
    if (!effectDrawer) {
      effectDrawer = this._engine.getEffectDrawer(this.effect);
      if (effectDrawer) {
        container.effectDrawers.set(this.effect, effectDrawer);
      }
    }
    if (effectDrawer?.loadEffect) {
      effectDrawer.loadEffect(this);
    }
    let shapeDrawer = container.shapeDrawers.get(this.shape);
    if (!shapeDrawer) {
      shapeDrawer = this._engine.getShapeDrawer(this.shape);
      if (shapeDrawer) {
        container.shapeDrawers.set(this.shape, shapeDrawer);
      }
    }
    if (shapeDrawer?.loadShape) {
      shapeDrawer.loadShape(this);
    }
    const sideCountFunc = shapeDrawer?.getSidesCount;
    if (sideCountFunc) {
      this.sides = sideCountFunc(this);
    }
    this.spawning = false;
    this.shadowColor = rangeColorToRgb(this.options.shadow.color);
    for (const updater of particles.updaters) {
      updater.init(this);
    }
    for (const mover of particles.movers) {
      mover.init?.(this);
    }
    effectDrawer?.particleInit?.(container, this);
    shapeDrawer?.particleInit?.(container, this);
    for (const [, plugin] of container.plugins) {
      plugin.particleCreated?.(this);
    }
  }
  isInsideCanvas() {
    const radius = this.getRadius(),
      canvasSize = this.container.canvas.size,
      position = this.position;
    return position.x >= -radius && position.y >= -radius && position.y <= canvasSize.height + radius && position.x <= canvasSize.width + radius;
  }
  isVisible() {
    return !this.destroyed && !this.spawning && this.isInsideCanvas();
  }
  reset() {
    for (const updater of this.container.particles.updaters) {
      updater.reset?.(this);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Utils/Point.js
class Point {
  constructor(position, particle) {
    this.position = position;
    this.particle = particle;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Utils/Range.js
class Range {
  constructor(x, y) {
    this.position = {
      x: x,
      y: y
    };
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Utils/Rectangle.js


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
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Utils/Circle.js



const Circle_squareExp = 2;
class Circle extends Range {
  constructor(x, y, radius) {
    super(x, y);
    this.radius = radius;
  }
  contains(point) {
    return getDistance(point, this.position) <= this.radius;
  }
  intersects(range) {
    const pos1 = this.position,
      pos2 = range.position,
      distPos = {
        x: Math.abs(pos2.x - pos1.x),
        y: Math.abs(pos2.y - pos1.y)
      },
      r = this.radius;
    if (range instanceof Circle) {
      const rSum = r + range.radius,
        dist = Math.sqrt(distPos.x ** Circle_squareExp + distPos.y ** Circle_squareExp);
      return rSum > dist;
    } else if (range instanceof Rectangle) {
      const {
          width,
          height
        } = range.size,
        edges = Math.pow(distPos.x - width, Circle_squareExp) + Math.pow(distPos.y - height, Circle_squareExp);
      return edges <= r ** Circle_squareExp || distPos.x <= r + width && distPos.y <= r + height || distPos.x <= width || distPos.y <= height;
    }
    return false;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Utils/QuadTree.js



const QuadTree_half = 0.5,
  QuadTree_double = 2,
  subdivideCount = 4;
class QuadTree {
  constructor(rectangle, capacity) {
    this.rectangle = rectangle;
    this.capacity = capacity;
    this._subdivide = () => {
      const {
          x,
          y
        } = this.rectangle.position,
        {
          width,
          height
        } = this.rectangle.size,
        {
          capacity
        } = this;
      for (let i = 0; i < subdivideCount; i++) {
        const fixedIndex = i % QuadTree_double;
        this._subs.push(new QuadTree(new Rectangle(x + width * QuadTree_half * fixedIndex, y + height * QuadTree_half * (Math.round(i * QuadTree_half) - fixedIndex), width * QuadTree_half, height * QuadTree_half), capacity));
      }
      this._divided = true;
    };
    this._points = [];
    this._divided = false;
    this._subs = [];
  }
  insert(point) {
    if (!this.rectangle.contains(point.position)) {
      return false;
    }
    if (this._points.length < this.capacity) {
      this._points.push(point);
      return true;
    }
    if (!this._divided) {
      this._subdivide();
    }
    return this._subs.some(sub => sub.insert(point));
  }
  query(range, check, found) {
    const res = found ?? [];
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
      for (const sub of this._subs) {
        sub.query(range, check, res);
      }
    }
    return res;
  }
  queryCircle(position, radius, check) {
    return this.query(new Circle(position.x, position.y, radius), check);
  }
  queryRectangle(position, size, check) {
    return this.query(new Rectangle(position.x, position.y, size.width, size.height), check);
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Particles.js







const qTreeCapacity = 4,
  Particles_squareExp = 2,
  defaultRemoveQuantity = 1;
const qTreeRectangle = canvasSize => {
  const {
      height,
      width
    } = canvasSize,
    posOffset = -0.25,
    sizeFactor = 1.5;
  return new Rectangle(posOffset * width, posOffset * height, sizeFactor * width, sizeFactor * height);
};
class Particles {
  constructor(engine, container) {
    this._addToPool = (...particles) => {
      for (const particle of particles) {
        this._pool.push(particle);
      }
    };
    this._applyDensity = (options, manualCount, group) => {
      const numberOptions = options.number;
      if (!options.number.density?.enable) {
        if (group === undefined) {
          this._limit = numberOptions.limit.value;
        } else if (numberOptions.limit) {
          this._groupLimits.set(group, numberOptions.limit.value);
        }
        return;
      }
      const densityFactor = this._initDensityFactor(numberOptions.density),
        optParticlesNumber = numberOptions.value,
        minLimit = 0,
        optParticlesLimit = numberOptions.limit.value > minLimit ? numberOptions.limit.value : optParticlesNumber,
        particlesNumber = Math.min(optParticlesNumber, optParticlesLimit) * densityFactor + manualCount,
        particlesCount = Math.min(this.count, this.filter(t => t.group === group).length);
      if (group === undefined) {
        this._limit = numberOptions.limit.value * densityFactor;
      } else {
        this._groupLimits.set(group, numberOptions.limit.value * densityFactor);
      }
      if (particlesCount < particlesNumber) {
        this.push(Math.abs(particlesNumber - particlesCount), undefined, options, group);
      } else if (particlesCount > particlesNumber) {
        this.removeQuantity(particlesCount - particlesNumber, group);
      }
    };
    this._initDensityFactor = densityOptions => {
      const container = this._container,
        defaultFactor = 1;
      if (!container.canvas.element || !densityOptions.enable) {
        return defaultFactor;
      }
      const canvas = container.canvas.element,
        pxRatio = container.retina.pixelRatio;
      return canvas.width * canvas.height / (densityOptions.height * densityOptions.width * pxRatio ** Particles_squareExp);
    };
    this._pushParticle = (position, overrideOptions, group, initializer) => {
      try {
        let particle = this._pool.pop();
        if (particle) {
          particle.init(this._nextId, position, overrideOptions, group);
        } else {
          particle = new Particle(this._engine, this._nextId, this._container, position, overrideOptions, group);
        }
        let canAdd = true;
        if (initializer) {
          canAdd = initializer(particle);
        }
        if (!canAdd) {
          return;
        }
        this._array.push(particle);
        this._zArray.push(particle);
        this._nextId++;
        this._engine.dispatchEvent("particleAdded", {
          container: this._container,
          data: {
            particle
          }
        });
        return particle;
      } catch (e) {
        getLogger().warning(`${errorPrefix} adding particle: ${e}`);
      }
    };
    this._removeParticle = (index, group, override) => {
      const particle = this._array[index];
      if (!particle || particle.group !== group) {
        return false;
      }
      const zIdx = this._zArray.indexOf(particle),
        deleteCount = 1;
      this._array.splice(index, deleteCount);
      this._zArray.splice(zIdx, deleteCount);
      particle.destroy(override);
      this._engine.dispatchEvent("particleRemoved", {
        container: this._container,
        data: {
          particle
        }
      });
      this._addToPool(particle);
      return true;
    };
    this._engine = engine;
    this._container = container;
    this._nextId = 0;
    this._array = [];
    this._zArray = [];
    this._pool = [];
    this._limit = 0;
    this._groupLimits = new Map();
    this._needsSort = false;
    this._lastZIndex = 0;
    this._interactionManager = new InteractionManager(engine, container);
    const canvasSize = container.canvas.size;
    this.quadTree = new QuadTree(qTreeRectangle(canvasSize), qTreeCapacity);
    this.movers = this._engine.getMovers(container, true);
    this.updaters = this._engine.getUpdaters(container, true);
  }
  get count() {
    return this._array.length;
  }
  addManualParticles() {
    const container = this._container,
      options = container.actualOptions;
    for (const particle of options.manualParticles) {
      this.addParticle(particle.position ? getPosition(particle.position, container.canvas.size) : undefined, particle.options);
    }
  }
  addParticle(position, overrideOptions, group, initializer) {
    const limitOptions = this._container.actualOptions.particles.number.limit,
      limit = group === undefined ? this._limit : this._groupLimits.get(group) ?? this._limit,
      currentCount = this.count,
      minLimit = 0;
    if (limit > minLimit) {
      if (limitOptions.mode === "delete") {
        const countOffset = 1,
          minCount = 0,
          countToRemove = currentCount + countOffset - limit;
        if (countToRemove > minCount) {
          this.removeQuantity(countToRemove);
        }
      } else if (limitOptions.mode === "wait") {
        if (currentCount >= limit) {
          return;
        }
      }
    }
    return this._pushParticle(position, overrideOptions, group, initializer);
  }
  clear() {
    this._array = [];
    this._zArray = [];
  }
  destroy() {
    this._array = [];
    this._zArray = [];
    this.movers = [];
    this.updaters = [];
  }
  async draw(delta) {
    const container = this._container,
      canvas = container.canvas;
    canvas.clear();
    await this.update(delta);
    for (const [, plugin] of container.plugins) {
      canvas.drawPlugin(plugin, delta);
    }
    for (const p of this._zArray) {
      p.draw(delta);
    }
  }
  filter(condition) {
    return this._array.filter(condition);
  }
  find(condition) {
    return this._array.find(condition);
  }
  get(index) {
    return this._array[index];
  }
  handleClickMode(mode) {
    this._interactionManager.handleClickMode(mode);
  }
  init() {
    const container = this._container,
      options = container.actualOptions;
    this._lastZIndex = 0;
    this._needsSort = false;
    let handled = false;
    this.updaters = this._engine.getUpdaters(container, true);
    this._interactionManager.init();
    for (const [, plugin] of container.plugins) {
      if (plugin.particlesInitialization !== undefined) {
        handled = plugin.particlesInitialization();
      }
      if (handled) {
        break;
      }
    }
    this._interactionManager.init();
    for (const [, pathGenerator] of container.pathGenerators) {
      pathGenerator.init(container);
    }
    this.addManualParticles();
    if (!handled) {
      const particlesOptions = options.particles,
        groups = particlesOptions.groups;
      for (const group in groups) {
        const groupOptions = groups[group];
        for (let i = this.count, j = 0; j < groupOptions.number?.value && i < particlesOptions.number.value; i++, j++) {
          this.addParticle(undefined, groupOptions, group);
        }
      }
      for (let i = this.count; i < particlesOptions.number.value; i++) {
        this.addParticle();
      }
    }
  }
  push(nb, mouse, overrideOptions, group) {
    for (let i = 0; i < nb; i++) {
      this.addParticle(mouse?.position, overrideOptions, group);
    }
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
    this.removeAt(this._array.indexOf(particle), undefined, group, override);
  }
  removeAt(index, quantity = defaultRemoveQuantity, group, override) {
    const minIndex = 0;
    if (index < minIndex || index > this.count) {
      return;
    }
    let deleted = 0;
    for (let i = index; deleted < quantity && i < this.count; i++) {
      if (this._removeParticle(i--, group, override)) {
        deleted++;
      }
    }
  }
  removeQuantity(quantity, group) {
    const defaultIndex = 0;
    this.removeAt(defaultIndex, quantity, group);
  }
  setDensity() {
    const options = this._container.actualOptions,
      groups = options.particles.groups,
      manualCount = 0;
    for (const group in groups) {
      this._applyDensity(groups[group], manualCount, group);
    }
    this._applyDensity(options.particles, options.manualParticles.length);
  }
  setLastZIndex(zIndex) {
    this._lastZIndex = zIndex;
    this._needsSort = this._needsSort || this._lastZIndex < zIndex;
  }
  setResizeFactor(factor) {
    this._resizeFactor = factor;
  }
  async update(delta) {
    const container = this._container,
      particlesToDelete = new Set();
    this.quadTree = new QuadTree(qTreeRectangle(container.canvas.size), qTreeCapacity);
    for (const [, pathGenerator] of container.pathGenerators) {
      pathGenerator.update();
    }
    for (const [, plugin] of container.plugins) {
      await plugin.update?.(delta);
    }
    const resizeFactor = this._resizeFactor;
    for (const particle of this._array) {
      if (resizeFactor && !particle.ignoresResizeRatio) {
        particle.position.x *= resizeFactor.width;
        particle.position.y *= resizeFactor.height;
        particle.initialPosition.x *= resizeFactor.width;
        particle.initialPosition.y *= resizeFactor.height;
      }
      particle.ignoresResizeRatio = false;
      this._interactionManager.reset(particle);
      for (const [, plugin] of this._container.plugins) {
        if (particle.destroyed) {
          break;
        }
        plugin.particleUpdate?.(particle, delta);
      }
      for (const mover of this.movers) {
        if (mover.isEnabled(particle)) {
          mover.move(particle, delta);
        }
      }
      if (particle.destroyed) {
        particlesToDelete.add(particle);
        continue;
      }
      this.quadTree.insert(new Point(particle.getPosition(), particle));
    }
    if (particlesToDelete.size) {
      const checkDelete = p => !particlesToDelete.has(p);
      this._array = this.filter(checkDelete);
      this._zArray = this._zArray.filter(checkDelete);
      for (const particle of particlesToDelete) {
        this._engine.dispatchEvent("particleRemoved", {
          container: this._container,
          data: {
            particle
          }
        });
      }
      this._addToPool(...particlesToDelete);
    }
    await this._interactionManager.externalInteract(delta);
    for (const particle of this._array) {
      for (const updater of this.updaters) {
        updater.update(particle, delta);
      }
      if (!particle.destroyed && !particle.spawning) {
        await this._interactionManager.particlesInteract(particle, delta);
      }
    }
    delete this._resizeFactor;
    if (this._needsSort) {
      const zArray = this._zArray;
      zArray.sort((a, b) => b.position.z - a.position.z || a.id - b.id);
      const lengthOffset = 1;
      this._lastZIndex = zArray[zArray.length - lengthOffset].position.z;
      this._needsSort = false;
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Retina.js


const defaultRatio = 1,
  defaultReduceFactor = 1;
class Retina {
  constructor(container) {
    this.container = container;
    this.pixelRatio = defaultRatio;
    this.reduceFactor = defaultReduceFactor;
  }
  init() {
    const container = this.container,
      options = container.actualOptions;
    this.pixelRatio = !options.detectRetina || isSsr() ? defaultRatio : window.devicePixelRatio;
    this.reduceFactor = defaultReduceFactor;
    const ratio = this.pixelRatio,
      canvas = container.canvas;
    if (canvas.element) {
      const element = canvas.element;
      canvas.size.width = element.offsetWidth * ratio;
      canvas.size.height = element.offsetHeight * ratio;
    }
    const particles = options.particles,
      moveOptions = particles.move;
    this.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
    this.sizeAnimationSpeed = getRangeValue(particles.size.animation.speed) * ratio;
  }
  initParticle(particle) {
    const options = particle.options,
      ratio = this.pixelRatio,
      moveOptions = options.move,
      moveDistance = moveOptions.distance,
      props = particle.retina;
    props.moveDrift = getRangeValue(moveOptions.drift) * ratio;
    props.moveSpeed = getRangeValue(moveOptions.speed) * ratio;
    props.sizeAnimationSpeed = getRangeValue(options.size.animation.speed) * ratio;
    const maxDistance = props.maxDistance;
    maxDistance.horizontal = moveDistance.horizontal !== undefined ? moveDistance.horizontal * ratio : undefined;
    maxDistance.vertical = moveDistance.vertical !== undefined ? moveDistance.vertical * ratio : undefined;
    props.maxSpeed = getRangeValue(moveOptions.gravity.maxSpeed) * ratio;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Container.js









function guardCheck(container) {
  return container && !container.destroyed;
}
const defaultFps = 60;
function initDelta(value, fpsLimit = defaultFps, smooth = false) {
  return {
    value,
    factor: smooth ? defaultFps / fpsLimit : defaultFps * value / millisecondsToSeconds
  };
}
function loadContainerOptions(engine, container, ...sourceOptionsArr) {
  const options = new Options(engine, container);
  loadOptions(options, ...sourceOptionsArr);
  return options;
}
class Container {
  constructor(engine, id, sourceOptions) {
    this._intersectionManager = entries => {
      if (!guardCheck(this) || !this.actualOptions.pauseOnOutsideViewport) {
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
    };
    this._nextFrame = async timestamp => {
      try {
        if (!this._smooth && this._lastFrameTime !== undefined && timestamp < this._lastFrameTime + millisecondsToSeconds / this.fpsLimit) {
          this.draw(false);
          return;
        }
        this._lastFrameTime ??= timestamp;
        const delta = initDelta(timestamp - this._lastFrameTime, this.fpsLimit, this._smooth);
        this.addLifeTime(delta.value);
        this._lastFrameTime = timestamp;
        if (delta.value > millisecondsToSeconds) {
          this.draw(false);
          return;
        }
        await this.particles.draw(delta);
        if (!this.alive()) {
          this.destroy();
          return;
        }
        if (this.getAnimationStatus()) {
          this.draw(false);
        }
      } catch (e) {
        getLogger().error(`${errorPrefix} in animation loop`, e);
      }
    };
    this._engine = engine;
    this.id = Symbol(id);
    this.fpsLimit = 120;
    this._smooth = false;
    this._delay = 0;
    this._duration = 0;
    this._lifeTime = 0;
    this._firstStart = true;
    this.started = false;
    this.destroyed = false;
    this._paused = true;
    this._lastFrameTime = 0;
    this.zLayers = 100;
    this.pageHidden = false;
    this._sourceOptions = sourceOptions;
    this._initialSourceOptions = sourceOptions;
    this.retina = new Retina(this);
    this.canvas = new Canvas(this);
    this.particles = new Particles(this._engine, this);
    this.pathGenerators = new Map();
    this.interactivity = {
      mouse: {
        clicking: false,
        inside: false
      }
    };
    this.plugins = new Map();
    this.effectDrawers = new Map();
    this.shapeDrawers = new Map();
    this._options = loadContainerOptions(this._engine, this);
    this.actualOptions = loadContainerOptions(this._engine, this);
    this._eventListeners = new EventListeners(this);
    this._intersectionObserver = safeIntersectionObserver(entries => this._intersectionManager(entries));
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
        },
        radius = 1;
      clickOrTouchHandler(e, pos, radius);
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
        const lengthOffset = 1;
        let lastTouch = touchEvent.touches[touchEvent.touches.length - lengthOffset];
        if (!lastTouch) {
          lastTouch = touchEvent.changedTouches[touchEvent.changedTouches.length - lengthOffset];
          if (!lastTouch) {
            return;
          }
        }
        const element = this.canvas.element,
          canvasRect = element ? element.getBoundingClientRect() : undefined,
          minCoordinate = 0,
          pos = {
            x: lastTouch.clientX - (canvasRect ? canvasRect.left : minCoordinate),
            y: lastTouch.clientY - (canvasRect ? canvasRect.top : minCoordinate)
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
  addLifeTime(value) {
    this._lifeTime += value;
  }
  addPath(key, generator, override = false) {
    if (!guardCheck(this) || !override && this.pathGenerators.has(key)) {
      return false;
    }
    this.pathGenerators.set(key, generator);
    return true;
  }
  alive() {
    return !this._duration || this._lifeTime <= this._duration;
  }
  destroy() {
    if (!guardCheck(this)) {
      return;
    }
    this.stop();
    this.particles.destroy();
    this.canvas.destroy();
    for (const [, effectDrawer] of this.effectDrawers) {
      effectDrawer.destroy?.(this);
    }
    for (const [, shapeDrawer] of this.shapeDrawers) {
      shapeDrawer.destroy?.(this);
    }
    for (const key of this.effectDrawers.keys()) {
      this.effectDrawers.delete(key);
    }
    for (const key of this.shapeDrawers.keys()) {
      this.shapeDrawers.delete(key);
    }
    this._engine.clearPlugins(this);
    this.destroyed = true;
    const mainArr = this._engine.dom(),
      idx = mainArr.findIndex(t => t === this),
      minIndex = 0;
    if (idx >= minIndex) {
      const deleteCount = 1;
      mainArr.splice(idx, deleteCount);
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
    const frame = async timestamp => {
      if (refreshTime) {
        this._lastFrameTime = undefined;
        refreshTime = false;
      }
      await this._nextFrame(timestamp);
    };
    this._drawAnimationFrame = requestAnimationFrame(timestamp => void frame(timestamp));
  }
  async export(type, options = {}) {
    for (const [, plugin] of this.plugins) {
      if (!plugin.export) {
        continue;
      }
      const res = await plugin.export(type, options);
      if (!res.supported) {
        continue;
      }
      return res.blob;
    }
    getLogger().error(`${errorPrefix} - Export plugin with type ${type} not found`);
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
      plugin.handleClickMode?.(mode);
    }
  }
  async init() {
    if (!guardCheck(this)) {
      return;
    }
    const effects = this._engine.getSupportedEffects();
    for (const type of effects) {
      const drawer = this._engine.getEffectDrawer(type);
      if (drawer) {
        this.effectDrawers.set(type, drawer);
      }
    }
    const shapes = this._engine.getSupportedShapes();
    for (const type of shapes) {
      const drawer = this._engine.getShapeDrawer(type);
      if (drawer) {
        this.shapeDrawers.set(type, drawer);
      }
    }
    this._options = loadContainerOptions(this._engine, this, this._initialSourceOptions, this.sourceOptions);
    this.actualOptions = loadContainerOptions(this._engine, this, this._options);
    const availablePlugins = this._engine.getAvailablePlugins(this);
    for (const [id, plugin] of availablePlugins) {
      this.plugins.set(id, plugin);
    }
    this.retina.init();
    await this.canvas.init();
    this.updateActualOptions();
    this.canvas.initBackground();
    this.canvas.resize();
    this.zLayers = this.actualOptions.zLayers;
    this._duration = getRangeValue(this.actualOptions.duration) * millisecondsToSeconds;
    this._delay = getRangeValue(this.actualOptions.delay) * millisecondsToSeconds;
    this._lifeTime = 0;
    const defaultFpsLimit = 120,
      minFpsLimit = 0;
    this.fpsLimit = this.actualOptions.fpsLimit > minFpsLimit ? this.actualOptions.fpsLimit : defaultFpsLimit;
    this._smooth = this.actualOptions.smooth;
    for (const [, drawer] of this.effectDrawers) {
      await drawer.init?.(this);
    }
    for (const [, drawer] of this.shapeDrawers) {
      await drawer.init?.(this);
    }
    for (const [, plugin] of this.plugins) {
      await plugin.init?.();
    }
    this._engine.dispatchEvent("containerInit", {
      container: this
    });
    this.particles.init();
    this.particles.setDensity();
    for (const [, plugin] of this.plugins) {
      plugin.particlesSetup?.();
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
      cancelAnimationFrame(this._drawAnimationFrame);
      delete this._drawAnimationFrame;
    }
    if (this._paused) {
      return;
    }
    for (const [, plugin] of this.plugins) {
      plugin.pause?.();
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
    this.draw(needsUpdate ?? false);
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
    this._initialSourceOptions = undefined;
    this._options = loadContainerOptions(this._engine, this);
    this.actualOptions = loadContainerOptions(this._engine, this, this._options);
    return this.refresh();
  }
  async start() {
    if (!guardCheck(this) || this.started) {
      return;
    }
    await this.init();
    this.started = true;
    await new Promise(resolve => {
      const start = async () => {
        this._eventListeners.addListeners();
        if (this.interactivity.element instanceof HTMLElement && this._intersectionObserver) {
          this._intersectionObserver.observe(this.interactivity.element);
        }
        for (const [, plugin] of this.plugins) {
          await plugin.start?.();
        }
        this._engine.dispatchEvent("containerStarted", {
          container: this
        });
        this.play();
        resolve();
      };
      this._delayTimeout = setTimeout(() => void start(), this._delay);
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
      plugin.stop?.();
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
    if (this._responsiveMaxWidth === newMaxWidth) {
      return false;
    }
    this._responsiveMaxWidth = newMaxWidth;
    return true;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Utils/EventDispatcher.js
class EventDispatcher {
  constructor() {
    this._listeners = new Map();
  }
  addEventListener(type, listener) {
    this.removeEventListener(type, listener);
    let arr = this._listeners.get(type);
    if (!arr) {
      arr = [];
      this._listeners.set(type, arr);
    }
    arr.push(listener);
  }
  dispatchEvent(type, args) {
    const listeners = this._listeners.get(type);
    listeners?.forEach(handler => handler(args));
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
      idx = arr.indexOf(listener),
      minIndex = 0;
    if (idx < minIndex) {
      return;
    }
    const deleteCount = 1;
    if (length === deleteCount) {
      this._listeners.delete(type);
    } else {
      arr.splice(idx, deleteCount);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Engine.js





function getItemsFromInitializer(container, map, initializers, force = false) {
  let res = map.get(container);
  if (!res || force) {
    res = [...initializers.values()].map(t => t(container));
    map.set(container, res);
  }
  return res;
}
async function getDataFromUrl(data) {
  const url = itemFromSingleOrMultiple(data.url, data.index);
  if (!url) {
    return data.fallback;
  }
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  getLogger().error(`${errorPrefix} ${response.status} while retrieving config file`);
  return data.fallback;
}
class Engine {
  constructor() {
    this._configs = new Map();
    this._domArray = [];
    this._eventDispatcher = new EventDispatcher();
    this._initialized = false;
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
    this.effectDrawers = new Map();
    this.shapeDrawers = new Map();
    this.pathGenerators = new Map();
  }
  get configs() {
    const res = {};
    for (const [name, config] of this._configs) {
      res[name] = config;
    }
    return res;
  }
  get version() {
    return "3.1.0";
  }
  addConfig(config) {
    const key = config.key ?? config.name ?? "default";
    this._configs.set(key, config);
    this._eventDispatcher.dispatchEvent("configAdded", {
      data: {
        name: key,
        config
      }
    });
  }
  async addEffect(effect, drawer, refresh = true) {
    executeOnSingleOrMultiple(effect, type => {
      if (!this.getEffectDrawer(type)) {
        this.effectDrawers.set(type, drawer);
      }
    });
    await this.refresh(refresh);
  }
  addEventListener(type, listener) {
    this._eventDispatcher.addEventListener(type, listener);
  }
  async addInteractor(name, interactorInitializer, refresh = true) {
    this._initializers.interactors.set(name, interactorInitializer);
    await this.refresh(refresh);
  }
  async addMover(name, moverInitializer, refresh = true) {
    this._initializers.movers.set(name, moverInitializer);
    await this.refresh(refresh);
  }
  async addParticleUpdater(name, updaterInitializer, refresh = true) {
    this._initializers.updaters.set(name, updaterInitializer);
    await this.refresh(refresh);
  }
  async addPathGenerator(name, generator, refresh = true) {
    if (!this.getPathGenerator(name)) {
      this.pathGenerators.set(name, generator);
    }
    await this.refresh(refresh);
  }
  async addPlugin(plugin, refresh = true) {
    if (!this.getPlugin(plugin.id)) {
      this.plugins.push(plugin);
    }
    await this.refresh(refresh);
  }
  async addPreset(preset, options, override = false, refresh = true) {
    if (override || !this.getPreset(preset)) {
      this.presets.set(preset, options);
    }
    await this.refresh(refresh);
  }
  async addShape(shape, drawer, refresh = true) {
    executeOnSingleOrMultiple(shape, type => {
      if (!this.getShapeDrawer(type)) {
        this.shapeDrawers.set(type, drawer);
      }
    });
    await this.refresh(refresh);
  }
  clearPlugins(container) {
    this.updaters.delete(container);
    this.movers.delete(container);
    this.interactors.delete(container);
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
    if (!item || item.destroyed) {
      const deleteCount = 1;
      dom.splice(index, deleteCount);
      return;
    }
    return item;
  }
  getAvailablePlugins(container) {
    const res = new Map();
    for (const plugin of this.plugins) {
      if (plugin.needsPlugin(container.actualOptions)) {
        res.set(plugin.id, plugin.getPlugin(container));
      }
    }
    return res;
  }
  getEffectDrawer(type) {
    return this.effectDrawers.get(type);
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
    return this.shapeDrawers.get(type);
  }
  getSupportedEffects() {
    return this.effectDrawers.keys();
  }
  getSupportedShapes() {
    return this.shapeDrawers.keys();
  }
  getUpdaters(container, force = false) {
    return getItemsFromInitializer(container, this.updaters, this._initializers.updaters, force);
  }
  init() {
    if (this._initialized) {
      return;
    }
    this._initialized = true;
  }
  async load(params) {
    const randomFactor = 10000,
      id = params.id ?? params.element?.id ?? `tsparticles${Math.floor(getRandom() * randomFactor)}`,
      {
        index,
        url
      } = params,
      options = url ? await getDataFromUrl({
        fallback: params.options,
        url,
        index
      }) : params.options;
    let domContainer = params.element ?? document.getElementById(id);
    if (!domContainer) {
      domContainer = document.createElement("div");
      domContainer.id = id;
      document.body.append(domContainer);
    }
    const currentOptions = itemFromSingleOrMultiple(options, index),
      dom = this.dom(),
      oldIndex = dom.findIndex(v => v.id.description === id),
      minIndex = 0;
    if (oldIndex >= minIndex) {
      const old = this.domItem(oldIndex);
      if (old && !old.destroyed) {
        old.destroy();
        const deleteCount = 1;
        dom.splice(oldIndex, deleteCount);
      }
    }
    let canvasEl;
    if (domContainer.tagName.toLowerCase() === "canvas") {
      canvasEl = domContainer;
      canvasEl.dataset[generatedAttribute] = "false";
    } else {
      const existingCanvases = domContainer.getElementsByTagName("canvas");
      if (existingCanvases.length) {
        const firstIndex = 0;
        canvasEl = existingCanvases[firstIndex];
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
    const newItem = new Container(this, id, currentOptions);
    if (oldIndex >= minIndex) {
      const deleteCount = 0;
      dom.splice(oldIndex, deleteCount, newItem);
    } else {
      dom.push(newItem);
    }
    newItem.canvas.loadCanvas(canvasEl);
    await newItem.start();
    return newItem;
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
      updater.loadOptions?.(options, ...sourceOptions);
    }
  }
  async refresh(refresh = true) {
    if (!refresh) {
      return;
    }
    await Promise.allSettled(this.dom().map(t => t.refresh()));
  }
  removeEventListener(type, listener) {
    this._eventDispatcher.removeEventListener(type, listener);
  }
  setOnClickHandler(callback) {
    const dom = this.dom();
    if (!dom.length) {
      throw new Error(`${errorPrefix} can only set click handlers after calling tsParticles.load()`);
    }
    for (const domItem of dom) {
      domItem.addClickHandler(callback);
    }
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Utils/HslColorManager.js


class HslColorManager {
  constructor() {
    this.key = "hsl";
    this.stringPrefix = "hsl";
  }
  handleColor(color) {
    const colorValue = color.value,
      hslColor = colorValue.hsl ?? color.value;
    if (hslColor.h !== undefined && hslColor.s !== undefined && hslColor.l !== undefined) {
      return hslToRgb(hslColor);
    }
  }
  handleRangeColor(color) {
    const colorValue = color.value,
      hslColor = colorValue.hsl ?? color.value;
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
      result = regex.exec(input),
      minLength = 4,
      defaultAlpha = 1,
      radix = 10;
    return result ? hslaToRgba({
      a: result.length > minLength ? parseAlpha(result[5]) : defaultAlpha,
      h: parseInt(result[1], radix),
      l: parseInt(result[3], radix),
      s: parseInt(result[2], radix)
    }) : undefined;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Utils/RgbColorManager.js

class RgbColorManager {
  constructor() {
    this.key = "rgb";
    this.stringPrefix = "rgb";
  }
  handleColor(color) {
    const colorValue = color.value,
      rgbColor = colorValue.rgb ?? color.value;
    if (rgbColor.r !== undefined) {
      return rgbColor;
    }
  }
  handleRangeColor(color) {
    const colorValue = color.value,
      rgbColor = colorValue.rgb ?? color.value;
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
      result = regex.exec(input),
      radix = 10,
      minLength = 4,
      defaultAlpha = 1;
    return result ? {
      a: result.length > minLength ? parseAlpha(result[5]) : defaultAlpha,
      b: parseInt(result[3], radix),
      g: parseInt(result[2], radix),
      r: parseInt(result[1], radix)
    } : undefined;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/init.js




function init() {
  const rgbColorManager = new RgbColorManager(),
    hslColorManager = new HslColorManager();
  addColorManager(rgbColorManager);
  addColorManager(hslColorManager);
  const engine = new Engine();
  engine.init();
  return engine;
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Utils/ExternalInteractorBase.js
class ExternalInteractorBase {
  constructor(container) {
    this.type = "external";
    this.container = container;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/Core/Utils/ParticlesInteractorBase.js
class ParticlesInteractorBase {
  constructor(container) {
    this.type = "particles";
    this.container = container;
  }
}
;// CONCATENATED MODULE: ../../engine/dist/browser/exports.js
























































































;// CONCATENATED MODULE: ../../engine/dist/browser/index.js


const tsParticles = init();
if (!isSsr()) {
  window.tsParticles = tsParticles;
}



;// CONCATENATED MODULE: ../../plugins/absorbers/dist/browser/Options/Classes/AbsorberSizeLimit.js
class AbsorberSizeLimit {
  constructor() {
    this.radius = 0;
    this.mass = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.mass !== undefined) {
      this.mass = data.mass;
    }
    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/absorbers/dist/browser/Options/Classes/AbsorberSize.js


class AbsorberSize extends ValueWithRandom {
  constructor() {
    super();
    this.density = 5;
    this.value = 50;
    this.limit = new AbsorberSizeLimit();
  }
  load(data) {
    if (!data) {
      return;
    }
    super.load(data);
    if (data.density !== undefined) {
      this.density = data.density;
    }
    if (isNumber(data.limit)) {
      this.limit.radius = data.limit;
    } else {
      this.limit.load(data.limit);
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/absorbers/dist/browser/Options/Classes/Absorber.js


class Absorber {
  constructor() {
    this.color = new OptionsColor();
    this.color.value = "#000000";
    this.draggable = false;
    this.opacity = 1;
    this.destroy = true;
    this.orbits = false;
    this.size = new AbsorberSize();
  }
  load(data) {
    if (data === undefined) {
      return;
    }
    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.draggable !== undefined) {
      this.draggable = data.draggable;
    }
    this.name = data.name;
    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
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
    if (data.size !== undefined) {
      this.size.load(data.size);
    }
    if (data.destroy !== undefined) {
      this.destroy = data.destroy;
    }
    if (data.orbits !== undefined) {
      this.orbits = data.orbits;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/absorbers/dist/browser/AbsorberInstance.js


const AbsorberInstance_squareExp = 2,
  absorbFactor = 0.033,
  minOrbitLength = 0,
  minRadius = 0,
  minMass = 0,
  AbsorberInstance_origin = {
    x: 0,
    y: 0
  },
  minAngle = 0,
  AbsorberInstance_double = 2,
  maxAngle = Math.PI * AbsorberInstance_double,
  minVelocity = 0;
class AbsorberInstance {
  constructor(absorbers, container, options, position) {
    this.absorbers = absorbers;
    this.container = container;
    this._calcPosition = () => {
      const exactPosition = calcPositionOrRandomFromSizeRanged({
        size: this.container.canvas.size,
        position: this.options.position
      });
      return Vector.create(exactPosition.x, exactPosition.y);
    };
    this._updateParticlePosition = (particle, v) => {
      if (particle.destroyed) {
        return;
      }
      const container = this.container,
        canvasSize = container.canvas.size;
      if (particle.needsNewPosition) {
        const newPosition = calcPositionOrRandomFromSize({
          size: canvasSize
        });
        particle.position.setTo(newPosition);
        particle.velocity.setTo(particle.initialVelocity);
        particle.absorberOrbit = undefined;
        particle.needsNewPosition = false;
      }
      if (this.options.orbits) {
        if (particle.absorberOrbit === undefined) {
          particle.absorberOrbit = Vector.origin;
          particle.absorberOrbit.length = getDistance(particle.getPosition(), this.position);
          particle.absorberOrbit.angle = getRandom() * maxAngle;
        }
        if (particle.absorberOrbit.length <= this.size && !this.options.destroy) {
          const minSize = Math.min(canvasSize.width, canvasSize.height),
            offset = 1,
            randomOffset = 0.1,
            randomFactor = 0.2;
          particle.absorberOrbit.length = minSize * (offset + (getRandom() * randomFactor - randomOffset));
        }
        if (particle.absorberOrbitDirection === undefined) {
          particle.absorberOrbitDirection = particle.velocity.x >= minVelocity ? "clockwise" : "counter-clockwise";
        }
        const orbitRadius = particle.absorberOrbit.length,
          orbitAngle = particle.absorberOrbit.angle,
          orbitDirection = particle.absorberOrbitDirection;
        particle.velocity.setTo(Vector.origin);
        const updateFunc = {
          x: orbitDirection === "clockwise" ? Math.cos : Math.sin,
          y: orbitDirection === "clockwise" ? Math.sin : Math.cos
        };
        particle.position.x = this.position.x + orbitRadius * updateFunc.x(orbitAngle);
        particle.position.y = this.position.y + orbitRadius * updateFunc.y(orbitAngle);
        particle.absorberOrbit.length -= v.length;
        particle.absorberOrbit.angle += (particle.retina.moveSpeed ?? minVelocity) * container.retina.pixelRatio / percentDenominator * container.retina.reduceFactor;
      } else {
        const addV = Vector.origin;
        addV.length = v.length;
        addV.angle = v.angle;
        particle.velocity.addTo(addV);
      }
    };
    this.initialPosition = position ? Vector.create(position.x, position.y) : undefined;
    if (options instanceof Absorber) {
      this.options = options;
    } else {
      this.options = new Absorber();
      this.options.load(options);
    }
    this.dragging = false;
    this.name = this.options.name;
    this.opacity = this.options.opacity;
    this.size = getRangeValue(this.options.size.value) * container.retina.pixelRatio;
    this.mass = this.size * this.options.size.density * container.retina.reduceFactor;
    const limit = this.options.size.limit;
    this.limit = {
      radius: limit.radius * container.retina.pixelRatio * container.retina.reduceFactor,
      mass: limit.mass
    };
    this.color = rangeColorToRgb(this.options.color) ?? {
      b: 0,
      g: 0,
      r: 0
    };
    this.position = this.initialPosition?.copy() ?? this._calcPosition();
  }
  attract(particle) {
    const container = this.container,
      options = this.options;
    if (options.draggable) {
      const mouse = container.interactivity.mouse;
      if (mouse.clicking && mouse.downPosition) {
        const mouseDist = getDistance(this.position, mouse.downPosition);
        if (mouseDist <= this.size) {
          this.dragging = true;
        }
      } else {
        this.dragging = false;
      }
      if (this.dragging && mouse.position) {
        this.position.x = mouse.position.x;
        this.position.y = mouse.position.y;
      }
    }
    const pos = particle.getPosition(),
      {
        dx,
        dy,
        distance
      } = getDistances(this.position, pos),
      v = Vector.create(dx, dy);
    v.length = this.mass / Math.pow(distance, AbsorberInstance_squareExp) * container.retina.reduceFactor;
    if (distance < this.size + particle.getRadius()) {
      const sizeFactor = particle.getRadius() * absorbFactor * container.retina.pixelRatio;
      if (this.size > particle.getRadius() && distance < this.size - particle.getRadius() || particle.absorberOrbit !== undefined && particle.absorberOrbit.length < minOrbitLength) {
        if (options.destroy) {
          particle.destroy();
        } else {
          particle.needsNewPosition = true;
          this._updateParticlePosition(particle, v);
        }
      } else {
        if (options.destroy) {
          particle.size.value -= sizeFactor;
        }
        this._updateParticlePosition(particle, v);
      }
      if (this.limit.radius <= minRadius || this.size < this.limit.radius) {
        this.size += sizeFactor;
      }
      if (this.limit.mass <= minMass || this.mass < this.limit.mass) {
        this.mass += sizeFactor * this.options.size.density * container.retina.reduceFactor;
      }
    } else {
      this._updateParticlePosition(particle, v);
    }
  }
  draw(context) {
    context.translate(this.position.x, this.position.y);
    context.beginPath();
    context.arc(AbsorberInstance_origin.x, AbsorberInstance_origin.y, this.size, minAngle, maxAngle, false);
    context.closePath();
    context.fillStyle = getStyleFromRgb(this.color, this.opacity);
    context.fill();
  }
  resize() {
    const initialPosition = this.initialPosition;
    this.position = initialPosition && isPointInside(initialPosition, this.container.canvas.size, Vector.origin) ? initialPosition : this._calcPosition();
  }
}
;// CONCATENATED MODULE: ../../plugins/absorbers/dist/browser/Absorbers.js


const defaultIndex = 0;
class Absorbers {
  constructor(container) {
    this.container = container;
    this.array = [];
    this.absorbers = [];
    this.interactivityAbsorbers = [];
    container.getAbsorber = idxOrName => idxOrName === undefined || isNumber(idxOrName) ? this.array[idxOrName ?? defaultIndex] : this.array.find(t => t.name === idxOrName);
    container.addAbsorber = (options, position) => this.addAbsorber(options, position);
  }
  addAbsorber(options, position) {
    const absorber = new AbsorberInstance(this, this.container, options, position);
    this.array.push(absorber);
    return absorber;
  }
  draw(context) {
    for (const absorber of this.array) {
      absorber.draw(context);
    }
  }
  handleClickMode(mode) {
    const absorberOptions = this.absorbers,
      modeAbsorbers = this.interactivityAbsorbers;
    if (mode === "absorber") {
      const absorbersModeOptions = itemFromSingleOrMultiple(modeAbsorbers),
        absorbersOptions = absorbersModeOptions ?? itemFromSingleOrMultiple(absorberOptions),
        aPosition = this.container.interactivity.mouse.clickPosition;
      this.addAbsorber(absorbersOptions, aPosition);
    }
  }
  async init() {
    this.absorbers = this.container.actualOptions.absorbers;
    this.interactivityAbsorbers = this.container.actualOptions.interactivity.modes.absorbers;
    executeOnSingleOrMultiple(this.absorbers, absorber => {
      this.addAbsorber(absorber);
    });
    await Promise.resolve();
  }
  particleUpdate(particle) {
    for (const absorber of this.array) {
      absorber.attract(particle);
      if (particle.destroyed) {
        break;
      }
    }
  }
  removeAbsorber(absorber) {
    const index = this.array.indexOf(absorber),
      deleteCount = 1;
    if (index >= defaultIndex) {
      this.array.splice(index, deleteCount);
    }
  }
  resize() {
    for (const absorber of this.array) {
      absorber.resize();
    }
  }
  stop() {
    this.array = [];
  }
}
;// CONCATENATED MODULE: ../../plugins/absorbers/dist/browser/index.js



class AbsorbersPlugin {
  constructor() {
    this.id = "absorbers";
  }
  getPlugin(container) {
    return new Absorbers(container);
  }
  loadOptions(options, source) {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }
    if (source?.absorbers) {
      options.absorbers = executeOnSingleOrMultiple(source.absorbers, absorber => {
        const tmp = new Absorber();
        tmp.load(absorber);
        return tmp;
      });
    }
    options.interactivity.modes.absorbers = executeOnSingleOrMultiple(source?.interactivity?.modes?.absorbers, absorber => {
      const tmp = new Absorber();
      tmp.load(absorber);
      return tmp;
    });
  }
  needsPlugin(options) {
    if (!options) {
      return false;
    }
    const absorbers = options.absorbers;
    if (isArray(absorbers)) {
      return !!absorbers.length;
    } else if (absorbers) {
      return true;
    } else if (options.interactivity?.events?.onClick?.mode && isInArray("absorber", options.interactivity.events.onClick.mode)) {
      return true;
    }
    return false;
  }
}
async function loadAbsorbersPlugin(engine, refresh = true) {
  await engine.addPlugin(new AbsorbersPlugin(), refresh);
}


;// CONCATENATED MODULE: ../../updaters/destroy/dist/browser/Options/Classes/DestroyBounds.js

class DestroyBounds {
  load(data) {
    if (!data) {
      return;
    }
    if (data.bottom !== undefined) {
      this.bottom = setRangeValue(data.bottom);
    }
    if (data.left !== undefined) {
      this.left = setRangeValue(data.left);
    }
    if (data.right !== undefined) {
      this.right = setRangeValue(data.right);
    }
    if (data.top !== undefined) {
      this.top = setRangeValue(data.top);
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/destroy/dist/browser/Options/Classes/SplitFactor.js

class SplitFactor extends ValueWithRandom {
  constructor() {
    super();
    this.value = 3;
  }
}
;// CONCATENATED MODULE: ../../updaters/destroy/dist/browser/Options/Classes/SplitRate.js

class SplitRate extends ValueWithRandom {
  constructor() {
    super();
    this.value = {
      min: 4,
      max: 9
    };
  }
}
;// CONCATENATED MODULE: ../../updaters/destroy/dist/browser/Options/Classes/Split.js



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
    if (data.color !== undefined) {
      this.color = OptionsColor.create(this.color, data.color);
    }
    if (data.count !== undefined) {
      this.count = data.count;
    }
    this.factor.load(data.factor);
    this.rate.load(data.rate);
    this.particles = executeOnSingleOrMultiple(data.particles, particles => {
      return deepExtend({}, particles);
    });
    if (data.sizeOffset !== undefined) {
      this.sizeOffset = data.sizeOffset;
    }
    if (data.colorOffset) {
      this.colorOffset = this.colorOffset ?? {};
      if (data.colorOffset.h !== undefined) {
        this.colorOffset.h = data.colorOffset.h;
      }
      if (data.colorOffset.s !== undefined) {
        this.colorOffset.s = data.colorOffset.s;
      }
      if (data.colorOffset.l !== undefined) {
        this.colorOffset.l = data.colorOffset.l;
      }
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/destroy/dist/browser/Options/Classes/Destroy.js


class Destroy {
  constructor() {
    this.bounds = new DestroyBounds();
    this.mode = "none";
    this.split = new Split();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.mode) {
      this.mode = data.mode;
    }
    if (data.bounds) {
      this.bounds.load(data.bounds);
    }
    this.split.load(data.split);
  }
}
;// CONCATENATED MODULE: ../../updaters/destroy/dist/browser/Utils.js

const defaultOffset = 0,
  minDestroySize = 0.5,
  defaultSplitCount = 0,
  increment = 1,
  unbreakableTime = 500,
  minSplitCount = 0;
function addSplitParticle(engine, container, parent, splitParticlesOptions) {
  const destroyOptions = parent.options.destroy;
  if (!destroyOptions) {
    return;
  }
  const splitOptions = destroyOptions.split,
    options = loadParticlesOptions(engine, container, parent.options),
    factor = getRangeValue(splitOptions.factor.value),
    parentColor = parent.getFillColor();
  if (splitOptions.color) {
    options.color.load(splitOptions.color);
  } else if (splitOptions.colorOffset && parentColor) {
    options.color.load({
      value: {
        hsl: {
          h: parentColor.h + getRangeValue(splitOptions.colorOffset.h ?? defaultOffset),
          s: parentColor.s + getRangeValue(splitOptions.colorOffset.s ?? defaultOffset),
          l: parentColor.l + getRangeValue(splitOptions.colorOffset.l ?? defaultOffset)
        }
      }
    });
  } else {
    options.color.load({
      value: {
        hsl: parent.getFillColor()
      }
    });
  }
  options.move.load({
    center: {
      x: parent.position.x,
      y: parent.position.y,
      mode: "precise"
    }
  });
  if (isNumber(options.size.value)) {
    options.size.value /= factor;
  } else {
    options.size.value.min /= factor;
    options.size.value.max /= factor;
  }
  options.load(splitParticlesOptions);
  const offset = splitOptions.sizeOffset ? setRangeValue(-parent.size.value, parent.size.value) : defaultOffset,
    position = {
      x: parent.position.x + randomInRange(offset),
      y: parent.position.y + randomInRange(offset)
    };
  return container.particles.addParticle(position, options, parent.group, particle => {
    if (particle.size.value < minDestroySize) {
      return false;
    }
    particle.velocity.length = randomInRange(setRangeValue(parent.velocity.length, particle.velocity.length));
    particle.splitCount = (parent.splitCount ?? defaultSplitCount) + increment;
    particle.unbreakable = true;
    setTimeout(() => {
      particle.unbreakable = false;
    }, unbreakableTime);
    return true;
  });
}
function split(engine, container, particle) {
  const destroyOptions = particle.options.destroy;
  if (!destroyOptions) {
    return;
  }
  const splitOptions = destroyOptions.split;
  if (splitOptions.count >= minSplitCount && (particle.splitCount === undefined || particle.splitCount++ > splitOptions.count)) {
    return;
  }
  const rate = getRangeValue(splitOptions.rate.value),
    particlesSplitOptions = itemFromSingleOrMultiple(splitOptions.particles);
  for (let i = 0; i < rate; i++) {
    addSplitParticle(engine, container, particle, particlesSplitOptions);
  }
}
;// CONCATENATED MODULE: ../../updaters/destroy/dist/browser/DestroyUpdater.js



class DestroyUpdater {
  constructor(engine, container) {
    this.container = container;
    this.engine = engine;
  }
  init(particle) {
    const container = this.container,
      particlesOptions = particle.options,
      destroyOptions = particlesOptions.destroy;
    if (!destroyOptions) {
      return;
    }
    particle.splitCount = 0;
    const destroyBoundsOptions = destroyOptions.bounds;
    if (!particle.destroyBounds) {
      particle.destroyBounds = {};
    }
    const {
        bottom,
        left,
        right,
        top
      } = destroyBoundsOptions,
      {
        destroyBounds
      } = particle,
      canvasSize = container.canvas.size;
    if (bottom) {
      destroyBounds.bottom = getRangeValue(bottom) * canvasSize.height / percentDenominator;
    }
    if (left) {
      destroyBounds.left = getRangeValue(left) * canvasSize.width / percentDenominator;
    }
    if (right) {
      destroyBounds.right = getRangeValue(right) * canvasSize.width / percentDenominator;
    }
    if (top) {
      destroyBounds.top = getRangeValue(top) * canvasSize.height / percentDenominator;
    }
  }
  isEnabled(particle) {
    return !particle.destroyed;
  }
  loadOptions(options, ...sources) {
    if (!options.destroy) {
      options.destroy = new Destroy();
    }
    for (const source of sources) {
      options.destroy.load(source?.destroy);
    }
  }
  particleDestroyed(particle, override) {
    if (override) {
      return;
    }
    const destroyOptions = particle.options.destroy;
    if (destroyOptions && destroyOptions.mode === "split") {
      split(this.engine, this.container, particle);
    }
  }
  update(particle) {
    if (!this.isEnabled(particle)) {
      return;
    }
    const position = particle.getPosition(),
      bounds = particle.destroyBounds;
    if (!bounds) {
      return;
    }
    if (bounds.bottom !== undefined && position.y >= bounds.bottom || bounds.left !== undefined && position.x <= bounds.left || bounds.right !== undefined && position.x >= bounds.right || bounds.top !== undefined && position.y <= bounds.top) {
      particle.destroy();
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/destroy/dist/browser/index.js

async function loadDestroyUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("destroy", container => new DestroyUpdater(engine, container), refresh);
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/browser/Options/Classes/EmitterLife.js

class EmitterLife {
  constructor() {
    this.wait = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.count !== undefined) {
      this.count = data.count;
    }
    if (data.delay !== undefined) {
      this.delay = setRangeValue(data.delay);
    }
    if (data.duration !== undefined) {
      this.duration = setRangeValue(data.duration);
    }
    if (data.wait !== undefined) {
      this.wait = data.wait;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/browser/Options/Classes/EmitterRate.js

class EmitterRate {
  constructor() {
    this.quantity = 1;
    this.delay = 0.1;
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
;// CONCATENATED MODULE: ../../plugins/emitters/dist/browser/Options/Classes/EmitterShapeReplace.js
class EmitterShapeReplace {
  constructor() {
    this.color = false;
    this.opacity = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.color !== undefined) {
      this.color = data.color;
    }
    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/browser/Options/Classes/EmitterShape.js


class EmitterShape {
  constructor() {
    this.options = {};
    this.replace = new EmitterShapeReplace();
    this.type = "square";
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.options !== undefined) {
      this.options = deepExtend({}, data.options ?? {});
    }
    this.replace.load(data.replace);
    if (data.type !== undefined) {
      this.type = data.type;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/browser/Options/Classes/EmitterSize.js
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
;// CONCATENATED MODULE: ../../plugins/emitters/dist/browser/Options/Classes/Emitter.js





class Emitter {
  constructor() {
    this.autoPlay = true;
    this.fill = true;
    this.life = new EmitterLife();
    this.rate = new EmitterRate();
    this.shape = new EmitterShape();
    this.startCount = 0;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.autoPlay !== undefined) {
      this.autoPlay = data.autoPlay;
    }
    if (data.size !== undefined) {
      if (!this.size) {
        this.size = new EmitterSize();
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
    this.particles = executeOnSingleOrMultiple(data.particles, particles => {
      return deepExtend({}, particles);
    });
    this.rate.load(data.rate);
    this.shape.load(data.shape);
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
        this.spawnColor = new AnimatableColor();
      }
      this.spawnColor.load(data.spawnColor);
    }
    if (data.startCount !== undefined) {
      this.startCount = data.startCount;
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/browser/EmitterInstance.js



const EmitterInstance_half = 0.5,
  defaultLifeDelay = 0,
  minLifeCount = 0,
  defaultSpawnDelay = 0,
  defaultEmitDelay = 0,
  defaultLifeCount = -1;
function setParticlesOptionsColor(particlesOptions, color) {
  if (particlesOptions.color) {
    particlesOptions.color.value = color;
  } else {
    particlesOptions.color = {
      value: color
    };
  }
}
class EmitterInstance {
  constructor(engine, emitters, container, options, position) {
    this.emitters = emitters;
    this.container = container;
    this._destroy = () => {
      this._mutationObserver?.disconnect();
      this._mutationObserver = undefined;
      this._resizeObserver?.disconnect();
      this._resizeObserver = undefined;
      this.emitters.removeEmitter(this);
      this._engine.dispatchEvent("emitterDestroyed", {
        container: this.container,
        data: {
          emitter: this
        }
      });
    };
    this._prepareToDie = () => {
      if (this._paused) {
        return;
      }
      const duration = this.options.life?.duration !== undefined ? getRangeValue(this.options.life.duration) : undefined,
        minDuration = 0,
        minLifeCount = 0;
      if (this.container.retina.reduceFactor && (this._lifeCount > minLifeCount || this._immortal) && duration !== undefined && duration > minDuration) {
        this._duration = duration * millisecondsToSeconds;
      }
    };
    this._setColorAnimation = (animation, initValue, maxValue) => {
      const container = this.container;
      if (!animation.enable) {
        return initValue;
      }
      const colorOffset = randomInRange(animation.offset),
        delay = getRangeValue(this.options.rate.delay),
        emitFactor = delay * millisecondsToSeconds / container.retina.reduceFactor,
        defaultColorSpeed = 0,
        colorFactor = 3.6,
        colorSpeed = getRangeValue(animation.speed ?? defaultColorSpeed);
      return (initValue + colorSpeed * container.fpsLimit / emitFactor + colorOffset * colorFactor) % maxValue;
    };
    this._engine = engine;
    this._currentDuration = 0;
    this._currentEmitDelay = 0;
    this._currentSpawnDelay = 0;
    this._initialPosition = position;
    if (options instanceof Emitter) {
      this.options = options;
    } else {
      this.options = new Emitter();
      this.options.load(options);
    }
    this._spawnDelay = getRangeValue(this.options.life.delay ?? defaultLifeDelay) * millisecondsToSeconds / this.container.retina.reduceFactor;
    this.position = this._initialPosition ?? this._calcPosition();
    this.name = this.options.name;
    this.fill = this.options.fill;
    this._firstSpawn = !this.options.life.wait;
    this._startParticlesAdded = false;
    let particlesOptions = deepExtend({}, this.options.particles);
    particlesOptions ??= {};
    particlesOptions.move ??= {};
    particlesOptions.move.direction ??= this.options.direction;
    if (this.options.spawnColor) {
      this.spawnColor = rangeColorToHsl(this.options.spawnColor);
    }
    this._paused = !this.options.autoPlay;
    this._particlesOptions = particlesOptions;
    this._size = this._calcSize();
    this.size = getSize(this._size, this.container.canvas.size);
    this._lifeCount = this.options.life.count ?? defaultLifeCount;
    this._immortal = this._lifeCount <= minLifeCount;
    if (this.options.domId) {
      const element = document.getElementById(this.options.domId);
      if (element) {
        this._mutationObserver = new MutationObserver(() => {
          this.resize();
        });
        this._resizeObserver = new ResizeObserver(() => {
          this.resize();
        });
        this._mutationObserver.observe(element, {
          attributes: true,
          attributeFilter: ["style", "width", "height"]
        });
        this._resizeObserver.observe(element);
      }
    }
    const shapeOptions = this.options.shape,
      shapeGenerator = this._engine.emitterShapeManager?.getShapeGenerator(shapeOptions.type);
    if (shapeGenerator) {
      this._shape = shapeGenerator.generate(this.position, this.size, this.fill, shapeOptions.options);
    }
    this._engine.dispatchEvent("emitterCreated", {
      container,
      data: {
        emitter: this
      }
    });
    this.play();
  }
  externalPause() {
    this._paused = true;
    this.pause();
  }
  externalPlay() {
    this._paused = false;
    this.play();
  }
  async init() {
    await this._shape?.init();
  }
  pause() {
    if (this._paused) {
      return;
    }
    delete this._emitDelay;
  }
  play() {
    if (this._paused) {
      return;
    }
    if (!(this.container.retina.reduceFactor && (this._lifeCount > minLifeCount || this._immortal || !this.options.life.count) && (this._firstSpawn || this._currentSpawnDelay >= (this._spawnDelay ?? defaultSpawnDelay)))) {
      return;
    }
    if (this._emitDelay === undefined) {
      const delay = getRangeValue(this.options.rate.delay);
      this._emitDelay = delay * millisecondsToSeconds / this.container.retina.reduceFactor;
    }
    if (this._lifeCount > minLifeCount || this._immortal) {
      this._prepareToDie();
    }
  }
  resize() {
    const initialPosition = this._initialPosition;
    this.position = initialPosition && isPointInside(initialPosition, this.container.canvas.size, Vector.origin) ? initialPosition : this._calcPosition();
    this._size = this._calcSize();
    this.size = getSize(this._size, this.container.canvas.size);
    this._shape?.resize(this.position, this.size);
  }
  async update(delta) {
    if (this._paused) {
      return;
    }
    if (this._firstSpawn) {
      this._firstSpawn = false;
      this._currentSpawnDelay = this._spawnDelay ?? defaultSpawnDelay;
      this._currentEmitDelay = this._emitDelay ?? defaultEmitDelay;
    }
    if (!this._startParticlesAdded) {
      this._startParticlesAdded = true;
      await this._emitParticles(this.options.startCount);
    }
    if (this._duration !== undefined) {
      this._currentDuration += delta.value;
      if (this._currentDuration >= this._duration) {
        this.pause();
        if (this._spawnDelay !== undefined) {
          delete this._spawnDelay;
        }
        if (!this._immortal) {
          this._lifeCount--;
        }
        if (this._lifeCount > minLifeCount || this._immortal) {
          this.position = this._calcPosition();
          this._shape?.resize(this.position, this.size);
          this._spawnDelay = getRangeValue(this.options.life.delay ?? defaultLifeDelay) * millisecondsToSeconds / this.container.retina.reduceFactor;
        } else {
          this._destroy();
        }
        this._currentDuration -= this._duration;
        delete this._duration;
      }
    }
    if (this._spawnDelay !== undefined) {
      this._currentSpawnDelay += delta.value;
      if (this._currentSpawnDelay >= this._spawnDelay) {
        this._engine.dispatchEvent("emitterPlay", {
          container: this.container
        });
        this.play();
        this._currentSpawnDelay -= this._currentSpawnDelay;
        delete this._spawnDelay;
      }
    }
    if (this._emitDelay !== undefined) {
      this._currentEmitDelay += delta.value;
      if (this._currentEmitDelay >= this._emitDelay) {
        await this._emit();
        this._currentEmitDelay -= this._emitDelay;
      }
    }
  }
  _calcPosition() {
    if (this.options.domId) {
      const container = this.container,
        element = document.getElementById(this.options.domId);
      if (element) {
        const elRect = element.getBoundingClientRect(),
          pxRatio = container.retina.pixelRatio;
        return {
          x: (elRect.x + elRect.width * EmitterInstance_half) * pxRatio,
          y: (elRect.y + elRect.height * EmitterInstance_half) * pxRatio
        };
      }
    }
    return calcPositionOrRandomFromSizeRanged({
      size: this.container.canvas.size,
      position: this.options.position
    });
  }
  _calcSize() {
    const container = this.container;
    if (this.options.domId) {
      const element = document.getElementById(this.options.domId);
      if (element) {
        const elRect = element.getBoundingClientRect();
        return {
          width: elRect.width * container.retina.pixelRatio,
          height: elRect.height * container.retina.pixelRatio,
          mode: "precise"
        };
      }
    }
    return this.options.size ?? (() => {
      const size = new EmitterSize();
      size.load({
        height: 0,
        mode: "percent",
        width: 0
      });
      return size;
    })();
  }
  async _emit() {
    if (this._paused) {
      return;
    }
    const quantity = getRangeValue(this.options.rate.quantity);
    await this._emitParticles(quantity);
  }
  async _emitParticles(quantity) {
    const singleParticlesOptions = itemFromSingleOrMultiple(this._particlesOptions);
    for (let i = 0; i < quantity; i++) {
      const particlesOptions = deepExtend({}, singleParticlesOptions);
      if (this.spawnColor) {
        const hslAnimation = this.options.spawnColor?.animation;
        if (hslAnimation) {
          const maxValues = {
            h: 360,
            s: 100,
            l: 100
          };
          this.spawnColor.h = this._setColorAnimation(hslAnimation.h, this.spawnColor.h, maxValues.h);
          this.spawnColor.s = this._setColorAnimation(hslAnimation.s, this.spawnColor.s, maxValues.s);
          this.spawnColor.l = this._setColorAnimation(hslAnimation.l, this.spawnColor.l, maxValues.l);
        }
        setParticlesOptionsColor(particlesOptions, this.spawnColor);
      }
      const shapeOptions = this.options.shape;
      let position = this.position;
      if (this._shape) {
        const shapePosData = await this._shape.randomPosition();
        if (shapePosData) {
          position = shapePosData.position;
          const replaceData = shapeOptions.replace;
          if (replaceData.color && shapePosData.color) {
            setParticlesOptionsColor(particlesOptions, shapePosData.color);
          }
          if (replaceData.opacity) {
            if (particlesOptions.opacity) {
              particlesOptions.opacity.value = shapePosData.opacity;
            } else {
              particlesOptions.opacity = {
                value: shapePosData.opacity
              };
            }
          }
        } else {
          position = null;
        }
      }
      if (position) {
        this.container.particles.addParticle(position, particlesOptions);
      }
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/browser/Emitters.js



class Emitters {
  constructor(engine, container) {
    this.container = container;
    this._engine = engine;
    this.array = [];
    this.emitters = [];
    this.interactivityEmitters = {
      random: {
        count: 1,
        enable: false
      },
      value: []
    };
    const defaultIndex = 0;
    container.getEmitter = idxOrName => idxOrName === undefined || isNumber(idxOrName) ? this.array[idxOrName ?? defaultIndex] : this.array.find(t => t.name === idxOrName);
    container.addEmitter = async (options, position) => this.addEmitter(options, position);
    container.removeEmitter = idxOrName => {
      const emitter = container.getEmitter(idxOrName);
      if (emitter) {
        this.removeEmitter(emitter);
      }
    };
    container.playEmitter = idxOrName => {
      const emitter = container.getEmitter(idxOrName);
      if (emitter) {
        emitter.externalPlay();
      }
    };
    container.pauseEmitter = idxOrName => {
      const emitter = container.getEmitter(idxOrName);
      if (emitter) {
        emitter.externalPause();
      }
    };
  }
  async addEmitter(options, position) {
    const emitterOptions = new Emitter();
    emitterOptions.load(options);
    const emitter = new EmitterInstance(this._engine, this, this.container, emitterOptions, position);
    await emitter.init();
    this.array.push(emitter);
    return emitter;
  }
  handleClickMode(mode) {
    const emitterOptions = this.emitters,
      modeEmitters = this.interactivityEmitters;
    if (mode !== "emitter") {
      return;
    }
    let emittersModeOptions;
    if (modeEmitters && isArray(modeEmitters.value)) {
      const minLength = 0;
      if (modeEmitters.value.length > minLength && modeEmitters.random.enable) {
        emittersModeOptions = [];
        const usedIndexes = [];
        for (let i = 0; i < modeEmitters.random.count; i++) {
          const idx = arrayRandomIndex(modeEmitters.value);
          if (usedIndexes.includes(idx) && usedIndexes.length < modeEmitters.value.length) {
            i--;
            continue;
          }
          usedIndexes.push(idx);
          emittersModeOptions.push(itemFromArray(modeEmitters.value, idx));
        }
      } else {
        emittersModeOptions = modeEmitters.value;
      }
    } else {
      emittersModeOptions = modeEmitters?.value;
    }
    const emittersOptions = emittersModeOptions ?? emitterOptions,
      ePosition = this.container.interactivity.mouse.clickPosition;
    void executeOnSingleOrMultiple(emittersOptions, async emitter => {
      await this.addEmitter(emitter, ePosition);
    });
  }
  async init() {
    this.emitters = this.container.actualOptions.emitters;
    this.interactivityEmitters = this.container.actualOptions.interactivity.modes.emitters;
    if (!this.emitters) {
      return;
    }
    if (isArray(this.emitters)) {
      for (const emitterOptions of this.emitters) {
        await this.addEmitter(emitterOptions);
      }
    } else {
      await this.addEmitter(this.emitters);
    }
  }
  pause() {
    for (const emitter of this.array) {
      emitter.pause();
    }
  }
  play() {
    for (const emitter of this.array) {
      emitter.play();
    }
  }
  removeEmitter(emitter) {
    const index = this.array.indexOf(emitter),
      minIndex = 0,
      deleteCount = 1;
    if (index >= minIndex) {
      this.array.splice(index, deleteCount);
    }
  }
  resize() {
    for (const emitter of this.array) {
      emitter.resize();
    }
  }
  stop() {
    this.array = [];
  }
  async update(delta) {
    for (const emitter of this.array) {
      await emitter.update(delta);
    }
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/browser/ShapeManager.js
const shapeGeneratorss = new Map();
class ShapeManager {
  constructor(engine) {
    this._engine = engine;
  }
  addShapeGenerator(name, generator) {
    if (!this.getShapeGenerator(name)) {
      shapeGeneratorss.set(name, generator);
    }
  }
  getShapeGenerator(name) {
    return shapeGeneratorss.get(name);
  }
  getSupportedShapeGenerators() {
    return shapeGeneratorss.keys();
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/browser/EmitterShapeBase.js
class EmitterShapeBase {
  constructor(position, size, fill, options) {
    this.position = position;
    this.size = size;
    this.fill = fill;
    this.options = options;
  }
  resize(position, size) {
    this.position = position;
    this.size = size;
  }
}
;// CONCATENATED MODULE: ../../plugins/emitters/dist/browser/index.js




class EmittersPlugin {
  constructor(engine) {
    this._engine = engine;
    this.id = "emitters";
  }
  getPlugin(container) {
    return new Emitters(this._engine, container);
  }
  loadOptions(options, source) {
    if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
      return;
    }
    if (source?.emitters) {
      options.emitters = executeOnSingleOrMultiple(source.emitters, emitter => {
        const tmp = new Emitter();
        tmp.load(emitter);
        return tmp;
      });
    }
    const interactivityEmitters = source?.interactivity?.modes?.emitters;
    if (interactivityEmitters) {
      if (isArray(interactivityEmitters)) {
        options.interactivity.modes.emitters = {
          random: {
            count: 1,
            enable: true
          },
          value: interactivityEmitters.map(s => {
            const tmp = new Emitter();
            tmp.load(s);
            return tmp;
          })
        };
      } else {
        const emitterMode = interactivityEmitters;
        if (emitterMode.value !== undefined) {
          const defaultCount = 1;
          if (isArray(emitterMode.value)) {
            options.interactivity.modes.emitters = {
              random: {
                count: emitterMode.random.count ?? defaultCount,
                enable: emitterMode.random.enable ?? false
              },
              value: emitterMode.value.map(s => {
                const tmp = new Emitter();
                tmp.load(s);
                return tmp;
              })
            };
          } else {
            const tmp = new Emitter();
            tmp.load(emitterMode.value);
            options.interactivity.modes.emitters = {
              random: {
                count: emitterMode.random.count ?? defaultCount,
                enable: emitterMode.random.enable ?? false
              },
              value: tmp
            };
          }
        } else {
          const emitterOptions = options.interactivity.modes.emitters = {
            random: {
              count: 1,
              enable: false
            },
            value: new Emitter()
          };
          emitterOptions.value.load(interactivityEmitters);
        }
      }
    }
  }
  needsPlugin(options) {
    if (!options) {
      return false;
    }
    const emitters = options.emitters;
    return isArray(emitters) && !!emitters.length || emitters !== undefined || !!options.interactivity?.events?.onClick?.mode && isInArray("emitter", options.interactivity.events.onClick.mode);
  }
}
async function loadEmittersPlugin(engine, refresh = true) {
  if (!engine.emitterShapeManager) {
    engine.emitterShapeManager = new ShapeManager(engine);
  }
  if (!engine.addEmitterShapeGenerator) {
    engine.addEmitterShapeGenerator = (name, generator) => {
      engine.emitterShapeManager?.addShapeGenerator(name, generator);
    };
  }
  const plugin = new EmittersPlugin(engine);
  await engine.addPlugin(plugin, refresh);
}







;// CONCATENATED MODULE: ../../plugins/emittersShapes/circle/dist/browser/EmittersCircleShape.js


const quarter = 0.25,
  EmittersCircleShape_double = 2,
  EmittersCircleShape_doublePI = Math.PI * EmittersCircleShape_double,
  EmittersCircleShape_squareExp = 2,
  EmittersCircleShape_half = 0.5;
class EmittersCircleShape extends EmitterShapeBase {
  constructor(position, size, fill, options) {
    super(position, size, fill, options);
  }
  async init() {}
  async randomPosition() {
    const size = this.size,
      fill = this.fill,
      position = this.position,
      generateTheta = (x, y) => {
        const u = getRandom() * quarter,
          theta = Math.atan(y / x * Math.tan(EmittersCircleShape_doublePI * u)),
          v = getRandom();
        if (v < quarter) {
          return theta;
        } else if (v < EmittersCircleShape_double * quarter) {
          return Math.PI - theta;
        } else if (v < EmittersCircleShape_double * quarter + quarter) {
          return Math.PI + theta;
        } else {
          return -theta;
        }
      },
      radius = (x, y, theta) => x * y / Math.sqrt((y * Math.cos(theta)) ** EmittersCircleShape_squareExp + (x * Math.sin(theta)) ** EmittersCircleShape_squareExp),
      [a, b] = [size.width * EmittersCircleShape_half, size.height * EmittersCircleShape_half],
      randomTheta = generateTheta(a, b),
      maxRadius = radius(a, b, randomTheta),
      randomRadius = fill ? maxRadius * Math.sqrt(getRandom()) : maxRadius;
    return Promise.resolve({
      position: {
        x: position.x + randomRadius * Math.cos(randomTheta),
        y: position.y + randomRadius * Math.sin(randomTheta)
      }
    });
  }
}
;// CONCATENATED MODULE: ../../plugins/emittersShapes/circle/dist/browser/EmittersCircleShapeGenerator.js

class EmittersCircleShapeGenerator {
  generate(position, size, fill, options) {
    return new EmittersCircleShape(position, size, fill, options);
  }
}
;// CONCATENATED MODULE: ../../plugins/emittersShapes/circle/dist/browser/index.js

async function loadEmittersShapeCircle(engine, refresh = true) {
  const emittersEngine = engine;
  emittersEngine.addEmitterShapeGenerator?.("circle", new EmittersCircleShapeGenerator());
  await emittersEngine.refresh(refresh);
}
;// CONCATENATED MODULE: ../../plugins/emittersShapes/square/dist/browser/EmittersSquareShape.js


const EmittersSquareShape_half = 0.5,
  sides = 4,
  EmittersSquareShape_double = 2;
function randomSquareCoordinate(position, offset) {
  return position + offset * (getRandom() - halfRandom);
}
class EmittersSquareShape extends EmitterShapeBase {
  constructor(position, size, fill, options) {
    super(position, size, fill, options);
  }
  async init() {}
  async randomPosition() {
    return await new Promise(success => {
      const fill = this.fill,
        position = this.position,
        size = this.size;
      if (fill) {
        return success({
          position: {
            x: randomSquareCoordinate(position.x, size.width),
            y: randomSquareCoordinate(position.y, size.height)
          }
        });
      } else {
        const halfW = size.width * EmittersSquareShape_half,
          halfH = size.height * EmittersSquareShape_half,
          side = Math.floor(getRandom() * sides),
          v = (getRandom() - halfRandom) * EmittersSquareShape_double;
        switch (side) {
          case 0:
            return success({
              position: {
                x: position.x + v * halfW,
                y: position.y - halfH
              }
            });
          case 1:
            return success({
              position: {
                x: position.x - halfW,
                y: position.y + v * halfH
              }
            });
          case 2:
            return success({
              position: {
                x: position.x + v * halfW,
                y: position.y + halfH
              }
            });
          case 3:
          default:
            return success({
              position: {
                x: position.x + halfW,
                y: position.y + v * halfH
              }
            });
        }
      }
    });
  }
}
;// CONCATENATED MODULE: ../../plugins/emittersShapes/square/dist/browser/EmittersSquareShapeGenerator.js

class EmittersSquareShapeGenerator {
  generate(position, size, fill, options) {
    return new EmittersSquareShape(position, size, fill, options);
  }
}
;// CONCATENATED MODULE: ../../plugins/emittersShapes/square/dist/browser/index.js

async function loadEmittersShapeSquare(engine, refresh = true) {
  const emittersEngine = engine;
  emittersEngine.addEmitterShapeGenerator?.("square", new EmittersSquareShapeGenerator());
  await emittersEngine.refresh(refresh);
}
;// CONCATENATED MODULE: ../../interactions/external/trail/dist/browser/Options/Classes/Trail.js

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
;// CONCATENATED MODULE: ../../interactions/external/trail/dist/browser/TrailMaker.js


const trailMode = "trail";
class TrailMaker extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this._delay = 0;
  }
  clear() {}
  init() {}
  async interact(delta) {
    const container = this.container,
      {
        interactivity
      } = container;
    if (!container.retina.reduceFactor) {
      return;
    }
    const options = container.actualOptions,
      trailOptions = options.interactivity.modes.trail;
    if (!trailOptions) {
      return;
    }
    const optDelay = trailOptions.delay * millisecondsToSeconds / this.container.retina.reduceFactor;
    if (this._delay < optDelay) {
      this._delay += delta.value;
    }
    if (this._delay < optDelay) {
      return;
    }
    const canEmit = !(trailOptions.pauseOnStop && (interactivity.mouse.position === this._lastPosition || interactivity.mouse.position?.x === this._lastPosition?.x && interactivity.mouse.position?.y === this._lastPosition?.y));
    const mousePos = container.interactivity.mouse.position;
    if (mousePos) {
      this._lastPosition = {
        ...mousePos
      };
    } else {
      delete this._lastPosition;
    }
    if (canEmit) {
      container.particles.push(trailOptions.quantity, container.interactivity.mouse, trailOptions.particles);
    }
    this._delay -= optDelay;
    await Promise.resolve();
  }
  isEnabled(particle) {
    const container = this.container,
      options = container.actualOptions,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? options.interactivity).events;
    return mouse.clicking && mouse.inside && !!mouse.position && isInArray(trailMode, events.onClick.mode) || mouse.inside && !!mouse.position && isInArray(trailMode, events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.trail) {
      options.trail = new Trail();
    }
    for (const source of sources) {
      options.trail.load(source?.trail);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/trail/dist/browser/index.js

async function loadExternalTrailInteraction(engine, refresh = true) {
  await engine.addInteractor("externalTrail", container => new TrailMaker(container), refresh);
}


;// CONCATENATED MODULE: ../../updaters/roll/dist/browser/Utils.js

const Utils_double = 2,
  Utils_doublePI = Math.PI * Utils_double,
  Utils_maxAngle = 360;
function initParticle(particle) {
  const rollOpt = particle.options.roll;
  if (!rollOpt?.enable) {
    particle.roll = {
      enable: false,
      horizontal: false,
      vertical: false,
      angle: 0,
      speed: 0
    };
    return;
  }
  particle.roll = {
    enable: rollOpt.enable,
    horizontal: rollOpt.mode === "horizontal" || rollOpt.mode === "both",
    vertical: rollOpt.mode === "vertical" || rollOpt.mode === "both",
    angle: getRandom() * Utils_doublePI,
    speed: getRangeValue(rollOpt.speed) / Utils_maxAngle
  };
  if (rollOpt.backColor) {
    particle.backColor = rangeColorToHsl(rollOpt.backColor);
  } else if (rollOpt.darken.enable && rollOpt.enlighten.enable) {
    const alterType = getRandom() >= halfRandom ? "darken" : "enlighten";
    particle.roll.alter = {
      type: alterType,
      value: getRangeValue(alterType === "darken" ? rollOpt.darken.value : rollOpt.enlighten.value)
    };
  } else if (rollOpt.darken.enable) {
    particle.roll.alter = {
      type: "darken",
      value: getRangeValue(rollOpt.darken.value)
    };
  } else if (rollOpt.enlighten.enable) {
    particle.roll.alter = {
      type: "enlighten",
      value: getRangeValue(rollOpt.enlighten.value)
    };
  }
}
function updateRoll(particle, delta) {
  const roll = particle.options.roll,
    data = particle.roll;
  if (!data || !roll?.enable) {
    return;
  }
  const speed = data.speed * delta.factor,
    max = Utils_doublePI;
  data.angle += speed;
  if (data.angle > max) {
    data.angle -= max;
  }
}
;// CONCATENATED MODULE: ../../updaters/roll/dist/browser/Options/Classes/RollLight.js

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
;// CONCATENATED MODULE: ../../updaters/roll/dist/browser/Options/Classes/Roll.js


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
;// CONCATENATED MODULE: ../../updaters/roll/dist/browser/RollUpdater.js


class RollUpdater {
  getTransformValues(particle) {
    const roll = particle.roll?.enable && particle.roll,
      rollHorizontal = roll && roll.horizontal,
      rollVertical = roll && roll.vertical;
    return {
      a: rollHorizontal ? Math.cos(roll.angle) : undefined,
      d: rollVertical ? Math.sin(roll.angle) : undefined
    };
  }
  init(particle) {
    initParticle(particle);
  }
  isEnabled(particle) {
    const roll = particle.options.roll;
    return !particle.destroyed && !particle.spawning && !!roll?.enable;
  }
  loadOptions(options, ...sources) {
    if (!options.roll) {
      options.roll = new Roll();
    }
    for (const source of sources) {
      options.roll.load(source?.roll);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateRoll(particle, delta);
  }
}
;// CONCATENATED MODULE: ../../updaters/roll/dist/browser/index.js

async function loadRollUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("roll", () => new RollUpdater(), refresh);
}
;// CONCATENATED MODULE: ../../move/base/dist/browser/Utils.js

const Utils_half = 0.5,
  Utils_minVelocity = 0,
  identity = 1,
  moveSpeedFactor = 60,
  minSpinRadius = 0,
  spinFactor = 0.01;
function applyDistance(particle) {
  const initialPosition = particle.initialPosition,
    {
      dx,
      dy
    } = getDistances(initialPosition, particle.position),
    dxFixed = Math.abs(dx),
    dyFixed = Math.abs(dy),
    {
      maxDistance
    } = particle.retina,
    hDistance = maxDistance.horizontal,
    vDistance = maxDistance.vertical;
  if (!hDistance && !vDistance) {
    return;
  }
  const hasHDistance = (hDistance && dxFixed >= hDistance) ?? false,
    hasVDistance = (vDistance && dyFixed >= vDistance) ?? false;
  if ((hasHDistance || hasVDistance) && !particle.misplaced) {
    particle.misplaced = !!hDistance && dxFixed > hDistance || !!vDistance && dyFixed > vDistance;
    if (hDistance) {
      particle.velocity.x = particle.velocity.y * Utils_half - particle.velocity.x;
    }
    if (vDistance) {
      particle.velocity.y = particle.velocity.x * Utils_half - particle.velocity.y;
    }
  } else if ((!hDistance || dxFixed < hDistance) && (!vDistance || dyFixed < vDistance) && particle.misplaced) {
    particle.misplaced = false;
  } else if (particle.misplaced) {
    const pos = particle.position,
      vel = particle.velocity;
    if (hDistance && (pos.x < initialPosition.x && vel.x < Utils_minVelocity || pos.x > initialPosition.x && vel.x > Utils_minVelocity)) {
      vel.x *= -getRandom();
    }
    if (vDistance && (pos.y < initialPosition.y && vel.y < Utils_minVelocity || pos.y > initialPosition.y && vel.y > Utils_minVelocity)) {
      vel.y *= -getRandom();
    }
  }
}
function move(particle, moveOptions, moveSpeed, maxSpeed, moveDrift, delta) {
  applyPath(particle, delta);
  const gravityOptions = particle.gravity,
    gravityFactor = gravityOptions?.enable && gravityOptions.inverse ? -identity : identity;
  if (moveDrift && moveSpeed) {
    particle.velocity.x += moveDrift * delta.factor / (moveSpeedFactor * moveSpeed);
  }
  if (gravityOptions?.enable && moveSpeed) {
    particle.velocity.y += gravityFactor * (gravityOptions.acceleration * delta.factor) / (moveSpeedFactor * moveSpeed);
  }
  const decay = particle.moveDecay;
  particle.velocity.multTo(decay);
  const velocity = particle.velocity.mult(moveSpeed);
  if (gravityOptions?.enable && maxSpeed > Utils_minVelocity && (!gravityOptions.inverse && velocity.y >= Utils_minVelocity && velocity.y >= maxSpeed || gravityOptions.inverse && velocity.y <= Utils_minVelocity && velocity.y <= -maxSpeed)) {
    velocity.y = gravityFactor * maxSpeed;
    if (moveSpeed) {
      particle.velocity.y = velocity.y / moveSpeed;
    }
  }
  const zIndexOptions = particle.options.zIndex,
    zVelocityFactor = (identity - particle.zIndexFactor) ** zIndexOptions.velocityRate;
  velocity.multTo(zVelocityFactor);
  const {
    position
  } = particle;
  position.addTo(velocity);
  if (moveOptions.vibrate) {
    position.x += Math.sin(position.x * Math.cos(position.y));
    position.y += Math.cos(position.y * Math.sin(position.x));
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
  const maxCanvasSize = Math.max(container.canvas.size.width, container.canvas.size.height),
    halfMaxSize = maxCanvasSize * Utils_half;
  if (particle.spin.radius > halfMaxSize) {
    particle.spin.radius = halfMaxSize;
    particle.spin.acceleration *= -identity;
  } else if (particle.spin.radius < minSpinRadius) {
    particle.spin.radius = minSpinRadius;
    particle.spin.acceleration *= -identity;
  }
  particle.spin.angle += moveSpeed * spinFactor * (identity - particle.spin.radius / maxCanvasSize);
}
function applyPath(particle, delta) {
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
  const path = particle.pathGenerator?.generate(particle, delta);
  if (path) {
    particle.velocity.addTo(path);
  }
  if (pathOptions.clamp) {
    particle.velocity.x = clamp(particle.velocity.x, -identity, identity);
    particle.velocity.y = clamp(particle.velocity.y, -identity, identity);
  }
  particle.lastPathTime -= particle.pathDelay;
}
function getProximitySpeedFactor(particle) {
  return particle.slow.inRange ? particle.slow.factor : identity;
}
;// CONCATENATED MODULE: ../../move/base/dist/browser/BaseMover.js


const diffFactor = 2,
  defaultSizeFactor = 1,
  defaultDeltaFactor = 1;
class BaseMover {
  constructor() {
    this._initSpin = particle => {
      const container = particle.container,
        options = particle.options,
        spinOptions = options.move.spin;
      if (!spinOptions.enable) {
        return;
      }
      const spinPos = spinOptions.position ?? {
          x: 50,
          y: 50
        },
        spinFactor = 0.01,
        spinCenter = {
          x: spinPos.x * spinFactor * container.canvas.size.width,
          y: spinPos.y * spinFactor * container.canvas.size.height
        },
        pos = particle.getPosition(),
        distance = getDistance(pos, spinCenter),
        spinAcceleration = getRangeValue(spinOptions.acceleration);
      particle.retina.spinAcceleration = spinAcceleration * container.retina.pixelRatio;
      const minVelocity = 0;
      particle.spin = {
        center: spinCenter,
        direction: particle.velocity.x >= minVelocity ? "clockwise" : "counter-clockwise",
        angle: particle.velocity.angle,
        radius: distance,
        acceleration: particle.retina.spinAcceleration
      };
    };
  }
  init(particle) {
    const options = particle.options,
      gravityOptions = options.move.gravity;
    particle.gravity = {
      enable: gravityOptions.enable,
      acceleration: getRangeValue(gravityOptions.acceleration),
      inverse: gravityOptions.inverse
    };
    this._initSpin(particle);
  }
  isEnabled(particle) {
    return !particle.destroyed && particle.options.move.enable;
  }
  move(particle, delta) {
    const particleOptions = particle.options,
      moveOptions = particleOptions.move;
    if (!moveOptions.enable) {
      return;
    }
    const container = particle.container,
      pxRatio = container.retina.pixelRatio;
    particle.retina.moveSpeed ??= getRangeValue(moveOptions.speed) * pxRatio;
    particle.retina.moveDrift ??= getRangeValue(particle.options.move.drift) * pxRatio;
    const slowFactor = getProximitySpeedFactor(particle),
      baseSpeed = particle.retina.moveSpeed * container.retina.reduceFactor,
      moveDrift = particle.retina.moveDrift,
      maxSize = getRangeMax(particleOptions.size.value) * pxRatio,
      sizeFactor = moveOptions.size ? particle.getRadius() / maxSize : defaultSizeFactor,
      deltaFactor = delta.factor || defaultDeltaFactor,
      moveSpeed = baseSpeed * sizeFactor * slowFactor * deltaFactor / diffFactor,
      maxSpeed = particle.retina.maxSpeed ?? container.retina.maxSpeed;
    if (moveOptions.spin.enable) {
      spin(particle, moveSpeed);
    } else {
      move(particle, moveOptions, moveSpeed, maxSpeed, moveDrift, delta);
    }
    applyDistance(particle);
  }
}
;// CONCATENATED MODULE: ../../move/base/dist/browser/index.js

async function loadBaseMover(engine, refresh = true) {
  await engine.addMover("base", () => new BaseMover(), refresh);
}
;// CONCATENATED MODULE: ../../shapes/circle/dist/browser/CircleDrawer.js

const CircleDrawer_double = 2,
  CircleDrawer_doublePI = Math.PI * CircleDrawer_double,
  CircleDrawer_sides = 12,
  CircleDrawer_maxAngle = 360,
  CircleDrawer_minAngle = 0,
  CircleDrawer_origin = {
    x: 0,
    y: 0
  };
class CircleDrawer {
  draw(data) {
    const {
      context,
      particle,
      radius
    } = data;
    if (!particle.circleRange) {
      particle.circleRange = {
        min: CircleDrawer_minAngle,
        max: CircleDrawer_doublePI
      };
    }
    const circleRange = particle.circleRange;
    context.arc(CircleDrawer_origin.x, CircleDrawer_origin.y, radius, circleRange.min, circleRange.max, false);
  }
  getSidesCount() {
    return CircleDrawer_sides;
  }
  particleInit(container, particle) {
    const shapeData = particle.shapeData,
      angle = shapeData?.angle ?? {
        max: CircleDrawer_maxAngle,
        min: CircleDrawer_minAngle
      };
    particle.circleRange = !isObject(angle) ? {
      min: CircleDrawer_minAngle,
      max: degToRad(angle)
    } : {
      min: degToRad(angle.min),
      max: degToRad(angle.max)
    };
  }
}
;// CONCATENATED MODULE: ../../shapes/circle/dist/browser/index.js

async function loadCircleShape(engine, refresh = true) {
  await engine.addShape("circle", new CircleDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../updaters/color/dist/browser/ColorUpdater.js

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
    const {
        h: hAnimation,
        s: sAnimation,
        l: lAnimation
      } = particle.options.color.animation,
      {
        color
      } = particle;
    return !particle.destroyed && !particle.spawning && (color?.h.value !== undefined && hAnimation.enable || color?.s.value !== undefined && sAnimation.enable || color?.l.value !== undefined && lAnimation.enable);
  }
  update(particle, delta) {
    updateColor(particle.color, delta);
  }
}
;// CONCATENATED MODULE: ../../updaters/color/dist/browser/index.js

async function loadColorUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("color", container => new ColorUpdater(container), refresh);
}
;// CONCATENATED MODULE: ../../updaters/opacity/dist/browser/OpacityUpdater.js

class OpacityUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const opacityOptions = particle.options.opacity,
      pxRatio = 1;
    particle.opacity = initParticleNumericAnimationValue(opacityOptions, pxRatio);
    const opacityAnimation = opacityOptions.animation;
    if (opacityAnimation.enable) {
      particle.opacity.velocity = getRangeValue(opacityAnimation.speed) / percentDenominator * this.container.retina.reduceFactor;
      if (!opacityAnimation.sync) {
        particle.opacity.velocity *= getRandom();
      }
    }
  }
  isEnabled(particle) {
    const none = 0;
    return !particle.destroyed && !particle.spawning && !!particle.opacity && particle.opacity.enable && ((particle.opacity.maxLoops ?? none) <= none || (particle.opacity.maxLoops ?? none) > none && (particle.opacity.loops ?? none) < (particle.opacity.maxLoops ?? none));
  }
  reset(particle) {
    if (particle.opacity) {
      particle.opacity.time = 0;
      particle.opacity.loops = 0;
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle) || !particle.opacity) {
      return;
    }
    updateAnimation(particle, particle.opacity, true, particle.options.opacity.animation.destroy, delta);
  }
}
;// CONCATENATED MODULE: ../../updaters/opacity/dist/browser/index.js

async function loadOpacityUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("opacity", container => new OpacityUpdater(container), refresh);
}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/browser/Utils.js

const browser_Utils_minVelocity = 0,
  boundsMin = 0;
function bounceHorizontal(data) {
  if (data.outMode !== "bounce" && data.outMode !== "bounce-horizontal" && data.outMode !== "bounceHorizontal" && data.outMode !== "split" || data.direction !== "left" && data.direction !== "right") {
    return;
  }
  if (data.bounds.right < boundsMin && data.direction === "left") {
    data.particle.position.x = data.size + data.offset.x;
  } else if (data.bounds.left > data.canvasSize.width && data.direction === "right") {
    data.particle.position.x = data.canvasSize.width - data.size - data.offset.x;
  }
  const velocity = data.particle.velocity.x;
  let bounced = false;
  if (data.direction === "right" && data.bounds.right >= data.canvasSize.width && velocity > browser_Utils_minVelocity || data.direction === "left" && data.bounds.left <= boundsMin && velocity < browser_Utils_minVelocity) {
    const newVelocity = getRangeValue(data.particle.options.bounce.horizontal.value);
    data.particle.velocity.x *= -newVelocity;
    bounced = true;
  }
  if (!bounced) {
    return;
  }
  const minPos = data.offset.x + data.size;
  if (data.bounds.right >= data.canvasSize.width && data.direction === "right") {
    data.particle.position.x = data.canvasSize.width - minPos;
  } else if (data.bounds.left <= boundsMin && data.direction === "left") {
    data.particle.position.x = minPos;
  }
  if (data.outMode === "split") {
    data.particle.destroy();
  }
}
function bounceVertical(data) {
  if (data.outMode !== "bounce" && data.outMode !== "bounce-vertical" && data.outMode !== "bounceVertical" && data.outMode !== "split" || data.direction !== "bottom" && data.direction !== "top") {
    return;
  }
  if (data.bounds.bottom < boundsMin && data.direction === "top") {
    data.particle.position.y = data.size + data.offset.y;
  } else if (data.bounds.top > data.canvasSize.height && data.direction === "bottom") {
    data.particle.position.y = data.canvasSize.height - data.size - data.offset.y;
  }
  const velocity = data.particle.velocity.y;
  let bounced = false;
  if (data.direction === "bottom" && data.bounds.bottom >= data.canvasSize.height && velocity > browser_Utils_minVelocity || data.direction === "top" && data.bounds.top <= boundsMin && velocity < browser_Utils_minVelocity) {
    const newVelocity = getRangeValue(data.particle.options.bounce.vertical.value);
    data.particle.velocity.y *= -newVelocity;
    bounced = true;
  }
  if (!bounced) {
    return;
  }
  const minPos = data.offset.y + data.size;
  if (data.bounds.bottom >= data.canvasSize.height && data.direction === "bottom") {
    data.particle.position.y = data.canvasSize.height - minPos;
  } else if (data.bounds.top <= boundsMin && data.direction === "top") {
    data.particle.position.y = minPos;
  }
  if (data.outMode === "split") {
    data.particle.destroy();
  }
}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/browser/BounceOutMode.js


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
;// CONCATENATED MODULE: ../../updaters/outModes/dist/browser/DestroyOutMode.js

const DestroyOutMode_minVelocity = 0;
class DestroyOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["destroy"];
  }
  update(particle, direction, _delta, outMode) {
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
          if (vx < DestroyOutMode_minVelocity && dx > particle.moveCenter.radius || vy < DestroyOutMode_minVelocity && dy > particle.moveCenter.radius || vx >= DestroyOutMode_minVelocity && dx < -particle.moveCenter.radius || vy >= DestroyOutMode_minVelocity && dy < -particle.moveCenter.radius) {
            return;
          }
          break;
        }
    }
    container.particles.remove(particle, undefined, true);
  }
}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/browser/NoneOutMode.js

const NoneOutMode_minVelocity = 0;
class NoneOutMode {
  constructor(container) {
    this.container = container;
    this.modes = ["none"];
  }
  update(particle, direction, delta, outMode) {
    if (!this.modes.includes(outMode)) {
      return;
    }
    if ((particle.options.move.distance.horizontal && (direction === "left" || direction === "right")) ?? (particle.options.move.distance.vertical && (direction === "top" || direction === "bottom"))) {
      return;
    }
    const gravityOptions = particle.options.move.gravity,
      container = this.container;
    const canvasSize = container.canvas.size;
    const pRadius = particle.getRadius();
    if (!gravityOptions.enable) {
      if (particle.velocity.y > NoneOutMode_minVelocity && particle.position.y <= canvasSize.height + pRadius || particle.velocity.y < NoneOutMode_minVelocity && particle.position.y >= -pRadius || particle.velocity.x > NoneOutMode_minVelocity && particle.position.x <= canvasSize.width + pRadius || particle.velocity.x < NoneOutMode_minVelocity && particle.position.x >= -pRadius) {
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
;// CONCATENATED MODULE: ../../updaters/outModes/dist/browser/OutOutMode.js

const OutOutMode_minVelocity = 0,
  minDistance = 0;
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
          if (vx <= OutOutMode_minVelocity && dx >= minDistance || vy <= OutOutMode_minVelocity && dy >= minDistance || vx >= OutOutMode_minVelocity && dx <= minDistance || vy >= OutOutMode_minVelocity && dy <= minDistance) {
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
                const warp = particle.options.move.warp,
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
                  if (!warp) {
                    particle.position.y = getRandom() * canvasSize.height;
                    particle.initialPosition.y = particle.position.y;
                  }
                } else if (direction === "left" && nextBounds.right < -particle.offset.x) {
                  particle.position.x = newPos.right;
                  particle.initialPosition.x = particle.position.x;
                  if (!warp) {
                    particle.position.y = getRandom() * canvasSize.height;
                    particle.initialPosition.y = particle.position.y;
                  }
                }
                if (direction === "bottom" && nextBounds.top > canvasSize.height + particle.offset.y) {
                  if (!warp) {
                    particle.position.x = getRandom() * canvasSize.width;
                    particle.initialPosition.x = particle.position.x;
                  }
                  particle.position.y = newPos.top;
                  particle.initialPosition.y = particle.position.y;
                } else if (direction === "top" && nextBounds.bottom < -particle.offset.y) {
                  if (!warp) {
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
;// CONCATENATED MODULE: ../../updaters/outModes/dist/browser/OutOfCanvasUpdater.js




class OutOfCanvasUpdater {
  constructor(container) {
    this._updateOutMode = (particle, delta, outMode, direction) => {
      for (const updater of this.updaters) {
        updater.update(particle, direction, delta, outMode);
      }
    };
    this.container = container;
    this.updaters = [new BounceOutMode(container), new DestroyOutMode(container), new OutOutMode(container), new NoneOutMode(container)];
  }
  init() {}
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning;
  }
  update(particle, delta) {
    const outModes = particle.options.move.outModes;
    this._updateOutMode(particle, delta, outModes.bottom ?? outModes.default, "bottom");
    this._updateOutMode(particle, delta, outModes.left ?? outModes.default, "left");
    this._updateOutMode(particle, delta, outModes.right ?? outModes.default, "right");
    this._updateOutMode(particle, delta, outModes.top ?? outModes.default, "top");
  }
}
;// CONCATENATED MODULE: ../../updaters/outModes/dist/browser/index.js

async function loadOutModesUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("outModes", container => new OutOfCanvasUpdater(container), refresh);
}
;// CONCATENATED MODULE: ../../updaters/size/dist/browser/SizeUpdater.js

const minLoops = 0;
class SizeUpdater {
  init(particle) {
    const container = particle.container,
      sizeOptions = particle.options.size,
      sizeAnimation = sizeOptions.animation;
    if (sizeAnimation.enable) {
      particle.size.velocity = (particle.retina.sizeAnimationSpeed ?? container.retina.sizeAnimationSpeed) / percentDenominator * container.retina.reduceFactor;
      if (!sizeAnimation.sync) {
        particle.size.velocity *= getRandom();
      }
    }
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning && particle.size.enable && ((particle.size.maxLoops ?? minLoops) <= minLoops || (particle.size.maxLoops ?? minLoops) > minLoops && (particle.size.loops ?? minLoops) < (particle.size.maxLoops ?? minLoops));
  }
  reset(particle) {
    particle.size.loops = minLoops;
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateAnimation(particle, particle.size, true, particle.options.size.animation.destroy, delta);
  }
}
;// CONCATENATED MODULE: ../../updaters/size/dist/browser/index.js

async function loadSizeUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("size", () => new SizeUpdater(), refresh);
}
;// CONCATENATED MODULE: ../basic/dist/browser/index.js






async function loadBasic(engine, refresh = true) {
  await loadBaseMover(engine, false);
  await loadCircleShape(engine, false);
  await loadColorUpdater(engine, false);
  await loadOpacityUpdater(engine, false);
  await loadOutModesUpdater(engine, false);
  await loadSizeUpdater(engine, false);
  await engine.refresh(refresh);
}
;// CONCATENATED MODULE: ../../plugins/easings/quad/dist/browser/index.js

async function loadEasingQuadPlugin() {
  addEasing("ease-in-quad", value => value ** 2);
  addEasing("ease-out-quad", value => 1 - (1 - value) ** 2);
  addEasing("ease-in-out-quad", value => value < 0.5 ? 2 * value ** 2 : 1 - (-2 * value + 2) ** 2 / 2);
  await Promise.resolve();
}
;// CONCATENATED MODULE: ../../shapes/emoji/dist/browser/EmojiDrawer.js

const validTypes = ["emoji"];
const defaultFont = '"Twemoji Mozilla", Apple Color Emoji, "Segoe UI Emoji", "Noto Color Emoji", "EmojiOne Color"';
class EmojiDrawer {
  constructor() {
    this._emojiShapeDict = new Map();
  }
  destroy() {
    for (const [key, emojiData] of this._emojiShapeDict) {
      if (emojiData instanceof ImageBitmap) {
        emojiData?.close();
        this._emojiShapeDict.delete(key);
      }
    }
  }
  draw(data) {
    const {
        context,
        particle,
        radius,
        opacity
      } = data,
      emojiData = particle.emojiData,
      double = 2,
      diameter = radius * double,
      previousAlpha = context.globalAlpha;
    if (!emojiData) {
      return;
    }
    context.globalAlpha = opacity;
    context.drawImage(emojiData, -radius, -radius, diameter, diameter);
    context.globalAlpha = previousAlpha;
  }
  async init(container) {
    const options = container.actualOptions;
    if (validTypes.find(t => isInArray(t, options.particles.shape.type))) {
      const promises = [loadFont(defaultFont)],
        shapeOptions = validTypes.map(t => options.particles.shape.options[t]).find(t => !!t);
      if (shapeOptions) {
        executeOnSingleOrMultiple(shapeOptions, shape => {
          if (shape.font) {
            promises.push(loadFont(shape.font));
          }
        });
      }
      await Promise.all(promises);
    }
  }
  particleDestroy(particle) {
    delete particle.emojiData;
  }
  particleInit(container, particle) {
    const double = 2,
      shapeData = particle.shapeData;
    if (!shapeData?.value) {
      return;
    }
    const emoji = itemFromSingleOrMultiple(shapeData.value, particle.randomIndexData),
      font = shapeData.font ?? defaultFont;
    if (!emoji) {
      return;
    }
    const key = `${emoji}_${font}`,
      existingData = this._emojiShapeDict.get(key);
    if (existingData) {
      particle.emojiData = existingData;
      return;
    }
    const canvasSize = getRangeMax(particle.size.value) * double;
    let emojiData;
    const maxSize = getRangeMax(particle.size.value);
    if (typeof OffscreenCanvas !== "undefined") {
      const canvas = new OffscreenCanvas(canvasSize, canvasSize),
        context = canvas.getContext("2d");
      if (!context) {
        return;
      }
      context.font = `400 ${maxSize * double}px ${font}`;
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.fillText(emoji, maxSize, maxSize);
      emojiData = canvas.transferToImageBitmap();
    } else {
      const canvas = document.createElement("canvas");
      canvas.width = canvasSize;
      canvas.height = canvasSize;
      const context = canvas.getContext("2d");
      if (!context) {
        return;
      }
      context.font = `400 ${maxSize * double}px ${font}`;
      context.textBaseline = "middle";
      context.textAlign = "center";
      context.fillText(emoji, maxSize, maxSize);
      emojiData = canvas;
    }
    this._emojiShapeDict.set(key, emojiData);
    particle.emojiData = emojiData;
  }
}
;// CONCATENATED MODULE: ../../shapes/emoji/dist/browser/index.js

async function loadEmojiShape(engine, refresh = true) {
  await engine.addShape(validTypes, new EmojiDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../interactions/external/attract/dist/browser/Options/Classes/Attract.js
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
;// CONCATENATED MODULE: ../../interactions/external/attract/dist/browser/Attractor.js


const attractMode = "attract",
  Attractor_minRadius = 0,
  minFactor = 1,
  Attractor_identity = 1;
class Attractor extends ExternalInteractorBase {
  constructor(engine, container) {
    super(container);
    this._clickAttract = () => {
      const container = this.container;
      if (!container.attract) {
        container.attract = {
          particles: []
        };
      }
      const {
        attract
      } = container;
      if (!attract.finish) {
        if (!attract.count) {
          attract.count = 0;
        }
        attract.count++;
        if (attract.count === container.particles.count) {
          attract.finish = true;
        }
      }
      if (attract.clicking) {
        const mousePos = container.interactivity.mouse.clickPosition,
          attractRadius = container.retina.attractModeDistance;
        if (!attractRadius || attractRadius < Attractor_minRadius || !mousePos) {
          return;
        }
        this._processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
      } else if (attract.clicking === false) {
        attract.particles = [];
      }
    };
    this._hoverAttract = () => {
      const container = this.container,
        mousePos = container.interactivity.mouse.position,
        attractRadius = container.retina.attractModeDistance;
      if (!attractRadius || attractRadius < Attractor_minRadius || !mousePos) {
        return;
      }
      this._processAttract(mousePos, attractRadius, new Circle(mousePos.x, mousePos.y, attractRadius));
    };
    this._processAttract = (position, attractRadius, area) => {
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
          } = getDistances(particle.position, position),
          velocity = attractOptions.speed * attractOptions.factor,
          attractFactor = clamp(getEasing(attractOptions.easing)(Attractor_identity - distance / attractRadius) * velocity, minFactor, attractOptions.maxSpeed),
          normVec = Vector.create(!distance ? velocity : dx / distance * attractFactor, !distance ? velocity : dy / distance * attractFactor);
        particle.position.subFrom(normVec);
      }
    };
    this._engine = engine;
    if (!container.attract) {
      container.attract = {
        particles: []
      };
    }
    this.handleClickMode = mode => {
      const options = this.container.actualOptions,
        attract = options.interactivity.modes.attract;
      if (!attract || mode !== attractMode) {
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
        if (container.destroyed) {
          return;
        }
        if (!container.attract) {
          container.attract = {
            particles: []
          };
        }
        container.attract.clicking = false;
      }, attract.duration * millisecondsToSeconds);
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
    if (mouseMoveStatus && hoverEnabled && isInArray(attractMode, hoverMode)) {
      this._hoverAttract();
    } else if (clickEnabled && isInArray(attractMode, clickMode)) {
      this._clickAttract();
    }
    await Promise.resolve();
  }
  isEnabled(particle) {
    const container = this.container,
      options = container.actualOptions,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? options.interactivity).events;
    if ((!mouse.position || !events.onHover.enable) && (!mouse.clickPosition || !events.onClick.enable)) {
      return false;
    }
    const hoverMode = events.onHover.mode,
      clickMode = events.onClick.mode;
    return isInArray(attractMode, hoverMode) || isInArray(attractMode, clickMode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.attract) {
      options.attract = new Attract();
    }
    for (const source of sources) {
      options.attract.load(source?.attract);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/attract/dist/browser/index.js

async function loadExternalAttractInteraction(engine, refresh = true) {
  await engine.addInteractor("externalAttract", container => new Attractor(engine, container), refresh);
}


;// CONCATENATED MODULE: ../../interactions/external/bounce/dist/browser/Options/Classes/Bounce.js
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
;// CONCATENATED MODULE: ../../interactions/external/bounce/dist/browser/Bouncer.js


const bounceMode = "bounce",
  Bouncer_squareExp = 2,
  Bouncer_double = 2,
  Bouncer_half = 0.5,
  halfPI = Math.PI * Bouncer_half,
  toleranceFactor = 10,
  Bouncer_minRadius = 0;
class Bouncer extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this._processBounce = (position, radius, area) => {
      const query = this.container.particles.quadTree.query(area, p => this.isEnabled(p));
      for (const particle of query) {
        if (area instanceof Circle) {
          circleBounce(circleBounceDataFromParticle(particle), {
            position,
            radius,
            mass: radius ** Bouncer_squareExp * halfPI,
            velocity: Vector.origin,
            factor: Vector.origin
          });
        } else if (area instanceof Rectangle) {
          rectBounce(particle, calculateBounds(position, radius));
        }
      }
    };
    this._processMouseBounce = () => {
      const container = this.container,
        pxRatio = container.retina.pixelRatio,
        tolerance = toleranceFactor * pxRatio,
        mousePos = container.interactivity.mouse.position,
        radius = container.retina.bounceModeDistance;
      if (!radius || radius < Bouncer_minRadius || !mousePos) {
        return;
      }
      this._processBounce(mousePos, radius, new Circle(mousePos.x, mousePos.y, radius + tolerance));
    };
    this._singleSelectorBounce = (selector, div) => {
      const container = this.container,
        query = document.querySelectorAll(selector);
      if (!query.length) {
        return;
      }
      query.forEach(item => {
        const elem = item,
          pxRatio = container.retina.pixelRatio,
          pos = {
            x: (elem.offsetLeft + elem.offsetWidth * Bouncer_half) * pxRatio,
            y: (elem.offsetTop + elem.offsetHeight * Bouncer_half) * pxRatio
          },
          radius = elem.offsetWidth * Bouncer_half * pxRatio,
          tolerance = toleranceFactor * pxRatio,
          area = div.type === "circle" ? new Circle(pos.x, pos.y, radius + tolerance) : new Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * Bouncer_double, elem.offsetHeight * pxRatio + tolerance * Bouncer_double);
        this._processBounce(pos, radius, area);
      });
    };
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
    if (mouseMoveStatus && hoverEnabled && isInArray(bounceMode, hoverMode)) {
      this._processMouseBounce();
    } else {
      divModeExecute(bounceMode, divs, (selector, div) => this._singleSelectorBounce(selector, div));
    }
    await Promise.resolve();
  }
  isEnabled(particle) {
    const container = this.container,
      options = container.actualOptions,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? options.interactivity).events,
      divs = events.onDiv;
    return !!mouse.position && events.onHover.enable && isInArray(bounceMode, events.onHover.mode) || isDivModeEnabled(bounceMode, divs);
  }
  loadModeOptions(options, ...sources) {
    if (!options.bounce) {
      options.bounce = new Bounce();
    }
    for (const source of sources) {
      options.bounce.load(source?.bounce);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/bounce/dist/browser/index.js

async function loadExternalBounceInteraction(engine, refresh = true) {
  await engine.addInteractor("externalBounce", container => new Bouncer(container), refresh);
}


;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/browser/Options/Classes/BubbleBase.js

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
      const sourceColor = isArray(this.color) ? undefined : this.color;
      this.color = executeOnSingleOrMultiple(data.color, color => {
        return OptionsColor.create(sourceColor, color);
      });
    }
    if (data.size !== undefined) {
      this.size = data.size;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/browser/Options/Classes/BubbleDiv.js

class BubbleDiv extends BubbleBase {
  constructor() {
    super();
    this.selectors = [];
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.selectors !== undefined) {
      this.selectors = data.selectors;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/browser/Options/Classes/Bubble.js



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
;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/browser/Utils.js

function calculateBubbleValue(particleValue, modeValue, optionsValue, ratio) {
  if (modeValue >= optionsValue) {
    const value = particleValue + (modeValue - optionsValue) * ratio;
    return clamp(value, particleValue, modeValue);
  } else if (modeValue < optionsValue) {
    const value = particleValue - (optionsValue - modeValue) * ratio;
    return clamp(value, modeValue, particleValue);
  }
}
;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/browser/Bubbler.js



const bubbleMode = "bubble",
  Bubbler_minDistance = 0,
  defaultClickTime = 0,
  Bubbler_double = 2,
  defaultOpacity = 1,
  ratioOffset = 1,
  defaultBubbleValue = 0,
  minRatio = 0,
  Bubbler_half = 0.5,
  Bubbler_defaultRatio = 1;
class Bubbler extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this._clickBubble = () => {
      const container = this.container,
        options = container.actualOptions,
        mouseClickPos = container.interactivity.mouse.clickPosition,
        bubbleOptions = options.interactivity.modes.bubble;
      if (!bubbleOptions || !mouseClickPos) {
        return;
      }
      if (!container.bubble) {
        container.bubble = {};
      }
      const distance = container.retina.bubbleModeDistance;
      if (!distance || distance < Bubbler_minDistance) {
        return;
      }
      const query = container.particles.quadTree.queryCircle(mouseClickPos, distance, p => this.isEnabled(p)),
        {
          bubble
        } = container;
      for (const particle of query) {
        if (!bubble.clicking) {
          continue;
        }
        particle.bubble.inRange = !bubble.durationEnd;
        const pos = particle.getPosition(),
          distMouse = getDistance(pos, mouseClickPos),
          timeSpent = (new Date().getTime() - (container.interactivity.mouse.clickTime ?? defaultClickTime)) / millisecondsToSeconds;
        if (timeSpent > bubbleOptions.duration) {
          bubble.durationEnd = true;
        }
        if (timeSpent > bubbleOptions.duration * Bubbler_double) {
          bubble.clicking = false;
          bubble.durationEnd = false;
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
        this._process(particle, distMouse, timeSpent, sizeData);
        const opacityData = {
          bubbleObj: {
            optValue: bubbleOptions.opacity,
            value: particle.bubble.opacity
          },
          particlesObj: {
            optValue: getRangeMax(particle.options.opacity.value),
            value: particle.opacity?.value ?? defaultOpacity
          },
          type: "opacity"
        };
        this._process(particle, distMouse, timeSpent, opacityData);
        if (!bubble.durationEnd && distMouse <= distance) {
          this._hoverBubbleColor(particle, distMouse);
        } else {
          delete particle.bubble.color;
        }
      }
    };
    this._hoverBubble = () => {
      const container = this.container,
        mousePos = container.interactivity.mouse.position,
        distance = container.retina.bubbleModeDistance;
      if (!distance || distance < Bubbler_minDistance || !mousePos) {
        return;
      }
      const query = container.particles.quadTree.queryCircle(mousePos, distance, p => this.isEnabled(p));
      for (const particle of query) {
        particle.bubble.inRange = true;
        const pos = particle.getPosition(),
          pointDistance = getDistance(pos, mousePos),
          ratio = ratioOffset - pointDistance / distance;
        if (pointDistance <= distance) {
          if (ratio >= minRatio && container.interactivity.status === mouseMoveEvent) {
            this._hoverBubbleSize(particle, ratio);
            this._hoverBubbleOpacity(particle, ratio);
            this._hoverBubbleColor(particle, ratio);
          }
        } else {
          this.reset(particle);
        }
        if (container.interactivity.status === mouseLeaveEvent) {
          this.reset(particle);
        }
      }
    };
    this._hoverBubbleColor = (particle, ratio, divBubble) => {
      const options = this.container.actualOptions,
        bubbleOptions = divBubble ?? options.interactivity.modes.bubble;
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
        particle.bubble.color = pColor ? rgbToHsl(colorMix(pColor, particle.bubble.finalColor, ratioOffset - ratio, ratio)) : particle.bubble.finalColor;
      } else {
        particle.bubble.color = particle.bubble.finalColor;
      }
    };
    this._hoverBubbleOpacity = (particle, ratio, divBubble) => {
      const container = this.container,
        options = container.actualOptions,
        modeOpacity = divBubble?.opacity ?? options.interactivity.modes.bubble?.opacity;
      if (!modeOpacity) {
        return;
      }
      const optOpacity = particle.options.opacity.value,
        pOpacity = particle.opacity?.value ?? defaultOpacity,
        opacity = calculateBubbleValue(pOpacity, modeOpacity, getRangeMax(optOpacity), ratio);
      if (opacity !== undefined) {
        particle.bubble.opacity = opacity;
      }
    };
    this._hoverBubbleSize = (particle, ratio, divBubble) => {
      const container = this.container,
        modeSize = divBubble?.size ? divBubble.size * container.retina.pixelRatio : container.retina.bubbleModeSize;
      if (modeSize === undefined) {
        return;
      }
      const optSize = getRangeMax(particle.options.size.value) * container.retina.pixelRatio,
        pSize = particle.size.value,
        size = calculateBubbleValue(pSize, modeSize, optSize, ratio);
      if (size !== undefined) {
        particle.bubble.radius = size;
      }
    };
    this._process = (particle, distMouse, timeSpent, data) => {
      const container = this.container,
        bubbleParam = data.bubbleObj.optValue,
        options = container.actualOptions,
        bubbleOptions = options.interactivity.modes.bubble;
      if (!bubbleOptions || bubbleParam === undefined) {
        return;
      }
      const bubbleDuration = bubbleOptions.duration,
        bubbleDistance = container.retina.bubbleModeDistance,
        particlesParam = data.particlesObj.optValue,
        pObjBubble = data.bubbleObj.value,
        pObj = data.particlesObj.value ?? defaultBubbleValue,
        type = data.type;
      if (!bubbleDistance || bubbleDistance < Bubbler_minDistance || bubbleParam === particlesParam) {
        return;
      }
      if (!container.bubble) {
        container.bubble = {};
      }
      if (container.bubble.durationEnd) {
        if (pObjBubble) {
          if (type === "size") {
            delete particle.bubble.radius;
          }
          if (type === "opacity") {
            delete particle.bubble.opacity;
          }
        }
      } else {
        if (distMouse <= bubbleDistance) {
          const obj = pObjBubble ?? pObj;
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
      }
    };
    this._singleSelectorHover = (delta, selector, div) => {
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
            x: (elem.offsetLeft + elem.offsetWidth * Bubbler_half) * pxRatio,
            y: (elem.offsetTop + elem.offsetHeight * Bubbler_half) * pxRatio
          },
          repulseRadius = elem.offsetWidth * Bubbler_half * pxRatio,
          area = div.type === "circle" ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio),
          query = container.particles.quadTree.query(area, p => this.isEnabled(p));
        for (const particle of query) {
          if (!area.contains(particle.getPosition())) {
            continue;
          }
          particle.bubble.inRange = true;
          const divs = bubble.divs,
            divBubble = divMode(divs, elem);
          if (!particle.bubble.div || particle.bubble.div !== elem) {
            this.clear(particle, delta, true);
            particle.bubble.div = elem;
          }
          this._hoverBubbleSize(particle, Bubbler_defaultRatio, divBubble);
          this._hoverBubbleOpacity(particle, Bubbler_defaultRatio, divBubble);
          this._hoverBubbleColor(particle, Bubbler_defaultRatio, divBubble);
        }
      });
    };
    if (!container.bubble) {
      container.bubble = {};
    }
    this.handleClickMode = mode => {
      if (mode !== bubbleMode) {
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
    if (hoverEnabled && isInArray(bubbleMode, hoverMode)) {
      this._hoverBubble();
    } else if (clickEnabled && isInArray(bubbleMode, clickMode)) {
      this._clickBubble();
    } else {
      divModeExecute(bubbleMode, divs, (selector, div) => this._singleSelectorHover(delta, selector, div));
    }
    await Promise.resolve();
  }
  isEnabled(particle) {
    const container = this.container,
      options = container.actualOptions,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? options.interactivity).events,
      {
        onClick,
        onDiv,
        onHover
      } = events,
      divBubble = isDivModeEnabled(bubbleMode, onDiv);
    if (!(divBubble || onHover.enable && !!mouse.position || onClick.enable && mouse.clickPosition)) {
      return false;
    }
    return isInArray(bubbleMode, onHover.mode) || isInArray(bubbleMode, onClick.mode) || divBubble;
  }
  loadModeOptions(options, ...sources) {
    if (!options.bubble) {
      options.bubble = new Bubble();
    }
    for (const source of sources) {
      options.bubble.load(source?.bubble);
    }
  }
  reset(particle) {
    particle.bubble.inRange = false;
  }
}
;// CONCATENATED MODULE: ../../interactions/external/bubble/dist/browser/index.js

async function loadExternalBubbleInteraction(engine, refresh = true) {
  await engine.addInteractor("externalBubble", container => new Bubbler(container), refresh);
}






;// CONCATENATED MODULE: ../../interactions/external/connect/dist/browser/Options/Classes/ConnectLinks.js
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
;// CONCATENATED MODULE: ../../interactions/external/connect/dist/browser/Options/Classes/Connect.js

class Connect {
  constructor() {
    this.distance = 80;
    this.links = new ConnectLinks();
    this.radius = 60;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
    this.links.load(data.links);
    if (data.radius !== undefined) {
      this.radius = data.radius;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/connect/dist/browser/Utils.js

const gradientMin = 0,
  gradientMax = 1,
  defaultLinksWidth = 0;
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
  grad.addColorStop(gradientMin, getStyleFromHsl(color1, opacity));
  grad.addColorStop(clamp(gradStop, gradientMin, gradientMax), getStyleFromRgb(midRgb, opacity));
  grad.addColorStop(gradientMax, getStyleFromHsl(color2, opacity));
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
    const ls = lineStyle(container, ctx, p1, p2);
    if (!ls) {
      return;
    }
    const pos1 = p1.getPosition(),
      pos2 = p2.getPosition();
    drawConnectLine(ctx, p1.retina.linksWidth ?? defaultLinksWidth, ls, pos1, pos2);
  });
}
;// CONCATENATED MODULE: ../../interactions/external/connect/dist/browser/Connector.js



const connectMode = "connect",
  Connector_minDistance = 0;
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
      const mousePos = container.interactivity.mouse.position,
        {
          connectModeDistance,
          connectModeRadius
        } = container.retina;
      if (!connectModeDistance || connectModeDistance < Connector_minDistance || !connectModeRadius || connectModeRadius < Connector_minDistance || !mousePos) {
        return;
      }
      const distance = Math.abs(connectModeRadius),
        query = container.particles.quadTree.queryCircle(mousePos, distance, p => this.isEnabled(p));
      query.forEach((p1, i) => {
        const pos1 = p1.getPosition(),
          indexOffset = 1;
        for (const p2 of query.slice(i + indexOffset)) {
          const pos2 = p2.getPosition(),
            distMax = Math.abs(connectModeDistance),
            xDiff = Math.abs(pos1.x - pos2.x),
            yDiff = Math.abs(pos1.y - pos2.y);
          if (xDiff < distMax && yDiff < distMax) {
            drawConnection(container, p1, p2);
          }
        }
      });
    }
    await Promise.resolve();
  }
  isEnabled(particle) {
    const container = this.container,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? container.actualOptions.interactivity).events;
    if (!(events.onHover.enable && mouse.position)) {
      return false;
    }
    return isInArray(connectMode, events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.connect) {
      options.connect = new Connect();
    }
    for (const source of sources) {
      options.connect.load(source?.connect);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/connect/dist/browser/index.js

async function loadExternalConnectInteraction(engine, refresh = true) {
  await engine.addInteractor("externalConnect", container => new Connector(container), refresh);
}




;// CONCATENATED MODULE: ../../interactions/external/grab/dist/browser/Options/Classes/GrabLinks.js

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
;// CONCATENATED MODULE: ../../interactions/external/grab/dist/browser/Options/Classes/Grab.js

class Grab {
  constructor() {
    this.distance = 100;
    this.links = new GrabLinks();
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.distance !== undefined) {
      this.distance = data.distance;
    }
    this.links.load(data.links);
  }
}
;// CONCATENATED MODULE: ../../interactions/external/grab/dist/browser/Utils.js

const defaultWidth = 0;
function drawGrabLine(context, width, begin, end, colorLine, opacity) {
  drawLine(context, begin, end);
  context.strokeStyle = getStyleFromRgb(colorLine, opacity);
  context.lineWidth = width;
  context.stroke();
}
function drawGrab(container, particle, lineColor, opacity, mousePos) {
  container.canvas.draw(ctx => {
    const beginPos = particle.getPosition();
    drawGrabLine(ctx, particle.retina.linksWidth ?? defaultWidth, beginPos, mousePos, lineColor, opacity);
  });
}
;// CONCATENATED MODULE: ../../interactions/external/grab/dist/browser/Grabber.js



const grabMode = "grab",
  Grabber_minDistance = 0,
  minOpacity = 0;
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
    if (!distance || distance < Grabber_minDistance) {
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
      if (opacityLine <= minOpacity) {
        continue;
      }
      const optColor = grabLineOptions.color ?? particle.options.links?.color;
      if (!container.particles.grabLineColor && optColor) {
        const linksOptions = interactivity.modes.grab.links;
        container.particles.grabLineColor = getLinkRandomColor(optColor, linksOptions.blink, linksOptions.consent);
      }
      const colorLine = getLinkColor(particle, undefined, container.particles.grabLineColor);
      if (!colorLine) {
        continue;
      }
      drawGrab(container, particle, colorLine, opacityLine, mousePos);
    }
    await Promise.resolve();
  }
  isEnabled(particle) {
    const container = this.container,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? container.actualOptions.interactivity).events;
    return events.onHover.enable && !!mouse.position && isInArray(grabMode, events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.grab) {
      options.grab = new Grab();
    }
    for (const source of sources) {
      options.grab.load(source?.grab);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/grab/dist/browser/index.js

async function loadExternalGrabInteraction(engine, refresh = true) {
  await engine.addInteractor("externalGrab", container => new Grabber(container), refresh);
}




;// CONCATENATED MODULE: ../../interactions/external/pause/dist/browser/Pauser.js

const pauseMode = "pause";
class Pauser extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = mode => {
      if (mode !== pauseMode) {
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
;// CONCATENATED MODULE: ../../interactions/external/pause/dist/browser/index.js

async function loadExternalPauseInteraction(engine, refresh = true) {
  await engine.addInteractor("externalPause", container => new Pauser(container), refresh);
}
;// CONCATENATED MODULE: ../../interactions/external/push/dist/browser/Options/Classes/Push.js

class Push {
  constructor() {
    this.default = true;
    this.groups = [];
    this.quantity = 4;
  }
  load(data) {
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
    const quantity = data.quantity;
    if (quantity !== undefined) {
      this.quantity = setRangeValue(quantity);
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/push/dist/browser/Pusher.js


const pushMode = "push",
  minQuantity = 0;
class Pusher extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = mode => {
      if (mode !== pushMode) {
        return;
      }
      const container = this.container,
        options = container.actualOptions,
        pushOptions = options.interactivity.modes.push;
      if (!pushOptions) {
        return;
      }
      const quantity = getRangeValue(pushOptions.quantity);
      if (quantity <= minQuantity) {
        return;
      }
      const group = itemFromArray([undefined, ...pushOptions.groups]),
        groupOptions = group !== undefined ? container.actualOptions.particles.groups[group] : undefined;
      container.particles.push(quantity, container.interactivity.mouse, groupOptions, group);
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
      options.push.load(source?.push);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/push/dist/browser/index.js

async function loadExternalPushInteraction(engine, refresh = true) {
  await engine.addInteractor("externalPush", container => new Pusher(container), refresh);
}


;// CONCATENATED MODULE: ../../interactions/external/remove/dist/browser/Options/Classes/Remove.js

class Remove {
  constructor() {
    this.quantity = 2;
  }
  load(data) {
    if (!data) {
      return;
    }
    const quantity = data.quantity;
    if (quantity !== undefined) {
      this.quantity = setRangeValue(quantity);
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/remove/dist/browser/Remover.js


const removeMode = "remove";
class Remover extends ExternalInteractorBase {
  constructor(container) {
    super(container);
    this.handleClickMode = mode => {
      const container = this.container,
        options = container.actualOptions;
      if (!options.interactivity.modes.remove || mode !== removeMode) {
        return;
      }
      const removeNb = getRangeValue(options.interactivity.modes.remove.quantity);
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
      options.remove.load(source?.remove);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/remove/dist/browser/index.js

async function loadExternalRemoveInteraction(engine, refresh = true) {
  await engine.addInteractor("externalRemove", container => new Remover(container), refresh);
}


;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/browser/Options/Classes/RepulseBase.js
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
;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/browser/Options/Classes/RepulseDiv.js

class RepulseDiv extends RepulseBase {
  constructor() {
    super();
    this.selectors = [];
  }
  load(data) {
    super.load(data);
    if (!data) {
      return;
    }
    if (data.selectors !== undefined) {
      this.selectors = data.selectors;
    }
  }
}
;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/browser/Options/Classes/Repulse.js



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
;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/browser/Repulser.js


const repulseMode = "repulse",
  Repulser_minDistance = 0,
  repulseRadiusFactor = 6,
  repulseRadiusPower = 3,
  squarePower = 2,
  Repulser_minRadius = 0,
  minSpeed = 0,
  easingOffset = 1,
  Repulser_half = 0.5;
class Repulser extends ExternalInteractorBase {
  constructor(engine, container) {
    super(container);
    this._clickRepulse = () => {
      const container = this.container,
        repulseOptions = container.actualOptions.interactivity.modes.repulse;
      if (!repulseOptions) {
        return;
      }
      const repulse = container.repulse ?? {
        particles: []
      };
      if (!repulse.finish) {
        if (!repulse.count) {
          repulse.count = 0;
        }
        repulse.count++;
        if (repulse.count === container.particles.count) {
          repulse.finish = true;
        }
      }
      if (repulse.clicking) {
        const repulseDistance = container.retina.repulseModeDistance;
        if (!repulseDistance || repulseDistance < Repulser_minDistance) {
          return;
        }
        const repulseRadius = Math.pow(repulseDistance / repulseRadiusFactor, repulseRadiusPower),
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
            d = distance ** squarePower,
            velocity = repulseOptions.speed,
            force = -repulseRadius * velocity / d;
          if (d <= repulseRadius) {
            repulse.particles.push(particle);
            const vect = Vector.create(dx, dy);
            vect.length = force;
            particle.velocity.setTo(vect);
          }
        }
      } else if (repulse.clicking === false) {
        for (const particle of repulse.particles) {
          particle.velocity.setTo(particle.initialVelocity);
        }
        repulse.particles = [];
      }
    };
    this._hoverRepulse = () => {
      const container = this.container,
        mousePos = container.interactivity.mouse.position,
        repulseRadius = container.retina.repulseModeDistance;
      if (!repulseRadius || repulseRadius < Repulser_minRadius || !mousePos) {
        return;
      }
      this._processRepulse(mousePos, repulseRadius, new Circle(mousePos.x, mousePos.y, repulseRadius));
    };
    this._processRepulse = (position, repulseRadius, area, divRepulse) => {
      const container = this.container,
        query = container.particles.quadTree.query(area, p => this.isEnabled(p)),
        repulseOptions = container.actualOptions.interactivity.modes.repulse;
      if (!repulseOptions) {
        return;
      }
      const {
          easing,
          speed,
          factor,
          maxSpeed
        } = repulseOptions,
        easingFunc = getEasing(easing),
        velocity = (divRepulse?.speed ?? speed) * factor;
      for (const particle of query) {
        const {
            dx,
            dy,
            distance
          } = getDistances(particle.position, position),
          repulseFactor = clamp(easingFunc(easingOffset - distance / repulseRadius) * velocity, minSpeed, maxSpeed),
          normVec = Vector.create(!distance ? velocity : dx / distance * repulseFactor, !distance ? velocity : dy / distance * repulseFactor);
        particle.position.addTo(normVec);
      }
    };
    this._singleSelectorRepulse = (selector, div) => {
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
            x: (elem.offsetLeft + elem.offsetWidth * Repulser_half) * pxRatio,
            y: (elem.offsetTop + elem.offsetHeight * Repulser_half) * pxRatio
          },
          repulseRadius = elem.offsetWidth * Repulser_half * pxRatio,
          area = div.type === "circle" ? new Circle(pos.x, pos.y, repulseRadius) : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio),
          divs = repulse.divs,
          divRepulse = divMode(divs, elem);
        this._processRepulse(pos, repulseRadius, area, divRepulse);
      });
    };
    this._engine = engine;
    if (!container.repulse) {
      container.repulse = {
        particles: []
      };
    }
    this.handleClickMode = mode => {
      const options = this.container.actualOptions,
        repulseOpts = options.interactivity.modes.repulse;
      if (!repulseOpts || mode !== repulseMode) {
        return;
      }
      if (!container.repulse) {
        container.repulse = {
          particles: []
        };
      }
      const repulse = container.repulse;
      repulse.clicking = true;
      repulse.count = 0;
      for (const particle of container.repulse.particles) {
        if (!this.isEnabled(particle)) {
          continue;
        }
        particle.velocity.setTo(particle.initialVelocity);
      }
      repulse.particles = [];
      repulse.finish = false;
      setTimeout(() => {
        if (container.destroyed) {
          return;
        }
        repulse.clicking = false;
      }, repulseOpts.duration * millisecondsToSeconds);
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
      hover = events.onHover,
      hoverEnabled = hover.enable,
      hoverMode = hover.mode,
      click = events.onClick,
      clickEnabled = click.enable,
      clickMode = click.mode,
      divs = events.onDiv;
    if (mouseMoveStatus && hoverEnabled && isInArray(repulseMode, hoverMode)) {
      this._hoverRepulse();
    } else if (clickEnabled && isInArray(repulseMode, clickMode)) {
      this._clickRepulse();
    } else {
      divModeExecute(repulseMode, divs, (selector, div) => this._singleSelectorRepulse(selector, div));
    }
    await Promise.resolve();
  }
  isEnabled(particle) {
    const container = this.container,
      options = container.actualOptions,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? options.interactivity).events,
      divs = events.onDiv,
      hover = events.onHover,
      click = events.onClick,
      divRepulse = isDivModeEnabled(repulseMode, divs);
    if (!(divRepulse || hover.enable && !!mouse.position || click.enable && mouse.clickPosition)) {
      return false;
    }
    const hoverMode = hover.mode,
      clickMode = click.mode;
    return isInArray(repulseMode, hoverMode) || isInArray(repulseMode, clickMode) || divRepulse;
  }
  loadModeOptions(options, ...sources) {
    if (!options.repulse) {
      options.repulse = new Repulse();
    }
    for (const source of sources) {
      options.repulse.load(source?.repulse);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/external/repulse/dist/browser/index.js

async function loadExternalRepulseInteraction(engine, refresh = true) {
  await engine.addInteractor("externalRepulse", container => new Repulser(engine, container), refresh);
}






;// CONCATENATED MODULE: ../../interactions/external/slow/dist/browser/Options/Classes/Slow.js
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
;// CONCATENATED MODULE: ../../interactions/external/slow/dist/browser/Slower.js


const slowMode = "slow",
  Slower_minRadius = 0;
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
    const container = this.container,
      mouse = container.interactivity.mouse,
      events = (particle?.interactivity ?? container.actualOptions.interactivity).events;
    return events.onHover.enable && !!mouse.position && isInArray(slowMode, events.onHover.mode);
  }
  loadModeOptions(options, ...sources) {
    if (!options.slow) {
      options.slow = new Slow();
    }
    for (const source of sources) {
      options.slow.load(source?.slow);
    }
  }
  reset(particle) {
    particle.slow.inRange = false;
    const container = this.container,
      options = container.actualOptions,
      mousePos = container.interactivity.mouse.position,
      radius = container.retina.slowModeRadius,
      slowOptions = options.interactivity.modes.slow;
    if (!slowOptions || !radius || radius < Slower_minRadius || !mousePos) {
      return;
    }
    const particlePos = particle.getPosition(),
      dist = getDistance(mousePos, particlePos),
      proximityFactor = dist / radius,
      slowFactor = slowOptions.factor,
      {
        slow
      } = particle;
    if (dist > radius) {
      return;
    }
    slow.inRange = true;
    slow.factor = proximityFactor / slowFactor;
  }
}
;// CONCATENATED MODULE: ../../interactions/external/slow/dist/browser/index.js

async function loadExternalSlowInteraction(engine, refresh = true) {
  await engine.addInteractor("externalSlow", container => new Slower(container), refresh);
}


;// CONCATENATED MODULE: ../../shapes/image/dist/browser/GifUtils/Constants.js
const InterlaceOffsets = [0, 4, 2, 1];
const InterlaceSteps = [8, 8, 4, 2];
;// CONCATENATED MODULE: ../../shapes/image/dist/browser/GifUtils/ByteStream.js
class ByteStream {
  constructor(bytes) {
    this.pos = 0;
    this.data = new Uint8ClampedArray(bytes);
  }
  getString(count) {
    const slice = this.data.slice(this.pos, this.pos + count);
    this.pos += slice.length;
    return slice.reduce((acc, curr) => acc + String.fromCharCode(curr), "");
  }
  nextByte() {
    return this.data[this.pos++];
  }
  nextTwoBytes() {
    const increment = 2,
      previous = 1,
      shift = 8;
    this.pos += increment;
    return this.data[this.pos - increment] + (this.data[this.pos - previous] << shift);
  }
  readSubBlocks() {
    let blockString = "",
      size = 0;
    const minCount = 0,
      emptySize = 0;
    do {
      size = this.data[this.pos++];
      for (let count = size; --count >= minCount; blockString += String.fromCharCode(this.data[this.pos++])) {}
    } while (size !== emptySize);
    return blockString;
  }
  readSubBlocksBin() {
    let size = 0,
      len = 0;
    const emptySize = 0,
      increment = 1;
    for (let offset = 0; size !== emptySize; offset += size + increment, size = this.data[this.pos + offset]) {
      len += size;
    }
    const blockData = new Uint8Array(len);
    for (let i = 0; size !== emptySize; size = this.data[this.pos++]) {
      for (let count = size; --count >= emptySize; blockData[i++] = this.data[this.pos++]) {}
    }
    return blockData;
  }
  skipSubBlocks() {
    for (const increment = 1, noData = 0; this.data[this.pos] !== noData; this.pos += this.data[this.pos] + increment) {}
    this.pos++;
  }
}
;// CONCATENATED MODULE: ../../shapes/image/dist/browser/GifUtils/Utils.js


function parseColorTable(byteStream, count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
    colors.push({
      r: byteStream.data[byteStream.pos],
      g: byteStream.data[byteStream.pos + 1],
      b: byteStream.data[byteStream.pos + 2]
    });
    byteStream.pos += 3;
  }
  return colors;
}
function parseExtensionBlock(byteStream, gif, getFrameIndex, getTransparencyIndex) {
  switch (byteStream.nextByte()) {
    case 249:
      {
        const frame = gif.frames[getFrameIndex(false)];
        byteStream.pos++;
        const packedByte = byteStream.nextByte();
        frame.GCreserved = (packedByte & 0xe0) >>> 5;
        frame.disposalMethod = (packedByte & 0x1c) >>> 2;
        frame.userInputDelayFlag = (packedByte & 2) === 2;
        const transparencyFlag = (packedByte & 1) === 1;
        frame.delayTime = byteStream.nextTwoBytes() * 0xa;
        const transparencyIndex = byteStream.nextByte();
        if (transparencyFlag) {
          getTransparencyIndex(transparencyIndex);
        }
        byteStream.pos++;
        break;
      }
    case 255:
      {
        byteStream.pos++;
        const applicationExtension = {
          identifier: byteStream.getString(8),
          authenticationCode: byteStream.getString(3),
          data: byteStream.readSubBlocksBin()
        };
        gif.applicationExtensions.push(applicationExtension);
        break;
      }
    case 254:
      {
        gif.comments.push([getFrameIndex(false), byteStream.readSubBlocks()]);
        break;
      }
    case 1:
      {
        if (gif.globalColorTable.length === 0) {
          throw new EvalError("plain text extension without global color table");
        }
        byteStream.pos++;
        gif.frames[getFrameIndex(false)].plainTextData = {
          left: byteStream.nextTwoBytes(),
          top: byteStream.nextTwoBytes(),
          width: byteStream.nextTwoBytes(),
          height: byteStream.nextTwoBytes(),
          charSize: {
            width: byteStream.nextTwoBytes(),
            height: byteStream.nextTwoBytes()
          },
          foregroundColor: byteStream.nextByte(),
          backgroundColor: byteStream.nextByte(),
          text: byteStream.readSubBlocks()
        };
        break;
      }
    default:
      byteStream.skipSubBlocks();
      break;
  }
}
async function parseImageBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback) {
  const frame = gif.frames[getFrameIndex(true)];
  frame.left = byteStream.nextTwoBytes();
  frame.top = byteStream.nextTwoBytes();
  frame.width = byteStream.nextTwoBytes();
  frame.height = byteStream.nextTwoBytes();
  const packedByte = byteStream.nextByte(),
    localColorTableFlag = (packedByte & 0x80) === 0x80,
    interlacedFlag = (packedByte & 0x40) === 0x40;
  frame.sortFlag = (packedByte & 0x20) === 0x20;
  frame.reserved = (packedByte & 0x18) >>> 3;
  const localColorCount = 1 << (packedByte & 7) + 1;
  if (localColorTableFlag) {
    frame.localColorTable = parseColorTable(byteStream, localColorCount);
  }
  const getColor = index => {
    const {
      r,
      g,
      b
    } = (localColorTableFlag ? frame.localColorTable : gif.globalColorTable)[index];
    if (index !== getTransparencyIndex(null)) {
      return {
        r,
        g,
        b,
        a: 255
      };
    }
    return {
      r,
      g,
      b,
      a: avgAlpha ? ~~((r + g + b) / 3) : 0
    };
  };
  const image = (() => {
    try {
      return new ImageData(frame.width, frame.height, {
        colorSpace: "srgb"
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "IndexSizeError") {
        return null;
      }
      throw error;
    }
  })();
  if (image == null) {
    throw new EvalError("GIF frame size is to large");
  }
  const minCodeSize = byteStream.nextByte(),
    imageData = byteStream.readSubBlocksBin(),
    clearCode = 1 << minCodeSize;
  const readBits = (pos, len) => {
    const bytePos = pos >>> 3,
      bitPos = pos & 7;
    return (imageData[bytePos] + (imageData[bytePos + 1] << 8) + (imageData[bytePos + 2] << 16) & (1 << len) - 1 << bitPos) >>> bitPos;
  };
  if (interlacedFlag) {
    for (let code = 0, size = minCodeSize + 1, pos = 0, dic = [[0]], pass = 0; pass < 4; pass++) {
      if (InterlaceOffsets[pass] < frame.height) {
        let pixelPos = 0,
          lineIndex = 0,
          exit = false;
        while (!exit) {
          const last = code;
          code = readBits(pos, size);
          pos += size + 1;
          if (code === clearCode) {
            size = minCodeSize + 1;
            dic.length = clearCode + 2;
            for (let i = 0; i < dic.length; i++) {
              dic[i] = i < clearCode ? [i] : [];
            }
          } else {
            if (code >= dic.length) {
              dic.push(dic[last].concat(dic[last][0]));
            } else if (last !== clearCode) {
              dic.push(dic[last].concat(dic[code][0]));
            }
            for (const item of dic[code]) {
              const {
                r,
                g,
                b,
                a
              } = getColor(item);
              image.data.set([r, g, b, a], InterlaceOffsets[pass] * frame.width + InterlaceSteps[pass] * lineIndex + pixelPos % (frame.width * 4));
              pixelPos += 4;
            }
            if (dic.length === 1 << size && size < 0xc) {
              size++;
            }
          }
          if (pixelPos === frame.width * 4 * (lineIndex + 1)) {
            lineIndex++;
            if (InterlaceOffsets[pass] + InterlaceSteps[pass] * lineIndex >= frame.height) {
              exit = true;
            }
          }
        }
      }
      progressCallback?.(byteStream.pos / (byteStream.data.length - 1), getFrameIndex(false) + 1, image, {
        x: frame.left,
        y: frame.top
      }, {
        width: gif.width,
        height: gif.height
      });
    }
    frame.image = image;
    frame.bitmap = await createImageBitmap(image);
  } else {
    let code = 0,
      size = minCodeSize + 1,
      pos = 0,
      pixelPos = -4,
      exit = false;
    const dic = [[0]];
    while (!exit) {
      const last = code;
      code = readBits(pos, size);
      pos += size;
      if (code === clearCode) {
        size = minCodeSize + 1;
        dic.length = clearCode + 2;
        for (let i = 0; i < dic.length; i++) {
          dic[i] = i < clearCode ? [i] : [];
        }
      } else {
        if (code === clearCode + 1) {
          exit = true;
          break;
        }
        if (code >= dic.length) {
          dic.push(dic[last].concat(dic[last][0]));
        } else if (last !== clearCode) {
          dic.push(dic[last].concat(dic[code][0]));
        }
        for (const item of dic[code]) {
          const {
            r,
            g,
            b,
            a
          } = getColor(item);
          image.data.set([r, g, b, a], pixelPos += 4);
        }
        if (dic.length >= 1 << size && size < 0xc) {
          size++;
        }
      }
    }
    frame.image = image;
    frame.bitmap = await createImageBitmap(image);
    progressCallback?.((byteStream.pos + 1) / byteStream.data.length, getFrameIndex(false) + 1, frame.image, {
      x: frame.left,
      y: frame.top
    }, {
      width: gif.width,
      height: gif.height
    });
  }
}
async function parseBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback) {
  switch (byteStream.nextByte()) {
    case 59:
      return true;
    case 44:
      await parseImageBlock(byteStream, gif, avgAlpha, getFrameIndex, getTransparencyIndex, progressCallback);
      break;
    case 33:
      parseExtensionBlock(byteStream, gif, getFrameIndex, getTransparencyIndex);
      break;
    default:
      throw new EvalError("undefined block found");
  }
  return false;
}
function getGIFLoopAmount(gif) {
  for (const extension of gif.applicationExtensions) {
    if (extension.identifier + extension.authenticationCode !== "NETSCAPE2.0") {
      continue;
    }
    return extension.data[1] + (extension.data[2] << 8);
  }
  return NaN;
}
async function decodeGIF(gifURL, progressCallback, avgAlpha) {
  if (!avgAlpha) avgAlpha = false;
  const res = await fetch(gifURL);
  if (!res.ok && res.status === 404) {
    throw new EvalError("file not found");
  }
  const buffer = await res.arrayBuffer();
  const gif = {
      width: 0,
      height: 0,
      totalTime: 0,
      colorRes: 0,
      pixelAspectRatio: 0,
      frames: [],
      sortFlag: false,
      globalColorTable: [],
      backgroundImage: new ImageData(1, 1, {
        colorSpace: "srgb"
      }),
      comments: [],
      applicationExtensions: []
    },
    byteStream = new ByteStream(new Uint8ClampedArray(buffer));
  if (byteStream.getString(6) !== "GIF89a") {
    throw new Error("not a supported GIF file");
  }
  gif.width = byteStream.nextTwoBytes();
  gif.height = byteStream.nextTwoBytes();
  const packedByte = byteStream.nextByte(),
    globalColorTableFlag = (packedByte & 0x80) === 0x80;
  gif.colorRes = (packedByte & 0x70) >>> 4;
  gif.sortFlag = (packedByte & 8) === 8;
  const globalColorCount = 1 << (packedByte & 7) + 1,
    backgroundColorIndex = byteStream.nextByte();
  gif.pixelAspectRatio = byteStream.nextByte();
  if (gif.pixelAspectRatio !== 0) {
    gif.pixelAspectRatio = (gif.pixelAspectRatio + 0xf) / 0x40;
  }
  if (globalColorTableFlag) {
    gif.globalColorTable = parseColorTable(byteStream, globalColorCount);
  }
  const backgroundImage = (() => {
    try {
      return new ImageData(gif.width, gif.height, {
        colorSpace: "srgb"
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "IndexSizeError") {
        return null;
      }
      throw error;
    }
  })();
  if (backgroundImage == null) {
    throw new Error("GIF frame size is to large");
  }
  const {
    r,
    g,
    b
  } = gif.globalColorTable[backgroundColorIndex];
  backgroundImage.data.set(globalColorTableFlag ? [r, g, b, 255] : [0, 0, 0, 0]);
  for (let i = 4; i < backgroundImage.data.length; i *= 2) {
    backgroundImage.data.copyWithin(i, 0, i);
  }
  gif.backgroundImage = backgroundImage;
  let frameIndex = -1,
    incrementFrameIndex = true,
    transparencyIndex = -1;
  const getframeIndex = increment => {
    if (increment) {
      incrementFrameIndex = true;
    }
    return frameIndex;
  };
  const getTransparencyIndex = newValue => {
    if (newValue != null) {
      transparencyIndex = newValue;
    }
    return transparencyIndex;
  };
  try {
    do {
      if (incrementFrameIndex) {
        gif.frames.push({
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          disposalMethod: 0,
          image: new ImageData(1, 1, {
            colorSpace: "srgb"
          }),
          plainTextData: null,
          userInputDelayFlag: false,
          delayTime: 0,
          sortFlag: false,
          localColorTable: [],
          reserved: 0,
          GCreserved: 0
        });
        frameIndex++;
        transparencyIndex = -1;
        incrementFrameIndex = false;
      }
    } while (!(await parseBlock(byteStream, gif, avgAlpha, getframeIndex, getTransparencyIndex, progressCallback)));
    gif.frames.length--;
    for (const frame of gif.frames) {
      if (frame.userInputDelayFlag && frame.delayTime === 0) {
        gif.totalTime = Infinity;
        break;
      }
      gif.totalTime += frame.delayTime;
    }
    return gif;
  } catch (error) {
    if (error instanceof EvalError) {
      throw new Error(`error while parsing frame ${frameIndex} "${error.message}"`);
    }
    throw error;
  }
}
;// CONCATENATED MODULE: ../../shapes/image/dist/browser/Utils.js


const stringStart = 0,
  defaultLoopCount = 0,
  Utils_defaultOpacity = 1;
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
  return `${svgData.substring(stringStart, preFillIndex)} fill="${colorStyle}"${svgData.substring(preFillIndex)}`;
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
      getLogger().error(`${errorPrefix} loading image: ${image.source}`);
      resolve();
    });
    img.src = image.source;
  });
}
async function loadGifImage(image) {
  if (image.type !== "gif") {
    await loadImage(image);
    return;
  }
  image.loading = true;
  try {
    image.gifData = await decodeGIF(image.source);
    image.gifLoopCount = getGIFLoopAmount(image.gifData) ?? defaultLoopCount;
    if (!image.gifLoopCount) {
      image.gifLoopCount = Infinity;
    }
  } catch {
    image.error = true;
  }
  image.loading = false;
}
async function downloadSvgImage(image) {
  if (image.type !== "svg") {
    await loadImage(image);
    return;
  }
  image.loading = true;
  const response = await fetch(image.source);
  if (!response.ok) {
    getLogger().error(`${errorPrefix} Image not found`);
    image.error = true;
  } else {
    image.svgData = await response.text();
  }
  image.loading = false;
}
function replaceImageColor(image, imageData, color, particle) {
  const svgColoredData = replaceColorSvg(image, color, particle.opacity?.value ?? Utils_defaultOpacity),
    imageRes = {
      color,
      gif: imageData.gif,
      data: {
        ...image,
        svgData: svgColoredData
      },
      loaded: false,
      ratio: imageData.width / imageData.height,
      replaceColor: imageData.replaceColor,
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
    const errorHandler = async () => {
      domUrl.revokeObjectURL(url);
      const img2 = {
        ...image,
        error: false,
        loading: true
      };
      await loadImage(img2);
      imageRes.loaded = true;
      imageRes.element = img2.element;
      resolve(imageRes);
    };
    img.addEventListener("error", () => void errorHandler());
    img.src = url;
  });
}
;// CONCATENATED MODULE: ../../shapes/image/dist/browser/ImageDrawer.js


const ImageDrawer_origin = {
    x: 0,
    y: 0
  },
  ImageDrawer_defaultLoopCount = 0,
  defaultFrame = 0,
  ImageDrawer_half = 0.5,
  initialTime = 0,
  firstIndex = 0,
  ImageDrawer_double = 2,
  defaultAlpha = 1,
  ImageDrawer_sides = 12,
  ImageDrawer_defaultRatio = 1;
class ImageDrawer {
  constructor(engine) {
    this.loadImageShape = async imageShape => {
      if (!this._engine.loadImage) {
        throw new Error(`${errorPrefix} image shape not initialized`);
      }
      await this._engine.loadImage({
        gif: imageShape.gif,
        name: imageShape.name,
        replaceColor: imageShape.replaceColor ?? false,
        src: imageShape.src
      });
    };
    this._engine = engine;
  }
  addImage(image) {
    if (!this._engine.images) {
      this._engine.images = [];
    }
    this._engine.images.push(image);
  }
  draw(data) {
    const {
        context,
        radius,
        particle,
        opacity,
        delta
      } = data,
      image = particle.image,
      element = image?.element;
    if (!image) {
      return;
    }
    context.globalAlpha = opacity;
    if (image.gif && image.gifData) {
      const offscreenCanvas = new OffscreenCanvas(image.gifData.width, image.gifData.height),
        offscreenContext = offscreenCanvas.getContext("2d");
      if (!offscreenContext) {
        throw new Error("could not create offscreen canvas context");
      }
      offscreenContext.imageSmoothingQuality = "low";
      offscreenContext.imageSmoothingEnabled = false;
      offscreenContext.clearRect(ImageDrawer_origin.x, ImageDrawer_origin.y, offscreenCanvas.width, offscreenCanvas.height);
      if (particle.gifLoopCount === undefined) {
        particle.gifLoopCount = image.gifLoopCount ?? ImageDrawer_defaultLoopCount;
      }
      let frameIndex = particle.gifFrame ?? defaultFrame;
      const pos = {
          x: -image.gifData.width * ImageDrawer_half,
          y: -image.gifData.height * ImageDrawer_half
        },
        frame = image.gifData.frames[frameIndex];
      if (particle.gifTime === undefined) {
        particle.gifTime = initialTime;
      }
      if (!frame.bitmap) {
        return;
      }
      context.scale(radius / image.gifData.width, radius / image.gifData.height);
      switch (frame.disposalMethod) {
        case 4:
        case 5:
        case 6:
        case 7:
        case 0:
          offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
          context.drawImage(offscreenCanvas, pos.x, pos.y);
          offscreenContext.clearRect(ImageDrawer_origin.x, ImageDrawer_origin.y, offscreenCanvas.width, offscreenCanvas.height);
          break;
        case 1:
          offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
          context.drawImage(offscreenCanvas, pos.x, pos.y);
          break;
        case 2:
          offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
          context.drawImage(offscreenCanvas, pos.x, pos.y);
          offscreenContext.clearRect(ImageDrawer_origin.x, ImageDrawer_origin.y, offscreenCanvas.width, offscreenCanvas.height);
          if (!image.gifData.globalColorTable.length) {
            offscreenContext.putImageData(image.gifData.frames[firstIndex].image, pos.x + frame.left, pos.y + frame.top);
          } else {
            offscreenContext.putImageData(image.gifData.backgroundImage, pos.x, pos.y);
          }
          break;
        case 3:
          {
            const previousImageData = offscreenContext.getImageData(ImageDrawer_origin.x, ImageDrawer_origin.y, offscreenCanvas.width, offscreenCanvas.height);
            offscreenContext.drawImage(frame.bitmap, frame.left, frame.top);
            context.drawImage(offscreenCanvas, pos.x, pos.y);
            offscreenContext.clearRect(ImageDrawer_origin.x, ImageDrawer_origin.y, offscreenCanvas.width, offscreenCanvas.height);
            offscreenContext.putImageData(previousImageData, ImageDrawer_origin.x, ImageDrawer_origin.y);
          }
          break;
      }
      particle.gifTime += delta.value;
      if (particle.gifTime > frame.delayTime) {
        particle.gifTime -= frame.delayTime;
        if (++frameIndex >= image.gifData.frames.length) {
          if (--particle.gifLoopCount <= ImageDrawer_defaultLoopCount) {
            return;
          }
          frameIndex = firstIndex;
          offscreenContext.clearRect(ImageDrawer_origin.x, ImageDrawer_origin.y, offscreenCanvas.width, offscreenCanvas.height);
        }
        particle.gifFrame = frameIndex;
      }
      context.scale(image.gifData.width / radius, image.gifData.height / radius);
    } else if (element) {
      const ratio = image.ratio,
        pos = {
          x: -radius,
          y: -radius
        },
        diameter = radius * ImageDrawer_double;
      context.drawImage(element, pos.x, pos.y, diameter, diameter / ratio);
    }
    context.globalAlpha = defaultAlpha;
  }
  getSidesCount() {
    return ImageDrawer_sides;
  }
  async init(container) {
    const options = container.actualOptions;
    if (!options.preload || !this._engine.loadImage) {
      return;
    }
    for (const imageData of options.preload) {
      await this._engine.loadImage(imageData);
    }
  }
  loadShape(particle) {
    if (particle.shape !== "image" && particle.shape !== "images") {
      return;
    }
    if (!this._engine.images) {
      this._engine.images = [];
    }
    const imageData = particle.shapeData;
    if (!imageData) {
      return;
    }
    const image = this._engine.images.find(t => t.name === imageData.name || t.source === imageData.src);
    if (!image) {
      void this.loadImageShape(imageData).then(() => {
        this.loadShape(particle);
      });
    }
  }
  particleInit(container, particle) {
    if (particle.shape !== "image" && particle.shape !== "images") {
      return;
    }
    if (!this._engine.images) {
      this._engine.images = [];
    }
    const images = this._engine.images,
      imageData = particle.shapeData;
    if (!imageData) {
      return;
    }
    const color = particle.getFillColor(),
      image = images.find(t => t.name === imageData.name || t.source === imageData.src);
    if (!image) {
      return;
    }
    const replaceColor = imageData.replaceColor ?? image.replaceColor;
    if (image.loading) {
      setTimeout(() => {
        this.particleInit(container, particle);
      });
      return;
    }
    void (async () => {
      let imageRes;
      if (image.svgData && color) {
        imageRes = await replaceImageColor(image, imageData, color, particle);
      } else {
        imageRes = {
          color,
          data: image,
          element: image.element,
          gif: image.gif,
          gifData: image.gifData,
          gifLoopCount: image.gifLoopCount,
          loaded: true,
          ratio: imageData.width && imageData.height ? imageData.width / imageData.height : image.ratio ?? ImageDrawer_defaultRatio,
          replaceColor: replaceColor,
          source: imageData.src
        };
      }
      if (!imageRes.ratio) {
        imageRes.ratio = 1;
      }
      const fill = imageData.fill ?? particle.shapeFill,
        close = imageData.close ?? particle.shapeClose,
        imageShape = {
          image: imageRes,
          fill,
          close
        };
      particle.image = imageShape.image;
      particle.shapeFill = imageShape.fill;
      particle.shapeClose = imageShape.close;
    })();
  }
}
;// CONCATENATED MODULE: ../../shapes/image/dist/browser/Options/Classes/Preload.js
class Preload {
  constructor() {
    this.src = "";
    this.gif = false;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.gif !== undefined) {
      this.gif = data.gif;
    }
    if (data.height !== undefined) {
      this.height = data.height;
    }
    if (data.name !== undefined) {
      this.name = data.name;
    }
    if (data.replaceColor !== undefined) {
      this.replaceColor = data.replaceColor;
    }
    if (data.src !== undefined) {
      this.src = data.src;
    }
    if (data.width !== undefined) {
      this.width = data.width;
    }
  }
}
;// CONCATENATED MODULE: ../../shapes/image/dist/browser/ImagePreloader.js

class ImagePreloaderPlugin {
  constructor(engine) {
    this.id = "imagePreloader";
    this._engine = engine;
  }
  getPlugin() {
    return {};
  }
  loadOptions(options, source) {
    if (!source?.preload) {
      return;
    }
    if (!options.preload) {
      options.preload = [];
    }
    const preloadOptions = options.preload;
    for (const item of source.preload) {
      const existing = preloadOptions.find(t => t.name === item.name || t.src === item.src);
      if (existing) {
        existing.load(item);
      } else {
        const preload = new Preload();
        preload.load(item);
        preloadOptions.push(preload);
      }
    }
  }
  needsPlugin() {
    return true;
  }
}
;// CONCATENATED MODULE: ../../shapes/image/dist/browser/index.js




const extLength = 3;
function addLoadImageToEngine(engine) {
  if (engine.loadImage) {
    return;
  }
  engine.loadImage = async data => {
    if (!data.name && !data.src) {
      throw new Error(`${errorPrefix} no image source provided`);
    }
    if (!engine.images) {
      engine.images = [];
    }
    if (engine.images.find(t => t.name === data.name || t.source === data.src)) {
      return;
    }
    try {
      const image = {
        gif: data.gif ?? false,
        name: data.name ?? data.src,
        source: data.src,
        type: data.src.substring(data.src.length - extLength),
        error: false,
        loading: true,
        replaceColor: data.replaceColor,
        ratio: data.width && data.height ? data.width / data.height : undefined
      };
      engine.images.push(image);
      let imageFunc;
      if (data.gif) {
        imageFunc = loadGifImage;
      } else {
        imageFunc = data.replaceColor ? downloadSvgImage : loadImage;
      }
      await imageFunc(image);
    } catch {
      throw new Error(`${errorPrefix} ${data.name ?? data.src} not found`);
    }
  };
}
async function loadImageShape(engine, refresh = true) {
  addLoadImageToEngine(engine);
  const preloader = new ImagePreloaderPlugin(engine);
  await engine.addPlugin(preloader, refresh);
  await engine.addShape(["image", "images"], new ImageDrawer(engine), refresh);
}
;// CONCATENATED MODULE: ../../updaters/life/dist/browser/Options/Classes/LifeDelay.js

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
;// CONCATENATED MODULE: ../../updaters/life/dist/browser/Options/Classes/LifeDuration.js

class LifeDuration extends ValueWithRandom {
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
;// CONCATENATED MODULE: ../../updaters/life/dist/browser/Options/Classes/Life.js


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
;// CONCATENATED MODULE: ../../updaters/life/dist/browser/LifeUpdater.js


const noTime = 0,
  LifeUpdater_identity = 1,
  infiniteValue = -1,
  noLife = 0,
  minCanvasSize = 0;
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
      delay: container.retina.reduceFactor ? getRangeValue(lifeOptions.delay.value) * (lifeOptions.delay.sync ? LifeUpdater_identity : getRandom()) / container.retina.reduceFactor * millisecondsToSeconds : noTime,
      delayTime: noTime,
      duration: container.retina.reduceFactor ? getRangeValue(lifeOptions.duration.value) * (lifeOptions.duration.sync ? LifeUpdater_identity : getRandom()) / container.retina.reduceFactor * millisecondsToSeconds : noTime,
      time: noTime,
      count: lifeOptions.count
    };
    if (particle.life.duration <= noTime) {
      particle.life.duration = infiniteValue;
    }
    if (particle.life.count <= noTime) {
      particle.life.count = infiniteValue;
    }
    if (particle.life) {
      particle.spawning = particle.life.delay > noTime;
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
      options.life.load(source?.life);
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
        life.delayTime = noTime;
        life.time = noTime;
      } else {
        return;
      }
    }
    if (life.duration === infiniteValue) {
      return;
    }
    if (particle.spawning) {
      return;
    }
    if (justSpawned) {
      life.time = noTime;
    } else {
      life.time += delta.value;
    }
    if (life.time < life.duration) {
      return;
    }
    life.time = noTime;
    if (particle.life.count > noLife) {
      particle.life.count--;
    }
    if (particle.life.count === noLife) {
      particle.destroy();
      return;
    }
    const canvasSize = this.container.canvas.size,
      widthRange = setRangeValue(minCanvasSize, canvasSize.width),
      heightRange = setRangeValue(minCanvasSize, canvasSize.width);
    particle.position.x = randomInRange(widthRange);
    particle.position.y = randomInRange(heightRange);
    particle.spawning = true;
    life.delayTime = noTime;
    life.time = noTime;
    particle.reset();
    const lifeOptions = particle.options.life;
    if (lifeOptions) {
      life.delay = getRangeValue(lifeOptions.delay.value) * millisecondsToSeconds;
      life.duration = getRangeValue(lifeOptions.duration.value) * millisecondsToSeconds;
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/life/dist/browser/index.js

async function loadLifeUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("life", container => new LifeUpdater(container), refresh);
}
;// CONCATENATED MODULE: ../../shapes/line/dist/browser/LineDrawer.js
const LineDrawer_sides = 1;
class LineDrawer {
  draw(data) {
    const {
        context,
        particle,
        radius
      } = data,
      shapeData = particle.shapeData,
      centerY = 0;
    context.moveTo(-radius, centerY);
    context.lineTo(radius, centerY);
    context.lineCap = shapeData?.cap ?? "butt";
  }
  getSidesCount() {
    return LineDrawer_sides;
  }
}
;// CONCATENATED MODULE: ../../shapes/line/dist/browser/index.js

async function loadLineShape(engine, refresh = true) {
  await engine.addShape("line", new LineDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../move/parallax/dist/browser/ParallaxMover.js

const ParallaxMover_half = 0.5;
class ParallaxMover {
  init() {}
  isEnabled(particle) {
    return !isSsr() && !particle.destroyed && particle.container.actualOptions.interactivity.events.onHover.parallax.enable;
  }
  move(particle) {
    const container = particle.container,
      options = container.actualOptions,
      parallaxOptions = options.interactivity.events.onHover.parallax;
    if (isSsr() || !parallaxOptions.enable) {
      return;
    }
    const parallaxForce = parallaxOptions.force,
      mousePos = container.interactivity.mouse.position;
    if (!mousePos) {
      return;
    }
    const canvasSize = container.canvas.size,
      canvasCenter = {
        x: canvasSize.width * ParallaxMover_half,
        y: canvasSize.height * ParallaxMover_half
      },
      parallaxSmooth = parallaxOptions.smooth,
      factor = particle.getRadius() / parallaxForce,
      centerDistance = {
        x: (mousePos.x - canvasCenter.x) * factor,
        y: (mousePos.y - canvasCenter.y) * factor
      },
      {
        offset
      } = particle;
    offset.x += (centerDistance.x - offset.x) / parallaxSmooth;
    offset.y += (centerDistance.y - offset.y) / parallaxSmooth;
  }
}
;// CONCATENATED MODULE: ../../move/parallax/dist/browser/index.js

async function loadParallaxMover(engine, refresh = true) {
  await engine.addMover("parallax", () => new ParallaxMover(), refresh);
}
;// CONCATENATED MODULE: ../../interactions/particles/attract/dist/browser/Attractor.js

const attractFactor = 1000,
  browser_Attractor_identity = 1;
class Attractor_Attractor extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {}
  init() {}
  async interact(p1) {
    const container = this.container;
    if (p1.attractDistance === undefined) {
      p1.attractDistance = getRangeValue(p1.options.move.attract.distance) * container.retina.pixelRatio;
    }
    const distance = p1.attractDistance,
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
        ax = dx / (rotate.x * attractFactor),
        ay = dy / (rotate.y * attractFactor),
        p1Factor = p2.size.value / p1.size.value,
        p2Factor = browser_Attractor_identity / p1Factor;
      p1.velocity.x -= ax * p1Factor;
      p1.velocity.y -= ay * p1Factor;
      p2.velocity.x += ax * p2Factor;
      p2.velocity.y += ay * p2Factor;
    }
    await Promise.resolve();
  }
  isEnabled(particle) {
    return particle.options.move.attract.enable;
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/particles/attract/dist/browser/index.js

async function loadParticlesAttractInteraction(engine, refresh = true) {
  await engine.addInteractor("particlesAttract", container => new Attractor_Attractor(container), refresh);
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/browser/Absorb.js

const Absorb_half = 0.5,
  Absorb_absorbFactor = 10,
  minAbsorbFactor = 0;
function updateAbsorb(p1, r1, p2, r2, delta, pixelRatio) {
  const factor = clamp(p1.options.collisions.absorb.speed * delta.factor / Absorb_absorbFactor, minAbsorbFactor, r2);
  p1.size.value += factor * Absorb_half;
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
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/browser/Bounce.js

const fixBounceSpeed = p => {
  if (p.collisionMaxSpeed === undefined) {
    p.collisionMaxSpeed = getRangeValue(p.options.collisions.maxSpeed);
  }
  if (p.velocity.length > p.collisionMaxSpeed) {
    p.velocity.length = p.collisionMaxSpeed;
  }
};
function bounce(p1, p2) {
  circleBounce(circleBounceDataFromParticle(p1), circleBounceDataFromParticle(p2));
  fixBounceSpeed(p1);
  fixBounceSpeed(p2);
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/browser/Destroy.js

function destroy(p1, p2) {
  if (!p1.unbreakable && !p2.unbreakable) {
    bounce(p1, p2);
  }
  if (p1.getRadius() === undefined && p2.getRadius() !== undefined) {
    p1.destroy();
  } else if (p1.getRadius() !== undefined && p2.getRadius() === undefined) {
    p2.destroy();
  } else if (p1.getRadius() !== undefined && p2.getRadius() !== undefined) {
    const deleteP = p1.getRadius() >= p2.getRadius() ? p2 : p1;
    deleteP.destroy();
  }
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/browser/ResolveCollision.js



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
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/browser/Collider.js


const Collider_double = 2;
class Collider extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
  }
  clear() {}
  init() {}
  async interact(p1, delta) {
    if (p1.destroyed || p1.spawning) {
      return;
    }
    const container = this.container,
      pos1 = p1.getPosition(),
      radius1 = p1.getRadius(),
      query = container.particles.quadTree.queryCircle(pos1, radius1 * Collider_double);
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
    await Promise.resolve();
  }
  isEnabled(particle) {
    return particle.options.collisions.enable;
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/particles/collisions/dist/browser/index.js

async function loadParticlesCollisionsInteraction(engine, refresh = true) {
  await engine.addInteractor("particlesCollisions", container => new Collider(container), refresh);
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/browser/CircleWarp.js

const CircleWarp_double = 2;
class CircleWarp extends Circle {
  constructor(x, y, radius, canvasSize) {
    super(x, y, radius);
    this.canvasSize = canvasSize;
    this.canvasSize = {
      ...canvasSize
    };
  }
  contains(point) {
    const {
      width,
      height
    } = this.canvasSize;
    const {
      x,
      y
    } = point;
    return super.contains(point) || super.contains({
      x: x - width,
      y
    }) || super.contains({
      x: x - width,
      y: y - height
    }) || super.contains({
      x,
      y: y - height
    });
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
      const biggerCircle = new Circle(newPos.x, newPos.y, circle.radius * CircleWarp_double);
      return super.intersects(biggerCircle);
    } else if (rect.size !== undefined) {
      const rectSW = new Rectangle(newPos.x, newPos.y, rect.size.width * CircleWarp_double, rect.size.height * CircleWarp_double);
      return super.intersects(rectSW);
    }
    return false;
  }
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/browser/Options/Classes/LinksShadow.js

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
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/browser/Options/Classes/LinksTriangle.js

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
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/browser/Options/Classes/Links.js



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
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/browser/Linker.js



const Linker_squarePower = 2,
  opacityOffset = 1,
  Linker_origin = {
    x: 0,
    y: 0
  },
  Linker_minDistance = 0;
function getLinkDistance(pos1, pos2, optDistance, canvasSize, warp) {
  const {
    dx,
    dy,
    distance
  } = getDistances(pos1, pos2);
  if (!warp || distance <= optDistance) {
    return distance;
  }
  const absDiffs = {
      x: Math.abs(dx),
      y: Math.abs(dy)
    },
    warpDistances = {
      x: Math.min(absDiffs.x, canvasSize.width - absDiffs.x),
      y: Math.min(absDiffs.y, canvasSize.height - absDiffs.y)
    };
  return Math.sqrt(warpDistances.x ** Linker_squarePower + warpDistances.y ** Linker_squarePower);
}
class Linker extends ParticlesInteractorBase {
  constructor(container) {
    super(container);
    this._setColor = p1 => {
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
    };
    this.linkContainer = container;
  }
  clear() {}
  init() {
    this.linkContainer.particles.linksColor = undefined;
    this.linkContainer.particles.linksColors = new Map();
  }
  async interact(p1) {
    if (!p1.options.links) {
      return;
    }
    p1.links = [];
    const pos1 = p1.getPosition(),
      container = this.container,
      canvasSize = container.canvas.size;
    if (pos1.x < Linker_origin.x || pos1.y < Linker_origin.y || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
      return;
    }
    const linkOpt1 = p1.options.links,
      optOpacity = linkOpt1.opacity,
      optDistance = p1.retina.linksDistance ?? Linker_minDistance,
      warp = linkOpt1.warp,
      range = warp ? new CircleWarp(pos1.x, pos1.y, optDistance, canvasSize) : new Circle(pos1.x, pos1.y, optDistance),
      query = container.particles.quadTree.query(range);
    for (const p2 of query) {
      const linkOpt2 = p2.options.links;
      if (p1 === p2 || !linkOpt2?.enable || linkOpt1.id !== linkOpt2.id || p2.spawning || p2.destroyed || !p2.links || p1.links.some(t => t.destination === p2) || p2.links.some(t => t.destination === p1)) {
        continue;
      }
      const pos2 = p2.getPosition();
      if (pos2.x < Linker_origin.x || pos2.y < Linker_origin.y || pos2.x > canvasSize.width || pos2.y > canvasSize.height) {
        continue;
      }
      const distance = getLinkDistance(pos1, pos2, optDistance, canvasSize, warp && linkOpt2.warp);
      if (distance > optDistance) {
        continue;
      }
      const opacityLine = (opacityOffset - distance / optDistance) * optOpacity;
      this._setColor(p1);
      p1.links.push({
        destination: p2,
        opacity: opacityLine
      });
    }
    await Promise.resolve();
  }
  isEnabled(particle) {
    return !!particle.options.links?.enable;
  }
  loadParticlesOptions(options, ...sources) {
    if (!options.links) {
      options.links = new Links();
    }
    for (const source of sources) {
      options.links.load(source?.links);
    }
  }
  reset() {}
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/browser/interaction.js

async function loadLinksInteraction(engine, refresh = true) {
  await engine.addInteractor("particlesLinks", container => new Linker(container), refresh);
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/browser/Utils.js

function drawTriangle(context, p1, p2, p3) {
  context.beginPath();
  context.moveTo(p1.x, p1.y);
  context.lineTo(p2.x, p2.y);
  context.lineTo(p3.x, p3.y);
  context.closePath();
}
function drawLinkLine(params) {
  let drawn = false;
  const {
    begin,
    end,
    maxDistance,
    context,
    canvasSize,
    width,
    backgroundMask,
    colorLine,
    opacity,
    links
  } = params;
  if (getDistance(begin, end) <= maxDistance) {
    drawLine(context, begin, end);
    drawn = true;
  } else if (links.warp) {
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
  if (backgroundMask.enable) {
    context.globalCompositeOperation = backgroundMask.composite;
  }
  context.strokeStyle = getStyleFromRgb(colorLine, opacity);
  const {
    shadow
  } = links;
  if (shadow.enable) {
    const shadowColor = rangeColorToRgb(shadow.color);
    if (shadowColor) {
      context.shadowBlur = shadow.blur;
      context.shadowColor = getStyleFromRgb(shadowColor);
    }
  }
  context.stroke();
}
function drawLinkTriangle(params) {
  const {
    context,
    pos1,
    pos2,
    pos3,
    backgroundMask,
    colorTriangle,
    opacityTriangle
  } = params;
  drawTriangle(context, pos1, pos2, pos3);
  if (backgroundMask.enable) {
    context.globalCompositeOperation = backgroundMask.composite;
  }
  context.fillStyle = getStyleFromRgb(colorTriangle, opacityTriangle);
  context.fill();
}
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
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/browser/LinkInstance.js


const LinkInstance_minOpacity = 0,
  minWidth = 0,
  LinkInstance_minDistance = 0,
  LinkInstance_half = 0.5;
class LinkInstance {
  constructor(container) {
    this.container = container;
    this._drawLinkLine = (p1, link) => {
      const p1LinksOptions = p1.options.links;
      if (!p1LinksOptions?.enable) {
        return;
      }
      const container = this.container,
        options = container.actualOptions,
        p2 = link.destination,
        pos1 = p1.getPosition(),
        pos2 = p2.getPosition();
      let opacity = link.opacity;
      container.canvas.draw(ctx => {
        let colorLine;
        const twinkle = p1.options.twinkle?.lines;
        if (twinkle?.enable) {
          const twinkleFreq = twinkle.frequency,
            twinkleRgb = rangeColorToRgb(twinkle.color),
            twinkling = getRandom() < twinkleFreq;
          if (twinkling && twinkleRgb) {
            colorLine = twinkleRgb;
            opacity = getRangeValue(twinkle.opacity);
          }
        }
        if (!colorLine) {
          const linkColor = p1LinksOptions.id !== undefined ? container.particles.linksColors.get(p1LinksOptions.id) : container.particles.linksColor;
          colorLine = getLinkColor(p1, p2, linkColor);
        }
        if (!colorLine) {
          return;
        }
        const width = p1.retina.linksWidth ?? minWidth,
          maxDistance = p1.retina.linksDistance ?? LinkInstance_minDistance,
          {
            backgroundMask
          } = options;
        drawLinkLine({
          context: ctx,
          width,
          begin: pos1,
          end: pos2,
          maxDistance,
          canvasSize: container.canvas.size,
          links: p1LinksOptions,
          backgroundMask: backgroundMask,
          colorLine,
          opacity
        });
      });
    };
    this._drawLinkTriangle = (p1, link1, link2) => {
      const linksOptions = p1.options.links;
      if (!linksOptions?.enable) {
        return;
      }
      const triangleOptions = linksOptions.triangles;
      if (!triangleOptions.enable) {
        return;
      }
      const container = this.container,
        options = container.actualOptions,
        p2 = link1.destination,
        p3 = link2.destination,
        opacityTriangle = triangleOptions.opacity ?? (link1.opacity + link2.opacity) * LinkInstance_half;
      if (opacityTriangle <= LinkInstance_minOpacity) {
        return;
      }
      container.canvas.draw(ctx => {
        const pos1 = p1.getPosition(),
          pos2 = p2.getPosition(),
          pos3 = p3.getPosition(),
          linksDistance = p1.retina.linksDistance ?? LinkInstance_minDistance;
        if (getDistance(pos1, pos2) > linksDistance || getDistance(pos3, pos2) > linksDistance || getDistance(pos3, pos1) > linksDistance) {
          return;
        }
        let colorTriangle = rangeColorToRgb(triangleOptions.color);
        if (!colorTriangle) {
          const linkColor = linksOptions.id !== undefined ? container.particles.linksColors.get(linksOptions.id) : container.particles.linksColor;
          colorTriangle = getLinkColor(p1, p2, linkColor);
        }
        if (!colorTriangle) {
          return;
        }
        drawLinkTriangle({
          context: ctx,
          pos1,
          pos2,
          pos3,
          backgroundMask: options.backgroundMask,
          colorTriangle,
          opacityTriangle
        });
      });
    };
    this._drawTriangles = (options, p1, link, p1Links) => {
      const p2 = link.destination;
      if (!(options.links?.triangles.enable && p2.options.links?.triangles.enable)) {
        return;
      }
      const vertices = p2.links?.filter(t => {
        const linkFreq = this._getLinkFrequency(p2, t.destination),
          minCount = 0;
        return p2.options.links && linkFreq <= p2.options.links.frequency && p1Links.findIndex(l => l.destination === t.destination) >= minCount;
      });
      if (!vertices?.length) {
        return;
      }
      for (const vertex of vertices) {
        const p3 = vertex.destination,
          triangleFreq = this._getTriangleFrequency(p1, p2, p3);
        if (triangleFreq > options.links.triangles.frequency) {
          continue;
        }
        this._drawLinkTriangle(p1, link, vertex);
      }
    };
    this._getLinkFrequency = (p1, p2) => {
      return setLinkFrequency([p1, p2], this._freqs.links);
    };
    this._getTriangleFrequency = (p1, p2, p3) => {
      return setLinkFrequency([p1, p2, p3], this._freqs.triangles);
    };
    this._freqs = {
      links: new Map(),
      triangles: new Map()
    };
  }
  drawParticle(context, particle) {
    const {
      links,
      options
    } = particle;
    if (!links?.length) {
      return;
    }
    const p1Links = links.filter(l => options.links && this._getLinkFrequency(particle, l.destination) <= options.links.frequency);
    for (const link of p1Links) {
      this._drawTriangles(options, particle, link, p1Links);
      if (link.opacity > LinkInstance_minOpacity && (particle.retina.linksWidth ?? minWidth) > minWidth) {
        this._drawLinkLine(particle, link);
      }
    }
  }
  async init() {
    this._freqs.links = new Map();
    this._freqs.triangles = new Map();
    await Promise.resolve();
  }
  particleCreated(particle) {
    particle.links = [];
    if (!particle.options.links) {
      return;
    }
    const ratio = this.container.retina.pixelRatio,
      {
        retina
      } = particle,
      {
        distance,
        width
      } = particle.options.links;
    retina.linksDistance = distance * ratio;
    retina.linksWidth = width * ratio;
  }
  particleDestroyed(particle) {
    particle.links = [];
  }
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/browser/plugin.js

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
async function loadLinksPlugin(engine, refresh = true) {
  const plugin = new LinksPlugin();
  await engine.addPlugin(plugin, refresh);
}
;// CONCATENATED MODULE: ../../interactions/particles/links/dist/browser/index.js


async function loadParticlesLinksInteraction(engine, refresh = true) {
  await loadLinksInteraction(engine, refresh);
  await loadLinksPlugin(engine, refresh);
}






;// CONCATENATED MODULE: ../../shapes/polygon/dist/browser/PolygonDrawerBase.js

const piDeg = 180,
  PolygonDrawerBase_origin = {
    x: 0,
    y: 0
  },
  defaultSides = 5,
  sidesOffset = 2;
class PolygonDrawerBase {
  draw(data) {
    const {
        context,
        particle,
        radius
      } = data,
      start = this.getCenter(particle, radius),
      side = this.getSidesData(particle, radius),
      sideCount = side.count.numerator * side.count.denominator,
      decimalSides = side.count.numerator / side.count.denominator,
      interiorAngleDegrees = piDeg * (decimalSides - sidesOffset) / decimalSides,
      interiorAngle = Math.PI - degToRad(interiorAngleDegrees);
    if (!context) {
      return;
    }
    context.beginPath();
    context.translate(start.x, start.y);
    context.moveTo(PolygonDrawerBase_origin.x, PolygonDrawerBase_origin.y);
    for (let i = 0; i < sideCount; i++) {
      context.lineTo(side.length, PolygonDrawerBase_origin.y);
      context.translate(side.length, PolygonDrawerBase_origin.y);
      context.rotate(interiorAngle);
    }
  }
  getSidesCount(particle) {
    const polygon = particle.shapeData;
    return Math.round(getRangeValue(polygon?.sides ?? defaultSides));
  }
}
;// CONCATENATED MODULE: ../../shapes/polygon/dist/browser/PolygonDrawer.js

const sidesCenterFactor = 3.5,
  yFactor = 2.66,
  sidesFactor = 3;
class PolygonDrawer extends PolygonDrawerBase {
  getCenter(particle, radius) {
    return {
      x: -radius / (particle.sides / sidesCenterFactor),
      y: -radius / (yFactor / sidesCenterFactor)
    };
  }
  getSidesData(particle, radius) {
    const sides = particle.sides;
    return {
      count: {
        denominator: 1,
        numerator: sides
      },
      length: radius * yFactor / (sides / sidesFactor)
    };
  }
}
;// CONCATENATED MODULE: ../../shapes/polygon/dist/browser/TriangleDrawer.js

const TriangleDrawer_yFactor = 1.66,
  TriangleDrawer_sides = 3,
  TriangleDrawer_double = 2;
class TriangleDrawer extends PolygonDrawerBase {
  getCenter(particle, radius) {
    return {
      x: -radius,
      y: radius / TriangleDrawer_yFactor
    };
  }
  getSidesCount() {
    return TriangleDrawer_sides;
  }
  getSidesData(particle, radius) {
    const diameter = radius * TriangleDrawer_double;
    return {
      count: {
        denominator: 2,
        numerator: 3
      },
      length: diameter
    };
  }
}
;// CONCATENATED MODULE: ../../shapes/polygon/dist/browser/index.js


async function loadGenericPolygonShape(engine, refresh = true) {
  await engine.addShape("polygon", new PolygonDrawer(), refresh);
}
async function loadTriangleShape(engine, refresh = true) {
  await engine.addShape("triangle", new TriangleDrawer(), refresh);
}
async function loadPolygonShape(engine, refresh = true) {
  await loadGenericPolygonShape(engine, refresh);
  await loadTriangleShape(engine, refresh);
}
;// CONCATENATED MODULE: ../../updaters/rotate/dist/browser/Options/Classes/RotateAnimation.js

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
;// CONCATENATED MODULE: ../../updaters/rotate/dist/browser/Options/Classes/Rotate.js


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
;// CONCATENATED MODULE: ../../updaters/rotate/dist/browser/RotateUpdater.js


const RotateUpdater_double = 2,
  RotateUpdater_doublePI = Math.PI * RotateUpdater_double,
  RotateUpdater_identity = 1,
  doublePIDeg = 360;
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
      value: degToRad(getRangeValue(rotateOptions.value)),
      min: 0,
      max: RotateUpdater_doublePI
    };
    particle.pathRotation = rotateOptions.path;
    let rotateDirection = rotateOptions.direction;
    if (rotateDirection === "random") {
      const index = Math.floor(getRandom() * RotateUpdater_double),
        minIndex = 0;
      rotateDirection = index > minIndex ? "counter-clockwise" : "clockwise";
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
      particle.rotate.decay = RotateUpdater_identity - getRangeValue(rotateAnimation.decay);
      particle.rotate.velocity = getRangeValue(rotateAnimation.speed) / doublePIDeg * this.container.retina.reduceFactor;
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
      options.rotate.load(source?.rotate);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    if (!particle.rotate) {
      return;
    }
    updateAnimation(particle, particle.rotate, false, "none", delta);
    particle.rotation = particle.rotate.value;
  }
}
;// CONCATENATED MODULE: ../../updaters/rotate/dist/browser/index.js

async function loadRotateUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("rotate", container => new RotateUpdater(container), refresh);
}
;// CONCATENATED MODULE: ../../shapes/square/dist/browser/SquareDrawer.js
const fixFactorSquared = 2,
  fixFactor = Math.sqrt(fixFactorSquared),
  SquareDrawer_sides = 4,
  SquareDrawer_double = 2;
class SquareDrawer {
  draw(data) {
    const {
        context,
        radius
      } = data,
      fixedRadius = radius / fixFactor,
      fixedDiameter = fixedRadius * SquareDrawer_double;
    context.rect(-fixedRadius, -fixedRadius, fixedDiameter, fixedDiameter);
  }
  getSidesCount() {
    return SquareDrawer_sides;
  }
}
;// CONCATENATED MODULE: ../../shapes/square/dist/browser/index.js

async function loadSquareShape(engine, refresh = true) {
  await engine.addShape(["edge", "square"], new SquareDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../shapes/star/dist/browser/StarDrawer.js

const defaultInset = 2,
  StarDrawer_origin = {
    x: 0,
    y: 0
  },
  StarDrawer_defaultSides = 5;
class StarDrawer {
  draw(data) {
    const {
        context,
        particle,
        radius
      } = data,
      sides = particle.sides,
      inset = particle.starInset ?? defaultInset;
    context.moveTo(StarDrawer_origin.x, StarDrawer_origin.y - radius);
    for (let i = 0; i < sides; i++) {
      context.rotate(Math.PI / sides);
      context.lineTo(StarDrawer_origin.x, StarDrawer_origin.y - radius * inset);
      context.rotate(Math.PI / sides);
      context.lineTo(StarDrawer_origin.x, StarDrawer_origin.y - radius);
    }
  }
  getSidesCount(particle) {
    const star = particle.shapeData;
    return Math.round(getRangeValue(star?.sides ?? StarDrawer_defaultSides));
  }
  particleInit(container, particle) {
    const star = particle.shapeData;
    particle.starInset = getRangeValue(star?.inset ?? defaultInset);
  }
}
;// CONCATENATED MODULE: ../../shapes/star/dist/browser/index.js

async function loadStarShape(engine, refresh = true) {
  await engine.addShape("star", new StarDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../updaters/strokeColor/dist/browser/StrokeColorUpdater.js

const StrokeColorUpdater_defaultOpacity = 1;
class StrokeColorUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const container = this.container,
      options = particle.options;
    const stroke = itemFromSingleOrMultiple(options.stroke, particle.id, options.reduceDuplicates);
    particle.strokeWidth = getRangeValue(stroke.width) * container.retina.pixelRatio;
    particle.strokeOpacity = getRangeValue(stroke.opacity ?? StrokeColorUpdater_defaultOpacity);
    particle.strokeAnimation = stroke.color?.animation;
    const strokeHslColor = rangeColorToHsl(stroke.color) ?? particle.getFillColor();
    if (strokeHslColor) {
      particle.strokeColor = getHslAnimationFromHsl(strokeHslColor, particle.strokeAnimation, container.retina.reduceFactor);
    }
  }
  isEnabled(particle) {
    const color = particle.strokeAnimation,
      {
        strokeColor
      } = particle;
    return !particle.destroyed && !particle.spawning && !!color && (strokeColor?.h.value !== undefined && strokeColor.h.enable || strokeColor?.s.value !== undefined && strokeColor.s.enable || strokeColor?.l.value !== undefined && strokeColor.l.enable);
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateColor(particle.strokeColor, delta);
  }
}
;// CONCATENATED MODULE: ../../updaters/strokeColor/dist/browser/index.js

async function loadStrokeColorUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("strokeColor", container => new StrokeColorUpdater(container), refresh);
}
;// CONCATENATED MODULE: ../slim/dist/browser/index.js

























async function loadSlim(engine, refresh = true) {
  await loadParallaxMover(engine, false);
  await loadExternalAttractInteraction(engine, false);
  await loadExternalBounceInteraction(engine, false);
  await loadExternalBubbleInteraction(engine, false);
  await loadExternalConnectInteraction(engine, false);
  await loadExternalGrabInteraction(engine, false);
  await loadExternalPauseInteraction(engine, false);
  await loadExternalPushInteraction(engine, false);
  await loadExternalRemoveInteraction(engine, false);
  await loadExternalRepulseInteraction(engine, false);
  await loadExternalSlowInteraction(engine, false);
  await loadParticlesAttractInteraction(engine, false);
  await loadParticlesCollisionsInteraction(engine, false);
  await loadParticlesLinksInteraction(engine, false);
  await loadEasingQuadPlugin();
  await loadEmojiShape(engine, false);
  await loadImageShape(engine, false);
  await loadLineShape(engine, false);
  await loadPolygonShape(engine, false);
  await loadSquareShape(engine, false);
  await loadStarShape(engine, false);
  await loadLifeUpdater(engine, false);
  await loadRotateUpdater(engine, false);
  await loadStrokeColorUpdater(engine, false);
  await loadBasic(engine, refresh);
}
;// CONCATENATED MODULE: ../../shapes/text/dist/browser/TextDrawer.js

const TextDrawer_validTypes = ["text", "character", "char", "multiline-text"];
const TextDrawer_double = 2,
  TextDrawer_half = 0.5;
class TextDrawer {
  constructor() {
    this._drawLine = (context, line, radius, opacity, index, fill) => {
      const offsetX = line.length * radius * TextDrawer_half,
        pos = {
          x: -offsetX,
          y: radius * TextDrawer_half
        },
        diameter = radius * TextDrawer_double;
      if (fill) {
        context.fillText(line, pos.x, pos.y + diameter * index);
      } else {
        context.strokeText(line, pos.x, pos.y + diameter * index);
      }
    };
  }
  draw(data) {
    const {
        context,
        particle,
        radius,
        opacity
      } = data,
      character = particle.shapeData;
    if (!character) {
      return;
    }
    const textData = character.value;
    if (textData === undefined) {
      return;
    }
    if (particle.text === undefined) {
      particle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
    }
    const text = particle.text,
      style = character.style ?? "",
      weight = character.weight ?? "400",
      size = Math.round(radius) * TextDrawer_double,
      font = character.font ?? "Verdana",
      fill = particle.shapeFill;
    const lines = text?.split("\n");
    if (!lines) {
      return;
    }
    context.font = `${style} ${weight} ${size}px "${font}"`;
    context.globalAlpha = opacity;
    for (let i = 0; i < lines.length; i++) {
      this._drawLine(context, lines[i], radius, opacity, i, fill);
    }
    context.globalAlpha = 1;
  }
  async init(container) {
    const options = container.actualOptions;
    if (TextDrawer_validTypes.find(t => isInArray(t, options.particles.shape.type))) {
      const shapeOptions = TextDrawer_validTypes.map(t => options.particles.shape.options[t]).find(t => !!t),
        promises = [];
      executeOnSingleOrMultiple(shapeOptions, shape => {
        promises.push(loadFont(shape.font, shape.weight));
      });
      await Promise.all(promises);
    }
  }
  particleInit(container, particle) {
    if (!particle.shape || !TextDrawer_validTypes.includes(particle.shape)) {
      return;
    }
    const character = particle.shapeData;
    if (character === undefined) {
      return;
    }
    const textData = character.value;
    if (textData === undefined) {
      return;
    }
    particle.text = itemFromSingleOrMultiple(textData, particle.randomIndexData);
  }
}
;// CONCATENATED MODULE: ../../shapes/text/dist/browser/index.js

async function loadTextShape(engine, refresh = true) {
  await engine.addShape(TextDrawer_validTypes, new TextDrawer(), refresh);
}
;// CONCATENATED MODULE: ../../updaters/tilt/dist/browser/Options/Classes/TiltAnimation.js

class TiltAnimation {
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
;// CONCATENATED MODULE: ../../updaters/tilt/dist/browser/Options/Classes/Tilt.js


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
;// CONCATENATED MODULE: ../../updaters/tilt/dist/browser/TiltUpdater.js


const TiltUpdater_identity = 1,
  TiltUpdater_double = 2,
  TiltUpdater_doublePI = Math.PI * TiltUpdater_double,
  TiltUpdater_maxAngle = 360;
class TiltUpdater {
  constructor(container) {
    this.container = container;
  }
  getTransformValues(particle) {
    const tilt = particle.tilt?.enable && particle.tilt;
    return {
      b: tilt ? Math.cos(tilt.value) * tilt.cosDirection : undefined,
      c: tilt ? Math.sin(tilt.value) * tilt.sinDirection : undefined
    };
  }
  init(particle) {
    const tiltOptions = particle.options.tilt;
    if (!tiltOptions) {
      return;
    }
    particle.tilt = {
      enable: tiltOptions.enable,
      value: degToRad(getRangeValue(tiltOptions.value)),
      sinDirection: getRandom() >= halfRandom ? TiltUpdater_identity : -TiltUpdater_identity,
      cosDirection: getRandom() >= halfRandom ? TiltUpdater_identity : -TiltUpdater_identity,
      min: 0,
      max: TiltUpdater_doublePI
    };
    let tiltDirection = tiltOptions.direction;
    if (tiltDirection === "random") {
      const index = Math.floor(getRandom() * TiltUpdater_double),
        minIndex = 0;
      tiltDirection = index > minIndex ? "counter-clockwise" : "clockwise";
    }
    switch (tiltDirection) {
      case "counter-clockwise":
      case "counterClockwise":
        particle.tilt.status = "decreasing";
        break;
      case "clockwise":
        particle.tilt.status = "increasing";
        break;
    }
    const tiltAnimation = particle.options.tilt?.animation;
    if (tiltAnimation?.enable) {
      particle.tilt.decay = TiltUpdater_identity - getRangeValue(tiltAnimation.decay);
      particle.tilt.velocity = getRangeValue(tiltAnimation.speed) / TiltUpdater_maxAngle * this.container.retina.reduceFactor;
      if (!tiltAnimation.sync) {
        particle.tilt.velocity *= getRandom();
      }
    }
  }
  isEnabled(particle) {
    const tiltAnimation = particle.options.tilt?.animation;
    return !particle.destroyed && !particle.spawning && !!tiltAnimation?.enable;
  }
  loadOptions(options, ...sources) {
    if (!options.tilt) {
      options.tilt = new Tilt();
    }
    for (const source of sources) {
      options.tilt.load(source?.tilt);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle) || !particle.tilt) {
      return;
    }
    updateAnimation(particle, particle.tilt, false, "none", delta);
  }
}
;// CONCATENATED MODULE: ../../updaters/tilt/dist/browser/index.js

async function loadTiltUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("tilt", container => new TiltUpdater(container), refresh);
}
;// CONCATENATED MODULE: ../../updaters/twinkle/dist/browser/Options/Classes/TwinkleValues.js

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
;// CONCATENATED MODULE: ../../updaters/twinkle/dist/browser/Options/Classes/Twinkle.js

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
;// CONCATENATED MODULE: ../../updaters/twinkle/dist/browser/TwinkleUpdater.js


class TwinkleUpdater {
  getColorStyles(particle, context, radius, opacity) {
    const pOptions = particle.options,
      twinkleOptions = pOptions.twinkle;
    if (!twinkleOptions) {
      return {};
    }
    const twinkle = twinkleOptions.particles,
      twinkling = twinkle.enable && getRandom() < twinkle.frequency,
      zIndexOptions = particle.options.zIndex,
      zOffset = 1,
      zOpacityFactor = (zOffset - particle.zIndexFactor) ** zIndexOptions.opacityRate,
      twinklingOpacity = twinkling ? getRangeValue(twinkle.opacity) * zOpacityFactor : opacity,
      twinkleRgb = rangeColorToHsl(twinkle.color),
      twinkleStyle = twinkleRgb ? getStyleFromHsl(twinkleRgb, twinklingOpacity) : undefined,
      res = {},
      needsTwinkle = twinkling && twinkleStyle;
    res.fill = needsTwinkle ? twinkleStyle : undefined;
    res.stroke = needsTwinkle ? twinkleStyle : undefined;
    return res;
  }
  init() {}
  isEnabled(particle) {
    const pOptions = particle.options,
      twinkleOptions = pOptions.twinkle;
    if (!twinkleOptions) {
      return false;
    }
    return twinkleOptions.particles.enable;
  }
  loadOptions(options, ...sources) {
    if (!options.twinkle) {
      options.twinkle = new Twinkle();
    }
    for (const source of sources) {
      options.twinkle.load(source?.twinkle);
    }
  }
  update() {}
}
;// CONCATENATED MODULE: ../../updaters/twinkle/dist/browser/index.js

async function loadTwinkleUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("twinkle", () => new TwinkleUpdater(), refresh);
}
;// CONCATENATED MODULE: ../../updaters/wobble/dist/browser/Options/Classes/WobbleSpeed.js

class WobbleSpeed {
  constructor() {
    this.angle = 50;
    this.move = 10;
  }
  load(data) {
    if (!data) {
      return;
    }
    if (data.angle !== undefined) {
      this.angle = setRangeValue(data.angle);
    }
    if (data.move !== undefined) {
      this.move = setRangeValue(data.move);
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/wobble/dist/browser/Options/Classes/Wobble.js


class Wobble {
  constructor() {
    this.distance = 5;
    this.enable = false;
    this.speed = new WobbleSpeed();
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
      if (isNumber(data.speed)) {
        this.speed.load({
          angle: data.speed
        });
      } else {
        const rangeSpeed = data.speed;
        if (rangeSpeed.min !== undefined) {
          this.speed.load({
            angle: rangeSpeed
          });
        } else {
          this.speed.load(data.speed);
        }
      }
    }
  }
}
;// CONCATENATED MODULE: ../../updaters/wobble/dist/browser/Utils.js

const defaultDistance = 0,
  browser_Utils_double = 2,
  browser_Utils_doublePI = Math.PI * browser_Utils_double,
  distanceFactor = 60;
function updateWobble(particle, delta) {
  const {
      wobble: wobbleOptions
    } = particle.options,
    {
      wobble
    } = particle;
  if (!wobbleOptions?.enable || !wobble) {
    return;
  }
  const angleSpeed = wobble.angleSpeed * delta.factor,
    moveSpeed = wobble.moveSpeed * delta.factor,
    distance = moveSpeed * ((particle.retina.wobbleDistance ?? defaultDistance) * delta.factor) / (millisecondsToSeconds / distanceFactor),
    max = browser_Utils_doublePI,
    {
      position
    } = particle;
  wobble.angle += angleSpeed;
  if (wobble.angle > max) {
    wobble.angle -= max;
  }
  position.x += distance * Math.cos(wobble.angle);
  position.y += distance * Math.abs(Math.sin(wobble.angle));
}
;// CONCATENATED MODULE: ../../updaters/wobble/dist/browser/WobbleUpdater.js



const WobbleUpdater_double = 2,
  WobbleUpdater_doublePI = Math.PI * WobbleUpdater_double,
  WobbleUpdater_maxAngle = 360,
  WobbleUpdater_moveSpeedFactor = 10,
  WobbleUpdater_defaultDistance = 0;
class WobbleUpdater {
  constructor(container) {
    this.container = container;
  }
  init(particle) {
    const wobbleOpt = particle.options.wobble;
    if (wobbleOpt?.enable) {
      particle.wobble = {
        angle: getRandom() * WobbleUpdater_doublePI,
        angleSpeed: getRangeValue(wobbleOpt.speed.angle) / WobbleUpdater_maxAngle,
        moveSpeed: getRangeValue(wobbleOpt.speed.move) / WobbleUpdater_moveSpeedFactor
      };
    } else {
      particle.wobble = {
        angle: 0,
        angleSpeed: 0,
        moveSpeed: 0
      };
    }
    particle.retina.wobbleDistance = getRangeValue(wobbleOpt?.distance ?? WobbleUpdater_defaultDistance) * this.container.retina.pixelRatio;
  }
  isEnabled(particle) {
    return !particle.destroyed && !particle.spawning && !!particle.options.wobble?.enable;
  }
  loadOptions(options, ...sources) {
    if (!options.wobble) {
      options.wobble = new Wobble();
    }
    for (const source of sources) {
      options.wobble.load(source?.wobble);
    }
  }
  update(particle, delta) {
    if (!this.isEnabled(particle)) {
      return;
    }
    updateWobble(particle, delta);
  }
}
;// CONCATENATED MODULE: ../../updaters/wobble/dist/browser/index.js

async function loadWobbleUpdater(engine, refresh = true) {
  await engine.addParticleUpdater("wobble", container => new WobbleUpdater(container), refresh);
}
;// CONCATENATED MODULE: ./dist/browser/index.js












async function loadFull(engine, refresh = true) {
  await loadDestroyUpdater(engine, false);
  await loadRollUpdater(engine, false);
  await loadTiltUpdater(engine, false);
  await loadTwinkleUpdater(engine, false);
  await loadWobbleUpdater(engine, false);
  await loadTextShape(engine, false);
  await loadExternalTrailInteraction(engine, false);
  await loadAbsorbersPlugin(engine, false);
  await loadEmittersPlugin(engine, false);
  await loadEmittersShapeCircle(engine, false);
  await loadEmittersShapeSquare(engine, false);
  await loadSlim(engine, refresh);
}
;// CONCATENATED MODULE: ./dist/browser/bundle.js


void loadFull(tsParticles);



/******/ 	return __webpack_exports__;
/******/ })()
;
});