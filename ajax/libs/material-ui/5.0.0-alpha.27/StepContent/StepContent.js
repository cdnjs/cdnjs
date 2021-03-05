import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Collapse from '../Collapse';
import withStyles from '../styles/withStyles';
import StepperContext from '../Stepper/StepperContext';
import StepContext from '../Step/StepContext';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    marginLeft: 12,
    // half icon
    paddingLeft: 8 + 12,
    // margin + half icon
    paddingRight: 8,
    borderLeft: `1px solid ${theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]}`
  },

  /* Styles applied to the root element if `last={true}` (controlled by `Step`). */
  last: {
    borderLeft: 'none'
  },

  /* Styles applied to the Transition component. */
  transition: {}
});
const StepContent = /*#__PURE__*/React.forwardRef(function StepContent(props, ref) {
  const {
    children,
    classes,
    className,
    TransitionComponent = Collapse,
    transitionDuration: transitionDurationProp = 'auto',
    TransitionProps
  } = props,
        other = _objectWithoutPropertiesLoose(props, ["children", "classes", "className", "TransitionComponent", "transitionDuration", "TransitionProps"]);

  const {
    orientation
  } = React.useContext(StepperContext);
  const {
    active,
    last,
    expanded
  } = React.useContext(StepContext);

  if (process.env.NODE_ENV !== 'production') {
    if (orientation !== 'vertical') {
      console.error('Material-UI: <StepContent /> is only designed for use with the vertical stepper.');
    }
  }

  let transitionDuration = transitionDurationProp;

  if (transitionDurationProp === 'auto' && !TransitionComponent.muiSupportAuto) {
    transitionDuration = undefined;
  }

  return /*#__PURE__*/React.createElement("div", _extends({
    className: clsx(classes.root, className, last && classes.last),
    ref: ref
  }, other), /*#__PURE__*/React.createElement(TransitionComponent, _extends({
    in: active || expanded,
    className: classes.transition,
    timeout: transitionDuration,
    unmountOnExit: true
  }, TransitionProps), children));
});
process.env.NODE_ENV !== "production" ? StepContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

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
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  TransitionComponent: PropTypes.elementType,

  /**
   * Adjust the duration of the content expand transition.
   * Passed as a prop to the transition component.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
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
   */
  TransitionProps: PropTypes.object
} : void 0;
export default withStyles(styles, {
  name: 'MuiStepContent'
})(StepContent);