import { useEffect } from 'react';
import { CustomResizeObserver } from '../lib/floating/customResizeObserver';
import { useStableCallback } from './useStableCallback';
/**
 * Хук вызывает переданный коллбэк при изменении размеров элемента.
 */ export function useResizeObserver(ref, callback) {
    const stableCallback = useStableCallback(callback);
    useEffect(function addResizeObserverHandler() {
        /* istanbul ignore if: невозможный кейс (в SSR вызова этой функции не будет) */ if (!ref || !ref.current) {
            return;
        }
        const element = ref.current;
        const observer = new CustomResizeObserver(()=>stableCallback(element));
        observer.observe(element);
        observer.appendToTheDOM();
        return ()=>observer.disconnect();
    }, [
        ref,
        stableCallback
    ]);
}

//# sourceMappingURL=useResizeObserver.js.map