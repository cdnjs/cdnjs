"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _unstyled = require("@material-ui/unstyled");

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _formGroupClasses = require("./formGroupClasses");

var _jsxRuntime = require("react/jsx-runtime");

const useUtilityClasses = styleProps => {
  const {
    classes,
    row
  } = styleProps;
  const slots = {
    root: ['root', row && 'row']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _formGroupClasses.getFormGroupUtilityClass, classes);
};

const FormGroupRoot = (0, _styled.default)('div', {
  name: 'MuiFormGroup',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return (0, _extends2.default)({}, styles.root, styleProps.row && styles.row);
  }
})(({
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the root element. */
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'wrap'
}, styleProps.row && {
  flexDirection: 'row'
}));
/**
 * `FormGroup` wraps controls such as `Checkbox` and `Switch`.
 * It provides compact row layout.
 * For the `Radio`, you should be using the `RadioGroup` component instead of this one.
 */

const FormGroup = /*#__PURE__*/React.forwardRef(function FormGroup(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiFormGroup'
  });
  const {
    className,
    row = false
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "row"]);
  const styleProps = (0, _extends2.default)({}, props, {
    row
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(FormGroupRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? FormGroup.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the component.
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
   * Display group of elements in a compact row.
   * @default false
   */
  row: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = FormGroup;
exports.default = _default;