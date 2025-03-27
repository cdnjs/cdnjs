import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden.js";
const stylesMode = {
    new: "vkuiBadge__modeNew",
    prominent: "vkuiBadge__modeProminent"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Badge
 */ export const Badge = (_param)=>{
    var { mode = 'new', children } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "children"
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        Component: "span",
        baseClassName: classNames("vkuiBadge__host", 'vkuiInternalBadge', stylesMode[mode])
    }, restProps), {
        children: children && /*#__PURE__*/ _jsx(VisuallyHidden, {
            children: children
        })
    }));
};

//# sourceMappingURL=Badge.js.map