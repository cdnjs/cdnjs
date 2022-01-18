"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _icons = require("@vkontakte/icons");

var _Button = _interopRequireDefault(require("../Button/Button"));

var _SimpleCell = _interopRequireDefault(require("../SimpleCell/SimpleCell"));

var _Avatar = _interopRequireDefault(require("../Avatar/Avatar"));

var _Caption = _interopRequireDefault(require("../Typography/Caption/Caption"));

var _usePlatform = require("../../hooks/usePlatform");

var _getClassName = require("../../helpers/getClassName");

var _excluded = ["bannerData", "onClose"];

var PromoBanner = function PromoBanner(props) {
  var platform = (0, _usePlatform.usePlatform)();
  var _props$bannerData = props.bannerData,
      bannerData = _props$bannerData === void 0 ? {} : _props$bannerData,
      onClose = props.onClose,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var ageRestrictions = bannerData.ageRestrictions != null ? parseInt(bannerData.ageRestrictions) : bannerData.ageRestriction;

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
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({
    vkuiClass: (0, _getClassName.getClassName)('PromoBanner', platform)
  }, restProps), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PromoBanner__head"
  }, (0, _jsxRuntime.createScopedElement)(_Caption.default, {
    weight: "regular",
    level: "1",
    vkuiClass: "PromoBanner__label"
  }, bannerData.advertisingLabel || 'Advertisement'), ageRestrictions != null && (0, _jsxRuntime.createScopedElement)(_Caption.default, {
    weight: "regular",
    level: "1",
    vkuiClass: "PromoBanner__age"
  }, ageRestrictions, "+"), !props.isCloseButtonHidden && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PromoBanner__close",
    onClick: props.onClose
  }, (0, _jsxRuntime.createScopedElement)(_icons.Icon24Dismiss, null))), (0, _jsxRuntime.createScopedElement)(_SimpleCell.default, {
    href: bannerData.trackingLink,
    onClick: onClick,
    rel: "nofollow noopener noreferrer",
    target: "_blank",
    before: (0, _jsxRuntime.createScopedElement)(_Avatar.default, {
      mode: "image",
      size: 48,
      src: bannerData.iconLink,
      alt: bannerData.title
    }),
    after: (0, _jsxRuntime.createScopedElement)(_Button.default, {
      mode: "outline"
    }, bannerData.ctaText),
    description: bannerData.domain
  }, bannerData.title), currentPixel.length > 0 && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "PromoBanner__pixels"
  }, (0, _jsxRuntime.createScopedElement)("img", {
    src: currentPixel,
    alt: ""
  })));
};

var _default = PromoBanner;
exports.default = _default;
//# sourceMappingURL=PromoBanner.js.map