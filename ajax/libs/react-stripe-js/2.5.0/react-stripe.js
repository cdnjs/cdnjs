'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

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

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

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

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var usePrevious = function usePrevious(value) {
  var ref = React.useRef(value);
  React.useEffect(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
};

var isUnknownObject = function isUnknownObject(raw) {
  return raw !== null && _typeof(raw) === 'object';
};
var isPromise = function isPromise(raw) {
  return isUnknownObject(raw) && typeof raw.then === 'function';
}; // We are using types to enforce the `stripe` prop in this lib,
// but in an untyped integration `stripe` could be anything, so we need
// to do some sanity validation to prevent type errors.

var isStripe = function isStripe(raw) {
  return isUnknownObject(raw) && typeof raw.elements === 'function' && typeof raw.createToken === 'function' && typeof raw.createPaymentMethod === 'function' && typeof raw.confirmCardPayment === 'function';
};

var PLAIN_OBJECT_STR = '[object Object]';
var isEqual = function isEqual(left, right) {
  if (!isUnknownObject(left) || !isUnknownObject(right)) {
    return left === right;
  }

  var leftArray = Array.isArray(left);
  var rightArray = Array.isArray(right);
  if (leftArray !== rightArray) return false;
  var leftPlainObject = Object.prototype.toString.call(left) === PLAIN_OBJECT_STR;
  var rightPlainObject = Object.prototype.toString.call(right) === PLAIN_OBJECT_STR;
  if (leftPlainObject !== rightPlainObject) return false; // not sure what sort of special object this is (regexp is one option), so
  // fallback to reference check.

  if (!leftPlainObject && !leftArray) return left === right;
  var leftKeys = Object.keys(left);
  var rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) return false;
  var keySet = {};

  for (var i = 0; i < leftKeys.length; i += 1) {
    keySet[leftKeys[i]] = true;
  }

  for (var _i = 0; _i < rightKeys.length; _i += 1) {
    keySet[rightKeys[_i]] = true;
  }

  var allKeys = Object.keys(keySet);

  if (allKeys.length !== leftKeys.length) {
    return false;
  }

  var l = left;
  var r = right;

  var pred = function pred(key) {
    return isEqual(l[key], r[key]);
  };

  return allKeys.every(pred);
};

var extractAllowedOptionsUpdates = function extractAllowedOptionsUpdates(options, prevOptions, immutableKeys) {
  if (!isUnknownObject(options)) {
    return null;
  }

  return Object.keys(options).reduce(function (newOptions, key) {
    var isUpdated = !isUnknownObject(prevOptions) || !isEqual(options[key], prevOptions[key]);

    if (immutableKeys.includes(key)) {
      if (isUpdated) {
        console.warn("Unsupported prop change: options.".concat(key, " is not a mutable property."));
      }

      return newOptions;
    }

    if (!isUpdated) {
      return newOptions;
    }

    return _objectSpread2(_objectSpread2({}, newOptions || {}), {}, _defineProperty({}, key, options[key]));
  }, null);
};

var INVALID_STRIPE_ERROR = 'Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.'; // We are using types to enforce the `stripe` prop in this lib, but in a real
// integration `stripe` could be anything, so we need to do some sanity
// validation to prevent type errors.

var validateStripe = function validateStripe(maybeStripe) {
  var errorMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INVALID_STRIPE_ERROR;

  if (maybeStripe === null || isStripe(maybeStripe)) {
    return maybeStripe;
  }

  throw new Error(errorMsg);
};

var parseStripeProp = function parseStripeProp(raw) {
  var errorMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INVALID_STRIPE_ERROR;

  if (isPromise(raw)) {
    return {
      tag: 'async',
      stripePromise: Promise.resolve(raw).then(function (result) {
        return validateStripe(result, errorMsg);
      })
    };
  }

  var stripe = validateStripe(raw, errorMsg);

  if (stripe === null) {
    return {
      tag: 'empty'
    };
  }

  return {
    tag: 'sync',
    stripe: stripe
  };
};

var registerWithStripeJs = function registerWithStripeJs(stripe) {
  if (!stripe || !stripe._registerWrapper || !stripe.registerAppInfo) {
    return;
  }

  stripe._registerWrapper({
    name: 'react-stripe-js',
    version: "2.5.0"
  });

  stripe.registerAppInfo({
    name: 'react-stripe-js',
    version: "2.5.0",
    url: 'https://stripe.com/docs/stripe-js/react'
  });
};

var _excluded = ["on", "session"];
var CustomCheckoutSdkContext = /*#__PURE__*/React.createContext(null);
CustomCheckoutSdkContext.displayName = 'CustomCheckoutSdkContext';
var parseCustomCheckoutSdkContext = function parseCustomCheckoutSdkContext(ctx, useCase) {
  if (!ctx) {
    throw new Error("Could not find CustomCheckoutProvider context; You need to wrap the part of your app that ".concat(useCase, " in an <CustomCheckoutProvider> provider."));
  }

  return ctx;
};
var CustomCheckoutContext = /*#__PURE__*/React.createContext(null);
CustomCheckoutContext.displayName = 'CustomCheckoutContext';
var extractCustomCheckoutContextValue = function extractCustomCheckoutContextValue(customCheckoutSdk, sessionState) {
  if (!customCheckoutSdk) {
    return null;
  }

  var _on = customCheckoutSdk.on,
      _session = customCheckoutSdk.session,
      actions = _objectWithoutProperties(customCheckoutSdk, _excluded);

  if (!sessionState) {
    return _objectSpread2(_objectSpread2({}, actions), customCheckoutSdk.session());
  }

  return _objectSpread2(_objectSpread2({}, actions), sessionState);
};
var INVALID_STRIPE_ERROR$1 = 'Invalid prop `stripe` supplied to `CustomCheckoutProvider`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.';
var CustomCheckoutProvider = function CustomCheckoutProvider(_ref) {
  var rawStripeProp = _ref.stripe,
      options = _ref.options,
      children = _ref.children;
  var parsed = React.useMemo(function () {
    return parseStripeProp(rawStripeProp, INVALID_STRIPE_ERROR$1);
  }, [rawStripeProp]); // State used to trigger a re-render when sdk.session is updated

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      session = _React$useState2[0],
      setSession = _React$useState2[1];

  var _React$useState3 = React.useState(function () {
    return {
      stripe: parsed.tag === 'sync' ? parsed.stripe : null,
      customCheckoutSdk: null
    };
  }),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      ctx = _React$useState4[0],
      setContext = _React$useState4[1];

  var safeSetContext = function safeSetContext(stripe, customCheckoutSdk) {
    setContext(function (ctx) {
      if (ctx.stripe && ctx.customCheckoutSdk) {
        return ctx;
      }

      return {
        stripe: stripe,
        customCheckoutSdk: customCheckoutSdk
      };
    });
  }; // Ref used to avoid calling initCustomCheckout multiple times when options changes


  var initCustomCheckoutCalledRef = React.useRef(false);
  React.useEffect(function () {
    var isMounted = true;

    if (parsed.tag === 'async' && !ctx.stripe) {
      parsed.stripePromise.then(function (stripe) {
        if (stripe && isMounted && !initCustomCheckoutCalledRef.current) {
          // Only update context if the component is still mounted
          // and stripe is not null. We allow stripe to be null to make
          // handling SSR easier.
          initCustomCheckoutCalledRef.current = true;
          stripe.initCustomCheckout(options).then(function (customCheckoutSdk) {
            if (customCheckoutSdk) {
              safeSetContext(stripe, customCheckoutSdk);
              customCheckoutSdk.on('change', setSession);
            }
          });
        }
      });
    } else if (parsed.tag === 'sync' && parsed.stripe && !initCustomCheckoutCalledRef.current) {
      initCustomCheckoutCalledRef.current = true;
      parsed.stripe.initCustomCheckout(options).then(function (customCheckoutSdk) {
        if (customCheckoutSdk) {
          safeSetContext(parsed.stripe, customCheckoutSdk);
          customCheckoutSdk.on('change', setSession);
        }
      });
    }

    return function () {
      isMounted = false;
    };
  }, [parsed, ctx, options, setSession]); // Warn on changes to stripe prop

  var prevStripe = usePrevious(rawStripeProp);
  React.useEffect(function () {
    if (prevStripe !== null && prevStripe !== rawStripeProp) {
      console.warn('Unsupported prop change on CustomCheckoutProvider: You cannot change the `stripe` prop after setting it.');
    }
  }, [prevStripe, rawStripeProp]); // Apply updates to elements when options prop has relevant changes

  var prevOptions = usePrevious(options);
  React.useEffect(function () {
    var _prevOptions$elements, _options$elementsOpti;

    if (!ctx.customCheckoutSdk) {
      return;
    }

    if (options.clientSecret && !isUnknownObject(prevOptions) && !isEqual(options.clientSecret, prevOptions.clientSecret)) {
      console.warn('Unsupported prop change: options.client_secret is not a mutable property.');
    }

    var previousAppearance = prevOptions === null || prevOptions === void 0 ? void 0 : (_prevOptions$elements = prevOptions.elementsOptions) === null || _prevOptions$elements === void 0 ? void 0 : _prevOptions$elements.appearance;
    var currentAppearance = options === null || options === void 0 ? void 0 : (_options$elementsOpti = options.elementsOptions) === null || _options$elementsOpti === void 0 ? void 0 : _options$elementsOpti.appearance;

    if (currentAppearance && !isEqual(currentAppearance, previousAppearance)) {
      ctx.customCheckoutSdk.changeAppearance(currentAppearance);
    }
  }, [options, prevOptions, ctx.customCheckoutSdk]); // Attach react-stripe-js version to stripe.js instance

  React.useEffect(function () {
    registerWithStripeJs(ctx.stripe);
  }, [ctx.stripe]);
  var customCheckoutContextValue = React.useMemo(function () {
    return extractCustomCheckoutContextValue(ctx.customCheckoutSdk, session);
  }, [ctx.customCheckoutSdk, session]);

  if (!ctx.customCheckoutSdk) {
    return null;
  }

  return /*#__PURE__*/React.createElement(CustomCheckoutSdkContext.Provider, {
    value: ctx
  }, /*#__PURE__*/React.createElement(CustomCheckoutContext.Provider, {
    value: customCheckoutContextValue
  }, children));
};
CustomCheckoutProvider.propTypes = {
  stripe: PropTypes.any,
  options: PropTypes.shape({
    clientSecret: PropTypes.string.isRequired,
    elementsOptions: PropTypes.object
  }).isRequired
};
var useCustomCheckoutSdkContextWithUseCase = function useCustomCheckoutSdkContextWithUseCase(useCaseString) {
  var ctx = React.useContext(CustomCheckoutSdkContext);
  return parseCustomCheckoutSdkContext(ctx, useCaseString);
};
var useElementsOrCustomCheckoutSdkContextWithUseCase = function useElementsOrCustomCheckoutSdkContextWithUseCase(useCaseString) {
  var customCheckoutSdkContext = React.useContext(CustomCheckoutSdkContext);
  var elementsContext = React.useContext(ElementsContext);

  if (customCheckoutSdkContext && elementsContext) {
    throw new Error("You cannot wrap the part of your app that ".concat(useCaseString, " in both <CustomCheckoutProvider> and <Elements> providers."));
  }

  if (customCheckoutSdkContext) {
    return parseCustomCheckoutSdkContext(customCheckoutSdkContext, useCaseString);
  }

  return parseElementsContext(elementsContext, useCaseString);
};
var useCustomCheckout = function useCustomCheckout() {
  // ensure it's in CustomCheckoutProvider
  useCustomCheckoutSdkContextWithUseCase('calls useCustomCheckout()');
  var ctx = React.useContext(CustomCheckoutContext);

  if (!ctx) {
    throw new Error('Could not find CustomCheckout Context; You need to wrap the part of your app that calls useCustomCheckout() in an <CustomCheckoutProvider> provider.');
  }

  return ctx;
};

var ElementsContext = /*#__PURE__*/React.createContext(null);
ElementsContext.displayName = 'ElementsContext';
var parseElementsContext = function parseElementsContext(ctx, useCase) {
  if (!ctx) {
    throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(useCase, " in an <Elements> provider."));
  }

  return ctx;
};
var CartElementContext = /*#__PURE__*/React.createContext(null);
CartElementContext.displayName = 'CartElementContext';
var parseCartElementContext = function parseCartElementContext(ctx, useCase) {
  if (!ctx) {
    throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(useCase, " in an <Elements> provider."));
  }

  return ctx;
};
/**
 * The `Elements` provider allows you to use [Element components](https://stripe.com/docs/stripe-js/react#element-components) and access the [Stripe object](https://stripe.com/docs/js/initializing) in any nested component.
 * Render an `Elements` provider at the root of your React app so that it is available everywhere you need it.
 *
 * To use the `Elements` provider, call `loadStripe` from `@stripe/stripe-js` with your publishable key.
 * The `loadStripe` function will asynchronously load the Stripe.js script and initialize a `Stripe` object.
 * Pass the returned `Promise` to `Elements`.
 *
 * @docs https://stripe.com/docs/stripe-js/react#elements-provider
 */

var Elements = function Elements(_ref) {
  var rawStripeProp = _ref.stripe,
      options = _ref.options,
      children = _ref.children;
  var parsed = React.useMemo(function () {
    return parseStripeProp(rawStripeProp);
  }, [rawStripeProp]);

  var _React$useState = React.useState(null),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      cart = _React$useState2[0],
      setCart = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      cartState = _React$useState4[0],
      setCartState = _React$useState4[1]; // For a sync stripe instance, initialize into context


  var _React$useState5 = React.useState(function () {
    return {
      stripe: parsed.tag === 'sync' ? parsed.stripe : null,
      elements: parsed.tag === 'sync' ? parsed.stripe.elements(options) : null
    };
  }),
      _React$useState6 = _slicedToArray(_React$useState5, 2),
      ctx = _React$useState6[0],
      setContext = _React$useState6[1];

  React.useEffect(function () {
    var isMounted = true;

    var safeSetContext = function safeSetContext(stripe) {
      setContext(function (ctx) {
        // no-op if we already have a stripe instance (https://github.com/stripe/react-stripe-js/issues/296)
        if (ctx.stripe) return ctx;
        return {
          stripe: stripe,
          elements: stripe.elements(options)
        };
      });
    }; // For an async stripePromise, store it in context once resolved


    if (parsed.tag === 'async' && !ctx.stripe) {
      parsed.stripePromise.then(function (stripe) {
        if (stripe && isMounted) {
          // Only update Elements context if the component is still mounted
          // and stripe is not null. We allow stripe to be null to make
          // handling SSR easier.
          safeSetContext(stripe);
        }
      });
    } else if (parsed.tag === 'sync' && !ctx.stripe) {
      // Or, handle a sync stripe instance going from null -> populated
      safeSetContext(parsed.stripe);
    }

    return function () {
      isMounted = false;
    };
  }, [parsed, ctx, options]); // Warn on changes to stripe prop

  var prevStripe = usePrevious(rawStripeProp);
  React.useEffect(function () {
    if (prevStripe !== null && prevStripe !== rawStripeProp) {
      console.warn('Unsupported prop change on Elements: You cannot change the `stripe` prop after setting it.');
    }
  }, [prevStripe, rawStripeProp]); // Apply updates to elements when options prop has relevant changes

  var prevOptions = usePrevious(options);
  React.useEffect(function () {
    if (!ctx.elements) {
      return;
    }

    var updates = extractAllowedOptionsUpdates(options, prevOptions, ['clientSecret', 'fonts']);

    if (updates) {
      ctx.elements.update(updates);
    }
  }, [options, prevOptions, ctx.elements]); // Attach react-stripe-js version to stripe.js instance

  React.useEffect(function () {
    registerWithStripeJs(ctx.stripe);
  }, [ctx.stripe]);
  return /*#__PURE__*/React.createElement(ElementsContext.Provider, {
    value: ctx
  }, /*#__PURE__*/React.createElement(CartElementContext.Provider, {
    value: {
      cart: cart,
      setCart: setCart,
      cartState: cartState,
      setCartState: setCartState
    }
  }, children));
};
Elements.propTypes = {
  stripe: PropTypes.any,
  options: PropTypes.object
};
var useElementsContextWithUseCase = function useElementsContextWithUseCase(useCaseMessage) {
  var ctx = React.useContext(ElementsContext);
  return parseElementsContext(ctx, useCaseMessage);
};
var DUMMY_CART_ELEMENT_CONTEXT = {
  cart: null,
  cartState: null,
  setCart: function setCart() {},
  setCartState: function setCartState() {}
};
var useCartElementContextWithUseCase = function useCartElementContextWithUseCase(useCaseMessage) {
  var isInCustomCheckout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var ctx = React.useContext(CartElementContext);

  if (isInCustomCheckout) {
    return DUMMY_CART_ELEMENT_CONTEXT;
  }

  return parseCartElementContext(ctx, useCaseMessage);
};
/**
 * @docs https://stripe.com/docs/stripe-js/react#useelements-hook
 */

var useElements = function useElements() {
  var _useElementsContextWi = useElementsContextWithUseCase('calls useElements()'),
      elements = _useElementsContextWi.elements;

  return elements;
};
/**
 * @docs https://stripe.com/docs/stripe-js/react#usestripe-hook
 */

var useStripe = function useStripe() {
  var _useElementsOrCustomC = useElementsOrCustomCheckoutSdkContextWithUseCase('calls useStripe()'),
      stripe = _useElementsOrCustomC.stripe;

  return stripe;
};
/**
 * @docs https://stripe.com/docs/payments/checkout/cart-element
 */

var useCartElement = function useCartElement() {
  var _useCartElementContex = useCartElementContextWithUseCase('calls useCartElement()'),
      cart = _useCartElementContex.cart;

  return cart;
};
/**
 * @docs https://stripe.com/docs/payments/checkout/cart-element
 */

var useCartElementState = function useCartElementState() {
  var _useCartElementContex2 = useCartElementContextWithUseCase('calls useCartElementState()'),
      cartState = _useCartElementContex2.cartState;

  return cartState;
};
/**
 * @docs https://stripe.com/docs/stripe-js/react#elements-consumer
 */

var ElementsConsumer = function ElementsConsumer(_ref2) {
  var children = _ref2.children;
  var ctx = useElementsContextWithUseCase('mounts <ElementsConsumer>'); // Assert to satisfy the busted React.FC return type (it should be ReactNode)

  return children(ctx);
};
ElementsConsumer.propTypes = {
  children: PropTypes.func.isRequired
};

var useAttachEvent = function useAttachEvent(element, event, cb) {
  var cbDefined = !!cb;
  var cbRef = React.useRef(cb); // In many integrations the callback prop changes on each render.
  // Using a ref saves us from calling element.on/.off every render.

  React.useEffect(function () {
    cbRef.current = cb;
  }, [cb]);
  React.useEffect(function () {
    if (!cbDefined || !element) {
      return function () {};
    }

    var decoratedCb = function decoratedCb() {
      if (cbRef.current) {
        cbRef.current.apply(cbRef, arguments);
      }
    };

    element.on(event, decoratedCb);
    return function () {
      element.off(event, decoratedCb);
    };
  }, [cbDefined, event, element, cbRef]);
};

var capitalized = function capitalized(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

var createElementComponent = function createElementComponent(type, isServer) {
  var displayName = "".concat(capitalized(type), "Element");

  var ClientElement = function ClientElement(_ref) {
    var id = _ref.id,
        className = _ref.className,
        _ref$options = _ref.options,
        options = _ref$options === void 0 ? {} : _ref$options,
        onBlur = _ref.onBlur,
        onFocus = _ref.onFocus,
        onReady = _ref.onReady,
        onChange = _ref.onChange,
        onEscape = _ref.onEscape,
        onClick = _ref.onClick,
        onLoadError = _ref.onLoadError,
        onLoaderStart = _ref.onLoaderStart,
        onNetworksChange = _ref.onNetworksChange,
        onCheckout = _ref.onCheckout,
        onLineItemClick = _ref.onLineItemClick,
        onConfirm = _ref.onConfirm,
        onCancel = _ref.onCancel,
        onShippingAddressChange = _ref.onShippingAddressChange,
        onShippingRateChange = _ref.onShippingRateChange;
    var ctx = useElementsOrCustomCheckoutSdkContextWithUseCase("mounts <".concat(displayName, ">"));
    var elements = 'elements' in ctx ? ctx.elements : null;
    var customCheckoutSdk = 'customCheckoutSdk' in ctx ? ctx.customCheckoutSdk : null;

    var _React$useState = React.useState(null),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        element = _React$useState2[0],
        setElement = _React$useState2[1];

    var elementRef = React.useRef(null);
    var domNode = React.useRef(null);

    var _useCartElementContex = useCartElementContextWithUseCase("mounts <".concat(displayName, ">"), 'customCheckoutSdk' in ctx),
        setCart = _useCartElementContex.setCart,
        setCartState = _useCartElementContex.setCartState; // For every event where the merchant provides a callback, call element.on
    // with that callback. If the merchant ever changes the callback, removes
    // the old callback with element.off and then call element.on with the new one.


    useAttachEvent(element, 'blur', onBlur);
    useAttachEvent(element, 'focus', onFocus);
    useAttachEvent(element, 'escape', onEscape);
    useAttachEvent(element, 'click', onClick);
    useAttachEvent(element, 'loaderror', onLoadError);
    useAttachEvent(element, 'loaderstart', onLoaderStart);
    useAttachEvent(element, 'networkschange', onNetworksChange);
    useAttachEvent(element, 'lineitemclick', onLineItemClick);
    useAttachEvent(element, 'confirm', onConfirm);
    useAttachEvent(element, 'cancel', onCancel);
    useAttachEvent(element, 'shippingaddresschange', onShippingAddressChange);
    useAttachEvent(element, 'shippingratechange', onShippingRateChange);
    var readyCallback;

    if (type === 'cart') {
      readyCallback = function readyCallback(event) {
        setCartState(event);
        onReady && onReady(event);
      };
    } else if (onReady) {
      if (type === 'expressCheckout') {
        // Passes through the event, which includes visible PM types
        readyCallback = onReady;
      } else {
        // For other Elements, pass through the Element itself.
        readyCallback = function readyCallback() {
          onReady(element);
        };
      }
    }

    useAttachEvent(element, 'ready', readyCallback);
    var changeCallback = type === 'cart' ? function (event) {
      setCartState(event);
      onChange && onChange(event);
    } : onChange;
    useAttachEvent(element, 'change', changeCallback);
    var checkoutCallback = type === 'cart' ? function (event) {
      setCartState(event);
      onCheckout && onCheckout(event);
    } : onCheckout;
    useAttachEvent(element, 'checkout', checkoutCallback);
    React.useLayoutEffect(function () {
      if (elementRef.current === null && domNode.current !== null && (elements || customCheckoutSdk)) {
        var newElement = null;

        if (customCheckoutSdk) {
          newElement = customCheckoutSdk.createElement(type, options);
        } else if (elements) {
          newElement = elements.create(type, options);
        }

        if (type === 'cart' && setCart) {
          // we know that elements.create return value must be of type StripeCartElement if type is 'cart',
          // we need to cast because typescript is not able to infer which overloaded method is used based off param type
          setCart(newElement);
        } // Store element in a ref to ensure it's _immediately_ available in cleanup hooks in StrictMode


        elementRef.current = newElement; // Store element in state to facilitate event listener attachment

        setElement(newElement);

        if (newElement) {
          newElement.mount(domNode.current);
        }
      }
    }, [elements, customCheckoutSdk, options, setCart]);
    var prevOptions = usePrevious(options);
    React.useEffect(function () {
      if (!elementRef.current) {
        return;
      }

      var updates = extractAllowedOptionsUpdates(options, prevOptions, ['paymentRequest']);

      if (updates) {
        elementRef.current.update(updates);
      }
    }, [options, prevOptions]);
    React.useLayoutEffect(function () {
      return function () {
        if (elementRef.current && typeof elementRef.current.destroy === 'function') {
          try {
            elementRef.current.destroy();
            elementRef.current = null;
          } catch (error) {// Do nothing
          }
        }
      };
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      id: id,
      className: className,
      ref: domNode
    });
  }; // Only render the Element wrapper in a server environment.


  var ServerElement = function ServerElement(props) {
    // Validate that we are in the right context by calling useElementsContextWithUseCase.
    var ctx = useElementsOrCustomCheckoutSdkContextWithUseCase("mounts <".concat(displayName, ">"));
    useCartElementContextWithUseCase("mounts <".concat(displayName, ">"), 'customCheckoutSdk' in ctx);
    var id = props.id,
        className = props.className;
    return /*#__PURE__*/React.createElement("div", {
      id: id,
      className: className
    });
  };

  var Element = isServer ? ServerElement : ClientElement;
  Element.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onReady: PropTypes.func,
    onEscape: PropTypes.func,
    onClick: PropTypes.func,
    onLoadError: PropTypes.func,
    onLoaderStart: PropTypes.func,
    onNetworksChange: PropTypes.func,
    onCheckout: PropTypes.func,
    onLineItemClick: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onShippingAddressChange: PropTypes.func,
    onShippingRateChange: PropTypes.func,
    options: PropTypes.object
  };
  Element.displayName = displayName;
  Element.__elementType = type;
  return Element;
};

var isServer = typeof window === 'undefined';

var EmbeddedCheckoutContext = /*#__PURE__*/React.createContext(null);
EmbeddedCheckoutContext.displayName = 'EmbeddedCheckoutProviderContext';
var useEmbeddedCheckoutContext = function useEmbeddedCheckoutContext() {
  var ctx = React.useContext(EmbeddedCheckoutContext);

  if (!ctx) {
    throw new Error('<EmbeddedCheckout> must be used within <EmbeddedCheckoutProvider>');
  }

  return ctx;
};
var INVALID_STRIPE_ERROR$2 = 'Invalid prop `stripe` supplied to `EmbeddedCheckoutProvider`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.';
var EmbeddedCheckoutProvider = function EmbeddedCheckoutProvider(_ref) {
  var rawStripeProp = _ref.stripe,
      options = _ref.options,
      children = _ref.children;
  var parsed = React.useMemo(function () {
    return parseStripeProp(rawStripeProp, INVALID_STRIPE_ERROR$2);
  }, [rawStripeProp]);
  var embeddedCheckoutPromise = React.useRef(null);
  var loadedStripe = React.useRef(null);

  var _React$useState = React.useState({
    embeddedCheckout: null
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      ctx = _React$useState2[0],
      setContext = _React$useState2[1];

  React.useEffect(function () {
    // Don't support any ctx updates once embeddedCheckout or stripe is set.
    if (loadedStripe.current || embeddedCheckoutPromise.current) {
      return;
    }

    var setStripeAndInitEmbeddedCheckout = function setStripeAndInitEmbeddedCheckout(stripe) {
      if (loadedStripe.current || embeddedCheckoutPromise.current) return;
      loadedStripe.current = stripe;
      embeddedCheckoutPromise.current = loadedStripe.current.initEmbeddedCheckout(options).then(function (embeddedCheckout) {
        setContext({
          embeddedCheckout: embeddedCheckout
        });
      });
    }; // For an async stripePromise, store it once resolved


    if (parsed.tag === 'async' && !loadedStripe.current && options.clientSecret) {
      parsed.stripePromise.then(function (stripe) {
        if (stripe) {
          setStripeAndInitEmbeddedCheckout(stripe);
        }
      });
    } else if (parsed.tag === 'sync' && !loadedStripe.current && options.clientSecret) {
      // Or, handle a sync stripe instance going from null -> populated
      setStripeAndInitEmbeddedCheckout(parsed.stripe);
    }
  }, [parsed, options, ctx, loadedStripe]);
  React.useEffect(function () {
    // cleanup on unmount
    return function () {
      // If embedded checkout is fully initialized, destroy it.
      if (ctx.embeddedCheckout) {
        embeddedCheckoutPromise.current = null;
        ctx.embeddedCheckout.destroy();
      } else if (embeddedCheckoutPromise.current) {
        // If embedded checkout is still initializing, destroy it once
        // it's done. This could be caused by unmounting very quickly
        // after mounting.
        embeddedCheckoutPromise.current.then(function () {
          embeddedCheckoutPromise.current = null;

          if (ctx.embeddedCheckout) {
            ctx.embeddedCheckout.destroy();
          }
        });
      }
    };
  }, [ctx.embeddedCheckout]); // Attach react-stripe-js version to stripe.js instance

  React.useEffect(function () {
    registerWithStripeJs(loadedStripe);
  }, [loadedStripe]); // Warn on changes to stripe prop.
  // The stripe prop value can only go from null to non-null once and
  // can't be changed after that.

  var prevStripe = usePrevious(rawStripeProp);
  React.useEffect(function () {
    if (prevStripe !== null && prevStripe !== rawStripeProp) {
      console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the `stripe` prop after setting it.');
    }
  }, [prevStripe, rawStripeProp]); // Warn on changes to options.

  var prevOptions = usePrevious(options);
  React.useEffect(function () {
    if (prevOptions == null) {
      return;
    }

    if (options == null) {
      console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot unset options after setting them.');
      return;
    }

    if (prevOptions.clientSecret != null && options.clientSecret !== prevOptions.clientSecret) {
      console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the client secret after setting it. Unmount and create a new instance of EmbeddedCheckoutProvider instead.');
    }

    if (prevOptions.onComplete != null && options.onComplete !== prevOptions.onComplete) {
      console.warn('Unsupported prop change on EmbeddedCheckoutProvider: You cannot change the onComplete option after setting it.');
    }
  }, [prevOptions, options]);
  return /*#__PURE__*/React.createElement(EmbeddedCheckoutContext.Provider, {
    value: ctx
  }, children);
};

var EmbeddedCheckoutClientElement = function EmbeddedCheckoutClientElement(_ref) {
  var id = _ref.id,
      className = _ref.className;

  var _useEmbeddedCheckoutC = useEmbeddedCheckoutContext(),
      embeddedCheckout = _useEmbeddedCheckoutC.embeddedCheckout;

  var isMounted = React.useRef(false);
  var domNode = React.useRef(null);
  React.useLayoutEffect(function () {
    if (!isMounted.current && embeddedCheckout && domNode.current !== null) {
      embeddedCheckout.mount(domNode.current);
      isMounted.current = true;
    } // Clean up on unmount


    return function () {
      if (isMounted.current && embeddedCheckout) {
        try {
          embeddedCheckout.unmount();
          isMounted.current = false;
        } catch (e) {// Do nothing.
          // Parent effects are destroyed before child effects, so
          // in cases where both the EmbeddedCheckoutProvider and
          // the EmbeddedCheckout component are removed at the same
          // time, the embeddedCheckout instance will be destroyed,
          // which causes an error when calling unmount.
        }
      }
    };
  }, [embeddedCheckout]);
  return /*#__PURE__*/React.createElement("div", {
    ref: domNode,
    id: id,
    className: className
  });
}; // Only render the wrapper in a server environment.


var EmbeddedCheckoutServerElement = function EmbeddedCheckoutServerElement(_ref2) {
  var id = _ref2.id,
      className = _ref2.className;
  // Validate that we are in the right context by calling useEmbeddedCheckoutContext.
  useEmbeddedCheckoutContext();
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    className: className
  });
};

var EmbeddedCheckout = isServer ? EmbeddedCheckoutServerElement : EmbeddedCheckoutClientElement;

/**
 * Requires beta access:
 * Contact [Stripe support](https://support.stripe.com/) for more information.
 *
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var AuBankAccountElement = createElementComponent('auBankAccount', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var CardElement = createElementComponent('card', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var CardNumberElement = createElementComponent('cardNumber', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var CardExpiryElement = createElementComponent('cardExpiry', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var CardCvcElement = createElementComponent('cardCvc', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var FpxBankElement = createElementComponent('fpxBank', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var IbanElement = createElementComponent('iban', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var IdealBankElement = createElementComponent('idealBank', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var P24BankElement = createElementComponent('p24Bank', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var EpsBankElement = createElementComponent('epsBank', isServer);
var PaymentElement = createElementComponent('payment', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var ExpressCheckoutElement = createElementComponent('expressCheckout', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var PaymentRequestButtonElement = createElementComponent('paymentRequestButton', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var LinkAuthenticationElement = createElementComponent('linkAuthentication', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var AddressElement = createElementComponent('address', isServer);
/**
 * @deprecated
 * Use `AddressElement` instead.
 *
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var ShippingAddressElement = createElementComponent('shippingAddress', isServer);
/**
 * Requires beta access:
 * Contact [Stripe support](https://support.stripe.com/) for more information.
 *
 * @docs https://stripe.com/docs/elements/cart-element
 */

var CartElement = createElementComponent('cart', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var PaymentMethodMessagingElement = createElementComponent('paymentMethodMessaging', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var AffirmMessageElement = createElementComponent('affirmMessage', isServer);
/**
 * @docs https://stripe.com/docs/stripe-js/react#element-components
 */

var AfterpayClearpayMessageElement = createElementComponent('afterpayClearpayMessage', isServer);

exports.AddressElement = AddressElement;
exports.AffirmMessageElement = AffirmMessageElement;
exports.AfterpayClearpayMessageElement = AfterpayClearpayMessageElement;
exports.AuBankAccountElement = AuBankAccountElement;
exports.CardCvcElement = CardCvcElement;
exports.CardElement = CardElement;
exports.CardExpiryElement = CardExpiryElement;
exports.CardNumberElement = CardNumberElement;
exports.CartElement = CartElement;
exports.CustomCheckoutProvider = CustomCheckoutProvider;
exports.Elements = Elements;
exports.ElementsConsumer = ElementsConsumer;
exports.EmbeddedCheckout = EmbeddedCheckout;
exports.EmbeddedCheckoutProvider = EmbeddedCheckoutProvider;
exports.EpsBankElement = EpsBankElement;
exports.ExpressCheckoutElement = ExpressCheckoutElement;
exports.FpxBankElement = FpxBankElement;
exports.IbanElement = IbanElement;
exports.IdealBankElement = IdealBankElement;
exports.LinkAuthenticationElement = LinkAuthenticationElement;
exports.P24BankElement = P24BankElement;
exports.PaymentElement = PaymentElement;
exports.PaymentMethodMessagingElement = PaymentMethodMessagingElement;
exports.PaymentRequestButtonElement = PaymentRequestButtonElement;
exports.ShippingAddressElement = ShippingAddressElement;
exports.useCartElement = useCartElement;
exports.useCartElementState = useCartElementState;
exports.useCustomCheckout = useCustomCheckout;
exports.useElements = useElements;
exports.useStripe = useStripe;
