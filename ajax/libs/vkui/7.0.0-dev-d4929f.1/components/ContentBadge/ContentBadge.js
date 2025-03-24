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
        primary: "ContentBadge__primaryAccent--zOq66",
        secondary: "ContentBadge__secondaryAccent--6azkN",
        outline: "ContentBadge__outlineAccent--sv84d"
    },
    'neutral': {
        primary: "ContentBadge__primaryNeutral--k0z50",
        secondary: "ContentBadge__secondaryNeutral--qnr2z",
        outline: "ContentBadge__outlineNeutral--Wh1B7"
    },
    'accent-green': {
        primary: "ContentBadge__primaryAccentGreen--JFjJU",
        secondary: "ContentBadge__secondaryAccentGreen--FTQxj",
        outline: "ContentBadge__outlineAccentGreen--nNQpC"
    },
    'accent-red': {
        primary: "ContentBadge__primaryAccentRed--u4C8i",
        secondary: "ContentBadge__secondaryAccentRed--3HR-6",
        outline: "ContentBadge__outlineAccentRed--dhSE9"
    },
    'overlay': {
        primary: "ContentBadge__primaryOverlay--r-WoG",
        secondary: "ContentBadge__secondaryOverlay--q-reF",
        outline: "ContentBadge__outlineOverlay--GfnSI"
    }
};
const sizeClassNames = {
    s: "ContentBadge__sizeS--9AkO2",
    m: "ContentBadge__sizeM--6SWWT",
    l: "ContentBadge__sizeL--Xs5Ys"
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
        className: classNames(className, "ContentBadge__host--QyOOS", size !== 's' && capsule && "ContentBadge__capsule--SwS3R", mode === 'outline' && "ContentBadge__modeOutline--dJss7", appearanceClassNames[appearance][mode], sizeClassNames[size]),
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