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

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _toolbarClasses = require("./toolbarClasses");

var _jsxRuntime = require("react/jsx-runtime");

const useUtilityClasses = styleProps => {
  const {
    classes,
    disableGutters,
    variant
  } = styleProps;
  const slots = {
    root: ['root', !disableGutters && 'gutters', variant]
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _toolbarClasses.getToolbarUtilityClass, classes);
};

const ToolbarRoot = (0, _styled.default)('div', {
  name: 'MuiToolbar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return (0, _extends2.default)({}, styles.root, !styleProps.disableGutters && styles.gutters, styles[styleProps.variant]);
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the root element. */
  position: 'relative',
  display: 'flex',
  alignItems: 'center'
}, !styleProps.disableGutters && {
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }
}, styleProps.variant === 'dense' && {
  minHeight: 48
}),
/* Styles applied to the root element if `variant="regular"`. */
({
  theme,
  styleProps
}) => styleProps.variant === 'regular' && theme.mixins.toolbar);
const Toolbar = /*#__PURE__*/React.forwardRef(function Toolbar(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiToolbar'
  });
  const {
    className,
    component = 'div',
    disableGutters = false,
    variant = 'regular'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "component", "disableGutters", "variant"]);
  const styleProps = (0, _extends2.default)({}, props, {
    component,
    disableGutters,
    variant
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ToolbarRoot, (0, _extends2.default)({
    as: component,
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    styleProps: styleProps
  }, other));
});
process.env.NODE_ENV !== "production" ? Toolbar.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The Toolbar children, usually a mixture of `IconButton`, `Button` and `Typography`.
   * The Toolbar is a flex container, allowing flex item properites to be used to lay out the children.
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * If `true`, disables gutter padding.
   * @default false
   */
  disableGutters: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The variant to use.
   * @default 'regular'
   */
  variant: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['dense', 'regular']), _propTypes.default.string])
} : void 0;
var _default = Toolbar;
exports.default = _default;