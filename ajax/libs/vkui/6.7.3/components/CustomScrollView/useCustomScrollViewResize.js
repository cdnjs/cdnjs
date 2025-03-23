import { useEventListener } from '../../hooks/useEventListener';
import { useResizeObserver } from '../../hooks/useResizeObserver';
import { useStableCallback } from '../../hooks/useStableCallback';
import { useDOM } from '../../lib/dom';
import { useIsomorphicLayoutEffect } from '../../lib/useIsomorphicLayoutEffect';
export const useCustomScrollViewResize = ({ windowResize, onResize, boxContentRef })=>{
    const { window } = useDOM();
    const resizeCb = useStableCallback(onResize);
    const resizeHandler = useEventListener('resize', resizeCb);
    useIsomorphicLayoutEffect(()=>{
        if (windowResize && window) {
            resizeHandler.add(window);
        }
    }, [
        windowResize,
        window
    ]);
    useResizeObserver(boxContentRef, resizeCb);
    useIsomorphicLayoutEffect(resizeCb, []);
};

//# sourceMappingURL=useCustomScrollViewResize.js.map