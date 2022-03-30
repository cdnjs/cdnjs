"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _Card = require("../Card/Card");

var _Caption = require("../Typography/Caption/Caption");

var _Title = _interopRequireDefault(require("../Typography/Title/Title"));

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _utils = require("../../lib/utils");

var _warnOnce = require("../../lib/warnOnce");

var _classNames = require("../../lib/classNames");

var _excluded = ["subtitle", "header", "text", "caption", "className", "mode", "style", "getRootRef", "getRef", "maxHeight", "image", "src", "srcSet", "alt", "width", "height", "crossOrigin", "decoding", "loading", "referrerPolicy", "sizes", "useMap"];
var warn = (0, _warnOnce.warnOnce)("ContentCard");

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
  var source = image || src;

  if (image && process.env.NODE_ENV === "development") {
    warn("Свойство image устарело и будет удалено в 5.0.0. Используйте src");
  }

  return (0, _jsxRuntime.createScopedElement)(_Card.Card, {
    mode: mode,
    getRootRef: getRootRef,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("ContentCard", platform), {
      "ContentCard--disabled": restProps.disabled
    }),
    style: style,
    className: className
  }, (0, _jsxRuntime.createScopedElement)(_Tappable.default, (0, _extends2.default)({}, restProps, {
    disabled: restProps.disabled || !restProps.onClick && !restProps.href,
    hasHover: false,
    hasActive: false,
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
  }, (0, _utils.hasReactNode)(subtitle) && (0, _jsxRuntime.createScopedElement)(_Caption.Caption, {
    caps: true,
    vkuiClass: "ContentCard__text",
    weight: "1",
    level: "3"
  }, subtitle), (0, _utils.hasReactNode)(header) && (0, _jsxRuntime.createScopedElement)(_Title.default, {
    vkuiClass: "ContentCard__text",
    weight: "3",
    level: "1"
  }, header), (0, _utils.hasReactNode)(text) && (0, _jsxRuntime.createScopedElement)(_Text.default, {
    vkuiClass: "ContentCard__text",
    weight: "regular"
  }, text), (0, _utils.hasReactNode)(caption) && (0, _jsxRuntime.createScopedElement)(_Caption.Caption, {
    vkuiClass: "ContentCard__text"
  }, caption))));
};

ContentCard.defaultProps = {
  mode: "shadow"
}; // eslint-disable-next-line import/no-default-export

var _default = ContentCard;
exports.default = _default;
//# sourceMappingURL=ContentCard.js.map