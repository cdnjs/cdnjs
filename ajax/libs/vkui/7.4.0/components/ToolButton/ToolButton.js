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
    primary: "vkuiToolButton__modePrimary",
    secondary: "vkuiToolButton__modeSecondary",
    tertiary: "vkuiToolButton__modeTertiary",
    outline: "vkuiToolButton__modeOutline"
};
const stylesAppearance = {
    accent: "vkuiToolButton__appearanceAccent",
    neutral: "vkuiToolButton__appearanceNeutral"
};
const stylesDirection = {
    row: "vkuiToolButton__directionRow",
    column: "vkuiToolButton__directionColumn"
};
const sizeYClassNames = {
    none: "vkuiToolButton__sizeYNone",
    regular: "vkuiToolButton__sizeYRegular"
};
/**
 * Кнопки, которые используются для вызова инструмента, вставки аттачей или
 * для форматирования. Их можно использовать как кнопки для разового действия
 * или для включения/выключения режима.
 *
 * @see https://vkcom.github.io/VKUI/#/ToolButton
 */ export const ToolButton = (_param)=>{
    var { mode = 'primary', appearance = 'accent', direction = 'row', children, IconCompact, IconRegular, rounded } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "appearance",
        "direction",
        "children",
        "IconCompact",
        "IconRegular",
        "rounded"
    ]);
    const { sizeY = 'none' } = useAdaptivity();
    const hasChildren = hasReactNode(children);
    return /*#__PURE__*/ _jsxs(Tappable, _object_spread_props(_object_spread({
        hoverMode: "vkuiToolButton__hover",
        activeMode: "vkuiToolButton__active",
        Component: restProps.href ? 'a' : 'button',
        focusVisibleMode: "outside",
        baseClassName: classNames("vkuiToolButton__host", rounded && getRoundedClassName(direction, hasChildren), hasChildren && direction === 'row' && "vkuiToolButton__withFakeEndIcon", stylesMode[mode], stylesAppearance[appearance], stylesDirection[direction], sizeY !== 'compact' && sizeYClassNames[sizeY])
    }, restProps), {
        children: [
            /*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
                IconCompact: IconCompact,
                IconRegular: IconRegular
            }),
            hasChildren && /*#__PURE__*/ _jsx("span", {
                className: "vkuiToolButton__text",
                children: children
            })
        ]
    }));
};
export function getRoundedClassName(direction, hasChildren) {
    switch(direction){
        case 'row':
            return "vkuiToolButton__rounded";
        case 'column':
            return hasChildren ? undefined : "vkuiToolButton__rounded";
    }
}

//# sourceMappingURL=ToolButton.js.map