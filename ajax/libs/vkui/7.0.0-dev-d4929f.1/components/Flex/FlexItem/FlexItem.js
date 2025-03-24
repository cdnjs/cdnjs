import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../../RootComponent/RootComponent.js";
const flexClassNames = {
    grow: "FlexItem__flexGrow--f4Sag",
    shrink: "FlexItem__flexShrink--pAqJQ",
    content: "FlexItem__flexContent--Acz7I",
    fixed: "FlexItem__flexFixed--SrqVF"
};
const alignSelfClassNames = {
    start: "FlexItem__alignSelfStart--Q1sUP",
    end: "FlexItem__alignSelfEnd--kJ2Bs",
    center: "FlexItem__alignSelfCenter--Q192n",
    baseline: "FlexItem__alignSelfBaseline--IteLi",
    stretch: "FlexItem__alignSelfStretch--FlSxU"
};
export const FlexItem = (_param)=>{
    var { children, alignSelf, flex, flexBasis, style } = _param, rest = _object_without_properties(_param, [
        "children",
        "alignSelf",
        "flex",
        "flexBasis",
        "style"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, rest), {
        style: _object_spread({
            flexBasis
        }, style),
        baseClassName: classNames(alignSelf && alignSelfClassNames[alignSelf], flex && flexClassNames[flex]),
        children: children
    }));
};

//# sourceMappingURL=FlexItem.js.map