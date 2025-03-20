import { useEventListener } from "../../hooks/useEventListener.js";
import { useResizeObserver } from "../../hooks/useResizeObserver.js";
import { useStableCallback } from "../../hooks/useStableCallback.js";
import { useDOM } from "../../lib/dom.js";
import { useIsomorphicLayoutEffect } from "../../lib/useIsomorphicLayoutEffect.js";
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