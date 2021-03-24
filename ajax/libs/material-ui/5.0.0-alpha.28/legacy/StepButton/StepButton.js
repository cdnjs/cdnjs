import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import StepLabel from '../StepLabel';
import isMuiElement from '../utils/isMuiElement';
import StepperContext from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';
import { jsx as _jsx } from "react/jsx-runtime";
export var styles = {
  /* Styles applied to the root element. */
  root: {
    width: '100%',
    padding: '24px 16px',
    margin: '-24px -16px',
    boxSizing: 'content-box'
  },

  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {},

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    justifyContent: 'flex-start',
    padding: '8px',
    margin: '-8px'
  },

  /* Styles applied to the `ButtonBase` touch-ripple. */
  touchRipple: {
    color: 'rgba(0, 0, 0, 0.3)'
  }
};
var StepButton = /*#__PURE__*/React.forwardRef(function StepButton(props, ref) {
  var children = props.children,
      classes = props.classes,
      className = props.className,
      icon = props.icon,
      optional = props.optional,
      other = _objectWithoutProperties(props, ["children", "classes", "className", "icon", "optional"]);

  var _React$useContext = React.useContext(StepContext),
      disabled = _React$useContext.disabled;

  var _React$useContext2 = React.useContext(StepperContext),
      orientation = _React$useContext2.orientation;

  var childProps = {
    icon: icon,
    optional: optional
  };
  var child = isMuiElement(children, ['StepLabel']) ? /*#__PURE__*/React.cloneElement(children, childProps) : /*#__PURE__*/_jsx(StepLabel, _extends({}, childProps, {
    children: children
  }));
  return /*#__PURE__*/_jsx(ButtonBase, _extends({
    focusRipple: true,
    disabled: disabled,
    TouchRippleProps: {
      className: classes.touchRipple
    },
    className: clsx(classes.root, classes[orientation], className),
    ref: ref
  }, other, {
    children: child
  }));
});
process.env.NODE_ENV !== "production" ? StepButton.propTypes
/* remove-proptypes */
= {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
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
   * The icon displayed by the step label.
   */
  icon: PropTypes.node,

  /**
   * The optional node to display.
   */
  optional: PropTypes.node
} : void 0;
export default withStyles(styles, {
  name: 'MuiStepButton'
})(StepButton);