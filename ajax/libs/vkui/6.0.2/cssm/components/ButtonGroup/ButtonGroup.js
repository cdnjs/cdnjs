import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './ButtonGroup.module.css';
const stylesMode = {
    vertical: styles['ButtonGroup--mode-vertical'],
    horizontal: styles['ButtonGroup--mode-horizontal']
};
const stylesGap = {
    space: styles['ButtonGroup--gap-space'],
    s: styles['ButtonGroup--gap-s'],
    m: styles['ButtonGroup--gap-m']
};
const stylesAlign = {
    left: styles['ButtonGroup--align-left'],
    center: styles['ButtonGroup--align-center'],
    right: styles['ButtonGroup--align-right']
};
/**
 * @see https://vkcom.github.io/VKUI/#/ButtonGroup
 */ export const ButtonGroup = ({ mode = 'horizontal', gap = 'm', stretched = false, align = 'left' /* NOTE: Чтобы блоки по-умолчанию не растягивались на всю ширину контейнера */ , ...restProps })=>{
    return /*#__PURE__*/ React.createElement(RootComponent, {
        baseClassName: classNames(styles.ButtonGroup, stylesMode[mode], gap !== 'none' && stylesGap[gap], stretched && styles['ButtonGroup--stretched'], stylesAlign[align]),
        role: "group",
        ...restProps
    });
};

//# sourceMappingURL=ButtonGroup.js.map