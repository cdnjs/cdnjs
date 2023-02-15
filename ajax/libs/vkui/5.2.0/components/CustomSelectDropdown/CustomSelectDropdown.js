import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "targetRef", "scrollBoxRef", "placement", "fetching", "onPlacementChange", "offsetDistance", "sameWidth", "forcePortal", "autoHideScrollbar", "autoHideScrollbarDelay", "className"];
import * as React from 'react';
import { CustomScrollView } from '../CustomScrollView/CustomScrollView';
import { classNames } from '@vkontakte/vkjs';
import { Popper } from '../Popper/Popper';
import { Spinner } from '../Spinner/Spinner';
var calcIsTop = function calcIsTop(placement) {
  return placement === null || placement === void 0 ? void 0 : placement.includes('top');
};
export var CustomSelectDropdown = function CustomSelectDropdown(_ref) {
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
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _React$useState = React.useState(function () {
      return calcIsTop(placement);
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    isTop = _React$useState2[0],
    setIsTop = _React$useState2[1];
  var onPlacementChange = React.useCallback(function (_ref2) {
    var placement = _ref2.placement;
    setIsTop(calcIsTop(placement));
    parentOnPlacementChange === null || parentOnPlacementChange === void 0 ? void 0 : parentOnPlacementChange(placement);
  }, [parentOnPlacementChange, setIsTop]);
  return /*#__PURE__*/React.createElement(Popper, _extends({
    targetRef: targetRef,
    offsetDistance: offsetDistance,
    sameWidth: sameWidth,
    onPlacementChange: onPlacementChange,
    placement: placement,
    className: classNames("vkuiCustomSelectDropdown", offsetDistance === 0 && (isTop ? "vkuiCustomSelectDropdown--top" : "vkuiCustomSelectDropdown--bottom"), sameWidth && "vkuiCustomSelectDropdown--wide", className),
    forcePortal: forcePortal,
    autoUpdateOnTargetResize: true
  }, restProps), /*#__PURE__*/React.createElement(CustomScrollView, {
    boxRef: scrollBoxRef,
    className: "vkuiCustomSelectDropdown__in",
    autoHideScrollbar: autoHideScrollbar,
    autoHideScrollbarDelay: autoHideScrollbarDelay
  }, fetching ? /*#__PURE__*/React.createElement("div", {
    className: "vkuiCustomSelectDropdown__fetching"
  }, /*#__PURE__*/React.createElement(Spinner, {
    size: "small"
  })) : children));
};
//# sourceMappingURL=CustomSelectDropdown.js.map