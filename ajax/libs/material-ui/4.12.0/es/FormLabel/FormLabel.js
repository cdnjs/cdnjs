import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import capitalize from '../utils/capitalize';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: _extends({
    color: theme.palette.text.secondary
  }, theme.typography.body1, {
    lineHeight: 1,
    padding: 0,
    '&$focused': {
      color: theme.palette.primary.main
    },
    '&$disabled': {
      color: theme.palette.text.disabled
    },
    '&$error': {
      color: theme.palette.error.main
    }
  }),

  /* Styles applied to the root element if the color is secondary. */
  colorSecondary: {
    '&$focused': {
      color: theme.palette.secondary.main
    }
  },

  /* Pseudo-class applied to the root element if `focused={true}`. */
  focused: {},

  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},

  /* Pseudo-class applied to the root element if `error={true}`. */
  error: {},

  /* Pseudo-class applied to the root element if `filled={true}`. */
  filled: {},

  /* Pseudo-class applied to the root element if `required={true}`. */
  required: {},

  /* Styles applied to the asterisk element. */
  asterisk: {
    '&$error': {
      color: theme.palette.error.main
    }
  }
});
const FormLabel = /*#__PURE__*/React.forwardRef(function FormLabel(props, ref) {
  const {
    children,
    classes,
    className,
    component: Component = 'label'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "classes", "className", "color", "component", "disabled", "error", "filled", "focused", "required"]);

  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['color', 'required', 'focused', 'disabled', 'error', 'filled']
  });
  return /*#__PURE__*/React.createElement(Component, _extends({
    className: clsx(classes.root, classes[`color${capitalize(fcs.color || 'primary')}`], className, fcs.disabled && classes.disabled, fcs.error && classes.error, fcs.filled && classes.filled, fcs.focused && classes.focused, fcs.required && classes.required),
    ref: ref
  }, other), children, fcs.required && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    className: clsx(classes.asterisk, fcs.error && classes.error)
  }, "\u2009", '*'));
});
process.env.NODE_ENV !== "production" ? FormLabel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['primary', 'secondary']),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes
  /* @typescript-to-proptypes-ignore */
  .elementType,

  /**
   * If `true`, the label should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the label should be displayed in an error state.
   */
  error: PropTypes.bool,

  /**
   * If `true`, the label should use filled classes key.
   */
  filled: PropTypes.bool,

  /**
   * If `true`, the input of this label is focused (used by `FormGroup` components).
   */
  focused: PropTypes.bool,

  /**
   * If `true`, the label will indicate that the input is required.
   */
  required: PropTypes.bool
} : void 0;
export default withStyles(styles, {
  name: 'MuiFormLabel'
})(FormLabel);