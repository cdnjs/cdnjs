import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useExternRef } from "../../hooks/useExternRef";
import { useFocusVisibleClassName } from "../../hooks/useFocusVisibleClassName";
import { useFocusWithin } from "../../hooks/useFocusWithin";
import { SizeType } from "../../lib/adaptivity";
var sizeYClassNames = _define_property({
    none: "vkuiFormField--sizeY-none"
}, SizeType.COMPACT, "vkuiFormField--sizeY-compact");
var stylesStatus = {
    error: "vkuiFormField--status-error",
    valid: "vkuiFormField--status-valid"
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormField
 */ export var FormField = function(_param) {
    var _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, _param_status = _param.status, status = _param_status === void 0 ? "default" : _param_status, children = _param.children, getRootRef = _param.getRootRef, before = _param.before, after = _param.after, disabled = _param.disabled, _param_mode = _param.mode, mode = _param_mode === void 0 ? "default" : _param_mode, className = _param.className, restProps = _object_without_properties(_param, [
        "Component",
        "status",
        "children",
        "getRootRef",
        "before",
        "after",
        "disabled",
        "mode",
        "className"
    ]);
    var elRef = useExternRef(getRootRef);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var _React_useState = _sliced_to_array(React.useState(false), 2), hover = _React_useState[0], setHover = _React_useState[1];
    var focusWithin = useFocusWithin(elRef);
    var focusVisibleClassNames = useFocusVisibleClassName({
        focusVisible: focusWithin,
        mode: "vkuiFormField--focus-visible"
    });
    var handleMouseEnter = function(e) {
        e.stopPropagation();
        setHover(true);
    };
    var handleMouseLeave = function(e) {
        e.stopPropagation();
        setHover(false);
    };
    return /*#__PURE__*/ React.createElement(Component, _object_spread_props(_object_spread({}, restProps), {
        ref: elRef,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        className: classNames("vkuiFormField", mode === "default" && "vkuiFormField--mode-default", status !== "default" && stylesStatus[status], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], disabled && "vkuiFormField--disabled", !disabled && hover && "vkuiFormField--hover", focusVisibleClassNames, className)
    }), before && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiFormField__before"
    }, before), children, after && /*#__PURE__*/ React.createElement("span", {
        className: classNames("vkuiFormField__after", "vkuiInternalFormField__after")
    }, after), /*#__PURE__*/ React.createElement("span", {
        "aria-hidden": true,
        className: "vkuiFormField__border"
    }));
};

//# sourceMappingURL=FormField.js.map