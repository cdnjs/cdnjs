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

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _paginationItemClasses = _interopRequireWildcard(require("./paginationItemClasses"));

var _styles = require("../styles");

var _colorManipulator = require("../styles/colorManipulator");

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _capitalize = _interopRequireDefault(require("../utils/capitalize"));

var _FirstPage = _interopRequireDefault(require("../internal/svg-icons/FirstPage"));

var _LastPage = _interopRequireDefault(require("../internal/svg-icons/LastPage"));

var _NavigateBefore = _interopRequireDefault(require("../internal/svg-icons/NavigateBefore"));

var _NavigateNext = _interopRequireDefault(require("../internal/svg-icons/NavigateNext"));

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)((0, _extends2.default)({}, styles[styleProps.variant], styles[`size${(0, _capitalize.default)(styleProps.size)}`], styleProps.variant === 'text' && styles[`text${(0, _capitalize.default)(styleProps.color)}`], styleProps.variant === 'outlined' && styles[`outlined${(0, _capitalize.default)(styleProps.color)}`], styleProps.shape === 'rounded' && styles.rounded, {
    [`&.${_paginationItemClasses.default.ellipsis}`]: styles.ellipsis,
    [`&.${_paginationItemClasses.default.page}`]: styles.page,
    [`& .${_paginationItemClasses.default.icon}`]: styles.icon
  }), styles.root || {});
};

const useUtilityClasses = styleProps => {
  const {
    classes,
    color,
    disabled,
    selected,
    size,
    shape,
    variant
  } = styleProps;
  const slots = {
    root: ['root', `size${(0, _capitalize.default)(size)}`, variant, shape, color !== 'standard' && `${variant}${(0, _capitalize.default)(color)}`, disabled && 'disabled', selected && 'selected'],
    ellipsis: ['ellipsis'],
    page: ['page'],
    icon: ['icon']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _paginationItemClasses.getPaginationItemUtilityClass, classes);
};

const PaginationItemEllipsis = (0, _experimentalStyled.default)('div', {}, {
  name: 'MuiPaginationItem',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({}, theme.typography.body2, {
  borderRadius: 32 / 2,
  textAlign: 'center',
  boxSizing: 'border-box',
  minWidth: 32,
  padding: '0 6px',
  margin: '0 3px',
  color: theme.palette.text.primary,
  height: 'auto',

  /* Styles applied to the root element if `disabled="true"`. */
  '&.Mui-disabled': {
    opacity: theme.palette.action.disabledOpacity
  }
}, styleProps.size === 'small' && {
  minWidth: 26,
  borderRadius: 26 / 2,
  margin: '0 1px',
  padding: '0 4px'
}, styleProps.size === 'large' && {
  minWidth: 40,
  borderRadius: 40 / 2,
  padding: '0 10px',
  fontSize: theme.typography.pxToRem(15)
}));
const PaginationItemPage = (0, _experimentalStyled.default)(_ButtonBase.default, {}, {
  name: 'MuiPaginationItem',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({}, theme.typography.body2, {
  borderRadius: 32 / 2,
  textAlign: 'center',
  boxSizing: 'border-box',
  minWidth: 32,
  height: 32,
  padding: '0 6px',
  margin: '0 3px',
  color: theme.palette.text.primary,
  '&.Mui-focusVisible': {
    backgroundColor: theme.palette.action.focus
  },

  /* Styles applied to the root element if `disabled="true"`. */
  '&.Mui-disabled': {
    opacity: theme.palette.action.disabledOpacity
  }
}, styleProps.type === 'page' && {
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
  '&.Mui-selected': {
    backgroundColor: theme.palette.action.selected,
    '&:hover': {
      backgroundColor: (0, _colorManipulator.alpha)(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette.action.selected
      }
    },
    '&.Mui-focusVisible': {
      backgroundColor: (0, _colorManipulator.alpha)(theme.palette.action.selected, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    },
    '&.Mui-disabled': {
      opacity: 1,
      color: theme.palette.action.disabled,
      backgroundColor: theme.palette.action.selected
    }
  }
}, styleProps.size === 'small' && {
  minWidth: 26,
  height: 26,
  borderRadius: 26 / 2,
  margin: '0 1px',
  padding: '0 4px'
}, styleProps.size === 'large' && {
  minWidth: 40,
  height: 40,
  borderRadius: 40 / 2,
  padding: '0 10px',
  fontSize: theme.typography.pxToRem(15)
}, styleProps.shape === 'rounded' && {
  borderRadius: theme.shape.borderRadius
}), ({
  theme,
  styleProps
}) => (0, _extends2.default)({}, styleProps.variant === 'text' && {
  '&.Mui-selected': (0, _extends2.default)({}, styleProps.color !== 'standard' && {
    color: theme.palette[styleProps.color].contrastText,
    backgroundColor: theme.palette[styleProps.color].main,
    '&:hover': {
      backgroundColor: theme.palette[styleProps.color].dark,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: theme.palette[styleProps.color].main
      }
    },
    '&.Mui-focusVisible': {
      backgroundColor: theme.palette[styleProps.color].dark
    }
  }, {
    '&.Mui-disabled': {
      color: theme.palette.action.disabled
    }
  })
}, styleProps.variant === 'outlined' && {
  border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)'}`,
  '&.Mui-selected': (0, _extends2.default)({}, styleProps.color !== 'standard' && {
    color: theme.palette[styleProps.color].main,
    border: `1px solid ${(0, _colorManipulator.alpha)(theme.palette[styleProps.color].main, 0.5)}`,
    backgroundColor: (0, _colorManipulator.alpha)(theme.palette[styleProps.color].main, theme.palette.action.activatedOpacity),
    '&:hover': {
      backgroundColor: (0, _colorManipulator.alpha)(theme.palette[styleProps.color].main, theme.palette.action.activatedOpacity + theme.palette.action.focusOpacity),
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    },
    '&.Mui-focusVisible': {
      backgroundColor: (0, _colorManipulator.alpha)(theme.palette[styleProps.color].main, theme.palette.action.activatedOpacity + theme.palette.action.focusOpacity)
    }
  }, {
    '&.Mui-disabled': {
      borderColor: theme.palette.action.disabledBackground,
      color: theme.palette.action.disabled
    }
  })
}));
const PaginationItemPageIcon = (0, _experimentalStyled.default)('div', {}, {
  name: 'MuiPaginationItem',
  slot: 'Icon'
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  fontSize: theme.typography.pxToRem(20),
  margin: '0 -8px'
}, styleProps.size === 'small' && {
  fontSize: theme.typography.pxToRem(18)
}, styleProps.size === 'large' && {
  fontSize: theme.typography.pxToRem(22)
}));
const PaginationItem = /*#__PURE__*/React.forwardRef(function PaginationItem(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiPaginationItem'
  });
  const {
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
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "color", "component", "disabled", "page", "selected", "shape", "size", "type", "variant"]);
  const styleProps = (0, _extends2.default)({}, props, {
    color,
    disabled,
    selected,
    shape,
    size,
    type,
    variant
  });
  const theme = (0, _styles.useTheme)();
  const classes = useUtilityClasses(styleProps);
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
  return type === 'start-ellipsis' || type === 'end-ellipsis' ? /*#__PURE__*/(0, _jsxRuntime.jsx)(PaginationItemEllipsis, (0, _extends2.default)({
    ref: ref,
    styleProps: styleProps,
    className: (0, _clsx.default)(classes.root, classes.ellipsis, className)
  }, other, {
    children: "\u2026"
  })) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(PaginationItemPage, (0, _extends2.default)({
    ref: ref,
    styleProps: styleProps,
    component: component,
    disabled: disabled,
    className: (0, _clsx.default)(classes.root, classes.page, className)
  }, other, {
    children: [type === 'page' && page, Icon ? /*#__PURE__*/(0, _jsxRuntime.jsx)(PaginationItemPageIcon, {
      as: Icon,
      styleProps: styleProps,
      className: classes.icon
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" ? PaginationItem.propTypes
/* remove-proptypes */
= {
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
  page: _propTypes.default.node,

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
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

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
var _default = PaginationItem;
exports.default = _default;