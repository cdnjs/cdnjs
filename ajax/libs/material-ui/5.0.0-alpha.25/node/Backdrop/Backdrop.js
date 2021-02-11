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

var _Fade = _interopRequireDefault(require("../Fade"));

var _backdropClasses = require("./backdropClasses");

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)(styles.root || {}, (0, _extends2.default)({}, styleProps.invisible && styles.invisible));
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    invisible
  } = styleProps;
  const slots = {
    root: ['root', invisible && 'invisible']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _backdropClasses.getBackdropUtilityClass, classes);
};

const BackdropRoot = (0, _experimentalStyled.default)('div', {}, {
  name: 'MuiBackdrop',
  slot: 'Root',
  overridesResolver
})(({
  styleProps
}) => (0, _extends2.default)({
  // Improve scrollable dialog support.
  zIndex: -1,
  position: 'fixed',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  WebkitTapHighlightColor: 'transparent'
}, styleProps.invisible && {
  backgroundColor: 'transparent'
}));
const Backdrop = /*#__PURE__*/React.forwardRef(function Backdrop(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiBackdrop'
  });
  const {
    children,
    className,
    invisible = false,
    open,
    transitionDuration,
    // eslint-disable-next-line react/prop-types
    TransitionComponent = _Fade.default
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "className", "invisible", "open", "transitionDuration", "TransitionComponent"]);
  const styleProps = (0, _extends2.default)({}, props, {
    invisible
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/React.createElement(TransitionComponent, (0, _extends2.default)({
    in: open,
    timeout: transitionDuration
  }, other), /*#__PURE__*/React.createElement(BackdropRoot, {
    className: (0, _clsx.default)(classes.root, className),
    "aria-hidden": true,
    ref: ref,
    styleProps: styleProps
  }, children));
});
process.env.NODE_ENV !== "production" ? Backdrop.propTypes = {
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
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: _propTypes.default.bool,

  /**
   * If `true`, the component is shown.
   */
  open: _propTypes.default.bool.isRequired,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.shape({
    appear: _propTypes.default.number,
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })])
} : void 0;
var _default = Backdrop;
exports.default = _default;