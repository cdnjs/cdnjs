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

var _unstyled = require("@material-ui/unstyled");

var _utils = require("@material-ui/utils");

var _experimentalStyled = _interopRequireWildcard(require("../styles/experimentalStyled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _Typography = _interopRequireDefault(require("../Typography"));

var _dialogContentTextClasses = require("./dialogContentTextClasses");

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = (props, styles) => {
  return (0, _utils.deepmerge)(styles.root || {}, {});
};

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    root: ['root']
  };
  const composedClasses = (0, _unstyled.unstable_composeClasses)(slots, _dialogContentTextClasses.getDialogContentTextUtilityClass, classes);
  return (0, _extends2.default)({}, classes, composedClasses);
};

const DialogContentTextRoot = (0, _experimentalStyled.default)(_Typography.default, {
  shouldForwardProp: prop => (0, _experimentalStyled.shouldForwardProp)(prop) || prop === 'classes'
}, {
  name: 'MuiDialogContentText',
  slot: 'Root',
  overridesResolver
})({
  marginBottom: 12
});
const DialogContentText = /*#__PURE__*/React.forwardRef(function DialogContentText(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiDialogContentText'
  });
  const styleProps = (0, _objectWithoutPropertiesLoose2.default)(props, ["children"]);
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DialogContentTextRoot, (0, _extends2.default)({
    component: "p",
    variant: "body1",
    color: "text.secondary",
    ref: ref,
    styleProps: styleProps
  }, props, {
    classes: classes
  }));
});
process.env.NODE_ENV !== "production" ? DialogContentText.propTypes
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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = DialogContentText;
exports.default = _default;