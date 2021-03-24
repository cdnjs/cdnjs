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

var _colorManipulator = require("../styles/colorManipulator");

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _iconButtonClasses = _interopRequireWildcard(require("./iconButtonClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)((0, _extends2.default)({}, styleProps.color !== 'default' && styles[`color${(0, _capitalize.default)(styleProps.color)}`], styleProps.edge && styles[`edge${(0, _capitalize.default)(styleProps.edge)}`], styles[`size${(0, _capitalize.default)(styleProps.size)}`], {
    [`& .${_iconButtonClasses.default.label}`]: styles.label
  }), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    disabled,
    color,
    edge,
    size
  } = styleProps;
  const slots = {
    root: ['root', disabled && 'disabled', color !== 'default' && `color${(0, _capitalize.default)(color)}`, edge && `edge${(0, _capitalize.default)(edge)}`, `size${(0, _capitalize.default)(size)}`],
    label: ['label']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _iconButtonClasses.getIconButtonUtilityClass, classes);
};

const IconButtonRoot = (0, _experimentalStyled.default)(_ButtonBase.default, {}, {
  name: 'MuiIconButton',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  /* Styles applied to the root element. */
  textAlign: 'center',
  flex: '0 0 auto',
  fontSize: theme.typography.pxToRem(24),
  padding: 12,
  borderRadius: '50%',
  overflow: 'visible',
  // Explicitly set the default value to solve a bug on IE11.
  color: theme.palette.action.active,
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest
  }),
  '&:hover': {
    backgroundColor: (0, _colorManipulator.alpha)(theme.palette.action.active, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}, styleProps.edge === 'start' && {
  marginLeft: styleProps.size === 'small' ? -3 : -12
}, styleProps.edge === 'end' && {
  marginRight: styleProps.size === 'small' ? -3 : -12
}), ({
  theme,
  styleProps
}) => (0, _extends2.default)({}, styleProps.color === 'inherit' && {
  color: 'inherit'
}, styleProps.color === 'primary' && {
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: (0, _colorManipulator.alpha)(theme.palette.primary.main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}, styleProps.color === 'secondary' && {
  color: theme.palette.secondary.main,
  '&:hover': {
    backgroundColor: (0, _colorManipulator.alpha)(theme.palette.secondary.main, theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  }
}, styleProps.size === 'small' && {
  padding: 3,
  fontSize: theme.typography.pxToRem(18)
}, {
  /* Styles applied to the root element if `disabled={true}`. */
  [`&.${_iconButtonClasses.default.disabled}`]: {
    backgroundColor: 'transparent',
    color: theme.palette.action.disabled
  }
}));
const IconButtonLabel = (0, _experimentalStyled.default)('span', {}, {
  name: 'MuiIconButton',
  slot: 'Label'
})({
  /* Styles applied to the children container element. */
  width: '100%',
  display: 'flex',
  alignItems: 'inherit',
  justifyContent: 'inherit'
});
/**
 * Refer to the [Icons](/components/icons/) section of the documentation
 * regarding the available icon options.
 */

const IconButton = /*#__PURE__*/React.forwardRef(function IconButton(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiIconButton'
  });
  const {
    edge = false,
    children,
    className,
    color = 'default',
    disabled = false,
    disableFocusRipple = false,
    size = 'medium'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["edge", "children", "className", "color", "disabled", "disableFocusRipple", "size"]);
  const styleProps = (0, _extends2.default)({}, props, {
    edge,
    color,
    disabled,
    disableFocusRipple,
    size
  });
  const classes = useUtilityClasses(styleProps);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(IconButtonRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className),
    centerRipple: true,
    focusRipple: !disableFocusRipple,
    disabled: disabled,
    ref: ref,
    styleProps: styleProps
  }, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(IconButtonLabel, {
      className: classes.label,
      styleProps: styleProps,
      children: children
    })
  }));
});
process.env.NODE_ENV !== "production" ? IconButton.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The icon to display.
   */
  children: (0, _utils.chainPropTypes)(_propTypes.default.node, props => {
    const found = React.Children.toArray(props.children).some(child => /*#__PURE__*/React.isValidElement(child) && child.props.onClick);

    if (found) {
      return new Error(['Material-UI: You are providing an onClick event listener to a child of a button element.', 'Prefer applying it to the IconButton directly.', 'This guarantees that the whole <button> will be responsive to click events.'].join('\n'));
    }

    return null;
  }),

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color: _propTypes.default.oneOf(['default', 'inherit', 'primary', 'secondary']),

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
   * If given, uses a negative margin to counteract the padding on one
   * side (this is often helpful for aligning the left or right
   * side of the icon with content above or below, without ruining the border
   * size and shape).
   * @default false
   */
  edge: _propTypes.default.oneOf(['end', 'start', false]),

  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: _propTypes.default.oneOf(['medium', 'small']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = IconButton;
exports.default = _default;