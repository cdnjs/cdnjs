import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "autoclose", "mode", "meta", "subtitle", "before", "selectable", "value", "name", "checked", "defaultChecked", "onChange", "onClick", "sizeY", "onImmediateClick"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import Tappable from "../Tappable/Tappable";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode, noop } from "../../lib/utils";
import Subhead from "../Typography/Subhead/Subhead";
import Title from "../Typography/Title/Title";
import Text from "../Typography/Text/Text";
import { ANDROID, VKCOM } from "../../lib/platform";
import { Icon16Done, Icon24Done } from "@vkontakte/icons";
import { ActionSheetContext } from "../ActionSheet/ActionSheetContext";
import { Caption } from "../Typography/Caption/Caption";
import Headline from "../Typography/Headline/Headline";
import { withAdaptivity, SizeType } from "../../hoc/withAdaptivity";

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

  var isCompact = hasReactNode(subtitle) || hasReactNode(meta) || selectable;
  return createScopedElement(Tappable, _extends({}, restProps, {
    onClick: selectable ? onClick : onItemClick(onClick, onImmediateClick, Boolean(autoclose)),
    activeMode: "ActionSheetItem--active",
    vkuiClass: classNames(getClassName("ActionSheetItem", platform), "ActionSheetItem--".concat(mode), "ActionSheetItem--sizeY-".concat(sizeY), {
      "ActionSheetItem--compact": isCompact,
      "ActionSheetItem--desktop": isDesktop,
      "ActionSheetItem--withSubtitle": hasReactNode(subtitle)
    }),
    Component: Component
  }), hasReactNode(before) && createScopedElement("div", {
    vkuiClass: "ActionSheetItem__before"
  }, before), createScopedElement("div", {
    vkuiClass: "ActionSheetItem__container"
  }, createScopedElement("div", {
    vkuiClass: "ActionSheetItem__content"
  }, sizeY === SizeType.COMPACT ? createScopedElement(React.Fragment, null, createScopedElement(Text, {
    weight: mode === "cancel" ? "medium" : "regular",
    vkuiClass: "ActionSheetItem__children"
  }, children), hasReactNode(meta) && createScopedElement(Text, {
    weight: "regular",
    vkuiClass: "ActionSheetItem__meta"
  }, meta)) : createScopedElement(React.Fragment, null, platform === ANDROID ? createScopedElement(Headline, {
    weight: mode === "cancel" ? "medium" : "regular"
  }, children) : createScopedElement(Title, {
    weight: mode === "cancel" ? "2" : "3",
    level: isCompact || hasReactNode(before) ? "3" : "2",
    vkuiClass: "ActionSheetItem__children"
  }, children), hasReactNode(meta) && (platform === ANDROID ? createScopedElement(Headline, {
    weight: mode === "cancel" ? "medium" : "regular"
  }, children) : createScopedElement(Title, {
    weight: "3",
    level: isCompact || hasReactNode(before) ? "3" : "2",
    vkuiClass: "ActionSheetItem__meta"
  }, meta)))), hasReactNode(subtitle) && (sizeY === SizeType.COMPACT ? createScopedElement(Caption, {
    vkuiClass: "ActionSheetItem__subtitle"
  }, subtitle) : createScopedElement(Subhead, {
    vkuiClass: "ActionSheetItem__subtitle"
  }, subtitle))), selectable && createScopedElement("div", {
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
  }, platform === VKCOM ? createScopedElement(Icon24Done, null) : createScopedElement(Icon16Done, null))));
};

export var ActionSheetItem = withAdaptivity(ActionSheetItemComponent, {
  sizeY: true
});
//# sourceMappingURL=ActionSheetItem.js.map