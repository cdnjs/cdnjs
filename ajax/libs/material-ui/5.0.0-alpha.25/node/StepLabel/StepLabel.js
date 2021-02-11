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

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _Typography = _interopRequireDefault(require("../Typography"));

var _StepIcon = _interopRequireDefault(require("../StepIcon"));

var _StepperContext = _interopRequireDefault(require("../Stepper/StepperContext"));

var _StepContext = _interopRequireDefault(require("../Step/StepContext"));

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    alignItems: 'center',
    '&$alternativeLabel': {
      flexDirection: 'column'
    },
    '&$disabled': {
      cursor: 'default'
    }
  },

  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {},

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    textAlign: 'left',
    padding: '8px 0'
  },

  /* Styles applied to the Typography component that wraps `children`. */
  label: {
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.shortest
    }),
    '&$active': {
      color: theme.palette.text.primary,
      fontWeight: 500
    },
    '&$completed': {
      color: theme.palette.text.primary,
      fontWeight: 500
    },
    '&$alternativeLabel': {
      textAlign: 'center',
      marginTop: 16
    },
    '&$error': {
      color: theme.palette.error.main
    }
  },

  /* Pseudo-class applied to the `Typography` component if `active={true}`. */
  active: {},

  /* Pseudo-class applied to the `Typography` component if `completed={true}`. */
  completed: {},

  /* Pseudo-class applied to the root element and `Typography` component if `error={true}`. */
  error: {},

  /* Pseudo-class applied to the root element and `Typography` component if `disabled={true}`. */
  disabled: {},

  /* Styles applied to the `icon` container element. */
  iconContainer: {
    flexShrink: 0,
    // Fix IE11 issue
    display: 'flex',
    paddingRight: 8,
    '&$alternativeLabel': {
      paddingRight: 0
    }
  },

  /* Pseudo-class applied to the root and icon container and `Typography` if `alternativeLabel={true}`. */
  alternativeLabel: {},

  /* Styles applied to the container element which wraps `Typography` and `optional`. */
  labelContainer: {
    width: '100%',
    color: theme.palette.text.secondary
  }
});

exports.styles = styles;
const StepLabel = /*#__PURE__*/React.forwardRef(function StepLabel(props, ref) {
  const {
    children,
    classes,
    className,
    error = false,
    icon: iconProp,
    optional,
    StepIconComponent: StepIconComponentProp,
    StepIconProps
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "classes", "className", "error", "icon", "optional", "StepIconComponent", "StepIconProps"]);
  const {
    alternativeLabel,
    orientation
  } = React.useContext(_StepperContext.default);
  const {
    active,
    disabled,
    completed,
    icon: iconContext
  } = React.useContext(_StepContext.default);
  const icon = iconProp || iconContext;
  let StepIconComponent = StepIconComponentProp;

  if (icon && !StepIconComponent) {
    StepIconComponent = _StepIcon.default;
  }

  return /*#__PURE__*/React.createElement("span", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, classes[orientation], className, disabled && classes.disabled, alternativeLabel && classes.alternativeLabel, error && classes.error),
    ref: ref
  }, other), icon || StepIconComponent ? /*#__PURE__*/React.createElement("span", {
    className: (0, _clsx.default)(classes.iconContainer, alternativeLabel && classes.alternativeLabel)
  }, /*#__PURE__*/React.createElement(StepIconComponent, (0, _extends2.default)({
    completed: completed,
    active: active,
    error: error,
    icon: icon
  }, StepIconProps))) : null, /*#__PURE__*/React.createElement("span", {
    className: classes.labelContainer
  }, children ? /*#__PURE__*/React.createElement(_Typography.default, {
    variant: "body2",
    component: "span",
    display: "block",
    className: (0, _clsx.default)(classes.label, alternativeLabel && classes.alternativeLabel, completed && classes.completed, active && classes.active, error && classes.error)
  }, children) : null, optional));
});
process.env.NODE_ENV !== "production" ? StepLabel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * In most cases will simply be a string containing a title for the label.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * If `true`, the step is marked as failed.
   * @default false
   */
  error: _propTypes.default.bool,

  /**
   * Override the default label of the step icon.
   */
  icon: _propTypes.default.node,

  /**
   * The optional node to display.
   */
  optional: _propTypes.default.node,

  /**
   * The component to render in place of the [`StepIcon`](/api/step-icon/).
   */
  StepIconComponent: _propTypes.default.elementType,

  /**
   * Props applied to the [`StepIcon`](/api/step-icon/) element.
   */
  StepIconProps: _propTypes.default.object
} : void 0;
StepLabel.muiName = 'StepLabel';

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiStepLabel'
})(StepLabel);

exports.default = _default;