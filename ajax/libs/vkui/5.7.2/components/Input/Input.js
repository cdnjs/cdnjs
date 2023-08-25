import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { SizeType } from "../../lib/adaptivity";
import { FormField } from "../FormField/FormField";
import { Text } from "../Typography/Text/Text";
var sizeYClassNames = _define_property({
    none: "vkuiInput--sizeY-none"
}, SizeType.COMPACT, "vkuiInput--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/Input
 */ export var Input = function(_param) {
    var _param_type = _param.type, type = _param_type === void 0 ? "text" : _param_type, _param_align = _param.align, align = _param_align === void 0 ? "left" : _param_align, getRef = _param.getRef, className = _param.className, getRootRef = _param.getRootRef, style = _param.style, before = _param.before, after = _param.after, status = _param.status, mode = _param.mode, restProps = _object_without_properties(_param, [
        "type",
        "align",
        "getRef",
        "className",
        "getRootRef",
        "style",
        "before",
        "after",
        "status",
        "mode"
    ]);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ React.createElement(FormField, {
        style: style,
        className: classNames("vkuiInput", align === "right" && "vkuiInput--align-right", align === "center" && "vkuiInput--align-center", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], before && "vkuiInput--hasBefore", after && "vkuiInput--hasAfter", className),
        getRootRef: getRootRef,
        before: before,
        after: after,
        disabled: restProps.disabled,
        mode: mode,
        status: status
    }, /*#__PURE__*/ React.createElement(Text, _object_spread_props(_object_spread({}, restProps), {
        Component: "input",
        normalize: false,
        type: type,
        className: "vkuiInput__el",
        getRootRef: getRef
    })));
};

//# sourceMappingURL=Input.js.map