'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { Removable } from "../Removable/Removable.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
const sizeYClassNames = {
    none: classNames("vkuiFormLayoutGroup__sizeYNone", 'vkuiInternalFormLayoutGroup--sizeY-none'),
    compact: classNames("vkuiFormLayoutGroup__sizeYCompact", 'vkuiInternalFormLayoutGroup--sizeY-compact')
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormLayoutGroup
 */ export const FormLayoutGroup = (_param)=>{
    var { children, mode = 'vertical', removable, segmented, removePlaceholder = 'Удалить', onRemove, getRootRef } = _param, restProps = _object_without_properties(_param, [
        "children",
        "mode",
        "removable",
        "segmented",
        "removePlaceholder",
        "onRemove",
        "getRootRef"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const isRemovable = removable && mode === 'horizontal';
    const rootEl = useExternRef(getRootRef);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        getRootRef: rootEl,
        Component: "fieldset",
        baseClassName: classNames("vkuiFormLayoutGroup__host", sizeY !== 'regular' && sizeYClassNames[sizeY], mode === 'horizontal' && classNames("vkuiFormLayoutGroup__modeHorizontal", 'vkuiInternalFormLayoutGroup--mode-horizontal'), mode === 'vertical' && 'vkuiInternalFormLayoutGroup--mode-vertical', isRemovable && classNames("vkuiFormLayoutGroup__withRemovable", 'vkuiInternalFormLayoutGroup--removable'), segmented && classNames("vkuiFormLayoutGroup__segmented", 'vkuiInternalFormLayoutGroup--segmented'))
    }, restProps), {
        children: isRemovable ? /*#__PURE__*/ _jsx(Removable, {
            className: "vkuiFormLayoutGroup__removable",
            align: "start",
            removePlaceholder: removePlaceholder,
            onRemove: (e)=>{
                if (rootEl === null || rootEl === void 0 ? void 0 : rootEl.current) {
                    onRemove === null || onRemove === void 0 ? void 0 : onRemove(e, rootEl.current);
                }
            },
            indent: removable === 'indent',
            children: children
        }) : /*#__PURE__*/ _jsxs(React.Fragment, {
            children: [
                children,
                /*#__PURE__*/ _jsx("span", {
                    className: "vkuiFormLayoutGroup__offset",
                    "aria-hidden": true
                })
            ]
        })
    }));
};

//# sourceMappingURL=FormLayoutGroup.js.map