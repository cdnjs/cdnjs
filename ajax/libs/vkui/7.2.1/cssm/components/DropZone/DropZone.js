'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { callMultiple } from "../../lib/callMultiple.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { DropZoneGrid } from "./components/DropZoneGrid.js";
import styles from "./DropZone.module.css";
/**
 * Компонент позволяет пользователям загружать файлы, перетаскивая файлы в
 * область на странице.
 *
 * @since 6.1.0
 * @see https://vkcom.github.io/VKUI/#/DropZone
 */ export const DropZone = ({ onDragOver, onDragLeave, onDrop, children, ...props })=>{
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
    return /*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: classNames(styles.host, active && styles.active),
        onDragOver: callMultiple(onDragOver, onActive),
        onDragLeave: callMultiple(onDragLeave, offActive),
        onDrop: callMultiple(onDrop, offActive),
        ...props,
        children: typeof children === 'function' ? children({
            active
        }) : children
    });
};
DropZone.displayName = 'DropZone';
DropZone.Grid = DropZoneGrid;
DropZone.Grid.displayName = 'DropZone.Grid';

//# sourceMappingURL=DropZone.js.map