import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "style", "children"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import { useAdaptivity } from "../../../hooks/useAdaptivity";
import { useFocusVisible } from "../../../hooks/useFocusVisible";
import { callMultiple } from "../../../lib/callMultiple";
import { classNames } from "../../../lib/classNames";
import { SizeType } from "../../AdaptivityProvider/AdaptivityContext";
import { FocusVisible } from "../../FocusVisible/FocusVisible";
import { Text } from "../../Typography/Text/Text";
import { Caption } from "../../Typography/Caption/Caption";
import { VisuallyHiddenInput } from "../../VisuallyHiddenInput/VisuallyHiddenInput";

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
      sizeY = _useAdaptivity.sizeY;

  return createScopedElement("label", {
    className: className,
    style: style,
    vkuiClass: classNames("SegmentedControlOption", restProps.checked && "SegmentedControlOption--checked", focusVisible && "SegmentedControlOption--focus-visible")
  }, createScopedElement(VisuallyHiddenInput, _extends({}, restProps, {
    type: "radio",
    onBlur: callMultiple(onBlur, restProps.onBlur),
    onFocus: callMultiple(onFocus, restProps.onFocus)
  })), sizeY === SizeType.COMPACT ? createScopedElement(Caption, {
    level: "1",
    vkuiClass: "SegmentedControlOption__content",
    weight: "3"
  }, children) : createScopedElement(Text, {
    vkuiClass: "SegmentedControlOption__content",
    weight: "2"
  }, children), createScopedElement(FocusVisible, {
    mode: "inside"
  }));
};
//# sourceMappingURL=SegmentedControlOption.js.map