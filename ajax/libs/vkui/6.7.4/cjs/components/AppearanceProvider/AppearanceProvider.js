"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppearanceProvider", {
    enumerable: true,
    get: function() {
        return AppearanceProvider;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _tokens = require("../../lib/tokens");
const _ConfigProviderOverride = require("../ConfigProvider/ConfigProviderOverride");
const AppearanceProvider = ({ value, children })=>{
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_ConfigProviderOverride.ConfigProviderOverride, {
        appearance: value,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_icons.IconAppearanceProvider, {
            value: value,
            children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_tokens.TokensClassProvider, {
                children: children
            })
        })
    });
};

//# sourceMappingURL=AppearanceProvider.js.map