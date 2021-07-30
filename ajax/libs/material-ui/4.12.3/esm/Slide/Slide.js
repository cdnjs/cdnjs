import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React from 'react';
import PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import debounce from '../utils/debounce';
import { Transition } from 'react-transition-group';
import { elementAcceptingRef } from '@material-ui/utils';
import useForkRef from '../utils/useForkRef';
import useTheme from '../styles/useTheme';
import { duration } from '../styles/transitions';
import { reflow, getTransitionProps } from '../transitions/utils'; // Translate the node so he can't be seen on the screen.
// Later, we gonna translate back the node to his original location
// with `none`.`

function getTranslateValue(direction, node) {
  var rect = node.getBoundingClientRect();
  var transform;

  if (node.fakeTransform) {
    transform = node.fakeTransform;
  } else {
    var computedStyle = window.getComputedStyle(node);
    transform = computedStyle.getPropertyValue('-webkit-transform') || computedStyle.getPropertyValue('transform');
  }

  var offsetX = 0;
  var offsetY = 0;

  if (transform && transform !== 'none' && typeof transform === 'string') {
    var transformValues = transform.split('(')[1].split(')')[0].split(',');
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }

  if (direction === 'left') {
    return "translateX(".concat(window.innerWidth, "px) translateX(").concat(offsetX - rect.left, "px)");
  }

  if (direction === 'right') {
    return "translateX(-".concat(rect.left + rect.width - offsetX, "px)");
  }

  if (direction === 'up') {
    return "translateY(".concat(window.innerHeight, "px) translateY(").concat(offsetY - rect.top, "px)");
  } // direction === 'down'


  return "translateY(-".concat(rect.top + rect.height - offsetY, "px)");
}

export function setTranslateValue(direction, node) {
  var transform = getTranslateValue(direction, node);

  if (transform) {
    node.style.webkitTransform = transform;
    node.style.transform = transform;
  }
}
var defaultTimeout = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen
};
/**
 * The Slide transition is used by the [Drawer](/components/drawers/) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */

var Slide = /*#__PURE__*/React.forwardRef(function Slide(props, ref) {
  var children = props.children,
      _props$direction = props.direction,
      direction = _props$direction === void 0 ? 'down' : _props$direction,
      inProp = props.in,
      onEnter = props.onEnter,
      onEntered = props.onEntered,
      onEntering = props.onEntering,
      onExit = props.onExit,
      onExited = props.onExited,
      onExiting = props.onExiting,
      style = props.style,
      _props$timeout = props.timeout,
      timeout = _props$timeout === void 0 ? defaultTimeout : _props$timeout,
      _props$TransitionComp = props.TransitionComponent,
      TransitionComponent = _props$TransitionComp === void 0 ? Transition : _props$TransitionComp,
      other = _objectWithoutProperties(props, ["children", "direction", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"]);

  var theme = useTheme();
  var childrenRef = React.useRef(null);
  /**
   * used in cloneElement(children, { ref: handleRef })
   */

  var handleOwnRef = React.useCallback(function (instance) {
    // #StrictMode ready
    childrenRef.current = ReactDOM.findDOMNode(instance);
  }, []);
  var handleRefIntermediary = useForkRef(children.ref, handleOwnRef);
  var handleRef = useForkRef(handleRefIntermediary, ref);

  var normalizedTransitionCallback = function normalizedTransitionCallback(callback) {
    return function (isAppearing) {
      if (callback) {
        // onEnterXxx and onExitXxx callbacks have a different arguments.length value.
        if (isAppearing === undefined) {
          callback(childrenRef.current);
        } else {
          callback(childrenRef.current, isAppearing);
        }
      }
    };
  };

  var handleEnter = normalizedTransitionCallback(function (node, isAppearing) {
    setTranslateValue(direction, node);
    reflow(node);

    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  var handleEntering = normalizedTransitionCallback(function (node, isAppearing) {
    var transitionProps = getTransitionProps({
      timeout: timeout,
      style: style
    }, {
      mode: 'enter'
    });
    node.style.webkitTransition = theme.transitions.create('-webkit-transform', _extends({}, transitionProps, {
      easing: theme.transitions.easing.easeOut
    }));
    node.style.transition = theme.transitions.create('transform', _extends({}, transitionProps, {
      easing: theme.transitions.easing.easeOut
    }));
    node.style.webkitTransform = 'none';
    node.style.transform = 'none';

    if (onEntering) {
      onEntering(node, isAppearing);
    }
  });
  var handleEntered = normalizedTransitionCallback(onEntered);
  var handleExiting = normalizedTransitionCallback(onExiting);
  var handleExit = normalizedTransitionCallback(function (node) {
    var transitionProps = getTransitionProps({
      timeout: timeout,
      style: style
    }, {
      mode: 'exit'
    });
    node.style.webkitTransition = theme.transitions.create('-webkit-transform', _extends({}, transitionProps, {
      easing: theme.transitions.easing.sharp
    }));
    node.style.transition = theme.transitions.create('transform', _extends({}, transitionProps, {
      easing: theme.transitions.easing.sharp
    }));
    setTranslateValue(direction, node);

    if (onExit) {
      onExit(node);
    }
  });
  var handleExited = normalizedTransitionCallback(function (node) {
    // No need for transitions when the component is hidden
    node.style.webkitTransition = '';
    node.style.transition = '';

    if (onExited) {
      onExited(node);
    }
  });
  var updatePosition = React.useCallback(function () {
    if (childrenRef.current) {
      setTranslateValue(direction, childrenRef.current);
    }
  }, [direction]);
  React.useEffect(function () {
    // Skip configuration where the position is screen size invariant.
    if (inProp || direction === 'down' || direction === 'right') {
      return undefined;
    }

    var handleResize = debounce(function () {
      if (childrenRef.current) {
        setTranslateValue(direction, childrenRef.current);
      }
    });
    window.addEventListener('resize', handleResize);
    return function () {
      handleResize.clear();
      window.removeEventListener('resize', handleResize);
    };
  }, [direction, inProp]);
  React.useEffect(function () {
    if (!inProp) {
      // We need to update the position of the drawer when the direction change and
      // when it's hidden.
      updatePosition();
    }
  }, [inProp, updatePosition]);
  return /*#__PURE__*/React.createElement(TransitionComponent, _extends({
    nodeRef: childrenRef,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    appear: true,
    in: inProp,
    timeout: timeout
  }, other), function (state, childProps) {
    return /*#__PURE__*/React.cloneElement(children, _extends({
      ref: handleRef,
      style: _extends({
        visibility: state === 'exited' && !inProp ? 'hidden' : undefined
      }, style, children.props.style)
    }, childProps));
  });
});
process.env.NODE_ENV !== "production" ? Slide.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * A single child content element.
   */
  children: elementAcceptingRef,

  /**
   * Direction the child node will enter from.
   */
  direction: PropTypes.oneOf(['down', 'left', 'right', 'up']),

  /**
   * If `true`, show the component; triggers the enter or exit animation.
   */
  in: PropTypes.bool,

  /**
   * @ignore
   */
  onEnter: PropTypes.func,

  /**
   * @ignore
   */
  onEntered: PropTypes.func,

  /**
   * @ignore
   */
  onEntering: PropTypes.func,

  /**
   * @ignore
   */
  onExit: PropTypes.func,

  /**
   * @ignore
   */
  onExited: PropTypes.func,

  /**
   * @ignore
   */
  onExiting: PropTypes.func,

  /**
   * @ignore
   */
  style: PropTypes.object,

  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  timeout: PropTypes.oneOfType([PropTypes.number, PropTypes.shape({
    appear: PropTypes.number,
    enter: PropTypes.number,
    exit: PropTypes.number
  })])
} : void 0;
export default Slide;