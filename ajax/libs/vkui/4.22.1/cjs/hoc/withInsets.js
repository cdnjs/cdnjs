"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withInsets = withInsets;

var _jsxRuntime = require("../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _useInsets = require("../hooks/useInsets");

function withInsets(Component) {
  function WithInsets(props) {
    var insets = (0, _useInsets.useInsets)(); // @ts-ignore

    return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({}, props, {
      insets: insets
    }));
  }

  return WithInsets;
}
//# sourceMappingURL=withInsets.js.map