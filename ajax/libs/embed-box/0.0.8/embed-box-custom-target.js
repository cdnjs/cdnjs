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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* unused harmony export initializeStore *//* harmony export */ exports["a"] = getStore;/* unused harmony export destroyStore */var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
/* 1 */
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
    str = str || __webpack_require__(16).readFileSync(filename, 'utf8')
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__before_content_pug__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__before_content_pug___default = __WEBPACK_IMPORTED_MODULE_0__before_content_pug__ && __WEBPACK_IMPORTED_MODULE_0__before_content_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_0__before_content_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_0__before_content_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_0__before_content_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_0__before_content_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__after_content_pug__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__after_content_pug___default = __WEBPACK_IMPORTED_MODULE_1__after_content_pug__ && __WEBPACK_IMPORTED_MODULE_1__after_content_pug__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_1__after_content_pug__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_1__after_content_pug__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_1__after_content_pug___default, 'a', __WEBPACK_IMPORTED_MODULE_1__after_content_pug___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_components_base_component__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_clipboard__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_clipboard___default = __WEBPACK_IMPORTED_MODULE_3_clipboard__ && __WEBPACK_IMPORTED_MODULE_3_clipboard__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_3_clipboard__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_3_clipboard__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_3_clipboard___default, 'a', __WEBPACK_IMPORTED_MODULE_3_clipboard___default);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lib_store__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_autobind_decorator__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_autobind_decorator___default = __WEBPACK_IMPORTED_MODULE_5_autobind_decorator__ && __WEBPACK_IMPORTED_MODULE_5_autobind_decorator__.__esModule ? function() { return __WEBPACK_IMPORTED_MODULE_5_autobind_decorator__['default'] } : function() { return __WEBPACK_IMPORTED_MODULE_5_autobind_decorator__; };
/* harmony import */ __webpack_require__.d(__WEBPACK_IMPORTED_MODULE_5_autobind_decorator___default, 'a', __WEBPACK_IMPORTED_MODULE_5_autobind_decorator___default);

/* harmony export */ __webpack_require__.d(exports, "default", function() { return BaseTarget; });var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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









var AUTO_DOWNLOAD_DELAY = 3000;

var BaseTarget = (_class = (_temp = _class2 = function (_BaseComponent) {
  _inherits(BaseTarget, _BaseComponent);

  function BaseTarget() {
    _classCallCheck(this, BaseTarget);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BaseTarget).apply(this, arguments));
  }

  _createClass(BaseTarget, [{
    key: "compileTemplate",
    value: function compileTemplate() {
      __WEBPACK_IMPORTED_MODULE_2_components_base_component__["a" /* default */].prototype.compileTemplate.call(this, this.templateVars);

      this.element.setAttribute("data-component", this.id + "-target");
      this.element.setAttribute("data-column", "");
      this.element.setAttribute("autofocus", "");
      this.element.className = "markdown instructions " + (this.element.className || "");

      return this.element;
    }
  }, {
    key: "render",
    value: function render() {
      this.compileTemplate();

      var _getStore = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lib_store__["a" /* getStore */])();

      var autoDownload = _getStore.autoDownload;
      var iframe = _getStore.iframe;
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

        var clipboard = new __WEBPACK_IMPORTED_MODULE_3_clipboard___default.a(copyButton, { text: function text() {
            return copyableContent.textContent;
          } });

        clipboard.on("success", function () {
          copyButton.setAttribute("data-status", "copied");
          setTimeout(function () {
            return copyButton.removeAttribute("data-status");
          }, 600);
        });
      });

      if (autoDownload && this.downloadURL) {
        setTimeout(this.startDownload, AUTO_DOWNLOAD_DELAY);
      }

      return this.element;
    }
  }, {
    key: "renderBeforeContent",
    value: function renderBeforeContent() {
      return this.constructor.beforeContentTemplate.call(this, { config: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lib_store__["a" /* getStore */])() });
    }
  }, {
    key: "renderAfterContent",
    value: function renderAfterContent() {
      return this.constructor.afterContentTemplate.call(this, { config: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lib_store__["a" /* getStore */])() });
    }
  }, {
    key: "startDownload",
    value: function startDownload() {
      var downloadIframe = document.createElement("iframe");

      downloadIframe.className = "embed-box-download-iframe";
      downloadIframe.src = this.downloadURL;
      document.body.appendChild(downloadIframe);
    }
  }, {
    key: "autoDownloadLabel",
    get: function get() {
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lib_store__["a" /* getStore */])().autoDownload ? "(Your download should begin automatically.)" : "";
    }
  }, {
    key: "downloadLabel",
    get: function get() {
      return "Download the " + this.label + " plugin";
    }
  }, {
    key: "downloadURL",
    get: function get() {
      return this.config.downloadURL || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lib_store__["a" /* getStore */])().downloadURL;
    }
  }, {
    key: "copyText",
    get: function get() {
      if (this.downloadURL) return "<script src=\"" + this.downloadURL + "\"></script>";

      return this.config.embedCode || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lib_store__["a" /* getStore */])().embedCode;
    }
  }, {
    key: "fallback",
    get: function get() {
      // TODO: move this to global config.
      return this.constructor.fallback;
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
      var storeUsesHead = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4_lib_store__["a" /* getStore */])().insertInHead;

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
    key: "templateVars",
    get: function get() {
      return this.constructor.templateVars;
    }
  }]);

  return BaseTarget;
}(__WEBPACK_IMPORTED_MODULE_2_components_base_component__["a" /* default */]), _class2.beforeContentTemplate = __WEBPACK_IMPORTED_MODULE_0__before_content_pug___default.a, _class2.afterContentTemplate = __WEBPACK_IMPORTED_MODULE_1__after_content_pug___default.a, _class2.extend = function extend() {
  var _class3, _temp2;

  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  var fallback = _ref.fallback;
  var id = _ref.id;
  var label = _ref.label;
  var template = _ref.template;
  var templateVars = _ref.templateVars;

  if (!id) throw new Error("EmbedBox: Target must have `id`");
  if (!label) throw new Error("EmbedBox: Target must have `label`");

  return _temp2 = _class3 = function (_BaseTarget) {
    _inherits(CustomTarget, _BaseTarget);

    function CustomTarget() {
      _classCallCheck(this, CustomTarget);

      return _possibleConstructorReturn(this, Object.getPrototypeOf(CustomTarget).apply(this, arguments));
    }

    return CustomTarget;
  }(BaseTarget), _class3.fallback = fallback || false, _class3.id = id, _class3.label = label, _class3.template = template || "", _class3.templateVars = templateVars || {}, _temp2;
}, _temp), (_applyDecoratedDescriptor(_class.prototype, "startDownload", [__WEBPACK_IMPORTED_MODULE_5_autobind_decorator___default.a], Object.getOwnPropertyDescriptor(_class.prototype, "startDownload"), _class.prototype)), _class);


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lib_store__ = __webpack_require__(0);

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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(14)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, __webpack_require__(5), __webpack_require__(15), __webpack_require__(10)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

var matches = __webpack_require__(11)

module.exports = function (element, selector, checkYoSelf) {
  var parent = checkYoSelf ? element : element.parentNode

  while (parent && parent !== document) {
    if (matches(parent, selector)) return parent;
    parent = parent.parentNode
  }
}


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

var closest = __webpack_require__(7);

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
/* 9 */
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

var is = __webpack_require__(9);
var delegate = __webpack_require__(8);

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
/* 11 */
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(1);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (config) {if (config.afterContent || this.config.afterContent) {
pug_html = pug_html + "\u003Cdiv data-content-slot=\"after\"\u003E\u003Cp\u003E" + (null == (pug_interp = config.afterContent) ? "" : pug_interp) + "\u003C\u002Fp\u003E\u003Cp\u003E" + (null == (pug_interp = this.config.afterContent) ? "" : pug_interp) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
}}.call(this,"config" in locals_for_with?locals_for_with.config:typeof config!=="undefined"?config:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

var pug = __webpack_require__(1);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (config) {if (config.beforeContent || this.config.beforeContent) {
pug_html = pug_html + "\u003Cdiv data-content-slot=\"before\"\u003E\u003Cp\u003E" + (null == (pug_interp = config.beforeContent) ? "" : pug_interp) + "\u003C\u002Fp\u003E\u003Cp\u003E" + (null == (pug_interp = this.config.beforeContent) ? "" : pug_interp) + "\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E";
}}.call(this,"config" in locals_for_with?locals_for_with.config:typeof config!=="undefined"?config:undefined));;return pug_html;};
module.exports = template;

/***/ },
/* 14 */
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
/* 15 */
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
/* 16 */
/***/ function(module, exports) {

/* (ignored) */

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

/* eslint-env node, es6 */
var BaseTarget = __webpack_require__(2).default;

module.exports = BaseTarget;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=embed-box-custom-target.map