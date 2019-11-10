(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("keen-dataviz"), require("keen-analysis"), require("keen-tracking"));
	else if(typeof define === 'function' && define.amd)
		define(["keen-dataviz", "keen-analysis", "keen-tracking"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("keen-dataviz"), require("keen-analysis"), require("keen-tracking")) : factory(root["keen-dataviz"], root["keen-analysis"], root["keen-tracking"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function(__WEBPACK_EXTERNAL_MODULE__0__, __WEBPACK_EXTERNAL_MODULE__2__, __WEBPACK_EXTERNAL_MODULE__3__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module) {

module.exports = {"name":"keen-js","version":"5.0.0","license":"MIT","main":"dist/node/keen.umd.js","browser":"dist/keen.umd.js","style":"dist/keen.css","repository":{"type":"git","url":"https://github.com/keen/keen-js.git"},"scripts":{"start":"NODE_ENV=development webpack-dev-server","postcss-watch":"node_modules/postcss-cli/bin/postcss style/keen.css -o test/demo/keen.css --watch --config postcss.config.js","test":"jest","build":"NODE_ENV=production webpack -p && NODE_ENV=production OPTIMIZE_MINIMIZE=1 webpack -p && npm run build:bundle && npm run build:node && npm run build:css && npm run build:css:min","build:bundle":"NODE_ENV=production BUNDLE=1 webpack -p && NODE_ENV=production OPTIMIZE_MINIMIZE=1 BUNDLE=1 webpack -p ","build:node":"TARGET=node NODE_ENV=production webpack -p","build:css":"node_modules/postcss-cli/bin/postcss style/keen.css -o dist/keen.css --config postcss.config.js","build:css:min":"OPTIMIZE_MINIMIZE=1 node_modules/postcss-cli/bin/postcss style/keen.css -o dist/keen.min.css --config postcss.config.js","preversion":"npm run build","version":"git add .","postversion":"git push && git push --tags","profile":"webpack --profile --json > stats.json","analyze":"webpack-bundle-analyzer stats.json /dist"},"bugs":"https://github.com/keen/keen-js/issues","author":"Keen IO <team@keen.io> (https://keen.io/)","contributors":["Dustin Larimer <dustin@keen.io> (https://github.com/dustinlarimer)","Joanne Cheng <joanne@keen.io> (http://joannecheng.me)","Adam Kasprowicz <adam.kasprowicz@keen.io> (https://github.com/adamkasprowicz)"],"dependencies":{"keen-analysis":"^2.0.0","keen-dataviz":"^2.0.0","keen-tracking":"^2.0.0"},"devDependencies":{"autoprefixer":"^8.2.0","babel-loader":"^7.1.4","babel-plugin-transform-es2015-modules-commonjs":"^6.26.2","babel-plugin-transform-object-rest-spread":"^6.26.0","babel-preset-env":"^1.7.0","concurrently":"^3.5.1","cssnano":"^3.10.0","eslint":"^4.19.1","eslint-config-airbnb":"^16.1.0","eslint-loader":"^2.0.0","eslint-plugin-import":"^2.11.0","eslint-plugin-jsx-a11y":"^6.0.3","eslint-plugin-react":"^7.7.0","event-stream":"^3.1.7","gulp":"^3.8.10","gulp-awspublish":"0.0.23","gulp-rename":"^1.2.0","gulp-util":"^3.0.1","html-loader":"^0.5.5","jest":"^22.4.3","postcss":"^6.0.21","postcss-cli":"^5.0.0","postcss-cssnext":"^2.4.0","postcss-import":"^8.2.0","postcss-loader":"^2.1.3","precss":"^3.1.2","style-loader":"^0.20.3","webpack":"^4.5.0","webpack-bundle-analyzer":"^2.11.1","webpack-cli":"^2.0.13","webpack-dev-server":"^3.1.1"}};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keenTracking = __webpack_require__(3);

var _keenTracking2 = _interopRequireDefault(_keenTracking);

var _keenAnalysis = __webpack_require__(2);

var _keenAnalysis2 = _interopRequireDefault(_keenAnalysis);

var _keenDataviz = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_keenTracking2.default.extendLibrary(_keenTracking2.default, _keenAnalysis2.default);
_keenTracking2.default.version = __webpack_require__(1).version;

_keenTracking2.default.prototype.draw = function (query, el, attributes) {
  var chart = (0, _keenDataviz.Dataviz)().attributes(attributes).el(el).prepare();

  this.run(query, function (err, res) {
    if (err) {
      chart.message(err.message);
    } else {
      chart.data(res).render();
    }
  });
  return chart;
};

exports.default = _keenTracking2.default;

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Keen = exports.Dataset = exports.Dataviz = exports.extendKeenGlobalObject = undefined;

var _keenDataviz = __webpack_require__(0);

Object.defineProperty(exports, 'Dataviz', {
  enumerable: true,
  get: function get() {
    return _keenDataviz.Dataviz;
  }
});
Object.defineProperty(exports, 'Dataset', {
  enumerable: true,
  get: function get() {
    return _keenDataviz.Dataset;
  }
});

var _index = __webpack_require__(4);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : {};

var extendKeenGlobalObject = exports.extendKeenGlobalObject = function extendKeenGlobalObject(env) {
  env.Keen = Keen;
};

if ("undefined" !== 'undefined' && undefined || typeof KEEN_EXPOSE_AS_GLOBAL_OBJECT !== 'undefined') {
  extendKeenGlobalObject(env);
}

var Keen = exports.Keen = _index2.default;
Keen.Dataviz = _keenDataviz.Dataviz;
Keen.Dataset = _keenDataviz.Dataset;

exports.default = Keen;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(5)))

/***/ })
/******/ ]);
});
//# sourceMappingURL=keen.umd.js.map