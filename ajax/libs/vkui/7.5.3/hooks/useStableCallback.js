import * as React from "react";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect.js";
export function useStableCallback(fn) {
    const ref = React.useRef(fn);
    useIsomorphicLayoutEffect(()=>{
        ref.current = fn;
    });
    return React.useCallback((...args)=>(0, ref.current)(...args), []);
}

//# sourceMappingURL=useStableCallback.js.map