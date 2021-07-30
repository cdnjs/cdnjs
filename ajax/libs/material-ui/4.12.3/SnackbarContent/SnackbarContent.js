"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _colorManipulator = require("../styles/colorManipulator");

var styles = function styles(theme) {
  var emphasis = theme.palette.type === 'light' ? 0.8 : 0.98;
  var backgroundColor = (0, _colorManipulator.emphasize)(theme.palette.background.default, emphasis);
  return {
    /* Styles applied to the root element. */
    root: (0, _extends3.default)({}, theme.typography.body2, (0, _defineProperty2.default)({
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor: backgroundColor,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '6px 16px',
      borderRadius: theme.shape.borderRadius,
      flexGrow: 1
    }, theme.breakpoints.up('sm'), {
      flexGrow: 'initial',
      minWidth: 288
    })),

    /* Styles applied to the message wrapper element. */
    message: {
      padding: '8px 0'
    },

    /* Styles applied to the action wrapper element if `action` is provided. */
    action: {
      display: 'flex',
      alignItems: 'center',
      marginLeft: 'auto',
      paddingLeft: 16,
      marginRight: -8
    }
  };
};

exports.styles = styles;
var SnackbarContent = /*#__PURE__*/React.forwardRef(function SnackbarContent(props, ref) {
  var action = props.action,
      classes = props.classes,
      className = props.className,
      message = props.message,
      _props$role = props.role,
      role = _props$role === void 0 ? 'alert' : _props$role,
      other = (0, _objectWithoutProperties2.default)(props, ["action", "classes", "className", "message", "role"]);
  return /*#__PURE__*/React.createElement(_Paper.default, (0, _extends3.default)({
    role: role,
    square: true,
    elevation: 6,
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other), /*#__PURE__*/React.createElement("div", {
    className: classes.message
  }, message), action ? /*#__PURE__*/React.createElement("div", {
    className: classes.action
  }, action) : null);
});
process.env.NODE_ENV !== "production" ? SnackbarContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The action to display. It renders after the message, at the end of the snackbar.
   */
  action: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The message to display.
   */
  message: _propTypes.default.node,

  /**
   * The ARIA role attribute of the element.
   */
  role: _propTypes.default.string
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiSnackbarContent'
})(SnackbarContent);

exports.default = _default;