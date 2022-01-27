"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubnavigationBar = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _usePlatform = require("../../hooks/usePlatform");

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _HorizontalScroll = _interopRequireDefault(require("../HorizontalScroll/HorizontalScroll"));

var _excluded = ["mode", "children", "showArrows", "getScrollToLeft", "getScrollToRight", "scrollAnimationDuration"];

var defaultScrollToLeft = function defaultScrollToLeft(x) {
  return x - 240;
};

var defaultScrollToRight = function defaultScrollToRight(x) {
  return x + 240;
};

var SubnavigationBar = function SubnavigationBar(_ref) {
  var _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "overflow" : _ref$mode,
      children = _ref.children,
      _ref$showArrows = _ref.showArrows,
      showArrows = _ref$showArrows === void 0 ? true : _ref$showArrows,
      _ref$getScrollToLeft = _ref.getScrollToLeft,
      getScrollToLeft = _ref$getScrollToLeft === void 0 ? defaultScrollToLeft : _ref$getScrollToLeft,
      _ref$getScrollToRight = _ref.getScrollToRight,
      getScrollToRight = _ref$getScrollToRight === void 0 ? defaultScrollToRight : _ref$getScrollToRight,
      scrollAnimationDuration = _ref.scrollAnimationDuration,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var ScrollWrapper;
  var scrollWrapperProps = {};

  if (mode === "fixed") {
    ScrollWrapper = "div";
  } else {
    ScrollWrapper = _HorizontalScroll.default;
    scrollWrapperProps = {
      showArrows: showArrows,
      getScrollToLeft: getScrollToLeft,
      getScrollToRight: getScrollToRight,
      scrollAnimationDuration: scrollAnimationDuration
    };
  }

  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("SubnavigationBar", platform), "SubnavigationBar--".concat(mode))
  }), (0, _jsxRuntime.createScopedElement)(ScrollWrapper, (0, _extends2.default)({
    vkuiClass: "SubnavigationBar__in"
  }, scrollWrapperProps), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "SubnavigationBar__scrollIn"
  }, children)));
};

exports.SubnavigationBar = SubnavigationBar;
//# sourceMappingURL=SubnavigationBar.js.map