"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _Collapse = _interopRequireDefault(require("../Collapse"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _StepperContext = _interopRequireDefault(require("../Stepper/StepperContext"));

var _StepContext = _interopRequireDefault(require("../Step/StepContext"));

const styles = theme => ({
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

exports.styles = styles;
const StepContent = /*#__PURE__*/React.forwardRef(function StepContent(props, ref) {
  const {
    children,
    classes,
    className,
    TransitionComponent = _Collapse.default,
    transitionDuration: transitionDurationProp = 'auto',
    TransitionProps
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "classes", "className", "TransitionComponent", "transitionDuration", "TransitionProps"]);
  const {
    orientation
  } = React.useContext(_StepperContext.default);
  const {
    active,
    last,
    expanded
  } = React.useContext(_StepContext.default);

  if (process.env.NODE_ENV !== 'production') {
    if (orientation !== 'vertical') {
      console.error('Material-UI: <StepContent /> is only designed for use with the vertical stepper.');
    }
  }

  let transitionDuration = transitionDurationProp;

  if (transitionDurationProp === 'auto' && !TransitionComponent.muiSupportAuto) {
    transitionDuration = undefined;
  }

  return /*#__PURE__*/React.createElement("div", (0, _extends2.default)({
    className: (0, _clsx.default)(classes.root, className, last && classes.last),
    ref: ref
  }, other), /*#__PURE__*/React.createElement(TransitionComponent, (0, _extends2.default)({
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
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  TransitionComponent: _propTypes.default.elementType,

  /**
   * Adjust the duration of the content expand transition.
   * Passed as a prop to the transition component.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: _propTypes.default.oneOfType([_propTypes.default.oneOf(['auto']), _propTypes.default.number, _propTypes.default.shape({
    appear: _propTypes.default.number,
    enter: _propTypes.default.number,
    exit: _propTypes.default.number
  })]),

  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps: _propTypes.default.object
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiStepContent'
})(StepContent);

exports.default = _default;