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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _useTimeout = require("../../hooks/useTimeout");
var _dom = require("../../lib/dom");
function useAutoPlay(timeout, slideIndex, callbackFn) {
    var _useTimeout1 = (0, _useTimeout.useTimeout)(callbackFn, timeout), clearAutoPlay = _useTimeout1.clear, setAutoPlay = _useTimeout1.set;
    var document = (0, _dom.useDOM)().document;
    _react.useEffect(function() {
        return timeout ? setAutoPlay() : clearAutoPlay();
    }, [
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
        var changeAutoPlay = function() {
            if (document.visibilityState === "visible") {
                clearAutoPlay();
                setAutoPlay();
            }
            if (document.visibilityState === "hidden") {
                clearAutoPlay();
            }
        };
        document.addEventListener("visibilitychange", changeAutoPlay);
        return function() {
            document.removeEventListener("visibilitychange", changeAutoPlay);
        };
    }, [
        document,
        timeout,
        clearAutoPlay,
        setAutoPlay
    ]);
}

//# sourceMappingURL=hooks.js.map