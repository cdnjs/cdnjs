import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
var _excluded = ["style", "className", "getRootRef"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { getPlatformClassName } from '../../helpers/getPlatformClassName';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useFocusVisible } from '../../hooks/useFocusVisible';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { callMultiple } from '../../lib/callMultiple';
import { FocusVisible } from '../FocusVisible/FocusVisible';
import { VisuallyHiddenInput } from '../VisuallyHiddenInput/VisuallyHiddenInput';
var sizeYClassNames = _defineProperty({
  none: "vkuiSwitch--sizeY-none"
}, SizeType.COMPACT, "vkuiSwitch--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/Switch
 */
export var Switch = function Switch(_ref) {
  var style = _ref.style,
    className = _ref.className,
    getRootRef = _ref.getRootRef,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _useAdaptivity = useAdaptivity(),
    _useAdaptivity$sizeY = _useAdaptivity.sizeY,
    sizeY = _useAdaptivity$sizeY === void 0 ? 'none' : _useAdaptivity$sizeY;
  var _useFocusVisible = useFocusVisible(),
    focusVisible = _useFocusVisible.focusVisible,
    onBlur = _useFocusVisible.onBlur,
    onFocus = _useFocusVisible.onFocus;
  return /*#__PURE__*/React.createElement("label", {
    className: classNames("vkuiSwitch", getPlatformClassName("vkuiSwitch", platform), sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], restProps.disabled && "vkuiSwitch--disabled", focusVisible && "vkuiSwitch--focus-visible", className),
    style: style,
    ref: getRootRef
  }, /*#__PURE__*/React.createElement(VisuallyHiddenInput, _extends({}, restProps, {
    type: "checkbox",
    className: "vkuiSwitch__self",
    onBlur: callMultiple(onBlur, restProps.onBlur),
    onFocus: callMultiple(onFocus, restProps.onFocus)
  })), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    className: "vkuiSwitch__pseudo"
  }), /*#__PURE__*/React.createElement(FocusVisible, {
    mode: "outside"
  }));
};
//# sourceMappingURL=Switch.js.map