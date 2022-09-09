import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "header", "size", "onOpen", "onOpened", "onClose", "onClosed", "settlingHeight", "dynamicContentHeight", "getModalContentRef", "nav", "id", "hideCloseButton"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { getSizeXClassName } from "../../helpers/getSizeXClassName";
import { classNames } from "../../lib/classNames";
import { Platform } from "../../lib/platform";
import { ModalRootContext, useModalRegistry } from "../ModalRoot/ModalRootContext";
import { usePlatform } from "../../hooks/usePlatform";
import { useOrientationChange } from "../../hooks/useOrientationChange";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton";
import { multiRef } from "../../lib/utils";
import { ModalType } from "../ModalRoot/types";
import { getNavId } from "../../lib/getNavId";
import { warnOnce } from "../../lib/warnOnce";
import { useAdaptivityWithMediaQueries } from "../../hooks/useAdaptivityWithMediaQueries";
import "./ModalPage.css";
var warn = warnOnce("ModalPage");
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPage
 */

export var ModalPage = function ModalPage(_ref) {
  var children = _ref.children,
      header = _ref.header,
      _ref$size = _ref.size,
      sizeProp = _ref$size === void 0 ? "s" : _ref$size,
      onOpen = _ref.onOpen,
      onOpened = _ref.onOpened,
      onClose = _ref.onClose,
      onClosed = _ref.onClosed,
      settlingHeight = _ref.settlingHeight,
      dynamicContentHeight = _ref.dynamicContentHeight,
      getModalContentRef = _ref.getModalContentRef,
      nav = _ref.nav,
      id = _ref.id,
      _ref$hideCloseButton = _ref.hideCloseButton,
      hideCloseButton = _ref$hideCloseButton === void 0 ? false : _ref$hideCloseButton,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _React$useContext = React.useContext(ModalRootContext),
      updateModalHeight = _React$useContext.updateModalHeight;

  var platform = usePlatform();
  var orientation = useOrientationChange();

  var _useAdaptivityWithMed = useAdaptivityWithMediaQueries(),
      sizeX = _useAdaptivityWithMed.sizeX,
      isDesktop = _useAdaptivityWithMed.isDesktop;

  React.useEffect(updateModalHeight, [children, orientation, updateModalHeight]);
  var isCloseButtonShown = !hideCloseButton && isDesktop;
  var size = isDesktop ? sizeProp : "s";
  var modalContext = React.useContext(ModalRootContext);

  var _useModalRegistry = useModalRegistry(getNavId({
    nav: nav,
    id: id
  }, warn), ModalType.PAGE),
      refs = _useModalRegistry.refs;

  return createScopedElement("div", _extends({}, restProps, {
    id: id,
    vkuiClass: classNames("ModalPage", platform === Platform.IOS && "ModalPage--ios", platform === Platform.VKCOM && "ModalPage--vkcom", getSizeXClassName("ModalPage", sizeX), isDesktop && "ModalPage--desktop", "ModalPage--size-".concat(size))
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
  }, children))), isCloseButtonShown && createScopedElement(ModalDismissButton, {
    onClick: onClose || modalContext.onClose
  }))));
};
//# sourceMappingURL=ModalPage.js.map