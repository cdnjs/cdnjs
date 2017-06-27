(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["Radium"] = factory(require("React"));
	else
		root["Radium"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__) {
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

	'use strict';

	exports.Enhancer = __webpack_require__(54);
	exports.Style = __webpack_require__(2);
	exports.getState = __webpack_require__(3);
	exports.keyframes = __webpack_require__(4);
	exports.wrap = __webpack_require__(5);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(51),
	    isNative = __webpack_require__(26),
	    isObject = __webpack_require__(52),
	    shimKeys = __webpack_require__(83);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
	 * for more details.
	 *
	 * @static
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
	var keys = !nativeKeys ? shimKeys : function (object) {
	  var Ctor = object != null && object.constructor;
	  if (typeof Ctor == 'function' && Ctor.prototype === object || typeof object != 'function' && isArrayLike(object)) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(6);
	var CSSPropertyOperations = __webpack_require__(18);
	var reduce = __webpack_require__(17);

	var buildCssString = function buildCssString(selector, rules) {
	  if (!selector || !rules) {
	    return;
	  }

	  return selector + '{' + CSSPropertyOperations.createMarkupForStyles(rules) + '}';
	};

	var Style = React.createClass({
	  displayName: 'Style',

	  propTypes: {
	    scopeSelector: React.PropTypes.string,
	    rules: React.PropTypes.arrayOf(React.PropTypes.object)
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      scopeSelector: ''
	    };
	  },

	  _buildStyles: function _buildStyles(stylesArr) {
	    var styles = reduce(stylesArr, function (accumulator, item) {
	      var selector = Object.keys(item)[0];
	      var rules = item[selector];

	      if (selector === 'mediaQueries') {
	        accumulator += this._buildMediaQueryString(rules);
	      } else {
	        var completeSelector = (this.props.scopeSelector ? this.props.scopeSelector + ' ' : '') + selector;
	        accumulator += buildCssString(completeSelector, rules);
	      }

	      return accumulator;
	    }, '', this);

	    return styles;
	  },

	  _buildMediaQueryString: function _buildMediaQueryString(mediaQueryObj) {
	    var contextMediaQueries = this._getContextMediaQueries();
	    var mediaQueryString = '';

	    Object.keys(mediaQueryObj).forEach((function (query) {
	      var completeQuery = contextMediaQueries[query] ? contextMediaQueries[query] : query;
	      mediaQueryString += '@media ' + completeQuery + '{' + this._buildStyles(mediaQueryObj[query]) + '}';
	    }).bind(this));

	    return mediaQueryString;
	  },

	  _getContextMediaQueries: function _getContextMediaQueries() {
	    var contextMediaQueries = {};
	    if (this.context && this.context.mediaQueries) {
	      Object.keys(this.context.mediaQueries).forEach((function (query) {
	        contextMediaQueries[query] = this.context.mediaQueries[query].media;
	      }).bind(this));
	    }

	    return contextMediaQueries;
	  },

	  render: function render() {
	    if (!this.props.rules) {
	      return null;
	    }

	    var styles = this._buildStyles(this.props.rules);

	    return React.createElement('style', { dangerouslySetInnerHTML: { __html: styles } });
	  }
	});

	module.exports = Style;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var VALID_KEYS = [':active', ':focus', ':hover'];

	var getState = function getState(state, elementKey, value) {
	  elementKey = elementKey || 'main';

	  if (VALID_KEYS.indexOf(value) === -1) {
	    throw new Error('Radium.getState invalid value param: `' + value + '`');
	  }

	  return state && state._radiumStyleState && state._radiumStyleState[elementKey] && state._radiumStyleState[elementKey][value] || false;
	};

	module.exports = getState;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var prefix = __webpack_require__(9);

	var ExecutionEnvironment = __webpack_require__(10);
	var kebabCase = __webpack_require__(11);

	var msPrefix = /^ms-/;
	var animationIndex = 1;
	var animationStyleSheet = null;
	var keyframesPrefixed = null;

	if (ExecutionEnvironment.canUseDOM) {
	  animationStyleSheet = document.createElement('style');
	  document.head.appendChild(animationStyleSheet);

	  // Test if prefix needed for keyframes (copied from PrefixFree)
	  keyframesPrefixed = 'keyframes';
	  animationStyleSheet.textContent = '@keyframes {}';
	  if (!animationStyleSheet.sheet.cssRules.length) {
	    keyframesPrefixed = prefix.css + 'keyframes';
	  }
	}

	var createMarkupForStyles = function createMarkupForStyles(style) {
	  return Object.keys(style).map(function (property) {
	    return kebabCase(property).replace(msPrefix, '-ms-') + ': ' + style[property] + ';';
	  }).join('\n');
	};

	// Simple animation helper that injects CSS into a style object containing the
	// keyframes, and returns a string with the generated animation name.
	var keyframes = function keyframes(keyframeRules) {
	  var name = 'Animation' + animationIndex;
	  animationIndex += 1;

	  if (!ExecutionEnvironment.canUseDOM) {
	    return name;
	  }

	  var rule = '@' + keyframesPrefixed + ' ' + name + ' {\n' + Object.keys(keyframeRules).map(function (percentage) {
	    var props = keyframeRules[percentage];
	    var prefixedProps = prefix(props, 'css');
	    var serializedProps = createMarkupForStyles(prefixedProps);
	    return '  ' + percentage + ' {\n  ' + serializedProps + '\n  }';
	  }).join('\n') + '\n}\n';

	  animationStyleSheet.sheet.insertRule(rule, animationStyleSheet.sheet.cssRules.length);
	  return name;
	};

	module.exports = keyframes;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var resolveStyles = __webpack_require__(7);
	var wrapUtils = __webpack_require__(8);

	var merge = __webpack_require__(12);

	var wrap = function wrap(config) {
	  var newConfig = {
	    getInitialState: function getInitialState() {
	      var existingInitialState = config.getInitialState ? config.getInitialState.call(this) : {};
	      var radiumInitialState = wrapUtils.getInitialState();
	      return merge({}, existingInitialState, radiumInitialState);
	    },

	    componentWillUnmount: function componentWillUnmount() {
	      config.componentWillUnmount && config.componentWillUnmount.call(this);
	      wrapUtils.componentWillUnmount(this);
	    },

	    render: function render() {
	      var renderedElement = config.render.call(this);
	      return resolveStyles(this, renderedElement);
	    }
	  };

	  return merge({}, config, newConfig);
	};

	module.exports = wrap;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var MouseUpListener = __webpack_require__(13);
	var getState = __webpack_require__(3);
	var prefix = __webpack_require__(9);

	var ExecutionEnvironment = __webpack_require__(10);
	var React = __webpack_require__(6);
	var clone = __webpack_require__(14);
	var isArray = __webpack_require__(15);
	var merge = __webpack_require__(12);
	var omit = __webpack_require__(16);

	var mediaQueryListByQueryString = {};

	var _isSpecialKey = function _isSpecialKey(key) {
	  return key[0] === ':' || key[0] === '@';
	};

	var _getStyleState = function _getStyleState(component, key, value) {
	  return getState(component.state, key, value);
	};

	var _setStyleState = function _setStyleState(component, key, newState) {
	  var existing = component.state && component.state._radiumStyleState || {};
	  var state = { _radiumStyleState: clone(existing) };
	  state._radiumStyleState[key] = state._radiumStyleState[key] || {};
	  merge(state._radiumStyleState[key], newState);
	  component.setState(state);
	};

	// Merge style objects. Special casing for props starting with ';'; the values
	// should be objects, and are merged with others of the same name (instead of
	// overwriting).
	var _mergeStyles = function _mergeStyles(styles) {
	  var validStyles = styles.filter(function (style) {
	    return style && typeof style === 'object' && !isArray(style);
	  });

	  // lodash merge is recursive, which handles :hover styles and even :hover
	  // within media queries.
	  return merge.apply(null, [{}].concat(validStyles));
	};

	var _mouseUp = function _mouseUp(component) {
	  Object.keys(component.state._radiumStyleState).forEach(function (key) {
	    if (_getStyleState(component, key, ':active')) {
	      _setStyleState(component, key, { ':active': false });
	    }
	  });
	};

	var _onMediaQueryChange = function _onMediaQueryChange(component, query, mediaQueryList) {
	  var state = {};
	  state[query] = mediaQueryList.matches;
	  _setStyleState(component, '_all', state);
	};

	var _resolveMediaQueryStyles = function _resolveMediaQueryStyles(component, style) {
	  if (!ExecutionEnvironment.canUseDOM || !window || !window.matchMedia) {
	    return style;
	  }

	  Object.keys(style).filter(function (name) {
	    return name[0] === '@';
	  }).map(function (query) {
	    var mediaQueryStyles = style[query];
	    query = query.replace('@media ', '');

	    // Create a global MediaQueryList if one doesn't already exist
	    var mql = mediaQueryListByQueryString[query];
	    if (!mql) {
	      mediaQueryListByQueryString[query] = mql = window.matchMedia(query);
	    }

	    // Keep track of which keys already have listeners
	    if (!component._radiumMediaQueryListenersByQuery) {
	      component._radiumMediaQueryListenersByQuery = {};
	    }

	    if (!component._radiumMediaQueryListenersByQuery[query]) {
	      var listener = _onMediaQueryChange.bind(null, component, query);
	      mql.addListener(listener);
	      component._radiumMediaQueryListenersByQuery[query] = {
	        remove: function remove() {
	          mql.removeListener(listener);
	        }
	      };
	    }

	    // Apply media query states
	    if (mql.matches) {
	      style = _mergeStyles([style, mediaQueryStyles]);
	    }
	  });

	  return style;
	};

	//
	// The nucleus of Radium. resolveStyles is called on the rendered elements
	// before they are returned in render. It iterates over the elements and
	// children, rewriting props to add event handlers required to capture user
	// interactions (e.g. mouse over). It also replaces the style prop because it
	// adds in the various interaction styles (e.g. :hover).
	//
	var resolveStyles = function resolveStyles(component, renderedElement, existingKeyMap) {
	  existingKeyMap = existingKeyMap || {};

	  if (!renderedElement) {
	    return renderedElement;
	  }

	  // Recurse over children first in case we bail early. Could be optimized to be
	  // iterative if needed. Note that children only include those rendered in
	  // `this` component. Child nodes in other components will not be here, so each
	  // component needs to use Radium.wrap.
	  var newChildren = null;
	  var oldChildren = renderedElement.props.children;
	  if (oldChildren) {
	    // If a React Element is an only child, don't wrap it in an array for
	    // React.Children.map() for React.Children.only() compatibility.
	    if (React.Children.count(oldChildren) === 1 && oldChildren.type) {
	      var onlyChild = React.Children.only(oldChildren);

	      newChildren = resolveStyles(component, onlyChild, existingKeyMap);
	    } else {
	      newChildren = React.Children.map(oldChildren, function (child) {
	        if (React.isValidElement(child)) {
	          return resolveStyles(component, child, existingKeyMap);
	        }

	        return child;
	      });
	    }
	  }

	  var props = renderedElement.props;
	  var style = props.style;
	  var newProps = {};

	  // Convenient syntax for multiple styles: `style={[style1, style2, etc]}`
	  // Ignores non-objects, so you can do `this.state.isCool && styles.cool`.
	  if (isArray(style)) {
	    style = _mergeStyles(style);
	  }

	  // Bail early if no interactive styles.
	  if (!style || !Object.keys(style).some(_isSpecialKey)) {
	    if (style) {
	      // Still perform vendor prefixing, though.
	      newProps.style = prefix(style);
	      return React.cloneElement(renderedElement, newProps, newChildren);
	    } else if (newChildren) {
	      return React.cloneElement(renderedElement, {}, newChildren);
	    }

	    return renderedElement;
	  }

	  // We need a unique key to correlate state changes due to user interaction
	  // with the rendered element, so we know to apply the proper interactive
	  // styles.
	  var originalKey = renderedElement.ref || renderedElement.key;
	  var key = originalKey || 'main';

	  if (existingKeyMap[key]) {
	    throw new Error('Radium requires each element with interactive styles to have a unique ' + 'key, set using either the ref or key prop. ' + (originalKey ? 'Key "' + originalKey + '" is a duplicate.' : 'Multiple elements have no key specified.'));
	  }

	  existingKeyMap[key] = true;

	  // Media queries can contain pseudo styles, like :hover
	  style = _resolveMediaQueryStyles(component, style);

	  var newStyle = omit(style, function (value, styleKey) {
	    return _isSpecialKey(styleKey);
	  });

	  // Only add handlers if necessary
	  if (style[':hover'] || style[':active']) {
	    // Always call the existing handler if one is already defined.
	    // This code, and the very similar ones below, could be abstracted a bit
	    // more, but it hurts readability IMO.
	    var existingOnMouseEnter = props.onMouseEnter;
	    newProps.onMouseEnter = function (e) {
	      existingOnMouseEnter && existingOnMouseEnter(e);
	      _setStyleState(component, key, { ':hover': true });
	    };

	    var existingOnMouseLeave = props.onMouseLeave;
	    newProps.onMouseLeave = function (e) {
	      existingOnMouseLeave && existingOnMouseLeave(e);
	      _setStyleState(component, key, { ':hover': false });
	    };
	  }

	  if (style[':active']) {
	    var existingOnMouseDown = props.onMouseDown;
	    newProps.onMouseDown = function (e) {
	      existingOnMouseDown && existingOnMouseDown(e);
	      component._lastMouseDown = Date.now();
	      _setStyleState(component, key, { ':active': true });
	    };
	  }

	  if (style[':focus']) {
	    var existingOnFocus = props.onFocus;
	    newProps.onFocus = function (e) {
	      existingOnFocus && existingOnFocus(e);
	      _setStyleState(component, key, { ':focus': true });
	    };

	    var existingOnBlur = props.onBlur;
	    newProps.onBlur = function (e) {
	      existingOnBlur && existingOnBlur(e);
	      _setStyleState(component, key, { ':focus': false });
	    };
	  }

	  // Merge the styles in the order they were defined
	  Object.keys(style).forEach(function (name) {
	    if (name === ':active' && _getStyleState(component, key, ':active') || name === ':hover' && _getStyleState(component, key, ':hover') || name === ':focus' && _getStyleState(component, key, ':focus')) {
	      merge(newStyle, style[name]);
	    }
	  });

	  if (style[':active'] && !component._radiumMouseUpListener && ExecutionEnvironment.canUseEventListeners) {
	    component._radiumMouseUpListener = MouseUpListener.subscribe(_mouseUp.bind(null, component));
	  }

	  newProps.style = prefix(newStyle);

	  return React.cloneElement(renderedElement, newProps, newChildren);
	};

	// Exposing methods for tests is ugly, but the alternative, re-requiring the
	// module each time, is too slow
	resolveStyles.__clearStateForTests = function () {
	  mediaQueryListByQueryString = {};
	};

	module.exports = resolveStyles;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = {
	  getInitialState: function getInitialState() {
	    return { _radiumStyleState: {} };
	  },

	  componentWillUnmount: function componentWillUnmount(component) {
	    if (component._radiumMouseUpListener) {
	      component._radiumMouseUpListener.remove();
	    }

	    if (component._radiumMediaQueryListenersByQuery) {
	      Object.keys(component._radiumMediaQueryListenersByQuery).forEach(function (query) {
	        component._radiumMediaQueryListenersByQuery[query].remove();
	      }, component);
	    }
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Based on https://github.com/jsstyles/css-vendor, but without any dash-case
	 * shenanigans.
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(10);
	var kebabCase = __webpack_require__(11);

	var jsCssMap = {
	  Webkit: '-webkit-',
	  Moz: '-moz-',
	  // IE did it wrong again ...
	  ms: '-ms-',
	  O: '-o-'
	};
	var testProp = 'Transform';

	var domStyle = {};
	var prefixedPropertyCache = {};
	var prefixedValueCache = {};
	var jsVendorPrefix = '';
	var cssVendorPrefix = '';

	if (ExecutionEnvironment.canUseDOM) {
	  domStyle = document.createElement('p').style;

	  for (var jsPrefix in jsCssMap) {
	    if (jsPrefix + testProp in domStyle) {
	      jsVendorPrefix = jsPrefix;
	      cssVendorPrefix = jsCssMap[jsPrefix];
	      break;
	    }
	  }
	}

	var _getPrefixedProperty = function _getPrefixedProperty(property) {
	  if (prefixedPropertyCache.hasOwnProperty(property)) {
	    return prefixedPropertyCache[property];
	  }

	  if (!ExecutionEnvironment.canUseDOM || property in domStyle) {
	    // unprefixed
	    prefixedPropertyCache[property] = {
	      css: kebabCase(property),
	      js: property
	    };
	    return prefixedPropertyCache[property];
	  }

	  var newProperty = jsVendorPrefix + property[0].toUpperCase() + property.slice(1);
	  if (newProperty in domStyle) {
	    // prefixed
	    prefixedPropertyCache[property] = {
	      css: cssVendorPrefix + kebabCase(property),
	      js: newProperty
	    };
	    return prefixedPropertyCache[property];
	  }

	  // unsupported
	  return prefixedPropertyCache[property] = false;
	};

	var _getPrefixedValue = function _getPrefixedValue(property, value) {
	  // don't test numbers or numbers with units (e.g. 10em)
	  if (typeof value !== 'string' || !isNaN(parseInt(value, 10))) {
	    return value;
	  }

	  var cacheKey = property + value;

	  if (prefixedValueCache.hasOwnProperty(cacheKey)) {
	    return prefixedValueCache[cacheKey];
	  }

	  // Clear style first
	  domStyle[property] = '';

	  // Test value as it is.
	  domStyle[property] = value;

	  // Value is supported as it is. Note that we just make sure it is not an empty
	  // string. Browsers will sometimes rewrite values, but still accept them. They
	  // will set the value to an empty string if not supported.
	  // E.g. for border, "solid 1px black" becomes "1px solid black"
	  //      but "foobar" becomes "", since it is not supported.
	  if (domStyle[property]) {
	    prefixedValueCache[cacheKey] = value;
	    return value;
	  }

	  // Test value with vendor prefix.
	  value = cssVendorPrefix + value;
	  domStyle[property] = value;

	  // Value is supported with vendor prefix.
	  if (domStyle[property]) {
	    prefixedValueCache[cacheKey] = value;
	    return value;
	  }

	  return prefixedValueCache[cacheKey] = false;
	};

	// Returns a new style object with vendor prefixes added to property names
	// and values.
	/*eslint-disable no-console */
	var prefix = function prefix(style, mode /* 'css' or 'js' */) {
	  mode = mode || 'js';
	  var newStyle = {};
	  Object.keys(style).forEach(function (property) {
	    var value = style[property];

	    var newProperty = _getPrefixedProperty(property);
	    if (newProperty === false) {
	      // Ignore unsupported properties
	      if (console && console.warn) {
	        console.warn('Unsupported CSS property ' + property);
	      }
	      return;
	    }

	    var newValue = _getPrefixedValue(newProperty.js, value);
	    if (newValue === false) {
	      // Ignore unsupported values
	      if (console && console.warn) {
	        console.warn('Unsupported CSS value ' + value + ' for property ' + property);
	      }
	    }

	    newStyle[newProperty[mode]] = newValue;
	  });
	  return newStyle;
	};
	/*eslint-enable no-console */

	prefix.css = cssVendorPrefix;
	prefix.js = jsVendorPrefix;

	module.exports = prefix;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Based on code that is Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 */

	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen

	};

	module.exports = ExecutionEnvironment;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createCompounder = __webpack_require__(19);

	/**
	 * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to convert.
	 * @returns {string} Returns the kebab cased string.
	 * @example
	 *
	 * _.kebabCase('Foo Bar');
	 * // => 'foo-bar'
	 *
	 * _.kebabCase('fooBar');
	 * // => 'foo-bar'
	 *
	 * _.kebabCase('__foo_bar__');
	 * // => 'foo-bar'
	 */
	var kebabCase = createCompounder(function (result, word, index) {
	  return result + (index ? '-' : '') + word.toLowerCase();
	});

	module.exports = kebabCase;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseMerge = __webpack_require__(20),
	    createAssigner = __webpack_require__(21);

	/**
	 * Recursively merges own enumerable properties of the source object(s), that
	 * don't resolve to `undefined` into the destination object. Subsequent sources
	 * overwrite property assignments of previous sources. If `customizer` is
	 * provided it is invoked to produce the merged values of the destination and
	 * source properties. If `customizer` returns `undefined` merging is handled
	 * by the method instead. The `customizer` is bound to `thisArg` and invoked
	 * with five arguments: (objectValue, sourceValue, key, object, source).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @param {Function} [customizer] The function to customize assigned values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * var users = {
	 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	 * };
	 *
	 * var ages = {
	 *   'data': [{ 'age': 36 }, { 'age': 40 }]
	 * };
	 *
	 * _.merge(users, ages);
	 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	 *
	 * // using a customizer callback
	 * var object = {
	 *   'fruits': ['apple'],
	 *   'vegetables': ['beet']
	 * };
	 *
	 * var other = {
	 *   'fruits': ['banana'],
	 *   'vegetables': ['carrot']
	 * };
	 *
	 * _.merge(object, other, function(a, b) {
	 *   if (_.isArray(a)) {
	 *     return a.concat(b);
	 *   }
	 * });
	 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	 */
	var merge = createAssigner(baseMerge);

	module.exports = merge;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _callbacks = [];
	var _mouseUpListenerIsActive = false;

	var _handleMouseUp = function _handleMouseUp(ev) {
	  _callbacks.forEach(function (callback) {
	    callback(ev);
	  });
	};

	var subscribe = function subscribe(callback) {
	  if (_callbacks.indexOf(callback) === -1) {
	    _callbacks.push(callback);
	  }

	  if (!_mouseUpListenerIsActive) {
	    window.addEventListener('mouseup', _handleMouseUp);
	    _mouseUpListenerIsActive = true;
	  }

	  return {
	    remove: function remove() {
	      var index = _callbacks.indexOf(callback);
	      _callbacks.splice(index, 1);

	      if (_callbacks.length === 0 && _mouseUpListenerIsActive) {
	        window.removeEventListener('mouseup', _handleMouseUp);
	        _mouseUpListenerIsActive = false;
	      }
	    }
	  };
	};

	module.exports = {
	  subscribe: subscribe
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseClone = __webpack_require__(23),
	    bindCallback = __webpack_require__(22),
	    isIterateeCall = __webpack_require__(24);

	/**
	 * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
	 * otherwise they are assigned by reference. If `customizer` is provided it is
	 * invoked to produce the cloned values. If `customizer` returns `undefined`
	 * cloning is handled by the method instead. The `customizer` is bound to
	 * `thisArg` and invoked with two argument; (value [, index|key, object]).
	 *
	 * **Note:** This method is loosely based on the
	 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	 * The enumerable properties of `arguments` objects and objects created by
	 * constructors other than `Object` are cloned to plain `Object` objects. An
	 * empty object is returned for uncloneable values such as functions, DOM nodes,
	 * Maps, Sets, and WeakMaps.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {*} [thisArg] The `this` binding of `customizer`.
	 * @returns {*} Returns the cloned value.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * var shallow = _.clone(users);
	 * shallow[0] === users[0];
	 * // => true
	 *
	 * var deep = _.clone(users, true);
	 * deep[0] === users[0];
	 * // => false
	 *
	 * // using a customizer callback
	 * var el = _.clone(document.body, function(value) {
	 *   if (_.isElement(value)) {
	 *     return value.cloneNode(false);
	 *   }
	 * });
	 *
	 * el === document.body
	 * // => false
	 * el.nodeName
	 * // => BODY
	 * el.childNodes.length;
	 * // => 0
	 */
	function clone(value, isDeep, customizer, thisArg) {
	  if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
	    isDeep = false;
	  } else if (typeof isDeep == 'function') {
	    thisArg = customizer;
	    customizer = isDeep;
	    isDeep = false;
	  }
	  customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 1);
	  return baseClone(value, isDeep, customizer);
	}

	module.exports = clone;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isLength = __webpack_require__(25),
	    isNative = __webpack_require__(26),
	    isObjectLike = __webpack_require__(27);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function (value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayMap = __webpack_require__(29),
	    baseDifference = __webpack_require__(31),
	    baseFlatten = __webpack_require__(30),
	    bindCallback = __webpack_require__(22),
	    keysIn = __webpack_require__(28),
	    pickByArray = __webpack_require__(32),
	    pickByCallback = __webpack_require__(33),
	    restParam = __webpack_require__(34);

	/**
	 * The opposite of `_.pick`; this method creates an object composed of the
	 * own and inherited enumerable properties of `object` that are not omitted.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The source object.
	 * @param {Function|...(string|string[])} [predicate] The function invoked per
	 *  iteration or property names to omit, specified as individual property
	 *  names or arrays of property names.
	 * @param {*} [thisArg] The `this` binding of `predicate`.
	 * @returns {Object} Returns the new object.
	 * @example
	 *
	 * var object = { 'user': 'fred', 'age': 40 };
	 *
	 * _.omit(object, 'age');
	 * // => { 'user': 'fred' }
	 *
	 * _.omit(object, _.isNumber);
	 * // => { 'user': 'fred' }
	 */
	var omit = restParam(function (object, props) {
	  if (object == null) {
	    return {};
	  }
	  if (typeof props[0] != 'function') {
	    var props = arrayMap(baseFlatten(props), String);
	    return pickByArray(object, baseDifference(keysIn(object), props));
	  }
	  var predicate = bindCallback(props[0], props[1], 3);
	  return pickByCallback(object, function (value, key, object) {
	    return !predicate(value, key, object);
	  });
	});

	module.exports = omit;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayReduce = __webpack_require__(36),
	    baseEach = __webpack_require__(35),
	    createReduce = __webpack_require__(37);

	/**
	 * Reduces `collection` to a value which is the accumulated result of running
	 * each element in `collection` through `iteratee`, where each successive
	 * invocation is supplied the return value of the previous. If `accumulator`
	 * is not provided the first element of `collection` is used as the initial
	 * value. The `iteratee` is bound to `thisArg` and invoked with four arguments:
	 * (accumulator, value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as interatees for methods like
	 * `_.reduce`, `_.reduceRight`, and `_.transform`.
	 *
	 * The guarded methods are:
	 * `assign`, `defaults`, `includes`, `merge`, `sortByAll`, and `sortByOrder`
	 *
	 * @static
	 * @memberOf _
	 * @alias foldl, inject
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {*} Returns the accumulated value.
	 * @example
	 *
	 * _.reduce([1, 2], function(total, n) {
	 *   return total + n;
	 * });
	 * // => 3
	 *
	 * _.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
	 *   result[key] = n * 3;
	 *   return result;
	 * }, {});
	 * // => { 'a': 3, 'b': 6 } (iteration order is not guaranteed)
	 */
	var reduce = createReduce(arrayReduce, baseEach);

	module.exports = reduce;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CSSPropertyOperations
	 * @typechecks static-only
	 */

	"use strict";

	var CSSProperty = __webpack_require__(38);
	var ExecutionEnvironment = __webpack_require__(42);

	var camelizeStyleName = __webpack_require__(40);
	var dangerousStyleValue = __webpack_require__(39);
	var hyphenateStyleName = __webpack_require__(41);
	var memoizeStringOnly = __webpack_require__(43);
	var warning = __webpack_require__(44);

	var processStyleName = memoizeStringOnly(function (styleName) {
	  return hyphenateStyleName(styleName);
	});

	var styleFloatAccessor = "cssFloat";
	if (ExecutionEnvironment.canUseDOM) {
	  // IE8 only supports accessing cssFloat (standard) as styleFloat
	  if (document.documentElement.style.cssFloat === undefined) {
	    styleFloatAccessor = "styleFloat";
	  }
	}

	if ("production" !== process.env.NODE_ENV) {
	  // 'msTransform' is correct, but the other prefixes should be capitalized
	  var badVendoredStyleNamePattern = /^(?:webkit|moz|o)[A-Z]/;

	  // style values shouldn't contain a semicolon
	  var badStyleValueWithSemicolonPattern = /;\s*$/;

	  var warnedStyleNames = {};
	  var warnedStyleValues = {};

	  var warnHyphenatedStyleName = function warnHyphenatedStyleName(name) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;
	    "production" !== process.env.NODE_ENV ? warning(false, "Unsupported style property %s. Did you mean %s?", name, camelizeStyleName(name)) : null;
	  };

	  var warnBadVendoredStyleName = function warnBadVendoredStyleName(name) {
	    if (warnedStyleNames.hasOwnProperty(name) && warnedStyleNames[name]) {
	      return;
	    }

	    warnedStyleNames[name] = true;
	    "production" !== process.env.NODE_ENV ? warning(false, "Unsupported vendor-prefixed style property %s. Did you mean %s?", name, name.charAt(0).toUpperCase() + name.slice(1)) : null;
	  };

	  var warnStyleValueWithSemicolon = function warnStyleValueWithSemicolon(name, value) {
	    if (warnedStyleValues.hasOwnProperty(value) && warnedStyleValues[value]) {
	      return;
	    }

	    warnedStyleValues[value] = true;
	    "production" !== process.env.NODE_ENV ? warning(false, "Style property values shouldn't contain a semicolon. " + "Try \"%s: %s\" instead.", name, value.replace(badStyleValueWithSemicolonPattern, "")) : null;
	  };

	  /**
	   * @param {string} name
	   * @param {*} value
	   */
	  var warnValidStyle = function warnValidStyle(name, value) {
	    if (name.indexOf("-") > -1) {
	      warnHyphenatedStyleName(name);
	    } else if (badVendoredStyleNamePattern.test(name)) {
	      warnBadVendoredStyleName(name);
	    } else if (badStyleValueWithSemicolonPattern.test(value)) {
	      warnStyleValueWithSemicolon(name, value);
	    }
	  };
	}

	/**
	 * Operations for dealing with CSS properties.
	 */
	var CSSPropertyOperations = {

	  /**
	   * Serializes a mapping of style properties for use as inline styles:
	   *
	   *   > createMarkupForStyles({width: '200px', height: 0})
	   *   "width:200px;height:0;"
	   *
	   * Undefined values are ignored so that declarative programming is easier.
	   * The result should be HTML-escaped before insertion into the DOM.
	   *
	   * @param {object} styles
	   * @return {?string}
	   */
	  createMarkupForStyles: function createMarkupForStyles(styles) {
	    var serialized = "";
	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }
	      var styleValue = styles[styleName];
	      if ("production" !== process.env.NODE_ENV) {
	        warnValidStyle(styleName, styleValue);
	      }
	      if (styleValue != null) {
	        serialized += processStyleName(styleName) + ":";
	        serialized += dangerousStyleValue(styleName, styleValue) + ";";
	      }
	    }
	    return serialized || null;
	  },

	  /**
	   * Sets the value for multiple styles on a node.  If a value is specified as
	   * '' (empty string), the corresponding style property will be unset.
	   *
	   * @param {DOMElement} node
	   * @param {object} styles
	   */
	  setValueForStyles: function setValueForStyles(node, styles) {
	    var style = node.style;
	    for (var styleName in styles) {
	      if (!styles.hasOwnProperty(styleName)) {
	        continue;
	      }
	      if ("production" !== process.env.NODE_ENV) {
	        warnValidStyle(styleName, styles[styleName]);
	      }
	      var styleValue = dangerousStyleValue(styleName, styles[styleName]);
	      if (styleName === "float") {
	        styleName = styleFloatAccessor;
	      }
	      if (styleValue) {
	        style[styleName] = styleValue;
	      } else {
	        var expansion = CSSProperty.shorthandPropertyExpansions[styleName];
	        if (expansion) {
	          // Shorthand property that IE8 won't like unsetting, so unset each
	          // component to placate it
	          for (var individualStyleName in expansion) {
	            style[individualStyleName] = "";
	          }
	        } else {
	          style[styleName] = "";
	        }
	      }
	    }
	  }

	};

	module.exports = CSSPropertyOperations;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var deburr = __webpack_require__(46),
	    words = __webpack_require__(47);

	/**
	 * Creates a function that produces compound words out of the words in a
	 * given string.
	 *
	 * @private
	 * @param {Function} callback The function to combine each word.
	 * @returns {Function} Returns the new compounder function.
	 */
	function createCompounder(callback) {
	  return function (string) {
	    var index = -1,
	        array = words(deburr(string)),
	        length = array.length,
	        result = '';

	    while (++index < length) {
	      result = callback(result, array[index], index);
	    }
	    return result;
	  };
	}

	module.exports = createCompounder;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayEach = __webpack_require__(48),
	    baseMergeDeep = __webpack_require__(49),
	    getSymbols = __webpack_require__(50),
	    isArray = __webpack_require__(15),
	    isArrayLike = __webpack_require__(51),
	    isObject = __webpack_require__(52),
	    isObjectLike = __webpack_require__(27),
	    isTypedArray = __webpack_require__(53),
	    keys = __webpack_require__(1);

	/** Used for native method references. */
	var arrayProto = Array.prototype;

	/** Native method references. */
	var push = arrayProto.push;

	/**
	 * The base implementation of `_.merge` without support for argument juggling,
	 * multiple sources, and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {Function} [customizer] The function to customize merging properties.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {Object} Returns `object`.
	 */
	function baseMerge(object, source, customizer, stackA, stackB) {
	  if (!isObject(object)) {
	    return object;
	  }
	  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source));
	  if (!isSrcArr) {
	    var props = keys(source);
	    push.apply(props, getSymbols(source));
	  }
	  arrayEach(props || source, function (srcValue, key) {
	    if (props) {
	      key = srcValue;
	      srcValue = source[key];
	    }
	    if (isObjectLike(srcValue)) {
	      stackA || (stackA = []);
	      stackB || (stackB = []);
	      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	    } else {
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = result === undefined;

	      if (isCommon) {
	        result = srcValue;
	      }
	      if ((isSrcArr || result !== undefined) && (isCommon || (result === result ? result !== value : value === value))) {
	        object[key] = result;
	      }
	    }
	  });
	  return object;
	}

	module.exports = baseMerge;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bindCallback = __webpack_require__(22),
	    isIterateeCall = __webpack_require__(24),
	    restParam = __webpack_require__(34);

	/**
	 * Creates a function that assigns properties of source object(s) to a given
	 * destination object.
	 *
	 * **Note:** This function is used to create `_.assign`, `_.defaults`, and `_.merge`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return restParam(function (object, sources) {
	    var index = -1,
	        length = object == null ? 0 : sources.length,
	        customizer = length > 2 && sources[length - 2],
	        guard = length > 2 && sources[2],
	        thisArg = length > 1 && sources[length - 1];

	    if (typeof customizer == 'function') {
	      customizer = bindCallback(customizer, thisArg, 5);
	      length -= 2;
	    } else {
	      customizer = typeof thisArg == 'function' ? thisArg : null;
	      length -= customizer ? 1 : 0;
	    }
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? null : customizer;
	      length = 1;
	    }
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, customizer);
	      }
	    }
	    return object;
	  });
	}

	module.exports = createAssigner;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var identity = __webpack_require__(55);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1:
	      return function (value) {
	        return func.call(thisArg, value);
	      };
	    case 3:
	      return function (value, index, collection) {
	        return func.call(thisArg, value, index, collection);
	      };
	    case 4:
	      return function (accumulator, value, index, collection) {
	        return func.call(thisArg, accumulator, value, index, collection);
	      };
	    case 5:
	      return function (value, other, key, object, source) {
	        return func.call(thisArg, value, other, key, object, source);
	      };
	  }
	  return function () {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayCopy = __webpack_require__(56),
	    arrayEach = __webpack_require__(48),
	    baseAssign = __webpack_require__(57),
	    baseForOwn = __webpack_require__(58),
	    initCloneArray = __webpack_require__(59),
	    initCloneByTag = __webpack_require__(60),
	    initCloneObject = __webpack_require__(61),
	    isArray = __webpack_require__(15),
	    isObject = __webpack_require__(52);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[stringTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[mapTag] = cloneableTags[setTag] = cloneableTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * The base implementation of `_.clone` without support for argument juggling
	 * and `this` binding `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @param {Function} [customizer] The function to customize cloning values.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The object `value` belongs to.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates clones with source counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
	  var result;
	  if (customizer) {
	    result = object ? customizer(value, key, object) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject(value)) {
	    return value;
	  }
	  var isArr = isArray(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return arrayCopy(value, result);
	    }
	  } else {
	    var tag = objToString.call(value),
	        isFunc = tag == funcTag;

	    if (tag == objectTag || tag == argsTag || isFunc && !object) {
	      result = initCloneObject(isFunc ? {} : value);
	      if (!isDeep) {
	        return baseAssign(result, value);
	      }
	    } else {
	      return cloneableTags[tag] ? initCloneByTag(value, tag, isDeep) : object ? value : {};
	    }
	  }
	  // Check for circular references and return corresponding clone.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == value) {
	      return stackB[length];
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate it with its clone.
	  stackA.push(value);
	  stackB.push(result);

	  // Recursively populate clone (susceptible to call stack limits).
	  (isArr ? arrayEach : baseForOwn)(value, function (subValue, key) {
	    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
	  });
	  return result;
	}

	module.exports = baseClone;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(51),
	    isIndex = __webpack_require__(62),
	    isObject = __webpack_require__(52);

	/**
	 * Checks if the provided arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
	    var other = object[index];
	    return value === value ? value === other : other !== other;
	  }
	  return false;
	}

	module.exports = isIterateeCall;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	'use strict';

	var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var escapeRegExp = __webpack_require__(63),
	    isObjectLike = __webpack_require__(27);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' + escapeRegExp(objToString).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (objToString.call(value) == funcTag) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	'use strict';

	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments = __webpack_require__(64),
	    isArray = __webpack_require__(15),
	    isIndex = __webpack_require__(62),
	    isLength = __webpack_require__(25),
	    isObject = __webpack_require__(52),
	    support = __webpack_require__(65);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
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
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = length && isLength(length) && (isArray(object) || support.nonEnumArgs && isArguments(object)) && length || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = index + '';
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A specialized version of `_.map` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	"use strict";

	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments = __webpack_require__(64),
	    isArray = __webpack_require__(15),
	    isArrayLike = __webpack_require__(51),
	    isObjectLike = __webpack_require__(27);

	/**
	 * The base implementation of `_.flatten` with added support for restricting
	 * flattening and specifying the start index.
	 *
	 * @private
	 * @param {Array} array The array to flatten.
	 * @param {boolean} [isDeep] Specify a deep flatten.
	 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	 * @returns {Array} Returns the new flattened array.
	 */
	function baseFlatten(array, isDeep, isStrict) {
	  var index = -1,
	      length = array.length,
	      resIndex = -1,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (isObjectLike(value) && isArrayLike(value) && (isStrict || isArray(value) || isArguments(value))) {
	      if (isDeep) {
	        // Recursively flatten arrays (susceptible to call stack limits).
	        value = baseFlatten(value, isDeep, isStrict);
	      }
	      var valIndex = -1,
	          valLength = value.length;

	      while (++valIndex < valLength) {
	        result[++resIndex] = value[valIndex];
	      }
	    } else if (!isStrict) {
	      result[++resIndex] = value;
	    }
	  }
	  return result;
	}

	module.exports = baseFlatten;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIndexOf = __webpack_require__(66),
	    cacheIndexOf = __webpack_require__(67),
	    createCache = __webpack_require__(68);

	/**
	 * The base implementation of `_.difference` which accepts a single array
	 * of values to exclude.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {Array} values The values to exclude.
	 * @returns {Array} Returns the new array of filtered values.
	 */
	function baseDifference(array, values) {
	  var length = array ? array.length : 0,
	      result = [];

	  if (!length) {
	    return result;
	  }
	  var index = -1,
	      indexOf = baseIndexOf,
	      isCommon = true,
	      cache = isCommon && values.length >= 200 ? createCache(values) : null,
	      valuesLength = values.length;

	  if (cache) {
	    indexOf = cacheIndexOf;
	    isCommon = false;
	    values = cache;
	  }
	  outer: while (++index < length) {
	    var value = array[index];

	    if (isCommon && value === value) {
	      var valuesIndex = valuesLength;
	      while (valuesIndex--) {
	        if (values[valuesIndex] === value) {
	          continue outer;
	        }
	      }
	      result.push(value);
	    } else if (indexOf(values, value, 0) < 0) {
	      result.push(value);
	    }
	  }
	  return result;
	}

	module.exports = baseDifference;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toObject = __webpack_require__(70);

	/**
	 * A specialized version of `_.pick` which picks `object` properties specified
	 * by `props`.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {string[]} props The property names to pick.
	 * @returns {Object} Returns the new object.
	 */
	function pickByArray(object, props) {
	  object = toObject(object);

	  var index = -1,
	      length = props.length,
	      result = {};

	  while (++index < length) {
	    var key = props[index];
	    if (key in object) {
	      result[key] = object[key];
	    }
	  }
	  return result;
	}

	module.exports = pickByArray;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseForIn = __webpack_require__(69);

	/**
	 * A specialized version of `_.pick` which picks `object` properties `predicate`
	 * returns truthy for.
	 *
	 * @private
	 * @param {Object} object The source object.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Object} Returns the new object.
	 */
	function pickByCallback(object, predicate) {
	  var result = {};
	  baseForIn(object, function (value, key, object) {
	    if (predicate(value, key, object)) {
	      result[key] = value;
	    }
	  });
	  return result;
	}

	module.exports = pickByCallback;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/** Used as the `TypeError` message for "Functions" methods. */
	'use strict';

	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;

	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.restParam(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function restParam(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? func.length - 1 : +start || 0, 0);
	  return function () {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        rest = Array(length);

	    while (++index < length) {
	      rest[index] = args[start + index];
	    }
	    switch (start) {
	      case 0:
	        return func.call(this, rest);
	      case 1:
	        return func.call(this, args[0], rest);
	      case 2:
	        return func.call(this, args[0], args[1], rest);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = rest;
	    return func.apply(this, otherArgs);
	  };
	}

	module.exports = restParam;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseForOwn = __webpack_require__(58),
	    createBaseEach = __webpack_require__(73);

	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A specialized version of `_.reduce` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} [accumulator] The initial value.
	 * @param {boolean} [initFromArray] Specify using the first element of `array`
	 *  as the initial value.
	 * @returns {*} Returns the accumulated value.
	 */
	"use strict";

	function arrayReduce(array, iteratee, accumulator, initFromArray) {
	  var index = -1,
	      length = array.length;

	  if (initFromArray && length) {
	    accumulator = array[++index];
	  }
	  while (++index < length) {
	    accumulator = iteratee(accumulator, array[index], index, array);
	  }
	  return accumulator;
	}

	module.exports = arrayReduce;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCallback = __webpack_require__(71),
	    baseReduce = __webpack_require__(72),
	    isArray = __webpack_require__(15);

	/**
	 * Creates a function for `_.reduce` or `_.reduceRight`.
	 *
	 * @private
	 * @param {Function} arrayFunc The function to iterate over an array.
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @returns {Function} Returns the new each function.
	 */
	function createReduce(arrayFunc, eachFunc) {
	  return function (collection, iteratee, accumulator, thisArg) {
	    var initFromArray = arguments.length < 3;
	    return typeof iteratee == 'function' && thisArg === undefined && isArray(collection) ? arrayFunc(collection, iteratee, accumulator, initFromArray) : baseReduce(collection, baseCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
	  };
	}

	module.exports = createReduce;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule CSSProperty
	 */

	'use strict';

	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */
	var isUnitlessNumber = {
	  boxFlex: true,
	  boxFlexGroup: true,
	  columnCount: true,
	  flex: true,
	  flexGrow: true,
	  flexPositive: true,
	  flexShrink: true,
	  flexNegative: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,

	  // SVG-related properties
	  fillOpacity: true,
	  strokeDashoffset: true,
	  strokeOpacity: true,
	  strokeWidth: true
	};

	/**
	 * @param {string} prefix vendor-specific prefix, eg: Webkit
	 * @param {string} key style name, eg: transitionDuration
	 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
	 * WebkitTransitionDuration
	 */
	function prefixKey(prefix, key) {
	  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}

	/**
	 * Support style names that may come passed in prefixed by adding permutations
	 * of vendor prefixes.
	 */
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

	// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
	// infinite loop, because it iterates over the newly added props too.
	Object.keys(isUnitlessNumber).forEach(function (prop) {
	  prefixes.forEach(function (prefix) {
	    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
	  });
	});

	/**
	 * Most style properties can be unset by doing .style[prop] = '' but IE8
	 * doesn't like doing that with shorthand properties so for the properties that
	 * IE8 breaks on, which are listed here, we instead unset each of the
	 * individual properties. See http://bugs.jquery.com/ticket/12385.
	 * The 4-value 'clock' properties like margin, padding, border-width seem to
	 * behave without any problems. Curiously, list-style works too without any
	 * special prodding.
	 */
	var shorthandPropertyExpansions = {
	  background: {
	    backgroundImage: true,
	    backgroundPosition: true,
	    backgroundRepeat: true,
	    backgroundColor: true
	  },
	  border: {
	    borderWidth: true,
	    borderStyle: true,
	    borderColor: true
	  },
	  borderBottom: {
	    borderBottomWidth: true,
	    borderBottomStyle: true,
	    borderBottomColor: true
	  },
	  borderLeft: {
	    borderLeftWidth: true,
	    borderLeftStyle: true,
	    borderLeftColor: true
	  },
	  borderRight: {
	    borderRightWidth: true,
	    borderRightStyle: true,
	    borderRightColor: true
	  },
	  borderTop: {
	    borderTopWidth: true,
	    borderTopStyle: true,
	    borderTopColor: true
	  },
	  font: {
	    fontStyle: true,
	    fontVariant: true,
	    fontWeight: true,
	    fontSize: true,
	    lineHeight: true,
	    fontFamily: true
	  }
	};

	var CSSProperty = {
	  isUnitlessNumber: isUnitlessNumber,
	  shorthandPropertyExpansions: shorthandPropertyExpansions
	};

	module.exports = CSSProperty;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule dangerousStyleValue
	 * @typechecks static-only
	 */

	'use strict';

	var CSSProperty = __webpack_require__(38);

	var isUnitlessNumber = CSSProperty.isUnitlessNumber;

	/**
	 * Convert a value into the proper css writable value. The style name `name`
	 * should be logical (no hyphens), as specified
	 * in `CSSProperty.isUnitlessNumber`.
	 *
	 * @param {string} name CSS property name such as `topMargin`.
	 * @param {*} value CSS property value such as `10px`.
	 * @return {string} Normalized style value with dimensions applied.
	 */
	function dangerousStyleValue(name, value) {
	  // Note that we've removed escapeTextForBrowser() calls here since the
	  // whole string will be escaped when the attribute is injected into
	  // the markup. If you provide unsafe user data here they can inject
	  // arbitrary CSS which may be problematic (I couldn't repro this):
	  // https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet
	  // http://www.thespanner.co.uk/2007/11/26/ultimate-xss-css-injection/
	  // This is not an XSS hole but instead a potential CSS injection issue
	  // which has lead to a greater discussion about how we're going to
	  // trust URLs moving forward. See #2115901

	  var isEmpty = value == null || typeof value === 'boolean' || value === '';
	  if (isEmpty) {
	    return '';
	  }

	  var isNonNumeric = isNaN(value);
	  if (isNonNumeric || value === 0 || isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name]) {
	    return '' + value; // cast to string
	  }

	  if (typeof value === 'string') {
	    value = value.trim();
	  }
	  return value + 'px';
	}

	module.exports = dangerousStyleValue;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule camelizeStyleName
	 * @typechecks
	 */

	"use strict";

	var camelize = __webpack_require__(75);

	var msPattern = /^-ms-/;

	/**
	 * Camelcases a hyphenated CSS property name, for example:
	 *
	 *   > camelizeStyleName('background-color')
	 *   < "backgroundColor"
	 *   > camelizeStyleName('-moz-transition')
	 *   < "MozTransition"
	 *   > camelizeStyleName('-ms-transition')
	 *   < "msTransition"
	 *
	 * As Andi Smith suggests
	 * (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
	 * is converted to lowercase `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelizeStyleName(string) {
	  return camelize(string.replace(msPattern, "ms-"));
	}

	module.exports = camelizeStyleName;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule hyphenateStyleName
	 * @typechecks
	 */

	"use strict";

	var hyphenate = __webpack_require__(74);

	var msPattern = /^ms-/;

	/**
	 * Hyphenates a camelcased CSS property name, for example:
	 *
	 *   > hyphenateStyleName('backgroundColor')
	 *   < "background-color"
	 *   > hyphenateStyleName('MozTransition')
	 *   < "-moz-transition"
	 *   > hyphenateStyleName('msTransition')
	 *   < "-ms-transition"
	 *
	 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
	 * is converted to `-ms-`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenateStyleName(string) {
	  return hyphenate(string).replace(msPattern, "-ms-");
	}

	module.exports = hyphenateStyleName;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule ExecutionEnvironment
	 */

	/*jslint evil: true */

	'use strict';

	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

	/**
	 * Simple, lightweight module assisting with the detection and context of
	 * Worker. Helps avoid circular dependencies and allows code to reason about
	 * whether or not they are in a Worker, even if they never include the main
	 * `ReactWorker` dependency.
	 */
	var ExecutionEnvironment = {

	  canUseDOM: canUseDOM,

	  canUseWorkers: typeof Worker !== 'undefined',

	  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

	  canUseViewport: canUseDOM && !!window.screen,

	  isInWorker: !canUseDOM // For now, this is true - might change in the future.

	};

	module.exports = ExecutionEnvironment;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule memoizeStringOnly
	 * @typechecks static-only
	 */

	'use strict';

	/**
	 * Memoizes the return value of a function that accepts one string argument.
	 *
	 * @param {function} callback
	 * @return {function}
	 */
	function memoizeStringOnly(callback) {
	  var cache = {};
	  return function (string) {
	    if (!cache.hasOwnProperty(string)) {
	      cache[string] = callback.call(this, string);
	    }
	    return cache[string];
	  };
	}

	module.exports = memoizeStringOnly;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule warning
	 */

	"use strict";

	var emptyFunction = __webpack_require__(76);

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = emptyFunction;

	if ("production" !== process.env.NODE_ENV) {
	  warning = function (condition, format) {
	    for (var args = [], $__0 = 2, $__1 = arguments.length; $__0 < $__1; $__0++) args.push(arguments[$__0]);
	    if (format === undefined) {
	      throw new Error("`warning(condition, format, ...args)` requires a warning " + "message argument");
	    }

	    if (format.length < 10 || /^[s\W]*$/.test(format)) {
	      throw new Error("The warning format should be able to uniquely identify this " + "warning. Please, use a more descriptive format than: " + format);
	    }

	    if (format.indexOf("Failed Composite propType: ") === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = "Warning: " + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      });
	      console.warn(message);
	      try {
	        // --- Welcome to debugging React ---
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch (x) {}
	    }
	  };
	}

	module.exports = warning;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	// shim for using process in browser

	'use strict';

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            currentQueue[queueIndex].run();
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (!draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	// TODO(shtylman)
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseToString = __webpack_require__(77),
	    deburrLetter = __webpack_require__(78);

	/** Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks). */
	var reComboMark = /[\u0300-\u036f\ufe20-\ufe23]/g;

	/** Used to match latin-1 supplementary letters (excluding mathematical operators). */
	var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;

	/**
	 * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	 * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to deburr.
	 * @returns {string} Returns the deburred string.
	 * @example
	 *
	 * _.deburr('déjà vu');
	 * // => 'deja vu'
	 */
	function deburr(string) {
	  string = baseToString(string);
	  return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
	}

	module.exports = deburr;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseToString = __webpack_require__(77),
	    isIterateeCall = __webpack_require__(24);

	/** Used to match words to create compound words. */
	var reWords = (function () {
	  var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
	      lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';

	  return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
	})();

	/**
	 * Splits `string` into an array of its words.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to inspect.
	 * @param {RegExp|string} [pattern] The pattern to match words.
	 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	 * @returns {Array} Returns the words of `string`.
	 * @example
	 *
	 * _.words('fred, barney, & pebbles');
	 * // => ['fred', 'barney', 'pebbles']
	 *
	 * _.words('fred, barney, & pebbles', /[^, ]+/g);
	 * // => ['fred', 'barney', '&', 'pebbles']
	 */
	function words(string, pattern, guard) {
	  if (guard && isIterateeCall(string, pattern, guard)) {
	    pattern = null;
	  }
	  string = baseToString(string);
	  return string.match(pattern || reWords) || [];
	}

	module.exports = words;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	"use strict";

	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var arrayCopy = __webpack_require__(56),
	    isArguments = __webpack_require__(64),
	    isArray = __webpack_require__(15),
	    isArrayLike = __webpack_require__(51),
	    isPlainObject = __webpack_require__(79),
	    isTypedArray = __webpack_require__(53),
	    toPlainObject = __webpack_require__(80);

	/**
	 * A specialized version of `baseMerge` for arrays and objects which performs
	 * deep merges and tracks traversed objects enabling objects with circular
	 * references to be merged.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @param {string} key The key of the value to merge.
	 * @param {Function} mergeFunc The function to merge values.
	 * @param {Function} [customizer] The function to customize merging properties.
	 * @param {Array} [stackA=[]] Tracks traversed source objects.
	 * @param {Array} [stackB=[]] Associates values with source counterparts.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	  var length = stackA.length,
	      srcValue = source[key];

	  while (length--) {
	    if (stackA[length] == srcValue) {
	      object[key] = stackB[length];
	      return;
	    }
	  }
	  var value = object[key],
	      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	      isCommon = result === undefined;

	  if (isCommon) {
	    result = srcValue;
	    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
	      result = isArray(value) ? value : isArrayLike(value) ? arrayCopy(value) : [];
	    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	      result = isArguments(value) ? toPlainObject(value) : isPlainObject(value) ? value : {};
	    } else {
	      isCommon = false;
	    }
	  }
	  // Add the source value to the stack of traversed objects and associate
	  // it with its merged value.
	  stackA.push(srcValue);
	  stackB.push(result);

	  if (isCommon) {
	    // Recursively merge objects and arrays (susceptible to call stack limits).
	    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	  } else if (result === result ? result !== value : value === value) {
	    object[key] = result;
	  }
	}

	module.exports = baseMergeDeep;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var constant = __webpack_require__(81),
	    isNative = __webpack_require__(26),
	    toObject = __webpack_require__(70);

	/** Native method references. */
	var getOwnPropertySymbols = isNative(getOwnPropertySymbols = Object.getOwnPropertySymbols) && getOwnPropertySymbols;

	/**
	 * Creates an array of the own symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !getOwnPropertySymbols ? constant([]) : function (object) {
	  return getOwnPropertySymbols(toObject(object));
	};

	module.exports = getSymbols;

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getLength = __webpack_require__(82),
	    isLength = __webpack_require__(25);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
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
	 * _.isObject(1);
	 * // => false
	 */
	'use strict';

	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return type == 'function' || !!value && type == 'object';
	}

	module.exports = isObject;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isLength = __webpack_require__(25),
	    isObjectLike = __webpack_require__(27);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	}

	module.exports = isTypedArray;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var resolveStyles = __webpack_require__(7);
	var wrapUtils = __webpack_require__(8);

	var enhanceWithRadium = function enhanceWithRadium(ComposedComponent) {
	  var RadiumEnhancer = function RadiumEnhancer() {
	    ComposedComponent.prototype.constructor.call(this);

	    if (!this.state) {
	      this.state = {};
	    }

	    var radiumInitialState = wrapUtils.getInitialState();
	    Object.keys(radiumInitialState).forEach(function (key) {
	      this.state[key] = radiumInitialState[key];
	    }, this);
	  };

	  RadiumEnhancer.prototype = new ComposedComponent();
	  RadiumEnhancer.prototype.constructor = RadiumEnhancer;

	  RadiumEnhancer.prototype.render = function () {
	    var renderedElement = ComposedComponent.prototype.render.call(this);
	    return resolveStyles(this, renderedElement);
	  };

	  RadiumEnhancer.prototype.componentWillUnmount = function () {
	    if (ComposedComponent.prototype.componentWillUnmount) {
	      ComposedComponent.prototype.componentWillUnmount.call(this);
	    }

	    wrapUtils.componentWillUnmount(this);
	  };

	  RadiumEnhancer.defaultProps = ComposedComponent.defaultProps;
	  RadiumEnhancer.propTypes = ComposedComponent.propTypes;
	  RadiumEnhancer.contextTypes = ComposedComponent.contextTypes;

	  return RadiumEnhancer;
	};

	module.exports = enhanceWithRadium;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	"use strict";

	function identity(value) {
	  return value;
	}

	module.exports = identity;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */
	"use strict";

	function arrayCopy(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	module.exports = arrayCopy;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCopy = __webpack_require__(84),
	    getSymbols = __webpack_require__(50),
	    isNative = __webpack_require__(26),
	    keys = __webpack_require__(1);

	/** Native method references. */
	var preventExtensions = isNative(preventExtensions = Object.preventExtensions) && preventExtensions;

	/** Used as `baseAssign`. */
	var nativeAssign = (function () {
	  // Avoid `Object.assign` in Firefox 34-37 which have an early implementation
	  // with a now defunct try/catch behavior. See https://bugzilla.mozilla.org/show_bug.cgi?id=1103344
	  // for more details.
	  //
	  // Use `Object.preventExtensions` on a plain object instead of simply using
	  // `Object('x')` because Chrome and IE fail to throw an error when attempting
	  // to assign values to readonly indexes of strings.
	  var func = preventExtensions && isNative(func = Object.assign) && func;
	  try {
	    if (func) {
	      var object = preventExtensions({ '1': 0 });
	      object[0] = 1;
	    }
	  } catch (e) {
	    // Only attempt in strict mode.
	    try {
	      func(object, 'xo');
	    } catch (e) {}
	    return !object[1] && func;
	  }
	  return false;
	})();

	/**
	 * The base implementation of `_.assign` without support for argument juggling,
	 * multiple sources, and `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	var baseAssign = nativeAssign || function (object, source) {
	  return source == null ? object : baseCopy(source, getSymbols(source), baseCopy(source, keys(source), object));
	};

	module.exports = baseAssign;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFor = __webpack_require__(85),
	    keys = __webpack_require__(1);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/** Used for native method references. */
	'use strict';

	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray(array) {
	  var length = array.length,
	      result = new array.constructor(length);

	  // Add array properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	module.exports = initCloneArray;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var bufferClone = __webpack_require__(86);

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to match `RegExp` flags from their coerced string values. */
	var reFlags = /\w*$/;

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag:
	      return bufferClone(object);

	    case boolTag:
	    case dateTag:
	      return new Ctor(+object);

	    case float32Tag:case float64Tag:
	    case int8Tag:case int16Tag:case int32Tag:
	    case uint8Tag:case uint8ClampedTag:case uint16Tag:case uint32Tag:
	      var buffer = object.buffer;
	      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

	    case numberTag:
	    case stringTag:
	      return new Ctor(object);

	    case regexpTag:
	      var result = new Ctor(object.source, reFlags.exec(object));
	      result.lastIndex = object.lastIndex;
	  }
	  return result;
	}

	module.exports = initCloneByTag;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	'use strict';

	function initCloneObject(object) {
	  var Ctor = object.constructor;
	  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
	    Ctor = Object;
	  }
	  return new Ctor();
	}

	module.exports = initCloneObject;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	"use strict";

	var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = +value;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseToString = __webpack_require__(77);

	/**
	 * Used to match `RegExp` [special characters](http://www.regular-expressions.info/characters.html#special).
	 * In addition to special characters the forward slash is escaped to allow for
	 * easier `eval` use and `Function` compilation.
	 */
	var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
	    reHasRegExpChars = RegExp(reRegExpChars.source);

	/**
	 * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
	 * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
	 *
	 * @static
	 * @memberOf _
	 * @category String
	 * @param {string} [string=''] The string to escape.
	 * @returns {string} Returns the escaped string.
	 * @example
	 *
	 * _.escapeRegExp('[lodash](https://lodash.com/)');
	 * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
	 */
	function escapeRegExp(string) {
	  string = baseToString(string);
	  return string && reHasRegExpChars.test(string) ? string.replace(reRegExpChars, '\\$&') : string;
	}

	module.exports = escapeRegExp;

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArrayLike = __webpack_require__(51),
	    isObjectLike = __webpack_require__(27);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) && objToString.call(value) == argsTag;
	}

	module.exports = isArguments;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Used for native method references. */
	'use strict';

	var objectProto = Object.prototype;

	/** Used to detect DOM support. */
	var document = (document = global.window) && document.document;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * An object environment feature flags.
	 *
	 * @static
	 * @memberOf _
	 * @type Object
	 */
	var support = {};

	(function (x) {
	  var Ctor = function Ctor() {
	    this.x = x;
	  },
	      args = arguments,
	      object = { '0': x, 'length': x },
	      props = [];

	  Ctor.prototype = { 'valueOf': x, 'y': x };
	  for (var key in new Ctor()) {
	    props.push(key);
	  }

	  /**
	   * Detect if functions can be decompiled by `Function#toString`
	   * (all but Firefox OS certified apps, older Opera mobile browsers, and
	   * the PlayStation 3; forced `false` for Windows 8 apps).
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.funcDecomp = /\bthis\b/.test(function () {
	    return this;
	  });

	  /**
	   * Detect if `Function#name` is supported (all but IE).
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  support.funcNames = typeof Function.name == 'string';

	  /**
	   * Detect if the DOM is supported.
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  try {
	    support.dom = document.createDocumentFragment().nodeType === 11;
	  } catch (e) {
	    support.dom = false;
	  }

	  /**
	   * Detect if `arguments` object indexes are non-enumerable.
	   *
	   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
	   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
	   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
	   * checks for indexes that exceed the number of function parameters and
	   * whose associated argument values are `0`.
	   *
	   * @memberOf _.support
	   * @type boolean
	   */
	  try {
	    support.nonEnumArgs = !propertyIsEnumerable.call(args, 1);
	  } catch (e) {
	    support.nonEnumArgs = true;
	  }
	})(1, 0);

	module.exports = support;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var indexOfNaN = __webpack_require__(87);

	/**
	 * The base implementation of `_.indexOf` without support for binary searches.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} value The value to search for.
	 * @param {number} fromIndex The index to search from.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseIndexOf(array, value, fromIndex) {
	  if (value !== value) {
	    return indexOfNaN(array, fromIndex);
	  }
	  var index = fromIndex - 1,
	      length = array.length;

	  while (++index < length) {
	    if (array[index] === value) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseIndexOf;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(52);

	/**
	 * Checks if `value` is in `cache` mimicking the return signature of
	 * `_.indexOf` by returning `0` if the value is found, else `-1`.
	 *
	 * @private
	 * @param {Object} cache The cache to search.
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `0` if `value` is found, else `-1`.
	 */
	function cacheIndexOf(cache, value) {
	  var data = cache.data,
	      result = typeof value == 'string' || isObject(value) ? data.set.has(value) : data.hash[value];

	  return result ? 0 : -1;
	}

	module.exports = cacheIndexOf;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var SetCache = __webpack_require__(88),
	    constant = __webpack_require__(81),
	    isNative = __webpack_require__(26);

	/** Native method references. */
	var Set = isNative(Set = global.Set) && Set;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

	/**
	 * Creates a `Set` cache object to optimize linear searches of large arrays.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
	 */
	var createCache = !(nativeCreate && Set) ? constant(null) : function (values) {
	  return new SetCache(values);
	};

	module.exports = createCache;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseFor = __webpack_require__(85),
	    keysIn = __webpack_require__(28);

	/**
	 * The base implementation of `_.forIn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForIn(object, iteratee) {
	  return baseFor(object, iteratee, keysIn);
	}

	module.exports = baseForIn;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(52);

	/**
	 * Converts `value` to an object if it is not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseMatches = __webpack_require__(89),
	    baseMatchesProperty = __webpack_require__(90),
	    bindCallback = __webpack_require__(22),
	    identity = __webpack_require__(55),
	    property = __webpack_require__(91);

	/**
	 * The base implementation of `_.callback` which supports specifying the
	 * number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {*} [func=_.identity] The value to convert to a callback.
	 * @param {*} [thisArg] The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function baseCallback(func, thisArg, argCount) {
	  var type = typeof func;
	  if (type == 'function') {
	    return thisArg === undefined ? func : bindCallback(func, thisArg, argCount);
	  }
	  if (func == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return baseMatches(func);
	  }
	  return thisArg === undefined ? property(func) : baseMatchesProperty(func, thisArg);
	}

	module.exports = baseCallback;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The base implementation of `_.reduce` and `_.reduceRight` without support
	 * for callback shorthands and `this` binding, which iterates over `collection`
	 * using the provided `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {*} accumulator The initial value.
	 * @param {boolean} initFromCollection Specify using the first or last element
	 *  of `collection` as the initial value.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @returns {*} Returns the accumulated value.
	 */
	"use strict";

	function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
	  eachFunc(collection, function (value, index, collection) {
	    accumulator = initFromCollection ? (initFromCollection = false, value) : iteratee(accumulator, value, index, collection);
	  });
	  return accumulator;
	}

	module.exports = baseReduce;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var getLength = __webpack_require__(82),
	    isLength = __webpack_require__(25),
	    toObject = __webpack_require__(70);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function (collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);

	    while (fromRight ? index-- : ++index < length) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule hyphenate
	 * @typechecks
	 */

	'use strict';

	var _uppercasePattern = /([A-Z])/g;

	/**
	 * Hyphenates a camelcased string, for example:
	 *
	 *   > hyphenate('backgroundColor')
	 *   < "background-color"
	 *
	 * For CSS style names, use `hyphenateStyleName` instead which works properly
	 * with all vendor prefixes, including `ms`.
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function hyphenate(string) {
	  return string.replace(_uppercasePattern, '-$1').toLowerCase();
	}

	module.exports = hyphenate;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule camelize
	 * @typechecks
	 */

	"use strict";

	var _hyphenPattern = /-(.)/g;

	/**
	 * Camelcases a hyphenated string, for example:
	 *
	 *   > camelize('background-color')
	 *   < "backgroundColor"
	 *
	 * @param {string} string
	 * @return {string}
	 */
	function camelize(string) {
	  return string.replace(_hyphenPattern, function (_, character) {
	    return character.toUpperCase();
	  });
	}

	module.exports = camelize;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule emptyFunction
	 */

	"use strict";

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	function emptyFunction() {}

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	module.exports = emptyFunction;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Converts `value` to a string if it is not one. An empty string is returned
	 * for `null` or `undefined` values.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 */
	'use strict';

	function baseToString(value) {
	  if (typeof value == 'string') {
	    return value;
	  }
	  return value == null ? '' : value + '';
	}

	module.exports = baseToString;

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/** Used to map latin-1 supplementary letters to basic latin letters. */
	'use strict';

	var deburredLetters = {
	  'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A',
	  'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a',
	  'Ç': 'C', 'ç': 'c',
	  'Ð': 'D', 'ð': 'd',
	  'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E',
	  'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
	  'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I',
	  'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
	  'Ñ': 'N', 'ñ': 'n',
	  'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Ø': 'O',
	  'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o',
	  'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U',
	  'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u',
	  'Ý': 'Y', 'ý': 'y', 'ÿ': 'y',
	  'Æ': 'Ae', 'æ': 'ae',
	  'Þ': 'Th', 'þ': 'th',
	  'ß': 'ss'
	};

	/**
	 * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
	 *
	 * @private
	 * @param {string} letter The matched letter to deburr.
	 * @returns {string} Returns the deburred letter.
	 */
	function deburrLetter(letter) {
	  return deburredLetters[letter];
	}

	module.exports = deburrLetter;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isNative = __webpack_require__(26),
	    shimIsPlainObject = __webpack_require__(92);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/** Native method references. */
	var getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf;

	/**
	 * Checks if `value` is a plain object, that is, an object created by the
	 * `Object` constructor or one with a `[[Prototype]]` of `null`.
	 *
	 * **Note:** This method assumes objects created by the `Object` constructor
	 * have no inherited enumerable properties.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * _.isPlainObject(new Foo);
	 * // => false
	 *
	 * _.isPlainObject([1, 2, 3]);
	 * // => false
	 *
	 * _.isPlainObject({ 'x': 0, 'y': 0 });
	 * // => true
	 *
	 * _.isPlainObject(Object.create(null));
	 * // => true
	 */
	var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function (value) {
	    if (!(value && objToString.call(value) == objectTag)) {
	        return false;
	    }
	    var valueOf = value.valueOf,
	        objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

	    return objProto ? value == objProto || getPrototypeOf(value) == objProto : shimIsPlainObject(value);
	};

	module.exports = isPlainObject;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseCopy = __webpack_require__(84),
	    keysIn = __webpack_require__(28);

	/**
	 * Converts `value` to a plain object flattening inherited enumerable
	 * properties of `value` to own properties of the plain object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {Object} Returns the converted plain object.
	 * @example
	 *
	 * function Foo() {
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.assign({ 'a': 1 }, new Foo);
	 * // => { 'a': 1, 'b': 2 }
	 *
	 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	 * // => { 'a': 1, 'b': 2, 'c': 3 }
	 */
	function toPlainObject(value) {
	  return baseCopy(value, keysIn(value));
	}

	module.exports = toPlainObject;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Creates a function that returns `value`.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value The value to return from the new function.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var getter = _.constant(object);
	 *
	 * getter() === object;
	 * // => true
	 */
	"use strict";

	function constant(value) {
	  return function () {
	    return value;
	  };
	}

	module.exports = constant;

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseProperty = __webpack_require__(93);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArguments = __webpack_require__(64),
	    isArray = __webpack_require__(15),
	    isIndex = __webpack_require__(62),
	    isLength = __webpack_require__(25),
	    keysIn = __webpack_require__(28),
	    support = __webpack_require__(65);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = length && isLength(length) && (isArray(object) || support.nonEnumArgs && isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	"use strict";

	function baseCopy(source, props, object) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];
	    object[key] = source[key];
	  }
	  return object;
	}

	module.exports = baseCopy;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createBaseFor = __webpack_require__(94);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var constant = __webpack_require__(81),
	    isNative = __webpack_require__(26);

	/** Native method references. */
	var ArrayBuffer = isNative(ArrayBuffer = global.ArrayBuffer) && ArrayBuffer,
	    bufferSlice = isNative(bufferSlice = ArrayBuffer && new ArrayBuffer(0).slice) && bufferSlice,
	    floor = Math.floor,
	    Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

	/** Used to clone array buffers. */
	var Float64Array = (function () {
	  // Safari 5 errors when using an array buffer to initialize a typed array
	  // where the array buffer's `byteLength` is not a multiple of the typed
	  // array's `BYTES_PER_ELEMENT`.
	  try {
	    var func = isNative(func = global.Float64Array) && func,
	        result = new func(new ArrayBuffer(10), 0, 1) && func;
	  } catch (e) {}
	  return result;
	})();

	/** Used as the size, in bytes, of each `Float64Array` element. */
	var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

	/**
	 * Creates a clone of the given array buffer.
	 *
	 * @private
	 * @param {ArrayBuffer} buffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function bufferClone(buffer) {
	  return bufferSlice.call(buffer, 0);
	}
	if (!bufferSlice) {
	  // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
	  bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function (buffer) {
	    var byteLength = buffer.byteLength,
	        floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
	        offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
	        result = new ArrayBuffer(byteLength);

	    if (floatLength) {
	      var view = new Float64Array(result, 0, floatLength);
	      view.set(new Float64Array(buffer, 0, floatLength));
	    }
	    if (byteLength != offset) {
	      view = new Uint8Array(result, offset);
	      view.set(new Uint8Array(buffer, offset));
	    }
	    return result;
	  };
	}

	module.exports = bufferClone;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Gets the index at which the first occurrence of `NaN` is found in `array`.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {number} fromIndex The index to search from.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	 */
	"use strict";

	function indexOfNaN(array, fromIndex, fromRight) {
	  var length = array.length,
	      index = fromIndex + (fromRight ? 0 : -1);

	  while (fromRight ? index-- : ++index < length) {
	    var other = array[index];
	    if (other !== other) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = indexOfNaN;

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var cachePush = __webpack_require__(95),
	    isNative = __webpack_require__(26);

	/** Native method references. */
	var Set = isNative(Set = global.Set) && Set;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

	/**
	 *
	 * Creates a cache object to store unique values.
	 *
	 * @private
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var length = values ? values.length : 0;

	  this.data = { 'hash': nativeCreate(null), 'set': new Set() };
	  while (length--) {
	    this.push(values[length]);
	  }
	}

	// Add functions to the `Set` cache.
	SetCache.prototype.push = cachePush;

	module.exports = SetCache;
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsMatch = __webpack_require__(103),
	    constant = __webpack_require__(81),
	    isStrictComparable = __webpack_require__(100),
	    keys = __webpack_require__(1),
	    toObject = __webpack_require__(70);

	/**
	 * The base implementation of `_.matches` which does not clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var props = keys(source),
	      length = props.length;

	  if (!length) {
	    return constant(true);
	  }
	  if (length == 1) {
	    var key = props[0],
	        value = source[key];

	    if (isStrictComparable(value)) {
	      return function (object) {
	        if (object == null) {
	          return false;
	        }
	        return object[key] === value && (value !== undefined || key in toObject(object));
	      };
	    }
	  }
	  var values = Array(length),
	      strictCompareFlags = Array(length);

	  while (length--) {
	    value = source[props[length]];
	    values[length] = value;
	    strictCompareFlags[length] = isStrictComparable(value);
	  }
	  return function (object) {
	    return object != null && baseIsMatch(toObject(object), props, values, strictCompareFlags);
	  };
	}

	module.exports = baseMatches;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGet = __webpack_require__(96),
	    baseIsEqual = __webpack_require__(97),
	    baseSlice = __webpack_require__(98),
	    isArray = __webpack_require__(15),
	    isKey = __webpack_require__(99),
	    isStrictComparable = __webpack_require__(100),
	    last = __webpack_require__(101),
	    toObject = __webpack_require__(70),
	    toPath = __webpack_require__(102);

	/**
	 * The base implementation of `_.matchesProperty` which does not which does
	 * not clone `value`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} value The value to compare.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, value) {
	  var isArr = isArray(path),
	      isCommon = isKey(path) && isStrictComparable(value),
	      pathKey = path + '';

	  path = toPath(path);
	  return function (object) {
	    if (object == null) {
	      return false;
	    }
	    var key = pathKey;
	    object = toObject(object);
	    if ((isArr || !isCommon) && !(key in object)) {
	      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	      if (object == null) {
	        return false;
	      }
	      key = last(path);
	      object = toObject(object);
	    }
	    return object[key] === value ? value !== undefined || key in object : baseIsEqual(value, object[key], null, true);
	  };
	}

	module.exports = baseMatchesProperty;

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseProperty = __webpack_require__(93),
	    basePropertyDeep = __webpack_require__(104),
	    isKey = __webpack_require__(99);

	/**
	 * Creates a function which returns the property value at `path` on a
	 * given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = property;

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseForIn = __webpack_require__(69),
	    isObjectLike = __webpack_require__(27);

	/** `Object#toString` result references. */
	var objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * A fallback implementation of `_.isPlainObject` which checks if `value`
	 * is an object created by the `Object` constructor or has a `[[Prototype]]`
	 * of `null`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	 */
	function shimIsPlainObject(value) {
	  var Ctor;

	  // Exit early for non `Object` objects.
	  if (!(isObjectLike(value) && objToString.call(value) == objectTag) || !hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor))) {
	    return false;
	  }
	  // IE < 9 iterates inherited properties before own properties. If the first
	  // iterated property is an object's own property then there are no inherited
	  // enumerable properties.
	  var result;
	  // In most environments an object's own properties are iterated before
	  // its inherited properties. If the last iterated property is an object's
	  // own property then there are no inherited enumerable properties.
	  baseForIn(value, function (subValue, key) {
	    result = key;
	  });
	  return result === undefined || hasOwnProperty.call(value, result);
	}

	module.exports = shimIsPlainObject;

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	"use strict";

	function baseProperty(key) {
	  return function (object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toObject = __webpack_require__(70);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function (object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while (fromRight ? index-- : ++index < length) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(52);

	/**
	 * Adds `value` to the cache.
	 *
	 * @private
	 * @name push
	 * @memberOf SetCache
	 * @param {*} value The value to cache.
	 */
	function cachePush(value) {
	  var data = this.data;
	  if (typeof value == 'string' || isObject(value)) {
	    data.set.add(value);
	  } else {
	    data.hash[value] = true;
	  }
	}

	module.exports = cachePush;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var toObject = __webpack_require__(70);

	/**
	 * The base implementation of `get` without support for string paths
	 * and default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path of the property to get.
	 * @param {string} [pathKey] The key representation of path.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path, pathKey) {
	  if (object == null) {
	    return;
	  }
	  if (pathKey !== undefined && pathKey in toObject(object)) {
	    path = [pathKey];
	  }
	  var index = -1,
	      length = path.length;

	  while (object != null && ++index < length) {
	    object = object[path[index]];
	  }
	  return index && index == length ? object : undefined;
	}

	module.exports = baseGet;

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsEqualDeep = __webpack_require__(105);

	/**
	 * The base implementation of `_.isEqual` without support for `this` binding
	 * `customizer` functions.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	  // Exit early for identical values.
	  if (value === other) {
	    return true;
	  }
	  var valType = typeof value,
	      othType = typeof other;

	  // Exit early for unlike primitive values.
	  if (valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object' || value == null || other == null) {
	    // Return `false` unless both values are `NaN`.
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
	}

	module.exports = baseIsEqual;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	"use strict";

	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  start = start == null ? 0 : +start || 0;
	  if (start < 0) {
	    start = -start > length ? 0 : length + start;
	  }
	  end = end === undefined || end > length ? length : +end || 0;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : end - start >>> 0;
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isArray = __webpack_require__(15),
	    toObject = __webpack_require__(70);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  var type = typeof value;
	  if (type == 'string' && reIsPlainProp.test(value) || type == 'number') {
	    return true;
	  }
	  if (isArray(value)) {
	    return false;
	  }
	  var result = !reIsDeepProp.test(value);
	  return result || object != null && value in toObject(object);
	}

	module.exports = isKey;

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(52);

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

	module.exports = isStrictComparable;

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	"use strict";

	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseToString = __webpack_require__(77),
	    isArray = __webpack_require__(15);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `value` to property path array if it is not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Array} Returns the property path array.
	 */
	function toPath(value) {
	  if (isArray(value)) {
	    return value;
	  }
	  var result = [];
	  baseToString(value).replace(rePropName, function (match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
	  });
	  return result;
	}

	module.exports = toPath;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseIsEqual = __webpack_require__(97);

	/**
	 * The base implementation of `_.isMatch` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Array} props The source property names to match.
	 * @param {Array} values The source values to match.
	 * @param {Array} strictCompareFlags Strict comparison flags for source values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
	  var index = -1,
	      length = props.length,
	      noCustomizer = !customizer;

	  while (++index < length) {
	    if (noCustomizer && strictCompareFlags[index] ? values[index] !== object[props[index]] : !(props[index] in object)) {
	      return false;
	    }
	  }
	  index = -1;
	  while (++index < length) {
	    var key = props[index],
	        objValue = object[key],
	        srcValue = values[index];

	    if (noCustomizer && strictCompareFlags[index]) {
	      var result = objValue !== undefined || key in object;
	    } else {
	      result = customizer ? customizer(objValue, srcValue, key) : undefined;
	      if (result === undefined) {
	        result = baseIsEqual(srcValue, objValue, customizer, true);
	      }
	    }
	    if (!result) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var baseGet = __webpack_require__(96),
	    toPath = __webpack_require__(102);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  var pathKey = path + '';
	  path = toPath(path);
	  return function (object) {
	    return baseGet(object, path, pathKey);
	  };
	}

	module.exports = basePropertyDeep;

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var equalArrays = __webpack_require__(106),
	    equalByTag = __webpack_require__(107),
	    equalObjects = __webpack_require__(108),
	    isArray = __webpack_require__(15),
	    isTypedArray = __webpack_require__(53);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing objects.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = objToString.call(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = objToString.call(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag,
	      othIsObj = othTag == objectTag,
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag);
	  }
	  if (!isLoose) {
	    var valWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (valWrapped || othWrapped) {
	      return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  // For more information on detecting circular references see https://es5.github.io/#JO.
	  stackA || (stackA = []);
	  stackB || (stackB = []);

	  var length = stackA.length;
	  while (length--) {
	    if (stackA[length] == object) {
	      return stackB[length] == other;
	    }
	  }
	  // Add `object` and `other` to the stack of traversed objects.
	  stackA.push(object);
	  stackB.push(other);

	  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

	  stackA.pop();
	  stackB.pop();

	  return result;
	}

	module.exports = baseIsEqualDeep;

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing arrays.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	"use strict";

	function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var index = -1,
	      arrLength = array.length,
	      othLength = other.length,
	      result = true;

	  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	    return false;
	  }
	  // Deep compare the contents, ignoring non-numeric properties.
	  while (result && ++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    result = undefined;
	    if (customizer) {
	      result = isLoose ? customizer(othValue, arrValue, index) : customizer(arrValue, othValue, index);
	    }
	    if (result === undefined) {
	      // Recursively compare arrays (susceptible to call stack limits).
	      if (isLoose) {
	        var othIndex = othLength;
	        while (othIndex--) {
	          othValue = other[othIndex];
	          result = arrValue && arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	          if (result) {
	            break;
	          }
	        }
	      } else {
	        result = arrValue && arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	      }
	    }
	  }
	  return !!result;
	}

	module.exports = equalArrays;

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	/** `Object#toString` result references. */
	'use strict';

	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    stringTag = '[object String]';

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} value The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag) {
	  switch (tag) {
	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return object != +object ? other != +other : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == other + '';
	  }
	  return false;
	}

	module.exports = equalByTag;

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keys = __webpack_require__(1);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparing values.
	 * @param {boolean} [isLoose] Specify performing partial comparisons.
	 * @param {Array} [stackA] Tracks traversed `value` objects.
	 * @param {Array} [stackB] Tracks traversed `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	  var objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isLoose) {
	    return false;
	  }
	  var skipCtor = isLoose,
	      index = -1;

	  while (++index < objLength) {
	    var key = objProps[index],
	        result = isLoose ? key in other : hasOwnProperty.call(other, key);

	    if (result) {
	      var objValue = object[key],
	          othValue = other[key];

	      result = undefined;
	      if (customizer) {
	        result = isLoose ? customizer(othValue, objValue, key) : customizer(objValue, othValue, key);
	      }
	      if (result === undefined) {
	        // Recursively compare objects (susceptible to call stack limits).
	        result = objValue && objValue === othValue || equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB);
	      }
	    }
	    if (!result) {
	      return false;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (!skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = equalObjects;

/***/ }
/******/ ])
});
;