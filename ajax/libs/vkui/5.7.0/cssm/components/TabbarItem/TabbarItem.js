import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { Platform } from '../../lib/platform';
import { COMMON_WARNINGS, warnOnce } from '../../lib/warnOnce';
import { Tappable } from '../Tappable/Tappable';
import { Footnote } from '../Typography/Footnote/Footnote';
import styles from './TabbarItem.module.css';
const warn = warnOnce('TabbarItem');
/**
 * @see https://vkcom.github.io/VKUI/#/TabbarItem
 */ export const TabbarItem = ({ children, selected, indicator, text, href, Component = href ? 'a' : 'button', disabled, className, getRootRef, ...restProps })=>{
    const platform = usePlatform();
    if (process.env.NODE_ENV === 'development') {
        const hasAccessibleName = text || restProps['aria-label'] || restProps['aria-labelledby'];
        if (!hasAccessibleName) {
            warn(COMMON_WARNINGS.a11y[Component === 'a' ? 'link-name' : 'button-name'], 'error');
        }
    }
    return /*#__PURE__*/ React.createElement(Component, {
        ...restProps,
        ref: getRootRef,
        disabled: disabled,
        href: href,
        className: classNames(styles['TabbarItem'], platform === Platform.IOS && styles['TabbarItem--ios'], platform === Platform.ANDROID && styles['TabbarItem--android'], selected && styles['TabbarItem--selected'], className)
    }, /*#__PURE__*/ React.createElement(Tappable, {
        role: "presentation",
        Component: "div",
        disabled: disabled,
        activeMode: platform === Platform.IOS ? styles['TabbarItem__tappable--active'] : 'background',
        activeEffectDelay: platform === Platform.IOS ? 0 : 300,
        hasHover: false,
        className: styles['TabbarItem__tappable']
    }), /*#__PURE__*/ React.createElement("div", {
        className: styles['TabbarItem__in']
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['TabbarItem__icon']
    }, children, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiInternalTabbarItem__label"
    }, hasReactNode(indicator) && indicator)), text && /*#__PURE__*/ React.createElement(Footnote, {
        Component: "div",
        className: styles['TabbarItem__text'],
        weight: "2"
    }, text)));
};

//# sourceMappingURL=TabbarItem.js.map