import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { deepmerge, refType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import SwitchBase from '../internal/SwitchBase';
import useThemeProps from '../styles/useThemeProps';
import RadioButtonIcon from './RadioButtonIcon';
import { alpha } from '../styles/colorManipulator';
import capitalize from '../utils/capitalize';
import createChainedFunction from '../utils/createChainedFunction';
import useRadioGroup from '../RadioGroup/useRadioGroup';
import { getRadioUtilityClass } from './radioClasses';
import experimentalStyled, { shouldForwardProp as _shouldForwardProp } from '../styles/experimentalStyled';
import { jsx as _jsx } from "react/jsx-runtime";

var overridesResolver = function overridesResolver(props, styles) {
  var styleProps = props.styleProps;
  return deepmerge(styles.root || {}, styles["color".concat(capitalize(styleProps.color))]);
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes,
      color = styleProps.color;
  var slots = {
    root: ['root', "color".concat(capitalize(color))]
  };
  return _extends({}, classes, composeClasses(slots, getRadioUtilityClass, classes));
};

var RadioRoot = experimentalStyled(SwitchBase, {
  shouldForwardProp: function shouldForwardProp(prop) {
    return _shouldForwardProp(prop) || prop === 'classes';
  }
}, {
  name: 'MuiRadio',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({
    /* Styles applied to the root element. */
    color: theme.palette.text.secondary
  }, styleProps.color !== 'default' && {
    '&.Mui-checked': {
      color: theme.palette[styleProps.color].main,
      '&:hover': {
        backgroundColor: alpha(theme.palette[styleProps.color].main, theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      }
    }
  }, {
    '&.Mui-disabled': {
      color: theme.palette.action.disabled
    }
  });
});

var defaultCheckedIcon = /*#__PURE__*/_jsx(RadioButtonIcon, {
  checked: true
});

var defaultIcon = /*#__PURE__*/_jsx(RadioButtonIcon, {});

var Radio = /*#__PURE__*/React.forwardRef(function Radio(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiRadio'
  });

  var checkedProp = props.checked,
      _props$color = props.color,
      color = _props$color === void 0 ? 'secondary' : _props$color,
      nameProp = props.name,
      onChangeProp = props.onChange,
      _props$size = props.size,
      size = _props$size === void 0 ? 'medium' : _props$size,
      other = _objectWithoutProperties(props, ["checked", "color", "name", "onChange", "size"]);

  var styleProps = _extends({}, props, {
    color: color,
    size: size
  });

  var classes = useUtilityClasses(styleProps);
  var radioGroup = useRadioGroup();
  var checked = checkedProp;
  var onChange = createChainedFunction(onChangeProp, radioGroup && radioGroup.onChange);
  var name = nameProp;

  if (radioGroup) {
    if (typeof checked === 'undefined') {
      checked = radioGroup.value === props.value;
    }

    if (typeof name === 'undefined') {
      name = radioGroup.name;
    }
  }

  return /*#__PURE__*/_jsx(RadioRoot, _extends({
    color: color,
    type: "radio",
    icon: /*#__PURE__*/React.cloneElement(defaultIcon, {
      fontSize: size === 'small' ? 'small' : 'medium'
    }),
    checkedIcon: /*#__PURE__*/React.cloneElement(defaultCheckedIcon, {
      fontSize: size === 'small' ? 'small' : 'medium'
    }),
    styleProps: styleProps,
    classes: classes,
    name: name,
    checked: checked,
    onChange: onChange,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Radio.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * If `true`, the component is checked.
   */
  checked: PropTypes.bool,

  /**
   * The icon to display when the component is checked.
   */
  checkedIcon: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'secondary'
   */
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),

  /**
   * If `true`, the component is disabled.
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the ripple effect is disabled.
   */
  disableRipple: PropTypes.bool,

  /**
   * The icon to display when the component is unchecked.
   */
  icon: PropTypes.node,

  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,

  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,

  /**
   * Callback fired when the state is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   * You can pull out the new checked state by accessing `event.target.checked` (boolean).
   */
  onChange: PropTypes.func,

  /**
   * If `true`, the `input` element is required.
   */
  required: PropTypes.bool,

  /**
   * The size of the component.
   * `small` is equivalent to the dense radio styling.
   * @default 'medium'
   */
  size: PropTypes.oneOf(['medium', 'small']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The value of the component. The DOM API casts this to a string.
   */
  value: PropTypes.any
} : void 0;
export default Radio;