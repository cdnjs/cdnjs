(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactModal"] = factory(require("react"), require("react-dom"));
	else
		root["ReactModal"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var ReactDOM = __webpack_require__(3);
	var ExecutionEnvironment = __webpack_require__(4);
	var ModalPortal = React.createFactory(__webpack_require__(5));
	var ariaAppHider = __webpack_require__(10);
	var elementClass = __webpack_require__(11);
	var renderSubtreeIntoContainer = __webpack_require__(3).unstable_renderSubtreeIntoContainer;
	var Assign = __webpack_require__(9);

	var SafeHTMLElement = ExecutionEnvironment.canUseDOM ? window.HTMLElement : {};
	var AppElement = ExecutionEnvironment.canUseDOM ? document.body : { appendChild: function appendChild() {} };

	function getParentElement(parentSelector) {
	  return parentSelector();
	}

	var Modal = React.createClass({

	  displayName: 'Modal',
	  statics: {
	    setAppElement: function setAppElement(element) {
	      AppElement = ariaAppHider.setElement(element);
	    },
	    injectCSS: function injectCSS() {
	      "production" !== (undefined) && console.warn('React-Modal: injectCSS has been deprecated ' + 'and no longer has any effect. It will be removed in a later version');
	    }
	  },

	  propTypes: {
	    isOpen: React.PropTypes.bool.isRequired,
	    style: React.PropTypes.shape({
	      content: React.PropTypes.object,
	      overlay: React.PropTypes.object
	    }),
	    portalClassName: React.PropTypes.string,
	    appElement: React.PropTypes.instanceOf(SafeHTMLElement),
	    onAfterOpen: React.PropTypes.func,
	    onRequestClose: React.PropTypes.func,
	    closeTimeoutMS: React.PropTypes.number,
	    ariaHideApp: React.PropTypes.bool,
	    shouldCloseOnOverlayClick: React.PropTypes.bool,
	    parentSelector: React.PropTypes.func,
	    role: React.PropTypes.string,
	    contentLabel: React.PropTypes.string.isRequired
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      isOpen: false,
	      portalClassName: 'ReactModalPortal',
	      ariaHideApp: true,
	      closeTimeoutMS: 0,
	      shouldCloseOnOverlayClick: true,
	      parentSelector: function parentSelector() {
	        return document.body;
	      }
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    this.node = document.createElement('div');
	    this.node.className = this.props.portalClassName;

	    var parent = getParentElement(this.props.parentSelector);
	    parent.appendChild(this.node);
	    this.renderPortal(this.props);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    var currentParent = getParentElement(this.props.parentSelector);
	    var newParent = getParentElement(newProps.parentSelector);

	    if (newParent !== currentParent) {
	      currentParent.removeChild(this.node);
	      newParent.appendChild(this.node);
	    }

	    this.renderPortal(newProps);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (this.props.ariaHideApp) {
	      ariaAppHider.show(this.props.appElement);
	    }

	    var state = this.portal.state;
	    var now = Date.now();
	    var closesAt = state.isOpen && this.props.closeTimeoutMS && (state.closesAt || now + this.props.closeTimeoutMS);

	    if (closesAt) {
	      if (!state.beforeClose) {
	        this.portal.closeWithTimeout();
	      }

	      var that = this;
	      setTimeout(function () {
	        that.removePortal();
	      }, closesAt - now);
	    } else {
	      this.removePortal();
	    }
	  },

	  removePortal: function removePortal() {
	    ReactDOM.unmountComponentAtNode(this.node);
	    var parent = getParentElement(this.props.parentSelector);
	    parent.removeChild(this.node);
	    elementClass(document.body).remove('ReactModal__Body--open');
	  },

	  renderPortal: function renderPortal(props) {
	    if (props.isOpen) {
	      elementClass(document.body).add('ReactModal__Body--open');
	    } else {
	      elementClass(document.body).remove('ReactModal__Body--open');
	    }

	    if (props.ariaHideApp) {
	      ariaAppHider.toggle(props.isOpen, props.appElement);
	    }

	    this.portal = renderSubtreeIntoContainer(this, ModalPortal(Assign({}, props, { defaultStyles: Modal.defaultStyles })), this.node);
	  },

	  render: function render() {
	    return React.DOM.noscript();
	  }
	});

	Modal.defaultStyles = {
	  overlay: {
	    position: 'fixed',
	    top: 0,
	    left: 0,
	    right: 0,
	    bottom: 0,
	    backgroundColor: 'rgba(255, 255, 255, 0.75)'
	  },
	  content: {
	    position: 'absolute',
	    top: '40px',
	    left: '40px',
	    right: '40px',
	    bottom: '40px',
	    border: '1px solid #ccc',
	    background: '#fff',
	    overflow: 'auto',
	    WebkitOverflowScrolling: 'touch',
	    borderRadius: '4px',
	    outline: 'none',
	    padding: '20px'
	  }
	};

	module.exports = Modal;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Based on code that is Copyright 2013-2015, Facebook, Inc.
	  All rights reserved.
	*/

	(function () {
		'use strict';

		var canUseDOM = !!(
			typeof window !== 'undefined' &&
			window.document &&
			window.document.createElement
		);

		var ExecutionEnvironment = {

			canUseDOM: canUseDOM,

			canUseWorkers: typeof Worker !== 'undefined',

			canUseEventListeners:
				canUseDOM && !!(window.addEventListener || window.attachEvent),

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

	}());


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(2);
	var div = React.DOM.div;
	var focusManager = __webpack_require__(6);
	var scopeTab = __webpack_require__(8);
	var Assign = __webpack_require__(9);

	// so that our CSS is statically analyzable
	var CLASS_NAMES = {
	  overlay: {
	    base: 'ReactModal__Overlay',
	    afterOpen: 'ReactModal__Overlay--after-open',
	    beforeClose: 'ReactModal__Overlay--before-close'
	  },
	  content: {
	    base: 'ReactModal__Content',
	    afterOpen: 'ReactModal__Content--after-open',
	    beforeClose: 'ReactModal__Content--before-close'
	  }
	};

	var ModalPortal = module.exports = React.createClass({

	  displayName: 'ModalPortal',
	  shouldClose: null,

	  getDefaultProps: function getDefaultProps() {
	    return {
	      style: {
	        overlay: {},
	        content: {}
	      }
	    };
	  },

	  getInitialState: function getInitialState() {
	    return {
	      afterOpen: false,
	      beforeClose: false
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    // Focus needs to be set when mounting and already open
	    if (this.props.isOpen) {
	      this.setFocusAfterRender(true);
	      this.open();
	    }
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    clearTimeout(this.closeTimer);
	  },

	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    // Focus only needs to be set once when the modal is being opened
	    if (!this.props.isOpen && newProps.isOpen) {
	      this.setFocusAfterRender(true);
	      this.open();
	    } else if (this.props.isOpen && !newProps.isOpen) {
	      this.close();
	    }
	  },

	  componentDidUpdate: function componentDidUpdate() {
	    if (this.focusAfterRender) {
	      this.focusContent();
	      this.setFocusAfterRender(false);
	    }
	  },

	  setFocusAfterRender: function setFocusAfterRender(focus) {
	    this.focusAfterRender = focus;
	  },

	  afterClose: function afterClose() {
	    focusManager.returnFocus();
	    focusManager.teardownScopedFocus();
	  },

	  open: function open() {
	    if (this.state.afterOpen && this.state.beforeClose) {
	      clearTimeout(this.closeTimer);
	      this.setState({ beforeClose: false });
	    } else {
	      focusManager.setupScopedFocus(this.node);
	      focusManager.markForFocusLater();
	      this.setState({ isOpen: true }, function () {
	        this.setState({ afterOpen: true });

	        if (this.props.isOpen && this.props.onAfterOpen) {
	          this.props.onAfterOpen();
	        }
	      }.bind(this));
	    }
	  },

	  close: function close() {
	    if (this.props.closeTimeoutMS > 0) this.closeWithTimeout();else this.closeWithoutTimeout();
	  },

	  focusContent: function focusContent() {
	    // Don't steal focus from inner elements
	    if (!this.contentHasFocus()) {
	      this.refs.content.focus();
	    }
	  },

	  closeWithTimeout: function closeWithTimeout() {
	    var closesAt = Date.now() + this.props.closeTimeoutMS;
	    this.setState({ beforeClose: true, closesAt: closesAt }, function () {
	      this.closeTimer = setTimeout(this.closeWithoutTimeout, this.state.closesAt - Date.now());
	    }.bind(this));
	  },

	  closeWithoutTimeout: function closeWithoutTimeout() {
	    this.setState({
	      beforeClose: false,
	      isOpen: false,
	      afterOpen: false,
	      closesAt: null
	    }, this.afterClose);
	  },

	  handleKeyDown: function handleKeyDown(event) {
	    if (event.keyCode == 9 /*tab*/) scopeTab(this.refs.content, event);
	    if (event.keyCode == 27 /*esc*/) {
	        event.preventDefault();
	        this.requestClose(event);
	      }
	  },

	  handleOverlayOnClick: function handleOverlayOnClick(event) {
	    if (this.shouldClose === null) {
	      this.shouldClose = true;
	    }

	    if (this.shouldClose && this.props.shouldCloseOnOverlayClick) {
	      if (this.ownerHandlesClose()) this.requestClose(event);else this.focusContent();
	    }
	    this.shouldClose = null;
	  },

	  handleContentOnClick: function handleContentOnClick() {
	    this.shouldClose = false;
	  },

	  requestClose: function requestClose(event) {
	    if (this.ownerHandlesClose()) this.props.onRequestClose(event);
	  },

	  ownerHandlesClose: function ownerHandlesClose() {
	    return this.props.onRequestClose;
	  },

	  shouldBeClosed: function shouldBeClosed() {
	    return !this.state.isOpen && !this.state.beforeClose;
	  },

	  contentHasFocus: function contentHasFocus() {
	    return document.activeElement === this.refs.content || this.refs.content.contains(document.activeElement);
	  },

	  buildClassName: function buildClassName(which, additional) {
	    var className = CLASS_NAMES[which].base;
	    if (this.state.afterOpen) className += ' ' + CLASS_NAMES[which].afterOpen;
	    if (this.state.beforeClose) className += ' ' + CLASS_NAMES[which].beforeClose;
	    return additional ? className + ' ' + additional : className;
	  },

	  render: function render() {
	    var contentStyles = this.props.className ? {} : this.props.defaultStyles.content;
	    var overlayStyles = this.props.overlayClassName ? {} : this.props.defaultStyles.overlay;

	    return this.shouldBeClosed() ? div() : div({
	      ref: "overlay",
	      className: this.buildClassName('overlay', this.props.overlayClassName),
	      style: Assign({}, overlayStyles, this.props.style.overlay || {}),
	      onClick: this.handleOverlayOnClick
	    }, div({
	      ref: "content",
	      style: Assign({}, contentStyles, this.props.style.content || {}),
	      className: this.buildClassName('content', this.props.className),
	      tabIndex: "-1",
	      onKeyDown: this.handleKeyDown,
	      onClick: this.handleContentOnClick,
	      role: this.props.role,
	      "aria-label": this.props.contentLabel
	    }, this.props.children));
	  }
	});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var findTabbable = __webpack_require__(7);
	var focusLaterElements = [];
	var modalElement = null;
	var needToFocus = false;

	function handleBlur(event) {
	  needToFocus = true;
	}

	function handleFocus(event) {
	  if (needToFocus) {
	    needToFocus = false;
	    if (!modalElement) {
	      return;
	    }
	    // need to see how jQuery shims document.on('focusin') so we don't need the
	    // setTimeout, firefox doesn't support focusin, if it did, we could focus
	    // the element outside of a setTimeout. Side-effect of this implementation
	    // is that the document.body gets focus, and then we focus our element right
	    // after, seems fine.
	    setTimeout(function () {
	      if (modalElement.contains(document.activeElement)) return;
	      var el = findTabbable(modalElement)[0] || modalElement;
	      el.focus();
	    }, 0);
	  }
	}

	exports.markForFocusLater = function () {
	  focusLaterElements.push(document.activeElement);
	};

	exports.returnFocus = function () {
	  var toFocus = null;
	  try {
	    toFocus = focusLaterElements.pop();
	    toFocus.focus();
	    return;
	  } catch (e) {
	    console.warn('You tried to return focus to ' + toFocus + ' but it is not in the DOM anymore');
	  }
	};

	exports.setupScopedFocus = function (element) {
	  modalElement = element;

	  if (window.addEventListener) {
	    window.addEventListener('blur', handleBlur, false);
	    document.addEventListener('focus', handleFocus, true);
	  } else {
	    window.attachEvent('onBlur', handleBlur);
	    document.attachEvent('onFocus', handleFocus);
	  }
	};

	exports.teardownScopedFocus = function () {
	  modalElement = null;

	  if (window.addEventListener) {
	    window.removeEventListener('blur', handleBlur);
	    document.removeEventListener('focus', handleFocus);
	  } else {
	    window.detachEvent('onBlur', handleBlur);
	    document.detachEvent('onFocus', handleFocus);
	  }
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	/*!
	 * Adapted from jQuery UI core
	 *
	 * http://jqueryui.com
	 *
	 * Copyright 2014 jQuery Foundation and other contributors
	 * Released under the MIT license.
	 * http://jquery.org/license
	 *
	 * http://api.jqueryui.com/category/ui-core/
	 */

	function focusable(element, isTabIndexNotNaN) {
	  var nodeName = element.nodeName.toLowerCase();
	  return (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : "a" === nodeName ? element.href || isTabIndexNotNaN : isTabIndexNotNaN) && visible(element);
	}

	function hidden(el) {
	  return el.offsetWidth <= 0 && el.offsetHeight <= 0 || el.style.display === 'none';
	}

	function visible(element) {
	  while (element) {
	    if (element === document.body) break;
	    if (hidden(element)) return false;
	    element = element.parentNode;
	  }
	  return true;
	}

	function tabbable(element) {
	  var tabIndex = element.getAttribute('tabindex');
	  if (tabIndex === null) tabIndex = undefined;
	  var isTabIndexNaN = isNaN(tabIndex);
	  return (isTabIndexNaN || tabIndex >= 0) && focusable(element, !isTabIndexNaN);
	}

	function findTabbableDescendants(element) {
	  return [].slice.call(element.querySelectorAll('*'), 0).filter(function (el) {
	    return tabbable(el);
	  });
	}

	module.exports = findTabbableDescendants;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var findTabbable = __webpack_require__(7);

	module.exports = function (node, event) {
	  var tabbable = findTabbable(node);
	  if (!tabbable.length) {
	    event.preventDefault();
	    return;
	  }
	  var finalTabbable = tabbable[event.shiftKey ? 0 : tabbable.length - 1];
	  var leavingFinalTabbable = finalTabbable === document.activeElement ||
	  // handle immediate shift+tab after opening with mouse
	  node === document.activeElement;
	  if (!leavingFinalTabbable) return;
	  event.preventDefault();
	  var target = tabbable[event.shiftKey ? tabbable.length - 1 : 0];
	  target.focus();
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {Array} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  switch (args.length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
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

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object),
	    nativeMax = Math.max;

	/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
	var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

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
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
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
	 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
	 *
	 * @private
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 */
	function baseRest(func, start) {
	  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);

	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    index = -1;
	    var otherArgs = Array(start + 1);
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object, customizer) {
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    assignValue(object, key, newValue === undefined ? source[key] : newValue);
	  }
	  return object;
	}

	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return baseRest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;

	    customizer = (assigner.length > 3 && typeof customizer == 'function')
	      ? (length--, customizer)
	      : undefined;

	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
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
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
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
	 * Assigns own enumerable string keyed properties of source objects to the
	 * destination object. Source objects are applied from left to right.
	 * Subsequent sources overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @since 0.10.0
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @see _.assignIn
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 * }
	 *
	 * function Bar() {
	 *   this.c = 3;
	 * }
	 *
	 * Foo.prototype.b = 2;
	 * Bar.prototype.d = 4;
	 *
	 * _.assign({ 'a': 0 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3 }
	 */
	var assign = createAssigner(function(object, source) {
	  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
	    copyObject(source, keys(source), object);
	    return;
	  }
	  for (var key in source) {
	    if (hasOwnProperty.call(source, key)) {
	      assignValue(object, key, source[key]);
	    }
	  }
	});

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

	module.exports = assign;


/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var _element = typeof document !== 'undefined' ? document.body : null;

	function setElement(element) {
	  if (typeof element === 'string') {
	    var el = document.querySelectorAll(element);
	    element = 'length' in el ? el[0] : el;
	  }
	  _element = element || _element;
	  return _element;
	}

	function hide(appElement) {
	  validateElement(appElement);
	  (appElement || _element).setAttribute('aria-hidden', 'true');
	}

	function show(appElement) {
	  validateElement(appElement);
	  (appElement || _element).removeAttribute('aria-hidden');
	}

	function toggle(shouldHide, appElement) {
	  if (shouldHide) hide(appElement);else show(appElement);
	}

	function validateElement(appElement) {
	  if (!appElement && !_element) throw new Error('react-modal: You must set an element with `Modal.setAppElement(el)` to make this accessible');
	}

	function resetForTesting() {
	  _element = document.body;
	}

	exports.toggle = toggle;
	exports.setElement = setElement;
	exports.show = show;
	exports.hide = hide;
	exports.resetForTesting = resetForTesting;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function(opts) {
	  return new ElementClass(opts)
	}

	function indexOf(arr, prop) {
	  if (arr.indexOf) return arr.indexOf(prop)
	  for (var i = 0, len = arr.length; i < len; i++)
	    if (arr[i] === prop) return i
	  return -1
	}

	function ElementClass(opts) {
	  if (!(this instanceof ElementClass)) return new ElementClass(opts)
	  var self = this
	  if (!opts) opts = {}

	  // similar doing instanceof HTMLElement but works in IE8
	  if (opts.nodeType) opts = {el: opts}

	  this.opts = opts
	  this.el = opts.el || document.body
	  if (typeof this.el !== 'object') this.el = document.querySelector(this.el)
	}

	ElementClass.prototype.add = function(className) {
	  var el = this.el
	  if (!el) return
	  if (el.className === "") return el.className = className
	  var classes = el.className.split(' ')
	  if (indexOf(classes, className) > -1) return classes
	  classes.push(className)
	  el.className = classes.join(' ')
	  return classes
	}

	ElementClass.prototype.remove = function(className) {
	  var el = this.el
	  if (!el) return
	  if (el.className === "") return
	  var classes = el.className.split(' ')
	  var idx = indexOf(classes, className)
	  if (idx > -1) classes.splice(idx, 1)
	  el.className = classes.join(' ')
	  return classes
	}

	ElementClass.prototype.has = function(className) {
	  var el = this.el
	  if (!el) return
	  var classes = el.className.split(' ')
	  return indexOf(classes, className) > -1
	}

	ElementClass.prototype.toggle = function(className) {
	  var el = this.el
	  if (!el) return
	  if (this.has(className)) this.remove(className)
	  else this.add(className)
	}


/***/ }
/******/ ])
});
;