import * as React from 'react';
import { animate } from '../../../lib/animate';
import { cubicBezier } from '../../../lib/fx';
import { ANIMATION_DURATION } from './constants';
const TIMING_FUNCTION = cubicBezier(0.8, 1);
export function useSlideAnimation() {
    const animationQueue = React.useRef([]);
    function getAnimateFunction(drawFunction) {
        return ()=>{
            animate({
                duration: ANIMATION_DURATION,
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