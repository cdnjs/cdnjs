import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Caption } from "../Typography/Caption/Caption.js";
import { Footnote } from "../Typography/Footnote/Footnote.js";
import { ContentBadgeContext } from "./ContentBadgeContext.js";
import { ContentBadgeSlotIcon } from "./ContentBadgeSlotIcon.js";
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
 * @see https://vkcom.github.io/VKUI/#/ContentBadge
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
        className: classNames(className, "vkuiContentBadge__host", size !== 's' && capsule && "vkuiContentBadge__capsule", mode === 'outline' && "vkuiContentBadge__modeOutline", appearanceClassNames[appearance][mode], sizeClassNames[size]),
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