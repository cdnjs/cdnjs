import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { refType, deepmerge } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { useFormControl } from '../FormControl';
import Typography from '../Typography';
import capitalize from '../utils/capitalize';
import experimentalStyled from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import formControlLabelClasses, { getFormControlLabelUtilityClasses } from './formControlLabelClasses';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";

var overridesResolver = function overridesResolver(props, styles) {
  var styleProps = props.styleProps;
  return deepmerge(_extends({}, styles["labelPlacement".concat(capitalize(styleProps.labelPlacement))], _defineProperty({}, "& .".concat(formControlLabelClasses.label), styles.label)), styles.root || {});
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      disabled = styleProps.disabled,
      labelPlacement = styleProps.labelPlacement;
  var slots = {
    root: ['root', disabled && 'disabled', "labelPlacement".concat(capitalize(labelPlacement))],
    label: ['label', disabled && 'disabled']
  };
  return composeClasses(slots, getFormControlLabelUtilityClasses, classes);
};

export var FormControlLabelRoot = experimentalStyled('label', {}, {
  name: 'MuiFormControlLabel',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    // For correct alignment with the text.
    verticalAlign: 'middle',
    WebkitTapHighlightColor: 'transparent',
    marginLeft: -11,
    marginRight: 16,
    // used for row presentation of radio/checkbox
    '&.Mui-disabled': {
      cursor: 'default'
    }
  }, styleProps.labelPlacement === 'start' && {
    flexDirection: 'row-reverse',
    marginLeft: 16,
    // used for row presentation of radio/checkbox
    marginRight: -11
  }, styleProps.labelPlacement === 'top' && {
    flexDirection: 'column-reverse',
    marginLeft: 16
  }, styleProps.labelPlacement === 'bottom' && {
    flexDirection: 'column',
    marginLeft: 16
  }, _defineProperty({}, "& .".concat(formControlLabelClasses.label), {
    '&.Mui-disabled': {
      color: theme.palette.text.disabled
    }
  }));
});
/**
 * Drop-in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */

var FormControlLabel = /*#__PURE__*/React.forwardRef(function FormControlLabel(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiFormControlLabel'
  });

  var checked = props.checked,
      className = props.className,
      control = props.control,
      disabledProp = props.disabled,
      inputRef = props.inputRef,
      label = props.label,
      _props$labelPlacement = props.labelPlacement,
      labelPlacement = _props$labelPlacement === void 0 ? 'end' : _props$labelPlacement,
      name = props.name,
      onChange = props.onChange,
      value = props.value,
      other = _objectWithoutProperties(props, ["checked", "className", "control", "disabled", "inputRef", "label", "labelPlacement", "name", "onChange", "value"]);

  var muiFormControl = useFormControl();
  var disabled = disabledProp;

  if (typeof disabled === 'undefined' && typeof control.props.disabled !== 'undefined') {
    disabled = control.props.disabled;
  }

  if (typeof disabled === 'undefined' && muiFormControl) {
    disabled = muiFormControl.disabled;
  }

  var controlProps = {
    disabled: disabled
  };
  ['checked', 'name', 'onChange', 'value', 'inputRef'].forEach(function (key) {
    if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
      controlProps[key] = props[key];
    }
  });

  var styleProps = _extends({}, props, {
    disabled: disabled,
    label: label,
    labelPlacement: labelPlacement
  });

  var classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/_jsxs(FormControlLabelRoot, _extends({
    className: clsx(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other, {
    children: [/*#__PURE__*/React.cloneElement(control, controlProps), /*#__PURE__*/_jsx(Typography, {
      component: "span",
      className: classes.label,
      children: label
    })]
  }));
});
process.env.NODE_ENV !== "production" ? FormControlLabel.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the component appears selected.
   */
  checked: PropTypes.bool,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * A control element. For instance, it can be a `Radio`, a `Switch` or a `Checkbox`.
   */
  control: PropTypes.element.isRequired,

  /**
   * If `true`, the control is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,

  /**
   * The text to be used in an enclosing label element.
   */
  label: PropTypes.node,

  /**
   * The position of the label.
   * @default 'end'
   */
  labelPlacement: PropTypes.oneOf(['bottom', 'end', 'start', 'top']),

  /**
   * @ignore
   */
  name: PropTypes.string,

  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The value of the component.
   */
  value: PropTypes.any
} : void 0;
export default FormControlLabel;