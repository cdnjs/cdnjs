"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Chevron", {
    enumerable: true,
    get: function() {
        return Chevron;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const iconSize = {
    s: _icons.Icon16Chevron,
    m: _icons.Icon24ChevronCompactRight
};
const Chevron = (_param)=>{
    var { size = 'm' } = _param, restProps = _object_without_properties._(_param, [
        "size"
    ]);
    const Icon = iconSize[size];
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(Icon, _object_spread._({}, restProps));
};

//# sourceMappingURL=Chevron.js.map