import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useExternRef } from "../../hooks/useExternRef";
var preventDefault = function(e) {
    return e.preventDefault();
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormLayout
 */ export var FormLayout = function(_param) {
    var children = _param.children, _param_Component = _param.Component, Component = _param_Component === void 0 ? "form" : _param_Component, getRef = _param.getRef, getRootRef = _param.getRootRef, _param_onSubmit = _param.onSubmit, onSubmit = _param_onSubmit === void 0 ? preventDefault : _param_onSubmit, className = _param.className, restProps = _object_without_properties(_param, [
        "children",
        "Component",
        "getRef",
        "getRootRef",
        "onSubmit",
        "className"
    ]);
    var formLayoutRef = useExternRef(getRef, getRootRef);
    return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiFormLayout", className),
        onSubmit: onSubmit,
        ref: formLayoutRef
    }), children, Component === "form" && /*#__PURE__*/ React.createElement("input", {
        type: "submit",
        className: "vkuiFormLayout__submit",
        value: ""
    }));
};

//# sourceMappingURL=FormLayout.js.map