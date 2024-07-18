"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useNavId", {
    enumerable: true,
    get: function() {
        return useNavId;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _NavIdContext = require("./NavIdContext");
const useNavId = ()=>({
        view: _react.useContext(_NavIdContext.NavViewIdContext),
        panel: _react.useContext(_NavIdContext.NavPanelIdContext)
    });

//# sourceMappingURL=useNavId.js.map