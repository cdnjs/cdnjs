"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAppearance = useAppearance;
var _ConfigProviderContext = require("../components/ConfigProvider/ConfigProviderContext");
function useAppearance() {
  var _useConfigProvider = (0, _ConfigProviderContext.useConfigProvider)(),
    appearance = _useConfigProvider.appearance;
  return appearance !== null && appearance !== void 0 ? appearance : 'light';
}
//# sourceMappingURL=useAppearance.js.map