"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.styles = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _withStyles = _interopRequireDefault(require("../styles/withStyles"));

var _ButtonBase = _interopRequireDefault(require("../ButtonBase"));

var _StepLabel = _interopRequireDefault(require("../StepLabel"));

var _isMuiElement = _interopRequireDefault(require("../utils/isMuiElement"));

var styles = {
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
var StepButton = /*#__PURE__*/React.forwardRef(function StepButton(props, ref) {
  var active = props.active,
      alternativeLabel = props.alternativeLabel,
      children = props.children,
      classes = props.classes,
      className = props.className,
      completed = props.completed,
      disabled = props.disabled,
      expanded = props.expanded,
      icon = props.icon,
      last = props.last,
      optional = props.optional,
      orientation = props.orientation,
      other = (0, _objectWithoutProperties2.default)(props, ["active", "alternativeLabel", "children", "classes", "className", "completed", "disabled", "expanded", "icon", "last", "optional", "orientation"]);
  var childProps = {
    active: active,
    alternativeLabel: alternativeLabel,
    completed: completed,
    disabled: disabled,
    icon: icon,
    optional: optional,
    orientation: orientation
  };
  var child = (0, _isMuiElement.default)(children, ['StepLabel']) ? /*#__PURE__*/React.cloneElement(children, childProps) : /*#__PURE__*/React.createElement(_StepLabel.default, childProps, children);
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
  /**
   * @ignore
   * Passed in via `Step` - passed through to `StepLabel`.
   */
  active: _propTypes.default.bool,

  /**
   * @ignore
   * Set internally by Stepper when it's supplied with the alternativeLabel property.
   */
  alternativeLabel: _propTypes.default.bool,

  /**
   * Can be a `StepLabel` or a node to place inside `StepLabel` as children.
   */
  children: _propTypes.default.node,

  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object.isRequired,

  /**
   * @ignore
   */
  className: _propTypes.default.string,

  /**
   * @ignore
   * Sets completed styling. Is passed to StepLabel.
   */
  completed: _propTypes.default.bool,

  /**
   * @ignore
   * Disables the button and sets disabled styling. Is passed to StepLabel.
   */
  disabled: _propTypes.default.bool,

  /**
   * @ignore
   * potentially passed from parent `Step`
   */
  expanded: _propTypes.default.bool,

  /**
   * The icon displayed by the step label.
   */
  icon: _propTypes.default.node,

  /**
   * @ignore
   */
  last: _propTypes.default.bool,

  /**
   * The optional node to display.
   */
  optional: _propTypes.default.node,

  /**
   * @ignore
   */
  orientation: _propTypes.default.oneOf(['horizontal', 'vertical'])
} : void 0;

var _default = (0, _withStyles.default)(styles, {
  name: 'MuiStepButton'
})(StepButton);

exports.default = _default;