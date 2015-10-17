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

	var _Rule = __webpack_require__(3);

	var _Rule2 = _interopRequireDefault(_Rule);

	var _PluginsRegistry = __webpack_require__(7);

	var _PluginsRegistry2 = _interopRequireDefault(_PluginsRegistry);

	var _uid = __webpack_require__(4);

	var uid = _interopRequireWildcard(_uid);

	/**
	 * Main Jss class.
	 *
	 * @api public
	 */

	var Jss = (function () {
	  function Jss() {
	    _classCallCheck(this, Jss);

	    this.plugins = new _PluginsRegistry2['default']();
	    this.Jss = Jss;
	    this.StyleSheet = _StyleSheet2['default'];
	    this.Rule = _Rule2['default'];
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
	   * @see Rule
	   * @return {Rule}
	   * @api public
	   */

	  Jss.prototype.createRule = function createRule(selector, style, options) {
	    if (typeof selector == 'object') {
	      options = style;
	      style = selector;
	      selector = null;
	    }
	    if (!options) options = {};
	    options.jss = this;
	    var rule = new _Rule2['default'](selector, style, options);
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
/***/ function(module, exports) {

	/**
	 * StyleSheet abstraction, contains rules, injects stylesheet into dom.
	 *
	 * Options:
	 *
	 *  - `media` style element attribute
	 *  - `title` style element attribute
	 *  - `type` style element attribute
	 *  - `named` true by default - keys are names, selectors will be generated,
	 *    if false - keys are global selectors.
	 *  - `link` link jss Rule instances with DOM CSSRule instances so that styles,
	 *  can be modified dynamically, false by default because it has some performance cost.
	 *
	 * @param {Object} [rules] object with selectors and declarations
	 * @param {Object} [options]
	 * @api public
	 */
	'use strict';

	exports.__esModule = true;

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var StyleSheet = (function () {
	  _createClass(StyleSheet, null, [{
	    key: 'ATTRIBUTES',
	    value: ['title', 'type', 'media'],
	    enumerable: true
	  }]);

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
	    this.jss = this.options.jss;

	    // Don't create element if we are not in a browser environment.
	    if (typeof document != 'undefined') {
	      this.element = this.createElement();
	    }

	    for (var key in rules) {
	      this.createRules(key, rules[key]);
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
	    if (!this.deployed) {
	      this.deploy();
	      this.deployed = true;
	    }

	    document.head.appendChild(this.element);

	    // Before element is attached to the dom rules are not created.
	    if (!this.linked && this.options.link) {
	      this.link();
	      this.linked = true;
	    }
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
	    this.element.parentNode.removeChild(this.element);
	    this.attached = false;
	    return this;
	  };

	  /**
	   * Deploy styles to the element.
	   *
	   * @return {StyleSheet}
	   * @api private
	   */

	  StyleSheet.prototype.deploy = function deploy() {
	    this.element.innerHTML = '\n' + this.toString() + '\n';
	    return this;
	  };

	  /**
	   * Find CSSRule objects in the DOM and link them in the corresponding Rule instance.
	   *
	   * @return {StyleSheet}
	   * @api private
	   */

	  StyleSheet.prototype.link = function link() {
	    var CSSRuleList = this.element.sheet.cssRules;
	    var rules = this.rules;

	    for (var i = 0; i < CSSRuleList.length; i++) {
	      var CSSRule = CSSRuleList[i];
	      var rule = rules[CSSRule.selectorText];
	      if (rule) rule.CSSRule = CSSRule;
	    }
	    return this;
	  };

	  /**
	   * Add a rule to the current stylesheet. Will insert a rule also after the stylesheet
	   * has been rendered first time.
	   *
	   * @param {Object} [key] can be selector or name if `options.named` is true
	   * @param {Object} style property/value hash
	   * @return {Rule}
	   * @api public
	   */

	  StyleSheet.prototype.addRule = function addRule(key, style) {
	    var rules = this.createRules(key, style);

	    // Don't insert rule directly if there is no stringified version yet.
	    // It will be inserted all together when .attach is called.
	    if (this.deployed) {
	      var sheet = this.element.sheet;

	      for (var i = 0; i < rules.length; i++) {
	        var nextIndex = sheet.cssRules.length;
	        var rule = rules[i];
	        sheet.insertRule(rule.toString(), nextIndex);
	        if (this.options.link) rule.CSSRule = sheet.cssRules[nextIndex];
	      }
	    } else this.deploy();
	    return rules;
	  };

	  /**
	   * Create rules, will render also after stylesheet was rendered the first time.
	   *
	   * @param {Object} rules key:style hash.
	   * @return {Array} array of added rules
	   * @api public
	   */

	  StyleSheet.prototype.addRules = function addRules(rules) {
	    var added = [];
	    for (var key in rules) {
	      added.push.apply(added, this.addRule(key, rules[key]));
	    }
	    return added;
	  };

	  /**
	   * Get a rule.
	   *
	   * @param {String} key can be selector or name if `named` is true.
	   * @return {Rule}
	   * @api public
	   */

	  StyleSheet.prototype.getRule = function getRule(key) {
	    return this.rules[key];
	  };

	  /**
	   * Convert rules to a css string.
	   *
	   * @return {String}
	   * @api public
	   */

	  StyleSheet.prototype.toString = function toString() {
	    var str = '';
	    var rules = this.rules;

	    var stringified = {};
	    for (var key in rules) {
	      var rule = rules[key];
	      // We have the same rule referenced twice if using named urles.
	      // By name and by selector.
	      if (stringified[rule.id]) continue;
	      if (str) str += '\n';
	      str += rules[key].toString();
	      stringified[rule.id] = true;
	    }
	    return str;
	  };

	  /**
	   * Create a rule, will not render after stylesheet was rendered the first time.
	   *
	   * @param {Object} [selector] if you don't pass selector - it will be generated
	   * @param {Object} [style] declarations block
	   * @param {Object} [options] rule options
	   * @return {Array} rule can contain child rules
	   * @api private
	   */

	  StyleSheet.prototype.createRules = function createRules(key, style) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    var rules = [];
	    var named = this.options.named;

	    // Scope options overwrite instance options.
	    if (options.named != null) named = options.named;

	    var rule = this.jss.createRule(key, style, {
	      sheet: this,
	      named: named
	    });
	    rules.push(rule);

	    this.rules[rule.selector] = rule;
	    if (named && !rule.isAtRule) {
	      this.rules[key] = rule;
	      this.classes[key] = rule.className;
	    }

	    for (key in rule.children) {
	      rules.push(this.createRules(key, rule.children[key].style, rule.children[key].options));
	    }
	    return rules;
	  };

	  /**
	   * Create style sheet element.
	   *
	   * @return {Element}
	   * @api private
	   */

	  StyleSheet.prototype.createElement = function createElement() {
	    var _this = this;

	    var element = document.createElement('style');
	    StyleSheet.ATTRIBUTES.forEach(function (name) {
	      if (_this[name]) element.setAttribute(name, _this[name]);
	    });
	    return element;
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

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _uid = __webpack_require__(4);

	var uid = _interopRequireWildcard(_uid);

	var _clone = __webpack_require__(5);

	var _clone2 = _interopRequireDefault(_clone);

	var _defaults = __webpack_require__(6);

	var _defaults2 = _interopRequireDefault(_defaults);

	/**
	 * Rule is selector + style hash.
	 *
	 * @param {String} [selector] can be selector, rule name, @media etc.
	 * @param {Object} [style] declarations block
	 * @param {Object} [options]
	 * @api public
	 */

	var Rule = (function () {
	  _createClass(Rule, null, [{
	    key: 'NAMESPACE_PREFIX',

	    /**
	     * Class name prefix when generated.
	     *
	     * @type {String}
	     * @api private
	     */
	    value: 'jss',

	    /**
	     * Indentation string for formatting toString output.
	     *
	     * @type {String}
	     * @api private
	     */
	    enumerable: true
	  }, {
	    key: 'INDENTATION',
	    value: '  ',
	    enumerable: true
	  }]);

	  function Rule(selector, style) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    _classCallCheck(this, Rule);

	    if (options.named == null) options.named = true;
	    this.id = uid.get();
	    this.options = options;
	    this.isAtRule = (selector || '')[0] === '@';

	    if (options.named) {
	      if (this.isAtRule) {
	        this.selector = selector;
	      } else {
	        // Selector is a rule name, we need to ref it for e.g. for jss-debug.
	        this.name = selector;
	        this.className = Rule.NAMESPACE_PREFIX + '-' + this.id;
	        this.selector = '.' + this.className;
	      }
	    } else this.selector = selector;

	    // We expect style to be plain object.
	    if (style) this.style = _clone2['default'](style);

	    // Will be set by StyleSheet#link if link option is true.
	    this.CSSRule = null;
	    // When at-rule has sub rules.
	    this.subrules = null;
	    this.jss = this.options.jss;
	    this.extractSubrules();
	  }

	  /**
	   * Indent a string.
	   *
	   * http://jsperf.com/array-join-vs-for
	   *
	   * @param {Number} level
	   * @param {String} str
	   * @return {String}
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
	      if (!this.style) this.style = {};
	      this.style[name] = value;
	      // If linked option in StyleSheet is not passed, CSSRule is not defined.
	      if (this.CSSRule) this.CSSRule.style[name] = value;
	      return this;
	    }

	    // Its a getter.
	    if (this.style) value = this.style[name];

	    // Read the value from the DOM if its not cached.
	    if (value == null && this.CSSRule) {
	      value = this.CSSRule.style[name];
	      // Cache the value after we have got it from the DOM once.
	      this.style[name] = value;
	    }
	    return value;
	  };

	  /**
	   * Add child rule. Required for plugins like "nested".
	   * StyleSheet will render them as a separate rule.
	   *
	   * @param {String} selector
	   * @param {Object} style
	   * @param {Object} [options] rule options
	   * @return {Rule}
	   * @api private
	   */

	  Rule.prototype.addChild = function addChild(selector, style, options) {
	    if (!this.children) this.children = {};
	    this.children[selector] = { style: style, options: options };
	    return this;
	  };

	  /**
	   * Extract @ rules into separate rules.
	   *
	   * @return {Rule}
	   * @api private
	   */

	  Rule.prototype.extractSubrules = function extractSubrules() {
	    if (!this.isAtRule || !this.style) return;
	    if (!this.subrules) this.subrules = {};
	    var sheet = this.options.sheet;
	    for (var _name in this.style) {
	      var options = this.options;
	      var style = this.style[_name];
	      // Not a nested rule.
	      if (typeof style == 'string') break;
	      var selector = undefined;
	      // We are going to overwrite some rule within the same sheet when
	      // @media query matches conditions.
	      if (options.named) {
	        var prevRule = sheet && sheet.rules[_name];
	        if (prevRule) {
	          selector = prevRule.selector;
	          options = _defaults2['default']({ named: false }, options);
	        }
	      } else selector = _name;
	      this.subrules[_name] = this.jss.createRule(selector, style, options);
	      delete this.style[_name];
	    }
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
	   * Converts the rule to css string.
	   *
	   * @return {String}
	   * @api public
	   */

	  Rule.prototype.toString = function toString() {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	    var style = this.style;
	    // At rules like @charset
	    if (this.isAtRule && !this.style && !this.subrules) return this.selector + ';';
	    if (options.indentationLevel == null) options.indentationLevel = 0;
	    var str = indent(options.indentationLevel, this.selector + ' {');

	    for (var prop in style) {
	      var value = style[prop];
	      // We want to generate multiple style with identical property names.
	      if (Array.isArray(value)) {
	        for (var i = 0; i < value.length; i++) {
	          str += '\n' + indent(options.indentationLevel + 1, prop + ': ' + value[i] + ';');
	        }
	      } else {
	        str += '\n' + indent(options.indentationLevel + 1, prop + ': ' + value + ';');
	      }
	    }

	    // We have an at-rule with nested statements.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
	    var toStringOptions = { indentationLevel: options.indentationLevel + 1 };
	    for (var _name2 in this.subrules) {
	      str += '\n' + indent(options.indentationLevel, this.subrules[_name2].toString(toStringOptions));
	    }

	    str += '\n' + indent(options.indentationLevel, '}');
	    return str;
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
	      var value = this.style[prop];
	      var type = typeof value;
	      if (type === 'string' || type === 'number') {
	        style[prop] = value;
	      }
	    }
	    return style;
	  };

	  return Rule;
	})();

	exports['default'] = Rule;
	function indent(level, str) {
	  var indentStr = '';
	  for (var i = 0; i < level; i++) {
	    indentStr += Rule.INDENTATION;
	  }return indentStr + str;
	}
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	exports.__esModule = true;
	exports.get = get;
	exports.reset = reset;
	var globalReference = typeof window === 'undefined' ? global : window;
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
/* 5 */
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
/* 6 */
/***/ function(module, exports) {

	/**
	 * Merges second object with first one only if value is undefined.
	 * It expects both objects to be plain.
	 *
	 * @param {Object} obj1
	 * @param {Object} obj2
	 * @return {Object} obj1
	 */
	"use strict";

	exports.__esModule = true;
	exports["default"] = defaults;

	function defaults(obj1, obj2) {
	  for (var key in obj2) {
	    if (obj1[key] === undefined) obj1[key] = obj2[key];
	  }
	  return obj1;
	}

	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports) {

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