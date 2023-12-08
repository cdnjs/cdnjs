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
    objectEquals: function() {
        return objectEquals;
    },
    useObjectMemo: function() {
        return useObjectMemo;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
function objectEquals(o1, o2) {
    return Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every((k)=>o1[k] === o2[k]);
}
function useObjectMemo(object) {
    const cache = _react.useRef(object);
    if (!objectEquals(cache.current, object)) {
        cache.current = object;
    }
    return cache.current;
}

//# sourceMappingURL=useObjectMemo.js.map