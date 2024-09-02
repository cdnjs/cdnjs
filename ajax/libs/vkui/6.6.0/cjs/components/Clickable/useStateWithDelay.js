"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useStateWithDelay", {
    enumerable: true,
    get: function() {
        return useStateWithDelay;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
function useStateWithDelay(initialState, defaultDelay = 0) {
    const [value, setValue] = _react.useState(initialState);
    const timeout = _react.useRef();
    const setValueWithDelay = _react.useCallback((newValue, delay = defaultDelay)=>{
        clearTimeout(timeout.current);
        if (delay === 0) {
            setValue(newValue);
            return;
        }
        timeout.current = setTimeout(()=>setValue(newValue), delay);
    }, [
        defaultDelay
    ]);
    return [
        value,
        setValueWithDelay
    ];
}

//# sourceMappingURL=useStateWithDelay.js.map