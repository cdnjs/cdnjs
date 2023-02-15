"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CardScroll = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _getSizeXClassName = require("../../helpers/getSizeXClassName");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _HorizontalScroll = require("../HorizontalScroll/HorizontalScroll");
var _dom = require("../../lib/dom");
var _excluded = ["children", "size", "showArrows", "withSpaces", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/CardScroll
 */
var CardScroll = function CardScroll(_ref) {
  var children = _ref.children,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 's' : _ref$size,
    _ref$showArrows = _ref.showArrows,
    showArrows = _ref$showArrows === void 0 ? true : _ref$showArrows,
    _ref$withSpaces = _ref.withSpaces,
    withSpaces = _ref$withSpaces === void 0 ? true : _ref$withSpaces,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
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
    var slideIndex = (0, _toConsumableArray2.default)(refContainer.current.children).findIndex(function (el) {
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
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiCardScroll", (0, _getSizeXClassName.getSizeXClassName)("vkuiCardScroll", sizeX), styles["CardScroll--size-".concat(size)], withSpaces && "vkuiCardScroll--withSpaces", className)
  }), /*#__PURE__*/React.createElement(_HorizontalScroll.HorizontalScroll, {
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
exports.CardScroll = CardScroll;
var styles = {
  "CardScroll--size-false": "vkuiCardScroll--size-false",
  "CardScroll--size-m": "vkuiCardScroll--size-m",
  "CardScroll--size-l": "vkuiCardScroll--size-l",
  "CardScroll--size-s": "vkuiCardScroll--size-s"
};
//# sourceMappingURL=CardScroll.js.map