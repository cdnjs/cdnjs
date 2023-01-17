import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["style", "className", "getRootRef"];
import * as React from 'react';
import { getPlatformClassName } from '../../helpers/getPlatformClassName';
import { classNames } from '@vkontakte/vkjs';
import { callMultiple } from '../../lib/callMultiple';
import { usePlatform } from '../../hooks/usePlatform';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { VisuallyHiddenInput } from '../VisuallyHiddenInput/VisuallyHiddenInput';
import { useFocusVisible } from '../../hooks/useFocusVisible';
import { FocusVisible } from '../FocusVisible/FocusVisible';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import "./Switch.module.css";
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
    sizeY = _useAdaptivity.sizeY;
  var _useFocusVisible = useFocusVisible(),
    focusVisible = _useFocusVisible.focusVisible,
    onBlur = _useFocusVisible.onBlur,
    onFocus = _useFocusVisible.onFocus;
  return /*#__PURE__*/React.createElement("label", {
    className: classNames("vkuiSwitch", getPlatformClassName("vkuiSwitch", platform), getSizeYClassName("vkuiSwitch", sizeY), restProps.disabled && "vkuiSwitch--disabled", focusVisible && "vkuiSwitch--focus-visible", className),
    style: style,
    ref: getRootRef,
    role: "presentation"
  }, /*#__PURE__*/React.createElement(VisuallyHiddenInput, _extends({}, restProps, {
    type: "checkbox",
    className: "vkuiSwitch__self",
    onBlur: callMultiple(onBlur, restProps.onBlur),
    onFocus: callMultiple(onFocus, restProps.onFocus)
  })), /*#__PURE__*/React.createElement("span", {
    role: "presentation",
    className: "vkuiSwitch__pseudo"
  }), /*#__PURE__*/React.createElement(FocusVisible, {
    mode: "outside"
  }));
};
//# sourceMappingURL=Switch.js.map