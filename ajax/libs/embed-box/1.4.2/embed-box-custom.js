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
/******/ 	return __webpack_require__(__webpack_require__.s = 42);
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_from__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_from___default = __WEBPACK_IMPORTED_MODULE_0_array_from__ && __WEBPACK_IMPORTED_MODULE_0_array_from__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_array_from__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_array_from__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_array_from___default, 'a', __WEBPACK_IMPORTED_MODULE_0_array_from___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_autobind_decorator__ = __webpack_require__(1);
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
}(), _class2.template = null, _class2.stylesheet = null, _class2.store = null, _temp), (_applyDecoratedDescriptor(_class.prototype, "label", [__WEBPACK_IMPORTED_MODULE_1_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "label"), _class.prototype)), _class);


/***/ },
/* 3 */
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
    str = str || __webpack_require__(41).readFileSync(filename, 'utf8')
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

module.exports = (typeof Array.from === 'function' ?
  Array.from :
  __webpack_require__(9)
);


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_base_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__close_svg__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__close_svg___default = __WEBPACK_IMPORTED_MODULE_1__close_svg__ && __WEBPACK_IMPORTED_MODULE_1__close_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__close_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__close_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__close_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_1__close_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__previous_svg__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__previous_svg___default = __WEBPACK_IMPORTED_MODULE_2__previous_svg__ && __WEBPACK_IMPORTED_MODULE_2__previous_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2__previous_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2__previous_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2__previous_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_2__previous_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__next_svg__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__next_svg___default = __WEBPACK_IMPORTED_MODULE_3__next_svg__ && __WEBPACK_IMPORTED_MODULE_3__next_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3__next_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3__next_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_3__next_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_3__next_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_svg__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_svg___default = __WEBPACK_IMPORTED_MODULE_4__search_svg__ && __WEBPACK_IMPORTED_MODULE_4__search_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_4__search_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_4__search_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_4__search_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_4__search_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__clear_svg__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__clear_svg___default = __WEBPACK_IMPORTED_MODULE_5__clear_svg__ && __WEBPACK_IMPORTED_MODULE_5__clear_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_5__clear_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_5__clear_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_5__clear_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_5__clear_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__copy_svg__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__copy_svg___default = __WEBPACK_IMPORTED_MODULE_6__copy_svg__ && __WEBPACK_IMPORTED_MODULE_6__copy_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_6__copy_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_6__copy_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_6__copy_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_6__copy_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__collapse_svg__ = __webpack_require__(34);
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
  var pathname = window.location.pathname;


  if (route === "" && window.history.pushState && pathname !== "srcdoc") {
    window.history.pushState("", "", pathname);

    return;
  }

  window.location.hash = ROUTE_PREFIX + route;
}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_from__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_from___default = __WEBPACK_IMPORTED_MODULE_0_array_from__ && __WEBPACK_IMPORTED_MODULE_0_array_from__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_array_from__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_array_from__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_array_from___default, 'a', __WEBPACK_IMPORTED_MODULE_0_array_from___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__embed_box_styl__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__embed_box_styl___default = __WEBPACK_IMPORTED_MODULE_1__embed_box_styl__ && __WEBPACK_IMPORTED_MODULE_1__embed_box_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__embed_box_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__embed_box_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__embed_box_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__embed_box_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iframe_styl__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iframe_styl___default = __WEBPACK_IMPORTED_MODULE_2__iframe_styl__ && __WEBPACK_IMPORTED_MODULE_2__iframe_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2__iframe_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2__iframe_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2__iframe_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_2__iframe_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_autobind_decorator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_3_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_3_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_application__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lib_custom_event__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lib_request_animation_frame__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lib_store__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lib_routing__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lib_create_theme_stylesheet__ = __webpack_require__(14);

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
}(), _class2.stylesheet = __WEBPACK_IMPORTED_MODULE_1__embed_box_styl___default.a, _class2.iframeStylesheet = __WEBPACK_IMPORTED_MODULE_2__iframe_styl___default.a, _class2.fetchedTargets = [], _class2.version = "1.4.2", _class2.iframeAttributes = (_class2$iframeAttribu = {
  allowTransparency: ""
}, _class2$iframeAttribu[VISIBILITY_ATTRIBUTE] = "hidden", _class2$iframeAttribu.frameBorder = "0", _class2$iframeAttribu.srcdoc = "<div data-iframe-loader-shim style='display: none;'></div>", _class2$iframeAttribu.src = "about:blank", _class2$iframeAttribu), _temp), (_applyDecoratedDescriptor(_class.prototype, "_handleTransitionEnd", [__WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "_handleTransitionEnd"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "hide", [__WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "hide"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "show", [__WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "show"), _class.prototype)), _class);


/***/ },
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__application_styl__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__application_styl___default = __WEBPACK_IMPORTED_MODULE_0__application_styl__ && __WEBPACK_IMPORTED_MODULE_0__application_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__application_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__application_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__application_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_0__application_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__application_pug__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__application_pug___default = __WEBPACK_IMPORTED_MODULE_1__application_pug__ && __WEBPACK_IMPORTED_MODULE_1__application_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__application_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__application_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__application_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_1__application_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_base_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lib_routing__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_icons__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lib_key_map__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_components_target_search__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_components_target_wrapper__ = __webpack_require__(12);

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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__target_search_pug__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__target_search_pug___default = __WEBPACK_IMPORTED_MODULE_0__target_search_pug__ && __WEBPACK_IMPORTED_MODULE_0__target_search_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__target_search_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__target_search_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__target_search_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__target_search_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__target_search_styl__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__target_search_styl___default = __WEBPACK_IMPORTED_MODULE_1__target_search_styl__ && __WEBPACK_IMPORTED_MODULE_1__target_search_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__target_search_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__target_search_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__target_search_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__target_search_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_base_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_icons__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lib_key_map__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_findindex__ = __webpack_require__(28);
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug___default = __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__ && __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl___default = __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__ && __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_component__ = __webpack_require__(2);

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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_create_stylesheet_template__ = __webpack_require__(13);
/* harmony export */ exports["a"] = createThemeStylesheet;var _templateObject = _taggedTemplateLiteralLoose(["\n    [data-component=\"application\"] .surface {\n      background-color: ", "\n      color: ", "\n    }\n\n    [data-component$=\"-target\"] .copy-container[collapsed] button.collapse {\n      background-color: ", "\n    }\n\n    .surface a, .accent-color {\n      color: ", "\n    }\n\n    .button.primary, button.primary,\n    [data-component=\"target-search\"] .entries .entry[data-selected],\n    [data-component=\"target-search\"] .entries .entry:active,\n    [data-component=\"application\"][is-touch-device=\"true\"] [data-component=\"target-search\"] .entries .entry:hover,\n    .accent-background-color {\n      background: ", "\n    }\n\n    .target-instructions .steps li::before {\n      background: ", "\n    }\n\n    .target-instructions figure [annotation-arrow] svg {\n      fill: ", "\n    }\n  "], ["\n    [data-component=\"application\"] .surface {\n      background-color: ", "\n      color: ", "\n    }\n\n    [data-component$=\"-target\"] .copy-container[collapsed] button.collapse {\n      background-color: ", "\n    }\n\n    .surface a, .accent-color {\n      color: ", "\n    }\n\n    .button.primary, button.primary,\n    [data-component=\"target-search\"] .entries .entry[data-selected],\n    [data-component=\"target-search\"] .entries .entry:active,\n    [data-component=\"application\"][is-touch-device=\"true\"] [data-component=\"target-search\"] .entries .entry:hover,\n    .accent-background-color {\n      background: ", "\n    }\n\n    .target-instructions .steps li::before {\n      background: ", "\n    }\n\n    .target-instructions figure [annotation-arrow] svg {\n      fill: ", "\n    }\n  "]);

function _taggedTemplateLiteralLoose(strings, raw) { strings.raw = raw; return strings; }



function createThemeStylesheet(theme) {
  var stylesheetTemplate = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_lib_create_stylesheet_template__["a" /* default */])(theme);

  return stylesheetTemplate(_templateObject, "backgroundColor", "textColor", "backgroundColor", "accentColor", "accentColor", "stepNumberColor", "screenshotAnnotationColor");
}

/***/ },
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "[data-component=application]{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;max-height:100%;min-height:100%}@media (max-height:24em){[data-component=application]{-ms-flex-pack:start;justify-content:flex-start}}[data-component=application] .branding,[data-component=application] .surface{width:35rem;max-width:100vw}[data-component=application] .surface{background:#fff;min-height:18em;max-width:100vw;-ms-flex:1 1 auto;flex:1 1 auto;overflow:hidden;position:relative;z-index:1}[data-component=application] .branding{display:none;font-size:.8em;-ms-flex-pack:end;justify-content:flex-end;line-height:3;margin-bottom:1em}[data-component=application] .branding a{color:#fff;-webkit-font-smoothing:antialiased;text-decoration:none;text-shadow:0 1px 2px rgba(0,0,0,.7);padding:0 .5em}[data-component=application] .branding a:after{font-size:1.4em}[data-component=application] .header{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;box-shadow:0 1px rgba(0,0,0,.21);-ms-flex:0 0 auto;flex:0 0 auto;-ms-flex-pack:justify;justify-content:space-between;width:100%;max-width:100vw;z-index:1}[data-component=application] .header>*{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}[data-component=application] .header .title{text-align:center;line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100%;display:inline-block}@media (max-width:500px){[data-component=application] .header .title[data-title-char-length=long]{font-size:.8em}[data-component=application] .header .title[data-title-char-length=medium]{font-size:.9em}}@media (max-width:400px){[data-component=application] .header .title[data-title-char-length=medium]{font-size:.8em}[data-component=application] .header .title[data-title-char-length=short]{font-size:.9em}}@media (max-width:360px){[data-component=application] .header .title[data-title-char-length=short]{font-size:.8em}[data-component=application] .header .title[data-title-char-length=puny]{font-size:.9em}}@media (max-width:340px){[data-component=application] .header .title[data-title-char-length=puny]{font-size:.8em}}[data-component=application] .header .button[data-action]{-webkit-appearance:none;-moz-appearance:none;appearance:none;background:inherit;border-radius:0;color:inherit;-ms-flex:0 0 auto;flex:0 0 auto;display:-ms-flexbox;display:flex;height:4em;-ms-flex-pack:center;justify-content:center;padding:0;margin:0;width:4em;transition:opacity .15s ease}[data-component=application] .header .button[data-action]:focus:before{display:none}[data-component=application] .header .button[data-action]:focus,[data-component=application] .header .button[data-action]:hover{background:rgba(0,0,0,.045);box-shadow:none}[data-component=application] .header .button[data-action]>.icon{-ms-flex:1 0 auto;flex:1 0 auto;width:1em;height:1em;stroke:currentColor}[data-component=application] .header .button[data-action]:not(:hover) .icon{stroke-opacity:.5}[data-component=application] .content{transform:translateZ(0);transition:transform .2s ease;-ms-flex:1 1 auto;flex:1 1 auto}[data-component=application] .content>*{margin:0;-ms-flex:1 0 auto;flex:1 0 auto;max-width:100vw;width:100%}[data-component=application][data-route=home] .header [data-action=previous],[data-component=application][data-target-count=\"1\"] .header [data-action=previous]{opacity:0;pointer-events:none}[data-component=application][data-route]:not([data-route=home]) .content{transform:translate3d(-100%,0,0)}[data-component=application][data-transition-state=transitioned] [inert]>*{display:none}[data-component=application][data-mode=modal]{background:rgba(0,0,0,.7)}@media (min-width:769px){[data-component=application][data-mode=modal]{padding:1.5em 0}}[data-component=application][data-mode=modal] .surface{max-height:38em;border-radius:.3125em}@media (min-width:769px){[data-component=application][data-mode=modal] .surface{box-shadow:0 2px 8px rgba(0,0,0,.4)}}@media (max-width:768px){[data-component=application][data-mode=modal] .surface{max-height:100vh;width:100%;border-radius:0}}[data-component=application][data-mode=modal][data-branding=visible]{padding-bottom:0}@media (min-width:769px){[data-component=application][data-mode=modal][data-branding=visible] .branding{display:-ms-flexbox;display:flex}}[data-component=application][data-mode=inline]{background:#ccc;height:100vh;min-height:20em}[data-component=application][data-mode=inline] .surface{height:100vh;max-height:100vh}[data-component=application][data-mode=inline] .header [data-action=close]{opacity:0;pointer-events:none}", ""]);

// exports


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "[data-component=target-search] .header{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;background-color:rgba(0,0,0,.045);box-shadow:0 1px rgba(0,0,0,.21);-ms-flex:0 0 auto;flex:0 0 auto;padding:1em;width:100%;z-index:2}[data-component=target-search] .header label{color:inherit;opacity:.5;margin-bottom:.5em}[data-component=target-search] .header .input-wrapper{position:relative;width:100%;color:#000}[data-component=target-search] .header .input-wrapper>.icon{position:absolute;pointer-events:none;height:1em;width:1em;left:1em;top:0;bottom:0;margin-top:auto;margin-bottom:auto;stroke:currentColor;stroke-opacity:.5}[data-component=target-search] .header .search{background:#fff;color:currentColor;border:0;width:100%;border-radius:5em;padding:.5em 3em}[data-component=target-search] .header .search::-webkit-input-placeholder{color:rgba(0,0,0,.3);font-family:inherit;font-size:1em}[data-component=target-search] .header .search::-moz-placeholder{color:rgba(0,0,0,.3);font-family:inherit;font-size:1em}[data-component=target-search] .header .search:-ms-input-placeholder{color:rgba(0,0,0,.3);font-family:inherit;font-size:1em}[data-component=target-search] .header .search::placeholder{color:rgba(0,0,0,.3);font-family:inherit;font-size:1em}[data-component=target-search] .header .search:focus{outline:none}[data-component=target-search] .header .search-clear{position:absolute;right:0;top:0;bottom:0;padding-left:.75em;width:2.5em;padding-right:.75em;cursor:pointer;transition:opacity .15s ease;opacity:0;pointer-events:none}[data-component=target-search] .header .search-clear:focus:hover{outline:none}[data-component=target-search] .header .search-clear .icon{position:absolute;pointer-events:none;height:1em;width:1em;right:.85em;top:0;bottom:0;margin-top:auto;margin-bottom:auto;stroke:currentColor;stroke-opacity:.5}[data-component=target-search] .header .search-clear:hover .icon{opacity:1}[data-component=target-search] .header .search[data-state=filled]~.search-clear{opacity:1;pointer-events:all}[data-component=target-search] .entries{height:0;-ms-flex:1 0 auto;flex:1 0 auto;overflow:auto;-webkit-overflow-scrolling:touch;z-index:1}@media (max-width:768px){[data-component=application][is-iphone=true] [data-component=target-search] .entries:after{content:\"\";display:block;-ms-flex:0 0 auto;flex:0 0 auto;height:64px}}[data-component=target-search] .entries .entry{position:relative;cursor:pointer;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;-ms-flex:0 0 auto;flex:0 0 auto;padding:1em;overflow:ellipsis;border:1px solid rgba(0,0,0,.063);border-left:0;border-right:0}[data-component=target-search] .entries .entry[data-visible-order=\"-1\"]{display:none}[data-component=target-search] .entries .entry[data-visible-order=\"0\"]{border-top-color:transparent}[data-component=target-search] .entries .entry:last-child{border-bottom-color:transparent}[data-component=target-search] .entries .entry:not(:last-child){margin-bottom:-1px}[data-component=target-search] .entries .entry:not([data-selected]){z-index:1;background:transparent;color:inherit}[data-component=target-search] .entries .entry:not([data-selected]):hover{background:rgba(0,0,0,.045)}[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:not([data-selected]):hover{color:#fff}[data-component=target-search] .entries .entry:focus{outline:none;background:rgba(0,0,0,.045)}[data-component=target-search] .entries .entry .primary{-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;position:relative}[data-component=target-search] .entries .entry .primary:after{pointer-events:none;position:absolute;right:.75em;opacity:0}@media (min-width:400px){[data-component=application][is-touch-device=false] [data-component=target-search] .entries .entry:hover .primary:after{content:attr(data-click-hint-short);opacity:.5}[data-component=application][is-touch-device=false] [data-component=target-search] .entries .entry[data-selected]:not(:hover) .primary:after{content:attr(data-submit-hint-short);opacity:.5}}@media (min-width:460px){[data-component=application][is-touch-device=false] [data-component=target-search] .entries .entry:hover .primary:after{content:attr(data-click-hint)}[data-component=application][is-touch-device=false] [data-component=target-search] .entries .entry[data-selected]:not(:hover) .primary:after{content:attr(data-submit-hint)}}[data-component=target-search] .entries .entry .icon.logo{fill:currentColor;height:2em;margin-right:1em;width:2em}[data-component=target-search] .entries .entry .icon.next{-ms-flex:0 0 auto;flex:0 0 auto;height:1em;opacity:0;stroke:currentColor;width:1em;margin-right:.25em}[data-component=target-search] .entries .entry:focus .icon.next,[data-component=target-search] .entries .entry:hover .icon.next{opacity:.6}[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover .icon.next,[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover:hover .icon.next,[data-component=target-search] .entries .entry:active .icon.next,[data-component=target-search] .entries .entry:active:hover .icon.next,[data-component=target-search] .entries .entry[data-selected] .icon.next,[data-component=target-search] .entries .entry[data-selected]:hover .icon.next{opacity:1}[data-component=target-search] .entries .entry path.is-light-source-facing{opacity:.75}[data-component=target-search] .entries .entry path.is-not-light-source-facing{opacity:1}[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover,[data-component=target-search] .entries .entry:active,[data-component=target-search] .entries .entry[data-selected]{border-color:transparent}[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover,[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover:hover,[data-component=target-search] .entries .entry:active,[data-component=target-search] .entries .entry:active:hover,[data-component=target-search] .entries .entry[data-selected],[data-component=target-search] .entries .entry[data-selected]:hover{z-index:2;color:#fff;box-shadow:none!important}[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover:hover path.is-light-source-facing,[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover path.is-light-source-facing,[data-component=target-search] .entries .entry:active:hover path.is-light-source-facing,[data-component=target-search] .entries .entry:active path.is-light-source-facing,[data-component=target-search] .entries .entry[data-selected]:hover path.is-light-source-facing,[data-component=target-search] .entries .entry[data-selected] path.is-light-source-facing{opacity:1}[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover:hover path.is-not-light-source-facing,[data-component=application][is-touch-device=true] [data-component=target-search] .entries .entry:hover path.is-not-light-source-facing,[data-component=target-search] .entries .entry:active:hover path.is-not-light-source-facing,[data-component=target-search] .entries .entry:active path.is-not-light-source-facing,[data-component=target-search] .entries .entry[data-selected]:hover path.is-not-light-source-facing,[data-component=target-search] .entries .entry[data-selected] path.is-not-light-source-facing{opacity:.5}", ""]);

// exports


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "[data-component$=-target]{-ms-flex:1 1 auto;flex:1 1 auto;overflow:auto;-webkit-overflow-scrolling:touch}[data-component$=-target] [data-content-slot]{background:rgba(0,0,0,.045);display:block;margin:1em;padding:1em;text-align:center}[data-component$=-target] .copy-container{position:relative;margin:2.5rem 0 2.25rem;max-width:100vw;background:rgba(0,0,0,.045);box-shadow:0 0 0 1px rgba(0,0,0,.21)}[data-component$=-target] .copy-container button.run{position:absolute;padding:.4em 1.125em .4em 2.4em;margin:0;height:2.3em;top:-1.1em;width:6em;left:calc(50% - 3em)}[data-component$=-target] .copy-container button.run,[data-component$=-target] .copy-container button.run:before{border-radius:99em}[data-component$=-target] .copy-container button.run>svg{position:absolute;height:15px;width:15px;top:0;bottom:0;margin-top:auto;margin-bottom:auto;left:1.125em;stroke:currentColor}[data-component$=-target] .copy-container button.run:after{content:\"Copied\";position:absolute;display:inline-block;top:.25em;left:0;right:0;color:#000;margin:auto;pointer-events:none;opacity:0}[data-component$=-target] .copy-container button.run[data-status=copied]:after{animation:copied .4s ease;animation-fill-mode:forwards;opacity:1}[data-component$=-target] .copy-container>.copyable{display:block;font-size:.8em;font-family:Monaco,Bitstream Vera Sans Mono,Lucida Console,Terminal,monospace;margin:0;padding:1.3em;padding-top:2.8em;white-space:pre-wrap;width:100%;word-wrap:break-word}[data-component$=-target] .copy-container>.copyable:focus{outline:none}[data-component$=-target] .copy-container[collapsed]>.copyable{transition:max-height .25s ease;max-height:80vh;overflow:hidden}[data-component$=-target] .copy-container[collapsed][collapsed=true]>.copyable{max-height:7em}[data-component$=-target] .copy-container[collapsed] button.collapse{position:absolute;height:1.7em;width:2.75em;bottom:-.85em;left:calc(50% - 1.375em);margin:0;padding:0;color:inherit;box-shadow:0 0 0 1px rgba(0,0,0,.21)}[data-component$=-target] .copy-container[collapsed] button.collapse,[data-component$=-target] .copy-container[collapsed] button.collapse:before{border-radius:99em}[data-component$=-target] .copy-container[collapsed] button.collapse:hover:not(:focus){box-shadow:0 0 0 1px rgba(0,0,0,.21),0 .1875em .375em -.1875em rgba(0,0,0,.3)}[data-component$=-target] .copy-container[collapsed] button.collapse:hover:active{box-shadow:0 0 0 1px rgba(0,0,0,.21),inset 0 .125em .375em rgba(0,0,0,.15)}[data-component$=-target] .copy-container[collapsed] button.collapse:not(:hover):focus:before{opacity:.15}[data-component$=-target] .copy-container[collapsed] button.collapse:hover:focus:before{opacity:0}[data-component$=-target] .copy-container[collapsed] button.collapse>svg{display:block;position:absolute;top:0;right:0;bottom:0;left:0;height:1em;width:1em;margin:auto;pointer-events:none;transform:rotate(0deg);transition:transform .25s ease;stroke:currentColor;stroke-opacity:.5}[data-component$=-target] .copy-container[collapsed] button.collapse:focus>svg,[data-component$=-target] .copy-container[collapsed] button.collapse:hover>svg{stroke-opacity:.75}[data-component$=-target] .copy-container[collapsed][collapsed=false] button.collapse>svg{transform:rotate(-180deg)}.target-instructions{cursor:auto;display:block;-ms-flex:1 1 auto;flex:1 1 auto;height:0;padding-bottom:1em;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}.target-instructions figure{margin:2em 0;position:relative}.target-instructions figure[data-component=screenshot],.target-instructions figure img{background:#fff;display:block;max-width:100%}.target-instructions figure[data-component=screenshot]{height:0;overflow:hidden;padding-left:0;padding-right:0;padding-top:0;position:relative;width:100%}.target-instructions figure[data-component=screenshot] iframe{border:0;left:0;opacity:0;position:absolute;top:0;transform-origin:0 0}.target-instructions figure[data-component=screenshot][data-render-state=scaled] iframe{opacity:1}.target-instructions figure:after{content:\"\";position:absolute;display:block;cursor:default;border:1px solid rgba(0,0,0,.21);z-index:1;top:0;right:0;bottom:0;left:0}[data-component=application][data-mode=modal] .target-instructions figure:after{border-left:0;border-right:0}@media (max-width:768px){[data-component=application][data-mode=modal] .target-instructions figure:after{border:1px solid rgba(0,0,0,.21)}}@media (max-width:35.125rem){.target-instructions figure:after,[data-component=application][data-mode=modal] .target-instructions figure:after{border-left:0;border-right:0}}.target-instructions figure [annotation-arrow]{position:absolute}.target-instructions figure [annotation-arrow]>div{position:absolute;top:0;left:0;height:0;width:100%}.target-instructions figure [annotation-arrow] svg{position:absolute;top:0;left:0;width:100%;height:100%}.target-instructions figure [annotation-arrow][data-svg-view-box=\"0 0 83 114\"]>div{padding-bottom:137.35%}.target-instructions figure [annotation-arrow][data-svg-view-box=\"0 0 127 73\"]>div{padding-bottom:57.48%}.target-instructions,.target-instructions :focus{outline:none}.target-instructions .target-title{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;padding:2em 4em 1.6em;text-align:center;background:rgba(0,0,0,.045);box-shadow:0 1px rgba(0,0,0,.21)}@media (max-width:568px){.target-instructions .target-title{padding-left:2em;padding-right:2em}}@media (max-width:22.5em){.target-instructions .target-title{padding-left:1.5em;padding-right:1.5em}}.target-instructions .target-title .icon{height:3em;width:3em;margin-bottom:1em}.target-instructions .target-title .icon>svg{display:block;width:100%;fill:currentColor}.target-instructions .target-title .icon path.is-light-source-facing{opacity:.75}.target-instructions .target-title .icon path.is-not-light-source-facing{opacity:1}.target-instructions .target-title h1{font-size:1.25em;font-weight:300;margin:0 0 .5em;text-align:center}.target-instructions .target-title h1:last-child{margin-bottom:0}.target-instructions .target-title .versions{-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;font-size:.9em}.target-instructions .target-title .versions .label{margin-right:.5em;opacity:.5}.target-instructions .target-title .versions select{display:inline-block;border:1px solid rgba(0,0,0,.21);background:transparent;cursor:pointer;font-family:inherit;font-size:inherit;color:inherit}.target-instructions .target-title .versions select:not(:hover){opacity:.5}.target-instructions .target-title .versions select:focus{outline:none;border:1px dashed currentColor}.target-instructions ol.steps{width:35rem;max-width:100%;margin:0 auto;counter-reset:item 0;list-style:none;padding:2em 0 0}@media (max-width:768px){[data-component=application][is-iphone=true] .target-instructions ol.steps:after{content:\"\";display:block;-ms-flex:0 0 auto;flex:0 0 auto;height:64px}}.target-instructions ol.steps div,.target-instructions ol.steps footer,.target-instructions ol.steps header,.target-instructions ol.steps section{display:block}.target-instructions ol.steps li{counter-increment:item;margin:1em 0;padding:0;position:relative}.target-instructions ol.steps li:first-child{margin-top:0}.target-instructions ol.steps li+li{margin-top:3.5em}.target-instructions ol.steps li:first-child>:first-child{margin-top:0}.target-instructions ol.steps li:last-child>:last-child{margin-bottom:0}.target-instructions ol.steps li:before{background:rgba(0,0,0,.045);border-radius:50%;color:#fff;content:counter(item);display:inline-block;left:0;line-height:2em;margin-left:1em;position:absolute;text-align:center;top:-.2em;width:2em}.target-instructions ol.steps li>h1,.target-instructions ol.steps li>h2,.target-instructions ol.steps li>p{margin:1em 2em 1em 4em}@media (max-width:568px){.target-instructions ol.steps li>h1,.target-instructions ol.steps li>h2,.target-instructions ol.steps li>p{margin-right:1em}}.target-instructions h2{font-size:1em;font-weight:400;margin-top:3em}.target-instructions>:first-child{margin-top:0}.target-instructions>:last-child{margin-bottom:0}@-webkit-keyframes copied{0%,to{opacity:0}50%{opacity:1;transform:translate3d(0,-1.8em,0)}to{transform:translate3d(0,-1.8em,0)}}@keyframes copied{0%,to{opacity:0}50%{opacity:1;transform:translate3d(0,-1.8em,0)}to{transform:translate3d(0,-1.8em,0)}}", ""]);

// exports


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, ".embed-box{display:block}.embed-box[data-mode=inline]{width:100%;height:576px;min-height:320px;max-height:100vh}.embed-box[data-mode=modal]{position:fixed!important;z-index:100000!important;top:0!important;right:0!important;bottom:0!important;left:0!important;height:100%!important;width:100%!important;max-height:100vh!important;max-width:100vw!important;transition:opacity .1s linear!important;opacity:0}@media (max-width:768px){.embed-box[data-mode=modal]{position:absolute!important}}body[data-embed-box-scroll-state=locked]{overflow:hidden!important}@media (max-width:768px){body[data-embed-box-scroll-state=locked],html[data-embed-box-scroll-state=locked]{position:fixed!important;overflow:hidden!important;top:0!important;right:0!important;bottom:0!important;left:0!important}}.embed-box-download-iframe{position:fixed;z-index:-99999;visibility:hidden;width:1px;height:1px}[data-embed-box-scroll-state]{height:100%}", ""]);

// exports


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "article,aside,details,figcaption,figure,footer,header,hgroup,nav,section,summary{display:block}audio,canvas,video{display:inline;zoom:1}audio:not([controls]){display:none;height:0}[hidden]{display:none}html{font-size:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%}body{margin:0;text-rendering:optimizeLegibility}button,input,select,textarea{font-family:inherit;font-size:inherit;margin:0}button,input{line-height:normal}button,input[type=button],input[type=reset],input[type=submit]{cursor:pointer}button[disabled],input[type=button][disabled],input[type=reset][disabled],input[type=submit][disabled]{cursor:not-allowed}button::-moz-focus-inner,input::-moz-focus-inner{border:0;padding:0}a:focus{outline:thin dotted}a:active,a:hover{outline:0}abbr[title]{border-bottom:thin dotted}b,strong{font-weight:700}dfn{font-style:italic}pre{white-space:pre-wrap;word-wrap:break-word}img{border:0;-ms-interpolation-mode:bicubic}svg:not(:root){overflow:hidden}textarea{overflow:auto;-webkit-overflow-scrolling:touch;vertical-align:top;resize:vertical}table{border-collapse:collapse;border-spacing:0}figure,form{margin:0}dl,menu,ol,p,pre,ul{margin:1em 0}*,:after,:before{box-sizing:border-box}html{font-size:16px}.button,body{font-family:Avenir New,Avenir,Helvetica Neue,sans-serif}.button{-webkit-font-smoothing:subpixel-antialiased;-moz-osx-font-smoothing:auto;position:relative;text-rendering:optimizeLegibility;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-appearance:none;-moz-appearance:none;appearance:none;display:inline-block;cursor:pointer;border:0;border-radius:.1875em;font-size:1em;padding:.6em 2em;margin:0;text-align:center;font-weight:300;letter-spacing:.04em;text-indent:.04em;text-decoration:none}@media screen and (-webkit-min-device-pixel-ratio:0){.button{font-weight:400}}@media all and (-webkit-min-device-pixel-ratio:0) and (-webkit-min-device-pixel-ratio:0.001),all and (-webkit-min-device-pixel-ratio:0) and (min-resolution:0.001dppx){.button{font-weight:300}}.button:hover{text-decoration:none}.button[disabled]{opacity:.7}.button[disabled]:focus,.button[disabled]:focus:hover,.button[disabled]:hover{box-shadow:none!important}.button:hover{box-shadow:0 .1875em .375em -.1875em rgba(0,0,0,.325)}.button:hover:active{box-shadow:inset 0 .125em .375em rgba(0,0,0,.325)}.button:focus{outline:none}.button:focus:before{content:\"\";position:absolute;z-index:1;top:2px;right:2px;bottom:2px;left:2px;border-radius:.1em;box-shadow:inset 0 0 0 1px currentColor;pointer-events:none;transition:opacity .3s ease-in-out}.button:focus:active:before{opacity:0}.button.primary{background:#000;color:#fff}@font-face{font-family:embed-box-icons;font-style:normal;font-weight:400;src:url(data:application/x-font-woff;charset=utf-8;base64,d09GRk9UVE8AAAQQAAoAAAAABewAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAARQAAAEw7LPuDUZGVE0AAAIIAAAAGgAAABx04jsnT1MvMgAAAiQAAABLAAAAYGFpBYRjbWFwAAACcAAAAEcAAAFOP7UHcGhlYWQAAAK4AAAALwAAADYGoUQqaGhlYQAAAugAAAAfAAAAJAe/AetobXR4AAADCAAAABAAAAAQCwoAAG1heHAAAAMYAAAABgAAAAYABFAAbmFtZQAAAyAAAADaAAABsE3GDFBwb3N0AAAD/AAAABMAAAAg/50AZnicTY69S8NQFMXvbV5aLI/4GXEIzSJYAh0dXPwXLNpgVymvH6AtpMHJsWglk06CuPXvEPyg9E9wt2SVt/huk2exWUo5HPgdONx7EBgDROTioiWCSqfR6/YBc4BwTKUcuQbtsTo3JGelIrBh2Y2iJfBCFM5GydB04GXdAdhwYLTpwJqDB1tgZjfysA0ueHAYdq5EP+i02mGl0RbXQa97KZpLXvm9OgMA73CI98AQ90+aN+onkgmXKCVpacjd2ST5+pvk5TywE056zgsW+XRrq281rX2m0zROYxXXTtU0zRS/n6lFVhl9mBY90sDW5/RUrZOnhV547JvWLw0Y+fp5/KbLJMgjUX1dlB92Zkd2xIv/gw+CN3icY2BgYGQAggsF9tdA9CWLvytgNABOBQe1AAB4nGNgZopgnMDAysDBasw6k4GBUQ5CM19nSGMSYgACVgYIaGBgYGJAAgFprikMDgzXFazY0v6lMexg/sIgDhRmhCtQAEJGABgTC0oAeJxjYGBgZoBgGQZGBhDwAPIYwXwWBh0gzQakGRmYGK4rWP3/D+RfV7D8//+/FpAFUsUC1s0E5LAxQA0YnoCZibAaAF3eCGYAeJxjYGRgYADisx3H/eL5bb4ycHMwgMAli78rEPT/l8wCzF+AXA4GJpAoAFzJDHkAeJxjYGRgYP7y/yXDDmYBBoZ/b4EkUAQFsAAAloYFrwAEAAAAAf0AAAH9AAADEAAAAABQAAAEAAB4nI2PvQ3CMBCFXyCJxI8oEaULJCpHTiRSMEBKSvoIWVGaWHKYgREYgzEYgDEYgJoXc0UKCizZ/u7euzsbwBI3RBhWhAU2whMkMMJT7HAVjul5CCfkl3CKRbSiM4pnzKxD1cATzLEVnuKIUjim5y6ckJ/CKfkNixoNTw+NFmc4dOgBWzfW6/bsOgajvGSqEF/C7UO9QoGM/1A4cP/u+tVK5nI6NSsMac92rrtUzjdWFZlRBzWazqjUudGFyWn857WnoPfUB1VxwvAunKzvW9epPDN/9fkAFF9DNgAAeJxjYGYAg/+zGNIYsAAALpkCAwA=) format(\"woff\")}.with-more-icon-after:after,a.more:after,button.more:after{content:\"\\203A\";padding-left:.3em}.with-before-icon-before:before,.with-more-icon-after:after,a.before:before,a.more:after,button.more:after{font-family:embed-box-icons;position:relative;display:inline-block;vertical-align:baseline;color:inherit;font-style:normal;font-weight:inherit;font-size:1em;line-height:1;text-decoration:none}.with-before-icon-before:before,a.before:before{content:\"\\2039\";padding-right:.3em}a.more:not(.button):after{padding-right:.3em}.with-more-icon-after:empty:after{padding-left:.15em;padding-right:.15em}.loading-dots{opacity:0;animation:loading-dots-fadein .5s linear forwards}.loading-dots[data-state=loaded] i,.loading-dots[data-state=loaded] i:first-child,.loading-dots[data-state=loaded] i:last-child{opacity:0;animation-play-state:paused}.loading-dots i{width:.5em;height:.5em;display:inline-block;vertical-align:middle;background:currentColor;border-radius:50%;margin:0 .25em;animation:loading-dots-middle-dots .5s linear infinite}.loading-dots i:first-child{animation:loading-dots-first-dot .5s linear infinite;opacity:0;transform:translate(-1em)}.loading-dots i:last-child{animation:loading-dots-last-dot .5s linear infinite}@-webkit-keyframes loading-dots-fadein{to{opacity:1}}@keyframes loading-dots-fadein{to{opacity:1}}@-webkit-keyframes loading-dots-first-dot{to{transform:translate(1em);opacity:1}}@keyframes loading-dots-first-dot{to{transform:translate(1em);opacity:1}}@-webkit-keyframes loading-dots-middle-dots{to{transform:translate(1em)}}@keyframes loading-dots-middle-dots{to{transform:translate(1em)}}@-webkit-keyframes loading-dots-last-dot{to{transform:translate(2em);opacity:0}}@keyframes loading-dots-last-dot{to{transform:translate(2em);opacity:0}}body,html{height:100%}body{margin:0}div,footer,header,main,section{display:-ms-flexbox;display:flex}[data-flow=column]{-ms-flex-flow:column nowrap;flex-flow:column}[data-action]{cursor:pointer}[data-action],[tabindex]{-webkit-tap-highlight-color:transparent}[contenteditable],[data-selectable]{cursor:text;-webkit-user-select:text;-moz-user-select:text;-ms-user-select:text;user-select:text}body,html{overflow:hidden}html{background:transparent}main{height:100%;overflow:hidden}body{background:transparent;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}", ""]);

// exports


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(18);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(19);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(20);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(21);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

// css-to-string-loader: transforms styles from css-loader to a string output

// Get the styles
var styles = __webpack_require__(22);

if (typeof styles === 'string') {
  // Return an existing string
  module.exports = styles;
} else {
  // Call the custom toString method from css-loader module
  module.exports = styles.toString();
}

/***/ },
/* 28 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(39), __webpack_require__(40)(module)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(3);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (config) {pug_html = pug_html + "\u003Cmain" + (pug.attr("data-branding", (config.branding ? "visible" : "hidden"), true, true)+" data-flow=\"column\" data-component=\"application\""+pug.attr("data-target-count", this.targets.length, true, true)+pug.attr("data-mode", config.mode, true, true)+" role=\"main\"") + "\u003E\u003Cdiv class=\"surface\" data-flow=\"column\"\u003E\u003Cheader class=\"header\" role=\"menubar\"\u003E\u003Cdiv class=\"button\" data-action=\"previous\" data-ref=\"previousButton\" tabindex=\"1\" role=\"menuitem\"\u003E\u003C\u002Fdiv\u003E\u003Cspan class=\"title\" data-ref=\"title\"\u003E\u003C\u002Fspan\u003E\u003Cdiv class=\"button\" data-action=\"close\" data-ref=\"closeModalButton\" tabindex=\"2\" role=\"menuitem\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fheader\u003E\u003Cdiv class=\"content\" data-ref=\"content\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"branding\"\u003E\u003Ca" + (" class=\"with-more-icon-after\""+pug.attr("href", config.projectUrl, true, true)+" target=\"_blank\"") + "\u003EPowered by EmbedBox\u003C\u002Fa\u003E\u003C\u002Fdiv\u003E\u003C\u002Fmain\u003E";}.call(this,"config" in locals_for_with?locals_for_with.config:typeof config!=="undefined"?config:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(3);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (label) {pug_html = pug_html + "\u003Csection data-flow=\"column\" data-component=\"target-search\" data-event-receiver\u003E\u003Cheader class=\"header\" data-flow=\"column\"\u003E\u003Clabel for=\"search-input\"\u003E" + (pug.escape(null == (pug_interp = label("searchHeader")) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003Cdiv class=\"input-wrapper\" data-ref=\"inputWrapper\"\u003E\u003Cinput" + (" class=\"search\""+" id=\"search-input\" data-ref=\"search\""+pug.attr("placeholder", label("searchPlaceholder"), true, true)+" spellcheck=\"false\" tabindex=\"3\" type=\"text\"") + "\u003E\u003Cdiv class=\"search-clear\" data-ref=\"searchClear\" tabindex=\"3\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fheader\u003E\u003Cdiv class=\"entries\" data-flow=\"column\" data-ref=\"entriesContainer\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";}.call(this,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(3);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection data-flow=\"column\" data-component=\"target-wrapper\"\u003E\u003Cdiv class=\"target-mount\" data-ref=\"targetMount\" tabindex=\"3\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 32 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"-3 -3 22 22\" stroke-linecap=\"round\"><path d=\"M1 1l14 14M1 15L15 1\"></path></svg>"

/***/ },
/* 33 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\" stroke-linecap=\"round\"><path d=\"M1 1l14 14M1 15L15 1\"></path></svg>"

/***/ },
/* 34 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 -1 16 9\" stroke-linecap=\"round\"><path d=\"M1 1l7 7M8 8l7-7\"></path></svg>"

/***/ },
/* 35 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 15 15\" stroke-linecap=\"round\"><path d=\"M7.5 10.5L3.5 6.5M7.5 10.5L11.5 6.5M7.5 10.5L7.5 1.5M13.5 13.5L1.5 13.5M1.5 13.5L1.5 11.5M13.5 13.5L13.5 11.5\"></path></svg>"

/***/ },
/* 36 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\" stroke-linecap=\"round\"><path d=\"M4 1l7 7M4 15l7-7\"></path></svg>"

/***/ },
/* 37 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\" stroke-linecap=\"round\"><path d=\"M11 1L4 8M11 15L4 8\"></path></svg>"

/***/ },
/* 38 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\" stroke-width=\"1\" stroke-linecap=\"round\"><circle cx=\"6.5\" cy=\"6.5\" r=\"5.5\" fill=\"none\"></circle><path d=\"M10.5,10.5 L15,15\"></path></svg>"

/***/ },
/* 39 */
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
/* 40 */
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
/* 41 */
/***/ function(module, exports) {

/* (ignored) */

/***/ },
/* 42 */
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