import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "header", "viewWidth", "viewHeight", "sizeX", "hasMouse", "onOpen", "onOpened", "onClose", "onClosed", "settlingHeight", "dynamicContentHeight", "getModalContentRef", "nav", "id"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { ModalRootContext, useModalRegistry } from "../ModalRoot/ModalRootContext";
import { usePlatform } from "../../hooks/usePlatform";
import { useOrientationChange } from "../../hooks/useOrientationChange";
import { withAdaptivity, ViewWidth } from "../../hoc/withAdaptivity";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton";
import { multiRef } from "../../lib/utils";
import { ModalType } from "../ModalRoot/types";
import { getNavId } from "../../lib/getNavId";
import { warnOnce } from "../../lib/warnOnce";
import { Platform } from "../../lib/platform";
import { useAdaptivityIsDesktop } from "../../hooks/useAdaptivity";
var warn = warnOnce("ModalPage");

var ModalPageComponent = function ModalPageComponent(_ref) {
  var children = _ref.children,
      header = _ref.header,
      viewWidth = _ref.viewWidth,
      viewHeight = _ref.viewHeight,
      sizeX = _ref.sizeX,
      hasMouse = _ref.hasMouse,
      onOpen = _ref.onOpen,
      onOpened = _ref.onOpened,
      onClose = _ref.onClose,
      onClosed = _ref.onClosed,
      settlingHeight = _ref.settlingHeight,
      dynamicContentHeight = _ref.dynamicContentHeight,
      getModalContentRef = _ref.getModalContentRef,
      nav = _ref.nav,
      id = _ref.id,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _React$useContext = React.useContext(ModalRootContext),
      updateModalHeight = _React$useContext.updateModalHeight;

  var platform = usePlatform();
  var orientation = useOrientationChange();
  React.useEffect(updateModalHeight, [children, orientation, updateModalHeight]);
  var isDesktop = useAdaptivityIsDesktop();
  var canShowCloseBtn = viewWidth >= ViewWidth.SMALL_TABLET || platform === Platform.VKCOM;
  var modalContext = React.useContext(ModalRootContext);

  var _useModalRegistry = useModalRegistry(getNavId({
    nav: nav,
    id: id
  }, warn), ModalType.PAGE),
      refs = _useModalRegistry.refs;

  return createScopedElement("div", _extends({}, restProps, {
    id: id // eslint-disable-next-line vkui/no-object-expression-in-arguments
    ,
    vkuiClass: classNames(getClassName("ModalPage", platform), "ModalPage--sizeX-".concat(sizeX), {
      "ModalPage--desktop": isDesktop
    })
  }), createScopedElement("div", {
    vkuiClass: "ModalPage__in-wrap",
    ref: refs.innerElement
  }, createScopedElement("div", {
    vkuiClass: "ModalPage__in"
  }, createScopedElement("div", {
    vkuiClass: "ModalPage__header",
    ref: refs.headerElement
  }, header), createScopedElement("div", {
    vkuiClass: "ModalPage__content-wrap"
  }, createScopedElement("div", {
    vkuiClass: "ModalPage__content",
    ref: multiRef(refs.contentElement, getModalContentRef)
  }, createScopedElement("div", {
    vkuiClass: "ModalPage__content-in"
  }, children))), canShowCloseBtn && createScopedElement(ModalDismissButton, {
    onClick: onClose || modalContext.onClose
  }))));
};
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPage
 */


export var ModalPage = withAdaptivity(ModalPageComponent, {
  viewWidth: true,
  viewHeight: true,
  sizeX: true,
  hasMouse: true
});
ModalPage.displayName = "ModalPage";
//# sourceMappingURL=ModalPage.js.map