"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withPlatform = withPlatform;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _ConfigProviderContext = require("../components/ConfigProvider/ConfigProviderContext");
function withPlatform(Component) {
  function WithPlatform(props) {
    var _useConfigProvider = (0, _ConfigProviderContext.useConfigProvider)(),
      platform = _useConfigProvider.platform;
    return /*#__PURE__*/React.createElement(Component, (0, _extends2.default)({}, props, {
      platform: platform
    }));
  }
  return WithPlatform;
}
//# sourceMappingURL=withPlatform.js.map