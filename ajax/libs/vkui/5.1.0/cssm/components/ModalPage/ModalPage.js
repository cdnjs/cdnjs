import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "header", "size", "onOpen", "onOpened", "onClose", "onClosed", "settlingHeight", "dynamicContentHeight", "getModalContentRef", "nav", "id", "hideCloseButton", "className"];
import * as React from 'react';
import { getSizeXClassName } from '../../helpers/getSizeXClassName';
import { classNames } from '@vkontakte/vkjs';
import { Platform } from '../../lib/platform';
import { ModalRootContext, useModalRegistry } from '../ModalRoot/ModalRootContext';
import { usePlatform } from '../../hooks/usePlatform';
import { useOrientationChange } from '../../hooks/useOrientationChange';
import { ModalDismissButton } from '../ModalDismissButton/ModalDismissButton';
import { multiRef } from '../../lib/utils';
import { ModalType } from '../ModalRoot/types';
import { getNavId } from '../../lib/getNavId';
import { warnOnce } from '../../lib/warnOnce';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import "./ModalPage.module.css";
var warn = warnOnce('ModalPage');

/**
 * @see https://vkcom.github.io/VKUI/#/ModalPage
 */
export var ModalPage = function ModalPage(_ref) {
  var children = _ref.children,
    header = _ref.header,
    _ref$size = _ref.size,
    sizeProp = _ref$size === void 0 ? 's' : _ref$size,
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
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _React$useContext = React.useContext(ModalRootContext),
    updateModalHeight = _React$useContext.updateModalHeight;
  var platform = usePlatform();
  var orientation = useOrientationChange();
  var _useAdaptivityWithJSM = useAdaptivityWithJSMediaQueries(),
    sizeX = _useAdaptivityWithJSM.sizeX,
    isDesktop = _useAdaptivityWithJSM.isDesktop;
  React.useEffect(updateModalHeight, [children, orientation, updateModalHeight]);
  var isCloseButtonShown = !hideCloseButton && isDesktop;
  var size = isDesktop ? sizeProp : 's';
  var modalContext = React.useContext(ModalRootContext);
  var _useModalRegistry = useModalRegistry(getNavId({
      nav: nav,
      id: id
    }, warn), ModalType.PAGE),
    refs = _useModalRegistry.refs;
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    id: id,
    className: classNames("vkuiModalPage", platform === Platform.IOS && "vkuiModalPage--ios", platform === Platform.VKCOM && "vkuiModalPage--vkcom", getSizeXClassName("vkuiModalPage", sizeX), isDesktop && "vkuiModalPage--desktop", styles["ModalPage--size-".concat(size)], className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiModalPage__in-wrap",
    ref: refs.innerElement
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiModalPage__in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiModalPage__header",
    ref: refs.headerElement
  }, header), /*#__PURE__*/React.createElement("div", {
    className: "vkuiModalPage__content-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiModalPage__content",
    ref: multiRef(refs.contentElement, getModalContentRef)
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiModalPage__content-in"
  }, children))), isCloseButtonShown && /*#__PURE__*/React.createElement(ModalDismissButton, {
    onClick: onClose || modalContext.onClose
  }))));
};
var styles = {
  "ModalPage--size-s": "vkuiModalPage--size-s",
  "ModalPage--size-m": "vkuiModalPage--size-m",
  "ModalPage--size-l": "vkuiModalPage--size-l"
};
//# sourceMappingURL=ModalPage.js.map