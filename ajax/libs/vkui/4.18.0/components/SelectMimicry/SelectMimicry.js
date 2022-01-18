import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["tabIndex", "placeholder", "children", "align", "getRootRef", "multiline", "disabled", "onClick", "sizeX", "sizeY"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { Icon24Dropdown, Icon20Dropdown } from '@vkontakte/icons';
import { FormField } from "../FormField/FormField";
import { withAdaptivity, SizeType } from "../../hoc/withAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import { getClassName } from "../../helpers/getClassName";
import Headline from "../Typography/Headline/Headline";
import Text from "../Typography/Text/Text";
import { VKCOM } from "../../lib/platform";

var SelectMimicry = function SelectMimicry(_ref) {
  var _classNames;

  var tabIndex = _ref.tabIndex,
      placeholder = _ref.placeholder,
      children = _ref.children,
      align = _ref.align,
      getRootRef = _ref.getRootRef,
      multiline = _ref.multiline,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      sizeX = _ref.sizeX,
      sizeY = _ref.sizeY,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  var TypographyComponent = platform === VKCOM || sizeY === SizeType.COMPACT ? Text : Headline;
  return createScopedElement(FormField, _extends({}, restProps, {
    tabIndex: disabled ? null : tabIndex,
    vkuiClass: classNames(getClassName('Select', platform), 'Select--mimicry', (_classNames = {
      'Select--not-selected': !children,
      'Select--multiline': multiline
    }, _defineProperty(_classNames, "Select--align-".concat(align), !!align), _defineProperty(_classNames, "Select--sizeX--".concat(sizeX), !!sizeX), _defineProperty(_classNames, "Select--sizeY--".concat(sizeY), !!sizeY), _classNames)),
    getRootRef: getRootRef,
    onClick: disabled ? null : onClick,
    disabled: disabled,
    after: sizeY === SizeType.COMPACT ? createScopedElement(Icon20Dropdown, null) : createScopedElement(Icon24Dropdown, null)
  }), createScopedElement(TypographyComponent, {
    Component: "div",
    weight: "regular",
    vkuiClass: "Select__container"
  }, createScopedElement("span", {
    vkuiClass: "Select__title"
  }, children || placeholder)));
};

SelectMimicry.defaultProps = {
  tabIndex: 0
};
export default withAdaptivity(SelectMimicry, {
  sizeX: true,
  sizeY: true
});
//# sourceMappingURL=SelectMimicry.js.map