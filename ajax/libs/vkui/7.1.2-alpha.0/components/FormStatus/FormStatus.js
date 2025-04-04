import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Banner } from "../Banner/Banner.js";
/**
 * @see https://vkcom.github.io/VKUI/#/FormStatus
 */ export const FormStatus = (_param)=>{
    var { mode, children, className, role = mode === 'error' ? 'alert' : 'status', title } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "children",
        "className",
        "role",
        "title"
    ]);
    return /*#__PURE__*/ _jsx(Banner, _object_spread_props(_object_spread({}, restProps), {
        title: title,
        role: role,
        subtitle: children,
        className: classNames('vkuiInternalFormStatus', mode === 'error' && classNames("vkuiFormStatus__modeError", 'vkuiInternalFormStatus--mode-error'), className)
    }));
};

//# sourceMappingURL=FormStatus.js.map