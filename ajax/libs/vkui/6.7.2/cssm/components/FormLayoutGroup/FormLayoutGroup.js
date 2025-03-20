import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { Removable } from '../Removable/Removable';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './FormLayoutGroup.module.css';
const sizeYClassNames = {
    none: classNames(styles['FormLayoutGroup--sizeY-none'], 'vkuiInternalFormLayoutGroup--sizeY-none'),
    compact: classNames(styles['FormLayoutGroup--sizeY-compact'], 'vkuiInternalFormLayoutGroup--sizeY-compact')
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormLayoutGroup
 */ export const FormLayoutGroup = ({ children, mode = 'vertical', removable, segmented, removePlaceholder = 'Удалить', onRemove, getRootRef, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const isRemovable = removable && mode === 'horizontal';
    const rootEl = useExternRef(getRootRef);
    return /*#__PURE__*/ _jsx(RootComponent, {
        getRootRef: rootEl,
        Component: "fieldset",
        baseClassName: classNames(styles['FormLayoutGroup'], sizeY !== 'regular' && sizeYClassNames[sizeY], mode === 'horizontal' && classNames(styles['FormLayoutGroup--mode-horizontal'], 'vkuiInternalFormLayoutGroup--mode-horizontal'), mode === 'vertical' && 'vkuiInternalFormLayoutGroup--mode-vertical', isRemovable && classNames(styles['FormLayoutGroup--removable'], 'vkuiInternalFormLayoutGroup--removable'), segmented && classNames(styles['FormLayoutGroup--segmented'], 'vkuiInternalFormLayoutGroup--segmented')),
        ...restProps,
        children: isRemovable ? /*#__PURE__*/ _jsx(Removable, {
            className: styles['FormLayoutGroup__removable'],
            align: "start",
            removePlaceholder: removePlaceholder,
            onRemove: (e)=>{
                if (rootEl?.current) {
                    onRemove?.(e, rootEl.current);
                }
            },
            indent: removable === 'indent',
            children: children
        }) : /*#__PURE__*/ _jsxs(React.Fragment, {
            children: [
                children,
                /*#__PURE__*/ _jsx("span", {
                    className: styles['FormLayoutGroup__offset'],
                    "aria-hidden": true
                })
            ]
        })
    });
};

//# sourceMappingURL=FormLayoutGroup.js.map