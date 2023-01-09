import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "children", "showArrows", "getScrollToLeft", "getScrollToRight", "scrollAnimationDuration"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { HorizontalScroll } from "../HorizontalScroll/HorizontalScroll";
import "./SubnavigationBar.css";
var defaultScrollToLeft = function defaultScrollToLeft(x) {
  return x - 240;
};
var defaultScrollToRight = function defaultScrollToRight(x) {
  return x + 240;
};

/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationBar
 */
export var SubnavigationBar = function SubnavigationBar(_ref) {
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
    restProps = _objectWithoutProperties(_ref, _excluded);
  var ScrollWrapper;
  var scrollWrapperProps = {};
  if (mode === "fixed") {
    ScrollWrapper = "div";
  } else {
    ScrollWrapper = HorizontalScroll;
    scrollWrapperProps = {
      showArrows: showArrows,
      getScrollToLeft: getScrollToLeft,
      getScrollToRight: getScrollToRight,
      scrollAnimationDuration: scrollAnimationDuration
    };
  }
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames("SubnavigationBar", "SubnavigationBar--".concat(mode))
  }), createScopedElement(ScrollWrapper, _extends({
    vkuiClass: "SubnavigationBar__in"
  }, scrollWrapperProps), createScopedElement("div", {
    vkuiClass: "SubnavigationBar__scrollIn"
  }, children)));
};
//# sourceMappingURL=SubnavigationBar.js.map