import { useEffect } from "react";
import { useDOM } from "../lib/dom.js";
import { CustomResizeObserver } from "../lib/floating/customResizeObserver.js";
import { isRefObject } from "../lib/isRefObject.js";
import { useStableCallback } from "./useStableCallback.js";
/**
 * Хук вызывает переданный коллбэк при изменении размеров элемента.
 */ export function useResizeObserver(ref, callback) {
    const stableCallback = useStableCallback(callback);
    const { window } = useDOM();
    useEffect(function addResizeObserverHandler() {
        if (!ref || !window) {
            return;
        }
        if (ref === window) {
            const onResize = ()=>stableCallback(ref);
            ref.addEventListener('resize', onResize);
            return ()=>ref.removeEventListener('resize', onResize);
        }
        /* istanbul ignore if: невозможный кейс (в SSR вызова этой функции не будет) */ if (!isRefObject(ref) || !ref.current) {
            return;
        }
        const element = ref.current;
        const canUseResizeObserver = 'ResizeObserver' in window && window.ResizeObserver !== undefined;
        const observeFn = ()=>stableCallback(element);
        const observer = canUseResizeObserver ? new ResizeObserver(observeFn) : new CustomResizeObserver(observeFn);
        observer.observe(element);
        if (observer instanceof CustomResizeObserver) {
            observer.appendToTheDOM();
        }
        return ()=>observer.disconnect();
    }, [
        ref,
        stableCallback,
        window
    ]);
}

//# sourceMappingURL=useResizeObserver.js.map