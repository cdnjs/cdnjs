import * as React from "react";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect.js";
export function useReferenceHiddenChangeCallback(hideMiddleware, onReferenceHiddenChange) {
    const prevHiddenRef = React.useRef(hideMiddleware?.referenceHidden);
    React.useEffect(()=>{
        prevHiddenRef.current = hideMiddleware?.referenceHidden;
    });
    useIsomorphicLayoutEffect(function checkHiddenChanged() {
        if (!onReferenceHiddenChange) {
            return;
        }
        if (hideMiddleware?.referenceHidden !== prevHiddenRef.current) {
            onReferenceHiddenChange(hideMiddleware?.referenceHidden || false);
        }
    }, [
        hideMiddleware?.referenceHidden,
        onReferenceHiddenChange
    ]);
}

//# sourceMappingURL=useReferenceHiddenChangeCallback.js.map