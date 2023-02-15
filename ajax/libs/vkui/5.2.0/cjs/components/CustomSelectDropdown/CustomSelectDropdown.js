"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomSelectDropdown = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _CustomScrollView = require("../CustomScrollView/CustomScrollView");
var _vkjs = require("@vkontakte/vkjs");
var _Popper = require("../Popper/Popper");
var _Spinner = require("../Spinner/Spinner");
var _excluded = ["children", "targetRef", "scrollBoxRef", "placement", "fetching", "onPlacementChange", "offsetDistance", "sameWidth", "forcePortal", "autoHideScrollbar", "autoHideScrollbarDelay", "className"];
var calcIsTop = function calcIsTop(placement) {
  return placement === null || placement === void 0 ? void 0 : placement.includes('top');
};
var CustomSelectDropdown = function CustomSelectDropdown(_ref) {
  var children = _ref.children,
    targetRef = _ref.targetRef,
    scrollBoxRef = _ref.scrollBoxRef,
    placement = _ref.placement,
    fetching = _ref.fetching,
    parentOnPlacementChange = _ref.onPlacementChange,
    _ref$offsetDistance = _ref.offsetDistance,
    offsetDistance = _ref$offsetDistance === void 0 ? 0 : _ref$offsetDistance,
    _ref$sameWidth = _ref.sameWidth,
    sameWidth = _ref$sameWidth === void 0 ? true : _ref$sameWidth,
    _ref$forcePortal = _ref.forcePortal,
    forcePortal = _ref$forcePortal === void 0 ? true : _ref$forcePortal,
    autoHideScrollbar = _ref.autoHideScrollbar,
    autoHideScrollbarDelay = _ref.autoHideScrollbarDelay,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _React$useState = React.useState(function () {
      return calcIsTop(placement);
    }),
    _React$useState2 = (0, _slicedToArray2.default)(_React$useState, 2),
    isTop = _React$useState2[0],
    setIsTop = _React$useState2[1];
  var onPlacementChange = React.useCallback(function (_ref2) {
    var placement = _ref2.placement;
    setIsTop(calcIsTop(placement));
    parentOnPlacementChange === null || parentOnPlacementChange === void 0 ? void 0 : parentOnPlacementChange(placement);
  }, [parentOnPlacementChange, setIsTop]);
  return /*#__PURE__*/React.createElement(_Popper.Popper, (0, _extends2.default)({
    targetRef: targetRef,
    offsetDistance: offsetDistance,
    sameWidth: sameWidth,
    onPlacementChange: onPlacementChange,
    placement: placement,
    className: (0, _vkjs.classNames)("vkuiCustomSelectDropdown", offsetDistance === 0 && (isTop ? "vkuiCustomSelectDropdown--top" : "vkuiCustomSelectDropdown--bottom"), sameWidth && "vkuiCustomSelectDropdown--wide", className),
    forcePortal: forcePortal,
    autoUpdateOnTargetResize: true
  }, restProps), /*#__PURE__*/React.createElement(_CustomScrollView.CustomScrollView, {
    boxRef: scrollBoxRef,
    className: "vkuiCustomSelectDropdown__in",
    autoHideScrollbar: autoHideScrollbar,
    autoHideScrollbarDelay: autoHideScrollbarDelay
  }, fetching ? /*#__PURE__*/React.createElement("div", {
    className: "vkuiCustomSelectDropdown__fetching"
  }, /*#__PURE__*/React.createElement(_Spinner.Spinner, {
    size: "small"
  })) : children));
};
exports.CustomSelectDropdown = CustomSelectDropdown;
//# sourceMappingURL=CustomSelectDropdown.js.map