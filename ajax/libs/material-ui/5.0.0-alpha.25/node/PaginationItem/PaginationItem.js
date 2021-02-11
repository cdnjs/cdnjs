"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _styles = require("../styles");

var _colorManipulator = require("../styles/colorManipulator");

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _utils = require("../utils");

var _FirstPage = _interopRequireDefault(require("../internal/svg-icons/FirstPage"));

var _LastPage = _interopRequireDefault(require("../internal/svg-icons/LastPage"));

var _NavigateBefore = _interopRequireDefault(require("../internal/svg-icons/NavigateBefore"));

var _NavigateNext = _interopRequireDefault(require("../internal/svg-icons/NavigateNext"));

const styles = theme => ({
  /* Styles applied to the root element. */
  root: (0, _extends2.default)({}, theme.typography.body2, {
    borderRadius: 32 / 2,
    textAlign: 'center',
    boxSizing: 'border-box',
    minWidth: 32,
    height: 32,
    padding: '0 6px',
    margin: '0 3px',
    color: theme.palette.text.primary
  }),

  /* Styles applied to the root element if `type="page"`. */
  page: {
    transition: theme.transitions.create(['color', 'background-color'], {
      duration: theme.transitions.duration.short
    }),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    '&$disabled': {
      opacity: theme.palette.action.disabledOpacity
    },
    '&$focusVisible': {
      backgroundColor: theme.palette.action.focus
    },
    '&$selected': {
      backgroundColor: theme.palette.action.selected,
      '&:hover': {
        backgroundColor: (0, _colorManipulator.alpha)(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.action.selected
        }
      },
      '&$focusVisible': {
        backgroundColor: (0, _colorManipulator.alpha)(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
      },
      '&$disabled': {
        opacity: 1,
        color: theme.palette.action.disabled,
        backgroundColor: theme.palette.action.selected
      }
    }
  },

  /* Styles applied to the root element if `size="small"`. */
  sizeSmall: {
    minWidth: 26,
    height: 26,
    borderRadius: 26 / 2,
    margin: '0 1px',
    padding: '0 4px',
    '& $icon': {
      fontSize: theme.typography.pxToRem(18)
    }
  },

  /* Styles applied to the root element if `size="large"`. */
  sizeLarge: {
    minWidth: 40,
    height: 40,
    borderRadius: 40 / 2,
    padding: '0 10px',
    fontSize: theme.typography.pxToRem(15),
    '& $icon': {
      fontSize: theme.typography.pxToRem(22)
    }
  },

  /* Styles applied to the root element if `variant="text"`. */
  text: {},

  /* Styles applied to the root element if `variant="text"` and `color="primary"`. */
  textPrimary: {
    '&$selected': {
      color: theme.palette.primary.contrastText,
      backgroundColor: theme.palette.primary.main,
      '&:hover, &$focusVisible': {
        backgroundColor: theme.palette.primary.dark,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.primary.main
        }
      },
      '&$disabled': {
        color: theme.palette.action.disabled
      }
    }
  },

  /* Styles applied to the root element if `variant="text"` and `color="secondary"`. */
  textSecondary: {
    '&$selected': {
      color: theme.palette.secondary.contrastText,
      backgroundColor: theme.palette.secondary.main,
      '&:hover, &$focusVisible': {
        backgroundColor: theme.palette.secondary.dark,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: theme.palette.secondary.main
        }
      },
      '&$disabled': {
        color: theme.palette.action.disabled
      }
    }
  },

  /* Styles applied to the root element if `variant="outlined"`. */
  outlined: {
    border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`,
    '&$selected': {
      '&$disabled': {
        border: `1px solid ${theme.palette.action.disabledBackground}`
      }
    }
  },

  /* Styles applied to the root element if `variant="outlined"` and `color="primary"`. */
  outlinedPrimary: {
    '&$selected': {
      color: theme.palette.primary.main,
      border: `1px solid ${(0, _colorManipulator.alpha)(theme.palette.primary.main, 0.5)}`,
      backgroundColor: (0, _colorManipulator.alpha)(theme.palette.primary.main, theme.palette.action.activatedOpacity),
      '&:hover, &$focusVisible': {
        backgroundColor: (0, _colorManipulator.alpha)(theme.palette.primary.main, theme.palette.action.activatedOpacity + theme.palette.action.focusOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      },
      '&$disabled': {
        color: theme.palette.action.disabled
      }
    }
  },

  /* Styles applied to the root element if `variant="outlined"` and `color="secondary"`. */
  outlinedSecondary: {
    '&$selected': {
      color: theme.palette.secondary.main,
      border: `1px solid ${(0, _colorManipulator.alpha)(theme.palette.secondary.main, 0.5)}`,
      backgroundColor: (0, _colorManipulator.alpha)(theme.palette.secondary.main, theme.palette.action.activatedOpacity),
      '&:hover, &$focusVisible': {
        backgroundColor: (0, _colorManipulator.alpha)(theme.palette.secondary.main, theme.palette.action.activatedOpacity + theme.palette.action.focusOpacity),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent'
        }
      },
      '&$disabled': {
        color: theme.palette.action.disabled
      }
    }
  },

  /* Styles applied to the root element if `rounded="true"`. */
  rounded: {
    borderRadius: theme.shape.borderRadius
  },

  /* Styles applied to the root element if `type="start-ellipsis"` or `type="end-ellipsis"`. */
  ellipsis: {
    height: 'auto',
    '&$disabled': {
      opacity: theme.palette.action.disabledOpacity
    }
  },

  /* Pseudo-class applied to the root element if keyboard focused. */
  focusVisible: {},

  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},

  /* Pseudo-class applied to the root element if `selected={true}`. */
  selected: {},

  /* Styles applied to tThe icon to display. */
  icon: {
    fontSize: theme.typography.pxToRem(20),
    margin: '0 -8px'
  }
});

exports.styles = styles;
const PaginationItem = /*#__PURE__*/React.forwardRef(function PaginationItem(props, ref) {
  const {
    classes,
    className,
    color = 'standard',
    component,
    disabled = false,
    page,
    selected = false,
    shape = 'circular',
    size = 'medium',
    type = 'page',
    variant = 'text'
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["classes", "className", "color", "component", "disabled", "page", "selected", "shape", "size", "type", "variant"]);
  const themeVariantsClasses = (0, _styles.useThemeVariants)((0, _extends2.default)({}, props, {
    color,
    disabled,
    selected,
    shape,
    size,
    type,
    variant
  }), 'MuiPaginationItem');
  const theme = (0, _styles.useTheme)();
  const normalizedIcons = theme.direction === 'rtl' ? {
    previous: _NavigateNext.default,
    next: _NavigateBefore.default,
    last: _FirstPage.default,
    first: _LastPage.default
  } : {
    previous: _NavigateBefore.default,
    next: _NavigateNext.default,
    first: _FirstPage.default,
    last: _LastPage.default
  };
  const Icon = normalizedIcons[type];
  return type === 'start-ellipsis' || type === 'end-ellipsis' ? /*#__PURE__*/React.createElement("div", {
    ref: ref,
    className: (0, _clsx.default)(classes.root, classes.ellipsis, className, disabled && classes.disabled, size !== 'medium' && classes[`size${(0, _utils.capitalize)(size)}`])
  }, "\u2026") : /*#__PURE__*/React.createElement(_ButtonBase.default, (0, _extends2.default)({
    ref: ref,
    component: component,
    disabled: disabled,
    focusVisibleClassName: classes.focusVisible,
    className: (0, _clsx.default)(classes.root, classes.page, classes[variant], classes[shape], themeVariantsClasses, className, color !== 'standard' && classes[`${variant}${(0, _utils.capitalize)(color)}`], disabled && classes.disabled, selected && classes.selected, size !== 'medium' && classes[`size${(0, _utils.capitalize)(size)}`])
  }, other), type === 'page' && page, Icon ? /*#__PURE__*/React.createElement(Icon, {
    className: classes.icon
  }) : null);
});
process.env.NODE_ENV !== "production" ? PaginationItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
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
   * The active color.
   * @default 'standard'
   */
  color: _propTypes.default.oneOf(['primary', 'secondary', 'standard']),

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
   * The current page number.
   */
  page: _propTypes.default.number,

  /**
   * If `true` the pagination item is selected.
   * @default false
   */
  selected: _propTypes.default.bool,

  /**
   * The shape of the pagination item.
   * @default 'circular'
   */
  shape: _propTypes.default.oneOf(['circular', 'rounded']),

  /**
   * The size of the component.
   * @default 'medium'
   */
  size: _propTypes.default.oneOf(['large', 'medium', 'small']),

  /**
   * The type of pagination item.
   * @default 'page'
   */
  type: _propTypes.default.oneOf(['end-ellipsis', 'first', 'last', 'next', 'page', 'previous', 'start-ellipsis']),

  /**
   * The variant to use.
   * @default 'text'
   */
  variant: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_propTypes.default.oneOf(['outlined', 'text']), _propTypes.default.string])
} : void 0;

var _default = (0, _styles.withStyles)(styles, {
  name: 'MuiPaginationItem'
})(PaginationItem);

exports.default = _default;