import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "style", "children"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import { useFocusVisible } from "../../../hooks/useFocusVisible";
import { callMultiple } from "../../../lib/callMultiple";
import { classNames } from "../../../lib/classNames";
import { FocusVisible } from "../../FocusVisible/FocusVisible";
import Text from "../../Typography/Text/Text";
import { VisuallyHiddenInput } from "../../VisuallyHiddenInput/VisuallyHiddenInput";
import "./SegmentedControlOption.css";
export var SegmentedControlOption = function SegmentedControlOption(_ref) {
  var className = _ref.className,
      style = _ref.style,
      children = _ref.children,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _useFocusVisible = useFocusVisible(),
      focusVisible = _useFocusVisible.focusVisible,
      onBlur = _useFocusVisible.onBlur,
      onFocus = _useFocusVisible.onFocus;

  return createScopedElement("label", {
    className: className,
    style: style,
    vkuiClass: classNames("SegmentedControlOption", {
      "SegmentedControlOption--checked": restProps.checked,
      "SegmentedControlOption--focus-visible": focusVisible
    })
  }, createScopedElement(VisuallyHiddenInput, _extends({}, restProps, {
    type: "radio",
    onBlur: callMultiple(onBlur, restProps.onBlur),
    onFocus: callMultiple(onFocus, restProps.onFocus)
  })), createScopedElement(Text, {
    vkuiClass: "SegmentedControlOption__content",
    weight: "medium"
  }, children), createScopedElement(FocusVisible, {
    mode: "inside"
  }));
};
//# sourceMappingURL=SegmentedControlOption.js.map