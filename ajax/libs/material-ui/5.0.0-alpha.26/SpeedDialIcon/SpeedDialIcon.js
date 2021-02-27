import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import AddIcon from '../internal/svg-icons/Add';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    height: 24
  },

  /* Styles applied to the icon component. */
  icon: {
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short
    })
  },

  /* Styles applied to the icon component if `open={true}`. */
  iconOpen: {
    transform: 'rotate(45deg)'
  },

  /* Styles applied to the icon when an `openIcon` is provided and if `open={true}`. */
  iconWithOpenIconOpen: {
    opacity: 0
  },

  /* Styles applied to the `openIcon` if provided. */
  openIcon: {
    position: 'absolute',
    transition: theme.transitions.create(['transform', 'opacity'], {
      duration: theme.transitions.duration.short
    }),
    opacity: 0,
    transform: 'rotate(-45deg)'
  },

  /* Styles applied to the `openIcon` if provided and if `open={true}`. */
  openIconOpen: {
    transform: 'rotate(0deg)',
    opacity: 1
  }
});
const SpeedDialIcon = /*#__PURE__*/React.forwardRef(function SpeedDialIcon(props, ref) {
  const {
    className,
    classes,
    icon: iconProp,
    open,
    openIcon: openIconProp
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["className", "classes", "icon", "open", "openIcon"]);

  const iconClassName = clsx(classes.icon, open && [classes.iconOpen, openIconProp && classes.iconWithOpenIconOpen]);
  const openIconClassName = clsx(classes.openIcon, open && classes.openIconOpen);

  function formatIcon(icon, newClassName) {
    if ( /*#__PURE__*/React.isValidElement(icon)) {
      return /*#__PURE__*/React.cloneElement(icon, {
        className: newClassName
      });
    }

    return icon;
  }

  return /*#__PURE__*/React.createElement("span", _extends({
    className: clsx(classes.root, className),
    ref: ref
  }, other), openIconProp ? formatIcon(openIconProp, openIconClassName) : null, iconProp ? formatIcon(iconProp, iconClassName) : /*#__PURE__*/React.createElement(AddIcon, {
    className: iconClassName
  }));
});
process.env.NODE_ENV !== "production" ? SpeedDialIcon.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The icon to display.
   */
  icon: PropTypes.node,

  /**
   * @ignore
   * If `true`, the component is shown.
   */
  open: PropTypes.bool,

  /**
   * The icon to display in the SpeedDial Floating Action Button when the SpeedDial is open.
   */
  openIcon: PropTypes.node
} : void 0;
SpeedDialIcon.muiName = 'SpeedDialIcon';
export default withStyles(styles, {
  name: 'MuiSpeedDialIcon'
})(SpeedDialIcon);