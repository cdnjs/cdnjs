import * as React from "react";
import { canUseDOM } from "../lib/dom";
import { useIsomorphicLayoutEffect } from "../lib/useIsomorphicLayoutEffect";
export function useTimeout(cb, duration) {
    var options = React.useRef({
        cb: cb,
        duration: duration
    });
    useIsomorphicLayoutEffect(function() {
        options.current.cb = cb;
        options.current.duration = duration;
    }, [
        cb,
        duration
    ]);
    var timeout = React.useRef();
    var clear = React.useCallback(function() {
        if (canUseDOM && (timeout === null || timeout === void 0 ? void 0 : timeout.current)) {
            clearTimeout(timeout.current);
        }
    }, []);
    var set = React.useCallback(function() {
        var _$duration = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : options.current.duration;
        clear();
        if (canUseDOM) {
            timeout.current = setTimeout(function() {
                var _$cb = options.current.cb;
                typeof _$cb === "function" && _$cb();
            }, _$duration);
        }
    }, [
        clear
    ]);
    useIsomorphicLayoutEffect(function() {
        return clear;
    }, []);
    return {
        set: set,
        clear: clear
    };
}

//# sourceMappingURL=useTimeout.js.map