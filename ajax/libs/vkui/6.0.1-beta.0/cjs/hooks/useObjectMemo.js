"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useObjectMemo", {
    enumerable: true,
    get: function() {
        return useObjectMemo;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
function useObjectMemo(object) {
    const cache = _react.useRef(object);
    if (!(0, _vkjs.isEqual)(cache.current, object)) {
        cache.current = object;
    }
    return cache.current;
}

//# sourceMappingURL=useObjectMemo.js.map