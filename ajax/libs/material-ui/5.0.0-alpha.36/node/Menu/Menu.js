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

var _reactIs = require("react-is");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _unstyled = require("@material-ui/unstyled");

var _utils = require("@material-ui/utils");

var _MenuList = _interopRequireDefault(require("../MenuList"));

var _Paper = _interopRequireDefault(require("../Paper"));

var _Popover = _interopRequireDefault(require("../Popover"));

var _styled = _interopRequireWildcard(require("../styles/styled"));

var _useThemeProps2 = _interopRequireDefault(require("../styles/useThemeProps"));

var _menuClasses = require("./menuClasses");

var _jsxRuntime = require("react/jsx-runtime");

const RTL_ORIGIN = {
  vertical: 'top',
  horizontal: 'right'
};
const LTR_ORIGIN = {
  vertical: 'top',
  horizontal: 'left'
};

const useUtilityClasses = styleProps => {
  const {
    classes
  } = styleProps;
  const slots = {
    root: ['root'],
    paper: ['paper'],
    list: ['list']
  };
  return (0, _unstyled.unstable_composeClasses)(slots, _menuClasses.getMenuUtilityClass, classes);
};

const MenuRoot = (0, _styled.default)(_Popover.default, {
  shouldForwardProp: prop => (0, _styled.rootShouldForwardProp)(prop) || prop === 'classes',
  name: 'MuiMenu',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})({});
const MenuPaper = (0, _styled.default)(_Paper.default, {
  name: 'MuiMenu',
  slot: 'Paper',
  overridesResolver: (props, styles) => styles.paper
})({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tapable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: 'calc(100% - 96px)',
  // Add iOS momentum scrolling.
  WebkitOverflowScrolling: 'touch'
});
const MenuMenuList = (0, _styled.default)(_MenuList.default, {
  name: 'MuiMenu',
  slot: 'List',
  overridesResolver: (props, styles) => styles.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
});
const Menu = /*#__PURE__*/React.forwardRef(function Menu(inProps, ref) {
  const _useThemeProps = (0, _useThemeProps2.default)({
    props: inProps,
    name: 'MuiMenu'
  }),
        {
    isRtl,
    theme
  } = _useThemeProps,
        props = (0, _objectWithoutPropertiesLoose2.default)(_useThemeProps, ["isRtl", "theme"]);

  const {
    autoFocus = true,
    children,
    disableAutoFocusItem = false,
    MenuListProps = {},
    onClose,
    open,
    // eslint-disable-next-line react/prop-types
    PaperProps = {},
    PopoverClasses,
    transitionDuration = 'auto',
    TransitionProps: {
      onEntering
    } = {},
    variant = 'selectedMenu'
  } = props,
        TransitionProps = (0, _objectWithoutPropertiesLoose2.default)(props.TransitionProps, ["onEntering"]),
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["autoFocus", "children", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant"]);
  const styleProps = (0, _extends2.default)({}, props, {
    autoFocus,
    disableAutoFocusItem,
    MenuListProps,
    onEntering,
    PaperProps,
    transitionDuration,
    TransitionProps,
    variant
  });
  const classes = useUtilityClasses(styleProps);
  const autoFocusItem = autoFocus && !disableAutoFocusItem && open;
  const menuListActionsRef = React.useRef(null);

  const handleEntering = (element, isAppearing) => {
    if (menuListActionsRef.current) {
      menuListActionsRef.current.adjustStyleForScrollbar(element, theme);
    }

    if (onEntering) {
      onEntering(element, isAppearing);
    }
  };

  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();

      if (onClose) {
        onClose(event, 'tabKeyDown');
      }
    }
  };
  /**
   * the index of the item should receive focus
   * in a `variant="selectedMenu"` it's the first `selected` item
   * otherwise it's the very first item.
   */


  let activeItemIndex = -1; // since we inject focus related props into children we have to do a lookahead
  // to check if there is a `selected` item. We're looking for the last `selected`
  // item and use the first valid item as a fallback

  React.Children.map(children, (child, index) => {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      if ((0, _reactIs.isFragment)(child)) {
        console.error(["Material-UI: The Menu component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    if (!child.props.disabled) {
      if (variant === 'selectedMenu' && child.props.selected) {
        activeItemIndex = index;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index;
      }
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MenuRoot, (0, _extends2.default)({
    classes: PopoverClasses,
    onClose: onClose,
    anchorOrigin: isRtl ? RTL_ORIGIN : LTR_ORIGIN,
    transformOrigin: isRtl ? RTL_ORIGIN : LTR_ORIGIN,
    PaperProps: (0, _extends2.default)({
      component: MenuPaper
    }, PaperProps, {
      classes: (0, _extends2.default)({}, PaperProps.classes, {
        root: classes.paper
      })
    }),
    className: classes.root,
    open: open,
    ref: ref,
    transitionDuration: transitionDuration,
    TransitionProps: (0, _extends2.default)({
      onEntering: handleEntering
    }, TransitionProps),
    styleProps: styleProps
  }, other, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(MenuMenuList, (0, _extends2.default)({
      onKeyDown: handleListKeyDown,
      actions: menuListActionsRef,
      autoFocus: autoFocus && (activeItemIndex === -1 || disableAutoFocusItem),
      autoFocusItem: autoFocusItem,
      variant: variant
    }, MenuListProps, {
      className: (0, _clsx.default)(classes.list, MenuListProps.className),
      children: children
    }))
  }));
});
process.env.NODE_ENV !== "production" ? Menu.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: _propTypes.default
  /* @typescript-to-proptypes-ignore */
  .oneOfType([_utils.HTMLElementType, _propTypes.default.func]),

  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: _propTypes.default.bool,

  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: _propTypes.default.bool,

  /**
   * Props applied to the [`MenuList`](/api/menu-list/) element.
   * @default {}
   */
  MenuListProps: _propTypes.default.object,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: _propTypes.default.func,

  /**
   * If `true`, the component is shown.
   */
  open: _propTypes.default.bool.isRequired,

  /**
   * `classes` prop applied to the [`Popover`](/api/popover/) element.
   */
  PopoverClasses: _propTypes.default.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.object,

  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number, _propTypes.default.shape({
    appear: _propTypes.default.number,
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })]),

  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   * @default {}
   */
  TransitionProps: _propTypes.default.object,

  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: _propTypes.default.oneOf(['menu', 'selectedMenu'])
} : void 0;
var _default = Menu;
exports.default = _default;