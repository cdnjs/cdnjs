"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useAutoPlay", {
    enumerable: true,
    get: function() {
        return useAutoPlay;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _useStableCallback = require("../../hooks/useStableCallback");
const _dom = require("../../lib/dom");
function useAutoPlay({ timeout, slideIndex, onNext }) {
    const { document } = (0, _dom.useDOM)();
    const [paused, setPaused] = _react.useState(false);
    const timeoutRef = _react.useRef(null);
    const callbackFn = (0, _useStableCallback.useStableCallback)(onNext);
    const pause = _react.useCallback(()=>setPaused(true), []);
    const resume = _react.useCallback(()=>setPaused(false), []);
    // Выносим функции очистки и старта таймера в отдельные функции
    const clearAutoPlayTimeout = _react.useCallback(()=>{
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);
    const startAutoPlayTimeout = _react.useCallback(()=>{
        if (!document || !timeout || paused) {
            return;
        }
        if (document.visibilityState === 'visible') {
            clearAutoPlayTimeout();
            timeoutRef.current = setTimeout(callbackFn, timeout);
        } else {
            clearAutoPlayTimeout();
        }
    }, [
        document,
        timeout,
        paused,
        clearAutoPlayTimeout,
        callbackFn
    ]);
    // Основной эффект для управления автопроигрыванием
    _react.useEffect(function initializeAutoPlay() {
        if (!document || !timeout || paused) {
            return;
        }
        startAutoPlayTimeout();
        document.addEventListener('visibilitychange', startAutoPlayTimeout);
        return ()=>{
            clearAutoPlayTimeout();
            document.removeEventListener('visibilitychange', startAutoPlayTimeout);
        };
    }, [
        document,
        timeout,
        slideIndex,
        startAutoPlayTimeout,
        clearAutoPlayTimeout,
        paused
    ]);
    return {
        resume,
        pause
    };
}

//# sourceMappingURL=hooks.js.map