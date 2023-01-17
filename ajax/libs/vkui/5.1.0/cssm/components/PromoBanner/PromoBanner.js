import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["bannerData", "onClose", "isCloseButtonHidden", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Icon24Dismiss } from '@vkontakte/icons';
import { Button } from '../Button/Button';
import { SimpleCell } from '../SimpleCell/SimpleCell';
import { Image } from '../Image/Image';
import { Footnote } from '../Typography/Footnote/Footnote';
import "./PromoBanner.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/PromoBanner
 */
export var PromoBanner = function PromoBanner(_ref) {
  var _ref$bannerData = _ref.bannerData,
    bannerData = _ref$bannerData === void 0 ? {} : _ref$bannerData,
    onClose = _ref.onClose,
    isCloseButtonHidden = _ref.isCloseButtonHidden,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _React$useState = React.useState(''),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    currentPixel = _React$useState2[0],
    setCurrentPixel = _React$useState2[1];
  var statsPixels = React.useMemo(function () {
    return bannerData.statistics ? bannerData.statistics.reduce(function (acc, item) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, item.type, item.url));
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
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classNames("vkuiPromoBanner", className)
  }, restProps), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPromoBanner__head"
  }, /*#__PURE__*/React.createElement(Footnote, {
    className: "vkuiPromoBanner__label"
  }, bannerData.advertisingLabel || 'Advertisement'), bannerData.ageRestrictions && /*#__PURE__*/React.createElement(Footnote, {
    className: "vkuiPromoBanner__age"
  }, bannerData.ageRestrictions), !isCloseButtonHidden && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPromoBanner__close",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon24Dismiss, null))), /*#__PURE__*/React.createElement(SimpleCell, {
    href: bannerData.trackingLink,
    onClick: onClick,
    rel: "nofollow noopener noreferrer",
    target: "_blank",
    before: bannerData.iconLink && /*#__PURE__*/React.createElement(Image, {
      size: 48,
      src: bannerData.iconLink,
      alt: bannerData.title,
      "data-testid": process.env.NODE_ENV === 'test' ? 'avatar' : undefined
    }),
    after: bannerData.ctaText && /*#__PURE__*/React.createElement(Button, {
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
//# sourceMappingURL=PromoBanner.js.map