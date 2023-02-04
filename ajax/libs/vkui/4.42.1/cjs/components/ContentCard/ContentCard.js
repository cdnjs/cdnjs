"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentCard = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _Card = require("../Card/Card");
var _Caption = require("../Typography/Caption/Caption");
var _Headline = require("../Typography/Headline/Headline");
var _Text = require("../Typography/Text/Text");
var _Tappable = require("../Tappable/Tappable");
var _utils = require("../../lib/utils");
var _warnOnce = require("../../lib/warnOnce");
var _classNames = require("../../lib/classNames");
var _excluded = ["subtitle", "header", "text", "caption", "className", "mode", "style", "getRootRef", "getRef", "maxHeight", "image", "src", "srcSet", "alt", "width", "height", "crossOrigin", "decoding", "loading", "referrerPolicy", "sizes", "useMap", "hasHover", "hasActive"];
var warn = (0, _warnOnce.warnOnce)("ContentCard");

/**
 * @see https://vkcom.github.io/VKUI/#/ContentCard
 */
var ContentCard = function ContentCard(_ref) {
  var subtitle = _ref.subtitle,
    header = _ref.header,
    text = _ref.text,
    caption = _ref.caption,
    className = _ref.className,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? "shadow" : _ref$mode,
    style = _ref.style,
    getRootRef = _ref.getRootRef,
    getRef = _ref.getRef,
    maxHeight = _ref.maxHeight,
    image = _ref.image,
    src = _ref.src,
    srcSet = _ref.srcSet,
    alt = _ref.alt,
    width = _ref.width,
    height = _ref.height,
    crossOrigin = _ref.crossOrigin,
    decoding = _ref.decoding,
    loading = _ref.loading,
    referrerPolicy = _ref.referrerPolicy,
    sizes = _ref.sizes,
    useMap = _ref.useMap,
    _ref$hasHover = _ref.hasHover,
    hasHover = _ref$hasHover === void 0 ? false : _ref$hasHover,
    _ref$hasActive = _ref.hasActive,
    hasActive = _ref$hasActive === void 0 ? false : _ref$hasActive,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var source = image || src;
  if (image && process.env.NODE_ENV === "development") {
    warn("Свойство image устарело и будет удалено в 5.0.0. Используйте src");
  }
  return (0, _jsxRuntime.createScopedElement)(_Card.Card, {
    mode: mode,
    getRootRef: getRootRef,
    vkuiClass: (0, _classNames.classNames)("ContentCard", restProps.disabled && "ContentCard--disabled"),
    style: style,
    className: className
  }, (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    disabled: restProps.disabled || !restProps.onClick && !restProps.href,
    hasHover: hasHover,
    hasActive: hasActive,
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
    vkuiClass: "ContentCard__text ContentCard__subtitle",
    weight: "1",
    level: "3",
    caps: true
  }, subtitle), (0, _utils.hasReactNode)(header) && (0, _jsxRuntime.createScopedElement)(_Headline.Headline, {
    vkuiClass: "ContentCard__text",
    weight: "2",
    level: "1"
  }, header), (0, _utils.hasReactNode)(text) && (0, _jsxRuntime.createScopedElement)(_Text.Text, {
    vkuiClass: "ContentCard__text"
  }, text), (0, _utils.hasReactNode)(caption) && (0, _jsxRuntime.createScopedElement)(_Caption.Caption, {
    vkuiClass: "ContentCard__text ContentCard__caption"
  }, caption))));
};
exports.ContentCard = ContentCard;
//# sourceMappingURL=ContentCard.js.map