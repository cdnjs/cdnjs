(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Radium"] = factory(require("react"));
	else
		root["Radium"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__) {
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

	var Enhancer = __webpack_require__(1);

	module.exports = function (ComposedComponent) {
	  return Enhancer(ComposedComponent);
	};
	module.exports.Style = __webpack_require__(10);
	module.exports.getState = __webpack_require__(5);
	module.exports.keyframes = __webpack_require__(12);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var resolveStyles = __webpack_require__(2);

	var enhanceWithRadium = function enhanceWithRadium(ComposedComponent) {
	  var displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';

	  var RadiumEnhancer = (function (_ComposedComponent) {
	    function RadiumEnhancer() {
	      _classCallCheck(this, RadiumEnhancer);

	      _get(Object.getPrototypeOf(RadiumEnhancer.prototype), 'constructor', this).apply(this, arguments);

	      this.state = this.state || {};
	      this.state._radiumStyleState = {};
	    }

	    _inherits(RadiumEnhancer, _ComposedComponent);

	    _createClass(RadiumEnhancer, [{
	      key: 'render',
	      value: function render() {
	        var renderedElement = _get(Object.getPrototypeOf(RadiumEnhancer.prototype), 'render', this).call(this);
	        return resolveStyles(this, renderedElement);
	      }
	    }, {
	      key: 'componentWillUnmount',
	      value: function componentWillUnmount() {
	        if (_get(Object.getPrototypeOf(RadiumEnhancer.prototype), 'componentWillUnmount', this)) {
	          _get(Object.getPrototypeOf(RadiumEnhancer.prototype), 'componentWillUnmount', this).call(this);
	        }

	        if (this._radiumMouseUpListener) {
	          this._radiumMouseUpListener.remove();
	        }

	        if (this._radiumMediaQueryListenersByQuery) {
	          Object.keys(this._radiumMediaQueryListenersByQuery).forEach(function (query) {
	            this._radiumMediaQueryListenersByQuery[query].remove();
	          }, this);
	        }
	      }
	    }]);

	    return RadiumEnhancer;
	  })(ComposedComponent);

	  RadiumEnhancer.displayName = 'Radium(' + displayName + ')';

	  return RadiumEnhancer;
	};

	module.exports = enhanceWithRadium;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	'use strict';

	var MouseUpListener = __webpack_require__(4);
	var getState = __webpack_require__(5);
	var Prefixer = __webpack_require__(6);

	var ExecutionEnvironment = __webpack_require__(3);
	var React = __webpack_require__(8);
	var objectAssign = __webpack_require__(9);

	// babel-eslint 3.1.7 fails here for some reason, error:
	//   0:0  error  Cannot call method 'isSequenceExpression' of undefined
	//
	// declare class RadiumComponent extends ReactComponent {
	//   _lastMouseDown: number,
	//   _radiumMediaQueryListenersByQuery: Object<string, {remove: () => void}>,
	//   _radiumMouseUpListener: {remove: () => void},
	// }

	var mediaQueryListByQueryString = {};

	var _isSpecialKey = function _isSpecialKey(key) {
	  return key[0] === ':' || key[0] === '@';
	};

	var _getStyleState = function _getStyleState(component, key, value) {
	  return getState(component.state, key, value);
	};

	var _setStyleState = function _setStyleState(component, key, newState) {
	  var existing = component.state && component.state._radiumStyleState || {};
	  var state = { _radiumStyleState: objectAssign({}, existing) };
	  state._radiumStyleState[key] = state._radiumStyleState[key] || {};
	  objectAssign(state._radiumStyleState[key], newState);
	  component.setState(state);
	};

	// Merge style objects. Special casing for props starting with ';'; the values
	// should be objects, and are merged with others of the same name (instead of
	// overwriting).
	var _mergeStyles = function _mergeStyles(styles) {
	  var result = {};

	  styles.forEach(function (style) {
	    if (!style || typeof style !== 'object' || Array.isArray(style)) {
	      return;
	    }

	    Object.keys(style).forEach(function (key) {
	      if (_isSpecialKey(key) && result[key]) {
	        result[key] = _mergeStyles([result[key], style[key]]);
	      } else {
	        result[key] = style[key];
	      }
	    });
	  });

	  return result;
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
	var resolveStyles = function resolveStyles(component, // ReactComponent, flow+eslint complaining
	renderedElement, // ReactElement
	existingKeyMap) {
	  // ReactElement
	  existingKeyMap = existingKeyMap || {};

	  if (!renderedElement) {
	    return renderedElement;
	  }

	  // Recurse over children first in case we bail early. Note that children only
	  // include those rendered in `this` component. Child nodes in other components
	  // will not be here, so each component needs to use Radium.
	  var newChildren = null;
	  var oldChildren = renderedElement.props.children;
	  if (oldChildren) {
	    var childrenType = typeof oldChildren;
	    if (childrenType === 'string' || childrenType === 'number') {
	      // Don't do anything with a single primitive child
	      newChildren = oldChildren;
	    } else if (React.Children.count(oldChildren) === 1 && oldChildren.type) {
	      // If a React Element is an only child, don't wrap it in an array for
	      // React.Children.map() for React.Children.only() compatibility.
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
	  if (Array.isArray(style)) {
	    style = _mergeStyles(style);
	  }

	  // Bail early if no interactive styles.
	  if (!style || !Object.keys(style).some(_isSpecialKey)) {
	    if (style) {
	      // Still perform vendor prefixing, though.
	      newProps.style = Prefixer.getPrefixedStyle(style);
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

	  var newStyle = {};
	  Object.keys(style).forEach(function (styleKey) {
	    if (!_isSpecialKey(styleKey)) {
	      newStyle[styleKey] = style[styleKey];
	    }
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
	  var interactionStyles = Object.keys(style).filter(function (name) {
	    return name === ':active' && _getStyleState(component, key, ':active') || name === ':hover' && _getStyleState(component, key, ':hover') || name === ':focus' && _getStyleState(component, key, ':focus');
	  }).map(function (name) {
	    return style[name];
	  });

	  if (interactionStyles.length) {
	    newStyle = _mergeStyles([newStyle].concat(interactionStyles));
	  }

	  if (style[':active'] && !component._radiumMouseUpListener && ExecutionEnvironment.canUseEventListeners) {
	    component._radiumMouseUpListener = MouseUpListener.subscribe(_mouseUp.bind(null, component));
	  }

	  newProps.style = Prefixer.getPrefixedStyle(newStyle);

	  return React.cloneElement(renderedElement, newProps, newChildren);
	};

	// Exposing methods for tests is ugly, but the alternative, re-requiring the
	// module each time, is too slow
	resolveStyles.__clearStateForTests = function () {
	  mediaQueryListByQueryString = {};
	};

	module.exports = resolveStyles;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Based on code that is Copyright 2013-2015, Facebook, Inc.
	  All rights reserved.
	*/

	'use strict';

	(function () {
		'use strict';

		var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

		var ExecutionEnvironment = {

			canUseDOM: canUseDOM,

			canUseWorkers: typeof Worker !== 'undefined',

			canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),

			canUseViewport: canUseDOM && !!window.screen

		};

		if (true) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return ExecutionEnvironment;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = ExecutionEnvironment;
		} else {
			window.ExecutionEnvironment = ExecutionEnvironment;
		}
	})();

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	'use strict';

	var VALID_KEYS = [':active', ':focus', ':hover'];

	var getState = function getState(state, elementKey, value) {
	  elementKey = elementKey || 'main';

	  if (VALID_KEYS.indexOf(value) === -1) {
	    throw new Error('Radium.getState invalid value param: `' + value + '`');
	  }

	  return !!(state && state._radiumStyleState && state._radiumStyleState[elementKey] && state._radiumStyleState[elementKey][value]) || false;
	};

	module.exports = getState;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Based on https://github.com/jsstyles/css-vendor, but without having to
	 * convert between different cases all the time.
	 */

	'use strict';

	var ExecutionEnvironment = __webpack_require__(3);
	var arrayFind = __webpack_require__(7);

	var infoByCssPrefix = {
	  '-moz-': {
	    cssPrefix: '-moz-',
	    jsPrefix: 'Moz',
	    alternativeProperties: {
	      // OLD - Firefox 19-
	      flex: [{ css: '-moz-box-flex', js: 'MozBoxFlex' }],
	      order: [{ css: '-moz-box-ordinal-group', js: 'MozBoxOrdinalGroup' }]
	    },
	    alternativeValues: {
	      display: {
	        // OLD - Firefox 19-
	        flex: ['-moz-box']
	      }
	    }
	  },
	  '-ms-': {
	    cssPrefix: '-ms-',
	    jsPrefix: 'ms',
	    alternativeValues: {
	      display: {
	        // TWEENER - IE 10
	        flex: ['-ms-flexbox'],
	        order: ['-ms-flex-order']
	      }
	    }
	  },
	  '-o-': {
	    cssPrefix: '-o-',
	    jsPrefix: 'O'
	  },
	  '-webkit-': {
	    cssPrefix: '-webkit-',
	    jsPrefix: 'Webkit',
	    alternativeProperties: {
	      // OLD - iOS 6-, Safari 3.1-6
	      flex: [{ css: '-webkit-box-flex', js: 'WebkitBoxFlex' }],
	      order: [{ css: '-webkit-box-ordinal-group', js: 'WebkitBoxOrdinalGroup' }]
	    },
	    alternativeValues: {
	      display: {
	        flex: ['-webkit-box'] // OLD - iOS 6-, Safari 3.1-6
	      }
	    }
	  }
	};

	var domStyle = {};
	var prefixedPropertyCache = {};
	var prefixedValueCache = {};
	var prefixInfo = {
	  cssPrefix: '',
	  jsPrefix: ''
	};

	if (ExecutionEnvironment.canUseDOM) {
	  domStyle = document.createElement('p').style;

	  // Based on http://davidwalsh.name/vendor-prefix
	  var windowStyles = window.getComputedStyle(document.documentElement, '');
	  var prefixMatch = Array.prototype.slice.call(windowStyles).join('').match(/-(moz|webkit|ms|o)-/);
	  var cssVendorPrefix = prefixMatch && prefixMatch[0];

	  prefixInfo = infoByCssPrefix[cssVendorPrefix] || prefixInfo;
	}

	var _camelCaseRegex = /([a-z])?([A-Z])/g;
	var _camelCaseReplacer = function _camelCaseReplacer(match, p1, p2) {
	  return p1 + '-' + p2.toLowerCase();
	};
	var _camelCaseToDashCase = function _camelCaseToDashCase(s) {
	  return s.replace(_camelCaseRegex, _camelCaseReplacer);
	};

	var getPrefixedPropertyName = function getPrefixedPropertyName(property) {
	  if (prefixedPropertyCache.hasOwnProperty(property)) {
	    return prefixedPropertyCache[property];
	  }

	  var unprefixed = {
	    css: _camelCaseToDashCase(property),
	    js: property,
	    isDefaultForServer: true
	  };

	  // Try the prefixed version first. Chrome in particular has the `filter` and
	  // `webkitFilter` properties availalbe on the style object, but only the
	  // prefixed version actually works.
	  var possiblePropertyNames = [
	  // Prefixed
	  {
	    css: prefixInfo.cssPrefix + _camelCaseToDashCase(property),
	    js: prefixInfo.jsPrefix + property[0].toUpperCase() + property.slice(1)
	  }, unprefixed];

	  // Alternative property names
	  if (prefixInfo.alternativeProperties && prefixInfo.alternativeProperties[property]) {
	    possiblePropertyNames = possiblePropertyNames.concat(prefixInfo.alternativeProperties[property]);
	  }

	  var workingProperty = arrayFind(possiblePropertyNames, function (possiblePropertyName) {
	    if (possiblePropertyName.js in domStyle) {
	      return possiblePropertyName;
	    }
	  }) || false;

	  return prefixedPropertyCache[property] = workingProperty;
	};

	var _getPrefixedValue = function _getPrefixedValue(property, value, originalProperty) {
	  // don't test numbers or numbers with units (e.g. 10em)
	  if (!(Array.isArray(value) || typeof value === 'string') || !isNaN(parseInt(value, 10))) {
	    return value;
	  }

	  var cacheKey = Array.isArray(value) ? value.join(' || ') : property + value;

	  if (prefixedValueCache.hasOwnProperty(cacheKey)) {
	    return prefixedValueCache[cacheKey];
	  }

	  var possibleValues = Array.isArray(value) ? value.concat(value.map(function (v) {
	    return prefixInfo.cssPrefix + v;
	  })) : [
	  // Unprefixed
	  value,
	  // Prefixed
	  prefixInfo.cssPrefix + value];

	  // Alternative values
	  if (prefixInfo.alternativeValues && prefixInfo.alternativeValues[originalProperty] && prefixInfo.alternativeValues[originalProperty][value]) {
	    possibleValues = possibleValues.concat(prefixInfo.alternativeValues[originalProperty][value]);
	  }

	  // Test possible value in order
	  var workingValue = arrayFind(possibleValues, function (possibleValue) {
	    domStyle[property] = '';
	    domStyle[property] = possibleValue;

	    // Note that we just make sure it is not an empty string. Browsers will
	    // sometimes rewrite values, but still accept them. They will set the value
	    // to an empty string if not supported.
	    // E.g. for border, "solid 1px black" becomes "1px solid black"
	    //      but "foobar" becomes "", since it is not supported.
	    return !!domStyle[property];
	  });

	  if (workingValue) {
	    prefixedValueCache[cacheKey] = workingValue;
	  } else {
	    // Unsupported, assume unprefixed works, but warn
	    prefixedValueCache[cacheKey] = value;

	    /* eslint-disable no-console */
	    if (console && console.warn) {
	      console.warn('Unsupported CSS value "' + value + '" for property "' + property + '"');
	    }
	    /* eslint-enable no-console */
	  }

	  return prefixedValueCache[cacheKey];
	};

	// Returns a new style object with vendor prefixes added to property names
	// and values.
	var getPrefixedStyle = function getPrefixedStyle(style, mode /* 'css' or 'js' */) {
	  mode = mode || 'js';

	  if (!ExecutionEnvironment.canUseDOM) {
	    return style;
	  }

	  var newStyle = {};
	  Object.keys(style).forEach(function (property) {
	    var value = style[property];

	    var newProperty = getPrefixedPropertyName(property);
	    if (newProperty === false) {
	      // Ignore unsupported properties
	      /* eslint-disable no-console */
	      if (console && console.warn) {
	        console.warn('Unsupported CSS property "' + property + '"');
	      }
	      /* eslint-enable no-console */
	      return;
	    }

	    var newValue = _getPrefixedValue(newProperty.js, value, property);

	    newStyle[newProperty[mode]] = newValue;
	  });
	  return newStyle;
	};

	module.exports = {
	  getPrefixedPropertyName: getPrefixedPropertyName,
	  getPrefixedStyle: getPrefixedStyle,
	  cssPrefix: prefixInfo.cssPrefix,
	  jsPrefix: prefixInfo.jsPrefix
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function find(array, predicate, self) {
	  self = self || this;
	  var len = array.length;
	  var i;
	  if (len === 0) {
	    return;
	  }
	  if (typeof predicate !== 'function') {
	    throw new TypeError(predicate + ' must be a function');
	  }

	  for (i = 0; i < len; i++) {
	    if (predicate.call(self, array[i], i, array)) {
	      return array[i];
	    }
	  }

	  return;
	}

	module.exports = find;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createMarkupForStyles = __webpack_require__(11);
	var Prefixer = __webpack_require__(6);

	var React = __webpack_require__(8);

	var buildCssString = function buildCssString(selector, rules) {
	  if (!selector || !rules) {
	    return;
	  }

	  var prefixedRules = Prefixer.getPrefixedStyle(rules, 'css');
	  var serializedRules = createMarkupForStyles(prefixedRules);

	  return selector + '{' + serializedRules + '}';
	};

	var Style = React.createClass({
	  displayName: 'Style',

	  propTypes: {
	    scopeSelector: React.PropTypes.string,
	    rules: React.PropTypes.object
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      scopeSelector: ''
	    };
	  },

	  _buildStyles: function _buildStyles(styles) {
	    var _this = this;

	    return Object.keys(styles).reduce(function (accumulator, selector) {
	      var rules = styles[selector];

	      if (selector === 'mediaQueries') {
	        accumulator += _this._buildMediaQueryString(rules);
	      } else {
	        var completeSelector = (_this.props.scopeSelector ? _this.props.scopeSelector + ' ' : '') + selector;
	        accumulator += buildCssString(completeSelector, rules);
	      }

	      return accumulator;
	    }, '');
	  },

	  _buildMediaQueryString: function _buildMediaQueryString(mediaQueryObj) {
	    var _this2 = this;

	    var contextMediaQueries = this._getContextMediaQueries();
	    var mediaQueryString = '';

	    Object.keys(mediaQueryObj).forEach(function (query) {
	      var completeQuery = contextMediaQueries[query] ? contextMediaQueries[query] : query;
	      mediaQueryString += '@media ' + completeQuery + '{' + _this2._buildStyles(mediaQueryObj[query]) + '}';
	    });

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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	'use strict';

	var createMarkupForStyles = function createMarkupForStyles(style, spaces) {
	  spaces = spaces || '';
	  return Object.keys(style).map(function (property) {
	    return spaces + property + ': ' + style[property] + ';';
	  }).join('\n');
	};

	module.exports = createMarkupForStyles;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	'use strict';

	var createMarkupForStyles = __webpack_require__(11);
	var Prefixer = __webpack_require__(6);

	var ExecutionEnvironment = __webpack_require__(3);

	var isAnimationSupported = ExecutionEnvironment.canUseDOM && Prefixer.getPrefixedPropertyName('animation') !== false;

	var animationIndex = 1;
	var animationStyleSheet = null;
	var keyframesPrefixed = null;

	if (isAnimationSupported) {
	  animationStyleSheet = document.createElement('style');
	  document.head.appendChild(animationStyleSheet);

	  // Test if prefix needed for keyframes (copied from PrefixFree)
	  keyframesPrefixed = 'keyframes';
	  animationStyleSheet.textContent = '@keyframes {}';
	  if (!animationStyleSheet.sheet.cssRules.length) {
	    keyframesPrefixed = Prefixer.cssPrefix + 'keyframes';
	  }
	}

	// Simple animation helper that injects CSS into a style object containing the
	// keyframes, and returns a string with the generated animation name.
	var keyframes = function keyframes(keyframeRules) {
	  var name = 'Animation' + animationIndex;
	  animationIndex += 1;

	  if (!isAnimationSupported) {
	    return name;
	  }

	  var rule = '@' + keyframesPrefixed + ' ' + name + ' {\n' + Object.keys(keyframeRules).map(function (percentage) {
	    var props = keyframeRules[percentage];
	    var prefixedProps = Prefixer.getPrefixedStyle(props, 'css');
	    var serializedProps = createMarkupForStyles(prefixedProps, '  ');
	    return '  ' + percentage + ' {\n  ' + serializedProps + '\n  }';
	  }).join('\n') + '\n}\n';

	  // for flow
	  /* istanbul ignore next */
	  if (!animationStyleSheet) {
	    throw new Error('keyframes not initialized properly');
	  }

	  animationStyleSheet.sheet.insertRule(rule, animationStyleSheet.sheet.cssRules.length);
	  return name;
	};

	module.exports = keyframes;

/***/ }
/******/ ])
});
;