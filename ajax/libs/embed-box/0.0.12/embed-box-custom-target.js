(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("EmbedBoxCustomTarget", [], factory);
	else if(typeof exports === 'object')
		exports["EmbedBoxCustomTarget"] = factory();
	else
		root["EmbedBoxCustomTarget"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
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
    str = str || __webpack_require__(29).readFileSync(filename, 'utf8')
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_target_pug__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_target_pug___default = __WEBPACK_IMPORTED_MODULE_0__base_target_pug__ && __WEBPACK_IMPORTED_MODULE_0__base_target_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__base_target_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__base_target_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__base_target_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__base_target_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__title_pug__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__title_pug___default = __WEBPACK_IMPORTED_MODULE_1__title_pug__ && __WEBPACK_IMPORTED_MODULE_1__title_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__title_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__title_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__title_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_1__title_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__download_link_pug__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__download_link_pug___default = __WEBPACK_IMPORTED_MODULE_2__download_link_pug__ && __WEBPACK_IMPORTED_MODULE_2__download_link_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2__download_link_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2__download_link_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2__download_link_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_2__download_link_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__before_content_pug__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__before_content_pug___default = __WEBPACK_IMPORTED_MODULE_3__before_content_pug__ && __WEBPACK_IMPORTED_MODULE_3__before_content_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3__before_content_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3__before_content_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_3__before_content_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_3__before_content_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__after_content_pug__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__after_content_pug___default = __WEBPACK_IMPORTED_MODULE_4__after_content_pug__ && __WEBPACK_IMPORTED_MODULE_4__after_content_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_4__after_content_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_4__after_content_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_4__after_content_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_4__after_content_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_autobind_decorator__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_5_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_5_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_5_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_5_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_5_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_5_autobind_decorator___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_components_base_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_clipboard__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_clipboard___default = __WEBPACK_IMPORTED_MODULE_7_clipboard__ && __WEBPACK_IMPORTED_MODULE_7_clipboard__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_7_clipboard__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_7_clipboard__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_7_clipboard___default, 'a', __WEBPACK_IMPORTED_MODULE_7_clipboard___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_components_icons__ = __webpack_require__(6);

/* harmony export */ __webpack_require__.d(exports, "default", function() { return BaseTarget; });var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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












var BaseTarget = (_class = (_temp = _class2 = function (_BaseComponent) {
  _inherits(BaseTarget, _BaseComponent);

  BaseTarget.isConstructable = function isConstructable(config, store) {
    var policy = this.policy;

    var hasLocalEmbedCode = !!config.embedCode;
    var hasGlobalEmbedCode = !!store.embedCode;
    var embedCodePresent = hasLocalEmbedCode || hasGlobalEmbedCode;
    var hasDownloadURL = !!config.downloadURL;

    switch (policy) {
      case "EMBED":
        return embedCodePresent;
      case "DOWNLOAD":
        return hasDownloadURL;
      case "OR":
        return embedCodePresent && !hasDownloadURL || hasDownloadURL;
      case "NAND":
        // A `downloadURL` must be accompanied by an `embedCode`
        return hasDownloadURL && hasLocalEmbedCode || hasGlobalEmbedCode && !hasDownloadURL;
      default:
        return true;
    }
  };

  function BaseTarget() {
    var spec = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, BaseTarget);

    var _this = _possibleConstructorReturn(this, _BaseComponent.call(this, spec));

    _this.versionID = _this.config.versionID || _this.versionIDs[0];
    return _this;
  }

  BaseTarget.prototype.compileTemplate = function compileTemplate() {
    __WEBPACK_IMPORTED_MODULE_6_components_base_component__["a" /* default */].prototype.compileTemplate.call(this, this.templateVars);

    this.element.setAttribute("data-component", this.id + "-target");
    this.element.setAttribute("data-column", "");
    this.element.setAttribute("autofocus", "");
    this.element.className = "markdown instructions " + (this.element.className || "");

    return this.element;
  };

  BaseTarget.prototype.handleVersionChange = function handleVersionChange(_ref) {
    var value = _ref.target.value;

    this.versionID = value;
    this.render();
  };

  BaseTarget.prototype.bindCopyButtons = function bindCopyButtons() {
    var iframe = this.store.iframe;
    var _refs$copyButtons = this.refs.copyButtons;
    var copyButtons = _refs$copyButtons === undefined ? [] : _refs$copyButtons;


    copyButtons.forEach(function (copyButton) {
      var copyableContent = copyButton.parentNode.querySelector(".copyable");

      copyableContent.addEventListener("click", function () {
        var range = iframe.document.createRange();
        var selection = iframe.window.getSelection();

        range.selectNodeContents(copyableContent);
        selection.removeAllRanges();
        selection.addRange(range);
      });

      var clipboard = new __WEBPACK_IMPORTED_MODULE_7_clipboard___default.a(copyButton, { text: function text() {
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

    var stepsElement = this.serialize(version.template);

    this.refs.screenshotMounts = [];
    this.replaceElement(stepsMount, stepsElement);
    this.updateRefs();

    var _refs$screenshotMount = this.refs.screenshotMounts;
    var screenshotMounts = _refs$screenshotMount === undefined ? [] : _refs$screenshotMount;


    screenshotMounts.forEach(function (screenshotMount) {
      var Screenshot = version.screenshots[screenshotMount.getAttribute("data-screenshot")];
      var screenshot = new Screenshot();

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

    this.bindCopyButtons();

    if (previousElement) this.replaceElement(previousElement, this.element);

    return this.element;
  };

  BaseTarget.prototype.renderTitle = function renderTitle() {
    var icon = __WEBPACK_IMPORTED_MODULE_8_components_icons__[this.id] || __WEBPACK_IMPORTED_MODULE_8_components_icons__["generic"];

    return this.constructor.titleTemplate.call(this, {
      config: this.store,
      icon: icon.template
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
    downloadIframe.src = this.downloadURL;
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
      return "Download the " + this.label + " plugin";
    }
  }, {
    key: "downloadURL",
    get: function get() {
      return this.config.downloadURL;
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
      var targetUsesHead = this.config.insertInHead;
      var storeUsesHead = this.store.insertInHead;

      // Respect target specific falsey values.
      var insertInHead = typeof targetUsesHead !== "undefined" ? targetUsesHead : storeUsesHead;

      return insertInHead ? "head" : "body";
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
    key: "modalTitle",
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
}(__WEBPACK_IMPORTED_MODULE_6_components_base_component__["a" /* default */]), _class2.template = __WEBPACK_IMPORTED_MODULE_0__base_target_pug___default.a, _class2.titleTemplate = __WEBPACK_IMPORTED_MODULE_1__title_pug___default.a, _class2.beforeContentTemplate = __WEBPACK_IMPORTED_MODULE_3__before_content_pug___default.a, _class2.afterContentTemplate = __WEBPACK_IMPORTED_MODULE_4__after_content_pug___default.a, _class2.downloadLinkTemplate = __WEBPACK_IMPORTED_MODULE_2__download_link_pug___default.a, _class2.extend = function extend() {
  var _class3, _temp2;

  var _ref2 = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var id = _ref2.id;
  var label = _ref2.label;
  var policy = _ref2.policy;
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
  }(BaseTarget), _class3.id = id, _class3.label = label, _class3.policy = policy || "", _class3.templateVars = templateVars || {}, _class3.versions = [{ id: id + "-custom-version", template: template }], _temp2;
}, _temp), (_applyDecoratedDescriptor(_class.prototype, "handleVersionChange", [__WEBPACK_IMPORTED_MODULE_5_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "handleVersionChange"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "startDownload", [__WEBPACK_IMPORTED_MODULE_5_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "startDownload"), _class.prototype)), _class);


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

module.exports = (typeof Array.from === 'function' ?
  Array.from :
  __webpack_require__(5)
);


/***/ },
/* 5 */
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_components_base_component__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__close_svg__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__close_svg___default = __WEBPACK_IMPORTED_MODULE_1__close_svg__ && __WEBPACK_IMPORTED_MODULE_1__close_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__close_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__close_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__close_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_1__close_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drupal_svg__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__drupal_svg___default = __WEBPACK_IMPORTED_MODULE_2__drupal_svg__ && __WEBPACK_IMPORTED_MODULE_2__drupal_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_2__drupal_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_2__drupal_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_2__drupal_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_2__drupal_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__generic_svg__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__generic_svg___default = __WEBPACK_IMPORTED_MODULE_3__generic_svg__ && __WEBPACK_IMPORTED_MODULE_3__generic_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3__generic_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3__generic_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_3__generic_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_3__generic_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__joomla_svg__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__joomla_svg___default = __WEBPACK_IMPORTED_MODULE_4__joomla_svg__ && __WEBPACK_IMPORTED_MODULE_4__joomla_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_4__joomla_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_4__joomla_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_4__joomla_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_4__joomla_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__previous_svg__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__previous_svg___default = __WEBPACK_IMPORTED_MODULE_5__previous_svg__ && __WEBPACK_IMPORTED_MODULE_5__previous_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_5__previous_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_5__previous_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_5__previous_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_5__previous_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_svg__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_svg___default = __WEBPACK_IMPORTED_MODULE_6__search_svg__ && __WEBPACK_IMPORTED_MODULE_6__search_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_6__search_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_6__search_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_6__search_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_6__search_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__weebly_svg__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__weebly_svg___default = __WEBPACK_IMPORTED_MODULE_7__weebly_svg__ && __WEBPACK_IMPORTED_MODULE_7__weebly_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_7__weebly_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_7__weebly_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_7__weebly_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_7__weebly_svg___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__wordpress_svg__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__wordpress_svg___default = __WEBPACK_IMPORTED_MODULE_8__wordpress_svg__ && __WEBPACK_IMPORTED_MODULE_8__wordpress_svg__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_8__wordpress_svg__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_8__wordpress_svg__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_8__wordpress_svg___default, 'a', __WEBPACK_IMPORTED_MODULE_8__wordpress_svg___default);

/* harmony export */ __webpack_require__.d(exports, "close", function() { return close; });
/* harmony export */ __webpack_require__.d(exports, "drupal", function() { return drupal; });
/* harmony export */ __webpack_require__.d(exports, "generic", function() { return generic; });
/* harmony export */ __webpack_require__.d(exports, "joomla", function() { return joomla; });
/* harmony export */ __webpack_require__.d(exports, "previous", function() { return previous; });
/* harmony export */ __webpack_require__.d(exports, "search", function() { return search; });
/* harmony export */ __webpack_require__.d(exports, "weebly", function() { return weebly; });
/* harmony export */ __webpack_require__.d(exports, "wordpress", function() { return wordpress; });var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }



var toComponent = function toComponent(template) {
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


var close = toComponent(__WEBPACK_IMPORTED_MODULE_1__close_svg___default.a);


var drupal = toComponent(__WEBPACK_IMPORTED_MODULE_2__drupal_svg___default.a);


var generic = toComponent(__WEBPACK_IMPORTED_MODULE_3__generic_svg___default.a);


var joomla = toComponent(__WEBPACK_IMPORTED_MODULE_4__joomla_svg___default.a);


var previous = toComponent(__WEBPACK_IMPORTED_MODULE_5__previous_svg___default.a);


var search = toComponent(__WEBPACK_IMPORTED_MODULE_6__search_svg___default.a);


var weebly = toComponent(__WEBPACK_IMPORTED_MODULE_7__weebly_svg___default.a);


var wordpress = toComponent(__WEBPACK_IMPORTED_MODULE_8__wordpress_svg___default.a);

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(19)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(7), __webpack_require__(28), __webpack_require__(12)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

var matches = __webpack_require__(13)

module.exports = function (element, selector, checkYoSelf) {
  var parent = checkYoSelf ? element : element.parentNode

  while (parent && parent !== document) {
    if (matches(parent, selector)) return parent;
    parent = parent.parentNode
  }
}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

var closest = __webpack_require__(9);

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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

var is = __webpack_require__(11);
var delegate = __webpack_require__(10);

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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (config) {if (config.afterContent || this.config.afterContent) {
pug_html = pug_html + "\u003Cdiv data-content-slot=\"after\"\u003E\u003Cp\u003E" + (null == (pug_interp = config.afterContent) ? "" : pug_interp) + "\u003C\u002Fp\u003E\u003Cp\u003E" + (null == (pug_interp = this.config.afterContent) ? "" : pug_interp) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
}}.call(this,"config" in locals_for_with?locals_for_with.config:typeof config!=="undefined"?config:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Csection\u003E" + (null == (pug_interp = this.renderTitle()) ? "" : pug_interp) + (null == (pug_interp = this.renderBeforeContent()) ? "" : pug_interp) + "\u003Cdiv class=\"steps-mount\" data-ref=\"stepsMount\"\u003E\u003C\u002Fdiv\u003E" + (null == (pug_interp = this.renderAfterContent()) ? "" : pug_interp) + "\u003C\u002Fsection\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (config) {if (config.beforeContent || this.config.beforeContent) {
pug_html = pug_html + "\u003Cdiv data-content-slot=\"before\"\u003E\u003Cp\u003E" + (null == (pug_interp = config.beforeContent) ? "" : pug_interp) + "\u003C\u002Fp\u003E\u003Cp\u003E" + (null == (pug_interp = this.config.beforeContent) ? "" : pug_interp) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
}}.call(this,"config" in locals_for_with?locals_for_with.config:typeof config!=="undefined"?config:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Ch2\u003E\u003Ca" + (" class=\"more\""+pug.attr("href", this.downloadURL, true, true)+" download target=\"_blank\"") + "\u003E" + (pug.escape(null == (pug_interp = this.downloadLabel) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003Cdiv\u003E" + (pug.escape(null == (pug_interp = this.autoDownloadLabel) ? "" : pug_interp)) + "\u003C\u002Fdiv\u003E\u003C\u002Fh2\u003E";;return pug_html;};
module.exports = template;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (icon) {pug_html = pug_html + "\u003Cheader class=\"target-title\" data-column\u003E\u003Cdiv class=\"icon\"\u003E" + (null == (pug_interp = icon) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Ch1\u003E" + (null == (pug_interp = this.title) ? "" : pug_interp) + "\u003C\u002Fh1\u003E";
if (this.versionIDs.length > 1) {
pug_html = pug_html + "\u003Cdiv class=\"versions\"\u003E\u003Cdiv class=\"label\"\u003E" + (null == (pug_interp = this.instructionsLabel) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003Cselect data-ref=\"versionSelector\"\u003E";
// iterate this.versionIDs
var pug_obj0 = this.versionIDs;
if ('number' == typeof pug_obj0.length) {

  for (var pug_index0 = 0, pug_length0 = pug_obj0.length; pug_index0 < pug_length0; pug_index0++) {
    var versionID = pug_obj0[pug_index0];

pug_html = pug_html + "\u003Coption" + (pug.attr("selected", (versionID === this.versionID), true, true)) + "\u003E" + (pug.escape(null == (pug_interp = versionID) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
  }

} else {
  var pug_length0 = 0;
  for (var pug_index0 in pug_obj0) {
    pug_length0++;
    var versionID = pug_obj0[pug_index0];

pug_html = pug_html + "\u003Coption" + (pug.attr("selected", (versionID === this.versionID), true, true)) + "\u003E" + (pug.escape(null == (pug_interp = versionID) ? "" : pug_interp)) + "\u003C\u002Foption\u003E";
  }

}

pug_html = pug_html + "\u003C\u002Fselect\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fheader\u003E";}.call(this,"icon" in locals_for_with?locals_for_with.icon:typeof icon!=="undefined"?icon:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 19 */
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
/* 20 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\" version=\"1.1\" stroke-width=\"1\" stroke-linecap=\"round\"><path d=\"M1,1 L15,15\"></path><path d=\"M1,15 L15,1\"></path></svg>"

/***/ },
/* 21 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"50 50 400 425\" version=\"1.1\"><path d=\"M345.703,126.605c-21.036-13.098-40.882-18.258-60.729-31.356c-12.304-8.335-29.371-28.181-43.66-45.249 c-2.779,27.387-11.114,38.501-20.64,46.439c-20.243,15.876-32.944,20.64-50.408,30.166C155.58,134.146,75.8,181.776,75.8,284.18 C75.8,386.586,161.931,462,257.588,462S436.2,392.539,436.2,287.356C436.2,182.173,358.405,134.543,345.703,126.605z M347.996,424.645c-1.984,1.985-20.242,14.687-41.676,16.671s-50.409,3.175-67.873-12.701c-2.778-2.778-1.984-6.748,0-8.336 c1.984-1.587,3.572-2.778,5.954-2.778c2.381,0,1.984,0,3.175,0.794c7.938,6.351,19.846,11.511,45.249,11.511 c25.402,0,43.264-7.145,51.202-13.098c3.572-2.779,5.16-0.397,5.557,1.19C349.982,419.486,350.775,421.867,347.996,424.645z M278.536,388.526c4.366-3.969,11.511-10.32,18.258-13.099c6.748-2.778,10.32-2.381,16.671-2.381s13.098,0.396,17.861,3.572 c4.763,3.175,7.541,10.319,9.129,14.289c1.588,3.969,0,6.351-3.176,7.938c-2.778,1.587-3.175,0.793-5.953-4.366 c-2.778-5.16-5.16-10.32-19.053-10.32c-13.892,0-18.258,4.763-25.005,10.32c-6.748,5.557-9.13,7.541-11.511,4.366 C273.376,395.671,274.17,392.495,278.536,388.526z M383.719,391.702c-14.289-1.191-42.867-45.646-61.125-46.439 c-23.021-0.794-73.033,48.026-112.328,48.026c-23.815,0-30.959-3.572-38.898-8.731c-11.907-8.336-17.861-21.037-17.464-38.501 c0.397-30.96,29.372-59.935,65.888-60.332c46.439-0.396,78.59,46.043,102.008,45.646c19.846-0.396,57.95-39.295,76.605-39.295 c19.846,0,25.402,20.64,25.402,32.944s-3.969,34.532-13.495,48.424C400.786,387.336,394.833,392.495,383.719,391.702z\"></path></svg>"

/***/ },
/* 22 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 117 108\" version=\"1.1\"><path d=\"M75,33.3846154 L95.3478261,52 L75,69.7692308 L75,85 L114,52 L77.3198276,20.962931 L75,33.3846154 Z\"></path><path d=\"M44,105 L58,90 L74,2.5 L60,18.5 L44,103.5 Z\"></path><path d=\"M42,19 L42,33.0667892 L21.6521739,52 L43,70.7692308 L40.2767241,83.6956897 L3,52 L42,19 Z\"></path></svg>"

/***/ },
/* 23 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 430 422\" version=\"1.1\"><path d=\"M308.584,49.669 C312.281,22 336.007,0.681 364.699,0.681 C396.002,0.681 421.398,26.055 421.398,57.369 C421.398,84.515 402.259,107.177 376.762,112.696 C380.817,123.499 382.957,134.784 382.906,146.068 C382.803,168.156 374.509,188.523 359.487,203.382 L354.09,208.738 L310.713,165.874 C314.43,162.178 316.571,160.037 316.571,160.037 C320.933,155.715 321.896,149.941 321.896,145.824 C321.958,136.546 317.574,126.829 309.956,119.159 C297.074,106.206 278.396,103.01 269.119,112.226 C269.119,112.226 216.444,164.481 172.494,208.072 L129.087,165.187 C173.119,121.483 226.182,68.9 226.182,68.9 C247.676,47.55 279.082,41.405 308.583,49.67 L308.584,49.669 Z M65.27,0.681 C94.003,0.681 117.668,22 121.385,49.669 C150.876,41.406 182.303,47.549 203.817,68.91 C203.817,68.91 205.824,70.927 209.377,74.399 L165.806,117.131 C162.622,113.977 160.86,112.226 160.86,112.226 C151.582,103.01 132.884,106.205 120.013,119.159 C112.425,126.829 108.032,136.546 108.053,145.824 C108.083,149.93 109.067,155.716 113.439,160.037 C113.439,160.037 167.301,213.5 211.016,256.846 L167.466,299.577 L70.473,203.372 C55.461,188.524 47.197,168.157 47.054,146.058 C47.023,134.773 49.153,123.489 53.168,112.686 C27.701,107.167 8.593,84.506 8.593,57.359 C8.603,26.045 33.978,0.681 65.271,0.681 L65.27,0.681 Z M146.904,380.144 C135.528,380.093 124.141,377.81 113.368,373.652 C109.067,400.655 85.679,421.309 57.427,421.309 C26.134,421.309 0.749,395.944 0.749,364.641 C0.749,335.18 23.247,310.973 51.97,308.229 C49.082,299.064 47.577,289.551 47.638,280.049 C47.72,258.003 56.024,237.604 71.006,222.777 C71.006,222.777 72.686,221.097 75.614,218.179 L118.806,261.249 C115.724,264.352 113.952,266.072 113.952,266.072 C109.59,270.434 108.637,276.209 108.637,280.296 C108.617,289.614 112.938,299.301 120.577,306.971 C128.185,314.671 137.873,319.095 147.13,319.136 C151.256,319.136 157.094,318.256 161.425,313.903 C161.425,313.903 214.161,261.587 258.132,217.985 L301.334,261.055 L204.351,357.219 C189.4,372.067 169.013,380.218 146.904,380.147 L146.904,380.144 Z M372.563,421.309 C344.321,421.309 320.923,400.645 316.622,373.652 C305.798,377.81 294.442,380.093 283.086,380.144 C260.988,380.226 240.61,372.075 225.609,357.216 L219.362,351.052 L263.128,308.546 C267.47,312.837 268.586,313.902 268.586,313.902 C272.948,318.254 278.682,319.135 282.83,319.135 C292.066,319.094 301.794,314.671 309.393,306.97 C317.052,299.3 321.395,289.613 321.333,280.295 C321.333,276.22 320.371,270.434 315.977,266.071 C315.977,266.071 265.596,214.236 221.421,170.46 L264.111,127.729 C308.113,171.372 358.974,222.777 358.974,222.777 C373.955,237.604 382.27,257.993 382.352,280.049 C382.434,289.551 380.888,299.064 378.01,308.229 C406.774,310.974 429.272,335.181 429.272,364.641 C429.262,395.955 403.836,421.309 372.563,421.309 L372.563,421.309 Z\"></path></svg>"

/***/ },
/* 24 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 16 16\" version=\"1.1\" stroke-width=\"1\" stroke-linecap=\"round\"><path d=\"M11,1 L4,8\"></path><path d=\"M11,15 L4,8\"></path></svg>"

/***/ },
/* 25 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 133 145\" version=\"1.1\"><g stroke-width=\"1\" fill-rule=\"evenodd\"><g transform=\"translate(66, 72) scale(-1, 1) translate(-66, -72) translate(4, 4)\" stroke-width=\"7\"><path d=\"M0.103,95.114 L36.8651,135.85\" stroke-linecap=\"square\" transform=\"translate(18.5, 115.5) scale(-1, 1) translate(-18.5, -115.5) \"></path><ellipse fill=\"none\" cx=\"71\" cy=\"53\" rx=\"53\" ry=\"53\"></ellipse></g></g></svg>"

/***/ },
/* 26 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 256 197\" version=\"1.1\"><path d=\"M212.310219,0 C192.338025,0 175.69345,13.2780923 170.587862,33.1498909 C161.385496,3.29037604 137.831456,0.0226699137 128.004048,0.0226699137 C118.179879,0.0226699137 94.6339353,3.29037604 85.4137576,33.1434138 C80.3065499,13.2894272 63.6603561,0.0226699137 43.69302,0.0226699137 C19.1917012,0.0226699137 0,17.5384168 0,39.8974288 C0,49.7847497 2.44349284,57.6787375 5.39543945,66.2414877 L38.6619185,160.316772 C49.8009425,191.51705 72.493526,196.175717 85.028369,196.175717 C104.689661,196.175717 120.011284,186.105418 128.00081,168.259338 C135.998431,186.186382 151.321674,196.306879 170.97325,196.306879 C183.4919,196.306879 206.161814,191.640115 217.357513,160.324868 L250.80859,65.9289668 L251.069294,65.1500933 C251.451444,63.9404915 251.836832,62.8053765 252.20117,61.7269363 C253.982378,56.4578007 256,50.4842784 256,43.1635156 C256,18.153743 237.626035,0 212.310219,0 L212.310219,0 Z M228.078763,57.8746703 L194.629305,152.270571 C190.545482,163.69135 183.752604,172.192568 170.97325,172.192568 C159.000297,172.192568 151.930523,165.521136 148.398874,154.089022 L128.271229,91.2642146 L127.723913,91.2642146 L107.607603,154.089022 C104.069477,165.522755 96.9980834,172.061406 85.028369,172.061406 C72.2457763,172.061406 65.4480407,163.629818 61.3706948,152.209039 L28.1932762,58.3847434 C25.4728866,50.4956134 24.114311,45.6134856 24.114311,39.8958095 C24.114311,31.1905626 32.2770992,24.1369809 43.69302,24.1369809 C53.2127645,24.1369809 60.0105,30.4133085 62.1868117,39.6593947 L84.7595686,114.496018 L85.300408,114.496018 L108.145204,41.3078212 C111.14249,30.7031595 116.578412,24.1369809 128.004048,24.1369809 C139.423208,24.1369809 144.860748,30.6918245 147.851558,41.2964863 L170.697973,114.496018 L171.237193,114.496018 L193.818046,39.6593947 C195.991119,30.4133085 202.787236,24.114311 212.310219,24.114311 C223.726139,24.114311 231.885689,31.1938012 231.885689,43.1635156 C231.885689,47.5129005 229.976558,51.8817167 228.078763,57.8746703 L228.078763,57.8746703 Z\"></path></path></svg>"

/***/ },
/* 27 */
/***/ function(module, exports) {

module.exports = "<svg viewBox=\"0 0 123 123\" version=\"1.1\"><path d=\"M61.262,0 C27.483,0 0,27.481 0,61.26 C0,95.043 27.483,122.523 61.262,122.523 C95.04,122.523 122.527,95.043 122.527,61.26 C122.526,27.481 95.04,0 61.262,0 Z M107.376,36.046 C107.602,37.72 107.73,39.517 107.73,41.45 C107.73,46.783 106.734,52.778 103.734,60.274 L87.681,106.687 C103.305,97.576 113.814,80.649 113.814,61.261 C113.815,52.124 111.481,43.532 107.376,36.046 Z M62.184,65.857 L46.416,111.676 C51.124,113.06 56.103,113.817 61.262,113.817 C67.382,113.817 73.251,112.759 78.714,110.838 C78.573,110.613 78.445,110.374 78.34,110.114 L62.184,65.857 Z M96.74,58.608 C96.74,52.113 94.407,47.615 92.406,44.114 C89.742,39.785 87.245,36.119 87.245,31.79 C87.245,26.959 90.909,22.462 96.07,22.462 C96.303,22.462 96.524,22.491 96.751,22.504 C87.401,13.938 74.944,8.708 61.262,8.708 C42.902,8.708 26.749,18.128 17.352,32.396 C18.585,32.433 19.747,32.459 20.734,32.459 C26.231,32.459 34.74,31.792 34.74,31.792 C37.573,31.625 37.907,35.786 35.077,36.121 C35.077,36.121 32.23,36.456 29.062,36.622 L48.2,93.547 L59.701,59.054 L51.513,36.62 C48.683,36.454 46.002,36.119 46.002,36.119 C43.17,35.953 43.502,31.623 46.334,31.79 C46.334,31.79 55.013,32.457 60.177,32.457 C65.673,32.457 74.183,31.79 74.183,31.79 C77.018,31.623 77.351,35.784 74.52,36.119 C74.52,36.119 71.667,36.454 68.505,36.62 L87.497,93.114 L92.739,75.597 C95.011,68.328 96.74,63.107 96.74,58.608 Z M8.708,61.26 C8.708,82.062 20.797,100.039 38.327,108.558 L13.258,39.872 C10.342,46.408 8.708,53.641 8.708,61.26 Z\" fill-rule=\"evenodd\"></path></svg>"

/***/ },
/* 28 */
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
/* 29 */
/***/ function(module, exports) {

/* (ignored) */

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

/* eslint-env node, es6 */
var BaseTarget = __webpack_require__(3).default;

module.exports = BaseTarget;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=embed-box-custom-target.map