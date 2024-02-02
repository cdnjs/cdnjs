"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useSlideAnimation", {
    enumerable: true,
    get: function() {
        return useSlideAnimation;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _animate = require("../../../lib/animate");
var _fx = require("../../../lib/fx");
var _constants = require("./constants");
var TIMING_FUNCTION = (0, _fx.cubicBezier)(0.8, 1);
function useSlideAnimation() {
    var animationQueue = _react.useRef([]);
    function getAnimateFunction(drawFunction) {
        return function() {
            (0, _animate.animate)({
                duration: _constants.ANIMATION_DURATION,
                timing: TIMING_FUNCTION,
                animationQueue: animationQueue.current,
                draw: drawFunction
            });
        };
    }
    function addToAnimationQueue(func) {
        animationQueue.current.push(func);
    }
    function startAnimation() {
        if (animationQueue.current.length === 1) {
            animationQueue.current[0]();
        }
    }
    return {
        getAnimateFunction: getAnimateFunction,
        addToAnimationQueue: addToAnimationQueue,
        startAnimation: startAnimation
    };
}

//# sourceMappingURL=hooks.js.map