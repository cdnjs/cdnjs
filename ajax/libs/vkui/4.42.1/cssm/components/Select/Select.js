import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["selectType", "children"],
  _excluded2 = ["hasMouse"],
  _excluded3 = ["children"],
  _excluded4 = ["options", "popupDirection", "renderOption"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { NativeSelect } from "../NativeSelect/NativeSelect";
import { CustomSelect } from "../CustomSelect/CustomSelect";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform, VKCOM } from "../../lib/platform";
import { SizeType } from "../AdaptivityProvider/AdaptivityContext";
import { Paragraph } from "../Typography/Paragraph/Paragraph";
import { Text } from "../Typography/Text/Text";
import { Headline } from "../Typography/Headline/Headline";
export var SelectType = {
  default: "default",
  plain: "plain",
  accent: "accent"
};

// TODO v5.0.0 поправить под новую адаптивность
/**
 * @see https://vkcom.github.io/VKUI/#/SelectTypography
 */
export var SelectTypography = function SelectTypography(_ref) {
  var _ref$selectType = _ref.selectType,
    selectType = _ref$selectType === void 0 ? SelectType.default : _ref$selectType,
    children = _ref.children,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  if (selectType === SelectType.accent) {
    return createScopedElement(Paragraph, _extends({
      weight: platform === Platform.ANDROID ? "2" : "1"
    }, restProps), children);
  }
  var Component = platform === VKCOM || sizeY === SizeType.COMPACT ? Text : Headline;
  return createScopedElement(Component, _extends({
    Component: "span"
  }, restProps), children);
};
var SelectComponent = function SelectComponent(_ref2) {
  var hasMouse = _ref2.hasMouse,
    props = _objectWithoutProperties(_ref2, _excluded2);
  // Use custom select if device has connected a mouse
  if (hasMouse) {
    var children = props.children,
      _restProps = _objectWithoutProperties(props, _excluded3);
    return createScopedElement(CustomSelect, _restProps);
  }
  var _props$options = props.options,
    options = _props$options === void 0 ? [] : _props$options,
    popupDirection = props.popupDirection,
    renderOption = props.renderOption,
    restProps = _objectWithoutProperties(props, _excluded4);
  return createScopedElement(NativeSelect, restProps, options.map(function (_ref3) {
    var label = _ref3.label,
      value = _ref3.value;
    return createScopedElement("option", {
      value: value,
      key: "".concat(value)
    }, label);
  }));
};

/**
 * @see https://vkcom.github.io/VKUI/#/Select
 */
export var Select = withAdaptivity(SelectComponent, {
  hasMouse: true
});
Select.displayName = "Select";
//# sourceMappingURL=Select.js.map