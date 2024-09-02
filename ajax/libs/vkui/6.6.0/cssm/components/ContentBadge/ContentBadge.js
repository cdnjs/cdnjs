import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Caption } from '../Typography/Caption/Caption';
import { Footnote } from '../Typography/Footnote/Footnote';
import { ContentBadgeContext } from './ContentBadgeContext';
import { ContentBadgeSlotIcon } from './ContentBadgeSlotIcon';
import styles from './ContentBadge.module.css';
const appearanceClassNames = {
    'accent': {
        primary: styles['ContentBadge--primary-accent'],
        secondary: styles['ContentBadge--secondary-accent'],
        outline: styles['ContentBadge--outline-accent']
    },
    'neutral': {
        primary: styles['ContentBadge--primary-neutral'],
        secondary: styles['ContentBadge--secondary-neutral'],
        outline: styles['ContentBadge--outline-neutral']
    },
    'accent-green': {
        primary: styles['ContentBadge--primary-accent-green'],
        secondary: styles['ContentBadge--secondary-accent-green'],
        outline: styles['ContentBadge--outline-accent-green']
    },
    'accent-red': {
        primary: styles['ContentBadge--primary-accent-red'],
        secondary: styles['ContentBadge--secondary-accent-red'],
        outline: styles['ContentBadge--outline-accent-red']
    },
    'overlay': {
        primary: styles['ContentBadge--primary-overlay'],
        secondary: styles['ContentBadge--secondary-overlay'],
        outline: styles['ContentBadge--outline-overlay']
    }
};
const sizeClassNames = {
    s: styles['ContentBadge--size-s'],
    m: styles['ContentBadge--size-m'],
    l: styles['ContentBadge--size-l']
};
/**
 * Компонент, который позволяет добавить текстовые или иконочные бейджи. Как правило, используются
 * поверх других элементов или рядом с ними.
 *
 * Используйте `ContentBadge.SlotIcon` для размещения иконок внутри `ContentBadge`.
 *
 * @since 6.1.0
 * @see https://vkcom.github.io/VKUI/#/ContentBadge
 *
 * TODO [>=7]: переименовать в Badge
 */ export const ContentBadge = ({ appearance = 'accent', mode = 'primary', capsule, size = 'm', weight = '2', className, children, ...restProps })=>{
    const TypographyComponent = size === 'l' ? Footnote : Caption;
    return /*#__PURE__*/ _jsx(TypographyComponent, {
        ...restProps,
        weight: weight,
        normalize: true,
        className: classNames(className, styles.ContentBadge, size !== 's' && capsule && styles['ContentBadge--capsule'], mode === 'outline' && styles['ContentBadge--mode-outline'], appearanceClassNames[appearance][mode], sizeClassNames[size]),
        children: /*#__PURE__*/ _jsx(ContentBadgeContext.Provider, {
            value: {
                isSingleChild: React.Children.count(children) === 1,
                size
            },
            children: children
        })
    });
};
ContentBadge.displayName = 'ContentBadge';
ContentBadge.SlotIcon = ContentBadgeSlotIcon;
ContentBadge.SlotIcon.displayName = 'ContentBadge.SlotIcon';

//# sourceMappingURL=ContentBadge.js.map