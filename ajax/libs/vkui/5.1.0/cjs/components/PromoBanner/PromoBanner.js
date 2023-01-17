"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PromoBanner = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _icons = require("@vkontakte/icons");
var _Button = require("../Button/Button");
var _SimpleCell = require("../SimpleCell/SimpleCell");
var _Image = require("../Image/Image");
var _Footnote = require("../Typography/Footnote/Footnote");
var _excluded = ["bannerData", "onClose", "isCloseButtonHidden", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/PromoBanner
 */
var PromoBanner = function PromoBanner(_ref) {
  var _ref$bannerData = _ref.bannerData,
    bannerData = _ref$bannerData === void 0 ? {} : _ref$bannerData,
    onClose = _ref.onClose,
    isCloseButtonHidden = _ref.isCloseButtonHidden,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _React$useState = React.useState(''),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    currentPixel = _React$useState2[0],
    setCurrentPixel = _React$useState2[1];
  var statsPixels = React.useMemo(function () {
    return bannerData.statistics ? bannerData.statistics.reduce(function (acc, item) {
      return (0, _objectSpread3.default)((0, _objectSpread3.default)({}, acc), {}, (0, _defineProperty2.default)({}, item.type, item.url));
    }, {}) : {};
  }, [bannerData.statistics]);
  var onClick = React.useCallback(function () {
    return setCurrentPixel(statsPixels.click || '');
  }, [statsPixels.click]);
  React.useEffect(function () {
    if (statsPixels.playbackStarted) {
      setCurrentPixel(statsPixels.playbackStarted);
    }
  }, [statsPixels.playbackStarted]);
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiPromoBanner", className)
  }, restProps), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPromoBanner__head"
  }, /*#__PURE__*/React.createElement(_Footnote.Footnote, {
    className: "vkuiPromoBanner__label"
  }, bannerData.advertisingLabel || 'Advertisement'), bannerData.ageRestrictions && /*#__PURE__*/React.createElement(_Footnote.Footnote, {
    className: "vkuiPromoBanner__age"
  }, bannerData.ageRestrictions), !isCloseButtonHidden && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPromoBanner__close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(_icons.Icon24Dismiss, null))), /*#__PURE__*/React.createElement(_SimpleCell.SimpleCell, {
    href: bannerData.trackingLink,
    onClick: onClick,
    rel: "nofollow noopener noreferrer",
    target: "_blank",
    before: bannerData.iconLink && /*#__PURE__*/React.createElement(_Image.Image, {
      size: 48,
      src: bannerData.iconLink,
      alt: bannerData.title,
      "data-testid": process.env.NODE_ENV === 'test' ? 'avatar' : undefined
    }),
    after: bannerData.ctaText && /*#__PURE__*/React.createElement(_Button.Button, {
      mode: "outline",
      "data-testid": process.env.NODE_ENV === 'test' ? 'button-ctaText' : undefined
    }, bannerData.ctaText),
    subtitle: bannerData.domain
  }, bannerData.title), currentPixel.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPromoBanner__pixels"
  }, /*#__PURE__*/React.createElement("img", {
    src: currentPixel,
    alt: ""
  })));
};
exports.PromoBanner = PromoBanner;
//# sourceMappingURL=PromoBanner.js.map