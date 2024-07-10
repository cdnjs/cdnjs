"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DISABLE_KEYBOARD_INPUT_EVENT_NAME: function() {
        return DISABLE_KEYBOARD_INPUT_EVENT_NAME;
    },
    ENABLE_KEYBOARD_INPUT_EVENT_NAME: function() {
        return ENABLE_KEYBOARD_INPUT_EVENT_NAME;
    },
    useKeyboardInputTracker: function() {
        return useKeyboardInputTracker;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _accessibility = require("../lib/accessibility");
const _dom = require("../lib/dom");
const _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
const ENABLE_KEYBOARD_INPUT_EVENT_NAME = 'enableKeyboardInput';
const DISABLE_KEYBOARD_INPUT_EVENT_NAME = 'disableKeyboardInput';
const EVENT_OPTIONS = {
    passive: true,
    capture: true
};
function useKeyboardInputTracker() {
    const { document } = (0, _dom.useDOM)();
    const keyboardFocusingStartedRef = _react.useRef(false);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(()=>{
        /* istanbul ignore if: невозможный кейс, т.к. в SSR эффекты не вызываются. Проверка на будущее, если вдруг эффект будет вызываться. */ if (!document) {
            return;
        }
        const handleKeydown = (event)=>{
            if ((0, _accessibility.isKeyboardFocusingStarted)(event)) {
                keyboardFocusingStartedRef.current = true;
            }
        };
        const handleCustomEnableKeyboardEvent = ()=>{
            keyboardFocusingStartedRef.current = true;
        };
        const handleCustomDisableKeyboardEvent = ()=>{
            keyboardFocusingStartedRef.current = false;
        };
        document.addEventListener('keydown', handleKeydown, EVENT_OPTIONS);
        document.addEventListener(ENABLE_KEYBOARD_INPUT_EVENT_NAME, handleCustomEnableKeyboardEvent, EVENT_OPTIONS); // prettier-ignore
        document.addEventListener(DISABLE_KEYBOARD_INPUT_EVENT_NAME, handleCustomDisableKeyboardEvent, EVENT_OPTIONS); // prettier-ignore
        document.addEventListener('mousedown', handleCustomDisableKeyboardEvent, EVENT_OPTIONS);
        document.addEventListener('touchstart', handleCustomDisableKeyboardEvent, EVENT_OPTIONS);
        return ()=>{
            document.removeEventListener('keydown', handleKeydown, EVENT_OPTIONS);
            document.removeEventListener(ENABLE_KEYBOARD_INPUT_EVENT_NAME, handleCustomEnableKeyboardEvent, EVENT_OPTIONS); // prettier-ignore
            document.removeEventListener(DISABLE_KEYBOARD_INPUT_EVENT_NAME, handleCustomDisableKeyboardEvent, EVENT_OPTIONS); // prettier-ignore
            document.removeEventListener('mousedown', handleCustomDisableKeyboardEvent, EVENT_OPTIONS);
            document.removeEventListener('touchstart', handleCustomDisableKeyboardEvent, EVENT_OPTIONS);
        };
    }, [
        document
    ]);
    return keyboardFocusingStartedRef;
}

//# sourceMappingURL=useKeyboardInputTracker.js.map