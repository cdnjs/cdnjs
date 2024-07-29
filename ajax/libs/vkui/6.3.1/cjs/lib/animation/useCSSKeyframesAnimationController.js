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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useStableCallback = require("../../hooks/useStableCallback");
const _useIsomorphicLayoutEffect = require("../useIsomorphicLayoutEffect");
const useCSSKeyframesAnimationController = (stateProp, { onEnter: onEnterProp = _vkjs.noop, onEntering: onEnteringProp = _vkjs.noop, onEntered: onEnteredProp = _vkjs.noop, onExit: onExitProp = _vkjs.noop, onExiting: onExitingProp = _vkjs.noop, onExited: onExitedProp = _vkjs.noop } = {}, disableInitAnimation = false)=>{
    const isFirstInitRef = _react.useRef(disableInitAnimation);
    const [state, setState] = _react.useState(stateProp);
    const [willBeEnter, setWillBeEnter] = _react.useState(stateProp === 'enter');
    const [willBeExit, setWillBeExit] = _react.useState(stateProp === 'exit');
    const onEnter = (0, _useStableCallback.useStableCallback)(onEnterProp);
    const onEntering = (0, _useStableCallback.useStableCallback)(onEnteringProp);
    const onEntered = (0, _useStableCallback.useStableCallback)(onEnteredProp);
    const onExit = (0, _useStableCallback.useStableCallback)(onExitProp);
    const onExiting = (0, _useStableCallback.useStableCallback)(onExitingProp);
    const onExited = (0, _useStableCallback.useStableCallback)(onExitedProp);
    const entered = _react.useCallback(()=>{
        setState('entered');
        setWillBeEnter(false);
        onEntered();
    }, [
        onEntered
    ]);
    const exited = _react.useCallback(()=>{
        setState('exited');
        setWillBeExit(false);
        onExited();
    }, [
        onExited
    ]);
    const onAnimationStart = ()=>{
        if (state === 'enter' && willBeEnter) {
            setState('entering');
            onEntering();
        } else if (state === 'exit' && willBeExit) {
            setState('exiting');
            onExiting();
        }
    };
    const onAnimationEnd = ()=>{
        if (state === 'entering' && willBeEnter) {
            entered();
        } else if (state === 'exiting' && willBeExit) {
            exited();
        }
    };
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function updateState() {
        switch(stateProp){
            case 'enter':
                if (isFirstInitRef.current && state === 'enter') {
                    entered();
                    break;
                }
                if (willBeEnter || state === 'entering' || state === 'entered') {
                    break;
                }
                setState('enter');
                setWillBeEnter(true);
                onEnter();
                break;
            case 'exit':
                if (isFirstInitRef.current && state === 'exit') {
                    exited();
                    break;
                }
                if (willBeExit || state === 'exiting' || state === 'exited') {
                    break;
                }
                setState('exit');
                setWillBeExit(true);
                onExit();
                break;
        }
        isFirstInitRef.current = false;
    }, [
        state,
        stateProp,
        willBeEnter,
        willBeExit,
        entered,
        exited,
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