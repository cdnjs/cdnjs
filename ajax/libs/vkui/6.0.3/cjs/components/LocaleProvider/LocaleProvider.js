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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _ConfigProviderOverride = require("../ConfigProvider/ConfigProviderOverride");
function LocaleProvider({ value, children }) {
    return /*#__PURE__*/ _react.createElement(_ConfigProviderOverride.ConfigProviderOverride, {
        locale: value
    }, children);
}

//# sourceMappingURL=LocaleProvider.js.map