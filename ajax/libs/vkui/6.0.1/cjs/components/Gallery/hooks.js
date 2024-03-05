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
const _useTimeout = require("../../hooks/useTimeout");
const _dom = require("../../lib/dom");
function useAutoPlay(timeout, slideIndex, callbackFn) {
    const { clear: clearAutoPlay, set: setAutoPlay } = (0, _useTimeout.useTimeout)(callbackFn, timeout);
    const { document } = (0, _dom.useDOM)();
    _react.useEffect(()=>timeout ? setAutoPlay() : clearAutoPlay(), [
        timeout,
        slideIndex,
        clearAutoPlay,
        setAutoPlay
    ]);
    // Отключаем прокрутку слайдов при неактивной вкладке
    _react.useEffect(function preventSlideChange() {
        if (!document || !timeout) {
            return;
        }
        const changeAutoPlay = ()=>{
            if (document.visibilityState === 'visible') {
                clearAutoPlay();
                setAutoPlay();
            }
            if (document.visibilityState === 'hidden') {
                clearAutoPlay();
            }
        };
        document.addEventListener('visibilitychange', changeAutoPlay);
        return ()=>{
            document.removeEventListener('visibilitychange', changeAutoPlay);
        };
    }, [
        document,
        timeout,
        clearAutoPlay,
        setAutoPlay
    ]);
}

//# sourceMappingURL=hooks.js.map