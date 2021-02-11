import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircle from '../internal/svg-icons/CheckCircle';
import Warning from '../internal/svg-icons/Warning';
import withStyles from '../styles/withStyles';
import SvgIcon from '../SvgIcon';
export const styles = theme => ({
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
        other = _objectWithoutPropertiesLoose(props, ["active", "classes", "className", "completed", "error", "icon"]);

  if (typeof icon === 'number' || typeof icon === 'string') {
    const className = clsx(classNameProp, classes.root, active && classes.active, error && classes.error, completed && classes.completed);

    if (error) {
      return /*#__PURE__*/React.createElement(Warning, {
        className: className,
        ref: ref
      });
    }

    if (completed) {
      return /*#__PURE__*/React.createElement(CheckCircle, {
        className: className,
        ref: ref
      });
    }

    return /*#__PURE__*/React.createElement(SvgIcon, _extends({
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
  active: PropTypes.bool,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,

  /**
   * If `true`, the step is marked as failed.
   * @default false
   */
  error: PropTypes.bool,

  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node
} : void 0;
export default withStyles(styles, {
  name: 'MuiStepIcon'
})(StepIcon);