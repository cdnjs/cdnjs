"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "LocaleProvider", {
    enumerable: true,
    get: function() {
        return LocaleProvider;
    }
});
var _interopRequireDefault = require("@swc/helpers/lib/_interop_require_default.js").default;
var _react = /*#__PURE__*/ _interopRequireDefault(require("react"));
var _configProviderOverride = require("../ConfigProvider/ConfigProviderOverride");
function LocaleProvider(param) {
    var value = param.value, children = param.children;
    return /*#__PURE__*/ _react.default.createElement(_configProviderOverride.ConfigProviderOverride, {
        locale: value
    }, children);
}

//# sourceMappingURL=LocaleProvider.js.map