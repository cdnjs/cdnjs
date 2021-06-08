"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _Typography = _interopRequireDefault(require("../Typography"));

var styles = {
  /* Styles applied to the root element. */
  root: {
    marginBottom: 12
  }
};
exports.styles = styles;
var DialogContentText = /*#__PURE__*/React.forwardRef(function DialogContentText(props, ref) {
  return /*#__PURE__*/React.createElement(_Typography.default, (0, _extends2.default)({
    component: "p",
    variant: "body1",
    color: "textSecondary",
    ref: ref
  }, props));
});
process.env.NODE_ENV !== "production" ? DialogContentText.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiDialogContentText'
})(DialogContentText);

exports.default = _default;