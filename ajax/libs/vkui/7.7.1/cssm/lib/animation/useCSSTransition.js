import { useRef, useState } from "react";
import { noop } from "@vkontakte/vkjs";
import { useStableCallback } from "../../hooks/useStableCallback.js";
import { millisecondsInSecond } from "../date.js";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect.js";
/* istanbul ignore next: особенность рендера в браузере когда меняется className, в Jest не воспроизвести */ const forceReflowForFixNewMountedElement = (node)=>void node?.scrollTop;
const TRANSITION_FALLBACK_DELAY = 100;
/**
 * Хук основан на компоненте `CSSTransition` из библиотеки `react-transition-group`.
 *
 * @link https://reactcommunity.org/react-transition-group/css-transition
 *
 * @private
 */ export const useCSSTransition = (inProp, { enableAppear = false, enableEnter = true, enableExit = true, onEnter: onEnterProp, onEntering: onEnteringProp, onEntered: onEnteredProp, onExit: onExitProp, onExiting: onExitingProp, onExited: onExitedProp } = {})=>{
    const onEnter = useStableCallback(onEnterProp || noop);
    const onEntering = useStableCallback(onEnteringProp || noop);
    const onEntered = useStableCallback(onEnteredProp || noop);
    const onExit = useStableCallback(onExitProp || noop);
    const onExiting = useStableCallback(onExitingProp || noop);
    const onExited = useStableCallback(onExitedProp || noop);
    const timerRef = useRef(null);
    const ref = useRef(null);
    const [state, setState] = useState(()=>{
        if (!inProp) {
            return 'exited';
        }
        if (enableAppear) {
            onEnter(true);
            return 'appear';
        }
        return 'entered';
    });
    const clearTimer = ()=>{
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };
    useIsomorphicLayoutEffect(function updateState() {
        if (inProp) {
            switch(state){
                case 'appear':
                    forceReflowForFixNewMountedElement(ref.current);
                    setState('appearing');
                    onEntering(true);
                    break;
                case 'enter':
                    forceReflowForFixNewMountedElement(ref.current);
                    setState('entering');
                    onEntering();
                    break;
                case 'exiting':
                    if (enableEnter) {
                        setState('entering');
                        onEntering();
                        break;
                    }
                    setState('entered');
                    onEntered();
                    break;
                case 'exited':
                    if (enableEnter) {
                        setState('enter');
                        onEnter();
                        break;
                    }
                    setState('entered');
                    onEntered();
                    break;
            }
        } else {
            switch(state){
                case 'exit':
                    forceReflowForFixNewMountedElement(ref.current);
                    setState('exiting');
                    onExiting();
                    break;
                case 'appearing':
                case 'entering':
                    if (enableExit) {
                        setState('exiting');
                        onExiting();
                        break;
                    }
                    setState('exited');
                    onExited();
                    break;
                case 'appeared':
                case 'entered':
                    if (enableExit) {
                        setState('exit');
                        onExit();
                        break;
                    }
                    setState('exited');
                    onExited();
                    break;
            }
        }
    }, [
        inProp,
        state,
        enableAppear,
        enableEnter,
        onEnter,
        onEntering,
        onEntered,
        enableExit,
        onExit,
        onExiting,
        onExited
    ]);
    const completeTransition = useStableCallback((event)=>{
        clearTimer();
        switch(state){
            case 'appearing':
                setState('appeared');
                onEntered(event?.propertyName, true);
                break;
            case 'entering':
                setState('entered');
                onEntered(event?.propertyName);
                break;
            case 'exiting':
                setState('exited');
                onExited(event?.propertyName);
                break;
        }
    });
    useIsomorphicLayoutEffect(function scheduleTransitionCompletionFallback() {
        const el = ref.current;
        if (!el) {
            return;
        }
        if (state === 'appearing' || state === 'entering' || state === 'exiting') {
            const style = getComputedStyle(el);
            const parseTime = (s)=>s.includes('ms') ? parseFloat(s) : parseFloat(s) * millisecondsInSecond;
            const duration = Math.max(...style.transitionDuration.split(',').map(parseTime)) + Math.max(...style.transitionDelay.split(',').map(parseTime));
            if (duration <= 0) {
                completeTransition();
                return;
            }
            // fallback если onTransitionEnd не пришёл
            // TRANSITION_FALLBACK_DELAY, чтобы минимизировать вероятность,
            // что setTimeout сработает раньше onTransitionEnd
            timerRef.current = setTimeout(completeTransition, duration + TRANSITION_FALLBACK_DELAY);
            return clearTimer;
        }
        return;
    }, [
        completeTransition,
        state
    ]);
    return [
        state,
        {
            ref,
            onTransitionEnd: state !== 'appeared' && state !== 'entered' && state !== 'exited' ? completeTransition : undefined
        }
    ];
};

//# sourceMappingURL=useCSSTransition.js.map