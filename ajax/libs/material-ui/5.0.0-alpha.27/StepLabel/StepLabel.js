import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
import StepIcon from '../StepIcon';
import StepperContext from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';
export const styles = theme => ({
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
        other = _objectWithoutPropertiesLoose(props, ["children", "classes", "className", "error", "icon", "optional", "StepIconComponent", "StepIconProps"]);

  const {
    alternativeLabel,
    orientation
  } = React.useContext(StepperContext);
  const {
    active,
    disabled,
    completed,
    icon: iconContext
  } = React.useContext(StepContext);
  const icon = iconProp || iconContext;
  let StepIconComponent = StepIconComponentProp;

  if (icon && !StepIconComponent) {
    StepIconComponent = StepIcon;
  }

  return /*#__PURE__*/React.createElement("span", _extends({
    className: clsx(classes.root, classes[orientation], className, disabled && classes.disabled, alternativeLabel && classes.alternativeLabel, error && classes.error),
    ref: ref
  }, other), icon || StepIconComponent ? /*#__PURE__*/React.createElement("span", {
    className: clsx(classes.iconContainer, alternativeLabel && classes.alternativeLabel)
  }, /*#__PURE__*/React.createElement(StepIconComponent, _extends({
    completed: completed,
    active: active,
    error: error,
    icon: icon
  }, StepIconProps))) : null, /*#__PURE__*/React.createElement("span", {
    className: classes.labelContainer
  }, children ? /*#__PURE__*/React.createElement(Typography, {
    variant: "body2",
    component: "span",
    display: "block",
    className: clsx(classes.label, alternativeLabel && classes.alternativeLabel, completed && classes.completed, active && classes.active, error && classes.error)
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
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * If `true`, the step is marked as failed.
   * @default false
   */
  error: PropTypes.bool,

  /**
   * Override the default label of the step icon.
   */
  icon: PropTypes.node,

  /**
   * The optional node to display.
   */
  optional: PropTypes.node,

  /**
   * The component to render in place of the [`StepIcon`](/api/step-icon/).
   */
  StepIconComponent: PropTypes.elementType,

  /**
   * Props applied to the [`StepIcon`](/api/step-icon/) element.
   */
  StepIconProps: PropTypes.object
} : void 0;
StepLabel.muiName = 'StepLabel';
export default withStyles(styles, {
  name: 'MuiStepLabel'
})(StepLabel);