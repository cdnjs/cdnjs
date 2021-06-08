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

var _styled = _interopRequireWildcard(require("../styles/styled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _menuItemClasses = require("./menuItemClasses");

var _ListItem = _interopRequireDefault(require("../ListItem"));

var _ListItem2 = require("../ListItem/ListItem");

var _jsxRuntime = require("react/jsx-runtime");

const useUtilityClasses = styleProps => {
  const {
    selected,
    dense,
    classes
  } = styleProps;
  const slots = {
    root: ['root', selected && 'selected', dense && 'dense']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _menuItemClasses.getMenuItemUtilityClass, classes);
};

const MenuItemRoot = (0, _styled.default)(_ListItem2.ListItemRoot, {
  shouldForwardProp: prop => (0, _styled.rootShouldForwardProp)(prop) || prop === 'classes',
  name: 'MuiMenuItem',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return (0, _extends2.default)({}, (0, _ListItem2.overridesResolver)(props, styles), styleProps.dense && styles.dense);
  }
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({}, theme.typography.body1, {
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: 'border-box',
  width: 'auto',
  whiteSpace: 'nowrap',
  [theme.breakpoints.up('sm')]: {
    minHeight: 'auto'
  }
}, styleProps.dense && (0, _extends2.default)({}, theme.typography.body2, {
  minHeight: 'auto'
})));
const MenuItem = /*#__PURE__*/React.forwardRef(function MenuItem(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiMenuItem'
  });
  const {
    className,
    component = 'li',
    dense = false,
    disableGutters = false,
    ListItemClasses,
    role = 'menuitem',
    selected,
    tabIndex: tabIndexProp
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["className", "component", "dense", "disableGutters", "ListItemClasses", "role", "selected", "tabIndex"]);
  const styleProps = {
    dense
  };
  const classes = useUtilityClasses(props);
  let tabIndex;

  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItem.default, (0, _extends2.default)({
    components: {
      Root: MenuItemRoot
    },
    componentsProps: {
      root: {
        styleProps
      }
    },
    button: true,
    role: role,
    tabIndex: tabIndex,
    component: component,
    selected: selected,
    disableGutters: disableGutters,
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other, {
    classes: ListItemClasses
  }));
});
process.env.NODE_ENV !== "production" ? MenuItem.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * @ignore
   */
  button: _propTypes.default.bool,

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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: _propTypes.default.bool,

  /**
   * @ignore
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: _propTypes.default.bool,

  /**
   * `classes` prop applied to the [`ListItem`](/api/list-item/) element.
   */
  ListItemClasses: _propTypes.default.object,

  /**
   * @ignore
   */
  role: _propTypes.default.string,

  /**
   * @ignore
   */
  selected: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * @ignore
   */
  tabIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
} : void 0;
var _default = MenuItem;
exports.default = _default;