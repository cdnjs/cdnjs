import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Caption } from "../Typography/Caption/Caption.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { ContentBadgeContext } from "./ContentBadgeContext.js";
import { ContentBadgeSlotIcon } from "./ContentBadgeSlotIcon.js";
import styles from "./ContentBadge.module.css";
const appearanceClassNames = {
    'accent': {
        primary: styles.primaryAccent,
        secondary: styles.secondaryAccent,
        outline: styles.outlineAccent
    },
    'neutral': {
        primary: styles.primaryNeutral,
        secondary: styles.secondaryNeutral,
        outline: styles.outlineNeutral
    },
    'accent-green': {
        primary: styles.primaryAccentGreen,
        secondary: styles.secondaryAccentGreen,
        outline: styles.outlineAccentGreen
    },
    'accent-red': {
        primary: styles.primaryAccentRed,
        secondary: styles.secondaryAccentRed,
        outline: styles.outlineAccentRed
    },
    'overlay': {
        primary: styles.primaryOverlay,
        secondary: styles.secondaryOverlay,
        outline: styles.outlineOverlay
    }
};
const sizeClassNames = {
    s: styles.sizeS,
    m: styles.sizeM,
    l: styles.sizeL
};
/**
 * Компонент, который позволяет добавить текстовые или иконочные бейджи. Как правило, используются
 * поверх других элементов или рядом с ними.
 *
 * Используйте `ContentBadge.SlotIcon` для размещения иконок внутри `ContentBadge`.
 *
 * @since 6.1.0
 * @see https://vkcom.github.io/VKUI/#/ContentBadge
 */ export const ContentBadge = ({ appearance = 'accent', mode = 'primary', capsule, size = 'm', weight = '2', className, children, ...restProps })=>{
    const TypographyComponent = size === 'l' ? Footnote : Caption;
    return /*#__PURE__*/ _jsx(TypographyComponent, {
        ...restProps,
        weight: weight,
        normalize: true,
        className: classNames(className, styles.host, size !== 's' && capsule && styles.capsule, mode === 'outline' && styles.modeOutline, appearanceClassNames[appearance][mode], sizeClassNames[size]),
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