import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "size", "showArrows", "withSpaces"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import { useDOM } from "../../lib/dom";
import "./CardScroll.css";
export var CardScroll = function CardScroll(_ref) {
  var children = _ref.children,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "s" : _ref$size,
      _ref$showArrows = _ref.showArrows,
      showArrows = _ref$showArrows === void 0 ? true : _ref$showArrows,
      _ref$withSpaces = _ref.withSpaces,
      withSpaces = _ref$withSpaces === void 0 ? true : _ref$withSpaces,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

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
    var slideIndex = Array.from(refContainer.current.children).findIndex(function (el) {
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

  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames(getClassName("CardScroll", platform), "CardScroll--sizeX-".concat(sizeX), "CardScroll--".concat(size), _defineProperty({}, "CardScroll--withSpaces", withSpaces))
  }), createScopedElement(HorizontalScroll, {
    getScrollToLeft: getScrollToLeft,
    getScrollToRight: getScrollToRight,
    showArrows: showArrows
  }, createScopedElement("div", {
    vkuiClass: "CardScroll__in",
    ref: refContainer
  }, createScopedElement("span", {
    vkuiClass: "CardScroll__gap",
    ref: gapRef
  }), children, createScopedElement("span", {
    vkuiClass: "CardScroll__gap"
  }))));
};
//# sourceMappingURL=CardScroll.js.map