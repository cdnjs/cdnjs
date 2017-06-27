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
/******/ 	return __webpack_require__(__webpack_require__.s = 38);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_from__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_array_from___default = __WEBPACK_IMPORTED_MODULE_0_array_from__ && __WEBPACK_IMPORTED_MODULE_0_array_from__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0_array_from__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0_array_from__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0_array_from___default, 'a', __WEBPACK_IMPORTED_MODULE_0_array_from___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_autobind_decorator__ = __webpack_require__(2);
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
      element: null,
      refs: {}
    }, spec);

    var stylesheet = this.constructor.stylesheet;

    var iframeDocument = this.store.iframe.document;

    if (stylesheet && !iframeDocument.head.contains(this.constructor.style)) {
      // Common style tag has yet to be inserted in iframe.
      var style = this.constructor.style = iframeDocument.createElement("style");

      style.innerHTML = stylesheet;
      iframeDocument.head.appendChild(style);
    }
  }

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
    str = str || __webpack_require__(37).readFileSync(filename, 'utf8')
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_base_component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__close_svg__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__close_svg___default = __WEBPACK_IMPORTED_MODULE_1__close_svg__ && __WEBPACK_IMPORTED_MODULE_1__close_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__close_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__close_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__close_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_1__close_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__previous_svg__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__previous_svg___default = __WEBPACK_IMPORTED_MODULE_2__previous_svg__ && __WEBPACK_IMPORTED_MODULE_2__previous_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2__previous_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2__previous_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2__previous_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_2__previous_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__next_svg__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__next_svg___default = __WEBPACK_IMPORTED_MODULE_3__next_svg__ && __WEBPACK_IMPORTED_MODULE_3__next_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3__next_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3__next_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_3__next_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_3__next_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_svg__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__search_svg___default = __WEBPACK_IMPORTED_MODULE_4__search_svg__ && __WEBPACK_IMPORTED_MODULE_4__search_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_4__search_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_4__search_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_4__search_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_4__search_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__clear_svg__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__clear_svg___default = __WEBPACK_IMPORTED_MODULE_5__clear_svg__ && __WEBPACK_IMPORTED_MODULE_5__clear_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_5__clear_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_5__clear_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_5__clear_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_5__clear_svg___default);

/* harmony export */ __webpack_require__.d(exports, "svgToComponent", function() { return svgToComponent; });
/* harmony export */ __webpack_require__.d(exports, "close", function() { return close; });
/* harmony export */ __webpack_require__.d(exports, "previous", function() { return previous; });
/* harmony export */ __webpack_require__.d(exports, "next", function() { return next; });
/* harmony export */ __webpack_require__.d(exports, "search", function() { return search; });
/* harmony export */ __webpack_require__.d(exports, "clear", function() { return clear; });var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__embed_box_styl__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__embed_box_styl___default = __WEBPACK_IMPORTED_MODULE_1__embed_box_styl__ && __WEBPACK_IMPORTED_MODULE_1__embed_box_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__embed_box_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__embed_box_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__embed_box_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__embed_box_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iframe_styl__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iframe_styl___default = __WEBPACK_IMPORTED_MODULE_2__iframe_styl__ && __WEBPACK_IMPORTED_MODULE_2__iframe_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2__iframe_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2__iframe_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2__iframe_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_2__iframe_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_autobind_decorator__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_3_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_3_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_base_component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_components_application__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lib_custom_event__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_lib_request_animation_frame__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_lib_store__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_lib_routing__ = __webpack_require__(7);

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












var VISIBILITY_ATTRIBUTE = "data-visibility";
var SCROLL_STATE_ATTRIBUTE = "data-embed-box-scroll-state";
var storeReceivers = void 0;

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

    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7_lib_request_animation_frame__["a" /* default */])(window);

    var _constructor = this.constructor;
    var iframeAttributes = _constructor.iframeAttributes;
    var stylesheet = _constructor.stylesheet;

    var store = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_8_lib_store__["a" /* createStore */])(spec);
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
    var _spec$theme = spec.theme;
    var theme = _spec$theme === undefined ? {} : _spec$theme;

    // HACK: Custom targets have a different BaseComponent instance.
    // This ensures all components have access to the store.

    storeReceivers = [__WEBPACK_IMPORTED_MODULE_4_components_base_component__["a" /* default */]].concat(customTargets);

    storeReceivers.forEach(function (Receiver) {
      Object.defineProperty(Receiver.prototype, "store", {
        configurable: true,
        get: function get() {
          return store;
        }
      });
    });

    Object.keys(iframeAttributes).forEach(function (key) {
      return iframe.element.setAttribute(key, iframeAttributes[key]);
    });

    iframe.element.className = "embed-box " + className;
    iframe.element.style.display = "none";
    iframe.element.addEventListener("transitionend", this._handleTransitionEnd);

    _extends(this, {
      destroyed: false,
      _visible: false,
      _previousContainerScrollPosition: null,
      iframe: iframe,
      container: container,
      events: spec.events || {},
      theme: _extends({}, this.constructor.theme, theme),
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
      initialTarget = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_lib_routing__["b" /* getRoute */])();

      if (!visibleTargets.some(function (_ref2) {
        var id = _ref2.id;
        return id === initialTarget;
      })) initialTarget = null;
    }

    this.iframe.element.onload = function () {
      // :active style fix for Safari
      iframe.document.addEventListener("touchstart", function () {}, true);

      _this._appendIframeStylesheet(spec.style);
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6_lib_custom_event__["a" /* default */])(iframe);

      _this.application = new __WEBPACK_IMPORTED_MODULE_5_components_application__["a" /* default */](_this.iframe.document.body, {
        initialTarget: initialTarget,
        onClose: _this.hide,
        targets: visibleTargets.map(function (Target) {
          return new Target({ config: getConfig(Target) });
        })
      });

      if (autoShow || _this._pendingShow) _this.show();

      if (_this.events.onLoad) _this.events.onLoad.call(_this);
    };

    this.container.appendChild(iframe.element); // iframe window & document is now accessible.
  }

  EmbedBoxBase.prototype._syncScrollState = function _syncScrollState(nextVisible) {
    var _this2 = this;

    var next = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

    // NOTE: The scroll state should be only be synced when the user cannot see
    // the update. Call this method only while the modal is opaque.

    var container = this.container;
    var _document = document;
    var documentElement = _document.documentElement;

    var nextValue = nextVisible && !this.destroyed ? "locked" : "unlocked";

    var checkLockState = function checkLockState() {
      if (nextValue === "unlocked") {
        container.scrollTop = _this2._previousContainerScrollPosition;
        _this2._previousContainerScrollPosition = null;
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
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9_lib_routing__["a" /* setRoute */])("");
    }
  };

  EmbedBoxBase.prototype._appendIframeStylesheet = function _appendIframeStylesheet() {
    var extension = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
    var theme = this.theme;
    var iframeStylesheet = this.constructor.iframeStylesheet;

    var style = this.iframe.document.createElement("style");

    var $ = function $(value) {
      return value + " !important";
    };

    style.innerHTML = iframeStylesheet + ("\n      [data-component=\"application\"] .modal {\n        background-color: " + $(theme.backgroundColor) + ";\n        color: " + $(theme.textColor) + ";\n      }\n\n      a, .accent-color {\n        color: " + $(theme.accentColor) + ";\n      }\n\n      .button.primary, button.primary,\n      [data-component=\"target-search\"] .entries .entry[data-selected],\n      [data-component=\"target-search\"] .entries .entry:active,\n      [data-component=\"application\"][is-touch-device=\"true\"] [data-component=\"target-search\"] .entries .entry:hover,\n      .accent-background-color {\n        background: " + $(theme.accentColor) + ";\n      }\n\n      .target-instructions .steps li:before {\n        background: " + $(theme.accentColor) + ";\n      }\n    ") + extension;

    this.iframe.document.head.appendChild(style);
  };

  EmbedBoxBase.prototype.destroy = function destroy() {
    this.destroyed = true;
    this.visible = false;

    __WEBPACK_IMPORTED_MODULE_0_array_from___default()(document.querySelectorAll(".embed-box-download-iframe")).forEach(removeElement);

    removeElement(this.iframe.element);
    removeElement(this.style);

    storeReceivers.forEach(function (Receiver) {
      return delete Receiver.prototype.store;
    });
  };

  EmbedBoxBase.prototype.hide = function hide() {
    if (!this.visible) return;

    this.visible = false;
  };

  EmbedBoxBase.prototype.show = function show() {
    if (!this.application) {
      this._pendingShow = true;
      return;
    }

    if (this.visible) return;

    this.visible = true;

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
      var mode = this._container.tagName === "BODY" ? "modal" : "inline";

      this._store.mode = mode;
      iframeElement.setAttribute("data-mode", mode);

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
    key: "_store",
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_4_components_base_component__["a" /* default */].prototype.store || {};
    }
  }, {
    key: "visible",
    get: function get() {
      return this._visible;
    },
    set: function set(willBeVisible) {
      var _this3 = this;

      var currentlyVisible = this._visible;

      var update = function update() {
        _this3._visible = willBeVisible;
        var element = _this3.iframe.element;


        if (willBeVisible) element.style.display = "";

        requestAnimationFrame(function () {
          element.style.opacity = willBeVisible ? 1 : 0;
          element.setAttribute(VISIBILITY_ATTRIBUTE, willBeVisible ? "visible" : "hidden");

          if (_this3.events.visibilityChange) _this3.events.visibilityChange.call(_this3, willBeVisible);
        });
      };

      if (this.destroyed && currentlyVisible || !willBeVisible && currentlyVisible) {
        this._syncScrollState(willBeVisible, update);
      } else if (!this.destroyed && !currentlyVisible) {
        update();
      }

      return willBeVisible;
    }
  }]);

  return EmbedBoxBase;
}(), _class2.stylesheet = __WEBPACK_IMPORTED_MODULE_1__embed_box_styl___default.a, _class2.iframeStylesheet = __WEBPACK_IMPORTED_MODULE_2__iframe_styl___default.a, _class2.fetchedTargets = [], _class2.iframeAttributes = (_class2$iframeAttribu = {
  allowTransparency: ""
}, _class2$iframeAttribu[VISIBILITY_ATTRIBUTE] = "hidden", _class2$iframeAttribu.frameBorder = "0", _class2$iframeAttribu.srcdoc = "<div data-iframe-loader-shim style='display: none;'></div>", _class2$iframeAttribu.src = "about:blank", _class2$iframeAttribu), _class2.theme = {
  accentColor: "#2d88f3",
  backgroundColor: "#ffffff",
  textColor: "#000000"
}, _temp), (_applyDecoratedDescriptor(_class.prototype, "_handleTransitionEnd", [__WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "_handleTransitionEnd"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "hide", [__WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "hide"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "show", [__WEBPACK_IMPORTED_MODULE_3_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "show"), _class.prototype)), _class);


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__application_styl__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__application_styl___default = __WEBPACK_IMPORTED_MODULE_0__application_styl__ && __WEBPACK_IMPORTED_MODULE_0__application_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__application_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__application_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__application_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_0__application_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__application_pug__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__application_pug___default = __WEBPACK_IMPORTED_MODULE_1__application_pug__ && __WEBPACK_IMPORTED_MODULE_1__application_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__application_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__application_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__application_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_1__application_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_base_component__ = __webpack_require__(0);
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

var Application = (_class = (_temp = _class2 = function (_BaseComponent) {
  _inherits(Application, _BaseComponent);

  function Application(mountPoint, options) {
    _classCallCheck(this, Application);

    var _this = _possibleConstructorReturn(this, _BaseComponent.call(this, options));

    var element = _this.compileTemplate();

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

    iframeWindow.addEventListener("keyup", _this.delgateKeyEvent);
    iframeWindow.addEventListener("keydown", _this.handleKeyNavigation);
    iframeWindow.addEventListener("keypress", _this.delgateKeyEvent);

    _this.element.setAttribute("is-touch-device", "ontouchstart" in document.documentElement);
    _this.element.setAttribute("is-iphone", (!!navigator.userAgent.match(/iPhone/i) || !!navigator.userAgent.match(/iPod/i)) && !!navigator.userAgent.match(/WebKit/i));

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

  Application.prototype.delgateKeyEvent = function delgateKeyEvent(nativeEvent) {
    var PolyFilledCustomEvent = this.store.iframe.window.PolyFilledCustomEvent;

    var receiver = this.refs.content.querySelector("[data-event-receiver]");

    if (!receiver) return;

    var delgated = new PolyFilledCustomEvent("dispatched-" + nativeEvent.type, {
      detail: { nativeEvent: nativeEvent }
    });

    receiver.dispatchEvent(delgated);
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
        this.delgateKeyEvent(event);
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
      this.renderTitle(target.modalTitle);
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
      return this._route;
    },
    set: function set(value) {
      var _this4 = this;

      this._route = value;

      if (this.element) {
        this.element.setAttribute("data-transition-state", "transitioning");

        requestAnimationFrame(function () {
          _this4.element.setAttribute("data-route", _this4._route);
        });
      }

      if (this.store.routing) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lib_routing__["a" /* setRoute */])(value === "home" ? "" : value);
      }

      return this._route;
    }
  }]);

  return Application;
}(__WEBPACK_IMPORTED_MODULE_3_components_base_component__["a" /* default */]), _class2.template = __WEBPACK_IMPORTED_MODULE_1__application_pug___default.a, _class2.stylesheet = __WEBPACK_IMPORTED_MODULE_0__application_styl___default.a, _temp), (_applyDecoratedDescriptor(_class.prototype, "closeModal", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "closeModal"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "delgateKeyEvent", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "delgateKeyEvent"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleKeyNavigation", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleKeyNavigation"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleTransition", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleTransition"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "navigateToHome", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "navigateToHome"), _class.prototype)), _class);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__target_search_pug__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__target_search_pug___default = __WEBPACK_IMPORTED_MODULE_0__target_search_pug__ && __WEBPACK_IMPORTED_MODULE_0__target_search_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__target_search_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__target_search_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__target_search_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__target_search_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__target_search_styl__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__target_search_styl___default = __WEBPACK_IMPORTED_MODULE_1__target_search_styl__ && __WEBPACK_IMPORTED_MODULE_1__target_search_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__target_search_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__target_search_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__target_search_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__target_search_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_components_base_component__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_components_icons__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lib_key_map__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_findindex__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash_findindex___default = __WEBPACK_IMPORTED_MODULE_6_lodash_findindex__ && __WEBPACK_IMPORTED_MODULE_6_lodash_findindex__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_6_lodash_findindex__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_6_lodash_findindex__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_6_lodash_findindex___default, 'a', __WEBPACK_IMPORTED_MODULE_6_lodash_findindex___default);

/* harmony export */ __webpack_require__.d(exports, "a", function() { return TargetSearch; });var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp2;

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

  TargetSearch.prototype.handleSearchInput = function handleSearchInput() {
    var search = this.refs.search;

    var _entrySpecs$filter = this.entrySpecs.filter(function (_ref) {
      var hidden = _ref.hidden;
      return !hidden;
    });

    var firstVisible = _entrySpecs$filter[0];


    search.setAttribute("data-empty", search.value === "");
    this.query = search.value.toLowerCase();
    this.selectEntry(firstVisible ? firstVisible.id : null);
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

  TargetSearch.prototype.handleDelgatedKeydown = function handleDelgatedKeydown(_ref2) {
    var _KM$up$KM$down;

    var _ref2$detail = _ref2.detail;
    var keyCode = _ref2$detail.keyCode;
    var nativeEvent = _ref2$detail.nativeEvent;

    var delta = (_KM$up$KM$down = {}, _KM$up$KM$down[__WEBPACK_IMPORTED_MODULE_5_lib_key_map__["a" /* default */].up] = -1, _KM$up$KM$down[__WEBPACK_IMPORTED_MODULE_5_lib_key_map__["a" /* default */].down] = 1, _KM$up$KM$down)[keyCode || nativeEvent.keyCode];

    if (!delta) return;

    if (nativeEvent) nativeEvent.preventDefault();

    var selectedId = this.selectedId;

    var entrySpecs = this.entrySpecs.filter(function (spec) {
      return !spec.hidden;
    });

    if (!entrySpecs.length) return;

    var length = entrySpecs.length;

    var currentIndex = __WEBPACK_IMPORTED_MODULE_6_lodash_findindex___default()(entrySpecs, function (_ref3) {
      var id = _ref3.id;
      return id === selectedId;
    }) || 0;

    // Move the index by delta and wrap around the bottom/top.
    var nextIndex = (currentIndex + delta + length) % length;

    selectedId = entrySpecs[nextIndex].id;

    this.selectEntry(selectedId);
  };

  TargetSearch.prototype.handleDelgatedKeypress = function handleDelgatedKeypress(_ref4) {
    var _ref4$detail = _ref4.detail;
    var keyCode = _ref4$detail.keyCode;
    var nativeEvent = _ref4$detail.nativeEvent;

    keyCode = keyCode || nativeEvent.keyCode;

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

    var entrySpecs = this.entrySpecs;
    var _refs2 = this.refs;
    var entries = _refs2.entries;
    var entriesContainer = _refs2.entriesContainer;
    var search = _refs2.search;

    var iframeDocument = this.store.iframe.document;
    var entryEl = entriesContainer.querySelector(entryQuery(selectedId));
    var visibleSpecs = entrySpecs.filter(function (entry) {
      return !entry.hidden;
    });

    this.selectedId = selectedId;

    entries.forEach(function (entryEl) {
      entryEl.setAttribute("data-visible-order", -1);
      _this2.setEntryStyle(entryEl);
    });

    visibleSpecs.forEach(function (spec, index) {
      var entryEl = entriesContainer.querySelector(entryQuery(spec.id));

      entryEl.setAttribute("data-visible-order", index);
    });

    if (search !== iframeDocument.activeElement && entryEl) {
      entryEl.focus();
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


    this.entrySpecs.forEach(function (spec, index) {
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
        _this3.selectEntry(spec.id);
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

  _createClass(TargetSearch, [{
    key: "entrySpecs",
    get: function get() {
      var query = this.query;
      var targets = this.targets;
      var fallbackID = this.store.fallbackID;


      return targets.map(function (_ref5) {
        var icon = _ref5.icon;
        var id = _ref5.id;
        var label = _ref5.label;

        var hidden = query && label.toLowerCase().indexOf(query) === -1 && id !== fallbackID;

        return { icon: icon, id: id, label: label, hidden: hidden };
      });
    }
  }]);

  return TargetSearch;
}(__WEBPACK_IMPORTED_MODULE_3_components_base_component__["a" /* default */]), _class2.template = __WEBPACK_IMPORTED_MODULE_0__target_search_pug___default.a, _class2.stylesheet = __WEBPACK_IMPORTED_MODULE_1__target_search_styl___default.a, _temp2), (_applyDecoratedDescriptor(_class.prototype, "handleSearchInput", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleSearchInput"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleSearchInputClear", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleSearchInputClear"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleDelgatedKeydown", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleDelgatedKeydown"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "handleDelgatedKeypress", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleDelgatedKeypress"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "submit", [__WEBPACK_IMPORTED_MODULE_2_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "submit"), _class.prototype)), _class);


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug___default = __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__ && __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__target_wrapper_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl___default = __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__ && __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl___default, 'a', __WEBPACK_IMPORTED_MODULE_1__target_wrapper_styl___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_component__ = __webpack_require__(0);

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
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export */ exports["a"] = createStore;var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function createStore() {
  var spec = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var iframe = document.createElement("iframe");
  var _spec$autoDownload = spec.autoDownload;
  var autoDownload = _spec$autoDownload === undefined ? true : _spec$autoDownload;
  var _spec$labels = spec.labels;
  var labels = _spec$labels === undefined ? {} : _spec$labels;


  return {
    name: spec.name || "a plugin",
    autoDownload: autoDownload,

    beforeContent: spec.beforeContent || "",
    afterContent: spec.afterContent || "",

    embedCode: spec.embedCode || "",

    fallbackID: typeof spec.fallbackID !== "undefined" ? spec.fallbackID : "generic",

    iframe: {
      element: iframe,
      get document() {
        return iframe.contentDocument;
      },
      get window() {
        return iframe.contentWindow;
      }
    },

    insertInHead: spec.insertInHead || false,

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

    routing: spec.routing || false
  };
}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "[data-component=\"application\"] {\n  -ms-flex-align: center;\n      -ms-grid-row-align: center;\n      align-items: center;\n  -ms-flex-pack: center;\n      justify-content: center;\n  max-height: 100%;\n  min-height: 100%;\n}\n@media (max-height: 24em) {\n  [data-component=\"application\"] {\n    -ms-flex-pack: start;\n        justify-content: flex-start;\n  }\n}\n[data-component=\"application\"][data-route=\"home\"] .modal-header [data-action=\"previous\"],\n[data-component=\"application\"][data-target-count=\"1\"] .modal-header [data-action=\"previous\"] {\n  opacity: 0;\n  pointer-events: none;\n}\n[data-component=\"application\"][data-mode=\"inline\"] .modal-header [data-action=\"close\"] {\n  opacity: 0;\n  pointer-events: none;\n}\n[data-component=\"application\"] .content {\n  transform: translate3d(0, 0, 0);\n  transition: transform 0.2s ease;\n}\n[data-component=\"application\"][data-route]:not([data-route=\"home\"]) .content {\n  transform: translate3d(-100%, 0, 0);\n}\n[data-component=\"application\"][data-transition-state=\"transitioned\"] [inert] > * {\n  display: none;\n}\n[data-component=\"application\"] .modal {\n  background: #fff;\n  border-radius: 0.3125em;\n  -ms-flex: 1 1 auto;\n      flex: 1 1 auto;\n  max-height: 38em;\n  max-width: 100vw;\n  min-height: 18em;\n  overflow: hidden;\n  position: relative;\n  width: 35rem;\n  z-index: 1;\n}\n@media (min-width: 769px) {\n  [data-component=\"application\"] .modal {\n    box-shadow: 0 2px 8px rgba(0,0,0,0.4);\n    margin: 1.5em 0;\n  }\n}\n@media (max-width: 768px) {\n  [data-component=\"application\"] .modal {\n    border-radius: 0;\n    max-height: 100vh;\n    max-width: 100vw;\n    width: 100%;\n  }\n}\n[data-component=\"application\"] .modal .content {\n  -ms-flex: 1 1 auto;\n      flex: 1 1 auto;\n  transform: translate3d(0, 0, 0);\n}\n[data-component=\"application\"] .modal .content > * {\n  margin: 0;\n  -ms-flex: 1 0 auto;\n      flex: 1 0 auto;\n  max-width: 100vw;\n  width: 100%;\n}\n[data-component=\"application\"] .modal-header {\n  -ms-flex-align: center;\n      -ms-grid-row-align: center;\n      align-items: center;\n  box-shadow: 0 1px rgba(0,0,0,0.21);\n  -ms-flex: 0 0 auto;\n      flex: 0 0 auto;\n  -ms-flex-pack: justify;\n      justify-content: space-between;\n  width: 100%;\n  max-width: 100vw;\n  z-index: 1;\n}\n[data-component=\"application\"] .modal-header > * {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n      align-items: center;\n}\n[data-component=\"application\"] .modal-header .title {\n  text-align: center;\n  line-height: 1.4;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n  display: inline-block;\n}\n@media (max-width: 500px) {\n  [data-component=\"application\"] .modal-header .title[data-title-char-length=\"long\"] {\n    font-size: 0.8em;\n  }\n  [data-component=\"application\"] .modal-header .title[data-title-char-length=\"medium\"] {\n    font-size: 0.9em;\n  }\n}\n@media (max-width: 400px) {\n  [data-component=\"application\"] .modal-header .title[data-title-char-length=\"medium\"] {\n    font-size: 0.8em;\n  }\n  [data-component=\"application\"] .modal-header .title[data-title-char-length=\"short\"] {\n    font-size: 0.9em;\n  }\n}\n@media (max-width: 360px) {\n  [data-component=\"application\"] .modal-header .title[data-title-char-length=\"short\"] {\n    font-size: 0.8em;\n  }\n  [data-component=\"application\"] .modal-header .title[data-title-char-length=\"puny\"] {\n    font-size: 0.9em;\n  }\n}\n@media (max-width: 340px) {\n  [data-component=\"application\"] .modal-header .title[data-title-char-length=\"puny\"] {\n    font-size: 0.8em;\n  }\n}\n[data-component=\"application\"] .modal-header .button[data-action] {\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  background: inherit;\n  border-radius: 0;\n  color: inherit;\n  -ms-flex: 0 0 auto;\n      flex: 0 0 auto;\n  display: -ms-flexbox;\n  display: flex;\n  height: 4em;\n  -ms-flex-pack: center;\n      justify-content: center;\n  padding: 0;\n  margin: 0;\n  width: 4em;\n  transition: opacity 0.15s ease;\n}\n[data-component=\"application\"] .modal-header .button[data-action]:focus:before {\n  display: none;\n}\n[data-component=\"application\"] .modal-header .button[data-action]:hover,\n[data-component=\"application\"] .modal-header .button[data-action]:focus {\n  background: rgba(0,0,0,0.045);\n  box-shadow: none;\n}\n[data-component=\"application\"] .modal-header .button[data-action]:not(:hover) {\n  color: rgba(0,0,0,0.5);\n}\n[data-component=\"application\"] .modal-header .button[data-action] > .icon {\n  -ms-flex: 1 0 auto;\n      flex: 1 0 auto;\n  width: 1em;\n  height: 1em;\n  stroke: currentColor;\n}\n", ""]);

// exports


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "[data-component=\"target-search\"] .header {\n  -ms-flex-align: center;\n      -ms-grid-row-align: center;\n      align-items: center;\n  background-color: rgba(0,0,0,0.045);\n  box-shadow: 0 1px rgba(0,0,0,0.21);\n  -ms-flex: 0 0 auto;\n      flex: 0 0 auto;\n  padding: 1em;\n  width: 100%;\n  z-index: 2;\n}\n[data-component=\"target-search\"] .header label {\n  color: #7b7b7b;\n  margin-bottom: 0.5em;\n}\n[data-component=\"target-search\"] .header .input-wrapper {\n  position: relative;\n  width: 100%;\n}\n[data-component=\"target-search\"] .header .input-wrapper > .icon {\n  position: absolute;\n  pointer-events: none;\n  height: 1em;\n  width: 1em;\n  left: 1em;\n  top: 0;\n  bottom: 0;\n  margin-top: auto;\n  margin-bottom: auto;\n  stroke: rgba(0,0,0,0.5);\n}\n[data-component=\"target-search\"] .header .search {\n  background: #fff;\n  border: 0;\n  width: 100%;\n  border-radius: 5em;\n  padding: 0.5em 3em;\n}\n[data-component=\"target-search\"] .header .search::-webkit-input-placeholder {\n  color: rgba(0,0,0,0.3);\n  font-family: inherit;\n  font-size: 1em;\n}\n[data-component=\"target-search\"] .header .search::-moz-placeholder {\n  color: rgba(0,0,0,0.3);\n  font-family: inherit;\n  font-size: 1em;\n}\n[data-component=\"target-search\"] .header .search:-ms-input-placeholder {\n  color: rgba(0,0,0,0.3);\n  font-family: inherit;\n  font-size: 1em;\n}\n[data-component=\"target-search\"] .header .search::placeholder {\n  color: rgba(0,0,0,0.3);\n  font-family: inherit;\n  font-size: 1em;\n}\n[data-component=\"target-search\"] .header .search:focus {\n  outline: none;\n}\n[data-component=\"target-search\"] .header .search-clear {\n  position: absolute;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  padding-left: 0.75em;\n  width: 2.5em;\n  padding-right: 0.75em;\n  cursor: pointer;\n  transition: opacity 0.15s ease;\n  opacity: 0;\n  pointer-events: none;\n}\n[data-component=\"target-search\"] .header .search-clear:focus:hover {\n  outline: none;\n}\n[data-component=\"target-search\"] .header .search-clear .icon {\n  position: absolute;\n  pointer-events: none;\n  height: 1em;\n  width: 1em;\n  right: 0.85em;\n  top: 0;\n  bottom: 0;\n  margin-top: auto;\n  margin-bottom: auto;\n  stroke: rgba(0,0,0,0.5);\n}\n[data-component=\"target-search\"] .header .search-clear:hover .icon {\n  opacity: 1;\n}\n[data-component=\"target-search\"] .header .search[data-empty=\"false\"] ~ .search-clear {\n  opacity: 1;\n  pointer-events: all;\n}\n[data-component=\"target-search\"] .entries {\n  height: 0;\n  -ms-flex: 1 1 auto;\n      flex: 1 1 auto;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n  z-index: 1;\n}\n@media (max-width: 768px) {\n  [data-component=\"application\"][is-iphone=\"true\"] [data-component=\"target-search\"] .entries::after {\n    content: \"\";\n    display: block;\n    -ms-flex: 0 0 auto;\n        flex: 0 0 auto;\n    height: 64px;\n  }\n}\n[data-component=\"target-search\"] .entries .entry {\n  position: relative;\n  cursor: pointer;\n  -ms-flex-align: center;\n      -ms-grid-row-align: center;\n      align-items: center;\n  -ms-flex: 0 0 auto;\n      flex: 0 0 auto;\n  padding: 1em;\n  overflow: ellipsis;\n  border: 1px solid rgba(0,0,0,0.063);\n  border-left: 0;\n  border-right: 0;\n}\n[data-component=\"target-search\"] .entries .entry[data-visible-order=\"-1\"] {\n  display: none;\n}\n[data-component=\"target-search\"] .entries .entry[data-visible-order=\"0\"] {\n  border-top-color: transparent;\n}\n[data-component=\"target-search\"] .entries .entry:last-child {\n  border-bottom-color: transparent;\n}\n[data-component=\"target-search\"] .entries .entry:not(:last-child) {\n  margin-bottom: -1px;\n}\n[data-component=\"target-search\"] .entries .entry:not([data-selected]) {\n  z-index: 1;\n  background: transparent;\n  color: inherit;\n}\n[data-component=\"target-search\"] .entries .entry:not([data-selected]):hover {\n  background: rgba(0,0,0,0.045);\n}\n[data-component=\"application\"][is-touch-device=\"true\"] [data-component=\"target-search\"] .entries .entry:not([data-selected]):hover {\n  color: #fff;\n}\n[data-component=\"target-search\"] .entries .entry:focus {\n  outline: none;\n  background: rgba(0,0,0,0.045);\n}\n[data-component=\"target-search\"] .entries .entry .primary {\n  -ms-flex: 1 1 auto;\n      flex: 1 1 auto;\n  -ms-flex-align: center;\n      -ms-grid-row-align: center;\n      align-items: center;\n  position: relative;\n}\n[data-component=\"target-search\"] .entries .entry .primary::after {\n  pointer-events: none;\n  position: absolute;\n  right: 0.75em;\n  opacity: 0;\n}\n@media (min-width: 400px) {\n  [data-component=\"application\"][is-touch-device=\"false\"] [data-component=\"target-search\"] .entries .entry:hover .primary::after {\n    content: attr(data-click-hint-short);\n    opacity: 0.5;\n  }\n  [data-component=\"application\"][is-touch-device=\"false\"] [data-component=\"target-search\"] .entries .entry[data-selected]:not(:hover) .primary::after {\n    content: attr(data-submit-hint-short);\n    opacity: 0.5;\n  }\n}\n@media (min-width: 460px) {\n  [data-component=\"application\"][is-touch-device=\"false\"] [data-component=\"target-search\"] .entries .entry:hover .primary::after {\n    content: attr(data-click-hint);\n  }\n  [data-component=\"application\"][is-touch-device=\"false\"] [data-component=\"target-search\"] .entries .entry[data-selected]:not(:hover) .primary::after {\n    content: attr(data-submit-hint);\n  }\n}\n[data-component=\"target-search\"] .entries .entry .icon.logo {\n  fill: currentColor;\n  height: 2em;\n  margin-right: 1em;\n  width: 2em;\n}\n[data-component=\"target-search\"] .entries .entry .icon.next {\n  -ms-flex: 0 0 auto;\n      flex: 0 0 auto;\n  height: 1em;\n  opacity: 0;\n  stroke: currentColor;\n  width: 1em;\n  margin-right: 0.25em;\n}\n[data-component=\"target-search\"] .entries .entry:hover .icon.next,\n[data-component=\"target-search\"] .entries .entry:focus .icon.next {\n  opacity: 0.6;\n}\n[data-component=\"target-search\"] .entries .entry[data-selected] .icon.next,\n[data-component=\"target-search\"] .entries .entry:active .icon.next,\n[data-component=\"application\"][is-touch-device=\"true\"] [data-component=\"target-search\"] .entries .entry:hover .icon.next,\n[data-component=\"target-search\"] .entries .entry[data-selected]:hover .icon.next,\n[data-component=\"target-search\"] .entries .entry:active:hover .icon.next,\n[data-component=\"application\"][is-touch-device=\"true\"] [data-component=\"target-search\"] .entries .entry:hover:hover .icon.next {\n  opacity: 1;\n}\n[data-component=\"target-search\"] .entries .entry path.is-light-source-facing {\n  opacity: 0.75;\n}\n[data-component=\"target-search\"] .entries .entry path.is-not-light-source-facing {\n  opacity: 1;\n}\n[data-component=\"target-search\"] .entries .entry[data-selected],\n[data-component=\"target-search\"] .entries .entry:active,\n[data-component=\"application\"][is-touch-device=\"true\"] [data-component=\"target-search\"] .entries .entry:hover {\n  border-color: transparent;\n}\n[data-component=\"target-search\"] .entries .entry[data-selected],\n[data-component=\"target-search\"] .entries .entry:active,\n[data-component=\"application\"][is-touch-device=\"true\"] [data-component=\"target-search\"] .entries .entry:hover,\n[data-component=\"target-search\"] .entries .entry[data-selected]:hover,\n[data-component=\"target-search\"] .entries .entry:active:hover,\n[data-component=\"application\"][is-touch-device=\"true\"] [data-component=\"target-search\"] .entries .entry:hover:hover {\n  z-index: 2;\n  color: #fff;\n  box-shadow: none !important;\n}\n[data-component=\"target-search\"] .entries .entry[data-selected] path.is-light-source-facing,\n[data-component=\"target-search\"] .entries .entry:active path.is-light-source-facing,\n[data-component=\"application\"][is-touch-device=\"true\"] [data-component=\"target-search\"] .entries .entry:hover path.is-light-source-facing,\n[data-component=\"target-search\"] .entries .entry[data-selected]:hover path.is-light-source-facing,\n[data-component=\"target-search\"] .entries .entry:active:hover path.is-light-source-facing,\n[data-component=\"application\"][is-touch-device=\"true\"] [data-component=\"target-search\"] .entries .entry:hover:hover path.is-light-source-facing {\n  opacity: 1;\n}\n[data-component=\"target-search\"] .entries .entry[data-selected] path.is-not-light-source-facing,\n[data-component=\"target-search\"] .entries .entry:active path.is-not-light-source-facing,\n[data-component=\"application\"][is-touch-device=\"true\"] [data-component=\"target-search\"] .entries .entry:hover path.is-not-light-source-facing,\n[data-component=\"target-search\"] .entries .entry[data-selected]:hover path.is-not-light-source-facing,\n[data-component=\"target-search\"] .entries .entry:active:hover path.is-not-light-source-facing,\n[data-component=\"application\"][is-touch-device=\"true\"] [data-component=\"target-search\"] .entries .entry:hover:hover path.is-not-light-source-facing {\n  opacity: 0.5;\n}\n", ""]);

// exports


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "[data-component$=\"-target\"] {\n  -ms-flex: 1 1 auto;\n      flex: 1 1 auto;\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n}\n[data-component$=\"-target\"] [data-content-slot] {\n  background: rgba(0,0,0,0.045);\n  border-radius: 3px;\n  display: block;\n  margin: 1em;\n  padding: 1em;\n  text-align: center;\n}\n[data-component$=\"-target\"] .copy-container {\n  background: rgba(0,0,0,0.045);\n  border-radius: 3px;\n  font-size: 0.8em;\n  margin: 2rem 0;\n  max-width: 100vw;\n  position: relative;\n}\n[data-component$=\"-target\"] .copy-container button.run {\n  margin: 0;\n  padding: 0.3em 1em;\n  position: absolute;\n  left: 1.5em;\n  top: 1.5em;\n}\n[data-component$=\"-target\"] .copy-container button.run::after {\n  color: #000;\n  content: \"Copied\";\n  display: inline-block;\n  left: 100%;\n  margin-left: 0.5em;\n  opacity: 0;\n  position: absolute;\n}\n[data-component$=\"-target\"] .copy-container button.run[data-status=\"copied\"]::after {\n  animation: copied 400ms linear;\n  animation-fill-mode: forwards;\n  opacity: 1;\n}\n[data-component$=\"-target\"] .copy-container > .copyable {\n  display: block;\n  font-family: Monaco, \"Bitstream Vera Sans Mono\", \"Lucida Console\", Terminal, monospace;\n  margin: 0;\n  padding: 1.3em;\n  padding-top: 4.3em;\n  white-space: pre-wrap;\n  width: 100%;\n  word-wrap: break-word;\n}\n[data-component$=\"-target\"] .copy-container > .copyable:focus {\n  outline: none;\n}\n.target-instructions {\n  cursor: auto;\n  display: block;\n  -ms-flex: 1 1 auto;\n      flex: 1 1 auto;\n  height: 0;\n  padding-bottom: 1em;\n  -webkit-user-select: text;\n     -moz-user-select: text;\n      -ms-user-select: text;\n          user-select: text;\n}\n.target-instructions figure {\n  margin: 2em 0;\n  position: relative;\n}\n.target-instructions figure img,\n.target-instructions figure[data-component=\"screenshot\"] {\n  display: block;\n  max-width: 100%;\n}\n.target-instructions figure[data-component=\"screenshot\"] {\n  height: 0;\n  overflow: hidden;\n  padding-left: 0;\n  padding-right: 0;\n  padding-top: 0;\n  position: relative;\n  width: 100%;\n}\n.target-instructions figure[data-component=\"screenshot\"] iframe {\n  border: 0;\n  left: 0;\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  transform-origin: 0 0;\n}\n.target-instructions figure[data-component=\"screenshot\"][data-render-state=\"scaled\"] iframe {\n  opacity: 1;\n}\n.target-instructions figure::after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  cursor: default;\n  border: 1px solid rgba(0,0,0,0.2);\n  z-index: 1;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n[data-component=\"application\"][data-mode=\"modal\"] .target-instructions figure::after {\n  border-left: 0;\n  border-right: 0;\n}\n@media (max-width: 35rem) {\n  .target-instructions figure::after {\n    border-left: 0;\n    border-right: 0;\n  }\n}\n.target-instructions figure [annotation-arrow] {\n  position: absolute;\n}\n.target-instructions figure [annotation-arrow] > div {\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 0;\n  width: 100%;\n}\n.target-instructions figure [annotation-arrow] svg {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  fill: #fde757;\n}\n.target-instructions figure [annotation-arrow][data-svg-view-box=\"0 0 83 114\"] > div {\n  padding-bottom: 137.35%;\n}\n.target-instructions figure [annotation-arrow][data-svg-view-box=\"0 0 127 73\"] > div {\n  padding-bottom: 57.48%;\n}\n.target-instructions,\n.target-instructions *:focus {\n  outline: none;\n}\n.target-instructions .target-title {\n  -ms-flex-align: center;\n      -ms-grid-row-align: center;\n      align-items: center;\n  background: rgba(0,0,0,0.045);\n  border-bottom: 1px solid rgba(0,0,0,0.045);\n  padding: 2em 4em 1.6em;\n  text-align: center;\n}\n@media (max-width: 568px) {\n  .target-instructions .target-title {\n    padding-left: 2em;\n    padding-right: 2em;\n  }\n}\n@media (max-width: 22.5em) {\n  .target-instructions .target-title {\n    padding-left: 1.5em;\n    padding-right: 1.5em;\n  }\n}\n.target-instructions .target-title .icon {\n  height: 3em;\n  width: 3em;\n  margin-bottom: 1em;\n}\n.target-instructions .target-title .icon > svg {\n  display: block;\n  width: 100%;\n}\n.target-instructions .target-title .icon path.is-light-source-facing {\n  opacity: 0.75;\n}\n.target-instructions .target-title .icon path.is-not-light-source-facing {\n  opacity: 1;\n}\n.target-instructions .target-title h1 {\n  font-size: 1.25em;\n  font-weight: 300;\n  margin: 0 0 0.5em;\n  text-align: center;\n}\n.target-instructions .target-title h1:last-child {\n  margin-bottom: 0;\n}\n.target-instructions .target-title .versions {\n  -ms-flex-align: center;\n      -ms-grid-row-align: center;\n      align-items: center;\n  color: rgba(0,0,0,0.5);\n  font-size: 0.9em;\n}\n.target-instructions .target-title .versions .label {\n  margin-right: 0.5em;\n}\n.target-instructions .target-title .versions select {\n  display: inline-block;\n  border: 1px solid rgba(0,0,0,0.21);\n  background: transparent;\n  cursor: pointer;\n  font-family: inherit;\n  font-size: inherit;\n}\n.target-instructions .target-title .versions select:focus {\n  outline: none;\n  border: 1px dashed rgba(0,0,0,0.21);\n}\n.target-instructions .target-title .versions select:hover {\n  background: #fff;\n}\n.target-instructions ol.steps {\n  width: 35rem;\n  max-width: 100%;\n  margin: 0 auto;\n  counter-reset: item 0;\n  list-style: none;\n  padding: 2em 0 0;\n}\n@media (max-width: 768px) {\n  [data-component=\"application\"][is-iphone=\"true\"] .target-instructions ol.steps::after {\n    content: \"\";\n    display: block;\n    -ms-flex: 0 0 auto;\n        flex: 0 0 auto;\n    height: 64px;\n  }\n}\n.target-instructions ol.steps div,\n.target-instructions ol.steps footer,\n.target-instructions ol.steps header,\n.target-instructions ol.steps section {\n  display: block;\n}\n.target-instructions ol.steps li {\n  counter-increment: item;\n  margin: 1em 0;\n  padding: 0;\n  position: relative;\n}\n.target-instructions ol.steps li:first-child {\n  margin-top: 0;\n}\n.target-instructions ol.steps li + li {\n  margin-top: 3.5em;\n}\n.target-instructions ol.steps li:first-child > *:first-child {\n  margin-top: 0;\n}\n.target-instructions ol.steps li:last-child > *:last-child {\n  margin-bottom: 0;\n}\n.target-instructions ol.steps li::before {\n  background: rgba(0,0,0,0.045);\n  border-radius: 50%;\n  color: #fff;\n  content: counter(item);\n  display: inline-block;\n  left: 0;\n  line-height: 2em;\n  margin-left: 1em;\n  position: absolute;\n  text-align: center;\n  top: -0.2em;\n  width: 2em;\n}\n.target-instructions ol.steps li > p,\n.target-instructions ol.steps li > h1,\n.target-instructions ol.steps li > h2 {\n  margin: 1em 2em 1em 4em;\n}\n@media (max-width: 568px) {\n  .target-instructions ol.steps li > p,\n  .target-instructions ol.steps li > h1,\n  .target-instructions ol.steps li > h2 {\n    margin-right: 1em;\n  }\n}\n.target-instructions h2 {\n  font-size: 1em;\n  font-weight: 400;\n  margin-top: 3em;\n}\n.target-instructions > *:first-child {\n  margin-top: 0;\n}\n.target-instructions > *:last-child {\n  margin-bottom: 0;\n}\n@-moz-keyframes copied {\n  0%, 100% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;\n    transform: translate3d(0, -1.8em, 0);\n  }\n  100% {\n    transform: translate3d(0, -1.8em, 0);\n  }\n}\n@-webkit-keyframes copied {\n  0%, 100% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;\n    transform: translate3d(0, -1.8em, 0);\n  }\n  100% {\n    transform: translate3d(0, -1.8em, 0);\n  }\n}\n@-o-keyframes copied {\n  0%, 100% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;\n    transform: translate3d(0, -1.8em, 0);\n  }\n  100% {\n    transform: translate3d(0, -1.8em, 0);\n  }\n}\n@keyframes copied {\n  0%, 100% {\n    opacity: 0;\n  }\n  50% {\n    opacity: 1;\n    transform: translate3d(0, -1.8em, 0);\n  }\n  100% {\n    transform: translate3d(0, -1.8em, 0);\n  }\n}\n", ""]);

// exports


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, ".embed-box {\n  transform: translate3d(0, 0, 0);\n}\n.embed-box[data-mode=\"inline\"] {\n  display: inline-block;\n  height: 100vh;\n  max-height: 100vh;\n  min-height: 15em;\n  width: 100%;\n}\n.embed-box[data-mode=\"modal\"] {\n  bottom: 0 !important;\n  display: block;\n  height: 100% !important;\n  left: 0 !important;\n  max-height: 100vh !important;\n  max-width: 100vw !important;\n  opacity: 0;\n  position: fixed !important;\n  right: 0 !important;\n  top: 0 !important;\n  transition: opacity 0.1s linear !important;\n  width: 100% !important;\n  z-index: 100000 !important;\n}\n.embed-box-download-iframe {\n  position: fixed;\n  visibility: hidden;\n  width: 1px;\n  height: 1px;\n  z-index: -99999;\n}\n[data-embed-box-scroll-state] {\n  height: 100%;\n}\nbody[data-embed-box-scroll-state=\"locked\"] {\n  overflow: hidden !important;\n}\n@media (max-width: 768px) {\n  .embed-box[data-mode=\"modal\"] {\n    position: absolute !important;\n  }\n  body[data-embed-box-scroll-state=\"locked\"],\n  html[data-embed-box-scroll-state=\"locked\"] {\n    bottom: 0 !important;\n    left: 0 !important;\n    overflow: hidden !important;\n    position: fixed !important;\n    right: 0 !important;\n    top: 0 !important;\n  }\n}\n", ""]);

// exports


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "article,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nnav,\nsection,\nsummary {\n  display: block;\n}\naudio,\ncanvas,\nvideo {\n  display: inline;\n  zoom: 1;\n}\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n[hidden] {\n  display: none;\n}\nhtml {\n  font-size: 100%;\n  -webkit-text-size-adjust: 100%;\n      -ms-text-size-adjust: 100%;\n          text-size-adjust: 100%;\n}\nbody {\n  margin: 0;\n  text-rendering: optimizeLegibility;\n}\nbutton,\ninput,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  margin: 0;\n}\nbutton,\ninput {\n  line-height: normal;\n}\nbutton,\ninput[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  cursor: pointer;\n}\nbutton[disabled],\ninput[type=\"button\"][disabled],\ninput[type=\"reset\"][disabled],\ninput[type=\"submit\"][disabled] {\n  cursor: not-allowed;\n}\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\na:focus {\n  outline: thin dotted;\n}\na:active,\na:hover {\n  outline: 0;\n}\nabbr[title] {\n  border-bottom: thin dotted;\n}\nb,\nstrong {\n  font-weight: 700;\n}\ndfn {\n  font-style: italic;\n}\npre {\n  white-space: pre-wrap;\n  word-wrap: break-word;\n}\nimg {\n  border: 0;\n  -ms-interpolation-mode: bicubic;\n}\nsvg:not(:root) {\n  overflow: hidden;\n}\ntextarea {\n  overflow: auto;\n  -webkit-overflow-scrolling: touch;\n  vertical-align: top;\n  resize: vertical;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\nfigure,\nform {\n  margin: 0;\n}\np,\npre,\ndl,\nmenu,\nol,\nul {\n  margin: 1em 0;\n}\n*,\n*:after,\n*:before {\n  box-sizing: border-box;\n}\nhtml {\n  font-size: 16px;\n}\nbody {\n  font-family: \"Avenir New\", Avenir, \"Helvetica Neue\", sans-serif;\n}\n.button {\n  -webkit-font-smoothing: subpixel-antialiased;\n  -moz-osx-font-smoothing: auto;\n  position: relative;\n  text-rendering: optimizeLegibility;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  display: inline-block;\n  cursor: pointer;\n  border: 0;\n  border-radius: 0.1875em;\n  font-size: 1em;\n  padding: 0.6em 2em;\n  margin: 0;\n  text-align: center;\n  font-family: \"Avenir New\", Avenir, \"Helvetica Neue\", sans-serif;\n  font-weight: 300;\n  letter-spacing: 0.04em;\n  text-indent: 0.04em;\n  text-decoration: none;\n}\n.button.slim {\n  padding-left: 1em;\n  padding-right: 1em;\n}\n.button.nowrap {\n  white-space: nowrap;\n  max-width: 100%;\n}\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n  .button {\n    font-weight: 400;\n  }\n}\n@media all and (-webkit-min-device-pixel-ratio: 0) and (-webkit-min-device-pixel-ratio: 0.001), all and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dppx) {\n  .button {\n    font-weight: 300;\n  }\n}\n.button:hover {\n  text-decoration: none;\n}\n.button[disabled] {\n  opacity: 0.7;\n}\n.button[disabled]:hover,\n.button[disabled]:focus,\n.button[disabled]:focus:hover {\n  box-shadow: none !important;\n}\n.button:hover {\n  box-shadow: 0 0.1875em 0.375em -0.1875em rgba(0,0,0,0.325);\n}\n.button:hover:active,\n.button.active {\n  box-shadow: inset 0 0.125em 0.375em rgba(0,0,0,0.325);\n}\n.button:focus {\n  outline: none;\n}\n.button:focus::before {\n  content: \"\";\n  position: absolute;\n  z-index: 1;\n  top: 2px;\n  right: 2px;\n  bottom: 2px;\n  left: 2px;\n  border-radius: 0.1em;\n  box-shadow: inset 0 0 0 1px currentColor;\n  pointer-events: none;\n  transition: opacity 0.3s ease-in-out;\n}\n.button:focus:active::before {\n  opacity: 0;\n}\n.button.primary {\n  background: #000;\n  color: #fff;\n}\n.button.transparent {\n  font-weight: 400;\n}\n.button.transparent:not(:hover):not(:active):not(.active):not(:focus) {\n  background: transparent;\n  box-shadow: inset 0 0 0 1px lightLineGrayRGBA;\n  color: rgba(0,0,0,0.55);\n}\n.button.small {\n  font-size: 0.9em;\n  border-radius: 0.2083em;\n  letter-spacing: 0.06em;\n  text-indent: 0.06em;\n}\n.button.large {\n  font-size: 1.25em;\n}\n.button.with-spinner-icon {\n  position: relative;\n}\n.button.with-spinner-icon .icon.spinner-icon {\n  display: none;\n}\n.button.with-spinner-icon.showing-spinner-icon .button-content {\n  opacity: 0;\n  pointer-events: none;\n}\n.button.with-spinner-icon.showing-spinner-icon .icon.spinner-icon {\n  position: absolute;\n  display: block;\n  margin: auto;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n.button.with-spinner-icon.showing-spinner-icon.more:after {\n  opacity: 0;\n  pointer-events: none;\n}\n.buttons-group span.buttons-group-message {\n  display: inline-block;\n  padding: 0.6em 0;\n}\n.buttons-group span.buttons-group-message.small {\n  font-size: 0.9em;\n}\n.buttons-group span.buttons-group-message.large {\n  font-size: 1.25em;\n}\n@media (min-width: 569px) {\n  .buttons-group button,\n  .buttons-group .button,\n  .buttons-group span.buttons-group-message {\n    margin-right: 1em;\n  }\n  .buttons-group button:last-child,\n  .buttons-group .button:last-child,\n  .buttons-group span.buttons-group-message:last-child {\n    margin-right: 0;\n  }\n}\n@media (max-width: 568px) {\n  .buttons-group button,\n  .buttons-group .button,\n  .buttons-group span.buttons-group-message {\n    display: block;\n    margin-bottom: 1em;\n  }\n  .buttons-group button:last-child,\n  .buttons-group .button:last-child,\n  .buttons-group span.buttons-group-message:last-child {\n    margin-bottom: 0;\n  }\n}\n@media (max-width: 568px) {\n  .buttons-group button {\n    width: 100%;\n  }\n}\n\n@font-face {\n  font-family: \"embed-box-icons\";\n  font-style: normal;\n  font-weight: normal;\n  src: url(data:application/x-font-woff;charset=utf-8;base64,d09GRk9UVE8AAAQQAAoAAAAABewAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAARQAAAEw7LPuDUZGVE0AAAIIAAAAGgAAABx04jsnT1MvMgAAAiQAAABLAAAAYGFpBYRjbWFwAAACcAAAAEcAAAFOP7UHcGhlYWQAAAK4AAAALwAAADYGoUQqaGhlYQAAAugAAAAfAAAAJAe/AetobXR4AAADCAAAABAAAAAQCwoAAG1heHAAAAMYAAAABgAAAAYABFAAbmFtZQAAAyAAAADaAAABsE3GDFBwb3N0AAAD/AAAABMAAAAg/50AZnicTY69S8NQFMXvbV5aLI/4GXEIzSJYAh0dXPwXLNpgVymvH6AtpMHJsWglk06CuPXvEPyg9E9wt2SVt/huk2exWUo5HPgdONx7EBgDROTioiWCSqfR6/YBc4BwTKUcuQbtsTo3JGelIrBh2Y2iJfBCFM5GydB04GXdAdhwYLTpwJqDB1tgZjfysA0ueHAYdq5EP+i02mGl0RbXQa97KZpLXvm9OgMA73CI98AQ90+aN+onkgmXKCVpacjd2ST5+pvk5TywE056zgsW+XRrq281rX2m0zROYxXXTtU0zRS/n6lFVhl9mBY90sDW5/RUrZOnhV547JvWLw0Y+fp5/KbLJMgjUX1dlB92Zkd2xIv/gw+CN3icY2BgYGQAggsF9tdA9CWLvytgNABOBQe1AAB4nGNgZopgnMDAysDBasw6k4GBUQ5CM19nSGMSYgACVgYIaGBgYGJAAgFprikMDgzXFazY0v6lMexg/sIgDhRmhCtQAEJGABgTC0oAeJxjYGBgZoBgGQZGBhDwAPIYwXwWBh0gzQakGRmYGK4rWP3/D+RfV7D8//+/FpAFUsUC1s0E5LAxQA0YnoCZibAaAF3eCGYAeJxjYGRgYADisx3H/eL5bb4ycHMwgMAli78rEPT/l8wCzF+AXA4GJpAoAFzJDHkAeJxjYGRgYP7y/yXDDmYBBoZ/b4EkUAQFsAAAloYFrwAEAAAAAf0AAAH9AAADEAAAAABQAAAEAAB4nI2PvQ3CMBCFXyCJxI8oEaULJCpHTiRSMEBKSvoIWVGaWHKYgREYgzEYgDEYgJoXc0UKCizZ/u7euzsbwBI3RBhWhAU2whMkMMJT7HAVjul5CCfkl3CKRbSiM4pnzKxD1cATzLEVnuKIUjim5y6ckJ/CKfkNixoNTw+NFmc4dOgBWzfW6/bsOgajvGSqEF/C7UO9QoGM/1A4cP/u+tVK5nI6NSsMac92rrtUzjdWFZlRBzWazqjUudGFyWn857WnoPfUB1VxwvAunKzvW9epPDN/9fkAFF9DNgAAeJxjYGYAg/+zGNIYsAAALpkCAwA=) format(\"woff\");\n}\na.more::after,\nbutton.more::after,\n.with-more-icon-after::after {\n  font-family: \"embed-box-icons\";\n  position: relative;\n  display: inline-block;\n  vertical-align: baseline;\n  color: inherit;\n  font-style: normal;\n  font-weight: inherit;\n  font-size: 1em;\n  line-height: 1;\n  text-decoration: none;\n  content: \"\\203A\";\n  padding-left: 0.3em;\n}\na.before::before,\n.with-before-icon-before::before {\n  font-family: \"embed-box-icons\";\n  position: relative;\n  display: inline-block;\n  vertical-align: baseline;\n  color: inherit;\n  font-style: normal;\n  font-weight: inherit;\n  font-size: 1em;\n  line-height: 1;\n  text-decoration: none;\n  content: \"\\2039\";\n  padding-right: 0.3em;\n}\na.more:not(.button)::after {\n  padding-right: 0.3em;\n}\n.with-more-icon-after:empty::after {\n  padding-left: 0.15em;\n  padding-right: 0.15em;\n}\n.loading-dots {\n  opacity: 0;\n  animation: loading-dots-fadein 0.5s linear forwards;\n}\n.loading-dots[data-state=\"loaded\"] i,\n.loading-dots[data-state=\"loaded\"] i:first-child,\n.loading-dots[data-state=\"loaded\"] i:last-child {\n  opacity: 0;\n  animation-play-state: paused;\n}\n.loading-dots i {\n  width: 0.5em;\n  height: 0.5em;\n  display: inline-block;\n  vertical-align: middle;\n  background: currentColor;\n  border-radius: 50%;\n  margin: 0 0.25em;\n  animation: loading-dots-middle-dots 0.5s linear infinite;\n}\n.loading-dots i:first-child {\n  animation: loading-dots-first-dot 0.5s linear infinite;\n  opacity: 0;\n  transform: translate(-1em);\n}\n.loading-dots i:last-child {\n  animation: loading-dots-last-dot 0.5s linear infinite;\n}\n@-moz-keyframes loading-dots-fadein {\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes loading-dots-fadein {\n  100% {\n    opacity: 1;\n  }\n}\n@-o-keyframes loading-dots-fadein {\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes loading-dots-fadein {\n  100% {\n    opacity: 1;\n  }\n}\n@-moz-keyframes loading-dots-first-dot {\n  100% {\n    transform: translate(1em);\n    opacity: 1;\n  }\n}\n@-webkit-keyframes loading-dots-first-dot {\n  100% {\n    transform: translate(1em);\n    opacity: 1;\n  }\n}\n@-o-keyframes loading-dots-first-dot {\n  100% {\n    transform: translate(1em);\n    opacity: 1;\n  }\n}\n@keyframes loading-dots-first-dot {\n  100% {\n    transform: translate(1em);\n    opacity: 1;\n  }\n}\n@-moz-keyframes loading-dots-middle-dots {\n  100% {\n    transform: translate(1em);\n  }\n}\n@-webkit-keyframes loading-dots-middle-dots {\n  100% {\n    transform: translate(1em);\n  }\n}\n@-o-keyframes loading-dots-middle-dots {\n  100% {\n    transform: translate(1em);\n  }\n}\n@keyframes loading-dots-middle-dots {\n  100% {\n    transform: translate(1em);\n  }\n}\n@-moz-keyframes loading-dots-last-dot {\n  100% {\n    transform: translate(2em);\n    opacity: 0;\n  }\n}\n@-webkit-keyframes loading-dots-last-dot {\n  100% {\n    transform: translate(2em);\n    opacity: 0;\n  }\n}\n@-o-keyframes loading-dots-last-dot {\n  100% {\n    transform: translate(2em);\n    opacity: 0;\n  }\n}\n@keyframes loading-dots-last-dot {\n  100% {\n    transform: translate(2em);\n    opacity: 0;\n  }\n}\nhtml,\nbody {\n  height: 100%;\n}\nbody {\n  margin: 0;\n}\ndiv,\nfooter,\nheader,\nmain,\nsection {\n  display: -ms-flexbox;\n  display: flex;\n}\n[data-flow=\"column\"] {\n  -ms-flex-flow: column nowrap;\n      flex-flow: column nowrap;\n}\n[data-action] {\n  cursor: pointer;\n}\n[data-action],\n[tabindex] {\n  -webkit-tap-highlight-color: transparent;\n}\n[data-selectable],\n[contenteditable] {\n  cursor: text;\n  -webkit-user-select: text;\n     -moz-user-select: text;\n      -ms-user-select: text;\n          user-select: text;\n}\nhtml,\nbody {\n  overflow: hidden;\n}\nhtml {\n  background: transparent;\n}\nmain {\n  height: 100%;\n  overflow: hidden;\n}\nbody {\n  background: rgba(0,0,0,0.4);\n  cursor: default;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n", ""]);

// exports


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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(35), __webpack_require__(36)(module)))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(3);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (config) {pug_html = pug_html + "\u003Cmain" + (" data-flow=\"column\" data-component=\"application\""+pug.attr("data-target-count", this.targets.length, true, true)+pug.attr("data-mode", config.mode, true, true)+" role=\"main\"") + "\u003E\u003Cdiv class=\"modal\" data-flow=\"column\"\u003E\u003Cheader class=\"modal-header\" role=\"menubar\"\u003E\u003Cdiv class=\"button\" data-action=\"previous\" data-ref=\"previousButton\" tabindex=\"1\" role=\"menuitem\"\u003E\u003C\u002Fdiv\u003E\u003Cspan class=\"title\" data-ref=\"title\"\u003E\u003C\u002Fspan\u003E\u003Cdiv class=\"button\" data-action=\"close\" data-ref=\"closeModalButton\" tabindex=\"2\" role=\"menuitem\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fheader\u003E\u003Cdiv class=\"content\" data-ref=\"content\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fmain\u003E";}.call(this,"config" in locals_for_with?locals_for_with.config:typeof config!=="undefined"?config:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(3);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (label) {pug_html = pug_html + "\u003Csection data-flow=\"column\" data-component=\"target-search\" data-event-receiver\u003E\u003Cheader class=\"header\" data-flow=\"column\"\u003E\u003Clabel for=\"search-input\"\u003E" + (pug.escape(null == (pug_interp = label("searchHeader")) ? "" : pug_interp)) + "\u003C\u002Flabel\u003E\u003Cdiv class=\"input-wrapper\" data-ref=\"inputWrapper\"\u003E\u003Cinput" + (" class=\"search\""+" id=\"search-input\" data-ref=\"search\""+pug.attr("placeholder", label("searchPlaceholder"), true, true)+" spellcheck=\"false\" tabindex=\"3\" type=\"text\"") + "\u003E\u003Cdiv class=\"search-clear\" data-ref=\"searchClear\" tabindex=\"3\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fheader\u003E\u003Cdiv class=\"entries\" data-flow=\"column\" data-ref=\"entriesContainer\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";}.call(this,"label" in locals_for_with?locals_for_with.label:typeof label!=="undefined"?label:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(3);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection data-flow=\"column\" data-component=\"target-wrapper\"\u003E\u003Cdiv class=\"target-mount\" data-ref=\"targetMount\" tabindex=\"3\"\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 30 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"-3 -3 22 22\" stroke-linecap=\"round\"><path d=\"M1 1l14 14M1 15L15 1\"></path></svg>"

/***/ },
/* 31 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\" stroke-linecap=\"round\"><path d=\"M1 1l14 14M1 15L15 1\"></path></svg>"

/***/ },
/* 32 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\" stroke-linecap=\"round\"><path d=\"M4 1l7 7M4 15l7-7\"></path></svg>"

/***/ },
/* 33 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\" stroke-linecap=\"round\"><path d=\"M11 1L4 8M11 15L4 8\"></path></svg>"

/***/ },
/* 34 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\" stroke-width=\"1\" stroke-linecap=\"round\"><circle cx=\"6.5\" cy=\"6.5\" r=\"5.5\" fill=\"none\"></circle><path d=\"M10.5,10.5 L15,15\"></path></svg>"

/***/ },
/* 35 */
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
/* 36 */
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
/* 37 */
/***/ function(module, exports) {

/* (ignored) */

/***/ },
/* 38 */
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