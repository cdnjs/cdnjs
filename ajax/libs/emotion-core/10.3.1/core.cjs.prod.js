"use strict";

Object.defineProperty(exports, "__esModule", {
  value: !0
});

var _inheritsLoose = require("@babel/runtime/helpers/inheritsLoose"), React = require("react");

require("@emotion/cache");

var emotionElement = require("./emotion-element-968a0f7e.cjs.prod.js"), utils = require("@emotion/utils"), serialize = require("@emotion/serialize"), sheet = require("@emotion/sheet"), css = require("@emotion/css");

function _interopDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

var _inheritsLoose__default = _interopDefault(_inheritsLoose), css__default = _interopDefault(css), jsx = function(type, props) {
  var args = arguments;
  if (null == props || !emotionElement.hasOwnProperty.call(props, "css")) return React.createElement.apply(void 0, args);
  var argsLength = args.length, createElementArgArray = new Array(argsLength);
  createElementArgArray[0] = emotionElement.Emotion, createElementArgArray[1] = emotionElement.createEmotionProps(type, props);
  for (var i = 2; i < argsLength; i++) createElementArgArray[i] = args[i];
  return React.createElement.apply(null, createElementArgArray);
}, warnedAboutCssPropForGlobal = !1, Global = emotionElement.withEmotionCache((function(props, cache) {
  var styles = props.styles;
  if ("function" == typeof styles) return React.createElement(emotionElement.ThemeContext.Consumer, null, (function(theme) {
    var serialized = serialize.serializeStyles([ styles(theme) ]);
    return React.createElement(InnerGlobal, {
      serialized: serialized,
      cache: cache
    });
  }));
  var serialized = serialize.serializeStyles([ styles ]);
  return React.createElement(InnerGlobal, {
    serialized: serialized,
    cache: cache
  });
})), InnerGlobal = function(_React$Component) {
  function InnerGlobal(props, context, updater) {
    return _React$Component.call(this, props, context, updater) || this;
  }
  _inheritsLoose__default.default(InnerGlobal, _React$Component);
  var _proto = InnerGlobal.prototype;
  return _proto.componentDidMount = function() {
    this.sheet = new sheet.StyleSheet({
      key: this.props.cache.key + "-global",
      nonce: this.props.cache.sheet.nonce,
      container: this.props.cache.sheet.container
    });
    var node = document.querySelector("style[data-emotion-" + this.props.cache.key + '="' + this.props.serialized.name + '"]');
    null !== node && this.sheet.tags.push(node), this.props.cache.sheet.tags.length && (this.sheet.before = this.props.cache.sheet.tags[0]), 
    this.insertStyles();
  }, _proto.componentDidUpdate = function(prevProps) {
    prevProps.serialized.name !== this.props.serialized.name && this.insertStyles();
  }, _proto.insertStyles = function() {
    if (void 0 !== this.props.serialized.next && utils.insertStyles(this.props.cache, this.props.serialized.next, !0), 
    this.sheet.tags.length) {
      var element = this.sheet.tags[this.sheet.tags.length - 1].nextElementSibling;
      this.sheet.before = element, this.sheet.flush();
    }
    this.props.cache.insert("", this.props.serialized, this.sheet, !1);
  }, _proto.componentWillUnmount = function() {
    this.sheet.flush();
  }, _proto.render = function() {
    if (!emotionElement.isBrowser) {
      for (var serialized = this.props.serialized, serializedNames = serialized.name, serializedStyles = serialized.styles, next = serialized.next; void 0 !== next; ) serializedNames += " " + next.name, 
      serializedStyles += next.styles, next = next.next;
      var _ref, shouldCache = !0 === this.props.cache.compat, rules = this.props.cache.insert("", {
        name: serializedNames,
        styles: serializedStyles
      }, this.sheet, shouldCache);
      if (!shouldCache) return React.createElement("style", ((_ref = {})["data-emotion-" + this.props.cache.key] = serializedNames, 
      _ref.dangerouslySetInnerHTML = {
        __html: rules
      }, _ref.nonce = this.props.cache.sheet.nonce, _ref));
    }
    return null;
  }, InnerGlobal;
}(React.Component), keyframes = function() {
  var insertable = css__default.default.apply(void 0, arguments), name = "animation-" + insertable.name;
  return {
    name: name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}, classnames = function classnames(args) {
  for (var len = args.length, i = 0, cls = ""; i < len; i++) {
    var arg = args[i];
    if (null != arg) {
      var toAdd = void 0;
      switch (typeof arg) {
       case "boolean":
        break;

       case "object":
        if (Array.isArray(arg)) toAdd = classnames(arg); else for (var k in toAdd = "", 
        arg) arg[k] && k && (toAdd && (toAdd += " "), toAdd += k);
        break;

       default:
        toAdd = arg;
      }
      toAdd && (cls && (cls += " "), cls += toAdd);
    }
  }
  return cls;
};

function merge(registered, css, className) {
  var registeredStyles = [], rawClassName = utils.getRegisteredStyles(registered, registeredStyles, className);
  return registeredStyles.length < 2 ? className : rawClassName + css(registeredStyles);
}

var Noop = function() {
  return null;
}, ClassNames = emotionElement.withEmotionCache((function(props, context) {
  return React.createElement(emotionElement.ThemeContext.Consumer, null, (function(theme) {
    var rules = "", serializedHashes = "", css = function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
      var serialized = serialize.serializeStyles(args, context.registered);
      if (emotionElement.isBrowser) utils.insertStyles(context, serialized, !1); else {
        var res = utils.insertStyles(context, serialized, !1);
        void 0 !== res && (rules += res);
      }
      return emotionElement.isBrowser || (serializedHashes += " " + serialized.name), 
      context.key + "-" + serialized.name;
    }, content = {
      css: css,
      cx: function() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
        return merge(context.registered, css, classnames(args));
      },
      theme: theme
    }, ele = props.children(content);
    var _ref, possiblyStyleElement = React.createElement(Noop, null);
    emotionElement.isBrowser || 0 === rules.length || (possiblyStyleElement = React.createElement("style", ((_ref = {})["data-emotion-" + context.key] = serializedHashes.substring(1), 
    _ref.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref.nonce = context.sheet.nonce, _ref)));
    return React.createElement(React.Fragment, null, possiblyStyleElement, ele);
  }));
}));

exports.CacheProvider = emotionElement.CacheProvider, exports.ThemeContext = emotionElement.ThemeContext, 
Object.defineProperty(exports, "withEmotionCache", {
  enumerable: !0,
  get: function() {
    return emotionElement.withEmotionCache;
  }
}), Object.defineProperty(exports, "css", {
  enumerable: !0,
  get: function() {
    return css__default.default;
  }
}), exports.ClassNames = ClassNames, exports.Global = Global, exports.createElement = jsx, 
exports.jsx = jsx, exports.keyframes = keyframes;
