import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "hovered", "selected", "before", "after", "option", "description", "disabled"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { Icon16Done } from '@vkontakte/icons';
import { classNames } from "../../lib/classNames";
import { hasReactNode } from "../../lib/utils";
import Text from "../Typography/Text/Text";
import Caption from "../Typography/Caption/Caption";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { warnOnce } from "../../lib/warnOnce";
import "./CustomSelectOption.css";
var warn = warnOnce('CustomSelectOption');

var CustomSelectOption = function CustomSelectOption(_ref) {
  var children = _ref.children,
      hovered = _ref.hovered,
      selected = _ref.selected,
      before = _ref.before,
      after = _ref.after,
      option = _ref.option,
      description = _ref.description,
      disabled = _ref.disabled,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var title = typeof children === 'string' ? children : null;

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  if (!!option && process.env.NODE_ENV === 'development') {
    warn('Свойство option было добавлено по ошибке будет и удалено в 5.0.0');
  }

  return createScopedElement(Text, _extends({}, restProps, {
    Component: "div",
    weight: "regular",
    role: "option",
    title: title,
    "aria-disabled": disabled,
    "aria-selected": selected,
    vkuiClass: classNames('CustomSelectOption', "CustomSelectOption--sizeY-".concat(sizeY), {
      'CustomSelectOption--hover': hovered && !disabled,
      'CustomSelectOption--selected': selected,
      'CustomSelectOption--disabled': disabled
    })
  }), hasReactNode(before) && createScopedElement("div", {
    vkuiClass: "CustomSelectOption__before"
  }, before), createScopedElement("div", {
    vkuiClass: "CustomSelectOption__main"
  }, createScopedElement("div", {
    vkuiClass: "CustomSelectOption__children"
  }, children), hasReactNode(description) && createScopedElement(Caption, {
    level: "1",
    weight: "regular",
    vkuiClass: "CustomSelectOption__description"
  }, description)), createScopedElement("div", {
    vkuiClass: "CustomSelectOption__after"
  }, hasReactNode(after) && createScopedElement("div", {
    className: "CustomSelectOption__afterIn"
  }, after), selected && createScopedElement(Icon16Done, {
    vkuiClass: "CustomSelectOption__selectedIcon"
  })));
};

export default CustomSelectOption;
//# sourceMappingURL=CustomSelectOption.js.map