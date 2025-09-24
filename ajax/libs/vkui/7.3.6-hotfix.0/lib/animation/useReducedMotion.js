/* eslint-disable no-restricted-properties */ import * as React from "react";
import { useDOM } from "../dom.js";
import { matchMediaListAddListener, matchMediaListRemoveListener } from "../matchMedia.js";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect.js";
export const REDUCE_MOTION_MEDIA_QUERY = 'screen and (prefers-reduced-motion: reduce)';
export const useReducedMotion = ()=>{
    const { window } = useDOM();
    const [reducedMotion, setReducedMotion] = React.useState(()=>undefined);
    useIsomorphicLayoutEffect(()=>{
        /* istanbul ignore if: невозможный кейс (в SSR вызова этой функции не будет) */ if (!window) {
            return;
        }
        const match = window.matchMedia(REDUCE_MOTION_MEDIA_QUERY);
        setReducedMotion(match.matches);
        /* istanbul ignore next: на текущий момент, покрытие данного кейса неинтересно  */ const handleMediaQueryChange = (event)=>{
            /* istanbul ignore next */ setReducedMotion(event.matches);
        };
        matchMediaListAddListener(match, handleMediaQueryChange);
        return ()=>matchMediaListRemoveListener(match, handleMediaQueryChange);
    }, [
        window
    ]);
    return reducedMotion;
};

//# sourceMappingURL=useReducedMotion.js.map