"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _reactIs = require("react-is");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _unstyled = require("@material-ui/unstyled");

var _system = require("@material-ui/system");

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _styled = _interopRequireDefault(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _buttonGroupClasses = _interopRequireWildcard(require("./buttonGroupClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const _excluded = ["children", "className", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "disableRipple", "fullWidth", "orientation", "size", "variant"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const overridesResolver = (props, styles) => {
  const {
    ownerState
  } = props;
  return [{
    [`& .${_buttonGroupClasses.default.grouped}`]: styles.grouped
  }, {
    [`& .${_buttonGroupClasses.default.grouped}`]: styles[`grouped${(0, _capitalize.default)(ownerState.orientation)}`]
  }, {
    [`& .${_buttonGroupClasses.default.grouped}`]: styles[`grouped${(0, _capitalize.default)(ownerState.variant)}`]
  }, {
    [`& .${_buttonGroupClasses.default.grouped}`]: styles[`grouped${(0, _capitalize.default)(ownerState.variant)}${(0, _capitalize.default)(ownerState.orientation)}`]
  }, {
    [`& .${_buttonGroupClasses.default.grouped}`]: styles[`grouped${(0, _capitalize.default)(ownerState.variant)}${(0, _capitalize.default)(ownerState.color)}`]
  }, styles.root, styles[ownerState.variant], ownerState.disableElevation === true && styles.disableElevation, ownerState.fullWidth && styles.fullWidth, ownerState.orientation === 'vertical' && styles.vertical];
};

const useUtilityClasses = ownerState => {
  const {
    classes,
    color,
    disabled,
    disableElevation,
    fullWidth,
    orientation,
    variant
  } = ownerState;
  const slots = {
    root: ['root', variant, orientation === 'vertical' && 'vertical', fullWidth && 'fullWidth', disableElevation && 'disableElevation'],
    grouped: ['grouped', `grouped${(0, _capitalize.default)(orientation)}`, `grouped${(0, _capitalize.default)(variant)}`, `grouped${(0, _capitalize.default)(variant)}${(0, _capitalize.default)(orientation)}`, `grouped${(0, _capitalize.default)(variant)}${(0, _capitalize.default)(color)}`, disabled && 'disabled']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _buttonGroupClasses.getButtonGroupUtilityClass, classes);
};

const ButtonGroupRoot = (0, _styled.default)('div', {
  name: 'MuiButtonGroup',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  display: 'inline-flex',
  borderRadius: theme.shape.borderRadius
}, ownerState.variant === 'contained' && {
  boxShadow: theme.shadows[2]
}, ownerState.disableElevation && {
  boxShadow: 'none'
}, ownerState.fullWidth && {
  width: '100%'
}, ownerState.orientation === 'vertical' && {
  flexDirection: 'column'
}, {
  [`& .${_buttonGroupClasses.default.grouped}`]: (0, _extends2.default)({
    minWidth: 40,
    '&:not(:first-of-type)': (0, _extends2.default)({}, ownerState.orientation === 'horizontal' && {
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0
    }, ownerState.orientation === 'vertical' && {
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0
    }, ownerState.variant === 'outlined' && ownerState.orientation === 'horizontal' && {
      marginLeft: -1
    }, ownerState.variant === 'outlined' && ownerState.orientation === 'vertical' && {
      marginTop: -1
    }),
    '&:not(:last-of-type)': (0, _extends2.default)({}, ownerState.orientation === 'horizontal' && {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0
    }, ownerState.orientation === 'vertical' && {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0
    }, ownerState.variant === 'text' && ownerState.orientation === 'horizontal' && {
      borderRight: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`
    }, ownerState.variant === 'text' && ownerState.orientation === 'vertical' && {
      borderBottom: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`
    }, ownerState.variant === 'text' && ownerState.color !== 'inherit' && {
      borderColor: (0, _system.alpha)(theme.palette[ownerState.color].main, 0.5)
    }, ownerState.variant === 'outlined' && ownerState.orientation === 'horizontal' && {
      borderRightColor: 'transparent'
    }, ownerState.variant === 'outlined' && ownerState.orientation === 'vertical' && {
      borderBottomColor: 'transparent'
    }, ownerState.variant === 'contained' && ownerState.orientation === 'horizontal' && {
      borderRight: `1px solid ${theme.palette.grey[400]}`,
      [`&.${_buttonGroupClasses.default.disabled}`]: {
        borderRight: `1px solid ${theme.palette.action.disabled}`
      }
    }, ownerState.variant === 'contained' && ownerState.orientation === 'vertical' && {
      borderBottom: `1px solid ${theme.palette.grey[400]}`,
      [`&.${_buttonGroupClasses.default.disabled}`]: {
        borderBottom: `1px solid ${theme.palette.action.disabled}`
      }
    }, ownerState.variant === 'contained' && ownerState.color !== 'inherit' && {
      borderColor: theme.palette[ownerState.color].dark
    }),
    '&:hover': (0, _extends2.default)({}, ownerState.variant === 'outlined' && ownerState.color !== 'inherit' && {
      borderColor: theme.palette[ownerState.color].main
    }, ownerState.variant === 'contained' && {
      boxShadow: 'none'
    })
  }, ownerState.variant === 'contained' && {
    boxShadow: 'none'
  })
}));
const ButtonGroup = /*#__PURE__*/React.forwardRef(function ButtonGroup(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiButtonGroup'
  });
  const {
    children,
    className,
    color = 'primary',
    component = 'div',
    disabled = false,
    disableElevation = false,
    disableFocusRipple = false,
    disableRipple = false,
    fullWidth = false,
    orientation = 'horizontal',
    size = 'medium',
    variant = 'outlined'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = (0, _extends2.default)({}, props, {
    color,
    component,
    disabled,
    disableElevation,
    disableFocusRipple,
    disableRipple,
    fullWidth,
    orientation,
    size,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ButtonGroupRoot, (0, _extends2.default)({
    as: component,
    role: "group",
    className: (0, _clsx.default)(classes.root, className),
    ref: ref,
    ownerState: ownerState
  }, other, {
    children: React.Children.map(children, child => {
      if (! /*#__PURE__*/React.isValidElement(child)) {
        return null;
      }

      if (process.env.NODE_ENV !== 'production') {
        if ((0, _reactIs.isFragment)(child)) {
          console.error(["Material-UI: The ButtonGroup component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
        }
      }

      return /*#__PURE__*/React.cloneElement(child, {
        className: (0, _clsx.default)(classes.grouped, child.props.className),
        color: child.props.color || color,
        disabled: child.props.disabled || disabled,
        disableElevation: child.props.disableElevation || disableElevation,
        disableFocusRipple,
        disableRipple,
        fullWidth,
        size: child.props.size || size,
        variant: child.props.variant || variant
      });
    })
  }));
});
process.env.NODE_ENV !== "production" ? ButtonGroup.propTypes
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
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'primary'
   */
  color: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['inherit', 'primary', 'secondary', 'error', 'info', 'success', 'warning']), _propTypes.default.string]),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: _propTypes.default.bool,

  /**
   * If `true`, the button keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: _propTypes.default.bool,

  /**
   * If `true`, the button ripple effect is disabled.
   * @default false
   */
  disableRipple: _propTypes.default.bool,

  /**
   * If `true`, the buttons will take up the full width of its container.
   * @default false
   */
  fullWidth: _propTypes.default.bool,

  /**
   * The component orientation (layout flow direction).
   * @default 'horizontal'
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical']),

  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: _propTypes.default.oneOf(['small', 'medium', 'large']),

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The variant to use.
   * @default 'outlined'
   */
  variant: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['contained', 'outlined', 'text']), _propTypes.default.string])
} : void 0;
var _default = ButtonGroup;
exports.default = _default;