import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "autoClose", "mode", "meta", "subtitle", "before", "selectable", "value", "name", "checked", "defaultChecked", "onChange", "onClick", "onImmediateClick", "multiline"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { getSizeYClassName } from "../../helpers/getSizeYClassName";
import { classNames } from "../../lib/classNames";
import { Tappable } from "../Tappable/Tappable";
import { usePlatform } from "../../hooks/usePlatform";
import { noop } from "../../lib/utils";
import { Platform } from "../../lib/platform";
import { Subhead } from "../Typography/Subhead/Subhead";
import { Text } from "../Typography/Text/Text";
import { Icon24CheckCircleOn } from "@vkontakte/icons";
import { ActionSheetContext } from "../ActionSheet/ActionSheetContext";
import { useAdaptivityWithMediaQueries } from "../../hooks/useAdaptivityWithMediaQueries";

/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheetItem
 */
var ActionSheetItem = function ActionSheetItem(_ref) {
  var children = _ref.children,
      autoClose = _ref.autoClose,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "default" : _ref$mode,
      meta = _ref.meta,
      subtitle = _ref.subtitle,
      before = _ref.before,
      selectable = _ref.selectable,
      value = _ref.value,
      name = _ref.name,
      checked = _ref.checked,
      defaultChecked = _ref.defaultChecked,
      onChange = _ref.onChange,
      onClick = _ref.onClick,
      onImmediateClick = _ref.onImmediateClick,
      _ref$multiline = _ref.multiline,
      multiline = _ref$multiline === void 0 ? false : _ref$multiline,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _React$useContext = React.useContext(ActionSheetContext),
      _React$useContext$onI = _React$useContext.onItemClick,
      onItemClick = _React$useContext$onI === void 0 ? function () {
    return noop;
  } : _React$useContext$onI,
      isDesktop = _React$useContext.isDesktop;

  var _useAdaptivityWithMed = useAdaptivityWithMediaQueries(),
      sizeY = _useAdaptivityWithMed.sizeY;

  var Component = restProps.href ? "a" : "div";

  if (selectable) {
    Component = "label";
  }

  var isRich = subtitle || meta || selectable;
  var isCentered = !isRich && !before && platform === Platform.IOS;
  return createScopedElement(Tappable, _extends({}, restProps, {
    onClick: selectable ? onClick : onItemClick(onClick, onImmediateClick, Boolean(autoClose)),
    activeMode: platform === Platform.IOS ? "ActionSheetItem--active" : undefined,
    vkuiClass: classNames("ActionSheetItem", platform === Platform.IOS && "ActionSheetItem--ios", "ActionSheetItem--mode-".concat(mode), getSizeYClassName("ActionSheetItem", sizeY), isRich && "ActionSheetItem--rich", isDesktop && "ActionSheetItem--desktop"),
    Component: Component
  }), before && createScopedElement("div", {
    vkuiClass: "ActionSheetItem__before"
  }, before), createScopedElement("div", {
    vkuiClass: classNames("ActionSheetItem__container", !multiline && "ActionSheetItem--ellipsis")
  }, createScopedElement("div", {
    vkuiClass: classNames("ActionSheetItem__content", isCentered && "ActionSheetItem--centered")
  }, createScopedElement(Text, {
    weight: mode === "cancel" ? "2" : undefined,
    vkuiClass: "ActionSheetItem__children"
  }, children), meta && createScopedElement(Text, {
    vkuiClass: "ActionSheetItem__meta"
  }, meta)), subtitle && createScopedElement(Subhead, {
    vkuiClass: "ActionSheetItem__subtitle"
  }, subtitle)), selectable && createScopedElement("div", {
    vkuiClass: "ActionSheetItem__after"
  }, createScopedElement("input", {
    type: "radio",
    vkuiClass: "ActionSheetItem__radio",
    name: name,
    value: value,
    onChange: onChange,
    onClick: onItemClick(noop, noop, Boolean(autoClose)),
    defaultChecked: defaultChecked,
    checked: checked,
    disabled: restProps.disabled
  }), createScopedElement("div", {
    vkuiClass: "ActionSheetItem__marker"
  }, createScopedElement(Icon24CheckCircleOn, null))));
};

export { ActionSheetItem };
//# sourceMappingURL=ActionSheetItem.js.map