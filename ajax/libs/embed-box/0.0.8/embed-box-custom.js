(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("EmbedBoxCustom", [], factory);
	else if(typeof exports === 'object')
		exports["EmbedBoxCustom"] = factory();
	else
		root["EmbedBoxCustom"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_store__ = __webpack_require__(2);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return BaseComponent; });var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



// Ends with brackets e.g. [data-ref="foo[]"]
var ARRAY_REF_PATTERN = /([a-zA-Z\d]*)(\[?\]?)/;

var BaseComponent = (_temp = _class = function () {
  function BaseComponent() {
    var spec = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, BaseComponent);

    this.element = null;
    this.refs = {};
    this.serializer = document.createElement("div");

    _extends(this, spec);

    var stylesheet = this.constructor.stylesheet;
    var iframeDocument = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lib_store__["a" /* getStore */])().iframe.document;


    if (stylesheet && !iframeDocument.head.contains(this.constructor.style)) {
      // Common style tag has yet to be inserted in iframe.
      var style = this.constructor.style = iframeDocument.createElement("style");

      style.innerHTML = stylesheet;
      iframeDocument.head.appendChild(style);
    }
  }

  _createClass(BaseComponent, [{
    key: "autofocus",
    value: function autofocus() {
      var focusElement = this.element.querySelector("[autofocus]");

      if (focusElement) focusElement.focus();
    }

    // NOTE: Calling `updateRefs` multiple times from different tree depths may
    // allow parents to inherit a grandchild.

  }, {
    key: "updateRefs",
    value: function updateRefs() {
      var refs = this.refs;


      Array.from(this.element.querySelectorAll("[data-ref]")).forEach(function (element) {
        var attribute = element.getAttribute("data-ref");

        var _attribute$match = attribute.match(ARRAY_REF_PATTERN);

        var _attribute$match2 = _slicedToArray(_attribute$match, 3);

        var key = _attribute$match2[1];
        var arrayKey = _attribute$match2[2];


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
    }
  }, {
    key: "compileTemplate",
    value: function compileTemplate() {
      var templateVars = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var template = this.constructor.template;

      var config = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lib_store__["a" /* getStore */])();

      function label(key) {
        var value = config.labels[key];

        return typeof value === "function" ? value(config) : value;
      }

      if (typeof template === "function") {
        this.serializer.innerHTML = template.call(this, _extends({ config: config, label: label }, templateVars));
      } else {
        this.serializer.innerHTML = template;
      }

      this.element = this.serializer.firstChild;
      this.updateRefs();

      return this.element;
    }
  }, {
    key: "insertBefore",
    value: function insertBefore(sibling, element) {
      element.parentNode.insertBefore(sibling, element);
    }
  }, {
    key: "removeElement",
    value: function removeElement(element) {
      if (!element || !element.parentNode) return null;

      return element.parentNode.removeChild(element);
    }
  }, {
    key: "render",
    value: function render() {
      return this.compileTemplate();
    }
  }, {
    key: "replaceElement",
    value: function replaceElement(current, next) {
      current.parentNode.insertBefore(next, current);
      current.parentNode.removeChild(current);

      next.tabIndex = current.tabIndex;

      this.updateRefs();
    }
  }]);

  return BaseComponent;
}(), _class.template = null, _class.stylesheet = null, _temp);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export */ exports["b"] = initializeStore;/* harmony export */ exports["a"] = getStore;/* harmony export */ exports["c"] = destroyStore;var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function initializeStore(instance) {
  var spec = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var iframe = document.createElement("iframe");
  var _spec$autoDownload = spec.autoDownload;
  var autoDownload = _spec$autoDownload === undefined ? true : _spec$autoDownload;
  var _spec$labels = spec.labels;
  var labels = _spec$labels === undefined ? {} : _spec$labels;


  window.EmbedBoxStore = {
    name: spec.name || "a plugin",
    instance: instance,

    autoDownload: autoDownload,

    beforeContent: spec.beforeContent || "",
    afterContent: spec.afterContent || "",

    downloadURL: spec.downloadURL || "",

    embedCode: spec.embedCode || "",

    iframe: {
      element: iframe,
      get document() {
        return iframe.contentDocument;
      },
      get window() {
        return iframe.contentWindow;
      }
    },

    labels: _extends({
      done: "Done",
      searchPlaceholder: "Select or search the type of website you have...",
      next: "Next",
      title: function title(config) {
        return "Add " + config.name + " to your site";
      }
    }, labels),

    insertInHead: spec.insertInHead || false
  };

  return window.EmbedBoxStore;
}

function getStore() {
  var parent = arguments.length <= 0 || arguments[0] === undefined ? window : arguments[0];

  return parent.EmbedBoxStore;
}

function destroyStore() {
  var parent = arguments.length <= 0 || arguments[0] === undefined ? window : arguments[0];

  delete parent.EmbedBoxStore;
}

/***/ },
/* 3 */
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
/* 4 */
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
    str = str || __webpack_require__(33).readFileSync(filename, 'utf8')
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_base_component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__close_svg__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__close_svg___default = __WEBPACK_IMPORTED_MODULE_1__close_svg__ && __WEBPACK_IMPORTED_MODULE_1__close_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__close_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__close_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__close_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_1__close_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drupal_svg__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drupal_svg___default = __WEBPACK_IMPORTED_MODULE_2__drupal_svg__ && __WEBPACK_IMPORTED_MODULE_2__drupal_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2__drupal_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2__drupal_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2__drupal_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_2__drupal_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__generic_svg__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__generic_svg___default = __WEBPACK_IMPORTED_MODULE_3__generic_svg__ && __WEBPACK_IMPORTED_MODULE_3__generic_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3__generic_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3__generic_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_3__generic_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_3__generic_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__joomla_svg__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__joomla_svg___default = __WEBPACK_IMPORTED_MODULE_4__joomla_svg__ && __WEBPACK_IMPORTED_MODULE_4__joomla_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_4__joomla_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_4__joomla_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_4__joomla_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_4__joomla_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__previous_svg__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__previous_svg___default = __WEBPACK_IMPORTED_MODULE_5__previous_svg__ && __WEBPACK_IMPORTED_MODULE_5__previous_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_5__previous_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_5__previous_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_5__previous_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_5__previous_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_svg__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_svg___default = __WEBPACK_IMPORTED_MODULE_6__search_svg__ && __WEBPACK_IMPORTED_MODULE_6__search_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_6__search_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_6__search_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_6__search_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_6__search_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__wordpress_svg__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__wordpress_svg___default = __WEBPACK_IMPORTED_MODULE_7__wordpress_svg__ && __WEBPACK_IMPORTED_MODULE_7__wordpress_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_7__wordpress_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_7__wordpress_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_7__wordpress_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_7__wordpress_svg___default);

/* harmony export */ __webpack_require__.d(exports, "close", function() { return close; });
/* harmony export */ __webpack_require__.d(exports, "drupal", function() { return drupal; });
/* harmony export */ __webpack_require__.d(exports, "generic", function() { return generic; });
/* harmony export */ __webpack_require__.d(exports, "joomla", function() { return joomla; });
/* harmony export */ __webpack_require__.d(exports, "previous", function() { return previous; });
/* harmony export */ __webpack_require__.d(exports, "search", function() { return search; });
/* harmony export */ __webpack_require__.d(exports, "wordpress", function() { return wordpress; });var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



var toComponent = function toComponent(template) {
  var _class, _temp;

  return _temp = _class = function (_BaseComponent) {
    _inherits(Icon, _BaseComponent);

    function Icon() {
      var attributes = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _classCallCheck(this, Icon);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Icon).call(this));

      _this.attributes = _extends({ class: "icon" }, attributes);
      return _this;
    }

    _createClass(Icon, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var element = this.compileTemplate();

        Object.keys(this.attributes).forEach(function (key) {
          return element.setAttribute(key, _this2.attributes[key]);
        });

        return element;
      }
    }]);

    return Icon;
  }(__WEBPACK_IMPORTED_MODULE_0_components_base_component__["a" /* default */]), _class.template = template, _temp;
};


var close = toComponent(__WEBPACK_IMPORTED_MODULE_1__close_svg___default.a);


var drupal = toComponent(__WEBPACK_IMPORTED_MODULE_2__drupal_svg___default.a);


var generic = toComponent(__WEBPACK_IMPORTED_MODULE_3__generic_svg___default.a);


var joomla = toComponent(__WEBPACK_IMPORTED_MODULE_4__joomla_svg___default.a);


var previous = toComponent(__WEBPACK_IMPORTED_MODULE_5__previous_svg___default.a);


var search = toComponent(__WEBPACK_IMPORTED_MODULE_6__search_svg___default.a);


var wordpress = toComponent(__WEBPACK_IMPORTED_MODULE_7__wordpress_svg___default.a);

/***/ },
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export */ exports["b"] = getRoute;/* harmony export */ exports["a"] = setRoute;var ROUTE_PREFIX = "#!/embed/";

function getRoute() {
  return window.location.hash.split(ROUTE_PREFIX)[1] || null;
}

function setRoute() {
  var route = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

  window.location.hash = ROUTE_PREFIX + route;
}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__embed_box_styl__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__embed_box_styl___default = __WEBPACK_IMPORTED_MODULE_0__embed_box_styl__ && __WEBPACK_IMPORTED_MODULE_0__embed_box_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__embed_box_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__embed_box_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__embed_box_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_0__embed_box_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iframe_styl__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__iframe_styl___default = __WEBPACK_IMPORTED_MODULE_1__iframe_styl__ && __WEBPACK_IMPORTED_MODULE_1__iframe_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__iframe_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__iframe_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__iframe_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__iframe_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_application__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lib_custom_event__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lib_store__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lib_routing__ = __webpack_require__(7);

/* harmony export */ __webpack_require__.d(exports, "default", function() { return EmbedBoxBase; });var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp, _class2$iframeAttribu;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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










var VISIBILITY_ATTRIBUTE = "data-visibility";

function removeElement(element) {
  if (!element || !element.parentNode) return null;

  return element.parentNode.removeChild(element);
}

var EmbedBoxBase = (_class = (_temp = _class2 = function () {
  _createClass(EmbedBoxBase, null, [{
    key: "getTargetIDs",
    value: function getTargetIDs() {
      return this.fetchedTargets.map(function (target) {
        return target.id;
      });
    }
  }]);

  function EmbedBoxBase() {
    var spec = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, EmbedBoxBase);

    var _constructor = this.constructor;
    var iframeAttributes = _constructor.iframeAttributes;
    var stylesheet = _constructor.stylesheet;

    var store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_lib_store__["b" /* initializeStore */])(this, spec);
    var iframe = store.iframe;
    var _spec$autoShow = spec.autoShow;
    var autoShow = _spec$autoShow === undefined ? true : _spec$autoShow;
    var _spec$className = spec.className;
    var className = _spec$className === undefined ? "" : _spec$className;
    var _spec$container = spec.container;
    var container = _spec$container === undefined ? document.body : _spec$container;
    var _spec$customTargets = spec.customTargets;
    var customTargets = _spec$customTargets === undefined ? [] : _spec$customTargets;
    var _spec$routing = spec.routing;
    var routing = _spec$routing === undefined ? true : _spec$routing;
    var _spec$targets = spec.targets;
    var targetConfigs = _spec$targets === undefined ? {} : _spec$targets;
    var _spec$theme = spec.theme;
    var theme = _spec$theme === undefined ? {} : _spec$theme;


    Object.keys(iframeAttributes).forEach(function (key) {
      return iframe.element.setAttribute(key, iframeAttributes[key]);
    });

    this.container = typeof container === "string" ? document.querySelector(container) : container;
    var mode = this.container.tagName === "BODY" ? "modal" : "inline";

    iframe.element.className = "embed-box " + className;
    iframe.element.setAttribute("data-mode", mode);
    this.container.appendChild(iframe.element); // iframe window & document is now accessible.

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lib_custom_event__["a" /* default */])(iframe);
    iframe.element.addEventListener("transitionend", this.handleTransitionEnd);

    this.iframe = iframe;
    this.events = spec.events || {};
    this.theme = _extends({}, this.constructor.theme, theme);
    this.style = document.createElement("style");

    this.style.innerHTML = stylesheet;
    document.head.appendChild(this.style);

    this.appendIframeStylesheet(spec.style);

    var targetToComponent = function targetToComponent(Target) {
      return new Target({ config: targetConfigs[Target.id] || {} });
    };
    var targetConstructors = customTargets.concat(this.constructor.fetchedTargets);
    var visibleTargets = targetConstructors;

    if (spec.visibleTargets) {
      visibleTargets = spec.visibleTargets.map(function (id) {
        return targetConstructors.filter(function (Target) {
          return Target.id === id;
        })[0];
      });
    }

    var initialTarget = spec.initialTarget;


    if (!initialTarget) {
      initialTarget = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_lib_routing__["b" /* getRoute */])();

      if (!visibleTargets.some(function (_ref) {
        var id = _ref.id;
        return id === initialTarget;
      })) initialTarget = null;
    }

    this.application = new __WEBPACK_IMPORTED_MODULE_3_components_application__["a" /* default */](this.iframe.document.body, {
      initialTarget: initialTarget,
      mode: mode,
      routing: routing,
      onClose: this.hide,
      targets: visibleTargets.map(targetToComponent)
    });

    if (autoShow) this.show();
  }

  _createClass(EmbedBoxBase, [{
    key: "handleTransitionEnd",
    value: function handleTransitionEnd() {
      if (this.visibility === "hiding") this.visibility = "hidden";else if (this.visibility === "showing") this.visibility = "shown";
    }
  }, {
    key: "appendIframeStylesheet",
    value: function appendIframeStylesheet() {
      var extension = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
      var theme = this.theme;
      var iframeStylesheet = this.constructor.iframeStylesheet;

      var style = this.iframe.document.createElement("style");

      style.innerHTML = iframeStylesheet + ("\n      [data-component=\"application\"] .modal {\n        background-color: " + theme.backgroundColor + " !important;\n        color: " + theme.textColor + " !important;\n      }\n\n      a, .accent-color {\n        color: " + theme.accentColor + " !important;\n      }\n\n      .button.primary, button.primary,\n      [data-component=\"site-type-search\"] .types .type[data-selected],\n      .accent-background-color {\n        background: " + theme.accentColor + " !important;\n      }\n\n      .instructions .steps li::before {\n        background: " + theme.accentColor + " !important;\n      }\n    ") + extension;

      this.iframe.document.head.appendChild(style);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      Array.from(document.querySelectorAll(".embed-box-download-iframe")).forEach(removeElement);

      removeElement(this.iframe.element);
      removeElement(this.style);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_lib_store__["c" /* destroyStore */])();

      this.container.style.overflow = this.containerPreviousOverflow;
    }

    // Forces browser to compute transitions on elements inserted in current frame.

  }, {
    key: "forceLayout",
    value: function forceLayout(attribute) {
      return getComputedStyle(this.iframe.element)[attribute];
    }
  }, {
    key: "hide",
    value: function hide() {
      this.forceLayout("opacity");
      this.visibility = "hiding";

      this.container.style.overflow = this.containerPreviousOverflow;
      this.containerPreviousOverflow = "";
    }
  }, {
    key: "show",
    value: function show() {
      this.forceLayout("opacity");

      this.visibility = "showing";

      this.containerPreviousOverflow = this.container.style.overflow;
      this.container.style.overflow = "hidden";

      this.application.autofocus();
    }
  }, {
    key: "visibility",
    get: function get() {
      return this.iframe.element.getAttribute(VISIBILITY_ATTRIBUTE);
    },
    set: function set(value) {
      var element = this.iframe.element;


      element.style.display = value === "hidden" ? "none" : "";
      this.iframe.element.setAttribute(VISIBILITY_ATTRIBUTE, value);

      if (this.events.visibilityChange) this.events.visibilityChange(value);

      return value;
    }
  }]);

  return EmbedBoxBase;
}(), _class2.stylesheet = __WEBPACK_IMPORTED_MODULE_0__embed_box_styl___default.a, _class2.iframeStylesheet = __WEBPACK_IMPORTED_MODULE_1__iframe_styl___default.a, _class2.fetchedTargets = [], _class2.iframeAttributes = (_class2$iframeAttribu = {
  allowTransparency: ""
}, _defineProperty(_class2$iframeAttribu, VISIBILITY_ATTRIBUTE, "hidden"), _defineProperty(_class2$iframeAttribu, "frameBorder", "0"), _defineProperty(_class2$iframeAttribu, "seamless", "seamless"), _class2$iframeAttribu), _class2.theme = {
  accentColor: "#2d88f3",
  backgroundColor: "#ffffff",
  textColor: "#000000"
}, _temp), (_applyDecoratedDescriptor(_class.prototype, "handleTransitionEnd", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleTransitionEnd"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "hide", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "hide"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "show", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "show"), _class.prototype)), _class);


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__application_styl__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__application_styl___default = __WEBPACK_IMPORTED_MODULE_0__application_styl__ && __WEBPACK_IMPORTED_MODULE_0__application_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__application_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__application_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__application_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_0__application_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__application_pug__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__application_pug___default = __WEBPACK_IMPORTED_MODULE_1__application_pug__ && __WEBPACK_IMPORTED_MODULE_1__application_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__application_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__application_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__application_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_1__application_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_base_component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lib_store__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lib_routing__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_icons__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lib_key_map__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_components_site_type_search__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_components_target_wrapper__ = __webpack_require__(11);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return Application; });var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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













var Application = (_class = (_temp = _class2 = function (_BaseComponent) {
  _inherits(Application, _BaseComponent);

  function Application(mountPoint, options) {
    _classCallCheck(this, Application);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Application).call(this, options));

    _this.transitioning = false;

    var element = _this.compileTemplate();

    var iframeWindow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lib_store__["a" /* getStore */])().iframe.window;
    var _this$refs = _this.refs;
    var closeModalButton = _this$refs.closeModalButton;
    var previousButton = _this$refs.previousButton;

    var headerButtons = [closeModalButton, previousButton];

    headerButtons.forEach(function (button) {
      var id = button.getAttribute("data-action");
      var icon = new __WEBPACK_IMPORTED_MODULE_6_components_icons__[id]();

      button.appendChild(icon.render());
    });

    iframeWindow.addEventListener("keyup", _this.delgateKeyEvent);
    iframeWindow.addEventListener("keydown", _this.handleKeyNavigation);
    iframeWindow.addEventListener("keypress", _this.delgateKeyEvent);

    closeModalButton.addEventListener("click", _this.closeModal);
    element.addEventListener("click", function (event) {
      if (event.target === element) _this.closeModal();
    });

    previousButton.addEventListener("click", _this.navigateToHome);

    if (_this.targets.length === 1) {
      _this.route = _this.targets[0].id;
      _this.navigateToTarget();
    } else if (options.initialTarget) {
      _this.route = options.initialTarget;
      _this.navigateToTarget();
    } else {
      _this.route = "home";
      _this.navigateToHome();
    }

    mountPoint.appendChild(_this.element);
    return _this;
  }

  _createClass(Application, [{
    key: "closeModal",
    value: function closeModal() {
      this.onClose();
    }
  }, {
    key: "delgateKeyEvent",
    value: function delgateKeyEvent(nativeEvent) {
      var receiver = this.refs.content.querySelector("[data-event-receiver]");

      if (this.transitioning || !receiver) return;

      var delgated = new CustomEvent("dispatched-" + nativeEvent.type, {
        detail: { nativeEvent: nativeEvent }
      });

      receiver.dispatchEvent(delgated);
    }
  }, {
    key: "handleKeyNavigation",
    value: function handleKeyNavigation(event) {
      if (this.transitioning) return;

      switch (event.keyCode) {
        case __WEBPACK_IMPORTED_MODULE_7_lib_key_map__["a" /* default */].esc:
          event.preventDefault();
          this.closeModal();

          break;

        case __WEBPACK_IMPORTED_MODULE_7_lib_key_map__["a" /* default */].backspace:
          if (this.element.querySelector("input:focus")) break; // User is in a text field.

          event.preventDefault();

          if (this.route !== "home") this.navigateToHome();
          break;

        default:
          this.delgateKeyEvent(event);
      }
    }
  }, {
    key: "renderSiteTypeSearch",
    value: function renderSiteTypeSearch() {
      var _this2 = this;

      var content = this.refs.content;
      var firstChild = content.firstChild;

      var siteTypeSearch = new __WEBPACK_IMPORTED_MODULE_8_components_site_type_search__["a" /* default */]({
        targets: this.targets,
        onSelection: this.setNavigationState,
        onSubmit: function onSubmit(selectedId) {
          _this2.route = selectedId;
          _this2.navigateToTarget();
        }
      }).render();

      if (!firstChild) {
        content.appendChild(siteTypeSearch);
        return;
      }

      content.insertBefore(siteTypeSearch, firstChild);

      siteTypeSearch.setAttribute("data-transition", "hidden-left");
      siteTypeSearch.addEventListener("transitionend", function () {
        _this2.removeElement(firstChild);
        _this2.transitioning = false;
      });

      requestAnimationFrame(function () {
        return siteTypeSearch.setAttribute("data-transition", "visible");
      });
    }
  }, {
    key: "navigateToHome",
    value: function navigateToHome() {
      this.transitioning = false;
      this.route = "home";
      this.renderSiteTypeSearch();
      this.autofocus();

      this.element.setAttribute("data-route", this.route);
    }
  }, {
    key: "navigateToTarget",
    value: function navigateToTarget() {
      var _this3 = this;

      this.transitioning = true;

      var content = this.refs.content;
      var firstChild = content.firstChild;

      var _targets$filter = this.targets.filter(function (target) {
        return target.id === _this3.route;
      });

      var _targets$filter2 = _slicedToArray(_targets$filter, 1);

      var target = _targets$filter2[0];

      var targetWrapper = new __WEBPACK_IMPORTED_MODULE_9_components_target_wrapper__["a" /* default */]({
        onDone: this.closeModal,
        target: target
      }).render();

      content.appendChild(targetWrapper);

      if (firstChild) {
        firstChild.addEventListener("transitionend", function () {
          _this3.removeElement(firstChild);
          _this3.autofocus();
          _this3.element.setAttribute("data-route", _this3.route);
          _this3.transitioning = false;

          targetWrapper.firstChild.focus();
        });

        requestAnimationFrame(function () {
          return firstChild.setAttribute("data-transition", "hidden-left");
        });
      }
    }
  }, {
    key: "route",
    get: function get() {
      return this._route;
    },
    set: function set(value) {
      this._route = value;

      if (this.routing) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_lib_routing__["a" /* setRoute */])(value === "home" ? "" : value);
      }

      return this._route;
    }
  }]);

  return Application;
}(__WEBPACK_IMPORTED_MODULE_3_components_base_component__["a" /* default */]), _class2.template = __WEBPACK_IMPORTED_MODULE_1__application_pug___default.a, _class2.stylesheet = __WEBPACK_IMPORTED_MODULE_0__application_styl___default.a, _temp), (_applyDecoratedDescriptor(_class.prototype, "closeModal", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "closeModal"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "delgateKeyEvent", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "delgateKeyEvent"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleKeyNavigation", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleKeyNavigation"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "navigateToHome", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "navigateToHome"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "navigateToTarget", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "navigateToTarget"), _class.prototype)), _class);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__site_type_search_styl__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__site_type_search_styl___default = __WEBPACK_IMPORTED_MODULE_0__site_type_search_styl__ && __WEBPACK_IMPORTED_MODULE_0__site_type_search_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__site_type_search_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__site_type_search_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__site_type_search_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_0__site_type_search_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_autobind_decorator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_1_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_1_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_1_autobind_decorator___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__site_type_search_pug__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__site_type_search_pug___default = __WEBPACK_IMPORTED_MODULE_3__site_type_search_pug__ && __WEBPACK_IMPORTED_MODULE_3__site_type_search_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3__site_type_search_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3__site_type_search_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_3__site_type_search_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_3__site_type_search_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_icons__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lib_key_map__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lib_store__ = __webpack_require__(2);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return SiteTypeSearch; });var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp2;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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










var SearchIcon = __WEBPACK_IMPORTED_MODULE_4_components_icons__["search"];


function setVisibility(element, hidden) {
  element.style.display = hidden ? "none" : "";
}

var SiteTypeSearch = (_class = (_temp2 = _class2 = function (_BaseComponent) {
  _inherits(SiteTypeSearch, _BaseComponent);

  function SiteTypeSearch() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, SiteTypeSearch);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SiteTypeSearch)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.selectedId = null, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SiteTypeSearch, [{
    key: "handleSearchInput",
    value: function handleSearchInput() {
      var _refs = this.refs;
      var search = _refs.search;
      var typesContainer = _refs.typesContainer;


      this.query = search.value.toLowerCase();

      this.types.forEach(function (_ref) {
        var id = _ref.id;
        var hidden = _ref.hidden;

        var type = typesContainer.querySelector(".type[data-id=" + id + "]");

        type.removeAttribute("data-first-visible");
        setVisibility(type, hidden);
      });

      var _types$filter = this.types.filter(function (_ref2) {
        var hidden = _ref2.hidden;
        return !hidden;
      });

      var _types$filter2 = _slicedToArray(_types$filter, 1);

      var firstVisible = _types$filter2[0];

      var firstVisibleEl = typesContainer.querySelector(".type[data-id=" + firstVisible.id + "]");

      firstVisibleEl.setAttribute("data-first-visible", "");
      this.selectType(firstVisible.id);
    }
  }, {
    key: "handleDelgatedKeydown",
    value: function handleDelgatedKeydown(_ref3) {
      var _KM$up$KM$down;

      var _ref3$detail = _ref3.detail;
      var keyCode = _ref3$detail.keyCode;
      var nativeEvent = _ref3$detail.nativeEvent;

      var delta = (_KM$up$KM$down = {}, _defineProperty(_KM$up$KM$down, __WEBPACK_IMPORTED_MODULE_5_lib_key_map__["a" /* default */].up, -1), _defineProperty(_KM$up$KM$down, __WEBPACK_IMPORTED_MODULE_5_lib_key_map__["a" /* default */].down, 1), _KM$up$KM$down)[keyCode || nativeEvent.keyCode];

      if (!delta) return;

      if (nativeEvent) nativeEvent.preventDefault();

      var selectedId = this.selectedId;

      var types = this.types.filter(function (type) {
        return !type.hidden;
      });

      if (!types.length) return;

      var length = types.length;

      var currentIndex = types.findIndex(function (_ref4) {
        var id = _ref4.id;
        return id === selectedId;
      }) || 0;

      // Move the index by delta and wrap around the bottom/top.
      var nextIndex = (currentIndex + delta + length) % length;

      selectedId = types[nextIndex].id;

      this.selectType(selectedId);
    }
  }, {
    key: "handleDelgatedKeypress",
    value: function handleDelgatedKeypress(_ref5) {
      var _ref5$detail = _ref5.detail;
      var keyCode = _ref5$detail.keyCode;
      var nativeEvent = _ref5$detail.nativeEvent;

      keyCode = keyCode || nativeEvent.keyCode;

      if (keyCode !== __WEBPACK_IMPORTED_MODULE_5_lib_key_map__["a" /* default */].enter) return;
      if (nativeEvent) nativeEvent.preventDefault();

      this.submit();
    }
  }, {
    key: "submit",
    value: function submit() {
      if (!this.selectedId) return;

      this.onSubmit(this.selectedId);
    }
  }, {
    key: "selectType",
    value: function selectType(selectedId) {
      var _refs2 = this.refs;
      var types = _refs2.types;
      var typesContainer = _refs2.typesContainer;
      var search = _refs2.search;
      var iframeDocument = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_lib_store__["a" /* getStore */])().iframe.document;

      var selectedType = typesContainer.querySelector(".type[data-id=\"" + selectedId + "\"]");

      this.selectedId = selectedId;

      types.forEach(this.setTypeStyle);

      if (search !== iframeDocument.activeElement) {
        selectedType.focus();
      }

      this.setNavigationState();
    }
  }, {
    key: "setNavigationState",
    value: function setNavigationState() {
      var nextButton = this.refs.nextButton;


      nextButton.disabled = !this.selectedId;
    }
  }, {
    key: "render",
    value: function render() {
      this.compileTemplate();

      var _refs3 = this.refs;
      var nextButton = _refs3.nextButton;
      var search = _refs3.search;

      var searchIcon = new SearchIcon();

      this.insertBefore(searchIcon.render(), search);

      search.addEventListener("input", this.handleSearchInput);

      this.renderTypes();
      this.setNavigationState();

      this.element.addEventListener("dispatched-keydown", this.handleDelgatedKeydown);
      this.element.addEventListener("dispatched-keypress", this.handleDelgatedKeypress);
      this.element.addEventListener("dispatched-input", this.handleSearchInput);
      nextButton.addEventListener("click", this.submit);

      return this.element;
    }
  }, {
    key: "renderTypes",
    value: function renderTypes() {
      var _this2 = this;

      var typesContainer = this.refs.typesContainer;


      this.types.forEach(function ($) {
        var Icon = __WEBPACK_IMPORTED_MODULE_4_components_icons__[$.id] || __WEBPACK_IMPORTED_MODULE_4_components_icons__["generic"];
        var icon = new Icon();
        var typeEl = typesContainer.appendChild(document.createElement("div"));

        typeEl.className = "type";
        typeEl.setAttribute("tabindex", "4");
        typeEl.setAttribute("data-action", "");
        typeEl.setAttribute("data-ref", "types[]");
        typeEl.setAttribute("data-id", $.id);
        setVisibility(typeEl, $.hidden);

        typeEl.appendChild(icon.render());
        typeEl.appendChild(document.createTextNode($.label));

        _this2.updateRefs();
        _this2.setTypeStyle(typeEl);

        typeEl.addEventListener("click", function () {
          return _this2.selectType($.id);
        });

        typeEl.addEventListener("keydown", function (event) {
          if (event.keyCode === __WEBPACK_IMPORTED_MODULE_5_lib_key_map__["a" /* default */].enter || event.keyCode === __WEBPACK_IMPORTED_MODULE_5_lib_key_map__["a" /* default */].spacebar) {
            event.preventDefault();
            _this2.selectType($.id);
          }
        });
      });
    }
  }, {
    key: "setTypeStyle",
    value: function setTypeStyle(element) {
      if (element.getAttribute("data-id") === this.selectedId) {
        element.setAttribute("data-selected", "");
      } else {
        element.removeAttribute("data-selected");
      }
    }
  }, {
    key: "types",
    get: function get() {
      var query = this.query;
      var targets = this.targets;


      return targets.map(function (_ref6) {
        var id = _ref6.id;
        var label = _ref6.label;
        var fallback = _ref6.fallback;

        var hidden = query && label.toLowerCase().indexOf(query) === -1 && !fallback;

        return { id: id, label: label, hidden: hidden };
      });
    }
  }]);

  return SiteTypeSearch;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_component__["a" /* default */]), _class2.template = __WEBPACK_IMPORTED_MODULE_3__site_type_search_pug___default.a, _class2.stylesheet = __WEBPACK_IMPORTED_MODULE_0__site_type_search_styl___default.a, _temp2), (_applyDecoratedDescriptor(_class.prototype, "handleSearchInput", [__WEBPACK_IMPORTED_MODULE_1_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleSearchInput"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleDelgatedKeydown", [__WEBPACK_IMPORTED_MODULE_1_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleDelgatedKeydown"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleDelgatedKeypress", [__WEBPACK_IMPORTED_MODULE_1_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleDelgatedKeypress"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "submit", [__WEBPACK_IMPORTED_MODULE_1_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "submit"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "setTypeStyle", [__WEBPACK_IMPORTED_MODULE_1_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "setTypeStyle"), _class.prototype)), _class);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug___default = __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__ && __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl___default = __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__ && __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_component__ = __webpack_require__(1);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return TargetWrapper; });var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var TargetWrapper = (_temp = _class = function (_BaseComponent) {
  _inherits(TargetWrapper, _BaseComponent);

  function TargetWrapper() {
    _classCallCheck(this, TargetWrapper);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(TargetWrapper).apply(this, arguments));
  }

  _createClass(TargetWrapper, [{
    key: "render",
    value: function render() {
      this.compileTemplate();

      var target = this.target.render();
      var _refs = this.refs;
      var doneButton = _refs.doneButton;
      var targetMount = _refs.targetMount;


      this.replaceElement(targetMount, target);

      doneButton.addEventListener("click", this.onDone);

      return this.element;
    }
  }]);

  return TargetWrapper;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_component__["a" /* default */]), _class.template = __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug___default.a, _class.stylesheet = __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl___default.a, _temp);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export */ exports["a"] = polyfillCustomEvent;function polyfillCustomEvent(_ref) {
  var document = _ref.document;
  var window = _ref.window;

  if (typeof window.CustomEvent === "function") return false;

  function CustomEvent(event) {
    var params = arguments.length <= 1 || arguments[1] === undefined ? { bubbles: false, cancelable: false } : arguments[1];

    var shimEvent = document.createEvent("CustomEvent");

    shimEvent.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

    return shimEvent;
  }

  CustomEvent.prototype = window.Event.prototype;

  window.CustomEvent = CustomEvent;
}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "[data-component=\"application\"] {\n  -webkit-box-align: center;\n  -o-box-align: center;\n  -ms-flex-align: center;\n  -ms-grid-row-align: center;\n      align-items: center;\n  -webkit-box-pack: center;\n  -o-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  max-height: 100%;\n  min-height: 100%;\n}\n@media (max-height: 24em) {\n  [data-component=\"application\"] {\n    -webkit-box-pack: start;\n    -o-box-pack: start;\n    -ms-flex-pack: start;\n    justify-content: flex-start;\n  }\n}\n[data-component=\"application\"][data-route=\"home\"] .modal-header [data-action=\"previous\"],\n[data-component=\"application\"][data-target-count=\"1\"] .modal-header [data-action=\"previous\"] {\n  visibility: hidden;\n}\n[data-component=\"application\"][data-mode=\"inline\"] .modal-header [data-action=\"close\"] {\n  visibility: hidden;\n  pointer-events: none;\n}\n[data-component=\"application\"] .modal {\n  position: relative;\n  z-index: 1;\n  -webkit-box-flex: 1;\n  -o-box-flex: 1;\n  box-flex: 1;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  min-height: 18em;\n  max-height: 38em;\n  overflow: hidden;\n  width: 35em;\n  max-width: 100%;\n  background: #fff;\n  border-radius: 0.3125em;\n}\n[data-component=\"application\"] .modal .content {\n  -webkit-box-flex: 1;\n  -o-box-flex: 1;\n  box-flex: 1;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n}\n[data-component=\"application\"] .modal .content > * {\n  margin: 0;\n  -webkit-box-flex: 1;\n  -o-box-flex: 1;\n  box-flex: 1;\n  -ms-flex: 1 0 auto;\n  flex: 1 0 auto;\n  -webkit-transition: margin 0.2s ease-in-out;\n  transition: margin 0.2s ease-in-out;\n  width: 100%;\n}\n[data-component=\"application\"] .modal .content [data-component=\"site-type-search\"][data-transition=\"hidden-left\"] {\n  margin-left: -100%;\n}\n[data-component=\"application\"] .modal-header {\n  -webkit-box-align: center;\n  -o-box-align: center;\n  -ms-flex-align: center;\n  -ms-grid-row-align: center;\n      align-items: center;\n  box-shadow: 0 1px rgba(0,0,0,0.21);\n  -webkit-box-flex: 1;\n  -o-box-flex: 1;\n  box-flex: 1;\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto;\n  -webkit-box-pack: justify;\n  -o-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  width: 100%;\n  z-index: 1;\n}\n[data-component=\"application\"] .modal-header .title {\n  text-align: center;\n  line-height: 1.4;\n  padding: 0.8em 0;\n}\n[data-component=\"application\"] .modal-header button[data-action] {\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  background: inherit;\n  border-radius: 0;\n  color: inherit;\n  -webkit-box-flex: 1;\n  -o-box-flex: 1;\n  box-flex: 1;\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: box;\n  display: flex;\n  height: 4em;\n  -webkit-box-pack: center;\n  -o-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  padding: 0;\n  margin: 0;\n  opacity: 0.85;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=85)\";\n  filter: alpha(opacity=85);\n  width: 4em;\n}\n[data-component=\"application\"] .modal-header button[data-action]:focus:before {\n  display: none;\n}\n[data-component=\"application\"] .modal-header button[data-action]:hover,\n[data-component=\"application\"] .modal-header button[data-action]:focus {\n  background: rgba(0,0,0,0.045);\n  box-shadow: none;\n  opacity: 1;\n  -ms-filter: none;\n  -webkit-filter: none;\n          filter: none;\n}\n[data-component=\"application\"] .modal-header button[data-action]:not(:hover) {\n  color: rgba(0,0,0,0.43);\n}\n[data-component=\"application\"] .modal-header button[data-action] > .icon {\n  -webkit-box-flex: 1;\n  -o-box-flex: 1;\n  box-flex: 1;\n  -ms-flex: 1 0 auto;\n  flex: 1 0 auto;\n  width: 1em;\n  height: 1em;\n  stroke: currentColor;\n}\n[data-component=\"application\"] .modal-footer {\n  box-shadow: 0 -1px rgba(0,0,0,0.21);\n  -webkit-box-flex: 1;\n  -o-box-flex: 1;\n  box-flex: 1;\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto;\n  -webkit-box-pack: end;\n  -o-box-pack: end;\n  -ms-flex-pack: end;\n  justify-content: flex-end;\n  padding: 1.5em;\n  position: relative;\n  z-index: 1;\n}\n[data-component=\"application\"] .modal-footer button[disabled],\n[data-component=\"application\"] .modal-footer .button[disabled] {\n  background: #e0e0e0;\n}\n@media (min-width: 769px) {\n  [data-component=\"application\"] .modal {\n    box-shadow: 0 2px 8px rgba(0,0,0,0.4);\n    margin: 1.5em 0;\n  }\n}\n@media (max-width: 768px) {\n  [data-component=\"application\"] .modal {\n    border-radius: 0;\n    max-height: 100vh;\n    width: 100%;\n  }\n}\n", ""]);

// exports


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "[data-component=\"site-type-search\"] .header {\n  -webkit-box-align: center;\n  -o-box-align: center;\n  -ms-flex-align: center;\n  -ms-grid-row-align: center;\n      align-items: center;\n  box-shadow: 0 1px rgba(0,0,0,0.21);\n  -webkit-box-flex: 1;\n  -o-box-flex: 1;\n  box-flex: 1;\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto;\n  width: 100%;\n  z-index: 2;\n}\n[data-component=\"site-type-search\"] .header .icon {\n  stroke: rgba(0,0,0,0.43);\n  width: 1em;\n  margin-left: 1.5em;\n}\n[data-component=\"site-type-search\"] .header .search {\n  background: transparent;\n  border: none;\n  -webkit-box-flex: 1;\n  -o-box-flex: 1;\n  box-flex: 1;\n  -ms-flex: 1 0 auto;\n  flex: 1 0 auto;\n  padding: 1.5em;\n}\n[data-component=\"site-type-search\"] .header .search::-webkit-input-placeholder {\n  color: rgba(0,0,0,0.3);\n  font-family: inherit;\n  font-size: 1em;\n}\n[data-component=\"site-type-search\"] .header .search:-moz-placeholder {\n  color: rgba(0,0,0,0.3);\n  font-family: inherit;\n  font-size: 1em;\n}\n[data-component=\"site-type-search\"] .header .search::-moz-placeholder {\n  color: rgba(0,0,0,0.3);\n  font-family: inherit;\n  font-size: 1em;\n}\n[data-component=\"site-type-search\"] .header .search:-ms-input-placeholder {\n  color: rgba(0,0,0,0.3);\n  font-family: inherit;\n  font-size: 1em;\n}\n[data-component=\"site-type-search\"] .header .search:focus {\n  outline: none;\n}\n[data-component=\"site-type-search\"] .types {\n  -webkit-box-flex: 1;\n  -o-box-flex: 1;\n  box-flex: 1;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n  overflow-scrolling: touch;\n  z-index: 1;\n}\n[data-component=\"site-type-search\"] .types .type {\n  position: relative;\n  cursor: pointer;\n  -webkit-box-align: center;\n  -o-box-align: center;\n  -ms-flex-align: center;\n  -ms-grid-row-align: center;\n      align-items: center;\n  -webkit-box-flex: 1;\n  -o-box-flex: 1;\n  box-flex: 1;\n  -ms-flex: 0 0 auto;\n  flex: 0 0 auto;\n  padding: 1em;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  border: 1px solid rgba(0,0,0,0.063);\n  border-left: 0;\n  border-right: 0;\n}\n[data-component=\"site-type-search\"] .types .type:first-child,\n[data-component=\"site-type-search\"] .types .type[data-first-visible] {\n  border-top-color: transparent;\n}\n[data-component=\"site-type-search\"] .types .type:last-child {\n  border-bottom-color: transparent;\n}\n[data-component=\"site-type-search\"] .types .type:not(:last-child) {\n  margin-bottom: -1px;\n}\n[data-component=\"site-type-search\"] .types .type:not([data-selected]) {\n  z-index: 1;\n  background: transparent;\n  color: inherit;\n}\n[data-component=\"site-type-search\"] .types .type:not([data-selected]):hover {\n  background: rgba(0,0,0,0.045);\n}\n[data-component=\"site-type-search\"] .types .type:focus {\n  outline: none;\n  background: rgba(0,0,0,0.045);\n}\n[data-component=\"site-type-search\"] .types .type[data-selected] {\n  border-color: transparent;\n}\n[data-component=\"site-type-search\"] .types .type[data-selected],\n[data-component=\"site-type-search\"] .types .type[data-selected]:hover {\n  z-index: 2;\n  color: #fff;\n  box-shadow: none !important;\n}\n[data-component=\"site-type-search\"] .types .type .icon {\n  fill: currentColor;\n  height: 2em;\n  margin-right: 1em;\n  width: 2em;\n}\n", ""]);

// exports


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "[data-component=\"application\"][data-mode=\"inline\"] [data-component=\"target-wrapper\"] .modal-footer {\n  display: none;\n}\n[data-component$=\"-target\"] {\n  -webkit-box-flex: 1;\n  -o-box-flex: 1;\n  box-flex: 1;\n  -ms-flex: 1 1 auto;\n  flex: 1 1 auto;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n  overflow-scrolling: touch;\n}\n[data-component$=\"-target\"]:focus {\n  outline: none;\n}\n[data-component$=\"-target\"] .copy-container {\n  font-size: 0.8em;\n  background: rgba(0,0,0,0.045);\n  margin-bottom: 1em;\n  position: relative;\n}\n[data-component$=\"-target\"] .copy-container button.run {\n  margin: 0;\n  padding: 0.3em 1em;\n  position: absolute;\n  left: 1.5em;\n  top: 1.5em;\n}\n[data-component$=\"-target\"] .copy-container button.run::after {\n  color: #000;\n  content: \"Copied\";\n  display: inline-block;\n  left: 100%;\n  margin-left: 0.5em;\n  opacity: 0;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  filter: alpha(opacity=0);\n  position: absolute;\n}\n[data-component$=\"-target\"] .copy-container button.run[data-status=\"copied\"]::after {\n  -webkit-animation: copied 400ms linear;\n  animation: copied 400ms linear;\n  -webkit-animation-fill-mode: forwards;\n  animation-fill-mode: forwards;\n  opacity: 1;\n  -ms-filter: none;\n  -webkit-filter: none;\n          filter: none;\n}\n[data-component$=\"-target\"] .copy-container > .copyable {\n  display: block;\n  font-family: Monaco, \"Bitstream Vera Sans Mono\", \"Lucida Console\", Terminal, monospace;\n  margin: 0;\n  padding: 1.3em;\n  padding-top: 4.3em;\n  white-space: pre-wrap;\n  width: 100%;\n  word-wrap: break-word;\n}\n[data-component$=\"-target\"] .copy-container > .copyable:focus {\n  outline: none;\n}\n.instructions.markdown {\n  cursor: auto;\n  display: block;\n  padding: 3em 2em 3em 4em;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n}\n.instructions.markdown [data-content-slot] {\n  background: rgba(0,0,0,0.045);\n  padding: 1em;\n  border-radius: 3px;\n  margin-left: -2em;\n}\n.instructions.markdown ol.steps {\n  counter-reset: item 0;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.instructions.markdown ol.steps li {\n  counter-increment: item;\n  position: relative;\n}\n.instructions.markdown ol.steps li::before {\n  background: rgba(0,0,0,0.045);\n  border-radius: 50%;\n  color: #fff;\n  content: counter(item);\n  display: inline-block;\n  line-height: 2em;\n  margin-right: 1em;\n  position: absolute;\n  right: 100%;\n  text-align: center;\n  top: 0;\n  width: 2em;\n}\n.instructions.markdown div,\n.instructions.markdown footer,\n.instructions.markdown header,\n.instructions.markdown section {\n  display: block;\n}\n.instructions.markdown figure {\n  margin: 2em -2em 0 -4em;\n}\n.instructions.markdown figure > img {\n  max-width: 100%;\n}\n.instructions.markdown h1 {\n  font-size: 1.25em;\n  font-weight: 300;\n  margin-top: 2em;\n  margin-bottom: 2em;\n  text-align: center;\n  padding-right: 2em;\n}\n.instructions.markdown h2 {\n  font-size: 1em;\n  font-weight: 500;\n  margin-top: 3em;\n}\n.instructions.markdown > *:first-child {\n  margin-top: 0;\n}\n.instructions.markdown > *:last-child {\n  margin-bottom: 0;\n}\n@-webkit-keyframes copied {\n  0%, 100% {\n    opacity: 0;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    filter: alpha(opacity=0);\n  }\n  50% {\n    opacity: 1;\n    -ms-filter: none;\n    -webkit-filter: none;\n            filter: none;\n    -webkit-transform: translate3d(0, -1.8em, 0);\n    transform: translate3d(0, -1.8em, 0);\n  }\n  100% {\n    -webkit-transform: translate3d(0, -1.8em, 0);\n    transform: translate3d(0, -1.8em, 0);\n  }\n}\n@keyframes copied {\n  0%, 100% {\n    opacity: 0;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    filter: alpha(opacity=0);\n  }\n  50% {\n    opacity: 1;\n    -ms-filter: none;\n    -webkit-filter: none;\n            filter: none;\n    -webkit-transform: translate3d(0, -1.8em, 0);\n    transform: translate3d(0, -1.8em, 0);\n  }\n  100% {\n    -webkit-transform: translate3d(0, -1.8em, 0);\n    transform: translate3d(0, -1.8em, 0);\n  }\n}\n", ""]);

// exports


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".embed-box[data-mode=\"inline\"] {\n  display: block !important;\n  height: 100%;\n  width: 100%;\n}\n.embed-box[data-mode=\"modal\"] {\n  bottom: 0 !important;\n  height: 100vh !important;\n  left: 0 !important;\n  opacity: 0 !important;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\" !important;\n  filter: alpha(opacity=0) !important;\n  position: fixed !important;\n  right: 0 !important;\n  top: 0 !important;\n  -webkit-transition: opacity 0.1s linear !important;\n  transition: opacity 0.1s linear !important;\n  width: 100vw !important;\n  z-index: 10000 !important;\n}\n.embed-box[data-mode=\"modal\"][data-visibility=\"hiding\"] {\n  opacity: 0 !important;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\" !important;\n  filter: alpha(opacity=0) !important;\n}\n.embed-box[data-mode=\"modal\"][data-visibility=\"hidden\"] {\n  opacity: 0 !important;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\" !important;\n  filter: alpha(opacity=0) !important;\n}\n.embed-box[data-mode=\"modal\"][data-visibility=\"showing\"] {\n  opacity: 0.5 !important;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)\" !important;\n  filter: alpha(opacity=50) !important;\n}\n.embed-box[data-mode=\"modal\"][data-visibility=\"shown\"] {\n  opacity: 1 !important;\n  -ms-filter: none !important;\n  -webkit-filter: none !important;\n          filter: none !important;\n}\n.embed-box-download-iframe {\n  position: fixed;\n  visibility: hidden;\n  width: 1px;\n  height: 1px;\n  z-index: -99999;\n}\n", ""]);

// exports


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "article,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nnav,\nsection,\nsummary {\n  display: block;\n}\naudio,\ncanvas,\nvideo {\n  display: inline;\n  zoom: 1;\n}\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n[hidden] {\n  display: none;\n}\nhtml {\n  font-size: 100%;\n  -webkit-text-size-adjust: 100%;\n  -ms-text-size-adjust: 100%;\n  text-size-adjust: 100%;\n}\nbody {\n  margin: 0;\n  text-rendering: optimizeLegibility;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  margin: 0;\n}\nbutton,\ninput {\n  line-height: normal;\n}\nbutton,\ninput[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  cursor: pointer;\n}\nbutton[disabled],\ninput[type=\"button\"][disabled],\ninput[type=\"reset\"][disabled],\ninput[type=\"submit\"][disabled] {\n  cursor: not-allowed;\n}\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\na:focus {\n  outline: thin dotted;\n}\na:active,\na:hover {\n  outline: 0;\n}\nabbr[title] {\n  border-bottom: thin dotted;\n}\nb,\nstrong {\n  font-weight: 700;\n}\ndfn {\n  font-style: italic;\n}\npre {\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\nimg {\n  border: 0;\n  -ms-interpolation-mode: bicubic;\n}\nsvg:not(:root) {\n  overflow: hidden;\n}\ntextarea {\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n  overflow-scrolling: touch;\n  vertical-align: top;\n  resize: vertical;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\nfigure,\nform {\n  margin: 0;\n}\np,\npre,\ndl,\nmenu,\nol,\nul {\n  margin: 1em 0;\n}\n*,\n*:after,\n*:before {\n  box-sizing: border-box;\n}\nhtml {\n  font-size: 16px;\n}\nbody {\n  font-family: \"Avenir New\", Avenir, \"Helvetica Neue\", sans-serif;\n}\nbutton,\n.button {\n  -webkit-font-smoothing: subpixel-antialiased;\n  -moz-osx-font-smoothing: auto;\n  position: relative;\n  text-rendering: optimizeLegibility;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  display: inline-block;\n  cursor: pointer;\n  border: 0;\n  border-radius: 0.1875em;\n  font-size: 1em;\n  padding: 0.6em 2em;\n  margin: 0;\n  text-align: center;\n  font-family: \"Avenir New\", Avenir, \"Helvetica Neue\", sans-serif;\n  font-weight: 300;\n  letter-spacing: 0.04em;\n  text-indent: 0.04em;\n  text-decoration: none;\n}\nbutton.slim,\n.button.slim {\n  padding-left: 1em;\n  padding-right: 1em;\n}\nbutton.nowrap,\n.button.nowrap {\n  white-space: nowrap;\n  max-width: 100%;\n}\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n  button,\n  .button {\n    font-weight: 400;\n  }\n}\n@media all and (-webkit-min-device-pixel-ratio: 0) and (-webkit-min-device-pixel-ratio: 0.001), all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dppx) {\n  button,\n  .button {\n    font-weight: 300;\n  }\n}\nbutton:hover,\n.button:hover {\n  text-decoration: none;\n}\nbutton[disabled],\n.button[disabled] {\n  opacity: 0.7;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)\";\n  filter: alpha(opacity=70);\n}\nbutton[disabled]:hover,\n.button[disabled]:hover,\nbutton[disabled]:focus,\n.button[disabled]:focus,\nbutton[disabled]:focus:hover,\n.button[disabled]:focus:hover {\n  box-shadow: none !important;\n}\nbutton:hover,\n.button:hover {\n  box-shadow: 0 0.1875em 0.375em -0.1875em rgba(0,0,0,0.325);\n}\nbutton:hover:active,\n.button:hover:active,\nbutton.active,\n.button.active {\n  box-shadow: inset 0 0.125em 0.375em rgba(0,0,0,0.325);\n}\nbutton:focus,\n.button:focus {\n  outline: none;\n}\nbutton:focus:not(.inset-icon)::before,\n.button:focus:not(.inset-icon)::before {\n  content: \"\";\n  position: absolute;\n  z-index: 1;\n  top: 2px;\n  right: 2px;\n  bottom: 2px;\n  left: 2px;\n  border-radius: 0.1em;\n  box-shadow: inset 0 0 0 1px #fff;\n  pointer-events: none;\n  -webkit-transition: opacity 0.3s ease-in-out;\n  transition: opacity 0.3s ease-in-out;\n}\nbutton:focus:not(.inset-icon):active::before,\n.button:focus:not(.inset-icon):active::before {\n  opacity: 0;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  filter: alpha(opacity=0);\n}\nbutton.primary,\n.button.primary {\n  background: #000;\n  color: #fff;\n}\nbutton.transparent,\n.button.transparent {\n  font-weight: 400;\n}\nbutton.transparent:not(:hover):not(:active):not(.active):not(:focus),\n.button.transparent:not(:hover):not(:active):not(.active):not(:focus) {\n  background: transparent;\n  box-shadow: inset 0 0 0 1px lightLineGrayRGBA;\n  color: rgba(0,0,0,0.55);\n}\nbutton.small,\n.button.small {\n  font-size: 0.9em;\n  border-radius: 0.2083em;\n  letter-spacing: 0.06em;\n  text-indent: 0.06em;\n}\nbutton.large,\n.button.large {\n  font-size: 1.25em;\n}\nbutton.with-spinner-icon,\n.button.with-spinner-icon {\n  position: relative;\n}\nbutton.with-spinner-icon .icon.spinner-icon,\n.button.with-spinner-icon .icon.spinner-icon {\n  display: none;\n}\nbutton.with-spinner-icon.showing-spinner-icon .button-content,\n.button.with-spinner-icon.showing-spinner-icon .button-content {\n  opacity: 0;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  filter: alpha(opacity=0);\n  pointer-events: none;\n}\nbutton.with-spinner-icon.showing-spinner-icon .icon.spinner-icon,\n.button.with-spinner-icon.showing-spinner-icon .icon.spinner-icon {\n  position: absolute;\n  display: block;\n  margin: auto;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\nbutton.with-spinner-icon.showing-spinner-icon.more:after,\n.button.with-spinner-icon.showing-spinner-icon.more:after {\n  opacity: 0;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  filter: alpha(opacity=0);\n  pointer-events: none;\n}\n.buttons-group span.buttons-group-message {\n  display: inline-block;\n  padding: 0.6em 0;\n}\n.buttons-group span.buttons-group-message.small {\n  font-size: 0.9em;\n}\n.buttons-group span.buttons-group-message.large {\n  font-size: 1.25em;\n}\n@media (min-width: 569px) {\n  .buttons-group button,\n  .buttons-group .button,\n  .buttons-group span.buttons-group-message {\n    margin-right: 1em;\n  }\n  .buttons-group button:last-child,\n  .buttons-group .button:last-child,\n  .buttons-group span.buttons-group-message:last-child {\n    margin-right: 0;\n  }\n}\n@media (max-width: 568px) {\n  .buttons-group button,\n  .buttons-group .button,\n  .buttons-group span.buttons-group-message {\n    display: block;\n    margin-bottom: 1em;\n  }\n  .buttons-group button:last-child,\n  .buttons-group .button:last-child,\n  .buttons-group span.buttons-group-message:last-child {\n    margin-bottom: 0;\n  }\n}\n@media (max-width: 568px) {\n  .buttons-group button {\n    width: 100%;\n  }\n}\n\n@font-face {\n  font-family: \"embed-box-icons\";\n  font-style: normal;\n  font-weight: normal;\n  src: url(data:application/x-font-woff;charset=utf-8;base64,d09GRk9UVE8AAAQQAAoAAAAABewAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAARQAAAEw7LPuDUZGVE0AAAIIAAAAGgAAABx04jsnT1MvMgAAAiQAAABLAAAAYGFpBYRjbWFwAAACcAAAAEcAAAFOP7UHcGhlYWQAAAK4AAAALwAAADYGoUQqaGhlYQAAAugAAAAfAAAAJAe/AetobXR4AAADCAAAABAAAAAQCwoAAG1heHAAAAMYAAAABgAAAAYABFAAbmFtZQAAAyAAAADaAAABsE3GDFBwb3N0AAAD/AAAABMAAAAg/50AZnicTY69S8NQFMXvbV5aLI/4GXEIzSJYAh0dXPwXLNpgVymvH6AtpMHJsWglk06CuPXvEPyg9E9wt2SVt/huk2exWUo5HPgdONx7EBgDROTioiWCSqfR6/YBc4BwTKUcuQbtsTo3JGelIrBh2Y2iJfBCFM5GydB04GXdAdhwYLTpwJqDB1tgZjfysA0ueHAYdq5EP+i02mGl0RbXQa97KZpLXvm9OgMA73CI98AQ90+aN+onkgmXKCVpacjd2ST5+pvk5TywE056zgsW+XRrq281rX2m0zROYxXXTtU0zRS/n6lFVhl9mBY90sDW5/RUrZOnhV547JvWLw0Y+fp5/KbLJMgjUX1dlB92Zkd2xIv/gw+CN3icY2BgYGQAggsF9tdA9CWLvytgNABOBQe1AAB4nGNgZopgnMDAysDBasw6k4GBUQ5CM19nSGMSYgACVgYIaGBgYGJAAgFprikMDgzXFazY0v6lMexg/sIgDhRmhCtQAEJGABgTC0oAeJxjYGBgZoBgGQZGBhDwAPIYwXwWBh0gzQakGRmYGK4rWP3/D+RfV7D8//+/FpAFUsUC1s0E5LAxQA0YnoCZibAaAF3eCGYAeJxjYGRgYADisx3H/eL5bb4ycHMwgMAli78rEPT/l8wCzF+AXA4GJpAoAFzJDHkAeJxjYGRgYP7y/yXDDmYBBoZ/b4EkUAQFsAAAloYFrwAEAAAAAf0AAAH9AAADEAAAAABQAAAEAAB4nI2PvQ3CMBCFXyCJxI8oEaULJCpHTiRSMEBKSvoIWVGaWHKYgREYgzEYgDEYgJoXc0UKCizZ/u7euzsbwBI3RBhWhAU2whMkMMJT7HAVjul5CCfkl3CKRbSiM4pnzKxD1cATzLEVnuKIUjim5y6ckJ/CKfkNixoNTw+NFmc4dOgBWzfW6/bsOgajvGSqEF/C7UO9QoGM/1A4cP/u+tVK5nI6NSsMac92rrtUzjdWFZlRBzWazqjUudGFyWn857WnoPfUB1VxwvAunKzvW9epPDN/9fkAFF9DNgAAeJxjYGYAg/+zGNIYsAAALpkCAwA=) format(\"woff\");\n}\na.more:after,\nbutton.more:after,\n.with-more-icon-after:after {\n  font-family: \"embed-box-icons\";\n  position: relative;\n  display: inline-block;\n  vertical-align: baseline;\n  color: inherit;\n  font-style: normal;\n  font-weight: inherit;\n  font-size: 1em;\n  line-height: 1;\n  text-decoration: none;\n  content: \"\\203A\";\n  padding-left: 0.3em;\n}\na.before:before,\n.with-before-icon-before:before {\n  font-family: \"embed-box-icons\";\n  position: relative;\n  display: inline-block;\n  vertical-align: baseline;\n  color: inherit;\n  font-style: normal;\n  font-weight: inherit;\n  font-size: 1em;\n  line-height: 1;\n  text-decoration: none;\n  content: \"\\2039\";\n  padding-right: 0.3em;\n}\n.loading-dots {\n  opacity: 0;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  filter: alpha(opacity=0);\n  -webkit-animation: loading-dots-fadein 0.5s linear forwards;\n  animation: loading-dots-fadein 0.5s linear forwards;\n}\n.loading-dots i {\n  width: 0.5em;\n  height: 0.5em;\n  display: inline-block;\n  vertical-align: middle;\n  background: currentColor;\n  border-radius: 50%;\n  margin: 0 0.25em;\n  -webkit-animation: loading-dots-middle-dots 0.5s linear infinite;\n  animation: loading-dots-middle-dots 0.5s linear infinite;\n}\n.loading-dots i:first-child {\n  -webkit-animation: loading-dots-first-dot 0.5s linear infinite;\n  animation: loading-dots-first-dot 0.5s linear infinite;\n  opacity: 0;\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n  filter: alpha(opacity=0);\n  -webkit-transform: translate(-1em);\n  transform: translate(-1em);\n}\n.loading-dots i:last-child {\n  -webkit-animation: loading-dots-last-dot 0.5s linear infinite;\n  animation: loading-dots-last-dot 0.5s linear infinite;\n}\n@-webkit-keyframes loading-dots-fadein {\n  100% {\n    opacity: 1;\n    -ms-filter: none;\n    -webkit-filter: none;\n            filter: none;\n  }\n}\n@keyframes loading-dots-fadein {\n  100% {\n    opacity: 1;\n    -ms-filter: none;\n    -webkit-filter: none;\n            filter: none;\n  }\n}\n@-webkit-keyframes loading-dots-first-dot {\n  100% {\n    -webkit-transform: translate(1em);\n    transform: translate(1em);\n    opacity: 1;\n    -ms-filter: none;\n    -webkit-filter: none;\n            filter: none;\n  }\n}\n@keyframes loading-dots-first-dot {\n  100% {\n    -webkit-transform: translate(1em);\n    transform: translate(1em);\n    opacity: 1;\n    -ms-filter: none;\n    -webkit-filter: none;\n            filter: none;\n  }\n}\n@-webkit-keyframes loading-dots-middle-dots {\n  100% {\n    -webkit-transform: translate(1em);\n    transform: translate(1em);\n  }\n}\n@keyframes loading-dots-middle-dots {\n  100% {\n    -webkit-transform: translate(1em);\n    transform: translate(1em);\n  }\n}\n@-webkit-keyframes loading-dots-last-dot {\n  100% {\n    -webkit-transform: translate(2em);\n    transform: translate(2em);\n    opacity: 0;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    filter: alpha(opacity=0);\n  }\n}\n@keyframes loading-dots-last-dot {\n  100% {\n    -webkit-transform: translate(2em);\n    transform: translate(2em);\n    opacity: 0;\n    -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\";\n    filter: alpha(opacity=0);\n  }\n}\nhtml,\nbody {\n  width: 100%;\n  height: 100%;\n}\nbody {\n  margin: 0;\n}\ndiv,\nfooter,\nheader,\nmain,\nsection {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: box;\n  display: flex;\n}\n[data-column] {\n  -webkit-box-orient: vertical;\n  -moz-box-orient: vertical;\n  -o-box-orient: vertical;\n  -webkit-box-lines: single;\n  -moz-box-lines: single;\n  -o-box-lines: single;\n  -ms-flex-flow: column nowrap;\n  flex-flow: column nowrap;\n}\n[data-action] {\n  cursor: pointer;\n}\n[data-visibility=\"hidden\"] {\n  visibility: hidden;\n}\n[data-selectable],\n[contenteditable] {\n  cursor: text;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n}\nhtml,\nbody {\n  overflow: hidden;\n}\nhtml {\n  background: transparent;\n}\nmain {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\nbody {\n  background: rgba(0,0,0,0.4);\n  cursor: default;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n", ""]);

// exports


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(13);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(14);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(15);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(16);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(17);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(4);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (label) {pug_html = pug_html + "\u003Cmain" + (" data-column data-component=\"application\""+pug.attr("data-target-count", this.targets.length, true, true)+pug.attr("data-mode", this.mode, true, true)+" role=\"main\"") + "\u003E\u003Cdiv class=\"modal\" data-column\u003E\u003Cheader class=\"modal-header\" role=\"menubar\"\u003E\u003Cbutton data-action=\"previous\" data-ref=\"previousButton\" tabindex=\"1\" role=\"menuitem\"\u003E\u003C\u002Fbutton\u003E\u003Cspan class=\"title\"\u003E" + (pug.escape(null == (pug_interp = label("title")) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cbutton data-action=\"close\" data-ref=\"closeModalButton\" tabindex=\"2\" role=\"menuitem\"\u003E\u003C\u002Fbutton\u003E\u003C\u002Fheader\u003E\u003Cdiv class=\"content\" data-ref=\"content\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fmain\u003E";}.call(this,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(4);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (label) {pug_html = pug_html + "\u003Csection data-column data-component=\"site-type-search\" data-event-receiver\u003E\u003Cheader class=\"header\"\u003E\u003Cinput" + (" class=\"search\""+" autofocus data-ref=\"search\""+pug.attr("placeholder", label("searchPlaceholder"), true, true)+" tabindex=\"3\" type=\"text\"") + "\u003E\u003C\u002Fheader\u003E\u003Cdiv class=\"types\" data-column data-ref=\"typesContainer\"\u003E\u003C\u002Fdiv\u003E\u003Cfooter class=\"modal-footer\"\u003E\u003Cbutton class=\"primary slim more\" data-action=\"next\" data-ref=\"nextButton\" tabindex=\"5\"\u003E" + (pug.escape(null == (pug_interp = label("next")) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E\u003C\u002Ffooter\u003E\u003C\u002Fsection\u003E";}.call(this,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(4);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (label) {pug_html = pug_html + "\u003Csection data-column data-component=\"target-wrapper\"\u003E\u003Cdiv class=\"target-mount\" data-ref=\"targetMount\" tabindex=\"3\"\u003E\u003C\u002Fdiv\u003E\u003Cfooter class=\"modal-footer\"\u003E\u003Cbutton class=\"primary slim\" data-action=\"close\" data-ref=\"doneButton\" tabindex=\"5\"\u003E" + (pug.escape(null == (pug_interp = label("done")) ? "" : pug_interp)) + "\u003C\u002Fbutton\u003E\u003C\u002Ffooter\u003E\u003C\u002Fsection\u003E";}.call(this,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 26 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\" version=\"1.1\" stroke-width=\"1\" stroke-linecap=\"square\"><path d=\"M0,0 L16,16\"></path><path d=\"M0,16 L16,0\"></path></svg>"

/***/ },
/* 27 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"50 50 400 425\" version=\"1.1\"><path d=\"M345.703,126.605c-21.036-13.098-40.882-18.258-60.729-31.356c-12.304-8.335-29.371-28.181-43.66-45.249 c-2.779,27.387-11.114,38.501-20.64,46.439c-20.243,15.876-32.944,20.64-50.408,30.166C155.58,134.146,75.8,181.776,75.8,284.18 C75.8,386.586,161.931,462,257.588,462S436.2,392.539,436.2,287.356C436.2,182.173,358.405,134.543,345.703,126.605z M347.996,424.645c-1.984,1.985-20.242,14.687-41.676,16.671s-50.409,3.175-67.873-12.701c-2.778-2.778-1.984-6.748,0-8.336 c1.984-1.587,3.572-2.778,5.954-2.778c2.381,0,1.984,0,3.175,0.794c7.938,6.351,19.846,11.511,45.249,11.511 c25.402,0,43.264-7.145,51.202-13.098c3.572-2.779,5.16-0.397,5.557,1.19C349.982,419.486,350.775,421.867,347.996,424.645z M278.536,388.526c4.366-3.969,11.511-10.32,18.258-13.099c6.748-2.778,10.32-2.381,16.671-2.381s13.098,0.396,17.861,3.572 c4.763,3.175,7.541,10.319,9.129,14.289c1.588,3.969,0,6.351-3.176,7.938c-2.778,1.587-3.175,0.793-5.953-4.366 c-2.778-5.16-5.16-10.32-19.053-10.32c-13.892,0-18.258,4.763-25.005,10.32c-6.748,5.557-9.13,7.541-11.511,4.366 C273.376,395.671,274.17,392.495,278.536,388.526z M383.719,391.702c-14.289-1.191-42.867-45.646-61.125-46.439 c-23.021-0.794-73.033,48.026-112.328,48.026c-23.815,0-30.959-3.572-38.898-8.731c-11.907-8.336-17.861-21.037-17.464-38.501 c0.397-30.96,29.372-59.935,65.888-60.332c46.439-0.396,78.59,46.043,102.008,45.646c19.846-0.396,57.95-39.295,76.605-39.295 c19.846,0,25.402,20.64,25.402,32.944s-3.969,34.532-13.495,48.424C400.786,387.336,394.833,392.495,383.719,391.702z\"></path></svg>"

/***/ },
/* 28 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 117 108\" version=\"1.1\"><path d=\"M75,33.3846154 L95.3478261,52 L75,69.7692308 L75,85 L114,52 L77.3198276,20.962931 L75,33.3846154 Z\"></path><path d=\"M44,105 L58,90 L74,2.5 L60,18.5 L44,103.5 Z\"></path><path d=\"M42,19 L42,33.0667892 L21.6521739,52 L43,70.7692308 L40.2767241,83.6956897 L3,52 L42,19 Z\"></path></svg>"

/***/ },
/* 29 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 430 422\" version=\"1.1\"><path d=\"M308.584,49.669 C312.281,22 336.007,0.681 364.699,0.681 C396.002,0.681 421.398,26.055 421.398,57.369 C421.398,84.515 402.259,107.177 376.762,112.696 C380.817,123.499 382.957,134.784 382.906,146.068 C382.803,168.156 374.509,188.523 359.487,203.382 L354.09,208.738 L310.713,165.874 C314.43,162.178 316.571,160.037 316.571,160.037 C320.933,155.715 321.896,149.941 321.896,145.824 C321.958,136.546 317.574,126.829 309.956,119.159 C297.074,106.206 278.396,103.01 269.119,112.226 C269.119,112.226 216.444,164.481 172.494,208.072 L129.087,165.187 C173.119,121.483 226.182,68.9 226.182,68.9 C247.676,47.55 279.082,41.405 308.583,49.67 L308.584,49.669 Z M65.27,0.681 C94.003,0.681 117.668,22 121.385,49.669 C150.876,41.406 182.303,47.549 203.817,68.91 C203.817,68.91 205.824,70.927 209.377,74.399 L165.806,117.131 C162.622,113.977 160.86,112.226 160.86,112.226 C151.582,103.01 132.884,106.205 120.013,119.159 C112.425,126.829 108.032,136.546 108.053,145.824 C108.083,149.93 109.067,155.716 113.439,160.037 C113.439,160.037 167.301,213.5 211.016,256.846 L167.466,299.577 L70.473,203.372 C55.461,188.524 47.197,168.157 47.054,146.058 C47.023,134.773 49.153,123.489 53.168,112.686 C27.701,107.167 8.593,84.506 8.593,57.359 C8.603,26.045 33.978,0.681 65.271,0.681 L65.27,0.681 Z M146.904,380.144 C135.528,380.093 124.141,377.81 113.368,373.652 C109.067,400.655 85.679,421.309 57.427,421.309 C26.134,421.309 0.749,395.944 0.749,364.641 C0.749,335.18 23.247,310.973 51.97,308.229 C49.082,299.064 47.577,289.551 47.638,280.049 C47.72,258.003 56.024,237.604 71.006,222.777 C71.006,222.777 72.686,221.097 75.614,218.179 L118.806,261.249 C115.724,264.352 113.952,266.072 113.952,266.072 C109.59,270.434 108.637,276.209 108.637,280.296 C108.617,289.614 112.938,299.301 120.577,306.971 C128.185,314.671 137.873,319.095 147.13,319.136 C151.256,319.136 157.094,318.256 161.425,313.903 C161.425,313.903 214.161,261.587 258.132,217.985 L301.334,261.055 L204.351,357.219 C189.4,372.067 169.013,380.218 146.904,380.147 L146.904,380.144 Z M372.563,421.309 C344.321,421.309 320.923,400.645 316.622,373.652 C305.798,377.81 294.442,380.093 283.086,380.144 C260.988,380.226 240.61,372.075 225.609,357.216 L219.362,351.052 L263.128,308.546 C267.47,312.837 268.586,313.902 268.586,313.902 C272.948,318.254 278.682,319.135 282.83,319.135 C292.066,319.094 301.794,314.671 309.393,306.97 C317.052,299.3 321.395,289.613 321.333,280.295 C321.333,276.22 320.371,270.434 315.977,266.071 C315.977,266.071 265.596,214.236 221.421,170.46 L264.111,127.729 C308.113,171.372 358.974,222.777 358.974,222.777 C373.955,237.604 382.27,257.993 382.352,280.049 C382.434,289.551 380.888,299.064 378.01,308.229 C406.774,310.974 429.272,335.181 429.272,364.641 C429.262,395.955 403.836,421.309 372.563,421.309 L372.563,421.309 Z\"></path></svg>"

/***/ },
/* 30 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\" version=\"1.1\" stroke-width=\"1\" stroke-linecap=\"square\"><path d=\"M12,0 L4,8\"></path><path d=\"M12,16 L4,8\"></path></svg>"

/***/ },
/* 31 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 133 145\" version=\"1.1\"><g stroke-width=\"1\" fill-rule=\"evenodd\"><g transform=\"translate(66, 72) scale(-1, 1) translate(-66, -72) translate(4, 4)\" stroke-width=\"7\"><path d=\"M0.103,95.114 L36.8651,135.85\" stroke-linecap=\"square\" transform=\"translate(18.5, 115.5) scale(-1, 1) translate(-18.5, -115.5) \"></path><ellipse fill=\"none\" cx=\"71\" cy=\"53\" rx=\"53\" ry=\"53\"></ellipse></g></g></svg>"

/***/ },
/* 32 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 123 123\" version=\"1.1\"><path d=\"M61.262,0 C27.483,0 0,27.481 0,61.26 C0,95.043 27.483,122.523 61.262,122.523 C95.04,122.523 122.527,95.043 122.527,61.26 C122.526,27.481 95.04,0 61.262,0 Z M107.376,36.046 C107.602,37.72 107.73,39.517 107.73,41.45 C107.73,46.783 106.734,52.778 103.734,60.274 L87.681,106.687 C103.305,97.576 113.814,80.649 113.814,61.261 C113.815,52.124 111.481,43.532 107.376,36.046 Z M62.184,65.857 L46.416,111.676 C51.124,113.06 56.103,113.817 61.262,113.817 C67.382,113.817 73.251,112.759 78.714,110.838 C78.573,110.613 78.445,110.374 78.34,110.114 L62.184,65.857 Z M96.74,58.608 C96.74,52.113 94.407,47.615 92.406,44.114 C89.742,39.785 87.245,36.119 87.245,31.79 C87.245,26.959 90.909,22.462 96.07,22.462 C96.303,22.462 96.524,22.491 96.751,22.504 C87.401,13.938 74.944,8.708 61.262,8.708 C42.902,8.708 26.749,18.128 17.352,32.396 C18.585,32.433 19.747,32.459 20.734,32.459 C26.231,32.459 34.74,31.792 34.74,31.792 C37.573,31.625 37.907,35.786 35.077,36.121 C35.077,36.121 32.23,36.456 29.062,36.622 L48.2,93.547 L59.701,59.054 L51.513,36.62 C48.683,36.454 46.002,36.119 46.002,36.119 C43.17,35.953 43.502,31.623 46.334,31.79 C46.334,31.79 55.013,32.457 60.177,32.457 C65.673,32.457 74.183,31.79 74.183,31.79 C77.018,31.623 77.351,35.784 74.52,36.119 C74.52,36.119 71.667,36.454 68.505,36.62 L87.497,93.114 L92.739,75.597 C95.011,68.328 96.74,63.107 96.74,58.608 Z M8.708,61.26 C8.708,82.062 20.797,100.039 38.327,108.558 L13.258,39.872 C10.342,46.408 8.708,53.641 8.708,61.26 Z\" fill-rule=\"evenodd\"></path></svg>"

/***/ },
/* 33 */
/***/ function(module, exports) {

/* (ignored) */

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

/* eslint-env node, es6 */

var EmbedBoxBase = __webpack_require__(8).default;

EmbedBoxBase.fetchedTargets = [];

module.exports = EmbedBoxBase;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=embed-box-custom.map