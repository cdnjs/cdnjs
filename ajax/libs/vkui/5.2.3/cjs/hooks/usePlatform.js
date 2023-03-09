"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePlatform = usePlatform;
var _ConfigProviderContext = require("../components/ConfigProvider/ConfigProviderContext");
function usePlatform() {
  var _useConfigProvider = (0, _ConfigProviderContext.useConfigProvider)(),
    platform = _useConfigProvider.platform;
  return platform;
}
//# sourceMappingURL=usePlatform.js.map