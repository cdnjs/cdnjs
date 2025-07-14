'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { Removable } from "../Removable/Removable.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./FormLayoutGroup.module.css";
const sizeYClassNames = {
    none: classNames(styles.sizeYNone, 'vkuiInternalFormLayoutGroup--sizeY-none'),
    compact: classNames(styles.sizeYCompact, 'vkuiInternalFormLayoutGroup--sizeY-compact')
};
/**
 * @see https://vkui.io/components/form-layout-group
 */ export const FormLayoutGroup = ({ children, mode = 'vertical', removable, segmented, removePlaceholder = 'Удалить', onRemove, getRootRef, disabled, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const isRemovable = removable && mode === 'horizontal';
    const rootEl = useExternRef(getRootRef);
    return /*#__PURE__*/ _jsx(RootComponent, {
        getRootRef: rootEl,
        Component: "fieldset",
        baseClassName: classNames(styles.host, sizeY !== 'regular' && sizeYClassNames[sizeY], mode === 'horizontal' && classNames(styles.modeHorizontal, 'vkuiInternalFormLayoutGroup--mode-horizontal'), mode === 'vertical' && 'vkuiInternalFormLayoutGroup--mode-vertical', isRemovable && classNames(styles.withRemovable, 'vkuiInternalFormLayoutGroup--removable'), segmented && classNames(styles.segmented, 'vkuiInternalFormLayoutGroup--segmented')),
        disabled: disabled,
        ...restProps,
        children: isRemovable ? /*#__PURE__*/ _jsx(Removable, {
            className: styles.removable,
            align: "start",
            removePlaceholder: removePlaceholder,
            onRemove: (e)=>{
                if (rootEl?.current) {
                    onRemove?.(e, rootEl.current);
                }
            },
            disabled: disabled,
            indent: removable === 'indent',
            children: children
        }) : /*#__PURE__*/ _jsxs(React.Fragment, {
            children: [
                children,
                /*#__PURE__*/ _jsx("span", {
                    className: styles.offset,
                    "aria-hidden": true
                })
            ]
        })
    });
};

//# sourceMappingURL=FormLayoutGroup.js.map