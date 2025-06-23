import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../../RootComponent/RootComponent.js";
const flexClassNames = {
    grow: "vkuiFlexItem__flexGrow",
    shrink: "vkuiFlexItem__flexShrink",
    content: "vkuiFlexItem__flexContent",
    fixed: "vkuiFlexItem__flexFixed"
};
const alignSelfClassNames = {
    start: "vkuiFlexItem__alignSelfStart",
    end: "vkuiFlexItem__alignSelfEnd",
    center: "vkuiFlexItem__alignSelfCenter",
    baseline: "vkuiFlexItem__alignSelfBaseline",
    stretch: "vkuiFlexItem__alignSelfStretch"
};
export const FlexItem = (_param)=>{
    var { children, alignSelf, flex, flexBasis } = _param, rest = _object_without_properties(_param, [
        "children",
        "alignSelf",
        "flex",
        "flexBasis"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, rest), {
        baseStyle: {
            flexBasis
        },
        baseClassName: classNames(alignSelf && alignSelfClassNames[alignSelf], flex && flexClassNames[flex]),
        children: children
    }));
};

//# sourceMappingURL=FlexItem.js.map