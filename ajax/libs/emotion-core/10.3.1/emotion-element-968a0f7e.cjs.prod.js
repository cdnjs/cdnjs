"use strict";

var _inheritsLoose = require("@babel/runtime/helpers/inheritsLoose"), React = require("react"), createCache = require("@emotion/cache"), utils = require("@emotion/utils"), serialize = require("@emotion/serialize");

function _interopDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var _inheritsLoose__default = _interopDefault(_inheritsLoose), createCache__default = _interopDefault(createCache), isBrowser = "undefined" != typeof document, hasOwnProperty = Object.prototype.hasOwnProperty, EmotionCacheContext = React.createContext("undefined" != typeof HTMLElement ? createCache__default.default() : null), ThemeContext = React.createContext({}), CacheProvider = EmotionCacheContext.Provider;

if (exports.withEmotionCache = function(func) {
  var render = function(props, ref) {
    return React.createElement(EmotionCacheContext.Consumer, null, (function(cache) {
      return func(props, cache, ref);
    }));
  };
  return React.forwardRef(render);
}, !isBrowser) {
  var BasicProvider = function(_React$Component) {
    function BasicProvider(props, context, updater) {
      var _this;
      return (_this = _React$Component.call(this, props, context, updater) || this).state = {
        value: createCache__default.default()
      }, _this;
    }
    return _inheritsLoose__default.default(BasicProvider, _React$Component), BasicProvider.prototype.render = function() {
      return React.createElement(EmotionCacheContext.Provider, this.state, this.props.children(this.state.value));
    }, BasicProvider;
  }(React.Component);
  exports.withEmotionCache = function(func) {
    return function(props) {
      return React.createElement(EmotionCacheContext.Consumer, null, (function(context) {
        return null === context ? React.createElement(BasicProvider, null, (function(newContext) {
          return func(props, newContext);
        })) : func(props, context);
      }));
    };
  };
}

var sanitizeIdentifier = function(identifier) {
  return identifier.replace(/\$/g, "-");
}, typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", labelPropName = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__", createEmotionProps = function(type, props) {
  var newProps = {};
  for (var key in props) hasOwnProperty.call(props, key) && (newProps[key] = props[key]);
  return newProps[typePropName] = type, newProps;
}, Noop = function() {
  return null;
}, render = function(cache, props, theme, ref) {
  var cssProp = null === theme ? props.css : props.css(theme);
  "string" == typeof cssProp && void 0 !== cache.registered[cssProp] && (cssProp = cache.registered[cssProp]);
  var type = props[typePropName], registeredStyles = [ cssProp ], className = "";
  "string" == typeof props.className ? className = utils.getRegisteredStyles(cache.registered, registeredStyles, props.className) : null != props.className && (className = props.className + " ");
  var serialized = serialize.serializeStyles(registeredStyles), rules = utils.insertStyles(cache, serialized, "string" == typeof type);
  className += cache.key + "-" + serialized.name;
  var newProps = {};
  for (var key in props) hasOwnProperty.call(props, key) && "css" !== key && key !== typePropName && (newProps[key] = props[key]);
  newProps.ref = ref, newProps.className = className;
  var ele = React.createElement(type, newProps), possiblyStyleElement = React.createElement(Noop, null);
  if (!isBrowser && void 0 !== rules) {
    for (var _ref, serializedNames = serialized.name, next = serialized.next; void 0 !== next; ) serializedNames += " " + next.name, 
    next = next.next;
    possiblyStyleElement = React.createElement("style", ((_ref = {})["data-emotion-" + cache.key] = serializedNames, 
    _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = cache.sheet.nonce, _ref));
  }
  return React.createElement(React.Fragment, null, possiblyStyleElement, ele);
}, Emotion = exports.withEmotionCache((function(props, cache, ref) {
  return "function" == typeof props.css ? React.createElement(ThemeContext.Consumer, null, (function(theme) {
    return render(cache, props, theme, ref);
  })) : render(cache, props, null, ref);
}));

exports.CacheProvider = CacheProvider, exports.Emotion = Emotion, exports.ThemeContext = ThemeContext, 
exports.createEmotionProps = createEmotionProps, exports.hasOwnProperty = hasOwnProperty, 
exports.isBrowser = isBrowser;
