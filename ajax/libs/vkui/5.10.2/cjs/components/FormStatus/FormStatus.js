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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Banner = require("../Banner/Banner");
var FormStatus = function(_param) {
    var mode = _param.mode, children = _param.children, className = _param.className, restProps = _object_without_properties._(_param, [
        "mode",
        "children",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_Banner.Banner, _object_spread_props._(_object_spread._({}, restProps), {
        subheader: children,
        className: (0, _vkjs.classNames)("vkuiInternalFormStatus", mode === "error" && (0, _vkjs.classNames)("vkuiFormStatus--mode-error", "vkuiInternalFormStatus--mode-error"), className)
    }));
};

//# sourceMappingURL=FormStatus.js.map