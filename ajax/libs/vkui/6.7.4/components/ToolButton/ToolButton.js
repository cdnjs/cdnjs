import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { AdaptiveIconRenderer } from '../AdaptiveIconRenderer/AdaptiveIconRenderer';
import { Tappable } from '../Tappable/Tappable';
const stylesMode = {
    primary: "vkuiToolButton--mode-primary",
    secondary: "vkuiToolButton--mode-secondary",
    tertiary: "vkuiToolButton--mode-tertiary",
    outline: "vkuiToolButton--mode-outline"
};
const stylesAppearance = {
    accent: "vkuiToolButton--appearance-accent",
    neutral: "vkuiToolButton--appearance-neutral"
};
const stylesDirection = {
    row: "vkuiToolButton--direction-row",
    column: "vkuiToolButton--direction-column"
};
const sizeYClassNames = {
    none: "vkuiToolButton--sizeY-none",
    regular: "vkuiToolButton--sizeY-regular"
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
        hoverMode: "vkuiToolButton--hover",
        activeMode: "vkuiToolButton--active",
        Component: restProps.href ? 'a' : 'button',
        focusVisibleMode: "outside",
        className: classNames(className, "vkuiToolButton", rounded && getRoundedClassName(direction, hasChildren), hasChildren && direction === 'row' && "vkuiToolButton--withFakeEndIcon", stylesMode[mode], stylesAppearance[appearance], stylesDirection[direction], sizeY !== 'compact' && sizeYClassNames[sizeY])
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
            return "vkuiToolButton--rounded";
        case 'column':
            return hasChildren ? undefined : "vkuiToolButton--rounded";
    }
}

//# sourceMappingURL=ToolButton.js.map