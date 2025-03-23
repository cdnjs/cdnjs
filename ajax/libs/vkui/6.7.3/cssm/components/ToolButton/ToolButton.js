import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { AdaptiveIconRenderer } from '../AdaptiveIconRenderer/AdaptiveIconRenderer';
import { Tappable } from '../Tappable/Tappable';
import styles from './ToolButton.module.css';
const stylesMode = {
    primary: styles['ToolButton--mode-primary'],
    secondary: styles['ToolButton--mode-secondary'],
    tertiary: styles['ToolButton--mode-tertiary'],
    outline: styles['ToolButton--mode-outline']
};
const stylesAppearance = {
    accent: styles['ToolButton--appearance-accent'],
    neutral: styles['ToolButton--appearance-neutral']
};
const stylesDirection = {
    row: styles['ToolButton--direction-row'],
    column: styles['ToolButton--direction-column']
};
const sizeYClassNames = {
    none: styles['ToolButton--sizeY-none'],
    regular: styles['ToolButton--sizeY-regular']
};
/**
 * Кнопки, которые используются для вызова инструмента, вставки аттачей или
 * для форматирования. Их можно использовать как кнопки для разового действия
 * или для включения/выключения режима.
 *
 * @see https://vkcom.github.io/VKUI/#/ToolButton
 */ export const ToolButton = ({ mode = 'primary', appearance = 'accent', direction = 'row', className, children, IconCompact, IconRegular, rounded, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    const hasChildren = hasReactNode(children);
    return /*#__PURE__*/ _jsxs(Tappable, {
        hoverMode: styles['ToolButton--hover'],
        activeMode: styles['ToolButton--active'],
        Component: restProps.href ? 'a' : 'button',
        focusVisibleMode: "outside",
        className: classNames(className, styles['ToolButton'], rounded && getRoundedClassName(direction, hasChildren), hasChildren && direction === 'row' && styles['ToolButton--withFakeEndIcon'], stylesMode[mode], stylesAppearance[appearance], stylesDirection[direction], sizeY !== 'compact' && sizeYClassNames[sizeY]),
        ...restProps,
        children: [
            /*#__PURE__*/ _jsx(AdaptiveIconRenderer, {
                IconCompact: IconCompact,
                IconRegular: IconRegular
            }),
            hasChildren && /*#__PURE__*/ _jsx("span", {
                className: styles['ToolButton__text'],
                children: children
            })
        ]
    });
};
export function getRoundedClassName(direction, hasChildren) {
    switch(direction){
        case 'row':
            return styles['ToolButton--rounded'];
        case 'column':
            return hasChildren ? undefined : styles['ToolButton--rounded'];
    }
}

//# sourceMappingURL=ToolButton.js.map