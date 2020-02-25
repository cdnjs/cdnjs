(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('leaflet'), require('react-dom')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'leaflet', 'react-dom'], factory) :
	(global = global || self, factory(global.ReactLeaflet = {}, global.React, global.L, global.ReactDOM));
}(this, (function (exports, React, leaflet, reactDom) { 'use strict';

	var React__default = 'default' in React ? React['default'] : React;

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _extends_1 = createCommonjsModule(function (module) {
	function _extends() {
	  module.exports = _extends = Object.assign || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	module.exports = _extends;
	});

	var reactIs_development = createCommonjsModule(function (module, exports) {



	{
	  (function() {

	Object.defineProperty(exports, '__esModule', { value: true });

	// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
	// nor polyfill, then a plain number is used for performance.
	var hasSymbol = typeof Symbol === 'function' && Symbol.for;
	var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
	var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
	var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
	var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
	var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
	var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
	var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
	// (unstable) APIs that have been removed. Can we remove the symbols?

	var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
	var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
	var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
	var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
	var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
	var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
	var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
	var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
	var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
	var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

	function isValidElementType(type) {
	  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
	  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE);
	}

	/**
	 * Forked from fbjs/warning:
	 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
	 *
	 * Only change is we use console.warn instead of console.error,
	 * and do nothing when 'console' is not supported.
	 * This really simplifies the code.
	 * ---
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */
	var lowPriorityWarningWithoutStack = function () {};

	{
	  var printWarning = function (format) {
	    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });

	    if (typeof console !== 'undefined') {
	      console.warn(message);
	    }

	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  lowPriorityWarningWithoutStack = function (condition, format) {
	    if (format === undefined) {
	      throw new Error('`lowPriorityWarningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(void 0, [format].concat(args));
	    }
	  };
	}

	var lowPriorityWarningWithoutStack$1 = lowPriorityWarningWithoutStack;

	function typeOf(object) {
	  if (typeof object === 'object' && object !== null) {
	    var $$typeof = object.$$typeof;

	    switch ($$typeof) {
	      case REACT_ELEMENT_TYPE:
	        var type = object.type;

	        switch (type) {
	          case REACT_ASYNC_MODE_TYPE:
	          case REACT_CONCURRENT_MODE_TYPE:
	          case REACT_FRAGMENT_TYPE:
	          case REACT_PROFILER_TYPE:
	          case REACT_STRICT_MODE_TYPE:
	          case REACT_SUSPENSE_TYPE:
	            return type;

	          default:
	            var $$typeofType = type && type.$$typeof;

	            switch ($$typeofType) {
	              case REACT_CONTEXT_TYPE:
	              case REACT_FORWARD_REF_TYPE:
	              case REACT_LAZY_TYPE:
	              case REACT_MEMO_TYPE:
	              case REACT_PROVIDER_TYPE:
	                return $$typeofType;

	              default:
	                return $$typeof;
	            }

	        }

	      case REACT_PORTAL_TYPE:
	        return $$typeof;
	    }
	  }

	  return undefined;
	} // AsyncMode is deprecated along with isAsyncMode

	var AsyncMode = REACT_ASYNC_MODE_TYPE;
	var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
	var ContextConsumer = REACT_CONTEXT_TYPE;
	var ContextProvider = REACT_PROVIDER_TYPE;
	var Element = REACT_ELEMENT_TYPE;
	var ForwardRef = REACT_FORWARD_REF_TYPE;
	var Fragment = REACT_FRAGMENT_TYPE;
	var Lazy = REACT_LAZY_TYPE;
	var Memo = REACT_MEMO_TYPE;
	var Portal = REACT_PORTAL_TYPE;
	var Profiler = REACT_PROFILER_TYPE;
	var StrictMode = REACT_STRICT_MODE_TYPE;
	var Suspense = REACT_SUSPENSE_TYPE;
	var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

	function isAsyncMode(object) {
	  {
	    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
	      hasWarnedAboutDeprecatedIsAsyncMode = true;
	      lowPriorityWarningWithoutStack$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
	    }
	  }

	  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
	}
	function isConcurrentMode(object) {
	  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
	}
	function isContextConsumer(object) {
	  return typeOf(object) === REACT_CONTEXT_TYPE;
	}
	function isContextProvider(object) {
	  return typeOf(object) === REACT_PROVIDER_TYPE;
	}
	function isElement(object) {
	  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function isForwardRef(object) {
	  return typeOf(object) === REACT_FORWARD_REF_TYPE;
	}
	function isFragment(object) {
	  return typeOf(object) === REACT_FRAGMENT_TYPE;
	}
	function isLazy(object) {
	  return typeOf(object) === REACT_LAZY_TYPE;
	}
	function isMemo(object) {
	  return typeOf(object) === REACT_MEMO_TYPE;
	}
	function isPortal(object) {
	  return typeOf(object) === REACT_PORTAL_TYPE;
	}
	function isProfiler(object) {
	  return typeOf(object) === REACT_PROFILER_TYPE;
	}
	function isStrictMode(object) {
	  return typeOf(object) === REACT_STRICT_MODE_TYPE;
	}
	function isSuspense(object) {
	  return typeOf(object) === REACT_SUSPENSE_TYPE;
	}

	exports.typeOf = typeOf;
	exports.AsyncMode = AsyncMode;
	exports.ConcurrentMode = ConcurrentMode;
	exports.ContextConsumer = ContextConsumer;
	exports.ContextProvider = ContextProvider;
	exports.Element = Element;
	exports.ForwardRef = ForwardRef;
	exports.Fragment = Fragment;
	exports.Lazy = Lazy;
	exports.Memo = Memo;
	exports.Portal = Portal;
	exports.Profiler = Profiler;
	exports.StrictMode = StrictMode;
	exports.Suspense = Suspense;
	exports.isValidElementType = isValidElementType;
	exports.isAsyncMode = isAsyncMode;
	exports.isConcurrentMode = isConcurrentMode;
	exports.isContextConsumer = isContextConsumer;
	exports.isContextProvider = isContextProvider;
	exports.isElement = isElement;
	exports.isForwardRef = isForwardRef;
	exports.isFragment = isFragment;
	exports.isLazy = isLazy;
	exports.isMemo = isMemo;
	exports.isPortal = isPortal;
	exports.isProfiler = isProfiler;
	exports.isStrictMode = isStrictMode;
	exports.isSuspense = isSuspense;
	  })();
	}
	});

	unwrapExports(reactIs_development);
	var reactIs_development_1 = reactIs_development.typeOf;
	var reactIs_development_2 = reactIs_development.AsyncMode;
	var reactIs_development_3 = reactIs_development.ConcurrentMode;
	var reactIs_development_4 = reactIs_development.ContextConsumer;
	var reactIs_development_5 = reactIs_development.ContextProvider;
	var reactIs_development_6 = reactIs_development.Element;
	var reactIs_development_7 = reactIs_development.ForwardRef;
	var reactIs_development_8 = reactIs_development.Fragment;
	var reactIs_development_9 = reactIs_development.Lazy;
	var reactIs_development_10 = reactIs_development.Memo;
	var reactIs_development_11 = reactIs_development.Portal;
	var reactIs_development_12 = reactIs_development.Profiler;
	var reactIs_development_13 = reactIs_development.StrictMode;
	var reactIs_development_14 = reactIs_development.Suspense;
	var reactIs_development_15 = reactIs_development.isValidElementType;
	var reactIs_development_16 = reactIs_development.isAsyncMode;
	var reactIs_development_17 = reactIs_development.isConcurrentMode;
	var reactIs_development_18 = reactIs_development.isContextConsumer;
	var reactIs_development_19 = reactIs_development.isContextProvider;
	var reactIs_development_20 = reactIs_development.isElement;
	var reactIs_development_21 = reactIs_development.isForwardRef;
	var reactIs_development_22 = reactIs_development.isFragment;
	var reactIs_development_23 = reactIs_development.isLazy;
	var reactIs_development_24 = reactIs_development.isMemo;
	var reactIs_development_25 = reactIs_development.isPortal;
	var reactIs_development_26 = reactIs_development.isProfiler;
	var reactIs_development_27 = reactIs_development.isStrictMode;
	var reactIs_development_28 = reactIs_development.isSuspense;

	var reactIs = createCommonjsModule(function (module) {

	{
	  module.exports = reactIs_development;
	}
	});

	/**
	 * Copyright 2015, Yahoo! Inc.
	 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
	 */
	var REACT_STATICS = {
	  childContextTypes: true,
	  contextType: true,
	  contextTypes: true,
	  defaultProps: true,
	  displayName: true,
	  getDefaultProps: true,
	  getDerivedStateFromError: true,
	  getDerivedStateFromProps: true,
	  mixins: true,
	  propTypes: true,
	  type: true
	};
	var KNOWN_STATICS = {
	  name: true,
	  length: true,
	  prototype: true,
	  caller: true,
	  callee: true,
	  arguments: true,
	  arity: true
	};
	var FORWARD_REF_STATICS = {
	  '$$typeof': true,
	  render: true,
	  defaultProps: true,
	  displayName: true,
	  propTypes: true
	};
	var MEMO_STATICS = {
	  '$$typeof': true,
	  compare: true,
	  defaultProps: true,
	  displayName: true,
	  propTypes: true,
	  type: true
	};
	var TYPE_STATICS = {};
	TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;

	function getStatics(component) {
	  if (reactIs.isMemo(component)) {
	    return MEMO_STATICS;
	  }

	  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
	}

	var defineProperty = Object.defineProperty;
	var getOwnPropertyNames = Object.getOwnPropertyNames;
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var getPrototypeOf = Object.getPrototypeOf;
	var objectPrototype = Object.prototype;
	function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
	  if (typeof sourceComponent !== 'string') {
	    // don't hoist over string (html) components
	    if (objectPrototype) {
	      var inheritedComponent = getPrototypeOf(sourceComponent);

	      if (inheritedComponent && inheritedComponent !== objectPrototype) {
	        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
	      }
	    }

	    var keys = getOwnPropertyNames(sourceComponent);

	    if (getOwnPropertySymbols) {
	      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
	    }

	    var targetStatics = getStatics(targetComponent);
	    var sourceStatics = getStatics(sourceComponent);

	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i];

	      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
	        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

	        try {
	          // Avoid failures from read-only properties
	          defineProperty(targetComponent, key, descriptor);
	        } catch (e) {}
	      }
	    }
	  }

	  return targetComponent;
	}

	var hoistNonReactStatics_cjs = hoistNonReactStatics;

	var leafletContext = React.createContext({});
	var useLeaflet = function useLeaflet() {
	  return React.useContext(leafletContext);
	};
	var LeafletConsumer = leafletContext.Consumer;
	var LeafletProvider = leafletContext.Provider;
	var withLeaflet = function withLeaflet(WrappedComponent) {
	  var WithLeafletComponent = function WithLeafletComponent(props, ref) {
	    return React__default.createElement(LeafletConsumer, null, function (leaflet) {
	      return React__default.createElement(WrappedComponent, _extends_1({}, props, {
	        leaflet: leaflet,
	        ref: ref
	      }));
	    });
	  };

	  var name = // flowlint-next-line sketchy-null-string:off
	  WrappedComponent.displayName || WrappedComponent.name || 'Component';
	  WithLeafletComponent.displayName = "Leaflet(".concat(name, ")");
	  var LeafletComponent = React.forwardRef(WithLeafletComponent);
	  hoistNonReactStatics_cjs(LeafletComponent, WrappedComponent);
	  return LeafletComponent;
	};

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	var _typeof_1 = createCommonjsModule(function (module) {
	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    module.exports = _typeof = function _typeof(obj) {
	      return typeof obj;
	    };
	  } else {
	    module.exports = _typeof = function _typeof(obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	module.exports = _typeof;
	});

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	var assertThisInitialized = _assertThisInitialized;

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
	    return call;
	  }

	  return assertThisInitialized(self);
	}

	var possibleConstructorReturn = _possibleConstructorReturn;

	var getPrototypeOf$1 = createCommonjsModule(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf;
	});

	var setPrototypeOf = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	});

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) setPrototypeOf(subClass, superClass);
	}

	var inherits = _inherits;

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	}

	var defineProperty$1 = _defineProperty;

	var MapControl =
	/*#__PURE__*/
	function (_Component) {
	  inherits(MapControl, _Component);

	  function MapControl(props) {
	    var _this;

	    classCallCheck(this, MapControl);

	    _this = possibleConstructorReturn(this, getPrototypeOf$1(MapControl).call(this, props));

	    defineProperty$1(assertThisInitialized(_this), "leafletElement", void 0);

	    _this.leafletElement = _this.createLeafletElement(_this.props);
	    return _this;
	  }

	  createClass(MapControl, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(_props) {
	      throw new Error('createLeafletElement() must be implemented');
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      if (toProps.position !== fromProps.position) {
	        this.leafletElement.setPosition(toProps.position);
	      }
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.leafletElement.addTo(this.props.leaflet.map);
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(prevProps) {
	      this.updateLeafletElement(prevProps, this.props);
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.leafletElement.remove();
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return null;
	    }
	  }]);

	  return MapControl;
	}(React.Component);

	var AttributionControl =
	/*#__PURE__*/
	function (_MapControl) {
	  inherits(AttributionControl, _MapControl);

	  function AttributionControl() {
	    classCallCheck(this, AttributionControl);

	    return possibleConstructorReturn(this, getPrototypeOf$1(AttributionControl).apply(this, arguments));
	  }

	  createClass(AttributionControl, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      return new leaflet.Control.Attribution(props);
	    }
	  }]);

	  return AttributionControl;
	}(MapControl);

	var AttributionControl$1 = withLeaflet(AttributionControl);

	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;

	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }

	  return target;
	}

	var objectWithoutPropertiesLoose = _objectWithoutPropertiesLoose;

	function _objectWithoutProperties(source, excluded) {
	  if (source == null) return {};
	  var target = objectWithoutPropertiesLoose(source, excluded);
	  var key, i;

	  if (Object.getOwnPropertySymbols) {
	    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

	    for (i = 0; i < sourceSymbolKeys.length; i++) {
	      key = sourceSymbolKeys[i];
	      if (excluded.indexOf(key) >= 0) continue;
	      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
	      target[key] = source[key];
	    }
	  }

	  return target;
	}

	var objectWithoutProperties = _objectWithoutProperties;

	function _superPropBase(object, property) {
	  while (!Object.prototype.hasOwnProperty.call(object, property)) {
	    object = getPrototypeOf$1(object);
	    if (object === null) break;
	  }

	  return object;
	}

	var superPropBase = _superPropBase;

	var get = createCommonjsModule(function (module) {
	function _get(target, property, receiver) {
	  if (typeof Reflect !== "undefined" && Reflect.get) {
	    module.exports = _get = Reflect.get;
	  } else {
	    module.exports = _get = function _get(target, property, receiver) {
	      var base = superPropBase(target, property);
	      if (!base) return;
	      var desc = Object.getOwnPropertyDescriptor(base, property);

	      if (desc.get) {
	        return desc.get.call(receiver);
	      }

	      return desc.value;
	    };
	  }

	  return _get(target, property, receiver || target);
	}

	module.exports = _get;
	});

	// do not edit .js files directly - edit src/index.jst



	var fastDeepEqual = function equal(a, b) {
	  if (a === b) return true;

	  if (a && b && typeof a == 'object' && typeof b == 'object') {
	    if (a.constructor !== b.constructor) return false;

	    var length, i, keys;
	    if (Array.isArray(a)) {
	      length = a.length;
	      if (length != b.length) return false;
	      for (i = length; i-- !== 0;)
	        if (!equal(a[i], b[i])) return false;
	      return true;
	    }



	    if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
	    if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
	    if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();

	    keys = Object.keys(a);
	    length = keys.length;
	    if (length !== Object.keys(b).length) return false;

	    for (i = length; i-- !== 0;)
	      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

	    for (i = length; i-- !== 0;) {
	      var key = keys[i];

	      if (!equal(a[key], b[key])) return false;
	    }

	    return true;
	  }

	  // true if both NaN, false otherwise
	  return a!==a && b!==b;
	};

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
	var EVENTS_RE = /^on(.+)$/i;

	var MapEvented =
	/*#__PURE__*/
	function (_Component) {
	  inherits(MapEvented, _Component);

	  function MapEvented(props) {
	    var _this;

	    classCallCheck(this, MapEvented);

	    _this = possibleConstructorReturn(this, getPrototypeOf$1(MapEvented).call(this, props));

	    defineProperty$1(assertThisInitialized(_this), "_leafletEvents", void 0);

	    defineProperty$1(assertThisInitialized(_this), "leafletElement", void 0);

	    _this._leafletEvents = _this.extractLeafletEvents(props);
	    return _this;
	  }

	  createClass(MapEvented, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.bindLeafletEvents(this._leafletEvents);
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(_prevProps) {
	      this._leafletEvents = this.bindLeafletEvents(this.extractLeafletEvents(this.props), this._leafletEvents);
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      var _this2 = this;

	      var el = this.leafletElement;
	      if (!el) return;
	      Object.keys(this._leafletEvents).forEach(function (ev) {
	        el.off(ev, _this2._leafletEvents[ev]);
	      });
	    }
	  }, {
	    key: "extractLeafletEvents",
	    value: function extractLeafletEvents(props) {
	      return Object.keys(props).reduce(function (res, prop) {
	        if (EVENTS_RE.test(prop)) {
	          if (props[prop] != null) {
	            var _key = prop.replace(EVENTS_RE, function (match, p) {
	              return p.toLowerCase();
	            });

	            res[_key] = props[prop];
	          }
	        }

	        return res;
	      }, {});
	    }
	  }, {
	    key: "bindLeafletEvents",
	    value: function bindLeafletEvents() {
	      var next = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var prev = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	      var el = this.leafletElement;
	      if (el == null || el.on == null) return {};

	      var diff = _objectSpread({}, prev);

	      Object.keys(prev).forEach(function (ev) {
	        if (next[ev] == null || prev[ev] !== next[ev]) {
	          delete diff[ev];
	          el.off(ev, prev[ev]);
	        }
	      });
	      Object.keys(next).forEach(function (ev) {
	        if (prev[ev] == null || next[ev] !== prev[ev]) {
	          diff[ev] = next[ev];
	          el.on(ev, next[ev]);
	        }
	      });
	      return diff;
	    }
	  }, {
	    key: "fireLeafletEvent",
	    value: function fireLeafletEvent(type, data) {
	      var el = this.leafletElement;
	      if (el) el.fire(type, data);
	    }
	  }]);

	  return MapEvented;
	}(React.Component);

	function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var MapComponent =
	/*#__PURE__*/
	function (_MapEvented) {
	  inherits(MapComponent, _MapEvented);

	  function MapComponent() {
	    classCallCheck(this, MapComponent);

	    return possibleConstructorReturn(this, getPrototypeOf$1(MapComponent).apply(this, arguments));
	  }

	  createClass(MapComponent, [{
	    key: "getOptions",
	    value: function getOptions(props) {
	      if (props.pane != null) {
	        return props;
	      }

	      if (props.leaflet != null && props.leaflet.pane != null) {
	        return _objectSpread$1({}, props, {
	          pane: props.leaflet.pane
	        });
	      }

	      return props;
	    }
	  }]);

	  return MapComponent;
	}(MapEvented);

	var MapLayer =
	/*#__PURE__*/
	function (_MapComponent) {
	  inherits(MapLayer, _MapComponent);

	  function MapLayer(props) {
	    var _this;

	    classCallCheck(this, MapLayer);

	    _this = possibleConstructorReturn(this, getPrototypeOf$1(MapLayer).call(this, props));

	    defineProperty$1(assertThisInitialized(_this), "contextValue", void 0);

	    defineProperty$1(assertThisInitialized(_this), "leafletElement", void 0);

	    _this.leafletElement = _this.createLeafletElement(props);
	    return _this;
	  }

	  createClass(MapLayer, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(_props) {
	      throw new Error('createLeafletElement() must be implemented');
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(_fromProps, _toProps) {}
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      get(getPrototypeOf$1(MapLayer.prototype), "componentDidMount", this).call(this);

	      this.layerContainer.addLayer(this.leafletElement);
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(prevProps) {
	      get(getPrototypeOf$1(MapLayer.prototype), "componentDidUpdate", this).call(this, prevProps);

	      if (this.props.attribution !== prevProps.attribution) {
	        var map = this.props.leaflet.map;

	        if (map != null && map.attributionControl != null) {
	          map.attributionControl.removeAttribution(prevProps.attribution);
	          map.attributionControl.addAttribution(this.props.attribution);
	        }
	      }

	      this.updateLeafletElement(prevProps, this.props);
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      get(getPrototypeOf$1(MapLayer.prototype), "componentWillUnmount", this).call(this);

	      this.layerContainer.removeLayer(this.leafletElement);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var children = this.props.children;

	      if (children == null) {
	        return null;
	      }

	      return this.contextValue == null ? React__default.createElement(React.Fragment, null, children) : React__default.createElement(LeafletProvider, {
	        value: this.contextValue
	      }, children);
	    }
	  }, {
	    key: "layerContainer",
	    get: function get() {
	      return this.props.leaflet.layerContainer || this.props.leaflet.map;
	    }
	  }]);

	  return MapLayer;
	}(MapComponent);

	function pick(object, keys) {
	  return keys.reduce(function (obj, key) {
	    if (typeof object[key] !== 'undefined') {
	      obj[key] = object[key];
	    }

	    return obj;
	  }, {});
	}

	function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
	var OPTIONS = ['stroke', 'color', 'weight', 'opacity', 'lineCap', 'lineJoin', 'dashArray', 'dashOffset', 'fill', 'fillColor', 'fillOpacity', 'fillRule', 'bubblingMouseEvents', 'renderer', 'className', // Interactive Layer
	'interactive', // Layer
	'pane', 'attribution'];

	var Path =
	/*#__PURE__*/
	function (_MapLayer) {
	  inherits(Path, _MapLayer);

	  function Path(props) {
	    var _this;

	    classCallCheck(this, Path);

	    _this = possibleConstructorReturn(this, getPrototypeOf$1(Path).call(this, props));

	    if (_this.contextValue == null) {
	      _this.contextValue = _objectSpread$2({}, props.leaflet, {
	        popupContainer: _this.leafletElement
	      });
	    }

	    return _this;
	  }

	  createClass(Path, [{
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(prevProps) {
	      get(getPrototypeOf$1(Path.prototype), "componentDidUpdate", this).call(this, prevProps);

	      this.setStyleIfChanged(prevProps, this.props);
	    }
	  }, {
	    key: "getPathOptions",
	    value: function getPathOptions(props) {
	      return pick(props, OPTIONS);
	    }
	  }, {
	    key: "setStyle",
	    value: function setStyle() {
	      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      this.leafletElement.setStyle(options);
	    }
	  }, {
	    key: "setStyleIfChanged",
	    value: function setStyleIfChanged(fromProps, toProps) {
	      var nextStyle = this.getPathOptions(toProps);

	      if (!fastDeepEqual(nextStyle, this.getPathOptions(fromProps))) {
	        this.setStyle(nextStyle);
	      }
	    }
	  }]);

	  return Path;
	}(MapLayer);

	var Circle =
	/*#__PURE__*/
	function (_Path) {
	  inherits(Circle, _Path);

	  function Circle() {
	    classCallCheck(this, Circle);

	    return possibleConstructorReturn(this, getPrototypeOf$1(Circle).apply(this, arguments));
	  }

	  createClass(Circle, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      var center = props.center,
	          radius = props.radius,
	          options = objectWithoutProperties(props, ["center", "radius"]);

	      return new leaflet.Circle(center, radius, this.getOptions(options));
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      if (toProps.center !== fromProps.center) {
	        this.leafletElement.setLatLng(toProps.center);
	      }

	      if (toProps.radius !== fromProps.radius) {
	        this.leafletElement.setRadius(toProps.radius);
	      }
	    }
	  }]);

	  return Circle;
	}(Path);

	var Circle$1 = withLeaflet(Circle);

	function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var CircleMarker =
	/*#__PURE__*/
	function (_Path) {
	  inherits(CircleMarker, _Path);

	  function CircleMarker() {
	    classCallCheck(this, CircleMarker);

	    return possibleConstructorReturn(this, getPrototypeOf$1(CircleMarker).apply(this, arguments));
	  }

	  createClass(CircleMarker, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      var el = new leaflet.CircleMarker(props.center, this.getOptions(props));
	      this.contextValue = _objectSpread$3({}, props.leaflet, {
	        popupContainer: el
	      });
	      return el;
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      if (toProps.center !== fromProps.center) {
	        this.leafletElement.setLatLng(toProps.center);
	      }

	      if (toProps.radius !== fromProps.radius) {
	        this.leafletElement.setRadius(toProps.radius);
	      }
	    }
	  }]);

	  return CircleMarker;
	}(Path);

	var CircleMarker$1 = withLeaflet(CircleMarker);

	var splitClassName = function splitClassName() {
	  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	  return className.split(' ').filter(Boolean);
	};

	var addClassName = function addClassName(container, className) {
	  splitClassName(className).forEach(function (cls) {
	    leaflet.DomUtil.addClass(container, cls);
	  });
	};
	var removeClassName = function removeClassName(container, className) {
	  splitClassName(className).forEach(function (cls) {
	    leaflet.DomUtil.removeClass(container, cls);
	  });
	};
	var updateClassName = (function (container, prevClassName, nextClassName) {
	  if (container != null && nextClassName !== prevClassName) {
	    if (prevClassName != null && prevClassName.length > 0) {
	      removeClassName(container, prevClassName);
	    }

	    if (nextClassName != null && nextClassName.length > 0) {
	      addClassName(container, nextClassName);
	    }
	  }
	});

	var DivOverlay =
	/*#__PURE__*/
	function (_MapComponent) {
	  inherits(DivOverlay, _MapComponent);

	  function DivOverlay(props) {
	    var _this;

	    classCallCheck(this, DivOverlay);

	    _this = possibleConstructorReturn(this, getPrototypeOf$1(DivOverlay).call(this, props));

	    defineProperty$1(assertThisInitialized(_this), "onClose", function () {
	      if (_this.props.onClose) {
	        _this.props.onClose();
	      }
	    });

	    defineProperty$1(assertThisInitialized(_this), "onOpen", function () {
	      _this.forceUpdate(); // Re-render now that leafletElement is created


	      if (_this.props.onOpen) {
	        _this.props.onOpen();
	      }
	    });

	    _this.leafletElement = _this.createLeafletElement(props);
	    return _this;
	  }

	  createClass(DivOverlay, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(_props) {
	      throw new Error('createLeafletElement() must be implemented');
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(_prevProps, _props) {}
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(prevProps) {
	      updateClassName(this.leafletElement._container, prevProps.className, this.props.className);
	      this.updateLeafletElement(prevProps, this.props);

	      if (this.leafletElement.isOpen()) {
	        this.leafletElement.update();
	        this.onRender();
	      }
	    }
	  }, {
	    key: "onRender",
	    value: function onRender() {}
	  }, {
	    key: "render",
	    value: function render() {
	      if (this.leafletElement._contentNode) {
	        return reactDom.createPortal(this.props.children, this.leafletElement._contentNode);
	      }

	      return null;
	    }
	  }]);

	  return DivOverlay;
	}(MapComponent);

	function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var FeatureGroup =
	/*#__PURE__*/
	function (_Path) {
	  inherits(FeatureGroup, _Path);

	  function FeatureGroup() {
	    classCallCheck(this, FeatureGroup);

	    return possibleConstructorReturn(this, getPrototypeOf$1(FeatureGroup).apply(this, arguments));
	  }

	  createClass(FeatureGroup, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      var el = new leaflet.FeatureGroup(this.getOptions(props));
	      this.contextValue = _objectSpread$4({}, props.leaflet, {
	        layerContainer: el,
	        popupContainer: el
	      });
	      return el;
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      get(getPrototypeOf$1(FeatureGroup.prototype), "componentDidMount", this).call(this);

	      this.setStyle(this.props);
	    }
	  }]);

	  return FeatureGroup;
	}(Path);

	var FeatureGroup$1 = withLeaflet(FeatureGroup);

	var GeoJSON =
	/*#__PURE__*/
	function (_Path) {
	  inherits(GeoJSON, _Path);

	  function GeoJSON() {
	    classCallCheck(this, GeoJSON);

	    return possibleConstructorReturn(this, getPrototypeOf$1(GeoJSON).apply(this, arguments));
	  }

	  createClass(GeoJSON, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      return new leaflet.GeoJSON(props.data, this.getOptions(props));
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      if (typeof toProps.style === 'function') {
	        this.leafletElement.setStyle(toProps.style);
	      } else {
	        this.setStyleIfChanged(fromProps, toProps);
	      }
	    }
	  }]);

	  return GeoJSON;
	}(Path);

	var GeoJSON$1 = withLeaflet(GeoJSON);

	function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var GridLayer =
	/*#__PURE__*/
	function (_MapLayer) {
	  inherits(GridLayer, _MapLayer);

	  function GridLayer() {
	    classCallCheck(this, GridLayer);

	    return possibleConstructorReturn(this, getPrototypeOf$1(GridLayer).apply(this, arguments));
	  }

	  createClass(GridLayer, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      return new leaflet.GridLayer(this.getOptions(props));
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      var opacity = toProps.opacity,
	          zIndex = toProps.zIndex;

	      if (opacity !== fromProps.opacity) {
	        this.leafletElement.setOpacity(opacity);
	      }

	      if (zIndex !== fromProps.zIndex) {
	        this.leafletElement.setZIndex(zIndex);
	      }
	    }
	  }, {
	    key: "getOptions",
	    value: function getOptions(props) {
	      var options = get(getPrototypeOf$1(GridLayer.prototype), "getOptions", this).call(this, props);

	      return props.leaflet.map == null ? options : // $FlowFixMe: object spread type
	      _objectSpread$5({
	        maxZoom: props.leaflet.map.options.maxZoom,
	        minZoom: props.leaflet.map.options.minZoom
	      }, options);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return null;
	    }
	  }]);

	  return GridLayer;
	}(MapLayer);

	function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var ImageOverlay =
	/*#__PURE__*/
	function (_MapLayer) {
	  inherits(ImageOverlay, _MapLayer);

	  function ImageOverlay() {
	    classCallCheck(this, ImageOverlay);

	    return possibleConstructorReturn(this, getPrototypeOf$1(ImageOverlay).apply(this, arguments));
	  }

	  createClass(ImageOverlay, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      var el = new leaflet.ImageOverlay(props.url, props.bounds, this.getOptions(props));
	      this.contextValue = _objectSpread$6({}, props.leaflet, {
	        popupContainer: el
	      });
	      return el;
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      if (toProps.url !== fromProps.url) {
	        this.leafletElement.setUrl(toProps.url);
	      }

	      if (toProps.bounds !== fromProps.bounds) {
	        this.leafletElement.setBounds(leaflet.latLngBounds(toProps.bounds));
	      }

	      if (toProps.opacity !== fromProps.opacity) {
	        this.leafletElement.setOpacity(toProps.opacity);
	      }

	      if (toProps.zIndex !== fromProps.zIndex) {
	        this.leafletElement.setZIndex(toProps.zIndex);
	      }
	    }
	  }]);

	  return ImageOverlay;
	}(MapLayer);

	var ImageOverlay$1 = withLeaflet(ImageOverlay);

	function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$7(Object(source), true).forEach(function (key) { defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var LayerGroup =
	/*#__PURE__*/
	function (_MapLayer) {
	  inherits(LayerGroup, _MapLayer);

	  function LayerGroup() {
	    classCallCheck(this, LayerGroup);

	    return possibleConstructorReturn(this, getPrototypeOf$1(LayerGroup).apply(this, arguments));
	  }

	  createClass(LayerGroup, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      var el = new leaflet.LayerGroup([], this.getOptions(props));
	      this.contextValue = _objectSpread$7({}, props.leaflet, {
	        layerContainer: el
	      });
	      return el;
	    }
	  }]);

	  return LayerGroup;
	}(MapLayer);

	var LayerGroup$1 = withLeaflet(LayerGroup);

	function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$8(Object(source), true).forEach(function (key) { defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
	// Abtract class for layer container, extended by BaseLayer and Overlay
	var ControlledLayer =
	/*#__PURE__*/
	function (_Component) {
	  inherits(ControlledLayer, _Component);

	  function ControlledLayer() {
	    var _getPrototypeOf2;

	    var _this;

	    classCallCheck(this, ControlledLayer);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf$1(ControlledLayer)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    defineProperty$1(assertThisInitialized(_this), "contextValue", void 0);

	    defineProperty$1(assertThisInitialized(_this), "layer", void 0);

	    return _this;
	  }

	  createClass(ControlledLayer, [{
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(_ref) {
	      var checked = _ref.checked;

	      if (this.props.leaflet.map == null) {
	        return;
	      } // Handle dynamically (un)checking the layer => adding/removing from the map


	      if (this.props.checked === true && (checked == null || checked === false)) {
	        this.props.leaflet.map.addLayer(this.layer);
	      } else if (checked === true && (this.props.checked == null || this.props.checked === false)) {
	        this.props.leaflet.map.removeLayer(this.layer);
	      }
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.props.removeLayerControl(this.layer);
	    }
	  }, {
	    key: "addLayer",
	    value: function addLayer() {
	      throw new Error('Must be implemented in extending class');
	    }
	  }, {
	    key: "removeLayer",
	    value: function removeLayer(layer) {
	      this.props.removeLayer(layer);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var children = this.props.children;
	      return children ? React__default.createElement(LeafletProvider, {
	        value: this.contextValue
	      }, children) : null;
	    }
	  }]);

	  return ControlledLayer;
	}(React.Component);

	var BaseLayer =
	/*#__PURE__*/
	function (_ControlledLayer) {
	  inherits(BaseLayer, _ControlledLayer);

	  function BaseLayer(props) {
	    var _this2;

	    classCallCheck(this, BaseLayer);

	    _this2 = possibleConstructorReturn(this, getPrototypeOf$1(BaseLayer).call(this, props));

	    defineProperty$1(assertThisInitialized(_this2), "addLayer", function (layer) {
	      _this2.layer = layer; // Keep layer reference to handle dynamic changes of props

	      var _this2$props = _this2.props,
	          addBaseLayer = _this2$props.addBaseLayer,
	          checked = _this2$props.checked,
	          name = _this2$props.name;
	      addBaseLayer(layer, name, checked);
	    });

	    _this2.contextValue = _objectSpread$8({}, props.leaflet, {
	      layerContainer: {
	        addLayer: _this2.addLayer.bind(assertThisInitialized(_this2)),
	        removeLayer: _this2.removeLayer.bind(assertThisInitialized(_this2))
	      }
	    });
	    return _this2;
	  }

	  return BaseLayer;
	}(ControlledLayer);

	var Overlay =
	/*#__PURE__*/
	function (_ControlledLayer2) {
	  inherits(Overlay, _ControlledLayer2);

	  function Overlay(props) {
	    var _this3;

	    classCallCheck(this, Overlay);

	    _this3 = possibleConstructorReturn(this, getPrototypeOf$1(Overlay).call(this, props));

	    defineProperty$1(assertThisInitialized(_this3), "addLayer", function (layer) {
	      _this3.layer = layer; // Keep layer reference to handle dynamic changes of props

	      var _this3$props = _this3.props,
	          addOverlay = _this3$props.addOverlay,
	          checked = _this3$props.checked,
	          name = _this3$props.name;
	      addOverlay(layer, name, checked);
	    });

	    _this3.contextValue = _objectSpread$8({}, props.leaflet, {
	      layerContainer: {
	        addLayer: _this3.addLayer.bind(assertThisInitialized(_this3)),
	        removeLayer: _this3.removeLayer.bind(assertThisInitialized(_this3))
	      }
	    });
	    return _this3;
	  }

	  return Overlay;
	}(ControlledLayer);

	var LayersControl =
	/*#__PURE__*/
	function (_MapControl) {
	  inherits(LayersControl, _MapControl);

	  function LayersControl(props) {
	    var _this4;

	    classCallCheck(this, LayersControl);

	    _this4 = possibleConstructorReturn(this, getPrototypeOf$1(LayersControl).call(this, props));

	    defineProperty$1(assertThisInitialized(_this4), "controlProps", void 0);

	    _this4.controlProps = {
	      addBaseLayer: _this4.addBaseLayer.bind(assertThisInitialized(_this4)),
	      addOverlay: _this4.addOverlay.bind(assertThisInitialized(_this4)),
	      leaflet: props.leaflet,
	      removeLayer: _this4.removeLayer.bind(assertThisInitialized(_this4)),
	      removeLayerControl: _this4.removeLayerControl.bind(assertThisInitialized(_this4))
	    };
	    return _this4;
	  }

	  createClass(LayersControl, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      var _children = props.children,
	          options = objectWithoutProperties(props, ["children"]);

	      return new leaflet.Control.Layers(undefined, undefined, options);
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      get(getPrototypeOf$1(LayersControl.prototype), "updateLeafletElement", this).call(this, fromProps, toProps);

	      if (toProps.collapsed !== fromProps.collapsed) {
	        if (toProps.collapsed === true) {
	          this.leafletElement.collapse();
	        } else {
	          this.leafletElement.expand();
	        }
	      }
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      var _this5 = this;

	      setTimeout(function () {
	        get(getPrototypeOf$1(LayersControl.prototype), "componentWillUnmount", _this5).call(_this5);
	      }, 0);
	    }
	  }, {
	    key: "addBaseLayer",
	    value: function addBaseLayer(layer, name) {
	      var checked = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      if (checked && this.props.leaflet.map != null) {
	        this.props.leaflet.map.addLayer(layer);
	      }

	      this.leafletElement.addBaseLayer(layer, name);
	    }
	  }, {
	    key: "addOverlay",
	    value: function addOverlay(layer, name) {
	      var checked = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	      if (checked && this.props.leaflet.map != null) {
	        this.props.leaflet.map.addLayer(layer);
	      }

	      this.leafletElement.addOverlay(layer, name);
	    }
	  }, {
	    key: "removeLayer",
	    value: function removeLayer(layer) {
	      if (this.props.leaflet.map != null) {
	        this.props.leaflet.map.removeLayer(layer);
	      }
	    }
	  }, {
	    key: "removeLayerControl",
	    value: function removeLayerControl(layer) {
	      this.leafletElement.removeLayer(layer);
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var _this6 = this;

	      var children = React.Children.map(this.props.children, function (child) {
	        return child ? React.cloneElement(child, _this6.controlProps) : null;
	      });
	      return React__default.createElement(React.Fragment, null, children);
	    }
	  }]);

	  return LayersControl;
	}(MapControl);

	var LayersControlExport = withLeaflet(LayersControl);
	LayersControlExport.BaseLayer = BaseLayer;
	LayersControlExport.Overlay = Overlay;

	function omit(obj) {
	  for (var _len = arguments.length, keysToOmit = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    keysToOmit[_key - 1] = arguments[_key];
	  }

	  return Object.keys(obj).reduce(function (acc, key) {
	    if (keysToOmit.indexOf(key) === -1) {
	      acc[key] = obj[key];
	    }

	    return acc;
	  }, {});
	}

	function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$9(Object(source), true).forEach(function (key) { defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
	var OTHER_PROPS = ['children', 'className', 'id', 'style', 'useFlyTo', 'whenReady'];

	var normalizeCenter = function normalizeCenter(pos) {
	  return Array.isArray(pos) ? [pos[0], pos[1]] : [pos.lat, pos.lon ? pos.lon : pos.lng];
	};

	var Map =
	/*#__PURE__*/
	function (_MapEvented) {
	  inherits(Map, _MapEvented);

	  function Map(props) {
	    var _this;

	    classCallCheck(this, Map);

	    _this = possibleConstructorReturn(this, getPrototypeOf$1(Map).call(this, props));

	    defineProperty$1(assertThisInitialized(_this), "className", void 0);

	    defineProperty$1(assertThisInitialized(_this), "contextValue", void 0);

	    defineProperty$1(assertThisInitialized(_this), "container", void 0);

	    defineProperty$1(assertThisInitialized(_this), "viewport", {
	      center: undefined,
	      zoom: undefined
	    });

	    defineProperty$1(assertThisInitialized(_this), "_ready", false);

	    defineProperty$1(assertThisInitialized(_this), "_updating", false);

	    defineProperty$1(assertThisInitialized(_this), "onViewportChange", function () {
	      var center = _this.leafletElement.getCenter();

	      _this.viewport = {
	        center: center ? [center.lat, center.lng] : undefined,
	        zoom: _this.leafletElement.getZoom()
	      };

	      if (_this.props.onViewportChange && !_this._updating) {
	        _this.props.onViewportChange(_this.viewport);
	      }
	    });

	    defineProperty$1(assertThisInitialized(_this), "onViewportChanged", function () {
	      if (_this.props.onViewportChanged && !_this._updating) {
	        _this.props.onViewportChanged(_this.viewport);
	      }
	    });

	    defineProperty$1(assertThisInitialized(_this), "bindContainer", function (container) {
	      _this.container = container;
	    });

	    _this.className = props.className;
	    return _this;
	  }

	  createClass(Map, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      var viewport = props.viewport,
	          options = objectWithoutProperties(props, ["viewport"]);

	      if (viewport) {
	        if (viewport.center) {
	          options.center = viewport.center;
	        }

	        if (typeof viewport.zoom === 'number') {
	          options.zoom = viewport.zoom;
	        }
	      }

	      return new leaflet.Map(this.container, options);
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      this._updating = true;
	      var bounds = toProps.bounds,
	          boundsOptions = toProps.boundsOptions,
	          boxZoom = toProps.boxZoom,
	          center = toProps.center,
	          className = toProps.className,
	          doubleClickZoom = toProps.doubleClickZoom,
	          dragging = toProps.dragging,
	          keyboard = toProps.keyboard,
	          maxBounds = toProps.maxBounds,
	          scrollWheelZoom = toProps.scrollWheelZoom,
	          tap = toProps.tap,
	          touchZoom = toProps.touchZoom,
	          useFlyTo = toProps.useFlyTo,
	          viewport = toProps.viewport,
	          zoom = toProps.zoom;
	      updateClassName(this.container, fromProps.className, className);

	      if (viewport && viewport !== fromProps.viewport) {
	        var c = viewport.center ? viewport.center : center;
	        var z = viewport.zoom == null ? zoom : viewport.zoom;

	        if (useFlyTo === true) {
	          this.leafletElement.flyTo(c, z, this.getZoomPanOptions(toProps));
	        } else {
	          this.leafletElement.setView(c, z, this.getZoomPanOptions(toProps));
	        }
	      } else if (center && this.shouldUpdateCenter(center, fromProps.center)) {
	        if (useFlyTo === true) {
	          this.leafletElement.flyTo(center, zoom, this.getZoomPanOptions(toProps));
	        } else {
	          this.leafletElement.setView(center, zoom, this.getZoomPanOptions(toProps));
	        }
	      } else if (typeof zoom === 'number' && zoom !== fromProps.zoom) {
	        if (fromProps.zoom == null) {
	          this.leafletElement.setView(center, zoom, this.getZoomPanOptions(toProps));
	        } else {
	          this.leafletElement.setZoom(zoom, this.getZoomPanOptions(toProps));
	        }
	      }

	      if (maxBounds && this.shouldUpdateBounds(maxBounds, fromProps.maxBounds)) {
	        this.leafletElement.setMaxBounds(maxBounds);
	      }

	      if (bounds && (this.shouldUpdateBounds(bounds, fromProps.bounds) || boundsOptions !== fromProps.boundsOptions)) {
	        if (useFlyTo === true) {
	          this.leafletElement.flyToBounds(bounds, this.getFitBoundsOptions(toProps));
	        } else {
	          this.leafletElement.fitBounds(bounds, this.getFitBoundsOptions(toProps));
	        }
	      }

	      if (boxZoom !== fromProps.boxZoom) {
	        if (boxZoom === true) {
	          this.leafletElement.boxZoom.enable();
	        } else {
	          this.leafletElement.boxZoom.disable();
	        }
	      }

	      if (doubleClickZoom !== fromProps.doubleClickZoom) {
	        if (doubleClickZoom === true || typeof doubleClickZoom === 'string') {
	          this.leafletElement.options.doubleClickZoom = doubleClickZoom;
	          this.leafletElement.doubleClickZoom.enable();
	        } else {
	          this.leafletElement.doubleClickZoom.disable();
	        }
	      }

	      if (dragging !== fromProps.dragging) {
	        if (dragging === true) {
	          this.leafletElement.dragging.enable();
	        } else {
	          this.leafletElement.dragging.disable();
	        }
	      }

	      if (keyboard !== fromProps.keyboard) {
	        if (keyboard === true) {
	          this.leafletElement.keyboard.enable();
	        } else {
	          this.leafletElement.keyboard.disable();
	        }
	      }

	      if (scrollWheelZoom !== fromProps.scrollWheelZoom) {
	        if (scrollWheelZoom === true || typeof scrollWheelZoom === 'string') {
	          this.leafletElement.options.scrollWheelZoom = scrollWheelZoom;
	          this.leafletElement.scrollWheelZoom.enable();
	        } else {
	          this.leafletElement.scrollWheelZoom.disable();
	        }
	      }

	      if (tap !== fromProps.tap) {
	        if (tap === true) {
	          this.leafletElement.tap.enable();
	        } else {
	          this.leafletElement.tap.disable();
	        }
	      }

	      if (touchZoom !== fromProps.touchZoom) {
	        if (touchZoom === true || typeof touchZoom === 'string') {
	          this.leafletElement.options.touchZoom = touchZoom;
	          this.leafletElement.touchZoom.enable();
	        } else {
	          this.leafletElement.touchZoom.disable();
	        }
	      }

	      this._updating = false;
	    }
	  }, {
	    key: "getZoomPanOptions",
	    value: function getZoomPanOptions(props) {
	      var animate = props.animate,
	          duration = props.duration,
	          easeLinearity = props.easeLinearity,
	          noMoveStart = props.noMoveStart;
	      return {
	        animate: animate,
	        duration: duration,
	        easeLinearity: easeLinearity,
	        noMoveStart: noMoveStart
	      };
	    }
	  }, {
	    key: "getFitBoundsOptions",
	    value: function getFitBoundsOptions(props) {
	      var zoomPanOptions = this.getZoomPanOptions(props);
	      return _objectSpread$9({}, zoomPanOptions, {}, props.boundsOptions);
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      var props = omit.apply(void 0, [this.props].concat(OTHER_PROPS));
	      this.leafletElement = this.createLeafletElement(props);
	      this.leafletElement.on('move', this.onViewportChange);
	      this.leafletElement.on('moveend', this.onViewportChanged);

	      if (props.bounds != null) {
	        this.leafletElement.fitBounds(props.bounds, this.getFitBoundsOptions(props));
	      }

	      this.contextValue = {
	        layerContainer: this.leafletElement,
	        map: this.leafletElement
	      };

	      get(getPrototypeOf$1(Map.prototype), "componentDidMount", this).call(this);

	      this.forceUpdate(); // Re-render now that leafletElement is created
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(prevProps) {
	      if (this._ready === false) {
	        this._ready = true;

	        if (this.props.whenReady) {
	          this.leafletElement.whenReady(this.props.whenReady);
	        }
	      }

	      get(getPrototypeOf$1(Map.prototype), "componentDidUpdate", this).call(this, prevProps);

	      this.updateLeafletElement(prevProps, this.props);
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      get(getPrototypeOf$1(Map.prototype), "componentWillUnmount", this).call(this);

	      this.leafletElement.off('move', this.onViewportChange);
	      this.leafletElement.off('moveend', this.onViewportChanged); // The canvas renderer uses requestAnimationFrame, making a deferred call to a deleted object
	      // When preferCanvas is set, use simpler teardown logic

	      if (this.props.preferCanvas === true) {
	        this.leafletElement._initEvents(true);

	        this.leafletElement._stop();
	      } else {
	        this.leafletElement.remove();
	      }
	    }
	  }, {
	    key: "shouldUpdateCenter",
	    value: function shouldUpdateCenter(next, prev) {
	      if (!prev) return true;
	      next = normalizeCenter(next);
	      prev = normalizeCenter(prev);
	      return next[0] !== prev[0] || next[1] !== prev[1];
	    }
	  }, {
	    key: "shouldUpdateBounds",
	    value: function shouldUpdateBounds(next, prev) {
	      return prev ? !leaflet.latLngBounds(next).equals(leaflet.latLngBounds(prev)) : true;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      return React__default.createElement("div", {
	        className: this.className,
	        id: this.props.id,
	        ref: this.bindContainer,
	        style: this.props.style
	      }, this.contextValue ? React__default.createElement(LeafletProvider, {
	        value: this.contextValue
	      }, this.props.children) : null);
	    }
	  }]);

	  return Map;
	}(MapEvented);

	function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$a(Object(source), true).forEach(function (key) { defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var Marker =
	/*#__PURE__*/
	function (_MapLayer) {
	  inherits(Marker, _MapLayer);

	  function Marker() {
	    classCallCheck(this, Marker);

	    return possibleConstructorReturn(this, getPrototypeOf$1(Marker).apply(this, arguments));
	  }

	  createClass(Marker, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      var el = new leaflet.Marker(props.position, this.getOptions(props));
	      this.contextValue = _objectSpread$a({}, props.leaflet, {
	        popupContainer: el
	      });
	      return el;
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      if (toProps.position !== fromProps.position) {
	        this.leafletElement.setLatLng(toProps.position);
	      }

	      if (toProps.icon !== fromProps.icon) {
	        this.leafletElement.setIcon(toProps.icon);
	      }

	      if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
	        this.leafletElement.setZIndexOffset(toProps.zIndexOffset);
	      }

	      if (toProps.opacity !== fromProps.opacity) {
	        this.leafletElement.setOpacity(toProps.opacity);
	      }

	      if (toProps.draggable !== fromProps.draggable) {
	        if (toProps.draggable === true) {
	          this.leafletElement.dragging.enable();
	        } else {
	          this.leafletElement.dragging.disable();
	        }
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var children = this.props.children;
	      return children == null || this.contextValue == null ? null : React__default.createElement(LeafletProvider, {
	        value: this.contextValue
	      }, children);
	    }
	  }]);

	  return Marker;
	}(MapLayer);

	var Marker$1 = withLeaflet(Marker);

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var warning = function() {};

	{
	  var printWarning = function printWarning(format, args) {
	    var len = arguments.length;
	    args = new Array(len > 1 ? len - 1 : 0);
	    for (var key = 1; key < len; key++) {
	      args[key - 1] = arguments[key];
	    }
	    var argIndex = 0;
	    var message = 'Warning: ' +
	      format.replace(/%s/g, function() {
	        return args[argIndex++];
	      });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	          '`warning(condition, format, ...args)` requires a warning ' +
	          'message argument'
	      );
	    }
	    if (!condition) {
	      printWarning.apply(null, [format].concat(args));
	    }
	  };
	}

	var warning_1 = warning;

	function ownKeys$b(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$b(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$b(Object(source), true).forEach(function (key) { defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$b(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
	var idCounter = 0;

	var uniqueId = function uniqueId() {
	  return ++idCounter;
	};

	var LEAFLET_PANES = ['tile', 'shadow', 'overlay', 'map', 'marker', 'tooltip', 'popup'];
	var PANE_RE = /-*pane/gi;

	var isLeafletPane = function isLeafletPane(name) {
	  return LEAFLET_PANES.indexOf(name.replace(PANE_RE, '')) !== -1;
	};

	var paneStyles = {
	  position: 'absolute',
	  top: 0,
	  right: 0,
	  bottom: 0,
	  left: 0
	};

	var Pane =
	/*#__PURE__*/
	function (_Component) {
	  inherits(Pane, _Component);

	  function Pane() {
	    var _getPrototypeOf2;

	    var _this;

	    classCallCheck(this, Pane);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf$1(Pane)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    defineProperty$1(assertThisInitialized(_this), "state", {
	      name: undefined,
	      context: undefined
	    });

	    defineProperty$1(assertThisInitialized(_this), "setStyle", function () {
	      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props,
	          style = _ref.style,
	          className = _ref.className;

	      var pane = _this.getPane(_this.state.name);

	      if (pane) {
	        if (className) {
	          addClassName(pane, className);
	        }

	        if (style) {
	          // Without the cast, Flow throws this error:
	          //   Cannot assign style[key] to pane.style[key] because string
	          //   is incompatible with number.
	          Object.keys(style).forEach(function (key) {
	            pane.style[key] = style[key];
	          });
	        }
	      }
	    });

	    return _this;
	  }

	  createClass(Pane, [{
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      this.createPane(this.props);
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(prevProps) {
	      if (!this.state.name) {
	        // Do nothing if this.state.name is undefined due to errors or
	        // an invalid props.name value
	        return;
	      } // If the 'name' prop has changed the current pane is unmounted and a new
	      // pane is created.


	      if (this.props.name !== prevProps.name) {
	        this.removePane();
	        this.createPane(this.props);
	      } else {
	        // Remove the previous css class name from the pane if it has changed.
	        // setStyle() will take care of adding in the updated className
	        if (prevProps.className && this.props.className !== prevProps.className) {
	          var pane = this.getPane(this.state.name);

	          if (pane != null && prevProps.className != null) {
	            removeClassName(pane, prevProps.className);
	          }
	        } // Update the pane's DOM node style and class


	        this.setStyle(this.props);
	      }
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      this.removePane();
	    }
	  }, {
	    key: "createPane",
	    value: function createPane(props) {
	      var map = props.leaflet.map;
	      var name = props.name || "pane-".concat(uniqueId());

	      if (map != null && map.createPane != null) {
	        var isDefault = isLeafletPane(name);
	        var existing = isDefault || this.getPane(name);

	        if (existing == null) {
	          map.createPane(name, this.getParentPane());
	        } else {
	          var message = isDefault ? "You must use a unique name for a pane that is not a default leaflet pane (".concat(name, ")") : "A pane with this name already exists. (".concat(name, ")");
	           warning_1(false, message) ;
	        }

	        this.setState({
	          name: name,
	          context: _objectSpread$b({}, props.leaflet, {
	            pane: name
	          })
	        }, this.setStyle);
	      }
	    }
	  }, {
	    key: "removePane",
	    value: function removePane() {
	      // Remove the created pane
	      var name = this.state.name;

	      if (name != null) {
	        var pane = this.getPane(name);
	        if (pane != null && pane.remove) pane.remove();
	        var map = this.props.leaflet.map;

	        if (map != null && map._panes != null) {
	          map._panes = omit(map._panes, name);
	          map._paneRenderers = omit(map._paneRenderers, name);
	        }
	      }
	    }
	  }, {
	    key: "getParentPane",
	    value: function getParentPane() {
	      return this.getPane(this.props.pane || this.props.leaflet.pane);
	    }
	  }, {
	    key: "getPane",
	    value: function getPane(name) {
	      if (name != null && this.props.leaflet.map != null) {
	        return this.props.leaflet.map.getPane(name);
	      }
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var context = this.state.context;
	      return context ? React__default.createElement(LeafletProvider, {
	        value: context
	      }, React__default.createElement("div", {
	        style: paneStyles
	      }, this.props.children)) : null;
	    }
	  }]);

	  return Pane;
	}(React.Component);

	var Pane$1 = withLeaflet(Pane);

	var Polygon =
	/*#__PURE__*/
	function (_Path) {
	  inherits(Polygon, _Path);

	  function Polygon() {
	    classCallCheck(this, Polygon);

	    return possibleConstructorReturn(this, getPrototypeOf$1(Polygon).apply(this, arguments));
	  }

	  createClass(Polygon, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      return new leaflet.Polygon(props.positions, this.getOptions(props));
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      if (toProps.positions !== fromProps.positions) {
	        this.leafletElement.setLatLngs(toProps.positions);
	      }

	      this.setStyleIfChanged(fromProps, toProps);
	    }
	  }]);

	  return Polygon;
	}(Path);

	var Polygon$1 = withLeaflet(Polygon);

	var Polyline =
	/*#__PURE__*/
	function (_Path) {
	  inherits(Polyline, _Path);

	  function Polyline() {
	    classCallCheck(this, Polyline);

	    return possibleConstructorReturn(this, getPrototypeOf$1(Polyline).apply(this, arguments));
	  }

	  createClass(Polyline, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      return new leaflet.Polyline(props.positions, this.getOptions(props));
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      if (toProps.positions !== fromProps.positions) {
	        this.leafletElement.setLatLngs(toProps.positions);
	      }

	      this.setStyleIfChanged(fromProps, toProps);
	    }
	  }]);

	  return Polyline;
	}(Path);

	var Polyline$1 = withLeaflet(Polyline);

	function ownKeys$c(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread$c(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$c(Object(source), true).forEach(function (key) { defineProperty$1(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$c(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var Popup =
	/*#__PURE__*/
	function (_DivOverlay) {
	  inherits(Popup, _DivOverlay);

	  function Popup() {
	    var _getPrototypeOf2;

	    var _this;

	    classCallCheck(this, Popup);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf$1(Popup)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    defineProperty$1(assertThisInitialized(_this), "onPopupOpen", function (_ref) {
	      var popup = _ref.popup;

	      if (popup === _this.leafletElement) {
	        _this.onOpen();
	      }
	    });

	    defineProperty$1(assertThisInitialized(_this), "onPopupClose", function (_ref2) {
	      var popup = _ref2.popup;

	      if (popup === _this.leafletElement) {
	        _this.onClose();
	      }
	    });

	    defineProperty$1(assertThisInitialized(_this), "onRender", function () {
	      if (_this.props.autoPan !== false && _this.leafletElement.isOpen()) {
	        if (_this.leafletElement._map && _this.leafletElement._map._panAnim) {
	          _this.leafletElement._map._panAnim = undefined;
	        }

	        _this.leafletElement._adjustPan();
	      }
	    });

	    return _this;
	  }

	  createClass(Popup, [{
	    key: "getOptions",
	    value: function getOptions(props) {
	      return _objectSpread$c({}, get(getPrototypeOf$1(Popup.prototype), "getOptions", this).call(this, props), {
	        autoPan: false
	      });
	    }
	  }, {
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      var options = this.getOptions(props);
	      options.autoPan = props.autoPan !== false;
	      return new leaflet.Popup(options, props.leaflet.popupContainer);
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      if (toProps.position !== fromProps.position) {
	        this.leafletElement.setLatLng(toProps.position);
	      }
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      var position = this.props.position;
	      var _this$props$leaflet = this.props.leaflet,
	          map = _this$props$leaflet.map,
	          popupContainer = _this$props$leaflet.popupContainer;
	      var el = this.leafletElement;

	      if (map != null) {
	        map.on({
	          popupopen: this.onPopupOpen,
	          popupclose: this.onPopupClose
	        });
	      }

	      if (popupContainer) {
	        // Attach to container component
	        popupContainer.bindPopup(el);
	      } else {
	        // Attach to a Map
	        if (position) {
	          el.setLatLng(position);
	        }

	        el.openOn(map);
	      }
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      var map = this.props.leaflet.map;

	      if (map != null) {
	        map.off({
	          popupopen: this.onPopupOpen,
	          popupclose: this.onPopupClose
	        });
	        map.removeLayer(this.leafletElement);
	      }

	      get(getPrototypeOf$1(Popup.prototype), "componentWillUnmount", this).call(this);
	    }
	  }]);

	  return Popup;
	}(DivOverlay);

	defineProperty$1(Popup, "defaultProps", {
	  pane: 'popupPane'
	});

	var Popup$1 = withLeaflet(Popup);

	var Rectangle =
	/*#__PURE__*/
	function (_Path) {
	  inherits(Rectangle, _Path);

	  function Rectangle() {
	    classCallCheck(this, Rectangle);

	    return possibleConstructorReturn(this, getPrototypeOf$1(Rectangle).apply(this, arguments));
	  }

	  createClass(Rectangle, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      return new leaflet.Rectangle(props.bounds, this.getOptions(props));
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      if (toProps.bounds !== fromProps.bounds) {
	        this.leafletElement.setBounds(toProps.bounds);
	      }

	      this.setStyleIfChanged(fromProps, toProps);
	    }
	  }]);

	  return Rectangle;
	}(Path);

	var Rectangle$1 = withLeaflet(Rectangle);

	var ScaleControl =
	/*#__PURE__*/
	function (_MapControl) {
	  inherits(ScaleControl, _MapControl);

	  function ScaleControl() {
	    classCallCheck(this, ScaleControl);

	    return possibleConstructorReturn(this, getPrototypeOf$1(ScaleControl).apply(this, arguments));
	  }

	  createClass(ScaleControl, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      return new leaflet.Control.Scale(props);
	    }
	  }]);

	  return ScaleControl;
	}(MapControl);

	var ScaleControl$1 = withLeaflet(ScaleControl);

	var SVGOverlay =
	/*#__PURE__*/
	function (_MapComponent) {
	  inherits(SVGOverlay, _MapComponent);

	  function SVGOverlay(props) {
	    var _this;

	    classCallCheck(this, SVGOverlay);

	    _this = possibleConstructorReturn(this, getPrototypeOf$1(SVGOverlay).call(this, props));

	    defineProperty$1(assertThisInitialized(_this), "leafletElement", void 0);

	    defineProperty$1(assertThisInitialized(_this), "container", void 0);

	    _this.leafletElement = _this.createLeafletElement(props);
	    return _this;
	  }

	  createClass(SVGOverlay, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      this.container = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	      return new leaflet.SVGOverlay(this.container, props.bounds, this.getOptions(props));
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      if (toProps.bounds !== fromProps.bounds) {
	        this.leafletElement.setBounds(toProps.bounds);
	      }

	      if (toProps.opacity !== fromProps.opacity) {
	        this.leafletElement.setOpacity(toProps.opacity);
	      }

	      if (toProps.zIndex !== fromProps.zIndex) {
	        this.leafletElement.setZIndex(toProps.zIndex);
	      }
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      get(getPrototypeOf$1(SVGOverlay.prototype), "componentDidMount", this).call(this);

	      this.layerContainer.addLayer(this.leafletElement);
	    }
	  }, {
	    key: "componentDidUpdate",
	    value: function componentDidUpdate(prevProps) {
	      get(getPrototypeOf$1(SVGOverlay.prototype), "componentDidUpdate", this).call(this, prevProps);

	      if (this.props.attribution !== prevProps.attribution) {
	        var map = this.props.leaflet.map;

	        if (map != null && map.attributionControl != null) {
	          map.attributionControl.removeAttribution(prevProps.attribution);
	          map.attributionControl.addAttribution(this.props.attribution);
	        }
	      }

	      this.updateLeafletElement(prevProps, this.props);
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      get(getPrototypeOf$1(SVGOverlay.prototype), "componentWillUnmount", this).call(this);

	      this.layerContainer.removeLayer(this.leafletElement);
	      this.container = null;
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var children = this.props.children;

	      if (children == null || this.container == null) {
	        return null;
	      }

	      return reactDom.createPortal(children, this.container);
	    }
	  }, {
	    key: "layerContainer",
	    get: function get() {
	      return this.props.leaflet.layerContainer || this.props.leaflet.map;
	    }
	  }]);

	  return SVGOverlay;
	}(MapComponent);

	var SVGOverlay$1 = withLeaflet(SVGOverlay);

	var TileLayer =
	/*#__PURE__*/
	function (_GridLayer) {
	  inherits(TileLayer, _GridLayer);

	  function TileLayer() {
	    classCallCheck(this, TileLayer);

	    return possibleConstructorReturn(this, getPrototypeOf$1(TileLayer).apply(this, arguments));
	  }

	  createClass(TileLayer, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      return new leaflet.TileLayer(props.url, this.getOptions(props));
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      get(getPrototypeOf$1(TileLayer.prototype), "updateLeafletElement", this).call(this, fromProps, toProps);

	      if (toProps.url !== fromProps.url) {
	        this.leafletElement.setUrl(toProps.url);
	      }
	    }
	  }]);

	  return TileLayer;
	}(GridLayer);

	var TileLayer$1 = withLeaflet(TileLayer);

	var Tooltip =
	/*#__PURE__*/
	function (_DivOverlay) {
	  inherits(Tooltip, _DivOverlay);

	  function Tooltip() {
	    var _getPrototypeOf2;

	    var _this;

	    classCallCheck(this, Tooltip);

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf$1(Tooltip)).call.apply(_getPrototypeOf2, [this].concat(args)));

	    defineProperty$1(assertThisInitialized(_this), "onTooltipOpen", function (_ref) {
	      var tooltip = _ref.tooltip;

	      if (tooltip === _this.leafletElement) {
	        _this.onOpen();
	      }
	    });

	    defineProperty$1(assertThisInitialized(_this), "onTooltipClose", function (_ref2) {
	      var tooltip = _ref2.tooltip;

	      if (tooltip === _this.leafletElement) {
	        _this.onClose();
	      }
	    });

	    return _this;
	  }

	  createClass(Tooltip, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      return new leaflet.Tooltip(this.getOptions(props), props.leaflet.popupContainer);
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      var popupContainer = this.props.leaflet.popupContainer;
	      if (popupContainer == null) return;
	      popupContainer.on({
	        tooltipopen: this.onTooltipOpen,
	        tooltipclose: this.onTooltipClose
	      });
	      popupContainer.bindTooltip(this.leafletElement);
	    }
	  }, {
	    key: "componentWillUnmount",
	    value: function componentWillUnmount() {
	      var popupContainer = this.props.leaflet.popupContainer;
	      if (popupContainer == null) return;
	      popupContainer.off({
	        tooltipopen: this.onTooltipOpen,
	        tooltipclose: this.onTooltipClose
	      });

	      if (popupContainer._map != null) {
	        popupContainer.unbindTooltip(this.leafletElement);
	      }
	    }
	  }]);

	  return Tooltip;
	}(DivOverlay);

	defineProperty$1(Tooltip, "defaultProps", {
	  pane: 'tooltipPane'
	});

	var Tooltip$1 = withLeaflet(Tooltip);

	var VideoOverlay =
	/*#__PURE__*/
	function (_MapLayer) {
	  inherits(VideoOverlay, _MapLayer);

	  function VideoOverlay() {
	    classCallCheck(this, VideoOverlay);

	    return possibleConstructorReturn(this, getPrototypeOf$1(VideoOverlay).apply(this, arguments));
	  }

	  createClass(VideoOverlay, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      return new leaflet.VideoOverlay(props.url, props.bounds, this.getOptions(props));
	    }
	  }, {
	    key: "componentDidMount",
	    value: function componentDidMount() {
	      get(getPrototypeOf$1(VideoOverlay.prototype), "componentDidMount", this).call(this);

	      if (this.props.play === true) {
	        this.leafletElement.getElement().play();
	      }
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      if (toProps.url !== fromProps.url) {
	        this.leafletElement.setUrl(toProps.url);
	      }

	      if (toProps.bounds !== fromProps.bounds) {
	        this.leafletElement.setBounds(leaflet.latLngBounds(toProps.bounds));
	      }

	      if (toProps.opacity !== fromProps.opacity) {
	        this.leafletElement.setOpacity(toProps.opacity);
	      }

	      if (toProps.zIndex !== fromProps.zIndex) {
	        this.leafletElement.setZIndex(toProps.zIndex);
	      } // flowlint-next-line sketchy-null-bool:off


	      if (toProps.play === true && !fromProps.play) {
	        this.leafletElement.getElement().play(); // flowlint-next-line sketchy-null-bool:off
	      } else if (!toProps.play && fromProps.play === true) {
	        this.leafletElement.getElement().pause();
	      }
	    }
	  }]);

	  return VideoOverlay;
	}(MapLayer);

	var VideoOverlay$1 = withLeaflet(VideoOverlay);

	var WMSTileLayer =
	/*#__PURE__*/
	function (_GridLayer) {
	  inherits(WMSTileLayer, _GridLayer);

	  function WMSTileLayer() {
	    classCallCheck(this, WMSTileLayer);

	    return possibleConstructorReturn(this, getPrototypeOf$1(WMSTileLayer).apply(this, arguments));
	  }

	  createClass(WMSTileLayer, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      var url = props.url,
	          params = objectWithoutProperties(props, ["url"]);

	      var _this$getOptions = this.getOptions(params),
	          _l = _this$getOptions.leaflet,
	          options = objectWithoutProperties(_this$getOptions, ["leaflet"]);

	      return new leaflet.TileLayer.WMS(url, options);
	    }
	  }, {
	    key: "updateLeafletElement",
	    value: function updateLeafletElement(fromProps, toProps) {
	      get(getPrototypeOf$1(WMSTileLayer.prototype), "updateLeafletElement", this).call(this, fromProps, toProps);

	      var prevUrl = fromProps.url,
	          _po = fromProps.opacity,
	          _pz = fromProps.zIndex,
	          prevProps = objectWithoutProperties(fromProps, ["url", "opacity", "zIndex"]);

	      var _this$getOptions2 = this.getOptions(prevProps),
	          _pl = _this$getOptions2.leaflet,
	          prevParams = objectWithoutProperties(_this$getOptions2, ["leaflet"]);

	      var url = toProps.url,
	          _o = toProps.opacity,
	          _z = toProps.zIndex,
	          props = objectWithoutProperties(toProps, ["url", "opacity", "zIndex"]);

	      var _this$getOptions3 = this.getOptions(props),
	          _l = _this$getOptions3.leaflet,
	          params = objectWithoutProperties(_this$getOptions3, ["leaflet"]);

	      if (url !== prevUrl) {
	        this.leafletElement.setUrl(url);
	      }

	      if (!fastDeepEqual(params, prevParams)) {
	        this.leafletElement.setParams(params);
	      }
	    }
	  }, {
	    key: "getOptions",
	    value: function getOptions(params) {
	      var superOptions = get(getPrototypeOf$1(WMSTileLayer.prototype), "getOptions", this).call(this, params);

	      return Object.keys(superOptions).reduce(function (options, key) {
	        if (!EVENTS_RE.test(key)) {
	          options[key] = superOptions[key];
	        }

	        return options;
	      }, {});
	    }
	  }]);

	  return WMSTileLayer;
	}(GridLayer);

	var WMSTileLayer$1 = withLeaflet(WMSTileLayer);

	var ZoomControl =
	/*#__PURE__*/
	function (_MapControl) {
	  inherits(ZoomControl, _MapControl);

	  function ZoomControl() {
	    classCallCheck(this, ZoomControl);

	    return possibleConstructorReturn(this, getPrototypeOf$1(ZoomControl).apply(this, arguments));
	  }

	  createClass(ZoomControl, [{
	    key: "createLeafletElement",
	    value: function createLeafletElement(props) {
	      return new leaflet.Control.Zoom(props);
	    }
	  }]);

	  return ZoomControl;
	}(MapControl);

	var ZoomControl$1 = withLeaflet(ZoomControl);

	exports.AttributionControl = AttributionControl$1;
	exports.Circle = Circle$1;
	exports.CircleMarker = CircleMarker$1;
	exports.ControlledLayer = ControlledLayer;
	exports.DivOverlay = DivOverlay;
	exports.FeatureGroup = FeatureGroup$1;
	exports.GeoJSON = GeoJSON$1;
	exports.GridLayer = GridLayer;
	exports.ImageOverlay = ImageOverlay$1;
	exports.LayerGroup = LayerGroup$1;
	exports.LayersControl = LayersControlExport;
	exports.LeafletConsumer = LeafletConsumer;
	exports.LeafletProvider = LeafletProvider;
	exports.Map = Map;
	exports.MapComponent = MapComponent;
	exports.MapControl = MapControl;
	exports.MapEvented = MapEvented;
	exports.MapLayer = MapLayer;
	exports.Marker = Marker$1;
	exports.Pane = Pane$1;
	exports.Path = Path;
	exports.Polygon = Polygon$1;
	exports.Polyline = Polyline$1;
	exports.Popup = Popup$1;
	exports.Rectangle = Rectangle$1;
	exports.SVGOverlay = SVGOverlay$1;
	exports.ScaleControl = ScaleControl$1;
	exports.TileLayer = TileLayer$1;
	exports.Tooltip = Tooltip$1;
	exports.VideoOverlay = VideoOverlay$1;
	exports.WMSTileLayer = WMSTileLayer$1;
	exports.ZoomControl = ZoomControl$1;
	exports.useLeaflet = useLeaflet;
	exports.withLeaflet = withLeaflet;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
