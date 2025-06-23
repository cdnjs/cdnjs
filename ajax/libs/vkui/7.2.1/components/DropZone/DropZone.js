'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { callMultiple } from "../../lib/callMultiple.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { DropZoneGrid } from "./components/DropZoneGrid.js";
/**
 * Компонент позволяет пользователям загружать файлы, перетаскивая файлы в
 * область на странице.
 *
 * @since 6.1.0
 * @see https://vkcom.github.io/VKUI/#/DropZone
 */ export const DropZone = (_param)=>{
    var { onDragOver, onDragLeave, onDrop, children } = _param, props = _object_without_properties(_param, [
        "onDragOver",
        "onDragLeave",
        "onDrop",
        "children"
    ]);
    const [active, setActive] = React.useState(false);
    const onActive = (event)=>{
        if (event.isPropagationStopped()) {
            return;
        }
        setActive(true);
    };
    const offActive = ()=>{
        setActive(false);
    };
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        baseClassName: classNames("vkuiDropZone__host", active && "vkuiDropZone__active"),
        onDragOver: callMultiple(onDragOver, onActive),
        onDragLeave: callMultiple(onDragLeave, offActive),
        onDrop: callMultiple(onDrop, offActive)
    }, props), {
        children: typeof children === 'function' ? children({
            active
        }) : children
    }));
};
DropZone.displayName = 'DropZone';
DropZone.Grid = DropZoneGrid;
DropZone.Grid.displayName = 'DropZone.Grid';

//# sourceMappingURL=DropZone.js.map