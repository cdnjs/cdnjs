import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["className", "style", "children"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { useFocusVisible } from '../../../hooks/useFocusVisible';
import { SizeType } from '../../../lib/adaptivity';
import { callMultiple } from '../../../lib/callMultiple';
import { FocusVisible } from '../../FocusVisible/FocusVisible';
import { VisuallyHiddenInput } from '../../VisuallyHiddenInput/VisuallyHiddenInput';
var sizeYClassNames = _defineProperty({
  none: "vkuiSegmentedControlOption__content--sizeY-none"
}, SizeType.COMPACT, "vkuiSegmentedControlOption__content--sizeY-compact");

/**
 * @see https://vkcom.github.io/VKUI/#/SegmentedControl
 */
export var SegmentedControlOption = function SegmentedControlOption(_ref) {
  var className = _ref.className,
    style = _ref.style,
    children = _ref.children,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useFocusVisible = useFocusVisible(),
    focusVisible = _useFocusVisible.focusVisible,
    onBlur = _useFocusVisible.onBlur,
    onFocus = _useFocusVisible.onFocus;
  var _useAdaptivity = useAdaptivity(),
    _useAdaptivity$sizeY = _useAdaptivity.sizeY,
    sizeY = _useAdaptivity$sizeY === void 0 ? 'none' : _useAdaptivity$sizeY;
  return /*#__PURE__*/React.createElement("label", {
    className: classNames("vkuiSegmentedControlOption", restProps.checked && "vkuiSegmentedControlOption--checked", focusVisible && "vkuiSegmentedControlOption--focus-visible", className),
    style: style
  }, /*#__PURE__*/React.createElement(VisuallyHiddenInput, _extends({}, restProps, {
    type: "radio",
    onBlur: callMultiple(onBlur, restProps.onBlur),
    onFocus: callMultiple(onFocus, restProps.onFocus)
  })), /*#__PURE__*/React.createElement("span", {
    className: classNames("vkuiSegmentedControlOption__content", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY])
  }, children), /*#__PURE__*/React.createElement(FocusVisible, {
    mode: "inside"
  }));
};
//# sourceMappingURL=SegmentedControlOption.js.map