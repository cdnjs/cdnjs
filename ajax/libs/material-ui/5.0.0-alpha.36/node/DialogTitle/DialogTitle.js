"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _unstyled = require("@material-ui/unstyled");

var _Typography = _interopRequireDefault(require("../Typography"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _dialogTitleClasses = require("./dialogTitleClasses");

var _jsxRuntime = require("react/jsx-runtime");

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    root: ['root']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _dialogTitleClasses.getDialogTitleUtilityClass, classes);
};

const DialogTitleRoot = (0, _styled.default)(_Typography.default, {
  name: 'MuiDialogTitle',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({
  padding: '16px 24px',
  flex: '0 0 auto'
});
const DialogTitle = /*#__PURE__*/React.forwardRef(function DialogTitle(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiDialogTitle'
  });
  const {
    className
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["className"]);
  const styleProps = props;
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DialogTitleRoot, (0, _extends2.default)({
    component: "h2",
    className: (0, _clsx.default)(classes.root, className),
    styleProps: styleProps,
    ref: ref,
    variant: "h6"
  }, other));
});
process.env.NODE_ENV !== "production" ? DialogTitle.propTypes
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = DialogTitle;
exports.default = _default;