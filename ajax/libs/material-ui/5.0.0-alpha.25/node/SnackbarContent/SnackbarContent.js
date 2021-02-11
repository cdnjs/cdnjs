"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _colorManipulator = require("../styles/colorManipulator");

const styles = theme => {
  const emphasis = theme.palette.mode === 'light' ? 0.8 : 0.98;
  const backgroundColor = (0, _colorManipulator.emphasize)(theme.palette.background.default, emphasis);
  return {
    /* Styles applied to the root element. */
    root: (0, _extends2.default)({}, theme.typography.body2, {
      color: theme.palette.getContrastText(backgroundColor),
      backgroundColor,
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'wrap',
      padding: '6px 16px',
      borderRadius: theme.shape.borderRadius,
      flexGrow: 1,
      [theme.breakpoints.up('sm')]: {
        flexGrow: 'initial',
        minWidth: 288
      }
    }),

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
const SnackbarContent = /*#__PURE__*/React.forwardRef(function SnackbarContent(props, ref) {
  const {
    action,
    classes,
    className,
    message,
    role = 'alert'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["action", "classes", "className", "message", "role"]);
  return /*#__PURE__*/React.createElement(_Paper.default, (0, _extends2.default)({
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
   * @default 'alert'
   */
  role: _propTypes.default.string
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiSnackbarContent'
})(SnackbarContent);

exports.default = _default;