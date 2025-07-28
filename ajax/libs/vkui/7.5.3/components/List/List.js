import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP } from "../../hooks/useDraggableWithDomApi/index.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
/**
 * @see https://vkui.io/components/cell#list
 */ export const List = (_param)=>{
    var { children, gap = 0 } = _param, restProps = _object_without_properties(_param, [
        "children",
        "gap"
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        role: "list",
        baseClassName: "vkuiList__host",
        baseStyle: {
            gridGap: gap
        }
    }, restProps), {
        children: [
            children,
            /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({
                "aria-hidden": true
            }, DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP), {
                className: "vkuiList__placeholder"
            }))
        ]
    }));
};

//# sourceMappingURL=List.js.map