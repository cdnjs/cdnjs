"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentCard = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _Card = require("../Card/Card");
var _Caption = require("../Typography/Caption/Caption");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Headline = require("../Typography/Headline/Headline");
var _Text = require("../Typography/Text/Text");
var _Tappable = require("../Tappable/Tappable");
var _vkjs = require("@vkontakte/vkjs");
var _excluded = ["subtitle", "header", "text", "caption", "className", "mode", "style", "getRootRef", "getRef", "maxHeight", "src", "srcSet", "alt", "width", "height", "crossOrigin", "decoding", "loading", "referrerPolicy", "sizes", "useMap", "hasHover", "hasActive"];
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
    mode = _ref$mode === void 0 ? 'shadow' : _ref$mode,
    style = _ref.style,
    getRootRef = _ref.getRootRef,
    getRef = _ref.getRef,
    maxHeight = _ref.maxHeight,
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
  return /*#__PURE__*/React.createElement(_Card.Card, {
    mode: mode,
    getRootRef: getRootRef,
    style: style,
    className: (0, _vkjs.classNames)("vkuiContentCard", restProps.disabled && "vkuiContentCard--disabled", className)
  }, /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    disabled: restProps.disabled || !restProps.onClick && !restProps.href,
    hasHover: hasHover,
    hasActive: hasActive,
    className: "vkuiContentCard__tappable"
  }), (src || srcSet) && /*#__PURE__*/React.createElement("img", {
    ref: getRef,
    className: "vkuiContentCard__img",
    src: src,
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
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiContentCard__body"
  }, (0, _vkjs.hasReactNode)(subtitle) && /*#__PURE__*/React.createElement(_Caption.Caption, {
    className: (0, _vkjs.classNames)("vkuiContentCard__text", "vkuiContentCard__subtitle"),
    weight: "1",
    level: "3",
    caps: true
  }, subtitle), (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/React.createElement(_Headline.Headline, {
    className: "vkuiContentCard__text",
    weight: "2",
    level: "1"
  }, header), (0, _vkjs.hasReactNode)(text) && /*#__PURE__*/React.createElement(_Text.Text, {
    className: "vkuiContentCard__text"
  }, text), (0, _vkjs.hasReactNode)(caption) && /*#__PURE__*/React.createElement(_Footnote.Footnote, {
    className: (0, _vkjs.classNames)("vkuiContentCard__text", "vkuiContentCard__caption")
  }, caption))));
};
exports.ContentCard = ContentCard;
//# sourceMappingURL=ContentCard.js.map