"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useModalRootContext", {
    enumerable: true,
    get: function() {
        return useModalRootContext;
    }
});
var _interop_require_default = require("@swc/helpers/_/_interop_require_default");
var _react = /*#__PURE__*/ _interop_require_default._(require("react"));
var _ModalRootContext = require("./ModalRootContext");
var useModalRootContext = function() {
    return _react.default.useContext(_ModalRootContext.ModalRootContext);
};

//# sourceMappingURL=useModalRootContext.js.map