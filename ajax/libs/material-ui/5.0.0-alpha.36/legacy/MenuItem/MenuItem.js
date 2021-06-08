import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_composeClasses as composeClasses } from '@material-ui/unstyled';
import styled, { rootShouldForwardProp } from '../styles/styled';
import useThemeProps from '../styles/useThemeProps';
import { getMenuItemUtilityClass } from './menuItemClasses';
import ListItem from '../ListItem';
import { overridesResolver as listItemOverridesResolver, ListItemRoot } from '../ListItem/ListItem';
import { jsx as _jsx } from "react/jsx-runtime";

var useUtilityClasses = function useUtilityClasses(styleProps) {
  var selected = styleProps.selected,
      dense = styleProps.dense,
      classes = styleProps.classes;
  var slots = {
    root: ['root', selected && 'selected', dense && 'dense']
  };
  return composeClasses(slots, getMenuItemUtilityClass, classes);
};

var MenuItemRoot = styled(ListItemRoot, {
  shouldForwardProp: function shouldForwardProp(prop) {
    return rootShouldForwardProp(prop) || prop === 'classes';
  },
  name: 'MuiMenuItem',
  slot: 'Root',
  overridesResolver: function overridesResolver(props, styles) {
    var styleProps = props.styleProps;
    return _extends({}, listItemOverridesResolver(props, styles), styleProps.dense && styles.dense);
  }
})(function (_ref) {
  var theme = _ref.theme,
      styleProps = _ref.styleProps;
  return _extends({}, theme.typography.body1, _defineProperty({
    minHeight: 48,
    paddingTop: 6,
    paddingBottom: 6,
    boxSizing: 'border-box',
    width: 'auto',
    whiteSpace: 'nowrap'
  }, theme.breakpoints.up('sm'), {
    minHeight: 'auto'
  }), styleProps.dense && _extends({}, theme.typography.body2, {
    minHeight: 'auto'
  }));
});
var MenuItem = /*#__PURE__*/React.forwardRef(function MenuItem(inProps, ref) {
  var props = useThemeProps({
    props: inProps,
    name: 'MuiMenuItem'
  });

  var className = props.className,
      _props$component = props.component,
      component = _props$component === void 0 ? 'li' : _props$component,
      _props$dense = props.dense,
      dense = _props$dense === void 0 ? false : _props$dense,
      _props$disableGutters = props.disableGutters,
      disableGutters = _props$disableGutters === void 0 ? false : _props$disableGutters,
      ListItemClasses = props.ListItemClasses,
      _props$role = props.role,
      role = _props$role === void 0 ? 'menuitem' : _props$role,
      selected = props.selected,
      tabIndexProp = props.tabIndex,
      other = _objectWithoutProperties(props, ["className", "component", "dense", "disableGutters", "ListItemClasses", "role", "selected", "tabIndex"]);

  var styleProps = {
    dense: dense
  };
  var classes = useUtilityClasses(props);
  var tabIndex;

  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  return /*#__PURE__*/_jsx(ListItem, _extends({
    components: {
      Root: MenuItemRoot
    },
    componentsProps: {
      root: {
        styleProps: styleProps
      }
    },
    button: true,
    role: role,
    tabIndex: tabIndex,
    component: component,
    selected: selected,
    disableGutters: disableGutters,
    className: clsx(classes.root, className),
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
  button: PropTypes.bool,

  /**
   * The content of the component.
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,

  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used.
   * The prop defaults to the value inherited from the parent List component.
   * @default false
   */
  dense: PropTypes.bool,

  /**
   * @ignore
   */
  disabled: PropTypes.bool,

  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: PropTypes.bool,

  /**
   * `classes` prop applied to the [`ListItem`](/api/list-item/) element.
   */
  ListItemClasses: PropTypes.object,

  /**
   * @ignore
   */
  role: PropTypes.string,

  /**
   * @ignore
   */
  selected: PropTypes.bool,

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.object,

  /**
   * @ignore
   */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
} : void 0;
export default MenuItem;