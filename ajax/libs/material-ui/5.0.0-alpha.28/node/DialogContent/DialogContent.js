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

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _dialogContentClasses = require("./dialogContentClasses");

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)((0, _extends2.default)({}, styleProps.dividers && styles.dividers), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    dividers
  } = styleProps;
  const slots = {
    root: ['root', dividers && 'dividers']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _dialogContentClasses.getDialogContentUtilityClass, classes);
};

const DialogContentRoot = (0, _experimentalStyled.default)('div', {}, {
  name: 'MuiDialogContent',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the root element. */
  flex: '1 1 auto',
  WebkitOverflowScrolling: 'touch',
  // Add iOS momentum scrolling.
  overflowY: 'auto',
  padding: '8px 24px',
  '&:first-of-type': {
    // dialog without title
    paddingTop: 20
  }
}, styleProps.dividers && {
  padding: '16px 24px',
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`
}));
const DialogContent = /*#__PURE__*/React.forwardRef(function DialogContent(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiDialogContent'
  });
  const {
    className,
    dividers = false
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "dividers"]);
  const styleProps = (0, _extends2.default)({}, props, {
    dividers
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(DialogContentRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    styleProps: styleProps,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? DialogContent.propTypes
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
   * Display the top and bottom dividers.
   * @default false
   */
  dividers: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = DialogContent;
exports.default = _default;