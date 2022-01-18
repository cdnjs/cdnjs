"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withPlatform = withPlatform;

var _jsxRuntime = require("../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var React = _interopRequireWildcard(require("react"));

var _SSR = require("../lib/SSR");

var _ConfigProviderContext = require("../components/ConfigProvider/ConfigProviderContext");

function withPlatform(Component) {
  function WithPlatform(props) {
    var ssrContext = React.useContext(_SSR.SSRContext);

    var _React$useContext = React.useContext(_ConfigProviderContext.ConfigProviderContext),
        platform = _React$useContext.platform; // @ts-ignore


    return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({}, props, {
      platform: ssrContext.platform || platform
    }));
  }

  return WithPlatform;
}
//# sourceMappingURL=withPlatform.js.map