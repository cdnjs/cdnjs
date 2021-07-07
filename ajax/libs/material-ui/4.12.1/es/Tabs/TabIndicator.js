import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import capitalize from '../utils/capitalize';
export const styles = theme => ({
  root: {
    position: 'absolute',
    height: 2,
    bottom: 0,
    width: '100%',
    transition: theme.transitions.create()
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary.main
  },
  colorSecondary: {
    backgroundColor: theme.palette.secondary.main
  },
  vertical: {
    height: '100%',
    width: 2,
    right: 0
  }
});
/**
 * @ignore - internal component.
 */

const TabIndicator = /*#__PURE__*/React.forwardRef(function TabIndicator(props, ref) {
  const {
    classes,
    className,
    color,
    orientation
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["classes", "className", "color", "orientation"]);

  return /*#__PURE__*/React.createElement("span", _extends({
    className: clsx(classes.root, classes[`color${capitalize(color)}`], className, orientation === 'vertical' && classes.vertical),
    ref: ref
  }, other));
});
process.env.NODE_ENV !== "production" ? TabIndicator.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * @ignore
   * The color of the tab indicator.
   */
  color: PropTypes.oneOf(['primary', 'secondary']).isRequired,

  /**
   * The tabs orientation (layout flow direction).
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired
} : void 0;
export default withStyles(styles, {
  name: 'PrivateTabIndicator'
})(TabIndicator);