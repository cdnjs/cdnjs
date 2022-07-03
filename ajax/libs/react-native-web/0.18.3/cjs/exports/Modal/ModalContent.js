"use strict";

exports.__esModule = true;
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _View = _interopRequireDefault(require("../View"));

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _ExecutionEnvironment = _interopRequireDefault(require("fbjs/lib/ExecutionEnvironment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var canUseDOM = _ExecutionEnvironment.default.canUseDOM;
var ModalContent = /*#__PURE__*/React.forwardRef(function (props, forwardedRef) {
  var active = props.active,
      children = props.children,
      onRequestClose = props.onRequestClose,
      transparent = props.transparent,
      rest = _objectWithoutPropertiesLoose(props, ["active", "children", "onRequestClose", "transparent"]);

  React.useEffect(function () {
    if (canUseDOM) {
      var closeOnEscape = function closeOnEscape(e) {
        if (active && e.key === 'Escape') {
          e.stopPropagation();

          if (onRequestClose) {
            onRequestClose();
          }
        }
      };

      document.addEventListener('keyup', closeOnEscape, false);
      return function () {
        return document.removeEventListener('keyup', closeOnEscape, false);
      };
    }
  }, [active, onRequestClose]);
  var style = React.useMemo(function () {
    return [styles.modal, transparent ? styles.modalTransparent : styles.modalOpaque];
  }, [transparent]);
  return /*#__PURE__*/React.createElement(_View.default, _extends({}, rest, {
    accessibilityModal: true,
    accessibilityRole: active ? 'dialog' : null,
    ref: forwardedRef,
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