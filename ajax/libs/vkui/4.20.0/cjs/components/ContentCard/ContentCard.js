"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _Card = _interopRequireDefault(require("../Card/Card"));

var _Caption = _interopRequireDefault(require("../Typography/Caption/Caption"));

var _Title = _interopRequireDefault(require("../Typography/Title/Title"));

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _utils = require("../../lib/utils");

var _excluded = ["subtitle", "header", "text", "caption", "className", "mode", "style", "getRootRef", "getRef", "maxHeight", "image", "src", "srcSet", "alt", "width", "height", "crossOrigin", "decoding", "loading", "referrerPolicy", "sizes", "useMap"];

var ContentCard = function ContentCard(props) {
  var subtitle = props.subtitle,
      header = props.header,
      text = props.text,
      caption = props.caption,
      className = props.className,
      mode = props.mode,
      style = props.style,
      getRootRef = props.getRootRef,
      getRef = props.getRef,
      maxHeight = props.maxHeight,
      image = props.image,
      src = props.src,
      srcSet = props.srcSet,
      alt = props.alt,
      width = props.width,
      height = props.height,
      crossOrigin = props.crossOrigin,
      decoding = props.decoding,
      loading = props.loading,
      referrerPolicy = props.referrerPolicy,
      sizes = props.sizes,
      useMap = props.useMap,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var disabled = restProps.disabled || typeof restProps.onClick !== 'function';
  var source = image || src;
  return (0, _jsxRuntime.createScopedElement)(_Card.default, {
    mode: mode,
    getRootRef: getRootRef,
    vkuiClass: (0, _getClassName.getClassName)('ContentCard', platform),
    style: style,
    className: className
  }, (0, _jsxRuntime.createScopedElement)(_Tappable.default, (0, _extends2.default)({}, restProps, {
    disabled: disabled,
    vkuiClass: "ContentCard__tappable"
  }), (source || srcSet) && (0, _jsxRuntime.createScopedElement)("img", {
    ref: getRef,
    vkuiClass: "ContentCard__img",
    src: source,
    srcSet: srcSet,
    alt: alt,
    crossOrigin: crossOrigin,
    decoding: decoding,
    loading: loading,
    referrerPolicy: referrerPolicy,
    sizes: sizes,
    useMap: useMap,
    height: height,
    style: {
      maxHeight: maxHeight
    },
    width: "100%"
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "ContentCard__body"
  }, (0, _utils.hasReactNode)(subtitle) && (0, _jsxRuntime.createScopedElement)(_Caption.default, {
    caps: true,
    vkuiClass: "ContentCard__text",
    weight: "semibold",
    level: "3"
  }, subtitle), (0, _utils.hasReactNode)(header) && (0, _jsxRuntime.createScopedElement)(_Title.default, {
    vkuiClass: "ContentCard__text",
    weight: "semibold",
    level: "3"
  }, header), (0, _utils.hasReactNode)(text) && (0, _jsxRuntime.createScopedElement)(_Text.default, {
    vkuiClass: "ContentCard__text",
    weight: "regular"
  }, text), (0, _utils.hasReactNode)(caption) && (0, _jsxRuntime.createScopedElement)(_Caption.default, {
    vkuiClass: "ContentCard__text",
    weight: "regular",
    level: "1"
  }, caption))));
};

ContentCard.defaultProps = {
  mode: 'shadow'
};
var _default = ContentCard;
exports.default = _default;
//# sourceMappingURL=ContentCard.js.map