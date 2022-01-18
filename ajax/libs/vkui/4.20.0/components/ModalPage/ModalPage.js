import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "header", "viewWidth", "viewHeight", "sizeX", "hasMouse", "onClose", "settlingHeight", "dynamicContentHeight", "getModalContentRef", "nav"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { ModalRootContext, useModalRegistry } from "../ModalRoot/ModalRootContext";
import { usePlatform } from "../../hooks/usePlatform";
import { withAdaptivity, ViewHeight, ViewWidth } from "../../hoc/withAdaptivity";
import ModalDismissButton from "../ModalDismissButton/ModalDismissButton";
import { multiRef } from "../../lib/utils";
import { ModalType } from "../ModalRoot/types";
import { getNavId } from "../../lib/getNavId";
import { warnOnce } from "../../lib/warnOnce";
var warn = warnOnce('ModalPage');

var ModalPage = function ModalPage(props) {
  var platform = usePlatform();

  var _React$useContext = React.useContext(ModalRootContext),
      updateModalHeight = _React$useContext.updateModalHeight;

  var children = props.children,
      header = props.header,
      viewWidth = props.viewWidth,
      viewHeight = props.viewHeight,
      sizeX = props.sizeX,
      hasMouse = props.hasMouse,
      onClose = props.onClose,
      settlingHeight = props.settlingHeight,
      dynamicContentHeight = props.dynamicContentHeight,
      getModalContentRef = props.getModalContentRef,
      nav = props.nav,
      restProps = _objectWithoutProperties(props, _excluded);

  React.useEffect(function () {
    updateModalHeight();
  }, [children]);
  var isDesktop = viewWidth >= ViewWidth.SMALL_TABLET && (hasMouse || viewHeight >= ViewHeight.MEDIUM);
  var canShowCloseBtn = viewWidth >= ViewWidth.SMALL_TABLET;
  var modalContext = React.useContext(ModalRootContext);

  var _useModalRegistry = useModalRegistry(getNavId(props, warn), ModalType.PAGE),
      refs = _useModalRegistry.refs;

  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames(getClassName('ModalPage', platform), "ModalPage--sizeX-".concat(sizeX), {
      'ModalPage--desktop': isDesktop
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
};
export default withAdaptivity(ModalPage, {
  viewWidth: true,
  viewHeight: true,
  sizeX: true,
  hasMouse: true
});
//# sourceMappingURL=ModalPage.js.map