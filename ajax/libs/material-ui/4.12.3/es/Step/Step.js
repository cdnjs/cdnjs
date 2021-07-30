import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import { isFragment } from 'react-is';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
export const styles = {
  /* Styles applied to the root element. */
  root: {},

  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {
    paddingLeft: 8,
    paddingRight: 8
  },

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {},

  /* Styles applied to the root element if `alternativeLabel={true}`. */
  alternativeLabel: {
    flex: 1,
    position: 'relative'
  },

  /* Pseudo-class applied to the root element if `completed={true}`. */
  completed: {}
};
const Step = /*#__PURE__*/React.forwardRef(function Step(props, ref) {
  const {
    active = false,
    // eslint-disable-next-line react/prop-types
    alternativeLabel,
    children,
    classes,
    className,
    completed = false,
    // eslint-disable-next-line react/prop-types
    connector: connectorProp,
    disabled = false,
    expanded = false,
    // eslint-disable-next-line react/prop-types
    index,
    // eslint-disable-next-line react/prop-types
    last,
    // eslint-disable-next-line react/prop-types
    orientation
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["active", "alternativeLabel", "children", "classes", "className", "completed", "connector", "disabled", "expanded", "index", "last", "orientation"]);

  const connector = connectorProp ? /*#__PURE__*/React.cloneElement(connectorProp, {
    orientation,
    alternativeLabel,
    index,
    active,
    completed,
    disabled
  }) : null;
  const newChildren = /*#__PURE__*/React.createElement("div", _extends({
    className: clsx(classes.root, classes[orientation], className, alternativeLabel && classes.alternativeLabel, completed && classes.completed),
    ref: ref
  }, other), connector && alternativeLabel && index !== 0 ? connector : null, React.Children.map(children, child => {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return null;
    }

    if (process.env.NODE_ENV !== 'production') {
      if (isFragment(child)) {
        console.error(["Material-UI: The Step component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      }
    }

    return /*#__PURE__*/React.cloneElement(child, _extends({
      active,
      alternativeLabel,
      completed,
      disabled,
      expanded,
      last,
      icon: index + 1,
      orientation
    }, child.props));
  }));

  if (connector && !alternativeLabel && index !== 0) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, connector, newChildren);
  }

  return newChildren;
});
process.env.NODE_ENV !== "production" ? Step.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Sets the step as active. Is passed to child components.
   */
  active: PropTypes.bool,

  /**
   * Should be `Step` sub-components such as `StepLabel`, `StepContent`.
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
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,

  /**
   * Mark the step as disabled, will also disable the button if
   * `StepButton` is a child of `Step`. Is passed to child components.
   */
  disabled: PropTypes.bool,

  /**
   * Expand the step.
   */
  expanded: PropTypes.bool
} : void 0;
export default withStyles(styles, {
  name: 'MuiStep'
})(Step);