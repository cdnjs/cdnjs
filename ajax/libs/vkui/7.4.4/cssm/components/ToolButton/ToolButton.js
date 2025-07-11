'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { AdaptiveIconRenderer } from "../AdaptiveIconRenderer/AdaptiveIconRenderer.js";
import { Tappable } from "../Tappable/Tappable.js";
import styles from "./ToolButton.module.css";
const stylesMode = {
    primary: styles.modePrimary,
    secondary: styles.modeSecondary,
    tertiary: styles.modeTertiary,
    outline: styles.modeOutline
};
const stylesAppearance = {
    accent: styles.appearanceAccent,
    neutral: styles.appearanceNeutral
};
const stylesDirection = {
    row: styles.directionRow,
    column: styles.directionColumn
};
const sizeYClassNames = {
    none: styles.sizeYNone,
    regular: styles.sizeYRegular
};
/**
 * Кнопки, которые используются для вызова инструмента, вставки аттачей или
 * для форматирования. Их можно использовать как кнопки для разового действия
 * или для включения/выключения режима.
 *
 * @see https://vkcom.github.io/VKUI/#/ToolButton
 */ export const ToolButton = ({ mode = 'primary', appearance = 'accent', direction = 'row', children, IconCompact, IconRegular, rounded, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const hasChildren = hasReactNode(children);
    return /*#__PURE__*/ _jsxs(Tappable, {
        hoverMode: styles.hover,
        activeMode: styles.active,
        Component: restProps.href ? 'a' : 'button',
        focusVisibleMode: "outside",
        baseClassName: classNames(styles.host, rounded && getRoundedClassName(direction, hasChildren), hasChildren && direction === 'row' && styles.withFakeEndIcon, stylesMode[mode], stylesAppearance[appearance], stylesDirection[direction], sizeY !== 'compact' && sizeYClassNames[sizeY]),
        ...restProps,
        children: [
            /*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
                IconCompact: IconCompact,
                IconRegular: IconRegular
            }),
            hasChildren && /*#__PURE__*/ _jsx("span", {
                className: styles.text,
                children: children
            })
        ]
    });
};
export function getRoundedClassName(direction, hasChildren) {
    switch(direction){
        case 'row':
            return styles.rounded;
        case 'column':
            return hasChildren ? undefined : styles.rounded;
    }
}

//# sourceMappingURL=ToolButton.js.map