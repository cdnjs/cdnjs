import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import styles from './ButtonGroup.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/ButtonGroup
 */ export const ButtonGroup = ({ mode = 'horizontal', gap = 'm', stretched = false, align = 'left' /* NOTE: Чтобы блоки по-умолчанию не растягивались на всю ширину контейнера */ , getRootRef, className, children, ...restProps })=>{
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames(className, styles.ButtonGroup, {
            vertical: styles['ButtonGroup--mode-vertical'],
            horizontal: styles['ButtonGroup--mode-horizontal']
        }[mode], gap !== 'none' && ({
            space: styles['ButtonGroup--gap-space'],
            s: styles['ButtonGroup--gap-s'],
            m: styles['ButtonGroup--gap-m']
        })[gap], stretched && styles['ButtonGroup--stretched'], {
            left: styles['ButtonGroup--align-left'],
            center: styles['ButtonGroup--align-center'],
            right: styles['ButtonGroup--align-right']
        }[align]),
        role: "group",
        ref: getRootRef,
        ...restProps
    }, children);
};

//# sourceMappingURL=ButtonGroup.js.map