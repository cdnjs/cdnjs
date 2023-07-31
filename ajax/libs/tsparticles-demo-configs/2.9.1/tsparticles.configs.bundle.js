/*!
 * Author : Matteo Bruni
 * MIT license: https://opensource.org/licenses/MIT
 * Demo / Generator : https://particles.js.org/
 * GitHub : https://www.github.com/matteobruni/tsparticles
 * How to use? : Check the GitHub README
 * v2.9.1
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
  "absorbers": function() { return /* reexport */ absorbers; },
  "amongUs": function() { return /* reexport */ amongUs; },
  "backgroundMask": function() { return /* reexport */ backgroundMask; },
  "basic": function() { return /* reexport */ basic; },
  "big": function() { return /* reexport */ big; },
  "blackHole": function() { return /* reexport */ blackHole; },
  "bubble": function() { return /* reexport */ bubble; },
  "cards": function() { return /* reexport */ cards; },
  "chars": function() { return /* reexport */ chars; },
  "clickPause": function() { return /* reexport */ clickPause; },
  "collisionsAbsorb": function() { return /* reexport */ collisionsAbsorb; },
  "collisionsBounce": function() { return /* reexport */ collisionsBounce; },
  "collisionsDestroy": function() { return /* reexport */ collisionsDestroy; },
  "colorAnimation": function() { return /* reexport */ colorAnimation; },
  "connect": function() { return /* reexport */ connect; },
  "customPreset": function() { return /* reexport */ customPreset; },
  "customShape": function() { return /* reexport */ customShape; },
  "dataImages": function() { return /* reexport */ dataImages; },
  "delay": function() { return /* reexport */ delay; },
  "destroy": function() { return /* reexport */ destroy; },
  "disappearing": function() { return /* reexport */ disappearing; },
  "divEvents": function() { return /* reexport */ divEvents; },
  "emitter": function() { return /* reexport */ emitter; },
  "emitterAbsorber": function() { return /* reexport */ emitterAbsorber; },
  "emitterAngled": function() { return /* reexport */ emitterAngled; },
  "emitterImages": function() { return /* reexport */ emitterImages; },
  "emitterPaths": function() { return /* reexport */ emitterPaths; },
  "emitterShapes": function() { return /* reexport */ emitterShapes; },
  "fireworks": function() { return /* reexport */ fireworks; },
  "fontawesome": function() { return /* reexport */ fontawesome; },
  "forward": function() { return /* reexport */ forward; },
  "grabRandomColor": function() { return /* reexport */ grabRandomColor; },
  "gradients": function() { return /* reexport */ gradients; },
  "gravity": function() { return /* reexport */ gravity; },
  "growing": function() { return /* reexport */ growing; },
  "hexagonPath": function() { return /* reexport */ hexagonPath; },
  "hollowknight": function() { return /* reexport */ hollowknight; },
  "hyperspace": function() { return /* reexport */ hyperspace; },
  "imageMask": function() { return /* reexport */ imageMask; },
  "images": function() { return /* reexport */ browser_images; },
  "imagesDirections": function() { return /* reexport */ imagesDirections; },
  "infection": function() { return /* reexport */ infection; },
  "life": function() { return /* reexport */ life; },
  "lightHover": function() { return /* reexport */ lightHover; },
  "linkTriangles": function() { return /* reexport */ linkTriangles; },
  "localPolygonMask": function() { return /* reexport */ localPolygonMask; },
  "manual": function() { return /* reexport */ manual; },
  "motionDisable": function() { return /* reexport */ motionDisable; },
  "motionReduce": function() { return /* reexport */ motionReduce; },
  "mouseAttract": function() { return /* reexport */ mouseAttract; },
  "mouseBounce": function() { return /* reexport */ mouseBounce; },
  "mouseFollow": function() { return /* reexport */ mouseFollow; },
  "mouseTrail": function() { return /* reexport */ mouseTrail; },
  "moveAngle": function() { return /* reexport */ moveAngle; },
  "moveDistance": function() { return /* reexport */ moveDistance; },
  "moveInside": function() { return /* reexport */ moveInside; },
  "moveOutside": function() { return /* reexport */ moveOutside; },
  "multipleClickEmitters": function() { return /* reexport */ multipleClickEmitters; },
  "multiplePolygonMasks": function() { return /* reexport */ multiplePolygonMasks; },
  "nasa": function() { return /* reexport */ nasa; },
  "noconfig": function() { return /* reexport */ noconfig; },
  "noisePlanes": function() { return /* reexport */ noisePlanes; },
  "nyancat": function() { return /* reexport */ nyancat; },
  "nyancat2": function() { return /* reexport */ nyancat2; },
  "orbit": function() { return /* reexport */ orbit; },
  "parallax": function() { return /* reexport */ parallax; },
  "pathPolygonMask": function() { return /* reexport */ pathPolygonMask; },
  "planes": function() { return /* reexport */ planes; },
  "plasma": function() { return /* reexport */ plasma; },
  "polygonMask": function() { return /* reexport */ polygonMask; },
  "polygons": function() { return /* reexport */ polygons; },
  "random": function() { return /* reexport */ random; },
  "reactBubbles": function() { return /* reexport */ reactBubbles; },
  "reactDefaults": function() { return /* reexport */ reactDefaults; },
  "reactMultipleImages": function() { return /* reexport */ reactMultipleImages; },
  "reactNightSky": function() { return /* reexport */ reactNightSky; },
  "reactPolygonMask": function() { return /* reexport */ reactPolygonMask; },
  "reactSimple": function() { return /* reexport */ reactSimple; },
  "reactSnow": function() { return /* reexport */ reactSnow; },
  "reduceDuplicates": function() { return /* reexport */ reduceDuplicates; },
  "repulse": function() { return /* reexport */ repulse; },
  "repulseBack": function() { return /* reexport */ repulseBack; },
  "repulseCirc": function() { return /* reexport */ repulseCirc; },
  "repulseCubic": function() { return /* reexport */ repulseCubic; },
  "repulseExpo": function() { return /* reexport */ repulseExpo; },
  "repulseQuart": function() { return /* reexport */ repulseQuart; },
  "repulseQuint": function() { return /* reexport */ repulseQuint; },
  "repulseSine": function() { return /* reexport */ repulseSine; },
  "responsive": function() { return /* reexport */ responsive; },
  "ring": function() { return /* reexport */ ring; },
  "seaAnemone": function() { return /* reexport */ seaAnemone; },
  "shadow": function() { return /* reexport */ shadow; },
  "shapeBubble": function() { return /* reexport */ shapeBubble; },
  "shapeHeart": function() { return /* reexport */ shapeHeart; },
  "shapeMultilineText": function() { return /* reexport */ shapeMultilineText; },
  "shapeOptions": function() { return /* reexport */ shapeOptions; },
  "shapePath": function() { return /* reexport */ shapePath; },
  "shapeRoundedRect": function() { return /* reexport */ shapeRoundedRect; },
  "shapeSpiral": function() { return /* reexport */ shapeSpiral; },
  "slow": function() { return /* reexport */ slow; },
  "snow": function() { return /* reexport */ snow; },
  "soundsAudio": function() { return /* reexport */ soundsAudio; },
  "soundsLoop": function() { return /* reexport */ soundsLoop; },
  "soundsMelodies": function() { return /* reexport */ soundsMelodies; },
  "soundsMelodyLoop": function() { return /* reexport */ soundsMelodyLoop; },
  "soundsNotes": function() { return /* reexport */ soundsNotes; },
  "speedDecay": function() { return /* reexport */ speedDecay; },
  "spin": function() { return /* reexport */ spin; },
  "star": function() { return /* reexport */ star; },
  "strokeAnimation": function() { return /* reexport */ strokeAnimation; },
  "style": function() { return /* reexport */ style; },
  "svgReplace": function() { return /* reexport */ svgReplace; },
  "test": function() { return /* reexport */ test; },
  "textMask": function() { return /* reexport */ textMask; },
  "textMaskMultiline": function() { return /* reexport */ textMaskMultiline; },
  "trail": function() { return /* reexport */ trail; },
  "trailImage": function() { return /* reexport */ trailImage; },
  "twinkle": function() { return /* reexport */ twinkle; },
  "vibrate": function() { return /* reexport */ vibrate; },
  "virus": function() { return /* reexport */ virus; },
  "warp": function() { return /* reexport */ warp; },
  "wobble": function() { return /* reexport */ wobble; },
  "zIndex": function() { return /* reexport */ zIndex; }
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

class Vector_Vector extends Vector3d {
  constructor(xOrCoords, y) {
    super(xOrCoords, y, 0);
  }
  static get origin() {
    return Vector_Vector.create(0, 0);
  }
  static clone(source) {
    return Vector_Vector.create(source.x, source.y);
  }
  static create(x, y) {
    return new Vector_Vector(x, y);
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
function NumberUtils_getRandom() {
  return clamp(_random(), 0, 1 - 1e-16);
}
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
function NumberUtils_mix(comp1, comp2, weight1, weight2) {
  return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
function randomInRange(r) {
  const max = getRangeMax(r);
  let min = getRangeMin(r);
  if (max === min) {
    min = 0;
  }
  return NumberUtils_getRandom() * (max - min) + min;
}
function NumberUtils_getRangeValue(value) {
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
function NumberUtils_getValue(options) {
  const random = options.random,
    {
      enable,
      minimumValue
    } = typeof random === "boolean" ? {
      enable: random,
      minimumValue: 0
    } : random;
  return enable ? NumberUtils_getRangeValue(setRangeValue(options.value, minimumValue)) : NumberUtils_getRangeValue(options.value);
}
function NumberUtils_getDistances(pointA, pointB) {
  const dx = pointA.x - pointB.x,
    dy = pointA.y - pointB.y;
  return {
    dx: dx,
    dy: dy,
    distance: Math.sqrt(dx ** 2 + dy ** 2)
  };
}
function getDistance(pointA, pointB) {
  return NumberUtils_getDistances(pointA, pointB).distance;
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
        return NumberUtils_getRandom() * Math.PI * 2;
    }
  }
}
function getParticleBaseVelocity(direction) {
  const baseVelocity = Vector_Vector.origin;
  baseVelocity.length = 1;
  baseVelocity.angle = direction;
  return baseVelocity;
}
function NumberUtils_collisionVelocity(v1, v2, m1, m2) {
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
    x: ((_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : NumberUtils_getRandom() * 100) * data.size.width / 100,
    y: ((_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : NumberUtils_getRandom() * 100) * data.size.height / 100
  };
}
function calcPositionOrRandomFromSizeRanged(data) {
  var _a, _b;
  const position = {
    x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? NumberUtils_getRangeValue(data.position.x) : undefined,
    y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? NumberUtils_getRangeValue(data.position.y) : undefined
  };
  return calcPositionOrRandomFromSize({
    size: data.size,
    position
  });
}
function calcExactPositionOrRandomFromSize(data) {
  var _a, _b, _c, _d;
  return {
    x: (_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : NumberUtils_getRandom() * data.size.width,
    y: (_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : NumberUtils_getRandom() * data.size.height
  };
}
function calcExactPositionOrRandomFromSizeRanged(data) {
  var _a, _b;
  const position = {
    x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? NumberUtils_getRangeValue(data.position.x) : undefined,
    y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? NumberUtils_getRangeValue(data.position.y) : undefined
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
  return Math.floor(NumberUtils_getRandom() * array.length);
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
    this.pathDelay = NumberUtils_getValue(pathOptions.delay) * 1000;
    if (pathOptions.generator) {
      this.pathGenerator = this._engine.plugins.getPathGenerator(pathOptions.generator);
      if (this.pathGenerator && container.addPath(pathOptions.generator, this.pathGenerator)) {
        this.pathGenerator.init(container);
      }
    }
    const zIndexValue = NumberUtils_getRangeValue(this.options.zIndex.value);
    container.retina.initParticle(this);
    const sizeOptions = this.options.size,
      sizeRange = sizeOptions.value,
      sizeAnimation = sizeOptions.animation;
    this.size = {
      enable: sizeOptions.animation.enable,
      value: NumberUtils_getRangeValue(sizeOptions.value) * container.retina.pixelRatio,
      max: getRangeMax(sizeRange) * pxRatio,
      min: getRangeMin(sizeRange) * pxRatio,
      loops: 0,
      maxLoops: NumberUtils_getRangeValue(sizeOptions.animation.count)
    };
    if (sizeAnimation.enable) {
      this.size.status = "increasing";
      this.size.decay = 1 - NumberUtils_getRangeValue(sizeAnimation.decay);
      switch (sizeAnimation.startValue) {
        case "min":
          this.size.value = this.size.min;
          this.size.status = "increasing";
          break;
        case "random":
          this.size.value = randomInRange(this.size);
          this.size.status = NumberUtils_getRandom() >= 0.5 ? "increasing" : "decreasing";
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
    this.moveDecay = 1 - NumberUtils_getRangeValue(this.options.move.decay);
    this.offset = Vector_Vector.origin;
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
    const rad = Math.PI / 180 * NumberUtils_getRangeValue(moveOptions.angle.value),
      radOffset = Math.PI / 180 * NumberUtils_getRangeValue(moveOptions.angle.offset),
      range = {
        left: radOffset - rad / 2,
        right: radOffset + rad / 2
      };
    if (!moveOptions.straight) {
      res.angle += randomInRange(setRangeValue(range.left, range.right));
    }
    if (moveOptions.random && typeof moveOptions.speed === "number") {
      res.length *= NumberUtils_getRandom();
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
    this.attractDistance = NumberUtils_getRangeValue(particles.move.attract.distance) * ratio;
    this.sizeAnimationSpeed = NumberUtils_getRangeValue(particles.size.animation.speed) * ratio;
    this.maxSpeed = NumberUtils_getRangeValue(particles.move.gravity.maxSpeed) * ratio;
  }
  initParticle(particle) {
    const options = particle.options,
      ratio = this.pixelRatio,
      moveDistance = options.move.distance,
      props = particle.retina;
    props.attractDistance = NumberUtils_getRangeValue(options.move.attract.distance) * ratio;
    props.moveDrift = NumberUtils_getRangeValue(options.move.drift) * ratio;
    props.moveSpeed = NumberUtils_getRangeValue(options.move.speed) * ratio;
    props.sizeAnimationSpeed = NumberUtils_getRangeValue(options.size.animation.speed) * ratio;
    const maxDistance = props.maxDistance;
    maxDistance.horizontal = moveDistance.horizontal !== undefined ? moveDistance.horizontal * ratio : undefined;
    maxDistance.vertical = moveDistance.vertical !== undefined ? moveDistance.vertical * ratio : undefined;
    props.maxSpeed = NumberUtils_getRangeValue(options.move.gravity.maxSpeed) * ratio;
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
    this.duration = NumberUtils_getRangeValue(this.actualOptions.duration) * 1000;
    this._delay = NumberUtils_getRangeValue(this.actualOptions.delay) * 1000;
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
    const tagId = (_a = params.tagId) !== null && _a !== void 0 ? _a : `tsparticles${Math.floor(NumberUtils_getRandom() * 10000)}`,
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
    return "2.9.1";
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
        h: NumberUtils_getRangeValue(hslColor.h),
        l: NumberUtils_getRangeValue(hslColor.l),
        s: NumberUtils_getRangeValue(hslColor.s)
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
        r: NumberUtils_getRangeValue(rgbColor.r),
        g: NumberUtils_getRangeValue(rgbColor.g),
        b: NumberUtils_getRangeValue(rgbColor.b)
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
;// CONCATENATED MODULE: ../../engine/dist/esm/index.js




const rgbColorManager = new RgbColorManager(),
  hslColorManager = new HslColorManager();
addColorManager(rgbColorManager);
addColorManager(hslColorManager);
const tsParticles = new Engine();
tsParticles.init();























































































































































































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
const mainConfigs = tsParticles;
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

;// CONCATENATED MODULE: ./dist/browser/bundle.js

/******/ 	return __webpack_exports__;
/******/ })()
;
});