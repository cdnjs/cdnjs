import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["getRootRef", "icon", "header", "subheader", "children", "actions", "onClose", "dismissLabel", "className"];
import * as React from 'react';
import { Title } from '../Typography/Title/Title';
import { Subhead } from '../Typography/Subhead/Subhead';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { getPlatformClassName } from '../../helpers/getPlatformClassName';
import { usePlatform } from '../../hooks/usePlatform';
import { PanelHeaderButton } from '../PanelHeaderButton/PanelHeaderButton';
import { Platform } from '../../lib/platform';
import { ModalDismissButton } from '../ModalDismissButton/ModalDismissButton';
import { Icon24Dismiss } from '@vkontakte/icons';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import "./ModalCardBase.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/ModalCardBase
 */
export var ModalCardBase = function ModalCardBase(_ref) {
  var getRootRef = _ref.getRootRef,
    icon = _ref.icon,
    header = _ref.header,
    subheader = _ref.subheader,
    children = _ref.children,
    actions = _ref.actions,
    onClose = _ref.onClose,
    _ref$dismissLabel = _ref.dismissLabel,
    dismissLabel = _ref$dismissLabel === void 0 ? 'Скрыть' : _ref$dismissLabel,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _useAdaptivityWithJSM = useAdaptivityWithJSMediaQueries(),
    isDesktop = _useAdaptivityWithJSM.isDesktop;
  var isSoftwareKeyboardOpened = useKeyboard().isOpened;
  var canShowCloseButtonIOS = platform === Platform.IOS && !isDesktop;
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: classNames("vkuiModalCardBase", getPlatformClassName("vkuiModalCardBase", platform), isDesktop && "vkuiModalCardBase--desktop", className),
    ref: getRootRef
  }), /*#__PURE__*/React.createElement("div", {
    className: classNames("vkuiModalCardBase__container", isSoftwareKeyboardOpened && "vkuiModalCardBase__container--softwareKeyboardOpened")
  }, hasReactNode(icon) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiModalCardBase__icon"
  }, icon), hasReactNode(header) && /*#__PURE__*/React.createElement(Title, {
    level: "2",
    weight: "2",
    className: "vkuiModalCardBase__header"
  }, header), hasReactNode(subheader) && /*#__PURE__*/React.createElement(Subhead, {
    className: "vkuiModalCardBase__subheader"
  }, subheader), children, hasReactNode(actions) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiModalCardBase__actions"
  }, actions), isDesktop && /*#__PURE__*/React.createElement(ModalDismissButton, {
    onClick: onClose
  }), canShowCloseButtonIOS && /*#__PURE__*/React.createElement(PanelHeaderButton, {
    "aria-label": dismissLabel,
    className: "vkuiModalCardBase__dismiss",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(Icon24Dismiss, null))));
};
//# sourceMappingURL=ModalCardBase.js.map