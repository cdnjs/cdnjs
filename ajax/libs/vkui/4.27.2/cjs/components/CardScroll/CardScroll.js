"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardScroll = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classNames2 = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _usePlatform = require("../../hooks/usePlatform");

var _HorizontalScroll = _interopRequireDefault(require("../HorizontalScroll/HorizontalScroll"));

var _dom = require("../../lib/dom");

var _excluded = ["children", "size", "showArrows", "withSpaces"];

var CardScroll = function CardScroll(_ref) {
  var children = _ref.children,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? "s" : _ref$size,
      _ref$showArrows = _ref.showArrows,
      showArrows = _ref$showArrows === void 0 ? true : _ref$showArrows,
      _ref$withSpaces = _ref.withSpaces,
      withSpaces = _ref$withSpaces === void 0 ? true : _ref$withSpaces,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeX = _useAdaptivity.sizeX;

  var refContainer = React.useRef(null);
  var gapRef = React.useRef(null);

  var _useDOM = (0, _dom.useDOM)(),
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

  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames2.classNames)((0, _getClassName.getClassName)("CardScroll", platform), "CardScroll--sizeX-".concat(sizeX), "CardScroll--".concat(size), (0, _defineProperty2.default)({}, "CardScroll--withSpaces", withSpaces))
  }), (0, _jsxRuntime.createScopedElement)(_HorizontalScroll.default, {
    getScrollToLeft: getScrollToLeft,
    getScrollToRight: getScrollToRight,
    showArrows: showArrows
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CardScroll__in",
    ref: refContainer
  }, (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "CardScroll__gap",
    ref: gapRef
  }), children, (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "CardScroll__gap"
  }))));
};

exports.CardScroll = CardScroll;
//# sourceMappingURL=CardScroll.js.map