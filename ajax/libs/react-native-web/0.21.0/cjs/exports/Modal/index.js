"use strict";
/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _ModalPortal = _interopRequireDefault(require("./ModalPortal"));
var _ModalAnimation = _interopRequireDefault(require("./ModalAnimation"));
var _ModalContent = _interopRequireDefault(require("./ModalContent"));
var _ModalFocusTrap = _interopRequireDefault(require("./ModalFocusTrap"));
var _excluded = ["animationType", "children", "onDismiss", "onRequestClose", "onShow", "transparent", "visible"];
var uniqueModalIdentifier = 0;
var activeModalStack = [];
var activeModalListeners = {};
function notifyActiveModalListeners() {
  if (activeModalStack.length === 0) {
    return;
  }
  var activeModalId = activeModalStack[activeModalStack.length - 1];
  activeModalStack.forEach(modalId => {
    if (modalId in activeModalListeners) {
      activeModalListeners[modalId](modalId === activeModalId);
    }
  });
}
function removeActiveModal(modalId) {
  if (modalId in activeModalListeners) {
    // Before removing this listener we should probably tell it
    // that it's no longer the active modal for sure.
    activeModalListeners[modalId](false);
    delete activeModalListeners[modalId];
  }
  var index = activeModalStack.indexOf(modalId);
  if (index !== -1) {
    activeModalStack.splice(index, 1);
    notifyActiveModalListeners();
  }
}
function addActiveModal(modalId, listener) {
  removeActiveModal(modalId);
  activeModalStack.push(modalId);
  activeModalListeners[modalId] = listener;
  notifyActiveModalListeners();
}
var Modal = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
  var animationType = props.animationType,
    children = props.children,
    onDismiss = props.onDismiss,
    onRequestClose = props.onRequestClose,
    onShow = props.onShow,
    transparent = props.transparent,
    _props$visible = props.visible,
    visible = _props$visible === void 0 ? true : _props$visible,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);

  // Set a unique model identifier so we can correctly route
  // dismissals and check the layering of modals.
  var modalId = React.useMemo(() => uniqueModalIdentifier++, []);
  var _React$useState = React.useState(false),
    isActive = _React$useState[0],
    setIsActive = _React$useState[1];
  var onDismissCallback = React.useCallback(() => {
    removeActiveModal(modalId);
    if (onDismiss) {
      onDismiss();
    }
  }, [modalId, onDismiss]);
  var onShowCallback = React.useCallback(() => {
    addActiveModal(modalId, setIsActive);
    if (onShow) {
      onShow();
    }
  }, [modalId, onShow]);
  React.useEffect(() => {
    return () => removeActiveModal(modalId);
  }, [modalId]);
  return /*#__PURE__*/React.createElement(_ModalPortal.default, null, /*#__PURE__*/React.createElement(_ModalAnimation.default, {
    animationType: animationType,
    onDismiss: onDismissCallback,
    onShow: onShowCallback,
    visible: visible
  }, /*#__PURE__*/React.createElement(_ModalFocusTrap.default, {
    active: isActive
  }, /*#__PURE__*/React.createElement(_ModalContent.default, (0, _extends2.default)({}, rest, {
    active: isActive,
    onRequestClose: onRequestClose,
    ref: forwardedRef,
    transparent: transparent
  }), children))));
});
var _default = exports.default = Modal;
module.exports = exports.default;