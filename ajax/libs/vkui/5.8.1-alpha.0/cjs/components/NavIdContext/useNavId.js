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
var _interop_require_default = require("@swc/helpers/_/_interop_require_default");
var _react = /*#__PURE__*/ _interop_require_default._(require("react"));
var _NavIdContext = require("./NavIdContext");
var useNavId = function() {
    return {
        view: _react.default.useContext(_NavIdContext.NavViewIdContext),
        panel: _react.default.useContext(_NavIdContext.NavPanelIdContext)
    };
};

//# sourceMappingURL=useNavId.js.map