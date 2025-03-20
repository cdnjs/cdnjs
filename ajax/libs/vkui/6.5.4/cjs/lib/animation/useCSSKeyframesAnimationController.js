"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useCSSKeyframesAnimationController", {
    enumerable: true,
    get: function() {
        return useCSSKeyframesAnimationController;
    }
});
const _react = require("react");
const _vkjs = require("@vkontakte/vkjs");
const _usePrevious = require("../../hooks/usePrevious");
const _useStableCallback = require("../../hooks/useStableCallback");
const _useIsomorphicLayoutEffect = require("../useIsomorphicLayoutEffect");
const useCSSKeyframesAnimationController = (stateProp, { onEnter: onEnterProp, onEntering, onEntered, onExit: onExitProp, onExiting, onExited } = {}, disableInitAnimation = false)=>{
    const [state, setState] = (0, _react.useState)(()=>disableInitAnimation ? stateProp === 'enter' ? 'entered' : 'exited' : stateProp);
    const prevState = (0, _usePrevious.usePrevious)(stateProp);
    const onAnimationStart = ()=>{
        if (state === 'enter') {
            setState('entering');
            if (onEntering) {
                onEntering();
            }
        } else if (state === 'exit') {
            setState('exiting');
            if (onExiting) {
                onExiting();
            }
        }
    };
    const onAnimationEnd = ()=>{
        if (state === 'entering') {
            setState('entered');
            if (onEntered) {
                onEntered();
            }
        } else if (state === 'exiting') {
            setState('exited');
            if (onExited) {
                onExited();
            }
        }
    };
    const onEnter = (0, _useStableCallback.useStableCallback)(onEnterProp || _vkjs.noop);
    const onExit = (0, _useStableCallback.useStableCallback)(onExitProp || _vkjs.noop);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function updateState() {
        if (prevState === stateProp) {
            return;
        }
        switch(stateProp){
            case 'enter':
                if (state === 'entering' || state === 'entered') {
                    break;
                }
                setState('enter');
                onEnter();
                break;
            case 'exit':
                if (state === 'exiting' || state === 'exited') {
                    break;
                }
                setState('exit');
                onExit();
                break;
        }
    }, [
        state,
        prevState,
        stateProp,
        onEnter,
        onExit
    ]);
    return [
        state,
        {
            onAnimationStart,
            onAnimationEnd
        }
    ];
};

//# sourceMappingURL=useCSSKeyframesAnimationController.js.map