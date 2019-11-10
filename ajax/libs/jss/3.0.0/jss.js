(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jss"] = factory();
	else
		root["jss"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * StyleSheets written in javascript.
	 *
	 * @copyright Oleg Slobodskoi 2015
	 * @website https://github.com/jsstyles/jss
	 * @license MIT
	 */

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Jss = __webpack_require__(1);

	var _Jss2 = _interopRequireDefault(_Jss);

	exports['default'] = new _Jss2['default']();
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _StyleSheet = __webpack_require__(2);

	var _StyleSheet2 = _interopRequireDefault(_StyleSheet);

	var _PluginsRegistry = __webpack_require__(11);

	var _PluginsRegistry2 = _interopRequireDefault(_PluginsRegistry);

	var _uid = __webpack_require__(6);

	var uid = _interopRequireWildcard(_uid);

	var _createRule2 = __webpack_require__(4);

	var _createRule3 = _interopRequireDefault(_createRule2);

	/**
	 * Main Jss class.
	 *
	 * @api public
	 */

	var Jss = (function () {
	  function Jss() {
	    _classCallCheck(this, Jss);

	    this.plugins = new _PluginsRegistry2['default']();
	    this.uid = uid;
	  }

	  /**
	   * Creates a new instance of Jss.
	   *
	   * @see Jss
	   * @api public
	   */

	  Jss.prototype.create = function create() {
	    return new Jss();
	  };

	  /**
	   * Create a stylesheet.
	   *
	   * @see StyleSheet
	   * @api public
	   */

	  Jss.prototype.createStyleSheet = function createStyleSheet(rules) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    options.jss = this;
	    return new _StyleSheet2['default'](rules, options);
	  };

	  /**
	   * Create a rule.
	   *
	   * @see createRule
	   * @api public
	   */

	  Jss.prototype.createRule = function createRule(selector, style, options) {
	    // Enable rule without selector.
	    if (typeof selector == 'object') {
	      options = style;
	      style = selector;
	      selector = null;
	    }
	    if (!options) options = {};
	    options.jss = this;
	    var rule = _createRule3['default'](selector, style, options);
	    this.plugins.run(rule);
	    return rule;
	  };

	  /**
	   * Register plugin. Passed function will be invoked with a rule instance.
	   *
	   * @param {Function} fn
	   * @api public
	   */

	  Jss.prototype.use = function use(fn) {
	    this.plugins.use(fn);
	    return this;
	  };

	  return Jss;
	})();

	exports['default'] = Jss;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _dom = __webpack_require__(3);

	var dom = _interopRequireWildcard(_dom);

	var _createRule2 = __webpack_require__(4);

	var _createRule3 = _interopRequireDefault(_createRule2);

	/**
	 * StyleSheet abstraction, contains rules, injects stylesheet into dom.
	 *
	 * Options:
	 *
	 *  - 'media' style element attribute
	 *  - 'title' style element attribute
	 *  - 'type' style element attribute
	 *  - 'named' true by default - keys are names, selectors will be generated,
	 *    if false - keys are global selectors.
	 *  - 'link' link jss Rule instances with DOM CSSRule instances so that styles,
	 *  can be modified dynamically, false by default because it has some performance cost.
	 *
	 * @param {Object} [rules] object with selectors and declarations
	 * @param {Object} [options]
	 * @api public
	 */

	var StyleSheet = (function () {
	  function StyleSheet(rules) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    _classCallCheck(this, StyleSheet);

	    if (options.named == null) options.named = true;
	    this.options = options;
	    this.element = null;
	    this.attached = false;
	    this.media = options.media;
	    this.type = options.type;
	    this.title = options.title;
	    this.rules = {};
	    // Only when options.named: true.
	    this.classes = {};
	    this.deployed = false;
	    this.linked = false;
	    this.element = dom.createStyle(this);
	    for (var _name in rules) {
	      this.createRule(_name, rules[_name]);
	    }
	  }

	  /**
	   * Insert stylesheet element to render tree.
	   *
	   * @api public
	   * @return {StyleSheet}
	   */

	  StyleSheet.prototype.attach = function attach() {
	    if (this.attached) return this;
	    if (!this.deployed) this.deploy();
	    dom.appendStyle(this.element);
	    // Before element is attached to the dom rules are not created.
	    if (!this.linked && this.options.link) this.link();
	    this.attached = true;
	    return this;
	  };

	  /**
	   * Remove stylesheet element from render tree.
	   *
	   * @return {StyleSheet}
	   * @api public
	   */

	  StyleSheet.prototype.detach = function detach() {
	    if (!this.attached) return this;
	    dom.removeElement(this.element);
	    this.attached = false;
	    return this;
	  };

	  /**
	   * Add a rule to the current stylesheet. Will insert a rule also after the stylesheet
	   * has been rendered first time.
	   *
	   * @param {Object} [name] can be selector or name if ´options.named is true
	   * @param {Object} style property/value hash
	   * @return {Rule}
	   * @api public
	   */

	  StyleSheet.prototype.addRule = function addRule(name, style) {
	    var rule = this.createRule(name, style);
	    // Don't insert rule directly if there is no stringified version yet.
	    // It will be inserted all together when .attach is called.
	    if (this.deployed) {
	      var DOMRule = dom.insertCssRule(this.element, rule.toString());
	      if (this.options.link) rule.DOMRule = DOMRule;
	    }
	    return rule;
	  };

	  /**
	   * Create rules, will render also after stylesheet was rendered the first time.
	   *
	   * @param {Object} rules name:style hash.
	   * @return {Array} array of added rules
	   * @api public
	   */

	  StyleSheet.prototype.addRules = function addRules(rules) {
	    var added = [];
	    for (var _name2 in rules) {
	      added.push(this.addRule(_name2, rules[_name2]));
	    }
	    return added;
	  };

	  /**
	   * Get a rule.
	   *
	   * @param {String} name can be selector or name if `named` option is true.
	   * @return {Rule}
	   * @api public
	   */

	  StyleSheet.prototype.getRule = function getRule(name) {
	    return this.rules[name];
	  };

	  /**
	   * Convert rules to a css string.
	   *
	   * @param {Object} options
	   * @return {String}
	   * @api public
	   */

	  StyleSheet.prototype.toString = function toString(options) {
	    var str = '';
	    var rules = this.rules;

	    var stringified = {};
	    for (var _name3 in rules) {
	      var rule = rules[_name3];
	      // We have the same rule referenced twice if using named rules.
	      // By name and by selector.
	      if (stringified[rule.id]) {
	        continue;
	      }
	      if (str) str += '\n';
	      str += rules[_name3].toString(options);
	      stringified[rule.id] = true;
	    }
	    return str;
	  };

	  /**
	   * Create a rule, will not render after stylesheet was rendered the first time.
	   * Will link the rule in `this.rules`.
	   *
	   * @see createRule
	   * @api private
	   */

	  StyleSheet.prototype.createRule = function createRule(name, style) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    // Scope options overwrite instance options.
	    if (options.named == null) options.named = this.options.named;
	    options.sheet = this;
	    options.jss = this.options.jss;
	    var rule = _createRule3['default'](name, style, options);
	    // Register conditional rule, it will stringify it's child rules properly.
	    if (rule.type === 'conditional') {
	      this.rules[rule.selector] = rule;
	    }
	    // This is a rule which is a child of a condtional rule.
	    // We need to register its class name only.
	    else if (rule.options.parent && rule.options.parent.type === 'conditional') {
	        // Only named rules should be referenced in `classes`.
	        if (rule.options.named) this.classes[name] = rule.className;
	      } else {
	        this.rules[rule.selector] = rule;
	        if (options.named) {
	          this.rules[name] = rule;
	          this.classes[name] = rule.className;
	        }
	      }
	    options.jss.plugins.run(rule);
	    return rule;
	  };

	  /**
	   * Deploy styles to the element.
	   *
	   * @return {StyleSheet}
	   * @api private
	   */

	  StyleSheet.prototype.deploy = function deploy() {
	    if (!this.element) return this;
	    this.element.innerHTML = '\n' + this.toString() + '\n';
	    this.deployed = true;
	    return this;
	  };

	  /**
	   * Find CSSRule objects in the DOM and link them in the corresponding Rule instance.
	   *
	   * @return {StyleSheet}
	   * @api private
	   */

	  StyleSheet.prototype.link = function link() {
	    var cssRules = dom.getCssRules(this.element);
	    if (!cssRules) return this;
	    for (var i = 0; i < cssRules.length; i++) {
	      var DOMRule = cssRules[i];
	      var rule = this.rules[DOMRule.selectorText];
	      if (rule) rule.DOMRule = DOMRule;
	    }
	    this.linked = true;
	    return this;
	  };

	  return StyleSheet;
	})();

	exports['default'] = StyleSheet;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.createStyle = createStyle;
	exports.appendStyle = appendStyle;
	exports.getCssRules = getCssRules;
	exports.insertCssRule = insertCssRule;
	exports.removeElement = removeElement;
	var sheetAttrs = ['title', 'type', 'media'];

	/**
	 * Create style element, add attributes.
	 *
	 * @param {StyleSheet} sheet
	 * @return {Element}
	 * @api private
	 */

	function createStyle(sheet) {
	  var element = document.createElement('style');
	  sheetAttrs.forEach(function (name) {
	    if (sheet[name]) element.setAttribute(name, sheet[name]);
	  });
	  return element;
	}

	/**
	 * Insert style element into head.
	 *
	 * @param {Element} element
	 * @api private
	 */

	function appendStyle(element) {
	  document.head.appendChild(element);
	}

	/**
	 * Get cssRules collection from a sheet
	 *
	 * @param {Element} element
	 * @return {CSSRules}
	 * @api private
	 */

	function getCssRules(element) {
	  return element && element.sheet && element.sheet.cssRules;
	}

	/**
	 * Insert a rule string into a style element.
	 *
	 * @param {Element} element
	 * @param {String} ruleStr
	 * @return {CSSRule}
	 * @api private
	 */

	function insertCssRule(element, ruleStr) {
	  var rules = getCssRules(element);
	  var nextIndex = rules.length;
	  element.sheet.insertRule(ruleStr, nextIndex);
	  return rules[nextIndex];
	}

	/**
	 * Remove element from the dom tree.
	 *
	 * @param {Element} element
	 * @api private
	 */

	function removeElement(element) {
	  element.parentNode.removeChild(element);
	}

	function noDOM() {}
	// For serverside rendering all functions will return undefined.
	if (typeof document == 'undefined') {
	  for (var _name in exports) {
	    if (typeof exports[_name] == 'function') {
	      exports[_name] = noDOM;
	    }
	  }
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = createRule;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Rule = __webpack_require__(5);

	var _Rule2 = _interopRequireDefault(_Rule);

	var _SimpleRule = __webpack_require__(8);

	var _SimpleRule2 = _interopRequireDefault(_SimpleRule);

	var _KeyframeRule = __webpack_require__(9);

	var _KeyframeRule2 = _interopRequireDefault(_KeyframeRule);

	var _ConditionalRule = __webpack_require__(10);

	var _ConditionalRule2 = _interopRequireDefault(_ConditionalRule);

	/**
	 * Map of at rules to corresponding implementation class.
	 *
	 * @type {Object}
	 */
	var atRuleClassMap = {
	  '@charset': _SimpleRule2['default'],
	  '@import': _SimpleRule2['default'],
	  '@namespace': _SimpleRule2['default'],
	  '@keyframes': _KeyframeRule2['default'],
	  '@media': _ConditionalRule2['default'],
	  '@supports': _ConditionalRule2['default'],
	  '@font-face': _Rule2['default']
	};

	var atRuleNameRegExp = /^@[^ ]+/;

	/**
	 * Create rule factory.
	 *
	 * @param {Object} [selector] if you don't pass selector - it will be generated
	 * @param {Object} [style] declarations block
	 * @param {Object} [options] rule options
	 * @return {Object} rule
	 * @api private
	 */

	function createRule(selector) {
	  var style = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  // Is an at-rule.
	  if (selector && selector[0] === '@') {
	    var _name = atRuleNameRegExp.exec(selector)[0];
	    var AtRule = atRuleClassMap[_name];
	    // We use regular rule class to handle font rule,
	    // font-face rule should not be named.
	    if (_name === '@font-face' && options.named) {
	      options = _extends({}, options, { named: false });
	    }
	    return new AtRule(selector, style, options);
	  }
	  if (options.named == null) options.named = true;
	  return new _Rule2['default'](selector, style, options);
	}

	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _uid = __webpack_require__(6);

	var uid = _interopRequireWildcard(_uid);

	var _clone = __webpack_require__(7);

	var _clone2 = _interopRequireDefault(_clone);

	/**
	 * Class name prefix when generated.
	 *
	 * @type {String}
	 * @api private
	 */
	var namespacePrefix = 'jss';

	/**
	 * Indentation string for formatting toString output.
	 *
	 * @type {String}
	 * @api private
	 */
	var indentWith = '  ';

	/**
	 * Regular rule.
	 *
	 * @api private
	 */

	var Rule = (function () {
	  function Rule(selector, style, options) {
	    _classCallCheck(this, Rule);

	    this.type = 'regular';
	    this.id = uid.get();
	    this.options = options;
	    this.selector = selector;
	    if (options.named) {
	      // Selector is a rule name, we need to ref it for e.g. for jss-debug.
	      this.name = selector;
	      this.className = options.className || namespacePrefix + '-' + this.id;
	      this.selector = '.' + this.className;
	    }
	    // We expect style to be plain object.
	    this.style = _clone2['default'](style);
	  }

	  /**
	   * Indent a string.
	   *
	   * http://jsperf.com/array-join-vs-for
	   *
	   * @param {Number} level
	   * @param {String} str
	   * @return {String}
	   * @api private
	   */

	  /**
	   * Get or set a style property.
	   *
	   * @param {String} name
	   * @param {String|Number} [value]
	   * @return {Rule|String|Number}
	   * @api public
	   */

	  Rule.prototype.prop = function prop(name, value) {
	    // Its a setter.
	    if (value != null) {
	      this.style[name] = value;
	      // If linked option in StyleSheet is not passed, DOMRule is not defined.
	      if (this.DOMRule) this.DOMRule.style[name] = value;
	      return this;
	    }
	    // Its a getter, read the value from the DOM if its not cached.
	    if (this.DOMRule && this.style[name] == null) {
	      // Cache the value after we have got it from the DOM once.
	      this.style[name] = this.DOMRule.style[name];
	    }
	    return this.style[name];
	  };

	  /**
	   * Apply rule to an element inline.
	   *
	   * @param {Element} element
	   * @return {Rule}
	   * @api public
	   */

	  Rule.prototype.applyTo = function applyTo(element) {
	    for (var prop in this.style) {
	      var value = this.style[prop];
	      if (Array.isArray(value)) {
	        for (var i = 0; i < value.length; i++) {
	          element.style[prop] = value[i];
	        }
	      } else element.style[prop] = value;
	    }
	    return this;
	  };

	  /**
	   * Returns JSON representation of the rule.
	   * Nested rules, at-rules and array values are not supported.
	   *
	   * @return {Object}
	   * @api public
	   */

	  Rule.prototype.toJSON = function toJSON() {
	    var style = {};
	    for (var prop in this.style) {
	      if (typeof this.style[prop] != 'object') {
	        style[prop] = this.style[prop];
	      }
	    }
	    return style;
	  };

	  /**
	   * Generates a CSS string.
	   *
	   * @return {String}
	   * @api private
	   */

	  Rule.prototype.toString = function toString() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? { indentationLevel: 0 } : arguments[0];

	    var indentationLevel = _ref.indentationLevel;

	    var str = indent(indentationLevel, this.selector + ' {');
	    indentationLevel++;
	    for (var prop in this.style) {
	      var value = this.style[prop];
	      // We want to generate multiple style with identical property names.
	      if (Array.isArray(value)) {
	        for (var i = 0; i < value.length; i++) {
	          str += '\n' + indent(indentationLevel, prop + ': ' + value[i] + ';');
	        }
	      } else str += '\n' + indent(indentationLevel, prop + ': ' + value + ';');
	    }
	    str += '\n' + indent(--indentationLevel, '}');
	    return str;
	  };

	  return Rule;
	})();

	exports['default'] = Rule;
	function indent(level, str) {
	  var indentStr = '';
	  for (var i = 0; i < level; i++) {
	    indentStr += indentWith;
	  }return indentStr + str;
	}
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	exports.__esModule = true;
	exports.get = get;
	exports.reset = reset;
	var globalReference = typeof window == 'undefined' ? global : window;
	var namespace = '__JSS_UID_PREFIX__';
	if (globalReference[namespace] == null) globalReference[namespace] = 0;

	var prefix = globalReference[namespace]++;
	var counter = 0;

	/**
	 * Returns a uid.
	 * Ensures uniqueness if more than 1 jss version is used.
	 *
	 * @api private
	 * @return {String}
	 */

	function get() {
	  return prefix + '-' + counter++;
	}

	/**
	 * Resets the counter.
	 *
	 * @api private
	 */

	function reset() {
	  counter = 0;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports["default"] = clone;
	var stringify = JSON.stringify;
	var parse = JSON.parse;

	/**
	 * Deeply clone object using serialization.
	 * Expects object to be plain and without cyclic dependencies.
	 *
	 * http://jsperf.com/lodash-deepclone-vs-jquery-extend-deep/6
	 *
	 * @type {Object} obj
	 * @return {Object}
	 */

	function clone(obj) {
	  return parse(stringify(obj));
	}

	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * Rule like @charset, @import, @namespace.
	 *
	 * @api private
	 */
	'use strict';

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var SimpleRule = (function () {
	  function SimpleRule(name, value, options) {
	    _classCallCheck(this, SimpleRule);

	    this.type = 'simple';
	    this.options = options;
	    this.name = name;
	    this.value = value;
	  }

	  /**
	   * Generates a CSS string.
	   *
	   * @return {String}
	   * @api private
	   */

	  SimpleRule.prototype.toString = function toString() {
	    return this.name + ' ' + this.value + ';';
	  };

	  return SimpleRule;
	})();

	exports['default'] = SimpleRule;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * Keyframe rule.
	 *
	 * @api private
	 */
	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var KeyframeRule = (function () {
	  function KeyframeRule(selector, frames, options) {
	    _classCallCheck(this, KeyframeRule);

	    this.type = 'keyframe';
	    this.selector = selector;
	    this.options = options;
	    this.frames = this.formatFrames(frames);
	  }

	  /**
	   * Creates formatted frames where every frame value is a rule instance.
	   *
	   * @api private
	   */

	  KeyframeRule.prototype.formatFrames = function formatFrames(frames) {
	    var newFrames = {};
	    for (var _name in frames) {
	      var options = _extends({}, this.options, { named: false, parent: this });
	      newFrames[_name] = this.options.jss.createRule(_name, frames[_name], options);
	    }
	    return newFrames;
	  };

	  /**
	   * Generates a CSS string.
	   *
	   * @return {String}
	   * @api private
	   */

	  KeyframeRule.prototype.toString = function toString() {
	    var str = this.selector + ' {\n';
	    var options = { indentationLevel: 1 };
	    for (var _name2 in this.frames) {
	      str += this.frames[_name2].toString(options) + '\n';
	    }
	    str += '}';
	    return str;
	  };

	  return KeyframeRule;
	})();

	exports['default'] = KeyframeRule;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	/**
	 * Conditional rule for @media, @supports
	 *
	 * @api private
	 */
	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var ConditionalRule = (function () {
	  function ConditionalRule(selector, styles, options) {
	    _classCallCheck(this, ConditionalRule);

	    this.type = 'conditional';
	    this.selector = selector;
	    this.options = options;
	    this.rules = this.createChildRules(styles);
	  }

	  /**
	   * A conditional rule always contains child rules.
	   *
	   * @param {Object} styles
	   * @return {Array} rules
	   * @api private
	   */

	  ConditionalRule.prototype.createChildRules = function createChildRules(styles) {
	    var rules = {};
	    var options = _extends({}, this.options, { parent: this });
	    var sheet = options.sheet;
	    var jss = options.jss;

	    for (var _name in styles) {
	      var localOptions = options;
	      // We have already a rule in the current style sheet with this name,
	      // This new rule is supposed to overwrite the first one, for this we need
	      // to ensure it will have the same className/selector.
	      var ruleToOverwrite = options.sheet && options.sheet.getRule(_name);
	      if (ruleToOverwrite) localOptions = _extends({}, options, { className: ruleToOverwrite.className });
	      rules[_name] = (sheet || jss).createRule(_name, styles[_name], localOptions);
	    }
	    return rules;
	  };

	  /**
	   * Generates a CSS string.
	   *
	   * @return {String}
	   * @api private
	   */

	  ConditionalRule.prototype.toString = function toString() {
	    var str = this.selector + ' {\n';
	    for (var _name2 in this.rules) {
	      var ruleStr = this.rules[_name2].toString({ indentationLevel: 1 });
	      str += ruleStr + '\n';
	    }
	    str += '}';
	    return str;
	  };

	  return ConditionalRule;
	})();

	exports['default'] = ConditionalRule;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Register a plugin, run a plugin.
	 */
	"use strict";

	exports.__esModule = true;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var PluginsRegistry = (function () {
	  function PluginsRegistry() {
	    _classCallCheck(this, PluginsRegistry);

	    this.registry = [];
	  }

	  /**
	   * Register plugin. Passed function will be invoked with a rule instance.
	   *
	   * @param {Function} fn
	   * @api public
	   */

	  PluginsRegistry.prototype.use = function use(fn) {
	    this.registry.push(fn);
	  };

	  /**
	   * Execute all registered plugins.
	   *
	   * @param {Rule} rule
	   * @api private
	   */

	  PluginsRegistry.prototype.run = function run(rule) {
	    for (var i = 0; i < this.registry.length; i++) {
	      this.registry[i](rule);
	    }
	  };

	  return PluginsRegistry;
	})();

	exports["default"] = PluginsRegistry;
	module.exports = exports["default"];

/***/ }
/******/ ])
});
;