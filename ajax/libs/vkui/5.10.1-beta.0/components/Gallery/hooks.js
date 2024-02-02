import * as React from "react";
import { useTimeout } from "../../hooks/useTimeout";
import { useDOM } from "../../lib/dom";
export function useAutoPlay(timeout, slideIndex, callbackFn) {
    var _useTimeout = useTimeout(callbackFn, timeout), clearAutoPlay = _useTimeout.clear, setAutoPlay = _useTimeout.set;
    var document = useDOM().document;
    React.useEffect(function() {
        return timeout ? setAutoPlay() : clearAutoPlay();
    }, [
        timeout,
        slideIndex,
        clearAutoPlay,
        setAutoPlay
    ]);
    // Отключаем прокрутку слайдов при неактивной вкладке
    React.useEffect(function preventSlideChange() {
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