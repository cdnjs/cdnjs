import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../../RootComponent/RootComponent';
const flexClassNames = {
    grow: "vkuiFlexItem--flex-grow",
    shrink: "vkuiFlexItem--flex-shrink",
    content: "vkuiFlexItem--flex-content",
    fixed: "vkuiFlexItem--flex-fixed"
};
const alignSelfClassNames = {
    start: "vkuiFlexItem--align-self-start",
    end: "vkuiFlexItem--align-self-end",
    center: "vkuiFlexItem--align-self-center",
    baseline: "vkuiFlexItem--align-self-baseline",
    stretch: "vkuiFlexItem--align-self-stretch"
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
        baseClassName: classNames("vkuiFlexItem", alignSelf && alignSelfClassNames[alignSelf], flex && flexClassNames[flex]),
        children: children
    }));
};

//# sourceMappingURL=FlexItem.js.map