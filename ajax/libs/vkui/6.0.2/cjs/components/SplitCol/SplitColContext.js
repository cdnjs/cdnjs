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
    SplitColContext: function() {
        return SplitColContext;
    },
    useSplitCol: function() {
        return useSplitCol;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const SplitColContext = /*#__PURE__*/ _react.createContext({
    colRef: null,
    animate: true
});
const useSplitCol = ()=>_react.useContext(SplitColContext);

//# sourceMappingURL=SplitColContext.js.map