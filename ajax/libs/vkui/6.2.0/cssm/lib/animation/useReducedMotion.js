/* eslint-disable no-restricted-properties */ import * as React from 'react';
import { useDOM } from '../dom';
import { matchMediaListAddListener, matchMediaListRemoveListener } from '../matchMedia';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';
export const REDUCE_MOTION_MEDIA_QUERY = 'screen and (prefers-reduced-motion: reduce)';
export const useReducedMotion = ()=>{
    const { window } = useDOM();
    const initial = React.useMemo(()=>window ? window.matchMedia(REDUCE_MOTION_MEDIA_QUERY).matches : /* istanbul ignore next: на текущий момент, покрытие данного кейса неинтересно  */ false, [
        window
    ]);
    const reducedMotion = React.useRef(initial);
    useIsomorphicLayoutEffect(()=>{
        /* istanbul ignore if: невозможный кейс (в SSR вызова этой функции не будет) */ if (!window) {
            return;
        }
        const match = window.matchMedia(REDUCE_MOTION_MEDIA_QUERY);
        reducedMotion.current = match.matches;
        /* istanbul ignore next: на текущий момент, покрытие данного кейса неинтересно  */ const handleMediaQueryChange = (event)=>{
            /* istanbul ignore next */ reducedMotion.current = event.matches;
        };
        matchMediaListAddListener(match, handleMediaQueryChange);
        return ()=>matchMediaListRemoveListener(match, handleMediaQueryChange);
    }, [
        window
    ]);
    return reducedMotion.current;
};

//# sourceMappingURL=useReducedMotion.js.map