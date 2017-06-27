(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("EmbedBox", [], factory);
	else if(typeof exports === 'object')
		exports["EmbedBox"] = factory();
	else
		root["EmbedBox"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 165);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + (valA && valB && ';') + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '', delim = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + delim + style + ':' + val[style];
        delim = ';';
      }
    }
    return out;
  } else {
    val = '' + val;
    if (val[val.length - 1] === ';') return val.slice(0, -1);
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(164).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ },
/* 1 */
/***/ function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_screenshot_pug__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_screenshot_pug___default = __WEBPACK_IMPORTED_MODULE_0__base_screenshot_pug__ && __WEBPACK_IMPORTED_MODULE_0__base_screenshot_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__base_screenshot_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__base_screenshot_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__base_screenshot_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__base_screenshot_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screenshot_iframe_styl__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__screenshot_iframe_styl___default = __WEBPACK_IMPORTED_MODULE_1__screenshot_iframe_styl__ && __WEBPACK_IMPORTED_MODULE_1__screenshot_iframe_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__screenshot_iframe_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__screenshot_iframe_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__screenshot_iframe_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__screenshot_iframe_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_base_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lib_create_stylesheet_template__ = __webpack_require__(9);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return BaseScreenshot; });var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _desc, _value, _class, _class2, _temp;

var _templateObject = _taggedTemplateLiteralLoose(["\n      .screenshot .focal-point {\n        box-shadow: 0 0 0 4px ", "\n      }\n\n      .screenshot a.focal-point {\n        background-color: ", "\n      }\n\n      .screenshot [data-arrow]::before,\n      .screenshot [data-arrow]::after {\n        color: ", "\n      }\n    "], ["\n      .screenshot .focal-point {\n        box-shadow: 0 0 0 4px ", "\n      }\n\n      .screenshot a.focal-point {\n        background-color: ", "\n      }\n\n      .screenshot [data-arrow]::before,\n      .screenshot [data-arrow]::after {\n        color: ", "\n      }\n    "]);

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}








var toPrecision = function toPrecision(number) {
  var precision = arguments.length <= 1 || arguments[1] === undefined ? 5 : arguments[1];
  return parseFloat(number.toPrecision(precision));
};

var BaseScreenshot = (_class = (_temp = _class2 = function () {
  function BaseScreenshot(spec) {
    _classCallCheck(this, BaseScreenshot);

    this.serialize = __WEBPACK_IMPORTED_MODULE_3_components_base_component__["a" /* default */].prototype.serialize;

    _extends(this, spec);
  }

  BaseScreenshot.prototype.setScale = function setScale() {
    var _this = this;

    var iframeDocument = this.iframe.contentDocument;
    var getComputedStyle = iframeDocument.defaultView.getComputedStyle;

    var _getComputedStyle = getComputedStyle(iframeDocument.body);

    var widthStyle = _getComputedStyle.width;
    var heightStyle = _getComputedStyle.height;

    var width = parseInt(widthStyle, 10);
    var height = parseInt(heightStyle, 10);
    var intrinsicRatio = toPrecision(height / width);
    var paddingBottom = intrinsicRatio * 100 + "%";

    this.iframe.setAttribute("width", width);
    this.iframe.setAttribute("height", height);
    this.element.style.paddingBottom = paddingBottom;

    requestAnimationFrame(function () {
      var scale = toPrecision(_this.element.clientWidth / width);

      _this.iframe.style.transform = "scale(" + scale + ")";
      _this.element.setAttribute("data-render-state", "scaled");
    });
  };

  BaseScreenshot.prototype.applyTheme = function applyTheme() {
    var _constructor = this.constructor;
    var iframeStylesheet = _constructor.iframeStylesheet;
    var stylesheet = _constructor.stylesheet;

    var iframeDocument = this.iframe.contentDocument;
    var iframeStyle = iframeDocument.createElement("style");
    var style = iframeDocument.createElement("style");

    var stylesheetTemplate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lib_create_stylesheet_template__["a" /* default */])(this.store.theme);

    var themeStyles = stylesheetTemplate(_templateObject, "screenshotAnnotationColor", "screenshotAnnotationColor", "screenshotAnnotationColor");

    iframeStyle.innerHTML = [iframeStylesheet, themeStyles].join(" ");
    iframeDocument.head.appendChild(iframeStyle);

    style.innerHTML = stylesheet;
    iframeDocument.head.appendChild(style);
  };

  BaseScreenshot.prototype.render = function render(target) {
    var _this2 = this;

    var _constructor2 = this.constructor;
    var iframeTemplate = _constructor2.iframeTemplate;
    var template = _constructor2.template;

    var element = this.element = this.serialize(iframeTemplate);

    this.iframe = element.querySelector("iframe");

    this.iframe.onload = function () {
      _this2.applyTheme();

      var iframeDocument = _this2.iframe.contentDocument;
      var element = _this2.serialize.call(target, template);

      iframeDocument.body.appendChild(element);

      requestAnimationFrame(function () {
        if (_this2.componentDidMount) _this2.componentDidMount(target);
        _this2.setScale();
      });

      window.addEventListener("resize", function () {
        _this2.setScale();
      });
    };

    return this.element;
  };

  return BaseScreenshot;
}(), _class2.iframeTemplate = __WEBPACK_IMPORTED_MODULE_0__base_screenshot_pug___default.a, _class2.iframeStylesheet = __WEBPACK_IMPORTED_MODULE_1__screenshot_iframe_styl___default.a, _temp), (_applyDecoratedDescriptor(_class.prototype, "setScale", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "setScale"), _class.prototype)), _class);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_target_pug__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_target_pug___default = __WEBPACK_IMPORTED_MODULE_0__base_target_pug__ && __WEBPACK_IMPORTED_MODULE_0__base_target_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__base_target_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__base_target_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__base_target_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__base_target_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__title_pug__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__title_pug___default = __WEBPACK_IMPORTED_MODULE_1__title_pug__ && __WEBPACK_IMPORTED_MODULE_1__title_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__title_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__title_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__title_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_1__title_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__download_link_pug__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__download_link_pug___default = __WEBPACK_IMPORTED_MODULE_2__download_link_pug__ && __WEBPACK_IMPORTED_MODULE_2__download_link_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2__download_link_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2__download_link_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2__download_link_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_2__download_link_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__before_content_pug__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__before_content_pug___default = __WEBPACK_IMPORTED_MODULE_3__before_content_pug__ && __WEBPACK_IMPORTED_MODULE_3__before_content_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3__before_content_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3__before_content_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_3__before_content_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_3__before_content_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__after_content_pug__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__after_content_pug___default = __WEBPACK_IMPORTED_MODULE_4__after_content_pug__ && __WEBPACK_IMPORTED_MODULE_4__after_content_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_4__after_content_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_4__after_content_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_4__after_content_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_4__after_content_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_target_svg__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__base_target_svg___default = __WEBPACK_IMPORTED_MODULE_5__base_target_svg__ && __WEBPACK_IMPORTED_MODULE_5__base_target_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_5__base_target_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_5__base_target_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_5__base_target_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_5__base_target_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_icons__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_autobind_decorator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_7_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_7_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_7_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_7_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_7_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_7_autobind_decorator___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_components_base_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_clipboard__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_clipboard___default = __WEBPACK_IMPORTED_MODULE_9_clipboard__ && __WEBPACK_IMPORTED_MODULE_9_clipboard__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_9_clipboard__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_9_clipboard__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_9_clipboard___default, 'a', __WEBPACK_IMPORTED_MODULE_9_clipboard___default);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return BaseTarget; });var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}













var CopyIcon = __WEBPACK_IMPORTED_MODULE_6_components_icons__["copy"];
var CollapseIcon = __WEBPACK_IMPORTED_MODULE_6_components_icons__["collapse"];


function getLocation(targetUsesHead, storeUsesHead) {
  // Respect target specific falsey values.
  var insertInHead = typeof targetUsesHead !== "undefined" ? targetUsesHead : storeUsesHead;

  return insertInHead ? "head" : "body";
}

var BaseTarget = (_class = (_temp = _class2 = function (_BaseComponent) {
  _inherits(BaseTarget, _BaseComponent);

  BaseTarget.isConstructable = function isConstructable(config, store) {
    var supportsPlugin = this.supports.plugin;
    var supportsLocation = this.supports.insertInto;
    var hasLocalEmbed = !!config.embedCode;
    var hasGlobalEmbed = !!store.embedCode;
    var embedCodePresent = hasLocalEmbed || hasGlobalEmbed;
    var hasPluginURL = !!config.pluginURL;
    var location = getLocation(config.insertInHead, store.insertInHead);

    var locationIsValid = location === "head" && supportsLocation.head || location === "body" && supportsLocation.body;

    if (supportsPlugin) return hasPluginURL || locationIsValid && embedCodePresent;

    return locationIsValid && embedCodePresent;
  };

  function BaseTarget() {
    var spec = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, BaseTarget);

    var _this = _possibleConstructorReturn(this, _BaseComponent.call(this, spec));

    _this.versionID = _this.config.versionID || _this.versionIDs[0];
    return _this;
  }

  BaseTarget.prototype.compileTemplate = function compileTemplate() {
    __WEBPACK_IMPORTED_MODULE_8_components_base_component__["a" /* default */].prototype.compileTemplate.call(this, this.templateVars);

    this.element.setAttribute("data-component", this.id + "-target");
    this.element.setAttribute("data-flow", "column");
    this.element.setAttribute("autofocus", "");
    this.element.className = "target-instructions " + (this.element.className || "");

    return this.element;
  };

  BaseTarget.prototype.handleVersionChange = function handleVersionChange(_ref) {
    var value = _ref.target.value;

    this.versionID = value;
    this.render();
  };

  BaseTarget.prototype.setupCollapsibleCopyContainers = function setupCollapsibleCopyContainers() {
    var _refs$copyContainers = this.refs.copyContainers;
    var copyContainers = _refs$copyContainers === undefined ? [] : _refs$copyContainers;


    copyContainers.forEach(function (copyContainer) {
      var copyableContent = copyContainer.querySelector(".copyable");
      var isMultiline = copyableContent.textContent.split("\n").length > 1;

      if (!isMultiline) return;

      var collapseButton = document.createElement("button");
      var collapseIcon = new CollapseIcon();

      collapseButton.className = "button collapse";
      collapseButton.appendChild(collapseIcon.render());
      collapseButton.addEventListener("click", function () {
        var collapsed = copyContainer.getAttribute("collapsed") === "true";

        copyContainer.setAttribute("collapsed", !collapsed);
      });

      copyContainer.setAttribute("collapsed", true);
      copyContainer.appendChild(collapseButton);
    });
  };

  BaseTarget.prototype.bindCopyButtons = function bindCopyButtons() {
    var iframe = this.store.iframe;
    var _refs$copyButtons = this.refs.copyButtons;
    var copyButtons = _refs$copyButtons === undefined ? [] : _refs$copyButtons;


    copyButtons.forEach(function (copyButton) {
      var copyableContent = copyButton.parentNode.querySelector(".copyable");
      var copyIcon = new CopyIcon();

      copyButton.appendChild(copyIcon.render());

      copyableContent.addEventListener("click", function () {
        var range = iframe.document.createRange();
        var selection = iframe.window.getSelection();

        range.selectNodeContents(copyableContent);
        selection.removeAllRanges();
        selection.addRange(range);
      });

      var clipboard = new __WEBPACK_IMPORTED_MODULE_9_clipboard___default.a(copyButton, { text: function text() {
          return copyableContent.textContent;
        } });

      clipboard.on("success", function () {
        copyButton.setAttribute("data-status", "copied");
        setTimeout(function () {
          return copyButton.removeAttribute("data-status");
        }, 600);
      });
    });
  };

  BaseTarget.prototype.renderSteps = function renderSteps() {
    var _this2 = this;

    var stepsMount = this.refs.stepsMount;

    var _constructor$versions = this.constructor.versions.filter(function (version) {
      return version.id === _this2.versionID;
    });

    var version = _constructor$versions[0];

    var stepsElement = this.serialize(version.template, this.templateVars);

    this.refs.screenshotMounts = [];
    this.replaceElement(stepsMount, stepsElement);
    this.updateRefs();

    var _refs$screenshotMount = this.refs.screenshotMounts;
    var screenshotMounts = _refs$screenshotMount === undefined ? [] : _refs$screenshotMount;


    screenshotMounts.forEach(function (screenshotMount) {
      var Screenshot = version.screenshots[screenshotMount.getAttribute("data-screenshot")];
      var screenshot = new Screenshot({ store: _this2.store });

      _this2.replaceElement(screenshotMount, screenshot.render(_this2));
    });
  };

  BaseTarget.prototype.render = function render() {
    var previousElement = this.element;

    this.compileTemplate();
    this.renderSteps();

    var versionSelector = this.refs.versionSelector;


    if (versionSelector) {
      versionSelector.addEventListener("change", this.handleVersionChange);
    }

    this.setupCollapsibleCopyContainers();
    this.bindCopyButtons();

    if (previousElement) this.replaceElement(previousElement, this.element);

    return this.element;
  };

  BaseTarget.prototype.renderTitle = function renderTitle() {
    return this.constructor.titleTemplate.call(this, {
      config: this.store
    });
  };

  BaseTarget.prototype.renderDownloadLink = function renderDownloadLink() {
    return this.constructor.downloadLinkTemplate.call(this, { config: this.store });
  };

  BaseTarget.prototype.renderBeforeContent = function renderBeforeContent() {
    return this.constructor.beforeContentTemplate.call(this, { config: this.store });
  };

  BaseTarget.prototype.renderAfterContent = function renderAfterContent() {
    return this.constructor.afterContentTemplate.call(this, { config: this.store });
  };

  BaseTarget.prototype.startDownload = function startDownload() {
    var downloadIframe = document.createElement("iframe");

    downloadIframe.className = "embed-box-download-iframe";
    downloadIframe.src = this.pluginURL;
    document.body.appendChild(downloadIframe);
  };

  _createClass(BaseTarget, [{
    key: "autoDownloadLabel",
    get: function get() {
      return this.store.autoDownload ? "(Your download should begin automatically.)" : "";
    }
  }, {
    key: "downloadLabel",
    get: function get() {
      var supportsPlugin = this.constructor.supports.plugin;

      return supportsPlugin ? "Download the " + this.label + " plugin" : "Download " + this.store.name;
    }
  }, {
    key: "pluginURL",
    get: function get() {
      return this.config.pluginURL;
    }
  }, {
    key: "copyText",
    get: function get() {
      return this.config.embedCode || this.store.embedCode;
    }
  }, {
    key: "label",
    get: function get() {
      return this.constructor.label;
    }
  }, {
    key: "location",
    get: function get() {
      return getLocation(this.config.insertInHead, this.store.insertInHead);
    }
  }, {
    key: "icon",
    get: function get() {
      return this.constructor.icon || __WEBPACK_IMPORTED_MODULE_5__base_target_svg___default.a;
    }
  }, {
    key: "id",
    get: function get() {
      return this.constructor.id;
    }
  }, {
    key: "instructionsLabel",
    get: function get() {
      return "Instructions for " + this.label + " version";
    }
  }, {
    key: "headerTitle",
    get: function get() {
      return "Installing " + this.store.name + " <span class=\"with-more-icon-after\"></span> " + this.label;
    }
  }, {
    key: "templateVars",
    get: function get() {
      return this.constructor.templateVars;
    }
  }, {
    key: "title",
    get: function get() {
      return "Installing " + this.store.name + " onto a " + this.label + " site.";
    }
  }, {
    key: "versionIDs",
    get: function get() {
      return this.constructor.versions.map(function (version) {
        return version.id;
      });
    }
  }]);

  return BaseTarget;
}(__WEBPACK_IMPORTED_MODULE_8_components_base_component__["a" /* default */]), _class2.template = __WEBPACK_IMPORTED_MODULE_0__base_target_pug___default.a, _class2.titleTemplate = __WEBPACK_IMPORTED_MODULE_1__title_pug___default.a, _class2.beforeContentTemplate = __WEBPACK_IMPORTED_MODULE_3__before_content_pug___default.a, _class2.afterContentTemplate = __WEBPACK_IMPORTED_MODULE_4__after_content_pug___default.a, _class2.downloadLinkTemplate = __WEBPACK_IMPORTED_MODULE_2__download_link_pug___default.a, _class2.supports = {}, _class2.extend = function extend() {
  var _class3, _temp2;

  var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var icon = _ref2.icon;
  var id = _ref2.id;
  var label = _ref2.label;
  var template = _ref2.template;
  var templateVars = _ref2.templateVars;

  if (!id) throw new Error("EmbedBox: Target must have `id`");
  if (!label) throw new Error("EmbedBox: Target must have `label`");

  return _temp2 = _class3 = function (_BaseTarget) {
    _inherits(CustomTarget, _BaseTarget);

    function CustomTarget() {
      _classCallCheck(this, CustomTarget);

      return _possibleConstructorReturn(this, _BaseTarget.apply(this, arguments));
    }

    CustomTarget.isConstructable = function isConstructable() {
      return true;
    };

    return CustomTarget;
  }(BaseTarget), _class3.icon = icon, _class3.id = id, _class3.label = label, _class3.templateVars = templateVars || {}, _class3.versions = [{ id: id + "-custom-version", template: template }], _temp2;
}, _temp), (_applyDecoratedDescriptor(_class.prototype, "handleVersionChange", [__WEBPACK_IMPORTED_MODULE_7_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleVersionChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "startDownload", [__WEBPACK_IMPORTED_MODULE_7_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "startDownload"), _class.prototype)), _class);


/***/ },
/* 4 */
/***/ function(module, exports) {

"use strict";
/**
 * @copyright 2015, Andrey Popp <8mayday@gmail.com>
 *
 * The decorator may be used on classes or methods
 * ```
 * @autobind
 * class FullBound {}
 *
 * class PartBound {
 *   @autobind
 *   method () {}
 * }
 * ```
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = autobind;

function autobind() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (args.length === 1) {
    return boundClass.apply(undefined, args);
  } else {
    return boundMethod.apply(undefined, args);
  }
}

/**
 * Use boundMethod to bind all methods on the target.prototype
 */
function boundClass(target) {
  // (Using reflect to get all keys including symbols)
  var keys = undefined;
  // Use Reflect if exists
  if (typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function') {
    keys = Reflect.ownKeys(target.prototype);
  } else {
    keys = Object.getOwnPropertyNames(target.prototype);
    // use symbols if support is provided
    if (typeof Object.getOwnPropertySymbols === 'function') {
      keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
    }
  }

  keys.forEach(function (key) {
    // Ignore special case target method
    if (key === 'constructor') {
      return;
    }

    var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

    // Only methods need binding
    if (typeof descriptor.value === 'function') {
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    }
  });
  return target;
}

/**
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 * and memoize the result against a symbol on the instance
 */
function boundMethod(target, key, descriptor) {
  var fn = descriptor.value;

  if (typeof fn !== 'function') {
    throw new Error('@autobind decorator can only be applied to methods not: ' + typeof fn);
  }

  return {
    configurable: true,
    get: function get() {
      if (this === target.prototype || this.hasOwnProperty(key)) {
        return fn;
      }

      var boundFn = fn.bind(this);
      Object.defineProperty(this, key, {
        value: boundFn,
        configurable: true,
        writable: true
      });
      return boundFn;
    }
  };
}
module.exports = exports['default'];


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_from__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_from___default = __WEBPACK_IMPORTED_MODULE_0_array_from__ && __WEBPACK_IMPORTED_MODULE_0_array_from__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_array_from__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_array_from__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_array_from___default, 'a', __WEBPACK_IMPORTED_MODULE_0_array_from___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_autobind_decorator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_1_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_1_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_1_autobind_decorator___default);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return BaseComponent; });

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _desc, _value, _class, _class2, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}



// Ends with brackets e.g. [data-ref="foo[]"]
var ARRAY_REF_PATTERN = /([a-zA-Z\d]*)(\[?\]?)/;

var BaseComponent = (_class = (_temp = _class2 = function () {
  function BaseComponent() {
    var spec = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, BaseComponent);

    _extends(this, {
      store: null,
      element: null,
      refs: {}
    }, spec);

    this.appendStylesheet();
  }

  BaseComponent.prototype.appendStylesheet = function appendStylesheet() {
    var _this = this;

    var stylesheet = this.constructor.stylesheet;


    if (!stylesheet) return;
    if (!this.store) {
      console.error(this);
      throw new Error("Component attempted to mount stylesheet without a store reference");
    }

    var _store$iframe = this.store.iframe;
    var iframeElement = _store$iframe.element;
    var iframeDocument = _store$iframe.document;


    var onLoad = function onLoad() {
      if (iframeDocument.head.contains(_this.constructor.styleElement)) return;

      // Common style tag has yet to be inserted in iframe.
      var styleElement = iframeDocument.createElement("style");

      styleElement.innerHTML = stylesheet;
      _this.constructor.styleElement = iframeDocument.head.appendChild(styleElement);
    };

    if (iframeDocument.head) onLoad();else iframeElement.addEventListener("load", onLoad);
  };

  BaseComponent.prototype.asset = function asset(path) {
    return "" + this.store.assetPath + path;
  };

  BaseComponent.prototype.autofocus = function autofocus() {
    if (this.store.mode === "inline") return;

    var focusElement = this.element.querySelector("[autofocus]");

    if (focusElement) focusElement.focus();
  };

  // NOTE: Calling `updateRefs` multiple times from different tree depths may
  // allow parents to inherit a grandchild.


  BaseComponent.prototype.updateRefs = function updateRefs() {
    var refs = this.refs;


    __WEBPACK_IMPORTED_MODULE_0_array_from___default()(this.element.querySelectorAll("[data-ref]")).forEach(function (element) {
      var attribute = element.getAttribute("data-ref");

      var _attribute$match = attribute.match(ARRAY_REF_PATTERN);

      var key = _attribute$match[1];
      var arrayKey = _attribute$match[2];


      if (arrayKey) {
        // Multiple elements
        if (!Array.isArray(refs[key])) refs[key] = [];

        refs[key].push(element);
      } else {
        // Single element
        refs[key] = element;
      }

      element.removeAttribute("data-ref");
    });
  };

  BaseComponent.prototype.serialize = function serialize(template) {
    var templateVars = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    // `document` is used instead of iframe's document to prevent `instanceof` reference errors.
    var serializer = document.createElement("div");

    if (typeof template === "function") {
      serializer.innerHTML = template.call(this, _extends({
        asset: this.asset,
        config: this.store,
        label: this.label
      }, templateVars));
    } else {
      serializer.innerHTML = template;
    }

    return serializer.firstChild;
  };

  BaseComponent.prototype.compileTemplate = function compileTemplate() {
    var templateVars = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var template = this.constructor.template;


    this.element = this.serialize(template, templateVars);
    this.updateRefs();

    return this.element;
  };

  BaseComponent.prototype.label = function label(key) {
    var store = this.store;

    var value = store.labels[key];

    return typeof value === "function" ? value(store) : value;
  };

  BaseComponent.prototype.insertBefore = function insertBefore(sibling, element) {
    element.parentNode.insertBefore(sibling, element);
  };

  BaseComponent.prototype.removeElement = function removeElement(element) {
    if (!element || !element.parentNode) return null;

    return element.parentNode.removeChild(element);
  };

  BaseComponent.prototype.render = function render() {
    return this.compileTemplate();
  };

  BaseComponent.prototype.replaceElement = function replaceElement(current, next) {
    current.parentNode.insertBefore(next, current);
    current.parentNode.removeChild(current);

    next.tabIndex = current.tabIndex;

    this.updateRefs();
  };

  return BaseComponent;
}(), _class2.template = null, _class2.stylesheet = null, _class2.store = null, _temp), (_applyDecoratedDescriptor(_class.prototype, "asset", [__WEBPACK_IMPORTED_MODULE_1_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "asset"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "label", [__WEBPACK_IMPORTED_MODULE_1_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "label"), _class.prototype)), _class);


/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_base_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__close_svg__ = __webpack_require__(148);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__close_svg___default = __WEBPACK_IMPORTED_MODULE_1__close_svg__ && __WEBPACK_IMPORTED_MODULE_1__close_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__close_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__close_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__close_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_1__close_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__previous_svg__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__previous_svg___default = __WEBPACK_IMPORTED_MODULE_2__previous_svg__ && __WEBPACK_IMPORTED_MODULE_2__previous_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2__previous_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2__previous_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2__previous_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_2__previous_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__next_svg__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__next_svg___default = __WEBPACK_IMPORTED_MODULE_3__next_svg__ && __WEBPACK_IMPORTED_MODULE_3__next_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3__next_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3__next_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_3__next_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_3__next_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_svg__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_svg___default = __WEBPACK_IMPORTED_MODULE_4__search_svg__ && __WEBPACK_IMPORTED_MODULE_4__search_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_4__search_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_4__search_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_4__search_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_4__search_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__clear_svg__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__clear_svg___default = __WEBPACK_IMPORTED_MODULE_5__clear_svg__ && __WEBPACK_IMPORTED_MODULE_5__clear_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_5__clear_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_5__clear_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_5__clear_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_5__clear_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__copy_svg__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__copy_svg___default = __WEBPACK_IMPORTED_MODULE_6__copy_svg__ && __WEBPACK_IMPORTED_MODULE_6__copy_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_6__copy_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_6__copy_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_6__copy_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_6__copy_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__collapse_svg__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__collapse_svg___default = __WEBPACK_IMPORTED_MODULE_7__collapse_svg__ && __WEBPACK_IMPORTED_MODULE_7__collapse_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_7__collapse_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_7__collapse_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_7__collapse_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_7__collapse_svg___default);

/* harmony export */ __webpack_require__.d(exports, "svgToComponent", function() { return svgToComponent; });
/* harmony export */ __webpack_require__.d(exports, "close", function() { return close; });
/* harmony export */ __webpack_require__.d(exports, "previous", function() { return previous; });
/* harmony export */ __webpack_require__.d(exports, "next", function() { return next; });
/* harmony export */ __webpack_require__.d(exports, "search", function() { return search; });
/* harmony export */ __webpack_require__.d(exports, "clear", function() { return clear; });
/* harmony export */ __webpack_require__.d(exports, "copy", function() { return copy; });
/* harmony export */ __webpack_require__.d(exports, "collapse", function() { return collapse; });var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }



var svgToComponent = function svgToComponent(template) {
  var _class, _temp;

  return _temp = _class = function (_BaseComponent) {
    _inherits(Icon, _BaseComponent);

    function Icon() {
      var attributes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, Icon);

      var _this = _possibleConstructorReturn(this, _BaseComponent.call(this));

      _this.attributes = _extends({ class: "icon" }, attributes);
      return _this;
    }

    Icon.prototype.render = function render() {
      var _this2 = this;

      var element = this.compileTemplate();

      Object.keys(this.attributes).forEach(function (key) {
        return element.setAttribute(key, _this2.attributes[key]);
      });

      return element;
    };

    return Icon;
  }(__WEBPACK_IMPORTED_MODULE_0_components_base_component__["a" /* default */]), _class.template = template, _temp;
};


var close = svgToComponent(__WEBPACK_IMPORTED_MODULE_1__close_svg___default.a);


var previous = svgToComponent(__WEBPACK_IMPORTED_MODULE_2__previous_svg___default.a);


var next = svgToComponent(__WEBPACK_IMPORTED_MODULE_3__next_svg___default.a);


var search = svgToComponent(__WEBPACK_IMPORTED_MODULE_4__search_svg___default.a);


var clear = svgToComponent(__WEBPACK_IMPORTED_MODULE_5__clear_svg___default.a);


var copy = svgToComponent(__WEBPACK_IMPORTED_MODULE_6__copy_svg___default.a);


var collapse = svgToComponent(__WEBPACK_IMPORTED_MODULE_7__collapse_svg___default.a);

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

module.exports = (typeof Array.from === 'function' ?
  Array.from :
  __webpack_require__(14)
);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export */ exports["a"] = createStylesheetTemplate;function createStylesheetTemplate(definitions) {
  return function stylesheetTemplate(strings) {
    var merged = strings.slice();
    var offset = 0;

    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      values[_key - 1] = arguments[_key];
    }

    for (var i = 0; i < merged.length; i++) {
      if (i === values.length) break;

      offset++;
      var value = definitions[values[i] || "inherit"] + " !important;";

      merged.splice(i + offset, 0, value);
    }

    return merged.join("");
  };
}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = {
  backspace: 8,
  enter: 13,
  esc: 27,
  spacebar: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export */ exports["b"] = getRoute;/* harmony export */ exports["a"] = setRoute;var ROUTE_PREFIX = "#!/embed/";

function getRoute() {
  return window.location.hash.split(ROUTE_PREFIX)[1] || null;
}

function setRoute() {
  var route = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
  var pathname = window.location.pathname;


  if (route === "" && window.history.pushState && pathname !== "srcdoc") {
    window.history.pushState("", "", pathname);

    return;
  }

  window.location.hash = ROUTE_PREFIX + route;
}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_from__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_from___default = __WEBPACK_IMPORTED_MODULE_0_array_from__ && __WEBPACK_IMPORTED_MODULE_0_array_from__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_array_from__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_array_from__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_array_from___default, 'a', __WEBPACK_IMPORTED_MODULE_0_array_from___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__embed_box_styl__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__embed_box_styl___default = __WEBPACK_IMPORTED_MODULE_1__embed_box_styl__ && __WEBPACK_IMPORTED_MODULE_1__embed_box_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__embed_box_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__embed_box_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__embed_box_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__embed_box_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iframe_styl__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iframe_styl___default = __WEBPACK_IMPORTED_MODULE_2__iframe_styl__ && __WEBPACK_IMPORTED_MODULE_2__iframe_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2__iframe_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2__iframe_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2__iframe_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_2__iframe_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_autobind_decorator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_3_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_3_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_application__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lib_custom_event__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lib_request_animation_frame__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lib_store__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lib_routing__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lib_create_theme_stylesheet__ = __webpack_require__(18);

/* harmony export */ __webpack_require__.d(exports, "default", function() { return EmbedBoxBase; });

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp, _class2$iframeAttribu;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}












var MODE_ATTRIBUTE = "data-mode";
var VISIBILITY_ATTRIBUTE = "data-visibility";
var SCROLL_STATE_ATTRIBUTE = "data-embed-box-scroll-state";

function removeElement(element) {
  if (!element || !element.parentNode) return null;

  return element.parentNode.removeChild(element);
}

var EmbedBoxBase = (_class = (_temp = _class2 = function () {
  EmbedBoxBase.getTargetIDs = function getTargetIDs() {
    return this.fetchedTargets.map(function (target) {
      return target.id;
    });
  };

  function EmbedBoxBase() {
    var _this = this;

    var spec = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, EmbedBoxBase);

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_lib_request_animation_frame__["a" /* default */])(window);

    var _constructor = this.constructor;
    var iframeAttributes = _constructor.iframeAttributes;
    var stylesheet = _constructor.stylesheet;

    var store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_lib_store__["a" /* createStore */])(spec);
    var iframe = store.iframe;
    var routing = store.routing;
    var _spec$autoShow = spec.autoShow;
    var autoShow = _spec$autoShow === undefined ? true : _spec$autoShow;
    var _spec$className = spec.className;
    var className = _spec$className === undefined ? "" : _spec$className;
    var _spec$container = spec.container;
    var container = _spec$container === undefined ? document.body : _spec$container;
    var _spec$customTargets = spec.customTargets;
    var customTargets = _spec$customTargets === undefined ? [] : _spec$customTargets;
    var _spec$targets = spec.targets;
    var targetConfigs = _spec$targets === undefined ? {} : _spec$targets;


    Object.keys(iframeAttributes).forEach(function (key) {
      return iframe.element.setAttribute(key, iframeAttributes[key]);
    });

    iframe.element.className = "embed-box " + className;
    iframe.element.style.display = "none";
    iframe.element.addEventListener("transitionend", this._handleTransitionEnd);

    _extends(this, {
      destroyed: false,
      _store: store,
      _visible: false,
      _previousContainerScrollPosition: null,
      iframe: iframe,
      container: container,
      events: spec.events || {},
      style: document.createElement("style")
    });

    this.style.innerHTML = stylesheet;
    document.head.appendChild(this.style);

    var getConfig = function getConfig(_ref) {
      var id = _ref.id;
      return targetConfigs[id] || {};
    };
    var targetConstructors = customTargets.concat(this.constructor.fetchedTargets);
    var visibleTargets = targetConstructors.filter(function (Target) {
      var config = getConfig(Target);

      return config.priority !== -1 && Target.isConstructable(config, store);
    }).sort(function (a, b) {
      var priorityA = getConfig(a).priority;
      var priorityB = getConfig(b).priority;
      var aDefined = typeof priorityA === "number";
      var bDefined = typeof priorityB === "number";

      if (aDefined && bDefined) return priorityA - priorityB; // Explicit priority between targets
      else if (aDefined) return -1;else if (bDefined) return 1;

      return 0; // Implicit priority from fetchedTargets
    });

    if (visibleTargets.length === 0) {
      console.error(["EmbedBox: No targets were constructable.", "Is `embedCode` or `pluginURL` specified?"].join(" "), spec);
    }

    var initialTarget = spec.initialTarget;


    if (!initialTarget && routing) {
      initialTarget = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_lib_routing__["b" /* getRoute */])();

      if (!visibleTargets.some(function (_ref2) {
        var id = _ref2.id;
        return id === initialTarget;
      })) initialTarget = null;
    }

    this.iframe.element.onload = function () {
      // :active style fix for Safari
      iframe.document.addEventListener("touchstart", function () {}, true);

      _this._applyTheme(spec.style);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_lib_custom_event__["a" /* default */])(iframe);

      _this.application = new __WEBPACK_IMPORTED_MODULE_4_components_application__["a" /* default */](_this.iframe.document.body, {
        initialTarget: initialTarget,
        onClose: _this.hide,
        store: store,
        targets: visibleTargets.map(function (Target) {
          return new Target({ config: getConfig(Target), store: store });
        })
      });

      if (autoShow || _this._pendingShow) _this.show();

      if (_this.events.onLoad) _this.events.onLoad.call(_this);
    };

    this.container.appendChild(iframe.element); // iframe window & document is now accessible.
  }

  EmbedBoxBase.prototype._setVisible = function _setVisible(willBeVisible) {
    var _this2 = this;

    var currentlyVisible = this._visible;

    var update = function update() {
      _this2._visible = willBeVisible;
      var element = _this2.iframe.element;


      if (willBeVisible) element.style.display = "";

      requestAnimationFrame(function () {
        element.style.opacity = willBeVisible ? 1 : 0;
        element.setAttribute(VISIBILITY_ATTRIBUTE, willBeVisible ? "visible" : "hidden");

        if (_this2.events.visibilityChange) _this2.events.visibilityChange.call(_this2, willBeVisible);
      });
    };

    if (this.destroyed && currentlyVisible || !willBeVisible && currentlyVisible) {
      this._syncScrollState(willBeVisible, update);
    } else if (!this.destroyed && !currentlyVisible) {
      update();
    }

    return willBeVisible;
  };

  EmbedBoxBase.prototype._syncScrollState = function _syncScrollState(nextVisible) {
    var _this3 = this;

    var next = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

    // NOTE: The scroll state should be only be synced when the user cannot see
    // the update. Call this method only while the modal is opaque.

    var container = this.container;
    var _document = document;
    var documentElement = _document.documentElement;

    var nextValue = nextVisible && !this.destroyed ? "locked" : "unlocked";

    var checkLockState = function checkLockState() {
      if (nextValue === "unlocked") {
        container.scrollTop = _this3._previousContainerScrollPosition;
        _this3._previousContainerScrollPosition = null;
      }

      next();
    };

    if (this.destroyed || this.mode !== "modal") {
      documentElement.removeAttribute(SCROLL_STATE_ATTRIBUTE);
      container.removeAttribute(SCROLL_STATE_ATTRIBUTE);

      requestAnimationFrame(checkLockState);
      return;
    }

    if (nextValue === "locked") {
      this._previousContainerScrollPosition = container.scrollTop;
    }

    documentElement.setAttribute(SCROLL_STATE_ATTRIBUTE, nextValue);
    container.setAttribute(SCROLL_STATE_ATTRIBUTE, nextValue);

    requestAnimationFrame(checkLockState);
  };

  EmbedBoxBase.prototype._handleTransitionEnd = function _handleTransitionEnd(event) {
    if (event.target !== this.iframe.element) return;

    var iframeElement = this.iframe.element;

    if (this.visible) {
      this._syncScrollState(this.visible);
    } else {
      iframeElement.style.display = "none";
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_lib_routing__["a" /* setRoute */])("");
    }
  };

  EmbedBoxBase.prototype._applyTheme = function _applyTheme() {
    var extension = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var iframeStylesheet = this.constructor.iframeStylesheet;
    var theme = this._store.theme;

    var style = this.iframe.document.createElement("style");

    style.innerHTML = [iframeStylesheet, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_lib_create_theme_stylesheet__["a" /* default */])(theme), extension].join(" ");

    this.iframe.document.head.appendChild(style);
  };

  EmbedBoxBase.prototype.destroy = function destroy() {
    this.destroyed = true;
    this._setVisible(false);

    __WEBPACK_IMPORTED_MODULE_0_array_from___default()(document.querySelectorAll(".embed-box-download-iframe")).forEach(removeElement);

    removeElement(this.iframe.element);
    removeElement(this.style);
  };

  EmbedBoxBase.prototype.hide = function hide() {
    if (!this.visible) return;

    this._setVisible(false);
  };

  EmbedBoxBase.prototype.show = function show() {
    if (!this.application) {
      this._pendingShow = true;
      return;
    }

    if (this.visible) return;

    this._setVisible(true);

    this.application.autofocus();
  };

  _createClass(EmbedBoxBase, [{
    key: "container",
    get: function get() {
      return this._container;
    },
    set: function set(value) {
      var iframeElement = this.iframe.element;

      this._container = typeof value === "string" ? document.querySelector(value) : value;

      if (!this._container) {
        throw new Error("EmbedBox: Could not find container \"" + value + "\"");
      }

      var mode = this._container.tagName === "BODY" ? "modal" : "inline";

      this._store.mode = mode;
      iframeElement.setAttribute(MODE_ATTRIBUTE, mode);

      if (iframeElement.parentNode) {
        this._container.removeAttribute(SCROLL_STATE_ATTRIBUTE);
        this._container.appendChild(iframeElement);
      }

      return this._container;
    }
  }, {
    key: "mode",
    get: function get() {
      return this._store.mode;
    }
  }, {
    key: "visible",
    get: function get() {
      return this._visible;
    }
  }]);

  return EmbedBoxBase;
}(), _class2.stylesheet = __WEBPACK_IMPORTED_MODULE_1__embed_box_styl___default.a, _class2.iframeStylesheet = __WEBPACK_IMPORTED_MODULE_2__iframe_styl___default.a, _class2.fetchedTargets = [], _class2.version = "2.0.2", _class2.iframeAttributes = (_class2$iframeAttribu = {
  allowTransparency: ""
}, _class2$iframeAttribu[VISIBILITY_ATTRIBUTE] = "hidden", _class2$iframeAttribu.frameBorder = "0", _class2$iframeAttribu.srcdoc = "<div data-iframe-loader-shim style='display: none;'></div>", _class2$iframeAttribu.src = "about:blank", _class2$iframeAttribu), _temp), (_applyDecoratedDescriptor(_class.prototype, "_handleTransitionEnd", [__WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "_handleTransitionEnd"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "hide", [__WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "hide"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "show", [__WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "show"), _class.prototype)), _class);


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drupal__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__generic__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__joomla__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shopify__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__squarespace__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tumblr__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__weebly__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__wordpress__ = __webpack_require__(48);

/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_0__drupal__, "a")) __webpack_require__.d(exports, "drupal", function() { return __WEBPACK_IMPORTED_MODULE_0__drupal__["a"]; });


/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_1__generic__, "a")) __webpack_require__.d(exports, "generic", function() { return __WEBPACK_IMPORTED_MODULE_1__generic__["a"]; });


/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_2__joomla__, "a")) __webpack_require__.d(exports, "joomla", function() { return __WEBPACK_IMPORTED_MODULE_2__joomla__["a"]; });


/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_3__shopify__, "a")) __webpack_require__.d(exports, "shopify", function() { return __WEBPACK_IMPORTED_MODULE_3__shopify__["a"]; });


/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_4__squarespace__, "a")) __webpack_require__.d(exports, "squarespace", function() { return __WEBPACK_IMPORTED_MODULE_4__squarespace__["a"]; });


/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_5__tumblr__, "a")) __webpack_require__.d(exports, "tumblr", function() { return __WEBPACK_IMPORTED_MODULE_5__tumblr__["a"]; });


/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_6__weebly__, "a")) __webpack_require__.d(exports, "weebly", function() { return __WEBPACK_IMPORTED_MODULE_6__weebly__["a"]; });


/* harmony reexport */ if(__webpack_require__.o(__WEBPACK_IMPORTED_MODULE_7__wordpress__, "a")) __webpack_require__.d(exports, "wordpress", function() { return __WEBPACK_IMPORTED_MODULE_7__wordpress__["a"]; });


/***/ },
/* 14 */
/***/ function(module, exports) {

// Production steps of ECMA-262, Edition 6, 22.1.2.1
// Reference: http://www.ecma-international.org/ecma-262/6.0/#sec-array.from
module.exports = (function() {
  var isCallable = function(fn) {
    return typeof fn === 'function';
  };
  var toInteger = function (value) {
    var number = Number(value);
    if (isNaN(number)) { return 0; }
    if (number === 0 || !isFinite(number)) { return number; }
    return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
  };
  var maxSafeInteger = Math.pow(2, 53) - 1;
  var toLength = function (value) {
    var len = toInteger(value);
    return Math.min(Math.max(len, 0), maxSafeInteger);
  };
  var iteratorProp = function(value) {
    if(value != null) {
      if(['string','number','boolean','symbol'].indexOf(typeof value) > -1){
        return Symbol.iterator;
      } else if (
        (typeof Symbol !== 'undefined') &&
        ('iterator' in Symbol) &&
        (Symbol.iterator in value)
      ) {
        return Symbol.iterator;
      }
      // Support "@@iterator" placeholder, Gecko 27 to Gecko 35
      else if ('@@iterator' in value) {
        return '@@iterator';
      }
    }
  };
  var getMethod = function(O, P) {
    // Assert: IsPropertyKey(P) is true.
    if (O != null && P != null) {
      // Let func be GetV(O, P).
      var func = O[P];
      // ReturnIfAbrupt(func).
      // If func is either undefined or null, return undefined.
      if(func == null) {
        return void 0;
      }
      // If IsCallable(func) is false, throw a TypeError exception.
      if (!isCallable(func)) {
        throw new TypeError(func + ' is not a function');
      }
      return func;
    }
  };
  var iteratorStep = function(iterator) {
    // Let result be IteratorNext(iterator).
    // ReturnIfAbrupt(result).
    var result = iterator.next();
    // Let done be IteratorComplete(result).
    // ReturnIfAbrupt(done).
    var done = Boolean(result.done);
    // If done is true, return false.
    if(done) {
      return false;
    }
    // Return result.
    return result;
  };

  // The length property of the from method is 1.
  return function from(items /*, mapFn, thisArg */ ) {
    'use strict';

    // 1. Let C be the this value.
    var C = this;

    // 2. If mapfn is undefined, let mapping be false.
    var mapFn = arguments.length > 1 ? arguments[1] : void 0;

    var T;
    if (typeof mapFn !== 'undefined') {
      // 3. else
      //   a. If IsCallable(mapfn) is false, throw a TypeError exception.
      if (!isCallable(mapFn)) {
        throw new TypeError(
          'Array.from: when provided, the second argument must be a function'
        );
      }

      //   b. If thisArg was supplied, let T be thisArg; else let T
      //      be undefined.
      if (arguments.length > 2) {
        T = arguments[2];
      }
      //   c. Let mapping be true (implied by mapFn)
    }

    var A, k;

    // 4. Let usingIterator be GetMethod(items, @@iterator).
    // 5. ReturnIfAbrupt(usingIterator).
    var usingIterator = getMethod(items, iteratorProp(items));

    // 6. If usingIterator is not undefined, then
    if (usingIterator !== void 0) {
      // a. If IsConstructor(C) is true, then
      //   i. Let A be the result of calling the [[Construct]]
      //      internal method of C with an empty argument list.
      // b. Else,
      //   i. Let A be the result of the abstract operation ArrayCreate
      //      with argument 0.
      // c. ReturnIfAbrupt(A).
      A = isCallable(C) ? Object(new C()) : [];

      // d. Let iterator be GetIterator(items, usingIterator).
      var iterator = usingIterator.call(items);

      // e. ReturnIfAbrupt(iterator).
      if (iterator == null) {
        throw new TypeError(
          'Array.from requires an array-like or iterable object'
        );
      }

      // f. Let k be 0.
      k = 0;

      // g. Repeat
      var next, nextValue;
      while (true) {
        // i. Let Pk be ToString(k).
        // ii. Let next be IteratorStep(iterator).
        // iii. ReturnIfAbrupt(next).
        next = iteratorStep(iterator);

        // iv. If next is false, then
        if (!next) {

          // 1. Let setStatus be Set(A, "length", k, true).
          // 2. ReturnIfAbrupt(setStatus).
          A.length = k;

          // 3. Return A.
          return A;
        }
        // v. Let nextValue be IteratorValue(next).
        // vi. ReturnIfAbrupt(nextValue)
        nextValue = next.value;

        // vii. If mapping is true, then
        //   1. Let mappedValue be Call(mapfn, T, «nextValue, k»).
        //   2. If mappedValue is an abrupt completion, return
        //      IteratorClose(iterator, mappedValue).
        //   3. Let mappedValue be mappedValue.[[value]].
        // viii. Else, let mappedValue be nextValue.
        // ix.  Let defineStatus be the result of
        //      CreateDataPropertyOrThrow(A, Pk, mappedValue).
        // x. [TODO] If defineStatus is an abrupt completion, return
        //    IteratorClose(iterator, defineStatus).
        if (mapFn) {
          A[k] = mapFn.call(T, nextValue, k);
        }
        else {
          A[k] = nextValue;
        }
        // xi. Increase k by 1.
        k++;
      }
      // 7. Assert: items is not an Iterable so assume it is
      //    an array-like object.
    } else {

      // 8. Let arrayLike be ToObject(items).
      var arrayLike = Object(items);

      // 9. ReturnIfAbrupt(items).
      if (items == null) {
        throw new TypeError(
          'Array.from requires an array-like object - not null or undefined'
        );
      }

      // 10. Let len be ToLength(Get(arrayLike, "length")).
      // 11. ReturnIfAbrupt(len).
      var len = toLength(arrayLike.length);

      // 12. If IsConstructor(C) is true, then
      //     a. Let A be Construct(C, «len»).
      // 13. Else
      //     a. Let A be ArrayCreate(len).
      // 14. ReturnIfAbrupt(A).
      A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 15. Let k be 0.
      k = 0;
      // 16. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = arrayLike[k];
        if (mapFn) {
          A[k] = mapFn.call(T, kValue, k);
        }
        else {
          A[k] = kValue;
        }
        k++;
      }
      // 17. Let setStatus be Set(A, "length", len, true).
      // 18. ReturnIfAbrupt(setStatus).
      A.length = len;
      // 19. Return A.
    }
    return A;
  };
})();


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__application_styl__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__application_styl___default = __WEBPACK_IMPORTED_MODULE_0__application_styl__ && __WEBPACK_IMPORTED_MODULE_0__application_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__application_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__application_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__application_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_0__application_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__application_pug__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__application_pug___default = __WEBPACK_IMPORTED_MODULE_1__application_pug__ && __WEBPACK_IMPORTED_MODULE_1__application_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__application_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__application_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__application_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_1__application_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_base_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lib_routing__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_icons__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lib_key_map__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_components_target_search__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_components_target_wrapper__ = __webpack_require__(17);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Application; });var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}












var AUTO_DOWNLOAD_DELAY = 3000;
var iDevicePattern = /(iPhone|iPod)/i;
var webkitPattern = /WebKit/i;

var Application = (_class = (_temp = _class2 = function (_BaseComponent) {
  _inherits(Application, _BaseComponent);

  function Application(mountPoint, options) {
    _classCallCheck(this, Application);

    var _this = _possibleConstructorReturn(this, _BaseComponent.call(this, options));

    var element = _this.compileTemplate();

    var _navigator = navigator;
    var userAgent = _navigator.userAgent;

    var iframeWindow = _this.store.iframe.window;
    var _this$refs = _this.refs;
    var content = _this$refs.content;
    var closeModalButton = _this$refs.closeModalButton;
    var previousButton = _this$refs.previousButton;

    var headerButtons = [closeModalButton, previousButton];

    headerButtons.forEach(function (button) {
      var id = button.getAttribute("data-action");
      var icon = new __WEBPACK_IMPORTED_MODULE_5_components_icons__[id]();

      button.appendChild(icon.render());
    });

    iframeWindow.addEventListener("keyup", _this.delegateKeyEvent);
    iframeWindow.addEventListener("keydown", _this.handleKeyNavigation);
    iframeWindow.addEventListener("keypress", _this.delegateKeyEvent);

    element.setAttribute("is-touch-device", "ontouchstart" in document.documentElement);
    element.setAttribute("is-iphone", iDevicePattern.test(userAgent) && webkitPattern.test(userAgent));

    closeModalButton.addEventListener("click", _this.closeModal);
    element.addEventListener("click", function (event) {
      if (event.target === element) _this.closeModal();
    });

    previousButton.addEventListener("click", _this.navigateToHome);

    _this.renderTargetSearch();
    _this.renderTargetWrapper();

    if (_this.targets.length === 1) {
      _this.navigateToTarget(_this.targets[0].id);
    } else if (options.initialTarget) {
      _this.navigateToTarget(options.initialTarget);
    } else {
      _this.navigateToHome();
    }

    mountPoint.appendChild(_this.element);

    content.addEventListener("transitionend", _this.handleTransition);
    return _this;
  }

  Application.prototype.closeModal = function closeModal() {
    if (this.store.mode !== "modal") return;

    this.onClose();
  };

  Application.prototype.delegateKeyEvent = function delegateKeyEvent(nativeEvent) {
    var PolyFilledCustomEvent = this.store.iframe.window.PolyFilledCustomEvent;

    var receiver = this.refs.content.querySelector("[data-event-receiver]");

    if (!receiver) return;

    var delegated = new PolyFilledCustomEvent("dispatched-" + nativeEvent.type, {
      detail: { nativeEvent: nativeEvent }
    });

    receiver.dispatchEvent(delegated);
  };

  Application.prototype.handleKeyNavigation = function handleKeyNavigation(event) {
    switch (event.keyCode) {
      case __WEBPACK_IMPORTED_MODULE_6_lib_key_map__["a" /* default */].esc:
        event.preventDefault();
        this.closeModal();

        break;

      case __WEBPACK_IMPORTED_MODULE_6_lib_key_map__["a" /* default */].backspace:
        if (this.element.querySelector("input:focus")) break; // User is in a text field.

        event.preventDefault();

        if (this.route !== "home") this.navigateToHome();
        break;

      default:
        this.delegateKeyEvent(event);
    }
  };

  Application.prototype.handleTransition = function handleTransition(event) {
    var content = this.refs.content;


    if (event.target !== content) return;

    this.element.setAttribute("data-transition-state", "transitioned");

    var targetWrapper = content.querySelector("[data-component='target-wrapper']");
    var targetSearch = content.querySelector("[data-component='target-search']");

    if (this.route === "home") {
      targetSearch.removeAttribute("inert");
      targetWrapper.setAttribute("inert", "");
    } else {
      targetSearch.setAttribute("inert", "");
      targetWrapper.removeAttribute("inert");
    }
  };

  Application.prototype.renderTitle = function renderTitle(html) {
    var title = this.refs.title;


    title.innerHTML = html;

    var titleCharCount = title.textContent.length;
    var charLength = "long";

    if (titleCharCount < 40) charLength = "medium";
    if (titleCharCount < 30) charLength = "short";
    if (titleCharCount < 20) charLength = "puny";

    title.setAttribute("data-title-char-length", charLength);
  };

  Application.prototype.renderTargetSearch = function renderTargetSearch() {
    var _this2 = this;

    var content = this.refs.content;
    var firstChild = content.firstChild;

    var previousTargetSearch = content.querySelector("[data-component='target-search']");
    var targetSearch = new __WEBPACK_IMPORTED_MODULE_7_components_target_search__["a" /* default */]({
      store: this.store,
      targets: this.targets,
      onSelection: this.setNavigationState,
      onSubmit: function onSubmit(selectedId) {
        _this2.navigateToTarget(selectedId);
      }
    }).render();

    this.renderTitle(this.label("title"));

    if (!firstChild) {
      content.appendChild(targetSearch);
    } else if (previousTargetSearch) {
      content.replaceChild(targetSearch, previousTargetSearch);
    } else {
      content.insertBefore(targetSearch, firstChild);
    }
  };

  Application.prototype.navigateToHome = function navigateToHome() {
    this.route = "home";
    this.renderTitle(this.label("title"));
    this.autofocus();
  };

  Application.prototype.navigateToTarget = function navigateToTarget(targetId) {
    this.route = targetId;
    this.renderTargetWrapper();
  };

  Application.prototype.renderTargetWrapper = function renderTargetWrapper() {
    var _this3 = this;

    var autoDownload = this.store.autoDownload;
    var content = this.refs.content;

    var _targets$filter = this.targets.filter(function (target) {
      return target.id === _this3.route;
    });

    var target = _targets$filter[0];

    var previousTargetWrapper = content.querySelector("[data-component='target-wrapper']");
    var targetWrapper = !target ? document.createElement("section") : new __WEBPACK_IMPORTED_MODULE_8_components_target_wrapper__["a" /* default */]({
      onDone: this.closeModal,
      store: this.store,
      target: target
    }).render();

    function startDownload() {
      if (!target) return;
      if (!autoDownload || !target.pluginURL) return;

      setTimeout(target.startDownload, AUTO_DOWNLOAD_DELAY);
    }

    if (!target) {
      targetWrapper.setAttribute("data-component", "target-wrapper");
    } else {
      this.renderTitle(target.headerTitle);
    }

    if (previousTargetWrapper) {
      content.replaceChild(targetWrapper, previousTargetWrapper);
    } else {
      content.appendChild(targetWrapper);
    }

    startDownload();
  };

  _createClass(Application, [{
    key: "route",
    get: function get() {
      return this.store.route;
    },
    set: function set(value) {
      var previousRoute = this.store.route;
      var element = this.element;


      this.store.route = value;

      if (element) {
        var transitionState = previousRoute === this.store.route ? "transitioned" : "transitioning";

        element.setAttribute("data-transition-state", transitionState);

        element.setAttribute("data-route", this.store.route);
      }

      if (this.store.routing) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lib_routing__["a" /* setRoute */])(value === "home" ? "" : value);
      }

      return this.store.route;
    }
  }]);

  return Application;
}(__WEBPACK_IMPORTED_MODULE_3_components_base_component__["a" /* default */]), _class2.template = __WEBPACK_IMPORTED_MODULE_1__application_pug___default.a, _class2.stylesheet = __WEBPACK_IMPORTED_MODULE_0__application_styl___default.a, _temp), (_applyDecoratedDescriptor(_class.prototype, "closeModal", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "closeModal"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "delegateKeyEvent", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "delegateKeyEvent"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleKeyNavigation", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleKeyNavigation"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleTransition", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleTransition"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "navigateToHome", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "navigateToHome"), _class.prototype)), _class);


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__target_search_pug__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__target_search_pug___default = __WEBPACK_IMPORTED_MODULE_0__target_search_pug__ && __WEBPACK_IMPORTED_MODULE_0__target_search_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__target_search_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__target_search_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__target_search_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__target_search_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__target_search_styl__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__target_search_styl___default = __WEBPACK_IMPORTED_MODULE_1__target_search_styl__ && __WEBPACK_IMPORTED_MODULE_1__target_search_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__target_search_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__target_search_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__target_search_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__target_search_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_base_component__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_icons__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lib_key_map__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_findindex__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_findindex___default = __WEBPACK_IMPORTED_MODULE_6_lodash_findindex__ && __WEBPACK_IMPORTED_MODULE_6_lodash_findindex__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_6_lodash_findindex__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_6_lodash_findindex__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_6_lodash_findindex___default, 'a', __WEBPACK_IMPORTED_MODULE_6_lodash_findindex___default);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return TargetSearch; });var _DELTA_LOOKUP, _desc, _value, _class, _class2, _temp2;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}










var svgToComponent = __WEBPACK_IMPORTED_MODULE_4_components_icons__["svgToComponent"];
var SearchIcon = __WEBPACK_IMPORTED_MODULE_4_components_icons__["search"];
var ClearIcon = __WEBPACK_IMPORTED_MODULE_4_components_icons__["clear"];
var NextIcon = __WEBPACK_IMPORTED_MODULE_4_components_icons__["next"];

var entryQuery = function entryQuery(id) {
  return ".entry[data-id=" + id + "]";
};

var DELTA_LOOKUP = (_DELTA_LOOKUP = {}, _DELTA_LOOKUP[__WEBPACK_IMPORTED_MODULE_5_lib_key_map__["a" /* default */].up] = -1, _DELTA_LOOKUP[__WEBPACK_IMPORTED_MODULE_5_lib_key_map__["a" /* default */].down] = 1, _DELTA_LOOKUP);

var TargetSearch = (_class = (_temp2 = _class2 = function (_BaseComponent) {
  _inherits(TargetSearch, _BaseComponent);

  function TargetSearch() {
    var _temp, _this, _ret;

    _classCallCheck(this, TargetSearch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _BaseComponent.call.apply(_BaseComponent, [this].concat(args))), _this), _this.selectedId = null, _temp), _possibleConstructorReturn(_this, _ret);
  }

  TargetSearch.prototype.createEntrySpecs = function createEntrySpecs() {
    var query = this.query;
    var targets = this.targets;
    var fallbackID = this.store.fallbackID;


    return targets.map(function (_ref) {
      var icon = _ref.icon;
      var id = _ref.id;
      var label = _ref.label;

      var hidden = query && label.toLowerCase().indexOf(query) === -1 && id !== fallbackID;

      return { icon: icon, id: id, label: label, hidden: hidden };
    });
  };

  TargetSearch.prototype.handleSearchInput = function handleSearchInput() {
    var search = this.refs.search;


    this.query = search.value.toLowerCase();

    var _createEntrySpecs$fil = this.createEntrySpecs().filter(function (_ref2) {
      var hidden = _ref2.hidden;
      return !hidden;
    });

    var firstVisible = _createEntrySpecs$fil[0];


    search.setAttribute("data-state", search.value === "" ? "empty" : "filled");
    this.selectEntry(firstVisible ? firstVisible.id : null, { focus: false });
  };

  TargetSearch.prototype.handleSearchInputClear = function handleSearchInputClear() {
    var _refs = this.refs;
    var entriesContainer = _refs.entriesContainer;
    var search = _refs.search;


    search.value = "";
    this.handleSearchInput();
    this.selectEntry(null);
    search.focus();
    entriesContainer.scrollTop = 0;
  };

  TargetSearch.prototype.handleDelgatedKeydown = function handleDelgatedKeydown(_ref3) {
    var _ref3$detail = _ref3.detail;
    var keyCode = _ref3$detail.keyCode;
    var nativeEvent = _ref3$detail.nativeEvent;

    var delta = DELTA_LOOKUP[keyCode || nativeEvent.keyCode];

    if (this.store.route !== "home") return;
    if (!delta) return;

    if (nativeEvent) nativeEvent.preventDefault();

    var selectedId = this.selectedId;

    var entrySpecs = this.createEntrySpecs().filter(function (spec) {
      return !spec.hidden;
    });

    if (!entrySpecs.length) return;

    var length = entrySpecs.length;

    var currentIndex = __WEBPACK_IMPORTED_MODULE_6_lodash_findindex___default()(entrySpecs, function (_ref4) {
      var id = _ref4.id;
      return id === selectedId;
    }) || 0;

    // Move the index by delta and wrap around the bottom/top.
    var nextIndex = (currentIndex + delta + length) % length;

    selectedId = entrySpecs[nextIndex].id;

    this.selectEntry(selectedId);
  };

  TargetSearch.prototype.handleDelgatedKeypress = function handleDelgatedKeypress(_ref5) {
    var _ref5$detail = _ref5.detail;
    var keyCode = _ref5$detail.keyCode;
    var nativeEvent = _ref5$detail.nativeEvent;

    keyCode = keyCode || nativeEvent.keyCode;

    if (this.store.route !== "home") return;
    if (keyCode !== __WEBPACK_IMPORTED_MODULE_5_lib_key_map__["a" /* default */].enter) return;
    if (nativeEvent) nativeEvent.preventDefault();

    this.submit();
  };

  TargetSearch.prototype.submit = function submit() {
    if (!this.selectedId) return;

    this.onSubmit(this.selectedId);
  };

  TargetSearch.prototype.selectEntry = function selectEntry(selectedId) {
    var _this2 = this;

    var options = arguments.length <= 1 || arguments[1] === undefined ? { focus: true } : arguments[1];

    var entrySpecs = this.createEntrySpecs();
    var _refs2 = this.refs;
    var entries = _refs2.entries;
    var entriesContainer = _refs2.entriesContainer;
    var search = _refs2.search;

    var iframeDocument = this.store.iframe.document;
    var supportsScrollIntoView = this.store.scrollIntoView;
    var selectedEntryEl = entriesContainer.querySelector(entryQuery(selectedId));
    var visibleSpecs = entrySpecs.filter(function (entry) {
      return !entry.hidden;
    });

    this.selectedId = selectedId;

    entries.forEach(function (entryEl) {
      entryEl.setAttribute("data-visible-order", -1);
      _this2.setEntryStyle(entryEl);
    });

    visibleSpecs.forEach(function (spec, index) {
      entriesContainer.querySelector(entryQuery(spec.id)).setAttribute("data-visible-order", index);
    });

    if (selectedEntryEl) {
      if (search !== iframeDocument.activeElement) {
        selectedEntryEl.focus();
      }

      if (options.focus && supportsScrollIntoView) selectedEntryEl.scrollIntoView(false);
    }
  };

  TargetSearch.prototype.render = function render() {
    this.compileTemplate();

    var _refs3 = this.refs;
    var inputWrapper = _refs3.inputWrapper;
    var search = _refs3.search;
    var searchClear = _refs3.searchClear;

    var searchIcon = new SearchIcon();
    var clearIcon = new ClearIcon();

    inputWrapper.appendChild(searchIcon.render());
    searchClear.appendChild(clearIcon.render());

    search.addEventListener("input", this.handleSearchInput);
    searchClear.addEventListener("click", this.handleSearchInputClear);

    this.renderEntries();

    this.element.addEventListener("dispatched-keydown", this.handleDelgatedKeydown);
    this.element.addEventListener("dispatched-keypress", this.handleDelgatedKeypress);
    this.element.addEventListener("dispatched-input", this.handleSearchInput);

    return this.element;
  };

  TargetSearch.prototype.renderEntries = function renderEntries() {
    var _this3 = this;

    var iframeDocument = this.store.iframe.document;
    var entriesContainer = this.refs.entriesContainer;


    this.createEntrySpecs().forEach(function (spec, index) {
      var Icon = svgToComponent(spec.icon);
      var icon = new Icon({ class: "icon logo" });

      var entry = entriesContainer.appendChild(document.createElement("div"));
      var entryAttributes = {
        class: "entry",
        tabindex: 4,
        "data-action": "",
        "data-id": spec.id,
        "data-ref": "entries[]",
        "data-visible-order": index
      };

      var primary = iframeDocument.createElement("div");
      var primaryAttributes = {
        "data-click-hint": _this3.label("clickHint"),
        "data-click-hint-short": _this3.label("clickHintShort"),
        "data-submit-hint": _this3.label("submitHint"),
        "data-submit-hint-short": _this3.label("submitHintShort")
      };

      primary.className = "primary";
      primary.appendChild(icon.render());
      primary.appendChild(document.createTextNode(spec.label));
      Object.keys(primaryAttributes).forEach(function (key) {
        return primary.setAttribute(key, primaryAttributes[key]);
      });

      entry.appendChild(primary);
      entry.appendChild(new NextIcon({ class: "icon next" }).render());
      Object.keys(entryAttributes).forEach(function (key) {
        return entry.setAttribute(key, entryAttributes[key]);
      });
      _this3.setEntryStyle(entry);

      _this3.updateRefs();

      entry.addEventListener("click", function () {
        _this3.selectEntry(spec.id, { focus: false });
        _this3.submit();
      });

      entry.addEventListener("keydown", function (event) {
        if (event.keyCode === __WEBPACK_IMPORTED_MODULE_5_lib_key_map__["a" /* default */].spacebar) {
          event.preventDefault();
          _this3.selectEntry(spec.id);
        }
      });
    });
  };

  TargetSearch.prototype.setEntryStyle = function setEntryStyle(entryEl) {
    if (entryEl.getAttribute("data-id") === this.selectedId) {
      entryEl.setAttribute("data-selected", "");
    } else {
      entryEl.removeAttribute("data-selected");
    }
  };

  return TargetSearch;
}(__WEBPACK_IMPORTED_MODULE_3_components_base_component__["a" /* default */]), _class2.template = __WEBPACK_IMPORTED_MODULE_0__target_search_pug___default.a, _class2.stylesheet = __WEBPACK_IMPORTED_MODULE_1__target_search_styl___default.a, _temp2), (_applyDecoratedDescriptor(_class.prototype, "handleSearchInput", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleSearchInput"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleSearchInputClear", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleSearchInputClear"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleDelgatedKeydown", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleDelgatedKeydown"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleDelgatedKeypress", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleDelgatedKeypress"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "submit", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "submit"), _class.prototype)), _class);


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug___default = __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__ && __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl___default = __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__ && __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_component__ = __webpack_require__(5);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return TargetWrapper; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var TargetWrapper = (_temp = _class = function (_BaseComponent) {
  _inherits(TargetWrapper, _BaseComponent);

  function TargetWrapper() {
    _classCallCheck(this, TargetWrapper);

    return _possibleConstructorReturn(this, _BaseComponent.apply(this, arguments));
  }

  TargetWrapper.prototype.render = function render() {
    this.compileTemplate();

    var target = this.target.render();
    var targetMount = this.refs.targetMount;


    this.replaceElement(targetMount, target);

    return this.element;
  };

  return TargetWrapper;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_component__["a" /* default */]), _class.template = __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug___default.a, _class.stylesheet = __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl___default.a, _temp);


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_create_stylesheet_template__ = __webpack_require__(9);
/* harmony export */ exports["a"] = createThemeStylesheet;var _templateObject = _taggedTemplateLiteralLoose(["\n    [data-component=\"application\"] .surface {\n      background-color: ", "\n      color: ", "\n    }\n\n    [data-component$=\"-target\"] .copy-container[collapsed] button.collapse {\n      background-color: ", "\n    }\n\n    .surface a, .accent-color {\n      color: ", "\n    }\n\n    .button.primary, button.primary,\n    [data-component=\"target-search\"] .entries .entry[data-selected],\n    [data-component=\"target-search\"] .entries .entry:active,\n    [data-component=\"application\"][is-touch-device=\"true\"] [data-component=\"target-search\"] .entries .entry:hover,\n    .accent-background-color {\n      background: ", "\n    }\n\n    .target-instructions .steps li::before {\n      background: ", "\n    }\n\n    .target-instructions figure [annotation-arrow] svg {\n      fill: ", "\n    }\n  "], ["\n    [data-component=\"application\"] .surface {\n      background-color: ", "\n      color: ", "\n    }\n\n    [data-component$=\"-target\"] .copy-container[collapsed] button.collapse {\n      background-color: ", "\n    }\n\n    .surface a, .accent-color {\n      color: ", "\n    }\n\n    .button.primary, button.primary,\n    [data-component=\"target-search\"] .entries .entry[data-selected],\n    [data-component=\"target-search\"] .entries .entry:active,\n    [data-component=\"application\"][is-touch-device=\"true\"] [data-component=\"target-search\"] .entries .entry:hover,\n    .accent-background-color {\n      background: ", "\n    }\n\n    .target-instructions .steps li::before {\n      background: ", "\n    }\n\n    .target-instructions figure [annotation-arrow] svg {\n      fill: ", "\n    }\n  "]);

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }



function createThemeStylesheet(theme) {
  var stylesheetTemplate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lib_create_stylesheet_template__["a" /* default */])(theme);

  return stylesheetTemplate(_templateObject, "backgroundColor", "textColor", "backgroundColor", "accentColor", "accentColor", "stepNumberColor", "screenshotAnnotationColor");
}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export */ exports["a"] = polyfillCustomEvent;function polyfillCustomEvent(_ref) {
  var $document = _ref.document;
  var $window = _ref.window;

  var supported = true;

  try {
    // IE10 will fail to construct a CustomEvent
    new $window.CustomEvent();
  } catch (e) {
    supported = false;
  }

  if (supported) {
    $window.PolyFilledCustomEvent = $window.CustomEvent;
    return;
  }

  function PolyFilledCustomEvent(event) {
    var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var _ref2$bubbles = _ref2.bubbles;
    var bubbles = _ref2$bubbles === undefined ? false : _ref2$bubbles;
    var _ref2$cancelable = _ref2.cancelable;
    var cancelable = _ref2$cancelable === undefined ? false : _ref2$cancelable;
    var detail = _ref2.detail;

    var shimEvent = $document.createEvent("CustomEvent");

    shimEvent.initCustomEvent(event, bubbles, cancelable, detail);

    return shimEvent;
  }

  PolyFilledCustomEvent.prototype = $window.Event.prototype;

  $window.PolyFilledCustomEvent = PolyFilledCustomEvent;
}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export */ exports["a"] = polyfillRequestAnimationFrame;function polyfillRequestAnimationFrame(window) {
  var lastTime = 0;

  window.requestAnimationFrame = window.msRequestAnimationFrame;
  window.cancelAnimationFrame = window.msCancelAnimationFrame || window.msCancelRequestAnimationFrame;

  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (callback) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        return callback(currTime + timeToCall);
      }, timeToCall);

      lastTime = currTime + timeToCall;

      return id;
    };
  }

  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = clearTimeout;
  }
}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export */ exports["a"] = createStore;var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var DEFAULT_THEME = {
  accentColor: "#2d88f3",
  backgroundColor: "#ffffff",
  screenshotAnnotationColor: "#fde757",
  textColor: "#000000"
};

var get = function get(value, fallback) {
  return typeof value !== "undefined" ? value : fallback;
};

function createStore() {
  var spec = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var iframe = document.createElement("iframe");
  var _spec$autoDownload = spec.autoDownload;
  var autoDownload = _spec$autoDownload === undefined ? true : _spec$autoDownload;
  var _spec$labels = spec.labels;
  var labels = _spec$labels === undefined ? {} : _spec$labels;


  var theme = _extends({}, DEFAULT_THEME, spec.theme);

  if (!theme.stepNumberColor) theme.stepNumberColor = theme.accentColor;

  return {
    assetPath: get(spec.assetPath, "https://cdn.rawgit.com/EagerIO/EmbedBox/v2.0.2/dist"),
    name: get(spec.name, "a plugin"),
    autoDownload: autoDownload,

    branding: get(spec.branding, true),

    beforeContent: get(spec.beforeContent, ""),
    afterContent: get(spec.afterContent, ""),

    embedCode: get(spec.embedCode, ""),

    fallbackID: get(spec.fallbackID, "generic"),

    iframe: {
      element: iframe,
      get document() {
        return iframe.contentDocument;
      },
      get window() {
        return iframe.contentWindow;
      }
    },

    insertInHead: get(spec.insertInHead, false),

    labels: _extends({
      searchHeader: "Select the type of website you have.",
      searchPlaceholder: "Search...",
      clickHint: "Click to view instructions",
      clickHintShort: "Click to view",
      submitHint: "Press ENTER to view instructions",
      submitHintShort: "Press ENTER",
      title: function title(config) {
        return "Add " + config.name + " to your site";
      }
    }, labels),

    route: "home",
    routing: get(spec.routing, false),
    projectUrl: "http://embedbox.io",

    scrollIntoView: get(spec.scrollIntoView, true),

    theme: theme
  };
}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__activate_module_pug__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__activate_module_pug___default = __WEBPACK_IMPORTED_MODULE_0__activate_module_pug__ && __WEBPACK_IMPORTED_MODULE_0__activate_module_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__activate_module_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__activate_module_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__activate_module_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__activate_module_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__activate_module_styl__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__activate_module_styl___default = __WEBPACK_IMPORTED_MODULE_1__activate_module_styl__ && __WEBPACK_IMPORTED_MODULE_1__activate_module_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__activate_module_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__activate_module_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__activate_module_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__activate_module_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__ = __webpack_require__(2);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Screenshot; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var Screenshot = (_temp = _class = function (_BaseScreenshot) {
  _inherits(Screenshot, _BaseScreenshot);

  function Screenshot() {
    _classCallCheck(this, Screenshot);

    return _possibleConstructorReturn(this, _BaseScreenshot.apply(this, arguments));
  }

  return Screenshot;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__["a" /* default */]), _class.template = __WEBPACK_IMPORTED_MODULE_0__activate_module_pug___default.a, _class.stylesheet = __WEBPACK_IMPORTED_MODULE_1__activate_module_styl___default.a, _temp);


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drupal_7_pug__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drupal_7_pug___default = __WEBPACK_IMPORTED_MODULE_0__drupal_7_pug__ && __WEBPACK_IMPORTED_MODULE_0__drupal_7_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__drupal_7_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__drupal_7_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__drupal_7_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__drupal_7_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__activate_module__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__navigate_to_modules__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__install_new_modules__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__upload_module__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__installation_successful__ = __webpack_require__(25);







/* harmony default export */ exports["a"] = {
  id: "7",
  template: __WEBPACK_IMPORTED_MODULE_0__drupal_7_pug___default.a,
  screenshots: {
    activateModule: __WEBPACK_IMPORTED_MODULE_1__activate_module__["a" /* default */],
    installationSuccessful: __WEBPACK_IMPORTED_MODULE_5__installation_successful__["a" /* default */],
    navigateToModules: __WEBPACK_IMPORTED_MODULE_2__navigate_to_modules__["a" /* default */],
    installNewModules: __WEBPACK_IMPORTED_MODULE_3__install_new_modules__["a" /* default */],
    uploadModule: __WEBPACK_IMPORTED_MODULE_4__upload_module__["a" /* default */]
  }
};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug___default = __WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug__ && __WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl___default = __WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl__ && __WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__ = __webpack_require__(2);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Screenshot; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var Screenshot = (_temp = _class = function (_BaseScreenshot) {
  _inherits(Screenshot, _BaseScreenshot);

  function Screenshot() {
    _classCallCheck(this, Screenshot);

    return _possibleConstructorReturn(this, _BaseScreenshot.apply(this, arguments));
  }

  return Screenshot;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__["a" /* default */]), _class.template = __WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug___default.a, _class.stylesheet = __WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl___default.a, _temp);


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__installation_successful_pug__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__installation_successful_pug___default = __WEBPACK_IMPORTED_MODULE_0__installation_successful_pug__ && __WEBPACK_IMPORTED_MODULE_0__installation_successful_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__installation_successful_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__installation_successful_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__installation_successful_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__installation_successful_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__installation_successful_styl__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__installation_successful_styl___default = __WEBPACK_IMPORTED_MODULE_1__installation_successful_styl__ && __WEBPACK_IMPORTED_MODULE_1__installation_successful_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__installation_successful_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__installation_successful_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__installation_successful_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__installation_successful_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__ = __webpack_require__(2);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Screenshot; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var Screenshot = (_temp = _class = function (_BaseScreenshot) {
  _inherits(Screenshot, _BaseScreenshot);

  function Screenshot() {
    _classCallCheck(this, Screenshot);

    return _possibleConstructorReturn(this, _BaseScreenshot.apply(this, arguments));
  }

  return Screenshot;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__["a" /* default */]), _class.template = __WEBPACK_IMPORTED_MODULE_0__installation_successful_pug___default.a, _class.stylesheet = __WEBPACK_IMPORTED_MODULE_1__installation_successful_styl___default.a, _temp);


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug___default = __WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug__ && __WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl___default = __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl__ && __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__ = __webpack_require__(2);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Screenshot; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var Screenshot = (_temp = _class = function (_BaseScreenshot) {
  _inherits(Screenshot, _BaseScreenshot);

  function Screenshot() {
    _classCallCheck(this, Screenshot);

    return _possibleConstructorReturn(this, _BaseScreenshot.apply(this, arguments));
  }

  return Screenshot;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__["a" /* default */]), _class.template = __WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug___default.a, _class.stylesheet = __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl___default.a, _temp);


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__upload_modules_pug__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__upload_modules_pug___default = __WEBPACK_IMPORTED_MODULE_0__upload_modules_pug__ && __WEBPACK_IMPORTED_MODULE_0__upload_modules_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__upload_modules_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__upload_modules_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__upload_modules_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__upload_modules_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__upload_modules_styl__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__upload_modules_styl___default = __WEBPACK_IMPORTED_MODULE_1__upload_modules_styl__ && __WEBPACK_IMPORTED_MODULE_1__upload_modules_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__upload_modules_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__upload_modules_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__upload_modules_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__upload_modules_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__ = __webpack_require__(2);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Screenshot; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var Screenshot = (_temp = _class = function (_BaseScreenshot) {
  _inherits(Screenshot, _BaseScreenshot);

  function Screenshot() {
    _classCallCheck(this, Screenshot);

    return _possibleConstructorReturn(this, _BaseScreenshot.apply(this, arguments));
  }

  return Screenshot;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__["a" /* default */]), _class.template = __WEBPACK_IMPORTED_MODULE_0__upload_modules_pug___default.a, _class.stylesheet = __WEBPACK_IMPORTED_MODULE_1__upload_modules_styl___default.a, _temp);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__activate_module_pug__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__activate_module_pug___default = __WEBPACK_IMPORTED_MODULE_0__activate_module_pug__ && __WEBPACK_IMPORTED_MODULE_0__activate_module_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__activate_module_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__activate_module_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__activate_module_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__activate_module_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__activate_module_styl__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__activate_module_styl___default = __WEBPACK_IMPORTED_MODULE_1__activate_module_styl__ && __WEBPACK_IMPORTED_MODULE_1__activate_module_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__activate_module_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__activate_module_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__activate_module_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__activate_module_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__ = __webpack_require__(2);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Screenshot; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var Screenshot = (_temp = _class = function (_BaseScreenshot) {
  _inherits(Screenshot, _BaseScreenshot);

  function Screenshot() {
    _classCallCheck(this, Screenshot);

    return _possibleConstructorReturn(this, _BaseScreenshot.apply(this, arguments));
  }

  return Screenshot;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__["a" /* default */]), _class.template = __WEBPACK_IMPORTED_MODULE_0__activate_module_pug___default.a, _class.stylesheet = __WEBPACK_IMPORTED_MODULE_1__activate_module_styl___default.a, _temp);


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drupal_8_pug__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drupal_8_pug___default = __WEBPACK_IMPORTED_MODULE_0__drupal_8_pug__ && __WEBPACK_IMPORTED_MODULE_0__drupal_8_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__drupal_8_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__drupal_8_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__drupal_8_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__drupal_8_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__install_new_modules__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__upload_module__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__activate_module__ = __webpack_require__(28);






/* harmony default export */ exports["a"] = {
  id: "8",
  template: __WEBPACK_IMPORTED_MODULE_0__drupal_8_pug___default.a,
  screenshots: {
    activateModule: __WEBPACK_IMPORTED_MODULE_4__activate_module__["a" /* default */],
    navigateToModules: __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules__["a" /* default */],
    installNewModules: __WEBPACK_IMPORTED_MODULE_2__install_new_modules__["a" /* default */],
    uploadModule: __WEBPACK_IMPORTED_MODULE_3__upload_module__["a" /* default */]
  }
};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug___default = __WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug__ && __WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl___default = __WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl__ && __WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__ = __webpack_require__(2);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Screenshot; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var Screenshot = (_temp = _class = function (_BaseScreenshot) {
  _inherits(Screenshot, _BaseScreenshot);

  function Screenshot() {
    _classCallCheck(this, Screenshot);

    return _possibleConstructorReturn(this, _BaseScreenshot.apply(this, arguments));
  }

  return Screenshot;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__["a" /* default */]), _class.template = __WEBPACK_IMPORTED_MODULE_0__install_new_modules_pug___default.a, _class.stylesheet = __WEBPACK_IMPORTED_MODULE_1__install_new_modules_styl___default.a, _temp);


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug___default = __WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug__ && __WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl___default = __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl__ && __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__ = __webpack_require__(2);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Screenshot; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var Screenshot = (_temp = _class = function (_BaseScreenshot) {
  _inherits(Screenshot, _BaseScreenshot);

  function Screenshot() {
    _classCallCheck(this, Screenshot);

    return _possibleConstructorReturn(this, _BaseScreenshot.apply(this, arguments));
  }

  return Screenshot;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__["a" /* default */]), _class.template = __WEBPACK_IMPORTED_MODULE_0__navigate_to_modules_pug___default.a, _class.stylesheet = __WEBPACK_IMPORTED_MODULE_1__navigate_to_modules_styl___default.a, _temp);


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__upload_modules_pug__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__upload_modules_pug___default = __WEBPACK_IMPORTED_MODULE_0__upload_modules_pug__ && __WEBPACK_IMPORTED_MODULE_0__upload_modules_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__upload_modules_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__upload_modules_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__upload_modules_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__upload_modules_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__upload_modules_styl__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__upload_modules_styl___default = __WEBPACK_IMPORTED_MODULE_1__upload_modules_styl__ && __WEBPACK_IMPORTED_MODULE_1__upload_modules_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__upload_modules_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__upload_modules_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__upload_modules_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__upload_modules_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__ = __webpack_require__(2);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Screenshot; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var Screenshot = (_temp = _class = function (_BaseScreenshot) {
  _inherits(Screenshot, _BaseScreenshot);

  function Screenshot() {
    _classCallCheck(this, Screenshot);

    return _possibleConstructorReturn(this, _BaseScreenshot.apply(this, arguments));
  }

  return Screenshot;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__["a" /* default */]), _class.template = __WEBPACK_IMPORTED_MODULE_0__upload_modules_pug___default.a, _class.stylesheet = __WEBPACK_IMPORTED_MODULE_1__upload_modules_styl___default.a, _temp);


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drupal_7__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drupal_8__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drupal_svg__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drupal_svg___default = __WEBPACK_IMPORTED_MODULE_2__drupal_svg__ && __WEBPACK_IMPORTED_MODULE_2__drupal_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2__drupal_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2__drupal_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2__drupal_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_2__drupal_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_base_target__ = __webpack_require__(3);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return DrupalTarget; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }







var DrupalTarget = (_temp = _class = function (_BaseTarget) {
  _inherits(DrupalTarget, _BaseTarget);

  function DrupalTarget() {
    _classCallCheck(this, DrupalTarget);

    return _possibleConstructorReturn(this, _BaseTarget.apply(this, arguments));
  }

  return DrupalTarget;
}(__WEBPACK_IMPORTED_MODULE_3_components_base_target__["a" /* default */]), _class.icon = __WEBPACK_IMPORTED_MODULE_2__drupal_svg___default.a, _class.id = "drupal", _class.label = "Drupal", _class.supports = { embedCode: true, plugin: true, insertInto: { body: true } }, _class.versions = [__WEBPACK_IMPORTED_MODULE_1__drupal_8__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__drupal_7__["a" /* default */]], _temp);


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__generic_latest_pug__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__generic_latest_pug___default = __WEBPACK_IMPORTED_MODULE_0__generic_latest_pug__ && __WEBPACK_IMPORTED_MODULE_0__generic_latest_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__generic_latest_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__generic_latest_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__generic_latest_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__generic_latest_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__install_script__ = __webpack_require__(35);



/* harmony default export */ exports["a"] = {
  id: "latest",
  template: __WEBPACK_IMPORTED_MODULE_0__generic_latest_pug___default.a,
  screenshots: { installScript: __WEBPACK_IMPORTED_MODULE_1__install_script__["a" /* default */] }
};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__install_script_pug__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__install_script_pug___default = __WEBPACK_IMPORTED_MODULE_0__install_script_pug__ && __WEBPACK_IMPORTED_MODULE_0__install_script_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__install_script_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__install_script_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__install_script_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__install_script_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__install_script_styl__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__install_script_styl___default = __WEBPACK_IMPORTED_MODULE_1__install_script_styl__ && __WEBPACK_IMPORTED_MODULE_1__install_script_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__install_script_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__install_script_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__install_script_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__install_script_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__ = __webpack_require__(2);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Screenshot; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var Screenshot = (_temp = _class = function (_BaseScreenshot) {
  _inherits(Screenshot, _BaseScreenshot);

  function Screenshot() {
    _classCallCheck(this, Screenshot);

    return _possibleConstructorReturn(this, _BaseScreenshot.apply(this, arguments));
  }

  Screenshot.prototype.componentDidMount = function componentDidMount(target) {
    var body = this.iframe.contentDocument.body;

    var escaper = this.iframe.contentDocument.createElement("textarea");

    escaper.textContent = target.copyText;
    var escapedText = "<div class=\"focal-point relative-arrow\" data-arrow=\"above\">" + escaper.innerHTML + "</div>";

    body.innerHTML = body.innerHTML.replace(/\{\{EMBED_CODE_SLOT\}\}/g, escapedText);
  };

  return Screenshot;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__["a" /* default */]), _class.template = __WEBPACK_IMPORTED_MODULE_0__install_script_pug___default.a, _class.stylesheet = __WEBPACK_IMPORTED_MODULE_1__install_script_styl___default.a, _temp);


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__generic_latest__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_components_base_target__ = __webpack_require__(3);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return GenericTarget; });var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }





var GenericTarget = (_temp = _class = function (_BaseTarget) {
  _inherits(GenericTarget, _BaseTarget);

  function GenericTarget() {
    _classCallCheck(this, GenericTarget);

    return _possibleConstructorReturn(this, _BaseTarget.apply(this, arguments));
  }

  _createClass(GenericTarget, [{
    key: "headerTitle",
    get: function get() {
      return this.title;
    }
  }, {
    key: "title",
    get: function get() {
      return "Installing " + this.store.name + ".";
    }
  }]);

  return GenericTarget;
}(__WEBPACK_IMPORTED_MODULE_1_components_base_target__["a" /* default */]), _class.id = "generic", _class.label = "Any other site", _class.supports = { embedCode: true, insertInto: { head: true, body: true } }, _class.versions = [__WEBPACK_IMPORTED_MODULE_0__generic_latest__["a" /* default */]], _temp);


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__joomla_3_6_x_pug__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__joomla_3_6_x_pug___default = __WEBPACK_IMPORTED_MODULE_0__joomla_3_6_x_pug__ && __WEBPACK_IMPORTED_MODULE_0__joomla_3_6_x_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__joomla_3_6_x_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__joomla_3_6_x_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__joomla_3_6_x_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__joomla_3_6_x_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__joomla_svg__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__joomla_svg___default = __WEBPACK_IMPORTED_MODULE_1__joomla_svg__ && __WEBPACK_IMPORTED_MODULE_1__joomla_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__joomla_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__joomla_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__joomla_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_1__joomla_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_target__ = __webpack_require__(3);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return JoomlaTarget; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var JoomlaTarget = (_temp = _class = function (_BaseTarget) {
  _inherits(JoomlaTarget, _BaseTarget);

  function JoomlaTarget() {
    _classCallCheck(this, JoomlaTarget);

    return _possibleConstructorReturn(this, _BaseTarget.apply(this, arguments));
  }

  return JoomlaTarget;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_target__["a" /* default */]), _class.icon = __WEBPACK_IMPORTED_MODULE_1__joomla_svg___default.a, _class.id = "joomla", _class.label = "Joomla", _class.supports = { embedCode: true, plugin: true, insertInto: { head: true, body: true } }, _class.versions = [{ id: "3.6.x", template: __WEBPACK_IMPORTED_MODULE_0__joomla_3_6_x_pug___default.a }], _temp);


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shopify_latest__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shopify_svg__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shopify_svg___default = __WEBPACK_IMPORTED_MODULE_1__shopify_svg__ && __WEBPACK_IMPORTED_MODULE_1__shopify_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__shopify_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__shopify_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__shopify_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_1__shopify_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_target__ = __webpack_require__(3);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return ShopifyTarget; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var ShopifyTarget = (_temp = _class = function (_BaseTarget) {
  _inherits(ShopifyTarget, _BaseTarget);

  function ShopifyTarget() {
    _classCallCheck(this, ShopifyTarget);

    return _possibleConstructorReturn(this, _BaseTarget.apply(this, arguments));
  }

  return ShopifyTarget;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_target__["a" /* default */]), _class.icon = __WEBPACK_IMPORTED_MODULE_1__shopify_svg___default.a, _class.id = "shopify", _class.label = "Shopify", _class.supports = { embedCode: true, insertInto: { head: true, body: true } }, _class.versions = [__WEBPACK_IMPORTED_MODULE_0__shopify_latest__["a" /* default */]], _temp);


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shopify_latest_pug__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shopify_latest_pug___default = __WEBPACK_IMPORTED_MODULE_0__shopify_latest_pug__ && __WEBPACK_IMPORTED_MODULE_0__shopify_latest_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__shopify_latest_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__shopify_latest_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__shopify_latest_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__shopify_latest_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__install_script__ = __webpack_require__(40);



/* harmony default export */ exports["a"] = {
  id: "latest",
  template: __WEBPACK_IMPORTED_MODULE_0__shopify_latest_pug___default.a,
  screenshots: { installScript: __WEBPACK_IMPORTED_MODULE_1__install_script__["a" /* default */] }
};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__install_script_pug__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__install_script_pug___default = __WEBPACK_IMPORTED_MODULE_0__install_script_pug__ && __WEBPACK_IMPORTED_MODULE_0__install_script_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__install_script_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__install_script_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__install_script_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__install_script_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__install_script_styl__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__install_script_styl___default = __WEBPACK_IMPORTED_MODULE_1__install_script_styl__ && __WEBPACK_IMPORTED_MODULE_1__install_script_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__install_script_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__install_script_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__install_script_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__install_script_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__ = __webpack_require__(2);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Screenshot; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var Screenshot = (_temp = _class = function (_BaseScreenshot) {
  _inherits(Screenshot, _BaseScreenshot);

  function Screenshot() {
    _classCallCheck(this, Screenshot);

    return _possibleConstructorReturn(this, _BaseScreenshot.apply(this, arguments));
  }

  Screenshot.prototype.componentDidMount = function componentDidMount(target) {
    var body = this.iframe.contentDocument.body;

    var escaper = this.iframe.contentDocument.createElement("textarea");

    escaper.textContent = target.copyText;
    var escapedText = "<div class=\"focal-point relative-arrow\" data-arrow=\"above\">" + escaper.innerHTML + "</div>";

    body.innerHTML = body.innerHTML.replace(/\{\{EMBED_CODE_SLOT\}\}/g, escapedText);
  };

  return Screenshot;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__["a" /* default */]), _class.template = __WEBPACK_IMPORTED_MODULE_0__install_script_pug___default.a, _class.stylesheet = __WEBPACK_IMPORTED_MODULE_1__install_script_styl___default.a, _temp);


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squarespace_latest__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__squarespace_svg__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__squarespace_svg___default = __WEBPACK_IMPORTED_MODULE_1__squarespace_svg__ && __WEBPACK_IMPORTED_MODULE_1__squarespace_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__squarespace_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__squarespace_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__squarespace_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_1__squarespace_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_target__ = __webpack_require__(3);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return SquarespaceTarget; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var SquarespaceTarget = (_temp = _class = function (_BaseTarget) {
  _inherits(SquarespaceTarget, _BaseTarget);

  function SquarespaceTarget() {
    _classCallCheck(this, SquarespaceTarget);

    return _possibleConstructorReturn(this, _BaseTarget.apply(this, arguments));
  }

  return SquarespaceTarget;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_target__["a" /* default */]), _class.icon = __WEBPACK_IMPORTED_MODULE_1__squarespace_svg___default.a, _class.id = "squarespace", _class.label = "Squarespace", _class.supports = { embedCode: true, insertInto: { head: true, body: true } }, _class.versions = [__WEBPACK_IMPORTED_MODULE_0__squarespace_latest__["a" /* default */]], _temp);


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squarespace_latest_pug__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__squarespace_latest_pug___default = __WEBPACK_IMPORTED_MODULE_0__squarespace_latest_pug__ && __WEBPACK_IMPORTED_MODULE_0__squarespace_latest_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__squarespace_latest_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__squarespace_latest_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__squarespace_latest_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__squarespace_latest_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__install_script__ = __webpack_require__(43);



/* harmony default export */ exports["a"] = {
  id: "latest",
  template: __WEBPACK_IMPORTED_MODULE_0__squarespace_latest_pug___default.a,
  screenshots: { installScript: __WEBPACK_IMPORTED_MODULE_1__install_script__["a" /* default */] }
};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__install_script_pug__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__install_script_pug___default = __WEBPACK_IMPORTED_MODULE_0__install_script_pug__ && __WEBPACK_IMPORTED_MODULE_0__install_script_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__install_script_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__install_script_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__install_script_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__install_script_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__install_script_styl__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__install_script_styl___default = __WEBPACK_IMPORTED_MODULE_1__install_script_styl__ && __WEBPACK_IMPORTED_MODULE_1__install_script_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__install_script_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__install_script_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__install_script_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__install_script_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__ = __webpack_require__(2);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Screenshot; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var Screenshot = (_temp = _class = function (_BaseScreenshot) {
  _inherits(Screenshot, _BaseScreenshot);

  function Screenshot() {
    _classCallCheck(this, Screenshot);

    return _possibleConstructorReturn(this, _BaseScreenshot.apply(this, arguments));
  }

  Screenshot.prototype.componentDidMount = function componentDidMount(target) {
    var body = this.iframe.contentDocument.body;

    var escaper = this.iframe.contentDocument.createElement("textarea");

    escaper.textContent = target.copyText;
    var escapedText = "<div class=\"focal-point relative-arrow\" data-arrow=\"above\">" + escaper.innerHTML + "</div>";

    body.innerHTML = body.innerHTML.replace(/\{\{EMBED_CODE_SLOT\}\}/g, escapedText);
  };

  return Screenshot;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__["a" /* default */]), _class.template = __WEBPACK_IMPORTED_MODULE_0__install_script_pug___default.a, _class.stylesheet = __WEBPACK_IMPORTED_MODULE_1__install_script_styl___default.a, _temp);


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tumblr_latest__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tumblr_svg__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tumblr_svg___default = __WEBPACK_IMPORTED_MODULE_1__tumblr_svg__ && __WEBPACK_IMPORTED_MODULE_1__tumblr_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__tumblr_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__tumblr_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__tumblr_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_1__tumblr_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_target__ = __webpack_require__(3);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return TumblrTarget; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var TumblrTarget = (_temp = _class = function (_BaseTarget) {
  _inherits(TumblrTarget, _BaseTarget);

  function TumblrTarget() {
    _classCallCheck(this, TumblrTarget);

    return _possibleConstructorReturn(this, _BaseTarget.apply(this, arguments));
  }

  return TumblrTarget;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_target__["a" /* default */]), _class.icon = __WEBPACK_IMPORTED_MODULE_1__tumblr_svg___default.a, _class.id = "tumblr", _class.label = "Tumblr", _class.supports = { embedCode: true, insertInto: { head: true, body: true } }, _class.versions = [__WEBPACK_IMPORTED_MODULE_0__tumblr_latest__["a" /* default */]], _temp);


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tumblr_latest_pug__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tumblr_latest_pug___default = __WEBPACK_IMPORTED_MODULE_0__tumblr_latest_pug__ && __WEBPACK_IMPORTED_MODULE_0__tumblr_latest_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__tumblr_latest_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__tumblr_latest_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__tumblr_latest_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__tumblr_latest_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__install_script__ = __webpack_require__(46);



/* harmony default export */ exports["a"] = {
  id: "latest",
  template: __WEBPACK_IMPORTED_MODULE_0__tumblr_latest_pug___default.a,
  screenshots: { installScript: __WEBPACK_IMPORTED_MODULE_1__install_script__["a" /* default */] }
};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__install_script_pug__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__install_script_pug___default = __WEBPACK_IMPORTED_MODULE_0__install_script_pug__ && __WEBPACK_IMPORTED_MODULE_0__install_script_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__install_script_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__install_script_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__install_script_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__install_script_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__install_script_styl__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__install_script_styl___default = __WEBPACK_IMPORTED_MODULE_1__install_script_styl__ && __WEBPACK_IMPORTED_MODULE_1__install_script_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__install_script_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__install_script_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__install_script_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__install_script_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__ = __webpack_require__(2);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Screenshot; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var Screenshot = (_temp = _class = function (_BaseScreenshot) {
  _inherits(Screenshot, _BaseScreenshot);

  function Screenshot() {
    _classCallCheck(this, Screenshot);

    return _possibleConstructorReturn(this, _BaseScreenshot.apply(this, arguments));
  }

  Screenshot.prototype.componentDidMount = function componentDidMount(target) {
    var body = this.iframe.contentDocument.body;

    var escaper = this.iframe.contentDocument.createElement("textarea");

    escaper.textContent = target.copyText;
    var escapedText = "<div class=\"focal-point relative-arrow\" data-arrow=\"above\">" + escaper.innerHTML + "</div>";

    body.innerHTML = body.innerHTML.replace(/\{\{EMBED_CODE_SLOT\}\}/g, escapedText);
  };

  return Screenshot;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_screenshot__["a" /* default */]), _class.template = __WEBPACK_IMPORTED_MODULE_0__install_script_pug___default.a, _class.stylesheet = __WEBPACK_IMPORTED_MODULE_1__install_script_styl___default.a, _temp);


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__weebly_latest_pug__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__weebly_latest_pug___default = __WEBPACK_IMPORTED_MODULE_0__weebly_latest_pug__ && __WEBPACK_IMPORTED_MODULE_0__weebly_latest_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__weebly_latest_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__weebly_latest_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__weebly_latest_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__weebly_latest_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__weebly_svg__ = __webpack_require__(159);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__weebly_svg___default = __WEBPACK_IMPORTED_MODULE_1__weebly_svg__ && __WEBPACK_IMPORTED_MODULE_1__weebly_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__weebly_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__weebly_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__weebly_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_1__weebly_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_target__ = __webpack_require__(3);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return WeeblyTarget; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var WeeblyTarget = (_temp = _class = function (_BaseTarget) {
  _inherits(WeeblyTarget, _BaseTarget);

  function WeeblyTarget() {
    _classCallCheck(this, WeeblyTarget);

    return _possibleConstructorReturn(this, _BaseTarget.apply(this, arguments));
  }

  return WeeblyTarget;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_target__["a" /* default */]), _class.icon = __WEBPACK_IMPORTED_MODULE_1__weebly_svg___default.a, _class.id = "weebly", _class.label = "Weebly", _class.supports = { embedCode: true, insertInto: { head: true, body: true } }, _class.versions = [{ id: "Latest", template: __WEBPACK_IMPORTED_MODULE_0__weebly_latest_pug___default.a }], _temp);


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordpress_4_pug__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wordpress_4_pug___default = __WEBPACK_IMPORTED_MODULE_0__wordpress_4_pug__ && __WEBPACK_IMPORTED_MODULE_0__wordpress_4_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__wordpress_4_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__wordpress_4_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__wordpress_4_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__wordpress_4_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wordpress_svg__ = __webpack_require__(160);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wordpress_svg___default = __WEBPACK_IMPORTED_MODULE_1__wordpress_svg__ && __WEBPACK_IMPORTED_MODULE_1__wordpress_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__wordpress_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__wordpress_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__wordpress_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_1__wordpress_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_target__ = __webpack_require__(3);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return WordPressTarget; });var _class, _temp;

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }






var WordPressTarget = (_temp = _class = function (_BaseTarget) {
  _inherits(WordPressTarget, _BaseTarget);

  function WordPressTarget() {
    _classCallCheck(this, WordPressTarget);

    return _possibleConstructorReturn(this, _BaseTarget.apply(this, arguments));
  }

  return WordPressTarget;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_target__["a" /* default */]), _class.icon = __WEBPACK_IMPORTED_MODULE_1__wordpress_svg___default.a, _class.id = "wordpress", _class.label = "WordPress", _class.supports = { embedCode: true, plugin: true, insertInto: { head: true, body: true } }, _class.versions = [{ id: "4.x", template: __WEBPACK_IMPORTED_MODULE_0__wordpress_4_pug___default.a }], _temp);


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(145)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, require('select'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.select);
        global.clipboardAction = mod.exports;
    }
})(this, function (module, _select) {
    'use strict';

    var _select2 = _interopRequireDefault(_select);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var ClipboardAction = function () {
        /**
         * @param {Object} options
         */

        function ClipboardAction(options) {
            _classCallCheck(this, ClipboardAction);

            this.resolveOptions(options);
            this.initSelection();
        }

        /**
         * Defines base properties passed from constructor.
         * @param {Object} options
         */


        ClipboardAction.prototype.resolveOptions = function resolveOptions() {
            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            this.action = options.action;
            this.emitter = options.emitter;
            this.target = options.target;
            this.text = options.text;
            this.trigger = options.trigger;

            this.selectedText = '';
        };

        ClipboardAction.prototype.initSelection = function initSelection() {
            if (this.text) {
                this.selectFake();
            } else if (this.target) {
                this.selectTarget();
            }
        };

        ClipboardAction.prototype.selectFake = function selectFake() {
            var _this = this;

            var isRTL = document.documentElement.getAttribute('dir') == 'rtl';

            this.removeFake();

            this.fakeHandlerCallback = function () {
                return _this.removeFake();
            };
            this.fakeHandler = document.body.addEventListener('click', this.fakeHandlerCallback) || true;

            this.fakeElem = document.createElement('textarea');
            // Prevent zooming on iOS
            this.fakeElem.style.fontSize = '12pt';
            // Reset box model
            this.fakeElem.style.border = '0';
            this.fakeElem.style.padding = '0';
            this.fakeElem.style.margin = '0';
            // Move element out of screen horizontally
            this.fakeElem.style.position = 'absolute';
            this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
            // Move element to the same position vertically
            this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + 'px';
            this.fakeElem.setAttribute('readonly', '');
            this.fakeElem.value = this.text;

            document.body.appendChild(this.fakeElem);

            this.selectedText = (0, _select2.default)(this.fakeElem);
            this.copyText();
        };

        ClipboardAction.prototype.removeFake = function removeFake() {
            if (this.fakeHandler) {
                document.body.removeEventListener('click', this.fakeHandlerCallback);
                this.fakeHandler = null;
                this.fakeHandlerCallback = null;
            }

            if (this.fakeElem) {
                document.body.removeChild(this.fakeElem);
                this.fakeElem = null;
            }
        };

        ClipboardAction.prototype.selectTarget = function selectTarget() {
            this.selectedText = (0, _select2.default)(this.target);
            this.copyText();
        };

        ClipboardAction.prototype.copyText = function copyText() {
            var succeeded = undefined;

            try {
                succeeded = document.execCommand(this.action);
            } catch (err) {
                succeeded = false;
            }

            this.handleResult(succeeded);
        };

        ClipboardAction.prototype.handleResult = function handleResult(succeeded) {
            if (succeeded) {
                this.emitter.emit('success', {
                    action: this.action,
                    text: this.selectedText,
                    trigger: this.trigger,
                    clearSelection: this.clearSelection.bind(this)
                });
            } else {
                this.emitter.emit('error', {
                    action: this.action,
                    trigger: this.trigger,
                    clearSelection: this.clearSelection.bind(this)
                });
            }
        };

        ClipboardAction.prototype.clearSelection = function clearSelection() {
            if (this.target) {
                this.target.blur();
            }

            window.getSelection().removeAllRanges();
        };

        ClipboardAction.prototype.destroy = function destroy() {
            this.removeFake();
        };

        _createClass(ClipboardAction, [{
            key: 'action',
            set: function set() {
                var action = arguments.length <= 0 || arguments[0] === undefined ? 'copy' : arguments[0];

                this._action = action;

                if (this._action !== 'copy' && this._action !== 'cut') {
                    throw new Error('Invalid "action" value, use either "copy" or "cut"');
                }
            },
            get: function get() {
                return this._action;
            }
        }, {
            key: 'target',
            set: function set(target) {
                if (target !== undefined) {
                    if (target && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object' && target.nodeType === 1) {
                        if (this.action === 'copy' && target.hasAttribute('disabled')) {
                            throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                        }

                        if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
                            throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                        }

                        this._target = target;
                    } else {
                        throw new Error('Invalid "target" value, use a valid Element');
                    }
                }
            },
            get: function get() {
                return this._target;
            }
        }]);

        return ClipboardAction;
    }();

    module.exports = ClipboardAction;
});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(49), __webpack_require__(161), __webpack_require__(111)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        factory(module, require('./clipboard-action'), require('tiny-emitter'), require('good-listener'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, global.clipboardAction, global.tinyEmitter, global.goodListener);
        global.clipboard = mod.exports;
    }
})(this, function (module, _clipboardAction, _tinyEmitter, _goodListener) {
    'use strict';

    var _clipboardAction2 = _interopRequireDefault(_clipboardAction);

    var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

    var _goodListener2 = _interopRequireDefault(_goodListener);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var Clipboard = function (_Emitter) {
        _inherits(Clipboard, _Emitter);

        /**
         * @param {String|HTMLElement|HTMLCollection|NodeList} trigger
         * @param {Object} options
         */

        function Clipboard(trigger, options) {
            _classCallCheck(this, Clipboard);

            var _this = _possibleConstructorReturn(this, _Emitter.call(this));

            _this.resolveOptions(options);
            _this.listenClick(trigger);
            return _this;
        }

        /**
         * Defines if attributes would be resolved using internal setter functions
         * or custom functions that were passed in the constructor.
         * @param {Object} options
         */


        Clipboard.prototype.resolveOptions = function resolveOptions() {
            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            this.action = typeof options.action === 'function' ? options.action : this.defaultAction;
            this.target = typeof options.target === 'function' ? options.target : this.defaultTarget;
            this.text = typeof options.text === 'function' ? options.text : this.defaultText;
        };

        Clipboard.prototype.listenClick = function listenClick(trigger) {
            var _this2 = this;

            this.listener = (0, _goodListener2.default)(trigger, 'click', function (e) {
                return _this2.onClick(e);
            });
        };

        Clipboard.prototype.onClick = function onClick(e) {
            var trigger = e.delegateTarget || e.currentTarget;

            if (this.clipboardAction) {
                this.clipboardAction = null;
            }

            this.clipboardAction = new _clipboardAction2.default({
                action: this.action(trigger),
                target: this.target(trigger),
                text: this.text(trigger),
                trigger: trigger,
                emitter: this
            });
        };

        Clipboard.prototype.defaultAction = function defaultAction(trigger) {
            return getAttributeValue('action', trigger);
        };

        Clipboard.prototype.defaultTarget = function defaultTarget(trigger) {
            var selector = getAttributeValue('target', trigger);

            if (selector) {
                return document.querySelector(selector);
            }
        };

        Clipboard.prototype.defaultText = function defaultText(trigger) {
            return getAttributeValue('text', trigger);
        };

        Clipboard.prototype.destroy = function destroy() {
            this.listener.destroy();

            if (this.clipboardAction) {
                this.clipboardAction.destroy();
                this.clipboardAction = null;
            }
        };

        return Clipboard;
    }(_tinyEmitter2.default);

    /**
     * Helper function to retrieve attribute value.
     * @param {String} suffix
     * @param {Element} element
     */
    function getAttributeValue(suffix, element) {
        var attribute = 'data-clipboard-' + suffix;

        if (!element.hasAttribute(attribute)) {
            return;
        }

        return element.getAttribute(attribute);
    }

    module.exports = Clipboard;
});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

var matches = __webpack_require__(113)

module.exports = function (element, selector, checkYoSelf) {
  var parent = checkYoSelf ? element : element.parentNode

  while (parent && parent !== document) {
    if (matches(parent, selector)) return parent;
    parent = parent.parentNode
  }
}


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".hljs{display:block;overflow-x:auto;padding:.5em;background:#fff;color:#000}.hljs-comment,.hljs-quote,.hljs-variable{color:green}.hljs-built_in,.hljs-keyword,.hljs-name,.hljs-selector-tag,.hljs-tag{color:#00f}.hljs-addition,.hljs-attribute,.hljs-literal,.hljs-section,.hljs-string,.hljs-template-tag,.hljs-template-variable,.hljs-title,.hljs-type{color:#a31515}.hljs-deletion,.hljs-meta,.hljs-selector-attr,.hljs-selector-pseudo{color:#2b91af}.hljs-doctag{color:gray}.hljs-attr{color:red}.hljs-bullet,.hljs-link,.hljs-symbol{color:#00b0e8}.hljs-emphasis{font-style:italic}.hljs-strong{font-weight:700}", ""]);

// exports


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,details,figcaption,figure,footer,header,main,menu,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0}progress{vertical-align:baseline}[hidden],template{display:none}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}dfn{font-style:italic}h1{font-size:2em;margin:.67em 0}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}svg:not(:root){overflow:hidden}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}button,input,optgroup,select,textarea{font:inherit;margin:0}optgroup{font-weight:700}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}", ""]);

// exports


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "[data-component=application]{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;max-height:100%;min-height:100%}@media (max-height:24em){[data-component=application]{-ms-flex-pack:start;justify-content:flex-start}}[data-component=application] .branding,[data-component=application] .surface{width:35rem;max-width:100vw}[data-component=application] .surface{background:#fff;min-height:18em;max-width:100vw;-ms-flex:1 1 auto;flex:1 1 auto;overflow:hidden;position:relative;z-index:1}[data-component=application] .branding{display:none;font-size:.8em;-ms-flex-pack:end;justify-content:flex-end;line-height:3;margin-bottom:1em}[data-component=application] .branding a{color:#fff;-webkit-font-smoothing:antialiased;text-decoration:none;text-shadow:0 1px 2px rgba(0,0,0,.7);padding:0 .5em}[data-component=application] .branding a:after{font-size:1.4em}[data-component=application] .header{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;box-shadow:0 1px rgba(0,0,0,.21);-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-pack:justify;justify-content:space-between;width:100%;max-width:100vw;z-index:1}[data-component=application] .header>*{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}[data-component=application] .header .title{text-align:center;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;display:inline-block}@media (max-width:500px){[data-component=application] .header .title[data-title-char-length=long]{font-size:.8em}[data-component=application] .header .title[data-title-char-length=medium]{font-size:.9em}}@media (max-width:400px){[data-component=application] .header .title[data-title-char-length=medium]{font-size:.8em}[data-component=application] .header .title[data-title-char-length=short]{font-size:.9em}}@media (max-width:360px){[data-component=application] .header .title[data-title-char-length=short]{font-size:.8em}[data-component=application] .header .title[data-title-char-length=puny]{font-size:.9em}}@media (max-width:340px){[data-component=application] .header .title[data-title-char-length=puny]{font-size:.8em}}[data-component=application] .header .button[data-action]{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:inherit;border-radius:0;color:inherit;-ms-flex:0 0 auto;flex:0 0 auto;display:-ms-flexbox;display:flex;height:4em;-ms-flex-pack:center;justify-content:center;padding:0;margin:0;width:4em;transition:opacity .15s ease}[data-component=application] .header .button[data-action]:focus:before{display:none}[data-component=application] .header .button[data-action]:focus,[data-component=application] .header .button[data-action]:hover{background:rgba(0,0,0,.045);box-shadow:none}[data-component=application] .header .button[data-action]>.icon{-ms-flex:1 0 auto;flex:1 0 auto;width:1em;height:1em;stroke:currentColor}[data-component=application] .header .button[data-action]:not(:hover) .icon{stroke-opacity:.5}[data-component=application] .content{transform:translateZ(0);transition:transform .2s ease;-ms-flex:1 1 auto;flex:1 1 auto}[data-component=application] .content>*{margin:0;-ms-flex:1 0 auto;flex:1 0 auto;max-width:100vw;width:100%}[data-component=application][data-route=home] .header [data-action=previous],[data-component=application][data-target-count=\"1\"] .header [data-action=previous]{opacity:0;pointer-events:none}[data-component=application][data-route]:not([data-route=home]) .content{transform:translate3d(-100%,0,0)}[data-component=application][data-transition-state=transitioned] [inert]>*{display:none}[data-component=application][data-mode=modal]{background:rgba(0,0,0,.7)}@media (min-width:769px){[data-component=application][data-mode=modal]{padding:1.5em 0}}[data-component=application][data-mode=modal] .surface{max-height:38em;border-radius:.3125em}@media (min-width:769px){[data-component=application][data-mode=modal] .surface{box-shadow:0 2px 8px rgba(0,0,0,.4)}}@media (max-width:768px){[data-component=application][data-mode=modal] .surface{max-height:100vh;width:100%;border-radius:0}}[data-component=application][data-mode=modal][data-branding=visible]{padding-bottom:0}@media (min-width:769px){[data-component=application][data-mode=modal][data-branding=visible] .branding{display:-ms-flexbox;display:flex}}[data-component=application][data-mode=inline]{background:#ccc;height:100vh;min-height:20em}[data-component=application][data-mode=inline] .surface{height:100vh;max-height:100vh}[data-component=application][data-mode=inline] .header [data-action=close]{opacity:0;pointer-events:none}", ""]);

// exports


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports
exports.i(__webpack_require__(53), "");
exports.i(__webpack_require__(52), "");

// module
exports.push([module.i, "article,aside,details,figcaption,figure,footer,header,hgroup,nav,section,summary{display:block}audio,canvas,video{display:inline;zoom:1}audio:not([controls]){display:none;height:0}[hidden]{display:none}html{font-size:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%}body{margin:0;text-rendering:optimizeLegibility}button,input,select,textarea{font-family:inherit;font-size:inherit;margin:0}button,input{line-height:normal}button,input[type=button],input[type=reset],input[type=submit]{cursor:pointer}button[disabled],input[type=button][disabled],input[type=reset][disabled],input[type=submit][disabled]{cursor:not-allowed}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}a:focus{outline:thin dotted}a:active,a:hover{outline:0}abbr[title]{border-bottom:thin dotted}b,strong{font-weight:700}dfn{font-style:italic}pre{white-space:pre-wrap;word-wrap:break-word}img{border:0;-ms-interpolation-mode:bicubic}svg:not(:root){overflow:hidden}textarea{overflow:auto;-webkit-overflow-scrolling:touch;vertical-align:top;resize:vertical}table{border-collapse:collapse;border-spacing:0}figure,form{margin:0}dl,menu,ol,p,pre,ul{margin:1em 0}*,:after,:before{box-sizing:border-box}body,html{width:100%;height:100%}body{font-size:16px;margin:0;overflow:hidden}div,footer,header,main,section{display:-ms-flexbox;display:flex}[data-flow=column]{-ms-flex-flow:column nowrap;flex-flow:column}.screenshot{-ms-flex-flow:column;flex-flow:column;position:relative;width:100%}.screenshot .arrow-parent,.screenshot .relative-arrow{position:relative;z-index:10}.screenshot>pre{background:rgba(0,0,0,.045);margin:0;padding:1em}.screenshot>pre .focal-point{color:#000;font-weight:700;padding:.3em}.screenshot [data-arrow]{-ms-flex-align:center;align-items:center;display:-ms-inline-flexbox;display:inline-flex}.screenshot [data-arrow]:after,.screenshot [data-arrow]:before{display:inline-block;font-family:sans-serif;font-weight:400;font-size:4.4em;line-height:16px;opacity:.9;text-shadow:0 1px 0 rgba(0,0,0,.3)}.screenshot [data-arrow=left]:before{content:\"\\2192\"}.screenshot [data-arrow=right]:after{content:\"\\2190\"}.screenshot [data-arrow=above]:before{content:\"\\2193\";right:0!important;top:-.6em}.screenshot .relative-arrow:after,.screenshot .relative-arrow:before{position:absolute}.screenshot .relative-arrow:before{right:100%}.screenshot .relative-arrow:after{left:100%}", ""]);

// exports


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "[data-component=target-search] .header{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;background-color:rgba(0,0,0,.045);box-shadow:0 1px rgba(0,0,0,.21);-ms-flex:0 0 auto;flex:0 0 auto;padding:1em;width:100%;z-index:2}[data-component=target-search] .header label{color:inherit;opacity:.5;margin-bottom:.5em}[data-component=target-search] .header .input-wrapper{position:relative;width:100%;color:#000}[data-component=target-search] .header .input-wrapper>.icon{position:absolute;pointer-events:none;height:1em;width:1em;left:1em;top:0;bottom:0;margin-top:auto;margin-bottom:auto;stroke:currentColor;stroke-opacity:.5}[data-component=target-search] .header .search{background:#fff;color:currentColor;border:0;width:100%;border-radius:5em;padding:.5em 3em}[data-component=target-search] .header .search::-webkit-input-placeholder{color:rgba(0,0,0,.3);font-family:inherit;font-size:1em}[data-component=target-search] .header .search::-moz-placeholder{color:rgba(0,0,0,.3);font-family:inherit;font-size:1em}[data-component=target-search] .header .search:-ms-input-placeholder{color:rgba(0,0,0,.3);font-family:inherit;font-size:1em}[data-component=target-search] .header .search::placeholder{color:rgba(0,0,0,.3);font-family:inherit;font-size:1em}[data-component=target-search] .header .search:focus{outline:none}[data-component=target-search] .header .search-clear{position:absolute;right:0;top:0;bottom:0;padding-left:.75em;width:2.5em;padding-right:.75em;cursor:pointer;transition:opacity .15s ease;opacity:0;pointer-events:none}[data-component=target-search] .header .search-clear:focus:hover{outline:none}[data-component=target-search] .header .search-clear .icon{position:absolute;pointer-events:none;height:1em;width:1em;right:.85em;top:0;bottom:0;margin-top:auto;margin-bottom:auto;stroke:currentColor;stroke-opacity:.5}[data-component=target-search] .header .search-clear:hover .icon{opacity:1}[data-component=target-search] .header .search[data-state=filled]~.search-clear{opacity:1;pointer-events:all}[data-component=target-search] .entries{height:0;-ms-flex:1 0 auto;flex:1 0 auto;overflow:auto;-webkit-overflow-scrolling:touch;z-index:1}@media (max-width:768px){[data-component=application][is-iphone=true] [data-component=target-search] .entries:after{content:\"\";display:block;-ms-flex:0 0 auto;flex:0 0 auto;height:64px}}[data-component=target-search] .entries .entry{position:relative;cursor:pointer;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-ms-flex:0 0 auto;flex:0 0 auto;padding:1em;overflow:ellipsis;border:1px solid rgba(0,0,0,.063);border-left:0;border-right:0}[data-component=target-search] .entries .entry[data-visible-order=\"-1\"]{display:none}[data-component=target-search] .entries .entry[data-visible-order=\"0\"]{border-top-color:transparent}[data-component=target-search] .entries .entry:last-child{border-bottom-color:transparent}[data-component=target-search] .entries .entry:not(:last-child){margin-bottom:-1px}[data-component=target-search] .entries .entry:not([data-selected]){z-index:1;background:transparent;color:inherit}[data-component=target-search] .entries .entry:not([data-selected]):hover{background:rgba(0,0,0,.045)}[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:not([data-selected]):hover{color:#fff}[data-component=target-search] .entries .entry:focus{outline:none;background:rgba(0,0,0,.045)}[data-component=target-search] .entries .entry .primary{-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;position:relative}[data-component=target-search] .entries .entry .primary:after{pointer-events:none;position:absolute;right:.75em;opacity:0}@media (min-width:400px){[data-component=application][is-touch-device=false] [data-component=target-search] .entries .entry:hover .primary:after{content:attr(data-click-hint-short);opacity:.5}[data-component=application][is-touch-device=false] [data-component=target-search] .entries .entry[data-selected]:not(:hover) .primary:after{content:attr(data-submit-hint-short);opacity:.5}}@media (min-width:460px){[data-component=application][is-touch-device=false] [data-component=target-search] .entries .entry:hover .primary:after{content:attr(data-click-hint)}[data-component=application][is-touch-device=false] [data-component=target-search] .entries .entry[data-selected]:not(:hover) .primary:after{content:attr(data-submit-hint)}}[data-component=target-search] .entries .entry .icon.logo{fill:currentColor;height:2em;margin-right:1em;width:2em}[data-component=target-search] .entries .entry .icon.next{-ms-flex:0 0 auto;flex:0 0 auto;height:1em;opacity:0;stroke:currentColor;width:1em;margin-right:.25em}[data-component=target-search] .entries .entry:focus .icon.next,[data-component=target-search] .entries .entry:hover .icon.next{opacity:.6}[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover .icon.next,[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover:hover .icon.next,[data-component=target-search] .entries .entry:active .icon.next,[data-component=target-search] .entries .entry:active:hover .icon.next,[data-component=target-search] .entries .entry[data-selected] .icon.next,[data-component=target-search] .entries .entry[data-selected]:hover .icon.next{opacity:1}[data-component=target-search] .entries .entry path.is-light-source-facing{opacity:.75}[data-component=target-search] .entries .entry path.is-not-light-source-facing{opacity:1}[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover,[data-component=target-search] .entries .entry:active,[data-component=target-search] .entries .entry[data-selected]{border-color:transparent}[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover,[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover:hover,[data-component=target-search] .entries .entry:active,[data-component=target-search] .entries .entry:active:hover,[data-component=target-search] .entries .entry[data-selected],[data-component=target-search] .entries .entry[data-selected]:hover{z-index:2;color:#fff;box-shadow:none!important}[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover:hover path.is-light-source-facing,[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover path.is-light-source-facing,[data-component=target-search] .entries .entry:active:hover path.is-light-source-facing,[data-component=target-search] .entries .entry:active path.is-light-source-facing,[data-component=target-search] .entries .entry[data-selected]:hover path.is-light-source-facing,[data-component=target-search] .entries .entry[data-selected] path.is-light-source-facing{opacity:1}[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover:hover path.is-not-light-source-facing,[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover path.is-not-light-source-facing,[data-component=target-search] .entries .entry:active:hover path.is-not-light-source-facing,[data-component=target-search] .entries .entry:active path.is-not-light-source-facing,[data-component=target-search] .entries .entry[data-selected]:hover path.is-not-light-source-facing,[data-component=target-search] .entries .entry[data-selected] path.is-not-light-source-facing{opacity:.5}", ""]);

// exports


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "[data-component$=-target]{-ms-flex:1 1 auto;flex:1 1 auto;overflow:auto;-webkit-overflow-scrolling:touch}[data-component$=-target] [data-content-slot]{background:rgba(0,0,0,.045);display:block;margin:1em;padding:1em;text-align:center}[data-component$=-target] .copy-container{position:relative;margin:2.5rem 0 2.25rem;max-width:100vw;background:rgba(0,0,0,.045);box-shadow:0 0 0 1px rgba(0,0,0,.21)}[data-component$=-target] .copy-container button.run{position:absolute;padding:.4em 1.125em .4em 2.4em;margin:0;height:2.3em;top:-1.1em;width:6em;left:calc(50% - 3em)}[data-component$=-target] .copy-container button.run,[data-component$=-target] .copy-container button.run:before{border-radius:99em}[data-component$=-target] .copy-container button.run>svg{position:absolute;height:15px;width:15px;top:0;bottom:0;margin-top:auto;margin-bottom:auto;left:1.125em;stroke:currentColor}[data-component$=-target] .copy-container button.run:after{content:\"Copied\";position:absolute;display:inline-block;top:.25em;left:0;right:0;color:#000;margin:auto;pointer-events:none;opacity:0}[data-component$=-target] .copy-container button.run[data-status=copied]:after{animation:copied .4s ease;animation-fill-mode:forwards;opacity:1}[data-component$=-target] .copy-container>.copyable{display:block;font-size:.8em;font-family:Monaco,Bitstream Vera Sans Mono,Lucida Console,Terminal,monospace;margin:0;padding:1.3em;padding-top:2.8em;white-space:pre-wrap;width:100%;word-wrap:break-word}[data-component$=-target] .copy-container>.copyable:focus{outline:none}[data-component$=-target] .copy-container[collapsed]>.copyable{transition:max-height .25s ease;max-height:80vh;overflow:hidden}[data-component$=-target] .copy-container[collapsed][collapsed=true]>.copyable{max-height:7em}[data-component$=-target] .copy-container[collapsed] button.collapse{position:absolute;height:1.7em;width:2.75em;bottom:-.85em;left:calc(50% - 1.375em);margin:0;padding:0;color:inherit;box-shadow:0 0 0 1px rgba(0,0,0,.21)}[data-component$=-target] .copy-container[collapsed] button.collapse,[data-component$=-target] .copy-container[collapsed] button.collapse:before{border-radius:99em}[data-component$=-target] .copy-container[collapsed] button.collapse:hover:not(:focus){box-shadow:0 0 0 1px rgba(0,0,0,.21),0 .1875em .375em -.1875em rgba(0,0,0,.3)}[data-component$=-target] .copy-container[collapsed] button.collapse:hover:active{box-shadow:0 0 0 1px rgba(0,0,0,.21),inset 0 .125em .375em rgba(0,0,0,.15)}[data-component$=-target] .copy-container[collapsed] button.collapse:not(:hover):focus:before{opacity:.15}[data-component$=-target] .copy-container[collapsed] button.collapse:hover:focus:before{opacity:0}[data-component$=-target] .copy-container[collapsed] button.collapse>svg{display:block;position:absolute;top:0;right:0;bottom:0;left:0;height:1em;width:1em;margin:auto;pointer-events:none;transform:rotate(0deg);transition:transform .25s ease;stroke:currentColor;stroke-opacity:.5}[data-component$=-target] .copy-container[collapsed] button.collapse:focus>svg,[data-component$=-target] .copy-container[collapsed] button.collapse:hover>svg{stroke-opacity:.75}[data-component$=-target] .copy-container[collapsed][collapsed=false] button.collapse>svg{transform:rotate(-180deg)}.target-instructions{cursor:auto;display:block;-ms-flex:1 1 auto;flex:1 1 auto;height:0;padding-bottom:1em;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}.target-instructions figure{margin:2em 0;position:relative}.target-instructions figure[data-component=screenshot],.target-instructions figure img{background:#fff;display:block;max-width:100%}.target-instructions figure[data-component=screenshot]{height:0;overflow:hidden;padding-left:0;padding-right:0;padding-top:0;position:relative;width:100%}.target-instructions figure[data-component=screenshot] iframe{border:0;left:0;opacity:0;position:absolute;top:0;transform-origin:0 0}.target-instructions figure[data-component=screenshot][data-render-state=scaled] iframe{opacity:1}.target-instructions figure:after{content:\"\";position:absolute;display:block;cursor:default;border:1px solid rgba(0,0,0,.21);z-index:1;top:0;right:0;bottom:0;left:0}[data-component=application][data-mode=modal] .target-instructions figure:after{border-left:0;border-right:0}@media (max-width:768px){[data-component=application][data-mode=modal] .target-instructions figure:after{border:1px solid rgba(0,0,0,.21)}}@media (max-width:35.125rem){.target-instructions figure:after,[data-component=application][data-mode=modal] .target-instructions figure:after{border-left:0;border-right:0}}.target-instructions figure [annotation-arrow]{position:absolute}.target-instructions figure [annotation-arrow]>div{position:absolute;top:0;left:0;height:0;width:100%}.target-instructions figure [annotation-arrow] svg{position:absolute;top:0;left:0;width:100%;height:100%}.target-instructions figure [annotation-arrow][data-svg-view-box=\"0 0 83 114\"]>div{padding-bottom:137.35%}.target-instructions figure [annotation-arrow][data-svg-view-box=\"0 0 127 73\"]>div{padding-bottom:57.48%}.target-instructions,.target-instructions :focus{outline:none}.target-instructions .target-title{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;padding:2em 4em 1.6em;text-align:center;background:rgba(0,0,0,.045);box-shadow:0 1px rgba(0,0,0,.21)}@media (max-width:568px){.target-instructions .target-title{padding-left:2em;padding-right:2em}}@media (max-width:22.5em){.target-instructions .target-title{padding-left:1.5em;padding-right:1.5em}}.target-instructions .target-title .icon{height:3em;width:3em;margin-bottom:1em}.target-instructions .target-title .icon>svg{display:block;width:100%;fill:currentColor}.target-instructions .target-title .icon path.is-light-source-facing{opacity:.75}.target-instructions .target-title .icon path.is-not-light-source-facing{opacity:1}.target-instructions .target-title h1{font-size:1.25em;font-weight:300;margin:0 0 .5em;text-align:center}.target-instructions .target-title h1:last-child{margin-bottom:0}.target-instructions .target-title .versions{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;font-size:.9em}.target-instructions .target-title .versions .label{margin-right:.5em;opacity:.5}.target-instructions .target-title .versions select{display:inline-block;border:1px solid rgba(0,0,0,.21);background:transparent;cursor:pointer;font-family:inherit;font-size:inherit;color:inherit}.target-instructions .target-title .versions select:not(:hover){opacity:.5}.target-instructions .target-title .versions select:focus{outline:none;border:1px dashed currentColor}.target-instructions ol.steps{width:35rem;max-width:100%;margin:0 auto;counter-reset:item 0;list-style:none;padding:2em 0 0}@media (max-width:768px){[data-component=application][is-iphone=true] .target-instructions ol.steps:after{content:\"\";display:block;-ms-flex:0 0 auto;flex:0 0 auto;height:64px}}.target-instructions ol.steps div,.target-instructions ol.steps footer,.target-instructions ol.steps header,.target-instructions ol.steps section{display:block}.target-instructions ol.steps li{counter-increment:item;margin:1em 0;padding:0;position:relative}.target-instructions ol.steps li:first-child{margin-top:0}.target-instructions ol.steps li+li{margin-top:3.5em}.target-instructions ol.steps li:first-child>:first-child{margin-top:0}.target-instructions ol.steps li:last-child>:last-child{margin-bottom:0}.target-instructions ol.steps li:before{background:rgba(0,0,0,.045);border-radius:50%;color:#fff;content:counter(item);display:inline-block;left:0;line-height:2em;margin-left:1em;position:absolute;text-align:center;top:-.2em;width:2em}.target-instructions ol.steps li>h1,.target-instructions ol.steps li>h2,.target-instructions ol.steps li>p{margin:1em 2em 1em 4em}@media (max-width:568px){.target-instructions ol.steps li>h1,.target-instructions ol.steps li>h2,.target-instructions ol.steps li>p{margin-right:1em}}.target-instructions h2{font-size:1em;font-weight:400;margin-top:3em}.target-instructions>:first-child{margin-top:0}.target-instructions>:last-child{margin-bottom:0}@-webkit-keyframes copied{0%,to{opacity:0}50%{opacity:1;transform:translate3d(0,-1.8em,0)}to{transform:translate3d(0,-1.8em,0)}}@keyframes copied{0%,to{opacity:0}50%{opacity:1;transform:translate3d(0,-1.8em,0)}to{transform:translate3d(0,-1.8em,0)}}", ""]);

// exports


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".embed-box{display:block}.embed-box[data-mode=inline]{width:100%;height:576px;min-height:320px;max-height:100vh}.embed-box[data-mode=modal]{position:fixed!important;z-index:100000!important;top:0!important;right:0!important;bottom:0!important;left:0!important;height:100%!important;width:100%!important;max-height:100vh!important;max-width:100vw!important;transition:opacity .1s linear!important;opacity:0}@media (max-width:768px){.embed-box[data-mode=modal]{position:absolute!important}}body[data-embed-box-scroll-state=locked]{overflow:hidden!important}@media (max-width:768px){body[data-embed-box-scroll-state=locked],html[data-embed-box-scroll-state=locked]{position:fixed!important;overflow:hidden!important;top:0!important;right:0!important;bottom:0!important;left:0!important}}.embed-box-download-iframe{position:fixed;z-index:-99999;visibility:hidden;width:1px;height:1px}[data-embed-box-scroll-state]{height:100%}", ""]);

// exports


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "article,aside,details,figcaption,figure,footer,header,hgroup,nav,section,summary{display:block}audio,canvas,video{display:inline;zoom:1}audio:not([controls]){display:none;height:0}[hidden]{display:none}html{font-size:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%}body{margin:0;text-rendering:optimizeLegibility}button,input,select,textarea{font-family:inherit;font-size:inherit;margin:0}button,input{line-height:normal}button,input[type=button],input[type=reset],input[type=submit]{cursor:pointer}button[disabled],input[type=button][disabled],input[type=reset][disabled],input[type=submit][disabled]{cursor:not-allowed}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}a:focus{outline:thin dotted}a:active,a:hover{outline:0}abbr[title]{border-bottom:thin dotted}b,strong{font-weight:700}dfn{font-style:italic}pre{white-space:pre-wrap;word-wrap:break-word}img{border:0;-ms-interpolation-mode:bicubic}svg:not(:root){overflow:hidden}textarea{overflow:auto;-webkit-overflow-scrolling:touch;vertical-align:top;resize:vertical}table{border-collapse:collapse;border-spacing:0}figure,form{margin:0}dl,menu,ol,p,pre,ul{margin:1em 0}*,:after,:before{box-sizing:border-box}html{font-size:16px}.button,body{font-family:Avenir New,Avenir,Helvetica Neue,sans-serif}.button{-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;position:relative;text-rendering:optimizeLegibility;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;display:inline-block;cursor:pointer;border:0;border-radius:.1875em;font-size:1em;padding:.6em 2em;margin:0;text-align:center;font-weight:300;letter-spacing:.04em;text-indent:.04em;text-decoration:none}@media screen and (-webkit-min-device-pixel-ratio:0){.button{font-weight:400}}@media all and (-webkit-min-device-pixel-ratio:0) and (-webkit-min-device-pixel-ratio:0.001),all and (-webkit-min-device-pixel-ratio:0) and (min-resolution:0.001dppx){.button{font-weight:300}}.button:hover{text-decoration:none}.button[disabled]{opacity:.7}.button[disabled]:focus,.button[disabled]:focus:hover,.button[disabled]:hover{box-shadow:none!important}.button:hover{box-shadow:0 .1875em .375em -.1875em rgba(0,0,0,.325)}.button:hover:active{box-shadow:inset 0 .125em .375em rgba(0,0,0,.325)}.button:focus{outline:none}.button:focus:before{content:\"\";position:absolute;z-index:1;top:2px;right:2px;bottom:2px;left:2px;border-radius:.1em;box-shadow:inset 0 0 0 1px currentColor;pointer-events:none;transition:opacity .3s ease-in-out}.button:focus:active:before{opacity:0}.button.primary{background:#000;color:#fff}@font-face{font-family:embed-box-icons;font-style:normal;font-weight:400;src:url(data:application/x-font-woff;charset=utf-8;base64,d09GRk9UVE8AAAQQAAoAAAAABewAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAARQAAAEw7LPuDUZGVE0AAAIIAAAAGgAAABx04jsnT1MvMgAAAiQAAABLAAAAYGFpBYRjbWFwAAACcAAAAEcAAAFOP7UHcGhlYWQAAAK4AAAALwAAADYGoUQqaGhlYQAAAugAAAAfAAAAJAe/AetobXR4AAADCAAAABAAAAAQCwoAAG1heHAAAAMYAAAABgAAAAYABFAAbmFtZQAAAyAAAADaAAABsE3GDFBwb3N0AAAD/AAAABMAAAAg/50AZnicTY69S8NQFMXvbV5aLI/4GXEIzSJYAh0dXPwXLNpgVymvH6AtpMHJsWglk06CuPXvEPyg9E9wt2SVt/huk2exWUo5HPgdONx7EBgDROTioiWCSqfR6/YBc4BwTKUcuQbtsTo3JGelIrBh2Y2iJfBCFM5GydB04GXdAdhwYLTpwJqDB1tgZjfysA0ueHAYdq5EP+i02mGl0RbXQa97KZpLXvm9OgMA73CI98AQ90+aN+onkgmXKCVpacjd2ST5+pvk5TywE056zgsW+XRrq281rX2m0zROYxXXTtU0zRS/n6lFVhl9mBY90sDW5/RUrZOnhV547JvWLw0Y+fp5/KbLJMgjUX1dlB92Zkd2xIv/gw+CN3icY2BgYGQAggsF9tdA9CWLvytgNABOBQe1AAB4nGNgZopgnMDAysDBasw6k4GBUQ5CM19nSGMSYgACVgYIaGBgYGJAAgFprikMDgzXFazY0v6lMexg/sIgDhRmhCtQAEJGABgTC0oAeJxjYGBgZoBgGQZGBhDwAPIYwXwWBh0gzQakGRmYGK4rWP3/D+RfV7D8//+/FpAFUsUC1s0E5LAxQA0YnoCZibAaAF3eCGYAeJxjYGRgYADisx3H/eL5bb4ycHMwgMAli78rEPT/l8wCzF+AXA4GJpAoAFzJDHkAeJxjYGRgYP7y/yXDDmYBBoZ/b4EkUAQFsAAAloYFrwAEAAAAAf0AAAH9AAADEAAAAABQAAAEAAB4nI2PvQ3CMBCFXyCJxI8oEaULJCpHTiRSMEBKSvoIWVGaWHKYgREYgzEYgDEYgJoXc0UKCizZ/u7euzsbwBI3RBhWhAU2whMkMMJT7HAVjul5CCfkl3CKRbSiM4pnzKxD1cATzLEVnuKIUjim5y6ckJ/CKfkNixoNTw+NFmc4dOgBWzfW6/bsOgajvGSqEF/C7UO9QoGM/1A4cP/u+tVK5nI6NSsMac92rrtUzjdWFZlRBzWazqjUudGFyWn857WnoPfUB1VxwvAunKzvW9epPDN/9fkAFF9DNgAAeJxjYGYAg/+zGNIYsAAALpkCAwA=) format(\"woff\")}.with-more-icon-after:after,a.more:after,button.more:after{content:\"\\203A\";padding-left:.3em}.with-before-icon-before:before,.with-more-icon-after:after,a.before:before,a.more:after,button.more:after{font-family:embed-box-icons;position:relative;display:inline-block;vertical-align:baseline;color:inherit;font-style:normal;font-weight:inherit;font-size:1em;line-height:1;text-decoration:none}.with-before-icon-before:before,a.before:before{content:\"\\2039\";padding-right:.3em}a.more:not(.button):after{padding-right:.3em}.with-more-icon-after:empty:after{padding-left:.15em;padding-right:.15em}.loading-dots{opacity:0;animation:loading-dots-fadein .5s linear forwards}.loading-dots[data-state=loaded] i,.loading-dots[data-state=loaded] i:first-child,.loading-dots[data-state=loaded] i:last-child{opacity:0;animation-play-state:paused}.loading-dots i{width:.5em;height:.5em;display:inline-block;vertical-align:middle;background:currentColor;border-radius:50%;margin:0 .25em;animation:loading-dots-middle-dots .5s linear infinite}.loading-dots i:first-child{animation:loading-dots-first-dot .5s linear infinite;opacity:0;transform:translate(-1em)}.loading-dots i:last-child{animation:loading-dots-last-dot .5s linear infinite}@-webkit-keyframes loading-dots-fadein{to{opacity:1}}@keyframes loading-dots-fadein{to{opacity:1}}@-webkit-keyframes loading-dots-first-dot{to{transform:translate(1em);opacity:1}}@keyframes loading-dots-first-dot{to{transform:translate(1em);opacity:1}}@-webkit-keyframes loading-dots-middle-dots{to{transform:translate(1em)}}@keyframes loading-dots-middle-dots{to{transform:translate(1em)}}@-webkit-keyframes loading-dots-last-dot{to{transform:translate(2em);opacity:0}}@keyframes loading-dots-last-dot{to{transform:translate(2em);opacity:0}}body,html{height:100%}body{margin:0}div,footer,header,main,section{display:-ms-flexbox;display:flex}[data-flow=column]{-ms-flex-flow:column nowrap;flex-flow:column}[data-action]{cursor:pointer}[data-action],[tabindex]{-webkit-tap-highlight-color:transparent}[contenteditable],[data-selectable]{cursor:text;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}body,html{overflow:hidden}html{background:transparent}main{height:100%;overflow:hidden}body{background:transparent;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}", ""]);

// exports


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "body{width:700px;height:300px}button{background-color:#ededed;border:none;border-radius:1em;line-height:2;padding:0 .8em}.menu{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-ms-flex-flow:row wrap;flex-flow:row wrap;background:#000;color:#fff;padding:.5em}.menu.sub{background-color:#666}.menu .item{line-height:1.5;padding:0 .8em}.menu .item.selected{background-color:#999;border-radius:.8em;text-shadow:0 1px 0 #000}.modules-list{border:1px solid #ccc;margin:1em;padding:1em}.modules-list .entries{border:1px solid #ccc;width:100%}.modules-list .entries th{background-color:#eee;border:1px solid #ccc;padding:.2em 1em}.modules-list .entries th:last-of-type{width:100%}.modules-list .entries td{text-align:center}footer{padding:1em}", ""]);

// exports


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "body{width:600px;height:300px;background:#333;font-family:serif;color:#fff;padding:0 1em}a{text-decoration:none}a.install:before{content:\"+\";display:inline-block;font-weight:700;margin:0 .4em}p{margin:.5em 0}h2{color:#ebe3c5;font-weight:400;margin:.4em 0}.modal{background:#fff;color:#000;padding:1.5em 2em}.nav{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;margin-bottom:1em}.nav .item+.item:before{content:\"\\BB\";display:inline-block;margin:0 .4em}.modules{border:1px solid #dadada;border-radius:5px;color:#6d6a67;font-family:sans-serif;padding-bottom:4em;margin-top:.5em}.modules header{background:#dbdbdb;padding:.3em .8em}.modules table{width:100%}.modules table thead{background-color:#747474;color:#fff}.modules table th{border:1px solid #fff}", ""]);

// exports


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "body{width:470px;height:300px;font-family:sans-serif;padding:0 2em}header{background-color:#e0e0d8;padding:.3em .8em}a{text-decoration:none}p{margin:.5em 0}h2{font-weight:400;margin:.4em 0}h3{margin:1em 0 0}.alert{background-color:#f8fef0;border:1px solid #d2e0b6;margin-top:1em;padding:.3em .8em}ul{margin:0;padding:0 1em}", ""]);

// exports


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "body{width:700px;height:160px}.menu{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-ms-flex-flow:row wrap;flex-flow:row wrap;background:#000;color:#fff;padding:.5em}.menu.sub{background-color:#666}.menu .item{line-height:1.5;padding:0 .8em;border-radius:.8em}.content{background-color:#e0e0d8;padding:0 1em}", ""]);

// exports


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "body{width:500px;height:300px;background:#333;font-family:serif;color:#fff;padding:0 1em}a{text-decoration:none}p{margin:.5em 0}button{background-color:#ededed;border:none;border-radius:1em;font-family:sans-serif;line-height:2;padding:0 .8em}h2{color:#ebe3c5;font-weight:400;margin:.4em 0}input[type=file]{width:14em}.modal{background:#fff;color:#000;padding:1.5em 2em}.nav{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;margin-bottom:1em}.nav .item+.item:before{margin:0 .4em;display:inline-block;content:\"\\BB\"}", ""]);

// exports


/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "body{width:600px;height:420px;background:#333;color:#fff;padding:0 1em}a{text-decoration:none}button.install{background-color:#4da5f0;border:1px solid #2b69d2;border-radius:.7em;color:#fff;padding:.5em 1em .5em .7em}button.install:before{content:\"+\";display:inline-block;font-weight:700;margin-right:.5em}p{margin:.5em 0}h2{-ms-flex-align:center;align-items:center;color:#fff;display:-ms-flexbox;display:flex;font-weight:400;margin:.4em 0}h2:after{border:1px solid #fff;border-radius:50%;font-size:14px;height:1em;line-height:.8;text-align:center;width:1em}.with-plus-icon:before,h2:after{content:\"+\";display:inline-block;font-weight:700;margin:0 .4em}.modal{background:#fff;color:#000;padding:1.5em 2em}.nav{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;margin-bottom:1em}.nav .item+.item:before{content:\"\\BB\";display:inline-block;margin:0 .4em}.modules{border:1px solid #dadada;font-family:sans-serif;padding-bottom:2em;margin:.5em 0}.modules header{font-size:1.2em;font-weight:700;padding:.3em .8em}.modules table{width:100%}.modules table thead,.modules table tr{background-color:#eee}.modules table td,.modules table th{border:1px solid #fff;padding:.5em 1em;text-align:left}.modules table .enable-toggle{text-align:center}", ""]);

// exports


/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "body{width:600px;height:380px;background:#333;color:#fff;padding:0 1em}a{text-decoration:none}button.install{background-color:#4da5f0;border:1px solid #2b69d2;border-radius:.7em;color:#fff;padding:.5em 1em .5em .7em}button.install:before{content:\"+\";display:inline-block;font-weight:700;margin-right:.5em}p{margin:.5em 0}h2{-ms-flex-align:center;align-items:center;color:#fff;display:-ms-flexbox;display:flex;font-weight:400;margin:.4em 0}h2:after{border:1px solid #fff;border-radius:50%;font-size:14px;height:1em;line-height:.8;text-align:center;width:1em}.with-plus-icon:before,h2:after{content:\"+\";display:inline-block;font-weight:700;margin:0 .4em}.modal{background:#fff;color:#000;padding:1.5em 2em}.nav{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;margin-bottom:1em}.nav .item+.item:before{content:\"\\BB\";display:inline-block;margin:0 .4em}.modules{border:1px solid #dadada;font-family:sans-serif;padding-bottom:4em;margin-top:.5em}.modules header{font-size:1.2em;font-weight:700;padding:.3em .8em}.modules table{width:100%}.modules table thead,.modules table tr{background-color:#eee}.modules table td,.modules table th{border:1px solid #fff;padding:.5em 1em;text-align:left}", ""]);

// exports


/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "body{width:660px;height:110px}.menu{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-ms-flex-flow:row wrap;flex-flow:row wrap;background:#fff;color:#555}.menu.sub{background-color:#666}.menu .item{border-left:1px solid transparent;line-height:1.5;padding:.3em .8em}.menu .item+.item{border-left-color:#ccc}.content{background-color:#e0e0d8;padding:0 1em}", ""]);

// exports


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "body{width:600px;height:350px;background:#333;color:#fff;padding:0 1em}a{text-decoration:none}p{margin:.5em 0}button{background-color:#ededed;border:none;border-radius:1em;font-family:serif;line-height:2;padding:0 .8em}h2{-ms-flex-align:center;align-items:center;color:#fff;display:-ms-flexbox;display:flex;font-weight:400;margin:.4em 0}h2:after{border:1px solid #fff;border-radius:50%;content:\"+\";display:inline-block;font-size:14px;font-weight:700;height:1em;line-height:.8;margin:0 .4em;text-align:center;width:1em}input[type=file]{width:14em}.modal{background:#fff;color:#000;padding:1.5em 2em}.nav{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;margin-bottom:1em}.nav .item+.item:before{margin:0 .4em;display:inline-block;content:\"\\BB\"}", ""]);

// exports


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "body{width:720px;height:240px}body pre{min-height:100vh}", ""]);

// exports


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "body{width:700px;height:300px}body pre{min-height:100vh}", ""]);

// exports


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "body{height:200px;width:740px;background:#f2f2f2;color:#3e3e3e;font-family:Gotham SSm A,Gotham SSm B,Gotham SSm,Proxima Nova,Open Sans,Helvetica Neue,Helvetica,Arial,sans-serif;padding:30px;overflow:hidden}.screenshot h1{margin:0;font-weight:500}.screenshot p{color:#797979}.screenshot pre{border-left:.6em solid #ddd}", ""]);

// exports


/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "body{width:700px;height:455px}body pre{min-height:100vh}", ""]);

// exports


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(54);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(55);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(56);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(57);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(58);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(59);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(60);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(61);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(62);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(63);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(64);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(65);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(66);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(67);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(68);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(69);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(70);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(71);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(72);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

var closest = __webpack_require__(51);

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector, true);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;


/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/joomla/activate-plugin.png";

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/joomla/choose-file.png";

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/joomla/choose-template.png";

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/joomla/insert-code-body.png";

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/joomla/insert-code-head.png";

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/joomla/open-templates.png";

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/joomla/save.png";

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/joomla/upload-plugin.png";

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/shopify/shopify-latest/choose-template.png";

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/shopify/shopify-latest/edit-template.png";

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/tumblr/tumblr-latest/edit-appearance.png";

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/tumblr/tumblr-latest/edit-html.png";

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/tumblr/tumblr-latest/edit-theme.png";

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/weebly/paste-embed-code-footer.png";

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/weebly/paste-embed-code-header.png";

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/wordpress/activate-plugin.png";

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/app/targets/wordpress/upload-plugin.png";

/***/ },
/* 110 */
/***/ function(module, exports) {

/**
 * Check if argument is a HTML element.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.node = function(value) {
    return value !== undefined
        && value instanceof HTMLElement
        && value.nodeType === 1;
};

/**
 * Check if argument is a list of HTML elements.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.nodeList = function(value) {
    var type = Object.prototype.toString.call(value);

    return value !== undefined
        && (type === '[object NodeList]' || type === '[object HTMLCollection]')
        && ('length' in value)
        && (value.length === 0 || exports.node(value[0]));
};

/**
 * Check if argument is a string.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.string = function(value) {
    return typeof value === 'string'
        || value instanceof String;
};

/**
 * Check if argument is a function.
 *
 * @param {Object} value
 * @return {Boolean}
 */
exports.fn = function(value) {
    var type = Object.prototype.toString.call(value);

    return type === '[object Function]';
};


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

var is = __webpack_require__(110);
var delegate = __webpack_require__(92);

/**
 * Validates all params and calls the right
 * listener function based on its target type.
 *
 * @param {String|HTMLElement|HTMLCollection|NodeList} target
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listen(target, type, callback) {
    if (!target && !type && !callback) {
        throw new Error('Missing required arguments');
    }

    if (!is.string(type)) {
        throw new TypeError('Second argument must be a String');
    }

    if (!is.fn(callback)) {
        throw new TypeError('Third argument must be a Function');
    }

    if (is.node(target)) {
        return listenNode(target, type, callback);
    }
    else if (is.nodeList(target)) {
        return listenNodeList(target, type, callback);
    }
    else if (is.string(target)) {
        return listenSelector(target, type, callback);
    }
    else {
        throw new TypeError('First argument must be a String, HTMLElement, HTMLCollection, or NodeList');
    }
}

/**
 * Adds an event listener to a HTML element
 * and returns a remove listener function.
 *
 * @param {HTMLElement} node
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNode(node, type, callback) {
    node.addEventListener(type, callback);

    return {
        destroy: function() {
            node.removeEventListener(type, callback);
        }
    }
}

/**
 * Add an event listener to a list of HTML elements
 * and returns a remove listener function.
 *
 * @param {NodeList|HTMLCollection} nodeList
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenNodeList(nodeList, type, callback) {
    Array.prototype.forEach.call(nodeList, function(node) {
        node.addEventListener(type, callback);
    });

    return {
        destroy: function() {
            Array.prototype.forEach.call(nodeList, function(node) {
                node.removeEventListener(type, callback);
            });
        }
    }
}

/**
 * Add an event listener to a selector
 * and returns a remove listener function.
 *
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Object}
 */
function listenSelector(selector, type, callback) {
    return delegate(document.body, selector, type, callback);
}

module.exports = listen;


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (typeof value == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!seen.has(othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.add(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, isStrictComparable(value)];
  }
  return result;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = isKey(path, object) ? [path] : castPath(path);

  var result,
      index = -1,
      length = path.length;

  while (++index < length) {
    var key = toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result) {
    return result;
  }
  var length = object ? object.length : 0;
  return !!length && isLength(length) && isIndex(key, length) &&
    (isArray(object) || isArguments(object));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for instead of the element itself.
 *
 * @static
 * @memberOf _
 * @since 1.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [predicate=_.identity]
 *  The function invoked per iteration.
 * @param {number} [fromIndex=0] The index to search from.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(o) { return o.user == 'barney'; });
 * // => 0
 *
 * // The `_.matches` iteratee shorthand.
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // The `_.matchesProperty` iteratee shorthand.
 * _.findIndex(users, ['active', false]);
 * // => 0
 *
 * // The `_.property` iteratee shorthand.
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, fromIndex) {
  var length = array ? array.length : 0;
  if (!length) {
    return -1;
  }
  var index = fromIndex == null ? 0 : toInteger(fromIndex);
  if (index < 0) {
    index = nativeMax(length + index, 0);
  }
  return baseFindIndex(array, baseIteratee(predicate, 3), index);
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
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
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
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

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}

module.exports = findIndex;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(162), __webpack_require__(163)(module)))

/***/ },
/* 113 */
/***/ function(module, exports) {


/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matchesSelector
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (vendor) return vendor.call(el, selector);
  var nodes = el.parentNode.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (config) {pug_html = pug_html + "\u003Cmain" + (pug.attr("data-branding", (config.branding ? "visible" : "hidden"), true, true)+" data-flow=\"column\" data-component=\"application\""+pug.attr("data-target-count", this.targets.length, true, true)+pug.attr("data-mode", config.mode, true, true)+" role=\"main\"") + "\u003E\u003Cdiv class=\"surface\" data-flow=\"column\"\u003E\u003Cheader class=\"header\" role=\"menubar\"\u003E\u003Cdiv class=\"button\" data-action=\"previous\" data-ref=\"previousButton\" tabindex=\"1\" role=\"menuitem\"\u003E\u003C\u002Fdiv\u003E\u003Cspan class=\"title\" data-ref=\"title\"\u003E\u003C\u002Fspan\u003E\u003Cdiv class=\"button\" data-action=\"close\" data-ref=\"closeModalButton\" tabindex=\"2\" role=\"menuitem\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fheader\u003E\u003Cdiv class=\"content\" data-ref=\"content\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"branding\"\u003E\u003Ca" + (" class=\"with-more-icon-after\""+pug.attr("href", config.projectUrl, true, true)+" target=\"_blank\"") + "\u003EPowered by EmbedBox\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fmain\u003E";}.call(this,"config" in locals_for_with?locals_for_with.config:typeof config!=="undefined"?config:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cfigure data-component=\"screenshot\"\u003E\u003Ciframe frameBorder=\"0\" srcdoc=\"&lt;div style='display: none;'&gt;&lt;\u002Fdiv&gt;\" src=\"about:blank\"\u003E\u003C\u002Fiframe\u003E\u003C\u002Ffigure\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (config) {if (config.afterContent || this.config.afterContent) {
pug_html = pug_html + "\u003Cdiv data-content-slot=\"after\"\u003E\u003Cp\u003E" + (null == (pug_interp = config.afterContent) ? "" : pug_interp) + "\u003C\u002Fp\u003E\u003Cp\u003E" + (null == (pug_interp = this.config.afterContent) ? "" : pug_interp) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
}}.call(this,"config" in locals_for_with?locals_for_with.config:typeof config!=="undefined"?config:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E" + (null == (pug_interp = this.renderTitle()) ? "" : pug_interp) + (null == (pug_interp = this.renderBeforeContent()) ? "" : pug_interp) + "\u003Cdiv class=\"steps-mount\" data-ref=\"stepsMount\"\u003E\u003C\u002Fdiv\u003E" + (null == (pug_interp = this.renderAfterContent()) ? "" : pug_interp) + "\u003C\u002Fsection\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (config) {if (config.beforeContent || this.config.beforeContent) {
pug_html = pug_html + "\u003Cdiv data-content-slot=\"before\"\u003E\u003Cp\u003E" + (null == (pug_interp = config.beforeContent) ? "" : pug_interp) + "\u003C\u002Fp\u003E\u003Cp\u003E" + (null == (pug_interp = this.config.beforeContent) ? "" : pug_interp) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
}}.call(this,"config" in locals_for_with?locals_for_with.config:typeof config!=="undefined"?config:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Ch2\u003E\u003Ca" + (" class=\"more\""+pug.attr("href", this.pluginURL, true, true)+" download target=\"_blank\"") + "\u003E" + (pug.escape(null == (pug_interp = this.downloadLabel) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Cdiv\u003E" + (pug.escape(null == (pug_interp = this.autoDownloadLabel) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fh2\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cheader class=\"target-title\" data-flow=\"column\"\u003E\u003Cdiv class=\"icon\"\u003E" + (null == (pug_interp = this.icon) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Ch1\u003E" + (null == (pug_interp = this.title) ? "" : pug_interp) + "\u003C\u002Fh1\u003E";
if (this.versionIDs.length > 1) {
pug_html = pug_html + "\u003Cdiv class=\"versions\"\u003E\u003Cdiv class=\"label\"\u003E" + (null == (pug_interp = this.instructionsLabel) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Cselect data-ref=\"versionSelector\"\u003E";
// iterate this.versionIDs
;(function(){
  var $$obj = this.versionIDs;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var versionID = $$obj[pug_index0];
pug_html = pug_html + "\u003Coption" + (pug.attr("selected", (versionID === this.versionID), true, true)) + "\u003E" + (pug.escape(null == (pug_interp = versionID) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var versionID = $$obj[pug_index0];
pug_html = pug_html + "\u003Coption" + (pug.attr("selected", (versionID === this.versionID), true, true)) + "\u003E" + (pug.escape(null == (pug_interp = versionID) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fselect\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fheader\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (label) {pug_html = pug_html + "\u003Csection data-flow=\"column\" data-component=\"target-search\" data-event-receiver\u003E\u003Cheader class=\"header\" data-flow=\"column\"\u003E\u003Clabel for=\"search-input\"\u003E" + (pug.escape(null == (pug_interp = label("searchHeader")) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003Cdiv class=\"input-wrapper\" data-ref=\"inputWrapper\"\u003E\u003Cinput" + (" class=\"search\""+" id=\"search-input\" data-ref=\"search\""+pug.attr("placeholder", label("searchPlaceholder"), true, true)+" spellcheck=\"false\" tabindex=\"3\" type=\"text\"") + "\u003E\u003Cdiv class=\"search-clear\" data-ref=\"searchClear\" tabindex=\"3\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fheader\u003E\u003Cdiv class=\"entries\" data-flow=\"column\" data-ref=\"entriesContainer\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";}.call(this,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection data-flow=\"column\" data-component=\"target-wrapper\"\u003E\u003Cdiv class=\"target-mount\" data-ref=\"targetMount\" tabindex=\"3\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (config) {pug_html = pug_html + "\u003Cdiv class=\"screenshot\"\u003E\u003Cdiv class=\"menu\"\u003E\u003Cdiv class=\"item\"\u003EDashboard\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EContent\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EStructure\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EAppearance\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EPeople\u003C\u002Fdiv\u003E\u003Cdiv class=\"item selected focal-point relative-arrow\" data-arrow=\"left\"\u003EModules\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EConfiguration\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"menu sub\"\u003E\u003Cdiv class=\"item\"\u003EAdd content\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EFind content\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"modules-list\" data-flow=\"column\"\u003E\u003Cdiv class=\"title\"\u003EUser Interface\u003C\u002Fdiv\u003E\u003Ctable class=\"entries\"\u003E\u003Cthead\u003E\u003Cth\u003EENABLED\u003C\u002Fth\u003E\u003Cth\u003ENAME\u003C\u002Fth\u003E\u003Cth\u003EDESCRIPTION\u003C\u002Fth\u003E\u003C\u002Fthead\u003E\u003Ctbody\u003E\u003Ctr\u003E\u003Ctd\u003E\u003Cdiv class=\"relative-arrow\" data-arrow=\"right\"\u003E\u003Cinput type=\"checkbox\" checked\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003Ctd\u003E" + (null == (pug_interp = config.name) ? "" : pug_interp) + "\u003C\u002Ftd\u003E\u003Ctd\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E\u003Cfooter data-arrow=\"right\"\u003E\u003Cbutton class=\"focal-point\"\u003ESave configuration\u003C\u002Fbutton\u003E\u003C\u002Ffooter\u003E\u003C\u002Fdiv\u003E";}.call(this,"config" in locals_for_with?locals_for_with.config:typeof config!=="undefined"?config:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (config) {pug_html = pug_html + "\u003Col class=\"steps\"\u003E";
if (this.pluginURL) {
pug_html = pug_html + "\u003Cli\u003E" + (null == (pug_interp = this.renderDownloadLink()) ? "" : pug_interp) + "\u003Cp\u003EAfter downloading, don’t unzip the file.\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003ELogin to your Drupal Administrator Dashboard and click \u003Cstrong\u003EModules\u003C\u002Fstrong\u003E.\u003C\u002Fh2\u003E\u003Cfigure data-ref=\"screenshotMounts[]\" data-screenshot=\"navigateToModules\"\u003E\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EClick \u003Cstrong\u003EInstall New Module\u003C\u002Fstrong\u003E.\u003C\u002Fh2\u003E\u003Cfigure data-ref=\"screenshotMounts[]\" data-screenshot=\"installNewModules\"\u003E\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EUpload the module.\u003C\u002Fh2\u003E\u003Cp\u003EClick \u003Cstrong\u003EChoose File\u003C\u002Fstrong\u003E and select the module you downloaded to your computer.\u003C\u002Fp\u003E\u003Cfigure data-ref=\"screenshotMounts[]\" data-screenshot=\"uploadModule\"\u003E\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EClick \u003Cstrong\u003EEnable newly added modules\u003C\u002Fstrong\u003E.\u003C\u002Fh2\u003E\u003Cfigure data-ref=\"screenshotMounts[]\" data-screenshot=\"installationSuccessful\"\u003E\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EActivate the plugin and view your site.\u003C\u002Fh2\u003E\u003Cp\u003EOn the Modules page, scroll down to find the new \u003Cstrong\u003E" + (pug.escape(null == (pug_interp = config.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E entry.\u003C\u002Fp\u003E\u003Cp\u003ECheck the \u003Cstrong\u003EEnabled\u003C\u002Fstrong\u003E. checkbox to activate the plugin, and click \u003Cstrong\u003ESave configuration\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003Cfigure data-ref=\"screenshotMounts[]\" data-screenshot=\"activateModule\"\u003E\u003C\u002Ffigure\u003E\u003Cp\u003EYou’re done!\u003C\u002Fp\u003E\u003C\u002Fli\u003E";
}
else {
if (this.location === "body") {
pug_html = pug_html + "\u003Cli\u003E\u003Ch2\u003EIn your Drupal site’s Admin interface, click the \u003Cstrong\u003EStructure\u003C\u002Fstrong\u003E link at the top of the page.\u003C\u002Fh2\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EClick \u003Cstrong\u003EBlocks\u003C\u002Fstrong\u003E.\u003C\u002Fh2\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EClick \u003Cstrong\u003EAdd Block\u003C\u002Fstrong\u003E.\u003C\u002Fh2\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EFill out the form.\u003C\u002Fh2\u003E\u003Cp\u003EAs the \u003Cstrong\u003EBlock Description\u003C\u002Fstrong\u003E enter “" + (pug.escape(null == (pug_interp = config.name) ? "" : pug_interp)) + " Embed”.\u003C\u002Fp\u003E\u003Cp\u003EAs the \u003Cstrong\u003EBlock Body\u003C\u002Fstrong\u003E paste this embed code:\u003C\u002Fp\u003E\u003Cdiv class=\"copy-container\" data-ref=\"copyContainers[]\"\u003E\u003Cbutton class=\"button primary run\" data-ref=\"copyButtons[]\"\u003ECopy\u003C\u002Fbutton\u003E\u003Cdiv class=\"copyable\" contenteditable\u003E" + (pug.escape(null == (pug_interp = this.copyText) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cp\u003EAs the \u003Cstrong\u003EText Format\u003C\u002Fstrong\u003E select “Full HTML”.\u003C\u002Fp\u003E\u003Cp\u003EUnder \u003Cstrong\u003ERegion Settings\u003C\u002Fstrong\u003E select “Footer” \u003Cem\u003Efor every theme\u003C\u002Fem\u003E.\u003C\u002Fp\u003E\u003Cp\u003EThat’s it, there’s no need to select any other options\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EClick \u003Cstrong\u003ESave block\u003C\u002Fstrong\u003E, you’re done!\u003C\u002Fh2\u003E\u003C\u002Fli\u003E";
}
else {
pug_html = pug_html + "\u003Cli\u003E\u003Ch2\u003EIf you don’t already have it installed, install the \u003Cstrong\u003EAdd to Head\u003C\u002Fstrong\u003E module.\u003C\u002Fh2\u003E\u003Cp\u003EIn your Drupal site’s Admin interface, click the \u003Cstrong\u003EModules\u003C\u002Fstrong\u003E link at the top of the page\u003C\u002Fp\u003E\u003Cp\u003EClick \u003Cstrong\u003EInstall new module\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003Cp\u003EIn the \u003Cstrong\u003EInstall from a URL\u003C\u002Fstrong\u003E field enter:\u003C\u002Fp\u003E\u003Cdiv class=\"copy-container\" data-ref=\"copyContainers[]\"\u003E\u003Cbutton class=\"button primary run\" data-ref=\"copyButtons[]\"\u003ECopy\u003C\u002Fbutton\u003E\u003Cdiv class=\"copyable\" contenteditable\u003Ehttps:\u002F\u002Fftp.drupal.org\u002Ffiles\u002Fprojects\u002Fadd_to_head-7.x-1.2.tar.gz\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cp\u003EClick \u003Cstrong\u003EEnable newly install modules\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003Cp\u003EScroll down until you find the \u003Cstrong\u003EAdd To Head\u003C\u002Fstrong\u003E module and check the box to the left of the name.\u003C\u002Fp\u003E\u003Cp\u003EClick \u003Cstrong\u003ESave configuration\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EInstall the embed code into the module\u003C\u002Fh2\u003E\u003Cp\u003EClick the \u003Cstrong\u003EConfiguration\u003C\u002Fstrong\u003E button at the top of your Drupal site’s Admin interface.\u003C\u002Fp\u003E\u003Cp\u003EClick the \u003Cstrong\u003EAdd to Head\u003C\u002Fstrong\u003E link on the right side.\u003C\u002Fp\u003E\u003Cp\u003EClick \u003Cstrong\u003EAdd one now\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EFill out the form.\u003C\u002Fh2\u003E\u003Cp\u003EFor the \u003Cstrong\u003EName\u003C\u002Fstrong\u003E enter “" + (pug.escape(null == (pug_interp = config.name) ? "" : pug_interp)) + " Embed”.\u003C\u002Fp\u003E\u003Cp\u003EFor the \u003Cstrong\u003ECode\u003C\u002Fstrong\u003E enter:\u003C\u002Fp\u003E\u003Cdiv class=\"copy-container\" data-ref=\"copyContainers[]\"\u003E\u003Cbutton class=\"button primary run\" data-ref=\"copyButtons[]\"\u003ECopy\u003C\u002Fbutton\u003E\u003Cdiv class=\"copyable\" contenteditable\u003E" + (pug.escape(null == (pug_interp = this.copyText) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cp\u003EFor the \u003Cstrong\u003EScope of addition\u003C\u002Fstrong\u003E, select “Head”.\u003C\u002Fp\u003E\u003Cp\u003EThere is no need to change any other fields.\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EClick \u003Cstrong\u003ESave\u003C\u002Fstrong\u003E, you’re done!\u003C\u002Fh2\u003E\u003C\u002Fli\u003E";
}
}
pug_html = pug_html + "\u003C\u002Fol\u003E";}.call(this,"config" in locals_for_with?locals_for_with.config:typeof config!=="undefined"?config:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"screenshot\"\u003E\u003Ch2\u003EModules\u003C\u002Fh2\u003E\u003Cdiv class=\"modal\" data-flow=\"column\"\u003E\u003Cdiv class=\"nav\"\u003E\u003Cdiv class=\"item\"\u003E\u003Ca href=\"#-\"\u003EHome\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003E\u003Ca href=\"#-\"\u003EAdministration\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"instructions\" data-flow=\"column\"\u003E\u003Cp data-arrow=\"right\"\u003E\u003Ca class=\"install focal-point\" href=\"#-\"\u003EInstall new module\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003Cdiv class=\"modules\" data-flow=\"column\"\u003E\u003Cheader\u003ECore\u003C\u002Fheader\u003E\u003Ctable\u003E\u003Cthead\u003E\u003Cth\u003EEnabled\u003C\u002Fth\u003E\u003Cth\u003EName\u003C\u002Fth\u003E\u003Cth\u003EVersion\u003C\u002Fth\u003E\u003Cth\u003EDescription\u003C\u002Fth\u003E\u003Cth\u003EOperations\u003C\u002Fth\u003E\u003C\u002Fthead\u003E\u003Ctbody\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (config) {pug_html = pug_html + "\u003Cdiv class=\"screenshot\"\u003E\u003Cheader\u003E\u003Ch2\u003EUpdate Manager\u003C\u002Fh2\u003E\u003C\u002Fheader\u003E\u003Cdiv class=\"content\" data-flow=\"column\"\u003E\u003Cdiv class=\"alert\"\u003EInstallation was completed successfully.\u003C\u002Fdiv\u003E\u003Ch4\u003E" + (null == (pug_interp = config.name) ? "" : pug_interp) + "\u003C\u002Fh4\u003E\u003Cul\u003E\u003Cli\u003EInstalled \u003Ci\u003E“" + (pug.escape(null == (pug_interp = config.name) ? "" : pug_interp)) + "”\u003C\u002Fi\u003E successfully\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003Ch4\u003ENext steps\u003C\u002Fh4\u003E\u003Cul\u003E\u003Cli\u003E\u003Ca href=\"#-\" data-arrow=\"right\"\u003EEnable newly added\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca href=\"#-\"\u003EAdminstrator pages\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"config" in locals_for_with?locals_for_with.config:typeof config!=="undefined"?config:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"screenshot\"\u003E\u003Cdiv class=\"menu\"\u003E\u003Cdiv class=\"item\"\u003EDashboard\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EContent\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EStructure\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EAppearance\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EPeople\u003C\u002Fdiv\u003E\u003Cdiv class=\"item focal-point relative-arrow\" data-arrow=\"left\"\u003EModules\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EConfiguration\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"menu sub\"\u003E\u003Cdiv class=\"item\"\u003EAdd content\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EFind content\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"content\"\u003E\u003Ch1\u003EAdministration\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"screenshot\"\u003E\u003Ch2\u003EModules\u003C\u002Fh2\u003E\u003Cdiv class=\"modal\" data-flow=\"column\"\u003E\u003Cdiv class=\"nav\"\u003E\u003Cdiv class=\"item\"\u003E\u003Ca href=\"#-\"\u003EHome\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003E\u003Ca href=\"#-\"\u003EAdministration\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003E\u003Ca href=\"#-\"\u003EModules\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"instructions\" data-flow=\"column\"\u003E\u003Cp\u003EThe following extensions are supported:&nbsp;\u003Ci\u003Ezip tar tgz bz2\u003C\u002Fi\u003E\u003C\u002Fp\u003E\u003Cp\u003E\u003Cstrong\u003EUpload a module or theme archive to install\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\u003Cp\u003E\u003Cdiv class=\"upload\" data-arrow=\"right\"\u003E\u003Cinput class=\"focal-point\" type=\"file\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"hint\"\u003EFor example:&nbsp;\u003Ci\u003Ename.tar.zip\u003C\u002Fi\u003E&nbsp;from your local computer\u003C\u002Fdiv\u003E\u003C\u002Fp\u003E\u003Cfooter data-arrow=\"right\"\u003E\u003Cbutton class=\"focal-point\"\u003EInstall\u003C\u002Fbutton\u003E\u003C\u002Ffooter\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (config) {pug_html = pug_html + "\u003Cdiv class=\"screenshot\"\u003E\u003Ch2\u003EExtend\u003C\u002Fh2\u003E\u003Cdiv class=\"modal\" data-flow=\"column\"\u003E\u003Cdiv class=\"nav\"\u003E\u003Cdiv class=\"item\"\u003E\u003Ca href=\"#-\"\u003EHome\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003E\u003Ca href=\"#-\"\u003EAdministration\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"instructions\" data-flow=\"column\"\u003E\u003Cp\u003EDownload additional \u003Ca href=\"#-\"\u003Econtributed modules\u003C\u002Fa\u003E to extend Drupal's functionality.\u003C\u002Fp\u003E\u003Cp\u003ERegularly review and install \u003Ca href=\"#-\"\u003Eavailable updates\u003C\u002Fa\u003E to maintain a secure and current site.\nAlways run the \u003Ca href=\"#-\"\u003Eupdate script\u003C\u002Fa\u003E each time a module is updated.\u003C\u002Fp\u003E\u003Cp\u003E\u003Cbutton class=\"install with-plus-icon\"\u003EInstall new module\u003C\u002Fbutton\u003E\u003C\u002Fp\u003E\u003Cdiv class=\"modules\" data-flow=\"column\"\u003E\u003Cheader\u003E\u003Ca href=\"#-\"\u003ECore\u003C\u002Fa\u003E\u003C\u002Fheader\u003E\u003Ctable\u003E\u003Cthead\u003E\u003Cth\u003E\u003C\u002Fth\u003E\u003Cth\u003EName\u003C\u002Fth\u003E\u003Cth\u003EDescription\u003C\u002Fth\u003E\u003C\u002Fthead\u003E\u003Ctbody\u003E\u003Ctr\u003E\u003Ctd class=\"enable-toggle\"\u003E\u003Cdiv class=\"relative-arrow\" data-arrow=\"right\"\u003E\u003Cinput type=\"checkbox\" checked\u003E\u003C\u002Fdiv\u003E\u003C\u002Ftd\u003E\u003Ctd\u003E" + (null == (pug_interp = config.name) ? "" : pug_interp) + "\u003C\u002Ftd\u003E\u003Ctd\u003E\u003C\u002Ftd\u003E\u003C\u002Ftr\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cfooter data-arrow=\"right\"\u003E\u003Cbutton class=\"focal-point\"\u003ESave configuration\u003C\u002Fbutton\u003E\u003C\u002Ffooter\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"config" in locals_for_with?locals_for_with.config:typeof config!=="undefined"?config:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (config) {pug_html = pug_html + "\u003Col class=\"steps\"\u003E";
if (this.pluginURL) {
pug_html = pug_html + "\u003Cli\u003E" + (null == (pug_interp = this.renderDownloadLink()) ? "" : pug_interp) + "\u003Cp\u003EAfter downloading, don’t unzip the file.\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003ELogin to your Drupal Administrator Dashboard and click \u003Cstrong\u003EExtend\u003C\u002Fstrong\u003E.\u003C\u002Fh2\u003E\u003Cfigure data-ref=\"screenshotMounts[]\" data-screenshot=\"navigateToModules\"\u003E\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EClick \u003Cstrong\u003EInstall new module\u003C\u002Fstrong\u003E.\u003C\u002Fh2\u003E\u003Cfigure data-ref=\"screenshotMounts[]\" data-screenshot=\"installNewModules\"\u003E\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EUpload the module.\u003C\u002Fh2\u003E\u003Cp\u003EClick \u003Cstrong\u003EChoose File\u003C\u002Fstrong\u003E and select the module you downloaded to your computer.\u003C\u002Fp\u003E\u003Cfigure data-ref=\"screenshotMounts[]\" data-screenshot=\"uploadModule\"\u003E\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EActivate the module.\u003C\u002Fh2\u003E\u003Cp\u003EYou should see the new module on the \u003Cstrong\u003EExtend\u003C\u002Fstrong\u003E page.\u003C\u002Fp\u003E\u003Cp\u003EThe module will appear in category set by the author.\u003C\u002Fp\u003E\u003Cp\u003EClick the checkbox next to the module, then click \u003Cstrong\u003ESave Configuration\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003Cfigure data-ref=\"screenshotMounts[]\" data-screenshot=\"activateModule\"\u003E\u003C\u002Ffigure\u003E\u003Cp\u003EYou’re done!\u003C\u002Fp\u003E\u003C\u002Fli\u003E";
}
else {
pug_html = pug_html + "\u003Cli\u003E\u003Ch2\u003EIn your Drupal site’s Admin interface, click the \u003Cstrong\u003EStructure \u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E Block layout \u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E Add custom block\u003C\u002Fstrong\u003E link in the navigation menu at the top of the page.\u003C\u002Fh2\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EFill out the form.\u003C\u002Fh2\u003E\u003Cp\u003EAs the \u003Cstrong\u003EBlock Description\u003C\u002Fstrong\u003E enter “" + (pug.escape(null == (pug_interp = config.name) ? "" : pug_interp)) + " Embed”.\u003C\u002Fp\u003E\u003Cp\u003E\u003Cstrong\u003EBefore pasting the embed code\u003C\u002Fstrong\u003E as the \u003Cstrong\u003EText Format\u003C\u002Fstrong\u003E select “Full HTML”.\u003C\u002Fp\u003E\u003Cp\u003EIn the \u003Cstrong\u003EBody\u003C\u002Fstrong\u003E field click the \u003Cstrong\u003ESource\u003C\u002Fstrong\u003E button inside the editor.\u003C\u002Fp\u003E\u003Cp\u003EPaste this embed code:\u003C\u002Fp\u003E\u003Cdiv class=\"copy-container\" data-ref=\"copyContainers[]\"\u003E\u003Cbutton class=\"button primary run\" data-ref=\"copyButtons[]\"\u003ECopy\u003C\u002Fbutton\u003E\u003Cdiv class=\"copyable\" contenteditable\u003E" + (pug.escape(null == (pug_interp = this.copyText) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cp\u003EClick \u003Cstrong\u003ESave\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003Cp\u003EOn the new page that opens, For the \u003Cstrong\u003ERegion\u003C\u002Fstrong\u003E select “Footer first”.\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EClick \u003Cstrong\u003ESave block\u003C\u002Fstrong\u003E, you’re done!\u003C\u002Fh2\u003E\u003C\u002Fli\u003E";
}
pug_html = pug_html + "\u003C\u002Fol\u003E";}.call(this,"config" in locals_for_with?locals_for_with.config:typeof config!=="undefined"?config:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"screenshot\"\u003E\u003Ch2\u003EExtend\u003C\u002Fh2\u003E\u003Cdiv class=\"modal\" data-flow=\"column\"\u003E\u003Cdiv class=\"nav\"\u003E\u003Cdiv class=\"item\"\u003E\u003Ca href=\"#-\"\u003EHome\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003E\u003Ca href=\"#-\"\u003EAdministration\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"instructions\" data-flow=\"column\"\u003E\u003Cp\u003EDownload additional \u003Ca href=\"#-\"\u003Econtributed modules\u003C\u002Fa\u003E to extend Drupal's functionality.\u003C\u002Fp\u003E\u003Cp\u003ERegularly review and install \u003Ca href=\"#-\"\u003Eavailable updates\u003C\u002Fa\u003E to maintain a secure and current site.\nAlways run the \u003Ca href=\"#-\"\u003Eupdate script\u003C\u002Fa\u003E each time a module is updated.\u003C\u002Fp\u003E\u003Cp data-arrow=\"right\"\u003E\u003Cbutton class=\"install with-plus-icon\"\u003EInstall new module\u003C\u002Fbutton\u003E\u003C\u002Fp\u003E\u003Cdiv class=\"modules\" data-flow=\"column\"\u003E\u003Cheader\u003E\u003Ca href=\"#-\"\u003ECore\u003C\u002Fa\u003E\u003C\u002Fheader\u003E\u003Ctable\u003E\u003Cthead\u003E\u003Cth\u003EName\u003C\u002Fth\u003E\u003Cth\u003EDescription\u003C\u002Fth\u003E\u003C\u002Fthead\u003E\u003Ctbody\u003E\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"screenshot\"\u003E\u003Cdiv class=\"menu\"\u003E\u003Cdiv class=\"item\"\u003EContent\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EStructure\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EAppearance\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EPeople\u003C\u002Fdiv\u003E\u003Cdiv class=\"item focal-point relative-arrow\" data-arrow=\"left\"\u003EExtend\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EConfiguration\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003EPeople\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"content\"\u003E\u003Ch1\u003EAdministration\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"screenshot\"\u003E\u003Ch2\u003EExtend\u003C\u002Fh2\u003E\u003Cdiv class=\"modal\" data-flow=\"column\"\u003E\u003Cdiv class=\"nav\"\u003E\u003Cdiv class=\"item\"\u003E\u003Ca href=\"#-\"\u003EHome\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003E\u003Ca href=\"#-\"\u003EAdministration\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"item\"\u003E\u003Ca href=\"#-\"\u003EModules\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"instructions\" data-flow=\"column\"\u003E\u003Cp\u003EYou can find \u003Ca href=\"#-\"\u003Emodules\u003C\u002Fa\u003E and \u003Ca href=\"#-\"\u003Ethemes\u003C\u002Fa\u003E on \u003Ca href=\"#-\"\u003Edrupal.org\u003C\u002Fa\u003E\u003C\u002Fp\u003E\u003Cp\u003EThe following extensions are supported:&nbsp;\u003Ci\u003Etar tgz bz2 zip\u003C\u002Fi\u003E\u003C\u002Fp\u003E\u003Cp\u003E\u003Cstrong\u003EUpload a module or theme archive to install\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E\u003Cp\u003E\u003Cdiv class=\"upload\" data-arrow=\"right\"\u003E\u003Cinput class=\"focal-point\" type=\"file\"\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"hint\"\u003EFor example:&nbsp;\u003Ci\u003Ename.tar.zip\u003C\u002Fi\u003E&nbsp;from your local computer\u003C\u002Fdiv\u003E\u003C\u002Fp\u003E\u003Cfooter data-arrow=\"right\"\u003E\u003Cbutton class=\"focal-point\"\u003EInstall\u003C\u002Fbutton\u003E\u003C\u002Ffooter\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Col class=\"steps\"\u003E\u003Cli\u003E\u003Ch2\u003ECopy the code to your site’s &lt;" + (pug.escape(null == (pug_interp = this.location) ? "" : pug_interp)) + "&gt; tag.\u003C\u002Fh2\u003E\u003Cdiv class=\"copy-container\" data-ref=\"copyContainers[]\"\u003E\u003Cbutton class=\"button primary run\" data-ref=\"copyButtons[]\"\u003ECopy\u003C\u002Fbutton\u003E\u003Cdiv class=\"copyable\" contenteditable\u003E" + (pug.escape(null == (pug_interp = this.copyText) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cfigure data-ref=\"screenshotMounts[]\" data-screenshot=\"installScript\"\u003E\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EVisit your site.\u003C\u002Fh2\u003E\u003Cp\u003EAfter saving the changes you made, visit your site in the browser.\u003C\u002Fp\u003E\u003Cp\u003EYou’re done!\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003C\u002Fol\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"screenshot\"\u003E";
if (this.location === "head") {
pug_html = pug_html + "\u003Cpre\u003E\u003Ccode class=\"lang-html\"\u003E\u003Cspan class=\"hljs-meta\"\u003E&lt;!DOCTYPE html&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ehtml\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ehead\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Emeta\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Echarset\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"utf-8\"\u003C\u002Fspan\u003E \u002F&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Etitle\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003EYour website\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Etitle\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    {{EMBED_CODE_SLOT}}\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ehead\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ebody\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ebody\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ehtml\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n";
}
else {
pug_html = pug_html + "\u003Cpre\u003E\u003Ccode class=\"lang-html\"\u003E\u003Cspan class=\"hljs-meta\"\u003E&lt;!DOCTYPE html&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ehtml\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ehead\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Emeta\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Echarset\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"utf-8\"\u003C\u002Fspan\u003E \u002F&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Etitle\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003EYour website\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Etitle\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ehead\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ebody\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    {{EMBED_CODE_SLOT}}\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ebody\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ehtml\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (asset, config) {pug_mixins["annotation-arrow"] = pug_interp = function(direction){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var firstDirection = direction.substr(0, 1)
var isNS = ["n", "s"].indexOf(firstDirection) !== -1
var viewBox = isNS ? "0 0 83 114" : "0 0 127 73"
var d = isNS ? "M39.3 5.4L0.9 0C0.3-0.1-0.1 0.3 0 0.9L9.1 37.8C9.2 38.4 9.7 38.5 10.1 38.1 10.1 38.1 18 29.8 19.8 27.9 19.9 27.7 20.1 27.4 20.5 27.4 20.9 27.3 21.3 27.4 21.4 27.5 68.7 64.9 76 103.8 77.1 109.6 78.2 115.4 84 114.4 82.9 108.6 81.8 102.8 75.7 53.3 30 17.7 29.9 17.6 29.6 17.4 29.6 17.1 29.6 16.9 29.9 16.6 30 16.5L39.6 6.4C40.1 5.9 39.9 5.5 39.3 5.4Z" : "M37.3 0.7C37.4 0.1 37.1-0.1 36.5 0.1L0.5 14.6C-0.1 14.9-0.2 15.4 0.3 15.8L26.5 43.2C27 43.7 27.4 43.6 27.6 43 27.6 43 30.2 31.8 30.8 29.3 30.9 29.1 30.9 28.7 31.2 28.5 31.5 28.3 31.9 28.1 32 28.2 91.7 36.9 117.5 67 121.4 71.4 125.2 75.9 129.7 72.1 125.8 67.6 122 63.1 92 23.4 34.6 15.4 34.5 15.4 34.1 15.3 33.9 15.1 33.8 14.9 34 14.5 34 14.3 35.2 9.4 37.3 0.7 37.3 0.7Z"
var transform = attributes.transform || ""
if (["ne", "en"].indexOf(direction) !== -1) {
transform += " scale(-1, 1)"
}
else
if (["se", "es"].indexOf(direction) !== -1) {
transform += " scale(-1, -1)"
}
else
if (["sw", "ws"].indexOf(direction) !== -1) {
transform += " scale(1, -1)"
}
if (transform.length === 0) {
transform = "none"
}
pug_html = pug_html + "\u003Cdiv" + (" annotation-arrow"+pug.attr("data-svg-view-box", viewBox, true, true)+pug.attr("style", pug.style(attributes.style), true, true)) + "\u003E\u003Cdiv\u003E\u003Csvg" + (" version=\"1.1\""+pug.attr("viewBox", viewBox, true, true)+pug.attr("style", pug.style({transform: transform}), true, true)) + "\u003E\u003Cpath" + (pug.attr("d", d, true, true)) + "\u003E\u003C\u002Fpath\u003E\u003C\u002Fsvg\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
pug_html = pug_html + "\u003Col class=\"steps\"\u003E";
if (this.pluginURL) {
pug_html = pug_html + "\u003Cli\u003E" + (null == (pug_interp = this.renderDownloadLink()) ? "" : pug_interp) + "\u003Cp\u003EAfter downloading, don’t unzip the file.\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EUpload the plugin to your Joomla Admin site\u003C\u002Fh2\u003E\u003Cfigure\u003E\u003Cimg" + (pug.attr("src", asset(__webpack_require__(100)), true, true)) + "\u003E";
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:37.4%;left:14.1%;width:12.8%"}
}, "nw");
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:67.5%;left:56.8%;width:10%"}
}, "ne");
pug_html = pug_html + "\u003C\u002Ffigure\u003E\u003Cp\u003EIn your Joomla Admin, navigate to: \u003Cstrong\u003EExtensions \u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E Install \u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E Upload Package File\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003Cp\u003EClick \u003Cstrong\u003EChoose File\u003C\u002Fstrong\u003E and select the file you just downloaded.\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EActivate the plugin and view your site\u003C\u002Fh2\u003E\u003Cfigure\u003E\u003Cimg" + (pug.attr("src", asset(__webpack_require__(93)), true, true)) + "\u003E";
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:48.2%;left:14.6%;width:15.8%"}
}, "en");
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:79%;left:50%;width:14.1%"}
}, "wn");
pug_html = pug_html + "\u003C\u002Ffigure\u003E\u003Cp\u003EOn the \u003Cstrong\u003EExtensions \u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E Manage\u003C\u002Fstrong\u003E page, search for " + (pug.escape(null == (pug_interp = config.name ? "“" + config.name + "”" : "the plugin") ? "" : pug_interp)) + ".\u003C\u002Fp\u003E\u003Cp\u003EWhen you’ve found the plugin, click the red \u003Cstrong\u003E×\u003C\u002Fstrong\u003E to enable the extension.\u003C\u002Fp\u003E\u003Cp\u003ECongrats, the installation is done!\u003C\u002Fp\u003E\u003C\u002Fli\u003E";
}
else {
pug_html = pug_html + "\u003Cli\u003E\u003Ch2\u003EIn the Admin area of your Joomla site, navigate to: \u003Cstrong\u003EExtensions \u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E Templates \u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E Templates\u003C\u002Fstrong\u003E.\u003C\u002Fh2\u003E\u003Cfigure\u003E\u003Cimg" + (pug.attr("src", asset(__webpack_require__(98)), true, true)) + "\u003E";
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:41.9%;left:78.4%;width:12%","transform": "rotate(60deg)"}
}, "nw");
pug_html = pug_html + "\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EChoose the template which is currently being used to power your site.\u003C\u002Fh2\u003E\u003Cp\u003EIf you’re not sure which template this is you can add this embed code to all of your templates by repeating this process.\u003C\u002Fp\u003E\u003Cfigure\u003E\u003Cimg" + (pug.attr("src", asset(__webpack_require__(95)), true, true)) + "\u003E";
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:66.8%;left:66.3%;width:12%","transform": "scale(-1, 1) rotate(60deg)"}
}, "nw");
pug_html = pug_html + "\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003ESelect the \u003Cstrong\u003Eindex.php\u003C\u002Fstrong\u003E file.\u003C\u002Fh2\u003E\u003Cfigure\u003E\u003Cimg" + (pug.attr("src", asset(__webpack_require__(94)), true, true)) + "\u003E";
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:80.5%;left:24.1%;width:24.7%"}
}, "wn");
pug_html = pug_html + "\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003ECopy the code to your site’s &lt;" + (pug.escape(null == (pug_interp = this.location) ? "" : pug_interp)) + "&gt; tag.\u003C\u002Fh2\u003E\u003Cdiv class=\"copy-container\" data-ref=\"copyContainers[]\"\u003E\u003Cbutton class=\"button primary run\" data-ref=\"copyButtons[]\"\u003ECopy\u003C\u002Fbutton\u003E\u003Cdiv class=\"copyable\" contenteditable\u003E" + (pug.escape(null == (pug_interp = this.copyText) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
if (this.location === "head") {
pug_html = pug_html + "\u003Cp\u003ECarefully search for the \u003Ccode\u003E&lt;head&gt;\u003C\u002Fcode\u003E tag.\nThere will be other similar tags, but you only want the one with that exact name.\nIt should be near the beginning of the file. Insert the embed code just \u003Cstrong\u003Eafter\u003C\u002Fstrong\u003E that tag.\u003C\u002Fp\u003E\u003Cfigure\u003E\u003Cimg" + (pug.attr("src", asset(__webpack_require__(97)), true, true)) + "\u003E";
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:40.9%;left:44%;width:17.7%"}
}, "ws");
pug_html = pug_html + "\u003C\u002Ffigure\u003E";
}
else {
pug_html = pug_html + "\u003Cp\u003ECarefully search for the \u003Ccode\u003E&lt;\u002Fbody&gt;\u003C\u002Fcode\u003E tag.\nThere will be other similar tags, but you only want the one with that exact name.\nIt should be near the end of the file.\nInsert the embed code just \u003Cstrong\u003Ebefore\u003C\u002Fstrong\u003E that tag.\u003C\u002Fp\u003E\u003Cfigure\u003E\u003Cimg" + (pug.attr("src", asset(__webpack_require__(96)), true, true)) + "\u003E";
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:78.1%;left:44%;width:18.3%"}
}, "wn");
pug_html = pug_html + "\u003C\u002Ffigure\u003E";
}
pug_html = pug_html + "\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EClick \u003Cstrong\u003ESave &amp; Close\u003C\u002Fstrong\u003E.\u003C\u002Fh2\u003E\u003Cfigure\u003E\u003Cimg" + (pug.attr("src", asset(__webpack_require__(99)), true, true)) + "\u003E";
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:36.6%;left:31%;width:14.3%","transform": "scale(-1, 1) rotate(60deg)"}
}, "nw");
pug_html = pug_html + "\u003C\u002Ffigure\u003E\u003Cp\u003EYou’re done!\u003C\u002Fp\u003E\u003C\u002Fli\u003E";
}
pug_html = pug_html + "\u003C\u002Fol\u003E";}.call(this,"asset" in locals_for_with?locals_for_with.asset:typeof asset!=="undefined"?asset:undefined,"config" in locals_for_with?locals_for_with.config:typeof config!=="undefined"?config:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"screenshot\"\u003E";
if (this.location === "head") {
pug_html = pug_html + "\u003Cpre\u003E\u003Ccode class=\"lang-django\"\u003E\u003Cspan class=\"xml\"\u003E\u003Cspan class=\"hljs-meta\"\u003E&lt;!doctype html&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ehtml\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ehead\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-comment\"\u003E&lt;!-- Basic page needs ===== --&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Emeta\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Echarset\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"utf-8\"\u003C\u002Fspan\u003E \u002F&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Emeta\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Ehttp-equiv\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"X-UA-Compatible\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Econtent\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"IE=edge,chrome=1\"\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003C\u002Fspan\u003E\u003Cspan class=\"hljs-template-variable\"\u003E{{EMBED_CODE_SLOT}}\u003C\u002Fspan\u003E\u003Cspan class=\"xml\"\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ehead\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ebody\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eid\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-template-variable\"\u003E{{page_title | handle}}\u003C\u002Fspan\u003E\u003Cspan class=\"xml\"\u003E\u003Cspan class=\"hljs-tag\"\u003E\u003Cspan class=\"hljs-string\"\u003E\"\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003C\u002Fspan\u003E\u003Cspan class=\"hljs-template-tag\"\u003E{% \u003Cspan class=\"hljs-name\"\u003E\u003Cspan class=\"hljs-name\"\u003Einclude\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E 'header-bar' %}\u003C\u002Fspan\u003E\u003Cspan class=\"xml\"\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ebody\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ehtml\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n";
}
else {
pug_html = pug_html + "\u003Cpre\u003E\u003Ccode class=\"lang-django\"\u003E\u003Cspan class=\"xml\"\u003E\u003Cspan class=\"hljs-meta\"\u003E&lt;!doctype html&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ehtml\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ehead\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-comment\"\u003E&lt;!-- Basic page needs ===== --&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Emeta\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Echarset\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"utf-8\"\u003C\u002Fspan\u003E \u002F&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Emeta\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Ehttp-equiv\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"X-UA-Compatible\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Econtent\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"IE=edge,chrome=1\"\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ehead\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ebody\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eid\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-template-variable\"\u003E{{page_title | handle}}\u003C\u002Fspan\u003E\u003Cspan class=\"xml\"\u003E\u003Cspan class=\"hljs-tag\"\u003E\u003Cspan class=\"hljs-string\"\u003E\"\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003C\u002Fspan\u003E\u003Cspan class=\"hljs-template-variable\"\u003E{{EMBED_CODE_SLOT}}\u003C\u002Fspan\u003E\u003Cspan class=\"xml\"\u003E\n\n    \u003C\u002Fspan\u003E\u003Cspan class=\"hljs-template-tag\"\u003E{% \u003Cspan class=\"hljs-name\"\u003E\u003Cspan class=\"hljs-name\"\u003Einclude\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E 'header-bar' %}\u003C\u002Fspan\u003E\u003Cspan class=\"xml\"\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ebody\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ehtml\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (asset) {pug_mixins["annotation-arrow"] = pug_interp = function(direction){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var firstDirection = direction.substr(0, 1)
var isNS = ["n", "s"].indexOf(firstDirection) !== -1
var viewBox = isNS ? "0 0 83 114" : "0 0 127 73"
var d = isNS ? "M39.3 5.4L0.9 0C0.3-0.1-0.1 0.3 0 0.9L9.1 37.8C9.2 38.4 9.7 38.5 10.1 38.1 10.1 38.1 18 29.8 19.8 27.9 19.9 27.7 20.1 27.4 20.5 27.4 20.9 27.3 21.3 27.4 21.4 27.5 68.7 64.9 76 103.8 77.1 109.6 78.2 115.4 84 114.4 82.9 108.6 81.8 102.8 75.7 53.3 30 17.7 29.9 17.6 29.6 17.4 29.6 17.1 29.6 16.9 29.9 16.6 30 16.5L39.6 6.4C40.1 5.9 39.9 5.5 39.3 5.4Z" : "M37.3 0.7C37.4 0.1 37.1-0.1 36.5 0.1L0.5 14.6C-0.1 14.9-0.2 15.4 0.3 15.8L26.5 43.2C27 43.7 27.4 43.6 27.6 43 27.6 43 30.2 31.8 30.8 29.3 30.9 29.1 30.9 28.7 31.2 28.5 31.5 28.3 31.9 28.1 32 28.2 91.7 36.9 117.5 67 121.4 71.4 125.2 75.9 129.7 72.1 125.8 67.6 122 63.1 92 23.4 34.6 15.4 34.5 15.4 34.1 15.3 33.9 15.1 33.8 14.9 34 14.5 34 14.3 35.2 9.4 37.3 0.7 37.3 0.7Z"
var transform = attributes.transform || ""
if (["ne", "en"].indexOf(direction) !== -1) {
transform += " scale(-1, 1)"
}
else
if (["se", "es"].indexOf(direction) !== -1) {
transform += " scale(-1, -1)"
}
else
if (["sw", "ws"].indexOf(direction) !== -1) {
transform += " scale(1, -1)"
}
if (transform.length === 0) {
transform = "none"
}
pug_html = pug_html + "\u003Cdiv" + (" annotation-arrow"+pug.attr("data-svg-view-box", viewBox, true, true)+pug.attr("style", pug.style(attributes.style), true, true)) + "\u003E\u003Cdiv\u003E\u003Csvg" + (" version=\"1.1\""+pug.attr("viewBox", viewBox, true, true)+pug.attr("style", pug.style({transform: transform}), true, true)) + "\u003E\u003Cpath" + (pug.attr("d", d, true, true)) + "\u003E\u003C\u002Fpath\u003E\u003C\u002Fsvg\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
pug_html = pug_html + "\u003Col class=\"steps\"\u003E\u003Cli\u003E\u003Ch2\u003ELogin to the \u003Ca target=\"_blank\" href=\"https:\u002F\u002Fwww.shopify.com\u002Flogin\"\u003EShopify store editor\u003C\u002Fa\u003E.\u003C\u002Fh2\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003ENavigate to \u003Cstrong\u003EOnline Store \u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E Themes \u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E Edit HTML\u002FCSS\u003C\u002Fstrong\u003E.\u003C\u002Fh2\u003E\u003Cp\u003EIn the left pane, click \u003Cstrong\u003EOnline Store\u003C\u002Fstrong\u003E.\nClick the \u003Cstrong\u003E\u003Ccode\u003E[...]\u003C\u002Fcode\u003E\u003C\u002Fstrong\u003E button in the header.\u003C\u002Fp\u003E\u003Cp\u003EThen click \u003Cstrong\u003EEdit HTML\u002FCSS\u003C\u002Fstrong\u003E in the menu that appears.\u003C\u002Fp\u003E\u003Cfigure\u003E\u003Cimg" + (pug.attr("src", asset(__webpack_require__(102)), true, true)) + "\u003E";
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:57%;left:35.4%;width:12%","transform": "rotate(60deg)"}
}, "nw");
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:21%;left:32.4%;width:11%","transform": "rotate(41deg)"}
}, "ne");
pug_html = pug_html + "\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Cp\u003EIn the center column under \u003Cstrong\u003ELayout\u003C\u002Fstrong\u003E, Click \u003Ccode\u003Etheme.liquid\u003C\u002Fcode\u003E.\u003C\u002Fp\u003E\u003Cfigure\u003E\u003Cimg" + (pug.attr("src", asset(__webpack_require__(101)), true, true)) + "\u003E";
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:48%;left:35%;width:16%","transform": "rotate(135deg)"}
}, "nw");
pug_html = pug_html + "\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003ECopy the code below.\u003C\u002Fh2\u003E\u003Cdiv class=\"copy-container\" data-ref=\"copyContainers[]\"\u003E\u003Cbutton class=\"button primary run\" data-ref=\"copyButtons[]\"\u003ECopy\u003C\u002Fbutton\u003E\u003Cdiv class=\"copyable\" contenteditable\u003E" + (pug.escape(null == (pug_interp = this.copyText) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cp\u003EPaste this code into your site’s &lt;" + (pug.escape(null == (pug_interp = this.location) ? "" : pug_interp)) + "&gt; tag.\u003C\u002Fp\u003E\u003Cfigure data-ref=\"screenshotMounts[]\" data-screenshot=\"installScript\"\u003E\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EVisit your site.\u003C\u002Fh2\u003E\u003Cp\u003EAfter saving the changes you made, visit your site in the browser.\u003C\u002Fp\u003E\u003Cp\u003EYou’re done!\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003C\u002Fol\u003E";}.call(this,"asset" in locals_for_with?locals_for_with.asset:typeof asset!=="undefined"?asset:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"screenshot\"\u003E\u003Ch1\u003ECODE INJECTION\u003C\u002Fh1\u003E";
if (this.location === "head") {
pug_html = pug_html + "\u003Cp\u003EEnter code that will be injected into the 'head' tag on every page of your site.\u003C\u002Fp\u003E";
}
else {
pug_html = pug_html + "\u003Cp\u003EEnter code that will be injected into the template-defined footer on every page of your site.\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\u003Cpre\u003E\u003Ccode\u003E" + (pug.escape(null == (pug_interp = this.copyText) ? "" : pug_interp)) + "\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Col class=\"steps\"\u003E\u003Cli\u003E\u003Ch2\u003ELogin to the \u003Ca target=\"_blank\" href=\"https:\u002F\u002Fwww.squarespace.com\u002Flogin\"\u003ESquarespace site editor\u003C\u002Fa\u003E.\u003C\u002Fh2\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003ENavigate to \u003Cstrong\u003ESettings \u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E Advanced \u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E Code Injection\u003C\u002Fstrong\u003E.\u003C\u002Fh2\u003E\u003Cp\u003EIn the left pane, click \u003Cstrong\u003ESettings\u003C\u002Fstrong\u003E.\nScroll to the Website section and click \u003Cstrong\u003EAdvanced\u003C\u002Fstrong\u003E.\nThen click \u003Cstrong\u003ECode Injection\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003ECopy the code below.\u003C\u002Fh2\u003E\u003Cdiv class=\"copy-container\" data-ref=\"copyContainers[]\"\u003E\u003Cbutton class=\"button primary run\" data-ref=\"copyButtons[]\"\u003ECopy\u003C\u002Fbutton\u003E\u003Cdiv class=\"copyable\" contenteditable\u003E" + (pug.escape(null == (pug_interp = this.copyText) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cp\u003EPaste it into the \u003Cstrong\u003E" + (pug.escape(null == (pug_interp = this.location === "head" ? "Header" : "Footer") ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E box within the \u003Cstrong\u003ECode Injection\u003C\u002Fstrong\u003E section.\u003C\u002Fp\u003E\u003Cfigure data-ref=\"screenshotMounts[]\" data-screenshot=\"installScript\"\u003E\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EVisit your site.\u003C\u002Fh2\u003E\u003Cp\u003EAfter saving the changes you made, visit your site in the browser.\u003C\u002Fp\u003E\u003Cp\u003EYou’re done!\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003C\u002Fol\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cdiv class=\"screenshot\"\u003E";
if (this.location === "head") {
pug_html = pug_html + "\u003Cpre\u003E\u003Ccode class=\"lang-django\"\u003E\u003Cspan class=\"xml\"\u003E\u003Cspan class=\"hljs-meta\"\u003E&lt;!DOCTYPE html&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ehtml\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ehead\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003C\u002Fspan\u003E\u003Cspan class=\"hljs-template-variable\"\u003E{{EMBED_CODE_SLOT}}\u003C\u002Fspan\u003E\u003Cspan class=\"xml\"\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Etitle\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E{Title}{block:SearchPage} ({lang:Search results for SearchQuery}){\u002Fblock:SearchPage}{block:PermalinkPage}{block:PostSummary} — {PostSummary}{\u002Fblock:PostSummary}{\u002Fblock:PermalinkPage}\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Etitle\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Emeta\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Echarset\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"utf-8\"\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Emeta\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Ename\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"description\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Econtent\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"{block:IndexPage}{block:Description}{MetaDescription}{\u002Fblock:Description}{\u002Fblock:IndexPage}{block:PermalinkPage}{block:PostSummary}{PostSummary}{\u002Fblock:PostSummary}{\u002Fblock:PermalinkPage}\"\u003C\u002Fspan\u003E \u002F&gt;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ehead\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ebody\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    {block:IfShowBarOnTop}\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Esection\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eid\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"color_bar\"\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Esection\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E{\u002Fblock:IfShowBarOnTop}\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Esection\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eid\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"container\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eclass\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"group\"\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Esection\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ebody\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ehtml\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n";
}
else {
pug_html = pug_html + "\u003Cpre\u003E\u003Ccode class=\"lang-django\"\u003E\u003Cspan class=\"xml\"\u003E\u003Cspan class=\"hljs-meta\"\u003E&lt;!DOCTYPE html&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ehtml\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ehead\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Etitle\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E{Title}{block:SearchPage} ({lang:Search results for SearchQuery}){\u002Fblock:SearchPage}{block:PermalinkPage}{block:PostSummary} — {PostSummary}{\u002Fblock:PostSummary}{\u002Fblock:PermalinkPage}\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Etitle\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Emeta\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Echarset\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"utf-8\"\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Emeta\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Ename\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"description\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Econtent\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"{block:IndexPage}{block:Description}{MetaDescription}{\u002Fblock:Description}{\u002Fblock:IndexPage}{block:PermalinkPage}{block:PostSummary}{PostSummary}{\u002Fblock:PostSummary}{\u002Fblock:PermalinkPage}\"\u003C\u002Fspan\u003E \u002F&gt;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ehead\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Ebody\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003C\u002Fspan\u003E\u003Cspan class=\"hljs-template-variable\"\u003E{{EMBED_CODE_SLOT}}\u003C\u002Fspan\u003E\u003Cspan class=\"xml\"\u003E\n    {block:IfShowBarOnTop}\u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Esection\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eid\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"color_bar\"\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Esection\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E{\u002Fblock:IfShowBarOnTop}\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u003Cspan class=\"hljs-name\"\u003Esection\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eid\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"container\"\u003C\u002Fspan\u003E \u003Cspan class=\"hljs-attr\"\u003Eclass\u003C\u002Fspan\u003E=\u003Cspan class=\"hljs-string\"\u003E\"group\"\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n    \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Esection\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n  \u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ebody\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\n\u003Cspan class=\"hljs-tag\"\u003E&lt;\u002F\u003Cspan class=\"hljs-name\"\u003Ehtml\u003C\u002Fspan\u003E&gt;\u003C\u002Fspan\u003E\u003C\u002Fspan\u003E\n\u003C\u002Fcode\u003E\u003C\u002Fpre\u003E\n";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (asset) {pug_mixins["annotation-arrow"] = pug_interp = function(direction){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var firstDirection = direction.substr(0, 1)
var isNS = ["n", "s"].indexOf(firstDirection) !== -1
var viewBox = isNS ? "0 0 83 114" : "0 0 127 73"
var d = isNS ? "M39.3 5.4L0.9 0C0.3-0.1-0.1 0.3 0 0.9L9.1 37.8C9.2 38.4 9.7 38.5 10.1 38.1 10.1 38.1 18 29.8 19.8 27.9 19.9 27.7 20.1 27.4 20.5 27.4 20.9 27.3 21.3 27.4 21.4 27.5 68.7 64.9 76 103.8 77.1 109.6 78.2 115.4 84 114.4 82.9 108.6 81.8 102.8 75.7 53.3 30 17.7 29.9 17.6 29.6 17.4 29.6 17.1 29.6 16.9 29.9 16.6 30 16.5L39.6 6.4C40.1 5.9 39.9 5.5 39.3 5.4Z" : "M37.3 0.7C37.4 0.1 37.1-0.1 36.5 0.1L0.5 14.6C-0.1 14.9-0.2 15.4 0.3 15.8L26.5 43.2C27 43.7 27.4 43.6 27.6 43 27.6 43 30.2 31.8 30.8 29.3 30.9 29.1 30.9 28.7 31.2 28.5 31.5 28.3 31.9 28.1 32 28.2 91.7 36.9 117.5 67 121.4 71.4 125.2 75.9 129.7 72.1 125.8 67.6 122 63.1 92 23.4 34.6 15.4 34.5 15.4 34.1 15.3 33.9 15.1 33.8 14.9 34 14.5 34 14.3 35.2 9.4 37.3 0.7 37.3 0.7Z"
var transform = attributes.transform || ""
if (["ne", "en"].indexOf(direction) !== -1) {
transform += " scale(-1, 1)"
}
else
if (["se", "es"].indexOf(direction) !== -1) {
transform += " scale(-1, -1)"
}
else
if (["sw", "ws"].indexOf(direction) !== -1) {
transform += " scale(1, -1)"
}
if (transform.length === 0) {
transform = "none"
}
pug_html = pug_html + "\u003Cdiv" + (" annotation-arrow"+pug.attr("data-svg-view-box", viewBox, true, true)+pug.attr("style", pug.style(attributes.style), true, true)) + "\u003E\u003Cdiv\u003E\u003Csvg" + (" version=\"1.1\""+pug.attr("viewBox", viewBox, true, true)+pug.attr("style", pug.style({transform: transform}), true, true)) + "\u003E\u003Cpath" + (pug.attr("d", d, true, true)) + "\u003E\u003C\u002Fpath\u003E\u003C\u002Fsvg\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
pug_html = pug_html + "\u003Col class=\"steps\"\u003E\u003Cli\u003E\u003Ch2\u003ELogin to the \u003Ca target=\"_blank\" href=\"https:\u002F\u002Fwww.tumblr.com\u002Flogin\"\u003ETumblr Dashboard\u003C\u002Fa\u003E.\u003C\u002Fh2\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003ENavigate to \u003Cstrong\u003EEdit appearance\u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E Edit Theme \u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E Edit HTML\u003C\u002Fstrong\u003E.\u003C\u002Fh2\u003E\u003Cp\u003EIn the top right menu bar, click the user icon, then \u003Cstrong\u003EEdit appearance\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003Cp\u003EThen click \u003Cstrong\u003EEdit HTML\u002FCSS\u003C\u002Fstrong\u003E in the menu that appears.\u003C\u002Fp\u003E\u003Cfigure\u003E\u003Cimg" + (pug.attr("src", asset(__webpack_require__(103)), true, true)) + "\u003E";
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:-3%;left:47%;width:19%","transform": "rotate(41deg)"}
}, "ne");
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:76%;left:33%;width:18%","transform": "rotate(135deg)"}
}, "nw");
pug_html = pug_html + "\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Cp\u003EIn the center column, click \u003Cstrong\u003EEdit Theme\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003Cfigure\u003E\u003Cimg" + (pug.attr("src", asset(__webpack_require__(105)), true, true)) + "\u003E";
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:45%;left:46%;width:20%"}
}, "sw");
pug_html = pug_html + "\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Cp\u003EOn the top left, click \u003Cstrong\u003EEdit HTML\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003Cfigure\u003E\u003Cimg" + (pug.attr("src", asset(__webpack_require__(104)), true, true)) + "\u003E";
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:47%;left:44%;width:20%","transform": "rotate(17deg)"}
}, "nw");
pug_html = pug_html + "\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003ECopy the code below.\u003C\u002Fh2\u003E\u003Cdiv class=\"copy-container\" data-ref=\"copyContainers[]\"\u003E\u003Cbutton class=\"button primary run\" data-ref=\"copyButtons[]\"\u003ECopy\u003C\u002Fbutton\u003E\u003Cdiv class=\"copyable\" contenteditable\u003E" + (pug.escape(null == (pug_interp = this.copyText) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cp\u003EPaste this code into your site’s &lt;" + (pug.escape(null == (pug_interp = this.location) ? "" : pug_interp)) + "&gt; tag.\u003C\u002Fp\u003E\u003Cfigure data-ref=\"screenshotMounts[]\" data-screenshot=\"installScript\"\u003E\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003ESave your changes.\u003C\u002Fh2\u003E\u003Cp\u003EClicking \u003Cstrong\u003EUpdate Preview\u003C\u002Fstrong\u003E and \u003Cstrong\u003ESave\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003Cp\u003EYou’re done!\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003C\u002Fol\u003E";}.call(this,"asset" in locals_for_with?locals_for_with.asset:typeof asset!=="undefined"?asset:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (asset) {pug_mixins["annotation-arrow"] = pug_interp = function(direction){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var firstDirection = direction.substr(0, 1)
var isNS = ["n", "s"].indexOf(firstDirection) !== -1
var viewBox = isNS ? "0 0 83 114" : "0 0 127 73"
var d = isNS ? "M39.3 5.4L0.9 0C0.3-0.1-0.1 0.3 0 0.9L9.1 37.8C9.2 38.4 9.7 38.5 10.1 38.1 10.1 38.1 18 29.8 19.8 27.9 19.9 27.7 20.1 27.4 20.5 27.4 20.9 27.3 21.3 27.4 21.4 27.5 68.7 64.9 76 103.8 77.1 109.6 78.2 115.4 84 114.4 82.9 108.6 81.8 102.8 75.7 53.3 30 17.7 29.9 17.6 29.6 17.4 29.6 17.1 29.6 16.9 29.9 16.6 30 16.5L39.6 6.4C40.1 5.9 39.9 5.5 39.3 5.4Z" : "M37.3 0.7C37.4 0.1 37.1-0.1 36.5 0.1L0.5 14.6C-0.1 14.9-0.2 15.4 0.3 15.8L26.5 43.2C27 43.7 27.4 43.6 27.6 43 27.6 43 30.2 31.8 30.8 29.3 30.9 29.1 30.9 28.7 31.2 28.5 31.5 28.3 31.9 28.1 32 28.2 91.7 36.9 117.5 67 121.4 71.4 125.2 75.9 129.7 72.1 125.8 67.6 122 63.1 92 23.4 34.6 15.4 34.5 15.4 34.1 15.3 33.9 15.1 33.8 14.9 34 14.5 34 14.3 35.2 9.4 37.3 0.7 37.3 0.7Z"
var transform = attributes.transform || ""
if (["ne", "en"].indexOf(direction) !== -1) {
transform += " scale(-1, 1)"
}
else
if (["se", "es"].indexOf(direction) !== -1) {
transform += " scale(-1, -1)"
}
else
if (["sw", "ws"].indexOf(direction) !== -1) {
transform += " scale(1, -1)"
}
if (transform.length === 0) {
transform = "none"
}
pug_html = pug_html + "\u003Cdiv" + (" annotation-arrow"+pug.attr("data-svg-view-box", viewBox, true, true)+pug.attr("style", pug.style(attributes.style), true, true)) + "\u003E\u003Cdiv\u003E\u003Csvg" + (" version=\"1.1\""+pug.attr("viewBox", viewBox, true, true)+pug.attr("style", pug.style({transform: transform}), true, true)) + "\u003E\u003Cpath" + (pug.attr("d", d, true, true)) + "\u003E\u003C\u002Fpath\u003E\u003C\u002Fsvg\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
pug_html = pug_html + "\u003Col class=\"steps\"\u003E\u003Cli\u003E\u003Ch2\u003EOpen the Weebly Editor.\u003C\u002Fh2\u003E\u003Cp\u003EVisit \u003Ca target=\"_blank\" href=\"https:\u002F\u002Fwww.weebly.com\u002Fhome\u002F\"\u003EWeebly Home\u003C\u002Fa\u003E and choose \u003Cstrong\u003EEdit Site\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003Cp\u003EIf you cannot find that, try navigating directly to the \u003Ca target=\"_blank\" href=\"https:\u002F\u002Fwww.weebly.com\u002Feditor\u002Fmain.php\"\u003EWeebly Editor\u003C\u002Fa\u003E.\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EFrom the Weebly Editor, navigate to \u003Cstrong\u003ESettings \u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E SEO\u003C\u002Fstrong\u003E.\u003C\u002Fh2\u003E\u003Cp\u003EIn the bar at the top of the page, choose \u003Cstrong\u003ESettings\u003C\u002Fstrong\u003E.\nFrom the gray navigation menu on the left, choose \u003Cstrong\u003ESEO\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003E\u003Cspan\u003ECopy the code below and paste it into your site’s \u003Cstrong\u003E" + (pug.escape(null == (pug_interp = this.location === "head" ? "Header" : "Footer") ? "" : pug_interp)) + " Code\u003C\u002Fstrong\u003E.\u003C\u002Fspan\u003E\u003C\u002Fh2\u003E\u003Cdiv class=\"copy-container\" data-ref=\"copyContainers[]\"\u003E\u003Cbutton class=\"button primary run\" type=\"button\" data-ref=\"copyButtons[]\"\u003ECopy\u003C\u002Fbutton\u003E\u003Cdiv class=\"copyable\" contenteditable\u003E" + (pug.escape(null == (pug_interp = this.copyText) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cfigure\u003E";
if (this.location === "head") {
pug_html = pug_html + "\u003Cimg" + (pug.attr("src", asset(__webpack_require__(107)), true, true)) + "\u003E";
}
else {
pug_html = pug_html + "\u003Cimg" + (pug.attr("src", asset(__webpack_require__(106)), true, true)) + "\u003E";
}
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:44.1%;left:39.2%;width:15.8%"}
}, 'nw');
pug_html = pug_html + "\u003C\u002Ffigure\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EClick \u003Cstrong\u003ESave\u003C\u002Fstrong\u003E, and you’re done!\u003C\u002Fh2\u003E\u003C\u002Fli\u003E\u003C\u002Fol\u003E";}.call(this,"asset" in locals_for_with?locals_for_with.asset:typeof asset!=="undefined"?asset:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (asset) {pug_mixins["annotation-arrow"] = pug_interp = function(direction){
var block = (this && this.block), attributes = (this && this.attributes) || {};
var firstDirection = direction.substr(0, 1)
var isNS = ["n", "s"].indexOf(firstDirection) !== -1
var viewBox = isNS ? "0 0 83 114" : "0 0 127 73"
var d = isNS ? "M39.3 5.4L0.9 0C0.3-0.1-0.1 0.3 0 0.9L9.1 37.8C9.2 38.4 9.7 38.5 10.1 38.1 10.1 38.1 18 29.8 19.8 27.9 19.9 27.7 20.1 27.4 20.5 27.4 20.9 27.3 21.3 27.4 21.4 27.5 68.7 64.9 76 103.8 77.1 109.6 78.2 115.4 84 114.4 82.9 108.6 81.8 102.8 75.7 53.3 30 17.7 29.9 17.6 29.6 17.4 29.6 17.1 29.6 16.9 29.9 16.6 30 16.5L39.6 6.4C40.1 5.9 39.9 5.5 39.3 5.4Z" : "M37.3 0.7C37.4 0.1 37.1-0.1 36.5 0.1L0.5 14.6C-0.1 14.9-0.2 15.4 0.3 15.8L26.5 43.2C27 43.7 27.4 43.6 27.6 43 27.6 43 30.2 31.8 30.8 29.3 30.9 29.1 30.9 28.7 31.2 28.5 31.5 28.3 31.9 28.1 32 28.2 91.7 36.9 117.5 67 121.4 71.4 125.2 75.9 129.7 72.1 125.8 67.6 122 63.1 92 23.4 34.6 15.4 34.5 15.4 34.1 15.3 33.9 15.1 33.8 14.9 34 14.5 34 14.3 35.2 9.4 37.3 0.7 37.3 0.7Z"
var transform = attributes.transform || ""
if (["ne", "en"].indexOf(direction) !== -1) {
transform += " scale(-1, 1)"
}
else
if (["se", "es"].indexOf(direction) !== -1) {
transform += " scale(-1, -1)"
}
else
if (["sw", "ws"].indexOf(direction) !== -1) {
transform += " scale(1, -1)"
}
if (transform.length === 0) {
transform = "none"
}
pug_html = pug_html + "\u003Cdiv" + (" annotation-arrow"+pug.attr("data-svg-view-box", viewBox, true, true)+pug.attr("style", pug.style(attributes.style), true, true)) + "\u003E\u003Cdiv\u003E\u003Csvg" + (" version=\"1.1\""+pug.attr("viewBox", viewBox, true, true)+pug.attr("style", pug.style({transform: transform}), true, true)) + "\u003E\u003Cpath" + (pug.attr("d", d, true, true)) + "\u003E\u003C\u002Fpath\u003E\u003C\u002Fsvg\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
};
pug_html = pug_html + "\u003Col class=\"steps\"\u003E";
if (this.pluginURL) {
pug_html = pug_html + "\u003Cli\u003E" + (null == (pug_interp = this.renderDownloadLink()) ? "" : pug_interp) + "\u003Cp\u003EAfter downloading, don’t unzip the file.\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EUpload the plugin to your WordPress Admin site.\u003C\u002Fh2\u003E\u003Cfigure\u003E\u003Cimg" + (pug.attr("src", asset(__webpack_require__(109)), true, true)) + "\u003E";
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:16%;left:51.4%;width:13%","transform": "rotate(76deg)"}
}, "nw");
pug_html = pug_html + "\u003C\u002Ffigure\u003E\u003Cp\u003EIn your WordPress Admin, navigate to: \u003Cstrong\u003EPlugins \u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E Add New \u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E Upload Plugin\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003Cp\u003EClick \u003Cstrong\u003EChoose File\u003C\u002Fstrong\u003E and select the file you just downloaded.\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EActivate the plugin and view your site\u003C\u002Fh2\u003E\u003Cfigure\u003E\u003Cimg" + (pug.attr("src", asset(__webpack_require__(108)), true, true)) + "\u003E";
pug_mixins["annotation-arrow"].call({
attributes: {"style": "top:35%;left:46%;width:12%","transform": "rotate(87deg)"}
}, "se");
pug_html = pug_html + "\u003C\u002Ffigure\u003E\u003Cp\u003EClick \u003Cstrong\u003EActivate Plugin\u003C\u002Fstrong\u003E.\u003C\u002Fp\u003E\u003Cp\u003EAfter it activates you’ll see a welcome message letting you know the installation was successful!\u003C\u002Fp\u003E\u003C\u002Fli\u003E";
}
else {
pug_html = pug_html + "\u003Cli\u003E\u003Ch2\u003EIn your WordPress Admin, navigate to: \u003Cstrong\u003EAppearance \u003Cspan class=\"with-more-icon-after\"\u003E\u003C\u002Fspan\u003E Editor\u003C\u002Fstrong\u003E.\u003C\u002Fh2\u003E\u003Cp\u003ENavigate to the Theme Editor from the menu on the left side.\u003C\u002Fp\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003ECopy the code to your site’s &lt;" + (pug.escape(null == (pug_interp = this.location) ? "" : pug_interp)) + "&gt; tag.\u003C\u002Fh2\u003E\u003Cdiv class=\"copy-container\" data-ref=\"copyContainers[]\"\u003E\u003Cbutton class=\"button primary run\" type=\"button\" data-ref=\"copyButtons[]\"\u003ECopy\u003C\u002Fbutton\u003E\u003Cdiv class=\"copyable\" contenteditable\u003E" + (pug.escape(null == (pug_interp = this.copyText) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
if (this.location === "head") {
pug_html = pug_html + "\u003Cp\u003ELocate the \u003Ccode\u003Eheader.php\u003C\u002Fcode\u003E file from the menu on the right side.\u003C\u002Fp\u003E\u003Cp\u003ECarefully search for the \u003Ccode\u003E&lt;head&gt;\u003C\u002Fcode\u003E tag.\nThere will be other similar tags, but you only want the one with that exact name.\nIt should be near the beginning of the file. Insert the embed code just \u003Cstrong\u003Eafter\u003C\u002Fstrong\u003E that tag.\u003C\u002Fp\u003E";
}
else {
pug_html = pug_html + "\u003Cp\u003ELocate the \u003Ccode\u003Efooter.php\u003C\u002Fcode\u003E file from the menu on the right side.\u003C\u002Fp\u003E\u003Cp\u003ECarefully search for the \u003Ccode\u003E&lt;\u002Fbody&gt;\u003C\u002Fcode\u003E tag.\nThere will be other similar tags, but you only want the one with that exact name.\nIt should be near the end of the file.\nInsert the embed code just \u003Cstrong\u003Ebefore\u003C\u002Fstrong\u003E that tag.\u003C\u002Fp\u003E";
}
pug_html = pug_html + "\u003C\u002Fli\u003E\u003Cli\u003E\u003Ch2\u003EClick \u003Cstrong\u003EUpdate File\u003C\u002Fstrong\u003E.\u003C\u002Fh2\u003E\u003Cp\u003EYou’re done!\u003C\u002Fp\u003E\u003C\u002Fli\u003E";
}
pug_html = pug_html + "\u003C\u002Fol\u003E";}.call(this,"asset" in locals_for_with?locals_for_with.asset:typeof asset!=="undefined"?asset:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 145 */
/***/ function(module, exports) {

function select(element) {
    var selectedText;

    if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
        element.focus();
        element.setSelectionRange(0, element.value.length);

        selectedText = element.value;
    }
    else {
        if (element.hasAttribute('contenteditable')) {
            element.focus();
        }

        var selection = window.getSelection();
        var range = document.createRange();

        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);

        selectedText = selection.toString();
    }

    return selectedText;
}

module.exports = select;


/***/ },
/* 146 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 32 32\" version=\"1.1\"><path fill-rule=\"evenodd\" d=\"M4 1C2.3 1 1 2.3 1 4L1 28C1 29.7 2.3 31 4 31L28 31C29.7 31 31 29.7 31 28L31 4C31 2.3 29.7 1 28 1L4 1ZM5.5 7C6.3 7 7 6.3 7 5.5 7 4.7 6.3 4 5.5 4 4.7 4 4 4.7 4 5.5 4 6.3 4.7 7 5.5 7ZM5.5 10C4.7 10 4 10.7 4 11.5L4 26.5C4 27.3 4.7 28 5.5 28L26.5 28C27.3 28 28 27.3 28 26.5L28 11.5C28 10.7 27.3 10 26.5 10L5.5 10ZM10.5 4C9.7 4 9 4.7 9 5.5 9 6.3 9.7 7 10.5 7L26.5 7C27.3 7 28 6.3 28 5.5 28 4.7 27.3 4 26.5 4L10.5 4Z\"></path></svg>"

/***/ },
/* 147 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"-3 -3 22 22\" stroke-linecap=\"round\"><path d=\"M1 1l14 14M1 15L15 1\"></path></svg>"

/***/ },
/* 148 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\" stroke-linecap=\"round\"><path d=\"M1 1l14 14M1 15L15 1\"></path></svg>"

/***/ },
/* 149 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 -1 16 9\" stroke-linecap=\"round\"><path d=\"M1 1l7 7M8 8l7-7\"></path></svg>"

/***/ },
/* 150 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 15 15\" stroke-linecap=\"round\"><path d=\"M7.5 10.5L3.5 6.5M7.5 10.5L11.5 6.5M7.5 10.5L7.5 1.5M13.5 13.5L1.5 13.5M1.5 13.5L1.5 11.5M13.5 13.5L13.5 11.5\"></path></svg>"

/***/ },
/* 151 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\" stroke-linecap=\"round\"><path d=\"M4 1l7 7M4 15l7-7\"></path></svg>"

/***/ },
/* 152 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\" stroke-linecap=\"round\"><path d=\"M11 1L4 8M11 15L4 8\"></path></svg>"

/***/ },
/* 153 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\" stroke-width=\"1\" stroke-linecap=\"round\"><circle cx=\"6.5\" cy=\"6.5\" r=\"5.5\" fill=\"none\"></circle><path d=\"M10.5,10.5 L15,15\"></path></svg>"

/***/ },
/* 154 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"50 50 400 425\" version=\"1.1\"><path d=\"M345.7 126.6c-21-13.1-40.9-18.3-60.7-31.4 -12.3-8.3-29.4-28.2-43.7-45.2 -2.8 27.4-11.1 38.5-20.6 46.4 -20.2 15.9-32.9 20.6-50.4 30.2C155.6 134.1 75.8 181.8 75.8 284.2 75.8 386.6 161.9 462 257.6 462S436.2 392.5 436.2 287.4C436.2 182.2 358.4 134.5 345.7 126.6zM348 424.6c-2 2-20.2 14.7-41.7 16.7s-50.4 3.2-67.9-12.7c-2.8-2.8-2-6.7 0-8.3 2-1.6 3.6-2.8 6-2.8 2.4 0 2 0 3.2 0.8 7.9 6.4 19.8 11.5 45.2 11.5 25.4 0 43.3-7.1 51.2-13.1 3.6-2.8 5.2-0.4 5.6 1.2C350 419.5 350.8 421.9 348 424.6zM278.5 388.5c4.4-4 11.5-10.3 18.3-13.1 6.7-2.8 10.3-2.4 16.7-2.4s13.1 0.4 17.9 3.6c4.8 3.2 7.5 10.3 9.1 14.3 1.6 4 0 6.4-3.2 7.9 -2.8 1.6-3.2 0.8-6-4.4 -2.8-5.2-5.2-10.3-19.1-10.3 -13.9 0-18.3 4.8-25 10.3 -6.7 5.6-9.1 7.5-11.5 4.4C273.4 395.7 274.2 392.5 278.5 388.5zM383.7 391.7c-14.3-1.2-42.9-45.6-61.1-46.4 -23-0.8-73 48-112.3 48 -23.8 0-31-3.6-38.9-8.7 -11.9-8.3-17.9-21-17.5-38.5 0.4-31 29.4-59.9 65.9-60.3 46.4-0.4 78.6 46 102 45.6 19.8-0.4 58-39.3 76.6-39.3 19.8 0 25.4 20.6 25.4 32.9s-4 34.5-13.5 48.4C400.8 387.3 394.8 392.5 383.7 391.7z\"></path></svg>"

/***/ },
/* 155 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 430 422\" version=\"1.1\"><path d=\"M308.6 49.7C312.3 22 336 0.7 364.7 0.7 396 0.7 421.4 26.1 421.4 57.4 421.4 84.5 402.3 107.2 376.8 112.7 380.8 123.5 383 134.8 382.9 146.1 382.8 168.2 374.5 188.5 359.5 203.4L354.1 208.7 310.7 165.9C314.4 162.2 316.6 160 316.6 160 320.9 155.7 321.9 149.9 321.9 145.8 322 136.5 317.6 126.8 310 119.2 297.1 106.2 278.4 103 269.1 112.2 269.1 112.2 216.4 164.5 172.5 208.1L129.1 165.2C173.1 121.5 226.2 68.9 226.2 68.9 247.7 47.6 279.1 41.4 308.6 49.7L308.6 49.7ZM65.3 0.7C94 0.7 117.7 22 121.4 49.7 150.9 41.4 182.3 47.5 203.8 68.9 203.8 68.9 205.8 70.9 209.4 74.4L165.8 117.1C162.6 114 160.9 112.2 160.9 112.2 151.6 103 132.9 106.2 120 119.2 112.4 126.8 108 136.5 108.1 145.8 108.1 149.9 109.1 155.7 113.4 160 113.4 160 167.3 213.5 211 256.8L167.5 299.6 70.5 203.4C55.5 188.5 47.2 168.2 47.1 146.1 47 134.8 49.2 123.5 53.2 112.7 27.7 107.2 8.6 84.5 8.6 57.4 8.6 26 34 0.7 65.3 0.7L65.3 0.7ZM146.9 380.1C135.5 380.1 124.1 377.8 113.4 373.7 109.1 400.7 85.7 421.3 57.4 421.3 26.1 421.3 0.7 395.9 0.7 364.6 0.7 335.2 23.2 311 52 308.2 49.1 299.1 47.6 289.6 47.6 280 47.7 258 56 237.6 71 222.8 71 222.8 72.7 221.1 75.6 218.2L118.8 261.2C115.7 264.4 114 266.1 114 266.1 109.6 270.4 108.6 276.2 108.6 280.3 108.6 289.6 112.9 299.3 120.6 307 128.2 314.7 137.9 319.1 147.1 319.1 151.3 319.1 157.1 318.3 161.4 313.9 161.4 313.9 214.2 261.6 258.1 218L301.3 261.1 204.4 357.2C189.4 372.1 169 380.2 146.9 380.1L146.9 380.1ZM372.6 421.3C344.3 421.3 320.9 400.6 316.6 373.7 305.8 377.8 294.4 380.1 283.1 380.1 261 380.2 240.6 372.1 225.6 357.2L219.4 351.1 263.1 308.5C267.5 312.8 268.6 313.9 268.6 313.9 272.9 318.3 278.7 319.1 282.8 319.1 292.1 319.1 301.8 314.7 309.4 307 317.1 299.3 321.4 289.6 321.3 280.3 321.3 276.2 320.4 270.4 316 266.1 316 266.1 265.6 214.2 221.4 170.5L264.1 127.7C308.1 171.4 359 222.8 359 222.8 374 237.6 382.3 258 382.4 280 382.4 289.6 380.9 299.1 378 308.2 406.8 311 429.3 335.2 429.3 364.6 429.3 396 403.8 421.3 372.6 421.3L372.6 421.3Z\"></path></svg>"

/***/ },
/* 156 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 300 300\" version=\"1.1\"><path class=\"is-light-source-facing\" d=\"M180.6 35C180.6 35 180.2 34.6 180 34.5 178.2 33.4 175.5 34 174.3 34.3 174.1 34.4 170.9 35.4 165.6 37 160.5 22.1 151.3 8.4 135.2 8.4 134.8 8.4 134.3 8.4 133.9 8.5 129.3 2.4 123.6-0.2 118.7-0.2 81.3-0.2 63.4 46.6 57.8 70.4 43.2 74.9 32.9 78.1 31.6 78.5 23.4 81.1 23.2 81.4 22.1 89 21.3 94.8 0 259.2 0 259.2L165.7 290.3 180.6 35ZM156.5 39.8C152.3 41.1 147.6 42.6 142.5 44.2 142.5 43.2 142.5 42.2 142.5 41.2 142.5 31.9 141.2 24.4 139.1 18.5 147.4 19.6 152.9 29 156.5 39.8L156.5 39.8 156.5 39.8ZM128.9 20.4C131.2 26.1 132.7 34.4 132.7 45.6 132.7 46.2 132.6 46.7 132.6 47.2 123.5 50.1 113.6 53.1 103.7 56.2 109.3 34.7 119.7 24.3 128.9 20.4L128.9 20.4 128.9 20.4ZM117.7 9.8C119.3 9.8 121 10.4 122.5 11.5 110.5 17.1 97.6 31.3 92.2 59.7 84.3 62.2 76.5 64.6 69.3 66.8 75.7 45.2 90.8 9.8 117.7 9.8ZM124.2 136.5C124.2 136.5 114.5 131.3 102.6 131.3 85.2 131.3 84.3 142.3 84.3 145 84.3 160.1 123.5 165.8 123.5 201.1 123.5 228.8 105.9 246.6 82.2 246.6 53.8 246.6 39.2 228.9 39.2 228.9L46.8 203.8C46.8 203.8 61.8 216.6 74.4 216.6 82.6 216.6 86 210.1 86 205.4 86 185.7 53.8 184.9 53.8 152.6 53.8 125.5 73.3 99.2 112.6 99.2 127.8 99.2 135.2 103.6 135.2 103.6L124.2 136.5Z\"></path><path class=\"is-not-light-source-facing\" d=\"M197.9 52.2L180.6 35.1 165.7 290.3 255.5 270.9C255.5 270.9 224 57.8 223.8 56.3 223.6 54.9 222.3 54.1 221.2 54 220.2 53.9 197.9 52.2 197.9 52.2Z\"></path></svg>"

/***/ },
/* 157 */
/***/ function(module, exports) {

module.exports = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 430.112 430.112\"><path d=\"M71.232 197.39L200.388 67.46c32.425-32.603 84.976-32.603 117.384 0 7.762 8.173 7.397 21.397-.588 29.43-8.11 8.162-21.226 8.162-29.355 0l-1.96-2.273c-16.3-13.9-40.754-13.11-56.137 2.373L97.675 229.817c-8.697 8.06-21.83 8.06-29.932-.09-8.11-8.143-8.11-21.37 0-29.518 1.09-1.085 2.252-2.02 3.49-2.82zm289.968 2.824c-8.11-8.15-21.23-8.15-29.342 0-1.083 1.1-2.025 2.275-2.828 3.523l-128.637 129.4c-16.21 16.297-42.49 16.297-58.698 0l-.588-.094c-8.095-8.148-21.228-8.148-29.342 0-8.097 8.135-8.097 21.375 0 29.505 1.036 1.04 2.14 1.95 3.307 2.74 32.593 29.935 83.142 29.066 114.66-2.637L361.2 229.734c8.097-8.143 8.097-21.37 0-29.52zm-201.935 85.73c-1.23.81-2.404 1.745-3.48 2.828-8.11 8.14-8.11 21.37 0 29.505 8.1 8.148 21.23 8.148 29.93.103l132.058-132.85c16.21-16.298 42.49-16.298 58.685 0 16.228 16.304 16.228 42.747 0 59.045l-125.22 126.557c16.224 16.293 42.49 16.293 58.694 0l95.88-97.038c32.4-32.6 32.4-85.463 0-118.08-32.403-32.584-84.96-32.584-117.386 0l-129.16 129.93zm-17.575-11.85l131.47-132.916c8.106-8.158 8.106-21.382 0-29.515-8.097-8.158-21.244-8.158-29.342 0-1.092 1.076-2.025 2.263-2.82 3.512L112.352 244.58c-16.208 16.307-42.48 16.307-58.68 0-16.226-16.298-16.226-42.742 0-59.046l125.217-126.54c-16.202-16.313-42.49-16.313-58.698 0l-95.88 97.02c-32.414 32.617-32.414 85.48 0 118.08 32.42 32.614 84.99 32.614 117.38 0z\"></path></svg>"

/***/ },
/* 158 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 531 696\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M442.524 590.516c-20.325 19.54-62.036 34.058-102.014 34.734-1.51.026-2.99.04-4.478.04h-.013c-131.5-.008-166.58-100.385-166.58-159.698V283.328c0-1.503-1.22-2.722-2.727-2.722H103.13c-1.503 0-2.722-1.22-2.722-2.723v-83.03c0-1.11.695-2.1 1.73-2.502C170.1 165.9 208.05 113.33 218.033 32.03c.556-4.516 4.282-4.64 4.32-4.64h84.877c1.505 0 2.724 1.22 2.724 2.723V176.04c0 1.503 1.22 2.722 2.723 2.722H418.33c1.504 0 2.723 1.22 2.723 2.72v96.405c0 1.504-1.22 2.723-2.722 2.723H312.22c-1.502 0-2.72 1.22-2.72 2.722l.002 173.216c.625 39.002 19.5 58.773 56.104 58.773 14.75 0 31.642-3.433 47.065-9.325 1.446-.55 3.037.183 3.53 1.645l26.99 80.012c.34 1.01.103 2.126-.664 2.864zm-124.1 61.088c65.126 0 129.656-23.187 151.003-51.28l4.276-5.63-40.37-119.655c-.373-1.11-1.41-1.858-2.58-1.858h-90.187c-1.22 0-2.325-.778-2.635-1.96-1.05-3.99-1.672-8.868-1.77-14.896v-146.34c0-1.505 1.22-2.724 2.724-2.724h106.11c1.503 0 2.722-1.22 2.722-2.723V154.82c0-1.504-1.217-2.723-2.72-2.723h-105.66c-1.502 0-2.722-1.22-2.722-2.723V3.45c0-1.503-1.216-2.722-2.72-2.722H148.6c-13.25 0-28.54 9.827-30.775 28.042-9.25 75.33-43.798 120.52-108.72 142.217l-7.244 2.418c-1.11.37-1.86 1.41-1.86 2.583v128.55c0 1.505 1.22 2.724 2.728 2.724H69.03v158.33c0 126.39 87.54 186.012 249.393 186.012z\"></path></svg>"

/***/ },
/* 159 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 256 197\" version=\"1.1\"><path d=\"M212.3 0C192.3 0 175.7 13.3 170.6 33.1 161.4 3.3 137.8 0 128 0 118.2 0 94.6 3.3 85.4 33.1 80.3 13.3 63.7 0 43.7 0 19.2 0 0 17.5 0 39.9 0 49.8 2.4 57.7 5.4 66.2L38.7 160.3C49.8 191.5 72.5 196.2 85 196.2 104.7 196.2 120 186.1 128 168.3 136 186.2 151.3 196.3 171 196.3 183.5 196.3 206.2 191.6 217.4 160.3L250.8 65.9 251.1 65.2C251.5 63.9 251.8 62.8 252.2 61.7 254 56.5 256 50.5 256 43.2 256 18.2 237.6 0 212.3 0L212.3 0ZM228.1 57.9L194.6 152.3C190.5 163.7 183.8 172.2 171 172.2 159 172.2 151.9 165.5 148.4 154.1L128.3 91.3 127.7 91.3 107.6 154.1C104.1 165.5 97 172.1 85 172.1 72.2 172.1 65.4 163.6 61.4 152.2L28.2 58.4C25.5 50.5 24.1 45.6 24.1 39.9 24.1 31.2 32.3 24.1 43.7 24.1 53.2 24.1 60 30.4 62.2 39.7L84.8 114.5 85.3 114.5 108.1 41.3C111.1 30.7 116.6 24.1 128 24.1 139.4 24.1 144.9 30.7 147.9 41.3L170.7 114.5 171.2 114.5 193.8 39.7C196 30.4 202.8 24.1 212.3 24.1 223.7 24.1 231.9 31.2 231.9 43.2 231.9 47.5 230 51.9 228.1 57.9L228.1 57.9Z\"></path></svg>"

/***/ },
/* 160 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 123 123\" version=\"1.1\"><path d=\"M61.3 0C27.5 0 0 27.5 0 61.3 0 95 27.5 122.5 61.3 122.5 95 122.5 122.5 95 122.5 61.3 122.5 27.5 95 0 61.3 0ZM107.4 36C107.6 37.7 107.7 39.5 107.7 41.5 107.7 46.8 106.7 52.8 103.7 60.3L87.7 106.7C103.3 97.6 113.8 80.6 113.8 61.3 113.8 52.1 111.5 43.5 107.4 36ZM62.2 65.9L46.4 111.7C51.1 113.1 56.1 113.8 61.3 113.8 67.4 113.8 73.3 112.8 78.7 110.8 78.6 110.6 78.4 110.4 78.3 110.1L62.2 65.9ZM96.7 58.6C96.7 52.1 94.4 47.6 92.4 44.1 89.7 39.8 87.2 36.1 87.2 31.8 87.2 27 90.9 22.5 96.1 22.5 96.3 22.5 96.5 22.5 96.8 22.5 87.4 13.9 74.9 8.7 61.3 8.7 42.9 8.7 26.7 18.1 17.4 32.4 18.6 32.4 19.7 32.5 20.7 32.5 26.2 32.5 34.7 31.8 34.7 31.8 37.6 31.6 37.9 35.8 35.1 36.1 35.1 36.1 32.2 36.5 29.1 36.6L48.2 93.5 59.7 59.1 51.5 36.6C48.7 36.5 46 36.1 46 36.1 43.2 36 43.5 31.6 46.3 31.8 46.3 31.8 55 32.5 60.2 32.5 65.7 32.5 74.2 31.8 74.2 31.8 77 31.6 77.4 35.8 74.5 36.1 74.5 36.1 71.7 36.5 68.5 36.6L87.5 93.1 92.7 75.6C95 68.3 96.7 63.1 96.7 58.6ZM8.7 61.3C8.7 82.1 20.8 100 38.3 108.6L13.3 39.9C10.3 46.4 8.7 53.6 8.7 61.3Z\" fill-rule=\"evenodd\"></path></svg>"

/***/ },
/* 161 */
/***/ function(module, exports) {

function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    };

    listener._ = callback
    return this.on(name, listener, ctx);
  },

  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];

    return this;
  }
};

module.exports = E;


/***/ },
/* 162 */
/***/ function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ },
/* 163 */
/***/ function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			configurable: false,
			get: function() { return module.l; }
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			configurable: false,
			get: function() { return module.i; }
		});
		module.webpackPolyfill = 1;
	}
	return module;
}


/***/ },
/* 164 */
/***/ function(module, exports) {

/* (ignored) */

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

/* eslint-env node, es6 */

var EmbedBoxBase = __webpack_require__(12).default;
var targets = __webpack_require__(13);
var targetOrder = ["wordpress", "shopify", "squarespace", "tumblr", "weebly", "drupal", "joomla", "generic"];

EmbedBoxBase.fetchedTargets = targetOrder.map(function (id) {
  return targets[id];
});

module.exports = EmbedBoxBase;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=embed-box.map