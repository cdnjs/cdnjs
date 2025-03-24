'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { AdaptiveIconRenderer } from "../AdaptiveIconRenderer/AdaptiveIconRenderer.js";
import { Tappable } from "../Tappable/Tappable.js";
const stylesMode = {
    primary: "ToolButton__modePrimary--LGvYu",
    secondary: "ToolButton__modeSecondary--YyoV4",
    tertiary: "ToolButton__modeTertiary--bhcKI",
    outline: "ToolButton__modeOutline--rlENh"
};
const stylesAppearance = {
    accent: "ToolButton__appearanceAccent--WQ2V0",
    neutral: "ToolButton__appearanceNeutral--9Qii9"
};
const stylesDirection = {
    row: "ToolButton__directionRow--SXxEc",
    column: "ToolButton__directionColumn--J1dtB"
};
const sizeYClassNames = {
    none: "ToolButton__sizeYNone--PCyto",
    regular: "ToolButton__sizeYRegular--CKeVZ"
};
/**
 * Кнопки, которые используются для вызова инструмента, вставки аттачей или
 * для форматирования. Их можно использовать как кнопки для разового действия
 * или для включения/выключения режима.
 *
 * @see https://vkcom.github.io/VKUI/#/ToolButton
 */ export const ToolButton = (_param)=>{
    var { mode = 'primary', appearance = 'accent', direction = 'row', className, children, IconCompact, IconRegular, rounded } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "appearance",
        "direction",
        "className",
        "children",
        "IconCompact",
        "IconRegular",
        "rounded"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const hasChildren = hasReactNode(children);
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
        hoverMode: "ToolButton__hover--Memtt",
        activeMode: "ToolButton__active--6iOmj",
        Component: restProps.href ? 'a' : 'button',
        focusVisibleMode: "outside",
        className: classNames(className, "ToolButton__host--ozsuy", rounded && getRoundedClassName(direction, hasChildren), hasChildren && direction === 'row' && "ToolButton__withFakeEndIcon--h-XFo", stylesMode[mode], stylesAppearance[appearance], stylesDirection[direction], sizeY !== 'compact' && sizeYClassNames[sizeY])
    }, restProps), {
        children: [
            /*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
                IconCompact: IconCompact,
                IconRegular: IconRegular
            }),
            hasChildren && /*#__PURE__*/ _jsx("span", {
                className: "ToolButton__text--xrq7n",
                children: children
            })
        ]
    }));
};
export function getRoundedClassName(direction, hasChildren) {
    switch(direction){
        case 'row':
            return "ToolButton__rounded--NoyNv";
        case 'column':
            return hasChildren ? undefined : "ToolButton__rounded--NoyNv";
    }
}

//# sourceMappingURL=ToolButton.js.map