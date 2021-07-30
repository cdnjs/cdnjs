import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useEventCallback from '../utils/useEventCallback';
var useEnhancedEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
/**
 * @ignore - internal component.
 */

function Ripple(props) {
  var classes = props.classes,
      _props$pulsate = props.pulsate,
      pulsate = _props$pulsate === void 0 ? false : _props$pulsate,
      rippleX = props.rippleX,
      rippleY = props.rippleY,
      rippleSize = props.rippleSize,
      inProp = props.in,
      _props$onExited = props.onExited,
      onExited = _props$onExited === void 0 ? function () {} : _props$onExited,
      timeout = props.timeout;

  var _React$useState = React.useState(false),
      leaving = _React$useState[0],
      setLeaving = _React$useState[1];

  var rippleClassName = clsx(classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
  var rippleStyles = {
    width: rippleSize,
    height: rippleSize,
    top: -(rippleSize / 2) + rippleY,
    left: -(rippleSize / 2) + rippleX
  };
  var childClassName = clsx(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
  var handleExited = useEventCallback(onExited); // Ripple is used for user feedback (e.g. click or press) so we want to apply styles with the highest priority

  useEnhancedEffect(function () {
    if (!inProp) {
      // react-transition-group#onExit
      setLeaving(true); // react-transition-group#onExited

      var timeoutId = setTimeout(handleExited, timeout);
      return function () {
        clearTimeout(timeoutId);
      };
    }

    return undefined;
  }, [handleExited, inProp, timeout]);
  return /*#__PURE__*/React.createElement("span", {
    className: rippleClassName,
    style: rippleStyles
  }, /*#__PURE__*/React.createElement("span", {
    className: childClassName
  }));
}

process.env.NODE_ENV !== "production" ? Ripple.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,

  /**
   * @ignore - injected from TransitionGroup
   */
  in: PropTypes.bool,

  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: PropTypes.func,

  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: PropTypes.bool,

  /**
   * Diameter of the ripple.
   */
  rippleSize: PropTypes.number,

  /**
   * Horizontal position of the ripple center.
   */
  rippleX: PropTypes.number,

  /**
   * Vertical position of the ripple center.
   */
  rippleY: PropTypes.number,

  /**
   * exit delay
   */
  timeout: PropTypes.number.isRequired
} : void 0;
export default Ripple;