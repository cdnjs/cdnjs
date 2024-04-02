import * as React from 'react';
import { classNames, hasReactNode, noop } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useExternRef } from '../../hooks/useExternRef';
import { Removable } from '../Removable/Removable';
import { RootComponent } from '../RootComponent/RootComponent';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Subhead } from '../Typography/Subhead/Subhead';
import styles from './FormItem.module.css';
const sizeYClassNames = {
    none: classNames(styles['FormItem--sizeY-none'], 'vkuiInternalFormItem--sizeY-none'),
    ['compact']: classNames(styles['FormItem--sizeY-compact'], 'vkuiInternalFormItem--sizeY-compact')
};
const stylesStatus = {
    error: classNames(styles['FormItem--status-error'], 'vkuiInternalFormItem--status-error'),
    valid: classNames(styles['FormItem--status-valid'], 'vkuiInternalFormItem--status-valid')
};
/**
 * @see https://vkcom.github.io/VKUI/#/FormItem
 */ export const FormItem = ({ children, top, topComponent: topComponentProp, bottom, status = 'default', removable, onRemove = noop, removePlaceholder = 'Удалить', getRootRef, htmlFor, bottomId, noPadding, ...restProps })=>{
    const rootEl = useExternRef(getRootRef);
    const { sizeY = 'none' } = useAdaptivity();
    const topComponent = topComponentProp || htmlFor && 'label' || 'span';
    const wrappedChildren = /*#__PURE__*/ React.createElement(React.Fragment, null, hasReactNode(top) && /*#__PURE__*/ React.createElement(Subhead, {
        className: styles['FormItem__top'],
        Component: topComponent,
        htmlFor: htmlFor
    }, top), children, hasReactNode(bottom) && /*#__PURE__*/ React.createElement(Footnote, {
        className: styles['FormItem__bottom'],
        id: bottomId,
        role: status === 'error' ? 'alert' : undefined
    }, bottom));
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        getRootRef: rootEl,
        baseClassName: classNames(styles['FormItem'], !noPadding && styles['FormItem--withPadding'], 'vkuiInternalFormItem', status !== 'default' && stylesStatus[status], sizeY !== 'regular' && sizeYClassNames[sizeY], hasReactNode(top) && classNames(styles['FormItem--withTop'], 'vkuiInternalFormItem--withTop'), removable && classNames(styles['FormItem--removable'], 'vkuiInternalFormItem--removable'))
    }, removable ? /*#__PURE__*/ React.createElement(Removable, {
        align: "start",
        onRemove: (e)=>{
            if (rootEl?.current) {
                onRemove(e, rootEl.current);
            }
        },
        removePlaceholder: removePlaceholder,
        indent: removable === 'indent'
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['FormItem__removable'], 'vkuiInternalFormItem__removable')
    }, wrappedChildren)) : wrappedChildren);
};

//# sourceMappingURL=FormItem.js.map