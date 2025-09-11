'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { defineComponentDisplayNames } from "../../lib/react/defineComponentDisplayNames.js";
import { Tappable } from "../Tappable/Tappable.js";
import { captionClassNames } from "../Typography/Caption/Caption.js";
import { footnoteClassNames } from "../Typography/Footnote/Footnote.js";
import { weightClassNames } from "../Typography/Typography.js";
import { ContentBadgeContext } from "./ContentBadgeContext.js";
import { ContentBadgeIconSlot } from "./ContentBadgeIconSlot.js";
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
 * @see https://vkui.io/components/content-badge
 */ export const ContentBadge = ({ appearance = 'accent', mode = 'primary', capsule, size = 'm', weight = '2', children, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const typographyClassNames = size === 'l' ? footnoteClassNames(sizeY) : captionClassNames(sizeY);
    return /*#__PURE__*/ _jsx(Tappable, {
        baseClassName: classNames(styles.host, size !== 's' && capsule && styles.capsule, mode === 'outline' && styles.modeOutline, appearanceClassNames[appearance][mode], sizeClassNames[size], typographyClassNames, weightClassNames(weight)),
        DefaultComponent: "span",
        hoverMode: "opacity",
        activeMode: "opacity",
        ...restProps,
        children: /*#__PURE__*/ _jsx(ContentBadgeContext.Provider, {
            value: {
                isSingleChild: React.Children.count(children) === 1,
                size
            },
            children: children
        })
    });
};
ContentBadge.IconSlot = ContentBadgeIconSlot;
ContentBadge.SlotIcon = ContentBadgeIconSlot;
if (process.env.NODE_ENV !== 'production') {
    defineComponentDisplayNames(ContentBadge.IconSlot, 'ContentBadge.IconSlot');
    defineComponentDisplayNames(ContentBadge.SlotIcon, 'ContentBadge.SlotIcon');
}

//# sourceMappingURL=ContentBadge.js.map