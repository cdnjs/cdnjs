"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FormStatus", {
    enumerable: true,
    get: function() {
        return FormStatus;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Banner = require("../Banner/Banner");
const FormStatus = (_param)=>{
    var { mode, children, className, role = mode === 'error' ? 'alert' : 'status' } = _param, restProps = _object_without_properties._(_param, [
        "mode",
        "children",
        "className",
        "role"
    ]);
    return /*#__PURE__*/ _react.createElement(_Banner.Banner, _object_spread_props._(_object_spread._({}, restProps), {
        role: role,
        subheader: children,
        className: (0, _vkjs.classNames)('vkuiInternalFormStatus', mode === 'error' && (0, _vkjs.classNames)("vkuiFormStatus--mode-error", 'vkuiInternalFormStatus--mode-error'), className)
    }));
};

//# sourceMappingURL=FormStatus.js.map