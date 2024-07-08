"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useGlobalEscKeyDown", {
    enumerable: true,
    get: function() {
        return useGlobalEscKeyDown;
    }
});
const _accessibility = require("../lib/accessibility");
const _dom = require("../lib/dom");
const _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
const EVENT_OPTIONS = {
    passive: true,
    capture: true
};
const useGlobalEscKeyDown = (init, callback)=>{
    const { document } = (0, _dom.useDOM)();
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        if (!document || !init || !callback) {
            return;
        }
        const handleKeyDown = (event)=>{
            if ((0, _accessibility.pressedKey)(event) === _accessibility.Keys.ESCAPE) {
                callback(event);
            }
        };
        document.addEventListener('keydown', handleKeyDown, EVENT_OPTIONS);
        return ()=>{
            document.removeEventListener('keydown', handleKeyDown, EVENT_OPTIONS);
        };
    }, [
        init,
        document,
        callback
    ]);
};

//# sourceMappingURL=useGlobalEscKeyDown.js.map