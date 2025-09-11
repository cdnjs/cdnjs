import * as React from "react";
import { useIsomorphicLayoutEffect } from "../useIsomorphicLayoutEffect.js";
export function useReferenceHiddenChangeCallback(hideMiddleware, onReferenceHiddenChange) {
    const prevHiddenRef = React.useRef(hideMiddleware === null || hideMiddleware === void 0 ? void 0 : hideMiddleware.referenceHidden);
    React.useEffect(()=>{
        prevHiddenRef.current = hideMiddleware === null || hideMiddleware === void 0 ? void 0 : hideMiddleware.referenceHidden;
    });
    useIsomorphicLayoutEffect(function checkHiddenChanged() {
        if (!onReferenceHiddenChange) {
            return;
        }
        if ((hideMiddleware === null || hideMiddleware === void 0 ? void 0 : hideMiddleware.referenceHidden) !== prevHiddenRef.current) {
            onReferenceHiddenChange((hideMiddleware === null || hideMiddleware === void 0 ? void 0 : hideMiddleware.referenceHidden) || false);
        }
    }, [
        hideMiddleware === null || hideMiddleware === void 0 ? void 0 : hideMiddleware.referenceHidden,
        onReferenceHiddenChange
    ]);
}

//# sourceMappingURL=useReferenceHiddenChangeCallback.js.map