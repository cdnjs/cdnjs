"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UnstyledTextField", {
    enumerable: true,
    get: function() {
        return UnstyledTextField;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Text = require("../Typography/Text/Text");
const UnstyledTextField = (_param)=>{
    var { as, noPadding = false, className } = _param, restProps = _object_without_properties._(_param, [
        "as",
        "noPadding",
        "className"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Text.Text, _object_spread._({
        Component: as,
        normalize: false,
        className: (0, _vkjs.classNames)("vkuiUnstyledTextField", noPadding && "vkuiUnstyledTextField--noPadding", className)
    }, restProps));
};

//# sourceMappingURL=UnstyledTextField.js.map