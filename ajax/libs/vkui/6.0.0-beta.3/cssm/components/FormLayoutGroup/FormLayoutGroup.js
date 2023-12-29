import * as React from 'react';
import { classNames, noop } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { Removable } from '../Removable/Removable';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './FormLayoutGroup.module.css';
const sizeYClassNames = {
    none: classNames(styles['FormLayoutGroup--sizeY-none'], 'vkuiInternalFormLayoutGroup--sizeY-none'),
    ['compact']: classNames(styles['FormLayoutGroup--sizeY-compact'], 'vkuiInternalFormLayoutGroup--sizeY-compact')
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormLayoutGroup
 */ export const FormLayoutGroup = ({ children, mode = 'vertical', removable, segmented, removePlaceholder = 'Удалить', onRemove = noop, getRootRef, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const isRemovable = removable && mode === 'horizontal';
    const rootEl = useExternRef(getRootRef);
    return /*#__PURE__*/ React.createElement(RootComponent, {
        getRootRef: rootEl,
        baseClassName: classNames(sizeY !== 'regular' && sizeYClassNames[sizeY], mode === 'horizontal' && classNames(styles['FormLayoutGroup--mode-horizontal'], 'vkuiInternalFormLayoutGroup--mode-horizontal'), mode === 'vertical' && classNames(styles['FormLayoutGroup--mode-vertical'], 'vkuiInternalFormLayoutGroup--mode-vertical'), isRemovable && classNames(styles['FormLayoutGroup--removable'], 'vkuiInternalFormLayoutGroup--removable'), segmented && classNames(styles['FormLayoutGroup--segmented'], 'vkuiInternalFormLayoutGroup--segmented')),
        ...restProps
    }, isRemovable ? /*#__PURE__*/ React.createElement(Removable, {
        className: styles['FormLayoutGroup__removable'],
        align: "start",
        removePlaceholder: removePlaceholder,
        onRemove: (e)=>{
            if (rootEl?.current) {
                onRemove(e, rootEl.current);
            }
        },
        indent: removable === 'indent'
    }, children) : /*#__PURE__*/ React.createElement(React.Fragment, null, children, /*#__PURE__*/ React.createElement("span", {
        className: styles['FormLayoutGroup__offset'],
        "aria-hidden": true
    })));
};

//# sourceMappingURL=FormLayoutGroup.js.map