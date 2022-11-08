import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "hierarchy", "hovered", "selected", "before", "after", "option", "description", "disabled", "style"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { Icon16Done } from "@vkontakte/icons";
import { classNames } from "../../lib/classNames";
import { hasReactNode } from "../../lib/utils";
import { Paragraph } from "../Typography/Paragraph/Paragraph";
import { Caption } from "../Typography/Caption/Caption";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { warnOnce } from "../../lib/warnOnce";
import "./CustomSelectOption.css";
var warn = warnOnce("CustomSelectOption");

/**
 * @see https://vkcom.github.io/VKUI/#/CustomSelectOption
 */
export var CustomSelectOption = function CustomSelectOption(_ref) {
  var children = _ref.children,
    _ref$hierarchy = _ref.hierarchy,
    hierarchy = _ref$hierarchy === void 0 ? 0 : _ref$hierarchy,
    hovered = _ref.hovered,
    selected = _ref.selected,
    before = _ref.before,
    after = _ref.after,
    option = _ref.option,
    description = _ref.description,
    disabled = _ref.disabled,
    styleProp = _ref.style,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var title = typeof children === "string" ? children : undefined;
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  var style = React.useMemo(function () {
    return hierarchy > 0 ? _objectSpread({
      "--custom-select-option-hierarchy-level": hierarchy
    }, styleProp) : styleProp;
  }, [hierarchy, styleProp]);
  if (!!option && process.env.NODE_ENV === "development") {
    warn("Свойство option было добавлено по ошибке и будет удалено в 5.0.0.");
  }
  return createScopedElement(Paragraph, _extends({}, restProps, {
    Component: "div",
    role: "option",
    title: title,
    "aria-disabled": disabled,
    "aria-selected": selected,
    vkuiClass: classNames("CustomSelectOption", "CustomSelectOption--sizeY-".concat(sizeY), hovered && !disabled && "CustomSelectOption--hover", selected && "CustomSelectOption--selected",
    // Note: пустой класс
    disabled && "CustomSelectOption--disabled", hierarchy > 0 && "CustomSelectOption--hierarchy"),
    style: style
  }), hasReactNode(before) && createScopedElement("div", {
    vkuiClass: "CustomSelectOption__before"
  }, before), createScopedElement("div", {
    vkuiClass: "CustomSelectOption__main"
  }, createScopedElement("div", {
    vkuiClass: "CustomSelectOption__children"
  }, children), hasReactNode(description) && createScopedElement(Caption, {
    vkuiClass: "CustomSelectOption__description"
  }, description)), createScopedElement("div", {
    vkuiClass: "CustomSelectOption__after"
  }, hasReactNode(after) && createScopedElement("div", {
    vkuiClass: "CustomSelectOption__afterIn"
  }, after), selected && createScopedElement(Icon16Done, {
    vkuiClass: "CustomSelectOption__selectedIcon"
  })));
};
//# sourceMappingURL=CustomSelectOption.js.map