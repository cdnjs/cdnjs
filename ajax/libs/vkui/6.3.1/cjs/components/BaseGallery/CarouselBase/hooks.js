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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _animate = require("../../../lib/animate");
const _fx = require("../../../lib/fx");
const _constants = require("./constants");
const TIMING_FUNCTION = (0, _fx.cubicBezier)(0.8, 1);
function useSlideAnimation() {
    const animationQueue = _react.useRef([]);
    function getAnimateFunction(drawFunction) {
        return ()=>{
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
        getAnimateFunction,
        addToAnimationQueue,
        startAnimation
    };
}

//# sourceMappingURL=hooks.js.map