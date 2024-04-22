"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _View = _interopRequireDefault(require("../View"));
var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));
var _canUseDom = _interopRequireDefault(require("../../modules/canUseDom"));
var _excluded = ["active", "children", "onRequestClose", "transparent"];
var ModalContent = /*#__PURE__*/React.forwardRef((props, forwardedRef) => {
  var active = props.active,
    children = props.children,
    onRequestClose = props.onRequestClose,
    transparent = props.transparent,
    rest = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  React.useEffect(() => {
    if (_canUseDom.default) {
      var closeOnEscape = e => {
        if (active && e.key === 'Escape') {
          e.stopPropagation();
          if (onRequestClose) {
            onRequestClose();
          }
        }
      };
      document.addEventListener('keyup', closeOnEscape, false);
      return () => document.removeEventListener('keyup', closeOnEscape, false);
    }
  }, [active, onRequestClose]);
  var style = React.useMemo(() => {
    return [styles.modal, transparent ? styles.modalTransparent : styles.modalOpaque];
  }, [transparent]);
  return /*#__PURE__*/React.createElement(_View.default, (0, _extends2.default)({}, rest, {
    "aria-modal": true,
    ref: forwardedRef,
    role: active ? 'dialog' : null,
    style: style
  }), /*#__PURE__*/React.createElement(_View.default, {
    style: styles.container
  }, children));
});
var styles = _StyleSheet.default.create({
  modal: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  modalTransparent: {
    backgroundColor: 'transparent'
  },
  modalOpaque: {
    backgroundColor: 'white'
  },
  container: {
    top: 0,
    flex: 1
  }
});
var _default = ModalContent;
exports.default = _default;
module.exports = exports.default;