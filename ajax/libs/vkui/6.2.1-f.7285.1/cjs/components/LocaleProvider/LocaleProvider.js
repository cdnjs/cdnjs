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
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _ConfigProviderOverride = require("../ConfigProvider/ConfigProviderOverride");
function LocaleProvider({ value, children }) {
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_ConfigProviderOverride.ConfigProviderOverride, {
        locale: value,
        children: children
    });
}

//# sourceMappingURL=LocaleProvider.js.map