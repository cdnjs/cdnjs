"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubnavigationBar = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _HorizontalScroll = require("../HorizontalScroll/HorizontalScroll");
var _excluded = ["mode", "children", "showArrows", "getScrollToLeft", "getScrollToRight", "scrollAnimationDuration", "className"];
var defaultScrollToLeft = function defaultScrollToLeft(x) {
  return x - 240;
};
var defaultScrollToRight = function defaultScrollToRight(x) {
  return x + 240;
};

/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationBar
 */
var SubnavigationBar = function SubnavigationBar(_ref) {
  var _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'overflow' : _ref$mode,
    children = _ref.children,
    _ref$showArrows = _ref.showArrows,
    showArrows = _ref$showArrows === void 0 ? true : _ref$showArrows,
    _ref$getScrollToLeft = _ref.getScrollToLeft,
    getScrollToLeft = _ref$getScrollToLeft === void 0 ? defaultScrollToLeft : _ref$getScrollToLeft,
    _ref$getScrollToRight = _ref.getScrollToRight,
    getScrollToRight = _ref$getScrollToRight === void 0 ? defaultScrollToRight : _ref$getScrollToRight,
    scrollAnimationDuration = _ref.scrollAnimationDuration,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var ScrollWrapper;
  var scrollWrapperProps = {};
  if (mode === 'fixed') {
    ScrollWrapper = 'div';
  } else {
    ScrollWrapper = _HorizontalScroll.HorizontalScroll;
    scrollWrapperProps = {
      showArrows: showArrows,
      getScrollToLeft: getScrollToLeft,
      getScrollToRight: getScrollToRight,
      scrollAnimationDuration: scrollAnimationDuration
    };
  }
  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiSubnavigationBar", styles["SubnavigationBar--mode-".concat(mode)], className)
  }), /*#__PURE__*/React.createElement(ScrollWrapper, (0, _extends2.default)({
    className: "vkuiSubnavigationBar__in"
  }, scrollWrapperProps), /*#__PURE__*/React.createElement("div", {
    className: "vkuiSubnavigationBar__scrollIn"
  }, children)));
};
exports.SubnavigationBar = SubnavigationBar;
var styles = {
  "SubnavigationBar--mode-fixed": "vkuiSubnavigationBar--mode-fixed",
  "SubnavigationBar--mode-overflow": "vkuiSubnavigationBar--mode-overflow"
};
//# sourceMappingURL=SubnavigationBar.js.map