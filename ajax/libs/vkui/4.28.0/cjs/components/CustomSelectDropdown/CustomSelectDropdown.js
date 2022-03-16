"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomSelectDropdown = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _CustomScrollView = _interopRequireDefault(require("../CustomScrollView/CustomScrollView"));

var _classNames = require("../../lib/classNames");

var _Popper = require("../Popper/Popper");

var _Spinner = _interopRequireDefault(require("../Spinner/Spinner"));

var _excluded = ["children", "targetRef", "scrollBoxRef", "placement", "fetching", "onPlacementChange", "offsetDistance", "sameWidth", "forcePortal"];

var calcIsTop = function calcIsTop(placement) {
  return placement === null || placement === void 0 ? void 0 : placement.includes("top");
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
  return (0, _jsxRuntime.createScopedElement)(_Popper.Popper, (0, _extends2.default)({
    targetRef: targetRef,
    offsetDistance: offsetDistance,
    sameWidth: sameWidth,
    onPlacementChange: onPlacementChange,
    placement: placement,
    vkuiClass: (0, _classNames.classNames)("CustomSelectDropdown__options", {
      "CustomSelectDropdown__options--popupDirectionTop": isTop,
      "CustomSelectDropdown__options--not-adjacent": offsetDistance > 0,
      "CustomSelectDropdown__options--same-width": sameWidth
    }),
    forcePortal: forcePortal
  }, restProps), (0, _jsxRuntime.createScopedElement)(_CustomScrollView.default, {
    boxRef: scrollBoxRef,
    vkuiClass: "CustomSelectDropdown__CustomScrollView"
  }, fetching ? (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "CustomSelectDropdown__fetching"
  }, (0, _jsxRuntime.createScopedElement)(_Spinner.default, {
    size: "small"
  })) : children));
};

exports.CustomSelectDropdown = CustomSelectDropdown;
//# sourceMappingURL=CustomSelectDropdown.js.map