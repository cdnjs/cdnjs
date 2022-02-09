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

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classNames2 = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _HorizontalScroll = _interopRequireDefault(require("../HorizontalScroll/HorizontalScroll"));

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _dom = require("../../lib/dom");

var _excluded = ["children", "size", "showArrows", "sizeX", "withSpaces"];

var CardScroll = function CardScroll(_ref) {
  var children = _ref.children,
      size = _ref.size,
      _ref$showArrows = _ref.showArrows,
      showArrows = _ref$showArrows === void 0 ? true : _ref$showArrows,
      sizeX = _ref.sizeX,
      _ref$withSpaces = _ref.withSpaces,
      withSpaces = _ref$withSpaces === void 0 ? true : _ref$withSpaces,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
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

CardScroll.defaultProps = {
  size: "s"
}; // eslint-disable-next-line import/no-default-export

var _default = (0, _withAdaptivity.withAdaptivity)(CardScroll, {
  sizeX: true
});

exports.default = _default;
//# sourceMappingURL=CardScroll.js.map