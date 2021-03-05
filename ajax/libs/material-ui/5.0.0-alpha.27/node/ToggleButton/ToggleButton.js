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

var _styles = require("../styles");

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _toggleButtonClasses = _interopRequireWildcard(require("./toggleButtonClasses"));

// @inheritedComponent ButtonBase
const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)((0, _extends2.default)({}, styles[`size${(0, _capitalize.default)(styleProps.size)}`], {
    [`& .${_toggleButtonClasses.default.label}`]: styles.label
  }), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    selected,
    disabled,
    size
  } = styleProps;
  const slots = {
    root: ['root', selected && 'selected', disabled && 'disabled', `size${(0, _capitalize.default)(size)}`],
    label: ['label']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _toggleButtonClasses.getToggleButtonUtilityClass, classes);
};

const ToggleButtonRoot = (0, _experimentalStyled.default)(_ButtonBase.default, {}, {
  name: 'MuiToggleButton',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({}, theme.typography.button, {
  borderRadius: theme.shape.borderRadius,
  padding: 11,
  border: `1px solid ${(0, _styles.alpha)(theme.palette.action.active, 0.12)}`,
  color: (0, _styles.alpha)(theme.palette.action.active, 0.38),
  '&.Mui-selected': {
    color: theme.palette.action.active,
    backgroundColor: (0, _styles.alpha)(theme.palette.action.active, 0.12),
    '&:hover': {
      backgroundColor: (0, _styles.alpha)(theme.palette.action.active, 0.15)
    }
  },
  '&.Mui-disabled': {
    color: (0, _styles.alpha)(theme.palette.action.disabled, 0.12)
  },
  '&:hover': {
    textDecoration: 'none',
    // Reset on mouse devices
    backgroundColor: (0, _styles.alpha)(theme.palette.text.primary, 0.05),
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}, styleProps.size === 'small' && {
  padding: 7,
  fontSize: theme.typography.pxToRem(13)
}, styleProps.size === 'large' && {
  padding: 15,
  fontSize: theme.typography.pxToRem(15)
}));
const ToggleButtonLabel = (0, _experimentalStyled.default)('span', {}, {
  name: 'MuiToggleButton',
  slot: 'Label'
})({
  /* Styles applied to the label wrapper element. */
  width: '100%',
  // Ensure the correct width for iOS Safari
  display: 'inherit',
  alignItems: 'inherit',
  justifyContent: 'inherit'
});
const ToggleButton = /*#__PURE__*/React.forwardRef(function ToggleButton(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiToggleButton'
  });
  const {
    children,
    className,
    disabled = false,
    disableFocusRipple = false,
    onChange,
    onClick,
    selected,
    size = 'medium',
    value
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "className", "disabled", "disableFocusRipple", "onChange", "onClick", "selected", "size", "value"]);
  const styleProps = (0, _extends2.default)({}, props, {
    disabled,
    disableFocusRipple,
    size
  });
  const classes = useUtilityClasses(styleProps);

  const handleChange = event => {
    if (onClick) {
      onClick(event, value);

      if (event.defaultPrevented) {
        return;
      }
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  return /*#__PURE__*/React.createElement(ToggleButtonRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    ref: ref,
    onClick: handleChange,
    onChange: onChange,
    value: value,
    styleProps: styleProps,
    "aria-pressed": selected
  }, other), /*#__PURE__*/React.createElement(ToggleButtonLabel, {
    className: classes.label,
    styleProps: styleProps
  }, children));
});
process.env.NODE_ENV !== "production" ? ToggleButton.propTypes = {
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
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: _propTypes.default.bool,

  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusedVisible` class.
   * @default false
   */
  disableRipple: _propTypes.default.bool,

  /**
   * @ignore
   */
  onChange: _propTypes.default.func,

  /**
   * @ignore
   */
  onClick: _propTypes.default.func,

  /**
   * If `true`, the button is rendered in an active state.
   */
  selected: _propTypes.default.bool,

  /**
   * The size of the component.
   * The prop defaults to the value inherited from the parent ToggleButtonGroup component.
   * @default 'medium'
   */
  size: _propTypes.default.oneOf(['large', 'medium', 'small']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The value to associate with the button when selected in a
   * ToggleButtonGroup.
   */
  value: _propTypes.default.any.isRequired
} : void 0;
var _default = ToggleButton;
exports.default = _default;