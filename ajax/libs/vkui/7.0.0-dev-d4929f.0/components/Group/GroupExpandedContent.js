import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
const stylesDirection = {
    inline: "Group__expandedContentInline--T8Ndk",
    block: "Group__expandedContentBlock--UJBCV"
};
export const GroupExpandedContent = (_param)=>{
    var { direction = 'inline' } = _param, restProps = _object_without_properties(_param, [
        "direction"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        Component: "div"
    }, restProps), {
        baseClassName: classNames("Group__expandedContent--auF04", stylesDirection[direction])
    }));
};

//# sourceMappingURL=GroupExpandedContent.js.map