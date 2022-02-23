import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["style", "className", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { callMultiple } from "../../lib/callMultiple";
import { usePlatform } from "../../hooks/usePlatform";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { VisuallyHiddenInput } from "../VisuallyHiddenInput/VisuallyHiddenInput";
import { useFocusVisible } from "../../hooks/useFocusVisible";
import { FocusVisible } from "../FocusVisible/FocusVisible";
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

  return createScopedElement("label", {
    vkuiClass: classNames(getClassName("Switch", platform), "Switch--sizeY-".concat(sizeY), {
      "Switch--disabled": restProps.disabled,
      "Switch--focus-visible": focusVisible
    }),
    className: className,
    style: style,
    ref: getRootRef,
    role: "presentation"
  }, createScopedElement(VisuallyHiddenInput, _extends({}, restProps, {
    type: "checkbox",
    vkuiClass: "Switch__self",
    onBlur: callMultiple(onBlur, restProps.onBlur),
    onFocus: callMultiple(onFocus, restProps.onFocus)
  })), createScopedElement("span", {
    role: "presentation",
    vkuiClass: "Switch__pseudo"
  }), createScopedElement(FocusVisible, {
    mode: "outside"
  }));
};
//# sourceMappingURL=Switch.js.map