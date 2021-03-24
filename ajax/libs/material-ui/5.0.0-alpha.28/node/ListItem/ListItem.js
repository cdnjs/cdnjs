"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ListItemRoot = exports.overridesResolver = void 0;

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _unstyled = require("@material-ui/unstyled");

var _utils = require("@material-ui/utils");

var _experimentalStyled = _interopRequireDefault(require("../styles/experimentalStyled"));

var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));

var _colorManipulator = require("../styles/colorManipulator");

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _isMuiElement = _interopRequireDefault(require("../utils/isMuiElement"));

var _useEnhancedEffect = _interopRequireDefault(require("../utils/useEnhancedEffect"));

var _useForkRef = _interopRequireDefault(require("../utils/useForkRef"));

var _ListContext = _interopRequireDefault(require("../List/ListContext"));

var _listItemClasses = _interopRequireWildcard(require("./listItemClasses"));

var _jsxRuntime = require("react/jsx-runtime");

const overridesResolver = (props, styles) => {
  const {
    styleProps
  } = props;
  return (0, _utils.deepmerge)((0, _extends2.default)({}, styleProps.dense && styles.dense, styleProps.alignItems === 'flex-start' && styles.alignItemsFlexStart, styleProps.divider && styles.divider, !styleProps.disableGutters && styles.gutters, styleProps.button && styles.button, styleProps.hasSecondaryAction && styles.secondaryAction), styles.root || {});
};

exports.overridesResolver = overridesResolver;

const useUtilityClasses = styleProps => {
  const {
    alignItems,
    button,
    classes,
    dense,
    disabled,
    disableGutters,
    divider,
    hasSecondaryAction,
    selected
  } = styleProps;
  const slots = {
    root: ['root', dense && 'dense', !disableGutters && 'gutters', divider && 'divider', disabled && 'disabled', button && 'button', alignItems === 'flex-start' && 'alignItemsFlexStart', hasSecondaryAction && 'secondaryAction', selected && 'selected'],
    container: ['container']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _listItemClasses.getListItemUtilityClass, classes);
};

const ListItemRoot = (0, _experimentalStyled.default)('div', {}, {
  name: 'MuiListItem',
  slot: 'Root',
  overridesResolver
})(({
  theme,
  styleProps
}) => (0, _extends2.default)({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  width: '100%',
  boxSizing: 'border-box',
  textAlign: 'left',
  paddingTop: 8,
  paddingBottom: 8,
  [`&.${_listItemClasses.default.focusVisible}`]: {
    backgroundColor: theme.palette.action.focus
  },
  [`&.${_listItemClasses.default.selected}`]: {
    backgroundColor: (0, _colorManipulator.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity),
    [`&.${_listItemClasses.default.focusVisible}`]: {
      backgroundColor: (0, _colorManipulator.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.focusOpacity)
    }
  },
  [`&.${_listItemClasses.default.disabled}`]: {
    opacity: theme.palette.action.disabledOpacity
  }
}, styleProps.dense && {
  paddingTop: 4,
  paddingBottom: 4
}, styleProps.alignItems === 'flex-start' && {
  alignItems: 'flex-start'
}, styleProps.divider && {
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundClip: 'padding-box'
}, !styleProps.disableGutters && {
  paddingLeft: 16,
  paddingRight: 16
}, styleProps.button && {
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest
  }),
  '&:hover': {
    textDecoration: 'none',
    backgroundColor: theme.palette.action.hover,
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: 'transparent'
    }
  },
  [`&.${_listItemClasses.default.selected}:hover`]: {
    backgroundColor: (0, _colorManipulator.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity),
    // Reset on touch devices, it doesn't add specificity
    '@media (hover: none)': {
      backgroundColor: (0, _colorManipulator.alpha)(theme.palette.primary.main, theme.palette.action.selectedOpacity)
    }
  }
}, styleProps.hasSecondaryAction && {
  // Add some space to avoid collision as `ListItemSecondaryAction`
  // is absolutely positioned.
  paddingRight: 48
}));
exports.ListItemRoot = ListItemRoot;
const ListItemContainer = (0, _experimentalStyled.default)('li', {}, {
  name: 'MuiListItem',
  slot: 'Container',
  overridesResolver
})({
  position: 'relative'
});
/**
 * Uses an additional container component if `ListItemSecondaryAction` is the last child.
 */

const ListItem = /*#__PURE__*/React.forwardRef(function ListItem(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiListItem'
  });
  const {
    alignItems = 'center',
    autoFocus = false,
    button = false,
    children: childrenProp,
    className,
    component: componentProp,
    components = {},
    componentsProps = {},
    ContainerComponent = 'li',
    ContainerProps: {
      className: ContainerClassName
    } = {},
    dense = false,
    disabled = false,
    disableGutters = false,
    divider = false,
    focusVisibleClassName,
    selected = false
  } = props,
        ContainerProps = (0, _objectWithoutPropertiesLoose2.default)(props.ContainerProps, ["className"]),
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["alignItems", "autoFocus", "button", "children", "className", "component", "components", "componentsProps", "ContainerComponent", "ContainerProps", "dense", "disabled", "disableGutters", "divider", "focusVisibleClassName", "selected"]);
  const context = React.useContext(_ListContext.default);
  const childContext = {
    dense: dense || context.dense || false,
    alignItems,
    disableGutters
  };
  const listItemRef = React.useRef(null);
  (0, _useEnhancedEffect.default)(() => {
    if (autoFocus) {
      if (listItemRef.current) {
        listItemRef.current.focus();
      } else if (process.env.NODE_ENV !== 'production') {
        console.error('Material-UI: Unable to set focus to a ListItem whose component has not been rendered.');
      }
    }
  }, [autoFocus]);
  const children = React.Children.toArray(childrenProp);
  const hasSecondaryAction = children.length && (0, _isMuiElement.default)(children[children.length - 1], ['ListItemSecondaryAction']);
  const styleProps = (0, _extends2.default)({}, props, {
    alignItems,
    autoFocus,
    button,
    dense: childContext.dense,
    disabled,
    disableGutters,
    divider,
    hasSecondaryAction,
    selected
  });
  const classes = useUtilityClasses(styleProps);
  const handleRef = (0, _useForkRef.default)(listItemRef, ref);
  const Root = components.Root || ListItemRoot;
  const rootProps = componentsProps.root || {};
  const componentProps = (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, rootProps.className, className),
    disabled
  }, other);
  let Component = componentProp || 'li';

  if (button) {
    componentProps.component = componentProp || 'div';
    componentProps.focusVisibleClassName = (0, _clsx.default)(_listItemClasses.default.focusVisible, focusVisibleClassName);
    Component = _ButtonBase.default;
  }

  if (hasSecondaryAction) {
    // Use div by default.
    Component = !componentProps.component && !componentProp ? 'div' : Component; // Avoid nesting of li > li.

    if (ContainerComponent === 'li') {
      if (Component === 'li') {
        Component = 'div';
      } else if (componentProps.component === 'li') {
        componentProps.component = 'div';
      }
    }

    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListContext.default.Provider, {
      value: childContext,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(ListItemContainer, (0, _extends2.default)({
        as: ContainerComponent,
        className: (0, _clsx.default)(classes.container, ContainerClassName),
        ref: handleRef
      }, ContainerProps, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Root, (0, _extends2.default)({}, rootProps, {
          as: Component,
          styleProps: styleProps
        }, !(0, _unstyled.isHostComponent)(Root) && {
          styleProps: (0, _extends2.default)({}, styleProps, rootProps.styleProps)
        }, componentProps, {
          children: children
        })), children.pop()]
      }))
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListContext.default.Provider, {
    value: childContext,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Root, (0, _extends2.default)({}, rootProps, {
      as: Component,
      ref: handleRef,
      styleProps: styleProps
    }, !(0, _unstyled.isHostComponent)(Root) && {
      styleProps: (0, _extends2.default)({}, styleProps, rootProps.styleProps)
    }, componentProps, {
      children: children
    }))
  });
});
process.env.NODE_ENV !== "production" ? ListItem.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Defines the `align-items` style property.
   * @default 'center'
   */
  alignItems: _propTypes.default.oneOf(['center', 'flex-start']),

  /**
   * If `true`, the list item is focused during the first mount.
   * Focus will also be triggered if the value changes from false to true.
   * @default false
   */
  autoFocus: _propTypes.default.bool,

  /**
   * If `true`, the list item is a button (using `ButtonBase`). Props intended
   * for `ButtonBase` can then be applied to `ListItem`.
   * @default false
   */
  button: _propTypes.default.bool,

  /**
   * The content of the component if a `ListItemSecondaryAction` is used it must
   * be the last child.
   */
  children: (0, _utils.chainPropTypes)(_propTypes.default.node, props => {
    const children = React.Children.toArray(props.children); // React.Children.toArray(props.children).findLastIndex(isListItemSecondaryAction)

    let secondaryActionIndex = -1;

    for (let i = children.length - 1; i >= 0; i -= 1) {
      const child = children[i];

      if ((0, _isMuiElement.default)(child, ['ListItemSecondaryAction'])) {
        secondaryActionIndex = i;
        break;
      }
    } //  is ListItemSecondaryAction the last child of ListItem


    if (secondaryActionIndex !== -1 && secondaryActionIndex !== children.length - 1) {
      return new Error('Material-UI: You used an element after ListItemSecondaryAction. ' + 'For ListItem to detect that it has a secondary action ' + 'you must pass it as the last child to ListItem.');
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
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,

  /**
   * The components used for each slot inside the InputBase.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: _propTypes.default.shape({
    Root: _propTypes.default.elementType
  }),

  /**
   * The props used for each slot inside the Input.
   * @default {}
   */
  componentsProps: _propTypes.default.object,

  /**
   * The container component used when a `ListItemSecondaryAction` is the last child.
   * @default 'li'
   */
  ContainerComponent: _utils.elementTypeAcceptingRef,

  /**
   * Props applied to the container component if used.
   * @default {}
   */
  ContainerProps: _propTypes.default.object,

  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: _propTypes.default.bool,

  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,

  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: _propTypes.default.bool,

  /**
   * If `true`, a 1px light border is added to the bottom of the list item.
   * @default false
   */
  divider: _propTypes.default.bool,

  /**
   * @ignore
   */
  focusVisibleClassName: _propTypes.default.string,

  /**
   * Use to apply selected styling.
   * @default false
   */
  selected: _propTypes.default.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object
} : void 0;
var _default = ListItem;
exports.default = _default;