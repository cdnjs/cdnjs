import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["getRootRef", "icon", "header", "subheader", "children", "actions", "onClose", "actionsLayout", "dismissLabel"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { hasReactNode } from "../../lib/utils";
import { Title } from "../Typography/Title/Title";
import { Subhead } from "../Typography/Subhead/Subhead";
import { classNames } from "../../lib/classNames";
import { getPlatformClassName } from "../../helpers/getPlatformClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton";
import { Platform } from "../../lib/platform";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton";
import { Icon24Dismiss } from "@vkontakte/icons";
import { useKeyboard } from "../../hooks/useKeyboard";
import { useAdaptivityWithMediaQueries } from "../../hooks/useAdaptivityWithMediaQueries";

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
      actionsLayout = _ref.actionsLayout,
      _ref$dismissLabel = _ref.dismissLabel,
      dismissLabel = _ref$dismissLabel === void 0 ? "Скрыть" : _ref$dismissLabel,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _useAdaptivityWithMed = useAdaptivityWithMediaQueries(),
      isDesktop = _useAdaptivityWithMed.isDesktop;

  var isSoftwareKeyboardOpened = useKeyboard().isOpened;
  var canShowCloseButtonIOS = platform === Platform.IOS && !isDesktop;
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames("ModalCardBase", getPlatformClassName("ModalCardBase", platform), isDesktop && "ModalCardBase--desktop"),
    ref: getRootRef
  }), createScopedElement("div", {
    vkuiClass: classNames("ModalCardBase__container", isSoftwareKeyboardOpened && "ModalCardBase__container--softwareKeyboardOpened")
  }, hasReactNode(icon) && createScopedElement("div", {
    vkuiClass: "ModalCardBase__icon"
  }, icon), hasReactNode(header) && createScopedElement(Title, {
    level: "2",
    weight: "2",
    vkuiClass: "ModalCardBase__header"
  }, header), hasReactNode(subheader) && createScopedElement(Subhead, {
    vkuiClass: "ModalCardBase__subheader"
  }, subheader), children, hasReactNode(actions) && createScopedElement("div", {
    vkuiClass: classNames("ModalCardBase__actions", actionsLayout === "vertical" && "ModalCardBase__actions--v")
  }, actions), isDesktop && createScopedElement(ModalDismissButton, {
    onClick: onClose
  }), canShowCloseButtonIOS && createScopedElement(PanelHeaderButton, {
    "aria-label": dismissLabel,
    vkuiClass: "ModalCardBase__dismiss",
    onClick: onClose
  }, createScopedElement(Icon24Dismiss, null))));
};
//# sourceMappingURL=ModalCardBase.js.map