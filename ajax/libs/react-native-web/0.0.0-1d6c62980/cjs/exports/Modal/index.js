"use strict";

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

const _excluded = ["animationType", "children", "onDismiss", "onRequestClose", "onShow", "transparent", "visible"];
let uniqueModalIdentifier = 0;
const activeModalStack = [];
const activeModalListeners = {};

function notifyActiveModalListeners() {
  if (activeModalStack.length === 0) {
    return;
  }

  const activeModalId = activeModalStack[activeModalStack.length - 1];
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

  const index = activeModalStack.indexOf(modalId);

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

const Modal = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
  const animationType = props.animationType,
        children = props.children,
        onDismiss = props.onDismiss,
        onRequestClose = props.onRequestClose,
        onShow = props.onShow,
        transparent = props.transparent,
        _props$visible = props.visible,
        visible = _props$visible === void 0 ? true : _props$visible,
        rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded); // Set a unique model identifier so we can correctly route
  // dismissals and check the layering of modals.

  const modalId = React.useMemo(() => uniqueModalIdentifier++, []);

  const _React$useState = React.useState(false),
        isActive = _React$useState[0],
        setIsActive = _React$useState[1];

  const onDismissCallback = React.useCallback(() => {
    removeActiveModal(modalId);

    if (onDismiss) {
      onDismiss();
    }
  }, [modalId, onDismiss]);
  const onShowCallback = React.useCallback(() => {
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
var _default = Modal;
exports.default = _default;
module.exports = exports.default;