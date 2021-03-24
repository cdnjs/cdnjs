import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import { deepmerge, HTMLElementType } from '@material-ui/utils';
import MenuList from '../MenuList';
import Paper from '../Paper';
import Popover from '../Popover';
import experimentalStyled, { shouldForwardProp as _shouldForwardProp } from '../styles/experimentalStyled';
import useThemeProps from '../styles/useThemeProps';
import setRef from '../utils/setRef';
import menuClasses, { getMenuUtilityClass } from './menuClasses';
import { jsx as _jsx } from "react/jsx-runtime";
var RTL_ORIGIN = {
  vertical: 'top',
  horizontal: 'right'
};
var LTR_ORIGIN = {
  vertical: 'top',
  horizontal: 'left'
};

var overridesResolver = function overridesResolver(props, styles) {
  var _deepmerge;

  return deepmerge((_deepmerge = {}, _defineProperty(_deepmerge, "& .".concat(menuClasses.paper), styles.paper), _defineProperty(_deepmerge, "& .".concat(menuClasses.list), styles.list), _deepmerge), styles.root || {});
};

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var classes = styleProps.classes;
  var slots = {
    root: ['root'],
    paper: ['paper'],
    list: ['list']
  };
  return composeClasses(slots, getMenuUtilityClass, classes);
};

var MenuRoot = experimentalStyled(Popover, {
  shouldForwardProp: function shouldForwardProp(prop) {
    return _shouldForwardProp(prop) || prop === 'classes';
  }
}, {
  name: 'MuiMenu',
  slot: 'Root',
  overridesResolver: overridesResolver
})({});
var MenuPaper = experimentalStyled(Paper, {}, {
  name: 'MuiMenu',
  slot: 'Paper'
})({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tapable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: 'calc(100% - 96px)',
  // Add iOS momentum scrolling.
  WebkitOverflowScrolling: 'touch'
});
var MenuMenuList = experimentalStyled(MenuList, {}, {
  name: 'MuiMenu',
  slot: 'List'
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
});
var Menu = /*#__PURE__*/React.forwardRef(function Menu(inProps, ref) {
  var _useThemeProps = useThemeProps({
    props: inProps,
    name: 'MuiMenu'
  }),
      isRtl = _useThemeProps.isRtl,
      theme = _useThemeProps.theme,
      props = _objectWithoutProperties(_useThemeProps, ["isRtl", "theme"]);

  var _props$autoFocus = props.autoFocus,
      autoFocus = _props$autoFocus === void 0 ? true : _props$autoFocus,
      children = props.children,
      _props$disableAutoFoc = props.disableAutoFocusItem,
      disableAutoFocusItem = _props$disableAutoFoc === void 0 ? false : _props$disableAutoFoc,
      _props$MenuListProps = props.MenuListProps,
      MenuListProps = _props$MenuListProps === void 0 ? {} : _props$MenuListProps,
      onClose = props.onClose,
      open = props.open,
      _props$PaperProps = props.PaperProps,
      PaperProps = _props$PaperProps === void 0 ? {} : _props$PaperProps,
      PopoverClasses = props.PopoverClasses,
      _props$transitionDura = props.transitionDuration,
      transitionDuration = _props$transitionDura === void 0 ? 'auto' : _props$transitionDura,
      _props$TransitionProp = props.TransitionProps;
  _props$TransitionProp = _props$TransitionProp === void 0 ? {} : _props$TransitionProp;

  var onEntering = _props$TransitionProp.onEntering,
      TransitionProps = _objectWithoutProperties(_props$TransitionProp, ["onEntering"]),
      _props$variant = props.variant,
      variant = _props$variant === void 0 ? 'selectedMenu' : _props$variant,
      other = _objectWithoutProperties(props, ["autoFocus", "children", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant"]);

  var styleProps = _extends({}, props, {
    autoFocus: autoFocus,
    disableAutoFocusItem: disableAutoFocusItem,
    MenuListProps: MenuListProps,
    onEntering: onEntering,
    PaperProps: PaperProps,
    transitionDuration: transitionDuration,
    TransitionProps: TransitionProps,
    variant: variant
  });

  var classes = useUtilityClasses(styleProps);
  var autoFocusItem = autoFocus && !disableAutoFocusItem && open;
  var menuListActionsRef = React.useRef(null);
  var contentAnchorRef = React.useRef(null);

  var handleEntering = function handleEntering(element, isAppearing) {
    if (menuListActionsRef.current) {
      menuListActionsRef.current.adjustStyleForScrollbar(element, theme);
    }

    if (onEntering) {
      onEntering(element, isAppearing);
    }
  };

  var handleListKeyDown = function handleListKeyDown(event) {
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


  var activeItemIndex = -1; // since we inject focus related props into children we have to do a lookahead
  // to check if there is a `selected` item. We're looking for the last `selected`
  // item and use the first valid item as a fallback

  React.Children.map(children, function (child, index) {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
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
  var items = React.Children.map(children, function (child, index) {
    if (index === activeItemIndex) {
      return /*#__PURE__*/React.cloneElement(child, {
        ref: function ref(instance) {
          contentAnchorRef.current = instance;
          setRef(child.ref, instance);
        }
      });
    }

    return child;
  });
  return /*#__PURE__*/_jsx(MenuRoot, _extends({
    getContentAnchorEl: function getContentAnchorEl() {
      return contentAnchorRef.current;
    },
    classes: PopoverClasses,
    onClose: onClose,
    anchorOrigin: isRtl ? RTL_ORIGIN : LTR_ORIGIN,
    transformOrigin: isRtl ? RTL_ORIGIN : LTR_ORIGIN,
    PaperProps: _extends({
      component: MenuPaper
    }, PaperProps, {
      classes: _extends({}, PaperProps.classes, {
        root: classes.paper
      })
    }),
    className: classes.root,
    open: open,
    ref: ref,
    transitionDuration: transitionDuration,
    TransitionProps: _extends({
      onEntering: handleEntering
    }, TransitionProps),
    styleProps: styleProps
  }, other, {
    children: /*#__PURE__*/_jsx(MenuMenuList, _extends({
      onKeyDown: handleListKeyDown,
      actions: menuListActionsRef,
      autoFocus: autoFocus && (activeItemIndex === -1 || disableAutoFocusItem),
      autoFocusItem: autoFocusItem,
      variant: variant
    }, MenuListProps, {
      className: clsx(classes.list, MenuListProps.className),
      children: items
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
  anchorEl: PropTypes
  /* @typescript-to-proptypes-ignore */
  .oneOfType([HTMLElementType, PropTypes.func]),

  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: PropTypes.bool,

  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: PropTypes.bool,

  /**
   * Props applied to the [`MenuList`](/api/menu-list/) element.
   * @default {}
   */
  MenuListProps: PropTypes.object,

  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: PropTypes.func,

  /**
   * If `true`, the component is shown.
   */
  open: PropTypes.bool.isRequired,

  /**
   * `classes` prop applied to the [`Popover`](/api/popover/) element.
   */
  PopoverClasses: PropTypes.object,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: PropTypes.oneOfType([PropTypes.oneOf(['auto']), PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })]),

  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   * @default {}
   */
  TransitionProps: PropTypes.object,

  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: PropTypes.oneOf(['menu', 'selectedMenu'])
} : void 0;
export default Menu;