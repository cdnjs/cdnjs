import React from 'react';
import PropTypes from 'prop-types';

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

var INVALID_STRIPE_ERROR$1 = 'Invalid prop `stripe` supplied to `Elements`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.'; // We are using types to enforce the `stripe` prop in this lib, but in a real
// integration `stripe` could be anything, so we need to do some sanity
// validation to prevent type errors.

var validateStripe = function validateStripe(maybeStripe) {
  var errorMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INVALID_STRIPE_ERROR$1;

  if (maybeStripe === null || isStripe(maybeStripe)) {
    return maybeStripe;
  }

  throw new Error(errorMsg);
};

var parseStripeProp = function parseStripeProp(raw) {
  var errorMsg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : INVALID_STRIPE_ERROR$1;

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

var usePrevious = function usePrevious(value) {
  var ref = React.useRef(value);
  React.useEffect(function () {
    ref.current = value;
  }, [value]);
  return ref.current;
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

var registerWithStripeJs = function registerWithStripeJs(stripe) {
  if (!stripe || !stripe._registerWrapper || !stripe.registerAppInfo) {
    return;
  }

  stripe._registerWrapper({
    name: 'react-stripe-js',
    version: "4.0.2"
  });

  stripe.registerAppInfo({
    name: 'react-stripe-js',
    version: "4.0.2",
    url: 'https://stripe.com/docs/stripe-js/react'
  });
};

var ElementsContext = /*#__PURE__*/React.createContext(null);
ElementsContext.displayName = 'ElementsContext';
var parseElementsContext = function parseElementsContext(ctx, useCase) {
  if (!ctx) {
    throw new Error("Could not find Elements context; You need to wrap the part of your app that ".concat(useCase, " in an <Elements> provider."));
  }

  return ctx;
};
({
  stripe: PropTypes.any,
  options: PropTypes.object
});
({
  children: PropTypes.func.isRequired
});

var _excluded$2 = ["on", "session"];
var CheckoutContext = /*#__PURE__*/React.createContext(null);
CheckoutContext.displayName = 'CheckoutContext';

var validateCheckoutContext = function validateCheckoutContext(ctx, useCase) {
  if (!ctx) {
    throw new Error("Could not find CheckoutProvider context; You need to wrap the part of your app that ".concat(useCase, " in a <CheckoutProvider> provider."));
  }

  return ctx;
};

var getContextValue = function getContextValue(stripe, state) {
  if (state.type === 'success') {
    var sdk = state.sdk,
        session = state.session;

    sdk.on;
        sdk.session;
        var actions = _objectWithoutProperties(sdk, _excluded$2);

    return {
      stripe: stripe,
      checkoutState: {
        type: 'success',
        checkout: Object.assign({}, session, actions)
      }
    };
  } else {
    return {
      stripe: stripe,
      checkoutState: state
    };
  }
};

var INVALID_STRIPE_ERROR = 'Invalid prop `stripe` supplied to `CheckoutProvider`. We recommend using the `loadStripe` utility from `@stripe/stripe-js`. See https://stripe.com/docs/stripe-js/react#elements-props-stripe for details.';

var maybeSdk = function maybeSdk(state) {
  if (state.type === 'success') {
    return state.sdk;
  } else {
    return null;
  }
};

var CheckoutProvider = function CheckoutProvider(_ref) {
  var rawStripeProp = _ref.stripe,
      options = _ref.options,
      children = _ref.children;
  var parsed = React.useMemo(function () {
    return parseStripeProp(rawStripeProp, INVALID_STRIPE_ERROR);
  }, [rawStripeProp]);

  var _React$useState = React.useState({
    type: 'loading'
  }),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      state = _React$useState2[0],
      setState = _React$useState2[1];

  var _React$useState3 = React.useState(null),
      _React$useState4 = _slicedToArray(_React$useState3, 2),
      stripe = _React$useState4[0],
      setStripe = _React$useState4[1]; // Ref used to avoid calling initCheckout multiple times when options changes


  var initCheckoutCalledRef = React.useRef(false);
  React.useEffect(function () {
    var isMounted = true;

    var init = function init(_ref2) {
      var stripe = _ref2.stripe;

      if (stripe && isMounted && !initCheckoutCalledRef.current) {
        // Only update context if the component is still mounted
        // and stripe is not null. We allow stripe to be null to make
        // handling SSR easier.
        initCheckoutCalledRef.current = true;
        stripe.initCheckout(options).then(function (sdk) {
          setState({
            type: 'success',
            sdk: sdk,
            session: sdk.session()
          });
          sdk.on('change', function (session) {
            setState(function (prevState) {
              if (prevState.type === 'success') {
                return {
                  type: 'success',
                  sdk: prevState.sdk,
                  session: session
                };
              } else {
                return prevState;
              }
            });
          });
        }, function (error) {
          setState({
            type: 'error',
            error: error
          });
        });
      }
    };

    if (parsed.tag === 'async') {
      parsed.stripePromise.then(function (stripe) {
        setStripe(stripe);

        if (stripe) {
          init({
            stripe: stripe
          });
        }
      });
    } else if (parsed.tag === 'sync') {
      setStripe(parsed.stripe);
      init({
        stripe: parsed.stripe
      });
    }

    return function () {
      isMounted = false;
    };
  }, [parsed, options, setState]); // Warn on changes to stripe prop

  var prevStripe = usePrevious(rawStripeProp);
  React.useEffect(function () {
    if (prevStripe !== null && prevStripe !== rawStripeProp) {
      console.warn('Unsupported prop change on CheckoutProvider: You cannot change the `stripe` prop after setting it.');
    }
  }, [prevStripe, rawStripeProp]); // Apply updates to elements when options prop has relevant changes

  var sdk = maybeSdk(state);
  var prevOptions = usePrevious(options);
  var prevCheckoutSdk = usePrevious(sdk);
  React.useEffect(function () {
    var _prevOptions$elements, _options$elementsOpti, _prevOptions$elements2, _options$elementsOpti2;

    // Ignore changes while checkout sdk is not initialized.
    if (!sdk) {
      return;
    }

    var hasSdkLoaded = Boolean(!prevCheckoutSdk && sdk); // Handle appearance changes

    var previousAppearance = prevOptions === null || prevOptions === void 0 ? void 0 : (_prevOptions$elements = prevOptions.elementsOptions) === null || _prevOptions$elements === void 0 ? void 0 : _prevOptions$elements.appearance;
    var currentAppearance = options === null || options === void 0 ? void 0 : (_options$elementsOpti = options.elementsOptions) === null || _options$elementsOpti === void 0 ? void 0 : _options$elementsOpti.appearance;
    var hasAppearanceChanged = !isEqual(currentAppearance, previousAppearance);

    if (currentAppearance && (hasAppearanceChanged || hasSdkLoaded)) {
      sdk.changeAppearance(currentAppearance);
    } // Handle fonts changes


    var previousFonts = prevOptions === null || prevOptions === void 0 ? void 0 : (_prevOptions$elements2 = prevOptions.elementsOptions) === null || _prevOptions$elements2 === void 0 ? void 0 : _prevOptions$elements2.fonts;
    var currentFonts = options === null || options === void 0 ? void 0 : (_options$elementsOpti2 = options.elementsOptions) === null || _options$elementsOpti2 === void 0 ? void 0 : _options$elementsOpti2.fonts;
    var hasFontsChanged = !isEqual(previousFonts, currentFonts);

    if (currentFonts && (hasFontsChanged || hasSdkLoaded)) {
      sdk.loadFonts(currentFonts);
    }
  }, [options, prevOptions, sdk, prevCheckoutSdk]); // Attach react-stripe-js version to stripe.js instance

  React.useEffect(function () {
    registerWithStripeJs(stripe);
  }, [stripe]);
  var contextValue = React.useMemo(function () {
    return getContextValue(stripe, state);
  }, [stripe, state]);
  return /*#__PURE__*/React.createElement(CheckoutContext.Provider, {
    value: contextValue
  }, children);
};
CheckoutProvider.propTypes = {
  stripe: PropTypes.any,
  options: PropTypes.shape({
    fetchClientSecret: PropTypes.func.isRequired,
    elementsOptions: PropTypes.object
  }).isRequired
};
var useElementsOrCheckoutContextWithUseCase = function useElementsOrCheckoutContextWithUseCase(useCaseString) {
  var checkout = React.useContext(CheckoutContext);
  var elements = React.useContext(ElementsContext);

  if (checkout) {
    if (elements) {
      throw new Error("You cannot wrap the part of your app that ".concat(useCaseString, " in both <CheckoutProvider> and <Elements> providers."));
    } else {
      return checkout;
    }
  } else {
    return parseElementsContext(elements, useCaseString);
  }
};
var useCheckout = function useCheckout() {
  var ctx = React.useContext(CheckoutContext);

  var _validateCheckoutCont = validateCheckoutContext(ctx, 'calls useCheckout()'),
      checkoutState = _validateCheckoutCont.checkoutState;

  return checkoutState;
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

var _excluded$1 = ["mode"];

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
        onConfirm = _ref.onConfirm,
        onCancel = _ref.onCancel,
        onShippingAddressChange = _ref.onShippingAddressChange,
        onShippingRateChange = _ref.onShippingRateChange,
        onSavedPaymentMethodRemove = _ref.onSavedPaymentMethodRemove,
        onSavedPaymentMethodUpdate = _ref.onSavedPaymentMethodUpdate;
    var ctx = useElementsOrCheckoutContextWithUseCase("mounts <".concat(displayName, ">"));
    var elements = 'elements' in ctx ? ctx.elements : null;
    var checkoutState = 'checkoutState' in ctx ? ctx.checkoutState : null;
    var checkoutSdk = (checkoutState === null || checkoutState === void 0 ? void 0 : checkoutState.type) === 'success' ? checkoutState.checkout : null;

    var _React$useState = React.useState(null),
        _React$useState2 = _slicedToArray(_React$useState, 2),
        element = _React$useState2[0],
        setElement = _React$useState2[1];

    var elementRef = React.useRef(null);
    var domNode = React.useRef(null); // For every event where the merchant provides a callback, call element.on
    // with that callback. If the merchant ever changes the callback, removes
    // the old callback with element.off and then call element.on with the new one.

    useAttachEvent(element, 'blur', onBlur);
    useAttachEvent(element, 'focus', onFocus);
    useAttachEvent(element, 'escape', onEscape);
    useAttachEvent(element, 'click', onClick);
    useAttachEvent(element, 'loaderror', onLoadError);
    useAttachEvent(element, 'loaderstart', onLoaderStart);
    useAttachEvent(element, 'networkschange', onNetworksChange);
    useAttachEvent(element, 'confirm', onConfirm);
    useAttachEvent(element, 'cancel', onCancel);
    useAttachEvent(element, 'shippingaddresschange', onShippingAddressChange);
    useAttachEvent(element, 'shippingratechange', onShippingRateChange);
    useAttachEvent(element, 'savedpaymentmethodremove', onSavedPaymentMethodRemove);
    useAttachEvent(element, 'savedpaymentmethodupdate', onSavedPaymentMethodUpdate);
    useAttachEvent(element, 'change', onChange);
    var readyCallback;

    if (onReady) {
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
    React.useLayoutEffect(function () {
      if (elementRef.current === null && domNode.current !== null && (elements || checkoutSdk)) {
        var newElement = null;

        if (checkoutSdk) {
          switch (type) {
            case 'payment':
              newElement = checkoutSdk.createPaymentElement(options);
              break;

            case 'address':
              if ('mode' in options) {
                var mode = options.mode,
                    restOptions = _objectWithoutProperties(options, _excluded$1);

                if (mode === 'shipping') {
                  newElement = checkoutSdk.createShippingAddressElement(restOptions);
                } else if (mode === 'billing') {
                  newElement = checkoutSdk.createBillingAddressElement(restOptions);
                } else {
                  throw new Error("Invalid options.mode. mode must be 'billing' or 'shipping'.");
                }
              } else {
                throw new Error("You must supply options.mode. mode must be 'billing' or 'shipping'.");
              }

              break;

            case 'expressCheckout':
              newElement = checkoutSdk.createExpressCheckoutElement(options);
              break;

            case 'currencySelector':
              newElement = checkoutSdk.createCurrencySelectorElement();
              break;

            case 'taxId':
              newElement = checkoutSdk.createTaxIdElement(options);
              break;

            default:
              throw new Error("Invalid Element type ".concat(displayName, ". You must use either the <PaymentElement />, <AddressElement options={{mode: 'shipping'}} />, <AddressElement options={{mode: 'billing'}} />, or <ExpressCheckoutElement />."));
          }
        } else if (elements) {
          newElement = elements.create(type, options);
        } // Store element in a ref to ensure it's _immediately_ available in cleanup hooks in StrictMode


        elementRef.current = newElement; // Store element in state to facilitate event listener attachment

        setElement(newElement);

        if (newElement) {
          newElement.mount(domNode.current);
        }
      }
    }, [elements, checkoutSdk, options]);
    var prevOptions = usePrevious(options);
    React.useEffect(function () {
      if (!elementRef.current) {
        return;
      }

      var updates = extractAllowedOptionsUpdates(options, prevOptions, ['paymentRequest']);

      if (updates && 'update' in elementRef.current) {
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
    useElementsOrCheckoutContextWithUseCase("mounts <".concat(displayName, ">"));
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
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onShippingAddressChange: PropTypes.func,
    onShippingRateChange: PropTypes.func,
    onSavedPaymentMethodRemove: PropTypes.func,
    onSavedPaymentMethodUpdate: PropTypes.func,
    options: PropTypes.object
  };
  Element.displayName = displayName;
  Element.__elementType = type;
  return Element;
};

var isServer = typeof window === 'undefined';

var _excluded = ["options"],
    _excluded2 = ["options"];
/**
 * Requires beta access:
 * Contact [Stripe support](https://support.stripe.com/) for more information.
 */

var CurrencySelectorElement = createElementComponent('currencySelector', isServer);
var PaymentElement = createElementComponent('payment', isServer);
var ExpressCheckoutElement = createElementComponent('expressCheckout', isServer);
var TaxIdElement = createElementComponent('taxId', isServer);
var AddressElementBase = createElementComponent('address', isServer);
var BillingAddressElement = function BillingAddressElement(props) {
  var options = props.options,
      rest = _objectWithoutProperties(props, _excluded);

  var merged = _objectSpread2(_objectSpread2({}, options), {}, {
    mode: 'billing'
  });

  return /*#__PURE__*/React.createElement(AddressElementBase, _objectSpread2(_objectSpread2({}, rest), {}, {
    options: merged
  }));
};
var ShippingAddressElement = function ShippingAddressElement(props) {
  var options = props.options,
      rest = _objectWithoutProperties(props, _excluded2);

  var merged = _objectSpread2(_objectSpread2({}, options), {}, {
    mode: 'shipping'
  });

  return /*#__PURE__*/React.createElement(AddressElementBase, _objectSpread2(_objectSpread2({}, rest), {}, {
    options: merged
  }));
};

export { BillingAddressElement, CheckoutProvider, CurrencySelectorElement, ExpressCheckoutElement, PaymentElement, ShippingAddressElement, TaxIdElement, useCheckout };
