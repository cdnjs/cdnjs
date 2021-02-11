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

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _StepLabel = _interopRequireDefault(require("../StepLabel"));

var _isMuiElement = _interopRequireDefault(require("../utils/isMuiElement"));

var _StepperContext = _interopRequireDefault(require("../Stepper/StepperContext"));

var _StepContext = _interopRequireDefault(require("../Step/StepContext"));

const styles = {
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
exports.styles = styles;
const StepButton = /*#__PURE__*/React.forwardRef(function StepButton(props, ref) {
  const {
    children,
    classes,
    className,
    icon,
    optional
  } = props,
        other = (0, _objectWithoutPropertiesLoose2.default)(props, ["children", "classes", "className", "icon", "optional"]);
  const {
    disabled
  } = React.useContext(_StepContext.default);
  const {
    orientation
  } = React.useContext(_StepperContext.default);
  const childProps = {
    icon,
    optional
  };
  const child = (0, _isMuiElement.default)(children, ['StepLabel']) ? /*#__PURE__*/React.cloneElement(children, childProps) : /*#__PURE__*/React.createElement(_StepLabel.default, childProps, children);
  return /*#__PURE__*/React.createElement(_ButtonBase.default, (0, _extends2.default)({
    focusRipple: true,
    disabled: disabled,
    TouchRippleProps: {
      className: classes.touchRipple
    },
    className: (0, _clsx.default)(classes.root, classes[orientation], className),
    ref: ref
  }, other), child);
});
process.env.NODE_ENV !== "production" ? StepButton.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
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
   * The icon displayed by the step label.
   */
  icon: _propTypes.default.node,

  /**
   * The optional node to display.
   */
  optional: _propTypes.default.node
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiStepButton'
})(StepButton);

exports.default = _default;