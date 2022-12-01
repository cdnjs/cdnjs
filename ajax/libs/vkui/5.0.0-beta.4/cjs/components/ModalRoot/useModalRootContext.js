"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModalRootContext = void 0;
var _react = _interopRequireDefault(require("react"));
var _ModalRootContext = require("./ModalRootContext");
var useModalRootContext = function useModalRootContext() {
  return _react.default.useContext(_ModalRootContext.ModalRootContext);
};
exports.useModalRootContext = useModalRootContext;
//# sourceMappingURL=useModalRootContext.js.map