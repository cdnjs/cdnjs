import * as React from 'react';
import { isElement, useDOM } from '../lib/dom';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
/**
 * Завязывается на document.
 *
 * @private
 */ export const useGlobalOnClickOutside = (callback, ...refs)=>{
    const { document } = useDOM();
    useIsomorphicLayoutEffect(()=>{
        const someRefNotNull = refs.some((ref)=>ref && ref.current !== null);
        if (!document || !someRefNotNull) {
            return;
        }
        const handleClick = (event)=>{
            const targetEl = event.target;
            const someRefHasTargetEl = isElement(targetEl) && refs.some((ref)=>ref && ref.current && ref.current.contains(targetEl));
            if (!someRefHasTargetEl) {
                callback(event);
            }
        };
        document.addEventListener('click', handleClick, {
            passive: true,
            capture: true
        });
        return ()=>{
            document.removeEventListener('click', handleClick, true);
        };
    }, [
        document,
        callback,
        ...refs
    ]);
};

//# sourceMappingURL=useGlobalOnClickOutside.js.map