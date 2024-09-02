import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { DATA_DRAGGABLE_PLACEHOLDER_REACT_PROP } from '../../hooks/useDraggableWithDomApi';
import { RootComponent } from '../RootComponent/RootComponent';
/**
 * @see https://vkcom.github.io/VKUI/#/List
 */ export const List = (_param)=>{
    var { children, gap = 0, className, style } = _param, restProps = _object_without_properties(_param, [
        "children",
        "gap",
        "className",
        "style"
    ]);
    return /*#__PURE__*/ _jsxs(RootComponent, _object_spread_props(_object_spread({
        role: "list",
        className: classNames("vkuiList", className),
        style: _object_spread_props(_object_spread({}, style), {
            gridGap: gap
        })
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