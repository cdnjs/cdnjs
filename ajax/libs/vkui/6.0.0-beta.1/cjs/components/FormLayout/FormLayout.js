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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useExternRef = require("../../hooks/useExternRef");
const preventDefault = (e)=>e.preventDefault();
const FormLayout = (_param)=>{
    var { children, Component = 'form', getRef, getRootRef, onSubmit = preventDefault, className } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "Component",
        "getRef",
        "getRootRef",
        "onSubmit",
        "className"
    ]);
    const formLayoutRef = (0, _useExternRef.useExternRef)(getRef, getRootRef);
    return /*#__PURE__*/ _react.createElement(Component, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiFormLayout", className),
        onSubmit: onSubmit,
        ref: formLayoutRef
    }), children, Component === 'form' && /*#__PURE__*/ _react.createElement("input", {
        type: "submit",
        className: "vkuiFormLayout__submit",
        value: ""
    }));
};

//# sourceMappingURL=FormLayout.js.map