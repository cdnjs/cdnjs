'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { stopPropagation } from "../../lib/utils.js";
import { FocusTrap } from "../FocusTrap/FocusTrap.js";
export const ActionSheetDropdownSheet = (_param)=>{
    var { children, closing, // these 2 props are only omitted - ActionSheetDesktop compat
    toggleRef, className, onClick, allowClickPropagation = false } = _param, restProps = _object_without_properties(_param, [
        "children",
        "closing",
        "toggleRef",
        "className",
        "onClick",
        "allowClickPropagation"
    ]);
    const { sizeY } = useAdaptivityWithJSMediaQueries();
    const platform = usePlatform();
    const handleClick = allowClickPropagation ? onClick : (event)=>{
        stopPropagation(event);
        onClick === null || onClick === void 0 ? void 0 : onClick(event);
    };
    return /*#__PURE__*/ _jsx(FocusTrap, _object_spread_props(_object_spread({}, restProps), {
        onClick: handleClick,
        className: classNames("vkuiActionSheet__host", platform === 'ios' && "vkuiActionSheet__ios", closing ? "vkuiActionSheet__closing" : "vkuiActionSheet__opening", sizeY === 'compact' && "vkuiActionSheet__sizeYCompact", className),
        children: children
    }));
};

//# sourceMappingURL=ActionSheetDropdownSheet.js.map