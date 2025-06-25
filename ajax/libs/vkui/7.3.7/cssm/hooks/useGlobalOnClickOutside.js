import { isElement, useDOM } from "../lib/dom.js";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect.js";
export const useGlobalOnEventOutside = (event, callback, ...refs)=>{
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
        document.addEventListener(event, handleClick, {
            passive: true,
            capture: true
        });
        return ()=>{
            document.removeEventListener(event, handleClick, true);
        };
    }, [
        document,
        callback,
        ...refs
    ]);
};
/**
 * Завязывается на document.
 *
 * @private
 */ export const useGlobalOnClickOutside = (callback, ...refs)=>{
    useGlobalOnEventOutside('click', callback, ...refs);
};

//# sourceMappingURL=useGlobalOnClickOutside.js.map