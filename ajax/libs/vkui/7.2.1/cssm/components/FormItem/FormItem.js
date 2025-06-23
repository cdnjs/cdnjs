'use client';
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
import styles from "./FormItem.module.css";
const sizeYClassNames = {
    none: classNames(styles.sizeYNone, 'vkuiInternalFormItem--sizeY-none'),
    compact: classNames(styles.sizeYCompact, 'vkuiInternalFormItem--sizeY-compact')
};
const stylesStatus = {
    error: classNames(styles.statusError, 'vkuiInternalFormItem--status-error'),
    valid: classNames(styles.statusValid, 'vkuiInternalFormItem--status-valid')
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormItem
 */ export const FormItem = ({ children, top, topId, topMultiline = false, topComponent: topComponentProp, bottom, status = 'default', removable, onRemove, removePlaceholder = 'Удалить', getRootRef, htmlFor, bottomId, noPadding, required = false, ...restProps })=>{
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
                className: styles.bottom,
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
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        getRootRef: rootEl,
        baseClassName: classNames(styles.host, !noPadding && styles.withPadding, 'vkuiInternalFormItem', status !== 'default' && stylesStatus[status], sizeY !== 'regular' && sizeYClassNames[sizeY], hasReactNode(top) && classNames(styles.withTop, 'vkuiInternalFormItem--withTop'), removable && classNames(styles.withRemovable, 'vkuiInternalFormItem--removable')),
        children: /*#__PURE__*/ _jsx(FormItemContext.Provider, {
            value: context,
            children: removable ? /*#__PURE__*/ _jsx(Removable, {
                align: "start",
                onRemove: (e)=>{
                    if (rootEl?.current) {
                        onRemove?.(e, rootEl.current);
                    }
                },
                removePlaceholder: removePlaceholder,
                indent: removable === 'indent',
                noPadding: noPadding,
                children: /*#__PURE__*/ _jsx("div", {
                    className: classNames(styles.removable, 'vkuiInternalFormItem__removable'),
                    children: wrappedChildren
                })
            }) : wrappedChildren
        })
    });
};
FormItem.displayName = 'FormItem';
FormItem.Top = FormItemTop;
FormItem.Top.displayName = 'FormItem.Top';
FormItem.TopLabel = FormItemTopLabel;
FormItem.TopLabel.displayName = 'FormItem.TopLabel';
FormItem.TopAside = FormItemTopAside;
FormItem.TopAside.displayName = 'FormItem.TopAside';

//# sourceMappingURL=FormItem.js.map