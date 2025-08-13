'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
const appearanceClassNames = {
    'accent': {
        primary: "vkuiContentBadge__primaryAccent",
        secondary: "vkuiContentBadge__secondaryAccent",
        outline: "vkuiContentBadge__outlineAccent"
    },
    'neutral': {
        primary: "vkuiContentBadge__primaryNeutral",
        secondary: "vkuiContentBadge__secondaryNeutral",
        outline: "vkuiContentBadge__outlineNeutral"
    },
    'accent-green': {
        primary: "vkuiContentBadge__primaryAccentGreen",
        secondary: "vkuiContentBadge__secondaryAccentGreen",
        outline: "vkuiContentBadge__outlineAccentGreen"
    },
    'accent-red': {
        primary: "vkuiContentBadge__primaryAccentRed",
        secondary: "vkuiContentBadge__secondaryAccentRed",
        outline: "vkuiContentBadge__outlineAccentRed"
    },
    'overlay': {
        primary: "vkuiContentBadge__primaryOverlay",
        secondary: "vkuiContentBadge__secondaryOverlay",
        outline: "vkuiContentBadge__outlineOverlay"
    }
};
const sizeClassNames = {
    s: "vkuiContentBadge__sizeS",
    m: "vkuiContentBadge__sizeM",
    l: "vkuiContentBadge__sizeL"
};
/**
 * Компонент, который позволяет добавить текстовые или иконочные бейджи. Как правило, используются
 * поверх других элементов или рядом с ними.
 *
 * Используйте `ContentBadge.SlotIcon` для размещения иконок внутри `ContentBadge`.
 *
 * @since 6.1.0
 * @see https://vkui.io/components/content-badge
 */ export const ContentBadge = (_param)=>{
    var { appearance = 'accent', mode = 'primary', capsule, size = 'm', weight = '2', children } = _param, restProps = _object_without_properties(_param, [
        "appearance",
        "mode",
        "capsule",
        "size",
        "weight",
        "children"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const typographyClassNames = size === 'l' ? footnoteClassNames(sizeY) : captionClassNames(sizeY);
    return /*#__PURE__*/ _jsx(Tappable, _object_spread_props(_object_spread({
        baseClassName: classNames("vkuiContentBadge__host", size !== 's' && capsule && "vkuiContentBadge__capsule", mode === 'outline' && "vkuiContentBadge__modeOutline", appearanceClassNames[appearance][mode], sizeClassNames[size], typographyClassNames, weightClassNames(weight)),
        DefaultComponent: "span",
        hoverMode: "opacity",
        activeMode: "opacity"
    }, restProps), {
        children: /*#__PURE__*/ _jsx(ContentBadgeContext.Provider, {
            value: {
                isSingleChild: React.Children.count(children) === 1,
                size
            },
            children: children
        })
    }));
};
ContentBadge.IconSlot = ContentBadgeIconSlot;
ContentBadge.SlotIcon = ContentBadgeIconSlot;
if (process.env.NODE_ENV !== 'production') {
    defineComponentDisplayNames(ContentBadge.IconSlot, 'ContentBadge.IconSlot');
    defineComponentDisplayNames(ContentBadge.SlotIcon, 'ContentBadge.SlotIcon');
}

//# sourceMappingURL=ContentBadge.js.map