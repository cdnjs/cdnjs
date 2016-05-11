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
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
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
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _StyleSheet = __webpack_require__(2);
	
	var _StyleSheet2 = _interopRequireDefault(_StyleSheet);
	
	var _PluginsRegistry = __webpack_require__(13);
	
	var _PluginsRegistry2 = _interopRequireDefault(_PluginsRegistry);
	
	var _uid = __webpack_require__(5);
	
	var uid = _interopRequireWildcard(_uid);
	
	var _createRule2 = __webpack_require__(3);
	
	var _createRule3 = _interopRequireDefault(_createRule2);
	
	var _findRenderer = __webpack_require__(10);
	
	var _findRenderer2 = _interopRequireDefault(_findRenderer);
	
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
	
	  Jss.prototype.createStyleSheet = function createStyleSheet(rules, options) {
	    return new _StyleSheet2['default'](rules, _extends({}, options, { jss: this }));
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
	    var rule = _createRule3['default'](selector, style, _extends({}, options, {
	      jss: this,
	      Renderer: _findRenderer2['default'](options)
	    }));
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
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _createRule2 = __webpack_require__(3);
	
	var _createRule3 = _interopRequireDefault(_createRule2);
	
	var _findRenderer = __webpack_require__(10);
	
	var _findRenderer2 = _interopRequireDefault(_findRenderer);
	
	/**
	 * StyleSheet model.
	 *
	 * Options:
	 *
	 *  - 'media' style element attribute
	 *  - 'title' style element attribute
	 *  - 'type' style element attribute
	 *  - 'named' true by default - keys are names, selectors will be generated,
	 *    if false - keys are global selectors
	 *  - 'link' link renderable CSS rules with their corresponding models, false
	 *    by default because fast by default
	 *
	 * @param {Object} [rules] object with selectors and declarations
	 * @param {Object} [options]
	 * @api public
	 */
	
	var StyleSheet = (function () {
	  function StyleSheet(rules, options) {
	    _classCallCheck(this, StyleSheet);
	
	    this.options = _extends({}, options);
	    if (this.options.named == null) this.options.named = true;
	    this.rules = Object.create(null);
	    this.classes = Object.create(null);
	    this.attached = false;
	    this.deployed = false;
	    this.linked = false;
	
	    var Renderer = _findRenderer2['default'](this.options);
	    this.options.Renderer = Renderer;
	    this.renderer = new Renderer({
	      media: this.options.media,
	      type: this.options.type,
	      title: this.options.title
	    });
	
	    for (var _name in rules) {
	      this.createRule(_name, rules[_name]);
	    }
	  }
	
	  /**
	   * Attach renderable to the render tree.
	   *
	   * @api public
	   * @return {StyleSheet}
	   */
	
	  StyleSheet.prototype.attach = function attach() {
	    if (this.attached) return this;
	    if (!this.deployed) this.deploy();
	    this.renderer.attach();
	    if (!this.linked && this.options.link) this.link();
	    this.attached = true;
	    return this;
	  };
	
	  /**
	   * Remove renderable from render tree.
	   *
	   * @return {StyleSheet}
	   * @api public
	   */
	
	  StyleSheet.prototype.detach = function detach() {
	    if (!this.attached) return this;
	    this.renderer.detach();
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
	      var renderable = this.renderer.insertRule(rule);
	      if (this.options.link) rule.renderable = renderable;
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
	   * Convert rules to a CSS string.
	   *
	   * @param {Object} options
	   * @return {String}
	   * @api public
	   */
	
	  StyleSheet.prototype.toString = function toString(options) {
	    var rules = this.rules;
	
	    var stringified = Object.create(null);
	    var str = '';
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
	
	  StyleSheet.prototype.createRule = function createRule(name, style, options) {
	    options = _extends({}, options, {
	      sheet: this,
	      jss: this.options.jss,
	      Renderer: this.options.Renderer
	    });
	    // Scope options overwrite instance options.
	    if (options.named == null) options.named = this.options.named;
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
	   * Deploy pure CSS string to a renderable.
	   *
	   * @return {StyleSheet}
	   * @api private
	   */
	
	  StyleSheet.prototype.deploy = function deploy() {
	    this.renderer.deploy(this);
	    this.deployed = true;
	    return this;
	  };
	
	  /**
	   * Link renderable CSS rules with their corresponding models.
	   *
	   * @return {StyleSheet}
	   * @api private
	   */
	
	  StyleSheet.prototype.link = function link() {
	    var renderables = this.renderer.getRules();
	    for (var selector in renderables) {
	      var rule = this.rules[selector];
	      if (rule) rule.renderable = renderables[selector];
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
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports['default'] = createRule;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _Rule = __webpack_require__(4);
	
	var _Rule2 = _interopRequireDefault(_Rule);
	
	var _SimpleRule = __webpack_require__(7);
	
	var _SimpleRule2 = _interopRequireDefault(_SimpleRule);
	
	var _KeyframeRule = __webpack_require__(8);
	
	var _KeyframeRule2 = _interopRequireDefault(_KeyframeRule);
	
	var _ConditionalRule = __webpack_require__(9);
	
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var _uid = __webpack_require__(5);
	
	var uid = _interopRequireWildcard(_uid);
	
	var _clone = __webpack_require__(6);
	
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
	    this.originalStyle = style;
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
	    var style = this.options.Renderer.style;
	
	    // Its a setter.
	    if (value != null) {
	      this.style[name] = value;
	      // If linked option in StyleSheet is not passed, renderable is not defined.
	      if (this.renderable) style(this.renderable, name, value);
	      return this;
	    }
	    // Its a getter, read the value from the DOM if its not cached.
	    if (this.renderable && this.style[name] == null) {
	      // Cache the value after we have got it from the DOM once.
	      this.style[name] = style(this.renderable, name);
	    }
	    return this.style[name];
	  };
	
	  /**
	   * Apply rule to an element inline.
	   *
	   * @param {Element} renderable
	   * @return {Rule}
	   * @api public
	   */
	
	  Rule.prototype.applyTo = function applyTo(renderable) {
	    for (var prop in this.style) {
	      var value = this.style[prop];
	      var style = this.options.Renderer.style;
	
	      if (Array.isArray(value)) {
	        for (var index = 0; index < value.length; index++) {
	          style(renderable, prop, value[index]);
	        }
	      } else style(renderable, prop, value);
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
	    var style = Object.create(null);
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
	   * @param {Object} options
	   * @return {String}
	   * @api private
	   */
	
	  Rule.prototype.toString = function toString() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var selector = options.selector == null ? true : options.selector;
	    var indentationLevel = options.indentationLevel || 0;
	    var str = '';
	    if (selector) {
	      str += indent(indentationLevel, this.selector + ' {');
	      indentationLevel++;
	    }
	    for (var prop in this.style) {
	      var value = this.style[prop];
	      // We want to generate multiple style with identical property names.
	      if (Array.isArray(value)) {
	        for (var index = 0; index < value.length; index++) {
	          str += '\n' + indent(indentationLevel, prop + ': ' + value[index] + ';');
	        }
	      } else str += '\n' + indent(indentationLevel, prop + ': ' + value + ';');
	    }
	    if (selector) str += '\n' + indent(--indentationLevel, '}');
	    return str;
	  };
	
	  return Rule;
	})();
	
	exports['default'] = Rule;
	function indent(level, str) {
	  var indentStr = '';
	  for (var index = 0; index < level; index++) {
	    indentStr += indentWith;
	  }return indentStr + str;
	}
	module.exports = exports['default'];

/***/ },
/* 5 */
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
/* 6 */
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
/* 7 */
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
/* 8 */
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
	    var newFrames = Object.create(null);
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
/* 9 */
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
	    this.options = _extends({}, options, { parent: this });
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
	    var rules = Object.create(null);
	    var _options = this.options;
	    var sheet = _options.sheet;
	    var jss = _options.jss;
	
	    for (var _name in styles) {
	      var localOptions = this.options;
	      // We have already a rule in the current style sheet with this name,
	      // This new rule is supposed to overwrite the first one, for this we need
	      // to ensure it will have the same className/selector.
	      var ruleToOverwrite = this.options.sheet && this.options.sheet.getRule(_name);
	      if (ruleToOverwrite) localOptions = _extends({}, this.options, { className: ruleToOverwrite.className });
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.__esModule = true;
	exports['default'] = findRenderer;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _DomRenderer = __webpack_require__(11);
	
	var _DomRenderer2 = _interopRequireDefault(_DomRenderer);
	
	var _VirtualRenderer = __webpack_require__(12);
	
	var _VirtualRenderer2 = _interopRequireDefault(_VirtualRenderer);
	
	/**
	 * Find proper renderer.
	 * Option `virtual` is used to force use of VirtualRenderer even if DOM is
	 * detected, used for testing only.
	 *
	 * @param {Object} options
	 * @return {Renderer}
	 * @api private
	 */
	
	function findRenderer() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  if (options.Renderer) return options.Renderer;
	  return options.virtual || typeof document == 'undefined' ? _VirtualRenderer2['default'] : _DomRenderer2['default'];
	}
	
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * DOM rendering backend for StyleSheet.
	 *
	 * @api private
	 */
	'use strict';
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var DomRenderer = (function () {
	  DomRenderer.style = function style(element, name, value) {
	    try {
	      if (value == null) return element.style[name];
	      element.style[name] = value;
	    } catch (err) {
	      // IE8 may throw if property is unknown.
	    }
	  };
	
	  function DomRenderer(attrs) {
	    _classCallCheck(this, DomRenderer);
	
	    this.head = document.head || document.getElementsByTagName('head')[0];
	    this.element = document.createElement('style');
	    // IE8 will not have `styleSheet` prop without `type and `styleSheet.cssText`
	    // is the only way to render on IE8.
	    this.element.type = 'text/css';
	    for (var _name in attrs) {
	      if (attrs[_name]) this.element.setAttribute(_name, attrs[_name]);
	    }
	  }
	
	  /**
	   * Insert style element into render tree.
	   *
	   * @api private
	   */
	
	  DomRenderer.prototype.attach = function attach() {
	    this.head.appendChild(this.element);
	  };
	
	  /**
	   * Remove style element from render tree.
	   *
	   * @api private
	   */
	
	  DomRenderer.prototype.detach = function detach() {
	    this.element.parentNode.removeChild(this.element);
	  };
	
	  /**
	   * Inject CSS string into element.
	   *
	   * @param {String} cssStr
	   * @api private
	   */
	
	  DomRenderer.prototype.deploy = function deploy(sheet) {
	    var css = '\n' + sheet.toString() + '\n';
	    if ('sheet' in this.element) this.element.innerHTML = css;
	    // On IE8 the only way to render is `styleSheet.cssText`
	    else if ('styleSheet' in this.element) this.element.styleSheet.cssText = css;
	  };
	
	  /**
	   * Insert a rule into element.
	   *
	   * @param {Rule} rule
	   * @return {CSSStyleRule}
	   * @api private
	   */
	
	  DomRenderer.prototype.insertRule = function insertRule(rule) {
	    // IE8 has only `styleSheet` and `styleSheet.rules`
	    var sheet = this.element.sheet || this.element.styleSheet;
	    var cssRules = sheet.cssRules || sheet.rules;
	    var nextIndex = cssRules.length;
	    if (sheet.insertRule) sheet.insertRule(rule.toString(), nextIndex);else sheet.addRule(rule.selector, rule.toString({ selector: false }), nextIndex);
	    return cssRules[nextIndex];
	  };
	
	  /**
	   * Get all rules elements.
	   *
	   * @return {Object} rules map, where key is selector, CSSStyleRule is value.
	   * @api private
	   */
	
	  DomRenderer.prototype.getRules = function getRules() {
	    // IE8 has only `styleSheet` and `styleSheet.rules`
	    var sheet = this.element.sheet || this.element.styleSheet;
	    var cssRules = sheet.rules || sheet.cssRules;
	    var rules = Object.create(null);
	    for (var index = 0; index < cssRules.length; index++) {
	      var CSSRule = cssRules[index];
	      rules[CSSRule.selectorText] = CSSRule;
	    }
	    return rules;
	  };
	
	  return DomRenderer;
	})();
	
	exports['default'] = DomRenderer;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	/**
	 * Rendering backend to do nothing in nodejs.
	 */
	"use strict";
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var VirtualRenderer = (function () {
	  function VirtualRenderer() {
	    _classCallCheck(this, VirtualRenderer);
	  }
	
	  VirtualRenderer.style = function style() {};
	
	  VirtualRenderer.prototype.attach = function attach() {};
	
	  VirtualRenderer.prototype.detach = function detach() {};
	
	  VirtualRenderer.prototype.deploy = function deploy() {};
	
	  VirtualRenderer.prototype.insertRule = function insertRule() {};
	
	  VirtualRenderer.prototype.getRules = function getRules() {
	    return {};
	  };
	
	  return VirtualRenderer;
	})();
	
	exports["default"] = VirtualRenderer;
	module.exports = exports["default"];

/***/ },
/* 13 */
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
	    for (var index = 0; index < this.registry.length; index++) {
	      this.registry[index](rule);
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
//# sourceMappingURL=jss.js.map