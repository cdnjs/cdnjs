import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon16Dropdown } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { Tappable } from '../Tappable/Tappable';
import { Caption } from '../Typography/Caption/Caption';
import { Subhead } from '../Typography/Subhead/Subhead';
import styles from './SubnavigationButton.module.css';
const appearanceStyles = {
    accent: styles['SubnavigationButton--appearance-accent'],
    neutral: styles['SubnavigationButton--appearance-neutral']
};
const modeStyles = {
    primary: styles['SubnavigationButton--mode-primary'],
    outline: styles['SubnavigationButton--mode-outline'],
    tertiary: styles['SubnavigationButton--mode-tertiary']
};
const sizeStyles = {
    s: styles['SubnavigationButton--size-s'],
    m: styles['SubnavigationButton--size-m'],
    l: styles['SubnavigationButton--size-l']
};
const sizeYClassNames = {
    none: styles['SubnavigationButton--sizeY-none'],
    compact: styles['SubnavigationButton--sizeY-compact']
};
const SubnavigationButtonTypography = ({ textLevel, ...restProps })=>{
    if (textLevel === '1') {
        return /*#__PURE__*/ _jsx(Subhead, {
            ...restProps
        });
    }
    return /*#__PURE__*/ _jsx(Caption, {
        level: textLevel === '2' ? '1' : '2',
        ...restProps
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationButton
 */ export const SubnavigationButton = ({ mode = 'primary', appearance = 'accent', size = 'm', selected, textLevel = '1', before, after, expandable, children, className, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(Tappable, {
        ...restProps,
        hasActive: false,
        focusVisibleMode: "outside",
        className: classNames(styles['SubnavigationButton'], sizeStyles[size], modeStyles[mode], appearanceStyles[appearance], selected && styles['SubnavigationButton--selected'], sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        children: /*#__PURE__*/ _jsxs("span", {
            className: styles['SubnavigationButton__in'],
            children: [
                before && /*#__PURE__*/ _jsx("span", {
                    className: styles['SubnavigationButton__before'],
                    children: before
                }),
                /*#__PURE__*/ _jsx(SubnavigationButtonTypography, {
                    textLevel: textLevel,
                    className: styles['SubnavigationButton__label'],
                    Component: "span",
                    children: children
                }),
                after && /*#__PURE__*/ _jsx("span", {
                    className: styles['SubnavigationButton__after'],
                    children: after
                }),
                expandable && /*#__PURE__*/ _jsx(Icon16Dropdown, {
                    className: styles['SubnavigationButton__expandableIcon']
                })
            ]
        })
    });
};

//# sourceMappingURL=SubnavigationButton.js.map