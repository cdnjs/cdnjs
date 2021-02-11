"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

const styles = {
  /* Styles applied to the root element. */
  root: {
    zIndex: -1,
    position: 'fixed',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    WebkitTapHighlightColor: 'transparent'
  },

  /* Styles applied to the root element if `invisible={true}`. */
  invisible: {
    backgroundColor: 'transparent'
  }
};
/**
 * @ignore - internal component.
 */

exports.styles = styles;
const SimpleBackdrop = /*#__PURE__*/React.forwardRef(function SimpleBackdrop(props, ref) {
  const {
    invisible = false,
    open
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["invisible", "open"]);
  return open ? /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    "aria-hidden": true,
    ref: ref
  }, other, {
    style: (0, _extends2.default)({}, styles.root, invisible ? styles.invisible : {}, other.style)
  })) : null;
});
process.env.NODE_ENV !== "production" ? SimpleBackdrop.propTypes = {
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   */
  invisible: _propTypes.default.bool,

  /**
   * If `true`, the component is shown.
   */
  open: _propTypes.default.bool.isRequired
} : void 0;
var _default = SimpleBackdrop;
exports.default = _default;