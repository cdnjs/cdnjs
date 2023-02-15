import _extends from "@babel/runtime/helpers/extends";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "size", "showArrows", "withSpaces", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { getSizeXClassName } from '../../helpers/getSizeXClassName';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { HorizontalScroll } from '../HorizontalScroll/HorizontalScroll';
import { useDOM } from '../../lib/dom';
/**
 * @see https://vkcom.github.io/VKUI/#/CardScroll
 */
export var CardScroll = function CardScroll(_ref) {
  var children = _ref.children,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 's' : _ref$size,
    _ref$showArrows = _ref.showArrows,
    showArrows = _ref$showArrows === void 0 ? true : _ref$showArrows,
    _ref$withSpaces = _ref.withSpaces,
    withSpaces = _ref$withSpaces === void 0 ? true : _ref$withSpaces,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useAdaptivity = useAdaptivity(),
    sizeX = _useAdaptivity.sizeX;
  var refContainer = React.useRef(null);
  var gapRef = React.useRef(null);
  var _useDOM = useDOM(),
    window = _useDOM.window;
  function getScrollToLeft(offset) {
    if (!refContainer.current || !gapRef.current) {
      return offset;
    }
    var containerWidth = refContainer.current.offsetWidth;
    var slideIndex = _toConsumableArray(refContainer.current.children).findIndex(function (el) {
      return el.offsetLeft + el.offsetWidth + parseInt(window.getComputedStyle(el).marginRight) - offset >= 0;
    });
    if (slideIndex === -1) {
      return offset;
    }
    if (slideIndex === 0) {
      return 0;
    }
    var slide = refContainer.current.children[slideIndex];
    var scrollTo = slide.offsetLeft - (containerWidth - slide.offsetWidth) + gapRef.current.offsetWidth;
    if (scrollTo <= 2 * gapRef.current.offsetWidth) {
      return 0;
    }
    return scrollTo;
  }
  function getScrollToRight(offset) {
    if (!refContainer.current || !gapRef.current) {
      return offset;
    }
    var containerWidth = refContainer.current.offsetWidth;
    var slide = Array.prototype.find.call(refContainer.current.children, function (el) {
      return el.offsetLeft + el.offsetWidth - offset > containerWidth;
    });
    if (!slide) {
      return offset;
    }
    return slide.offsetLeft - gapRef.current.offsetWidth;
  }
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNames("vkuiCardScroll", getSizeXClassName("vkuiCardScroll", sizeX), styles["CardScroll--size-".concat(size)], withSpaces && "vkuiCardScroll--withSpaces", className)
  }), /*#__PURE__*/React.createElement(HorizontalScroll, {
    getScrollToLeft: getScrollToLeft,
    getScrollToRight: getScrollToRight,
    showArrows: showArrows
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiCardScroll__in",
    ref: refContainer
  }, /*#__PURE__*/React.createElement("span", {
    className: "vkuiCardScroll__gap",
    ref: gapRef
  }), children, /*#__PURE__*/React.createElement("span", {
    className: "vkuiCardScroll__gap"
  }))));
};
var styles = {
  "CardScroll--size-false": "vkuiCardScroll--size-false",
  "CardScroll--size-m": "vkuiCardScroll--size-m",
  "CardScroll--size-l": "vkuiCardScroll--size-l",
  "CardScroll--size-s": "vkuiCardScroll--size-s"
};
//# sourceMappingURL=CardScroll.js.map