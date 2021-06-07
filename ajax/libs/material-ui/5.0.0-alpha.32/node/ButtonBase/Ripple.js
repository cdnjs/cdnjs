"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _clsx = _interopRequireDefault(require("clsx"));

var _useEventCallback = _interopRequireDefault(require("../utils/useEventCallback"));

var _useEnhancedEffect = _interopRequireDefault(require("../utils/useEnhancedEffect"));

var _jsxRuntime = require("react/jsx-runtime");

/**
 * @ignore - internal component.
 */
function Ripple(props) {
  const {
    className,
    classes,
    pulsate = false,
    rippleX,
    rippleY,
    rippleSize,
    in: inProp,
    onExited = () => {},
    timeout
  } = props;
  const [leaving, setLeaving] = React.useState(false);
  const rippleClassName = (0, _clsx.default)(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  const rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  const childClassName = (0, _clsx.default)(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
  const handleExited = (0, _useEventCallback.default)(onExited); // Ripple is used for user feedback (e.g. click or press) so we want to apply styles with the highest priority

  (0, _useEnhancedEffect.default)(() => {
    if (!inProp) {
      // react-transition-group#onExit
      setLeaving(true); // react-transition-group#onExited

      const timeoutId = setTimeout(handleExited, timeout);
      return () => {
        clearTimeout(timeoutId);
      };
    }

    return undefined;
  }, [handleExited, inProp, timeout]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: rippleClassName,
    style: rippleStyles,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: childClassName
    })
  });
}

process.env.NODE_ENV !== "production" ? Ripple.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: _propTypes.default.object.isRequired,
  className: _propTypes.default.string,

  /**
   * @ignore - injected from TransitionGroup
   */
  in: _propTypes.default.bool,

  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: _propTypes.default.func,

  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: _propTypes.default.bool,

  /**
   * Diameter of the ripple.
   */
  rippleSize: _propTypes.default.number,

  /**
   * Horizontal position of the ripple center.
   */
  rippleX: _propTypes.default.number,

  /**
   * Vertical position of the ripple center.
   */
  rippleY: _propTypes.default.number,

  /**
   * exit delay
   */
  timeout: _propTypes.default.number.isRequired
} : void 0;
var _default = Ripple;
exports.default = _default;