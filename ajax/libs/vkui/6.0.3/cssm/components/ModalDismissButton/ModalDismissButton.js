import * as React from 'react';
import { Icon20Cancel } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { Tappable } from '../Tappable/Tappable';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './ModalDismissButton.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/ModalDismissButton
 */ export const ModalDismissButton = ({ children = 'Закрыть', className, ...restProps })=>{
    return /*#__PURE__*/ React.createElement(Tappable, {
        className: classNames(styles['ModalDismissButton'], className),
        ...restProps,
        activeMode: styles['ModalDismissButton--active'],
        hoverMode: styles['ModalDismissButton--hover']
    }, children && /*#__PURE__*/ React.createElement(VisuallyHidden, null, children), /*#__PURE__*/ React.createElement(Icon20Cancel, null));
};

//# sourceMappingURL=ModalDismissButton.js.map