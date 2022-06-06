import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "header", "viewWidth", "viewHeight", "sizeX", "hasMouse", "onOpen", "onOpened", "onClose", "onClosed", "settlingHeight", "dynamicContentHeight", "getModalContentRef", "nav"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { ModalRootContext, useModalRegistry } from "../ModalRoot/ModalRootContext";
import { usePlatform } from "../../hooks/usePlatform";
import { useOrientationChange } from "../../hooks/useOrientationChange";
import { withAdaptivity, ViewWidth } from "../../hoc/withAdaptivity";
import ModalDismissButton from "../ModalDismissButton/ModalDismissButton";
import { multiRef } from "../../lib/utils";
import { ModalType } from "../ModalRoot/types";
import { getNavId } from "../../lib/getNavId";
import { warnOnce } from "../../lib/warnOnce";
import { Platform } from "../../lib/platform";
import { useAdaptivityIsDesktop } from "../../hooks/useAdaptivity";
var warn = warnOnce("ModalPage");
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPage
 */

var ModalPage = function ModalPage(props) {
  var _React$useContext = React.useContext(ModalRootContext),
      updateModalHeight = _React$useContext.updateModalHeight;

  var children = props.children,
      header = props.header,
      viewWidth = props.viewWidth,
      viewHeight = props.viewHeight,
      sizeX = props.sizeX,
      hasMouse = props.hasMouse,
      onOpen = props.onOpen,
      onOpened = props.onOpened,
      onClose = props.onClose,
      onClosed = props.onClosed,
      settlingHeight = props.settlingHeight,
      dynamicContentHeight = props.dynamicContentHeight,
      getModalContentRef = props.getModalContentRef,
      nav = props.nav,
      restProps = _objectWithoutProperties(props, _excluded);

  var platform = usePlatform();
  var orientation = useOrientationChange();
  React.useEffect(updateModalHeight, [children, orientation, updateModalHeight]);
  var isDesktop = useAdaptivityIsDesktop();
  var canShowCloseBtn = viewWidth >= ViewWidth.SMALL_TABLET || platform === Platform.VKCOM;
  var modalContext = React.useContext(ModalRootContext);

  var _useModalRegistry = useModalRegistry(getNavId(props, warn), ModalType.PAGE),
      refs = _useModalRegistry.refs;

  return createScopedElement("div", _extends({}, restProps, {
    // eslint-disable-next-line vkui/no-object-expression-in-arguments
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

ModalPage.defaultProps = {
  settlingHeight: 75
}; // eslint-disable-next-line import/no-default-export

export default withAdaptivity(ModalPage, {
  viewWidth: true,
  viewHeight: true,
  sizeX: true,
  hasMouse: true
});
//# sourceMappingURL=ModalPage.js.map