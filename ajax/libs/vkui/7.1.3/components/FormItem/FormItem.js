'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames, hasReactNode, isPrimitiveReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { Removable } from "../Removable/Removable.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { FormItemTop } from "./FormItemTop/FormItemTop.js";
import { FormItemTopAside } from "./FormItemTop/FormItemTopAside.js";
import { FormItemTopLabel } from "./FormItemTop/FormItemTopLabel.js";
import { FormItemContext } from "./context.js";
const sizeYClassNames = {
    none: classNames("vkuiFormItem__sizeYNone", 'vkuiInternalFormItem--sizeY-none'),
    compact: classNames("vkuiFormItem__sizeYCompact", 'vkuiInternalFormItem--sizeY-compact')
};
const stylesStatus = {
    error: classNames("vkuiFormItem__statusError", 'vkuiInternalFormItem--status-error'),
    valid: classNames("vkuiFormItem__statusValid", 'vkuiInternalFormItem--status-valid')
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormItem
 */ export const FormItem = (_param)=>{
    var { children, top, topId, topMultiline = false, topComponent: topComponentProp, bottom, status = 'default', removable, onRemove, removePlaceholder = 'Удалить', getRootRef, htmlFor, bottomId, noPadding, required = false } = _param, restProps = _object_without_properties(_param, [
        "children",
        "top",
        "topId",
        "topMultiline",
        "topComponent",
        "bottom",
        "status",
        "removable",
        "onRemove",
        "removePlaceholder",
        "getRootRef",
        "htmlFor",
        "bottomId",
        "noPadding",
        "required"
    ]);
    const rootEl = useExternRef(getRootRef);
    const { sizeY = 'none' } = useAdaptivity();
    const wrappedChildren = /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            isPrimitiveReactNode(top) ? /*#__PURE__*/ _jsx(FormItemTop, {
                children: /*#__PURE__*/ _jsx(FormItemTopLabel, {
                    htmlFor: htmlFor,
                    Component: topComponentProp,
                    id: topId,
                    children: top
                })
            }) : hasReactNode(top) ? top : null,
            children,
            hasReactNode(bottom) && /*#__PURE__*/ _jsx(Footnote, {
                className: "vkuiFormItem__bottom",
                id: bottomId,
                role: status === 'error' ? 'alert' : undefined,
                children: bottom
            })
        ]
    });
    const context = React.useMemo(()=>({
            required,
            topMultiline
        }), [
        required,
        topMultiline
    ]);
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        getRootRef: rootEl,
        baseClassName: classNames("vkuiFormItem__host", !noPadding && "vkuiFormItem__withPadding", 'vkuiInternalFormItem', status !== 'default' && stylesStatus[status], sizeY !== 'regular' && sizeYClassNames[sizeY], hasReactNode(top) && classNames("vkuiFormItem__withTop", 'vkuiInternalFormItem--withTop'), removable && classNames("vkuiFormItem__withRemovable", 'vkuiInternalFormItem--removable')),
        children: /*#__PURE__*/ _jsx(FormItemContext.Provider, {
            value: context,
            children: removable ? /*#__PURE__*/ _jsx(Removable, {
                align: "start",
                onRemove: (e)=>{
                    if (rootEl === null || rootEl === void 0 ? void 0 : rootEl.current) {
                        onRemove === null || onRemove === void 0 ? void 0 : onRemove(e, rootEl.current);
                    }
                },
                removePlaceholder: removePlaceholder,
                indent: removable === 'indent',
                noPadding: noPadding,
                children: /*#__PURE__*/ _jsx("div", {
                    className: classNames("vkuiFormItem__removable", 'vkuiInternalFormItem__removable'),
                    children: wrappedChildren
                })
            }) : wrappedChildren
        })
    }));
};
FormItem.displayName = 'FormItem';
FormItem.Top = FormItemTop;
FormItem.Top.displayName = 'FormItem.Top';
FormItem.TopLabel = FormItemTopLabel;
FormItem.TopLabel.displayName = 'FormItem.TopLabel';
FormItem.TopAside = FormItemTopAside;
FormItem.TopAside.displayName = 'FormItem.TopAside';

//# sourceMappingURL=FormItem.js.map