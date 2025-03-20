import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Footnote } from "../Typography/Footnote/Footnote.js";
/**
 * @see https://vkcom.github.io/VKUI/#/Footer
 */ export const Footer = (_param)=>{
    var { children, className, Component = 'footer', role: roleProp } = _param, restProps = _object_without_properties(_param, [
        "children",
        "className",
        "Component",
        "role"
    ]);
    const role = roleProp !== null && roleProp !== void 0 ? roleProp : Component === 'footer' ? 'contentinfo' : undefined;
    return /*#__PURE__*/ _jsx(Footnote, _object_spread_props(_object_spread({
        Component: Component,
        role: role
    }, restProps), {
        className: classNames("vkuiFooter__host", className),
        children: children
    }));
};

//# sourceMappingURL=Footer.js.map