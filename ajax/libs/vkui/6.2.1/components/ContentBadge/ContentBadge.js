import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Caption } from '../Typography/Caption/Caption';
import { Footnote } from '../Typography/Footnote/Footnote';
import { ContentBadgeContext } from './ContentBadgeContext';
import { ContentBadgeSlotIcon } from './ContentBadgeSlotIcon';
const appearanceClassNames = {
    'accent': {
        primary: "vkuiContentBadge--primary-accent",
        secondary: "vkuiContentBadge--secondary-accent",
        outline: "vkuiContentBadge--outline-accent"
    },
    'neutral': {
        primary: "vkuiContentBadge--primary-neutral",
        secondary: "vkuiContentBadge--secondary-neutral",
        outline: "vkuiContentBadge--outline-neutral"
    },
    'accent-green': {
        primary: "vkuiContentBadge--primary-accent-green",
        secondary: "vkuiContentBadge--secondary-accent-green",
        outline: "vkuiContentBadge--outline-accent-green"
    },
    'accent-red': {
        primary: "vkuiContentBadge--primary-accent-red",
        secondary: "vkuiContentBadge--secondary-accent-red",
        outline: "vkuiContentBadge--outline-accent-red"
    },
    'overlay': {
        primary: "vkuiContentBadge--primary-overlay",
        secondary: "vkuiContentBadge--secondary-overlay",
        outline: "vkuiContentBadge--outline-overlay"
    }
};
const sizeClassNames = {
    s: "vkuiContentBadge--size-s",
    m: "vkuiContentBadge--size-m",
    l: "vkuiContentBadge--size-l"
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
 */ export const ContentBadge = (_param)=>{
    var { appearance = 'accent', mode = 'primary', capsule, size = 'm', weight = '2', className, children } = _param, restProps = _object_without_properties(_param, [
        "appearance",
        "mode",
        "capsule",
        "size",
        "weight",
        "className",
        "children"
    ]);
    const TypographyComponent = size === 'l' ? Footnote : Caption;
    return /*#__PURE__*/ _jsx(TypographyComponent, _object_spread_props(_object_spread({}, restProps), {
        weight: weight,
        normalize: true,
        className: classNames(className, "vkuiContentBadge", size !== 's' && capsule && "vkuiContentBadge--capsule", mode === 'outline' && "vkuiContentBadge--mode-outline", appearanceClassNames[appearance][mode], sizeClassNames[size]),
        children: /*#__PURE__*/ _jsx(ContentBadgeContext.Provider, {
            value: {
                isSingleChild: React.Children.count(children) === 1,
                size
            },
            children: children
        })
    }));
};
ContentBadge.displayName = 'ContentBadge';
ContentBadge.SlotIcon = ContentBadgeSlotIcon;
ContentBadge.SlotIcon.displayName = 'ContentBadge.SlotIcon';

//# sourceMappingURL=ContentBadge.js.map