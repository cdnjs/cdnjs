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

var _utils = require("@material-ui/utils");

var _unstyled = require("@material-ui/unstyled");

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _cardActionAreaClasses = _interopRequireWildcard(require("./cardActionAreaClasses"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = (props, styles) => {
  return (0, _utils.deepmerge)({
    [`& .${_cardActionAreaClasses.default.focusHighlight}`]: styles.focusHighlight
  }, styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    root: ['root'],
    focusHighlight: ['focusHighlight']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _cardActionAreaClasses.getCardActionAreaUtilityClass, classes);
};

const CardActionAreaRoot = (0, _experimentalStyled.default)(_ButtonBase.default, {}, {
  name: 'MuiCardActionArea',
  slot: 'Root',
  overridesResolver
})(({
  theme
}) => ({
  /* Styles applied to the root element. */
  display: 'block',
  textAlign: 'inherit',
  width: '100%',
  [`&:hover .${_cardActionAreaClasses.default.focusHighlight}`]: {
    opacity: theme.palette.action.hoverOpacity,
    '@media (hover: none)': {
      opacity: 0
    }
  },
  [`&.Mui-focusVisible .${_cardActionAreaClasses.default.focusHighlight}`]: {
    opacity: theme.palette.action.focusOpacity
  }
}));
const CardActionAreaFocusHighlight = (0, _experimentalStyled.default)('span', {}, {
  name: 'MuiCardActionArea',
  slot: 'FocusHighlight'
})(({
  theme
}) => ({
  /* Styles applied to the overlay that covers the action area when it is keyboard focused. */
  overflow: 'hidden',
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: 'inherit',
  opacity: 0,
  backgroundColor: 'currentcolor',
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.short
  })
}));
const CardActionArea = /*#__PURE__*/React.forwardRef(function CardActionArea(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiCardActionArea'
  });
  const {
    children,
    className,
    focusVisibleClassName
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "className", "focusVisibleClassName"]); // TODO: convert to simple assignment after the type error in defaultPropsHandler.js:60:6 is fixed

  const styleProps = (0, _extends2.default)({}, props);
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(CardActionAreaRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    focusVisibleClassName: (0, _clsx.default)(focusVisibleClassName, classes.focusVisible),
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: [children, /*#__PURE__*/(0, _jsxRuntime.jsx)(CardActionAreaFocusHighlight, {
      className: classes.focusHighlight,
      styleProps: styleProps
    })]
  }));
});
process.env.NODE_ENV !== "production" ? CardActionArea.propTypes
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
   * @ignore
   */
  focusVisibleClassName: _propTypes.default.string,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = CardActionArea;
exports.default = _default;