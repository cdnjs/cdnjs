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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _NavIdContext = require("./NavIdContext");
var useNavId = function() {
    return {
        view: _react.useContext(_NavIdContext.NavViewIdContext),
        panel: _react.useContext(_NavIdContext.NavPanelIdContext)
    };
};

//# sourceMappingURL=useNavId.js.map