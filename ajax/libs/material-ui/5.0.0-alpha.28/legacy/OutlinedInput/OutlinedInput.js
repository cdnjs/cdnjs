import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { deepmerge, refType } from '@material-ui/utils';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import NotchedOutline from './NotchedOutline';
import experimentalStyled, { shouldForwardProp as _shouldForwardProp } from '../styles/experimentalStyled';
import outlinedInputClasses, { getOutlinedInputUtilityClass } from './outlinedInputClasses';
import InputBase, { overridesResolver as inputBaseOverridesResolver, InputBaseRoot, InputBaseComponent as InputBaseInput } from '../InputBase/InputBase';
import useThemeProps from '../styles/useThemeProps';
import { jsx as _jsx } from "react/jsx-runtime";

var overridesResolver = function overridesResolver(props, styles) {
  return deepmerge(inputBaseOverridesResolver(props, styles), _extends({}, styles.notchedOutline));
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes;
  var slots = {
    root: ['root'],
    notchedOutline: ['notchedOutline'],
    input: ['input']
  };
  var composedClasses = composeClasses(slots, getOutlinedInputUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};

var OutlinedInputRoot = experimentalStyled(InputBaseRoot, {
  shouldForwardProp: function shouldForwardProp(prop) {
    return _shouldForwardProp(prop) || prop === 'classes';
  }
}, {
  name: 'MuiOutlinedInput',
  slot: 'Root',
  overridesResolver: overridesResolver
})(function (_ref) {
  var _extends2;

  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  var borderColor = theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
  return _extends((_extends2 = {
    position: 'relative',
    borderRadius: theme.shape.borderRadius
  }, _defineProperty(_extends2, "&:hover .".concat(outlinedInputClasses.notchedOutline), {
    borderColor: theme.palette.text.primary
  }), _defineProperty(_extends2, '@media (hover: none)', _defineProperty({}, "&:hover .".concat(outlinedInputClasses.notchedOutline), {
    borderColor: borderColor
  })), _defineProperty(_extends2, "&.Mui-focused .".concat(outlinedInputClasses.notchedOutline), {
    borderColor: theme.palette[styleProps.color].main,
    borderWidth: 2
  }), _defineProperty(_extends2, "&.Mui-error .".concat(outlinedInputClasses.notchedOutline), {
    borderColor: theme.palette.error.main
  }), _defineProperty(_extends2, "&.Mui-disabled .".concat(outlinedInputClasses.notchedOutline), {
    borderColor: theme.palette.action.disabled
  }), _extends2), styleProps.startAdornment && {
    paddingLeft: 14
  }, styleProps.endAdornment && {
    paddingRight: 14
  }, styleProps.multiline && _extends({
    padding: '16.5px 14px'
  }, styleProps.size === 'small' && {
    padding: '8.5px 14px'
  }));
});
var NotchedOutlineRoot = experimentalStyled(NotchedOutline, {}, {
  name: 'MuiOutlinedInput',
  slot: 'NotchedOutline'
})(function (_ref2) {
  var theme = _ref2.theme;
  return {
    borderColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'
  };
});
var OutlinedInputInput = experimentalStyled(InputBaseInput, {
  shouldForwardProp: function shouldForwardProp(prop) {
    return _shouldForwardProp(prop) || prop === 'classes';
  }
}, {
  name: 'MuiOutlinedInput',
  slot: 'Input'
})(function (_ref3) {
  var theme = _ref3.theme,
      styleProps = _ref3.styleProps;
  return _extends({
    padding: '16.5px 14px',
    '&:-webkit-autofill': {
      WebkitBoxShadow: theme.palette.mode === 'light' ? null : '0 0 0 100px #266798 inset',
      WebkitTextFillColor: theme.palette.mode === 'light' ? null : '#fff',
      caretColor: theme.palette.mode === 'light' ? null : '#fff',
      borderRadius: 'inherit'
    }
  }, styleProps.size === 'small' && {
    padding: '8.5px 14px'
  }, styleProps.multiline && {
    padding: 0
  }, styleProps.startAdornment && {
    paddingLeft: 0
  }, styleProps.endAdornment && {
    paddingRight: 0
  });
});
var OutlinedInput = /*#__PURE__*/React.forwardRef(function OutlinedInput(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiOutlinedInput'
  });

  var _props$fullWidth = props.fullWidth,
      fullWidth = _props$fullWidth === void 0 ? false : _props$fullWidth,
      _props$inputComponent = props.inputComponent,
      inputComponent = _props$inputComponent === void 0 ? 'input' : _props$inputComponent,
      label = props.label,
      _props$labelWidth = props.labelWidth,
      labelWidth = _props$labelWidth === void 0 ? 0 : _props$labelWidth,
      _props$multiline = props.multiline,
      multiline = _props$multiline === void 0 ? false : _props$multiline,
      notched = props.notched,
      _props$type = props.type,
      type = _props$type === void 0 ? 'text' : _props$type,
      other = _objectWithoutProperties(props, ["fullWidth", "inputComponent", "label", "labelWidth", "multiline", "notched", "type"]);

  var classes = useUtilityClasses(props);
  return /*#__PURE__*/_jsx(InputBase, _extends({
    components: {
      Root: OutlinedInputRoot,
      Input: OutlinedInputInput
    },
    renderSuffix: function renderSuffix(state) {
      return /*#__PURE__*/_jsx(NotchedOutlineRoot, {
        className: classes.notchedOutline,
        label: label,
        labelWidth: labelWidth,
        notched: typeof notched !== 'undefined' ? notched : Boolean(state.startAdornment || state.filled || state.focused)
      });
    },
    fullWidth: fullWidth,
    inputComponent: inputComponent,
    multiline: multiline,
    ref: ref,
    type: type
  }, other, {
    classes: _extends({}, classes, {
      notchedOutline: null
    })
  }));
});
process.env.NODE_ENV !== "production" ? OutlinedInput.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * This prop helps users to fill forms faster, especially on mobile devices.
   * The name can be confusing, as it's more like an autofill.
   * You can learn more about it [following the specification](https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill).
   */
  autoComplete: PropTypes.string,

  /**
   * If `true`, the `input` element is focused during the first mount.
   */
  autoFocus: PropTypes.bool,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * The prop defaults to the value (`'primary'`) inherited from the parent FormControl component.
   */
  color: PropTypes.oneOf(['primary', 'secondary']),

  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue: PropTypes.any,

  /**
   * If `true`, the component is disabled.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  disabled: PropTypes.bool,

  /**
   * End `InputAdornment` for this component.
   */
  endAdornment: PropTypes.node,

  /**
   * If `true`, the `input` will indicate an error.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  error: PropTypes.bool,

  /**
   * If `true`, the `input` will take up the full width of its container.
   * @default false
   */
  fullWidth: PropTypes.bool,

  /**
   * The id of the `input` element.
   */
  id: PropTypes.string,

  /**
   * The component used for the `input` element.
   * Either a string to use a HTML element or a component.
   * @default 'input'
   */
  inputComponent: PropTypes.elementType,

  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   * @default {}
   */
  inputProps: PropTypes.object,

  /**
   * Pass a ref to the `input` element.
   */
  inputRef: refType,

  /**
   * The label of the `input`. It is only used for layout. The actual labelling
   * is handled by `InputLabel`. If specified `labelWidth` is ignored.
   */
  label: PropTypes.node,

  /**
   * The width of the label. Is ignored if `label` is provided. Prefer `label`
   * if the `input` label appears with a strike through.
   * @default 0
   */
  labelWidth: PropTypes.number,

  /**
   * If `dense`, will adjust vertical spacing. This is normally obtained via context from
   * FormControl.
   * The prop defaults to the value (`'none'`) inherited from the parent FormControl component.
   */
  margin: PropTypes.oneOf(['dense', 'none']),

  /**
   * Maximum number of rows to display when multiline option is set to true.
   */
  maxRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Minimum number of rows to display when multiline option is set to true.
   */
  minRows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * If `true`, a `textarea` element is rendered.
   * @default false
   */
  multiline: PropTypes.bool,

  /**
   * Name attribute of the `input` element.
   */
  name: PropTypes.string,

  /**
   * If `true`, the outline is notched to accommodate the label.
   */
  notched: PropTypes.bool,

  /**
   * Callback fired when the value is changed.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (string).
   */
  onChange: PropTypes.func,

  /**
   * The short hint displayed in the `input` before the user enters a value.
   */
  placeholder: PropTypes.string,

  /**
   * It prevents the user from changing the value of the field
   * (not from interacting with the field).
   */
  readOnly: PropTypes.bool,

  /**
   * If `true`, the `input` element is required.
   * The prop defaults to the value (`false`) inherited from the parent FormControl component.
   */
  required: PropTypes.bool,

  /**
   * Number of rows to display when multiline option is set to true.
   */
  rows: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

  /**
   * Start `InputAdornment` for this component.
   */
  startAdornment: PropTypes.node,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * Type of the `input` element. It should be [a valid HTML5 input type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types).
   * @default 'text'
   */
  type: PropTypes.string,

  /**
   * The value of the `input` element, required for a controlled component.
   */
  value: PropTypes.any
} : void 0;
OutlinedInput.muiName = 'Input';
export default OutlinedInput;