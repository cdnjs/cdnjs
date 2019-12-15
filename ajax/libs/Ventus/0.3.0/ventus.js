(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Ventus"] = factory();
	else
		root["Ventus"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./ventus.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!../node_modules/less-loader/dist/cjs.js??ref--6-3!./ventus/less/expose.less":
/*!*************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader!../node_modules/postcss-loader/lib!../node_modules/less-loader/dist/cjs.js??ref--6-3!./ventus/less/expose.less ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * Ventus\n * Copyright © 2012-2013 Ramón Lamana\n * https://github.com/rlamana\n */\n.wm-space.expose .wm-window {\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n}\n.wm-space.expose .wm-window section.wm-content {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.wm-space.expose .wm-window.wm-window.animated {\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  -webkit-transition: top 0.5s ease-out, left 0.5s ease-out;\n  transition: top 0.5s ease-out, left 0.5s ease-out;\n}\n.wm-space.expose .wm-window:hover {\n  box-shadow: 0px 0px 40px #000088;\n}\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!../node_modules/less-loader/dist/cjs.js??ref--6-3!./ventus/less/window.less":
/*!*************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader!../node_modules/postcss-loader/lib!../node_modules/less-loader/dist/cjs.js??ref--6-3!./ventus/less/window.less ***!
  \*************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * Ventus\n * Copyright © 2012-2013 Ramón Lamana\n * https://github.com/rlamana\n */\n/* Wobbly animation */\n@-webkit-keyframes wobbly {\n  0% {\n    -webkit-transform: rotate(4deg);\n            transform: rotate(4deg);\n  }\n  50% {\n    -webkit-transform: rotate(-4deg);\n            transform: rotate(-4deg);\n  }\n  100% {\n    -webkit-transform: rotate(4deg);\n            transform: rotate(4deg);\n  }\n}\n@keyframes wobbly {\n  0% {\n    -webkit-transform: rotate(4deg);\n            transform: rotate(4deg);\n  }\n  50% {\n    -webkit-transform: rotate(-4deg);\n            transform: rotate(-4deg);\n  }\n  100% {\n    -webkit-transform: rotate(4deg);\n            transform: rotate(4deg);\n  }\n}\n/* Appear animation */\n@-webkit-keyframes appear {\n  0% {\n    -webkit-transform: scale(0, 0);\n            transform: scale(0, 0);\n  }\n  80% {\n    -webkit-transform: scale(1.2, 1.2);\n            transform: scale(1.2, 1.2);\n  }\n  100% {\n    -webkit-transform: rotate(1, 1);\n            transform: rotate(1, 1);\n  }\n}\n@keyframes appear {\n  0% {\n    -webkit-transform: scale(0, 0);\n            transform: scale(0, 0);\n  }\n  80% {\n    -webkit-transform: scale(1.2, 1.2);\n            transform: scale(1.2, 1.2);\n  }\n  100% {\n    -webkit-transform: rotate(1, 1);\n            transform: rotate(1, 1);\n  }\n}\n/* Close animation */\n@-webkit-keyframes close {\n  0% {\n    -webkit-transform: scale(1, 1);\n            transform: scale(1, 1);\n  }\n  20% {\n    -webkit-transform: scale(1.2, 1.2);\n            transform: scale(1.2, 1.2);\n  }\n  100% {\n    -webkit-transform: scale(0, 0);\n            transform: scale(0, 0);\n  }\n}\n@keyframes close {\n  0% {\n    -webkit-transform: scale(1, 1);\n            transform: scale(1, 1);\n  }\n  20% {\n    -webkit-transform: scale(1.2, 1.2);\n            transform: scale(1.2, 1.2);\n  }\n  100% {\n    -webkit-transform: scale(0, 0);\n            transform: scale(0, 0);\n  }\n}\n/* Window styles */\n.wm-window {\n  opacity: 0.98;\n  display: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  overflow: hidden;\n  position: absolute;\n  min-width: 200px;\n  min-height: 60px;\n  background-color: #fff;\n  box-shadow: 0 0 12px 1px rgba(0, 0, 0, 0.6);\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n}\n.wm-window .wm-window-overlay {\n  display: none;\n}\n.wm-window .wm-window-box {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n     -moz-box-orient: vertical;\n     -moz-box-direction: normal;\n          flex-direction: column;\n  height: 100%;\n  min-height: 60px;\n  width: 100%;\n}\n.wm-window .wm-window-box .wm-window-title {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n     -moz-box-orient: horizontal;\n     -moz-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n          align-items: center;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  height: 36px;\n  min-height: 36px;\n  background-color: #365d98;\n  border: 0;\n  padding: 0 8px;\n  overflow: hidden;\n}\n.wm-window .wm-window-box .wm-window-title h1 {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n          flex: 1;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n     -moz-box-orient: horizontal;\n     -moz-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n          align-items: center;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  cursor: default;\n  padding: 0;\n  padding-left: 8px;\n  margin: 0;\n  font-size: 16px;\n  font-weight: 400;\n  color: #fff;\n}\n.wm-window .wm-window-box .wm-window-title .wm-button-group {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n     -moz-box-orient: horizontal;\n     -moz-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n          align-items: center;\n  padding-left: 2px;\n}\n.wm-window .wm-window-box .wm-window-title button {\n  display: inline-block;\n  border: 0;\n  background-repeat: no-repeat;\n  background-color: #365d98;\n  color: #ffffff;\n  margin: 0;\n  margin-left: 3px;\n  padding: 0;\n  width: 15px;\n  height: 15px;\n  opacity: 0.7;\n}\n.wm-window .wm-window-box .wm-window-title button:hover {\n  opacity: 1;\n}\n.wm-window .wm-window-box .wm-window-title button.wm-close {\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkIxOUQwNTEzMDM0MTFFMkI5MUFGMzlFMTgwOEI4ODEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkIxOUQwNTIzMDM0MTFFMkI5MUFGMzlFMTgwOEI4ODEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCQjE5RDA0RjMwMzQxMUUyQjkxQUYzOUUxODA4Qjg4MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQjE5RDA1MDMwMzQxMUUyQjkxQUYzOUUxODA4Qjg4MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpFaWsQAAABxSURBVHjajJDRDcAgCERtJ2AER+oIjuZIHcER3IBCvDYX5KMklwg8lPNQ1fI3TjpfJgl9QX2F32yquuI2CWqCXNH/YFejgUpgexmGeUAjmMH+9AA4aKUN5h174qFkYEs8CMNuaMYdkc/sNySAW/0RYABjHiW8yydeWwAAAABJRU5ErkJggg==) no-repeat 1px 1px;\n}\n.wm-window .wm-window-box .wm-window-title button.wm-maximize {\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QkIxOUQwNTUzMDM0MTFFMkI5MUFGMzlFMTgwOEI4ODEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QkIxOUQwNTYzMDM0MTFFMkI5MUFGMzlFMTgwOEI4ODEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCQjE5RDA1MzMwMzQxMUUyQjkxQUYzOUUxODA4Qjg4MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQjE5RDA1NDMwMzQxMUUyQjkxQUYzOUUxODA4Qjg4MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqAiG1YAAAA7SURBVHjaYvz//z8DsYAJSj8E4v948AdkxSSZDALyQMyIBQtgU0ySyQOomAWJ/RCPuo8ggpGUSAEIMACTWxDft/Hl3wAAAABJRU5ErkJggg==) no-repeat 1px 1px;\n}\n.wm-window .wm-window-box .wm-window-title button.wm-minimize {\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAYAAABi8KSDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzYwRDNDRkMzMDM5MTFFMkI5MUFGMzlFMTgwOEI4ODEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzYwRDNDRkQzMDM5MTFFMkI5MUFGMzlFMTgwOEI4ODEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCQjE5RDA1NzMwMzQxMUUyQjkxQUYzOUUxODA4Qjg4MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCQjE5RDA1ODMwMzQxMUUyQjkxQUYzOUUxODA4Qjg4MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PsZJjdUAAAAlSURBVHjaYvz//z8DsYCJgQQwqhgZsCCx8QU4I7piRkImAwQYAJ10BBYiYyqTAAAAAElFTkSuQmCC) no-repeat 1px 1px;\n}\n.wm-window .wm-window-box header.wm-window-title.hide {\n  display: none;\n}\n.wm-window .wm-window-box section.wm-content {\n  display: block;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1;\n     -moz-box-flex: 1;\n          flex: 1;\n  min-height: 60px;\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.wm-window .wm-window-box button.wm-resize {\n  position: absolute;\n  bottom: 0;\n  right: 4px;\n  background: transparent;\n  border: 0;\n  margin: 0;\n  padding: 0;\n  cursor: se-resize;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QzREODAwQzcyRjZDMTFFMjg5NkREMENBNjJERUE4Q0IiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QzREODAwQzgyRjZDMTFFMjg5NkREMENBNjJERUE4Q0IiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpDNEQ4MDBDNTJGNkMxMUUyODk2REQwQ0E2MkRFQThDQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpDNEQ4MDBDNjJGNkMxMUUyODk2REQwQ0E2MkRFQThDQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PuQy0VQAAACLSURBVHjaYpw9ezYDEUARiO8zEaHQHohPArEcCxEK1wGxPxA/wmeyDZLCIyABJjwKNwJxEFShIi7FyAoPArEZEB8DYi0mHFaHIikEaUwE4mtMWBRGAPE+NIU7kJ0BUxiNQyFInpMJKgFTuBuLQj8gXg3yJCicHyFZDQJfgDgOqhEE3gGxD8jNAAEGADlXJQUd3J75AAAAAElFTkSuQmCC) no-repeat;\n  height: 15px;\n  width: 10px;\n}\n.wm-window.disabled * {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.wm-window.disabled .wm-window-overlay {\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: black;\n  opacity: 0;\n  z-index: 30000;\n}\n.wm-window.inactive * {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.wm-window.inactive header.wm-window-title {\n  background-color: #888;\n}\n.wm-window.inactive header.wm-window-title h1 {\n  color: #bbb;\n}\n.wm-window.active .wm-content * {\n  -webkit-user-select: text;\n     -moz-user-select: text;\n      -ms-user-select: text;\n          user-select: text;\n}\n.wm-window.noresizable .wm-window-box header.wm-window-title button.wm-maximize,\n.wm-window.noresizable .wm-window-box header.wm-window-title button.wm-minimize {\n  display: none;\n}\n.wm-window.noresizable .wm-window-box section.wm-content {\n  overflow-y: hidden;\n}\n.wm-window.noresizable .wm-window-box button.wm-resize {\n  display: none;\n}\n.wm-window.animated.minimizing,\n.wm-window.animated.maximazing {\n  -webkit-transform: translate3d(0, 0, 0);\n          transform: translate3d(0, 0, 0);\n  -webkit-transition: all 0.5s ease-out;\n  transition: all 0.5s ease-out;\n}\n.wm-window.animated.closing {\n  -webkit-animation: close 0.3s 1 ease-in forwards;\n          animation: close 0.3s 1 ease-in forwards;\n}\n.wm-window.closing {\n  -webkit-animation: close;\n          animation: close;\n}\n.wm-window.animated.opening {\n  -webkit-animation: appear 0.4s 1 ease-out forwards;\n          animation: appear 0.4s 1 ease-out forwards;\n}\n.wm-window.opening {\n  -webkit-animation: appear;\n          animation: appear;\n}\n.wm-window.animated.resizing {\n  -webkit-transition: none;\n  transition: none;\n}\n.wm-window.animated.move {\n  -webkit-animation: wobbly 0.5s 0.2s infinite;\n          animation: wobbly 0.5s 0.2s infinite;\n}\n.wm-window.animated.move * {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.wm-window.closed {\n  display: none;\n}\n.no-events .wm-content {\n  pointer-events: none;\n}\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!../node_modules/less-loader/dist/cjs.js??ref--6-3!./ventus/less/windowmanager.less":
/*!********************************************************************************************************************************************************!*\
  !*** ../node_modules/css-loader!../node_modules/postcss-loader/lib!../node_modules/less-loader/dist/cjs.js??ref--6-3!./ventus/less/windowmanager.less ***!
  \********************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "../node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/**\n * Ventus\n * Copyright © 2012-2013 Ramón Lamana\n * https://github.com/rlamana\n */\n.wm-space {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  z-index: -1;\n  cursor: default;\n}\n.wm-space .wm-overlay {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: #000;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  opacity: 0;\n  -webkit-transition: opacity 0.5s ease-out;\n  transition: opacity 0.5s ease-out;\n}\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/lib/css-base.js":
/*!**************************************************!*\
  !*** ../node_modules/css-loader/lib/css-base.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../node_modules/lodash.throttle/index.js":
/*!************************************************!*\
  !*** ../node_modules/lodash.throttle/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = throttle;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/style-loader/lib/addStyles.js":
/*!*****************************************************!*\
  !*** ../node_modules/style-loader/lib/addStyles.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "../node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "../node_modules/style-loader/lib/urls.js":
/*!************************************************!*\
  !*** ../node_modules/style-loader/lib/urls.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./ventus.js":
/*!*******************!*\
  !*** ./ventus.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _windowmanager = __webpack_require__(/*! ventus/wm/windowmanager */ "./ventus/wm/windowmanager.js");

var _windowmanager2 = _interopRequireDefault(_windowmanager);

var _window = __webpack_require__(/*! ventus/wm/window */ "./ventus/wm/window.js");

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Ventus
 * Copyright © 2012-2013 Ramón Lamana
 * https://github.com/rlamana
 */
module.exports = {
  version: '0.3.0',

  WindowManager: _windowmanager2.default,
  Window: _window2.default
};

/***/ }),

/***/ "./ventus/core/emitter.js":
/*!********************************!*\
  !*** ./ventus/core/emitter.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Signal/slots Emitter
 * (Fork of Basejs Emitter by A. Matías Quezada)
 *
 * Copyright © 2012-2013 Ramón Lamana
 * https://github.com/rlamana
 * Under MIT license
 */

/**
 * Copyright © 2009-2012 A. Matías Quezada
 * https://github.com/amatiasq
 */

/**
 * interface Emitter {
 *   void on(String signal, Function slot, [Object scope]);
 *   void off(String signal, Function slot, [Object scope]);
 *   void once(String signal, Function slot, [Object scope]);
 *   void emit(String signal, Object var_args...);
 *   void connect(Object slots, [Object scope]);
 *   void disconnect(Object slots, [Object scope]);
 * }
 *
 * Provides a constructor to listen and emit signals.
 */

!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  "use strict";

  function equals(slot, scope, expected) {
    return function (item) {
      return (item.funct === slot && item.scope === scope) === expected;
    };
  }

  function hasListener(listeners, signal, slot, scope) {
    if (!listeners[signal]) {
      return false;
    }

    return listeners[signal].some(equals(slot, scope, true));
  }

  /**
   * Creates an object with methods to add callbacks (listeners)
   *   to specific signals and invoke this callbacks.
   */
  function Emitter() {
    this._listeners = {};
  }

  Emitter.prototype = {
    /**
     * Returns the count of listeners for a specific signal.
     *
     * @param signal <String> The signal we want to count listeners from.
     * @returns <Number> The count.
     */
    listenersCount: function listenersCount(signal) {
      var list = this._listeners[signal];
      return list ? list.length : 0;
    },

    /**
     * Adds a listener to a signal, optionally a scope can be provided.
     * NOTE: Calling this method with the same arguments will NOT add a new listener.
     *
     * @param signal <String> The signal to listen.
     * @param slot <Function> The callback function.
     * @param scope <Object?> The scope for the callback.
     */
    on: function on(signal, slot, scope) {
      var list = this._listeners;

      if (hasListener(list, signal, slot, scope)) {
        return;
      }

      if (!list[signal]) {
        list[signal] = [];
      }

      list[signal].push({
        funct: slot,
        scope: scope
      });
    },

    /**
     * Removes the listener added with exactly the same arguments.
     *
     * @param signal <String> The signal from we want to remove the listener.
     * @param slot <Function> The callback passed to .on() method.
     * @param scope <Object> The scope for the callback.
     */
    off: function off(signal, slot, scope) {
      var list = this._listeners[signal];
      if (!list) {
        return;
      }

      this._listeners[signal] = list.filter(equals(slot, scope, false));
    },

    /**
     * Adds a listener to be fired only the next time the signal is emitted.
     *
     * @param signal <String> The signal to listen.
     * @param slot <Function> The callback function.
     * @param scope <Object?> The scope for the callback.
     */
    once: function once(signal, slot, scope) {
      if (hasListener(this._listeners, signal, slot, scope)) {
        return;
      }

      this.on(signal, function wrapper() {
        this.off(signal, wrapper, this);
        slot.apply(scope, arguments);
      }, this);
    },

    /**
     * Executes the callbacks for the given signal.
     * Any extra argument will be passed to the callback.
     *
     * @param signal <String> The signal of the listeners we want to invoke.
     * @param var_args <object...> Any arguments we want the callbacks to recive.
     */
    emit: function emit(signal /*, var_args*/) {
      var list = this._listeners[signal];
      if (!list) {
        return;
      }

      var data = Array.prototype.slice.call(arguments, 1);
      list.forEach(function (item) {
        item.funct.apply(item.scope, data);
      });
    },

    /**
     * Connects slots to a group of signals,
     * optionally a scope can be provided.
     *
     * @param slots <Object> Map of signals and slots.
     * @param scope <Object> The scope for the callback.
     */
    connect: function connect(slots, scope) {
      if (!slots) {
        return;
      }

      for (var signal in slots) {
        if (slots.hasOwnProperty(signal)) {
          this.on(signal, slots[signal], scope);
        }
      }
    },

    /**
     * Disconnects slots to a group of signals,
     * optionally a scope can be provided.
     *
     * @param slots <Object> Map of signals and slots.
     * @param scope <Object> The scope for the callback.
     */
    disconnect: function disconnect(slots, scope) {
      if (!slots) {
        return;
      }

      for (var signal in slots) {
        if (slots.hasOwnProperty(signal)) {
          this.off(signal, slots[signal], scope);
        }
      }
    }
  };

  return Emitter;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./ventus/core/view.js":
/*!*****************************!*\
  !*** ./ventus/core/view.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Ventus
 * Copyright © 2012-2013 Ramón Lamana
 * https://github.com/rlamana
 */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  'use strict';

  var View = function View(elementOrMarkup) {
    if (typeof elementOrMarkup === 'string') {
      var wrapper = document.createElement('div');
      wrapper.innerHTML = elementOrMarkup;
      this.el = wrapper.firstChild;
    } else {
      this.el = elementOrMarkup;
    }
  };

  View.prototype = {
    listen: function listen(map, scope) {
      var splitter = /^(?:(.*)\s)?(\w+)$/;
      var handler = void 0,
          data = void 0,
          selector = void 0,
          event = void 0;
      for (var key in map) {
        if (!map.hasOwnProperty(key)) {
          continue;
        }

        handler = map[key];

        data = key.match(splitter);
        selector = data[1];
        event = data[2];

        if (event === 'mousedown') {
          event += ' touchstart';
        } else if (event === 'mousemove') {
          event += ' touchmove';
        } else if (event === 'mouseup') {
          event += ' touchend';
        } else if (event === 'click') {
          event += ' touchend';
        }

        if (typeof handler === 'string') {
          handler = scope[handler];
        }

        if (!handler) {
          throw new Error('Handler not found');
        }

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = event.split(' ').filter(function (e) {
            return !!e.trim();
          })[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var eventName = _step.value;

            if (selector) {
              var elements = this.el.querySelectorAll(selector);
              for (var i = 0; i < elements.length; i++) {
                elements[i].addEventListener(eventName, handler.bind(scope || this));
              }
            } else {
              this.el.addEventListener(eventName, handler.bind(scope || this));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
      return this;
    },
    on: function on(name, handler) {
      this.el.addEventListener(name, handler);
    },
    off: function off(name, handler) {
      this.el.removeEventListener(name, handler);
    },
    one: function one(name, handler) {
      var _this = this,
          _arguments = arguments;

      var wrapper = function wrapper() {
        _this.el.removeEventListener(name, wrapper);
        handler.apply(_this, _arguments);
      };
      this.el.addEventListener(name, wrapper);
    },
    onTransitionEnd: function onTransitionEnd(handler, scope) {
      var _this2 = this;

      this.one('transitionend', function () {
        handler.apply(scope || _this2);
      });
    },
    onAnimationEnd: function onAnimationEnd(handler, scope) {
      var _this3 = this;

      this.one('animationend', function () {
        handler.apply(scope || _this3);
      });
    },
    show: function show() {
      if (this.el.style.display === 'none' || this.el.style.display === '') {
        this.el.style.display = this._display || 'block';
      }
    },
    hide: function hide() {
      if (this.el.style.display !== 'none' && this.el.style.display !== '') {
        this._display = this.el.style.display;
        this.el.style.display = 'none';
      }
    },
    find: function find(selector) {
      var element = this.el.querySelector(selector);
      return element ? new View(element) : null;
    },


    set width(value) {
      this.el.style.width = value + 'px';
    },

    get width() {
      return this.el.offsetWidth;
    },

    set height(value) {
      this.el.style.height = value + 'px';
    },

    get height() {
      return this.el.offsetHeight;
    },

    set top(value) {
      this.el.style.top = (value || 0) + 'px';
    },

    get top() {
      return parseInt(this.el.style.top || 0, 10);
    },

    set bottom(value) {
      this.el.style.bottom = (value || 0) + 'px';
    },

    get bottom() {
      return parseInt(this.el.style.top || 0, 10);
    },

    set left(value) {
      this.el.style.left = (value || 0) + 'px';
    },

    get left() {
      return parseInt(this.el.style.left || 0, 10);
    },

    set right(value) {
      this.el.style.right = (value || 0) + 'px';
    },

    get right() {
      return parseInt(this.el.style.right || 0, 10);
    },

    set zIndex(value) {
      this.el.style.zIndex = value;
    },

    get zIndex() {
      return parseInt(this.el.style.zIndex || 0, 10);
    },

    set opacity(value) {
      this.el.style.opacity = value;
    },

    get opacity() {
      return parseInt(this.el.style.opacity || 0, 10);
    },

    append: function append(content) {
      var view = content instanceof View ? content : new View(content);
      this.el.appendChild(view.el);
    },
    empty: function empty() {
      this.el.innerHTML = '';
    }
  };

  return View;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./ventus/less/expose.less":
/*!*********************************!*\
  !*** ./ventus/less/expose.less ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/postcss-loader/lib!../../../node_modules/less-loader/dist/cjs.js??ref--6-3!./expose.less */ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!../node_modules/less-loader/dist/cjs.js??ref--6-3!./ventus/less/expose.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./ventus/less/window.less":
/*!*********************************!*\
  !*** ./ventus/less/window.less ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/postcss-loader/lib!../../../node_modules/less-loader/dist/cjs.js??ref--6-3!./window.less */ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!../node_modules/less-loader/dist/cjs.js??ref--6-3!./ventus/less/window.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./ventus/less/windowmanager.less":
/*!****************************************!*\
  !*** ./ventus/less/windowmanager.less ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader!../../../node_modules/postcss-loader/lib!../../../node_modules/less-loader/dist/cjs.js??ref--6-3!./windowmanager.less */ "../node_modules/css-loader/index.js!../node_modules/postcss-loader/lib/index.js!../node_modules/less-loader/dist/cjs.js??ref--6-3!./ventus/less/windowmanager.less");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "../node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./ventus/wm/modes/default.js":
/*!************************************!*\
  !*** ./ventus/wm/modes/default.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Ventus
 * Copyright © 2012-2013 Ramón Lamana
 * https://github.com/rlamana
 */
!(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
  'use strict';

  var DefaultMode = {
    register: function register() {
      console.log('Default mode registered.');
    },


    actions: {
      maximize: function maximize(win) {
        win.move(0, 0);
        win.resize(this.view.width, this.view.height);
      },
      restore: function restore(win, _restore) {
        _restore.call(win);
      },
      minimize: function minimize(win) {
        win.resize(0, 0);
      }
    }
  };

  return DefaultMode;
}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./ventus/wm/modes/expose.js":
/*!***********************************!*\
  !*** ./ventus/wm/modes/expose.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Ventus
 * Copyright © 2012-2013 Ramón Lamana
 * https://github.com/rlamana
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! lodash.throttle */ "../node_modules/lodash.throttle/index.js"), __webpack_require__(/*! ventus/less/expose.less */ "./ventus/less/expose.less")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (throttle) {
  'use strict';

  var ExposeMode = {
    // Launch when plugin is registered.
    register: function register() {
      var _this = this;

      console.log('Expose mode registered.');

      this.view.on('contextmenu', throttle(function (event) {
        // Right click sets expose mode.
        if (_this.mode !== 'expose') {
          if (_this.windows.length > 0) {
            _this.mode = 'expose';
          }
        } else if (_this.mode === 'expose') {
          _this.mode = 'default';
        }
        event.stopPropagation();
        event.preventDEfault();
      }, 1000));
    },


    // Launch when plugin is enabled.
    plug: function plug() {
      var _this2 = this;

      var grid = Math.ceil(this.windows.length / 2);
      var maxWidth = Math.floor(this.view.width / grid);
      var maxHeight = Math.floor(this.view.height / 2);
      var scale = void 0,
          left = void 0,
          top = void 0,
          pos = void 0;

      this.view.el.classList.add('expose');

      var _loop = function _loop(_win, i, len) {
        _win = _this2.windows[i];
        _win.stamp();

        // Scale factor.
        if (_win.height > _win.width) {
          scale = _win.height > maxHeight ? maxHeight / _win.height : 1;
        } else {
          scale = _win.width > maxWidth ? maxWidth / _win.width : 1;
        }

        scale -= 0.15; // To add a little padding.

        pos = {
          x: i % grid * maxWidth,
          y: (i < grid ? 0 : 1) * maxHeight
        };

        // New position.
        left = pos.x + Math.floor((maxWidth - scale * _win.width) / 2);
        top = pos.y + Math.floor((maxHeight - scale * _win.height) / 2);

        _win.enabled = false;
        _win.movable = false;

        _win.view.el.classList.add('exposing');
        _win.view.el.style.transformOrigin = '0 0';
        _win.view.el.style.transform = 'scale(' + scale + ')';
        _win.view.top = top;
        _win.view.left = left;

        var endExposing = function endExposing() {
          _win.view.el.classList.remove('exposing');
        };

        if (_win.animations) {
          _win.view.on('transitionend', endExposing);
        } else {
          endExposing();
        }
        win = _win;
      };

      for (var win, i = 0, len = this.windows.length; i < len; i++) {
        _loop(win, i, len);
      }

      this.overlay = true;
      this.view.one('click', function () {
        _this2.mode = 'default';
      });
    },


    // Lauch when plugin is disabled
    unplug: function unplug() {
      var _this3 = this;

      return new Promise(function (done) {
        if (_this3.windows.length === 0) {
          done();
        }

        for (var _win2, i = _this3.windows.length; i--;) {
          _win2 = _this3.windows[i];
          _win2.restore();
          _win2.view.el.style.transform = 'scale(1)';
          _win2.view.el.style.transformOrigin = '50% 50%';

          var removeTransform = function (win, windowIndex) {
            return function () {
              if (windowIndex === 0) {
                done();
              }
              win.view.el.style.transform = '';
            };
          }(_win2, i);

          if (_win2.animations) {
            _this3.view.onTransitionEnd(removeTransform, _this3);
          } else {
            removeTransform.call(_this3);
          }

          _win2.movable = true;
          _win2.enabled = true;
        }

        _this3.overlay = false;
      }).then(function () {
        _this3.view.el.classList.remove('expose');
      });
    },


    actions: {
      focus: function focus() {},
      close: function close() {
        this.mode = 'expose';
      },
      select: function select(win) {
        this.mode = 'default';
        win.focus();
      }
    }
  };

  return ExposeMode;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./ventus/wm/window.js":
/*!*****************************!*\
  !*** ./ventus/wm/window.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Ventus
 * Copyright © 2012 Ramón Lamana
 * https://github.com/rlamana
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ventus/core/emitter */ "./ventus/core/emitter.js"), __webpack_require__(/*! ventus/core/view */ "./ventus/core/view.js"), __webpack_require__(/*! ventus/less/window.less */ "./ventus/less/window.less")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Emitter, View) {
	'use strict';

	function isTouchEvent(e) {
		return !!window.TouchEvent && e.originalEvent instanceof window.TouchEvent;
	}

	function convertMoveEvent(e) {
		return isTouchEvent(e) ? e.originalEvent.changedTouches[0] : e;
	}

	var Window = function Window(options) {
		this.signals = new Emitter();

		options = options || {
			title: 'Untitle Window',
			width: 400,
			height: 200,
			x: 0,
			y: 0,
			content: '',
			movable: true,
			resizable: true,
			widget: false,
			titlebar: true,
			animations: true,
			classname: '',
			stayinspace: false
		};

		if (options.animations) {
			options.classname + ' animated';
		}

		// View
		this.view = new View('<div class="wm-window ' + options.classname + '">\n      <div class="wm-window-box">\n        <header class="wm-window-title" unselectable="on">\n          <h1 unselectable="on">' + options.title + '</h1>\n          <div class="wm-button-group">\n            <button class="wm-minimize">&nbsp;</button>\n            <button class="wm-maximize">&nbsp;</button>\n            <button class="wm-close">&nbsp;</button>\n          </div>\n        </header>\n\n        <section class="wm-content"></section>\n\n        <button class="wm-resize">&nbsp;</button>\n      </div>\n      <div class="wm-window-overlay"></div>\n    </div>');
		this.view.listen(this.events.window, this);

		if (options.opacity) {
			this.view.el.style.opacity = options.opacity;
		}

		// Predefined signal/events handlers.
		if (options.events) {
			for (var eventName in options.events) {
				if (options.events.hasOwnProperty(eventName) && typeof options.events[eventName] === 'function') {
					this.signals.on(eventName, options.events[eventName], this);
				}
			}
		}

		// Cache content element.
		this.$content = this.view.find('.wm-content');
		if (options.content) {
			this.$content.append(options.content);
		}

		// Cache header element.
		this.$titlebar = this.view.find('header');

		this.width = options.width || 400;
		this.height = options.height || 200;

		this.x = options.x || 0;
		this.y = options.y || 0;
		this.z = 10000;

		// State
		this.enabled = true;
		this.active = false;
		this.maximized = false;
		this.minimized = false;

		this._closed = true;
		this._destroyed = false;

		// Properties
		this.widget = false;
		this.movable = typeof options.movable !== 'undefined' ? options.movable : true;
		this.resizable = typeof options.resizable !== 'undefined' ? options.resizable : true;
		this.animations = typeof options.animations !== 'undefined' ? options.animations : true;
		this.titlebar = true;
		this.stayinspace = typeof options.stayinspace !== 'undefined' ? options.stayinspace : false;
	};

	Window.prototype = {
		_restore: null,
		_moving: null,
		_resizing: null,

		slots: {
			move: function move(e) {
				var event = convertMoveEvent(e);

				if (!this.enabled || !this.movable) {
					return;
				}

				this._moving = this.toLocal({
					x: event.pageX,
					y: event.pageY
				});

				this.view.el.classList.add('move');
				this._space.el.classList.add('no-events');

				e.preventDefault();
			}
		},

		events: {
			window: {
				'click': function click(e) {
					this.signals.emit('select', this, e);
				},

				'mousedown': function mousedown(e) {
					this.focus();

					if (this.widget) {
						this.slots.move.call(this, e);
					}
				},

				'.wm-content click': function wmContentClick(e) {
					if (this.enabled) {
						this.signals.emit('click', this, e);
					}
				},

				'.wm-window-title mousedown': function wmWindowTitleMousedown(e) {
					if (!this.maximized) {
						this.slots.move.call(this, e);
					}
				},

				'.wm-window-title dblclick': function wmWindowTitleDblclick() {
					if (this.enabled && this.resizable) {
						this.maximize();
					}
				},

				'.wm-window-title button.wm-close click': function wmWindowTitleButtonWmCloseClick(e) {
					e.stopPropagation();
					e.preventDefault();

					if (this.enabled) {
						this.close();
					}
				},

				'.wm-window-title button.wm-maximize click': function wmWindowTitleButtonWmMaximizeClick(e) {
					e.stopPropagation();
					e.preventDefault();

					if (this.enabled && this.resizable) {
						this.maximize();
					}
				},

				'.wm-window-title button.wm-minimize click': function wmWindowTitleButtonWmMinimizeClick(e) {
					e.stopPropagation();
					e.preventDefault();

					if (this.enabled) {
						this.minimize();
					}
				},

				'.wm-window-title button mousedown': function wmWindowTitleButtonMousedown(e) {
					this.focus();

					e.stopPropagation();
					e.preventDefault();
				},

				'button.wm-resize mousedown': function buttonWmResizeMousedown(e) {
					var event = convertMoveEvent(e);

					if (!this.enabled || !this.resizable) {
						return;
					}

					this._resizing = {
						width: this.width - event.pageX,
						height: this.height - event.pageY
					};

					this._space.el.classList.add('no-events');
					this.view.el.classList.add('resizing');

					e.preventDefault();
				}
			},

			space: {
				'mousemove': function mousemove(e) {
					var event = convertMoveEvent(e);

					// Fix #20. Mousemove outside browser
					if (!isTouchEvent(e) && e.which !== 1) {
						this._moving && this._stopMove();
						this._resizing && this._stopResize();
					}

					if (this._moving) {
						if (this.stayinspace) {
							if (this.view.el.clientWidth > this.space.el.clientWidth || this.view.el.clientHeight > this.space.el.clientHeight) {
								this.resize(Math.min(this.view.el.clientWidth, this.space.el.clientWidth), Math.min(this.view.el.clientHeight, this.space.el.clientHeight));
							}
							var movingX = Math.max(0, event.pageX - this._moving.x);
							var minusX = 0;
							var movingY = Math.max(0, event.pageY - this._moving.y);
							var minusY = 0;
							if (movingX + this.view.el.clientWidth > this.space.el.clientWidth) {
								minusX = movingX + this.view.el.clientWidth - this.space.el.clientWidth;
							}
							if (movingY + this.view.el.clientHeight > this.space.el.clientHeight) {
								minusY = movingY + this.view.el.clientHeight - this.space.el.clientHeight;
							}
							this.move(movingX - minusX, movingY - minusY);
						} else {
							this.move(event.pageX - this._moving.x, event.pageY - this._moving.y);
						}
					}

					if (this._resizing) {
						this.resize(event.pageX + this._resizing.width, event.pageY + this._resizing.height);
					}
				},

				'mouseup': function mouseup() {
					this._moving && this._stopMove();
					this._resizing && this._stopResize();
				}
			}
		},

		_stopMove: function _stopMove() {
			this.view.el.classList.remove('move');
			this._space.el.classList.remove('no-events');
			this._moving = null;
		},

		_stopResize: function _stopResize() {
			this._space.el.classList.remove('no-events');
			this.view.el.classList.remove('resizing');
			this._restore = null;
			this._resizing = null;
		},

		set space(el) {
			if (el && !(el instanceof View)) {
				console.error('The given space element is not a valid View.');
				return;
			}

			this._space = el;
			el.append(this.view);
			el.listen(this.events.space, this);
		},

		get space() {
			return this._space;
		},

		get maximized() {
			return this._maximized;
		},

		set maximized(value) {
			if (value) {
				this._restoreMaximized = this.stamp();
				this.view.el.classList.add('maximized');
				this.signals.emit('maximize', this, this._restoreMaximized);
			} else {
				this.view.el.classList.remove('maximized');
				this.signals.emit('restore', this, this._restoreMaximized);
			}
			this._maximized = value;
		},

		get minimized() {
			return this._minimized;
		},

		set minimized(value) {
			if (value) {
				this._restoreMinimized = this.stamp();
				this.signals.emit('minimize', this, this._restoreMinimized);
			} else {
				this.signals.emit('restore', this, this._restoreMinimized);
			}

			this._minimized = value;
		},

		set active(value) {
			if (value) {
				this.signals.emit('focus', this);
				this.view.el.classList.add('active');
				this.view.el.classList.remove('inactive');
			} else {
				this.signals.emit('blur', this);
				this.view.el.classList.remove('active');
				this.view.el.classList.add('inactive');
			}

			this._active = value;
		},

		get active() {
			return this._active;
		},

		set enabled(value) {
			if (!value) {
				this.view.el.classList.add('disabled');
			} else {
				this.view.el.classList.remove('disabled');
			}

			this._enabled = value;
		},

		get enabled() {
			return this._enabled;
		},

		set movable(value) {
			this._movable = !!value;
		},

		get movable() {
			return this._movable;
		},

		set resizable(value) {
			if (!value) {
				this.view.el.classList.add('noresizable');
			} else {
				this.view.el.classList.remove('noresizable');
			}

			this._resizable = !!value;
		},

		get resizable() {
			return this._resizable;
		},

		set closed(value) {}, // jshint ignore:line
		get closed() {
			return this._closed;
		},

		set destroyed(value) {}, // jshint ignore:line
		get destroyed() {
			return this._destroyed;
		},

		set widget(value) {
			this._widget = value;
		},

		get widget() {
			return this._widget;
		},

		set titlebar(value) {
			if (value) {
				this.$titlebar.el.classList.remove('hide');
			} else {
				this.$titlebar.el.classList.add('hide');
			}

			this._titlebar = value;
		},

		get titlebar() {
			return this._titlebar;
		},

		set animations(value) {
			if (value) {
				this.view.el.classList.add('animated');
			} else {
				this.view.el.classList.remove('animated');
			}

			this._animations = value;
		},

		get animations() {
			return this._animations;
		},

		set width(value) {
			this.view.width = value;
		},

		get width() {
			return parseInt(this.view.width, 10);
		},

		set height(value) {
			this.view.height = value;
		},

		get height() {
			return parseInt(this.view.height, 10);
		},

		set x(value) {
			this.view.el.style.left = value + 'px';
		},

		set y(value) {
			this.view.el.style.top = value + 'px';
		},

		get x() {
			return parseInt(this.view.el.style.left || 0, 10);
		},

		get y() {
			return parseInt(this.view.el.style.top || 0, 10);
		},

		set z(value) {
			this.view.el.style.zIndex = value;
		},

		get z() {
			return parseInt(this.view.el.style.zIndex || 0, 10);
		},

		open: function open() {
			var _this = this;

			return new Promise(function (done) {
				_this.signals.emit('open', _this);

				// Open animation.
				_this.view.show();
				_this.view.el.classList.add('opening');
				_this.view.onAnimationEnd(function () {
					_this.view.el.classList.remove('opening');
					done();
				}, _this);
				_this._closed = false;
			});
		},
		close: function close() {
			var _this2 = this;

			return new Promise(function (done) {
				_this2.signals.emit('close', _this2);

				_this2.view.el.classList.add('closing');
				_this2.view.onAnimationEnd(function () {
					_this2.view.el.classList.remove('closing');
					_this2.view.el.classList.add('closed');
					_this2.view.hide();

					_this2.signals.emit('closed', _this2);
					done();
				}, _this2);

				_this2._closed = true;
			});
		},
		destroy: function destroy() {
			var _this3 = this;

			var destroy = function destroy() {
				_this3.$content.empty();
				_this3.signals.emit('destroyed', _this3);
				_this3._destroyed = true;
			};

			this.signals.emit('destroy', this);

			if (!this.closed) {
				this.close().then(function () {
					return destroy();
				});
			} else {
				destroy();
			}
		},
		resize: function resize(w, h) {
			this.width = w;
			this.height = h;
			return this;
		},
		move: function move(x, y) {
			this.x = x;
			this.y = y;
			return this;
		},


		/**
   * @return A function that restores this window
   */
		stamp: function stamp() {
			this.restore = function () {
				var size = {
					width: this.width,
					height: this.height
				};

				var pos = {
					x: this.x,
					y: this.y
				};

				return function () {
					this.resize(size.width, size.height);
					this.move(pos.x, pos.y);

					return this;
				};
			}.apply(this);

			return this.restore;
		},
		restore: function restore() {},
		maximize: function maximize() {
			this.view.el.classList.add('maximazing');

			var endMaximize = function endMaximize() {
				this.view.el.classList.remove('maximazing');
			};

			if (this.animations) {
				this.view.onTransitionEnd(endMaximize, this);
			} else {
				endMaximize.call(this);
			}

			this.maximized = !this.maximized;
			return this;
		},
		minimize: function minimize() {
			this.view.el.classList.add('minimizing');

			var endMinimize = function endMinimize() {
				this.view.el.classList.remove('minimizing');
			};

			if (this.animations) {
				this.view.onTransitionEnd(endMinimize, this);
			} else {
				endMinimize.call(this);
			}

			this.minimized = !this.minimized;
			return this;
		},
		focus: function focus() {
			this.active = true;
			return this;
		},
		blur: function blur() {
			this.active = false;
			return this;
		},
		toLocal: function toLocal(coord) {
			return {
				x: coord.x - this.x,
				y: coord.y - this.y
			};
		},
		toGlobal: function toGlobal(coord) {
			return {
				x: coord.x + this.x,
				y: coord.y + this.y
			};
		},
		append: function append(content) {
			this.$content.append(content);
		}
	};

	return Window;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ }),

/***/ "./ventus/wm/windowmanager.js":
/*!************************************!*\
  !*** ./ventus/wm/windowmanager.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Ventus
 * Copyright © 2012 Ramón Lamana
 * https://github.com/rlamana
 */
!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! ventus/wm/window */ "./ventus/wm/window.js"), __webpack_require__(/*! ventus/core/view */ "./ventus/core/view.js"), __webpack_require__(/*! ventus/wm/modes/default */ "./ventus/wm/modes/default.js"), __webpack_require__(/*! ventus/wm/modes/expose */ "./ventus/wm/modes/expose.js"), __webpack_require__(/*! ventus/less/windowmanager.less */ "./ventus/less/windowmanager.less")], __WEBPACK_AMD_DEFINE_RESULT__ = (function (Window, View, DefaultMode, ExposeMode) {
	'use strict';

	var WindowManager = function WindowManager(container) {
		var createWindow;
		var root = container ? container : document.body;

		this.view = new View('<div class="wm-space"><div class="wm-overlay" /></div>');
		root.insertBefore(this.view.el, root.firstChild);

		this.$overlay = this.view.find('.wm-overlay');
		this.$overlay.el.style.zIndex = this._baseZ - 1;

		// Generate mode plugin actions wrapper
		this.actions.forEach(function (value) {
			this[value] = function (action) {
				return function () {
					if (this.currentMode.actions[action]) {
						this.currentMode.actions[action].apply(this, arguments);
					}
				};
			}.call(this, value);
		}, this);

		// Launch register of every mode plugged-in
		for (var mode in this.modes) {
			if (this.modes.hasOwnProperty(mode) && this.modes[mode].register) {
				this.modes[mode].register.apply(this);
			}
		}

		this.windows = [];
		this.active = null;

		this.mode = 'default';

		// Replace createWindow function on prototype with instance-specific copy
		// (avoids pollution of prototype during the next step)
		createWindow = this.createWindow;
		this.createWindow = createWindow.bind(this);
		// Bind this to sub-functions of createWindow function
		this.createWindow.fromQuery = createWindow.fromQuery.bind(this);
		this.createWindow.fromElement = createWindow.fromElement.bind(this);
	};

	WindowManager.prototype = {
		actions: ['focus', 'blur', 'close', 'maximize', 'minimize', 'restore', 'select'],

		modes: {
			'default': DefaultMode,
			'expose': ExposeMode
		},

		set mode(value) {
			var mode = this.modes[value];
			if (!mode || this._mode === value) {
				return;
			}

			// Unplug old system
			if (this._mode && this.currentMode.unplug) {
				this.currentMode.unplug.apply(this);
			}

			// Plug new mode system
			if (mode.plug) {
				mode.plug.apply(this);
			}

			this._mode = value;
		},

		get mode() {
			return this._mode;
		},

		get currentMode() {
			return this.modes[this._mode];
		},

		set overlay(value) {
			this.$overlay.el.style.opacity = value ? 0.8 : 0;
			this._overlay = this.$overlay.el.style.opacity;
		},

		get overlay() {
			return this._overlay;
		},

		createWindow: function createWindow(options) {
			var win = new Window(options);

			// Show 'default' mode
			this.mode = 'default';

			// Connect window signals to the manager listeners
			win.signals.on('focus', this._focus, this);
			win.signals.on('blur', this._blur, this);
			win.signals.on('close', this._close, this);

			// Connect window signals to manager mode actions
			this.actions.forEach(function (action) {
				win.signals.on(action, this[action], this);
			}, this);

			this.windows.push(win);

			win.space = this.view;

			win.focus();
			return win;
		},


		/**
   * Internal action always performed besides the mode definition
   */
		_focus: function _focus(win) {
			var currentZ,
			    baseZ = 10000,
			    maxZ = baseZ + 10000,
			    index;

			if (this.active && this.active === win) {
				return;
			}

			if (this.active) {
				currentZ = this.active.z;
				this.active.blur();
			} else {
				currentZ = baseZ;
			}

			// Reorder windows stack (@todo optimize this)
			index = this.windows.indexOf(win);
			this.windows.splice(index, 1); // Remove from array
			this.windows.push(win);

			win.z = currentZ + 1;

			// Refresh z-indexes just every 'maxZ' activations
			if (currentZ > maxZ + this.windows.length) {
				for (var z, i = this.windows.length; i--;) {
					z = this.windows[i].z;
					this.windows[i].z = baseZ + (z - maxZ);
				}
			}

			this.active = win;
		},


		/**
   * Internal action always performed besides the mode definition
   */
		_blur: function _blur(win) {
			if (this.active === win) {
				this.active = null;
			}
		},


		/**
   * Internal action always performed besides the mode definition
   */
		_close: function _close(win) {
			// Remove window from manager
			var id = this.windows.indexOf(win),
			    len;
			if (id === -1) {
				console.log('Trying to close a window that doesn\'t exist in this window manager');
				return;
			}

			this.windows.splice(id, 1); // Remove from array
			len = this.windows.length;
			if (this.active && this.active === win) {
				this.active = len !== 0 ? this.windows[len - 1] : null;
				if (this.active) {
					this.active.focus();
				}
			}
		}
	};

	WindowManager.prototype.createWindow.fromQuery = function (selector, options) {
		var element = document.querySelector(selector);
		if (!!element) {
			options.content = new View(element);
		}
		return this.createWindow(options);
	};

	WindowManager.prototype.createWindow.fromElement = function (element, options) {
		options.content = new View(element);
		return this.createWindow(options);
	};

	return WindowManager;
}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ })

/******/ });
});
//# sourceMappingURL=ventus.js.map