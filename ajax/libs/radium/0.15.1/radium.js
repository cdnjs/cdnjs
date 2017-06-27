(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["Radium"] = factory(require("react"));
	else
		root["Radium"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
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

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _enhancer = __webpack_require__(1);

	var _enhancer2 = _interopRequireDefault(_enhancer);

	var _plugins = __webpack_require__(10);

	var _plugins2 = _interopRequireDefault(_plugins);

	var _componentsPrintStyleSheet = __webpack_require__(31);

	var _componentsPrintStyleSheet2 = _interopRequireDefault(_componentsPrintStyleSheet);

	var _componentsStyle = __webpack_require__(32);

	var _componentsStyle2 = _interopRequireDefault(_componentsStyle);

	var _getState = __webpack_require__(5);

	var _getState2 = _interopRequireDefault(_getState);

	var _keyframes = __webpack_require__(35);

	var _keyframes2 = _interopRequireDefault(_keyframes);

	var _resolveStyles = __webpack_require__(4);

	function Radium(ComposedComponent /*: constructor*/) {
	  return _enhancer2['default'](ComposedComponent);
	}

	Radium.Plugins = _plugins2['default'];
	Radium.PrintStyleSheet = _componentsPrintStyleSheet2['default'];
	Radium.Style = _componentsStyle2['default'];
	Radium.getState = _getState2['default'];
	Radium.keyframes = _keyframes2['default'];
	Radium.__clearStateForTests = _resolveStyles.__clearStateForTests;

	exports['default'] = Radium;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/* @flow */

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = enhanceWithRadium;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _resolveStylesJs = __webpack_require__(4);

	var _resolveStylesJs2 = _interopRequireDefault(_resolveStylesJs);

	var _printStylesJs = __webpack_require__(30);

	var _printStylesJs2 = _interopRequireDefault(_printStylesJs);

	var KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES = ['arguments', 'callee', 'caller', 'length', 'name', 'prototype', 'type'];

	var copyProperties = function copyProperties(source, target) {
	  Object.getOwnPropertyNames(source).forEach(function (key) {
	    if (KEYS_TO_IGNORE_WHEN_COPYING_PROPERTIES.indexOf(key) < 0 && !target.hasOwnProperty(key)) {
	      var descriptor = Object.getOwnPropertyDescriptor(source, key);
	      Object.defineProperty(target, key, descriptor);
	    }
	  });
	};

	function enhanceWithRadium(configOrComposedComponent /*: constructor | Function | Object*/) /*: constructor*/ {
	  var config /*:: ?: Object*/ = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  if (typeof configOrComposedComponent !== 'function') {
	    var _ret = (function () {
	      var newConfig = _extends({}, config, configOrComposedComponent);
	      return {
	        v: function (configOrComponent) {
	          return enhanceWithRadium(configOrComponent, newConfig);
	        }
	      };
	    })();

	    if (typeof _ret === 'object') return _ret.v;
	  }

	  var component /*: Function*/ = configOrComposedComponent;
	  var ComposedComponent /*: constructor*/ = component;

	  // Handle stateless components
	  if (!ComposedComponent.render && !ComposedComponent.prototype.render) {
	    ComposedComponent = (function (_Component) {
	      _inherits(_class, _Component);

	      function _class() {
	        _classCallCheck(this, _class);

	        _Component.apply(this, arguments);
	      }

	      _class.prototype.render = function render() {
	        return component(this.props, this.context);
	      };

	      return _class;
	    })(_react.Component);
	    ComposedComponent.displayName = component.displayName || component.name;
	  }

	  var RadiumEnhancer = (function (_ComposedComponent) {
	    _inherits(RadiumEnhancer, _ComposedComponent);

	    function RadiumEnhancer() {
	      _classCallCheck(this, RadiumEnhancer);

	      _ComposedComponent.apply(this, arguments);

	      this.state = this.state || {};
	      this.state._radiumStyleState = {};
	      this._radiumIsMounted = true;

	      if (RadiumEnhancer.printStyleClass) {
	        this.printStyleClass = RadiumEnhancer.printStyleClass;
	      }
	    }

	    // Class inheritance uses Object.create and because of __proto__ issues
	    // with IE <10 any static properties of the superclass aren't inherited and
	    // so need to be manually populated.
	    // See http://babeljs.io/docs/advanced/caveats/#classes-10-and-below-

	    RadiumEnhancer.prototype.componentWillUnmount = function componentWillUnmount() {
	      if (_ComposedComponent.prototype.componentWillUnmount) {
	        _ComposedComponent.prototype.componentWillUnmount.call(this);
	      }

	      this._radiumIsMounted = false;

	      if (this._radiumMouseUpListener) {
	        this._radiumMouseUpListener.remove();
	      }

	      if (this._radiumMediaQueryListenersByQuery) {
	        Object.keys(this._radiumMediaQueryListenersByQuery).forEach(function (query) {
	          this._radiumMediaQueryListenersByQuery[query].remove();
	        }, this);
	      }
	    };

	    RadiumEnhancer.prototype.getChildContext = function getChildContext() {
	      var superChildContext = _ComposedComponent.prototype.getChildContext ? _ComposedComponent.prototype.getChildContext : {};

	      if (!this.props.radiumConfig) {
	        return superChildContext;
	      }

	      return _extends({}, superChildContext, {
	        radiumConfig: this.props.radiumConfig
	      });
	    };

	    RadiumEnhancer.prototype.render = function render() {
	      var renderedElement = _ComposedComponent.prototype.render.call(this);
	      var currentConfig = this.props.radiumConfig || this.context.radiumConfig || config;

	      if (config && currentConfig !== config) {
	        currentConfig = _extends({}, config, currentConfig);
	      }

	      return _resolveStylesJs2['default'](this, renderedElement, currentConfig);
	    };

	    return RadiumEnhancer;
	  })(ComposedComponent);

	  copyProperties(component, RadiumEnhancer);

	  if (process.env.NODE_ENV !== 'production') {
	    // This also fixes React Hot Loader by exposing the original components top
	    // level prototype methods on the Radium enhanced prototype as discussed in
	    // https://github.com/FormidableLabs/radium/issues/219.
	    copyProperties(ComposedComponent.prototype, RadiumEnhancer.prototype);
	  }

	  if (RadiumEnhancer.propTypes && RadiumEnhancer.propTypes.style) {
	    RadiumEnhancer.propTypes = _extends({}, RadiumEnhancer.propTypes, {
	      style: _react.PropTypes.oneOfType([_react.PropTypes.array, _react.PropTypes.object])
	    });
	  }

	  RadiumEnhancer.displayName = component.displayName || component.name || 'Component';

	  RadiumEnhancer.printStyleClass = _printStylesJs2['default'].addPrintStyles(RadiumEnhancer);

	  RadiumEnhancer.contextTypes = _extends({}, RadiumEnhancer.contextTypes, {
	    radiumConfig: _react2['default'].PropTypes.object
	  });

	  RadiumEnhancer.childContextTypes = _extends({}, RadiumEnhancer.childContextTypes, {
	    radiumConfig: _react2['default'].PropTypes.object
	  });

	  return RadiumEnhancer;
	}

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

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
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
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
	    if (queue.length === 1 && !draining) {
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
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _getState2 = __webpack_require__(5);

	var _getState3 = _interopRequireDefault(_getState2);

	var _getStateKey = __webpack_require__(6);

	var _getStateKey2 = _interopRequireDefault(_getStateKey);

	var _mergeStyles = __webpack_require__(7);

	var _mergeStyles2 = _interopRequireDefault(_mergeStyles);

	var _plugins = __webpack_require__(10);

	var _plugins2 = _interopRequireDefault(_plugins);

	var _exenv = __webpack_require__(29);

	var _exenv2 = _interopRequireDefault(_exenv);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	/*:: import type {Config} from './config';*/

	var DEFAULT_CONFIG = {
	  plugins: [_plugins2['default'].mergeStyleArray, _plugins2['default'].checkProps, _plugins2['default'].resolveMediaQueries, _plugins2['default'].resolveInteractionStyles, _plugins2['default'].prefix, _plugins2['default'].checkProps]
	};

	// Gross
	var globalState = {};

	// Declare early for recursive helpers.
	var resolveStyles = ((null /*: any*/) /*: (
	                                        component: any, // ReactComponent, flow+eslint complaining
	                                        renderedElement: any,
	                                        config: Config,
	                                        existingKeyMap?: {[key: string]: bool}
	                                      ) => any*/);

	var _resolveChildren = function _resolveChildren(_ref) {
	  var children = _ref.children;
	  var component = _ref.component;
	  var config = _ref.config;
	  var existingKeyMap = _ref.existingKeyMap;

	  if (!children) {
	    return children;
	  }

	  var childrenType = typeof children;

	  if (childrenType === 'string' || childrenType === 'number') {
	    // Don't do anything with a single primitive child
	    return children;
	  }

	  if (childrenType === 'function') {
	    // Wrap the function, resolving styles on the result
	    return function () {
	      var result = children.apply(this, arguments);
	      if (_react2['default'].isValidElement(result)) {
	        return resolveStyles(component, result, config, existingKeyMap);
	      }
	      return result;
	    };
	  }

	  if (_react2['default'].Children.count(children) === 1 && children.type) {
	    // If a React Element is an only child, don't wrap it in an array for
	    // React.Children.map() for React.Children.only() compatibility.
	    var onlyChild = _react2['default'].Children.only(children);
	    return resolveStyles(component, onlyChild, config, existingKeyMap);
	  }

	  return _react2['default'].Children.map(children, function (child) {
	    if (_react2['default'].isValidElement(child)) {
	      return resolveStyles(component, child, config, existingKeyMap);
	    }

	    return child;
	  });
	};

	// Recurse over props, just like children
	var _resolveProps = function _resolveProps(_ref2) {
	  var component = _ref2.component;
	  var config = _ref2.config;
	  var existingKeyMap = _ref2.existingKeyMap;
	  var props = _ref2.props;

	  var newProps = props;

	  Object.keys(props).forEach(function (prop) {
	    // We already recurse over children above
	    if (prop === 'children') {
	      return;
	    }

	    var propValue = props[prop];
	    if (_react2['default'].isValidElement(propValue)) {
	      newProps = _extends({}, newProps);
	      newProps[prop] = resolveStyles(component, propValue, config, existingKeyMap);
	    }
	  });

	  return newProps;
	};

	var _buildGetKey = function _buildGetKey(renderedElement, existingKeyMap) {
	  // We need a unique key to correlate state changes due to user interaction
	  // with the rendered element, so we know to apply the proper interactive
	  // styles.
	  var originalKey = typeof renderedElement.ref === 'string' ? renderedElement.ref : renderedElement.key;
	  var key = _getStateKey2['default'](originalKey);

	  var alreadyGotKey = false;
	  var getKey = function getKey() {
	    if (alreadyGotKey) {
	      return key;
	    }

	    alreadyGotKey = true;

	    if (existingKeyMap[key]) {
	      throw new Error('Radium requires each element with interactive styles to have a unique ' + 'key, set using either the ref or key prop. ' + (originalKey ? 'Key "' + originalKey + '" is a duplicate.' : 'Multiple elements have no key specified.'));
	    }

	    existingKeyMap[key] = true;

	    return key;
	  };

	  return getKey;
	};

	var _setStyleState = function _setStyleState(component, key, stateKey, value) {
	  if (!component._radiumIsMounted) {
	    return;
	  }

	  var existing = component._lastRadiumState || component.state && component.state._radiumStyleState || {};

	  var state = { _radiumStyleState: _extends({}, existing) };
	  state._radiumStyleState[key] = _extends({}, state._radiumStyleState[key]);
	  state._radiumStyleState[key][stateKey] = value;

	  component._lastRadiumState = state._radiumStyleState;
	  component.setState(state);
	};

	var _runPlugins = function _runPlugins(_ref3) {
	  var component = _ref3.component;
	  var config = _ref3.config;
	  var existingKeyMap = _ref3.existingKeyMap;
	  var props = _ref3.props;
	  var renderedElement = _ref3.renderedElement;

	  // Don't run plugins if renderedElement is not a simple ReactDOMElement or has
	  // no style.
	  if (!_react2['default'].isValidElement(renderedElement) || typeof renderedElement.type !== 'string' || !props.style) {
	    return props;
	  }

	  var newProps = props;

	  var plugins = config.plugins || DEFAULT_CONFIG.plugins;

	  var getKey = _buildGetKey(renderedElement, existingKeyMap);

	  var newStyle = props.style;
	  plugins.forEach(function (plugin) {
	    var result = plugin({
	      ExecutionEnvironment: _exenv2['default'],
	      componentName: component.constructor.displayName || component.constructor.name,
	      config: config,
	      getComponentField: function getComponentField(key) {
	        return component[key];
	      },
	      getGlobalState: function getGlobalState(key) {
	        return globalState[key];
	      },
	      getState: function getState(stateKey, elementKey) {
	        return _getState3['default'](component.state, elementKey || getKey(), stateKey);
	      },
	      mergeStyles: _mergeStyles2['default'],
	      props: newProps,
	      setState: function setState(stateKey, value, elementKey) {
	        return _setStyleState(component, elementKey || getKey(), stateKey, value);
	      },
	      style: newStyle
	    }) || {};

	    newStyle = result.style || newStyle;

	    newProps = result.props && Object.keys(result.props).length ? _extends({}, newProps, result.props) : newProps;

	    var newComponentFields = result.componentFields || {};
	    Object.keys(newComponentFields).forEach(function (fieldName) {
	      component[fieldName] = newComponentFields[fieldName];
	    });

	    var newGlobalState = result.globalState || {};
	    Object.keys(newGlobalState).forEach(function (key) {
	      globalState[key] = newGlobalState[key];
	    });
	  });

	  if (newStyle !== props.style) {
	    newProps = _extends({}, newProps, { style: newStyle });
	  }

	  return newProps;
	};

	// Wrapper around React.cloneElement. To avoid processing the same element
	// twice, whenever we clone an element add a special prop to make sure we don't
	// process this element again.
	var _cloneElement = function _cloneElement(renderedElement, newProps, newChildren) {
	  // Only add flag if this is a normal DOM element
	  if (typeof renderedElement.type === 'string') {
	    newProps = _extends({}, newProps, { _radiumDidResolveStyles: true });
	  }

	  return _react2['default'].cloneElement(renderedElement, newProps, newChildren);
	};

	//
	// The nucleus of Radium. resolveStyles is called on the rendered elements
	// before they are returned in render. It iterates over the elements and
	// children, rewriting props to add event handlers required to capture user
	// interactions (e.g. mouse over). It also replaces the style prop because it
	// adds in the various interaction styles (e.g. :hover).
	//
	resolveStyles = function (component /*: any*/, // ReactComponent, flow+eslint complaining
	renderedElement /*: any*/, // ReactElement
	config /*: Config*/, existingKeyMap /*:: ?: {[key: string]: boolean}*/) /*: any*/ {
	  if (config === undefined) config = DEFAULT_CONFIG;
	  // ReactElement
	  existingKeyMap = existingKeyMap || {};

	  if (!renderedElement ||
	  // Bail if we've already processed this element. This ensures that only the
	  // owner of an element processes that element, since the owner's render
	  // function will be called first (which will always be the case, since you
	  // can't know what else to render until you render the parent component).
	  renderedElement.props && renderedElement.props._radiumDidResolveStyles) {
	    return renderedElement;
	  }

	  var newChildren = _resolveChildren({
	    children: renderedElement.props.children,
	    component: component,
	    config: config,
	    existingKeyMap: existingKeyMap
	  });

	  var newProps = _resolveProps({
	    component: component,
	    config: config,
	    existingKeyMap: existingKeyMap,
	    props: renderedElement.props
	  });

	  newProps = _runPlugins({
	    component: component,
	    config: config,
	    existingKeyMap: existingKeyMap,
	    props: newProps,
	    renderedElement: renderedElement
	  });

	  // If nothing changed, don't bother cloning the element. Might be a bit
	  // wasteful, as we add the sentinal to stop double-processing when we clone.
	  // Assume benign double-processing is better than unneeded cloning.
	  if (newChildren === renderedElement.props.children && newProps === renderedElement.props) {
	    return renderedElement;
	  }

	  return _cloneElement(renderedElement, newProps !== renderedElement.props ? newProps : {}, newChildren);
	};

	// Only for use by tests
	resolveStyles.__clearStateForTests = function () {
	  globalState = {};
	};

	exports['default'] = resolveStyles;
	module.exports = exports['default'];
	// ReactComponent, flow+eslint complaining

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _getStateKey = __webpack_require__(6);

	var _getStateKey2 = _interopRequireDefault(_getStateKey);

	var getState = function getState(state /*: {_radiumStyleState: {[key: string]: {[value: string]: boolean}}}*/, elementKey /*: string*/, value /*: string*/) /*: any*/ {
	  var key = _getStateKey2['default'](elementKey);

	  return !!state && !!state._radiumStyleState && !!state._radiumStyleState[key] && state._radiumStyleState[key][value];
	};

	exports['default'] = getState;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	/* @flow */

	'use strict';

	exports.__esModule = true;
	var getStateKey = function getStateKey(elementKey /*: ?string*/) /*: string*/ {
	  return elementKey === null || elementKey === undefined ? 'main' : elementKey.toString();
	};

	exports['default'] = getStateKey;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _isPlainObject = __webpack_require__(8);

	var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

	var shouldMerge = function shouldMerge(value) {
	  // Don't merge objects overriding toString, since they should be converted
	  // to string values.
	  return _isPlainObject2['default'](value) && value.toString === Object.prototype.toString;
	};

	// Merge style objects. Deep merge plain object values.
	var mergeStyles = function mergeStyles(styles) {
	  var result = {};

	  styles.forEach(function (style) {
	    if (!style || typeof style !== 'object') {
	      return;
	    }

	    if (Array.isArray(style)) {
	      style = mergeStyles(style);
	    }

	    Object.keys(style).forEach(function (key) {
	      if (shouldMerge(style[key]) && shouldMerge(result[key])) {
	        result[key] = mergeStyles([result[key], style[key]]);
	      } else {
	        result[key] = style[key];
	      }
	    });
	  });

	  return result;
	};

	exports['default'] = mergeStyles;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var isObject = __webpack_require__(9);

	function isObjectObject(o) {
	  return isObject(o) === true && Object.prototype.toString.call(o) === '[object Object]';
	}

	module.exports = function isPlainObject(o) {
	  var ctor, prot;

	  if (isObjectObject(o) === false) return false;

	  // If has modified constructor
	  ctor = o.constructor;
	  if (typeof ctor !== 'function') return false;

	  // If has modified prototype
	  prot = ctor.prototype;
	  if (isObjectObject(prot) === false) return false;

	  // If constructor does not have an Object-specific method
	  if (prot.hasOwnProperty('isPrototypeOf') === false) {
	    return false;
	  }

	  // Most likely a plain Object
	  return true;
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	/*!
	 * isobject <https://github.com/jonschlinkert/isobject>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	module.exports = function isObject(val) {
	  return val != null && typeof val === 'object' && !Array.isArray(val);
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/** @flow */
	/* eslint-disable block-scoped-const */

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _checkPropsPlugin = __webpack_require__(11);

	var _checkPropsPlugin2 = _interopRequireDefault(_checkPropsPlugin);

	var _mergeStyleArrayPlugin = __webpack_require__(12);

	var _mergeStyleArrayPlugin2 = _interopRequireDefault(_mergeStyleArrayPlugin);

	var _prefixPlugin = __webpack_require__(13);

	var _prefixPlugin2 = _interopRequireDefault(_prefixPlugin);

	var _resolveInteractionStylesPlugin = __webpack_require__(26);

	var _resolveInteractionStylesPlugin2 = _interopRequireDefault(_resolveInteractionStylesPlugin);

	var _resolveMediaQueriesPlugin = __webpack_require__(28);

	var _resolveMediaQueriesPlugin2 = _interopRequireDefault(_resolveMediaQueriesPlugin);

	/*:: import type {Config} from '../config';*/
	/*:: export type PluginConfig = {
	  // May not be readable if code has been minified
	  componentName: string,

	  // The Radium configuration
	  config: Config,

	  // Retrieve the value of a field on the component
	  getComponentField: (key: string) => any,

	  // Retrieve the value of a field global to the Radium module
	  // Used so that tests can easily clear global state.
	  getGlobalState: (key: string) => any,

	  // Retrieve the value of some state specific to the rendered element.
	  // Requires the element to have a unique key or ref or for an element key
	  // to be passed in.
	  getState: (stateKey: string, elementKey?: string) => any,

	  // Access to the mergeStyles utility
	  mergeStyles: (styles: Array<Object>) => Object,

	  // The props of the rendered element. This can be changed by each plugin,
	  // and successive plugins will see the result of previous plugins.
	  props: Object,

	  // Calls setState on the component with the given key and value.
	  // By default this is specific to the rendered element, but you can override
	  // by passing in the `elementKey` parameter.
	  setState: (stateKey: string, value: any, elementKey?: string) => void,

	  // The style prop of the rendered element. This can be changed by each plugin,
	  // and successive plugins will see the result of previous plugins. Kept
	  // separate from `props` for ease of use.
	  style: Object,

	  // uses the exenv npm module
	  ExecutionEnvironment: {
	    canUseEventListeners: bool,
	    canUseDOM: bool,
	  }
	};*/
	/*:: export type PluginResult = ?{
	  // Merged into the component directly. Useful for storing things for which you
	  // don't need to re-render, event subscriptions, for instance.
	  componentFields?: Object,

	  // Merged into a Radium controlled global state object. Use this instead of
	  // module level state for ease of clearing state between tests.
	  globalState?: Object,

	  // Merged into the rendered element's props.
	  props?: Object,

	  // Replaces (not merged into) the rendered element's style property.
	  style?: Object,
	};*/exports['default'] = {
	  checkProps: _checkPropsPlugin2['default'],
	  mergeStyleArray: _mergeStyleArrayPlugin2['default'],
	  prefix: _prefixPlugin2['default'],
	  resolveInteractionStyles: _resolveInteractionStylesPlugin2['default'],
	  resolveMediaQueries: _resolveMediaQueriesPlugin2['default']
	};
	module.exports = exports['default'];

	// May not be readable if code has been minified

	// The Radium configuration

	// Retrieve the value of a field on the component

	// Retrieve the value of a field global to the Radium module
	// Used so that tests can easily clear global state.

	// Retrieve the value of some state specific to the rendered element.
	// Requires the element to have a unique key or ref or for an element key
	// to be passed in.

	// Access to the mergeStyles utility

	// The props of the rendered element. This can be changed by each plugin,
	// and successive plugins will see the result of previous plugins.

	// Calls setState on the component with the given key and value.
	// By default this is specific to the rendered element, but you can override
	// by passing in the `elementKey` parameter.

	// The style prop of the rendered element. This can be changed by each plugin,
	// and successive plugins will see the result of previous plugins. Kept
	// separate from `props` for ease of use.

	// uses the exenv npm module

	// Merged into the component directly. Useful for storing things for which you
	// don't need to re-render, event subscriptions, for instance.

	// Merged into a Radium controlled global state object. Use this instead of
	// module level state for ease of clearing state between tests.

	// Merged into the rendered element's props.

	// Replaces (not merged into) the rendered element's style property.

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/* @flow */

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	/*:: import type {PluginConfig, PluginResult} from '.';*/

	var checkProps = (function () {} /*: any*/);

	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    // Warn if you use longhand and shorthand properties in the same style
	    // object.
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties

	    var shorthandPropertyExpansions = {
	      'background': ['backgroundAttachment', 'backgroundBlendMode', 'backgroundClip', 'backgroundColor', 'backgroundImage', 'backgroundOrigin', 'backgroundPosition', 'backgroundPositionX', 'backgroundPositionY', 'backgroundRepeat', 'backgroundRepeatX', 'backgroundRepeatY', 'backgroundSize'],
	      'border': ['borderBottom', 'borderBottomColor', 'borderBottomStyle', 'borderBottomWidth', 'borderColor', 'borderLeft', 'borderLeftColor', 'borderLeftStyle', 'borderLeftWidth', 'borderRight', 'borderRightColor', 'borderRightStyle', 'borderRightWidth', 'borderStyle', 'borderTop', 'borderTopColor', 'borderTopStyle', 'borderTopWidth', 'borderWidth'],
	      'borderImage': ['borderImageOutset', 'borderImageRepeat', 'borderImageSlice', 'borderImageSource', 'borderImageWidth'],
	      'borderRadius': ['borderBottomLeftRadius', 'borderBottomRightRadius', 'borderTopLeftRadius', 'borderTopRightRadius'],
	      'font': ['fontFamily', 'fontKerning', 'fontSize', 'fontStretch', 'fontStyle', 'fontVariant', 'fontVariantLigatures', 'fontWeight', 'lineHeight'],
	      'listStyle': ['listStyleImage', 'listStylePosition', 'listStyleType'],
	      'margin': ['marginBottom', 'marginLeft', 'marginRight', 'marginTop'],
	      'padding': ['paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop'],
	      'transition': ['transitionDelay', 'transitionDuration', 'transitionProperty', 'transitionTimingFunction']
	    };

	    checkProps = function (config /*: PluginConfig*/) /*: PluginResult*/ {
	      var componentName = config.componentName;
	      var style = config.style;

	      if (typeof style !== 'object' || !style) {
	        return;
	      }

	      var styleKeys = Object.keys(style);
	      styleKeys.forEach(function (styleKey) {
	        if (Array.isArray(shorthandPropertyExpansions[styleKey]) && shorthandPropertyExpansions[styleKey].some(function (sp) {
	          return styleKeys.indexOf(sp) !== -1;
	        })) {
	          if (process.env.NODE_ENV !== 'production') {
	            /* eslint-disable no-console */
	            console.warn('Radium: property "' + styleKey + '" in style object', style, ': do not mix longhand and ' + 'shorthand properties in the same style object. Check the render ' + 'method of ' + componentName + '.', 'See https://github.com/FormidableLabs/radium/issues/95 for more ' + 'information.');
	            /* eslint-enable no-console */
	          }
	        }
	      });

	      styleKeys.forEach(function (k) {
	        return checkProps(_extends({}, config, { style: style[k] }));
	      });
	      return;
	    };
	  })();
	}

	exports['default'] = checkProps;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 12 */
/***/ function(module, exports) {

	/* @flow */

	'use strict';

	exports.__esModule = true;

	// Convenient syntax for multiple styles: `style={[style1, style2, etc]}`
	// Ignores non-objects, so you can do `this.state.isCool && styles.cool`.
	/*:: import type {PluginConfig, PluginResult} from '.';*/var mergeStyleArrayPlugin = function mergeStyleArrayPlugin(_ref /*: PluginConfig*/) /*: PluginResult*/ {
	  var style = _ref.style;
	  var mergeStyles = _ref.mergeStyles;

	  var newStyle = Array.isArray(style) ? mergeStyles(style) : style;
	  return { style: newStyle };
	};

	exports['default'] = mergeStyleArrayPlugin;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	'use strict';

	exports.__esModule = true;
	exports['default'] = prefixPlugin;

	var _prefixer = __webpack_require__(14);

	/*:: import type {PluginConfig, PluginResult} from '.';*/
	function prefixPlugin(_ref /*: PluginConfig*/) /*: PluginResult*/ {
	  var componentName = _ref.componentName;
	  var config = _ref.config;
	  var style = _ref.style;

	  var newStyle = _prefixer.getPrefixedStyle(style, componentName, config.userAgent);
	  return { style: newStyle };
	}

	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * Based on https://github.com/jsstyles/css-vendor, but without having to
	 * convert between different cases all the time.
	 *
	 * @flow
	 */

	'use strict';

	exports.__esModule = true;
	exports.getPrefixedStyle = getPrefixedStyle;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _inlineStylePrefixer = __webpack_require__(15);

	var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

	function transformValues(style) {
	  return Object.keys(style).reduce(function (newStyle, key) {
	    var value = style[key];
	    if (Array.isArray(value)) {
	      value = value.join(';' + key + ':');
	    }
	    newStyle[key] = value;
	    return newStyle;
	  }, {});
	}

	var lastUserAgent = undefined;
	var prefixer = undefined;

	// Returns a new style object with vendor prefixes added to property names
	// and values.

	function getPrefixedStyle(style /*: Object*/, componentName /*: ?string*/, userAgent /*:: ?: ?string*/) /*: Object*/ {
	  var actualUserAgent = userAgent || global && global.navigator && global.navigator.userAgent;

	  if (!actualUserAgent) {
	    throw new Error('Radium: userAgent must be supplied for server-side rendering. See ' + 'https://github.com/FormidableLabs/radium/tree/master/docs/api#radium ' + 'for more information.');
	  }

	  if (!prefixer || actualUserAgent !== lastUserAgent) {
	    prefixer = new _inlineStylePrefixer2['default'](actualUserAgent);
	    lastUserAgent = actualUserAgent;
	  }

	  var prefixedStyle = prefixer.prefix(style);
	  var prefixedStyleWithFallbacks = transformValues(prefixedStyle);
	  return prefixedStyleWithFallbacks;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
	    }
	  }return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
	  };
	})();

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError('Cannot call a class as a function');
	  }
	}

	var _getBrowserInformation = __webpack_require__(16);

	var _getBrowserInformation2 = _interopRequireDefault(_getBrowserInformation);

	var _caniuseData = __webpack_require__(18);

	var _caniuseData2 = _interopRequireDefault(_caniuseData);

	var _Plugins = __webpack_require__(19);

	var _Plugins2 = _interopRequireDefault(_Plugins);

	var defaultUserAgent = typeof navigator !== 'undefined' ? navigator.userAgent : undefined;

	var Prefixer = (function () {
	  /**
	   * Instantiante a new prefixer.
	   * @param {string} userAgent - userAgent to gather prefix information according to caniuse.com
	   */

	  function Prefixer() {
	    var _this = this;

	    var userAgent = arguments.length <= 0 || arguments[0] === undefined ? defaultUserAgent : arguments[0];

	    _classCallCheck(this, Prefixer);

	    this._userAgent = userAgent;
	    this._browserInfo = (0, _getBrowserInformation2['default'])(userAgent);

	    this.cssPrefix = this._browserInfo.prefix.CSS;
	    this.jsPrefix = this._browserInfo.prefix.inline;

	    var data = _caniuseData2['default'][this._browserInfo.browser];
	    if (data) {
	      this._requiresPrefix = Object.keys(data).filter(function (key) {
	        return data[key] >= _this._browserInfo.version;
	      }).reduce(function (result, name) {
	        result[name] = true;
	        return result;
	      }, {});
	      this._hasPropsRequiringPrefix = Object.keys(this._requiresPrefix).length > 0;
	    } else {
	      this._hasPropsRequiringPrefix = false;

	      // TODO warn only in dev mode
	      console.warn('Your userAgent seems to be not supported by inline-style-prefixer. Feel free to open an issue.');
	    }
	  }

	  // helper to capitalize strings

	  /**
	   * Returns a prefixed version of the style object
	   * @param {Object} styles - Style object that gets prefixed properties added
	   * @returns {Object} - Style object with prefixed properties and valeus
	   */

	  _createClass(Prefixer, [{
	    key: 'prefix',
	    value: function prefix(styles) {
	      var _this2 = this;

	      // only add prefixes if needed
	      if (!this._hasPropsRequiringPrefix) {
	        return styles;
	      }

	      styles = assign({}, styles);

	      Object.keys(styles).forEach(function (property) {
	        var value = styles[property];
	        if (value instanceof Object) {
	          // recursively loop through nested style objects
	          styles[property] = _this2.prefix(value);
	        } else {
	          // add prefixes if needed
	          if (_this2._requiresPrefix[property]) {
	            styles[_this2.jsPrefix + caplitalizeString(property)] = value;
	            delete styles[property];
	          }

	          // resolve plugins
	          _Plugins2['default'].forEach(function (plugin) {
	            assign(styles, plugin(property, value, _this2._browserInfo, styles));
	          });
	        }
	      });

	      return styles;
	    }
	  }]);

	  return Prefixer;
	})();

	exports['default'] = Prefixer;
	var caplitalizeString = function caplitalizeString(str) {
	  return str.charAt(0).toUpperCase() + str.slice(1);
	};

	// leight polyfill for Object.assign
	var assign = function assign(base, extend) {
	  extend && Object.keys(extend).forEach(function (key) {
	    return base[key] = extend[key];
	  });
	  return extend;
	};
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _bowser = __webpack_require__(17);

	var _bowser2 = _interopRequireDefault(_bowser);

	var vendorPrefixes = {
	  'Webkit': ['chrome', 'safari', 'ios', 'android', 'phantom', 'opera', 'webos', 'blackberry', 'bada', 'tizen'],
	  'Moz': ['firefox', 'seamonkey', 'sailfish'],
	  'ms': ['msie', 'msedge']
	};

	var browsers = {
	  'chrome': [['chrome'], ['phantom'], ['webos'], ['blackberry'], ['bada'], ['tizenn']],
	  'safari': [['safari']],
	  'firefox': [['firefox'], ['seamonkey'], ['sailfish']],
	  'ie': [['msie'], ['msedge']],
	  'opera': [['opera']],
	  'ios_saf': [['ios', 'mobile'], ['ios', 'tablet']],
	  'ie_mob': [['windowsphone', 'mobile', 'msie'], ['windowsphone', 'tablet', 'msie'], ['windowsphone', 'mobile', 'msedge'], ['windowsphone', 'tablet', 'msedge']],
	  'op_mini': [['opera', 'mobile'], ['opera', 'tablet']],
	  'and_chr': [['android', 'chrome', 'mobile'], ['android', 'chrome', 'tablet']],
	  'and_uc': [['android', 'mobile'], ['android', 'mobile']],
	  'android': [['android', 'mobile'], ['android', 'mobile']]
	};

	/**
	 * Uses bowser to get default browser information such as version and name
	 * Evaluates bowser info and adds vendorPrefix information
	 * @param {string} userAgent - userAgent that gets evaluated
	 */

	exports['default'] = function (userAgent) {
	  var info = _bowser2['default']._detect(userAgent);

	  Object.keys(vendorPrefixes).forEach(function (prefix) {
	    vendorPrefixes[prefix].forEach(function (browser) {
	      if (info[browser]) {
	        info.prefix = {
	          inline: prefix,
	          CSS: '-' + prefix.toLowerCase() + '-'
	        };
	      }
	    });
	  });

	  var name = '';
	  Object.keys(browsers).forEach(function (browser) {
	    browsers[browser].forEach(function (condition) {
	      var match = 0;
	      condition.forEach(function (single) {
	        if (info[single]) {
	          match += 1;
	        }
	      });
	      if (condition.length === match) {
	        name = browser;
	      }
	    });
	  });

	  info.browser = name;
	  return info;
	};

	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  * Bowser - a browser detector
	  * https://github.com/ded/bowser
	  * MIT License | (c) Dustin Diaz 2015
	  */

	'use strict';

	!(function (name, definition) {
	  if (typeof module != 'undefined' && module.exports) module.exports = definition();else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else this[name] = definition();
	})('bowser', function () {
	  /**
	    * See useragents.js for examples of navigator.userAgent
	    */

	  var t = true;

	  function detect(ua) {

	    function getFirstMatch(regex) {
	      var match = ua.match(regex);
	      return match && match.length > 1 && match[1] || '';
	    }

	    function getSecondMatch(regex) {
	      var match = ua.match(regex);
	      return match && match.length > 1 && match[2] || '';
	    }

	    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase(),
	        likeAndroid = /like android/i.test(ua),
	        android = !likeAndroid && /android/i.test(ua),
	        chromeBook = /CrOS/.test(ua),
	        edgeVersion = getFirstMatch(/edge\/(\d+(\.\d+)?)/i),
	        versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i),
	        tablet = /tablet/i.test(ua),
	        mobile = !tablet && /[^-]mobi/i.test(ua),
	        result;

	    if (/opera|opr/i.test(ua)) {
	      result = {
	        name: 'Opera',
	        opera: t,
	        version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
	      };
	    } else if (/yabrowser/i.test(ua)) {
	      result = {
	        name: 'Yandex Browser',
	        yandexbrowser: t,
	        version: versionIdentifier || getFirstMatch(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
	      };
	    } else if (/windows phone/i.test(ua)) {
	      result = {
	        name: 'Windows Phone',
	        windowsphone: t
	      };
	      if (edgeVersion) {
	        result.msedge = t;
	        result.version = edgeVersion;
	      } else {
	        result.msie = t;
	        result.version = getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i);
	      }
	    } else if (/msie|trident/i.test(ua)) {
	      result = {
	        name: 'Internet Explorer',
	        msie: t,
	        version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
	      };
	    } else if (chromeBook) {
	      result = {
	        name: 'Chrome',
	        chromeBook: t,
	        chrome: t,
	        version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
	      };
	    } else if (/chrome.+? edge/i.test(ua)) {
	      result = {
	        name: 'Microsoft Edge',
	        msedge: t,
	        version: edgeVersion
	      };
	    } else if (/chrome|crios|crmo/i.test(ua)) {
	      result = {
	        name: 'Chrome',
	        chrome: t,
	        version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
	      };
	    } else if (iosdevice) {
	      result = {
	        name: iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
	      };
	      // WTF: version is not part of user agent in web apps
	      if (versionIdentifier) {
	        result.version = versionIdentifier;
	      }
	    } else if (/sailfish/i.test(ua)) {
	      result = {
	        name: 'Sailfish',
	        sailfish: t,
	        version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
	      };
	    } else if (/seamonkey\//i.test(ua)) {
	      result = {
	        name: 'SeaMonkey',
	        seamonkey: t,
	        version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
	      };
	    } else if (/firefox|iceweasel/i.test(ua)) {
	      result = {
	        name: 'Firefox',
	        firefox: t,
	        version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
	      };
	      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
	        result.firefoxos = t;
	      }
	    } else if (/silk/i.test(ua)) {
	      result = {
	        name: 'Amazon Silk',
	        silk: t,
	        version: getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
	      };
	    } else if (android) {
	      result = {
	        name: 'Android',
	        version: versionIdentifier
	      };
	    } else if (/phantom/i.test(ua)) {
	      result = {
	        name: 'PhantomJS',
	        phantom: t,
	        version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
	      };
	    } else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
	      result = {
	        name: 'BlackBerry',
	        blackberry: t,
	        version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
	      };
	    } else if (/(web|hpw)os/i.test(ua)) {
	      result = {
	        name: 'WebOS',
	        webos: t,
	        version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
	      };
	      /touchpad\//i.test(ua) && (result.touchpad = t);
	    } else if (/bada/i.test(ua)) {
	      result = {
	        name: 'Bada',
	        bada: t,
	        version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
	      };
	    } else if (/tizen/i.test(ua)) {
	      result = {
	        name: 'Tizen',
	        tizen: t,
	        version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
	      };
	    } else if (/safari/i.test(ua)) {
	      result = {
	        name: 'Safari',
	        safari: t,
	        version: versionIdentifier
	      };
	    } else {
	      result = {
	        name: getFirstMatch(/^(.*)\/(.*) /),
	        version: getSecondMatch(/^(.*)\/(.*) /)
	      };
	    }

	    // set webkit or gecko flag for browsers based on these engines
	    if (!result.msedge && /(apple)?webkit/i.test(ua)) {
	      result.name = result.name || "Webkit";
	      result.webkit = t;
	      if (!result.version && versionIdentifier) {
	        result.version = versionIdentifier;
	      }
	    } else if (!result.opera && /gecko\//i.test(ua)) {
	      result.name = result.name || "Gecko";
	      result.gecko = t;
	      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i);
	    }

	    // set OS flags for platforms that have multiple browsers
	    if (!result.msedge && (android || result.silk)) {
	      result.android = t;
	    } else if (iosdevice) {
	      result[iosdevice] = t;
	      result.ios = t;
	    }

	    // OS version extraction
	    var osVersion = '';
	    if (result.windowsphone) {
	      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
	    } else if (iosdevice) {
	      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
	      osVersion = osVersion.replace(/[_\s]/g, '.');
	    } else if (android) {
	      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
	    } else if (result.webos) {
	      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
	    } else if (result.blackberry) {
	      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
	    } else if (result.bada) {
	      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
	    } else if (result.tizen) {
	      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
	    }
	    if (osVersion) {
	      result.osversion = osVersion;
	    }

	    // device type extraction
	    var osMajorVersion = osVersion.split('.')[0];
	    if (tablet || iosdevice == 'ipad' || android && (osMajorVersion == 3 || osMajorVersion == 4 && !mobile) || result.silk) {
	      result.tablet = t;
	    } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
	      result.mobile = t;
	    }

	    // Graded Browser Support
	    // http://developer.yahoo.com/yui/articles/gbs
	    if (result.msedge || result.msie && result.version >= 10 || result.yandexbrowser && result.version >= 15 || result.chrome && result.version >= 20 || result.firefox && result.version >= 20.0 || result.safari && result.version >= 6 || result.opera && result.version >= 10.0 || result.ios && result.osversion && result.osversion.split(".")[0] >= 6 || result.blackberry && result.version >= 10.1) {
	      result.a = t;
	    } else if (result.msie && result.version < 10 || result.chrome && result.version < 20 || result.firefox && result.version < 20.0 || result.safari && result.version < 6 || result.opera && result.version < 10.0 || result.ios && result.osversion && result.osversion.split(".")[0] < 6) {
	      result.c = t;
	    } else result.x = t;

	    return result;
	  }

	  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '');

	  bowser.test = function (browserList) {
	    for (var i = 0; i < browserList.length; ++i) {
	      var browserItem = browserList[i];
	      if (typeof browserItem === 'string') {
	        if (browserItem in bowser) {
	          return true;
	        }
	      }
	    }
	    return false;
	  };

	  /*
	   * Set our detect method to the main bowser object so we can
	   * reuse it to test other user agents.
	   * This is needed to implement future tests.
	   */
	  bowser._detect = detect;

	  return bowser;
	});

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";

	var caniuseData = { "chrome": { "backfaceVisibility": 35, "perspective": 35, "perspectiveOrigin": 35, "transform": 35, "transformOrigin": 35, "transformStyle": 35, "transformOriginX": 35, "transformOriginY": 35, "animation": 42, "animationDelay": 42, "animationDirection": 42, "animationFillMode": 42, "animationDuration": 42, "anmationIterationCount": 42, "animationName": 42, "animationPlayState": 42, "animationTimingFunction": 42, "appearance": 48, "userSelect": 48, "fontKerning": 32, "textEmphasisPosition": 48, "textEmphasis": 48, "textEmphasisStyle": 48, "textEmphasisColor": 48, "boxDecorationBreak": 48, "clipPath": 48, "maskImage": 48, "maskMode": 48, "maskRepeat": 48, "maskPosition": 48, "maskClip": 48, "maskOrigin": 48, "maskSize": 48, "maskComposite": 48, "mask": 48, "maskBorderSource": 48, "maskBorderMode": 48, "maskBorderSlice": 48, "maskBorderWidth": 48, "maskBorderOutset": 48, "maskBorderRepeat": 48, "maskBorder": 48, "maskType": 48, "textDecorationStyle": 48, "textDecorationSkip": 48, "textDecorationLine": 48, "textDecorationColor": 48, "filter": 48, "fontFeatureSettings": 48, "breakAfter": 48, "breakBefore": 48, "breakInside": 48, "columnCount": 48, "columnFill": 48, "columnGap": 48, "columnRule": 48, "columnRuleColor": 48, "columnRuleStyle": 48, "columnRuleWidth": 48, "columns": 48, "columnSpan": 48, "columnWidth": 48 }, "safari": { "flex": 8, "flexBasis": 8, "flexDirection": 8, "flexGrow": 8, "flexFlow": 8, "flexShrink": 8, "alignContent": 8, "alignItems": 8, "alignSelf": 8, "justifyContent": 8, "order": 8, "transition": 6, "transitionDelay": 6, "transitionDuration": 6, "transitionProperty": 6, "transitionTimingFunction": 6, "backfaceVisibility": 8, "perspective": 8, "perspectiveOrigin": 8, "transform": 8, "transformOrigin": 8, "transformStyle": 8, "transformOriginX": 8, "transformOriginY": 8, "animation": 8, "animationDelay": 8, "animationDirection": 8, "animationFillMode": 8, "animationDuration": 8, "anmationIterationCount": 8, "animationName": 8, "animationPlayState": 8, "animationTimingFunction": 8, "appearance": 9, "userSelect": 9, "backdropFilter": 9, "fontKerning": 9, "scrollSnapType": 9, "scrollSnapPointsX": 9, "scrollSnapPointsY": 9, "scrollSnapDestination": 9, "scrollSnapCoordinate": 9, "textEmphasisPosition": 7, "textEmphasis": 7, "textEmphasisStyle": 7, "textEmphasisColor": 7, "boxDecorationBreak": 9, "clipPath": 9, "maskImage": 9, "maskMode": 9, "maskRepeat": 9, "maskPosition": 9, "maskClip": 9, "maskOrigin": 9, "maskSize": 9, "maskComposite": 9, "mask": 9, "maskBorderSource": 9, "maskBorderMode": 9, "maskBorderSlice": 9, "maskBorderWidth": 9, "maskBorderOutset": 9, "maskBorderRepeat": 9, "maskBorder": 9, "maskType": 9, "textDecorationStyle": 9, "textDecorationSkip": 9, "textDecorationLine": 9, "textDecorationColor": 9, "shapeImageThreshold": 9, "shapeImageMargin": 9, "shapeImageOutside": 9, "filter": 9, "hyphens": 9, "flowInto": 9, "flowFrom": 9, "breakBefore": 8, "breakAfter": 8, "breakInside": 8, "regionFragment": 9, "columnCount": 8, "columnFill": 8, "columnGap": 8, "columnRule": 8, "columnRuleColor": 8, "columnRuleStyle": 8, "columnRuleWidth": 8, "columns": 8, "columnSpan": 8, "columnWidth": 8 }, "firefox": { "appearance": 43, "userSelect": 43, "boxSizing": 28, "textAlignLast": 43, "textDecorationStyle": 35, "textDecorationSkip": 35, "textDecorationLine": 35, "textDecorationColor": 35, "tabSize": 43, "hyphens": 42, "fontFeatureSettings": 33, "breakAfter": 43, "breakBefore": 43, "breakInside": 43, "columnCount": 43, "columnFill": 43, "columnGap": 43, "columnRule": 43, "columnRuleColor": 43, "columnRuleStyle": 43, "columnRuleWidth": 43, "columns": 43, "columnSpan": 43, "columnWidth": 43 }, "opera": { "flex": 16, "flexBasis": 16, "flexDirection": 16, "flexGrow": 16, "flexFlow": 16, "flexShrink": 16, "alignContent": 16, "alignItems": 16, "alignSelf": 16, "justifyContent": 16, "order": 16, "backfaceVisibility": 22, "perspective": 22, "perspectiveOrigin": 22, "transform": 22, "transformOrigin": 22, "transformStyle": 22, "transformOriginX": 22, "transformOriginY": 22, "animation": 29, "animationDelay": 29, "animationDirection": 29, "animationFillMode": 29, "animationDuration": 29, "anmationIterationCount": 29, "animationName": 29, "animationPlayState": 29, "animationTimingFunction": 29, "appearance": 34, "userSelect": 34, "fontKerning": 19, "textEmphasisPosition": 34, "textEmphasis": 34, "textEmphasisStyle": 34, "textEmphasisColor": 34, "boxDecorationBreak": 34, "clipPath": 34, "maskImage": 34, "maskMode": 34, "maskRepeat": 34, "maskPosition": 34, "maskClip": 34, "maskOrigin": 34, "maskSize": 34, "maskComposite": 34, "mask": 34, "maskBorderSource": 34, "maskBorderMode": 34, "maskBorderSlice": 34, "maskBorderWidth": 34, "maskBorderOutset": 34, "maskBorderRepeat": 34, "maskBorder": 34, "maskType": 34, "filter": 34, "fontFeatureSettings": 34, "breakAfter": 34, "breakBefore": 34, "breakInside": 34, "columnCount": 34, "columnFill": 34, "columnGap": 34, "columnRule": 34, "columnRuleColor": 34, "columnRuleStyle": 34, "columnRuleWidth": 34, "columns": 34, "columnSpan": 34, "columnWidth": 34 }, "ie": { "gridAutoColumns": 11, "touchAction": 10, "flex": 10, "grid": 11, "gridColumnStart": 11, "flowInto": 11, "gridTemplateAreas": 11, "gridAutoFlow": 11, "wrapMargin": 11, "breakAfter": 11, "scrollSnapCoordinate": 11, "gridArea": 11, "regionFragment": 11, "breakInside": 11, "scrollSnapPointsY": 11, "gridRow": 11, "gridTemplate": 11, "flowFrom": 11, "flexFlow": 10, "gridTemplateRows": 11, "gridAutoRows": 11, "hyphens": 11, "scrollSnapPointsX": 11, "flexDirection": 10, "columnGap": 11, "gridRowEnd": 11, "gridRowStart": 11, "gridColumn": 11, "scrollSnapDestination": 11, "gridTemplateColumns": 11, "scrollSnapType": 11, "rowGap": 11, "userSelect": 11, "wrapFlow": 11, "breakBefore": 11, "wrapThrough": 11, "gridGap": 11, "textSizeAdjust": 11 }, "ios_saf": { "flex": 8.1, "flexBasis": 8.1, "flexDirection": 8.1, "flexGrow": 8.1, "flexFlow": 8.1, "flexShrink": 8.1, "alignContent": 8.1, "alignItems": 8.1, "alignSelf": 8.1, "justifyContent": 8.1, "order": 8.1, "transition": 6, "transitionDelay": 6, "transitionDuration": 6, "transitionProperty": 6, "transitionTimingFunction": 6, "backfaceVisibility": 8.1, "perspective": 8.1, "perspectiveOrigin": 8.1, "transform": 8.1, "transformOrigin": 8.1, "transformStyle": 8.1, "transformOriginX": 8.1, "transformOriginY": 8.1, "animation": 8.1, "animationDelay": 8.1, "animationDirection": 8.1, "animationFillMode": 8.1, "animationDuration": 8.1, "anmationIterationCount": 8.1, "animationName": 8.1, "animationPlayState": 8.1, "animationTimingFunction": 8.1, "appearance": 9, "userSelect": 9, "backdropFilter": 9, "fontKerning": 9, "scrollSnapType": 9, "scrollSnapPointsX": 9, "scrollSnapPointsY": 9, "scrollSnapDestination": 9, "scrollSnapCoordinate": 9, "boxDecorationBreak": 9, "clipPath": 9, "maskImage": 9, "maskMode": 9, "maskRepeat": 9, "maskPosition": 9, "maskClip": 9, "maskOrigin": 9, "maskSize": 9, "maskComposite": 9, "mask": 9, "maskBorderSource": 9, "maskBorderMode": 9, "maskBorderSlice": 9, "maskBorderWidth": 9, "maskBorderOutset": 9, "maskBorderRepeat": 9, "maskBorder": 9, "maskType": 9, "textSizeAdjust": 9, "textDecorationStyle": 9, "textDecorationSkip": 9, "textDecorationLine": 9, "textDecorationColor": 9, "shapeImageThreshold": 9, "shapeImageMargin": 9, "shapeImageOutside": 9, "filter": 9, "hyphens": 9, "flowInto": 9, "flowFrom": 9, "breakBefore": 8.1, "breakAfter": 8.1, "breakInside": 8.1, "regionFragment": 9, "columnCount": 8.1, "columnFill": 8.1, "columnGap": 8.1, "columnRule": 8.1, "columnRuleColor": 8.1, "columnRuleStyle": 8.1, "columnRuleWidth": 8.1, "columns": 8.1, "columnSpan": 8.1, "columnWidth": 8.1 }, "android": { "borderImage": 4.2, "borderImageOutset": 4.2, "borderImageRepeat": 4.2, "borderImageSlice": 4.2, "borderImageSource": 4.2, "borderImageWidth": 4.2, "flex": 4.2, "flexBasis": 4.2, "flexDirection": 4.2, "flexGrow": 4.2, "flexFlow": 4.2, "flexShrink": 4.2, "alignContent": 4.2, "alignItems": 4.2, "alignSelf": 4.2, "justifyContent": 4.2, "order": 4.2, "transition": 4.2, "transitionDelay": 4.2, "transitionDuration": 4.2, "transitionProperty": 4.2, "transitionTimingFunction": 4.2, "backfaceVisibility": 4.4, "perspective": 4.4, "perspectiveOrigin": 4.4, "transform": 4.4, "transformOrigin": 4.4, "transformStyle": 4.4, "transformOriginX": 4.4, "transformOriginY": 4.4, "animation": 4.4, "animationDelay": 4.4, "animationDirection": 4.4, "animationFillMode": 4.4, "animationDuration": 4.4, "anmationIterationCount": 4.4, "animationName": 4.4, "animationPlayState": 4.4, "animationTimingFunction": 4.4, "appearance": 44, "userSelect": 44, "fontKerning": 4.4, "textEmphasisPosition": 44, "textEmphasis": 44, "textEmphasisStyle": 44, "textEmphasisColor": 44, "boxDecorationBreak": 44, "clipPath": 44, "maskImage": 44, "maskMode": 44, "maskRepeat": 44, "maskPosition": 44, "maskClip": 44, "maskOrigin": 44, "maskSize": 44, "maskComposite": 44, "mask": 44, "maskBorderSource": 44, "maskBorderMode": 44, "maskBorderSlice": 44, "maskBorderWidth": 44, "maskBorderOutset": 44, "maskBorderRepeat": 44, "maskBorder": 44, "maskType": 44, "filter": 44, "fontFeatureSettings": 44, "breakAfter": 44, "breakBefore": 44, "breakInside": 44, "columnCount": 44, "columnFill": 44, "columnGap": 44, "columnRule": 44, "columnRuleColor": 44, "columnRuleStyle": 44, "columnRuleWidth": 44, "columns": 44, "columnSpan": 44, "columnWidth": 44 }, "and_chr": {}, "and_uc": { "flex": 9.9, "flexBasis": 9.9, "flexDirection": 9.9, "flexGrow": 9.9, "flexFlow": 9.9, "flexShrink": 9.9, "alignContent": 9.9, "alignItems": 9.9, "alignSelf": 9.9, "justifyContent": 9.9, "order": 9.9, "transition": 9.9, "transitionDelay": 9.9, "transitionDuration": 9.9, "transitionProperty": 9.9, "transitionTimingFunction": 9.9, "backfaceVisibility": 9.9, "perspective": 9.9, "perspectiveOrigin": 9.9, "transform": 9.9, "transformOrigin": 9.9, "transformStyle": 9.9, "transformOriginX": 9.9, "transformOriginY": 9.9, "animation": 9.9, "animationDelay": 9.9, "animationDirection": 9.9, "animationFillMode": 9.9, "animationDuration": 9.9, "anmationIterationCount": 9.9, "animationName": 9.9, "animationPlayState": 9.9, "animationTimingFunction": 9.9, "appearance": 9.9, "userSelect": 9.9, "fontKerning": 9.9, "textEmphasisPosition": 9.9, "textEmphasis": 9.9, "textEmphasisStyle": 9.9, "textEmphasisColor": 9.9, "maskImage": 9.9, "maskMode": 9.9, "maskRepeat": 9.9, "maskPosition": 9.9, "maskClip": 9.9, "maskOrigin": 9.9, "maskSize": 9.9, "maskComposite": 9.9, "mask": 9.9, "maskBorderSource": 9.9, "maskBorderMode": 9.9, "maskBorderSlice": 9.9, "maskBorderWidth": 9.9, "maskBorderOutset": 9.9, "maskBorderRepeat": 9.9, "maskBorder": 9.9, "maskType": 9.9, "textSizeAdjust": 9.9, "filter": 9.9, "hyphens": 9.9, "flowInto": 9.9, "flowFrom": 9.9, "breakBefore": 9.9, "breakAfter": 9.9, "breakInside": 9.9, "regionFragment": 9.9, "fontFeatureSettings": 9.9, "columnCount": 9.9, "columnFill": 9.9, "columnGap": 9.9, "columnRule": 9.9, "columnRuleColor": 9.9, "columnRuleStyle": 9.9, "columnRuleWidth": 9.9, "columns": 9.9, "columnSpan": 9.9, "columnWidth": 9.9 }, "op_mini": { "borderImage": 5, "borderImageOutset": 5, "borderImageRepeat": 5, "borderImageSlice": 5, "borderImageSource": 5, "borderImageWidth": 5, "tabSize": 5, "objectFit": 5, "objectPosition": 5 } };module.exports = caniuseData;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { 'default': obj };
	}

	var _pluginsCursor = __webpack_require__(20);

	var _pluginsCursor2 = _interopRequireDefault(_pluginsCursor);

	var _pluginsFlex = __webpack_require__(21);

	var _pluginsFlex2 = _interopRequireDefault(_pluginsFlex);

	var _pluginsSizing = __webpack_require__(22);

	var _pluginsSizing2 = _interopRequireDefault(_pluginsSizing);

	var _pluginsGradient = __webpack_require__(23);

	var _pluginsGradient2 = _interopRequireDefault(_pluginsGradient);

	//special flexbox specifications

	var _pluginsFlexboxIE = __webpack_require__(24);

	var _pluginsFlexboxIE2 = _interopRequireDefault(_pluginsFlexboxIE);

	var _pluginsFlexboxOld = __webpack_require__(25);

	var _pluginsFlexboxOld2 = _interopRequireDefault(_pluginsFlexboxOld);

	exports['default'] = [_pluginsCursor2['default'], _pluginsFlex2['default'], _pluginsSizing2['default'], _pluginsGradient2['default'], _pluginsFlexboxIE2['default'], _pluginsFlexboxOld2['default']];
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
	  } else {
	    obj[key] = value;
	  }return obj;
	}

	var values = ['zoom-in', 'zoom-out', 'grab', 'grabbing'];

	exports['default'] = function (property, value, _ref2) {
	  var browser = _ref2.browser;
	  var version = _ref2.version;
	  var prefix = _ref2.prefix;

	  if (property === 'cursor' && values.indexOf(value) > -1 && (browser === 'firefox' && version < 24 || browser === 'chrome' && version < 37 || browser === 'safari' && version < 9 || browser === 'opera' && version < 24)) {
	    return _defineProperty({}, property, prefix.CSS + value);
	  }
	};

	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
	  } else {
	    obj[key] = value;
	  }return obj;
	}

	var values = ['flex', 'inline-flex'];

	exports['default'] = function (property, value, _ref2) {
	  var browser = _ref2.browser;
	  var version = _ref2.version;
	  var prefix = _ref2.prefix;

	  if (property === 'display' && values.indexOf(value) > -1 && (browser === 'chrome' && (version < 29 || version > 20) || (browser === 'safari' || browser === 'ios_saf') && (version < 9 || version > 6) || browser === 'opera' && (version == 15 || version == 16))) {
	    return _defineProperty({}, property, prefix.CSS + value);
	  }
	};

	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
	  } else {
	    obj[key] = value;
	  }return obj;
	}

	var properties = ['maxHeight', 'maxWidth', 'width', 'height', 'columnWidth', 'minWidth', 'minHeight'];
	var values = ['min-content', 'max-content', 'fill-available', 'fit-content', 'contain-floats'];

	exports['default'] = function (property, value, _ref2) {
	  var prefix = _ref2.prefix;

	  /**
	   * This actually is only available with prefixes
	   * NOTE: This might change in the feature
	   */
	  if (properties.indexOf(property) > -1 && values.indexOf(value) > -1) {
	    return _defineProperty({}, property, prefix.CSS + value);
	  }
	};

	module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
	  } else {
	    obj[key] = value;
	  }return obj;
	}

	var properties = ['background', 'backgroundImage'];
	var values = ['linear-gradient', 'radial-gradient', 'repeating-linear-gradient', 'repeating-radial-gradient'];

	exports['default'] = function (property, value, _ref2) {
	  var browser = _ref2.browser;
	  var version = _ref2.version;
	  var prefix = _ref2.prefix;

	  if (properties.indexOf(property) > -1 && values.indexOf(value) > -1 && (browser === 'firefox' && version < 16 || browser === 'chrome' && version < 26 || (browser === 'safari' || browser === 'ios_saf') && version < 7 || (browser === 'opera' || browser === 'op_mini') && version < 12.1 || browser === 'android' && version < 4.4 || browser === 'and_uc')) {
	    return _defineProperty({}, property, prefix.CSS + value);
	  }
	};

	module.exports = exports['default'];

/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
	  } else {
	    obj[key] = value;
	  }return obj;
	}

	var alternativeValues = {
	  'space-around': 'distribute',
	  'space-between': 'justify',
	  'flex-start': 'start',
	  'flex-end': 'end',
	  'flex': '-ms-flexbox',
	  'inline-flex': '-ms-inline-flexbox'
	};

	var alternativeProps = {
	  'alignContent': 'msFlexLinePack',
	  'alignSelf': 'msFlexItemAlign',
	  'alignItems': 'msFlexAlign',
	  'justifyContent': 'msFlexPack',
	  'order': 'msFlexOrder',
	  'flexGrow': 'msFlexPositive',
	  'flexShrink': 'msFlexNegative',
	  'flexBasis': 'msPreferredSize'
	};

	var properties = Object.keys(alternativeProps).concat('display');

	exports['default'] = function (property, value, _ref2, styles) {
	  var browser = _ref2.browser;
	  var version = _ref2.version;

	  if (properties.indexOf(property) > -1 && ((browser === 'ie_mob' || browser === 'ie') && version == 10)) {
	    delete styles[property];
	    return _defineProperty({}, alternativeProps[property] || property, alternativeValues[value] || value);
	  }
	};

	module.exports = exports['default'];

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
	  } else {
	    obj[key] = value;
	  }return obj;
	}

	var alternativeValues = {
	  'space-around': 'justify',
	  'space-between': 'justify',
	  'flex-start': 'start',
	  'flex-end': 'end',
	  'wrap-reverse': 'multiple',
	  'wrap': 'multiple',
	  'flex': 'box',
	  'inline-flex': 'inline-box'
	};

	var alternativeProps = {
	  alignItems: 'WebkitBoxAlign',
	  justifyContent: 'WebkitBoxPack',
	  flexWrap: 'WebkitBoxLines'
	};

	var properties = Object.keys(alternativeProps).concat(['alignContent', 'alignSelf', 'display', 'order', 'flexGrow', 'flexShrink', 'flexBasis', 'flexDirection']);

	exports['default'] = function (property, value, _ref2) {
	  var browser = _ref2.browser;
	  var version = _ref2.version;
	  var prefix = _ref2.prefix;

	  if (properties.indexOf(property) > -1 && (browser === 'firefox' && version < 22 || browser === 'chrome' && version < 21 || (browser === 'safari' || browser === 'ios_saf') && version <= 6.1 || browser === 'android' && version < 4.4 || browser === 'and_uc')) {
	    if (property === 'flexDirection') {
	      return {
	        WebkitBoxOrient: value.indexOf('column') > -1 ? 'vertical' : 'horizontal',
	        WebkitBoxDirection: value.indexOf('reverse') > -1 ? 'reverse' : 'normal'
	      };
	    }
	    if (property === 'display' && alternativeValues[value]) {
	      return {
	        display: prefix.CSS + alternativeValues[value]
	      };
	    }
	    return _defineProperty({}, alternativeProps[property] || property, alternativeValues[value] || value);
	  }
	};

	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/** @flow */

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _mouseUpListener = __webpack_require__(27);

	var _mouseUpListener2 = _interopRequireDefault(_mouseUpListener);

	/*:: import type {PluginConfig, PluginResult} from '.';*/

	var _isInteractiveStyleField = function _isInteractiveStyleField(styleFieldName) {
	  return styleFieldName === ':hover' || styleFieldName === ':active' || styleFieldName === ':focus';
	};

	var resolveInteractionStyles = function resolveInteractionStyles(config /*: PluginConfig*/) /*: PluginResult*/ {
	  var ExecutionEnvironment = config.ExecutionEnvironment;
	  var getComponentField = config.getComponentField;
	  var getState = config.getState;
	  var mergeStyles = config.mergeStyles;
	  var props = config.props;
	  var setState = config.setState;
	  var style = config.style;

	  var newComponentFields = {};
	  var newProps = {};

	  // Only add handlers if necessary
	  if (style[':hover']) {
	    (function () {
	      // Always call the existing handler if one is already defined.
	      // This code, and the very similar ones below, could be abstracted a bit
	      // more, but it hurts readability IMO.
	      var existingOnMouseEnter = props.onMouseEnter;
	      newProps.onMouseEnter = function (e) {
	        existingOnMouseEnter && existingOnMouseEnter(e);
	        setState(':hover', true);
	      };

	      var existingOnMouseLeave = props.onMouseLeave;
	      newProps.onMouseLeave = function (e) {
	        existingOnMouseLeave && existingOnMouseLeave(e);
	        setState(':hover', false);
	      };
	    })();
	  }

	  if (style[':active']) {
	    (function () {
	      var existingOnMouseDown = props.onMouseDown;
	      newProps.onMouseDown = function (e) {
	        existingOnMouseDown && existingOnMouseDown(e);
	        newComponentFields._lastMouseDown = Date.now();
	        setState(':active', 'viamousedown');
	      };

	      var existingOnKeyDown = props.onKeyDown;
	      newProps.onKeyDown = function (e) {
	        existingOnKeyDown && existingOnKeyDown(e);
	        if (e.key === ' ' || e.key === 'Enter') {
	          setState(':active', 'viakeydown');
	        }
	      };

	      var existingOnKeyUp = props.onKeyUp;
	      newProps.onKeyUp = function (e) {
	        existingOnKeyUp && existingOnKeyUp(e);
	        if (e.key === ' ' || e.key === 'Enter') {
	          setState(':active', false);
	        }
	      };
	    })();
	  }

	  if (style[':focus']) {
	    (function () {
	      var existingOnFocus = props.onFocus;
	      newProps.onFocus = function (e) {
	        existingOnFocus && existingOnFocus(e);
	        setState(':focus', true);
	      };

	      var existingOnBlur = props.onBlur;
	      newProps.onBlur = function (e) {
	        existingOnBlur && existingOnBlur(e);
	        setState(':focus', false);
	      };
	    })();
	  }

	  if (style[':active'] && !getComponentField('_radiumMouseUpListener') && ExecutionEnvironment.canUseEventListeners) {
	    newComponentFields._radiumMouseUpListener = _mouseUpListener2['default'].subscribe(function () {
	      Object.keys(getComponentField('state')._radiumStyleState).forEach(function (key) {
	        if (getState(':active', key) === 'viamousedown') {
	          setState(':active', false, key);
	        }
	      });
	    });
	  }

	  // Merge the styles in the order they were defined
	  var interactionStyles = Object.keys(style).filter(function (name) {
	    return _isInteractiveStyleField(name) && getState(name);
	  }).map(function (name) {
	    return style[name];
	  });

	  var newStyle = mergeStyles([style].concat(interactionStyles));

	  // Remove interactive styles
	  newStyle = Object.keys(newStyle).reduce(function (styleWithoutInteractions, name) {
	    if (!_isInteractiveStyleField(name)) {
	      styleWithoutInteractions[name] = newStyle[name];
	    }
	    return styleWithoutInteractions;
	  }, {});

	  return {
	    componentFields: newComponentFields,
	    props: newProps,
	    style: newStyle
	  };
	};

	exports['default'] = resolveInteractionStyles;
	module.exports = exports['default'];

/***/ },
/* 27 */
/***/ function(module, exports) {

	/* @flow */

	'use strict';

	exports.__esModule = true;
	var _callbacks = [];
	var _mouseUpListenerIsActive = false;

	function _handleMouseUp() {
	  _callbacks.forEach(function (callback) {
	    callback();
	  });
	}

	var subscribe = function subscribe(callback /*: () => void*/) /*: {remove: () => void}*/ {
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

	exports['default'] = {
	  subscribe: subscribe,
	  __triggerForTests: _handleMouseUp
	};
	module.exports = exports['default'];

/***/ },
/* 28 */
/***/ function(module, exports) {

	/** @flow */

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = resolveMediaQueries;

	/*:: import type {MatchMediaType} from '../config';*/
	/*:: import type {PluginConfig, PluginResult} from '.';*/

	var _windowMatchMedia = undefined;
	var _getWindowMatchMedia = function _getWindowMatchMedia(ExecutionEnvironment) {
	  if (_windowMatchMedia === undefined) {
	    _windowMatchMedia = !!ExecutionEnvironment.canUseDOM && !!window && !!window.matchMedia && function (mediaQueryString) {
	      return window.matchMedia(mediaQueryString);
	    } || null;
	  }
	  return _windowMatchMedia;
	};

	function resolveMediaQueries(_ref /*: PluginConfig*/) /*: PluginResult*/ {
	  var ExecutionEnvironment = _ref.ExecutionEnvironment;
	  var getComponentField = _ref.getComponentField;
	  var getGlobalState = _ref.getGlobalState;
	  var config = _ref.config;
	  var mergeStyles = _ref.mergeStyles;
	  var setState = _ref.setState;
	  var style = _ref.style;

	  var newComponentFields = {};
	  var newStyle = style;
	  var matchMedia /*: ?MatchMediaType*/ = config.matchMedia || _getWindowMatchMedia(ExecutionEnvironment);
	  if (!matchMedia) {
	    return newStyle;
	  }

	  var mediaQueryListByQueryString = getGlobalState('mediaQueryListByQueryString') || {};

	  Object.keys(style).filter(function (name) {
	    return name.indexOf('@media') === 0;
	  }).map(function (query) {
	    var mediaQueryStyles = style[query];
	    query = query.replace('@media ', '');

	    // Create a global MediaQueryList if one doesn't already exist
	    var mql = mediaQueryListByQueryString[query];
	    if (!mql && matchMedia) {
	      mediaQueryListByQueryString[query] = mql = matchMedia(query);
	    }

	    var listenersByQuery = getComponentField('_radiumMediaQueryListenersByQuery');

	    if (!listenersByQuery || !listenersByQuery[query]) {
	      (function () {
	        var listener = function listener() {
	          return setState(query, mql.matches, '_all');
	        };
	        mql.addListener(listener);
	        newComponentFields._radiumMediaQueryListenersByQuery = _extends({}, listenersByQuery);
	        newComponentFields._radiumMediaQueryListenersByQuery[query] = {
	          remove: function remove() {
	            mql.removeListener(listener);
	          }
	        };
	      })();
	    }

	    // Apply media query states
	    if (mql.matches) {
	      newStyle = mergeStyles([newStyle, mediaQueryStyles]);
	    }
	  });

	  // Remove media queries
	  newStyle = Object.keys(newStyle).reduce(function (styleWithoutMedia, key) {
	    if (key.indexOf('@media') !== 0) {
	      styleWithoutMedia[key] = newStyle[key];
	    }
	    return styleWithoutMedia;
	  }, {});

	  return {
	    componentFields: newComponentFields,
	    globalState: { mediaQueryListByQueryString: mediaQueryListByQueryString },
	    style: newStyle
	  };
	}

	module.exports = exports['default'];

/***/ },
/* 29 */
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
/* 30 */
/***/ function(module, exports) {

	/* @flow */

	"use strict";

	exports.__esModule = true;
	var allPrintStyles = {};
	var listeners = [];

	function subscribe(listener /*: () => void*/) /*: {remove: () => void}*/ {
	  if (listeners.indexOf(listener) === -1) {
	    listeners.push(listener);
	  }

	  return {
	    remove: function remove() {
	      var listenerIndex = listeners.indexOf(listener);

	      if (listenerIndex > -1) {
	        listeners.splice(listenerIndex, 1);
	      }
	    }
	  };
	}

	function _emitChange() {
	  listeners.forEach(function (listener) {
	    return listener();
	  });
	}

	function _appendImportantToEachValue(styleObj) {
	  var importantStyleObj = {};

	  Object.keys(styleObj).forEach(function (key) {
	    var value = styleObj[key];

	    // This breaks unitless values but they'll be deprecated soon anyway
	    // https://github.com/facebook/react/issues/1873
	    value = value + " !important";
	    importantStyleObj[key] = value;
	  });

	  return importantStyleObj;
	}

	function addPrintStyles(Component /*: constructor*/) {
	  if (!Component.printStyles) {
	    return;
	  }

	  var printStyleClass = {};

	  Object.keys(Component.printStyles).forEach(function (key) {
	    var styles = Component.printStyles[key];
	    var className = "Radium-" + Component.displayName + "-" + key;
	    allPrintStyles["." + className] = _appendImportantToEachValue(styles);
	    printStyleClass[key] = className;
	  });

	  // Allows for lazy loading of JS that then calls Radium to update the
	  // print styles
	  _emitChange();
	  return printStyleClass;
	}

	function getPrintStyles() /*: Object*/ {
	  return allPrintStyles;
	}

	exports["default"] = {
	  addPrintStyles: addPrintStyles,
	  getPrintStyles: getPrintStyles,
	  subscribe: subscribe
	};
	module.exports = exports["default"];

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _styleJs = __webpack_require__(32);

	var _styleJs2 = _interopRequireDefault(_styleJs);

	var _printStylesJs = __webpack_require__(30);

	var _printStylesJs2 = _interopRequireDefault(_printStylesJs);

	var PrintStyle = _react2['default'].createClass({
	  displayName: 'PrintStyle',

	  getInitialState: function getInitialState() {
	    return this._getStylesState();
	  },

	  componentDidMount: function componentDidMount() {
	    this.subscription = _printStylesJs2['default'].subscribe(this._onChange);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    this.subscription.remove();
	  },

	  _onChange: function _onChange() {
	    this.setState(this._getStylesState());
	  },

	  _getStylesState: function _getStylesState() {
	    return {
	      styles: _printStylesJs2['default'].getPrintStyles()
	    };
	  },

	  render: function render() {
	    return _react2['default'].createElement(_styleJs2['default'], { rules: {
	        mediaQueries: {
	          print: this.state.styles
	        }
	      } });
	  }
	});

	exports['default'] = PrintStyle;
	module.exports = exports['default'];

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _camelCasePropsToDashCase = __webpack_require__(33);

	var _camelCasePropsToDashCase2 = _interopRequireDefault(_camelCasePropsToDashCase);

	var _createMarkupForStyles = __webpack_require__(34);

	var _createMarkupForStyles2 = _interopRequireDefault(_createMarkupForStyles);

	var _prefixer = __webpack_require__(14);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var buildCssString = function buildCssString(selector /*: string*/, rules /*: Object*/, userAgent /*: ?string*/) /*: string*/ {
	  if (!selector || !rules) {
	    return '';
	  }

	  var prefixedRules = _prefixer.getPrefixedStyle(rules, 'Style', userAgent);
	  var cssPrefixedRules = _camelCasePropsToDashCase2['default'](prefixedRules);
	  var serializedRules = _createMarkupForStyles2['default'](cssPrefixedRules);

	  return selector + '{' + serializedRules + '}';
	};

	var Style = _react2['default'].createClass({
	  displayName: 'Style',

	  propTypes: {
	    rules: _react2['default'].PropTypes.object,
	    scopeSelector: _react2['default'].PropTypes.string
	  },

	  contextTypes: {
	    radiumConfig: _react2['default'].PropTypes.object
	  },

	  getDefaultProps: function getDefaultProps() /*: {scopeSelector: string}*/ {
	    return {
	      prefix: _prefixer.getPrefixedStyle,
	      scopeSelector: ''
	    };
	  },

	  _buildStyles: function _buildStyles(styles /*: Object*/) /*: string*/ {
	    var _this = this;

	    return Object.keys(styles).reduce(function (accumulator, selector) {
	      var rules = styles[selector];

	      if (selector === 'mediaQueries') {
	        accumulator += _this._buildMediaQueryString(rules);
	      } else {
	        var completeSelector = (_this.props.scopeSelector ? _this.props.scopeSelector + ' ' : '') + selector;
	        accumulator += buildCssString(completeSelector, rules, _this.context && _this.context.radiumConfig && _this.context.radiumConfig.userAgent);
	      }

	      return accumulator;
	    }, '');
	  },

	  _buildMediaQueryString: function _buildMediaQueryString(stylesByMediaQuery /*: {[mediaQuery: string]: Object}*/) /*: string*/ {
	    var _this2 = this;

	    var contextMediaQueries = this._getContextMediaQueries();
	    var mediaQueryString = '';

	    Object.keys(stylesByMediaQuery).forEach(function (query) {
	      var completeQuery = contextMediaQueries[query] ? contextMediaQueries[query] : query;
	      mediaQueryString += '@media ' + completeQuery + '{' + _this2._buildStyles(stylesByMediaQuery[query]) + '}';
	    });

	    return mediaQueryString;
	  },

	  _getContextMediaQueries: function _getContextMediaQueries() /*: {[mediaQuery: string]: Object}*/ {
	    var _this3 = this;

	    var contextMediaQueries = {};
	    if (this.context && this.context.mediaQueries) {
	      Object.keys(this.context.mediaQueries).forEach(function (query) {
	        contextMediaQueries[query] = _this3.context.mediaQueries[query].media;
	      });
	    }

	    return contextMediaQueries;
	  },

	  render: function render() /*: ?ReactElement*/ {
	    if (!this.props.rules) {
	      return null;
	    }

	    var styles = this._buildStyles(this.props.rules);

	    return _react2['default'].createElement('style', { dangerouslySetInnerHTML: { __html: styles } });
	  }
	});

	exports['default'] = Style;
	module.exports = exports['default'];

/***/ },
/* 33 */
/***/ function(module, exports) {

	/* @flow */

	'use strict';

	exports.__esModule = true;
	var _camelCaseRegex = /([a-z])?([A-Z])/g;
	var _camelCaseReplacer = function _camelCaseReplacer(match, p1, p2) {
	  return (p1 || '') + '-' + p2.toLowerCase();
	};
	var _camelCaseToDashCase = function _camelCaseToDashCase(s) {
	  return s.replace(_camelCaseRegex, _camelCaseReplacer);
	};

	var camelCasePropsToDashCase = function camelCasePropsToDashCase(prefixedStyle /*: Object*/) /*: Object*/ {
	  // Since prefix is expected to work on inline style objects, we must
	  // translate the keys to dash case for rendering to CSS.
	  return Object.keys(prefixedStyle).reduce(function (result, key) {
	    result[_camelCaseToDashCase(key)] = prefixedStyle[key];
	    return result;
	  }, {});
	};

	exports['default'] = camelCasePropsToDashCase;
	module.exports = exports['default'];

/***/ },
/* 34 */
/***/ function(module, exports) {

	/* @flow */

	'use strict';

	exports.__esModule = true;
	var createMarkupForStyles = function createMarkupForStyles(style /*: Object*/) /*: string*/ {
	  var spaces /*: string*/ = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	  return Object.keys(style).map(function (property) {
	    return spaces + property + ': ' + style[property] + ';';
	  }).join('\n');
	};

	exports['default'] = createMarkupForStyles;
	module.exports = exports['default'];

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* @flow */

	'use strict';

	exports.__esModule = true;
	exports['default'] = keyframes;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _camelCasePropsToDashCase = __webpack_require__(33);

	var _camelCasePropsToDashCase2 = _interopRequireDefault(_camelCasePropsToDashCase);

	var _createMarkupForStyles = __webpack_require__(34);

	var _createMarkupForStyles2 = _interopRequireDefault(_createMarkupForStyles);

	var _prefixer = __webpack_require__(14);

	var _exenv = __webpack_require__(29);

	var _exenv2 = _interopRequireDefault(_exenv);

	var isAnimationSupported = false;
	var keyframesPrefixed = 'keyframes';

	if (_exenv2['default'].canUseDOM) {
	  (function () {
	    // Animation feature detection and keyframes prefixing from MDN:
	    // https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Detecting_CSS_animation_support
	    var domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
	    var element = (document.createElement('div') /*: any*/);

	    if (element.style.animationName !== undefined) {
	      isAnimationSupported = true;
	    } else {
	      domPrefixes.some(function (prefix) {
	        if (element.style[prefix + 'AnimationName'] !== undefined) {
	          keyframesPrefixed = '-' + prefix.toLowerCase() + '-keyframes';
	          isAnimationSupported = true;
	          return true;
	        }
	        return false;
	      });
	    }
	  })();
	}

	var animationIndex = 1;
	var animationStyleSheet = null;

	if (isAnimationSupported) {
	  animationStyleSheet = (document.createElement('style') /*: any*/);
	  document.head.appendChild(animationStyleSheet);
	}

	// Simple animation helper that injects CSS into a style object containing the
	// keyframes, and returns a string with the generated animation name.

	function keyframes(keyframeRules /*: {[percentage: string]: {[key: string]: string|number}}*/, componentName /*:: ?: string*/) /*: string*/ {
	  var prefix /*: (style: Object, componentName: ?string) => Object*/ = arguments.length <= 2 || arguments[2] === undefined ? _prefixer.getPrefixedStyle : arguments[2];

	  var name = 'Animation' + animationIndex;
	  animationIndex += 1;

	  if (!isAnimationSupported) {
	    return name;
	  }

	  var rule = '@' + keyframesPrefixed + ' ' + name + ' {\n' + Object.keys(keyframeRules).map(function (percentage) {
	    var props = keyframeRules[percentage];
	    var prefixedProps = prefix(props, componentName);
	    var cssPrefixedProps = _camelCasePropsToDashCase2['default'](prefixedProps);
	    var serializedProps = _createMarkupForStyles2['default'](cssPrefixedProps, '  ');
	    return '  ' + percentage + ' {\n  ' + serializedProps + '\n  }';
	  }).join('\n') + '\n}\n';

	  // for flow
	  /* istanbul ignore next */
	  if (!animationStyleSheet) {
	    throw new Error('keyframes not initialized properly');
	  }

	  animationStyleSheet.sheet.insertRule(rule, animationStyleSheet.sheet.cssRules.length);
	  return name;
	}

	module.exports = exports['default'];

/***/ }
/******/ ])
});
;