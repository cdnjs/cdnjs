"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _utils = require("@material-ui/utils");

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: (0, _extends2.default)({}, theme.typography.button, {
      boxSizing: 'border-box',
      minHeight: 36,
      transition: theme.transitions.create(['background-color', 'box-shadow', 'border'], {
        duration: theme.transitions.duration.short
      }),
      borderRadius: '50%',
      padding: 0,
      minWidth: 0,
      width: 56,
      height: 56,
      boxShadow: theme.shadows[6],
      '&:active': {
        boxShadow: theme.shadows[12]
      },
      color: theme.palette.getContrastText(theme.palette.grey[300]),
      backgroundColor: theme.palette.grey[300],
      '&:hover': {
        backgroundColor: theme.palette.grey.A100,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.grey[300]
        },
        '&$disabled': {
          backgroundColor: theme.palette.action.disabledBackground
        },
        textDecoration: 'none'
      },
      '&$focusVisible': {
        boxShadow: theme.shadows[6]
      },
      '&$disabled': {
        color: theme.palette.action.disabled,
        boxShadow: theme.shadows[0],
        backgroundColor: theme.palette.action.disabledBackground
      }
    }),

    /* Styles applied to the span element that wraps the children. */
    label: {
      width: '100%',
      // assure the correct width for iOS Safari
      display: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit'
    },

    /* Styles applied to the root element if `color="primary"`. */
    primary: {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.primary.main
        }
      }
    },

    /* Styles applied to the root element if `color="secondary"`. */
    secondary: {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
      '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.secondary.main
        }
      }
    },

    /* Styles applied to the root element if `variant="extended"`. */
    extended: {
      borderRadius: 48 / 2,
      padding: '0 16px',
      width: 'auto',
      minHeight: 'auto',
      minWidth: 48,
      height: 48,
      '&$sizeSmall': {
        width: 'auto',
        padding: '0 8px',
        borderRadius: 34 / 2,
        minWidth: 34,
        height: 34
      },
      '&$sizeMedium': {
        width: 'auto',
        padding: '0 16px',
        borderRadius: 40 / 2,
        minWidth: 40,
        height: 40
      }
    },

    /* Pseudo-class applied to the ButtonBase root element if the button is keyboard focused. */
    focusVisible: {},

    /* Pseudo-class applied to the root element if `disabled={true}`. */
    disabled: {},

    /* Styles applied to the root element if `color="inherit"`. */
    colorInherit: {
      color: 'inherit'
    },

    /* Styles applied to the root element if `size="small"``. */
    sizeSmall: {
      width: 40,
      height: 40
    },

    /* Styles applied to the root element if `size="medium"``. */
    sizeMedium: {
      width: 48,
      height: 48
    }
  };
};

exports.styles = styles;
var Fab = /*#__PURE__*/React.forwardRef(function Fab(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      _props$color = props.color,
      color = _props$color === void 0 ? 'default' : _props$color,
      _props$component = props.component,
      component = _props$component === void 0 ? 'button' : _props$component,
      _props$disabled = props.disabled,
      disabled = _props$disabled === void 0 ? false : _props$disabled,
      _props$disableFocusRi = props.disableFocusRipple,
      disableFocusRipple = _props$disableFocusRi === void 0 ? false : _props$disableFocusRi,
      focusVisibleClassName = props.focusVisibleClassName,
      _props$size = props.size,
      size = _props$size === void 0 ? 'large' : _props$size,
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'circular' : _props$variant,
      other = (0, _objectWithoutProperties2.default)(props, ["children", "classes", "className", "color", "component", "disabled", "disableFocusRipple", "focusVisibleClassName", "size", "variant"]);
  return /*#__PURE__*/React.createElement(_ButtonBase.default, (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className, size !== 'large' && classes["size".concat((0, _capitalize.default)(size))], disabled && classes.disabled, variant === 'extended' && classes.extended, {
      'primary': classes.primary,
      'secondary': classes.secondary,
      'inherit': classes.colorInherit
    }[color]),
    component: component,
    disabled: disabled,
    focusRipple: !disableFocusRipple,
    focusVisibleClassName: (0, _clsx.default)(classes.focusVisible, focusVisibleClassName),
    ref: ref
  }, other), /*#__PURE__*/React.createElement("span", {
    className: classes.label
  }, children));
});
process.env.NODE_ENV !== "production" ? Fab.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * The content of the button.
   */
  children: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .node.isRequired,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: _propTypes.default.oneOf(['default', 'inherit', 'primary', 'secondary']),

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .elementType,

  /**
   * If `true`, the button will be disabled.
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the  keyboard focus ripple will be disabled.
   */
  disableFocusRipple: _propTypes.default.bool,

  /**
   * If `true`, the ripple effect will be disabled.
   */
  disableRipple: _propTypes.default.bool,

  /**
   * @ignore
   */
  focusVisibleClassName: _propTypes.default.string,

  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: _propTypes.default.string,

  /**
   * The size of the button.
   * `small` is equivalent to the dense button styling.
   */
  size: _propTypes.default.oneOf(['large', 'medium', 'small']),

  /**
   * The variant to use.
   * 'round' is deprecated, use 'circular' instead.
   */
  variant: (0, _utils.chainPropTypes)(_propTypes.default.oneOf(['extended', 'circular', 'round']), function (props) {
    if (props.variant === 'round') {
      throw new Error('Material-UI: variant="round" was renamed variant="circular" for consistency.');
    }

    return null;
  })
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiFab'
})(Fab);

exports.default = _default;