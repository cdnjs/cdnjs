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
const _vkjs = require("@vkontakte/vkjs");
function useStateWithDelay(initialState, defaultDelay = 0, onStateChange = _vkjs.noop) {
    const [value, setValue] = _react.useState(initialState);
    const timeout = _react.useRef();
    const handleSetValue = _react.useCallback((nextValue)=>{
        if ((0, _vkjs.isFunction)(nextValue)) {
            setValue((prevValue)=>{
                const value = nextValue(prevValue);
                onStateChange(value);
                return value;
            });
        } else {
            setValue(nextValue);
            onStateChange(nextValue);
        }
    }, [
        onStateChange
    ]);
    const setValueWithDelay = _react.useCallback((newValue, delay = defaultDelay)=>{
        clearTimeout(timeout.current);
        if (delay === 0) {
            handleSetValue(newValue);
            return;
        }
        timeout.current = setTimeout(()=>handleSetValue(newValue), delay);
    }, [
        defaultDelay,
        handleSetValue
    ]);
    return [
        value,
        setValueWithDelay
    ];
}

//# sourceMappingURL=useStateWithDelay.js.map