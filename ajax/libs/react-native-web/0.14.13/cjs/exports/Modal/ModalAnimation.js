"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _StyleSheet = _interopRequireDefault(require("../StyleSheet"));

var _createElement = _interopRequireDefault(require("../createElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) Nicolas Gallagher.
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */
var ANIMATION_DURATION = 300;

function getAnimationStyle(animationType, visible) {
  if (animationType === 'slide') {
    return visible ? animatedSlideInStyles : animatedSlideOutStyles;
  }

  if (animationType === 'fade') {
    return visible ? animatedFadeInStyles : animatedFadeOutStyles;
  }

  return visible ? styles.container : styles.hidden;
}

function ModalAnimation(props) {
  var animationType = props.animationType,
      children = props.children,
      onDismiss = props.onDismiss,
      onShow = props.onShow,
      visible = props.visible;

  var _useState = (0, _react.useState)(false),
      isRendering = _useState[0],
      setIsRendering = _useState[1];

  var wasVisible = (0, _react.useRef)(false);
  var isAnimated = animationType && animationType !== 'none';
  var animationEndCallback = (0, _react.useCallback)(function (e) {
    if (e && e.currentTarget !== e.target) {
      // If the event was generated for something NOT this element we
      // should ignore it as it's not relevant to us
      return;
    }

    if (visible) {
      if (onShow) {
        onShow();
      }
    } else {
      setIsRendering(false);

      if (onDismiss) {
        onDismiss();
      }
    }
  }, [onDismiss, onShow, visible]);
  (0, _react.useEffect)(function () {
    if (visible) {
      setIsRendering(true);
    }

    if (visible !== wasVisible.current && !isAnimated) {
      // Manually call `animationEndCallback` if no animation is used
      animationEndCallback();
    }

    wasVisible.current = visible;
  }, [isAnimated, visible, animationEndCallback]);
  return isRendering || visible ? (0, _createElement.default)('div', {
    style: isRendering ? getAnimationStyle(animationType, visible) : styles.hidden,
    onAnimationEnd: animationEndCallback,
    children: children
  }) : null;
}

var styles = _StyleSheet.default.create({
  container: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 9999
  },
  animatedIn: {
    animationDuration: ANIMATION_DURATION + "ms",
    animationTimingFunction: 'ease-in'
  },
  animatedOut: {
    pointerEvents: 'none',
    animationDuration: ANIMATION_DURATION + "ms",
    animationTimingFunction: 'ease-out'
  },
  fadeIn: {
    opacity: 1,
    animationKeyframes: {
      '0%': {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    }
  },
  fadeOut: {
    opacity: 0,
    animationKeyframes: {
      '0%': {
        opacity: 1
      },
      '100%': {
        opacity: 0
      }
    }
  },
  slideIn: {
    transform: [{
      translateY: '0%'
    }],
    animationKeyframes: {
      '0%': {
        transform: [{
          translateY: '100%'
        }]
      },
      '100%': {
        transform: [{
          translateY: '0%'
        }]
      }
    }
  },
  slideOut: {
    transform: [{
      translateY: '100%'
    }],
    animationKeyframes: {
      '0%': {
        transform: [{
          translateY: '0%'
        }]
      },
      '100%': {
        transform: [{
          translateY: '100%'
        }]
      }
    }
  },
  hidden: {
    opacity: 0
  }
});

var animatedSlideInStyles = [styles.container, styles.animatedIn, styles.slideIn];
var animatedSlideOutStyles = [styles.container, styles.animatedOut, styles.slideOut];
var animatedFadeInStyles = [styles.container, styles.animatedIn, styles.fadeIn];
var animatedFadeOutStyles = [styles.container, styles.animatedOut, styles.fadeOut];
var _default = ModalAnimation;
exports.default = _default;
module.exports = exports.default;