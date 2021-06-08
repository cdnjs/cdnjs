import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
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

const useUtilityClasses = styleProps => {
  const {
    selected,
    dense,
    classes
  } = styleProps;
  const slots = {
    root: ['root', selected && 'selected', dense && 'dense']
  };
  return composeClasses(slots, getMenuItemUtilityClass, classes);
};

const MenuItemRoot = styled(ListItemRoot, {
  shouldForwardProp: prop => rootShouldForwardProp(prop) || prop === 'classes',
  name: 'MuiMenuItem',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      styleProps
    } = props;
    return _extends({}, listItemOverridesResolver(props, styles), styleProps.dense && styles.dense);
  }
})(({
  theme,
  styleProps
}) => _extends({}, theme.typography.body1, {
  minHeight: 48,
  paddingTop: 6,
  paddingBottom: 6,
  boxSizing: 'border-box',
  width: 'auto',
  whiteSpace: 'nowrap',
  [theme.breakpoints.up('sm')]: {
    minHeight: 'auto'
  }
}, styleProps.dense && _extends({}, theme.typography.body2, {
  minHeight: 'auto'
})));
const MenuItem = /*#__PURE__*/React.forwardRef(function MenuItem(inProps, ref) {
  const props = useThemeProps({
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
        other = _objectWithoutPropertiesLoose(props, ["className", "component", "dense", "disableGutters", "ListItemClasses", "role", "selected", "tabIndex"]);

  const styleProps = {
    dense
  };
  const classes = useUtilityClasses(props);
  let tabIndex;

  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }

  return /*#__PURE__*/_jsx(ListItem, _extends({
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