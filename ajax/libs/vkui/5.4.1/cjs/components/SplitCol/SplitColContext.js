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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var SplitColContext = /*#__PURE__*/ _react.createContext({
    colRef: null,
    animate: true
});
var useSplitCol = function() {
    return _react.useContext(SplitColContext);
};

//# sourceMappingURL=SplitColContext.js.map