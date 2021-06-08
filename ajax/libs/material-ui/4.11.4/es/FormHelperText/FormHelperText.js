import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import formControlState from '../FormControl/formControlState';
import useFormControl from '../FormControl/useFormControl';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: _extends({
    color: theme.palette.text.secondary
  }, theme.typography.caption, {
    textAlign: 'left',
    marginTop: 3,
    margin: 0,
    '&$disabled': {
      color: theme.palette.text.disabled
    },
    '&$error': {
      color: theme.palette.error.main
    }
  }),

  /* Pseudo-class applied to the root element if `error={true}`. */
  error: {},

  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},

  /* Styles applied to the root element if `margin="dense"`. */
  marginDense: {
    marginTop: 4
  },

  /* Styles applied to the root element if `variant="filled"` or `variant="outlined"`. */
  contained: {
    marginLeft: 14,
    marginRight: 14
  },

  /* Pseudo-class applied to the root element if `focused={true}`. */
  focused: {},

  /* Pseudo-class applied to the root element if `filled={true}`. */
  filled: {},

  /* Pseudo-class applied to the root element if `required={true}`. */
  required: {}
});
const FormHelperText = /*#__PURE__*/React.forwardRef(function FormHelperText(props, ref) {
  const {
    children,
    classes,
    className,
    component: Component = 'p'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "classes", "className", "component", "disabled", "error", "filled", "focused", "margin", "required", "variant"]);

  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ['variant', 'margin', 'disabled', 'error', 'filled', 'focused', 'required']
  });
  return /*#__PURE__*/React.createElement(Component, _extends({
    className: clsx(classes.root, (fcs.variant === 'filled' || fcs.variant === 'outlined') && classes.contained, className, fcs.disabled && classes.disabled, fcs.error && classes.error, fcs.filled && classes.filled, fcs.focused && classes.focused, fcs.required && classes.required, fcs.margin === 'dense' && classes.marginDense),
    ref: ref
  }, other), children === ' ' ?
  /*#__PURE__*/
  // eslint-disable-next-line react/no-danger
  React.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: '&#8203;'
    }
  }) : children);
});
process.env.NODE_ENV !== "production" ? FormHelperText.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
   *
   * If `' '` is provided, the component reserves one line height for displaying a future message.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes
  /* @typescript-to-proptypes-ignore */
  .elementType,

  /**
   * If `true`, the helper text should be displayed in a disabled state.
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, helper text should be displayed in an error state.
   */
  error: PropTypes.bool,

  /**
   * If `true`, the helper text should use filled classes key.
   */
  filled: PropTypes.bool,

  /**
   * If `true`, the helper text should use focused classes key.
   */
  focused: PropTypes.bool,

  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   */
  margin: PropTypes.oneOf(['dense']),

  /**
   * If `true`, the helper text should use required classes key.
   */
  required: PropTypes.bool,

  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard'])
} : void 0;
export default withStyles(styles, {
  name: 'MuiFormHelperText'
})(FormHelperText);