"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withModalRootContext = withModalRootContext;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _ModalRootContext = require("./ModalRootContext");
function withModalRootContext(Component) {
  function WithModalRootContext(props) {
    var _React$useContext = React.useContext(_ModalRootContext.ModalRootContext),
      updateModalHeight = _React$useContext.updateModalHeight;
    return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({}, props, {
      updateModalHeight: updateModalHeight
    }));
  }
  return WithModalRootContext;
}
//# sourceMappingURL=withModalRootContext.js.map