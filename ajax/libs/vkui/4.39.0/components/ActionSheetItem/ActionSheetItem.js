import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "autoclose", "mode", "meta", "subtitle", "before", "selectable", "value", "name", "checked", "defaultChecked", "onChange", "onClick", "sizeY", "onImmediateClick", "multiline", "iconChecked"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { Tappable } from "../Tappable/Tappable";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode, noop } from "../../lib/utils";
import { Platform } from "../../lib/platform";
import { Subhead } from "../Typography/Subhead/Subhead";
import { Text } from "../Typography/Text/Text";
import { Icon24CheckCircleOn } from "@vkontakte/icons";
import { ActionSheetContext } from "../ActionSheet/ActionSheetContext";
import { withAdaptivity } from "../../hoc/withAdaptivity";
var ActionSheetItemComponent = function ActionSheetItemComponent(_ref) {
  var children = _ref.children,
    autoclose = _ref.autoclose,
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
    sizeY = _ref.sizeY,
    onImmediateClick = _ref.onImmediateClick,
    _ref$multiline = _ref.multiline,
    multiline = _ref$multiline === void 0 ? false : _ref$multiline,
    _ref$iconChecked = _ref.iconChecked,
    iconChecked = _ref$iconChecked === void 0 ? createScopedElement(Icon24CheckCircleOn, {
      "aria-hidden": true
    }) : _ref$iconChecked,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _React$useContext = React.useContext(ActionSheetContext),
    _React$useContext$onI = _React$useContext.onItemClick,
    onItemClick = _React$useContext$onI === void 0 ? function () {
      return noop;
    } : _React$useContext$onI,
    isDesktop = _React$useContext.isDesktop;
  var Component = restProps.href ? "a" : "div";
  if (selectable) {
    Component = "label";
  }
  var isRich = hasReactNode(subtitle) || hasReactNode(meta) || selectable;
  var isCentered = !isRich && !hasReactNode(before) && platform === Platform.IOS;
  return createScopedElement(Tappable, _extends({}, restProps, {
    onClick: selectable ? onClick : onItemClick(onClick, onImmediateClick, Boolean(autoclose)),
    activeMode: platform === Platform.IOS ? "ActionSheetItem--active" : undefined,
    vkuiClass: classNames("ActionSheetItem", platform === Platform.IOS && "ActionSheetItem--ios", "ActionSheetItem--".concat(mode), "ActionSheetItem--sizeY-".concat(sizeY), isRich && "ActionSheetItem--rich", isDesktop && "ActionSheetItem--desktop"),
    Component: Component
  }), hasReactNode(before) && createScopedElement("div", {
    vkuiClass: "ActionSheetItem__before"
  }, before), createScopedElement("div", {
    vkuiClass: classNames("ActionSheetItem__container", !multiline && "ActionSheetItem--ellipsis")
  }, createScopedElement("div", {
    vkuiClass: classNames("ActionSheetItem__content", isCentered && "ActionSheetItem--centered")
  }, createScopedElement(Text, {
    weight: mode === "cancel" ? "2" : undefined,
    vkuiClass: "ActionSheetItem__children"
  }, children), hasReactNode(meta) && createScopedElement(Text, {
    vkuiClass: "ActionSheetItem__meta"
  }, meta)), hasReactNode(subtitle) && createScopedElement(Subhead, {
    vkuiClass: "ActionSheetItem__subtitle"
  }, subtitle)), selectable && createScopedElement("div", {
    vkuiClass: "ActionSheetItem__after"
  }, createScopedElement("input", {
    type: "radio",
    vkuiClass: "ActionSheetItem__radio",
    name: name,
    value: value,
    onChange: onChange,
    onClick: onItemClick(noop, noop, Boolean(autoclose)),
    defaultChecked: defaultChecked,
    checked: checked,
    disabled: restProps.disabled
  }), createScopedElement("div", {
    vkuiClass: "ActionSheetItem__marker"
  }, iconChecked)));
};

/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheetItem
 */
export var ActionSheetItem = withAdaptivity(ActionSheetItemComponent, {
  sizeY: true
});
//# sourceMappingURL=ActionSheetItem.js.map