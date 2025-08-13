import * as React from "react";
import { noop } from "@vkontakte/vkjs";
import { useDOM } from "../lib/dom.js";
export const useWaitTransitionFinish = ()=>{
    const timeoutRef = React.useRef(null);
    const { document } = useDOM();
    const detach = React.useRef(noop);
    const remove = React.useCallback(()=>{
        detach.current();
        detach.current = noop;
    }, []);
    const waitTransitionFinish = React.useCallback((element, eventHandler, durationFallback)=>{
        if (element) {
            if (!(document === null || document === void 0 ? void 0 : document.hidden)) {
                remove();
                element.addEventListener('transitionend', eventHandler);
                detach.current = ()=>{
                    element.removeEventListener('transitionend', eventHandler);
                };
            } else {
                if (timeoutRef === null || timeoutRef === void 0 ? void 0 : timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(eventHandler, durationFallback);
            }
        }
    }, [
        document,
        remove,
        timeoutRef
    ]);
    return waitTransitionFinish;
};

//# sourceMappingURL=useWaitTransitionFinish.js.map