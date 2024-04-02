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
    ['compact']: styles['SubnavigationButton--sizeY-compact']
};
const SubnavigationButtonTypography = ({ textLevel, ...restProps })=>{
    if (textLevel === '1') {
        return /*#__PURE__*/ React.createElement(Subhead, restProps);
    }
    return /*#__PURE__*/ React.createElement(Caption, {
        level: textLevel === '2' ? '1' : '2',
        ...restProps
    });
};
/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationButton
 */ export const SubnavigationButton = ({ mode = 'primary', appearance = 'accent', size = 'm', selected, textLevel = '1', before, after, expandable, children, className, ...restProps })=>{
    const { sizeY = 'none' } = useAdaptivity();
    return /*#__PURE__*/ React.createElement(Tappable, {
        ...restProps,
        hasActive: false,
        focusVisibleMode: "outside",
        className: classNames(styles['SubnavigationButton'], sizeStyles[size], modeStyles[mode], appearanceStyles[appearance], selected && styles['SubnavigationButton--selected'], sizeY !== 'regular' && sizeYClassNames[sizeY], className)
    }, /*#__PURE__*/ React.createElement("span", {
        className: styles['SubnavigationButton__in']
    }, before && /*#__PURE__*/ React.createElement("span", {
        className: styles['SubnavigationButton__before']
    }, before), /*#__PURE__*/ React.createElement(SubnavigationButtonTypography, {
        textLevel: textLevel,
        className: styles['SubnavigationButton__label'],
        Component: "span"
    }, children), after && /*#__PURE__*/ React.createElement("span", {
        className: styles['SubnavigationButton__after']
    }, after), expandable && /*#__PURE__*/ React.createElement(Icon16Dropdown, {
        className: styles['SubnavigationButton__expandableIcon']
    })));
};

//# sourceMappingURL=SubnavigationButton.js.map