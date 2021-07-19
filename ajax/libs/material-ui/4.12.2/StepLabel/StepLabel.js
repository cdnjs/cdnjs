"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _Typography = _interopRequireDefault(require("../Typography"));

var _StepIcon = _interopRequireDefault(require("../StepIcon"));

var styles = function styles(theme) {
  return {
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
    vertical: {},

    /* Styles applied to the `Typography` component which wraps `children`. */
    label: {
      color: theme.palette.text.secondary,
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
      // Fix IE 11 issue
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
      width: '100%'
    }
  };
};

exports.styles = styles;
var StepLabel = /*#__PURE__*/React.forwardRef(function StepLabel(props, ref) {
  var _props$active = props.active,
      active = _props$active === void 0 ? false : _props$active,
      _props$alternativeLab = props.alternativeLabel,
      alternativeLabel = _props$alternativeLab === void 0 ? false : _props$alternativeLab,
      children = props.children,
      classes = props.classes,
      className = props.className,
      _props$completed = props.completed,
      completed = _props$completed === void 0 ? false : _props$completed,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$error = props.error,
      error = _props$error === void 0 ? false : _props$error,
      expanded = props.expanded,
      icon = props.icon,
      last = props.last,
      optional = props.optional,
      _props$orientation = props.orientation,
      orientation = _props$orientation === void 0 ? 'horizontal' : _props$orientation,
      StepIconComponentProp = props.StepIconComponent,
      StepIconProps = props.StepIconProps,
      other = (0, _objectWithoutProperties2.default)(props, ["active", "alternativeLabel", "children", "classes", "className", "completed", "disabled", "error", "expanded", "icon", "last", "optional", "orientation", "StepIconComponent", "StepIconProps"]);
  var StepIconComponent = StepIconComponentProp;

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
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * Mark the step as disabled, will also disable the button if
   * `StepLabelButton` is a child of `StepLabel`. Is passed to child components.
   */
  disabled: _propTypes.default.bool,

  /**
   * Mark the step as failed.
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