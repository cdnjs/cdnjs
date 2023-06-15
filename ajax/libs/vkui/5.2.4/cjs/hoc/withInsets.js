"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withInsets = withInsets;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _useInsets = require("../hooks/useInsets");
function withInsets(Component) {
  function WithInsets(props) {
    var insets = (0, _useInsets.useInsets)();
    return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({}, props, {
      insets: insets
    }));
  }
  return WithInsets;
}
//# sourceMappingURL=withInsets.js.map