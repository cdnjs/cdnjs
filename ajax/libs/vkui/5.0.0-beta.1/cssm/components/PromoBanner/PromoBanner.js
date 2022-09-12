import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["bannerData", "onClose", "isCloseButtonHidden"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { Icon24Dismiss } from "@vkontakte/icons";
import { Button } from "../Button/Button";
import { SimpleCell } from "../SimpleCell/SimpleCell";
import { Image } from "../Image/Image";
import { Footnote } from "../Typography/Footnote/Footnote";
import "./PromoBanner.css";

/**
 * @see https://vkcom.github.io/VKUI/#/PromoBanner
 */
export var PromoBanner = function PromoBanner(_ref) {
  var _ref$bannerData = _ref.bannerData,
      bannerData = _ref$bannerData === void 0 ? {} : _ref$bannerData,
      onClose = _ref.onClose,
      isCloseButtonHidden = _ref.isCloseButtonHidden,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _React$useState = React.useState(""),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      currentPixel = _React$useState2[0],
      setCurrentPixel = _React$useState2[1];

  var statsPixels = React.useMemo(function () {
    return bannerData.statistics ? bannerData.statistics.reduce(function (acc, item) {
      return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, item.type, item.url));
    }, {}) : {};
  }, [bannerData.statistics]);
  var onClick = React.useCallback(function () {
    return setCurrentPixel(statsPixels.click || "");
  }, [statsPixels.click]);
  React.useEffect(function () {
    if (statsPixels.playbackStarted) {
      setCurrentPixel(statsPixels.playbackStarted);
    }
  }, [statsPixels.playbackStarted]);
  return createScopedElement("div", _extends({
    vkuiClass: "PromoBanner"
  }, restProps), createScopedElement("div", {
    vkuiClass: "PromoBanner__head"
  }, createScopedElement(Footnote, {
    vkuiClass: "PromoBanner__label"
  }, bannerData.advertisingLabel || "Advertisement"), bannerData.ageRestrictions && createScopedElement(Footnote, {
    vkuiClass: "PromoBanner__age"
  }, bannerData.ageRestrictions), !isCloseButtonHidden && createScopedElement("div", {
    vkuiClass: "PromoBanner__close",
    onClick: onClose
  }, createScopedElement(Icon24Dismiss, null))), createScopedElement(SimpleCell, {
    href: bannerData.trackingLink,
    onClick: onClick,
    rel: "nofollow noopener noreferrer",
    target: "_blank",
    before: createScopedElement(Image, {
      size: 48,
      src: bannerData.iconLink,
      alt: bannerData.title
    }),
    after: createScopedElement(Button, {
      mode: "outline"
    }, bannerData.ctaText),
    subtitle: bannerData.domain
  }, bannerData.title), currentPixel.length > 0 && createScopedElement("div", {
    vkuiClass: "PromoBanner__pixels"
  }, createScopedElement("img", {
    src: currentPixel,
    alt: ""
  })));
};
//# sourceMappingURL=PromoBanner.js.map