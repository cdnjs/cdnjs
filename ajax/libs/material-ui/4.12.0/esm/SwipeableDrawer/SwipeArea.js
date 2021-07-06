import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import capitalize from '../utils/capitalize';
import { isHorizontal } from '../Drawer/Drawer';
export var styles = function styles(theme) {
  return {
    /* Styles applied to the root element. */
    root: {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: theme.zIndex.drawer - 1
    },
    anchorLeft: {
      right: 'auto'
    },
    anchorRight: {
      left: 'auto',
      right: 0
    },
    anchorTop: {
      bottom: 'auto',
      right: 0
    },
    anchorBottom: {
      top: 'auto',
      bottom: 0,
      right: 0
    }
  };
};
/**
 * @ignore - internal component.
 */

var SwipeArea = /*#__PURE__*/React.forwardRef(function SwipeArea(props, ref) {
  var anchor = props.anchor,
      classes = props.classes,
      className = props.className,
      width = props.width,
      other = _objectWithoutProperties(props, ["anchor", "classes", "className", "width"]);

  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx(classes.root, classes["anchor".concat(capitalize(anchor))], className),
    ref: ref,
    style: _defineProperty({}, isHorizontal(anchor) ? 'width' : 'height', width)
  }, other));
});
process.env.NODE_ENV !== "production" ? SwipeArea.propTypes = {
  /**
   * Side on which to attach the discovery area.
   */
  anchor: PropTypes.oneOf(['left', 'top', 'right', 'bottom']).isRequired,

  /**
   * @ignore
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore
   */
  className: PropTypes.string,

  /**
   * The width of the left most (or right most) area in pixels where the
   * drawer can be swiped open from.
   */
  width: PropTypes.number.isRequired
} : void 0;
export default withStyles(styles, {
  name: 'PrivateSwipeArea'
})(SwipeArea);