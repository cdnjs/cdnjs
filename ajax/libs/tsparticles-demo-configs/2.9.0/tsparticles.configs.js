/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.9.0
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("tsparticles-engine"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-engine"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-engine")) : factory(root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE__961__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 961:
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__961__;

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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "absorbers": function() { return /* binding */ absorbers; },
  "amongUs": function() { return /* binding */ amongUs; },
  "backgroundMask": function() { return /* binding */ backgroundMask; },
  "basic": function() { return /* binding */ basic; },
  "big": function() { return /* binding */ big; },
  "blackHole": function() { return /* binding */ blackHole; },
  "bubble": function() { return /* binding */ bubble; },
  "cards": function() { return /* binding */ cards; },
  "chars": function() { return /* binding */ chars; },
  "clickPause": function() { return /* binding */ clickPause; },
  "collisionsAbsorb": function() { return /* binding */ collisionsAbsorb; },
  "collisionsBounce": function() { return /* binding */ collisionsBounce; },
  "collisionsDestroy": function() { return /* binding */ collisionsDestroy; },
  "colorAnimation": function() { return /* binding */ colorAnimation; },
  "connect": function() { return /* binding */ connect; },
  "customPreset": function() { return /* binding */ customPreset; },
  "customShape": function() { return /* binding */ customShape; },
  "dataImages": function() { return /* binding */ dataImages; },
  "delay": function() { return /* binding */ delay; },
  "destroy": function() { return /* binding */ destroy; },
  "disappearing": function() { return /* binding */ disappearing; },
  "divEvents": function() { return /* binding */ divEvents; },
  "emitter": function() { return /* binding */ emitter; },
  "emitterAbsorber": function() { return /* binding */ emitterAbsorber; },
  "emitterAngled": function() { return /* binding */ emitterAngled; },
  "emitterImages": function() { return /* binding */ emitterImages; },
  "emitterPaths": function() { return /* binding */ emitterPaths; },
  "emitterShapes": function() { return /* binding */ emitterShapes; },
  "fireworks": function() { return /* binding */ fireworks; },
  "fontawesome": function() { return /* binding */ fontawesome; },
  "forward": function() { return /* binding */ forward; },
  "grabRandomColor": function() { return /* binding */ grabRandomColor; },
  "gradients": function() { return /* binding */ gradients; },
  "gravity": function() { return /* binding */ gravity; },
  "growing": function() { return /* binding */ growing; },
  "hexagonPath": function() { return /* binding */ hexagonPath; },
  "hollowknight": function() { return /* binding */ hollowknight; },
  "hyperspace": function() { return /* binding */ hyperspace; },
  "imageMask": function() { return /* binding */ imageMask; },
  "images": function() { return /* binding */ browser_images; },
  "imagesDirections": function() { return /* binding */ imagesDirections; },
  "infection": function() { return /* binding */ infection; },
  "life": function() { return /* binding */ life; },
  "lightHover": function() { return /* binding */ lightHover; },
  "linkTriangles": function() { return /* binding */ linkTriangles; },
  "localPolygonMask": function() { return /* binding */ localPolygonMask; },
  "manual": function() { return /* binding */ manual; },
  "motionDisable": function() { return /* binding */ motionDisable; },
  "motionReduce": function() { return /* binding */ motionReduce; },
  "mouseAttract": function() { return /* binding */ mouseAttract; },
  "mouseBounce": function() { return /* binding */ mouseBounce; },
  "mouseFollow": function() { return /* binding */ mouseFollow; },
  "mouseTrail": function() { return /* binding */ mouseTrail; },
  "moveAngle": function() { return /* binding */ moveAngle; },
  "moveDistance": function() { return /* binding */ moveDistance; },
  "moveInside": function() { return /* binding */ moveInside; },
  "moveOutside": function() { return /* binding */ moveOutside; },
  "multipleClickEmitters": function() { return /* binding */ multipleClickEmitters; },
  "multiplePolygonMasks": function() { return /* binding */ multiplePolygonMasks; },
  "nasa": function() { return /* binding */ nasa; },
  "noconfig": function() { return /* binding */ noconfig; },
  "noisePlanes": function() { return /* binding */ noisePlanes; },
  "nyancat": function() { return /* binding */ nyancat; },
  "nyancat2": function() { return /* binding */ nyancat2; },
  "orbit": function() { return /* binding */ orbit; },
  "parallax": function() { return /* binding */ parallax; },
  "pathPolygonMask": function() { return /* binding */ pathPolygonMask; },
  "planes": function() { return /* binding */ planes; },
  "plasma": function() { return /* binding */ plasma; },
  "polygonMask": function() { return /* binding */ polygonMask; },
  "polygons": function() { return /* binding */ polygons; },
  "random": function() { return /* binding */ random; },
  "reactBubbles": function() { return /* binding */ reactBubbles; },
  "reactDefaults": function() { return /* binding */ reactDefaults; },
  "reactMultipleImages": function() { return /* binding */ reactMultipleImages; },
  "reactNightSky": function() { return /* binding */ reactNightSky; },
  "reactPolygonMask": function() { return /* binding */ reactPolygonMask; },
  "reactSimple": function() { return /* binding */ reactSimple; },
  "reactSnow": function() { return /* binding */ reactSnow; },
  "reduceDuplicates": function() { return /* binding */ reduceDuplicates; },
  "repulse": function() { return /* binding */ repulse; },
  "repulseBack": function() { return /* binding */ repulseBack; },
  "repulseCirc": function() { return /* binding */ repulseCirc; },
  "repulseCubic": function() { return /* binding */ repulseCubic; },
  "repulseExpo": function() { return /* binding */ repulseExpo; },
  "repulseQuart": function() { return /* binding */ repulseQuart; },
  "repulseQuint": function() { return /* binding */ repulseQuint; },
  "repulseSine": function() { return /* binding */ repulseSine; },
  "responsive": function() { return /* binding */ responsive; },
  "ring": function() { return /* binding */ ring; },
  "seaAnemone": function() { return /* binding */ seaAnemone; },
  "shadow": function() { return /* binding */ shadow; },
  "shapeBubble": function() { return /* binding */ shapeBubble; },
  "shapeHeart": function() { return /* binding */ shapeHeart; },
  "shapeMultilineText": function() { return /* binding */ shapeMultilineText; },
  "shapeOptions": function() { return /* binding */ shapeOptions; },
  "shapePath": function() { return /* binding */ shapePath; },
  "shapeRoundedRect": function() { return /* binding */ shapeRoundedRect; },
  "shapeSpiral": function() { return /* binding */ shapeSpiral; },
  "slow": function() { return /* binding */ slow; },
  "snow": function() { return /* binding */ snow; },
  "soundsAudio": function() { return /* binding */ soundsAudio; },
  "soundsLoop": function() { return /* binding */ soundsLoop; },
  "soundsMelodies": function() { return /* binding */ soundsMelodies; },
  "soundsMelodyLoop": function() { return /* binding */ soundsMelodyLoop; },
  "soundsNotes": function() { return /* binding */ soundsNotes; },
  "speedDecay": function() { return /* binding */ speedDecay; },
  "spin": function() { return /* binding */ spin; },
  "star": function() { return /* binding */ star; },
  "strokeAnimation": function() { return /* binding */ strokeAnimation; },
  "style": function() { return /* binding */ style; },
  "svgReplace": function() { return /* binding */ svgReplace; },
  "test": function() { return /* binding */ test; },
  "textMask": function() { return /* binding */ textMask; },
  "textMaskMultiline": function() { return /* binding */ textMaskMultiline; },
  "trail": function() { return /* binding */ trail; },
  "trailImage": function() { return /* binding */ trailImage; },
  "twinkle": function() { return /* binding */ twinkle; },
  "vibrate": function() { return /* binding */ vibrate; },
  "virus": function() { return /* binding */ virus; },
  "warp": function() { return /* binding */ warp; },
  "wobble": function() { return /* binding */ wobble; },
  "zIndex": function() { return /* binding */ zIndex; }
});

;// CONCATENATED MODULE: ./dist/browser/absorbers.json
var absorbers_namespaceObject = JSON.parse('{"name":"Absorbers","particles":{"number":{"value":300},"collisions":{"enable":true},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":{"min":0.1,"max":1}},"size":{"value":{"min":1,"max":2}},"move":{"enable":true,"speed":0.5,"direction":"top","random":false,"straight":true,"warp":true}},"interactivity":{"events":{"onClick":{"enable":true,"mode":"push"}},"modes":{"push":{"quantity":10}}},"absorbers":{"draggable":true,"size":{"value":{"min":5,"max":10},"limit":10},"position":{"x":50,"y":50}},"background":{"color":"#0d47a1"}}');
;// CONCATENATED MODULE: ./dist/browser/amongUs.json
var amongUs_namespaceObject = JSON.parse('{"name":"Among Us","particles":{"groups":{"z5000":{"number":{"value":70},"zIndex":{"value":50}},"z7500":{"number":{"value":30},"zIndex":{"value":75}},"z2500":{"number":{"value":50},"zIndex":{"value":25}},"z1000":{"number":{"value":40},"zIndex":{"value":10}}},"number":{"value":200},"color":{"value":"#fff","animation":{"enable":false,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":3},"move":{"angle":{"value":10,"offset":0},"enable":true,"speed":5,"direction":"right","random":false,"straight":false},"zIndex":{"value":5,"opacityRate":0.5}},"background":{"color":"#000000"},"emitters":{"position":{"y":55,"x":-5},"rate":{"delay":7,"quantity":1},"size":{"width":0,"height":0},"particles":{"shape":{"type":"images","options":{"images":{"src":"https://particles.js.org/images/cyan_amongus.png","width":500,"height":634}}},"size":{"value":40},"move":{"speed":10,"outModes":{"default":"none","right":"destroy"},"straight":true},"zIndex":{"value":0},"rotate":{"value":{"min":0,"max":360},"animation":{"enable":true,"speed":10,"sync":true}}}}}');
;// CONCATENATED MODULE: ./dist/browser/backgroundMask.json
var backgroundMask_namespaceObject = JSON.parse('{"name":"Background Mask","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":{"min":1,"max":30}},"links":{"enable":true,"distance":150,"color":"#ffffff","opacity":1,"width":1},"move":{"enable":true,"speed":2,"direction":"none","random":false,"straight":false}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"bubble"},"onClick":{"enable":true,"mode":"push"}},"modes":{"bubble":{"distance":400,"size":100,"duration":2,"opacity":1},"push":{"quantity":4}}},"backgroundMask":{"enable":true,"cover":{"value":{"r":255,"g":255,"b":255}}},"background":{"color":"#ffffff","image":"url(\'https://particles.js.org/images/background3.jpg\')","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/basic.json
var basic_namespaceObject = JSON.parse('{"name":"Basic","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"links":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"repulse":{"distance":200},"push":{"quantity":4}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/big.json
var big_namespaceObject = JSON.parse('{"name":"Big Particles","particles":{"number":{"value":30},"color":{"value":["#5bc0eb","#fde74c","#9bc53d","#e55934","#fa7921"]},"shape":{"type":"circle"},"opacity":{"value":{"min":0.4,"max":0.8}},"size":{"value":{"min":300,"max":400},"animation":{"enable":true,"speed":100,"sync":false}},"move":{"enable":true,"speed":10,"direction":"top","random":false,"straight":false}},"background":{"color":"#ffffff"}}');
;// CONCATENATED MODULE: ./dist/browser/blackHole.json
var blackHole_namespaceObject = JSON.parse('{"name":"Black Hole","particles":{"number":{"value":1000,"density":{"enable":true}},"color":{"value":["#ffffff","#77ccff","#ff3333","#ffff33"]},"shape":{"type":"circle"},"opacity":{"value":1,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":10,"random":true,"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"links":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":0.5,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200},"warp":true}},"interactivity":{"events":{"onClick":{"enable":true,"mode":"push"}},"modes":{"push":{"quantity":4}}},"absorbers":{"orbits":true,"destroy":false,"size":{"value":5,"limit":50,"random":false,"density":1500},"position":{"x":50,"y":50}},"background":{"color":"#000","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/bubble.json
var bubble_namespaceObject = JSON.parse('{"name":"Bubble","particles":{"number":{"value":6,"density":{"enable":true}},"color":{"value":"#1b1e34"},"shape":{"type":"polygon","polygon":{"nb_sides":6}},"opacity":{"value":0.5,"random":{"enable":true,"minimumValue":0.3},"animation":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":160,"random":{"enable":true,"minimumValue":100},"animation":{"enable":false,"speed":5,"size_min":40,"sync":false}},"links":{"enable":false,"distance":200,"color":"#ffffff","opacity":1,"width":2},"move":{"enable":true,"speed":8,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"bubble"},"onClick":{"enable":false,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"duration":2,"size":40,"opacity":0.8,"color":"#ff0000","mix":true},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#efefef"}}');
;// CONCATENATED MODULE: ./dist/browser/cards.json
var cards_namespaceObject = JSON.parse('{"name":"Cards","particles":{"number":{"value":80,"density":{"enable":true}},"reduceDuplicates":true,"shape":{"type":["spades","hearts","diamonds","clubs"],"options":{"spades":{"particles":{"color":{"value":"#000000"}}},"hearts":{"particles":{"color":{"value":"#ff0000"}}},"diamonds":{"particles":{"color":{"value":"#ff0000"}}},"clubs":{"particles":{"color":{"value":"#000000"}}}}},"opacity":{"value":1},"size":{"value":30},"move":{"enable":true,"speed":2,"direction":"none","random":false,"straight":false}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"repulse":{"distance":200},"push":{"quantity":4}}},"background":{"color":"#fff"}}');
;// CONCATENATED MODULE: ./dist/browser/chars.json
var chars_namespaceObject = JSON.parse('{"name":"Chars","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000"},"stroke":{"width":1,"color":"#ffffff"},"shape":{"type":"char","character":[{"value":["t","s","P","a","r","t","i","c","l","e","s"],"font":"Verdana","style":"","weight":"400","fill":true},{"value":["t","s","P","a","r","t","i","c","l","e","s"],"font":"Verdana","style":"","weight":"400","fill":false}]},"opacity":{"value":0.5,"random":false,"animation":{"enable":true,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":16,"random":false,"animation":{"enable":false,"speed":10,"size_min":10,"sync":false}},"links":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":2,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse","parallax":{"enable":false,"force":60,"smooth":10}},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#0d47a1"}}');
;// CONCATENATED MODULE: ./dist/browser/clickPause.json
var clickPause_namespaceObject = JSON.parse('{"name":"Click Pause","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"links":{"enable":true,"distance":100,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"pause"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#0d47a1"}}');
;// CONCATENATED MODULE: ./dist/browser/collisionsAbsorb.json
var collisionsAbsorb_namespaceObject = JSON.parse('{"name":"Collisions Absorb","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":1,"minimumValue":0.1,"sync":false}},"size":{"value":15,"random":{"enable":true,"minimumValue":10},"animation":{"enable":false,"speed":40,"minimumValue":0.1,"sync":false}},"links":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"collisions":{"enable":true,"mode":"absorb","absorb":{"speed":5}},"move":{"enable":true,"speed":2,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":false,"mode":"repulse","parallax":{"enable":false,"force":60,"smooth":10}},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#0d47a1"}}');
;// CONCATENATED MODULE: ./dist/browser/collisionsBounce.json
var collisionsBounce_namespaceObject = JSON.parse('{"name":"Collisions Bounce","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":1,"minimumValue":0.1,"sync":false}},"size":{"value":15,"random":{"enable":true,"minimumValue":10},"animation":{"enable":false,"speed":40,"minimumValue":0.1,"sync":false}},"links":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"bounce":true,"enable":true,"speed":10,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":false,"mode":"repulse","parallax":{"enable":false,"force":60,"smooth":10}},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#0d47a1"}}');
;// CONCATENATED MODULE: ./dist/browser/collisionsDestroy.json
var collisionsDestroy_namespaceObject = JSON.parse('{"name":"Collisions Destroy","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":["#3998D0","#2EB6AF","#A9BD33","#FEC73B","#F89930","#F45623","#D62E32","#EB586E","#9952CF"]},"destroy":{"mode":"split","split":{"count":1,"factor":{"value":{"min":4,"max":9}},"particles":{"collisions":{"enable":false},"destroy":{"mode":"none"},"life":{"count":1,"duration":{"value":1}}}}},"shape":{"type":"circle"},"opacity":{"value":1,"random":false,"animation":{"enable":false,"speed":1,"minimumValue":0.1,"sync":false}},"size":{"value":15,"random":{"enable":true,"minimumValue":10},"animation":{"enable":false,"speed":40,"minimumValue":0.1,"sync":false}},"links":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"collisions":{"enable":true,"mode":"destroy"},"move":{"enable":true,"speed":3,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":false,"mode":"repulse","parallax":{"enable":false,"force":60,"smooth":10}},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":1},"remove":{"quantity":2}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/colorAnimation.json
var colorAnimation_namespaceObject = JSON.parse('{"name":"Color Animation","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"count":1,"enable":true,"speed":60,"sync":true}},"stroke":{"width":30,"color":{"value":"#0000ff","animation":{"count":1,"enable":true,"speed":60,"sync":true}}},"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":15},"move":{"enable":true,"speed":6}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/connect.json
var connect_namespaceObject = JSON.parse('{"name":"Connect","interactivity":{"events":{"onClick":{"enable":true,"mode":"push"},"onDiv":{"elementId":"repulse-div","enable":false,"mode":"repulse"},"onHover":{"enable":true,"mode":"connect","parallax":{"enable":false,"force":60,"smooth":10}}},"modes":{"bubble":{"distance":400,"duration":2,"opacity":0.8,"size":40},"connect":{"distance":80,"links":{"opacity":0.5},"radius":60},"grab":{"distance":400,"links":{"opacity":1}},"push":{"quantity":4},"remove":{"quantity":2},"repulse":{"distance":200,"duration":0.4}}},"particles":{"color":{"value":"random"},"links":{"blink":false,"color":"#ffffff","consent":false,"distance":150,"enable":false,"opacity":0.4,"width":1},"move":{"attract":{"enable":false,"rotate":{"x":600,"y":1200}},"bounce":false,"direction":"none","enable":true,"random":false,"speed":6,"straight":false},"number":{"density":{"enable":true},"limit":500,"value":300},"opacity":{"animation":{"enable":false,"minimumValue":0.1,"speed":1,"sync":false},"random":false,"value":0.5},"shape":{"type":"circle"},"stroke":{"color":"#fff","width":1},"size":{"animation":{"enable":false,"minimumValue":0.1,"speed":40,"sync":false},"random":true,"value":10}},"polygon":{"draw":{"enable":false,"lineColor":"#ffffff","lineWidth":0.5},"move":{"radius":10},"scale":1,"type":"none","url":""},"background":{"color":"#000000","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/customPreset.json
var customPreset_namespaceObject = JSON.parse('{"name":"Custom Preset","preset":"fire"}');
;// CONCATENATED MODULE: ./dist/browser/customShape.json
var customShape_namespaceObject = JSON.parse('{"name":"Custom Shape","particles":{"links":{"enable":false},"stroke":{"color":{"value":"random"},"width":1},"shape":{"type":"spiral","custom":{"spiral":{"innerRadius":1,"lineSpacing":1,"fill":false,"close":false}}},"size":{"value":20},"rotate":{"value":0,"random":true,"direction":"clockwise","animation":{"enable":true,"speed":50,"sync":false}}},"preset":"links","background":{"color":"#000000","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/dataImages.json
var dataImages_namespaceObject = JSON.parse('{"name":"Data URI Images","interactivity":{"events":{"onClick":{"enable":true,"mode":"push"},"onDiv":{"elementId":"repulse-div","enable":false,"mode":"repulse"},"onHover":{"enable":true,"mode":"bubble","parallax":{"enable":false,"force":60,"smooth":10}}},"modes":{"bubble":{"distance":400,"duration":2,"opacity":0.8,"size":40},"connect":{"distance":80,"links":{"opacity":0.5},"radius":60},"grab":{"distance":400,"links":{"opacity":1}},"push":{"quantity":4},"remove":{"quantity":2},"repulse":{"distance":200,"duration":0.4}}},"particles":{"color":{"value":"#ffffff"},"links":{"blink":false,"color":"#000","consent":false,"distance":150,"enable":false,"opacity":0.4,"width":1},"move":{"attract":{"enable":false,"rotate":{"x":600,"y":1200}},"bounce":false,"direction":"none","enable":true,"random":false,"speed":2,"straight":false},"number":{"density":{"enable":true},"limit":0,"value":80},"opacity":{"animation":{"enable":false,"minimumValue":0.1,"speed":1,"sync":false},"random":false,"value":0.5},"rotate":{"animation":{"enable":true,"speed":5,"sync":false},"direction":"random","random":true,"value":0},"shape":{"character":{"fill":false,"font":"Verdana","style":"","value":"*","weight":"400"},"image":[{"src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAACTElEQVRYhe2WzUtUYRTGf+eORZq1aGlESjEzjn2QY5KVYRiEJVngtk2LWljLahdGEeW2rf9AkS6EKKQSFxLoWOEHt1tYluHCFiONTJMz854WGQjpnXdmIArmgbs595zneTjn3ve8UEIJ/zuCd4/vD/a0Nhda7xQl3tPaLOIMi6GpUA6xSep+2rLbmEAHmL0gWwWJK7x4OOFEVMwG7/rza4UaKLOzufEbmu5CpAZAUYALR2qyoyOzzpNCxcFyBN0nBxeMBk4Di6vj2ytpdESsuliUAYDb7c9cRduBL79j8RTvjar+FQMAt04NjTjZzSFUO1Xk/NCMDBQjDrbfwApi0aqK8jsfNtW9nO4DCN07sWd1/6eb6rZ9X46nGsbnk7acVvNz68NRHL0P2ggEAE9EbnR07qgXSPU/+uyKchMIAVmQUYxcqX31drxoA140eNQIQ6zRrb7wlscBJXPWS3SsUZoRpCUc80b8+HOOwAi96+Wd8xKH/bgV7QVq/fh9O+AeCleTMR9zmfSDZgPVkdfup/Xe+/8F2czOYsQBKPPn8DWQTpVPAOki5Jd/pNMTBRvYNzkZBwYLlhcGD7yZXfRLyXkQKTwoXF9y1uY0kNSlPoG5/MWZWzKJ/qINNIzPJw3kvW6NcNXmRLTeZG5DcBg4Zpctw7Uxr8Um03oZKYEuIPFH+NezGgnFuWzLa20gEnOnBGkDvq6EjCoXES4BBgBhQZC2SMydsuXN+zIRi1ZVVEjlmYAwExp7NwbgHQwezCq7kro0kM8mLKGEfwI/AbDUxKelB9HiAAAAAElFTkSuQmCC","width":32,"height":32},{"src":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJMYXllcl8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEwMCAxMDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIGhlaWdodD0iMTAwcHgiIHdpZHRoPSIxMDBweCI+CjxnPgoJPHBhdGggZD0iTTI4LjEsMzYuNmM0LjYsMS45LDEyLjIsMS42LDIwLjksMS4xYzguOS0wLjQsMTktMC45LDI4LjksMC45YzYuMywxLjIsMTEuOSwzLjEsMTYuOCw2Yy0xLjUtMTIuMi03LjktMjMuNy0xOC42LTMxLjMgICBjLTQuOS0wLjItOS45LDAuMy0xNC44LDEuNEM0Ny44LDE3LjksMzYuMiwyNS42LDI4LjEsMzYuNnoiLz4KCTxwYXRoIGQ9Ik03MC4zLDkuOEM1Ny41LDMuNCw0Mi44LDMuNiwzMC41LDkuNWMtMyw2LTguNCwxOS42LTUuMywyNC45YzguNi0xMS43LDIwLjktMTkuOCwzNS4yLTIzLjFDNjMuNywxMC41LDY3LDEwLDcwLjMsOS44eiIvPgoJPHBhdGggZD0iTTE2LjUsNTEuM2MwLjYtMS43LDEuMi0zLjQsMi01LjFjLTMuOC0zLjQtNy41LTctMTEtMTAuOGMtMi4xLDYuMS0yLjgsMTIuNS0yLjMsMTguN0M5LjYsNTEuMSwxMy40LDUwLjIsMTYuNSw1MS4zeiIvPgoJPHBhdGggZD0iTTksMzEuNmMzLjUsMy45LDcuMiw3LjYsMTEuMSwxMS4xYzAuOC0xLjYsMS43LTMuMSwyLjYtNC42YzAuMS0wLjIsMC4zLTAuNCwwLjQtMC42Yy0yLjktMy4zLTMuMS05LjItMC42LTE3LjYgICBjMC44LTIuNywxLjgtNS4zLDIuNy03LjRjLTUuMiwzLjQtOS44LDgtMTMuMywxMy43QzEwLjgsMjcuOSw5LjgsMjkuNyw5LDMxLjZ6Ii8+Cgk8cGF0aCBkPSJNMTUuNCw1NC43Yy0yLjYtMS02LjEsMC43LTkuNywzLjRjMS4yLDYuNiwzLjksMTMsOCwxOC41QzEzLDY5LjMsMTMuNSw2MS44LDE1LjQsNTQuN3oiLz4KCTxwYXRoIGQ9Ik0zOS44LDU3LjZDNTQuMyw2Ni43LDcwLDczLDg2LjUsNzYuNGMwLjYtMC44LDEuMS0xLjYsMS43LTIuNWM0LjgtNy43LDctMTYuMyw2LjgtMjQuOGMtMTMuOC05LjMtMzEuMy04LjQtNDUuOC03LjcgICBjLTkuNSwwLjUtMTcuOCwwLjktMjMuMi0xLjdjLTAuMSwwLjEtMC4yLDAuMy0wLjMsMC40Yy0xLDEuNy0yLDMuNC0yLjksNS4xQzI4LjIsNDkuNywzMy44LDUzLjksMzkuOCw1Ny42eiIvPgoJPHBhdGggZD0iTTI2LjIsODguMmMzLjMsMiw2LjcsMy42LDEwLjIsNC43Yy0zLjUtNi4yLTYuMy0xMi42LTguOC0xOC41Yy0zLjEtNy4yLTUuOC0xMy41LTktMTcuMmMtMS45LDgtMiwxNi40LTAuMywyNC43ICAgQzIwLjYsODQuMiwyMy4yLDg2LjMsMjYuMiw4OC4yeiIvPgoJPHBhdGggZD0iTTMwLjksNzNjMi45LDYuOCw2LjEsMTQuNCwxMC41LDIxLjJjMTUuNiwzLDMyLTIuMyw0Mi42LTE0LjZDNjcuNyw3Niw1Mi4yLDY5LjYsMzcuOSw2MC43QzMyLDU3LDI2LjUsNTMsMjEuMyw0OC42ICAgYy0wLjYsMS41LTEuMiwzLTEuNyw0LjZDMjQuMSw1Ny4xLDI3LjMsNjQuNSwzMC45LDczeiIvPgo8L2c+Cjwvc3ZnPg==","width":32,"height":32}],"polygon":{"sides":5},"stroke":{"color":"#000000","width":0},"type":"image"},"size":{"animation":{"enable":false,"minimumValue":0.1,"speed":40,"sync":false},"random":false,"value":16}},"polygon":{"draw":{"enable":false,"lineColor":"#ffffff","lineWidth":0.5},"move":{"radius":10},"scale":1,"type":"none","url":""},"background":{"color":"#fff","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/delay.json
var delay_namespaceObject = JSON.parse('{"name":"Delay","delay":5,"particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"links":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"repulse":{"distance":200},"push":{"quantity":4}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/destroy.json
var destroy_namespaceObject = JSON.parse('{"name":"Destroy","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":5,"random":true,"animation":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":2,"direction":"none","random":false,"straight":false,"outModes":"destroy","attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse","parallax":{"enable":false,"force":60,"smooth":10}},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#0d47a1"}}');
;// CONCATENATED MODULE: ./dist/browser/disappearing.json
var disappearing_namespaceObject = JSON.parse('{"name":"Disappearing","background":{"color":{"value":"#000"}},"emitters":{"direction":"random","size":{"width":100,"height":100},"position":{"x":50,"y":50},"rate":{"delay":0.1,"quantity":10}},"particles":{"number":{"value":0},"color":{"value":"random"},"shape":{"type":"circle"},"opacity":{"value":0.8,"random":{"enable":true,"minimumValue":0.3}},"size":{"value":50,"animation":{"enable":true,"speed":30,"size_min":2,"sync":true,"startValue":"max","destroy":"min"}},"move":{"enable":true,"speed":5,"direction":"none","random":false,"straight":false,"outModes":"destroy","attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"repulse":{"distance":100},"push":{"quantity":4}}}}');
;// CONCATENATED MODULE: ./dist/browser/divEvents.json
var divEvents_namespaceObject = JSON.parse('{"name":"Div Events","background":{"color":"#0d47a1"},"interactivity":{"events":{"onDiv":[{"enable":true,"selectors":".bubble.circle","mode":"bubble","type":"circle"},{"enable":true,"selectors":".repulse.circle","mode":"repulse","type":"circle"},{"enable":true,"selectors":".bubble.rectangle","mode":"bubble","type":"rectangle"},{"enable":true,"selectors":".repulse.rectangle","mode":"repulse","type":"rectangle"},{"enable":true,"selectors":".bounce.circle","mode":"bounce","type":"circle"},{"enable":true,"selectors":".bounce.rectangle","mode":"bounce","type":"rectangle"}]},"modes":{"bubble":{"distance":400,"duration":2,"opacity":0.8,"size":6,"color":"#000000"},"grab":{"distance":400,"links":{"opacity":1}},"push":{"quantity":4},"remove":{"quantity":2},"repulse":{"distance":200,"duration":0.4}}},"particles":{"color":{"value":"#ffffff"},"links":{"color":"#ffffff","distance":150,"enable":true,"opacity":0.4,"width":1},"move":{"attract":{"enable":false,"rotateX":600,"rotateY":1200},"bounce":false,"direction":"none","enable":true,"random":false,"speed":2,"straight":false},"number":{"density":{"enable":true},"value":80},"opacity":{"animation":{"enable":false,"opacity_min":0.1,"speed":1,"sync":false},"random":false,"value":0.5},"shape":{"type":"circle"},"size":{"animation":{"enable":false,"size_min":0.1,"speed":40,"sync":false},"random":true,"value":5}},"polygon":{"draw":{"enable":false,"lineColor":"#ffffff","lineWidth":0.5},"move":{"radius":10},"scale":1,"type":"none","url":""},"detectRetina":true}');
;// CONCATENATED MODULE: ./dist/browser/emitter.json
var emitter_namespaceObject = JSON.parse('{"name":"Emitter","particles":{"number":{"value":100,"density":{"enable":false}},"color":{"value":"#000"},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":5,"random":true,"animation":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":150,"color":"#000","opacity":0.4,"width":1},"move":{"enable":true,"speed":2,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":false,"mode":"repulse","parallax":{"enable":false,"force":60,"smooth":10}},"onClick":{"enable":true,"mode":"emitter"}},"modes":{"emitters":{"life":{"count":10,"delay":0.5,"duration":3},"particles":{"shape":{"type":"star","polygon":{"sides":7}},"rotate":{"value":0,"random":true,"direction":"clockwise","animation":{"enable":true,"speed":15,"sync":false}},"color":{"value":"#f0f"},"links":{"enable":false},"opacity":{"value":1},"size":{"value":15,"random":false},"move":{"speed":20,"random":false,"outModes":"destroy"}}},"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#fff"},"emitters":[{"life":{"count":10,"delay":0.5,"duration":3},"particles":{"shape":{"type":"polygon","polygon":{"sides":6}},"rotate":{"value":0,"random":true,"direction":"clockwise","animation":{"enable":true,"speed":15,"sync":false}},"color":{"value":"#0f0"},"links":{"enable":false},"opacity":{"value":1},"size":{"value":15,"random":false},"move":{"speed":20,"random":false,"outModes":"destroy"}}},{"direction":"top-right","position":{"x":0,"y":100},"particles":{"shape":{"type":"star"},"color":{"value":"#f00"},"links":{"enable":true,"id":"emitter1","color":{"value":"#ff7700"}},"opacity":{"value":0.3},"rotate":{"value":0,"random":true,"direction":"counter-clockwise","animation":{"enable":true,"speed":15,"sync":false}},"size":{"value":10,"random":{"enable":true}},"move":{"speed":10,"random":false,"outModes":"destroy"}}},{"direction":"top-left","position":{"x":100,"y":100},"particles":{"shape":{"type":"square"},"rotate":{"value":0,"random":true,"direction":"clockwise","animation":{"enable":true,"speed":15,"sync":false}},"color":{"value":"#00f"},"links":{"enable":false},"opacity":{"value":0.8},"size":{"value":15,"random":false},"move":{"speed":20,"random":false,"outModes":"destroy"}}}]}');
;// CONCATENATED MODULE: ./dist/browser/emitterAbsorber.json
var emitterAbsorber_namespaceObject = JSON.parse('{"name":"Emitter and Absorber","particles":{"number":{"value":0},"color":{"value":"#000"},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":5,"random":true,"animation":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":150,"color":"#000","opacity":0.4,"width":1},"move":{"enable":true,"speed":2,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":false,"mode":"repulse","parallax":{"enable":false,"force":60,"smooth":10}},"onClick":{"enable":false,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#fff","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"},"absorbers":{"position":{"x":50,"y":50},"size":{"density":20,"value":50,"limit":100,"random":{"enable":true,"minimumValue":30}}},"emitters":[{"direction":"top-right","position":{"x":0,"y":100},"particles":{"shape":{"type":"circle"},"color":{"value":"random"},"links":{"enable":false},"opacity":{"value":0.3},"rotate":{"value":0,"random":true,"direction":"counter-clockwise","animation":{"enable":true,"speed":15,"sync":false}},"size":{"value":10,"random":{"enable":true,"minimumValue":5}},"move":{"speed":5,"random":false,"outModes":"bounce"}}}]}');
;// CONCATENATED MODULE: ./dist/browser/emitterAngled.json
var emitterAngled_namespaceObject = JSON.parse('{"name":"Emitter Angled","particles":{"number":{"value":0},"color":{"value":"random"},"shape":{"type":"circle"},"opacity":{"value":0.3},"size":{"value":10,"random":{"enable":true,"minimumValue":5}},"move":{"angle":{"offset":0,"value":30},"enable":true,"speed":15,"direction":"top","random":false,"straight":false,"outModes":{"default":"destroy"}}},"background":{"color":"#fff"},"emitters":[{"direction":"top","position":{"x":{"min":25,"max":75},"y":100},"life":{"duration":3,"delay":5,"count":0}}]}');
;// CONCATENATED MODULE: ./dist/browser/emitterImages.json
var emitterImages_namespaceObject = JSON.parse('{"name":"Emitter Images","particles":{"move":{"direction":"none","enable":true,"outModes":"destroy","random":false,"speed":2,"straight":false},"number":{"density":{"enable":true},"limit":0,"value":80},"opacity":{"animation":{"enable":false,"minimumValue":0.1,"speed":1,"sync":false},"random":false,"value":1},"rotate":{"animation":{"enable":true,"speed":5,"sync":false},"direction":"random","random":true,"value":0},"shape":{"type":"circle"},"size":{"animation":{"enable":false,"minimumValue":0.1,"speed":40,"sync":false},"random":false,"value":16}},"background":{"color":"#fff"},"emitters":{"particles":{"shape":{"type":"image","options":{"image":[{"src":"https://particles.js.org/images/fruits/apple.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/avocado.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/banana.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/berries.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/cherry.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/grapes.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/lemon.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/orange.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/peach.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/pear.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/pepper.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/plum.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/star.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/strawberry.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/watermelon.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/watermelon_slice.png","width":32,"height":32}]}}}}}');
;// CONCATENATED MODULE: ./dist/browser/emitterPaths.json
var emitterPaths_namespaceObject = JSON.parse('{"name":"Emitter Paths","particles":{"number":{"value":0},"color":{"value":"#000000"},"move":{"enable":true,"trail":{"enable":true,"fillColor":"#fff","length":20},"outModes":"destroy"},"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":3}},"background":{"color":"#fff"},"emitters":[{"position":{"x":33,"y":50},"rate":{"value":0.5},"particles":{"life":{"count":1,"duration":{"value":10}},"move":{"path":{"clamp":false,"enable":true,"delay":{"value":0},"generator":"polygonPathGenerator","options":{"sides":6,"turnSteps":30,"angle":30}}}}},{"position":{"x":67,"y":50},"rate":{"value":0.5},"particles":{"move":{"path":{"clamp":false,"enable":true,"delay":{"value":0},"generator":"curvesPathGenerator"}}}}]}');
;// CONCATENATED MODULE: ./dist/browser/emitterShapes.json
var emitterShapes_namespaceObject = JSON.parse('{"name":"Emitter Shapes","particles":{"number":{"value":0},"color":{"value":"#000000"},"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":1}},"background":{"color":"#fff"},"emitters":[{"shape":"square","position":{"x":33,"y":33},"size":{"width":200,"height":200,"mode":"precise"},"life":{"duration":10,"delay":0.5,"count":1}},{"shape":"circle","position":{"x":67,"y":33},"size":{"width":200,"height":200,"mode":"precise"},"life":{"duration":10,"delay":0.5,"count":1}},{"fill":false,"shape":"square","position":{"x":33,"y":67},"size":{"width":200,"height":200,"mode":"precise"},"life":{"duration":10,"delay":0.5,"count":1}},{"fill":false,"shape":"circle","position":{"x":67,"y":67},"size":{"width":200,"height":200,"mode":"precise"},"life":{"duration":10,"delay":0.5,"count":1}}]}');
;// CONCATENATED MODULE: ./dist/browser/fireworks.json
var fireworks_namespaceObject = JSON.parse('{"name":"Fireworks","fullScreen":{"enable":true},"background":{"color":"#000"},"emitters":{"direction":"top","life":{"count":0,"duration":0.1,"delay":0.1},"rate":{"delay":0.15,"quantity":1},"size":{"width":100,"height":0},"position":{"y":100,"x":50}},"particles":{"number":{"value":0},"destroy":{"bounds":{"top":30},"mode":"split","split":{"count":1,"factor":{"value":0.333333},"rate":{"value":100},"particles":{"stroke":{"width":0},"color":{"value":["#ff595e","#ffca3a","#8ac926","#1982c4","#6a4c93"]},"number":{"value":0},"collisions":{"enable":false},"destroy":{"bounds":{"top":0}},"opacity":{"value":{"min":0.1,"max":1},"animation":{"enable":true,"speed":0.7,"sync":false,"startValue":"max","destroy":"min"}},"shape":{"type":"circle"},"size":{"value":2,"animation":{"enable":false}},"life":{"count":1,"duration":{"value":{"min":1,"max":2}}},"move":{"enable":true,"gravity":{"enable":true,"acceleration":9.81,"inverse":false},"decay":0.1,"speed":{"min":10,"max":25},"direction":"outside","random":true,"straight":false,"outModes":"destroy"}}}},"life":{"count":1},"shape":{"type":"line"},"size":{"value":{"min":0.1,"max":50},"animation":{"enable":true,"sync":true,"speed":90,"startValue":"max","destroy":"min"}},"stroke":{"color":{"value":"#ffffff"},"width":1},"rotate":{"path":true},"move":{"enable":true,"gravity":{"acceleration":15,"enable":true,"inverse":true,"maxSpeed":100},"speed":{"min":10,"max":20},"outModes":{"default":"destroy","top":"none"},"trail":{"fillColor":"#000","enable":true,"length":10}}},"sounds":{"enable":true,"events":[{"event":"particleRemoved","filter":"explodeSoundCheck","audio":["https://particles.js.org/audio/explosion0.mp3","https://particles.js.org/audio/explosion1.mp3","https://particles.js.org/audio/explosion2.mp3"]}],"volume":50}}');
;// CONCATENATED MODULE: ./dist/browser/fontawesome.json
var fontawesome_namespaceObject = JSON.parse('{"name":"Font Awesome","interactivity":{"events":{"onClick":{"enable":true,"mode":"push"},"onHover":{"enable":true,"mode":"repulse"}},"modes":{"push":{"quantity":4},"repulse":{"distance":200,"duration":0.4}}},"particles":{"color":{"value":"#ffffff"},"links":{"blink":false,"color":"#ffffff","consent":false,"distance":150,"enable":true,"opacity":0.4,"shadow":{"blur":5,"color":"lime","enable":false},"width":1},"move":{"attract":{"enable":false,"rotate":{"x":600,"y":1200}},"collisions":false,"direction":"none","enable":true,"random":false,"speed":2,"straight":false,"trail":{"enable":false,"length":10,"fillColor":"#000000"}},"number":{"density":{"enable":true},"limit":0,"value":80},"opacity":{"animation":{"enable":true,"minimumValue":0.1,"speed":1,"sync":false},"random":false,"value":0.5},"rotate":{"animation":{"enable":false,"speed":0,"sync":false},"direction":"clockwise","random":false,"value":0},"shape":{"character":[{"fill":true,"font":"Font Awesome 5 Brands","style":"","value":[""],"weight":"400"},{"fill":true,"font":"Font Awesome 5 Free","style":"","value":[""],"weight":"900"}],"type":"char"},"stroke":{"color":"#ffffff","width":1},"size":{"animation":{"enable":false,"minimumValue":10,"speed":10,"sync":false},"random":false,"value":16}},"polygon":{"draw":{"enable":false,"stroke":{"color":"#ffffff","width":0.5}},"enable":false,"inline":{"arrangement":"one-per-point"},"move":{"radius":10,"type":"path"},"scale":1,"type":"none","url":""},"backgroundMask":{"enable":false},"pauseOnBlur":true,"background":{"color":"#0d47a1","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/forward.json
var forward_namespaceObject = JSON.parse('{"name":"Forward","particles":{"number":{"value":80,"density":{"enable":true}},"rotate":{"path":true},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"stroke":{"width":0,"color":"#000000"},"shape":{"type":"image","options":{"image":{"src":"https://particles.js.org/images/arrow.png","width":512,"height":512,"replaceColor":true}}},"opacity":{"value":1,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":32,"random":true,"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#ffffff"}}');
;// CONCATENATED MODULE: ./dist/browser/grabRandomColor.json
var grabRandomColor_namespaceObject = JSON.parse('{"name":"Grab Random Color","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":100,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"grab"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"color":"random","opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/gradients.json
var gradients_namespaceObject = JSON.parse('{"name":"Gradients","particles":{"number":{"value":100},"gradient":[{"type":"radial","colors":[{"stop":0.25,"value":"#5bc0eb"},{"stop":1,"value":"#000000","opacity":0}]},{"type":"radial","colors":[{"stop":0.25,"value":"#fde74c"},{"stop":1,"value":"#000000","opacity":0}]},{"type":"radial","colors":[{"stop":0.25,"value":"#9bc53d"},{"stop":1,"value":"#000000","opacity":0}]},{"type":"radial","colors":[{"stop":0.25,"value":"#e55934"},{"stop":1,"value":"#000000","opacity":0}]},{"type":"radial","colors":[{"stop":0.25,"value":"#fa7921"},{"stop":1,"value":"#000000","opacity":0}]}],"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":{"min":15,"max":20},"animation":{"enable":true,"speed":5,"sync":false}},"move":{"enable":true,"speed":5}},"background":{"color":"#000"}}');
;// CONCATENATED MODULE: ./dist/browser/gravity.json
var gravity_namespaceObject = JSON.parse('{"name":"Gravity","particles":{"destroy":{"mode":"split","split":{"count":1,"factor":{"value":{"min":4,"max":9}},"particles":{"collisions":{"enable":false},"destroy":{"mode":"none"},"life":{"count":1}}}},"number":{"value":0},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":1,"minimumValue":0.1,"sync":false}},"size":{"value":15,"random":{"enable":true,"minimumValue":10},"animation":{"enable":false,"speed":40,"minimumValue":0.1,"sync":false}},"links":{"enable":false},"life":{"duration":{"sync":true,"value":5},"count":1},"move":{"enable":true,"gravity":{"enable":true},"speed":10,"direction":"none","random":false,"straight":false,"outModes":{"bottom":"split","left":"destroy","right":"destroy","top":"none"},"trail":{"enable":true,"fillColor":"#000000","length":10}}},"interactivity":{"events":{"onHover":{"enable":false,"mode":"repulse","parallax":{"enable":false,"force":60,"smooth":10}},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#000"},"emitters":{"direction":"top","life":{"count":0,"duration":5,"delay":2},"rate":{"delay":0.1,"quantity":1},"size":{"width":0,"height":0},"particles":{"bounce":{"vertical":{"value":0.8,"random":{"enable":true,"minimValue":0.4}}},"color":{"value":["#5bc0eb","#fde74c","#9bc53d","#e55934","#fa7921"]},"links":{"enable":false},"size":{"value":10,"random":{"enable":true,"minimumValue":5}},"opacity":{"value":0.5},"move":{"speed":10,"random":false}}}}');
;// CONCATENATED MODULE: ./dist/browser/growing.json
var growing_namespaceObject = JSON.parse('{"name":"Growing","emitters":{"direction":"top","size":{"width":100,"height":0},"position":{"x":50,"y":100},"rate":{"delay":0.1,"quantity":2}},"particles":{"number":{"value":0,"density":{"enable":true}},"color":{"value":"random"},"shape":{"type":"circle"},"opacity":{"value":1,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":20,"random":false,"animation":{"enable":true,"speed":5,"size_min":0.1,"sync":true,"startValue":"min","destroy":"max"}},"links":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":5,"direction":"none","random":false,"straight":false,"outModes":"destroy","attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"background":{"color":"#000000","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/hexagonPath.json
var hexagonPath_namespaceObject = JSON.parse('{"name":"Hexagon Path","particles":{"color":{"value":"#FF0000","animation":{"enable":true,"speed":10}},"move":{"attract":{"enable":true,"rotate":{"distance":100,"x":2000,"y":2000}},"direction":"none","enable":true,"outModes":{"default":"destroy"},"path":{"clamp":false,"enable":true,"delay":{"value":0},"generator":"polygonPathGenerator","options":{"sides":6,"turnSteps":30,"angle":30}},"random":false,"speed":3,"straight":false,"trail":{"fillColor":"#000","length":20,"enable":true}},"number":{"density":{"enable":true},"value":0},"opacity":{"value":1},"shape":{"type":"circle"},"size":{"value":2}},"background":{"color":"#000"},"emitters":{"direction":"none","rate":{"quantity":1,"delay":0.25},"size":{"width":0,"height":0},"position":{"x":50,"y":50}}}');
;// CONCATENATED MODULE: ./dist/browser/hollowknight.json
var hollowknight_namespaceObject = JSON.parse('{"name":"Hollow Knight","interactivity":{"events":{"onHover":{"enable":true,"mode":"bubble"}},"modes":{"bubble":{"distance":40,"duration":2,"opacity":8,"size":6},"connect":{"distance":80,"links":{"opacity":0.5},"radius":60},"grab":{"distance":400,"links":{"opacity":1}},"push":{"quantity":4},"remove":{"quantity":2},"repulse":{"distance":200,"duration":0.4},"slow":{"active":false,"radius":0,"factor":1}}},"particles":{"color":{"value":"#ffffff"},"links":{"blink":false,"color":"#ffffff","consent":false,"distance":25,"enable":true,"opacity":0.4,"width":1},"move":{"attract":{"enable":false,"rotate":{"x":600,"y":1200}},"bounce":false,"direction":"none","enable":true,"outModes":"bounce","random":false,"speed":1,"straight":false},"number":{"density":{"enable":false},"limit":0,"value":400},"opacity":{"animation":{"enable":true,"minimumValue":0.05,"speed":2,"sync":false},"random":false,"value":0.4},"shape":{"type":"circle"},"size":{"animation":{"enable":false,"minimumValue":0.1,"speed":40,"sync":false},"random":true,"value":1}},"polygon":{"draw":{"enable":true,"lineColor":"rgba(255,255,255,0.2)","lineWidth":0.5},"enable":true,"move":{"radius":10},"inline":{"arrangement":"equidistant"},"scale":2,"type":"inline","url":"https://particles.js.org/images/hollowknight.svg"},"background":{"color":"#000000","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/hyperspace.json
var hyperspace_namespaceObject = JSON.parse('{"name":"Hyperspace","background":{"color":"#000"},"particles":{"color":{"value":["#3998D0","#2EB6AF","#A9BD33","#FEC73B","#F89930","#F45623","#D62E32","#EB586E","#9952CF"]},"move":{"attract":{"enable":false,"rotate":{"x":800,"y":800}},"direction":"none","enable":true,"outModes":{"default":"destroy"},"random":false,"speed":3,"straight":false,"trail":{"fillColor":"#000","length":30,"enable":true}},"number":{"density":{"enable":true},"value":0},"opacity":{"value":1},"shape":{"type":"circle"},"size":{"value":25,"animation":{"startValue":"min","enable":true,"minimumValue":1,"speed":2,"destroy":"max","sync":true}}},"emitters":{"direction":"none","rate":{"quantity":5,"delay":0.3},"size":{"width":0,"height":0},"position":{"x":50,"y":50}}}');
;// CONCATENATED MODULE: ./dist/browser/imageMask.json
var imageMask_namespaceObject = JSON.parse('{"name":"Image Mask","smooth":true,"interactivity":{"events":{"onHover":{"enable":true,"mode":"bubble","parallax":{"enable":false,"force":2,"smooth":10}}},"modes":{"bubble":{"distance":40,"duration":2,"opacity":8,"size":15}}},"particles":{"move":{"direction":"none","distance":10,"enable":true,"speed":1},"number":{"value":600},"shape":{"type":["circle","square","triangle"]},"size":{"value":{"min":3,"max":5}}},"canvasMask":{"enable":true,"scale":5,"pixels":{"filter":"pixelFilter"},"image":{"src":"https://particles.js.org/images/amongus_cyan.png"}},"background":{"color":"#000000","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/images.json
var images_namespaceObject = JSON.parse('{"name":"Images","interactivity":{"events":{"onClick":{"enable":true,"mode":"push"},"onHover":{"enable":true,"mode":"bubble"}},"modes":{"bubble":{"distance":400,"duration":2,"opacity":0.8,"size":40},"push":{"quantity":4}}},"particles":{"color":{"value":"#ffffff"},"move":{"enable":true,"speed":2},"number":{"density":{"enable":true},"limit":0,"value":80},"opacity":{"value":1},"rotate":{"animation":{"enable":true,"speed":5,"sync":false},"direction":"random","value":{"min":0,"max":360}},"shape":{"options":{"image":[{"src":"https://particles.js.org/images/fruits/apple.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/avocado.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/banana.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/berries.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/cherry.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/grapes.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/lemon.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/orange.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/peach.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/pear.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/pepper.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/plum.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/star.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/strawberry.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/watermelon.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/watermelon_slice.png","width":32,"height":32}]},"type":"image"},"size":{"value":16}},"background":{"color":"#fff"}}');
;// CONCATENATED MODULE: ./dist/browser/imagesDirections.json
var imagesDirections_namespaceObject = JSON.parse('{"name":"Images with Custom Directions","interactivity":{"events":{"onClick":{"enable":true,"mode":"push"},"onHover":{"enable":true,"mode":"bubble"}},"modes":{"bubble":{"distance":400,"duration":2,"opacity":0.8,"size":40},"push":{"quantity":4}}},"particles":{"move":{"direction":"none","enable":true,"speed":2},"number":{"density":{"enable":true},"value":80},"opacity":{"value":1},"rotate":{"animation":{"enable":true,"speed":5,"sync":false},"direction":"random","random":true,"value":0},"shape":{"type":"image","options":{"image":[{"src":"https://particles.js.org/images/fruits/apple.png","width":32,"height":32,"particles":{"move":{"direction":"top"}}},{"src":"https://particles.js.org/images/fruits/avocado.png","width":32,"height":32,"particles":{"move":{"direction":"bottom"}}}]}},"size":{"animation":{"enable":false,"minimumValue":0.1,"speed":40,"sync":false},"random":false,"value":16}},"polygon":{"draw":{"enable":false,"lineColor":"#ffffff","lineWidth":0.5},"move":{"radius":10},"scale":1,"type":"none","url":""},"background":{"color":"#fff","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/infection.json
var infection_namespaceObject = JSON.parse('{"name":"Infection","infection":{"enable":true,"infections":10,"cure":true,"stages":[{"color":"#ff0000","duration":1},{"color":"#ffa500","duration":1,"rate":2},{"color":"#ffff00","duration":1,"rate":2},{"color":"#008000","duration":1,"rate":3},{"color":"#0000ff","duration":1,"rate":4},{"color":"#4b0082","duration":1,"rate":5},{"color":"#ee82ee","duration":1,"rate":6,"infectedStage":0}]},"particles":{"number":{"value":400,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":0.8,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":5,"random":false,"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"links":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"collisions":true,"enable":true,"speed":20,"direction":"none","random":false,"straight":false,"outModes":"bounce"}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/life.json
var life_namespaceObject = JSON.parse('{"name":"Life","particles":{"number":{"value":160,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":100,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}},"life":{"duration":{"sync":false,"value":3},"count":0,"delay":{"random":{"enable":true,"minimumValue":1},"value":2}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"repulse":{"distance":200},"push":{"quantity":4}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/lightHover.json
var lightHover_namespaceObject = JSON.parse('{"name":"Light Hover","particles":{"number":{"value":30,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":["circle","square"]},"opacity":{"value":1},"size":{"value":30,"random":{"enable":true,"minimumValue":15}},"rotate":{"value":0,"direction":"clockwise","animation":{"speed":5,"enable":true}},"move":{"enable":true,"speed":6,"direction":"none"}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"light"}},"modes":{"light":{"area":{"gradient":{"start":"3b5e98","stop":"#17163e"}},"shadow":{"color":"#17163e"}}}},"background":{"color":"#17163e"}}');
;// CONCATENATED MODULE: ./dist/browser/linkTriangles.json
var linkTriangles_namespaceObject = JSON.parse('{"name":"Link Triangles","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":150,"color":"random","opacity":0.4,"width":1,"triangles":{"enable":true,"color":"#ffffff","opacity":0.1}},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/localPolygonMask.json
var localPolygonMask_namespaceObject = JSON.parse('{"name":"Local Polygon Mask","interactivity":{"events":{"onHover":{"enable":true,"mode":"bubble"}},"modes":{"bubble":{"distance":40,"duration":2,"opacity":8,"size":6}}},"particles":{"color":{"value":"#ffffff"},"links":{"blink":false,"color":"#ffffff","consent":false,"distance":30,"enable":false,"opacity":0.4,"width":1},"move":{"attract":{"enable":false,"rotate":{"x":600,"y":1200}},"bounce":false,"direction":"none","enable":true,"outModes":"bounce","random":false,"speed":1,"straight":false},"number":{"density":{"enable":false},"limit":0,"value":200},"opacity":{"value":0.5},"shape":{"type":"circle"},"size":{"value":3}},"polygon":{"draw":{"enable":true,"lineColor":"rgba(255,255,255,1)","lineWidth":1},"enable":true,"move":{"radius":10},"position":{"x":50,"y":50},"inline":{"arrangement":"equidistant"},"scale":3,"type":"inside","data":"<svg xmlns=\\"http://www.w3.org/2000/svg\\" xmlns:xlink=\\"http://www.w3.org/1999/xlink\\" height=\\"200\\" width=\\"150\\"><path d=\\"M 75,0 0,200 h 150 z\\" /></svg>"},"background":{"color":"#000000","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/manual.json
var manual_namespaceObject = JSON.parse('{"name":"Manual Particles","manualParticles":[{"position":{"x":50,"y":50}},{"position":{"x":25,"y":25}},{"position":{"x":75,"y":75}},{"position":{"x":25,"y":75}},{"position":{"x":75,"y":25}}],"particles":{"number":{"value":0,"density":{"enable":false}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":30},"links":{"enable":true,"distance":100,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":2,"direction":"top","random":false,"straight":true,"warp":true,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"background":{"color":"#000000","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/motionDisable.json
var motionDisable_namespaceObject = JSON.parse('{"name":"Motion Disable","motion":{"disable":true},"particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"links":{"enable":true,"distance":100,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"repulse":{"distance":200},"push":{"quantity":4}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/motionReduce.json
var motionReduce_namespaceObject = JSON.parse('{"name":"Motion Reduce","motion":{"disable":false,"reduce":{"value":true,"factor":6}},"particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":100,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/mouseAttract.json
var mouseAttract_namespaceObject = JSON.parse('{"name":"Mouse Attract","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":100,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"attract"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"attract":{"distance":600,"duration":0.4,"speed":3},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/mouseBounce.json
var mouseBounce_namespaceObject = JSON.parse('{"name":"Mouse Bounce","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":100,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"bounce"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"bounce":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/mouseFollow.json
var mouseFollow_namespaceObject = JSON.parse('{"name":"Mouse Follow","background":{"color":"#000000"},"interactivity":{"events":{"onHover":{"enable":true,"mode":["bubble","connect"]}},"modes":{"bubble":{"distance":200,"duration":2,"opacity":1,"size":30,"color":{"value":["#5bc0eb","#fde74c","#9bc53d","#e55934","#fa7921"]}},"connect":{"distance":60,"links":{"opacity":0.2},"radius":200}}},"particles":{"color":{"value":"#000000"},"move":{"direction":"none","enable":true,"random":false,"speed":2,"straight":false},"number":{"density":{"enable":true},"value":300},"opacity":{"value":0},"shape":{"type":"circle"},"size":{"random":{"enable":true,"minimumValue":10},"value":15}},"detectRetina":true}');
;// CONCATENATED MODULE: ./dist/browser/mouseTrail.json
var mouseTrail_namespaceObject = JSON.parse('{"name":"Mouse Trail","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":100,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"trail"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2},"trail":{"delay":0.01,"pauseOnStop":true,"particles":{"color":{"value":"#00ff00","animation":{"enable":true,"speed":200,"sync":false}},"links":{"enable":false},"move":{"outModes":"destroy"},"size":{"random":true,"value":10}}}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/moveAngle.json
var moveAngle_namespaceObject = JSON.parse('{"name":"Move Angle","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":100,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":-30,"random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/moveDistance.json
var moveDistance_namespaceObject = JSON.parse('{"name":"Move Distance","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":100,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"distance":50,"direction":"none","random":false,"straight":false,"outModes":"none","attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/moveInside.json
var moveInside_namespaceObject = JSON.parse('{"name":"Move Inside","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":{"min":5,"max":7}},"move":{"enable":true,"speed":10,"direction":"inside","random":false,"straight":true}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/moveOutside.json
var moveOutside_namespaceObject = JSON.parse('{"name":"Move Outside","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":{"min":5,"max":7}},"move":{"enable":true,"speed":10,"direction":"outside","random":false,"straight":true}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/multipleClickEmitters.json
var multipleClickEmitters_namespaceObject = JSON.parse('{"name":"Multiple Click Emitters","background":{"color":"#f00"},"interactivity":{"events":{"onClick":{"enable":true,"mode":"emitter"}},"modes":{"emitters":{"random":{"enable":false,"count":0},"value":[{"name":"big-particle","startCount":1,"life":{"count":1,"delay":0,"duration":0.1},"rate":{"delay":0,"quantity":0},"particles":{"color":{"value":"#0f0"},"size":{"value":{"min":150,"max":300},"animation":{"enable":true,"speed":1500,"decay":0.02,"startValue":"min","count":1,"sync":true}},"life":{"duration":{"value":1,"sync":true},"count":1}}},{"name":"small-particles","startCount":50,"life":{"count":1,"delay":0,"duration":0.1},"particles":{"color":{"value":"#f00"},"move":{"decay":0.1,"enable":true,"speed":60,"outModes":"destroy"},"life":{"duration":{"value":1,"sync":true},"count":1},"size":{"value":{"min":1,"max":10}}}}]}}},"particles":{"number":{"value":0}},"emitters":[]}');
;// CONCATENATED MODULE: ./dist/browser/multiplePolygonMasks.json
var multiplePolygonMasks_namespaceObject = JSON.parse('{"name":"Multiple Polygon Masks","interactivity":{"events":{"onClick":{"enable":false,"mode":"push"},"onDiv":{"elementId":"repulse-div","enable":false,"mode":"repulse"},"onHover":{"enable":true,"mode":"bubble","parallax":{"enable":false,"force":2,"smooth":10}}},"modes":{"bubble":{"distance":40,"duration":2,"opacity":8,"size":6},"connect":{"distance":80,"links":{"opacity":0.5},"radius":60},"grab":{"distance":400,"links":{"opacity":1}},"push":{"quantity":4},"remove":{"quantity":2},"repulse":{"distance":200,"duration":0.4},"slow":{"active":false,"radius":0,"factor":1}}},"particles":{"color":{"value":["#4285f4","#34A853","#FBBC05","#EA4335"]},"links":{"blink":false,"color":"random","consent":false,"distance":40,"enable":true,"opacity":1,"width":1},"move":{"attract":{"enable":false,"rotate":{"x":600,"y":1200}},"bounce":false,"direction":"none","enable":true,"outModes":"bounce","random":false,"speed":1,"straight":false},"number":{"limit":0,"value":200},"opacity":{"animation":{"enable":true,"minimumValue":0.05,"speed":2,"sync":false},"random":false,"value":0.4},"shape":{"type":"circle"},"size":{"animation":{"enable":false,"minimumValue":0.1,"speed":40,"sync":false},"random":true,"value":1}},"polygon":{"draw":{"enable":false,"lineColor":"rgba(255,255,255,0.2)","lineWidth":0.5},"enable":true,"move":{"radius":10},"position":{"x":30,"y":30},"inline":{"arrangement":"equidistant"},"scale":1,"type":"inline","url":"https://particles.js.org/images/google.svg"},"background":{"color":"#000000","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/nasa.json
var nasa_namespaceObject = JSON.parse('{"name":"NASA","particles":{"number":{"value":160,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":1,"random":true,"animation":{"enable":true,"speed":1,"opacity_min":0,"sync":false}},"size":{"value":3,"random":true,"animation":{"enable":false,"speed":4,"size_min":0.3,"sync":false}},"links":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":1,"direction":"none","random":true,"straight":false,"bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":600}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"bubble"},"onClick":{"enable":true,"mode":"repulse"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":250,"size":0,"duration":2,"opacity":0},"repulse":{"distance":400,"duration":0.4},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#232741","image":"url(\'http://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1237px-NASA_logo.svg.png\')","position":"50% 50%","repeat":"no-repeat","size":"20%"}}');
;// CONCATENATED MODULE: ./dist/browser/noconfig.json
var noconfig_namespaceObject = JSON.parse('{"name":"No Config","fullScreen":{"enable":true,"zIndex":0}}');
;// CONCATENATED MODULE: ./dist/browser/noisePlanes.json
var noisePlanes_namespaceObject = JSON.parse('{"name":"Noise Planes","background":{"color":"#000"},"interactivity":{"events":{"onClick":{"enable":true,"mode":"push"}},"modes":{"bubble":{"distance":400,"duration":2,"opacity":0.8,"size":40,"speed":3},"grab":{"distance":400,"links":{"opacity":1}},"push":{"quantity":4},"remove":{"quantity":2},"repulse":{"distance":200,"duration":0.4}}},"particles":{"move":{"path":{"enable":true,"options":{"size":32,"draw":false,"increment":0.004},"generator":"simplexNoise"},"enable":true,"speed":6},"number":{"density":{"enable":true},"value":80},"rotate":{"value":45,"path":true},"opacity":{"value":1},"shape":{"image":{"height":128,"src":"https://particles.js.org/images/plane_alt.png","width":128},"type":"image"},"size":{"value":32},"zIndex":{"value":{"min":0,"max":100},"opacityRate":0,"sizeRate":2,"velocityRate":2}}}');
;// CONCATENATED MODULE: ./dist/browser/nyancat.json
var nyancat_namespaceObject = JSON.parse('{"name":"Nyan Cat","particles":{"number":{"value":1,"density":{"enable":false}},"color":{"value":"#ffffff"},"shape":{"type":"image","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"https://cdn2.scratch.mit.edu/get_image/gallery/780516_170x100.png","width":1750,"height":800}},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":240,"random":false,"animation":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"links":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"right","random":false,"straight":true,"bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":false,"mode":"grab"},"onClick":{"enable":true,"mode":"repulse"}},"modes":{"grab":{"distance":200,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8},"repulse":{"distance":200,"duration":0.4},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#0d47a1","image":"url(\'http://fc06.deviantart.net/fs71/f/2011/187/1/0/nyan_cat_background_by_kento1-d3l6i50.jpg\')","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/nyancat2.json
var nyancat2_namespaceObject = JSON.parse('{"name":"Nyan Cat 2","particles":{"number":{"value":100,"density":{"enable":false}},"color":{"value":"#ffffff"},"shape":{"type":"star","options":{"sides":5}},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":4,"random":true,"animation":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"links":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"left","random":false,"straight":true,"bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onClick":{"enable":true,"mode":"repulse"}},"modes":{"repulse":{"distance":200,"duration":0.4}}},"background":{"color":"#043564","image":"url(\'http://vincentgarreau.com/particles.js/assets/img/kbLd9vb_new.gif\')","position":"0 50%","repeat":"no-repeat","size":"60%"}}');
;// CONCATENATED MODULE: ./dist/browser/orbit.json
var orbit_namespaceObject = JSON.parse('{"name":"Orbit","particles":{"color":{"value":["#5bc0eb","#fde74c","#9bc53d","#e55934","#fa7921"]},"move":{"enable":true,"speed":3},"number":{"density":{"enable":true},"limit":300,"value":100},"opacity":{"value":1},"orbit":{"animation":{"enable":true,"speed":1},"enable":true,"opacity":1,"color":"#ff7700","rotation":{"random":{"enable":true}}},"shape":{"type":["circle","square"]},"size":{"value":10}},"background":{"color":"#000000","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/parallax.json
var parallax_namespaceObject = JSON.parse('{"name":"Parallax","particles":{"number":{"value":100,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":{"min":0.1,"max":0.5},"animation":{"enable":true,"speed":3,"sync":false}},"size":{"value":{"min":1,"max":10},"animation":{"enable":true,"speed":20,"sync":false}},"links":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":2}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"grab","parallax":{"enable":true,"smooth":10,"force":60}},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#0d47a1"}}');
;// CONCATENATED MODULE: ./dist/browser/pathPolygonMask.json
var pathPolygonMask_namespaceObject = JSON.parse('{"name":"Path Polygon Mask","interactivity":{"events":{"onHover":{"enable":true,"mode":"bubble"}},"modes":{"bubble":{"distance":40,"duration":2,"opacity":8,"size":6}}},"particles":{"color":{"value":"#ffffff"},"links":{"blink":false,"color":"#ffffff","consent":false,"distance":30,"enable":true,"opacity":0.4,"width":1},"move":{"attract":{"enable":false,"rotate":{"x":600,"y":1200}},"bounce":false,"direction":"none","enable":true,"outModes":"bounce","random":false,"speed":1,"straight":false},"number":{"limit":0,"value":80},"opacity":{"animation":{"enable":true,"minimumValue":0.05,"speed":2,"sync":false},"random":false,"value":0.4},"shape":{"type":"circle"},"size":{"animation":{"enable":false,"minimumValue":0.1,"speed":40,"sync":false},"random":true,"value":1}},"polygon":{"draw":{"enable":true,"lineColor":"rgba(255,255,255,0.2)","lineWidth":0.5},"enable":true,"move":{"radius":10},"position":{"x":50,"y":50},"inline":{"arrangement":"equidistant"},"scale":2,"type":"inline","data":{"path":"M 75,0 0,200 h 150 z","size":{"width":150,"height":200}}},"background":{"color":"#000000","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/planes.json
var planes_namespaceObject = JSON.parse('{"name":"Planes","interactivity":{"events":{"onClick":{"enable":true,"mode":"push"}},"modes":{"push":{"quantity":4}}},"particles":{"color":{"value":"#ffffff"},"move":{"attract":{"enable":false,"rotateX":600,"rotateY":1200},"bounce":false,"direction":"none","enable":true,"random":false,"speed":6,"straight":false},"number":{"density":{"enable":true},"value":80},"rotate":{"value":45,"path":true},"opacity":{"animation":{"enable":false,"opacity_min":0.1,"speed":1,"sync":false},"random":false,"value":1},"shape":{"image":{"height":128,"src":"https://particles.js.org/images/plane_alt.png","width":128},"type":"image"},"size":{"animation":{"enable":false,"size_min":0.1,"speed":40,"sync":false},"random":{"enable":true,"minimumValue":16},"value":32}},"detectRetina":true}');
;// CONCATENATED MODULE: ./dist/browser/plasma.json
var plasma_namespaceObject = JSON.parse('{"name":"Plasma","background":{"color":{"value":"#000000"}},"particles":{"number":{"value":150,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":1,"random":false,"animation":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":0,"random":false,"animation":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":110,"color":"#19f","opacity":0.4,"width":2},"move":{"enable":true,"speed":50,"direction":"none","random":true,"straight":false,"outModes":"bounce","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":false,"mode":"repulse"}},"modes":{"grab":{"distance":200,"links":{"opacity":1}},"bubble":{"distance":200,"size":40,"duration":2,"opacity":8},"repulse":{"distance":150,"duration":0.4},"push":{"quantity":4},"remove":{"quantity":2}}},"detectRetina":true}');
;// CONCATENATED MODULE: ./dist/browser/polygonMask.json
var polygonMask_namespaceObject = JSON.parse('{"name":"Polygon Mask","interactivity":{"events":{"onClick":{"enable":false,"mode":"push"},"onDiv":{"elementId":"repulse-div","enable":false,"mode":"repulse"},"onHover":{"enable":true,"mode":"bubble","parallax":{"enable":false,"force":2,"smooth":10}}},"modes":{"bubble":{"distance":40,"duration":2,"opacity":8,"size":6},"connect":{"distance":80,"links":{"opacity":0.5},"radius":60},"grab":{"distance":400,"links":{"opacity":1}},"push":{"quantity":4},"remove":{"quantity":2},"repulse":{"distance":200,"duration":0.4},"slow":{"active":false,"radius":0,"factor":1}}},"particles":{"color":{"value":"#ffffff"},"links":{"blink":false,"color":"#ffffff","consent":false,"distance":30,"enable":true,"opacity":0.4,"width":1},"move":{"attract":{"enable":false,"rotate":{"x":600,"y":1200}},"bounce":false,"direction":"none","enable":true,"outModes":"bounce","random":false,"speed":1,"straight":false},"number":{"limit":0,"value":200},"opacity":{"animation":{"enable":true,"minimumValue":0.05,"speed":2,"sync":false},"random":false,"value":0.4},"shape":{"type":"circle"},"size":{"animation":{"enable":false,"minimumValue":0.1,"speed":40,"sync":false},"random":true,"value":1}},"polygon":{"draw":{"enable":true,"lineColor":"rgba(255,255,255,0.2)","lineWidth":1},"enable":true,"move":{"radius":10},"position":{"x":50,"y":50},"inline":{"arrangement":"equidistant"},"scale":0.5,"type":"inline","url":"https://particles.js.org/images/smalldeer.svg"},"background":{"color":"#000000","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/polygons.json
var polygons_namespaceObject = JSON.parse('{"name":"Polygon Shape","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"polygon","stroke":{"width":0,"color":"#000000"},"polygon":[{"nb_sides":3,"particles":{"opacity":{"value":0.8,"random":{"enable":true,"minimumValue":0.5}},"size":{"value":12,"random":{"enable":true,"minimumValue":10}},"color":{"value":"ff0"}}},{"nb_sides":5,"particles":{"opacity":{"value":0.5},"size":{"value":8,"random":{"enable":false}},"color":{"value":"0f0"}}},{"nb_sides":8,"particles":{"opacity":{"value":1,"random":false},"size":{"value":20,"random":{"enable":true,"minimumValue":15}},"color":{"value":"f00"}}}]},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":5,"random":true,"animation":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":2,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"bubble","parallax":{"enable":false,"force":60,"smooth":10}},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#0d47a1"}}');
;// CONCATENATED MODULE: ./dist/browser/random.json
var random_namespaceObject = JSON.parse('{"name":"Random Colors","interactivity":{"events":{"onClick":{"enable":true,"mode":"push"},"onDiv":{"elementId":"repulse-div","enable":false,"mode":"repulse"},"onHover":{"enable":true,"mode":"connect","parallax":{"enable":false,"force":60,"smooth":10}}},"modes":{"bubble":{"distance":400,"duration":2,"opacity":0.8,"size":40},"connect":{"distance":80,"links":{"opacity":0.5},"radius":60},"grab":{"distance":400,"links":{"opacity":1}},"push":{"quantity":4},"remove":{"quantity":2},"repulse":{"distance":200,"duration":0.4}}},"particles":{"color":{"value":"random"},"links":{"blink":false,"color":"#ffffff","consent":false,"distance":150,"enable":false,"opacity":0.4,"width":1},"move":{"attract":{"enable":false,"rotate":{"x":600,"y":1200}},"bounce":false,"direction":"none","enable":true,"random":false,"speed":6,"straight":false},"number":{"density":{"enable":true},"limit":500,"value":300},"opacity":{"animation":{"enable":false,"minimumValue":0.1,"speed":1,"sync":false},"random":false,"value":0.5},"shape":{"type":"circle"},"size":{"animation":{"enable":false,"minimumValue":0.1,"speed":40,"sync":false},"random":{"enable":true,"minimumValue":10},"value":15}},"polygon":{"draw":{"enable":false,"lineColor":"#ffffff","lineWidth":0.5},"move":{"radius":10},"scale":1,"type":"none","url":""},"background":{"color":"#000000","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/reactBubbles.json
var reactBubbles_namespaceObject = JSON.parse('{"name":"React Bubbles","interactivity":{"events":{"onClick":{"enable":true,"mode":"repulse"},"onDiv":{"elementId":"repulse-div","enable":false,"mode":"repulse"},"onHover":{"enable":true,"mode":"bubble"}},"modes":{"bubble":{"distance":250,"duration":2,"opacity":0,"size":0},"connect":{"distance":80,"links":{"opacity":0.5},"radius":60},"grab":{"distance":180,"links":{"opacity":0.35}},"push":{"quantity":4},"remove":{"quantity":2},"repulse":{"distance":200,"duration":4},"slow":{"factor":1,"radius":0}}},"particles":{"color":{"value":"#FFF"},"links":{"blink":false,"color":{"value":"#fff"},"consent":false,"distance":150,"enable":false,"opacity":0.6,"shadow":{"blur":5,"color":{"value":"lime"},"enable":false},"width":1},"move":{"attract":{"enable":false,"rotate":{"x":3000,"y":3000}},"collisions":true,"direction":"top","enable":true,"random":true,"speed":1,"straight":false,"trail":{"enable":false,"length":10,"fillColor":{"value":"#000000"}}},"number":{"limit":-1,"value":160},"opacity":{"animation":{"enable":true,"minimumValue":0.1,"speed":1,"sync":false},"random":{"enable":false,"minimumValue":1},"value":0.5},"rotate":{"animation":{"enable":false,"speed":0,"sync":false},"direction":"clockwise","random":false,"value":0},"shape":{"character":{"fill":true,"font":"Verdana","style":"","value":"*","weight":"400","close":true},"image":{"height":100,"replaceColor":true,"src":"","width":100,"fill":true,"close":true},"polygon":{"close":true,"fill":true,"sides":5},"type":"circle","custom":{}},"size":{"animation":{"enable":false,"minimumValue":0.3,"speed":4,"sync":false},"random":{"enable":true,"minimumValue":1},"value":3},"shadow":{"blur":0,"color":{"value":"#000000"},"enable":false,"offset":{"x":0,"y":0}},"stroke":{"color":{"value":"#ff0000"},"width":0,"opacity":1}},"polygon":{"draw":{"enable":false,"stroke":{"color":"rgba(255, 255, 255, .1)","width":0.5,"opacity":0.1}},"enable":false,"inline":{"arrangement":"one-per-point"},"move":{"radius":10,"type":"path"},"scale":1,"type":"inline","url":""},"backgroundMask":{"cover":{"color":{"value":"#fff"},"opacity":1},"enable":false},"pauseOnBlur":true,"background":{"color":"#0d47a1","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/reactDefaults.json
var reactDefaults_namespaceObject = JSON.parse('{"name":"React Defaults","particles":{"number":{"value":40,"max":-1},"color":{"value":"#FFF"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5},"image":{"src":"","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"animation":{"enable":true,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":1,"random":false,"animation":{"enable":false,"speed":40,"size_min":0,"sync":false}},"links":{"enable":true,"distance":150,"color":"#FFF","opacity":0.6,"width":1,"shadow":{"enable":false,"blur":5,"color":"lime"}},"move":{"enable":true,"speed":3,"direction":"none","random":false,"straight":false,"outModes":"bounce","bounce":true}},"background":{"color":"#0d47a1"}}');
;// CONCATENATED MODULE: ./dist/browser/reactMultipleImages.json
var reactMultipleImages_namespaceObject = JSON.parse('{"name":"React Multiple Images","particles":{"color":{"value":"#CCC"},"links":{"blink":false,"color":"#fff","consent":false,"distance":150,"enable":false,"opacity":0.6,"width":1},"move":{"collisions":true,"direction":"none","enable":true,"random":false,"speed":1,"straight":false},"number":{"density":{"enable":true},"value":8},"opacity":{"animation":{"enable":true,"speed":1,"sync":false},"value":{"min":0.1,"max":0.5}},"shape":{"image":[{"height":20,"replaceColor":true,"src":"https://particles.js.org/images/fruits/cherry.png","width":23,"fill":true,"close":true},{"height":20,"replaceColor":true,"src":"https://particles.js.org/images/fruits/grapes.png","width":20,"fill":true,"close":true},{"height":20,"replaceColor":true,"src":"https://particles.js.org/images/fruits/lemon.png","width":20,"fill":true,"close":true}],"type":["image","circle"]},"size":{"animation":{"enable":true,"speed":4,"sync":false},"value":{"min":10,"max":30}},"shadow":{"blur":0,"color":{"value":"#000000"},"enable":false,"offset":{"x":0,"y":0}},"stroke":{"color":{"value":"#ff0000"},"width":0,"opacity":1}},"polygon":{"draw":{"enable":false,"stroke":{"color":"rgba(255, 255, 255, .1)","width":0.5,"opacity":0.1}},"enable":false,"inline":{"arrangement":"one-per-point"},"move":{"radius":10,"type":"path"},"scale":1,"type":"inline","url":""},"backgroundMask":{"cover":{"color":{"value":"#fff"},"opacity":1},"enable":false},"pauseOnBlur":true,"background":{"color":"#0d47a1","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/reactNightSky.json
var reactNightSky_namespaceObject = JSON.parse('{"name":"React Night Sky","interactivity":{"events":{"onClick":{"enable":true,"mode":"push"}},"modes":{"push":{"quantity":1}}},"particles":{"color":{"value":"#FFF"},"links":{"blink":false,"color":{"value":"#fff"},"consent":false,"distance":150,"enable":true,"opacity":0.02,"shadow":{"blur":5,"color":{"value":"lime"},"enable":false},"width":1},"move":{"attract":{"enable":false,"rotate":{"x":3000,"y":3000}},"collisions":true,"direction":"right","enable":true,"outModes":"bounce","random":false,"speed":0.05,"straight":false,"trail":{"enable":false,"length":10,"fillColor":{"value":"#000000"}}},"number":{"density":{"enable":true},"limit":-1,"value":60},"opacity":{"animation":{"enable":true,"minimumValue":0.05,"speed":1,"sync":false},"random":{"enable":false,"minimumValue":1},"value":0.5},"rotate":{"animation":{"enable":false,"speed":0,"sync":false},"direction":"clockwise","random":false,"value":0},"shape":{"character":{"fill":true,"font":"Verdana","style":"","value":"*","weight":"400","close":true},"image":{"height":100,"replaceColor":true,"src":"","width":100,"fill":true,"close":true},"polygon":{"close":true,"fill":true,"sides":5},"type":"circle","custom":{}},"size":{"animation":{"enable":false,"minimumValue":0,"speed":40,"sync":false},"random":{"enable":false,"minimumValue":1},"value":1},"shadow":{"blur":0,"color":{"value":"#000000"},"enable":false,"offset":{"x":0,"y":0}},"stroke":{"color":{"value":"#ff0000"},"width":0,"opacity":1}},"polygon":{"draw":{"enable":false,"stroke":{"color":"rgba(255, 255, 255, .1)","width":0.5,"opacity":0.1}},"enable":false,"inline":{"arrangement":"one-per-point"},"move":{"radius":10,"type":"path"},"scale":1,"type":"inline","url":""},"backgroundMask":{"cover":{"color":{"value":"#fff"},"opacity":1},"enable":false},"pauseOnBlur":true,"background":{"color":"#0d47a1","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/reactPolygonMask.json
var reactPolygonMask_namespaceObject = JSON.parse('{"name":"React Polygon Mask","interactivity":{"events":{"onHover":{"enable":true,"mode":"bubble"}},"modes":{"bubble":{"distance":40,"duration":0.4,"opacity":1,"size":6}}},"particles":{"color":{"value":"#FFF"},"links":{"blink":false,"color":{"value":"#fff"},"consent":false,"distance":30,"enable":true,"opacity":0.4,"shadow":{"blur":5,"color":{"value":"lime"},"enable":false},"width":1},"move":{"attract":{"enable":false,"rotate":{"x":3000,"y":3000}},"collisions":false,"direction":"none","enable":true,"outModes":"bounce","random":false,"speed":1,"straight":false,"trail":{"enable":false,"length":10,"fillColor":{"value":"#000000"}}},"number":{"limit":-1,"value":200},"opacity":{"animation":{"enable":true,"minimumValue":0.05,"speed":2,"sync":false},"random":{"enable":false,"minimumValue":1},"value":0.4},"rotate":{"animation":{"enable":false,"speed":0,"sync":false},"direction":"clockwise","random":false,"value":0},"shape":{"character":{"fill":true,"font":"Verdana","style":"","value":"*","weight":"400","close":true},"image":{"height":100,"replaceColor":true,"src":"","width":100,"fill":true,"close":true},"polygon":{"close":true,"fill":true,"sides":5},"type":"circle","custom":{}},"size":{"animation":{"enable":false,"minimumValue":0,"speed":40,"sync":false},"random":{"enable":false,"minimumValue":1},"value":1},"shadow":{"blur":0,"color":{"value":"#000000"},"enable":false,"offset":{"x":0,"y":0}},"stroke":{"color":{"value":"#ff0000"},"width":0,"opacity":1}},"polygon":{"draw":{"enable":true,"stroke":{"color":"rgba(255, 255, 255, .2)","width":0.5,"opacity":0.2}},"enable":true,"inline":{"arrangement":"equidistant"},"move":{"radius":10,"type":"path"},"scale":0.5,"type":"inline","url":"https://particles.js.org/images/smalldeer.svg"},"backgroundMask":{"cover":{"color":{"value":"#fff"},"opacity":1},"enable":false},"pauseOnBlur":true,"background":{"color":"#0d47a1","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/reactSimple.json
var reactSimple_namespaceObject = JSON.parse('{"name":"React Simple","interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"}},"modes":{"repulse":{"distance":100,"duration":5}}},"particles":{"color":{"value":"#FFF"},"links":{"blink":false,"color":{"value":"#fff"},"consent":false,"distance":150,"enable":true,"opacity":0.6,"shadow":{"blur":5,"color":{"value":"lime"},"enable":false},"width":1},"move":{"attract":{"enable":false,"rotate":{"x":3000,"y":3000}},"collisions":true,"direction":"none","enable":true,"outModes":"bounce","random":false,"speed":3,"straight":false,"trail":{"enable":false,"length":10,"fillColor":{"value":"#000000"}}},"number":{"limit":-1,"value":50},"opacity":{"animation":{"enable":true,"minimumValue":0.1,"speed":1,"sync":false},"random":{"enable":false,"minimumValue":1},"value":0.5},"rotate":{"animation":{"enable":false,"speed":0,"sync":false},"direction":"clockwise","random":false,"value":0},"shape":{"character":{"fill":true,"font":"Verdana","style":"","value":"*","weight":"400","close":true},"image":{"height":100,"replaceColor":true,"src":"","width":100,"fill":true,"close":true},"polygon":{"close":true,"fill":true,"sides":5},"type":"circle","custom":{}},"size":{"animation":{"enable":false,"minimumValue":0,"speed":40,"sync":false},"random":{"enable":false,"minimumValue":1},"value":3},"shadow":{"blur":0,"color":{"value":"#000000"},"enable":false,"offset":{"x":0,"y":0}},"stroke":{"color":{"value":"#ff0000"},"width":0,"opacity":1}},"polygon":{"draw":{"enable":false,"stroke":{"color":"rgba(255, 255, 255, .1)","width":0.5,"opacity":0.1}},"enable":false,"inline":{"arrangement":"one-per-point"},"move":{"radius":10,"type":"path"},"scale":1,"type":"inline","url":""},"backgroundMask":{"cover":{"color":{"value":"#fff"},"opacity":1},"enable":false},"pauseOnBlur":true,"background":{"color":"#0d47a1","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/reactSnow.json
var reactSnow_namespaceObject = JSON.parse('{"name":"React Snow","interactivity":{"events":{"onClick":{"enable":true,"mode":"remove"}},"modes":{"bubble":{"distance":200,"duration":0.4,"opacity":1,"size":80},"connect":{"distance":80,"links":{"opacity":0.5},"radius":60},"grab":{"distance":180,"links":{"opacity":0.35}},"push":{"quantity":4},"remove":{"quantity":10},"repulse":{"distance":100,"duration":5},"slow":{"factor":1,"radius":0}}},"particles":{"color":{"value":"#FFF"},"links":{"blink":false,"color":{"value":"#fff"},"consent":false,"distance":150,"enable":false,"opacity":0.6,"shadow":{"blur":5,"color":{"value":"lime"},"enable":false},"width":1},"move":{"attract":{"enable":false,"rotate":{"x":3000,"y":3000}},"collisions":true,"direction":"bottom","enable":true,"random":false,"speed":3,"straight":false,"trail":{"enable":false,"length":10,"fillColor":{"value":"#000000"}}},"number":{"limit":-1,"value":160},"opacity":{"animation":{"enable":true,"minimumValue":0.1,"speed":1,"sync":false},"random":{"enable":false,"minimumValue":1},"value":0.5},"rotate":{"animation":{"enable":false,"speed":0,"sync":false},"direction":"clockwise","random":false,"value":0},"shape":{"character":{"fill":true,"font":"Verdana","style":"","value":"*","weight":"400","close":true},"image":{"height":100,"replaceColor":true,"src":"","width":100,"fill":true,"close":true},"polygon":{"close":true,"fill":true,"sides":5},"type":"circle","custom":{}},"size":{"animation":{"enable":false,"minimumValue":0,"speed":40,"sync":false},"random":{"enable":true,"minimumValue":1},"value":10},"shadow":{"blur":0,"color":{"value":"#000000"},"enable":false,"offset":{"x":0,"y":0}},"stroke":{"color":{"value":"#ff0000"},"width":0,"opacity":1}},"polygon":{"draw":{"enable":false,"stroke":{"color":"rgba(255, 255, 255, .1)","width":0.5,"opacity":0.1}},"enable":false,"inline":{"arrangement":"one-per-point"},"move":{"radius":10,"type":"path"},"scale":1,"type":"inline","url":""},"backgroundMask":{"cover":{"color":{"value":"#fff"},"opacity":1},"enable":false},"pauseOnBlur":true,"background":{"color":"#0d47a1","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/reduceDuplicates.json
var reduceDuplicates_namespaceObject = JSON.parse('{"name":"Reduce Duplicates","particles":{"color":{"value":"#ffffff"},"move":{"direction":"none","enable":true,"outModes":"bounce","random":false,"speed":2,"straight":false},"number":{"value":16},"opacity":{"value":1},"reduceDuplicates":true,"rotate":{"animation":{"enable":true,"speed":5,"sync":false},"direction":"random","value":{"min":0,"max":360}},"shape":{"options":{"image":[{"src":"https://particles.js.org/images/fruits/apple.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/avocado.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/banana.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/berries.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/cherry.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/grapes.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/lemon.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/orange.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/peach.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/pear.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/pepper.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/plum.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/star.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/strawberry.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/watermelon.png","width":32,"height":32},{"src":"https://particles.js.org/images/fruits/watermelon_slice.png","width":32,"height":32}]},"type":"image"},"size":{"value":16}},"background":{"color":"#fff"}}');
;// CONCATENATED MODULE: ./dist/browser/repulse.json
var repulse_namespaceObject = JSON.parse('{"name":"Repulse","particles":{"groups":{"green":{"number":{"value":30},"color":{"value":"#00ff00"},"repulse":{"enabled":true,"distance":50,"factor":20}},"yellow":{"number":{"value":30},"color":{"value":"#ffff00"},"repulse":{"enabled":false,"distance":0}},"blue":{"number":{"value":30},"color":{"value":"#0000ff"},"repulse":{"enabled":true,"distance":50}},"cyan":{"number":{"value":30},"color":{"value":"#00ffff"},"repulse":{"enabled":false,"distance":0}}},"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":false,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":1,"random":false,"animation":{"enable":false,"speed":3,"minimumValue":0.1,"sync":false}},"size":{"value":14,"random":{"enable":false,"minimumValue":7},"animation":{"enable":false,"speed":20,"minimumValue":0.1,"sync":false}},"links":{"enable":true,"distance":100,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":3}},"interactivity":{"events":{"onClick":{"enable":true,"mode":"push"}},"modes":{"push":{"quantity":4}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/repulseBack.json
var repulseBack_namespaceObject = JSON.parse('{"name":"Repulse Back","particles":{"number":{"value":200,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"move":{"enable":true,"speed":0}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"}},"modes":{"repulse":{"distance":200,"factor":1,"speed":5,"easing":"ease-out-back"}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/repulseCirc.json
var repulseCirc_namespaceObject = JSON.parse('{"name":"Repulse Circ","particles":{"number":{"value":200,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"move":{"enable":true,"speed":0}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"}},"modes":{"repulse":{"distance":200,"factor":1,"speed":5,"easing":"ease-out-circ"}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/repulseCubic.json
var repulseCubic_namespaceObject = JSON.parse('{"name":"Repulse Cubic","particles":{"number":{"value":200,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"move":{"enable":true,"speed":0}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"}},"modes":{"repulse":{"distance":200,"factor":1,"speed":5,"easing":"ease-out-cubic"}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/repulseExpo.json
var repulseExpo_namespaceObject = JSON.parse('{"name":"Repulse Expo","particles":{"number":{"value":200,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"move":{"enable":true,"speed":0}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"}},"modes":{"repulse":{"distance":200,"factor":1,"speed":5,"easing":"ease-out-expo"}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/repulseQuart.json
var repulseQuart_namespaceObject = JSON.parse('{"name":"Repulse Quart","particles":{"number":{"value":200,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"move":{"enable":true,"speed":0}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"}},"modes":{"repulse":{"distance":200,"factor":1,"speed":5,"easing":"ease-out-quart"}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/repulseQuint.json
var repulseQuint_namespaceObject = JSON.parse('{"name":"Repulse Quint","particles":{"number":{"value":200,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"move":{"enable":true,"speed":0}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"}},"modes":{"repulse":{"distance":200,"factor":1,"speed":5,"easing":"ease-out-quint"}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/repulseSine.json
var repulseSine_namespaceObject = JSON.parse('{"name":"Repulse Sine","particles":{"number":{"value":200,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":0.5},"size":{"value":{"min":1,"max":3}},"move":{"enable":true,"speed":0}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"}},"modes":{"repulse":{"distance":200,"factor":1,"speed":5,"easing":"ease-out-sine"}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/responsive.json
var responsive_namespaceObject = JSON.parse('{"name":"Responsive","particles":{"number":{"value":80,"density":{"enable":false}},"color":{"value":"#ff0000"},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":100,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":3,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"responsive":[{"maxWidth":600,"options":{"particles":{"color":{"value":"#0000ff"},"number":{"value":40}}}},{"maxWidth":1000,"options":{"particles":{"color":{"value":"#00ff00"},"number":{"value":60}}}}],"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/ring.json
var ring_namespaceObject = JSON.parse('{"name":"Ring","particles":{"number":{"value":0,"limit":1000},"color":{"value":"#ffffff"},"move":{"enable":true,"outModes":{"default":"destroy"},"speed":1,"path":{"enable":true,"delay":{"value":0.75}},"trail":{"enable":true,"fillColor":"#031927","length":1000}},"shape":{"type":"circle"},"opacity":{"value":0.05},"size":{"value":1}},"background":{"color":"#031927"},"emitters":{"fill":false,"shape":"circle","position":{"x":50,"y":50},"size":{"width":250,"height":250,"mode":"precise"},"life":{"delay":10,"wait":true},"rate":{"delay":0.1,"quantity":10},"startCount":1000}}');
;// CONCATENATED MODULE: ./dist/browser/seaAnemone.json
var seaAnemone_namespaceObject = JSON.parse('{"name":"Sea Anemone","particles":{"color":{"value":"#FF0000"},"move":{"attract":{"enable":true,"rotate":{"distance":100,"x":2000,"y":2000}},"direction":"none","enable":true,"outModes":{"default":"destroy"},"path":{"clamp":false,"enable":true,"delay":{"value":0},"generator":"curvesPathGenerator"},"random":false,"speed":1,"straight":false,"trail":{"fillColor":"#000","length":30,"enable":true}},"number":{"density":{"enable":true},"value":0},"opacity":{"value":1},"shape":{"type":"circle"},"size":{"value":10,"animation":{"count":1,"startValue":"min","enable":true,"minimumValue":1,"speed":10,"sync":true}}},"background":{"color":"#000"},"emitters":{"direction":"none","rate":{"quantity":5,"delay":0.3},"size":{"width":0,"height":0},"spawnColor":{"value":"#ff0000","animation":{"enable":true,"speed":10}},"position":{"x":50,"y":50}}}');
;// CONCATENATED MODULE: ./dist/browser/shadow.json
var shadow_namespaceObject = JSON.parse('{"name":"Shadow","smooth":true,"particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ffffff"},"shadow":{"enable":true,"color":"#000000","blur":5,"offset":{"x":3,"y":3}},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":5,"random":true,"animation":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1,"shadow":{"enable":true,"blur":5,"color":"#000000"}},"move":{"enable":true,"speed":2,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse","parallax":{"enable":false,"force":60,"smooth":10}},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#0d47a1"}}');
;// CONCATENATED MODULE: ./dist/browser/shapeBubble.json
var shapeBubble_namespaceObject = JSON.parse('{"name":"Shape Bubble","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"bubble"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":50,"random":{"enable":true,"minimumValue":5},"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/shapeHeart.json
var shapeHeart_namespaceObject = JSON.parse('{"name":"Shape Heart","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"heart"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":10,"random":{"enable":true,"minimumValue":5},"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":100,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/shapeMultilineText.json
var shapeMultilineText_namespaceObject = JSON.parse('{"name":"Shape Multiline Text","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"multiline-text","options":{"multiline-text":{"value":"pippo\\npluto"}}},"opacity":{"value":{"min":0.5,"max":1}},"size":{"value":{"min":16,"max":32}},"move":{"enable":true,"speed":6}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/shapeOptions.json
var shapeOptions_namespaceObject = JSON.parse('{"name":"Shape Options","particles":{"color":{"value":"#000"},"move":{"direction":"none","enable":true,"speed":6},"number":{"value":80},"rotate":{"value":45,"path":true},"opacity":{"value":1},"shape":{"image":[{"height":128,"src":"https://particles.js.org/images/plane_alt.png","width":128},{"height":128,"src":"https://particles.js.org/images/plane_alt.png","width":128,"particles":{"rotate":{"value":0},"size":{"animation":{"enable":true,"speed":64}}}}],"type":"image"},"size":{"value":{"min":16,"max":32}}}}');
;// CONCATENATED MODULE: ./dist/browser/shapePath.json
var shapePath_namespaceObject = JSON.parse('{"name":"Shape Path","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"path","options":{"path":[{"segments":[{"type":"line","values":[{"x":-0.5,"y":-0.5}]},{"type":"bezier","values":[{"x":-0.5,"y":0.5},{"x":1,"y":1},{"x":1,"y":0.5},{"x":1,"y":-0.5}]},{"type":"quadratic","values":[{"x":0.5,"y":0.5},{"x":0.5,"y":-0.5},{"x":-0.5,"y":0.5}]},{"type":"line","values":[{"x":0.5,"y":-0.5}]}],"half":false},{"segments":[{"type":"line","values":[{"x":-1,"y":-1}]},{"type":"bezier","values":[{"x":-1,"y":1},{"x":1,"y":1},{"x":0.5,"y":1},{"x":-0.5,"y":1}]},{"type":"quadratic","values":[{"x":1,"y":1},{"x":1,"y":-1},{"x":-1,"y":1}]},{"type":"line","values":[{"x":1,"y":-1}]}],"half":false}]}},"opacity":{"value":0.5},"size":{"value":{"min":5,"max":50}},"move":{"enable":true,"speed":6,"direction":"none"}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/shapeRoundedRect.json
var shapeRoundedRect_namespaceObject = JSON.parse('{"name":"Shape Rounded Rect","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"rotate":{"value":0,"random":true,"direction":"clockwise","animation":{"enable":true,"speed":5,"sync":false}},"shape":{"type":"rounded-rect","options":{"rounded-rect":{"radius":5}}},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":30},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/shapeSpiral.json
var shapeSpiral_namespaceObject = JSON.parse('{"name":"Shape Spiral","particles":{"number":{"value":80,"density":{"enable":true}},"stroke":{"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"width":1},"shape":{"type":"spiral","options":{"spiral":{"innerRadius":0.5,"lineSpacing":0.5,"fill":false,"close":false}}},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":10,"random":{"enable":true,"minimumValue":5},"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"links":{"enable":false,"distance":100,"color":"#ffffff","opacity":0.4,"width":1},"rotate":{"animation":{"enable":true,"speed":20,"sync":false}},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/slow.json
var slow_namespaceObject = JSON.parse('{"name":"Slow","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":5,"random":true,"animation":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":20,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"slow","parallax":{"enable":false,"force":60,"smooth":10}},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2},"slow":{"radius":100,"factor":3}}},"background":{"color":"#0d47a1"}}');
;// CONCATENATED MODULE: ./dist/browser/snow.json
var snow_namespaceObject = JSON.parse('{"name":"Snow","particles":{"number":{"value":400,"density":{"enable":true}},"color":{"value":"#fff"},"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":10},"move":{"enable":true,"speed":2,"direction":"bottom","random":false,"straight":true},"wobble":{"enable":true,"distance":10,"speed":10},"zIndex":{"enable":true,"value":{"min":0,"max":100},"opacityRate":10,"sizeRate":10,"velocityRate":10}},"background":{"color":"#333333"}}');
;// CONCATENATED MODULE: ./dist/browser/soundsAudio.json
var soundsAudio_namespaceObject = JSON.parse('{"name":"Sounds Audio","particles":{"number":{"value":0},"color":{"value":"#ff0000","animation":{"enable":true,"speed":120,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":{"min":3,"max":6}},"move":{"enable":true,"speed":6,"direction":"none","outModes":"destroy"}},"background":{"color":"#000000"},"emitters":{"position":{"x":50,"y":50},"rate":{"quantity":1,"delay":0.3},"size":{"width":0,"height":0}},"sounds":{"enable":true,"events":[{"event":"particleRemoved","audio":["https://particles.js.org/audio/explosion0.mp3","https://particles.js.org/audio/explosion1.mp3","https://particles.js.org/audio/explosion2.mp3"]}],"volume":100}}');
;// CONCATENATED MODULE: ./dist/browser/soundsLoop.json
var soundsLoop_namespaceObject = JSON.parse('{"name":"Sounds Loop","particles":{"number":{"value":0},"color":{"value":"#ff0000","animation":{"enable":true,"speed":120,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":{"min":3,"max":6}},"move":{"enable":true,"speed":6,"direction":"none","outModes":"destroy"}},"background":{"color":"#000000"},"emitters":{"position":{"x":50,"y":50},"rate":{"quantity":1,"delay":0.3},"size":{"width":0,"height":0}},"sounds":{"enable":true,"events":[{"event":"soundsUnmuted","audio":{"loop":true,"source":"https://particles.js.org/audio/nyancat-loop.mp3"}}],"volume":100}}');
;// CONCATENATED MODULE: ./dist/browser/soundsMelodies.json
var soundsMelodies_namespaceObject = JSON.parse('{"name":"Sounds Melodies","particles":{"number":{"value":0},"color":{"value":"#ff0000","animation":{"enable":true,"speed":120,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":{"min":3,"max":6}},"move":{"enable":true,"speed":6,"direction":"none","outModes":"destroy"}},"background":{"color":"#000000"},"emitters":{"position":{"x":50,"y":50},"rate":{"quantity":1,"delay":0.3},"size":{"width":0,"height":0}},"sounds":{"enable":true,"events":[{"event":"particleAdded","melodies":[{"notes":[{"duration":500,"value":["C5","E5","G5"]},{"duration":1000,"value":["D5","F5","A5"]}]}]},{"event":"particleRemoved","melodies":[{"notes":[{"duration":500,"value":["E5","G5","B5"]}]}]}],"volume":10}}');
;// CONCATENATED MODULE: ./dist/browser/soundsMelodyLoop.json
var soundsMelodyLoop_namespaceObject = JSON.parse('{"name":"Sounds Melody Loop","particles":{"number":{"value":0},"color":{"value":"#ff0000","animation":{"enable":true,"speed":120,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":{"min":3,"max":6}},"move":{"enable":true,"speed":6,"direction":"none","outModes":"destroy"}},"background":{"color":"#000000"},"emitters":{"position":{"x":50,"y":50},"rate":{"quantity":1,"delay":0.3},"size":{"width":0,"height":0}},"sounds":{"enable":true,"events":[{"event":"soundsUnmuted","melodies":[{"loop":true,"melodies":[{"notes":[{"duration":217.39,"value":"E5"},{"duration":217.39,"value":"Eb5"},{"duration":217.39,"value":"E5"},{"duration":217.39,"value":"Eb5"},{"duration":217.39,"value":"E5"},{"duration":217.39,"value":"B4"},{"duration":217.39,"value":"D5"},{"duration":217.39,"value":"C5"},{"duration":434.78,"value":"A4"},{"duration":217.39,"value":"pause"},{"duration":217.39,"value":"C4"},{"duration":217.39,"value":"E4"},{"duration":217.39,"value":"A4"},{"duration":434.78,"value":"B4"},{"duration":217.39,"value":"pause"},{"duration":217.39,"value":"E4"},{"duration":217.39,"value":"Ab4"},{"duration":217.39,"value":"B4"},{"duration":434.78,"value":"C5"},{"duration":217.39,"value":"pause"},{"duration":217.39,"value":"E4"},{"duration":217.39,"value":"E5"},{"duration":217.39,"value":"Eb5"},{"duration":217.39,"value":"E5"},{"duration":217.39,"value":"Eb5"},{"duration":217.39,"value":"E5"},{"duration":217.39,"value":"B4"},{"duration":217.39,"value":"D5"},{"duration":217.39,"value":"C5"},{"duration":434.78,"value":"A4"},{"duration":217.39,"value":"pause"},{"duration":217.39,"value":"C4"},{"duration":217.39,"value":"E4"},{"duration":217.39,"value":"A4"},{"duration":434.78,"value":"B4"},{"duration":217.39,"value":"pause"},{"duration":217.39,"value":"E4"},{"duration":217.39,"value":"C5"},{"duration":217.39,"value":"B4"},{"duration":434.78,"value":"A4"},{"duration":434.78,"value":"pause"}]},{"notes":[{"duration":1739.12,"value":"pause"},{"duration":217.39,"value":"A2"},{"duration":217.39,"value":"E3"},{"duration":217.39,"value":"A3"},{"duration":652.17,"value":"pause"},{"duration":217.39,"value":"E2"},{"duration":217.39,"value":"B2"},{"duration":217.39,"value":"E3"},{"duration":652.17,"value":"pause"},{"duration":217.39,"value":"A2"},{"duration":217.39,"value":"E3"},{"duration":217.39,"value":"A3"},{"duration":1956.51,"value":"pause"},{"duration":217.39,"value":"A2"},{"duration":217.39,"value":"E3"},{"duration":217.39,"value":"A3"},{"duration":652.17,"value":"pause"},{"duration":217.39,"value":"E2"},{"duration":217.39,"value":"B2"},{"duration":217.39,"value":"E3"},{"duration":652.17,"value":"pause"},{"duration":217.39,"value":"A2"},{"duration":217.39,"value":"E3"},{"duration":217.39,"value":"A3"},{"duration":217.39,"value":"pause"}]}]}]}],"volume":10}}');
;// CONCATENATED MODULE: ./dist/browser/soundsNotes.json
var soundsNotes_namespaceObject = JSON.parse('{"name":"Sounds Notes","particles":{"number":{"value":0},"color":{"value":"#ff0000","animation":{"enable":true,"speed":120,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":{"min":3,"max":6}},"move":{"enable":true,"speed":6,"direction":"none","outModes":"destroy"}},"background":{"color":"#000000"},"emitters":{"position":{"x":50,"y":50},"rate":{"quantity":1,"delay":0.3},"size":{"width":0,"height":0}},"sounds":{"enable":true,"events":[{"event":"particleAdded","notes":[{"duration":500,"value":["C5","E5","G5"]},{"duration":1000,"value":["D5","F5","A5"]}]},{"event":"particleRemoved","notes":[{"duration":500,"value":["E5","G5","B5"]}]}],"volume":10}}');
;// CONCATENATED MODULE: ./dist/browser/speedDecay.json
var speedDecay_namespaceObject = JSON.parse('{"name":"Speed Decay","particles":{"number":{"value":0},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":1,"minimumValue":0.1,"sync":false}},"size":{"value":15,"random":{"enable":true,"minimumValue":10},"animation":{"enable":false,"speed":40,"minimumValue":0.1,"sync":false}},"links":{"enable":false},"life":{"duration":{"sync":true,"value":5},"count":1},"move":{"enable":true,"gravity":{"enable":true},"speed":10,"direction":"none","random":false,"straight":false,"outModes":{"default":"bounce","bottom":"bounce","left":"destroy","right":"destroy","top":"none"},"trail":{"enable":true,"fillColor":"#000000","length":10}}},"interactivity":{"events":{"onHover":{"enable":false,"mode":"repulse","parallax":{"enable":false,"force":60,"smooth":10}},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#000"},"emitters":{"direction":"top","life":{"count":0,"duration":5,"delay":2},"rate":{"delay":0.1,"quantity":1},"size":{"width":0,"height":0},"particles":{"bounce":{"vertical":{"value":0.8,"random":{"enable":true,"minimValue":0.4}}},"color":{"value":["#5bc0eb","#fde74c","#9bc53d","#e55934","#fa7921"]},"links":{"enable":false},"size":{"value":10,"random":{"enable":true,"minimumValue":5}},"opacity":{"value":0.5},"move":{"speed":30,"random":false,"decay":0.1}}}}');
;// CONCATENATED MODULE: ./dist/browser/spin.json
var spin_namespaceObject = JSON.parse('{"name":"Spin","particles":{"number":{"value":80,"density":{"enable":false}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":10,"random":false,"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"move":{"enable":true,"speed":{"min":1,"max":5},"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200},"spin":{"acceleration":{"min":-1,"max":1},"enable":true},"trail":{"enable":true,"fillColor":"#000","length":30}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/star.json
var star_namespaceObject = JSON.parse('{"name":"Star","particles":{"number":{"value":10,"density":{"enable":false}},"color":{"value":"#fff"},"shape":{"type":"star","options":{"star":{"sides":5}}},"opacity":{"value":0.8,"random":false,"animation":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":4,"random":false,"animation":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"rotate":{"value":0,"random":true,"direction":"clockwise","animation":{"enable":true,"speed":5,"sync":false}},"links":{"enable":true,"distance":600,"color":"#ffffff","opacity":0.4,"width":2},"move":{"enable":true,"speed":2,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"grab"},"onClick":{"enable":true,"mode":"bubble"}},"modes":{"grab":{"distance":400,"links":{"opacity":1,"color":"#f00"}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"color":"#ffff00"},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#111"}}');
;// CONCATENATED MODULE: ./dist/browser/strokeAnimation.json
var strokeAnimation_namespaceObject = JSON.parse('{"name":"Stroke Animation","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000","animation":{"enable":true,"speed":60,"sync":true}},"stroke":{"width":3,"color":{"value":"#0000ff","animation":{"enable":true,"speed":60,"sync":true}}},"shape":{"type":"circle"},"opacity":{"value":0.5,"random":false,"animation":{"enable":false,"speed":3,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"animation":{"enable":false,"speed":20,"size_min":0.1,"sync":false}},"links":{"enable":true,"distance":100,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#000000"}}');
;// CONCATENATED MODULE: ./dist/browser/style.json
var style_namespaceObject = JSON.parse('{"name":"Style","particles":{"number":{"value":200,"limit":200},"color":{"value":["#ff0000","#00ff00","#0000ff","#ffff00","#ff00ff","#00ffff"],"animation":{"enable":true,"speed":20,"sync":false}},"shape":{"type":["circle","square","triangle","star","polygon"]},"opacity":{"value":0.5},"size":{"value":{"min":50,"max":100}},"move":{"enable":true,"speed":6,"direction":"none","trail":{"enable":true,"length":50},"path":{"enable":true,"delay":{"value":0.1},"options":{"size":50,"draw":false,"increment":0.001},"generator":"perlinNoise"}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"trail"},"onClick":{"enable":true,"mode":"push"}},"modes":{"push":{"quantity":4},"trail":{"delay":0.1,"pauseOnStop":true}}},"background":{"color":"#000000"},"style":{"filter":"blur(50px)"}}');
;// CONCATENATED MODULE: ./dist/browser/svgReplace.json
var svgReplace_namespaceObject = JSON.parse('{"name":"SVG Replace","interactivity":{"events":{"onClick":{"enable":true,"mode":"push"},"onDiv":{"elementId":"repulse-div","enable":false,"mode":"repulse"},"onHover":{"enable":true,"mode":"bubble","parallax":{"enable":false,"force":60,"smooth":10}}},"modes":{"bubble":{"distance":400,"duration":2,"opacity":0.8,"size":40},"connect":{"distance":80,"links":{"opacity":0.5},"radius":60},"grab":{"distance":400,"links":{"opacity":1}},"push":{"quantity":4},"remove":{"quantity":2},"repulse":{"distance":200,"duration":0.4}}},"particles":{"color":{"value":"#00f"},"links":{"blink":false,"color":"#000","consent":false,"distance":150,"enable":false,"opacity":0.4,"width":1},"move":{"attract":{"enable":false,"rotate":{"x":600,"y":1200}},"bounce":false,"direction":"none","enable":true,"random":false,"speed":2,"straight":false},"number":{"density":{"enable":true},"limit":0,"value":80},"opacity":{"animation":{"enable":false,"speed":1,"sync":false},"value":{"min":0.1,"max":1}},"rotate":{"animation":{"enable":true,"speed":5,"sync":false},"direction":"random","random":true,"value":0},"shape":{"options":{"image":{"src":"/images/canine.svg","width":32,"height":32,"replaceColor":true}},"type":"image"},"size":{"animation":{"enable":false,"minimumValue":0.1,"speed":40,"sync":false},"random":false,"value":16}},"polygon":{"draw":{"enable":false,"lineColor":"#ffffff","lineWidth":0.5},"move":{"radius":10},"scale":1,"type":"none","url":""},"background":{"color":"#fff","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/test.json
var test_namespaceObject = JSON.parse('{"name":"Test","background":{"color":"#000"},"particles":{"color":{"value":"#ffffff"},"size":{"value":{"min":0,"max":6},"animation":{"enable":true,"speed":3,"sync":false,"destroy":"none","startValue":"min"}},"move":{"enable":true,"speed":3,"random":false,"size":true},"number":{"density":{"enable":true},"value":80},"opacity":{"value":0.5},"shape":{"type":"circle"}}}');
;// CONCATENATED MODULE: ./dist/browser/textMask.json
var textMask_namespaceObject = JSON.parse('{"name":"Text Mask","smooth":true,"interactivity":{"events":{"onHover":{"enable":true,"mode":"bubble","parallax":{"enable":false,"force":2,"smooth":10}}},"modes":{"bubble":{"distance":40,"duration":2,"opacity":8,"size":15}}},"particles":{"move":{"direction":"none","distance":2,"enable":true,"speed":1},"number":{"value":600},"color":{"value":"random"},"shape":{"type":["circle","square","triangle"]},"size":{"value":{"min":1,"max":3}}},"canvasMask":{"enable":true,"override":{"color":false},"scale":1,"pixels":{"filter":"pixelTextFilter"},"position":{"x":70,"y":30},"text":{"color":"#ff0000","font":{"size":500},"text":"Hello"}},"background":{"color":"#000000","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/textMaskMultiline.json
var textMaskMultiline_namespaceObject = JSON.parse('{"name":"Text Mask Multiline","smooth":true,"interactivity":{"events":{"onHover":{"enable":true,"mode":"bubble","parallax":{"enable":false,"force":2,"smooth":10}}},"modes":{"bubble":{"distance":40,"duration":2,"opacity":8,"size":15}}},"particles":{"move":{"direction":"none","distance":2,"enable":true,"speed":1},"number":{"value":600},"color":{"value":"random"},"shape":{"type":["circle","square","triangle"]},"size":{"value":{"min":1,"max":3}}},"canvasMask":{"enable":true,"override":{"color":false},"scale":1,"pixels":{"filter":"pixelTextFilter"},"position":{"x":50,"y":50},"text":{"color":"#ff0000","font":{"size":300},"text":"Hello\\nWorld\\nHello\\nWorld","lines":{"spacing":50}}},"background":{"color":"#000000","image":"","position":"50% 50%","repeat":"no-repeat","size":"cover"}}');
;// CONCATENATED MODULE: ./dist/browser/trail.json
var trail_namespaceObject = JSON.parse('{"name":"Trails","background":{"color":"#000"},"emitters":{"position":{"x":50,"y":50},"size":{"width":50,"height":50,"mode":"precise"},"rate":{"delay":1,"quantity":10}},"particles":{"number":{"value":0,"limit":300},"color":{"value":["#5bc0eb","#fde74c","#9bc53d","#e55934","#fa7921"]},"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":1},"links":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":1,"direction":"none","random":false,"straight":false,"outModes":{"default":"destroy"},"bounce":false,"path":{"enable":true,"delay":{"value":0.1},"options":{"size":5,"draw":false,"increment":0.001},"generator":"perlinNoise"},"trail":{"enable":true,"fillColor":"#000000","length":20},"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":false,"mode":"grab"},"onClick":{"enable":false,"mode":"repulse"}},"modes":{"grab":{"distance":200,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}}}');
;// CONCATENATED MODULE: ./dist/browser/trailImage.json
var trailImage_namespaceObject = JSON.parse('{"name":"Trails Image","background":{"color":"#ffffff","image":"url(\'https://particles.js.org/images/background3.jpg\')","position":"50% 50%","repeat":"no-repeat","size":"cover"},"emitters":{"position":{"x":50,"y":50},"size":{"width":50,"height":50,"mode":"precise"},"rate":{"delay":1,"quantity":10}},"particles":{"number":{"value":0,"limit":300},"color":{"value":["#5bc0eb","#fde74c","#9bc53d","#e55934","#fa7921"]},"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":1},"links":{"enable":false,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":1,"direction":"none","random":false,"straight":false,"outModes":{"default":"destroy"},"bounce":false,"path":{"enable":true,"delay":{"value":0.1},"options":{"size":5,"draw":false,"increment":0.001},"generator":"perlinNoise"},"trail":{"enable":true,"fill":{"image":"https://particles.js.org/images/background3.jpg"},"length":20},"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"events":{"onHover":{"enable":false,"mode":"grab"},"onClick":{"enable":false,"mode":"repulse"}},"modes":{"grab":{"distance":200,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}}}');
;// CONCATENATED MODULE: ./dist/browser/twinkle.json
var twinkle_namespaceObject = JSON.parse('{"name":"Twinkle","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ff0000"},"shape":{"type":"circle"},"opacity":{"value":{"min":0.1,"max":0.5},"animation":{"enable":true,"speed":3,"sync":false}},"size":{"value":{"min":0.1,"max":5},"animation":{"enable":true,"speed":20,"sync":false}},"links":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":2},"twinkle":{"particles":{"enable":true,"color":"#ffff00","frequency":0.05,"opacity":1},"lines":{"enable":true,"color":"#ff0000","frequency":0.005,"opacity":1}}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"grab":{"distance":400,"links":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":0.8},"repulse":{"distance":200},"push":{"quantity":4},"remove":{"quantity":2}}},"background":{"color":"#0d47a1"}}');
;// CONCATENATED MODULE: ./dist/browser/vibrate.json
var vibrate_namespaceObject = JSON.parse('{"name":"Vibrate","particles":{"number":{"value":80,"density":{"enable":true}},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":{"min":0.1,"max":0.5},"animation":{"enable":true,"speed":3,"sync":false}},"size":{"value":{"min":0.1,"max":5},"animation":{"enable":true,"speed":20}},"links":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":0,"vibrate":true}},"interactivity":{"events":{"onHover":{"enable":true,"mode":"repulse"},"onClick":{"enable":true,"mode":"push"}},"modes":{"repulse":{"distance":200},"push":{"quantity":4}}},"background":{"color":"#0d47a1"}}');
;// CONCATENATED MODULE: ./dist/browser/virus.json
var virus_namespaceObject = JSON.parse('{"name":"Virus","interactivity":{"events":{"onClick":{"enable":true,"mode":"push"},"onHover":{"enable":true,"mode":"bubble"}},"modes":{"bubble":{"distance":400,"duration":2,"opacity":0.8,"size":40},"push":{"quantity":4}}},"particles":{"color":{"value":"#ffffff"},"links":{"color":"#323031","distance":150,"enable":false,"opacity":0.4,"width":1},"move":{"enable":true,"outModes":"bounce","speed":6},"number":{"density":{"enable":true},"value":170},"opacity":{"value":0.5},"shape":{"options":{"image":{"height":32,"replace_color":true,"src":"https://particles.js.org/images/sars-cov-2.png","width":32}},"type":"image"},"size":{"value":16}},"background":{"color":"#323031"}}');
;// CONCATENATED MODULE: ./dist/browser/warp.json
var warp_namespaceObject = JSON.parse('{"name":"Warp","fullScreen":false,"fpsLimit":120,"manualParticles":[{"position":{"x":2,"y":2}},{"position":{"x":2,"y":98}},{"position":{"x":98,"y":2}},{"position":{"x":98,"y":98}},{"position":{"x":3,"y":1}},{"position":{"x":99,"y":2}},{"position":{"x":3,"y":2}},{"position":{"x":99,"y":1}}],"particles":{"number":{"value":0},"color":{"value":"#ffffff"},"shape":{"type":"circle"},"opacity":{"value":1},"size":{"value":3},"links":{"enable":true,"distance":150,"color":"#ffffff","warp":true,"opacity":1,"width":1},"move":{"enable":false,"speed":2,"direction":"none","random":false,"straight":false,"outModes":"out","warp":true}},"background":{"color":"#0d47a1"}}');
;// CONCATENATED MODULE: ./dist/browser/wobble.json
var wobble_namespaceObject = JSON.parse('{"name":"Wobble","background":{"color":"#000000"},"particles":{"bounce":{"vertical":{"value":0},"horizontal":{"value":0}},"color":{"value":["#1E00FF","#FF0061","#E1FF00","#00FF9E"],"animation":{"enable":true,"speed":30}},"move":{"decay":{"min":0.05,"max":0.15},"direction":"top","enable":true,"gravity":{"acceleration":9.81,"enable":true,"maxSpeed":200},"outModes":{"top":"none","default":"destroy"},"speed":{"min":50,"max":150}},"number":{"value":0,"limit":300},"opacity":{"value":1,"animation":{"enable":false,"startValue":"max","destroy":"min","speed":0.3,"sync":true}},"rotate":{"value":{"min":0,"max":360},"direction":"random","move":true,"animation":{"enable":true,"speed":60}},"tilt":{"direction":"random","enable":true,"move":true,"value":{"min":0,"max":360},"animation":{"enable":true,"speed":60}},"shape":{"type":["circle","square","polygon"],"options":{"polygon":[{"sides":5},{"sides":6}]}},"size":{"value":3},"roll":{"darken":{"enable":true,"value":30},"enlighten":{"enable":true,"value":30},"enable":true,"mode":"both","speed":{"min":15,"max":25}},"wobble":{"distance":30,"enable":true,"move":true,"speed":{"min":-15,"max":15}}},"emitters":{"position":{"x":50,"y":100},"size":{"width":0,"height":0},"rate":{"quantity":10,"delay":0.05}}}');
;// CONCATENATED MODULE: ./dist/browser/zIndex.json
var zIndex_namespaceObject = JSON.parse('{"name":"Z Index","particles":{"groups":{"z5000":{"number":{"value":70},"zIndex":{"value":50}},"z7500":{"number":{"value":30},"zIndex":{"value":75}},"z2500":{"number":{"value":50},"zIndex":{"value":25}},"z1000":{"number":{"value":40},"zIndex":{"value":10}}},"number":{"value":200},"color":{"value":"#fff","animation":{"enable":false,"speed":20,"sync":true}},"shape":{"type":"circle"},"opacity":{"value":1,"random":false,"animation":{"enable":false,"speed":3,"minimumValue":0.1,"sync":false}},"size":{"value":3},"move":{"angle":{"value":10,"offset":0},"enable":true,"speed":5,"direction":"right"},"zIndex":{"value":5,"opacityRate":0.5}},"interactivity":{"events":{"onClick":{"enable":true,"mode":"push"}},"modes":{"push":{"quantity":4,"groups":["z5000","z7500","z2500","z1000"]}}},"background":{"color":"#000000"}}');
// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(961);
;// CONCATENATED MODULE: ./dist/browser/index.js




























































































































const absorbers = absorbers_namespaceObject,
  amongUs = amongUs_namespaceObject,
  backgroundMask = backgroundMask_namespaceObject,
  basic = basic_namespaceObject,
  big = big_namespaceObject,
  blackHole = blackHole_namespaceObject,
  bubble = bubble_namespaceObject,
  cards = cards_namespaceObject,
  chars = chars_namespaceObject,
  clickPause = clickPause_namespaceObject,
  collisionsAbsorb = collisionsAbsorb_namespaceObject,
  collisionsBounce = collisionsBounce_namespaceObject,
  collisionsDestroy = collisionsDestroy_namespaceObject,
  colorAnimation = colorAnimation_namespaceObject,
  connect = connect_namespaceObject,
  customPreset = customPreset_namespaceObject,
  customShape = customShape_namespaceObject,
  dataImages = dataImages_namespaceObject,
  delay = delay_namespaceObject,
  destroy = destroy_namespaceObject,
  disappearing = disappearing_namespaceObject,
  divEvents = divEvents_namespaceObject,
  emitter = emitter_namespaceObject,
  emitterAbsorber = emitterAbsorber_namespaceObject,
  emitterAngled = emitterAngled_namespaceObject,
  emitterImages = emitterImages_namespaceObject,
  emitterPaths = emitterPaths_namespaceObject,
  emitterShapes = emitterShapes_namespaceObject,
  fireworks = fireworks_namespaceObject,
  fontawesome = fontawesome_namespaceObject,
  forward = forward_namespaceObject,
  grabRandomColor = grabRandomColor_namespaceObject,
  gradients = gradients_namespaceObject,
  gravity = gravity_namespaceObject,
  growing = growing_namespaceObject,
  hexagonPath = hexagonPath_namespaceObject,
  hollowknight = hollowknight_namespaceObject,
  hyperspace = hyperspace_namespaceObject,
  imageMask = imageMask_namespaceObject,
  browser_images = images_namespaceObject,
  imagesDirections = imagesDirections_namespaceObject,
  infection = infection_namespaceObject,
  life = life_namespaceObject,
  lightHover = lightHover_namespaceObject,
  linkTriangles = linkTriangles_namespaceObject,
  localPolygonMask = localPolygonMask_namespaceObject,
  manual = manual_namespaceObject,
  motionDisable = motionDisable_namespaceObject,
  motionReduce = motionReduce_namespaceObject,
  mouseAttract = mouseAttract_namespaceObject,
  mouseBounce = mouseBounce_namespaceObject,
  mouseFollow = mouseFollow_namespaceObject,
  mouseTrail = mouseTrail_namespaceObject,
  moveAngle = moveAngle_namespaceObject,
  moveDistance = moveDistance_namespaceObject,
  moveInside = moveInside_namespaceObject,
  moveOutside = moveOutside_namespaceObject,
  multipleClickEmitters = multipleClickEmitters_namespaceObject,
  multiplePolygonMasks = multiplePolygonMasks_namespaceObject,
  nasa = nasa_namespaceObject,
  noconfig = noconfig_namespaceObject,
  noisePlanes = noisePlanes_namespaceObject,
  nyancat = nyancat_namespaceObject,
  nyancat2 = nyancat2_namespaceObject,
  orbit = orbit_namespaceObject,
  parallax = parallax_namespaceObject,
  pathPolygonMask = pathPolygonMask_namespaceObject,
  planes = planes_namespaceObject,
  plasma = plasma_namespaceObject,
  polygonMask = polygonMask_namespaceObject,
  polygons = polygons_namespaceObject,
  random = random_namespaceObject,
  reactBubbles = reactBubbles_namespaceObject,
  reactDefaults = reactDefaults_namespaceObject,
  reactMultipleImages = reactMultipleImages_namespaceObject,
  reactNightSky = reactNightSky_namespaceObject,
  reactPolygonMask = reactPolygonMask_namespaceObject,
  reactSimple = reactSimple_namespaceObject,
  reactSnow = reactSnow_namespaceObject,
  reduceDuplicates = reduceDuplicates_namespaceObject,
  repulse = repulse_namespaceObject,
  repulseBack = repulseBack_namespaceObject,
  repulseCirc = repulseCirc_namespaceObject,
  repulseCubic = repulseCubic_namespaceObject,
  repulseExpo = repulseExpo_namespaceObject,
  repulseQuart = repulseQuart_namespaceObject,
  repulseQuint = repulseQuint_namespaceObject,
  repulseSine = repulseSine_namespaceObject,
  responsive = responsive_namespaceObject,
  ring = ring_namespaceObject,
  seaAnemone = seaAnemone_namespaceObject,
  shadow = shadow_namespaceObject,
  shapeBubble = shapeBubble_namespaceObject,
  shapeHeart = shapeHeart_namespaceObject,
  shapeMultilineText = shapeMultilineText_namespaceObject,
  shapeOptions = shapeOptions_namespaceObject,
  shapePath = shapePath_namespaceObject,
  shapeRoundedRect = shapeRoundedRect_namespaceObject,
  shapeSpiral = shapeSpiral_namespaceObject,
  slow = slow_namespaceObject,
  snow = snow_namespaceObject,
  soundsAudio = soundsAudio_namespaceObject,
  soundsLoop = soundsLoop_namespaceObject,
  soundsMelodies = soundsMelodies_namespaceObject,
  soundsMelodyLoop = soundsMelodyLoop_namespaceObject,
  soundsNotes = soundsNotes_namespaceObject,
  speedDecay = speedDecay_namespaceObject,
  spin = spin_namespaceObject,
  star = star_namespaceObject,
  strokeAnimation = strokeAnimation_namespaceObject,
  style = style_namespaceObject,
  svgReplace = svgReplace_namespaceObject,
  test = test_namespaceObject,
  textMask = textMask_namespaceObject,
  textMaskMultiline = textMaskMultiline_namespaceObject,
  trail = trail_namespaceObject,
  trailImage = trailImage_namespaceObject,
  twinkle = twinkle_namespaceObject,
  vibrate = vibrate_namespaceObject,
  virus = virus_namespaceObject,
  warp = warp_namespaceObject,
  wobble = wobble_namespaceObject,
  zIndex = zIndex_namespaceObject;
const mainConfigs = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.tsParticles;
mainConfigs.configs = {
  absorbers,
  amongUs,
  backgroundMask,
  basic,
  big,
  blackHole,
  bubble,
  cards,
  chars,
  clickPause,
  collisionsAbsorb,
  collisionsBounce,
  collisionsDestroy,
  colorAnimation,
  connect,
  customPreset,
  customShape,
  dataImages,
  delay,
  destroy,
  disappearing,
  divEvents,
  emitter,
  emitterAbsorber,
  emitterAngled,
  emitterImages,
  emitterPaths,
  emitterShapes,
  fireworks,
  fontawesome,
  forward,
  grabRandomColor,
  gradients,
  gravity,
  growing,
  hexagonPath,
  hollowknight,
  hyperspace,
  imageMask,
  images: browser_images,
  imagesDirections,
  infection,
  life,
  lightHover,
  linkTriangles,
  localPolygonMask,
  manual,
  motionDisable,
  motionReduce,
  mouseAttract,
  mouseBounce,
  mouseFollow,
  mouseTrail,
  moveAngle,
  moveDistance,
  moveInside,
  moveOutside,
  multipleClickEmitters,
  multiplePolygonMasks,
  nasa,
  noconfig,
  noisePlanes,
  nyancat,
  nyancat2,
  orbit,
  parallax,
  pathPolygonMask,
  planes,
  plasma,
  polygonMask,
  polygons,
  random,
  reactBubbles,
  reactDefaults,
  reactMultipleImages,
  reactNightSky,
  reactPolygonMask,
  reactSimple,
  reactSnow,
  reduceDuplicates,
  repulse,
  repulseBack,
  repulseCirc,
  repulseCubic,
  repulseExpo,
  repulseQuart,
  repulseQuint,
  repulseSine,
  responsive,
  ring,
  seaAnemone,
  shadow,
  shapeBubble,
  shapeHeart,
  shapeMultilineText,
  shapeOptions,
  shapePath,
  shapeRoundedRect,
  shapeSpiral,
  slow,
  snow,
  soundsAudio,
  soundsLoop,
  soundsMelodies,
  soundsMelodyLoop,
  soundsNotes,
  speedDecay,
  spin,
  star,
  strokeAnimation,
  style,
  svgReplace,
  test,
  textMask,
  textMaskMultiline,
  trail,
  trailImage,
  twinkle,
  vibrate,
  virus,
  warp,
  wobble,
  zIndex
};

}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});