"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useBooleanState", {
    enumerable: true,
    get: function() {
        return useBooleanState;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const useBooleanState = (defaultValue = false)=>{
    const [value, setValue] = _react.useState(defaultValue);
    const setTrue = _react.useCallback(()=>{
        setValue(true);
    }, []);
    const setFalse = _react.useCallback(()=>{
        setValue(false);
    }, []);
    const toggle = _react.useCallback(()=>{
        setValue(!value);
    }, [
        value
    ]);
    return {
        value,
        setTrue,
        setFalse,
        toggle
    };
};

//# sourceMappingURL=useBooleanState.js.map