import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { useObjectMemo } from '../../hooks/useObjectMemo';
import { Removable } from '../Removable/Removable';
import { RootComponent } from '../RootComponent/RootComponent';
import { Footnote } from '../Typography/Footnote/Footnote';
import { FormItemTop } from './FormItemTop/FormItemTop';
import { FormItemTopAside } from './FormItemTop/FormItemTopAside';
import { FormItemTopLabel } from './FormItemTop/FormItemTopLabel';
import { FormItemContext } from './context';
const sizeYClassNames = {
    none: classNames("vkuiFormItem--sizeY-none", 'vkuiInternalFormItem--sizeY-none'),
    compact: classNames("vkuiFormItem--sizeY-compact", 'vkuiInternalFormItem--sizeY-compact')
};
const stylesStatus = {
    error: classNames("vkuiFormItem--status-error", 'vkuiInternalFormItem--status-error'),
    valid: classNames("vkuiFormItem--status-valid", 'vkuiInternalFormItem--status-valid')
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormItem
 */ export const FormItem = (_param)=>{
    var { children, top, topId, topMultiline, topComponent: topComponentProp, bottom, status = 'default', removable, onRemove, removePlaceholder = 'Удалить', getRootRef, htmlFor, bottomId, noPadding, topNode, required = false } = _param, restProps = _object_without_properties(_param, [
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
        "topNode",
        "required"
    ]);
    const rootEl = useExternRef(getRootRef);
    const { sizeY = 'none' } = useAdaptivity();
    const wrappedChildren = /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            hasReactNode(topNode) ? topNode : hasReactNode(top) ? /*#__PURE__*/ _jsx(FormItemTop, {
                children: /*#__PURE__*/ _jsx(FormItemTopLabel, {
                    htmlFor: htmlFor,
                    Component: topComponentProp,
                    multiline: topMultiline,
                    id: topId,
                    children: top
                })
            }) : null,
            children,
            hasReactNode(bottom) && /*#__PURE__*/ _jsx(Footnote, {
                className: "vkuiFormItem__bottom",
                id: bottomId,
                role: status === 'error' ? 'alert' : undefined,
                children: bottom
            })
        ]
    });
    const context = useObjectMemo({
        required,
        topMultiline
    });
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        getRootRef: rootEl,
        baseClassName: classNames("vkuiFormItem", !noPadding && "vkuiFormItem--withPadding", 'vkuiInternalFormItem', status !== 'default' && stylesStatus[status], sizeY !== 'regular' && sizeYClassNames[sizeY], hasReactNode(top) && classNames("vkuiFormItem--withTop", 'vkuiInternalFormItem--withTop'), removable && classNames("vkuiFormItem--removable", 'vkuiInternalFormItem--removable')),
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