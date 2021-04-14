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

var _KeyboardArrowLeft = _interopRequireDefault(require("../internal/svg-icons/KeyboardArrowLeft"));

var _KeyboardArrowRight = _interopRequireDefault(require("../internal/svg-icons/KeyboardArrowRight"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _tabScrollButtonClasses = require("./tabScrollButtonClasses");

var _jsxRuntime = require("react/jsx-runtime");

/* eslint-disable jsx-a11y/aria-role */
const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)((0, _extends2.default)({}, styleProps.orientation && styles[styleProps.orientation]), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    orientation,
    disabled
  } = styleProps;
  const slots = {
    root: ['root', orientation, disabled && 'disabled']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _tabScrollButtonClasses.getTabScrollButtonUtilityClass, classes);
};

const TabScrollButtonRoot = (0, _experimentalStyled.default)(_ButtonBase.default, {}, {
  name: 'MuiTabScrollButton',
  slot: 'Root',
  overridesResolver
})(({
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the root element. */
  width: 40,
  flexShrink: 0,
  opacity: 0.8,
  '&.Mui-disabled': {
    opacity: 0
  }
}, styleProps.orientation === 'vertical' && {
  width: '100%',
  height: 40,
  '& svg': {
    transform: 'rotate(90deg)'
  }
}));

var _ref = /*#__PURE__*/(0, _jsxRuntime.jsx)(_KeyboardArrowLeft.default, {
  fontSize: "small"
});

var _ref2 = /*#__PURE__*/(0, _jsxRuntime.jsx)(_KeyboardArrowRight.default, {
  fontSize: "small"
});

const TabScrollButton = /*#__PURE__*/React.forwardRef(function TabScrollButton(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiTabScrollButton'
  });
  const {
    className,
    direction
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "direction", "orientation", "disabled"]); // TODO: convert to simple assignment after the type error in defaultPropsHandler.js:60:6 is fixed

  const styleProps = (0, _extends2.default)({}, props);
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(TabScrollButtonRoot, (0, _extends2.default)({
    component: "div",
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    role: null,
    styleProps: styleProps,
    tabIndex: null
  }, other, {
    children: direction === 'left' ? _ref : _ref2
  }));
});
process.env.NODE_ENV !== "production" ? TabScrollButton.propTypes
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
   * The direction the button should indicate.
   */
  direction: _propTypes.default.oneOf(['left', 'right']).isRequired,

  /**
   * If `true`, the component is disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * The component orientation (layout flow direction).
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']).isRequired,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = TabScrollButton;
exports.default = _default;