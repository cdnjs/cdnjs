import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
const stylesDirection = {
    inline: "vkuiGroup__expandedContentInline",
    block: "vkuiGroup__expandedContentBlock"
};
export const GroupExpandedContent = (_param)=>{
    var { direction = 'inline' } = _param, restProps = _object_without_properties(_param, [
        "direction"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        Component: "div"
    }, restProps), {
        baseClassName: classNames("vkuiGroup__expandedContent", stylesDirection[direction])
    }));
};

//# sourceMappingURL=GroupExpandedContent.js.map