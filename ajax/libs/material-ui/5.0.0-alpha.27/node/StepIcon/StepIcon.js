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

var _clsx = _interopRequireDefault(require("clsx"));

var _CheckCircle = _interopRequireDefault(require("../internal/svg-icons/CheckCircle"));

var _Warning = _interopRequireDefault(require("../internal/svg-icons/Warning"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _SvgIcon = _interopRequireDefault(require("../SvgIcon"));

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'block',
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.shortest
    }),
    color: theme.palette.text.disabled,
    '&$completed': {
      color: theme.palette.primary.main
    },
    '&$active': {
      color: theme.palette.primary.main
    },
    '&$error': {
      color: theme.palette.error.main
    }
  },

  /* Styles applied to the SVG text element. */
  text: {
    fill: theme.palette.primary.contrastText,
    fontSize: theme.typography.caption.fontSize,
    fontFamily: theme.typography.fontFamily
  },

  /* Pseudo-class applied to the root element if `active={true}`. */
  active: {},

  /* Pseudo-class applied to the root element if `completed={true}`. */
  completed: {},

  /* Pseudo-class applied to the root element if `error={true}`. */
  error: {}
});

exports.styles = styles;

var _ref = /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "12"
});

const StepIcon = /*#__PURE__*/React.forwardRef(function StepIcon(props, ref) {
  const {
    active = false,
    classes,
    className: classNameProp,
    completed = false,
    error = false,
    icon
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["active", "classes", "className", "completed", "error", "icon"]);

  if (typeof icon === 'number' || typeof icon === 'string') {
    const className = (0, _clsx.default)(classNameProp, classes.root, active && classes.active, error && classes.error, completed && classes.completed);

    if (error) {
      return /*#__PURE__*/React.createElement(_Warning.default, {
        className: className,
        ref: ref
      });
    }

    if (completed) {
      return /*#__PURE__*/React.createElement(_CheckCircle.default, {
        className: className,
        ref: ref
      });
    }

    return /*#__PURE__*/React.createElement(_SvgIcon.default, (0, _extends2.default)({
      className: className,
      ref: ref
    }, other), _ref, /*#__PURE__*/React.createElement("text", {
      className: classes.text,
      x: "12",
      y: "16",
      textAnchor: "middle"
    }, icon));
  }

  return icon;
});
process.env.NODE_ENV !== "production" ? StepIcon.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Whether this step is active.
   * @default false
   */
  active: _propTypes.default.bool,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: _propTypes.default.bool,

  /**
   * If `true`, the step is marked as failed.
   * @default false
   */
  error: _propTypes.default.bool,

  /**
   * The label displayed in the step icon.
   */
  icon: _propTypes.default.node
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiStepIcon'
})(StepIcon);

exports.default = _default;