"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FormLayout", {
    enumerable: true,
    get: function() {
        return FormLayout;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useExternRef = require("../../hooks/useExternRef");
var preventDefault = function(e) {
    return e.preventDefault();
};
var FormLayout = function(_param) {
    var children = _param.children, _param_Component = _param.Component, Component = _param_Component === void 0 ? "form" : _param_Component, getRef = _param.getRef, getRootRef = _param.getRootRef, _param_onSubmit = _param.onSubmit, onSubmit = _param_onSubmit === void 0 ? preventDefault : _param_onSubmit, className = _param.className, restProps = _object_without_properties._(_param, [
        "children",
        "Component",
        "getRef",
        "getRootRef",
        "onSubmit",
        "className"
    ]);
    var formLayoutRef = (0, _useExternRef.useExternRef)(getRef, getRootRef);
    return /*#__PURE__*/ _react.createElement(Component, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiFormLayout", className),
        onSubmit: onSubmit,
        ref: formLayoutRef
    }), children, Component === "form" && /*#__PURE__*/ _react.createElement("input", {
        type: "submit",
        className: "vkuiFormLayout__submit",
        value: ""
    }));
};

//# sourceMappingURL=FormLayout.js.map