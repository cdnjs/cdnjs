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
var _interopRequireDefault = require("@swc/helpers/lib/_interop_require_default.js").default;
var _react = /*#__PURE__*/ _interopRequireDefault(require("react"));
var _modalRootContext = require("./ModalRootContext");
var useModalRootContext = function() {
    return _react.default.useContext(_modalRootContext.ModalRootContext);
};

//# sourceMappingURL=useModalRootContext.js.map