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
		module.exports = factory(require("tsparticles-engine"));
	else if(typeof define === 'function' && define.amd)
		define(["tsparticles-engine"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("tsparticles-engine")) : factory(root["window"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, (__WEBPACK_EXTERNAL_MODULE__818__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 818:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__818__;

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
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk prefetch function */
/******/ 	(() => {
/******/ 		__webpack_require__.F = {};
/******/ 		__webpack_require__.E = (chunkId) => {
/******/ 			Object.keys(__webpack_require__.F).map((key) => {
/******/ 				__webpack_require__.F[key](chunkId);
/******/ 			});
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/create fake namespace object */
/******/ 	(() => {
/******/ 		var getProto = Object.getPrototypeOf ? (obj) => (Object.getPrototypeOf(obj)) : (obj) => (obj.__proto__);
/******/ 		var leafPrototypes;
/******/ 		// create a fake namespace object
/******/ 		// mode & 1: value is a module id, require it
/******/ 		// mode & 2: merge all properties of value into the ns
/******/ 		// mode & 4: return value when already ns object
/******/ 		// mode & 16: return value when it's Promise-like
/******/ 		// mode & 8|1: behave like require
/******/ 		__webpack_require__.t = function(value, mode) {
/******/ 			if(mode & 1) value = this(value);
/******/ 			if(mode & 8) return value;
/******/ 			if(typeof value === 'object' && value) {
/******/ 				if((mode & 4) && value.__esModule) return value;
/******/ 				if((mode & 16) && typeof value.then === 'function') return value;
/******/ 			}
/******/ 			var ns = Object.create(null);
/******/ 			__webpack_require__.r(ns);
/******/ 			var def = {};
/******/ 			leafPrototypes = leafPrototypes || [null, getProto({}), getProto([]), getProto(getProto)];
/******/ 			for(var current = mode & 2 && value; typeof current == 'object' && !~leafPrototypes.indexOf(current); current = getProto(current)) {
/******/ 				Object.getOwnPropertyNames(current).forEach((key) => (def[key] = () => (value[key])));
/******/ 			}
/******/ 			def['default'] = () => (value);
/******/ 			__webpack_require__.d(ns, def);
/******/ 			return ns;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 			return "" + "tsparticles.pathseg.min" + ".js";
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
/******/ 		var dataWebpackPrefix = "tsparticles-plugin-polygon-mask:";
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
/******/ 			;
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
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
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
/******/ 			546: 0,
/******/ 			334: 0
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
/******/ 						} else installedChunks[chunkId] = 0;
/******/ 					}
/******/ 				}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.F.j = (chunkId) => {
/******/ 			if((!__webpack_require__.o(installedChunks, chunkId) || installedChunks[chunkId] === undefined) && true) {
/******/ 				installedChunks[chunkId] = null;
/******/ 				var link = document.createElement('link');
/******/ 		
/******/ 				if (__webpack_require__.nc) {
/******/ 					link.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				link.rel = "prefetch";
/******/ 				link.as = "script";
/******/ 				link.href = __webpack_require__.p + __webpack_require__.u(chunkId);
/******/ 				document.head.appendChild(link);
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
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
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = this["webpackChunktsparticles_plugin_polygon_mask"] = this["webpackChunktsparticles_plugin_polygon_mask"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/startup prefetch */
/******/ 	(() => {
/******/ 		__webpack_require__.O(0, [546], () => {
/******/ 			__webpack_require__.E(404);
/******/ 		}, 5);
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "loadPolygonMaskPlugin": () => (/* binding */ loadPolygonMaskPlugin)
});

// EXTERNAL MODULE: external {"commonjs":"tsparticles-engine","commonjs2":"tsparticles-engine","amd":"tsparticles-engine","root":"window"}
var external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/PolygonMaskDrawStroke.js

/**
 * @category Polygon Mask Plugin
 */

class PolygonMaskDrawStroke {
  constructor() {
    this.color = new external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor();
    this.width = 0.5;
    this.opacity = 1;
  }

  load(data) {
    var _a;

    if (!data) {
      return;
    }

    this.color = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor.create(this.color, data.color);

    if (typeof this.color.value === "string") {
      this.opacity = (_a = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.stringToAlpha)(this.color.value)) !== null && _a !== void 0 ? _a : this.opacity;
    }

    if (data.opacity !== undefined) {
      this.opacity = data.opacity;
    }

    if (data.width !== undefined) {
      this.width = data.width;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/PolygonMaskDraw.js


/**
 * @category Polygon Mask Plugin
 */

class PolygonMaskDraw {
  constructor() {
    this.enable = false;
    this.stroke = new PolygonMaskDrawStroke();
  }
  /**
   * @deprecated the property lineWidth is deprecated, please use the new stroke.width
   */


  get lineWidth() {
    return this.stroke.width;
  }
  /**
   * @deprecated the property lineWidth is deprecated, please use the new stroke.width
   */


  set lineWidth(value) {
    this.stroke.width = value;
  }
  /**
   * @deprecated the property lineColor is deprecated, please use the new stroke.color
   */


  get lineColor() {
    return this.stroke.color;
  }
  /**
   * @deprecated the property lineColor is deprecated, please use the new stroke.color
   */


  set lineColor(value) {
    this.stroke.color = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.OptionsColor.create(this.stroke.color, value);
  }

  load(data) {
    var _a;

    if (!data) {
      return;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    }

    const stroke = (_a = data.stroke) !== null && _a !== void 0 ? _a : {
      color: data.lineColor,
      width: data.lineWidth
    };
    this.stroke.load(stroke);
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/PolygonMaskInline.js
/**
 * @category Polygon Mask Plugin
 */
class PolygonMaskInline {
  constructor() {
    this.arrangement = "one-per-point"
    /* onePerPoint */
    ;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.arrangement !== undefined) {
      this.arrangement = data.arrangement;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/PolygonMaskLocalSvg.js
/**
 * @category Polygon Mask Plugin
 */
class PolygonMaskLocalSvg {
  constructor() {
    this.path = [];
    this.size = {
      height: 0,
      width: 0
    };
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.path !== undefined) {
      this.path = data.path;
    }

    if (data.size !== undefined) {
      if (data.size.width !== undefined) {
        this.size.width = data.size.width;
      }

      if (data.size.height !== undefined) {
        this.size.height = data.size.height;
      }
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/PolygonMaskMove.js
/**
 * @category Polygon Mask Plugin
 */
class PolygonMaskMove {
  constructor() {
    this.radius = 10;
    this.type = "path"
    /* path */
    ;
  }

  load(data) {
    if (!data) {
      return;
    }

    if (data.radius !== undefined) {
      this.radius = data.radius;
    }

    if (data.type !== undefined) {
      this.type = data.type;
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/Options/Classes/PolygonMask.js





/**
 * [[include:Options/Plugins/PolygonMask.md]]
 * @category Polygon Mask Plugin
 */

class PolygonMask {
  constructor() {
    this.draw = new PolygonMaskDraw();
    this.enable = false;
    this.inline = new PolygonMaskInline();
    this.move = new PolygonMaskMove();
    this.scale = 1;
    this.type = "none"
    /* none */
    ;
  }
  /**
   * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
   */


  get inlineArrangement() {
    return this.inline.arrangement;
  }
  /**
   * @deprecated the property inlineArrangement is deprecated, please use the new inline.arrangement
   */


  set inlineArrangement(value) {
    this.inline.arrangement = value;
  }

  load(data) {
    if (!data) {
      return;
    }

    this.draw.load(data.draw);
    this.inline.load(data.inline);
    this.move.load(data.move);

    if (data.scale !== undefined) {
      this.scale = data.scale;
    }

    if (data.type !== undefined) {
      this.type = data.type;
    }

    if (data.enable !== undefined) {
      this.enable = data.enable;
    } else {
      this.enable = this.type !== "none"
      /* none */
      ;
    }

    if (data.url !== undefined) {
      this.url = data.url;
    }

    if (data.data !== undefined) {
      if (typeof data.data === "string") {
        this.data = data.data;
      } else {
        this.data = new PolygonMaskLocalSvg();
        this.data.load(data.data);
      }
    }

    if (data.position !== undefined) {
      this.position = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, data.position);
    }
  }

}
;// CONCATENATED MODULE: ./dist/browser/utils.js

function drawPolygonMask(context, rawData, stroke) {
  const color = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.colorToRgb)(stroke.color);

  if (!color) {
    return;
  }

  context.beginPath();
  context.moveTo(rawData[0].x, rawData[0].y);

  for (const item of rawData) {
    context.lineTo(item.x, item.y);
  }

  context.closePath();
  context.strokeStyle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromRgb)(color);
  context.lineWidth = stroke.width;
  context.stroke();
}
function drawPolygonMaskPath(context, path, stroke, position) {
  context.translate(position.x, position.y);
  const color = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.colorToRgb)(stroke.color);

  if (!color) {
    return;
  }

  context.strokeStyle = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getStyleFromRgb)(color, stroke.opacity);
  context.lineWidth = stroke.width;
  context.stroke(path);
}
function parsePaths(paths, scale, offset) {
  var _a;

  const res = [];

  for (const path of paths) {
    const segments = path.element.pathSegList,
          len = (_a = segments === null || segments === void 0 ? void 0 : segments.numberOfItems) !== null && _a !== void 0 ? _a : 0,
          p = {
      x: 0,
      y: 0
    };

    for (let i = 0; i < len; i++) {
      const segment = segments === null || segments === void 0 ? void 0 : segments.getItem(i);
      const svgPathSeg = window.SVGPathSeg;

      switch (segment === null || segment === void 0 ? void 0 : segment.pathSegType) {
        //
        // Absolute
        //
        case svgPathSeg.PATHSEG_MOVETO_ABS:
        case svgPathSeg.PATHSEG_LINETO_ABS:
        case svgPathSeg.PATHSEG_CURVETO_CUBIC_ABS:
        case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_ABS:
        case svgPathSeg.PATHSEG_ARC_ABS:
        case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_ABS:
        case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS:
          {
            const absSeg = segment;
            p.x = absSeg.x;
            p.y = absSeg.y;
            break;
          }

        case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_ABS:
          p.x = segment.x;
          break;

        case svgPathSeg.PATHSEG_LINETO_VERTICAL_ABS:
          p.y = segment.y;
          break;
        //
        // Relative
        //

        case svgPathSeg.PATHSEG_LINETO_REL:
        case svgPathSeg.PATHSEG_MOVETO_REL:
        case svgPathSeg.PATHSEG_CURVETO_CUBIC_REL:
        case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_REL:
        case svgPathSeg.PATHSEG_ARC_REL:
        case svgPathSeg.PATHSEG_CURVETO_CUBIC_SMOOTH_REL:
        case svgPathSeg.PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL:
          {
            const relSeg = segment;
            p.x += relSeg.x;
            p.y += relSeg.y;
            break;
          }

        case svgPathSeg.PATHSEG_LINETO_HORIZONTAL_REL:
          p.x += segment.x;
          break;

        case svgPathSeg.PATHSEG_LINETO_VERTICAL_REL:
          p.y += segment.y;
          break;

        case svgPathSeg.PATHSEG_UNKNOWN:
        case svgPathSeg.PATHSEG_CLOSEPATH:
          continue;
        // Skip the closing path (and the UNKNOWN)
      }

      res.push({
        x: p.x * scale + offset.x,
        y: p.y * scale + offset.y
      });
    }
  }

  return res;
}
function calcClosestPtOnSegment(s1, s2, pos) {
  // calc delta distance: source point to line start, line start to end
  const {
    dx,
    dy
  } = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(pos, s1),
        // calc delta distance:
  {
    dx: dxx,
    dy: dyy
  } = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(s2, s1),
        // Calc position on line normalized between 0.00 & 1.00
  // == dot product divided by delta line distances squared
  t = (dx * dxx + dy * dyy) / (dxx ** 2 + dyy ** 2),
        // calc nearest pt on line
  res = {
    x: s1.x + dxx * t,
    y: s1.x + dyy * t,
    isOnSegment: t >= 0 && t <= 1
  }; // clamp results to being on the segment

  if (t < 0) {
    res.x = s1.x;
    res.y = s1.y;
  } else if (t > 1) {
    res.x = s2.x;
    res.y = s2.y;
  }

  return res;
}
function segmentBounce(start, stop, velocity) {
  const {
    dx,
    dy
  } = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(start, stop),
        wallAngle = Math.atan2(dy, dx),
        // + Math.PI / 2;
  wallNormal = external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.Vector.create(Math.sin(wallAngle), -Math.cos(wallAngle)),
        d = 2 * (velocity.x * wallNormal.x + velocity.y * wallNormal.y);
  wallNormal.multTo(d);
  velocity.subFrom(wallNormal);
}
;// CONCATENATED MODULE: ./dist/browser/PolygonMaskInstance.js
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

var _PolygonMaskInstance_engine;




/**
 * Polygon Mask manager
 * @category Polygon Mask Plugin
 */

class PolygonMaskInstance {
  constructor(container, engine) {
    this.container = container;

    _PolygonMaskInstance_engine.set(this, void 0);

    __classPrivateFieldSet(this, _PolygonMaskInstance_engine, engine, "f");

    this.dimension = {
      height: 0,
      width: 0
    };
    this.path2DSupported = !!window.Path2D;
    this.options = new PolygonMask();
    this.polygonMaskMoveRadius = this.options.move.radius * container.retina.pixelRatio;
  }

  async initAsync(options) {
    this.options.load(options === null || options === void 0 ? void 0 : options.polygon);
    const polygonMaskOptions = this.options;
    this.polygonMaskMoveRadius = polygonMaskOptions.move.radius * this.container.retina.pixelRatio;
    /* If is set the url of svg element, load it and parse into raw polygon data */

    if (polygonMaskOptions.enable) {
      await this.initRawData();
    }
  }

  resize() {
    const container = this.container,
          options = this.options;

    if (!(options.enable && options.type !== "none"
    /* none */
    )) {
      return;
    }

    if (this.redrawTimeout) {
      clearTimeout(this.redrawTimeout);
    }

    this.redrawTimeout = window.setTimeout(async () => {
      await this.initRawData(true);
      await container.particles.redraw();
    }, 250);
  }

  stop() {
    delete this.raw;
    delete this.paths;
  }

  particlesInitialization() {
    const options = this.options;

    if (options.enable && options.type === "inline"
    /* inline */
    && (options.inline.arrangement === "one-per-point"
    /* onePerPoint */
    || options.inline.arrangement === "per-point"
    /* perPoint */
    )) {
      this.drawPoints();
      return true;
    }

    return false;
  }

  particlePosition(position) {
    var _a, _b;

    const options = this.options;

    if (!(options.enable && ((_b = (_a = this.raw) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) > 0)) {
      return;
    }

    return (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.deepExtend)({}, position ? position : this.randomPoint());
  }

  particleBounce(particle, delta, direction) {
    return this.polygonBounce(particle, delta, direction);
  }

  clickPositionValid(position) {
    const options = this.options;
    return options.enable && options.type !== "none"
    /* none */
    && options.type !== "inline"
    /* inline */
    && this.checkInsidePolygon(position);
  }

  draw(context) {
    var _a;

    if (!((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
      return;
    }

    const options = this.options,
          polygonDraw = options.draw;

    if (!options.enable || !polygonDraw.enable) {
      return;
    }

    const rawData = this.raw;

    for (const path of this.paths) {
      const path2d = path.path2d,
            path2dSupported = this.path2DSupported;

      if (!context) {
        continue;
      }

      if (path2dSupported && path2d && this.offset) {
        drawPolygonMaskPath(context, path2d, polygonDraw.stroke, this.offset);
      } else if (rawData) {
        drawPolygonMask(context, rawData, polygonDraw.stroke);
      }
    }
  }

  polygonBounce(particle, _delta, direction) {
    const options = this.options;

    if (!this.raw || !options.enable || direction !== "top"
    /* top */
    ) {
      return false;
    }

    if (options.type === "inside"
    /* inside */
    || options.type === "outside"
    /* outside */
    ) {
      let closest, dx, dy;
      const pos = particle.getPosition(),
            radius = particle.getRadius();

      for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
        const pi = this.raw[i],
              pj = this.raw[j];
        closest = calcClosestPtOnSegment(pi, pj, pos);
        const dist = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistances)(pos, closest);
        [dx, dy] = [dist.dx, dist.dy];

        if (dist.distance < radius) {
          segmentBounce(pi, pj, particle.velocity);
          return true;
        }
      }

      if (closest && dx !== undefined && dy !== undefined && !this.checkInsidePolygon(pos)) {
        const factor = {
          x: 1,
          y: 1
        };

        if (particle.position.x >= closest.x) {
          factor.x = -1;
        }

        if (particle.position.y >= closest.y) {
          factor.y = -1;
        }

        particle.position.x = closest.x + radius * 2 * factor.x;
        particle.position.y = closest.y + radius * 2 * factor.y;
        particle.velocity.mult(-1);
        return true;
      }
    } else if (options.type === "inline"
    /* inline */
    && particle.initialPosition) {
      const dist = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.getDistance)(particle.initialPosition, particle.getPosition());

      if (dist > this.polygonMaskMoveRadius) {
        particle.velocity.x = particle.velocity.y / 2 - particle.velocity.x;
        particle.velocity.y = particle.velocity.x / 2 - particle.velocity.y;
        return true;
      }
    }

    return false;
  }

  checkInsidePolygon(position) {
    var _a, _b;

    const container = this.container,
          options = this.options;

    if (!options.enable || options.type === "none"
    /* none */
    || options.type === "inline"
    /* inline */
    ) {
      return true;
    } // https://github.com/substack/point-in-polygon
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html


    if (!this.raw) {
      throw new Error(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.noPolygonFound);
    }

    const canvasSize = container.canvas.size,
          x = (_a = position === null || position === void 0 ? void 0 : position.x) !== null && _a !== void 0 ? _a : Math.random() * canvasSize.width,
          y = (_b = position === null || position === void 0 ? void 0 : position.y) !== null && _b !== void 0 ? _b : Math.random() * canvasSize.height;
    let inside = false; // if (this.path2DSupported && this.polygonPath && position) {
    //     inside = container.canvas.isPointInPath(this.polygonPath, position);
    // } else {

    for (let i = 0, j = this.raw.length - 1; i < this.raw.length; j = i++) {
      const pi = this.raw[i],
            pj = this.raw[j],
            intersect = pi.y > y !== pj.y > y && x < (pj.x - pi.x) * (y - pi.y) / (pj.y - pi.y) + pi.x;

      if (intersect) {
        inside = !inside;
      }
    } // }


    return options.type === "inside"
    /* inside */
    ? inside : options.type === "outside"
    /* outside */
    ? !inside : false;
  }

  parseSvgPath(xml, force) {
    var _a, _b, _c;

    const forceDownload = force !== null && force !== void 0 ? force : false;

    if (this.paths !== undefined && !forceDownload) {
      return this.raw;
    }

    const container = this.container,
          options = this.options,
          parser = new DOMParser(),
          doc = parser.parseFromString(xml, "image/svg+xml"),
          svg = doc.getElementsByTagName("svg")[0];
    let svgPaths = svg.getElementsByTagName("path");

    if (!svgPaths.length) {
      svgPaths = doc.getElementsByTagName("path");
    }

    this.paths = [];

    for (let i = 0; i < svgPaths.length; i++) {
      const path = svgPaths.item(i);

      if (path) {
        this.paths.push({
          element: path,
          length: path.getTotalLength()
        });
      }
    }

    const pxRatio = container.retina.pixelRatio,
          scale = options.scale / pxRatio;
    this.dimension.width = parseFloat((_a = svg.getAttribute("width")) !== null && _a !== void 0 ? _a : "0") * scale;
    this.dimension.height = parseFloat((_b = svg.getAttribute("height")) !== null && _b !== void 0 ? _b : "0") * scale;
    const position = (_c = options.position) !== null && _c !== void 0 ? _c : {
      x: 50,
      y: 50
    };
    /* centering of the polygon mask */

    this.offset = {
      x: container.canvas.size.width * position.x / (100 * pxRatio) - this.dimension.width / 2,
      y: container.canvas.size.height * position.y / (100 * pxRatio) - this.dimension.height / 2
    };
    return parsePaths(this.paths, scale, this.offset);
  }
  /**
   * Deprecate SVGPathElement.getPathSegAtLength removed in:
   * Chrome for desktop release 62
   * Chrome for Android release 62
   * Android WebView release 62
   * Opera release 49
   * Opera for Android release 49
   */


  async downloadSvgPath(svgUrl, force) {
    const options = this.options,
          url = svgUrl || options.url,
          forceDownload = force !== null && force !== void 0 ? force : false; // Load SVG from file on server

    if (!url || this.paths !== undefined && !forceDownload) {
      return this.raw;
    }

    const req = await fetch(url);

    if (!req.ok) {
      throw new Error("tsParticles Error - Error occurred during polygon mask download");
    }

    return this.parseSvgPath(await req.text(), force);
  }

  drawPoints() {
    if (!this.raw) {
      return;
    }

    for (const item of this.raw) {
      this.container.particles.addParticle({
        x: item.x,
        y: item.y
      });
    }
  }

  randomPoint() {
    const container = this.container,
          options = this.options;
    let position;

    if (options.type === "inline"
    /* inline */
    ) {
      switch (options.inline.arrangement) {
        case "random-point"
        /* randomPoint */
        :
          position = this.getRandomPoint();
          break;

        case "random-length"
        /* randomLength */
        :
          position = this.getRandomPointByLength();
          break;

        case "equidistant"
        /* equidistant */
        :
          position = this.getEquidistantPointByIndex(container.particles.count);
          break;

        case "one-per-point"
        /* onePerPoint */
        :
        case "per-point"
        /* perPoint */
        :
        default:
          position = this.getPointByIndex(container.particles.count);
      }
    } else {
      position = {
        x: Math.random() * container.canvas.size.width,
        y: Math.random() * container.canvas.size.height
      };
    }

    if (this.checkInsidePolygon(position)) {
      return position;
    } else {
      return this.randomPoint();
    }
  }

  getRandomPoint() {
    if (!this.raw || !this.raw.length) {
      throw new Error(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.noPolygonDataLoaded);
    }

    const coords = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(this.raw);
    return {
      x: coords.x,
      y: coords.y
    };
  }

  getRandomPointByLength() {
    var _a, _b, _c;

    const options = this.options;

    if (!this.raw || !this.raw.length || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
      throw new Error(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.noPolygonDataLoaded);
    }

    const path = (0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.itemFromArray)(this.paths),
          distance = Math.floor(Math.random() * path.length) + 1,
          point = path.element.getPointAtLength(distance);
    return {
      x: point.x * options.scale + (((_b = this.offset) === null || _b === void 0 ? void 0 : _b.x) || 0),
      y: point.y * options.scale + (((_c = this.offset) === null || _c === void 0 ? void 0 : _c.y) || 0)
    };
  }

  getEquidistantPointByIndex(index) {
    var _a, _b, _c, _d, _e, _f, _g;

    const options = this.container.actualOptions,
          polygonMaskOptions = this.options;
    if (!this.raw || !this.raw.length || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) throw new Error(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.noPolygonDataLoaded);
    let offset = 0,
        point;
    const totalLength = this.paths.reduce((tot, path) => tot + path.length, 0),
          distance = totalLength / options.particles.number.value;

    for (const path of this.paths) {
      const pathDistance = distance * index - offset;

      if (pathDistance <= path.length) {
        point = path.element.getPointAtLength(pathDistance);
        break;
      } else {
        offset += path.length;
      }
    }

    return {
      x: ((_b = point === null || point === void 0 ? void 0 : point.x) !== null && _b !== void 0 ? _b : 0) * polygonMaskOptions.scale + ((_d = (_c = this.offset) === null || _c === void 0 ? void 0 : _c.x) !== null && _d !== void 0 ? _d : 0),
      y: ((_e = point === null || point === void 0 ? void 0 : point.y) !== null && _e !== void 0 ? _e : 0) * polygonMaskOptions.scale + ((_g = (_f = this.offset) === null || _f === void 0 ? void 0 : _f.y) !== null && _g !== void 0 ? _g : 0)
    };
  }

  getPointByIndex(index) {
    if (!this.raw || !this.raw.length) {
      throw new Error(external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.noPolygonDataLoaded);
    }

    const coords = this.raw[index % this.raw.length];
    return {
      x: coords.x,
      y: coords.y
    };
  }

  createPath2D() {
    var _a, _b;

    const options = this.options;

    if (!this.path2DSupported || !((_a = this.paths) === null || _a === void 0 ? void 0 : _a.length)) {
      return;
    }

    for (const path of this.paths) {
      const pathData = (_b = path.element) === null || _b === void 0 ? void 0 : _b.getAttribute("d");

      if (pathData) {
        const path2d = new Path2D(pathData),
              matrix = document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGMatrix(),
              finalPath = new Path2D(),
              transform = matrix.scale(options.scale);

        if (finalPath.addPath) {
          finalPath.addPath(path2d, transform);
          path.path2d = finalPath;
        } else {
          delete path.path2d;
        }
      } else {
        delete path.path2d;
      }

      if (path.path2d || !this.raw) {
        continue;
      }

      path.path2d = new Path2D();
      path.path2d.moveTo(this.raw[0].x, this.raw[0].y);
      this.raw.forEach((pos, i) => {
        var _a;

        if (i > 0) {
          (_a = path.path2d) === null || _a === void 0 ? void 0 : _a.lineTo(pos.x, pos.y);
        }
      });
      path.path2d.closePath();
    }
  }

  async initRawData(force) {
    const options = this.options;

    if (options.url) {
      this.raw = await this.downloadSvgPath(options.url, force);
    } else if (options.data) {
      const data = options.data;
      let svg;

      if (typeof data !== "string") {
        const path = data.path instanceof Array ? data.path.map(t => `<path d="${t}" />`).join("") : `<path d="${data.path}" />`;
        const namespaces = 'xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"';
        svg = `<svg ${namespaces} width="${data.size.width}" height="${data.size.height}">${path}</svg>`;
      } else {
        svg = data;
      }

      this.raw = this.parseSvgPath(svg, force);
    }

    this.createPath2D();

    __classPrivateFieldGet(this, _PolygonMaskInstance_engine, "f").dispatchEvent("polygonMaskLoaded", {
      container: this.container
    });
  }

}
_PolygonMaskInstance_engine = new WeakMap();
;// CONCATENATED MODULE: ./dist/browser/index.js
var browser_classPrivateFieldSet = undefined && undefined.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
};

var browser_classPrivateFieldGet = undefined && undefined.__classPrivateFieldGet || function (receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};

var _PolygonMaskPlugin_engine;




/**
 * @category Polygon Mask Plugin
 */

class PolygonMaskPlugin {
  constructor(engine) {
    _PolygonMaskPlugin_engine.set(this, void 0);

    this.id = "polygonMask";

    browser_classPrivateFieldSet(this, _PolygonMaskPlugin_engine, engine, "f");
  }

  getPlugin(container) {
    return new PolygonMaskInstance(container, browser_classPrivateFieldGet(this, _PolygonMaskPlugin_engine, "f"));
  }

  needsPlugin(options) {
    var _a, _b, _c;

    return (_b = (_a = options === null || options === void 0 ? void 0 : options.polygon) === null || _a === void 0 ? void 0 : _a.enable) !== null && _b !== void 0 ? _b : ((_c = options === null || options === void 0 ? void 0 : options.polygon) === null || _c === void 0 ? void 0 : _c.type) !== undefined && options.polygon.type !== "none"
    /* none */
    ;
  }

  loadOptions(options, source) {
    if (!this.needsPlugin(source)) {
      return;
    }

    const optionsCast = options;
    let polygonOptions = optionsCast.polygon;

    if ((polygonOptions === null || polygonOptions === void 0 ? void 0 : polygonOptions.load) === undefined) {
      optionsCast.polygon = polygonOptions = new PolygonMask();
    }

    polygonOptions.load(source === null || source === void 0 ? void 0 : source.polygon);
  }

}

_PolygonMaskPlugin_engine = new WeakMap();
async function loadPolygonMaskPlugin(engine) {
  if (!(0,external_commonjs_tsparticles_engine_commonjs2_tsparticles_engine_amd_tsparticles_engine_root_window_.isSsr)() && !("SVGPathSeg" in window)) {
    await __webpack_require__.e(/* import() | tsparticles.pathseg.min */ 404).then(__webpack_require__.t.bind(__webpack_require__, 943, 23));
  }

  const plugin = new PolygonMaskPlugin(engine);
  await engine.addPlugin(plugin);
}




})();

__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	return __webpack_exports__;
/******/ })()
;
});