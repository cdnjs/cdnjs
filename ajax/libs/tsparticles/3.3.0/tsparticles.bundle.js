/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v3.3.0
 */
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
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
/******/ 	var __webpack_modules__ = ({

/***/ "./dist/browser/bundle.js":
/*!********************************!*\
  !*** ./dist/browser/bundle.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AnimatableColor: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.AnimatableColor),\n/* harmony export */   AnimationOptions: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.AnimationOptions),\n/* harmony export */   AnimationValueWithRandom: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.AnimationValueWithRandom),\n/* harmony export */   Background: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Background),\n/* harmony export */   BackgroundMask: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.BackgroundMask),\n/* harmony export */   BackgroundMaskCover: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.BackgroundMaskCover),\n/* harmony export */   BaseRange: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.BaseRange),\n/* harmony export */   Circle: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Circle),\n/* harmony export */   ClickEvent: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ClickEvent),\n/* harmony export */   Collisions: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Collisions),\n/* harmony export */   CollisionsAbsorb: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.CollisionsAbsorb),\n/* harmony export */   CollisionsOverlap: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.CollisionsOverlap),\n/* harmony export */   ColorAnimation: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ColorAnimation),\n/* harmony export */   DivEvent: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.DivEvent),\n/* harmony export */   Events: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Events),\n/* harmony export */   ExternalInteractorBase: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ExternalInteractorBase),\n/* harmony export */   FullScreen: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.FullScreen),\n/* harmony export */   HoverEvent: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.HoverEvent),\n/* harmony export */   HslAnimation: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.HslAnimation),\n/* harmony export */   HslColorManager: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.HslColorManager),\n/* harmony export */   Interactivity: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Interactivity),\n/* harmony export */   ManualParticle: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ManualParticle),\n/* harmony export */   Modes: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Modes),\n/* harmony export */   Move: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Move),\n/* harmony export */   MoveAngle: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.MoveAngle),\n/* harmony export */   MoveAttract: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.MoveAttract),\n/* harmony export */   MoveCenter: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.MoveCenter),\n/* harmony export */   MoveGravity: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.MoveGravity),\n/* harmony export */   MovePath: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.MovePath),\n/* harmony export */   MoveTrail: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.MoveTrail),\n/* harmony export */   Opacity: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Opacity),\n/* harmony export */   OpacityAnimation: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.OpacityAnimation),\n/* harmony export */   Options: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Options),\n/* harmony export */   OptionsColor: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.OptionsColor),\n/* harmony export */   OutModes: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.OutModes),\n/* harmony export */   Parallax: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Parallax),\n/* harmony export */   ParticlesBounce: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ParticlesBounce),\n/* harmony export */   ParticlesBounceFactor: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ParticlesBounceFactor),\n/* harmony export */   ParticlesDensity: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ParticlesDensity),\n/* harmony export */   ParticlesInteractorBase: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ParticlesInteractorBase),\n/* harmony export */   ParticlesNumber: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ParticlesNumber),\n/* harmony export */   ParticlesNumberLimit: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ParticlesNumberLimit),\n/* harmony export */   ParticlesOptions: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ParticlesOptions),\n/* harmony export */   Point: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Point),\n/* harmony export */   RangedAnimationOptions: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.RangedAnimationOptions),\n/* harmony export */   RangedAnimationValueWithRandom: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.RangedAnimationValueWithRandom),\n/* harmony export */   Rectangle: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Rectangle),\n/* harmony export */   ResizeEvent: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ResizeEvent),\n/* harmony export */   Responsive: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Responsive),\n/* harmony export */   RgbColorManager: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.RgbColorManager),\n/* harmony export */   Shadow: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Shadow),\n/* harmony export */   Shape: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Shape),\n/* harmony export */   Size: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Size),\n/* harmony export */   SizeAnimation: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.SizeAnimation),\n/* harmony export */   Spin: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Spin),\n/* harmony export */   Stroke: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Stroke),\n/* harmony export */   Theme: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Theme),\n/* harmony export */   ThemeDefault: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ThemeDefault),\n/* harmony export */   ValueWithRandom: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ValueWithRandom),\n/* harmony export */   Vector: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector),\n/* harmony export */   Vector3d: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.Vector3d),\n/* harmony export */   ZIndex: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.ZIndex),\n/* harmony export */   addColorManager: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.addColorManager),\n/* harmony export */   addEasing: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.addEasing),\n/* harmony export */   alterHsl: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.alterHsl),\n/* harmony export */   areBoundsInside: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.areBoundsInside),\n/* harmony export */   arrayRandomIndex: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.arrayRandomIndex),\n/* harmony export */   calcExactPositionOrRandomFromSize: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.calcExactPositionOrRandomFromSize),\n/* harmony export */   calcExactPositionOrRandomFromSizeRanged: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.calcExactPositionOrRandomFromSizeRanged),\n/* harmony export */   calcPositionFromSize: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.calcPositionFromSize),\n/* harmony export */   calcPositionOrRandomFromSize: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.calcPositionOrRandomFromSize),\n/* harmony export */   calcPositionOrRandomFromSizeRanged: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.calcPositionOrRandomFromSizeRanged),\n/* harmony export */   calculateBounds: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.calculateBounds),\n/* harmony export */   circleBounce: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.circleBounce),\n/* harmony export */   circleBounceDataFromParticle: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.circleBounceDataFromParticle),\n/* harmony export */   clamp: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.clamp),\n/* harmony export */   clear: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.clear),\n/* harmony export */   collisionVelocity: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.collisionVelocity),\n/* harmony export */   colorMix: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.colorMix),\n/* harmony export */   colorToHsl: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.colorToHsl),\n/* harmony export */   colorToRgb: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.colorToRgb),\n/* harmony export */   deepExtend: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.deepExtend),\n/* harmony export */   degToRad: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.degToRad),\n/* harmony export */   divMode: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.divMode),\n/* harmony export */   divModeExecute: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.divModeExecute),\n/* harmony export */   drawEffect: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.drawEffect),\n/* harmony export */   drawLine: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.drawLine),\n/* harmony export */   drawParticle: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.drawParticle),\n/* harmony export */   drawParticlePlugin: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.drawParticlePlugin),\n/* harmony export */   drawPlugin: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.drawPlugin),\n/* harmony export */   drawShape: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.drawShape),\n/* harmony export */   drawShapeAfterDraw: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.drawShapeAfterDraw),\n/* harmony export */   errorPrefix: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.errorPrefix),\n/* harmony export */   executeOnSingleOrMultiple: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.executeOnSingleOrMultiple),\n/* harmony export */   findItemFromSingleOrMultiple: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.findItemFromSingleOrMultiple),\n/* harmony export */   generatedAttribute: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.generatedAttribute),\n/* harmony export */   getDistance: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistance),\n/* harmony export */   getDistances: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getDistances),\n/* harmony export */   getEasing: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getEasing),\n/* harmony export */   getHslAnimationFromHsl: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getHslAnimationFromHsl),\n/* harmony export */   getHslFromAnimation: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getHslFromAnimation),\n/* harmony export */   getLinkColor: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getLinkColor),\n/* harmony export */   getLinkRandomColor: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getLinkRandomColor),\n/* harmony export */   getLogger: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getLogger),\n/* harmony export */   getParticleBaseVelocity: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getParticleBaseVelocity),\n/* harmony export */   getParticleDirectionAngle: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getParticleDirectionAngle),\n/* harmony export */   getPosition: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getPosition),\n/* harmony export */   getRandom: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRandom),\n/* harmony export */   getRandomRgbColor: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRandomRgbColor),\n/* harmony export */   getRangeMax: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeMax),\n/* harmony export */   getRangeMin: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeMin),\n/* harmony export */   getRangeValue: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getRangeValue),\n/* harmony export */   getSize: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getSize),\n/* harmony export */   getStyleFromHsl: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getStyleFromHsl),\n/* harmony export */   getStyleFromRgb: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.getStyleFromRgb),\n/* harmony export */   halfRandom: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.halfRandom),\n/* harmony export */   hasMatchMedia: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.hasMatchMedia),\n/* harmony export */   hslToRgb: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.hslToRgb),\n/* harmony export */   hslaToRgba: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.hslaToRgba),\n/* harmony export */   initParticleNumericAnimationValue: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.initParticleNumericAnimationValue),\n/* harmony export */   isArray: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isArray),\n/* harmony export */   isBoolean: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isBoolean),\n/* harmony export */   isDivModeEnabled: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isDivModeEnabled),\n/* harmony export */   isFunction: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isFunction),\n/* harmony export */   isInArray: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isInArray),\n/* harmony export */   isNumber: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isNumber),\n/* harmony export */   isObject: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isObject),\n/* harmony export */   isPointInside: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isPointInside),\n/* harmony export */   isSsr: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isSsr),\n/* harmony export */   isString: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.isString),\n/* harmony export */   itemFromArray: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.itemFromArray),\n/* harmony export */   itemFromSingleOrMultiple: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.itemFromSingleOrMultiple),\n/* harmony export */   loadFont: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.loadFont),\n/* harmony export */   loadFull: () => (/* reexport safe */ ___WEBPACK_IMPORTED_MODULE_1__.loadFull),\n/* harmony export */   loadOptions: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.loadOptions),\n/* harmony export */   loadParticlesOptions: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.loadParticlesOptions),\n/* harmony export */   loadSlim: () => (/* reexport safe */ _tsparticles_slim__WEBPACK_IMPORTED_MODULE_2__.loadSlim),\n/* harmony export */   millisecondsToSeconds: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.millisecondsToSeconds),\n/* harmony export */   mix: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.mix),\n/* harmony export */   mouseDownEvent: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.mouseDownEvent),\n/* harmony export */   mouseLeaveEvent: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.mouseLeaveEvent),\n/* harmony export */   mouseMoveEvent: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.mouseMoveEvent),\n/* harmony export */   mouseOutEvent: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.mouseOutEvent),\n/* harmony export */   mouseUpEvent: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.mouseUpEvent),\n/* harmony export */   paintBase: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.paintBase),\n/* harmony export */   paintImage: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.paintImage),\n/* harmony export */   parseAlpha: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.parseAlpha),\n/* harmony export */   percentDenominator: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.percentDenominator),\n/* harmony export */   randomInRange: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.randomInRange),\n/* harmony export */   rangeColorToHsl: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.rangeColorToHsl),\n/* harmony export */   rangeColorToRgb: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.rangeColorToRgb),\n/* harmony export */   rectBounce: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.rectBounce),\n/* harmony export */   resizeEvent: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.resizeEvent),\n/* harmony export */   rgbToHsl: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.rgbToHsl),\n/* harmony export */   safeIntersectionObserver: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.safeIntersectionObserver),\n/* harmony export */   safeMatchMedia: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.safeMatchMedia),\n/* harmony export */   safeMutationObserver: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.safeMutationObserver),\n/* harmony export */   setLogger: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.setLogger),\n/* harmony export */   setRandom: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.setRandom),\n/* harmony export */   setRangeValue: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.setRangeValue),\n/* harmony export */   singleDivModeExecute: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.singleDivModeExecute),\n/* harmony export */   stringToAlpha: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.stringToAlpha),\n/* harmony export */   stringToRgb: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.stringToRgb),\n/* harmony export */   touchCancelEvent: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.touchCancelEvent),\n/* harmony export */   touchEndEvent: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.touchEndEvent),\n/* harmony export */   touchMoveEvent: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.touchMoveEvent),\n/* harmony export */   touchStartEvent: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.touchStartEvent),\n/* harmony export */   tsParticles: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.tsParticles),\n/* harmony export */   updateAnimation: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.updateAnimation),\n/* harmony export */   updateColor: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.updateColor),\n/* harmony export */   updateColorValue: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.updateColorValue),\n/* harmony export */   visibilityChangeEvent: () => (/* reexport safe */ _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.visibilityChangeEvent)\n/* harmony export */ });\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! . */ \"./dist/browser/index.js\");\n/* harmony import */ var _tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @tsparticles/engine */ \"../../engine/dist/browser/index.js\");\n/* harmony import */ var _tsparticles_slim__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @tsparticles/slim */ \"../slim/dist/browser/index.js\");\n\n\nvoid (0,___WEBPACK_IMPORTED_MODULE_1__.loadFull)(_tsparticles_engine__WEBPACK_IMPORTED_MODULE_0__.tsParticles);\n\n\n\n\n//# sourceURL=webpack://tsparticles/./dist/browser/bundle.js?");

/***/ }),

/***/ "./dist/browser/index.js":
/*!*******************************!*\
  !*** ./dist/browser/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadFull: () => (/* binding */ loadFull)\n/* harmony export */ });\nasync function loadFull(engine, refresh = true) {\n  const {\n      loadDestroyUpdater\n    } = await __webpack_require__.e(/*! import() */ \"updaters_destroy_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/updater-destroy */ \"../../updaters/destroy/dist/browser/index.js\")),\n    {\n      loadRollUpdater\n    } = await __webpack_require__.e(/*! import() */ \"updaters_roll_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/updater-roll */ \"../../updaters/roll/dist/browser/index.js\")),\n    {\n      loadTiltUpdater\n    } = await __webpack_require__.e(/*! import() */ \"updaters_tilt_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/updater-tilt */ \"../../updaters/tilt/dist/browser/index.js\")),\n    {\n      loadTwinkleUpdater\n    } = await __webpack_require__.e(/*! import() */ \"updaters_twinkle_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/updater-twinkle */ \"../../updaters/twinkle/dist/browser/index.js\")),\n    {\n      loadWobbleUpdater\n    } = await __webpack_require__.e(/*! import() */ \"updaters_wobble_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/updater-wobble */ \"../../updaters/wobble/dist/browser/index.js\")),\n    {\n      loadTextShape\n    } = await __webpack_require__.e(/*! import() */ \"shapes_text_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/shape-text */ \"../../shapes/text/dist/browser/index.js\")),\n    {\n      loadExternalTrailInteraction\n    } = await __webpack_require__.e(/*! import() */ \"interactions_external_trail_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/interaction-external-trail */ \"../../interactions/external/trail/dist/browser/index.js\")),\n    {\n      loadAbsorbersPlugin\n    } = await __webpack_require__.e(/*! import() */ \"plugins_absorbers_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/plugin-absorbers */ \"../../plugins/absorbers/dist/browser/index.js\")),\n    {\n      loadEmittersPlugin\n    } = await __webpack_require__.e(/*! import() */ \"plugins_emitters_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/plugin-emitters */ \"../../plugins/emitters/dist/browser/index.js\")),\n    {\n      loadEmittersShapeCircle\n    } = await __webpack_require__.e(/*! import() */ \"plugins_emittersShapes_circle_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/plugin-emitters-shape-circle */ \"../../plugins/emittersShapes/circle/dist/browser/index.js\")),\n    {\n      loadEmittersShapeSquare\n    } = await __webpack_require__.e(/*! import() */ \"plugins_emittersShapes_square_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/plugin-emitters-shape-square */ \"../../plugins/emittersShapes/square/dist/browser/index.js\")),\n    {\n      loadSlim\n    } = await Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/slim */ \"../slim/dist/browser/index.js\"));\n  await loadDestroyUpdater(engine, false);\n  await loadRollUpdater(engine, false);\n  await loadTiltUpdater(engine, false);\n  await loadTwinkleUpdater(engine, false);\n  await loadWobbleUpdater(engine, false);\n  await loadTextShape(engine, false);\n  await loadExternalTrailInteraction(engine, false);\n  await loadAbsorbersPlugin(engine, false);\n  await loadEmittersPlugin(engine, false);\n  await loadEmittersShapeCircle(engine, false);\n  await loadEmittersShapeSquare(engine, false);\n  await loadSlim(engine, refresh);\n}\n\n//# sourceURL=webpack://tsparticles/./dist/browser/index.js?");

/***/ }),

/***/ "../slim/dist/browser/index.js":
/*!*************************************!*\
  !*** ../slim/dist/browser/index.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadSlim: () => (/* binding */ loadSlim)\n/* harmony export */ });\nasync function loadSlim(engine, refresh = true) {\n  const {\n      loadParallaxMover\n    } = await __webpack_require__.e(/*! import() */ \"move_parallax_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/move-parallax */ \"../../move/parallax/dist/browser/index.js\")),\n    {\n      loadExternalAttractInteraction\n    } = await __webpack_require__.e(/*! import() */ \"interactions_external_attract_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/interaction-external-attract */ \"../../interactions/external/attract/dist/browser/index.js\")),\n    {\n      loadExternalBounceInteraction\n    } = await __webpack_require__.e(/*! import() */ \"interactions_external_bounce_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/interaction-external-bounce */ \"../../interactions/external/bounce/dist/browser/index.js\")),\n    {\n      loadExternalBubbleInteraction\n    } = await __webpack_require__.e(/*! import() */ \"interactions_external_bubble_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/interaction-external-bubble */ \"../../interactions/external/bubble/dist/browser/index.js\")),\n    {\n      loadExternalConnectInteraction\n    } = await __webpack_require__.e(/*! import() */ \"interactions_external_connect_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/interaction-external-connect */ \"../../interactions/external/connect/dist/browser/index.js\")),\n    {\n      loadExternalGrabInteraction\n    } = await __webpack_require__.e(/*! import() */ \"interactions_external_grab_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/interaction-external-grab */ \"../../interactions/external/grab/dist/browser/index.js\")),\n    {\n      loadExternalPauseInteraction\n    } = await __webpack_require__.e(/*! import() */ \"interactions_external_pause_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/interaction-external-pause */ \"../../interactions/external/pause/dist/browser/index.js\")),\n    {\n      loadExternalPushInteraction\n    } = await __webpack_require__.e(/*! import() */ \"interactions_external_push_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/interaction-external-push */ \"../../interactions/external/push/dist/browser/index.js\")),\n    {\n      loadExternalRemoveInteraction\n    } = await __webpack_require__.e(/*! import() */ \"interactions_external_remove_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/interaction-external-remove */ \"../../interactions/external/remove/dist/browser/index.js\")),\n    {\n      loadExternalRepulseInteraction\n    } = await __webpack_require__.e(/*! import() */ \"interactions_external_repulse_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/interaction-external-repulse */ \"../../interactions/external/repulse/dist/browser/index.js\")),\n    {\n      loadExternalSlowInteraction\n    } = await __webpack_require__.e(/*! import() */ \"interactions_external_slow_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/interaction-external-slow */ \"../../interactions/external/slow/dist/browser/index.js\")),\n    {\n      loadParticlesAttractInteraction\n    } = await __webpack_require__.e(/*! import() */ \"interactions_particles_attract_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/interaction-particles-attract */ \"../../interactions/particles/attract/dist/browser/index.js\")),\n    {\n      loadParticlesCollisionsInteraction\n    } = await __webpack_require__.e(/*! import() */ \"interactions_particles_collisions_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/interaction-particles-collisions */ \"../../interactions/particles/collisions/dist/browser/index.js\")),\n    {\n      loadParticlesLinksInteraction\n    } = await __webpack_require__.e(/*! import() */ \"interactions_particles_links_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/interaction-particles-links */ \"../../interactions/particles/links/dist/browser/index.js\")),\n    {\n      loadEasingQuadPlugin\n    } = await __webpack_require__.e(/*! import() */ \"plugins_easings_quad_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/plugin-easing-quad */ \"../../plugins/easings/quad/dist/browser/index.js\")),\n    {\n      loadEmojiShape\n    } = await __webpack_require__.e(/*! import() */ \"shapes_emoji_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/shape-emoji */ \"../../shapes/emoji/dist/browser/index.js\")),\n    {\n      loadImageShape\n    } = await __webpack_require__.e(/*! import() */ \"shapes_image_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/shape-image */ \"../../shapes/image/dist/browser/index.js\")),\n    {\n      loadLineShape\n    } = await __webpack_require__.e(/*! import() */ \"shapes_line_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/shape-line */ \"../../shapes/line/dist/browser/index.js\")),\n    {\n      loadPolygonShape\n    } = await __webpack_require__.e(/*! import() */ \"shapes_polygon_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/shape-polygon */ \"../../shapes/polygon/dist/browser/index.js\")),\n    {\n      loadSquareShape\n    } = await __webpack_require__.e(/*! import() */ \"shapes_square_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/shape-square */ \"../../shapes/square/dist/browser/index.js\")),\n    {\n      loadStarShape\n    } = await __webpack_require__.e(/*! import() */ \"shapes_star_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/shape-star */ \"../../shapes/star/dist/browser/index.js\")),\n    {\n      loadLifeUpdater\n    } = await __webpack_require__.e(/*! import() */ \"updaters_life_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/updater-life */ \"../../updaters/life/dist/browser/index.js\")),\n    {\n      loadRotateUpdater\n    } = await __webpack_require__.e(/*! import() */ \"updaters_rotate_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/updater-rotate */ \"../../updaters/rotate/dist/browser/index.js\")),\n    {\n      loadStrokeColorUpdater\n    } = await __webpack_require__.e(/*! import() */ \"updaters_strokeColor_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/updater-stroke-color */ \"../../updaters/strokeColor/dist/browser/index.js\")),\n    {\n      loadBasic\n    } = await __webpack_require__.e(/*! import() */ \"basic_dist_browser_index_js\").then(__webpack_require__.bind(__webpack_require__, /*! @tsparticles/basic */ \"../basic/dist/browser/index.js\"));\n  await loadParallaxMover(engine, false);\n  await loadExternalAttractInteraction(engine, false);\n  await loadExternalBounceInteraction(engine, false);\n  await loadExternalBubbleInteraction(engine, false);\n  await loadExternalConnectInteraction(engine, false);\n  await loadExternalGrabInteraction(engine, false);\n  await loadExternalPauseInteraction(engine, false);\n  await loadExternalPushInteraction(engine, false);\n  await loadExternalRemoveInteraction(engine, false);\n  await loadExternalRepulseInteraction(engine, false);\n  await loadExternalSlowInteraction(engine, false);\n  await loadParticlesAttractInteraction(engine, false);\n  await loadParticlesCollisionsInteraction(engine, false);\n  await loadParticlesLinksInteraction(engine, false);\n  await loadEasingQuadPlugin();\n  await loadEmojiShape(engine, false);\n  await loadImageShape(engine, false);\n  await loadLineShape(engine, false);\n  await loadPolygonShape(engine, false);\n  await loadSquareShape(engine, false);\n  await loadStarShape(engine, false);\n  await loadLifeUpdater(engine, false);\n  await loadRotateUpdater(engine, false);\n  await loadStrokeColorUpdater(engine, false);\n  await loadBasic(engine, refresh);\n}\n\n//# sourceURL=webpack://tsparticles/../slim/dist/browser/index.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Engine.js":
/*!************************************************!*\
  !*** ../../engine/dist/browser/Core/Engine.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Engine: () => (/* binding */ Engine)\n/* harmony export */ });\n/* harmony import */ var _Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Utils/Constants.js */ \"../../engine/dist/browser/Core/Utils/Constants.js\");\n/* harmony import */ var _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils/Utils.js */ \"../../engine/dist/browser/Utils/Utils.js\");\n/* harmony import */ var _Utils_EventDispatcher_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils/EventDispatcher.js */ \"../../engine/dist/browser/Utils/EventDispatcher.js\");\n/* harmony import */ var _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Utils/NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n\n\n\n\nasync function getItemsFromInitializer(container, map, initializers, force = false) {\n  let res = map.get(container);\n  if (!res || force) {\n    res = await Promise.all([...initializers.values()].map(t => t(container)));\n    map.set(container, res);\n  }\n  return res;\n}\nasync function getDataFromUrl(data) {\n  const url = (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__.itemFromSingleOrMultiple)(data.url, data.index);\n  if (!url) {\n    return data.fallback;\n  }\n  const response = await fetch(url);\n  if (response.ok) {\n    return await response.json();\n  }\n  (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__.getLogger)().error(`${_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.errorPrefix} ${response.status} while retrieving config file`);\n  return data.fallback;\n}\nclass Engine {\n  constructor() {\n    this._configs = new Map();\n    this._domArray = [];\n    this._eventDispatcher = new _Utils_EventDispatcher_js__WEBPACK_IMPORTED_MODULE_2__.EventDispatcher();\n    this._initialized = false;\n    this.plugins = [];\n    this._initializers = {\n      interactors: new Map(),\n      movers: new Map(),\n      updaters: new Map()\n    };\n    this.interactors = new Map();\n    this.movers = new Map();\n    this.updaters = new Map();\n    this.presets = new Map();\n    this.effectDrawers = new Map();\n    this.shapeDrawers = new Map();\n    this.pathGenerators = new Map();\n  }\n  get configs() {\n    const res = {};\n    for (const [name, config] of this._configs) {\n      res[name] = config;\n    }\n    return res;\n  }\n  get version() {\n    return \"3.3.0\";\n  }\n  addConfig(config) {\n    const key = config.key ?? config.name ?? \"default\";\n    this._configs.set(key, config);\n    this._eventDispatcher.dispatchEvent(\"configAdded\", {\n      data: {\n        name: key,\n        config\n      }\n    });\n  }\n  async addEffect(effect, drawer, refresh = true) {\n    (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__.executeOnSingleOrMultiple)(effect, type => {\n      if (!this.getEffectDrawer(type)) {\n        this.effectDrawers.set(type, drawer);\n      }\n    });\n    await this.refresh(refresh);\n  }\n  addEventListener(type, listener) {\n    this._eventDispatcher.addEventListener(type, listener);\n  }\n  async addInteractor(name, interactorInitializer, refresh = true) {\n    this._initializers.interactors.set(name, interactorInitializer);\n    await this.refresh(refresh);\n  }\n  async addMover(name, moverInitializer, refresh = true) {\n    this._initializers.movers.set(name, moverInitializer);\n    await this.refresh(refresh);\n  }\n  async addParticleUpdater(name, updaterInitializer, refresh = true) {\n    this._initializers.updaters.set(name, updaterInitializer);\n    await this.refresh(refresh);\n  }\n  async addPathGenerator(name, generator, refresh = true) {\n    if (!this.getPathGenerator(name)) {\n      this.pathGenerators.set(name, generator);\n    }\n    await this.refresh(refresh);\n  }\n  async addPlugin(plugin, refresh = true) {\n    if (!this.getPlugin(plugin.id)) {\n      this.plugins.push(plugin);\n    }\n    await this.refresh(refresh);\n  }\n  async addPreset(preset, options, override = false, refresh = true) {\n    if (override || !this.getPreset(preset)) {\n      this.presets.set(preset, options);\n    }\n    await this.refresh(refresh);\n  }\n  async addShape(shape, drawer, refresh = true) {\n    (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__.executeOnSingleOrMultiple)(shape, type => {\n      if (!this.getShapeDrawer(type)) {\n        this.shapeDrawers.set(type, drawer);\n      }\n    });\n    await this.refresh(refresh);\n  }\n  clearPlugins(container) {\n    this.updaters.delete(container);\n    this.movers.delete(container);\n    this.interactors.delete(container);\n  }\n  dispatchEvent(type, args) {\n    this._eventDispatcher.dispatchEvent(type, args);\n  }\n  dom() {\n    return this._domArray;\n  }\n  domItem(index) {\n    const dom = this.dom(),\n      item = dom[index];\n    if (!item || item.destroyed) {\n      const deleteCount = 1;\n      dom.splice(index, deleteCount);\n      return;\n    }\n    return item;\n  }\n  async getAvailablePlugins(container) {\n    const res = new Map();\n    for (const plugin of this.plugins) {\n      if (plugin.needsPlugin(container.actualOptions)) {\n        res.set(plugin.id, await plugin.getPlugin(container));\n      }\n    }\n    return res;\n  }\n  getEffectDrawer(type) {\n    return this.effectDrawers.get(type);\n  }\n  async getInteractors(container, force = false) {\n    return await getItemsFromInitializer(container, this.interactors, this._initializers.interactors, force);\n  }\n  async getMovers(container, force = false) {\n    return await getItemsFromInitializer(container, this.movers, this._initializers.movers, force);\n  }\n  getPathGenerator(type) {\n    return this.pathGenerators.get(type);\n  }\n  getPlugin(plugin) {\n    return this.plugins.find(t => t.id === plugin);\n  }\n  getPreset(preset) {\n    return this.presets.get(preset);\n  }\n  getShapeDrawer(type) {\n    return this.shapeDrawers.get(type);\n  }\n  getSupportedEffects() {\n    return this.effectDrawers.keys();\n  }\n  getSupportedShapes() {\n    return this.shapeDrawers.keys();\n  }\n  async getUpdaters(container, force = false) {\n    return await getItemsFromInitializer(container, this.updaters, this._initializers.updaters, force);\n  }\n  init() {\n    if (this._initialized) {\n      return;\n    }\n    this._initialized = true;\n  }\n  async load(params) {\n    const randomFactor = 10000,\n      id = params.id ?? params.element?.id ?? `tsparticles${Math.floor((0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_3__.getRandom)() * randomFactor)}`,\n      {\n        index,\n        url\n      } = params,\n      options = url ? await getDataFromUrl({\n        fallback: params.options,\n        url,\n        index\n      }) : params.options;\n    let domContainer = params.element ?? document.getElementById(id);\n    if (!domContainer) {\n      domContainer = document.createElement(\"div\");\n      domContainer.id = id;\n      document.body.append(domContainer);\n    }\n    const currentOptions = (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__.itemFromSingleOrMultiple)(options, index),\n      dom = this.dom(),\n      oldIndex = dom.findIndex(v => v.id.description === id),\n      minIndex = 0;\n    if (oldIndex >= minIndex) {\n      const old = this.domItem(oldIndex);\n      if (old && !old.destroyed) {\n        old.destroy();\n        const deleteCount = 1;\n        dom.splice(oldIndex, deleteCount);\n      }\n    }\n    let canvasEl;\n    if (domContainer.tagName.toLowerCase() === \"canvas\") {\n      canvasEl = domContainer;\n      canvasEl.dataset[_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.generatedAttribute] = \"false\";\n    } else {\n      const existingCanvases = domContainer.getElementsByTagName(\"canvas\");\n      if (existingCanvases.length) {\n        const firstIndex = 0;\n        canvasEl = existingCanvases[firstIndex];\n        canvasEl.dataset[_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.generatedAttribute] = \"false\";\n      } else {\n        canvasEl = document.createElement(\"canvas\");\n        canvasEl.dataset[_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.generatedAttribute] = \"true\";\n        domContainer.appendChild(canvasEl);\n      }\n    }\n    if (!canvasEl.style.width) {\n      canvasEl.style.width = \"100%\";\n    }\n    if (!canvasEl.style.height) {\n      canvasEl.style.height = \"100%\";\n    }\n    const {\n        Container\n      } = await __webpack_require__.e(/*! import() */ \"engine_dist_browser_Core_Container_js\").then(__webpack_require__.bind(__webpack_require__, /*! ./Container.js */ \"../../engine/dist/browser/Core/Container.js\")),\n      newItem = new Container(this, id, currentOptions);\n    if (oldIndex >= minIndex) {\n      const deleteCount = 0;\n      dom.splice(oldIndex, deleteCount, newItem);\n    } else {\n      dom.push(newItem);\n    }\n    newItem.canvas.loadCanvas(canvasEl);\n    await newItem.start();\n    return newItem;\n  }\n  loadOptions(options, sourceOptions) {\n    for (const plugin of this.plugins) {\n      plugin.loadOptions(options, sourceOptions);\n    }\n  }\n  loadParticlesOptions(container, options, ...sourceOptions) {\n    const updaters = this.updaters.get(container);\n    if (!updaters) {\n      return;\n    }\n    for (const updater of updaters) {\n      updater.loadOptions?.(options, ...sourceOptions);\n    }\n  }\n  async refresh(refresh = true) {\n    if (!refresh) {\n      return;\n    }\n    await Promise.all(this.dom().map(t => t.refresh()));\n  }\n  removeEventListener(type, listener) {\n    this._eventDispatcher.removeEventListener(type, listener);\n  }\n  setOnClickHandler(callback) {\n    const dom = this.dom();\n    if (!dom.length) {\n      throw new Error(`${_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.errorPrefix} can only set click handlers after calling tsParticles.load()`);\n    }\n    for (const domItem of dom) {\n      domItem.addClickHandler(callback);\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Engine.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/Colors.js":
/*!***********************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/Colors.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/Colors.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IBounds.js":
/*!************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IBounds.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IBounds.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IBubbleParticleData.js":
/*!************************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IBubbleParticleData.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IBubbleParticleData.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/ICircleBouncer.js":
/*!*******************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/ICircleBouncer.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/ICircleBouncer.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IColorManager.js":
/*!******************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IColorManager.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IColorManager.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IContainerInteractivity.js":
/*!****************************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IContainerInteractivity.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IContainerInteractivity.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IContainerPlugin.js":
/*!*********************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IContainerPlugin.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IContainerPlugin.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/ICoordinates.js":
/*!*****************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/ICoordinates.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/ICoordinates.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IDelta.js":
/*!***********************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IDelta.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IDelta.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IDimension.js":
/*!***************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IDimension.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IDimension.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IDistance.js":
/*!**************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IDistance.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IDistance.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IDrawParticleParams.js":
/*!************************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IDrawParticleParams.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IDrawParticleParams.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IEffectDrawer.js":
/*!******************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IEffectDrawer.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IEffectDrawer.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IExternalInteractor.js":
/*!************************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IExternalInteractor.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IExternalInteractor.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IInteractor.js":
/*!****************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IInteractor.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IInteractor.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/ILoadParams.js":
/*!****************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/ILoadParams.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/ILoadParams.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IMouseData.js":
/*!***************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IMouseData.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IMouseData.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IMovePathGenerator.js":
/*!***********************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IMovePathGenerator.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IMovePathGenerator.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IParticleColorStyle.js":
/*!************************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IParticleColorStyle.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IParticleColorStyle.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IParticleHslAnimation.js":
/*!**************************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IParticleHslAnimation.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IParticleHslAnimation.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IParticleLife.js":
/*!******************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IParticleLife.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IParticleLife.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IParticleMover.js":
/*!*******************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IParticleMover.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IParticleMover.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IParticleRetinaProps.js":
/*!*************************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IParticleRetinaProps.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IParticleRetinaProps.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IParticleRoll.js":
/*!******************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IParticleRoll.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IParticleRoll.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IParticleTransformValues.js":
/*!*****************************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IParticleTransformValues.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IParticleTransformValues.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IParticleUpdater.js":
/*!*********************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IParticleUpdater.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IParticleUpdater.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IParticleValueAnimation.js":
/*!****************************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IParticleValueAnimation.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IParticleValueAnimation.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IParticlesInteractor.js":
/*!*************************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IParticlesInteractor.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IParticlesInteractor.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IPlugin.js":
/*!************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IPlugin.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IPlugin.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IPositionFromSizeParams.js":
/*!****************************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IPositionFromSizeParams.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IPositionFromSizeParams.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IRangeValue.js":
/*!****************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IRangeValue.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IRangeValue.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IRectSideResult.js":
/*!********************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IRectSideResult.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IRectSideResult.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IShapeDrawData.js":
/*!*******************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IShapeDrawData.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IShapeDrawData.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IShapeDrawer.js":
/*!*****************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IShapeDrawer.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IShapeDrawer.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/IShapeValues.js":
/*!*****************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/IShapeValues.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/IShapeValues.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/ISlowParticleData.js":
/*!**********************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/ISlowParticleData.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/ISlowParticleData.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Interfaces/ITrailFillData.js":
/*!*******************************************************************!*\
  !*** ../../engine/dist/browser/Core/Interfaces/ITrailFillData.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Interfaces/ITrailFillData.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Utils/Constants.js":
/*!*********************************************************!*\
  !*** ../../engine/dist/browser/Core/Utils/Constants.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   errorPrefix: () => (/* binding */ errorPrefix),\n/* harmony export */   generatedAttribute: () => (/* binding */ generatedAttribute),\n/* harmony export */   halfRandom: () => (/* binding */ halfRandom),\n/* harmony export */   millisecondsToSeconds: () => (/* binding */ millisecondsToSeconds),\n/* harmony export */   mouseDownEvent: () => (/* binding */ mouseDownEvent),\n/* harmony export */   mouseLeaveEvent: () => (/* binding */ mouseLeaveEvent),\n/* harmony export */   mouseMoveEvent: () => (/* binding */ mouseMoveEvent),\n/* harmony export */   mouseOutEvent: () => (/* binding */ mouseOutEvent),\n/* harmony export */   mouseUpEvent: () => (/* binding */ mouseUpEvent),\n/* harmony export */   percentDenominator: () => (/* binding */ percentDenominator),\n/* harmony export */   resizeEvent: () => (/* binding */ resizeEvent),\n/* harmony export */   touchCancelEvent: () => (/* binding */ touchCancelEvent),\n/* harmony export */   touchEndEvent: () => (/* binding */ touchEndEvent),\n/* harmony export */   touchMoveEvent: () => (/* binding */ touchMoveEvent),\n/* harmony export */   touchStartEvent: () => (/* binding */ touchStartEvent),\n/* harmony export */   visibilityChangeEvent: () => (/* binding */ visibilityChangeEvent)\n/* harmony export */ });\nconst generatedAttribute = \"generated\";\nconst mouseDownEvent = \"pointerdown\";\nconst mouseUpEvent = \"pointerup\";\nconst mouseLeaveEvent = \"pointerleave\";\nconst mouseOutEvent = \"pointerout\";\nconst mouseMoveEvent = \"pointermove\";\nconst touchStartEvent = \"touchstart\";\nconst touchEndEvent = \"touchend\";\nconst touchMoveEvent = \"touchmove\";\nconst touchCancelEvent = \"touchcancel\";\nconst resizeEvent = \"resize\";\nconst visibilityChangeEvent = \"visibilitychange\";\nconst errorPrefix = \"tsParticles - Error\";\nconst percentDenominator = 100;\nconst halfRandom = 0.5;\nconst millisecondsToSeconds = 1000;\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Utils/Constants.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Utils/ExternalInteractorBase.js":
/*!**********************************************************************!*\
  !*** ../../engine/dist/browser/Core/Utils/ExternalInteractorBase.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ExternalInteractorBase: () => (/* binding */ ExternalInteractorBase)\n/* harmony export */ });\nclass ExternalInteractorBase {\n  constructor(container) {\n    this.type = \"external\";\n    this.container = container;\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Utils/ExternalInteractorBase.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Utils/ParticlesInteractorBase.js":
/*!***********************************************************************!*\
  !*** ../../engine/dist/browser/Core/Utils/ParticlesInteractorBase.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ParticlesInteractorBase: () => (/* binding */ ParticlesInteractorBase)\n/* harmony export */ });\nclass ParticlesInteractorBase {\n  constructor(container) {\n    this.type = \"particles\";\n    this.container = container;\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Utils/ParticlesInteractorBase.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Utils/Point.js":
/*!*****************************************************!*\
  !*** ../../engine/dist/browser/Core/Utils/Point.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Point: () => (/* binding */ Point)\n/* harmony export */ });\nclass Point {\n  constructor(position, particle) {\n    this.position = position;\n    this.particle = particle;\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Utils/Point.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Utils/Ranges.js":
/*!******************************************************!*\
  !*** ../../engine/dist/browser/Core/Utils/Ranges.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BaseRange: () => (/* binding */ BaseRange),\n/* harmony export */   Circle: () => (/* binding */ Circle),\n/* harmony export */   Rectangle: () => (/* binding */ Rectangle)\n/* harmony export */ });\n/* harmony import */ var _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n\nconst squareExp = 2;\nclass BaseRange {\n  constructor(x, y, type) {\n    this.position = {\n      x: x,\n      y: y\n    };\n    this.type = type;\n  }\n}\nclass Circle extends BaseRange {\n  constructor(x, y, radius) {\n    super(x, y, \"circle\");\n    this.radius = radius;\n  }\n  contains(point) {\n    return (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getDistance)(point, this.position) <= this.radius;\n  }\n  intersects(range) {\n    const pos1 = this.position,\n      pos2 = range.position,\n      distPos = {\n        x: Math.abs(pos2.x - pos1.x),\n        y: Math.abs(pos2.y - pos1.y)\n      },\n      r = this.radius;\n    if (range instanceof Circle || range.type === \"circle\") {\n      const circleRange = range,\n        rSum = r + circleRange.radius,\n        dist = Math.sqrt(distPos.x ** squareExp + distPos.y ** squareExp);\n      return rSum > dist;\n    } else if (range instanceof Rectangle || range.type === \"rectangle\") {\n      const rectRange = range,\n        {\n          width,\n          height\n        } = rectRange.size,\n        edges = Math.pow(distPos.x - width, squareExp) + Math.pow(distPos.y - height, squareExp);\n      return edges <= r ** squareExp || distPos.x <= r + width && distPos.y <= r + height || distPos.x <= width || distPos.y <= height;\n    }\n    return false;\n  }\n}\nclass Rectangle extends BaseRange {\n  constructor(x, y, width, height) {\n    super(x, y, \"rectangle\");\n    this.size = {\n      height: height,\n      width: width\n    };\n  }\n  contains(point) {\n    const w = this.size.width,\n      h = this.size.height,\n      pos = this.position;\n    return point.x >= pos.x && point.x <= pos.x + w && point.y >= pos.y && point.y <= pos.y + h;\n  }\n  intersects(range) {\n    if (range instanceof Circle) {\n      return range.intersects(this);\n    }\n    const w = this.size.width,\n      h = this.size.height,\n      pos1 = this.position,\n      pos2 = range.position,\n      size2 = range instanceof Rectangle ? range.size : {\n        width: 0,\n        height: 0\n      },\n      w2 = size2.width,\n      h2 = size2.height;\n    return pos2.x < pos1.x + w && pos2.x + w2 > pos1.x && pos2.y < pos1.y + h && pos2.y + h2 > pos1.y;\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Utils/Ranges.js?");

/***/ }),

/***/ "../../engine/dist/browser/Core/Utils/Vectors.js":
/*!*******************************************************!*\
  !*** ../../engine/dist/browser/Core/Utils/Vectors.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Vector: () => (/* binding */ Vector),\n/* harmony export */   Vector3d: () => (/* binding */ Vector3d)\n/* harmony export */ });\n/* harmony import */ var _Constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Constants.js */ \"../../engine/dist/browser/Core/Utils/Constants.js\");\n/* harmony import */ var _Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils/TypeUtils.js */ \"../../engine/dist/browser/Utils/TypeUtils.js\");\n\n\nconst origin = {\n    x: 0,\n    y: 0,\n    z: 0\n  },\n  squareExp = 2,\n  inverseFactorNumerator = 1.0;\nclass Vector3d {\n  constructor(xOrCoords, y, z) {\n    this._updateFromAngle = (angle, length) => {\n      this.x = Math.cos(angle) * length;\n      this.y = Math.sin(angle) * length;\n    };\n    if (!(0,_Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__.isNumber)(xOrCoords) && xOrCoords) {\n      this.x = xOrCoords.x;\n      this.y = xOrCoords.y;\n      const coords3d = xOrCoords;\n      this.z = coords3d.z ? coords3d.z : origin.z;\n    } else if (xOrCoords !== undefined && y !== undefined) {\n      this.x = xOrCoords;\n      this.y = y;\n      this.z = z ?? origin.z;\n    } else {\n      throw new Error(`${_Constants_js__WEBPACK_IMPORTED_MODULE_0__.errorPrefix} Vector3d not initialized correctly`);\n    }\n  }\n  static get origin() {\n    return Vector3d.create(origin.x, origin.y, origin.z);\n  }\n  get angle() {\n    return Math.atan2(this.y, this.x);\n  }\n  set angle(angle) {\n    this._updateFromAngle(angle, this.length);\n  }\n  get length() {\n    return Math.sqrt(this.getLengthSq());\n  }\n  set length(length) {\n    this._updateFromAngle(this.angle, length);\n  }\n  static clone(source) {\n    return Vector3d.create(source.x, source.y, source.z);\n  }\n  static create(x, y, z) {\n    return new Vector3d(x, y, z);\n  }\n  add(v) {\n    return Vector3d.create(this.x + v.x, this.y + v.y, this.z + v.z);\n  }\n  addTo(v) {\n    this.x += v.x;\n    this.y += v.y;\n    this.z += v.z;\n  }\n  copy() {\n    return Vector3d.clone(this);\n  }\n  distanceTo(v) {\n    return this.sub(v).length;\n  }\n  distanceToSq(v) {\n    return this.sub(v).getLengthSq();\n  }\n  div(n) {\n    return Vector3d.create(this.x / n, this.y / n, this.z / n);\n  }\n  divTo(n) {\n    this.x /= n;\n    this.y /= n;\n    this.z /= n;\n  }\n  getLengthSq() {\n    return this.x ** squareExp + this.y ** squareExp;\n  }\n  mult(n) {\n    return Vector3d.create(this.x * n, this.y * n, this.z * n);\n  }\n  multTo(n) {\n    this.x *= n;\n    this.y *= n;\n    this.z *= n;\n  }\n  normalize() {\n    const length = this.length,\n      noLength = 0;\n    if (length != noLength) {\n      this.multTo(inverseFactorNumerator / length);\n    }\n  }\n  rotate(angle) {\n    return Vector3d.create(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle), origin.z);\n  }\n  setTo(c) {\n    this.x = c.x;\n    this.y = c.y;\n    const v3d = c;\n    this.z = v3d.z ? v3d.z : origin.z;\n  }\n  sub(v) {\n    return Vector3d.create(this.x - v.x, this.y - v.y, this.z - v.z);\n  }\n  subFrom(v) {\n    this.x -= v.x;\n    this.y -= v.y;\n    this.z -= v.z;\n  }\n}\nclass Vector extends Vector3d {\n  constructor(xOrCoords, y) {\n    super(xOrCoords, y, origin.z);\n  }\n  static get origin() {\n    return Vector.create(origin.x, origin.y);\n  }\n  static clone(source) {\n    return Vector.create(source.x, source.y);\n  }\n  static create(x, y) {\n    return new Vector(x, y);\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Core/Utils/Vectors.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/AnimationStatus.js":
/*!**********************************************************!*\
  !*** ../../engine/dist/browser/Enums/AnimationStatus.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/AnimationStatus.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Directions/MoveDirection.js":
/*!*******************************************************************!*\
  !*** ../../engine/dist/browser/Enums/Directions/MoveDirection.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Directions/MoveDirection.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Directions/OutModeDirection.js":
/*!**********************************************************************!*\
  !*** ../../engine/dist/browser/Enums/Directions/OutModeDirection.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Directions/OutModeDirection.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Directions/RotateDirection.js":
/*!*********************************************************************!*\
  !*** ../../engine/dist/browser/Enums/Directions/RotateDirection.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Directions/RotateDirection.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/InteractivityDetect.js":
/*!**************************************************************!*\
  !*** ../../engine/dist/browser/Enums/InteractivityDetect.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/InteractivityDetect.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Modes/AnimationMode.js":
/*!**************************************************************!*\
  !*** ../../engine/dist/browser/Enums/Modes/AnimationMode.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Modes/AnimationMode.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Modes/CollisionMode.js":
/*!**************************************************************!*\
  !*** ../../engine/dist/browser/Enums/Modes/CollisionMode.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Modes/CollisionMode.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Modes/LimitMode.js":
/*!**********************************************************!*\
  !*** ../../engine/dist/browser/Enums/Modes/LimitMode.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Modes/LimitMode.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Modes/OutMode.js":
/*!********************************************************!*\
  !*** ../../engine/dist/browser/Enums/Modes/OutMode.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Modes/OutMode.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Modes/PixelMode.js":
/*!**********************************************************!*\
  !*** ../../engine/dist/browser/Enums/Modes/PixelMode.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Modes/PixelMode.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Modes/ResponsiveMode.js":
/*!***************************************************************!*\
  !*** ../../engine/dist/browser/Enums/Modes/ResponsiveMode.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Modes/ResponsiveMode.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Modes/ThemeMode.js":
/*!**********************************************************!*\
  !*** ../../engine/dist/browser/Enums/Modes/ThemeMode.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Modes/ThemeMode.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Types/AlterType.js":
/*!**********************************************************!*\
  !*** ../../engine/dist/browser/Enums/Types/AlterType.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Types/AlterType.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Types/DestroyType.js":
/*!************************************************************!*\
  !*** ../../engine/dist/browser/Enums/Types/DestroyType.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Types/DestroyType.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Types/DivType.js":
/*!********************************************************!*\
  !*** ../../engine/dist/browser/Enums/Types/DivType.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Types/DivType.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Types/EasingType.js":
/*!***********************************************************!*\
  !*** ../../engine/dist/browser/Enums/Types/EasingType.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Types/EasingType.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Types/EventType.js":
/*!**********************************************************!*\
  !*** ../../engine/dist/browser/Enums/Types/EventType.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Types/EventType.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Types/GradientType.js":
/*!*************************************************************!*\
  !*** ../../engine/dist/browser/Enums/Types/GradientType.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Types/GradientType.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Types/InteractorType.js":
/*!***************************************************************!*\
  !*** ../../engine/dist/browser/Enums/Types/InteractorType.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Types/InteractorType.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Types/ParticleOutType.js":
/*!****************************************************************!*\
  !*** ../../engine/dist/browser/Enums/Types/ParticleOutType.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Types/ParticleOutType.js?");

/***/ }),

/***/ "../../engine/dist/browser/Enums/Types/StartValueType.js":
/*!***************************************************************!*\
  !*** ../../engine/dist/browser/Enums/Types/StartValueType.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Enums/Types/StartValueType.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/AnimatableColor.js":
/*!********************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/AnimatableColor.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AnimatableColor: () => (/* binding */ AnimatableColor)\n/* harmony export */ });\n/* harmony import */ var _Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/TypeUtils.js */ \"../../engine/dist/browser/Utils/TypeUtils.js\");\n/* harmony import */ var _HslAnimation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HslAnimation.js */ \"../../engine/dist/browser/Options/Classes/HslAnimation.js\");\n/* harmony import */ var _OptionsColor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OptionsColor.js */ \"../../engine/dist/browser/Options/Classes/OptionsColor.js\");\n\n\n\nclass AnimatableColor extends _OptionsColor_js__WEBPACK_IMPORTED_MODULE_2__.OptionsColor {\n  constructor() {\n    super();\n    this.animation = new _HslAnimation_js__WEBPACK_IMPORTED_MODULE_1__.HslAnimation();\n  }\n  static create(source, data) {\n    const color = new AnimatableColor();\n    color.load(source);\n    if (data !== undefined) {\n      if ((0,_Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_0__.isString)(data) || (0,_Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(data)) {\n        color.load({\n          value: data\n        });\n      } else {\n        color.load(data);\n      }\n    }\n    return color;\n  }\n  load(data) {\n    super.load(data);\n    if (!data) {\n      return;\n    }\n    const colorAnimation = data.animation;\n    if (colorAnimation !== undefined) {\n      if (colorAnimation.enable !== undefined) {\n        this.animation.h.load(colorAnimation);\n      } else {\n        this.animation.load(data.animation);\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/AnimatableColor.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/AnimationOptions.js":
/*!*********************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/AnimationOptions.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AnimationOptions: () => (/* binding */ AnimationOptions),\n/* harmony export */   RangedAnimationOptions: () => (/* binding */ RangedAnimationOptions)\n/* harmony export */ });\n/* harmony import */ var _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n\nclass AnimationOptions {\n  constructor() {\n    this.count = 0;\n    this.enable = false;\n    this.speed = 1;\n    this.decay = 0;\n    this.delay = 0;\n    this.sync = false;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.count !== undefined) {\n      this.count = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.count);\n    }\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n    if (data.speed !== undefined) {\n      this.speed = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.speed);\n    }\n    if (data.decay !== undefined) {\n      this.decay = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.decay);\n    }\n    if (data.delay !== undefined) {\n      this.delay = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.delay);\n    }\n    if (data.sync !== undefined) {\n      this.sync = data.sync;\n    }\n  }\n}\nclass RangedAnimationOptions extends AnimationOptions {\n  constructor() {\n    super();\n    this.mode = \"auto\";\n    this.startValue = \"random\";\n  }\n  load(data) {\n    super.load(data);\n    if (!data) {\n      return;\n    }\n    if (data.mode !== undefined) {\n      this.mode = data.mode;\n    }\n    if (data.startValue !== undefined) {\n      this.startValue = data.startValue;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/AnimationOptions.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Background/Background.js":
/*!**************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Background/Background.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Background: () => (/* binding */ Background)\n/* harmony export */ });\n/* harmony import */ var _OptionsColor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../OptionsColor.js */ \"../../engine/dist/browser/Options/Classes/OptionsColor.js\");\n\nclass Background {\n  constructor() {\n    this.color = new _OptionsColor_js__WEBPACK_IMPORTED_MODULE_0__.OptionsColor();\n    this.color.value = \"\";\n    this.image = \"\";\n    this.position = \"\";\n    this.repeat = \"\";\n    this.size = \"\";\n    this.opacity = 1;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.color !== undefined) {\n      this.color = _OptionsColor_js__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.color, data.color);\n    }\n    if (data.image !== undefined) {\n      this.image = data.image;\n    }\n    if (data.position !== undefined) {\n      this.position = data.position;\n    }\n    if (data.repeat !== undefined) {\n      this.repeat = data.repeat;\n    }\n    if (data.size !== undefined) {\n      this.size = data.size;\n    }\n    if (data.opacity !== undefined) {\n      this.opacity = data.opacity;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Background/Background.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/BackgroundMask/BackgroundMask.js":
/*!**********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/BackgroundMask/BackgroundMask.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BackgroundMask: () => (/* binding */ BackgroundMask)\n/* harmony export */ });\n/* harmony import */ var _BackgroundMaskCover_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BackgroundMaskCover.js */ \"../../engine/dist/browser/Options/Classes/BackgroundMask/BackgroundMaskCover.js\");\n/* harmony import */ var _Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Utils/TypeUtils.js */ \"../../engine/dist/browser/Utils/TypeUtils.js\");\n\n\nclass BackgroundMask {\n  constructor() {\n    this.composite = \"destination-out\";\n    this.cover = new _BackgroundMaskCover_js__WEBPACK_IMPORTED_MODULE_0__.BackgroundMaskCover();\n    this.enable = false;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.composite !== undefined) {\n      this.composite = data.composite;\n    }\n    if (data.cover !== undefined) {\n      const cover = data.cover,\n        color = (0,_Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__.isString)(data.cover) ? {\n          color: data.cover\n        } : data.cover;\n      this.cover.load(cover.color !== undefined || cover.image !== undefined ? cover : {\n        color: color\n      });\n    }\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/BackgroundMask/BackgroundMask.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/BackgroundMask/BackgroundMaskCover.js":
/*!***************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/BackgroundMask/BackgroundMaskCover.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BackgroundMaskCover: () => (/* binding */ BackgroundMaskCover)\n/* harmony export */ });\n/* harmony import */ var _OptionsColor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../OptionsColor.js */ \"../../engine/dist/browser/Options/Classes/OptionsColor.js\");\n\nclass BackgroundMaskCover {\n  constructor() {\n    this.opacity = 1;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.color !== undefined) {\n      this.color = _OptionsColor_js__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.color, data.color);\n    }\n    if (data.image !== undefined) {\n      this.image = data.image;\n    }\n    if (data.opacity !== undefined) {\n      this.opacity = data.opacity;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/BackgroundMask/BackgroundMaskCover.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/ColorAnimation.js":
/*!*******************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/ColorAnimation.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ColorAnimation: () => (/* binding */ ColorAnimation)\n/* harmony export */ });\n/* harmony import */ var _AnimationOptions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnimationOptions.js */ \"../../engine/dist/browser/Options/Classes/AnimationOptions.js\");\n/* harmony import */ var _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils/NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n\n\nclass ColorAnimation extends _AnimationOptions_js__WEBPACK_IMPORTED_MODULE_0__.AnimationOptions {\n  constructor() {\n    super();\n    this.offset = 0;\n    this.sync = true;\n  }\n  load(data) {\n    super.load(data);\n    if (!data) {\n      return;\n    }\n    if (data.offset !== undefined) {\n      this.offset = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.offset);\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/ColorAnimation.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/FullScreen/FullScreen.js":
/*!**************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/FullScreen/FullScreen.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   FullScreen: () => (/* binding */ FullScreen)\n/* harmony export */ });\nclass FullScreen {\n  constructor() {\n    this.enable = true;\n    this.zIndex = 0;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n    if (data.zIndex !== undefined) {\n      this.zIndex = data.zIndex;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/FullScreen/FullScreen.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/HslAnimation.js":
/*!*****************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/HslAnimation.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HslAnimation: () => (/* binding */ HslAnimation)\n/* harmony export */ });\n/* harmony import */ var _ColorAnimation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ColorAnimation.js */ \"../../engine/dist/browser/Options/Classes/ColorAnimation.js\");\n\nclass HslAnimation {\n  constructor() {\n    this.h = new _ColorAnimation_js__WEBPACK_IMPORTED_MODULE_0__.ColorAnimation();\n    this.s = new _ColorAnimation_js__WEBPACK_IMPORTED_MODULE_0__.ColorAnimation();\n    this.l = new _ColorAnimation_js__WEBPACK_IMPORTED_MODULE_0__.ColorAnimation();\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    this.h.load(data.h);\n    this.s.load(data.s);\n    this.l.load(data.l);\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/HslAnimation.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Interactivity/Events/ClickEvent.js":
/*!************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Interactivity/Events/ClickEvent.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ClickEvent: () => (/* binding */ ClickEvent)\n/* harmony export */ });\nclass ClickEvent {\n  constructor() {\n    this.enable = false;\n    this.mode = [];\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n    if (data.mode !== undefined) {\n      this.mode = data.mode;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Interactivity/Events/ClickEvent.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Interactivity/Events/DivEvent.js":
/*!**********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Interactivity/Events/DivEvent.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DivEvent: () => (/* binding */ DivEvent)\n/* harmony export */ });\nclass DivEvent {\n  constructor() {\n    this.selectors = [];\n    this.enable = false;\n    this.mode = [];\n    this.type = \"circle\";\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.selectors !== undefined) {\n      this.selectors = data.selectors;\n    }\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n    if (data.mode !== undefined) {\n      this.mode = data.mode;\n    }\n    if (data.type !== undefined) {\n      this.type = data.type;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Interactivity/Events/DivEvent.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Interactivity/Events/Events.js":
/*!********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Interactivity/Events/Events.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Events: () => (/* binding */ Events)\n/* harmony export */ });\n/* harmony import */ var _ClickEvent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClickEvent.js */ \"../../engine/dist/browser/Options/Classes/Interactivity/Events/ClickEvent.js\");\n/* harmony import */ var _DivEvent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DivEvent.js */ \"../../engine/dist/browser/Options/Classes/Interactivity/Events/DivEvent.js\");\n/* harmony import */ var _HoverEvent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./HoverEvent.js */ \"../../engine/dist/browser/Options/Classes/Interactivity/Events/HoverEvent.js\");\n/* harmony import */ var _ResizeEvent_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ResizeEvent.js */ \"../../engine/dist/browser/Options/Classes/Interactivity/Events/ResizeEvent.js\");\n/* harmony import */ var _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../Utils/Utils.js */ \"../../engine/dist/browser/Utils/Utils.js\");\n\n\n\n\n\nclass Events {\n  constructor() {\n    this.onClick = new _ClickEvent_js__WEBPACK_IMPORTED_MODULE_0__.ClickEvent();\n    this.onDiv = new _DivEvent_js__WEBPACK_IMPORTED_MODULE_1__.DivEvent();\n    this.onHover = new _HoverEvent_js__WEBPACK_IMPORTED_MODULE_2__.HoverEvent();\n    this.resize = new _ResizeEvent_js__WEBPACK_IMPORTED_MODULE_3__.ResizeEvent();\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    this.onClick.load(data.onClick);\n    const onDiv = data.onDiv;\n    if (onDiv !== undefined) {\n      this.onDiv = (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_4__.executeOnSingleOrMultiple)(onDiv, t => {\n        const tmp = new _DivEvent_js__WEBPACK_IMPORTED_MODULE_1__.DivEvent();\n        tmp.load(t);\n        return tmp;\n      });\n    }\n    this.onHover.load(data.onHover);\n    this.resize.load(data.resize);\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Interactivity/Events/Events.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Interactivity/Events/HoverEvent.js":
/*!************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Interactivity/Events/HoverEvent.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HoverEvent: () => (/* binding */ HoverEvent)\n/* harmony export */ });\n/* harmony import */ var _Parallax_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Parallax.js */ \"../../engine/dist/browser/Options/Classes/Interactivity/Events/Parallax.js\");\n\nclass HoverEvent {\n  constructor() {\n    this.enable = false;\n    this.mode = [];\n    this.parallax = new _Parallax_js__WEBPACK_IMPORTED_MODULE_0__.Parallax();\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n    if (data.mode !== undefined) {\n      this.mode = data.mode;\n    }\n    this.parallax.load(data.parallax);\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Interactivity/Events/HoverEvent.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Interactivity/Events/Parallax.js":
/*!**********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Interactivity/Events/Parallax.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Parallax: () => (/* binding */ Parallax)\n/* harmony export */ });\nclass Parallax {\n  constructor() {\n    this.enable = false;\n    this.force = 2;\n    this.smooth = 10;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n    if (data.force !== undefined) {\n      this.force = data.force;\n    }\n    if (data.smooth !== undefined) {\n      this.smooth = data.smooth;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Interactivity/Events/Parallax.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Interactivity/Events/ResizeEvent.js":
/*!*************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Interactivity/Events/ResizeEvent.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ResizeEvent: () => (/* binding */ ResizeEvent)\n/* harmony export */ });\nclass ResizeEvent {\n  constructor() {\n    this.delay = 0.5;\n    this.enable = true;\n  }\n  load(data) {\n    if (data === undefined) {\n      return;\n    }\n    if (data.delay !== undefined) {\n      this.delay = data.delay;\n    }\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Interactivity/Events/ResizeEvent.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Interactivity/Interactivity.js":
/*!********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Interactivity/Interactivity.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Interactivity: () => (/* binding */ Interactivity)\n/* harmony export */ });\n/* harmony import */ var _Events_Events_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Events/Events.js */ \"../../engine/dist/browser/Options/Classes/Interactivity/Events/Events.js\");\n/* harmony import */ var _Modes_Modes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Modes/Modes.js */ \"../../engine/dist/browser/Options/Classes/Interactivity/Modes/Modes.js\");\n\n\nclass Interactivity {\n  constructor(engine, container) {\n    this.detectsOn = \"window\";\n    this.events = new _Events_Events_js__WEBPACK_IMPORTED_MODULE_0__.Events();\n    this.modes = new _Modes_Modes_js__WEBPACK_IMPORTED_MODULE_1__.Modes(engine, container);\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    const detectsOn = data.detectsOn;\n    if (detectsOn !== undefined) {\n      this.detectsOn = detectsOn;\n    }\n    this.events.load(data.events);\n    this.modes.load(data.modes);\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Interactivity/Interactivity.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Interactivity/Modes/Modes.js":
/*!******************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Interactivity/Modes/Modes.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Modes: () => (/* binding */ Modes)\n/* harmony export */ });\nclass Modes {\n  constructor(engine, container) {\n    this._engine = engine;\n    this._container = container;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (!this._container) {\n      return;\n    }\n    const interactors = this._engine.interactors.get(this._container);\n    if (!interactors) {\n      return;\n    }\n    for (const interactor of interactors) {\n      if (!interactor.loadModeOptions) {\n        continue;\n      }\n      interactor.loadModeOptions(this, data);\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Interactivity/Modes/Modes.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/ManualParticle.js":
/*!*******************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/ManualParticle.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ManualParticle: () => (/* binding */ ManualParticle)\n/* harmony export */ });\n/* harmony import */ var _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils.js */ \"../../engine/dist/browser/Utils/Utils.js\");\n\nconst defaultPosition = 50;\nclass ManualParticle {\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.position) {\n      this.position = {\n        x: data.position.x ?? defaultPosition,\n        y: data.position.y ?? defaultPosition,\n        mode: data.position.mode ?? \"percent\"\n      };\n    }\n    if (data.options) {\n      this.options = (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.deepExtend)({}, data.options);\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/ManualParticle.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Options.js":
/*!************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Options.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Options: () => (/* binding */ Options)\n/* harmony export */ });\n/* harmony import */ var _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils.js */ \"../../engine/dist/browser/Utils/Utils.js\");\n/* harmony import */ var _Background_Background_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Background/Background.js */ \"../../engine/dist/browser/Options/Classes/Background/Background.js\");\n/* harmony import */ var _BackgroundMask_BackgroundMask_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BackgroundMask/BackgroundMask.js */ \"../../engine/dist/browser/Options/Classes/BackgroundMask/BackgroundMask.js\");\n/* harmony import */ var _FullScreen_FullScreen_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FullScreen/FullScreen.js */ \"../../engine/dist/browser/Options/Classes/FullScreen/FullScreen.js\");\n/* harmony import */ var _Interactivity_Interactivity_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Interactivity/Interactivity.js */ \"../../engine/dist/browser/Options/Classes/Interactivity/Interactivity.js\");\n/* harmony import */ var _ManualParticle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ManualParticle.js */ \"../../engine/dist/browser/Options/Classes/ManualParticle.js\");\n/* harmony import */ var _Responsive_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Responsive.js */ \"../../engine/dist/browser/Options/Classes/Responsive.js\");\n/* harmony import */ var _Theme_Theme_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Theme/Theme.js */ \"../../engine/dist/browser/Options/Classes/Theme/Theme.js\");\n/* harmony import */ var _Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../Utils/TypeUtils.js */ \"../../engine/dist/browser/Utils/TypeUtils.js\");\n/* harmony import */ var _Utils_OptionsUtils_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../Utils/OptionsUtils.js */ \"../../engine/dist/browser/Utils/OptionsUtils.js\");\n/* harmony import */ var _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../Utils/NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n\n\n\n\n\n\n\n\n\n\n\nclass Options {\n  constructor(engine, container) {\n    this._findDefaultTheme = mode => {\n      return this.themes.find(theme => theme.default.value && theme.default.mode === mode) ?? this.themes.find(theme => theme.default.value && theme.default.mode === \"any\");\n    };\n    this._importPreset = preset => {\n      this.load(this._engine.getPreset(preset));\n    };\n    this._engine = engine;\n    this._container = container;\n    this.autoPlay = true;\n    this.background = new _Background_Background_js__WEBPACK_IMPORTED_MODULE_1__.Background();\n    this.backgroundMask = new _BackgroundMask_BackgroundMask_js__WEBPACK_IMPORTED_MODULE_2__.BackgroundMask();\n    this.clear = true;\n    this.defaultThemes = {};\n    this.delay = 0;\n    this.fullScreen = new _FullScreen_FullScreen_js__WEBPACK_IMPORTED_MODULE_3__.FullScreen();\n    this.detectRetina = true;\n    this.duration = 0;\n    this.fpsLimit = 120;\n    this.interactivity = new _Interactivity_Interactivity_js__WEBPACK_IMPORTED_MODULE_4__.Interactivity(engine, container);\n    this.manualParticles = [];\n    this.particles = (0,_Utils_OptionsUtils_js__WEBPACK_IMPORTED_MODULE_9__.loadParticlesOptions)(this._engine, this._container);\n    this.pauseOnBlur = true;\n    this.pauseOnOutsideViewport = true;\n    this.responsive = [];\n    this.smooth = false;\n    this.style = {};\n    this.themes = [];\n    this.zLayers = 100;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.preset !== undefined) {\n      (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.executeOnSingleOrMultiple)(data.preset, preset => this._importPreset(preset));\n    }\n    if (data.autoPlay !== undefined) {\n      this.autoPlay = data.autoPlay;\n    }\n    if (data.clear !== undefined) {\n      this.clear = data.clear;\n    }\n    if (data.key !== undefined) {\n      this.key = data.key;\n    }\n    if (data.name !== undefined) {\n      this.name = data.name;\n    }\n    if (data.delay !== undefined) {\n      this.delay = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_10__.setRangeValue)(data.delay);\n    }\n    const detectRetina = data.detectRetina;\n    if (detectRetina !== undefined) {\n      this.detectRetina = detectRetina;\n    }\n    if (data.duration !== undefined) {\n      this.duration = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_10__.setRangeValue)(data.duration);\n    }\n    const fpsLimit = data.fpsLimit;\n    if (fpsLimit !== undefined) {\n      this.fpsLimit = fpsLimit;\n    }\n    if (data.pauseOnBlur !== undefined) {\n      this.pauseOnBlur = data.pauseOnBlur;\n    }\n    if (data.pauseOnOutsideViewport !== undefined) {\n      this.pauseOnOutsideViewport = data.pauseOnOutsideViewport;\n    }\n    if (data.zLayers !== undefined) {\n      this.zLayers = data.zLayers;\n    }\n    this.background.load(data.background);\n    const fullScreen = data.fullScreen;\n    if ((0,_Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_8__.isBoolean)(fullScreen)) {\n      this.fullScreen.enable = fullScreen;\n    } else {\n      this.fullScreen.load(fullScreen);\n    }\n    this.backgroundMask.load(data.backgroundMask);\n    this.interactivity.load(data.interactivity);\n    if (data.manualParticles) {\n      this.manualParticles = data.manualParticles.map(t => {\n        const tmp = new _ManualParticle_js__WEBPACK_IMPORTED_MODULE_5__.ManualParticle();\n        tmp.load(t);\n        return tmp;\n      });\n    }\n    this.particles.load(data.particles);\n    this.style = (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.deepExtend)(this.style, data.style);\n    this._engine.loadOptions(this, data);\n    if (data.smooth !== undefined) {\n      this.smooth = data.smooth;\n    }\n    const interactors = this._engine.interactors.get(this._container);\n    if (interactors) {\n      for (const interactor of interactors) {\n        if (interactor.loadOptions) {\n          interactor.loadOptions(this, data);\n        }\n      }\n    }\n    if (data.responsive !== undefined) {\n      for (const responsive of data.responsive) {\n        const optResponsive = new _Responsive_js__WEBPACK_IMPORTED_MODULE_6__.Responsive();\n        optResponsive.load(responsive);\n        this.responsive.push(optResponsive);\n      }\n    }\n    this.responsive.sort((a, b) => a.maxWidth - b.maxWidth);\n    if (data.themes !== undefined) {\n      for (const theme of data.themes) {\n        const existingTheme = this.themes.find(t => t.name === theme.name);\n        if (!existingTheme) {\n          const optTheme = new _Theme_Theme_js__WEBPACK_IMPORTED_MODULE_7__.Theme();\n          optTheme.load(theme);\n          this.themes.push(optTheme);\n        } else {\n          existingTheme.load(theme);\n        }\n      }\n    }\n    this.defaultThemes.dark = this._findDefaultTheme(\"dark\")?.name;\n    this.defaultThemes.light = this._findDefaultTheme(\"light\")?.name;\n  }\n  setResponsive(width, pxRatio, defaultOptions) {\n    this.load(defaultOptions);\n    const responsiveOptions = this.responsive.find(t => t.mode === \"screen\" && screen ? t.maxWidth > screen.availWidth : t.maxWidth * pxRatio > width);\n    this.load(responsiveOptions?.options);\n    return responsiveOptions?.maxWidth;\n  }\n  setTheme(name) {\n    if (name) {\n      const chosenTheme = this.themes.find(theme => theme.name === name);\n      if (chosenTheme) {\n        this.load(chosenTheme.options);\n      }\n    } else {\n      const mediaMatch = (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.safeMatchMedia)(\"(prefers-color-scheme: dark)\"),\n        clientDarkMode = mediaMatch && mediaMatch.matches,\n        defaultTheme = this._findDefaultTheme(clientDarkMode ? \"dark\" : \"light\");\n      if (defaultTheme) {\n        this.load(defaultTheme.options);\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Options.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/OptionsColor.js":
/*!*****************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/OptionsColor.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   OptionsColor: () => (/* binding */ OptionsColor)\n/* harmony export */ });\n/* harmony import */ var _Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/TypeUtils.js */ \"../../engine/dist/browser/Utils/TypeUtils.js\");\n\nclass OptionsColor {\n  constructor() {\n    this.value = \"\";\n  }\n  static create(source, data) {\n    const color = new OptionsColor();\n    color.load(source);\n    if (data !== undefined) {\n      if ((0,_Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_0__.isString)(data) || (0,_Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_0__.isArray)(data)) {\n        color.load({\n          value: data\n        });\n      } else {\n        color.load(data);\n      }\n    }\n    return color;\n  }\n  load(data) {\n    if (data?.value === undefined) {\n      return;\n    }\n    this.value = data.value;\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/OptionsColor.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Bounce/ParticlesBounce.js":
/*!*************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Bounce/ParticlesBounce.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ParticlesBounce: () => (/* binding */ ParticlesBounce)\n/* harmony export */ });\n/* harmony import */ var _ParticlesBounceFactor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ParticlesBounceFactor.js */ \"../../engine/dist/browser/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js\");\n\nclass ParticlesBounce {\n  constructor() {\n    this.horizontal = new _ParticlesBounceFactor_js__WEBPACK_IMPORTED_MODULE_0__.ParticlesBounceFactor();\n    this.vertical = new _ParticlesBounceFactor_js__WEBPACK_IMPORTED_MODULE_0__.ParticlesBounceFactor();\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    this.horizontal.load(data.horizontal);\n    this.vertical.load(data.vertical);\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Bounce/ParticlesBounce.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js":
/*!*******************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ParticlesBounceFactor: () => (/* binding */ ParticlesBounceFactor)\n/* harmony export */ });\n/* harmony import */ var _ValueWithRandom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ValueWithRandom.js */ \"../../engine/dist/browser/Options/Classes/ValueWithRandom.js\");\n\nclass ParticlesBounceFactor extends _ValueWithRandom_js__WEBPACK_IMPORTED_MODULE_0__.ValueWithRandom {\n  constructor() {\n    super();\n    this.value = 1;\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Collisions/Collisions.js":
/*!************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Collisions/Collisions.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Collisions: () => (/* binding */ Collisions)\n/* harmony export */ });\n/* harmony import */ var _CollisionsAbsorb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CollisionsAbsorb.js */ \"../../engine/dist/browser/Options/Classes/Particles/Collisions/CollisionsAbsorb.js\");\n/* harmony import */ var _CollisionsOverlap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CollisionsOverlap.js */ \"../../engine/dist/browser/Options/Classes/Particles/Collisions/CollisionsOverlap.js\");\n/* harmony import */ var _Bounce_ParticlesBounce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Bounce/ParticlesBounce.js */ \"../../engine/dist/browser/Options/Classes/Particles/Bounce/ParticlesBounce.js\");\n/* harmony import */ var _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../Utils/NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n\n\n\n\nclass Collisions {\n  constructor() {\n    this.absorb = new _CollisionsAbsorb_js__WEBPACK_IMPORTED_MODULE_0__.CollisionsAbsorb();\n    this.bounce = new _Bounce_ParticlesBounce_js__WEBPACK_IMPORTED_MODULE_2__.ParticlesBounce();\n    this.enable = false;\n    this.maxSpeed = 50;\n    this.mode = \"bounce\";\n    this.overlap = new _CollisionsOverlap_js__WEBPACK_IMPORTED_MODULE_1__.CollisionsOverlap();\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    this.absorb.load(data.absorb);\n    this.bounce.load(data.bounce);\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n    if (data.maxSpeed !== undefined) {\n      this.maxSpeed = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_3__.setRangeValue)(data.maxSpeed);\n    }\n    if (data.mode !== undefined) {\n      this.mode = data.mode;\n    }\n    this.overlap.load(data.overlap);\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Collisions/Collisions.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Collisions/CollisionsAbsorb.js":
/*!******************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Collisions/CollisionsAbsorb.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CollisionsAbsorb: () => (/* binding */ CollisionsAbsorb)\n/* harmony export */ });\nclass CollisionsAbsorb {\n  constructor() {\n    this.speed = 2;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.speed !== undefined) {\n      this.speed = data.speed;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Collisions/CollisionsAbsorb.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Collisions/CollisionsOverlap.js":
/*!*******************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Collisions/CollisionsOverlap.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   CollisionsOverlap: () => (/* binding */ CollisionsOverlap)\n/* harmony export */ });\nclass CollisionsOverlap {\n  constructor() {\n    this.enable = true;\n    this.retries = 0;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n    if (data.retries !== undefined) {\n      this.retries = data.retries;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Collisions/CollisionsOverlap.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Effect/Effect.js":
/*!****************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Effect/Effect.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Effect: () => (/* binding */ Effect)\n/* harmony export */ });\n/* harmony import */ var _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/Utils.js */ \"../../engine/dist/browser/Utils/Utils.js\");\n\nclass Effect {\n  constructor() {\n    this.close = true;\n    this.fill = true;\n    this.options = {};\n    this.type = [];\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    const options = data.options;\n    if (options !== undefined) {\n      for (const effect in options) {\n        const item = options[effect];\n        if (item) {\n          this.options[effect] = (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.deepExtend)(this.options[effect] ?? {}, item);\n        }\n      }\n    }\n    if (data.close !== undefined) {\n      this.close = data.close;\n    }\n    if (data.fill !== undefined) {\n      this.fill = data.fill;\n    }\n    if (data.type !== undefined) {\n      this.type = data.type;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Effect/Effect.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Move/Move.js":
/*!************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Move/Move.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Move: () => (/* binding */ Move)\n/* harmony export */ });\n/* harmony import */ var _Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/TypeUtils.js */ \"../../engine/dist/browser/Utils/TypeUtils.js\");\n/* harmony import */ var _MoveAngle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MoveAngle.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/MoveAngle.js\");\n/* harmony import */ var _MoveAttract_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MoveAttract.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/MoveAttract.js\");\n/* harmony import */ var _MoveCenter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MoveCenter.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/MoveCenter.js\");\n/* harmony import */ var _MoveGravity_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MoveGravity.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/MoveGravity.js\");\n/* harmony import */ var _Path_MovePath_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Path/MovePath.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/Path/MovePath.js\");\n/* harmony import */ var _MoveTrail_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./MoveTrail.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/MoveTrail.js\");\n/* harmony import */ var _OutModes_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./OutModes.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/OutModes.js\");\n/* harmony import */ var _Spin_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Spin.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/Spin.js\");\n/* harmony import */ var _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../Utils/NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n\n\n\n\n\n\n\n\n\n\nclass Move {\n  constructor() {\n    this.angle = new _MoveAngle_js__WEBPACK_IMPORTED_MODULE_1__.MoveAngle();\n    this.attract = new _MoveAttract_js__WEBPACK_IMPORTED_MODULE_2__.MoveAttract();\n    this.center = new _MoveCenter_js__WEBPACK_IMPORTED_MODULE_3__.MoveCenter();\n    this.decay = 0;\n    this.distance = {};\n    this.direction = \"none\";\n    this.drift = 0;\n    this.enable = false;\n    this.gravity = new _MoveGravity_js__WEBPACK_IMPORTED_MODULE_4__.MoveGravity();\n    this.path = new _Path_MovePath_js__WEBPACK_IMPORTED_MODULE_5__.MovePath();\n    this.outModes = new _OutModes_js__WEBPACK_IMPORTED_MODULE_7__.OutModes();\n    this.random = false;\n    this.size = false;\n    this.speed = 2;\n    this.spin = new _Spin_js__WEBPACK_IMPORTED_MODULE_8__.Spin();\n    this.straight = false;\n    this.trail = new _MoveTrail_js__WEBPACK_IMPORTED_MODULE_6__.MoveTrail();\n    this.vibrate = false;\n    this.warp = false;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    this.angle.load((0,_Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_0__.isNumber)(data.angle) ? {\n      value: data.angle\n    } : data.angle);\n    this.attract.load(data.attract);\n    this.center.load(data.center);\n    if (data.decay !== undefined) {\n      this.decay = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_9__.setRangeValue)(data.decay);\n    }\n    if (data.direction !== undefined) {\n      this.direction = data.direction;\n    }\n    if (data.distance !== undefined) {\n      this.distance = (0,_Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_0__.isNumber)(data.distance) ? {\n        horizontal: data.distance,\n        vertical: data.distance\n      } : {\n        ...data.distance\n      };\n    }\n    if (data.drift !== undefined) {\n      this.drift = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_9__.setRangeValue)(data.drift);\n    }\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n    this.gravity.load(data.gravity);\n    const outModes = data.outModes;\n    if (outModes !== undefined) {\n      if ((0,_Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(outModes)) {\n        this.outModes.load(outModes);\n      } else {\n        this.outModes.load({\n          default: outModes\n        });\n      }\n    }\n    this.path.load(data.path);\n    if (data.random !== undefined) {\n      this.random = data.random;\n    }\n    if (data.size !== undefined) {\n      this.size = data.size;\n    }\n    if (data.speed !== undefined) {\n      this.speed = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_9__.setRangeValue)(data.speed);\n    }\n    this.spin.load(data.spin);\n    if (data.straight !== undefined) {\n      this.straight = data.straight;\n    }\n    this.trail.load(data.trail);\n    if (data.vibrate !== undefined) {\n      this.vibrate = data.vibrate;\n    }\n    if (data.warp !== undefined) {\n      this.warp = data.warp;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Move/Move.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Move/MoveAngle.js":
/*!*****************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Move/MoveAngle.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MoveAngle: () => (/* binding */ MoveAngle)\n/* harmony export */ });\n/* harmony import */ var _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n\nclass MoveAngle {\n  constructor() {\n    this.offset = 0;\n    this.value = 90;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.offset !== undefined) {\n      this.offset = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.offset);\n    }\n    if (data.value !== undefined) {\n      this.value = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.value);\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Move/MoveAngle.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Move/MoveAttract.js":
/*!*******************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Move/MoveAttract.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MoveAttract: () => (/* binding */ MoveAttract)\n/* harmony export */ });\n/* harmony import */ var _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n\nclass MoveAttract {\n  constructor() {\n    this.distance = 200;\n    this.enable = false;\n    this.rotate = {\n      x: 3000,\n      y: 3000\n    };\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.distance !== undefined) {\n      this.distance = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.distance);\n    }\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n    if (data.rotate) {\n      const rotateX = data.rotate.x;\n      if (rotateX !== undefined) {\n        this.rotate.x = rotateX;\n      }\n      const rotateY = data.rotate.y;\n      if (rotateY !== undefined) {\n        this.rotate.y = rotateY;\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Move/MoveAttract.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Move/MoveCenter.js":
/*!******************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Move/MoveCenter.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MoveCenter: () => (/* binding */ MoveCenter)\n/* harmony export */ });\nclass MoveCenter {\n  constructor() {\n    this.x = 50;\n    this.y = 50;\n    this.mode = \"percent\";\n    this.radius = 0;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.x !== undefined) {\n      this.x = data.x;\n    }\n    if (data.y !== undefined) {\n      this.y = data.y;\n    }\n    if (data.mode !== undefined) {\n      this.mode = data.mode;\n    }\n    if (data.radius !== undefined) {\n      this.radius = data.radius;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Move/MoveCenter.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Move/MoveGravity.js":
/*!*******************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Move/MoveGravity.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MoveGravity: () => (/* binding */ MoveGravity)\n/* harmony export */ });\n/* harmony import */ var _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n\nclass MoveGravity {\n  constructor() {\n    this.acceleration = 9.81;\n    this.enable = false;\n    this.inverse = false;\n    this.maxSpeed = 50;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.acceleration !== undefined) {\n      this.acceleration = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.acceleration);\n    }\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n    if (data.inverse !== undefined) {\n      this.inverse = data.inverse;\n    }\n    if (data.maxSpeed !== undefined) {\n      this.maxSpeed = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(data.maxSpeed);\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Move/MoveGravity.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Move/MoveTrail.js":
/*!*****************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Move/MoveTrail.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MoveTrail: () => (/* binding */ MoveTrail)\n/* harmony export */ });\n/* harmony import */ var _MoveTrailFill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MoveTrailFill.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/MoveTrailFill.js\");\n\nclass MoveTrail {\n  constructor() {\n    this.enable = false;\n    this.length = 10;\n    this.fill = new _MoveTrailFill_js__WEBPACK_IMPORTED_MODULE_0__.MoveTrailFill();\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n    if (data.fill !== undefined) {\n      this.fill.load(data.fill);\n    }\n    if (data.length !== undefined) {\n      this.length = data.length;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Move/MoveTrail.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Move/MoveTrailFill.js":
/*!*********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Move/MoveTrailFill.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MoveTrailFill: () => (/* binding */ MoveTrailFill)\n/* harmony export */ });\n/* harmony import */ var _OptionsColor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../OptionsColor.js */ \"../../engine/dist/browser/Options/Classes/OptionsColor.js\");\n\nclass MoveTrailFill {\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.color !== undefined) {\n      this.color = _OptionsColor_js__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.color, data.color);\n    }\n    if (data.image !== undefined) {\n      this.image = data.image;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Move/MoveTrailFill.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Move/OutModes.js":
/*!****************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Move/OutModes.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   OutModes: () => (/* binding */ OutModes)\n/* harmony export */ });\nclass OutModes {\n  constructor() {\n    this.default = \"out\";\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.default !== undefined) {\n      this.default = data.default;\n    }\n    this.bottom = data.bottom ?? data.default;\n    this.left = data.left ?? data.default;\n    this.right = data.right ?? data.default;\n    this.top = data.top ?? data.default;\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Move/OutModes.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Move/Path/MovePath.js":
/*!*********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Move/Path/MovePath.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MovePath: () => (/* binding */ MovePath)\n/* harmony export */ });\n/* harmony import */ var _ValueWithRandom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../ValueWithRandom.js */ \"../../engine/dist/browser/Options/Classes/ValueWithRandom.js\");\n/* harmony import */ var _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../Utils/Utils.js */ \"../../engine/dist/browser/Utils/Utils.js\");\n\n\nclass MovePath {\n  constructor() {\n    this.clamp = true;\n    this.delay = new _ValueWithRandom_js__WEBPACK_IMPORTED_MODULE_0__.ValueWithRandom();\n    this.enable = false;\n    this.options = {};\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.clamp !== undefined) {\n      this.clamp = data.clamp;\n    }\n    this.delay.load(data.delay);\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n    this.generator = data.generator;\n    if (data.options) {\n      this.options = (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__.deepExtend)(this.options, data.options);\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Move/Path/MovePath.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Move/Spin.js":
/*!************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Move/Spin.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Spin: () => (/* binding */ Spin)\n/* harmony export */ });\n/* harmony import */ var _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/Utils.js */ \"../../engine/dist/browser/Utils/Utils.js\");\n/* harmony import */ var _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../Utils/NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n\n\nclass Spin {\n  constructor() {\n    this.acceleration = 0;\n    this.enable = false;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.acceleration !== undefined) {\n      this.acceleration = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.acceleration);\n    }\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n    if (data.position) {\n      this.position = (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.deepExtend)({}, data.position);\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Move/Spin.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesDensity.js":
/*!**************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesDensity.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ParticlesDensity: () => (/* binding */ ParticlesDensity)\n/* harmony export */ });\nclass ParticlesDensity {\n  constructor() {\n    this.enable = false;\n    this.width = 1920;\n    this.height = 1080;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n    const width = data.width;\n    if (width !== undefined) {\n      this.width = width;\n    }\n    const height = data.height;\n    if (height !== undefined) {\n      this.height = height;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesDensity.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesNumber.js":
/*!*************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesNumber.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ParticlesNumber: () => (/* binding */ ParticlesNumber)\n/* harmony export */ });\n/* harmony import */ var _ParticlesDensity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ParticlesDensity.js */ \"../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesDensity.js\");\n/* harmony import */ var _ParticlesNumberLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ParticlesNumberLimit.js */ \"../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesNumberLimit.js\");\n\n\nclass ParticlesNumber {\n  constructor() {\n    this.density = new _ParticlesDensity_js__WEBPACK_IMPORTED_MODULE_0__.ParticlesDensity();\n    this.limit = new _ParticlesNumberLimit_js__WEBPACK_IMPORTED_MODULE_1__.ParticlesNumberLimit();\n    this.value = 0;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    this.density.load(data.density);\n    this.limit.load(data.limit);\n    if (data.value !== undefined) {\n      this.value = data.value;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesNumber.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesNumberLimit.js":
/*!******************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesNumberLimit.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ParticlesNumberLimit: () => (/* binding */ ParticlesNumberLimit)\n/* harmony export */ });\nclass ParticlesNumberLimit {\n  constructor() {\n    this.mode = \"delete\";\n    this.value = 0;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.mode !== undefined) {\n      this.mode = data.mode;\n    }\n    if (data.value !== undefined) {\n      this.value = data.value;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesNumberLimit.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Opacity/Opacity.js":
/*!******************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Opacity/Opacity.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Opacity: () => (/* binding */ Opacity)\n/* harmony export */ });\n/* harmony import */ var _OpacityAnimation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./OpacityAnimation.js */ \"../../engine/dist/browser/Options/Classes/Particles/Opacity/OpacityAnimation.js\");\n/* harmony import */ var _ValueWithRandom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ValueWithRandom.js */ \"../../engine/dist/browser/Options/Classes/ValueWithRandom.js\");\n\n\nclass Opacity extends _ValueWithRandom_js__WEBPACK_IMPORTED_MODULE_1__.RangedAnimationValueWithRandom {\n  constructor() {\n    super();\n    this.animation = new _OpacityAnimation_js__WEBPACK_IMPORTED_MODULE_0__.OpacityAnimation();\n    this.value = 1;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    super.load(data);\n    const animation = data.animation;\n    if (animation !== undefined) {\n      this.animation.load(animation);\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Opacity/Opacity.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Opacity/OpacityAnimation.js":
/*!***************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Opacity/OpacityAnimation.js ***!
  \***************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   OpacityAnimation: () => (/* binding */ OpacityAnimation)\n/* harmony export */ });\n/* harmony import */ var _AnimationOptions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AnimationOptions.js */ \"../../engine/dist/browser/Options/Classes/AnimationOptions.js\");\n\nclass OpacityAnimation extends _AnimationOptions_js__WEBPACK_IMPORTED_MODULE_0__.RangedAnimationOptions {\n  constructor() {\n    super();\n    this.destroy = \"none\";\n    this.speed = 2;\n  }\n  load(data) {\n    super.load(data);\n    if (!data) {\n      return;\n    }\n    if (data.destroy !== undefined) {\n      this.destroy = data.destroy;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Opacity/OpacityAnimation.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/ParticlesOptions.js":
/*!*******************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/ParticlesOptions.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ParticlesOptions: () => (/* binding */ ParticlesOptions)\n/* harmony export */ });\n/* harmony import */ var _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../Utils/Utils.js */ \"../../engine/dist/browser/Utils/Utils.js\");\n/* harmony import */ var _AnimatableColor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../AnimatableColor.js */ \"../../engine/dist/browser/Options/Classes/AnimatableColor.js\");\n/* harmony import */ var _Collisions_Collisions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Collisions/Collisions.js */ \"../../engine/dist/browser/Options/Classes/Particles/Collisions/Collisions.js\");\n/* harmony import */ var _Effect_Effect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Effect/Effect.js */ \"../../engine/dist/browser/Options/Classes/Particles/Effect/Effect.js\");\n/* harmony import */ var _Move_Move_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Move/Move.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/Move.js\");\n/* harmony import */ var _Opacity_Opacity_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Opacity/Opacity.js */ \"../../engine/dist/browser/Options/Classes/Particles/Opacity/Opacity.js\");\n/* harmony import */ var _Bounce_ParticlesBounce_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Bounce/ParticlesBounce.js */ \"../../engine/dist/browser/Options/Classes/Particles/Bounce/ParticlesBounce.js\");\n/* harmony import */ var _Number_ParticlesNumber_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Number/ParticlesNumber.js */ \"../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesNumber.js\");\n/* harmony import */ var _Shadow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Shadow.js */ \"../../engine/dist/browser/Options/Classes/Particles/Shadow.js\");\n/* harmony import */ var _Shape_Shape_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Shape/Shape.js */ \"../../engine/dist/browser/Options/Classes/Particles/Shape/Shape.js\");\n/* harmony import */ var _Size_Size_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Size/Size.js */ \"../../engine/dist/browser/Options/Classes/Particles/Size/Size.js\");\n/* harmony import */ var _Stroke_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Stroke.js */ \"../../engine/dist/browser/Options/Classes/Particles/Stroke.js\");\n/* harmony import */ var _ZIndex_ZIndex_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./ZIndex/ZIndex.js */ \"../../engine/dist/browser/Options/Classes/Particles/ZIndex/ZIndex.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\nclass ParticlesOptions {\n  constructor(engine, container) {\n    this._engine = engine;\n    this._container = container;\n    this.bounce = new _Bounce_ParticlesBounce_js__WEBPACK_IMPORTED_MODULE_6__.ParticlesBounce();\n    this.collisions = new _Collisions_Collisions_js__WEBPACK_IMPORTED_MODULE_2__.Collisions();\n    this.color = new _AnimatableColor_js__WEBPACK_IMPORTED_MODULE_1__.AnimatableColor();\n    this.color.value = \"#fff\";\n    this.effect = new _Effect_Effect_js__WEBPACK_IMPORTED_MODULE_3__.Effect();\n    this.groups = {};\n    this.move = new _Move_Move_js__WEBPACK_IMPORTED_MODULE_4__.Move();\n    this.number = new _Number_ParticlesNumber_js__WEBPACK_IMPORTED_MODULE_7__.ParticlesNumber();\n    this.opacity = new _Opacity_Opacity_js__WEBPACK_IMPORTED_MODULE_5__.Opacity();\n    this.reduceDuplicates = false;\n    this.shadow = new _Shadow_js__WEBPACK_IMPORTED_MODULE_8__.Shadow();\n    this.shape = new _Shape_Shape_js__WEBPACK_IMPORTED_MODULE_9__.Shape();\n    this.size = new _Size_Size_js__WEBPACK_IMPORTED_MODULE_10__.Size();\n    this.stroke = new _Stroke_js__WEBPACK_IMPORTED_MODULE_11__.Stroke();\n    this.zIndex = new _ZIndex_ZIndex_js__WEBPACK_IMPORTED_MODULE_12__.ZIndex();\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.groups !== undefined) {\n      for (const group of Object.keys(data.groups)) {\n        if (!Object.hasOwn(data.groups, group)) {\n          continue;\n        }\n        const item = data.groups[group];\n        if (item !== undefined) {\n          this.groups[group] = (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.deepExtend)(this.groups[group] ?? {}, item);\n        }\n      }\n    }\n    if (data.reduceDuplicates !== undefined) {\n      this.reduceDuplicates = data.reduceDuplicates;\n    }\n    this.bounce.load(data.bounce);\n    this.color.load(_AnimatableColor_js__WEBPACK_IMPORTED_MODULE_1__.AnimatableColor.create(this.color, data.color));\n    this.effect.load(data.effect);\n    this.move.load(data.move);\n    this.number.load(data.number);\n    this.opacity.load(data.opacity);\n    this.shape.load(data.shape);\n    this.size.load(data.size);\n    this.shadow.load(data.shadow);\n    this.zIndex.load(data.zIndex);\n    this.collisions.load(data.collisions);\n    if (data.interactivity !== undefined) {\n      this.interactivity = (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.deepExtend)({}, data.interactivity);\n    }\n    const strokeToLoad = data.stroke;\n    if (strokeToLoad) {\n      this.stroke = (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.executeOnSingleOrMultiple)(strokeToLoad, t => {\n        const tmp = new _Stroke_js__WEBPACK_IMPORTED_MODULE_11__.Stroke();\n        tmp.load(t);\n        return tmp;\n      });\n    }\n    if (this._container) {\n      const updaters = this._engine.updaters.get(this._container);\n      if (updaters) {\n        for (const updater of updaters) {\n          if (updater.loadOptions) {\n            updater.loadOptions(this, data);\n          }\n        }\n      }\n      const interactors = this._engine.interactors.get(this._container);\n      if (interactors) {\n        for (const interactor of interactors) {\n          if (interactor.loadParticlesOptions) {\n            interactor.loadParticlesOptions(this, data);\n          }\n        }\n      }\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/ParticlesOptions.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Shadow.js":
/*!*********************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Shadow.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Shadow: () => (/* binding */ Shadow)\n/* harmony export */ });\n/* harmony import */ var _OptionsColor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../OptionsColor.js */ \"../../engine/dist/browser/Options/Classes/OptionsColor.js\");\n\nclass Shadow {\n  constructor() {\n    this.blur = 0;\n    this.color = new _OptionsColor_js__WEBPACK_IMPORTED_MODULE_0__.OptionsColor();\n    this.enable = false;\n    this.offset = {\n      x: 0,\n      y: 0\n    };\n    this.color.value = \"#000\";\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.blur !== undefined) {\n      this.blur = data.blur;\n    }\n    this.color = _OptionsColor_js__WEBPACK_IMPORTED_MODULE_0__.OptionsColor.create(this.color, data.color);\n    if (data.enable !== undefined) {\n      this.enable = data.enable;\n    }\n    if (data.offset === undefined) {\n      return;\n    }\n    if (data.offset.x !== undefined) {\n      this.offset.x = data.offset.x;\n    }\n    if (data.offset.y !== undefined) {\n      this.offset.y = data.offset.y;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Shadow.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Shape/Shape.js":
/*!**************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Shape/Shape.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Shape: () => (/* binding */ Shape)\n/* harmony export */ });\n/* harmony import */ var _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../Utils/Utils.js */ \"../../engine/dist/browser/Utils/Utils.js\");\n\nclass Shape {\n  constructor() {\n    this.close = true;\n    this.fill = true;\n    this.options = {};\n    this.type = \"circle\";\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    const options = data.options;\n    if (options !== undefined) {\n      for (const shape in options) {\n        const item = options[shape];\n        if (item) {\n          this.options[shape] = (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.deepExtend)(this.options[shape] ?? {}, item);\n        }\n      }\n    }\n    if (data.close !== undefined) {\n      this.close = data.close;\n    }\n    if (data.fill !== undefined) {\n      this.fill = data.fill;\n    }\n    if (data.type !== undefined) {\n      this.type = data.type;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Shape/Shape.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Size/Size.js":
/*!************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Size/Size.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Size: () => (/* binding */ Size)\n/* harmony export */ });\n/* harmony import */ var _ValueWithRandom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ValueWithRandom.js */ \"../../engine/dist/browser/Options/Classes/ValueWithRandom.js\");\n/* harmony import */ var _SizeAnimation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SizeAnimation.js */ \"../../engine/dist/browser/Options/Classes/Particles/Size/SizeAnimation.js\");\n\n\nclass Size extends _ValueWithRandom_js__WEBPACK_IMPORTED_MODULE_0__.RangedAnimationValueWithRandom {\n  constructor() {\n    super();\n    this.animation = new _SizeAnimation_js__WEBPACK_IMPORTED_MODULE_1__.SizeAnimation();\n    this.value = 3;\n  }\n  load(data) {\n    super.load(data);\n    if (!data) {\n      return;\n    }\n    const animation = data.animation;\n    if (animation !== undefined) {\n      this.animation.load(animation);\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Size/Size.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Size/SizeAnimation.js":
/*!*********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Size/SizeAnimation.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SizeAnimation: () => (/* binding */ SizeAnimation)\n/* harmony export */ });\n/* harmony import */ var _AnimationOptions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../AnimationOptions.js */ \"../../engine/dist/browser/Options/Classes/AnimationOptions.js\");\n\nclass SizeAnimation extends _AnimationOptions_js__WEBPACK_IMPORTED_MODULE_0__.RangedAnimationOptions {\n  constructor() {\n    super();\n    this.destroy = \"none\";\n    this.speed = 5;\n  }\n  load(data) {\n    super.load(data);\n    if (!data) {\n      return;\n    }\n    if (data.destroy !== undefined) {\n      this.destroy = data.destroy;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Size/SizeAnimation.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/Stroke.js":
/*!*********************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/Stroke.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Stroke: () => (/* binding */ Stroke)\n/* harmony export */ });\n/* harmony import */ var _AnimatableColor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../AnimatableColor.js */ \"../../engine/dist/browser/Options/Classes/AnimatableColor.js\");\n/* harmony import */ var _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Utils/NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n\n\nclass Stroke {\n  constructor() {\n    this.width = 0;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.color !== undefined) {\n      this.color = _AnimatableColor_js__WEBPACK_IMPORTED_MODULE_0__.AnimatableColor.create(this.color, data.color);\n    }\n    if (data.width !== undefined) {\n      this.width = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.width);\n    }\n    if (data.opacity !== undefined) {\n      this.opacity = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.opacity);\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/Stroke.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Particles/ZIndex/ZIndex.js":
/*!****************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Particles/ZIndex/ZIndex.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ZIndex: () => (/* binding */ ZIndex)\n/* harmony export */ });\n/* harmony import */ var _ValueWithRandom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../ValueWithRandom.js */ \"../../engine/dist/browser/Options/Classes/ValueWithRandom.js\");\n\nclass ZIndex extends _ValueWithRandom_js__WEBPACK_IMPORTED_MODULE_0__.ValueWithRandom {\n  constructor() {\n    super();\n    this.opacityRate = 1;\n    this.sizeRate = 1;\n    this.velocityRate = 1;\n  }\n  load(data) {\n    super.load(data);\n    if (!data) {\n      return;\n    }\n    if (data.opacityRate !== undefined) {\n      this.opacityRate = data.opacityRate;\n    }\n    if (data.sizeRate !== undefined) {\n      this.sizeRate = data.sizeRate;\n    }\n    if (data.velocityRate !== undefined) {\n      this.velocityRate = data.velocityRate;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Particles/ZIndex/ZIndex.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Responsive.js":
/*!***************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Responsive.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Responsive: () => (/* binding */ Responsive)\n/* harmony export */ });\n/* harmony import */ var _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Utils/Utils.js */ \"../../engine/dist/browser/Utils/Utils.js\");\n\nclass Responsive {\n  constructor() {\n    this.maxWidth = Infinity;\n    this.options = {};\n    this.mode = \"canvas\";\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.maxWidth !== undefined) {\n      this.maxWidth = data.maxWidth;\n    }\n    if (data.mode !== undefined) {\n      if (data.mode === \"screen\") {\n        this.mode = \"screen\";\n      } else {\n        this.mode = \"canvas\";\n      }\n    }\n    if (data.options !== undefined) {\n      this.options = (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_0__.deepExtend)({}, data.options);\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Responsive.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Theme/Theme.js":
/*!****************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Theme/Theme.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Theme: () => (/* binding */ Theme)\n/* harmony export */ });\n/* harmony import */ var _ThemeDefault_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ThemeDefault.js */ \"../../engine/dist/browser/Options/Classes/Theme/ThemeDefault.js\");\n/* harmony import */ var _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../Utils/Utils.js */ \"../../engine/dist/browser/Utils/Utils.js\");\n\n\nclass Theme {\n  constructor() {\n    this.name = \"\";\n    this.default = new _ThemeDefault_js__WEBPACK_IMPORTED_MODULE_0__.ThemeDefault();\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.name !== undefined) {\n      this.name = data.name;\n    }\n    this.default.load(data.default);\n    if (data.options !== undefined) {\n      this.options = (0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__.deepExtend)({}, data.options);\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Theme/Theme.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/Theme/ThemeDefault.js":
/*!***********************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/Theme/ThemeDefault.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeDefault: () => (/* binding */ ThemeDefault)\n/* harmony export */ });\nclass ThemeDefault {\n  constructor() {\n    this.auto = false;\n    this.mode = \"any\";\n    this.value = false;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.auto !== undefined) {\n      this.auto = data.auto;\n    }\n    if (data.mode !== undefined) {\n      this.mode = data.mode;\n    }\n    if (data.value !== undefined) {\n      this.value = data.value;\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/Theme/ThemeDefault.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Classes/ValueWithRandom.js":
/*!********************************************************************!*\
  !*** ../../engine/dist/browser/Options/Classes/ValueWithRandom.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AnimationValueWithRandom: () => (/* binding */ AnimationValueWithRandom),\n/* harmony export */   RangedAnimationValueWithRandom: () => (/* binding */ RangedAnimationValueWithRandom),\n/* harmony export */   ValueWithRandom: () => (/* binding */ ValueWithRandom)\n/* harmony export */ });\n/* harmony import */ var _AnimationOptions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./AnimationOptions.js */ \"../../engine/dist/browser/Options/Classes/AnimationOptions.js\");\n/* harmony import */ var _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../Utils/NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n\n\nclass ValueWithRandom {\n  constructor() {\n    this.value = 0;\n  }\n  load(data) {\n    if (!data) {\n      return;\n    }\n    if (data.value !== undefined) {\n      this.value = (0,_Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_1__.setRangeValue)(data.value);\n    }\n  }\n}\nclass AnimationValueWithRandom extends ValueWithRandom {\n  constructor() {\n    super();\n    this.animation = new _AnimationOptions_js__WEBPACK_IMPORTED_MODULE_0__.AnimationOptions();\n  }\n  load(data) {\n    super.load(data);\n    if (!data) {\n      return;\n    }\n    const animation = data.animation;\n    if (animation !== undefined) {\n      this.animation.load(animation);\n    }\n  }\n}\nclass RangedAnimationValueWithRandom extends AnimationValueWithRandom {\n  constructor() {\n    super();\n    this.animation = new _AnimationOptions_js__WEBPACK_IMPORTED_MODULE_0__.RangedAnimationOptions();\n  }\n  load(data) {\n    super.load(data);\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Classes/ValueWithRandom.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Background/IBackground.js":
/*!******************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Background/IBackground.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Background/IBackground.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/BackgroundMask/IBackgroundMask.js":
/*!**************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/BackgroundMask/IBackgroundMask.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/BackgroundMask/IBackgroundMask.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/BackgroundMask/IBackgroundMaskCover.js":
/*!*******************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/BackgroundMask/IBackgroundMaskCover.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/BackgroundMask/IBackgroundMaskCover.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/FullScreen/IFullScreen.js":
/*!******************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/FullScreen/IFullScreen.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/FullScreen/IFullScreen.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/IAnimatable.js":
/*!*******************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/IAnimatable.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/IAnimatable.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/IAnimatableColor.js":
/*!************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/IAnimatableColor.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/IAnimatableColor.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/IAnimation.js":
/*!******************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/IAnimation.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/IAnimation.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/IColorAnimation.js":
/*!***********************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/IColorAnimation.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/IColorAnimation.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/IHslAnimation.js":
/*!*********************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/IHslAnimation.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/IHslAnimation.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/IManualParticle.js":
/*!***********************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/IManualParticle.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/IManualParticle.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/IOptionLoader.js":
/*!*********************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/IOptionLoader.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/IOptionLoader.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/IOptions.js":
/*!****************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/IOptions.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/IOptions.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/IOptionsColor.js":
/*!*********************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/IOptionsColor.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/IOptionsColor.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/IResponsive.js":
/*!*******************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/IResponsive.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/IResponsive.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/IValueWithRandom.js":
/*!************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/IValueWithRandom.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/IValueWithRandom.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IClickEvent.js":
/*!****************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IClickEvent.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IClickEvent.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IDivEvent.js":
/*!**************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IDivEvent.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IDivEvent.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IEvents.js":
/*!************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IEvents.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IEvents.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IHoverEvent.js":
/*!****************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IHoverEvent.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IHoverEvent.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IParallax.js":
/*!**************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IParallax.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IParallax.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IResizeEvent.js":
/*!*****************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IResizeEvent.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IResizeEvent.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Interactivity/IInteractivity.js":
/*!************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Interactivity/IInteractivity.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Interactivity/IInteractivity.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Interactivity/Modes/IModeDiv.js":
/*!************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Interactivity/Modes/IModeDiv.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Interactivity/Modes/IModeDiv.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Interactivity/Modes/IModes.js":
/*!**********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Interactivity/Modes/IModes.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Interactivity/Modes/IModes.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Bounce/IParticlesBounce.js":
/*!*****************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Bounce/IParticlesBounce.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Bounce/IParticlesBounce.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Collisions/ICollisions.js":
/*!****************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Collisions/ICollisions.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Collisions/ICollisions.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Collisions/ICollisionsAbsorb.js":
/*!**********************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Collisions/ICollisionsAbsorb.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Collisions/ICollisionsAbsorb.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Collisions/ICollisionsOverlap.js":
/*!***********************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Collisions/ICollisionsOverlap.js ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Collisions/ICollisionsOverlap.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Effect/IEffect.js":
/*!********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Effect/IEffect.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Effect/IEffect.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/IParticlesOptions.js":
/*!***********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/IParticlesOptions.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/IParticlesOptions.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/IShadow.js":
/*!*************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/IShadow.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/IShadow.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/IStroke.js":
/*!*************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/IStroke.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/IStroke.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Move/IMove.js":
/*!****************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Move/IMove.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Move/IMove.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveAngle.js":
/*!*********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveAngle.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveAngle.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveAttract.js":
/*!***********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveAttract.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveAttract.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveCenter.js":
/*!**********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveCenter.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveCenter.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveGravity.js":
/*!***********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveGravity.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveGravity.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveTrail.js":
/*!*********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveTrail.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveTrail.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Move/IOutModes.js":
/*!********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Move/IOutModes.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Move/IOutModes.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Move/ISpin.js":
/*!****************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Move/ISpin.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Move/ISpin.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Move/Path/IMovePath.js":
/*!*************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Move/Path/IMovePath.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Move/Path/IMovePath.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Number/IParticlesDensity.js":
/*!******************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Number/IParticlesDensity.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Number/IParticlesDensity.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Number/IParticlesNumber.js":
/*!*****************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Number/IParticlesNumber.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Number/IParticlesNumber.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Number/IParticlesNumberLimit.js":
/*!**********************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Number/IParticlesNumberLimit.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Number/IParticlesNumberLimit.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Opacity/IOpacity.js":
/*!**********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Opacity/IOpacity.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Opacity/IOpacity.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Opacity/IOpacityAnimation.js":
/*!*******************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Opacity/IOpacityAnimation.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Opacity/IOpacityAnimation.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Shape/IShape.js":
/*!******************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Shape/IShape.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Shape/IShape.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Size/ISize.js":
/*!****************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Size/ISize.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Size/ISize.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/Size/ISizeAnimation.js":
/*!*************************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/Size/ISizeAnimation.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/Size/ISizeAnimation.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Particles/ZIndex/IZIndex.js":
/*!********************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Particles/ZIndex/IZIndex.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Particles/ZIndex/IZIndex.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Theme/ITheme.js":
/*!********************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Theme/ITheme.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Theme/ITheme.js?");

/***/ }),

/***/ "../../engine/dist/browser/Options/Interfaces/Theme/IThemeDefault.js":
/*!***************************************************************************!*\
  !*** ../../engine/dist/browser/Options/Interfaces/Theme/IThemeDefault.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Options/Interfaces/Theme/IThemeDefault.js?");

/***/ }),

/***/ "../../engine/dist/browser/Types/CustomEventArgs.js":
/*!**********************************************************!*\
  !*** ../../engine/dist/browser/Types/CustomEventArgs.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Types/CustomEventArgs.js?");

/***/ }),

/***/ "../../engine/dist/browser/Types/CustomEventListener.js":
/*!**************************************************************!*\
  !*** ../../engine/dist/browser/Types/CustomEventListener.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Types/CustomEventListener.js?");

/***/ }),

/***/ "../../engine/dist/browser/Types/ExportResult.js":
/*!*******************************************************!*\
  !*** ../../engine/dist/browser/Types/ExportResult.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Types/ExportResult.js?");

/***/ }),

/***/ "../../engine/dist/browser/Types/ISourceOptions.js":
/*!*********************************************************!*\
  !*** ../../engine/dist/browser/Types/ISourceOptions.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Types/ISourceOptions.js?");

/***/ }),

/***/ "../../engine/dist/browser/Types/ParticlesGroups.js":
/*!**********************************************************!*\
  !*** ../../engine/dist/browser/Types/ParticlesGroups.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Types/ParticlesGroups.js?");

/***/ }),

/***/ "../../engine/dist/browser/Types/PathOptions.js":
/*!******************************************************!*\
  !*** ../../engine/dist/browser/Types/PathOptions.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Types/PathOptions.js?");

/***/ }),

/***/ "../../engine/dist/browser/Types/RangeValue.js":
/*!*****************************************************!*\
  !*** ../../engine/dist/browser/Types/RangeValue.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Types/RangeValue.js?");

/***/ }),

/***/ "../../engine/dist/browser/Types/RecursivePartial.js":
/*!***********************************************************!*\
  !*** ../../engine/dist/browser/Types/RecursivePartial.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Types/RecursivePartial.js?");

/***/ }),

/***/ "../../engine/dist/browser/Types/ShapeData.js":
/*!****************************************************!*\
  !*** ../../engine/dist/browser/Types/ShapeData.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Types/ShapeData.js?");

/***/ }),

/***/ "../../engine/dist/browser/Types/SingleOrMultiple.js":
/*!***********************************************************!*\
  !*** ../../engine/dist/browser/Types/SingleOrMultiple.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Types/SingleOrMultiple.js?");

/***/ }),

/***/ "../../engine/dist/browser/Utils/CanvasUtils.js":
/*!******************************************************!*\
  !*** ../../engine/dist/browser/Utils/CanvasUtils.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   alterHsl: () => (/* binding */ alterHsl),\n/* harmony export */   clear: () => (/* binding */ clear),\n/* harmony export */   drawEffect: () => (/* binding */ drawEffect),\n/* harmony export */   drawLine: () => (/* binding */ drawLine),\n/* harmony export */   drawParticle: () => (/* binding */ drawParticle),\n/* harmony export */   drawParticlePlugin: () => (/* binding */ drawParticlePlugin),\n/* harmony export */   drawPlugin: () => (/* binding */ drawPlugin),\n/* harmony export */   drawShape: () => (/* binding */ drawShape),\n/* harmony export */   drawShapeAfterDraw: () => (/* binding */ drawShapeAfterDraw),\n/* harmony export */   paintBase: () => (/* binding */ paintBase),\n/* harmony export */   paintImage: () => (/* binding */ paintImage)\n/* harmony export */ });\n/* harmony import */ var _ColorUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ColorUtils.js */ \"../../engine/dist/browser/Utils/ColorUtils.js\");\n\nconst origin = {\n  x: 0,\n  y: 0\n};\nfunction drawLine(context, begin, end) {\n  context.beginPath();\n  context.moveTo(begin.x, begin.y);\n  context.lineTo(end.x, end.y);\n  context.closePath();\n}\nfunction paintBase(context, dimension, baseColor) {\n  context.fillStyle = baseColor ?? \"rgba(0,0,0,0)\";\n  context.fillRect(origin.x, origin.y, dimension.width, dimension.height);\n}\nfunction paintImage(context, dimension, image, opacity) {\n  if (!image) {\n    return;\n  }\n  context.globalAlpha = opacity;\n  context.drawImage(image, origin.x, origin.y, dimension.width, dimension.height);\n  context.globalAlpha = 1;\n}\nfunction clear(context, dimension) {\n  context.clearRect(origin.x, origin.y, dimension.width, dimension.height);\n}\nfunction drawParticle(data) {\n  const {\n      container,\n      context,\n      particle,\n      delta,\n      colorStyles,\n      backgroundMask,\n      composite,\n      radius,\n      opacity,\n      shadow,\n      transform\n    } = data,\n    pos = particle.getPosition(),\n    defaultAngle = 0,\n    angle = particle.rotation + (particle.pathRotation ? particle.velocity.angle : defaultAngle),\n    rotateData = {\n      sin: Math.sin(angle),\n      cos: Math.cos(angle)\n    },\n    defaultTransformFactor = 1,\n    transformData = {\n      a: rotateData.cos * (transform.a ?? defaultTransformFactor),\n      b: rotateData.sin * (transform.b ?? defaultTransformFactor),\n      c: -rotateData.sin * (transform.c ?? defaultTransformFactor),\n      d: rotateData.cos * (transform.d ?? defaultTransformFactor)\n    };\n  context.setTransform(transformData.a, transformData.b, transformData.c, transformData.d, pos.x, pos.y);\n  if (backgroundMask) {\n    context.globalCompositeOperation = composite;\n  }\n  const shadowColor = particle.shadowColor;\n  if (shadow.enable && shadowColor) {\n    context.shadowBlur = shadow.blur;\n    context.shadowColor = (0,_ColorUtils_js__WEBPACK_IMPORTED_MODULE_0__.getStyleFromRgb)(shadowColor);\n    context.shadowOffsetX = shadow.offset.x;\n    context.shadowOffsetY = shadow.offset.y;\n  }\n  if (colorStyles.fill) {\n    context.fillStyle = colorStyles.fill;\n  }\n  const minStrokeWidth = 0,\n    strokeWidth = particle.strokeWidth ?? minStrokeWidth;\n  context.lineWidth = strokeWidth;\n  if (colorStyles.stroke) {\n    context.strokeStyle = colorStyles.stroke;\n  }\n  const drawData = {\n    container,\n    context,\n    particle,\n    radius,\n    opacity,\n    delta,\n    transformData,\n    strokeWidth\n  };\n  drawShape(drawData);\n  drawShapeAfterDraw(drawData);\n  drawEffect(drawData);\n  context.globalCompositeOperation = \"source-over\";\n  context.resetTransform();\n}\nfunction drawEffect(data) {\n  const {\n    container,\n    context,\n    particle,\n    radius,\n    opacity,\n    delta,\n    transformData\n  } = data;\n  if (!particle.effect) {\n    return;\n  }\n  const drawer = container.effectDrawers.get(particle.effect);\n  if (!drawer) {\n    return;\n  }\n  drawer.draw({\n    context,\n    particle,\n    radius,\n    opacity,\n    delta,\n    pixelRatio: container.retina.pixelRatio,\n    transformData: {\n      ...transformData\n    }\n  });\n}\nfunction drawShape(data) {\n  const {\n      container,\n      context,\n      particle,\n      radius,\n      opacity,\n      delta,\n      strokeWidth,\n      transformData\n    } = data,\n    minStrokeWidth = 0;\n  if (!particle.shape) {\n    return;\n  }\n  const drawer = container.shapeDrawers.get(particle.shape);\n  if (!drawer) {\n    return;\n  }\n  context.beginPath();\n  drawer.draw({\n    context,\n    particle,\n    radius,\n    opacity,\n    delta,\n    pixelRatio: container.retina.pixelRatio,\n    transformData: {\n      ...transformData\n    }\n  });\n  if (particle.shapeClose) {\n    context.closePath();\n  }\n  if (strokeWidth > minStrokeWidth) {\n    context.stroke();\n  }\n  if (particle.shapeFill) {\n    context.fill();\n  }\n}\nfunction drawShapeAfterDraw(data) {\n  const {\n    container,\n    context,\n    particle,\n    radius,\n    opacity,\n    delta,\n    transformData\n  } = data;\n  if (!particle.shape) {\n    return;\n  }\n  const drawer = container.shapeDrawers.get(particle.shape);\n  if (!drawer?.afterDraw) {\n    return;\n  }\n  drawer.afterDraw({\n    context,\n    particle,\n    radius,\n    opacity,\n    delta,\n    pixelRatio: container.retina.pixelRatio,\n    transformData: {\n      ...transformData\n    }\n  });\n}\nfunction drawPlugin(context, plugin, delta) {\n  if (!plugin.draw) {\n    return;\n  }\n  plugin.draw(context, delta);\n}\nfunction drawParticlePlugin(context, plugin, particle, delta) {\n  if (!plugin.drawParticle) {\n    return;\n  }\n  plugin.drawParticle(context, particle, delta);\n}\nfunction alterHsl(color, type, value) {\n  const lFactor = 1;\n  return {\n    h: color.h,\n    s: color.s,\n    l: color.l + (type === \"darken\" ? -lFactor : lFactor) * value\n  };\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Utils/CanvasUtils.js?");

/***/ }),

/***/ "../../engine/dist/browser/Utils/ColorUtils.js":
/*!*****************************************************!*\
  !*** ../../engine/dist/browser/Utils/ColorUtils.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addColorManager: () => (/* binding */ addColorManager),\n/* harmony export */   colorMix: () => (/* binding */ colorMix),\n/* harmony export */   colorToHsl: () => (/* binding */ colorToHsl),\n/* harmony export */   colorToRgb: () => (/* binding */ colorToRgb),\n/* harmony export */   getHslAnimationFromHsl: () => (/* binding */ getHslAnimationFromHsl),\n/* harmony export */   getHslFromAnimation: () => (/* binding */ getHslFromAnimation),\n/* harmony export */   getLinkColor: () => (/* binding */ getLinkColor),\n/* harmony export */   getLinkRandomColor: () => (/* binding */ getLinkRandomColor),\n/* harmony export */   getRandomRgbColor: () => (/* binding */ getRandomRgbColor),\n/* harmony export */   getStyleFromHsl: () => (/* binding */ getStyleFromHsl),\n/* harmony export */   getStyleFromRgb: () => (/* binding */ getStyleFromRgb),\n/* harmony export */   hslToRgb: () => (/* binding */ hslToRgb),\n/* harmony export */   hslaToRgba: () => (/* binding */ hslaToRgba),\n/* harmony export */   rangeColorToHsl: () => (/* binding */ rangeColorToHsl),\n/* harmony export */   rangeColorToRgb: () => (/* binding */ rangeColorToRgb),\n/* harmony export */   rgbToHsl: () => (/* binding */ rgbToHsl),\n/* harmony export */   stringToAlpha: () => (/* binding */ stringToAlpha),\n/* harmony export */   stringToRgb: () => (/* binding */ stringToRgb),\n/* harmony export */   updateColor: () => (/* binding */ updateColor),\n/* harmony export */   updateColorValue: () => (/* binding */ updateColorValue)\n/* harmony export */ });\n/* harmony import */ var _NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n/* harmony import */ var _TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TypeUtils.js */ \"../../engine/dist/browser/Utils/TypeUtils.js\");\n/* harmony import */ var _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Core/Utils/Constants.js */ \"../../engine/dist/browser/Core/Utils/Constants.js\");\n/* harmony import */ var _Utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils.js */ \"../../engine/dist/browser/Utils/Utils.js\");\n\n\n\n\nconst randomColorValue = \"random\",\n  midColorValue = \"mid\",\n  colorManagers = new Map();\nfunction addColorManager(manager) {\n  colorManagers.set(manager.key, manager);\n}\nfunction stringToRgba(input) {\n  for (const [, manager] of colorManagers) {\n    if (input.startsWith(manager.stringPrefix)) {\n      return manager.parseString(input);\n    }\n  }\n  const shorthandRegex = /^#?([a-f\\d])([a-f\\d])([a-f\\d])([a-f\\d])?$/i,\n    hexFixed = input.replace(shorthandRegex, (_, r, g, b, a) => {\n      return r + r + g + g + b + b + (a !== undefined ? a + a : \"\");\n    }),\n    regex = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})?$/i,\n    result = regex.exec(hexFixed),\n    radix = 16,\n    defaultAlpha = 1,\n    alphaFactor = 0xff;\n  return result ? {\n    a: result[4] !== undefined ? parseInt(result[4], radix) / alphaFactor : defaultAlpha,\n    b: parseInt(result[3], radix),\n    g: parseInt(result[2], radix),\n    r: parseInt(result[1], radix)\n  } : undefined;\n}\nfunction rangeColorToRgb(input, index, useIndex = true) {\n  if (!input) {\n    return;\n  }\n  const color = (0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__.isString)(input) ? {\n    value: input\n  } : input;\n  if ((0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__.isString)(color.value)) {\n    return colorToRgb(color.value, index, useIndex);\n  }\n  if ((0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(color.value)) {\n    return rangeColorToRgb({\n      value: (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__.itemFromArray)(color.value, index, useIndex)\n    });\n  }\n  for (const [, manager] of colorManagers) {\n    const res = manager.handleRangeColor(color);\n    if (res) {\n      return res;\n    }\n  }\n}\nfunction colorToRgb(input, index, useIndex = true) {\n  if (!input) {\n    return;\n  }\n  const color = (0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__.isString)(input) ? {\n    value: input\n  } : input;\n  if ((0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__.isString)(color.value)) {\n    return color.value === randomColorValue ? getRandomRgbColor() : stringToRgb(color.value);\n  }\n  if ((0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__.isArray)(color.value)) {\n    return colorToRgb({\n      value: (0,_Utils_js__WEBPACK_IMPORTED_MODULE_3__.itemFromArray)(color.value, index, useIndex)\n    });\n  }\n  for (const [, manager] of colorManagers) {\n    const res = manager.handleColor(color);\n    if (res) {\n      return res;\n    }\n  }\n}\nfunction colorToHsl(color, index, useIndex = true) {\n  const rgb = colorToRgb(color, index, useIndex);\n  return rgb ? rgbToHsl(rgb) : undefined;\n}\nfunction rangeColorToHsl(color, index, useIndex = true) {\n  const rgb = rangeColorToRgb(color, index, useIndex);\n  return rgb ? rgbToHsl(rgb) : undefined;\n}\nfunction rgbToHsl(color) {\n  const rgbMax = 255,\n    hMax = 360,\n    sMax = 100,\n    lMax = 100,\n    hMin = 0,\n    sMin = 0,\n    hPhase = 60,\n    half = 0.5,\n    double = 2,\n    r1 = color.r / rgbMax,\n    g1 = color.g / rgbMax,\n    b1 = color.b / rgbMax,\n    max = Math.max(r1, g1, b1),\n    min = Math.min(r1, g1, b1),\n    res = {\n      h: hMin,\n      l: (max + min) * half,\n      s: sMin\n    };\n  if (max !== min) {\n    res.s = res.l < half ? (max - min) / (max + min) : (max - min) / (double - max - min);\n    res.h = r1 === max ? (g1 - b1) / (max - min) : res.h = g1 === max ? double + (b1 - r1) / (max - min) : double * double + (r1 - g1) / (max - min);\n  }\n  res.l *= lMax;\n  res.s *= sMax;\n  res.h *= hPhase;\n  if (res.h < hMin) {\n    res.h += hMax;\n  }\n  if (res.h >= hMax) {\n    res.h -= hMax;\n  }\n  return res;\n}\nfunction stringToAlpha(input) {\n  return stringToRgba(input)?.a;\n}\nfunction stringToRgb(input) {\n  return stringToRgba(input);\n}\nfunction hslToRgb(hsl) {\n  const hMax = 360,\n    sMax = 100,\n    lMax = 100,\n    sMin = 0,\n    lMin = 0,\n    h = (hsl.h % hMax + hMax) % hMax,\n    s = Math.max(sMin, Math.min(sMax, hsl.s)),\n    l = Math.max(lMin, Math.min(lMax, hsl.l)),\n    hNormalized = h / hMax,\n    sNormalized = s / sMax,\n    lNormalized = l / lMax,\n    rgbFactor = 255,\n    triple = 3;\n  if (s === sMin) {\n    const grayscaleValue = Math.round(lNormalized * rgbFactor);\n    return {\n      r: grayscaleValue,\n      g: grayscaleValue,\n      b: grayscaleValue\n    };\n  }\n  const half = 0.5,\n    double = 2,\n    channel = (temp1, temp2, temp3) => {\n      const temp3Min = 0,\n        temp3Max = 1,\n        sextuple = 6;\n      if (temp3 < temp3Min) {\n        temp3++;\n      }\n      if (temp3 > temp3Max) {\n        temp3--;\n      }\n      if (temp3 * sextuple < temp3Max) {\n        return temp1 + (temp2 - temp1) * sextuple * temp3;\n      }\n      if (temp3 * double < temp3Max) {\n        return temp2;\n      }\n      if (temp3 * triple < temp3Max * double) {\n        const temp3Offset = double / triple;\n        return temp1 + (temp2 - temp1) * (temp3Offset - temp3) * sextuple;\n      }\n      return temp1;\n    },\n    sNormalizedOffset = 1,\n    temp1 = lNormalized < half ? lNormalized * (sNormalizedOffset + sNormalized) : lNormalized + sNormalized - lNormalized * sNormalized,\n    temp2 = double * lNormalized - temp1,\n    phaseNumerator = 1,\n    phaseThird = phaseNumerator / triple,\n    red = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized + phaseThird)),\n    green = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized)),\n    blue = Math.min(rgbFactor, rgbFactor * channel(temp2, temp1, hNormalized - phaseThird));\n  return {\n    r: Math.round(red),\n    g: Math.round(green),\n    b: Math.round(blue)\n  };\n}\nfunction hslaToRgba(hsla) {\n  const rgbResult = hslToRgb(hsla);\n  return {\n    a: hsla.a,\n    b: rgbResult.b,\n    g: rgbResult.g,\n    r: rgbResult.r\n  };\n}\nfunction getRandomRgbColor(min) {\n  const defaultMin = 0,\n    fixedMin = min ?? defaultMin,\n    rgbMax = 256;\n  return {\n    b: Math.floor((0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.randomInRange)((0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(fixedMin, rgbMax))),\n    g: Math.floor((0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.randomInRange)((0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(fixedMin, rgbMax))),\n    r: Math.floor((0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.randomInRange)((0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(fixedMin, rgbMax)))\n  };\n}\nfunction getStyleFromRgb(color, opacity) {\n  const defaultOpacity = 1;\n  return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity ?? defaultOpacity})`;\n}\nfunction getStyleFromHsl(color, opacity) {\n  const defaultOpacity = 1;\n  return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity ?? defaultOpacity})`;\n}\nfunction colorMix(color1, color2, size1, size2) {\n  let rgb1 = color1,\n    rgb2 = color2;\n  if (rgb1.r === undefined) {\n    rgb1 = hslToRgb(color1);\n  }\n  if (rgb2.r === undefined) {\n    rgb2 = hslToRgb(color2);\n  }\n  return {\n    b: (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.mix)(rgb1.b, rgb2.b, size1, size2),\n    g: (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.mix)(rgb1.g, rgb2.g, size1, size2),\n    r: (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.mix)(rgb1.r, rgb2.r, size1, size2)\n  };\n}\nfunction getLinkColor(p1, p2, linkColor) {\n  if (linkColor === randomColorValue) {\n    return getRandomRgbColor();\n  } else if (linkColor === midColorValue) {\n    const sourceColor = p1.getFillColor() ?? p1.getStrokeColor(),\n      destColor = p2?.getFillColor() ?? p2?.getStrokeColor();\n    if (sourceColor && destColor && p2) {\n      return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());\n    } else {\n      const hslColor = sourceColor ?? destColor;\n      if (hslColor) {\n        return hslToRgb(hslColor);\n      }\n    }\n  } else {\n    return linkColor;\n  }\n}\nfunction getLinkRandomColor(optColor, blink, consent) {\n  const color = (0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__.isString)(optColor) ? optColor : optColor.value;\n  if (color === randomColorValue) {\n    if (consent) {\n      return rangeColorToRgb({\n        value: color\n      });\n    }\n    if (blink) {\n      return randomColorValue;\n    }\n    return midColorValue;\n  } else if (color === midColorValue) {\n    return midColorValue;\n  } else {\n    return rangeColorToRgb({\n      value: color\n    });\n  }\n}\nfunction getHslFromAnimation(animation) {\n  return animation !== undefined ? {\n    h: animation.h.value,\n    s: animation.s.value,\n    l: animation.l.value\n  } : undefined;\n}\nfunction getHslAnimationFromHsl(hsl, animationOptions, reduceFactor) {\n  const resColor = {\n    h: {\n      enable: false,\n      value: hsl.h\n    },\n    s: {\n      enable: false,\n      value: hsl.s\n    },\n    l: {\n      enable: false,\n      value: hsl.l\n    }\n  };\n  if (animationOptions) {\n    setColorAnimation(resColor.h, animationOptions.h, reduceFactor);\n    setColorAnimation(resColor.s, animationOptions.s, reduceFactor);\n    setColorAnimation(resColor.l, animationOptions.l, reduceFactor);\n  }\n  return resColor;\n}\nfunction setColorAnimation(colorValue, colorAnimation, reduceFactor) {\n  colorValue.enable = colorAnimation.enable;\n  const defaultVelocity = 0,\n    decayOffset = 1,\n    defaultLoops = 0,\n    defaultTime = 0;\n  if (colorValue.enable) {\n    colorValue.velocity = (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(colorAnimation.speed) / _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_2__.percentDenominator * reduceFactor;\n    colorValue.decay = decayOffset - (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(colorAnimation.decay);\n    colorValue.status = \"increasing\";\n    colorValue.loops = defaultLoops;\n    colorValue.maxLoops = (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(colorAnimation.count);\n    colorValue.time = defaultTime;\n    colorValue.delayTime = (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(colorAnimation.delay) * _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsToSeconds;\n    if (!colorAnimation.sync) {\n      colorValue.velocity *= (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRandom)();\n      colorValue.value *= (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRandom)();\n    }\n    colorValue.initialValue = colorValue.value;\n    colorValue.offset = (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.setRangeValue)(colorAnimation.offset);\n  } else {\n    colorValue.velocity = defaultVelocity;\n  }\n}\nfunction updateColorValue(data, range, decrease, delta) {\n  const minLoops = 0,\n    minDelay = 0,\n    identity = 1,\n    minVelocity = 0,\n    minOffset = 0,\n    velocityFactor = 3.6;\n  if (!data || !data.enable || (data.maxLoops ?? minLoops) > minLoops && (data.loops ?? minLoops) > (data.maxLoops ?? minLoops)) {\n    return;\n  }\n  if (!data.time) {\n    data.time = 0;\n  }\n  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {\n    data.time += delta.value;\n  }\n  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {\n    return;\n  }\n  const offset = data.offset ? (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.randomInRange)(data.offset) : minOffset,\n    velocity = (data.velocity ?? minVelocity) * delta.factor + offset * velocityFactor,\n    decay = data.decay ?? identity,\n    max = (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeMax)(range),\n    min = (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeMin)(range);\n  if (!decrease || data.status === \"increasing\") {\n    data.value += velocity;\n    if (data.value > max) {\n      if (!data.loops) {\n        data.loops = 0;\n      }\n      data.loops++;\n      if (decrease) {\n        data.status = \"decreasing\";\n      } else {\n        data.value -= max;\n      }\n    }\n  } else {\n    data.value -= velocity;\n    const minValue = 0;\n    if (data.value < minValue) {\n      if (!data.loops) {\n        data.loops = 0;\n      }\n      data.loops++;\n      data.status = \"increasing\";\n    }\n  }\n  if (data.velocity && decay !== identity) {\n    data.velocity *= decay;\n  }\n  data.value = (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.clamp)(data.value, min, max);\n}\nfunction updateColor(color, delta) {\n  if (!color) {\n    return;\n  }\n  const {\n    h,\n    s,\n    l\n  } = color;\n  const ranges = {\n    h: {\n      min: 0,\n      max: 360\n    },\n    s: {\n      min: 0,\n      max: 100\n    },\n    l: {\n      min: 0,\n      max: 100\n    }\n  };\n  if (h) {\n    updateColorValue(h, ranges.h, false, delta);\n  }\n  if (s) {\n    updateColorValue(s, ranges.s, true, delta);\n  }\n  if (l) {\n    updateColorValue(l, ranges.l, true, delta);\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Utils/ColorUtils.js?");

/***/ }),

/***/ "../../engine/dist/browser/Utils/EventDispatcher.js":
/*!**********************************************************!*\
  !*** ../../engine/dist/browser/Utils/EventDispatcher.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   EventDispatcher: () => (/* binding */ EventDispatcher)\n/* harmony export */ });\nclass EventDispatcher {\n  constructor() {\n    this._listeners = new Map();\n  }\n  addEventListener(type, listener) {\n    this.removeEventListener(type, listener);\n    let arr = this._listeners.get(type);\n    if (!arr) {\n      arr = [];\n      this._listeners.set(type, arr);\n    }\n    arr.push(listener);\n  }\n  dispatchEvent(type, args) {\n    const listeners = this._listeners.get(type);\n    listeners?.forEach(handler => handler(args));\n  }\n  hasEventListener(type) {\n    return !!this._listeners.get(type);\n  }\n  removeAllEventListeners(type) {\n    if (!type) {\n      this._listeners = new Map();\n    } else {\n      this._listeners.delete(type);\n    }\n  }\n  removeEventListener(type, listener) {\n    const arr = this._listeners.get(type);\n    if (!arr) {\n      return;\n    }\n    const length = arr.length,\n      idx = arr.indexOf(listener),\n      minIndex = 0;\n    if (idx < minIndex) {\n      return;\n    }\n    const deleteCount = 1;\n    if (length === deleteCount) {\n      this._listeners.delete(type);\n    } else {\n      arr.splice(idx, deleteCount);\n    }\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Utils/EventDispatcher.js?");

/***/ }),

/***/ "../../engine/dist/browser/Utils/HslColorManager.js":
/*!**********************************************************!*\
  !*** ../../engine/dist/browser/Utils/HslColorManager.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   HslColorManager: () => (/* binding */ HslColorManager)\n/* harmony export */ });\n/* harmony import */ var _NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n/* harmony import */ var _ColorUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ColorUtils.js */ \"../../engine/dist/browser/Utils/ColorUtils.js\");\n\n\nclass HslColorManager {\n  constructor() {\n    this.key = \"hsl\";\n    this.stringPrefix = \"hsl\";\n  }\n  handleColor(color) {\n    const colorValue = color.value,\n      hslColor = colorValue.hsl ?? color.value;\n    if (hslColor.h !== undefined && hslColor.s !== undefined && hslColor.l !== undefined) {\n      return (0,_ColorUtils_js__WEBPACK_IMPORTED_MODULE_1__.hslToRgb)(hslColor);\n    }\n  }\n  handleRangeColor(color) {\n    const colorValue = color.value,\n      hslColor = colorValue.hsl ?? color.value;\n    if (hslColor.h !== undefined && hslColor.l !== undefined) {\n      return (0,_ColorUtils_js__WEBPACK_IMPORTED_MODULE_1__.hslToRgb)({\n        h: (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(hslColor.h),\n        l: (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(hslColor.l),\n        s: (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(hslColor.s)\n      });\n    }\n  }\n  parseString(input) {\n    if (!input.startsWith(\"hsl\")) {\n      return;\n    }\n    const regex = /hsla?\\(\\s*(\\d+)\\s*,\\s*(\\d+)%\\s*,\\s*(\\d+)%\\s*(,\\s*([\\d.%]+)\\s*)?\\)/i,\n      result = regex.exec(input),\n      minLength = 4,\n      defaultAlpha = 1,\n      radix = 10;\n    return result ? (0,_ColorUtils_js__WEBPACK_IMPORTED_MODULE_1__.hslaToRgba)({\n      a: result.length > minLength ? (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.parseAlpha)(result[5]) : defaultAlpha,\n      h: parseInt(result[1], radix),\n      l: parseInt(result[3], radix),\n      s: parseInt(result[2], radix)\n    }) : undefined;\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Utils/HslColorManager.js?");

/***/ }),

/***/ "../../engine/dist/browser/Utils/NumberUtils.js":
/*!******************************************************!*\
  !*** ../../engine/dist/browser/Utils/NumberUtils.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addEasing: () => (/* binding */ addEasing),\n/* harmony export */   calcExactPositionOrRandomFromSize: () => (/* binding */ calcExactPositionOrRandomFromSize),\n/* harmony export */   calcExactPositionOrRandomFromSizeRanged: () => (/* binding */ calcExactPositionOrRandomFromSizeRanged),\n/* harmony export */   calcPositionFromSize: () => (/* binding */ calcPositionFromSize),\n/* harmony export */   calcPositionOrRandomFromSize: () => (/* binding */ calcPositionOrRandomFromSize),\n/* harmony export */   calcPositionOrRandomFromSizeRanged: () => (/* binding */ calcPositionOrRandomFromSizeRanged),\n/* harmony export */   clamp: () => (/* binding */ clamp),\n/* harmony export */   collisionVelocity: () => (/* binding */ collisionVelocity),\n/* harmony export */   degToRad: () => (/* binding */ degToRad),\n/* harmony export */   getDistance: () => (/* binding */ getDistance),\n/* harmony export */   getDistances: () => (/* binding */ getDistances),\n/* harmony export */   getEasing: () => (/* binding */ getEasing),\n/* harmony export */   getParticleBaseVelocity: () => (/* binding */ getParticleBaseVelocity),\n/* harmony export */   getParticleDirectionAngle: () => (/* binding */ getParticleDirectionAngle),\n/* harmony export */   getRandom: () => (/* binding */ getRandom),\n/* harmony export */   getRangeMax: () => (/* binding */ getRangeMax),\n/* harmony export */   getRangeMin: () => (/* binding */ getRangeMin),\n/* harmony export */   getRangeValue: () => (/* binding */ getRangeValue),\n/* harmony export */   mix: () => (/* binding */ mix),\n/* harmony export */   parseAlpha: () => (/* binding */ parseAlpha),\n/* harmony export */   randomInRange: () => (/* binding */ randomInRange),\n/* harmony export */   setRandom: () => (/* binding */ setRandom),\n/* harmony export */   setRangeValue: () => (/* binding */ setRangeValue)\n/* harmony export */ });\n/* harmony import */ var _Core_Utils_Vectors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Core/Utils/Vectors.js */ \"../../engine/dist/browser/Core/Utils/Vectors.js\");\n/* harmony import */ var _TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TypeUtils.js */ \"../../engine/dist/browser/Utils/TypeUtils.js\");\n/* harmony import */ var _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Core/Utils/Constants.js */ \"../../engine/dist/browser/Core/Utils/Constants.js\");\n\n\n\nlet _random = Math.random;\nconst easings = new Map(),\n  double = 2,\n  doublePI = Math.PI * double;\nfunction addEasing(name, easing) {\n  if (easings.get(name)) {\n    return;\n  }\n  easings.set(name, easing);\n}\nfunction getEasing(name) {\n  return easings.get(name) ?? (value => value);\n}\nfunction setRandom(rnd = Math.random) {\n  _random = rnd;\n}\nfunction getRandom() {\n  const min = 0,\n    max = 1;\n  return clamp(_random(), min, max - Number.EPSILON);\n}\nfunction clamp(num, min, max) {\n  return Math.min(Math.max(num, min), max);\n}\nfunction mix(comp1, comp2, weight1, weight2) {\n  return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));\n}\nfunction randomInRange(r) {\n  const max = getRangeMax(r),\n    minOffset = 0;\n  let min = getRangeMin(r);\n  if (max === min) {\n    min = minOffset;\n  }\n  return getRandom() * (max - min) + min;\n}\nfunction getRangeValue(value) {\n  return (0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__.isNumber)(value) ? value : randomInRange(value);\n}\nfunction getRangeMin(value) {\n  return (0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__.isNumber)(value) ? value : value.min;\n}\nfunction getRangeMax(value) {\n  return (0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__.isNumber)(value) ? value : value.max;\n}\nfunction setRangeValue(source, value) {\n  if (source === value || value === undefined && (0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__.isNumber)(source)) {\n    return source;\n  }\n  const min = getRangeMin(source),\n    max = getRangeMax(source);\n  return value !== undefined ? {\n    min: Math.min(min, value),\n    max: Math.max(max, value)\n  } : setRangeValue(min, max);\n}\nfunction getDistances(pointA, pointB) {\n  const dx = pointA.x - pointB.x,\n    dy = pointA.y - pointB.y,\n    squareExp = 2;\n  return {\n    dx: dx,\n    dy: dy,\n    distance: Math.sqrt(dx ** squareExp + dy ** squareExp)\n  };\n}\nfunction getDistance(pointA, pointB) {\n  return getDistances(pointA, pointB).distance;\n}\nfunction degToRad(degrees) {\n  const PIDeg = 180;\n  return degrees * Math.PI / PIDeg;\n}\nfunction getParticleDirectionAngle(direction, position, center) {\n  if ((0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_1__.isNumber)(direction)) {\n    return degToRad(direction);\n  }\n  const empty = 0,\n    half = 0.5,\n    quarter = 0.25,\n    threeQuarter = half + quarter;\n  switch (direction) {\n    case \"top\":\n      return -Math.PI * half;\n    case \"top-right\":\n      return -Math.PI * quarter;\n    case \"right\":\n      return empty;\n    case \"bottom-right\":\n      return Math.PI * quarter;\n    case \"bottom\":\n      return Math.PI * half;\n    case \"bottom-left\":\n      return Math.PI * threeQuarter;\n    case \"left\":\n      return Math.PI;\n    case \"top-left\":\n      return -Math.PI * threeQuarter;\n    case \"inside\":\n      return Math.atan2(center.y - position.y, center.x - position.x);\n    case \"outside\":\n      return Math.atan2(position.y - center.y, position.x - center.x);\n    default:\n      return getRandom() * doublePI;\n  }\n}\nfunction getParticleBaseVelocity(direction) {\n  const baseVelocity = _Core_Utils_Vectors_js__WEBPACK_IMPORTED_MODULE_0__.Vector.origin;\n  baseVelocity.length = 1;\n  baseVelocity.angle = direction;\n  return baseVelocity;\n}\nfunction collisionVelocity(v1, v2, m1, m2) {\n  const double = 2;\n  return _Core_Utils_Vectors_js__WEBPACK_IMPORTED_MODULE_0__.Vector.create(v1.x * (m1 - m2) / (m1 + m2) + v2.x * double * m2 / (m1 + m2), v1.y);\n}\nfunction calcPositionFromSize(data) {\n  return data.position?.x !== undefined && data.position.y !== undefined ? {\n    x: data.position.x * data.size.width / _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_2__.percentDenominator,\n    y: data.position.y * data.size.height / _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_2__.percentDenominator\n  } : undefined;\n}\nfunction calcPositionOrRandomFromSize(data) {\n  return {\n    x: (data.position?.x ?? getRandom() * _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_2__.percentDenominator) * data.size.width / _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_2__.percentDenominator,\n    y: (data.position?.y ?? getRandom() * _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_2__.percentDenominator) * data.size.height / _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_2__.percentDenominator\n  };\n}\nfunction calcPositionOrRandomFromSizeRanged(data) {\n  const position = {\n    x: data.position?.x !== undefined ? getRangeValue(data.position.x) : undefined,\n    y: data.position?.y !== undefined ? getRangeValue(data.position.y) : undefined\n  };\n  return calcPositionOrRandomFromSize({\n    size: data.size,\n    position\n  });\n}\nfunction calcExactPositionOrRandomFromSize(data) {\n  return {\n    x: data.position?.x ?? getRandom() * data.size.width,\n    y: data.position?.y ?? getRandom() * data.size.height\n  };\n}\nfunction calcExactPositionOrRandomFromSizeRanged(data) {\n  const position = {\n    x: data.position?.x !== undefined ? getRangeValue(data.position.x) : undefined,\n    y: data.position?.y !== undefined ? getRangeValue(data.position.y) : undefined\n  };\n  return calcExactPositionOrRandomFromSize({\n    size: data.size,\n    position\n  });\n}\nfunction parseAlpha(input) {\n  const defaultAlpha = 1;\n  if (!input) {\n    return defaultAlpha;\n  }\n  return input.endsWith(\"%\") ? parseFloat(input) / _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_2__.percentDenominator : parseFloat(input);\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Utils/NumberUtils.js?");

/***/ }),

/***/ "../../engine/dist/browser/Utils/OptionsUtils.js":
/*!*******************************************************!*\
  !*** ../../engine/dist/browser/Utils/OptionsUtils.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   loadOptions: () => (/* binding */ loadOptions),\n/* harmony export */   loadParticlesOptions: () => (/* binding */ loadParticlesOptions)\n/* harmony export */ });\n/* harmony import */ var _Options_Classes_Particles_ParticlesOptions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Options/Classes/Particles/ParticlesOptions.js */ \"../../engine/dist/browser/Options/Classes/Particles/ParticlesOptions.js\");\n\nfunction loadOptions(options, ...sourceOptionsArr) {\n  for (const sourceOptions of sourceOptionsArr) {\n    options.load(sourceOptions);\n  }\n}\nfunction loadParticlesOptions(engine, container, ...sourceOptionsArr) {\n  const options = new _Options_Classes_Particles_ParticlesOptions_js__WEBPACK_IMPORTED_MODULE_0__.ParticlesOptions(engine, container);\n  loadOptions(options, ...sourceOptionsArr);\n  return options;\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Utils/OptionsUtils.js?");

/***/ }),

/***/ "../../engine/dist/browser/Utils/RgbColorManager.js":
/*!**********************************************************!*\
  !*** ../../engine/dist/browser/Utils/RgbColorManager.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RgbColorManager: () => (/* binding */ RgbColorManager)\n/* harmony export */ });\n/* harmony import */ var _NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n\nclass RgbColorManager {\n  constructor() {\n    this.key = \"rgb\";\n    this.stringPrefix = \"rgb\";\n  }\n  handleColor(color) {\n    const colorValue = color.value,\n      rgbColor = colorValue.rgb ?? color.value;\n    if (rgbColor.r !== undefined) {\n      return rgbColor;\n    }\n  }\n  handleRangeColor(color) {\n    const colorValue = color.value,\n      rgbColor = colorValue.rgb ?? color.value;\n    if (rgbColor.r !== undefined) {\n      return {\n        r: (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(rgbColor.r),\n        g: (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(rgbColor.g),\n        b: (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(rgbColor.b)\n      };\n    }\n  }\n  parseString(input) {\n    if (!input.startsWith(this.stringPrefix)) {\n      return;\n    }\n    const regex = /rgba?\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)\\s*(,\\s*([\\d.%]+)\\s*)?\\)/i,\n      result = regex.exec(input),\n      radix = 10,\n      minLength = 4,\n      defaultAlpha = 1;\n    return result ? {\n      a: result.length > minLength ? (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.parseAlpha)(result[5]) : defaultAlpha,\n      b: parseInt(result[3], radix),\n      g: parseInt(result[2], radix),\n      r: parseInt(result[1], radix)\n    } : undefined;\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Utils/RgbColorManager.js?");

/***/ }),

/***/ "../../engine/dist/browser/Utils/TypeUtils.js":
/*!****************************************************!*\
  !*** ../../engine/dist/browser/Utils/TypeUtils.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isArray: () => (/* binding */ isArray),\n/* harmony export */   isBoolean: () => (/* binding */ isBoolean),\n/* harmony export */   isFunction: () => (/* binding */ isFunction),\n/* harmony export */   isNumber: () => (/* binding */ isNumber),\n/* harmony export */   isObject: () => (/* binding */ isObject),\n/* harmony export */   isString: () => (/* binding */ isString)\n/* harmony export */ });\nfunction isBoolean(arg) {\n  return typeof arg === \"boolean\";\n}\nfunction isString(arg) {\n  return typeof arg === \"string\";\n}\nfunction isNumber(arg) {\n  return typeof arg === \"number\";\n}\nfunction isFunction(arg) {\n  return typeof arg === \"function\";\n}\nfunction isObject(arg) {\n  return typeof arg === \"object\" && arg !== null;\n}\nfunction isArray(arg) {\n  return Array.isArray(arg);\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Utils/TypeUtils.js?");

/***/ }),

/***/ "../../engine/dist/browser/Utils/Utils.js":
/*!************************************************!*\
  !*** ../../engine/dist/browser/Utils/Utils.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   areBoundsInside: () => (/* binding */ areBoundsInside),\n/* harmony export */   arrayRandomIndex: () => (/* binding */ arrayRandomIndex),\n/* harmony export */   calculateBounds: () => (/* binding */ calculateBounds),\n/* harmony export */   circleBounce: () => (/* binding */ circleBounce),\n/* harmony export */   circleBounceDataFromParticle: () => (/* binding */ circleBounceDataFromParticle),\n/* harmony export */   deepExtend: () => (/* binding */ deepExtend),\n/* harmony export */   divMode: () => (/* binding */ divMode),\n/* harmony export */   divModeExecute: () => (/* binding */ divModeExecute),\n/* harmony export */   executeOnSingleOrMultiple: () => (/* binding */ executeOnSingleOrMultiple),\n/* harmony export */   findItemFromSingleOrMultiple: () => (/* binding */ findItemFromSingleOrMultiple),\n/* harmony export */   getLogger: () => (/* binding */ getLogger),\n/* harmony export */   getPosition: () => (/* binding */ getPosition),\n/* harmony export */   getSize: () => (/* binding */ getSize),\n/* harmony export */   hasMatchMedia: () => (/* binding */ hasMatchMedia),\n/* harmony export */   initParticleNumericAnimationValue: () => (/* binding */ initParticleNumericAnimationValue),\n/* harmony export */   isDivModeEnabled: () => (/* binding */ isDivModeEnabled),\n/* harmony export */   isInArray: () => (/* binding */ isInArray),\n/* harmony export */   isPointInside: () => (/* binding */ isPointInside),\n/* harmony export */   isSsr: () => (/* binding */ isSsr),\n/* harmony export */   itemFromArray: () => (/* binding */ itemFromArray),\n/* harmony export */   itemFromSingleOrMultiple: () => (/* binding */ itemFromSingleOrMultiple),\n/* harmony export */   loadFont: () => (/* binding */ loadFont),\n/* harmony export */   rectBounce: () => (/* binding */ rectBounce),\n/* harmony export */   safeIntersectionObserver: () => (/* binding */ safeIntersectionObserver),\n/* harmony export */   safeMatchMedia: () => (/* binding */ safeMatchMedia),\n/* harmony export */   safeMutationObserver: () => (/* binding */ safeMutationObserver),\n/* harmony export */   setLogger: () => (/* binding */ setLogger),\n/* harmony export */   singleDivModeExecute: () => (/* binding */ singleDivModeExecute),\n/* harmony export */   updateAnimation: () => (/* binding */ updateAnimation)\n/* harmony export */ });\n/* harmony import */ var _NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n/* harmony import */ var _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Core/Utils/Constants.js */ \"../../engine/dist/browser/Core/Utils/Constants.js\");\n/* harmony import */ var _TypeUtils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TypeUtils.js */ \"../../engine/dist/browser/Utils/TypeUtils.js\");\n/* harmony import */ var _Core_Utils_Vectors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Core/Utils/Vectors.js */ \"../../engine/dist/browser/Core/Utils/Vectors.js\");\n\n\n\n\nconst _logger = {\n  debug: console.debug,\n  error: console.error,\n  info: console.info,\n  log: console.log,\n  verbose: console.log,\n  warning: console.warn\n};\nfunction setLogger(logger) {\n  _logger.debug = logger.debug || _logger.debug;\n  _logger.error = logger.error || _logger.error;\n  _logger.info = logger.info || _logger.info;\n  _logger.log = logger.log || _logger.log;\n  _logger.verbose = logger.verbose || _logger.verbose;\n  _logger.warning = logger.warning || _logger.warning;\n}\nfunction getLogger() {\n  return _logger;\n}\nfunction rectSideBounce(data) {\n  const res = {\n      bounced: false\n    },\n    {\n      pSide,\n      pOtherSide,\n      rectSide,\n      rectOtherSide,\n      velocity,\n      factor\n    } = data,\n    half = 0.5,\n    minVelocity = 0;\n  if (pOtherSide.min < rectOtherSide.min || pOtherSide.min > rectOtherSide.max || pOtherSide.max < rectOtherSide.min || pOtherSide.max > rectOtherSide.max) {\n    return res;\n  }\n  if (pSide.max >= rectSide.min && pSide.max <= (rectSide.max + rectSide.min) * half && velocity > minVelocity || pSide.min <= rectSide.max && pSide.min > (rectSide.max + rectSide.min) * half && velocity < minVelocity) {\n    res.velocity = velocity * -factor;\n    res.bounced = true;\n  }\n  return res;\n}\nfunction checkSelector(element, selectors) {\n  const res = executeOnSingleOrMultiple(selectors, selector => {\n    return element.matches(selector);\n  });\n  return (0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_2__.isArray)(res) ? res.some(t => t) : res;\n}\nfunction isSsr() {\n  return typeof window === \"undefined\" || !window || typeof window.document === \"undefined\" || !window.document;\n}\nfunction hasMatchMedia() {\n  return !isSsr() && typeof matchMedia !== \"undefined\";\n}\nfunction safeMatchMedia(query) {\n  if (!hasMatchMedia()) {\n    return;\n  }\n  return matchMedia(query);\n}\nfunction safeIntersectionObserver(callback) {\n  if (isSsr() || typeof IntersectionObserver === \"undefined\") {\n    return;\n  }\n  return new IntersectionObserver(callback);\n}\nfunction safeMutationObserver(callback) {\n  if (isSsr() || typeof MutationObserver === \"undefined\") {\n    return;\n  }\n  return new MutationObserver(callback);\n}\nfunction isInArray(value, array) {\n  const invalidIndex = -1;\n  return value === array || (0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_2__.isArray)(array) && array.indexOf(value) > invalidIndex;\n}\nasync function loadFont(font, weight) {\n  try {\n    await document.fonts.load(`${weight ?? \"400\"} 36px '${font ?? \"Verdana\"}'`);\n  } catch {}\n}\nfunction arrayRandomIndex(array) {\n  return Math.floor((0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRandom)() * array.length);\n}\nfunction itemFromArray(array, index, useIndex = true) {\n  return array[index !== undefined && useIndex ? index % array.length : arrayRandomIndex(array)];\n}\nfunction isPointInside(point, size, offset, radius, direction) {\n  const minRadius = 0;\n  return areBoundsInside(calculateBounds(point, radius ?? minRadius), size, offset, direction);\n}\nfunction areBoundsInside(bounds, size, offset, direction) {\n  let inside = true;\n  if (!direction || direction === \"bottom\") {\n    inside = bounds.top < size.height + offset.x;\n  }\n  if (inside && (!direction || direction === \"left\")) {\n    inside = bounds.right > offset.x;\n  }\n  if (inside && (!direction || direction === \"right\")) {\n    inside = bounds.left < size.width + offset.y;\n  }\n  if (inside && (!direction || direction === \"top\")) {\n    inside = bounds.bottom > offset.y;\n  }\n  return inside;\n}\nfunction calculateBounds(point, radius) {\n  return {\n    bottom: point.y + radius,\n    left: point.x - radius,\n    right: point.x + radius,\n    top: point.y - radius\n  };\n}\nfunction deepExtend(destination, ...sources) {\n  for (const source of sources) {\n    if (source === undefined || source === null) {\n      continue;\n    }\n    if (!(0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(source)) {\n      destination = source;\n      continue;\n    }\n    const sourceIsArray = Array.isArray(source);\n    if (sourceIsArray && ((0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(destination) || !destination || !Array.isArray(destination))) {\n      destination = [];\n    } else if (!sourceIsArray && ((0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(destination) || !destination || Array.isArray(destination))) {\n      destination = {};\n    }\n    for (const key in source) {\n      if (key === \"__proto__\") {\n        continue;\n      }\n      const sourceDict = source,\n        value = sourceDict[key],\n        destDict = destination;\n      destDict[key] = (0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_2__.isObject)(value) && Array.isArray(value) ? value.map(v => deepExtend(destDict[key], v)) : deepExtend(destDict[key], value);\n    }\n  }\n  return destination;\n}\nfunction isDivModeEnabled(mode, divs) {\n  return !!findItemFromSingleOrMultiple(divs, t => t.enable && isInArray(mode, t.mode));\n}\nfunction divModeExecute(mode, divs, callback) {\n  executeOnSingleOrMultiple(divs, div => {\n    const divMode = div.mode,\n      divEnabled = div.enable;\n    if (divEnabled && isInArray(mode, divMode)) {\n      singleDivModeExecute(div, callback);\n    }\n  });\n}\nfunction singleDivModeExecute(div, callback) {\n  const selectors = div.selectors;\n  executeOnSingleOrMultiple(selectors, selector => {\n    callback(selector, div);\n  });\n}\nfunction divMode(divs, element) {\n  if (!element || !divs) {\n    return;\n  }\n  return findItemFromSingleOrMultiple(divs, div => {\n    return checkSelector(element, div.selectors);\n  });\n}\nfunction circleBounceDataFromParticle(p) {\n  return {\n    position: p.getPosition(),\n    radius: p.getRadius(),\n    mass: p.getMass(),\n    velocity: p.velocity,\n    factor: _Core_Utils_Vectors_js__WEBPACK_IMPORTED_MODULE_3__.Vector.create((0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(p.options.bounce.horizontal.value), (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(p.options.bounce.vertical.value))\n  };\n}\nfunction circleBounce(p1, p2) {\n  const {\n      x: xVelocityDiff,\n      y: yVelocityDiff\n    } = p1.velocity.sub(p2.velocity),\n    [pos1, pos2] = [p1.position, p2.position],\n    {\n      dx: xDist,\n      dy: yDist\n    } = (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getDistances)(pos2, pos1),\n    minimumDistance = 0;\n  if (xVelocityDiff * xDist + yVelocityDiff * yDist < minimumDistance) {\n    return;\n  }\n  const angle = -Math.atan2(yDist, xDist),\n    m1 = p1.mass,\n    m2 = p2.mass,\n    u1 = p1.velocity.rotate(angle),\n    u2 = p2.velocity.rotate(angle),\n    v1 = (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.collisionVelocity)(u1, u2, m1, m2),\n    v2 = (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.collisionVelocity)(u2, u1, m1, m2),\n    vFinal1 = v1.rotate(-angle),\n    vFinal2 = v2.rotate(-angle);\n  p1.velocity.x = vFinal1.x * p1.factor.x;\n  p1.velocity.y = vFinal1.y * p1.factor.y;\n  p2.velocity.x = vFinal2.x * p2.factor.x;\n  p2.velocity.y = vFinal2.y * p2.factor.y;\n}\nfunction rectBounce(particle, divBounds) {\n  const pPos = particle.getPosition(),\n    size = particle.getRadius(),\n    bounds = calculateBounds(pPos, size),\n    bounceOptions = particle.options.bounce,\n    resH = rectSideBounce({\n      pSide: {\n        min: bounds.left,\n        max: bounds.right\n      },\n      pOtherSide: {\n        min: bounds.top,\n        max: bounds.bottom\n      },\n      rectSide: {\n        min: divBounds.left,\n        max: divBounds.right\n      },\n      rectOtherSide: {\n        min: divBounds.top,\n        max: divBounds.bottom\n      },\n      velocity: particle.velocity.x,\n      factor: (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(bounceOptions.horizontal.value)\n    });\n  if (resH.bounced) {\n    if (resH.velocity !== undefined) {\n      particle.velocity.x = resH.velocity;\n    }\n    if (resH.position !== undefined) {\n      particle.position.x = resH.position;\n    }\n  }\n  const resV = rectSideBounce({\n    pSide: {\n      min: bounds.top,\n      max: bounds.bottom\n    },\n    pOtherSide: {\n      min: bounds.left,\n      max: bounds.right\n    },\n    rectSide: {\n      min: divBounds.top,\n      max: divBounds.bottom\n    },\n    rectOtherSide: {\n      min: divBounds.left,\n      max: divBounds.right\n    },\n    velocity: particle.velocity.y,\n    factor: (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(bounceOptions.vertical.value)\n  });\n  if (resV.bounced) {\n    if (resV.velocity !== undefined) {\n      particle.velocity.y = resV.velocity;\n    }\n    if (resV.position !== undefined) {\n      particle.position.y = resV.position;\n    }\n  }\n}\nfunction executeOnSingleOrMultiple(obj, callback) {\n  const defaultIndex = 0;\n  return (0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_2__.isArray)(obj) ? obj.map((item, index) => callback(item, index)) : callback(obj, defaultIndex);\n}\nfunction itemFromSingleOrMultiple(obj, index, useIndex) {\n  return (0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_2__.isArray)(obj) ? itemFromArray(obj, index, useIndex) : obj;\n}\nfunction findItemFromSingleOrMultiple(obj, callback) {\n  if ((0,_TypeUtils_js__WEBPACK_IMPORTED_MODULE_2__.isArray)(obj)) {\n    return obj.find((t, index) => callback(t, index));\n  }\n  const defaultIndex = 0;\n  return callback(obj, defaultIndex) ? obj : undefined;\n}\nfunction initParticleNumericAnimationValue(options, pxRatio) {\n  const valueRange = options.value,\n    animationOptions = options.animation,\n    res = {\n      delayTime: (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(animationOptions.delay) * _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_1__.millisecondsToSeconds,\n      enable: animationOptions.enable,\n      value: (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(options.value) * pxRatio,\n      max: (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeMax)(valueRange) * pxRatio,\n      min: (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeMin)(valueRange) * pxRatio,\n      loops: 0,\n      maxLoops: (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(animationOptions.count),\n      time: 0\n    },\n    decayOffset = 1;\n  if (animationOptions.enable) {\n    res.decay = decayOffset - (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRangeValue)(animationOptions.decay);\n    switch (animationOptions.mode) {\n      case \"increase\":\n        res.status = \"increasing\";\n        break;\n      case \"decrease\":\n        res.status = \"decreasing\";\n        break;\n      case \"random\":\n        res.status = (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRandom)() >= _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_1__.halfRandom ? \"increasing\" : \"decreasing\";\n        break;\n    }\n    const autoStatus = animationOptions.mode === \"auto\";\n    switch (animationOptions.startValue) {\n      case \"min\":\n        res.value = res.min;\n        if (autoStatus) {\n          res.status = \"increasing\";\n        }\n        break;\n      case \"max\":\n        res.value = res.max;\n        if (autoStatus) {\n          res.status = \"decreasing\";\n        }\n        break;\n      case \"random\":\n      default:\n        res.value = (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.randomInRange)(res);\n        if (autoStatus) {\n          res.status = (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.getRandom)() >= _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_1__.halfRandom ? \"increasing\" : \"decreasing\";\n        }\n        break;\n    }\n  }\n  res.initialValue = res.value;\n  return res;\n}\nfunction getPositionOrSize(positionOrSize, canvasSize) {\n  const isPercent = positionOrSize.mode === \"percent\";\n  if (!isPercent) {\n    const {\n      mode: _,\n      ...rest\n    } = positionOrSize;\n    return rest;\n  }\n  const isPosition = (\"x\" in positionOrSize);\n  if (isPosition) {\n    return {\n      x: positionOrSize.x / _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_1__.percentDenominator * canvasSize.width,\n      y: positionOrSize.y / _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_1__.percentDenominator * canvasSize.height\n    };\n  } else {\n    return {\n      width: positionOrSize.width / _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_1__.percentDenominator * canvasSize.width,\n      height: positionOrSize.height / _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_1__.percentDenominator * canvasSize.height\n    };\n  }\n}\nfunction getPosition(position, canvasSize) {\n  return getPositionOrSize(position, canvasSize);\n}\nfunction getSize(size, canvasSize) {\n  return getPositionOrSize(size, canvasSize);\n}\nfunction checkDestroy(particle, destroyType, value, minValue, maxValue) {\n  switch (destroyType) {\n    case \"max\":\n      if (value >= maxValue) {\n        particle.destroy();\n      }\n      break;\n    case \"min\":\n      if (value <= minValue) {\n        particle.destroy();\n      }\n      break;\n  }\n}\nfunction updateAnimation(particle, data, changeDirection, destroyType, delta) {\n  const minLoops = 0,\n    minDelay = 0,\n    identity = 1,\n    minVelocity = 0,\n    minDecay = 1;\n  if (particle.destroyed || !data || !data.enable || (data.maxLoops ?? minLoops) > minLoops && (data.loops ?? minLoops) > (data.maxLoops ?? minLoops)) {\n    return;\n  }\n  const velocity = (data.velocity ?? minVelocity) * delta.factor,\n    minValue = data.min,\n    maxValue = data.max,\n    decay = data.decay ?? minDecay;\n  if (!data.time) {\n    data.time = 0;\n  }\n  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {\n    data.time += delta.value;\n  }\n  if ((data.delayTime ?? minDelay) > minDelay && data.time < (data.delayTime ?? minDelay)) {\n    return;\n  }\n  switch (data.status) {\n    case \"increasing\":\n      if (data.value >= maxValue) {\n        if (changeDirection) {\n          data.status = \"decreasing\";\n        } else {\n          data.value -= maxValue;\n        }\n        if (!data.loops) {\n          data.loops = minLoops;\n        }\n        data.loops++;\n      } else {\n        data.value += velocity;\n      }\n      break;\n    case \"decreasing\":\n      if (data.value <= minValue) {\n        if (changeDirection) {\n          data.status = \"increasing\";\n        } else {\n          data.value += maxValue;\n        }\n        if (!data.loops) {\n          data.loops = minLoops;\n        }\n        data.loops++;\n      } else {\n        data.value -= velocity;\n      }\n  }\n  if (data.velocity && decay !== identity) {\n    data.velocity *= decay;\n  }\n  checkDestroy(particle, destroyType, data.value, minValue, maxValue);\n  if (!particle.destroyed) {\n    data.value = (0,_NumberUtils_js__WEBPACK_IMPORTED_MODULE_0__.clamp)(data.value, minValue, maxValue);\n  }\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/Utils/Utils.js?");

/***/ }),

/***/ "../../engine/dist/browser/export-types.js":
/*!*************************************************!*\
  !*** ../../engine/dist/browser/export-types.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Core_Interfaces_Colors_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Core/Interfaces/Colors.js */ \"../../engine/dist/browser/Core/Interfaces/Colors.js\");\n/* harmony import */ var _Core_Interfaces_IBounds_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Core/Interfaces/IBounds.js */ \"../../engine/dist/browser/Core/Interfaces/IBounds.js\");\n/* harmony import */ var _Core_Interfaces_IBubbleParticleData_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Core/Interfaces/IBubbleParticleData.js */ \"../../engine/dist/browser/Core/Interfaces/IBubbleParticleData.js\");\n/* harmony import */ var _Core_Interfaces_ICircleBouncer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Core/Interfaces/ICircleBouncer.js */ \"../../engine/dist/browser/Core/Interfaces/ICircleBouncer.js\");\n/* harmony import */ var _Core_Interfaces_IColorManager_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Core/Interfaces/IColorManager.js */ \"../../engine/dist/browser/Core/Interfaces/IColorManager.js\");\n/* harmony import */ var _Core_Interfaces_IContainerInteractivity_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Core/Interfaces/IContainerInteractivity.js */ \"../../engine/dist/browser/Core/Interfaces/IContainerInteractivity.js\");\n/* harmony import */ var _Core_Interfaces_IContainerPlugin_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Core/Interfaces/IContainerPlugin.js */ \"../../engine/dist/browser/Core/Interfaces/IContainerPlugin.js\");\n/* harmony import */ var _Core_Interfaces_ICoordinates_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Core/Interfaces/ICoordinates.js */ \"../../engine/dist/browser/Core/Interfaces/ICoordinates.js\");\n/* harmony import */ var _Core_Interfaces_IDelta_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Core/Interfaces/IDelta.js */ \"../../engine/dist/browser/Core/Interfaces/IDelta.js\");\n/* harmony import */ var _Core_Interfaces_IDimension_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Core/Interfaces/IDimension.js */ \"../../engine/dist/browser/Core/Interfaces/IDimension.js\");\n/* harmony import */ var _Core_Interfaces_IDistance_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Core/Interfaces/IDistance.js */ \"../../engine/dist/browser/Core/Interfaces/IDistance.js\");\n/* harmony import */ var _Core_Interfaces_IDrawParticleParams_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Core/Interfaces/IDrawParticleParams.js */ \"../../engine/dist/browser/Core/Interfaces/IDrawParticleParams.js\");\n/* harmony import */ var _Core_Interfaces_IEffectDrawer_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Core/Interfaces/IEffectDrawer.js */ \"../../engine/dist/browser/Core/Interfaces/IEffectDrawer.js\");\n/* harmony import */ var _Core_Interfaces_IExternalInteractor_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Core/Interfaces/IExternalInteractor.js */ \"../../engine/dist/browser/Core/Interfaces/IExternalInteractor.js\");\n/* harmony import */ var _Core_Interfaces_IInteractor_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Core/Interfaces/IInteractor.js */ \"../../engine/dist/browser/Core/Interfaces/IInteractor.js\");\n/* harmony import */ var _Core_Interfaces_ILoadParams_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Core/Interfaces/ILoadParams.js */ \"../../engine/dist/browser/Core/Interfaces/ILoadParams.js\");\n/* harmony import */ var _Core_Interfaces_IMouseData_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Core/Interfaces/IMouseData.js */ \"../../engine/dist/browser/Core/Interfaces/IMouseData.js\");\n/* harmony import */ var _Core_Interfaces_IMovePathGenerator_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Core/Interfaces/IMovePathGenerator.js */ \"../../engine/dist/browser/Core/Interfaces/IMovePathGenerator.js\");\n/* harmony import */ var _Core_Interfaces_IParticleColorStyle_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Core/Interfaces/IParticleColorStyle.js */ \"../../engine/dist/browser/Core/Interfaces/IParticleColorStyle.js\");\n/* harmony import */ var _Core_Interfaces_IParticleHslAnimation_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Core/Interfaces/IParticleHslAnimation.js */ \"../../engine/dist/browser/Core/Interfaces/IParticleHslAnimation.js\");\n/* harmony import */ var _Core_Interfaces_IParticleLife_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Core/Interfaces/IParticleLife.js */ \"../../engine/dist/browser/Core/Interfaces/IParticleLife.js\");\n/* harmony import */ var _Core_Interfaces_IParticleMover_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Core/Interfaces/IParticleMover.js */ \"../../engine/dist/browser/Core/Interfaces/IParticleMover.js\");\n/* harmony import */ var _Core_Interfaces_IParticleRetinaProps_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./Core/Interfaces/IParticleRetinaProps.js */ \"../../engine/dist/browser/Core/Interfaces/IParticleRetinaProps.js\");\n/* harmony import */ var _Core_Interfaces_IParticleRoll_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Core/Interfaces/IParticleRoll.js */ \"../../engine/dist/browser/Core/Interfaces/IParticleRoll.js\");\n/* harmony import */ var _Core_Interfaces_IParticleTransformValues_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Core/Interfaces/IParticleTransformValues.js */ \"../../engine/dist/browser/Core/Interfaces/IParticleTransformValues.js\");\n/* harmony import */ var _Core_Interfaces_IParticleUpdater_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./Core/Interfaces/IParticleUpdater.js */ \"../../engine/dist/browser/Core/Interfaces/IParticleUpdater.js\");\n/* harmony import */ var _Core_Interfaces_IParticleValueAnimation_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./Core/Interfaces/IParticleValueAnimation.js */ \"../../engine/dist/browser/Core/Interfaces/IParticleValueAnimation.js\");\n/* harmony import */ var _Core_Interfaces_IParticlesInteractor_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./Core/Interfaces/IParticlesInteractor.js */ \"../../engine/dist/browser/Core/Interfaces/IParticlesInteractor.js\");\n/* harmony import */ var _Core_Interfaces_IPlugin_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./Core/Interfaces/IPlugin.js */ \"../../engine/dist/browser/Core/Interfaces/IPlugin.js\");\n/* harmony import */ var _Core_Interfaces_IPositionFromSizeParams_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./Core/Interfaces/IPositionFromSizeParams.js */ \"../../engine/dist/browser/Core/Interfaces/IPositionFromSizeParams.js\");\n/* harmony import */ var _Core_Interfaces_IRangeValue_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./Core/Interfaces/IRangeValue.js */ \"../../engine/dist/browser/Core/Interfaces/IRangeValue.js\");\n/* harmony import */ var _Core_Interfaces_IRectSideResult_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./Core/Interfaces/IRectSideResult.js */ \"../../engine/dist/browser/Core/Interfaces/IRectSideResult.js\");\n/* harmony import */ var _Core_Interfaces_IShapeDrawData_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./Core/Interfaces/IShapeDrawData.js */ \"../../engine/dist/browser/Core/Interfaces/IShapeDrawData.js\");\n/* harmony import */ var _Core_Interfaces_IShapeDrawer_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./Core/Interfaces/IShapeDrawer.js */ \"../../engine/dist/browser/Core/Interfaces/IShapeDrawer.js\");\n/* harmony import */ var _Core_Interfaces_IShapeValues_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./Core/Interfaces/IShapeValues.js */ \"../../engine/dist/browser/Core/Interfaces/IShapeValues.js\");\n/* harmony import */ var _Core_Interfaces_ISlowParticleData_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./Core/Interfaces/ISlowParticleData.js */ \"../../engine/dist/browser/Core/Interfaces/ISlowParticleData.js\");\n/* harmony import */ var _Core_Interfaces_ITrailFillData_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./Core/Interfaces/ITrailFillData.js */ \"../../engine/dist/browser/Core/Interfaces/ITrailFillData.js\");\n/* harmony import */ var _Options_Interfaces_Background_IBackground_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./Options/Interfaces/Background/IBackground.js */ \"../../engine/dist/browser/Options/Interfaces/Background/IBackground.js\");\n/* harmony import */ var _Options_Interfaces_BackgroundMask_IBackgroundMask_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./Options/Interfaces/BackgroundMask/IBackgroundMask.js */ \"../../engine/dist/browser/Options/Interfaces/BackgroundMask/IBackgroundMask.js\");\n/* harmony import */ var _Options_Interfaces_BackgroundMask_IBackgroundMaskCover_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./Options/Interfaces/BackgroundMask/IBackgroundMaskCover.js */ \"../../engine/dist/browser/Options/Interfaces/BackgroundMask/IBackgroundMaskCover.js\");\n/* harmony import */ var _Options_Interfaces_FullScreen_IFullScreen_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./Options/Interfaces/FullScreen/IFullScreen.js */ \"../../engine/dist/browser/Options/Interfaces/FullScreen/IFullScreen.js\");\n/* harmony import */ var _Options_Interfaces_IAnimatable_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./Options/Interfaces/IAnimatable.js */ \"../../engine/dist/browser/Options/Interfaces/IAnimatable.js\");\n/* harmony import */ var _Options_Interfaces_IAnimatableColor_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./Options/Interfaces/IAnimatableColor.js */ \"../../engine/dist/browser/Options/Interfaces/IAnimatableColor.js\");\n/* harmony import */ var _Options_Interfaces_IAnimation_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./Options/Interfaces/IAnimation.js */ \"../../engine/dist/browser/Options/Interfaces/IAnimation.js\");\n/* harmony import */ var _Options_Interfaces_IColorAnimation_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./Options/Interfaces/IColorAnimation.js */ \"../../engine/dist/browser/Options/Interfaces/IColorAnimation.js\");\n/* harmony import */ var _Options_Interfaces_IHslAnimation_js__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./Options/Interfaces/IHslAnimation.js */ \"../../engine/dist/browser/Options/Interfaces/IHslAnimation.js\");\n/* harmony import */ var _Options_Interfaces_IManualParticle_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./Options/Interfaces/IManualParticle.js */ \"../../engine/dist/browser/Options/Interfaces/IManualParticle.js\");\n/* harmony import */ var _Options_Interfaces_IOptionLoader_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./Options/Interfaces/IOptionLoader.js */ \"../../engine/dist/browser/Options/Interfaces/IOptionLoader.js\");\n/* harmony import */ var _Options_Interfaces_IOptions_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./Options/Interfaces/IOptions.js */ \"../../engine/dist/browser/Options/Interfaces/IOptions.js\");\n/* harmony import */ var _Options_Interfaces_IOptionsColor_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./Options/Interfaces/IOptionsColor.js */ \"../../engine/dist/browser/Options/Interfaces/IOptionsColor.js\");\n/* harmony import */ var _Options_Interfaces_IResponsive_js__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./Options/Interfaces/IResponsive.js */ \"../../engine/dist/browser/Options/Interfaces/IResponsive.js\");\n/* harmony import */ var _Options_Interfaces_IValueWithRandom_js__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./Options/Interfaces/IValueWithRandom.js */ \"../../engine/dist/browser/Options/Interfaces/IValueWithRandom.js\");\n/* harmony import */ var _Options_Interfaces_Interactivity_Events_IClickEvent_js__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Events/IClickEvent.js */ \"../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IClickEvent.js\");\n/* harmony import */ var _Options_Interfaces_Interactivity_Events_IDivEvent_js__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Events/IDivEvent.js */ \"../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IDivEvent.js\");\n/* harmony import */ var _Options_Interfaces_Interactivity_Events_IEvents_js__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Events/IEvents.js */ \"../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IEvents.js\");\n/* harmony import */ var _Options_Interfaces_Interactivity_Events_IHoverEvent_js__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Events/IHoverEvent.js */ \"../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IHoverEvent.js\");\n/* harmony import */ var _Options_Interfaces_Interactivity_Events_IParallax_js__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Events/IParallax.js */ \"../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IParallax.js\");\n/* harmony import */ var _Options_Interfaces_Interactivity_Events_IResizeEvent_js__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Events/IResizeEvent.js */ \"../../engine/dist/browser/Options/Interfaces/Interactivity/Events/IResizeEvent.js\");\n/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IModeDiv_js__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IModeDiv.js */ \"../../engine/dist/browser/Options/Interfaces/Interactivity/Modes/IModeDiv.js\");\n/* harmony import */ var _Options_Interfaces_Interactivity_Modes_IModes_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/Modes/IModes.js */ \"../../engine/dist/browser/Options/Interfaces/Interactivity/Modes/IModes.js\");\n/* harmony import */ var _Options_Interfaces_Interactivity_IInteractivity_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./Options/Interfaces/Interactivity/IInteractivity.js */ \"../../engine/dist/browser/Options/Interfaces/Interactivity/IInteractivity.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Bounce_IParticlesBounce_js__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Bounce/IParticlesBounce.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Bounce/IParticlesBounce.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Collisions_ICollisions_js__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Collisions/ICollisions.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Collisions/ICollisions.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Collisions_ICollisionsAbsorb_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Collisions/ICollisionsAbsorb.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Collisions/ICollisionsAbsorb.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Collisions_ICollisionsOverlap_js__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Collisions/ICollisionsOverlap.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Collisions/ICollisionsOverlap.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Effect_IEffect_js__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Effect/IEffect.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Effect/IEffect.js\");\n/* harmony import */ var _Options_Interfaces_Particles_IParticlesOptions_js__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./Options/Interfaces/Particles/IParticlesOptions.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/IParticlesOptions.js\");\n/* harmony import */ var _Options_Interfaces_Particles_IShadow_js__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./Options/Interfaces/Particles/IShadow.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/IShadow.js\");\n/* harmony import */ var _Options_Interfaces_Particles_IStroke_js__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./Options/Interfaces/Particles/IStroke.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/IStroke.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Move_IMoveAttract_js__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMoveAttract.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveAttract.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Move_IMove_js__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMove.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Move/IMove.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Move_IMoveAngle_js__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMoveAngle.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveAngle.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Move_IMoveCenter_js__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMoveCenter.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveCenter.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Move_IMoveGravity_js__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMoveGravity.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveGravity.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Move_Path_IMovePath_js__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/Path/IMovePath.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Move/Path/IMovePath.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Move_IOutModes_js__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IOutModes.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Move/IOutModes.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Move_ISpin_js__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/ISpin.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Move/ISpin.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Move_IMoveTrail_js__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Move/IMoveTrail.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Move/IMoveTrail.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Number_IParticlesDensity_js__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Number/IParticlesDensity.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Number/IParticlesDensity.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Number_IParticlesNumber_js__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Number/IParticlesNumber.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Number/IParticlesNumber.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Number_IParticlesNumberLimit_js__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Number/IParticlesNumberLimit.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Number/IParticlesNumberLimit.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Opacity_IOpacity_js__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Opacity/IOpacity.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Opacity/IOpacity.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Opacity_IOpacityAnimation_js__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Opacity/IOpacityAnimation.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Opacity/IOpacityAnimation.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Shape_IShape_js__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Shape/IShape.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Shape/IShape.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Size_ISize_js__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Size/ISize.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Size/ISize.js\");\n/* harmony import */ var _Options_Interfaces_Particles_Size_ISizeAnimation_js__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! ./Options/Interfaces/Particles/Size/ISizeAnimation.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/Size/ISizeAnimation.js\");\n/* harmony import */ var _Options_Interfaces_Particles_ZIndex_IZIndex_js__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! ./Options/Interfaces/Particles/ZIndex/IZIndex.js */ \"../../engine/dist/browser/Options/Interfaces/Particles/ZIndex/IZIndex.js\");\n/* harmony import */ var _Options_Interfaces_Theme_ITheme_js__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! ./Options/Interfaces/Theme/ITheme.js */ \"../../engine/dist/browser/Options/Interfaces/Theme/ITheme.js\");\n/* harmony import */ var _Options_Interfaces_Theme_IThemeDefault_js__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! ./Options/Interfaces/Theme/IThemeDefault.js */ \"../../engine/dist/browser/Options/Interfaces/Theme/IThemeDefault.js\");\n/* harmony import */ var _Types_CustomEventArgs_js__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! ./Types/CustomEventArgs.js */ \"../../engine/dist/browser/Types/CustomEventArgs.js\");\n/* harmony import */ var _Types_CustomEventListener_js__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! ./Types/CustomEventListener.js */ \"../../engine/dist/browser/Types/CustomEventListener.js\");\n/* harmony import */ var _Types_ExportResult_js__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! ./Types/ExportResult.js */ \"../../engine/dist/browser/Types/ExportResult.js\");\n/* harmony import */ var _Types_ISourceOptions_js__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! ./Types/ISourceOptions.js */ \"../../engine/dist/browser/Types/ISourceOptions.js\");\n/* harmony import */ var _Types_ParticlesGroups_js__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! ./Types/ParticlesGroups.js */ \"../../engine/dist/browser/Types/ParticlesGroups.js\");\n/* harmony import */ var _Types_PathOptions_js__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! ./Types/PathOptions.js */ \"../../engine/dist/browser/Types/PathOptions.js\");\n/* harmony import */ var _Types_RangeValue_js__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! ./Types/RangeValue.js */ \"../../engine/dist/browser/Types/RangeValue.js\");\n/* harmony import */ var _Types_RecursivePartial_js__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! ./Types/RecursivePartial.js */ \"../../engine/dist/browser/Types/RecursivePartial.js\");\n/* harmony import */ var _Types_ShapeData_js__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! ./Types/ShapeData.js */ \"../../engine/dist/browser/Types/ShapeData.js\");\n/* harmony import */ var _Types_SingleOrMultiple_js__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! ./Types/SingleOrMultiple.js */ \"../../engine/dist/browser/Types/SingleOrMultiple.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/export-types.js?");

/***/ }),

/***/ "../../engine/dist/browser/exports.js":
/*!********************************************!*\
  !*** ../../engine/dist/browser/exports.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AnimatableColor: () => (/* reexport safe */ _Options_Classes_AnimatableColor_js__WEBPACK_IMPORTED_MODULE_27__.AnimatableColor),\n/* harmony export */   AnimationOptions: () => (/* reexport safe */ _Options_Classes_AnimationOptions_js__WEBPACK_IMPORTED_MODULE_28__.AnimationOptions),\n/* harmony export */   AnimationValueWithRandom: () => (/* reexport safe */ _Options_Classes_ValueWithRandom_js__WEBPACK_IMPORTED_MODULE_75__.AnimationValueWithRandom),\n/* harmony export */   Background: () => (/* reexport safe */ _Options_Classes_Background_Background_js__WEBPACK_IMPORTED_MODULE_29__.Background),\n/* harmony export */   BackgroundMask: () => (/* reexport safe */ _Options_Classes_BackgroundMask_BackgroundMask_js__WEBPACK_IMPORTED_MODULE_30__.BackgroundMask),\n/* harmony export */   BackgroundMaskCover: () => (/* reexport safe */ _Options_Classes_BackgroundMask_BackgroundMaskCover_js__WEBPACK_IMPORTED_MODULE_31__.BackgroundMaskCover),\n/* harmony export */   BaseRange: () => (/* reexport safe */ _Core_Utils_Ranges_js__WEBPACK_IMPORTED_MODULE_4__.BaseRange),\n/* harmony export */   Circle: () => (/* reexport safe */ _Core_Utils_Ranges_js__WEBPACK_IMPORTED_MODULE_4__.Circle),\n/* harmony export */   ClickEvent: () => (/* reexport safe */ _Options_Classes_Interactivity_Events_ClickEvent_js__WEBPACK_IMPORTED_MODULE_35__.ClickEvent),\n/* harmony export */   Collisions: () => (/* reexport safe */ _Options_Classes_Particles_Collisions_Collisions_js__WEBPACK_IMPORTED_MODULE_48__.Collisions),\n/* harmony export */   CollisionsAbsorb: () => (/* reexport safe */ _Options_Classes_Particles_Collisions_CollisionsAbsorb_js__WEBPACK_IMPORTED_MODULE_49__.CollisionsAbsorb),\n/* harmony export */   CollisionsOverlap: () => (/* reexport safe */ _Options_Classes_Particles_Collisions_CollisionsOverlap_js__WEBPACK_IMPORTED_MODULE_50__.CollisionsOverlap),\n/* harmony export */   ColorAnimation: () => (/* reexport safe */ _Options_Classes_ColorAnimation_js__WEBPACK_IMPORTED_MODULE_32__.ColorAnimation),\n/* harmony export */   DivEvent: () => (/* reexport safe */ _Options_Classes_Interactivity_Events_DivEvent_js__WEBPACK_IMPORTED_MODULE_36__.DivEvent),\n/* harmony export */   Events: () => (/* reexport safe */ _Options_Classes_Interactivity_Events_Events_js__WEBPACK_IMPORTED_MODULE_37__.Events),\n/* harmony export */   ExternalInteractorBase: () => (/* reexport safe */ _Core_Utils_ExternalInteractorBase_js__WEBPACK_IMPORTED_MODULE_1__.ExternalInteractorBase),\n/* harmony export */   FullScreen: () => (/* reexport safe */ _Options_Classes_FullScreen_FullScreen_js__WEBPACK_IMPORTED_MODULE_33__.FullScreen),\n/* harmony export */   HoverEvent: () => (/* reexport safe */ _Options_Classes_Interactivity_Events_HoverEvent_js__WEBPACK_IMPORTED_MODULE_38__.HoverEvent),\n/* harmony export */   HslAnimation: () => (/* reexport safe */ _Options_Classes_HslAnimation_js__WEBPACK_IMPORTED_MODULE_34__.HslAnimation),\n/* harmony export */   HslColorManager: () => (/* reexport safe */ _Utils_HslColorManager_js__WEBPACK_IMPORTED_MODULE_78__.HslColorManager),\n/* harmony export */   Interactivity: () => (/* reexport safe */ _Options_Classes_Interactivity_Interactivity_js__WEBPACK_IMPORTED_MODULE_41__.Interactivity),\n/* harmony export */   ManualParticle: () => (/* reexport safe */ _Options_Classes_ManualParticle_js__WEBPACK_IMPORTED_MODULE_43__.ManualParticle),\n/* harmony export */   Modes: () => (/* reexport safe */ _Options_Classes_Interactivity_Modes_Modes_js__WEBPACK_IMPORTED_MODULE_42__.Modes),\n/* harmony export */   Move: () => (/* reexport safe */ _Options_Classes_Particles_Move_Move_js__WEBPACK_IMPORTED_MODULE_55__.Move),\n/* harmony export */   MoveAngle: () => (/* reexport safe */ _Options_Classes_Particles_Move_MoveAngle_js__WEBPACK_IMPORTED_MODULE_56__.MoveAngle),\n/* harmony export */   MoveAttract: () => (/* reexport safe */ _Options_Classes_Particles_Move_MoveAttract_js__WEBPACK_IMPORTED_MODULE_54__.MoveAttract),\n/* harmony export */   MoveCenter: () => (/* reexport safe */ _Options_Classes_Particles_Move_MoveCenter_js__WEBPACK_IMPORTED_MODULE_57__.MoveCenter),\n/* harmony export */   MoveGravity: () => (/* reexport safe */ _Options_Classes_Particles_Move_MoveGravity_js__WEBPACK_IMPORTED_MODULE_58__.MoveGravity),\n/* harmony export */   MovePath: () => (/* reexport safe */ _Options_Classes_Particles_Move_Path_MovePath_js__WEBPACK_IMPORTED_MODULE_60__.MovePath),\n/* harmony export */   MoveTrail: () => (/* reexport safe */ _Options_Classes_Particles_Move_MoveTrail_js__WEBPACK_IMPORTED_MODULE_62__.MoveTrail),\n/* harmony export */   Opacity: () => (/* reexport safe */ _Options_Classes_Particles_Opacity_Opacity_js__WEBPACK_IMPORTED_MODULE_66__.Opacity),\n/* harmony export */   OpacityAnimation: () => (/* reexport safe */ _Options_Classes_Particles_Opacity_OpacityAnimation_js__WEBPACK_IMPORTED_MODULE_67__.OpacityAnimation),\n/* harmony export */   Options: () => (/* reexport safe */ _Options_Classes_Options_js__WEBPACK_IMPORTED_MODULE_44__.Options),\n/* harmony export */   OptionsColor: () => (/* reexport safe */ _Options_Classes_OptionsColor_js__WEBPACK_IMPORTED_MODULE_45__.OptionsColor),\n/* harmony export */   OutModes: () => (/* reexport safe */ _Options_Classes_Particles_Move_OutModes_js__WEBPACK_IMPORTED_MODULE_59__.OutModes),\n/* harmony export */   Parallax: () => (/* reexport safe */ _Options_Classes_Interactivity_Events_Parallax_js__WEBPACK_IMPORTED_MODULE_39__.Parallax),\n/* harmony export */   ParticlesBounce: () => (/* reexport safe */ _Options_Classes_Particles_Bounce_ParticlesBounce_js__WEBPACK_IMPORTED_MODULE_46__.ParticlesBounce),\n/* harmony export */   ParticlesBounceFactor: () => (/* reexport safe */ _Options_Classes_Particles_Bounce_ParticlesBounceFactor_js__WEBPACK_IMPORTED_MODULE_47__.ParticlesBounceFactor),\n/* harmony export */   ParticlesDensity: () => (/* reexport safe */ _Options_Classes_Particles_Number_ParticlesDensity_js__WEBPACK_IMPORTED_MODULE_65__.ParticlesDensity),\n/* harmony export */   ParticlesInteractorBase: () => (/* reexport safe */ _Core_Utils_ParticlesInteractorBase_js__WEBPACK_IMPORTED_MODULE_2__.ParticlesInteractorBase),\n/* harmony export */   ParticlesNumber: () => (/* reexport safe */ _Options_Classes_Particles_Number_ParticlesNumber_js__WEBPACK_IMPORTED_MODULE_63__.ParticlesNumber),\n/* harmony export */   ParticlesNumberLimit: () => (/* reexport safe */ _Options_Classes_Particles_Number_ParticlesNumberLimit_js__WEBPACK_IMPORTED_MODULE_64__.ParticlesNumberLimit),\n/* harmony export */   ParticlesOptions: () => (/* reexport safe */ _Options_Classes_Particles_ParticlesOptions_js__WEBPACK_IMPORTED_MODULE_51__.ParticlesOptions),\n/* harmony export */   Point: () => (/* reexport safe */ _Core_Utils_Point_js__WEBPACK_IMPORTED_MODULE_3__.Point),\n/* harmony export */   RangedAnimationOptions: () => (/* reexport safe */ _Options_Classes_AnimationOptions_js__WEBPACK_IMPORTED_MODULE_28__.RangedAnimationOptions),\n/* harmony export */   RangedAnimationValueWithRandom: () => (/* reexport safe */ _Options_Classes_ValueWithRandom_js__WEBPACK_IMPORTED_MODULE_75__.RangedAnimationValueWithRandom),\n/* harmony export */   Rectangle: () => (/* reexport safe */ _Core_Utils_Ranges_js__WEBPACK_IMPORTED_MODULE_4__.Rectangle),\n/* harmony export */   ResizeEvent: () => (/* reexport safe */ _Options_Classes_Interactivity_Events_ResizeEvent_js__WEBPACK_IMPORTED_MODULE_40__.ResizeEvent),\n/* harmony export */   Responsive: () => (/* reexport safe */ _Options_Classes_Responsive_js__WEBPACK_IMPORTED_MODULE_72__.Responsive),\n/* harmony export */   RgbColorManager: () => (/* reexport safe */ _Utils_RgbColorManager_js__WEBPACK_IMPORTED_MODULE_81__.RgbColorManager),\n/* harmony export */   Shadow: () => (/* reexport safe */ _Options_Classes_Particles_Shadow_js__WEBPACK_IMPORTED_MODULE_52__.Shadow),\n/* harmony export */   Shape: () => (/* reexport safe */ _Options_Classes_Particles_Shape_Shape_js__WEBPACK_IMPORTED_MODULE_68__.Shape),\n/* harmony export */   Size: () => (/* reexport safe */ _Options_Classes_Particles_Size_Size_js__WEBPACK_IMPORTED_MODULE_69__.Size),\n/* harmony export */   SizeAnimation: () => (/* reexport safe */ _Options_Classes_Particles_Size_SizeAnimation_js__WEBPACK_IMPORTED_MODULE_70__.SizeAnimation),\n/* harmony export */   Spin: () => (/* reexport safe */ _Options_Classes_Particles_Move_Spin_js__WEBPACK_IMPORTED_MODULE_61__.Spin),\n/* harmony export */   Stroke: () => (/* reexport safe */ _Options_Classes_Particles_Stroke_js__WEBPACK_IMPORTED_MODULE_53__.Stroke),\n/* harmony export */   Theme: () => (/* reexport safe */ _Options_Classes_Theme_Theme_js__WEBPACK_IMPORTED_MODULE_73__.Theme),\n/* harmony export */   ThemeDefault: () => (/* reexport safe */ _Options_Classes_Theme_ThemeDefault_js__WEBPACK_IMPORTED_MODULE_74__.ThemeDefault),\n/* harmony export */   ValueWithRandom: () => (/* reexport safe */ _Options_Classes_ValueWithRandom_js__WEBPACK_IMPORTED_MODULE_75__.ValueWithRandom),\n/* harmony export */   Vector: () => (/* reexport safe */ _Core_Utils_Vectors_js__WEBPACK_IMPORTED_MODULE_5__.Vector),\n/* harmony export */   Vector3d: () => (/* reexport safe */ _Core_Utils_Vectors_js__WEBPACK_IMPORTED_MODULE_5__.Vector3d),\n/* harmony export */   ZIndex: () => (/* reexport safe */ _Options_Classes_Particles_ZIndex_ZIndex_js__WEBPACK_IMPORTED_MODULE_71__.ZIndex),\n/* harmony export */   addColorManager: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.addColorManager),\n/* harmony export */   addEasing: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.addEasing),\n/* harmony export */   alterHsl: () => (/* reexport safe */ _Utils_CanvasUtils_js__WEBPACK_IMPORTED_MODULE_76__.alterHsl),\n/* harmony export */   areBoundsInside: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.areBoundsInside),\n/* harmony export */   arrayRandomIndex: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.arrayRandomIndex),\n/* harmony export */   calcExactPositionOrRandomFromSize: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.calcExactPositionOrRandomFromSize),\n/* harmony export */   calcExactPositionOrRandomFromSizeRanged: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.calcExactPositionOrRandomFromSizeRanged),\n/* harmony export */   calcPositionFromSize: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.calcPositionFromSize),\n/* harmony export */   calcPositionOrRandomFromSize: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.calcPositionOrRandomFromSize),\n/* harmony export */   calcPositionOrRandomFromSizeRanged: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.calcPositionOrRandomFromSizeRanged),\n/* harmony export */   calculateBounds: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.calculateBounds),\n/* harmony export */   circleBounce: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.circleBounce),\n/* harmony export */   circleBounceDataFromParticle: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.circleBounceDataFromParticle),\n/* harmony export */   clamp: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.clamp),\n/* harmony export */   clear: () => (/* reexport safe */ _Utils_CanvasUtils_js__WEBPACK_IMPORTED_MODULE_76__.clear),\n/* harmony export */   collisionVelocity: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.collisionVelocity),\n/* harmony export */   colorMix: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.colorMix),\n/* harmony export */   colorToHsl: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.colorToHsl),\n/* harmony export */   colorToRgb: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.colorToRgb),\n/* harmony export */   deepExtend: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.deepExtend),\n/* harmony export */   degToRad: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.degToRad),\n/* harmony export */   divMode: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.divMode),\n/* harmony export */   divModeExecute: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.divModeExecute),\n/* harmony export */   drawEffect: () => (/* reexport safe */ _Utils_CanvasUtils_js__WEBPACK_IMPORTED_MODULE_76__.drawEffect),\n/* harmony export */   drawLine: () => (/* reexport safe */ _Utils_CanvasUtils_js__WEBPACK_IMPORTED_MODULE_76__.drawLine),\n/* harmony export */   drawParticle: () => (/* reexport safe */ _Utils_CanvasUtils_js__WEBPACK_IMPORTED_MODULE_76__.drawParticle),\n/* harmony export */   drawParticlePlugin: () => (/* reexport safe */ _Utils_CanvasUtils_js__WEBPACK_IMPORTED_MODULE_76__.drawParticlePlugin),\n/* harmony export */   drawPlugin: () => (/* reexport safe */ _Utils_CanvasUtils_js__WEBPACK_IMPORTED_MODULE_76__.drawPlugin),\n/* harmony export */   drawShape: () => (/* reexport safe */ _Utils_CanvasUtils_js__WEBPACK_IMPORTED_MODULE_76__.drawShape),\n/* harmony export */   drawShapeAfterDraw: () => (/* reexport safe */ _Utils_CanvasUtils_js__WEBPACK_IMPORTED_MODULE_76__.drawShapeAfterDraw),\n/* harmony export */   errorPrefix: () => (/* reexport safe */ _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.errorPrefix),\n/* harmony export */   executeOnSingleOrMultiple: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.executeOnSingleOrMultiple),\n/* harmony export */   findItemFromSingleOrMultiple: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.findItemFromSingleOrMultiple),\n/* harmony export */   generatedAttribute: () => (/* reexport safe */ _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.generatedAttribute),\n/* harmony export */   getDistance: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.getDistance),\n/* harmony export */   getDistances: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.getDistances),\n/* harmony export */   getEasing: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.getEasing),\n/* harmony export */   getHslAnimationFromHsl: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.getHslAnimationFromHsl),\n/* harmony export */   getHslFromAnimation: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.getHslFromAnimation),\n/* harmony export */   getLinkColor: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.getLinkColor),\n/* harmony export */   getLinkRandomColor: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.getLinkRandomColor),\n/* harmony export */   getLogger: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.getLogger),\n/* harmony export */   getParticleBaseVelocity: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.getParticleBaseVelocity),\n/* harmony export */   getParticleDirectionAngle: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.getParticleDirectionAngle),\n/* harmony export */   getPosition: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.getPosition),\n/* harmony export */   getRandom: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.getRandom),\n/* harmony export */   getRandomRgbColor: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.getRandomRgbColor),\n/* harmony export */   getRangeMax: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.getRangeMax),\n/* harmony export */   getRangeMin: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.getRangeMin),\n/* harmony export */   getRangeValue: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.getRangeValue),\n/* harmony export */   getSize: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.getSize),\n/* harmony export */   getStyleFromHsl: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.getStyleFromHsl),\n/* harmony export */   getStyleFromRgb: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.getStyleFromRgb),\n/* harmony export */   halfRandom: () => (/* reexport safe */ _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.halfRandom),\n/* harmony export */   hasMatchMedia: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.hasMatchMedia),\n/* harmony export */   hslToRgb: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.hslToRgb),\n/* harmony export */   hslaToRgba: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.hslaToRgba),\n/* harmony export */   initParticleNumericAnimationValue: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.initParticleNumericAnimationValue),\n/* harmony export */   isArray: () => (/* reexport safe */ _Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_83__.isArray),\n/* harmony export */   isBoolean: () => (/* reexport safe */ _Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_83__.isBoolean),\n/* harmony export */   isDivModeEnabled: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.isDivModeEnabled),\n/* harmony export */   isFunction: () => (/* reexport safe */ _Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_83__.isFunction),\n/* harmony export */   isInArray: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.isInArray),\n/* harmony export */   isNumber: () => (/* reexport safe */ _Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_83__.isNumber),\n/* harmony export */   isObject: () => (/* reexport safe */ _Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_83__.isObject),\n/* harmony export */   isPointInside: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.isPointInside),\n/* harmony export */   isSsr: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.isSsr),\n/* harmony export */   isString: () => (/* reexport safe */ _Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_83__.isString),\n/* harmony export */   itemFromArray: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.itemFromArray),\n/* harmony export */   itemFromSingleOrMultiple: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.itemFromSingleOrMultiple),\n/* harmony export */   loadFont: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.loadFont),\n/* harmony export */   loadOptions: () => (/* reexport safe */ _Utils_OptionsUtils_js__WEBPACK_IMPORTED_MODULE_80__.loadOptions),\n/* harmony export */   loadParticlesOptions: () => (/* reexport safe */ _Utils_OptionsUtils_js__WEBPACK_IMPORTED_MODULE_80__.loadParticlesOptions),\n/* harmony export */   millisecondsToSeconds: () => (/* reexport safe */ _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.millisecondsToSeconds),\n/* harmony export */   mix: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.mix),\n/* harmony export */   mouseDownEvent: () => (/* reexport safe */ _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.mouseDownEvent),\n/* harmony export */   mouseLeaveEvent: () => (/* reexport safe */ _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.mouseLeaveEvent),\n/* harmony export */   mouseMoveEvent: () => (/* reexport safe */ _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.mouseMoveEvent),\n/* harmony export */   mouseOutEvent: () => (/* reexport safe */ _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.mouseOutEvent),\n/* harmony export */   mouseUpEvent: () => (/* reexport safe */ _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.mouseUpEvent),\n/* harmony export */   paintBase: () => (/* reexport safe */ _Utils_CanvasUtils_js__WEBPACK_IMPORTED_MODULE_76__.paintBase),\n/* harmony export */   paintImage: () => (/* reexport safe */ _Utils_CanvasUtils_js__WEBPACK_IMPORTED_MODULE_76__.paintImage),\n/* harmony export */   parseAlpha: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.parseAlpha),\n/* harmony export */   percentDenominator: () => (/* reexport safe */ _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.percentDenominator),\n/* harmony export */   randomInRange: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.randomInRange),\n/* harmony export */   rangeColorToHsl: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.rangeColorToHsl),\n/* harmony export */   rangeColorToRgb: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.rangeColorToRgb),\n/* harmony export */   rectBounce: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.rectBounce),\n/* harmony export */   resizeEvent: () => (/* reexport safe */ _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.resizeEvent),\n/* harmony export */   rgbToHsl: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.rgbToHsl),\n/* harmony export */   safeIntersectionObserver: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.safeIntersectionObserver),\n/* harmony export */   safeMatchMedia: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.safeMatchMedia),\n/* harmony export */   safeMutationObserver: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.safeMutationObserver),\n/* harmony export */   setLogger: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.setLogger),\n/* harmony export */   setRandom: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.setRandom),\n/* harmony export */   setRangeValue: () => (/* reexport safe */ _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__.setRangeValue),\n/* harmony export */   singleDivModeExecute: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.singleDivModeExecute),\n/* harmony export */   stringToAlpha: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.stringToAlpha),\n/* harmony export */   stringToRgb: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.stringToRgb),\n/* harmony export */   touchCancelEvent: () => (/* reexport safe */ _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.touchCancelEvent),\n/* harmony export */   touchEndEvent: () => (/* reexport safe */ _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.touchEndEvent),\n/* harmony export */   touchMoveEvent: () => (/* reexport safe */ _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.touchMoveEvent),\n/* harmony export */   touchStartEvent: () => (/* reexport safe */ _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.touchStartEvent),\n/* harmony export */   updateAnimation: () => (/* reexport safe */ _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__.updateAnimation),\n/* harmony export */   updateColor: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.updateColor),\n/* harmony export */   updateColorValue: () => (/* reexport safe */ _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__.updateColorValue),\n/* harmony export */   visibilityChangeEvent: () => (/* reexport safe */ _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__.visibilityChangeEvent)\n/* harmony export */ });\n/* harmony import */ var _Core_Utils_Constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Core/Utils/Constants.js */ \"../../engine/dist/browser/Core/Utils/Constants.js\");\n/* harmony import */ var _Core_Utils_ExternalInteractorBase_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Core/Utils/ExternalInteractorBase.js */ \"../../engine/dist/browser/Core/Utils/ExternalInteractorBase.js\");\n/* harmony import */ var _Core_Utils_ParticlesInteractorBase_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Core/Utils/ParticlesInteractorBase.js */ \"../../engine/dist/browser/Core/Utils/ParticlesInteractorBase.js\");\n/* harmony import */ var _Core_Utils_Point_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Core/Utils/Point.js */ \"../../engine/dist/browser/Core/Utils/Point.js\");\n/* harmony import */ var _Core_Utils_Ranges_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Core/Utils/Ranges.js */ \"../../engine/dist/browser/Core/Utils/Ranges.js\");\n/* harmony import */ var _Core_Utils_Vectors_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Core/Utils/Vectors.js */ \"../../engine/dist/browser/Core/Utils/Vectors.js\");\n/* harmony import */ var _Enums_Directions_MoveDirection_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Enums/Directions/MoveDirection.js */ \"../../engine/dist/browser/Enums/Directions/MoveDirection.js\");\n/* harmony import */ var _Enums_Directions_RotateDirection_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Enums/Directions/RotateDirection.js */ \"../../engine/dist/browser/Enums/Directions/RotateDirection.js\");\n/* harmony import */ var _Enums_Directions_OutModeDirection_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Enums/Directions/OutModeDirection.js */ \"../../engine/dist/browser/Enums/Directions/OutModeDirection.js\");\n/* harmony import */ var _Enums_Modes_AnimationMode_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Enums/Modes/AnimationMode.js */ \"../../engine/dist/browser/Enums/Modes/AnimationMode.js\");\n/* harmony import */ var _Enums_Modes_CollisionMode_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Enums/Modes/CollisionMode.js */ \"../../engine/dist/browser/Enums/Modes/CollisionMode.js\");\n/* harmony import */ var _Enums_Modes_LimitMode_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Enums/Modes/LimitMode.js */ \"../../engine/dist/browser/Enums/Modes/LimitMode.js\");\n/* harmony import */ var _Enums_Modes_OutMode_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Enums/Modes/OutMode.js */ \"../../engine/dist/browser/Enums/Modes/OutMode.js\");\n/* harmony import */ var _Enums_Modes_PixelMode_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Enums/Modes/PixelMode.js */ \"../../engine/dist/browser/Enums/Modes/PixelMode.js\");\n/* harmony import */ var _Enums_Modes_ThemeMode_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Enums/Modes/ThemeMode.js */ \"../../engine/dist/browser/Enums/Modes/ThemeMode.js\");\n/* harmony import */ var _Enums_Modes_ResponsiveMode_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./Enums/Modes/ResponsiveMode.js */ \"../../engine/dist/browser/Enums/Modes/ResponsiveMode.js\");\n/* harmony import */ var _Enums_Types_AlterType_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Enums/Types/AlterType.js */ \"../../engine/dist/browser/Enums/Types/AlterType.js\");\n/* harmony import */ var _Enums_Types_DestroyType_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Enums/Types/DestroyType.js */ \"../../engine/dist/browser/Enums/Types/DestroyType.js\");\n/* harmony import */ var _Enums_Types_GradientType_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Enums/Types/GradientType.js */ \"../../engine/dist/browser/Enums/Types/GradientType.js\");\n/* harmony import */ var _Enums_Types_InteractorType_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Enums/Types/InteractorType.js */ \"../../engine/dist/browser/Enums/Types/InteractorType.js\");\n/* harmony import */ var _Enums_Types_ParticleOutType_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Enums/Types/ParticleOutType.js */ \"../../engine/dist/browser/Enums/Types/ParticleOutType.js\");\n/* harmony import */ var _Enums_Types_StartValueType_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Enums/Types/StartValueType.js */ \"../../engine/dist/browser/Enums/Types/StartValueType.js\");\n/* harmony import */ var _Enums_Types_DivType_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./Enums/Types/DivType.js */ \"../../engine/dist/browser/Enums/Types/DivType.js\");\n/* harmony import */ var _Enums_Types_EasingType_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Enums/Types/EasingType.js */ \"../../engine/dist/browser/Enums/Types/EasingType.js\");\n/* harmony import */ var _Enums_Types_EventType_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Enums/Types/EventType.js */ \"../../engine/dist/browser/Enums/Types/EventType.js\");\n/* harmony import */ var _Enums_AnimationStatus_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./Enums/AnimationStatus.js */ \"../../engine/dist/browser/Enums/AnimationStatus.js\");\n/* harmony import */ var _Enums_InteractivityDetect_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./Enums/InteractivityDetect.js */ \"../../engine/dist/browser/Enums/InteractivityDetect.js\");\n/* harmony import */ var _Options_Classes_AnimatableColor_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./Options/Classes/AnimatableColor.js */ \"../../engine/dist/browser/Options/Classes/AnimatableColor.js\");\n/* harmony import */ var _Options_Classes_AnimationOptions_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./Options/Classes/AnimationOptions.js */ \"../../engine/dist/browser/Options/Classes/AnimationOptions.js\");\n/* harmony import */ var _Options_Classes_Background_Background_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./Options/Classes/Background/Background.js */ \"../../engine/dist/browser/Options/Classes/Background/Background.js\");\n/* harmony import */ var _Options_Classes_BackgroundMask_BackgroundMask_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./Options/Classes/BackgroundMask/BackgroundMask.js */ \"../../engine/dist/browser/Options/Classes/BackgroundMask/BackgroundMask.js\");\n/* harmony import */ var _Options_Classes_BackgroundMask_BackgroundMaskCover_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./Options/Classes/BackgroundMask/BackgroundMaskCover.js */ \"../../engine/dist/browser/Options/Classes/BackgroundMask/BackgroundMaskCover.js\");\n/* harmony import */ var _Options_Classes_ColorAnimation_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./Options/Classes/ColorAnimation.js */ \"../../engine/dist/browser/Options/Classes/ColorAnimation.js\");\n/* harmony import */ var _Options_Classes_FullScreen_FullScreen_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./Options/Classes/FullScreen/FullScreen.js */ \"../../engine/dist/browser/Options/Classes/FullScreen/FullScreen.js\");\n/* harmony import */ var _Options_Classes_HslAnimation_js__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./Options/Classes/HslAnimation.js */ \"../../engine/dist/browser/Options/Classes/HslAnimation.js\");\n/* harmony import */ var _Options_Classes_Interactivity_Events_ClickEvent_js__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/ClickEvent.js */ \"../../engine/dist/browser/Options/Classes/Interactivity/Events/ClickEvent.js\");\n/* harmony import */ var _Options_Classes_Interactivity_Events_DivEvent_js__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/DivEvent.js */ \"../../engine/dist/browser/Options/Classes/Interactivity/Events/DivEvent.js\");\n/* harmony import */ var _Options_Classes_Interactivity_Events_Events_js__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/Events.js */ \"../../engine/dist/browser/Options/Classes/Interactivity/Events/Events.js\");\n/* harmony import */ var _Options_Classes_Interactivity_Events_HoverEvent_js__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/HoverEvent.js */ \"../../engine/dist/browser/Options/Classes/Interactivity/Events/HoverEvent.js\");\n/* harmony import */ var _Options_Classes_Interactivity_Events_Parallax_js__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/Parallax.js */ \"../../engine/dist/browser/Options/Classes/Interactivity/Events/Parallax.js\");\n/* harmony import */ var _Options_Classes_Interactivity_Events_ResizeEvent_js__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Events/ResizeEvent.js */ \"../../engine/dist/browser/Options/Classes/Interactivity/Events/ResizeEvent.js\");\n/* harmony import */ var _Options_Classes_Interactivity_Interactivity_js__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Interactivity.js */ \"../../engine/dist/browser/Options/Classes/Interactivity/Interactivity.js\");\n/* harmony import */ var _Options_Classes_Interactivity_Modes_Modes_js__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./Options/Classes/Interactivity/Modes/Modes.js */ \"../../engine/dist/browser/Options/Classes/Interactivity/Modes/Modes.js\");\n/* harmony import */ var _Options_Classes_ManualParticle_js__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./Options/Classes/ManualParticle.js */ \"../../engine/dist/browser/Options/Classes/ManualParticle.js\");\n/* harmony import */ var _Options_Classes_Options_js__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./Options/Classes/Options.js */ \"../../engine/dist/browser/Options/Classes/Options.js\");\n/* harmony import */ var _Options_Classes_OptionsColor_js__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./Options/Classes/OptionsColor.js */ \"../../engine/dist/browser/Options/Classes/OptionsColor.js\");\n/* harmony import */ var _Options_Classes_Particles_Bounce_ParticlesBounce_js__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./Options/Classes/Particles/Bounce/ParticlesBounce.js */ \"../../engine/dist/browser/Options/Classes/Particles/Bounce/ParticlesBounce.js\");\n/* harmony import */ var _Options_Classes_Particles_Bounce_ParticlesBounceFactor_js__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./Options/Classes/Particles/Bounce/ParticlesBounceFactor.js */ \"../../engine/dist/browser/Options/Classes/Particles/Bounce/ParticlesBounceFactor.js\");\n/* harmony import */ var _Options_Classes_Particles_Collisions_Collisions_js__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./Options/Classes/Particles/Collisions/Collisions.js */ \"../../engine/dist/browser/Options/Classes/Particles/Collisions/Collisions.js\");\n/* harmony import */ var _Options_Classes_Particles_Collisions_CollisionsAbsorb_js__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./Options/Classes/Particles/Collisions/CollisionsAbsorb.js */ \"../../engine/dist/browser/Options/Classes/Particles/Collisions/CollisionsAbsorb.js\");\n/* harmony import */ var _Options_Classes_Particles_Collisions_CollisionsOverlap_js__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./Options/Classes/Particles/Collisions/CollisionsOverlap.js */ \"../../engine/dist/browser/Options/Classes/Particles/Collisions/CollisionsOverlap.js\");\n/* harmony import */ var _Options_Classes_Particles_ParticlesOptions_js__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./Options/Classes/Particles/ParticlesOptions.js */ \"../../engine/dist/browser/Options/Classes/Particles/ParticlesOptions.js\");\n/* harmony import */ var _Options_Classes_Particles_Shadow_js__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./Options/Classes/Particles/Shadow.js */ \"../../engine/dist/browser/Options/Classes/Particles/Shadow.js\");\n/* harmony import */ var _Options_Classes_Particles_Stroke_js__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./Options/Classes/Particles/Stroke.js */ \"../../engine/dist/browser/Options/Classes/Particles/Stroke.js\");\n/* harmony import */ var _Options_Classes_Particles_Move_MoveAttract_js__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/MoveAttract.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/MoveAttract.js\");\n/* harmony import */ var _Options_Classes_Particles_Move_Move_js__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/Move.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/Move.js\");\n/* harmony import */ var _Options_Classes_Particles_Move_MoveAngle_js__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/MoveAngle.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/MoveAngle.js\");\n/* harmony import */ var _Options_Classes_Particles_Move_MoveCenter_js__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/MoveCenter.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/MoveCenter.js\");\n/* harmony import */ var _Options_Classes_Particles_Move_MoveGravity_js__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/MoveGravity.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/MoveGravity.js\");\n/* harmony import */ var _Options_Classes_Particles_Move_OutModes_js__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/OutModes.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/OutModes.js\");\n/* harmony import */ var _Options_Classes_Particles_Move_Path_MovePath_js__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/Path/MovePath.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/Path/MovePath.js\");\n/* harmony import */ var _Options_Classes_Particles_Move_Spin_js__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/Spin.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/Spin.js\");\n/* harmony import */ var _Options_Classes_Particles_Move_MoveTrail_js__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./Options/Classes/Particles/Move/MoveTrail.js */ \"../../engine/dist/browser/Options/Classes/Particles/Move/MoveTrail.js\");\n/* harmony import */ var _Options_Classes_Particles_Number_ParticlesNumber_js__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./Options/Classes/Particles/Number/ParticlesNumber.js */ \"../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesNumber.js\");\n/* harmony import */ var _Options_Classes_Particles_Number_ParticlesNumberLimit_js__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./Options/Classes/Particles/Number/ParticlesNumberLimit.js */ \"../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesNumberLimit.js\");\n/* harmony import */ var _Options_Classes_Particles_Number_ParticlesDensity_js__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./Options/Classes/Particles/Number/ParticlesDensity.js */ \"../../engine/dist/browser/Options/Classes/Particles/Number/ParticlesDensity.js\");\n/* harmony import */ var _Options_Classes_Particles_Opacity_Opacity_js__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! ./Options/Classes/Particles/Opacity/Opacity.js */ \"../../engine/dist/browser/Options/Classes/Particles/Opacity/Opacity.js\");\n/* harmony import */ var _Options_Classes_Particles_Opacity_OpacityAnimation_js__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! ./Options/Classes/Particles/Opacity/OpacityAnimation.js */ \"../../engine/dist/browser/Options/Classes/Particles/Opacity/OpacityAnimation.js\");\n/* harmony import */ var _Options_Classes_Particles_Shape_Shape_js__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! ./Options/Classes/Particles/Shape/Shape.js */ \"../../engine/dist/browser/Options/Classes/Particles/Shape/Shape.js\");\n/* harmony import */ var _Options_Classes_Particles_Size_Size_js__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! ./Options/Classes/Particles/Size/Size.js */ \"../../engine/dist/browser/Options/Classes/Particles/Size/Size.js\");\n/* harmony import */ var _Options_Classes_Particles_Size_SizeAnimation_js__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! ./Options/Classes/Particles/Size/SizeAnimation.js */ \"../../engine/dist/browser/Options/Classes/Particles/Size/SizeAnimation.js\");\n/* harmony import */ var _Options_Classes_Particles_ZIndex_ZIndex_js__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! ./Options/Classes/Particles/ZIndex/ZIndex.js */ \"../../engine/dist/browser/Options/Classes/Particles/ZIndex/ZIndex.js\");\n/* harmony import */ var _Options_Classes_Responsive_js__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! ./Options/Classes/Responsive.js */ \"../../engine/dist/browser/Options/Classes/Responsive.js\");\n/* harmony import */ var _Options_Classes_Theme_Theme_js__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! ./Options/Classes/Theme/Theme.js */ \"../../engine/dist/browser/Options/Classes/Theme/Theme.js\");\n/* harmony import */ var _Options_Classes_Theme_ThemeDefault_js__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! ./Options/Classes/Theme/ThemeDefault.js */ \"../../engine/dist/browser/Options/Classes/Theme/ThemeDefault.js\");\n/* harmony import */ var _Options_Classes_ValueWithRandom_js__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! ./Options/Classes/ValueWithRandom.js */ \"../../engine/dist/browser/Options/Classes/ValueWithRandom.js\");\n/* harmony import */ var _Utils_CanvasUtils_js__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! ./Utils/CanvasUtils.js */ \"../../engine/dist/browser/Utils/CanvasUtils.js\");\n/* harmony import */ var _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! ./Utils/ColorUtils.js */ \"../../engine/dist/browser/Utils/ColorUtils.js\");\n/* harmony import */ var _Utils_HslColorManager_js__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! ./Utils/HslColorManager.js */ \"../../engine/dist/browser/Utils/HslColorManager.js\");\n/* harmony import */ var _Utils_NumberUtils_js__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! ./Utils/NumberUtils.js */ \"../../engine/dist/browser/Utils/NumberUtils.js\");\n/* harmony import */ var _Utils_OptionsUtils_js__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! ./Utils/OptionsUtils.js */ \"../../engine/dist/browser/Utils/OptionsUtils.js\");\n/* harmony import */ var _Utils_RgbColorManager_js__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! ./Utils/RgbColorManager.js */ \"../../engine/dist/browser/Utils/RgbColorManager.js\");\n/* harmony import */ var _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! ./Utils/Utils.js */ \"../../engine/dist/browser/Utils/Utils.js\");\n/* harmony import */ var _Utils_TypeUtils_js__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! ./Utils/TypeUtils.js */ \"../../engine/dist/browser/Utils/TypeUtils.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/exports.js?");

/***/ }),

/***/ "../../engine/dist/browser/index.js":
/*!******************************************!*\
  !*** ../../engine/dist/browser/index.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   AnimatableColor: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.AnimatableColor),\n/* harmony export */   AnimationOptions: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.AnimationOptions),\n/* harmony export */   AnimationValueWithRandom: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.AnimationValueWithRandom),\n/* harmony export */   Background: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Background),\n/* harmony export */   BackgroundMask: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.BackgroundMask),\n/* harmony export */   BackgroundMaskCover: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.BackgroundMaskCover),\n/* harmony export */   BaseRange: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.BaseRange),\n/* harmony export */   Circle: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Circle),\n/* harmony export */   ClickEvent: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.ClickEvent),\n/* harmony export */   Collisions: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Collisions),\n/* harmony export */   CollisionsAbsorb: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.CollisionsAbsorb),\n/* harmony export */   CollisionsOverlap: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.CollisionsOverlap),\n/* harmony export */   ColorAnimation: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.ColorAnimation),\n/* harmony export */   DivEvent: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.DivEvent),\n/* harmony export */   Events: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Events),\n/* harmony export */   ExternalInteractorBase: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.ExternalInteractorBase),\n/* harmony export */   FullScreen: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.FullScreen),\n/* harmony export */   HoverEvent: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.HoverEvent),\n/* harmony export */   HslAnimation: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.HslAnimation),\n/* harmony export */   HslColorManager: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.HslColorManager),\n/* harmony export */   Interactivity: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Interactivity),\n/* harmony export */   ManualParticle: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.ManualParticle),\n/* harmony export */   Modes: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Modes),\n/* harmony export */   Move: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Move),\n/* harmony export */   MoveAngle: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.MoveAngle),\n/* harmony export */   MoveAttract: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.MoveAttract),\n/* harmony export */   MoveCenter: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.MoveCenter),\n/* harmony export */   MoveGravity: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.MoveGravity),\n/* harmony export */   MovePath: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.MovePath),\n/* harmony export */   MoveTrail: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.MoveTrail),\n/* harmony export */   Opacity: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Opacity),\n/* harmony export */   OpacityAnimation: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.OpacityAnimation),\n/* harmony export */   Options: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Options),\n/* harmony export */   OptionsColor: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.OptionsColor),\n/* harmony export */   OutModes: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.OutModes),\n/* harmony export */   Parallax: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Parallax),\n/* harmony export */   ParticlesBounce: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.ParticlesBounce),\n/* harmony export */   ParticlesBounceFactor: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.ParticlesBounceFactor),\n/* harmony export */   ParticlesDensity: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.ParticlesDensity),\n/* harmony export */   ParticlesInteractorBase: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.ParticlesInteractorBase),\n/* harmony export */   ParticlesNumber: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.ParticlesNumber),\n/* harmony export */   ParticlesNumberLimit: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.ParticlesNumberLimit),\n/* harmony export */   ParticlesOptions: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.ParticlesOptions),\n/* harmony export */   Point: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Point),\n/* harmony export */   RangedAnimationOptions: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.RangedAnimationOptions),\n/* harmony export */   RangedAnimationValueWithRandom: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.RangedAnimationValueWithRandom),\n/* harmony export */   Rectangle: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Rectangle),\n/* harmony export */   ResizeEvent: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.ResizeEvent),\n/* harmony export */   Responsive: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Responsive),\n/* harmony export */   RgbColorManager: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.RgbColorManager),\n/* harmony export */   Shadow: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Shadow),\n/* harmony export */   Shape: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Shape),\n/* harmony export */   Size: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Size),\n/* harmony export */   SizeAnimation: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.SizeAnimation),\n/* harmony export */   Spin: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Spin),\n/* harmony export */   Stroke: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Stroke),\n/* harmony export */   Theme: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Theme),\n/* harmony export */   ThemeDefault: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.ThemeDefault),\n/* harmony export */   ValueWithRandom: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.ValueWithRandom),\n/* harmony export */   Vector: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Vector),\n/* harmony export */   Vector3d: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.Vector3d),\n/* harmony export */   ZIndex: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.ZIndex),\n/* harmony export */   addColorManager: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.addColorManager),\n/* harmony export */   addEasing: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.addEasing),\n/* harmony export */   alterHsl: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.alterHsl),\n/* harmony export */   areBoundsInside: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.areBoundsInside),\n/* harmony export */   arrayRandomIndex: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.arrayRandomIndex),\n/* harmony export */   calcExactPositionOrRandomFromSize: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.calcExactPositionOrRandomFromSize),\n/* harmony export */   calcExactPositionOrRandomFromSizeRanged: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.calcExactPositionOrRandomFromSizeRanged),\n/* harmony export */   calcPositionFromSize: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.calcPositionFromSize),\n/* harmony export */   calcPositionOrRandomFromSize: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.calcPositionOrRandomFromSize),\n/* harmony export */   calcPositionOrRandomFromSizeRanged: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.calcPositionOrRandomFromSizeRanged),\n/* harmony export */   calculateBounds: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.calculateBounds),\n/* harmony export */   circleBounce: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.circleBounce),\n/* harmony export */   circleBounceDataFromParticle: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.circleBounceDataFromParticle),\n/* harmony export */   clamp: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.clamp),\n/* harmony export */   clear: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.clear),\n/* harmony export */   collisionVelocity: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.collisionVelocity),\n/* harmony export */   colorMix: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.colorMix),\n/* harmony export */   colorToHsl: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.colorToHsl),\n/* harmony export */   colorToRgb: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.colorToRgb),\n/* harmony export */   deepExtend: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.deepExtend),\n/* harmony export */   degToRad: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.degToRad),\n/* harmony export */   divMode: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.divMode),\n/* harmony export */   divModeExecute: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.divModeExecute),\n/* harmony export */   drawEffect: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.drawEffect),\n/* harmony export */   drawLine: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.drawLine),\n/* harmony export */   drawParticle: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.drawParticle),\n/* harmony export */   drawParticlePlugin: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.drawParticlePlugin),\n/* harmony export */   drawPlugin: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.drawPlugin),\n/* harmony export */   drawShape: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.drawShape),\n/* harmony export */   drawShapeAfterDraw: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.drawShapeAfterDraw),\n/* harmony export */   errorPrefix: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.errorPrefix),\n/* harmony export */   executeOnSingleOrMultiple: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.executeOnSingleOrMultiple),\n/* harmony export */   findItemFromSingleOrMultiple: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.findItemFromSingleOrMultiple),\n/* harmony export */   generatedAttribute: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.generatedAttribute),\n/* harmony export */   getDistance: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getDistance),\n/* harmony export */   getDistances: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getDistances),\n/* harmony export */   getEasing: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getEasing),\n/* harmony export */   getHslAnimationFromHsl: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getHslAnimationFromHsl),\n/* harmony export */   getHslFromAnimation: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getHslFromAnimation),\n/* harmony export */   getLinkColor: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getLinkColor),\n/* harmony export */   getLinkRandomColor: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getLinkRandomColor),\n/* harmony export */   getLogger: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getLogger),\n/* harmony export */   getParticleBaseVelocity: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getParticleBaseVelocity),\n/* harmony export */   getParticleDirectionAngle: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getParticleDirectionAngle),\n/* harmony export */   getPosition: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getPosition),\n/* harmony export */   getRandom: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getRandom),\n/* harmony export */   getRandomRgbColor: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getRandomRgbColor),\n/* harmony export */   getRangeMax: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getRangeMax),\n/* harmony export */   getRangeMin: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getRangeMin),\n/* harmony export */   getRangeValue: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getRangeValue),\n/* harmony export */   getSize: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getSize),\n/* harmony export */   getStyleFromHsl: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getStyleFromHsl),\n/* harmony export */   getStyleFromRgb: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.getStyleFromRgb),\n/* harmony export */   halfRandom: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.halfRandom),\n/* harmony export */   hasMatchMedia: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.hasMatchMedia),\n/* harmony export */   hslToRgb: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.hslToRgb),\n/* harmony export */   hslaToRgba: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.hslaToRgba),\n/* harmony export */   initParticleNumericAnimationValue: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.initParticleNumericAnimationValue),\n/* harmony export */   isArray: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.isArray),\n/* harmony export */   isBoolean: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.isBoolean),\n/* harmony export */   isDivModeEnabled: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.isDivModeEnabled),\n/* harmony export */   isFunction: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.isFunction),\n/* harmony export */   isInArray: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.isInArray),\n/* harmony export */   isNumber: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.isNumber),\n/* harmony export */   isObject: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.isObject),\n/* harmony export */   isPointInside: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.isPointInside),\n/* harmony export */   isSsr: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.isSsr),\n/* harmony export */   isString: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.isString),\n/* harmony export */   itemFromArray: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.itemFromArray),\n/* harmony export */   itemFromSingleOrMultiple: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.itemFromSingleOrMultiple),\n/* harmony export */   loadFont: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.loadFont),\n/* harmony export */   loadOptions: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.loadOptions),\n/* harmony export */   loadParticlesOptions: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.loadParticlesOptions),\n/* harmony export */   millisecondsToSeconds: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.millisecondsToSeconds),\n/* harmony export */   mix: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.mix),\n/* harmony export */   mouseDownEvent: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.mouseDownEvent),\n/* harmony export */   mouseLeaveEvent: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.mouseLeaveEvent),\n/* harmony export */   mouseMoveEvent: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.mouseMoveEvent),\n/* harmony export */   mouseOutEvent: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.mouseOutEvent),\n/* harmony export */   mouseUpEvent: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.mouseUpEvent),\n/* harmony export */   paintBase: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.paintBase),\n/* harmony export */   paintImage: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.paintImage),\n/* harmony export */   parseAlpha: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.parseAlpha),\n/* harmony export */   percentDenominator: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.percentDenominator),\n/* harmony export */   randomInRange: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.randomInRange),\n/* harmony export */   rangeColorToHsl: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.rangeColorToHsl),\n/* harmony export */   rangeColorToRgb: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.rangeColorToRgb),\n/* harmony export */   rectBounce: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.rectBounce),\n/* harmony export */   resizeEvent: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.resizeEvent),\n/* harmony export */   rgbToHsl: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.rgbToHsl),\n/* harmony export */   safeIntersectionObserver: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.safeIntersectionObserver),\n/* harmony export */   safeMatchMedia: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.safeMatchMedia),\n/* harmony export */   safeMutationObserver: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.safeMutationObserver),\n/* harmony export */   setLogger: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.setLogger),\n/* harmony export */   setRandom: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.setRandom),\n/* harmony export */   setRangeValue: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.setRangeValue),\n/* harmony export */   singleDivModeExecute: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.singleDivModeExecute),\n/* harmony export */   stringToAlpha: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.stringToAlpha),\n/* harmony export */   stringToRgb: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.stringToRgb),\n/* harmony export */   touchCancelEvent: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.touchCancelEvent),\n/* harmony export */   touchEndEvent: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.touchEndEvent),\n/* harmony export */   touchMoveEvent: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.touchMoveEvent),\n/* harmony export */   touchStartEvent: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.touchStartEvent),\n/* harmony export */   tsParticles: () => (/* binding */ tsParticles),\n/* harmony export */   updateAnimation: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.updateAnimation),\n/* harmony export */   updateColor: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.updateColor),\n/* harmony export */   updateColorValue: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.updateColorValue),\n/* harmony export */   visibilityChangeEvent: () => (/* reexport safe */ _exports_js__WEBPACK_IMPORTED_MODULE_2__.visibilityChangeEvent)\n/* harmony export */ });\n/* harmony import */ var _init_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./init.js */ \"../../engine/dist/browser/init.js\");\n/* harmony import */ var _Utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils/Utils.js */ \"../../engine/dist/browser/Utils/Utils.js\");\n/* harmony import */ var _exports_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./exports.js */ \"../../engine/dist/browser/exports.js\");\n/* harmony import */ var _export_types_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./export-types.js */ \"../../engine/dist/browser/export-types.js\");\n\n\nconst tsParticles = (0,_init_js__WEBPACK_IMPORTED_MODULE_0__.init)();\nif (!(0,_Utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__.isSsr)()) {\n  window.tsParticles = tsParticles;\n}\n\n\n\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/index.js?");

/***/ }),

/***/ "../../engine/dist/browser/init.js":
/*!*****************************************!*\
  !*** ../../engine/dist/browser/init.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   init: () => (/* binding */ init)\n/* harmony export */ });\n/* harmony import */ var _Core_Engine_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Core/Engine.js */ \"../../engine/dist/browser/Core/Engine.js\");\n/* harmony import */ var _Utils_HslColorManager_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Utils/HslColorManager.js */ \"../../engine/dist/browser/Utils/HslColorManager.js\");\n/* harmony import */ var _Utils_RgbColorManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Utils/RgbColorManager.js */ \"../../engine/dist/browser/Utils/RgbColorManager.js\");\n/* harmony import */ var _Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Utils/ColorUtils.js */ \"../../engine/dist/browser/Utils/ColorUtils.js\");\n\n\n\n\nfunction init() {\n  const rgbColorManager = new _Utils_RgbColorManager_js__WEBPACK_IMPORTED_MODULE_2__.RgbColorManager(),\n    hslColorManager = new _Utils_HslColorManager_js__WEBPACK_IMPORTED_MODULE_1__.HslColorManager();\n  (0,_Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_3__.addColorManager)(rgbColorManager);\n  (0,_Utils_ColorUtils_js__WEBPACK_IMPORTED_MODULE_3__.addColorManager)(hslColorManager);\n  const engine = new _Core_Engine_js__WEBPACK_IMPORTED_MODULE_0__.Engine();\n  engine.init();\n  return engine;\n}\n\n//# sourceURL=webpack://tsparticles/../../engine/dist/browser/init.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "tsparticles:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"tsparticles.bundle": 0
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.f.j = (chunkId, promises) => {
/******/ 				// JSONP chunk loading for javascript
/******/ 				var installedChunkData = __webpack_require__.o(installedChunks, chunkId) ? installedChunks[chunkId] : undefined;
/******/ 				if(installedChunkData !== 0) { // 0 means "already installed".
/******/ 		
/******/ 					// a Promise means "currently loading".
/******/ 					if(installedChunkData) {
/******/ 						promises.push(installedChunkData[2]);
/******/ 					} else {
/******/ 						if(true) { // all chunks have JS
/******/ 							// setup Promise in chunk cache
/******/ 							var promise = new Promise((resolve, reject) => (installedChunkData = installedChunks[chunkId] = [resolve, reject]));
/******/ 							promises.push(installedChunkData[2] = promise);
/******/ 		
/******/ 							// start chunk loading
/******/ 							var url = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 							// create error before stack unwound to get useful stacktrace later
/******/ 							var error = new Error();
/******/ 							var loadingEnded = (event) => {
/******/ 								if(__webpack_require__.o(installedChunks, chunkId)) {
/******/ 									installedChunkData = installedChunks[chunkId];
/******/ 									if(installedChunkData !== 0) installedChunks[chunkId] = undefined;
/******/ 									if(installedChunkData) {
/******/ 										var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 										var realSrc = event && event.target && event.target.src;
/******/ 										error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 										error.name = 'ChunkLoadError';
/******/ 										error.type = errorType;
/******/ 										error.request = realSrc;
/******/ 										installedChunkData[1](error);
/******/ 									}
/******/ 								}
/******/ 							};
/******/ 							__webpack_require__.l(url, loadingEnded, "chunk-" + chunkId, chunkId);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var chunkIds = data[0];
/******/ 			var moreModules = data[1];
/******/ 			var runtime = data[2];
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 		
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = this["webpackChunktsparticles"] = this["webpackChunktsparticles"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./dist/browser/bundle.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});