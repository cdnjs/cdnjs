import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["getRootRef", "icon", "header", "subheader", "children", "actions", "actionsLayout", "viewWidth", "hasMouse", "viewHeight", "onClose", "dismissLabel"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { hasReactNode } from "../../lib/utils";
import { Title } from "../Typography/Title/Title";
import { Subhead } from "../Typography/Subhead/Subhead";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { ViewWidth, withAdaptivity } from "../../hoc/withAdaptivity";
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton";
import { IOS, Platform } from "../../lib/platform";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton";
import { Icon24Dismiss } from "@vkontakte/icons";
import { useKeyboard } from "../../hooks/useKeyboard";
import { useAdaptivityIsDesktop } from "../../hooks/useAdaptivity";
import "./ModalCardBase.css";
/**
 * @see https://vkcom.github.io/VKUI/#/ModalCardBase
 */
export var ModalCardBase = withAdaptivity(function (_ref) {
  var getRootRef = _ref.getRootRef,
    icon = _ref.icon,
    header = _ref.header,
    subheader = _ref.subheader,
    children = _ref.children,
    actions = _ref.actions,
    actionsLayout = _ref.actionsLayout,
    viewWidth = _ref.viewWidth,
    hasMouse = _ref.hasMouse,
    viewHeight = _ref.viewHeight,
    onClose = _ref.onClose,
    _ref$dismissLabel = _ref.dismissLabel,
    dismissLabel = _ref$dismissLabel === void 0 ? "Скрыть" : _ref$dismissLabel,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var isDesktop = useAdaptivityIsDesktop();
  var isSoftwareKeyboardOpened = useKeyboard().isOpened;
  var canShowCloseBtn = viewWidth >= ViewWidth.SMALL_TABLET || platform === Platform.VKCOM;
  var canShowCloseBtnIos = platform === IOS && !canShowCloseBtn;
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames(getClassName("ModalCardBase", platform), isDesktop && "ModalCardBase--desktop"),
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
  }, actions), canShowCloseBtn && createScopedElement(ModalDismissButton, {
    onClick: onClose
  }), canShowCloseBtnIos && createScopedElement(PanelHeaderButton, {
    "aria-label": dismissLabel,
    vkuiClass: "ModalCardBase__dismiss",
    onClick: onClose
  }, createScopedElement(Icon24Dismiss, null))));
}, {
  viewWidth: true,
  viewHeight: true,
  hasMouse: true
});
ModalCardBase.displayName = "ModalCardBase";
//# sourceMappingURL=ModalCardBase.js.map