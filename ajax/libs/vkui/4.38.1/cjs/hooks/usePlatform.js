"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePlatform = usePlatform;

var React = _interopRequireWildcard(require("react"));

var _SSR = require("../lib/SSR");

var _ConfigProviderContext = require("../components/ConfigProvider/ConfigProviderContext");

function usePlatform() {
  var ssrContext = React.useContext(_SSR.SSRContext);

  var _React$useContext = React.useContext(_ConfigProviderContext.ConfigProviderContext),
      platform = _React$useContext.platform;

  return ssrContext.platform || platform;
}
//# sourceMappingURL=usePlatform.js.map