"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useCustomScrollViewResize", {
    enumerable: true,
    get: function() {
        return useCustomScrollViewResize;
    }
});
const _useEventListener = require("../../hooks/useEventListener");
const _useResizeObserver = require("../../hooks/useResizeObserver");
const _useStableCallback = require("../../hooks/useStableCallback");
const _dom = require("../../lib/dom");
const _useIsomorphicLayoutEffect = require("../../lib/useIsomorphicLayoutEffect");
const useCustomScrollViewResize = ({ windowResize, onResize, boxContentRef })=>{
    const { window } = (0, _dom.useDOM)();
    const resizeCb = (0, _useStableCallback.useStableCallback)(onResize);
    const resizeHandler = (0, _useEventListener.useEventListener)('resize', resizeCb);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (windowResize && window) {
            resizeHandler.add(window);
        }
    }, [
        windowResize,
        window
    ]);
    (0, _useResizeObserver.useResizeObserver)(boxContentRef, resizeCb);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(resizeCb, []);
};

//# sourceMappingURL=useCustomScrollViewResize.js.map