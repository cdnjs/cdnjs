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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _ConfigProviderOverride = require("../ConfigProvider/ConfigProviderOverride");
function LocaleProvider(param) {
    var value = param.value, children = param.children;
    return /*#__PURE__*/ _react.createElement(_ConfigProviderOverride.ConfigProviderOverride, {
        locale: value
    }, children);
}

//# sourceMappingURL=LocaleProvider.js.map