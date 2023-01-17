import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "autoClose", "mode", "meta", "subtitle", "before", "selectable", "value", "name", "checked", "defaultChecked", "onChange", "onClick", "onImmediateClick", "multiline", "iconChecked", "className"];
import * as React from 'react';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import { classNames, noop } from '@vkontakte/vkjs';
import { Tappable } from '../Tappable/Tappable';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Text } from '../Typography/Text/Text';
import { Icon20CheckCircleOn, Icon24CheckCircleOn } from '@vkontakte/icons';
import { ActionSheetContext } from '../ActionSheet/ActionSheetContext';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheetItem
 */
var ActionSheetItem = function ActionSheetItem(_ref) {
  var children = _ref.children,
    autoClose = _ref.autoClose,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'default' : _ref$mode,
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
    iconCheckedProp = _ref.iconChecked,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _React$useContext = React.useContext(ActionSheetContext),
    _React$useContext$onI = _React$useContext.onItemClick,
    onItemClick = _React$useContext$onI === void 0 ? function () {
      return noop;
    } : _React$useContext$onI,
    isDesktop = _React$useContext.isDesktop;
  var _useAdaptivityWithJSM = useAdaptivityWithJSMediaQueries(),
    sizeY = _useAdaptivityWithJSM.sizeY;
  var iconChecked = iconCheckedProp || (sizeY === SizeType.COMPACT ? /*#__PURE__*/React.createElement(Icon20CheckCircleOn, null) : /*#__PURE__*/React.createElement(Icon24CheckCircleOn, null));
  var Component = restProps.href ? 'a' : 'div';
  if (selectable) {
    Component = 'label';
  }
  var isRich = subtitle || meta || selectable;
  var isCentered = !isRich && !before && platform === Platform.IOS;
  return /*#__PURE__*/React.createElement(Tappable, _extends({}, restProps, {
    onClick: selectable ? onClick : onItemClick(onClick, onImmediateClick, Boolean(autoClose)),
    activeMode: platform === Platform.IOS ? "vkuiActionSheetItem--active" : undefined,
    className: classNames("vkuiActionSheetItem", platform === Platform.IOS && "vkuiActionSheetItem--ios", styles["ActionSheetItem--mode-".concat(mode)], getSizeYClassName("vkuiActionSheetItem", sizeY), isRich && "vkuiActionSheetItem--rich", isDesktop && "vkuiActionSheetItem--desktop", className),
    Component: Component
  }), before && /*#__PURE__*/React.createElement("div", {
    className: "vkuiActionSheetItem__before"
  }, before), /*#__PURE__*/React.createElement("div", {
    className: classNames("vkuiActionSheetItem__container", !multiline && "vkuiActionSheetItem--ellipsis")
  }, /*#__PURE__*/React.createElement("div", {
    className: classNames("vkuiActionSheetItem__content", isCentered && "vkuiActionSheetItem--centered")
  }, /*#__PURE__*/React.createElement(Text, {
    weight: mode === 'cancel' ? '2' : undefined,
    className: "vkuiActionSheetItem__children"
  }, children), meta && /*#__PURE__*/React.createElement(Text, {
    className: "vkuiActionSheetItem__meta"
  }, meta)), subtitle && /*#__PURE__*/React.createElement(Subhead, {
    className: "vkuiActionSheetItem__subtitle"
  }, subtitle)), selectable && /*#__PURE__*/React.createElement("div", {
    className: "vkuiActionSheetItem__after"
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    className: "vkuiActionSheetItem__radio",
    name: name,
    value: value,
    onChange: onChange,
    onClick: onItemClick(noop, noop, Boolean(autoClose)),
    defaultChecked: defaultChecked,
    checked: checked,
    disabled: restProps.disabled
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiActionSheetItem__marker"
  }, iconChecked)));
};
export { ActionSheetItem };
var styles = {
  "ActionSheetItem--mode-destructive": "vkuiActionSheetItem--mode-destructive",
  "ActionSheetItem--mode-cancel": "vkuiActionSheetItem--mode-cancel",
  "ActionSheetItem--mode-default": "vkuiActionSheetItem--mode-default"
};
//# sourceMappingURL=ActionSheetItem.js.map