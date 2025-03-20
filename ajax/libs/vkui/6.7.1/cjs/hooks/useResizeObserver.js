"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useResizeObserver", {
    enumerable: true,
    get: function() {
        return useResizeObserver;
    }
});
const _react = require("react");
const _customResizeObserver = require("../lib/floating/customResizeObserver");
const _useStableCallback = require("./useStableCallback");
function useResizeObserver(ref, callback) {
    const stableCallback = (0, _useStableCallback.useStableCallback)(callback);
    (0, _react.useEffect)(function addResizeObserverHandler() {
        /* istanbul ignore if: невозможный кейс (в SSR вызова этой функции не будет) */ if (!ref || !ref.current) {
            return;
        }
        const element = ref.current;
        const observer = new _customResizeObserver.CustomResizeObserver(()=>stableCallback(element));
        observer.observe(element);
        observer.appendToTheDOM();
        return ()=>observer.disconnect();
    }, [
        ref,
        stableCallback
    ]);
}

//# sourceMappingURL=useResizeObserver.js.map