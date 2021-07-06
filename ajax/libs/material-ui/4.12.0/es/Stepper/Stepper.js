import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import Paper from '../Paper';
import StepConnector from '../StepConnector';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    padding: 24
  },

  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    flexDirection: 'column'
  },

  /* Styles applied to the root element if `alternativeLabel={true}`. */
  alternativeLabel: {
    alignItems: 'flex-start'
  }
};
const defaultConnector = /*#__PURE__*/React.createElement(StepConnector, null);
const Stepper = /*#__PURE__*/React.forwardRef(function Stepper(props, ref) {
  const {
    activeStep = 0,
    alternativeLabel = false,
    children,
    classes,
    className,
    connector: connectorProp = defaultConnector,
    nonLinear = false,
    orientation = 'horizontal'
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["activeStep", "alternativeLabel", "children", "classes", "className", "connector", "nonLinear", "orientation"]);

  const connector = /*#__PURE__*/React.isValidElement(connectorProp) ? /*#__PURE__*/React.cloneElement(connectorProp, {
    orientation
  }) : null;
  const childrenArray = React.Children.toArray(children);
  const steps = childrenArray.map((step, index) => {
    const state = {
      index,
      active: false,
      completed: false,
      disabled: false
    };

    if (activeStep === index) {
      state.active = true;
    } else if (!nonLinear && activeStep > index) {
      state.completed = true;
    } else if (!nonLinear && activeStep < index) {
      state.disabled = true;
    }

    return /*#__PURE__*/React.cloneElement(step, _extends({
      alternativeLabel,
      connector,
      last: index + 1 === childrenArray.length,
      orientation
    }, state, step.props));
  });
  return /*#__PURE__*/React.createElement(Paper, _extends({
    square: true,
    elevation: 0,
    className: clsx(classes.root, classes[orientation], className, alternativeLabel && classes.alternativeLabel),
    ref: ref
  }, other), steps);
});
process.env.NODE_ENV !== "production" ? Stepper.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Set the active step (zero based index).
   * Set to -1 to disable all the steps.
   */
  activeStep: PropTypes.number,

  /**
   * If set to 'true' and orientation is horizontal,
   * then the step label will be positioned under the icon.
   */
  alternativeLabel: PropTypes.bool,

  /**
   * Two or more `<Step />` components.
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
   * An element to be placed between each step.
   */
  connector: PropTypes.element,

  /**
   * If set the `Stepper` will not assist in controlling steps for linear flow.
   */
  nonLinear: PropTypes.bool,

  /**
   * The stepper orientation (layout flow direction).
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical'])
} : void 0;
export default withStyles(styles, {
  name: 'MuiStepper'
})(Stepper);