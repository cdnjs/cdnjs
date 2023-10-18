import * as React from 'react';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
export function useAutoFocus(ref, autoFocus) {
    useIsomorphicLayoutEffect(()=>{
        if (!autoFocus || !ref.current) {
            return;
        }
        ref.current.focus();
    }, []);
}

//# sourceMappingURL=useAutoFocus.js.map