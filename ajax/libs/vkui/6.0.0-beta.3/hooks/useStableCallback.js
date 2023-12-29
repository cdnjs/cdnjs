import * as React from 'react';
import { useIsomorphicLayoutEffect } from '../lib/useIsomorphicLayoutEffect';
export function useStableCallback(fn) {
    const ref = React.useRef(fn);
    useIsomorphicLayoutEffect(()=>{
        ref.current = fn;
    });
    return React.useRef((...args)=>(0, ref.current)(...args)).current;
}

//# sourceMappingURL=useStableCallback.js.map