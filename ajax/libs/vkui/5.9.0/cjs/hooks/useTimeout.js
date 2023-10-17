"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useTimeout", {
    enumerable: true,
    get: function() {
        return useTimeout;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _dom = require("../lib/dom");
var _useIsomorphicLayoutEffect = require("../lib/useIsomorphicLayoutEffect");
function useTimeout(cb, duration) {
    var options = _react.useRef({
        cb: cb,
        duration: duration
    });
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        options.current.cb = cb;
        options.current.duration = duration;
    }, [
        cb,
        duration
    ]);
    var timeout = _react.useRef();
    var clear = _react.useCallback(function() {
        if (_dom.canUseDOM && (timeout === null || timeout === void 0 ? void 0 : timeout.current)) {
            clearTimeout(timeout.current);
        }
    }, []);
    var set = _react.useCallback(function() {
        var _$duration = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : options.current.duration;
        clear();
        if (_dom.canUseDOM) {
            timeout.current = setTimeout(function() {
                var _$cb = options.current.cb;
                typeof _$cb === "function" && _$cb();
            }, _$duration);
        }
    }, [
        clear
    ]);
    (0, _useIsomorphicLayoutEffect.useIsomorphicLayoutEffect)(function() {
        return clear;
    }, []);
    return {
        set: set,
        clear: clear
    };
}

//# sourceMappingURL=useTimeout.js.map