import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { FocusTrap } from "../FocusTrap/FocusTrap.js";
const stopPropagation = (e)=>e.stopPropagation();
export const ActionSheetDropdownSheet = (_param)=>{
    var { children, closing, // these 2 props are only omitted - ActionSheetDesktop compat
    toggleRef, className } = _param, restProps = _object_without_properties(_param, [
        "children",
        "closing",
        "toggleRef",
        "className"
    ]);
    const { sizeY } = useAdaptivityWithJSMediaQueries();
    const platform = usePlatform();
    return /*#__PURE__*/ _jsx(FocusTrap, _object_spread_props(_object_spread({}, restProps), {
        onClick: stopPropagation,
        className: classNames("vkuiActionSheet__host", platform === 'ios' && "vkuiActionSheet__ios", closing ? "vkuiActionSheet__closing" : "vkuiActionSheet__opening", sizeY === 'compact' && "vkuiActionSheet__sizeYCompact", className),
        children: children
    }));
};

//# sourceMappingURL=ActionSheetDropdownSheet.js.map