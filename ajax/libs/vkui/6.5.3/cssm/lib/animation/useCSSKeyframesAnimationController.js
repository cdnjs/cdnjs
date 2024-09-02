import { useState } from 'react';
import { noop } from '@vkontakte/vkjs';
import { usePrevious } from '../../hooks/usePrevious';
import { useStableCallback } from '../../hooks/useStableCallback';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
export const useCSSKeyframesAnimationController = (stateProp, { onEnter: onEnterProp, onEntering, onEntered, onExit: onExitProp, onExiting, onExited } = {}, disableInitAnimation = false)=>{
    const [state, setState] = useState(()=>disableInitAnimation ? stateProp === 'enter' ? 'entered' : 'exited' : stateProp);
    const prevState = usePrevious(stateProp);
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
    const onEnter = useStableCallback(onEnterProp || noop);
    const onExit = useStableCallback(onExitProp || noop);
    useIsomorphicLayoutEffect(function updateState() {
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