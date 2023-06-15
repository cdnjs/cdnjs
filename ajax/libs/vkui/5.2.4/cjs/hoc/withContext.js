"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withContext = withContext;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var React = _interopRequireWildcard(require("react"));
function withContext(Component, Ctx, prop) {
  function WithContext(props) {
    var context = React.useContext(Ctx);
    return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({}, props, (0, _defineProperty2.default)({}, prop, context)));
  }
  return WithContext;
}
//# sourceMappingURL=withContext.js.map