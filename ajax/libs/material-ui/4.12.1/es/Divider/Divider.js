import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import { alpha } from '../styles/colorManipulator';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    height: 1,
    margin: 0,
    // Reset browser default style.
    border: 'none',
    flexShrink: 0,
    backgroundColor: theme.palette.divider
  },

  /* Styles applied to the root element if `absolute={true}`. */
  absolute: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%'
  },

  /* Styles applied to the root element if `variant="inset"`. */
  inset: {
    marginLeft: 72
  },

  /* Styles applied to the root element if `light={true}`. */
  light: {
    backgroundColor: alpha(theme.palette.divider, 0.08)
  },

  /* Styles applied to the root element if `variant="middle"`. */
  middle: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    height: '100%',
    width: 1
  },

  /* Styles applied to the root element if `flexItem={true}`. */
  flexItem: {
    alignSelf: 'stretch',
    height: 'auto'
  }
});
const Divider = /*#__PURE__*/React.forwardRef(function Divider(props, ref) {
  const {
    absolute = false,
    classes,
    className,
    component: Component = 'hr',
    flexItem = false,
    light = false,
    orientation = 'horizontal',
    role = Component !== 'hr' ? 'separator' : undefined,
    variant = 'fullWidth'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["absolute", "classes", "className", "component", "flexItem", "light", "orientation", "role", "variant"]);

  return /*#__PURE__*/React.createElement(Component, _extends({
    className: clsx(classes.root, className, variant !== 'fullWidth' && classes[variant], absolute && classes.absolute, flexItem && classes.flexItem, light && classes.light, orientation === 'vertical' && classes.vertical),
    role: role,
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? Divider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Absolutely position the element.
   */
  absolute: PropTypes.bool,

  /**
   * @ignore
   */
  children: PropTypes.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
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
  component: PropTypes
  /* @typescript-to-proptypes-ignore */
  .elementType,

  /**
   * If `true`, a vertical divider will have the correct height when used in flex container.
   * (By default, a vertical divider will have a calculated height of `0px` if it is the child of a flex container.)
   */
  flexItem: PropTypes.bool,

  /**
   * If `true`, the divider will have a lighter color.
   */
  light: PropTypes.bool,

  /**
   * The divider orientation.
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),

  /**
   * @ignore
   */
  role: PropTypes.string,

  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['fullWidth', 'inset', 'middle'])
} : void 0;
export default withStyles(styles, {
  name: 'MuiDivider'
})(Divider);