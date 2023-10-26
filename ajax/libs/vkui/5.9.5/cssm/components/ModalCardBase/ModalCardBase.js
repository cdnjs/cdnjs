import * as React from 'react';
import { Icon24Dismiss } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useKeyboard } from '../../hooks/useKeyboard';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { Platform } from '../../lib/platform';
import { AdaptivityContext } from '../AdaptivityProvider/AdaptivityContext';
import { ModalDismissButton } from '../ModalDismissButton/ModalDismissButton';
import { PanelHeaderButton } from '../PanelHeaderButton/PanelHeaderButton';
import { RootComponent } from '../RootComponent/RootComponent';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Title } from '../Typography/Title/Title';
import styles from './ModalCardBase.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/ModalCardBase
 */ export const ModalCardBase = ({ icon, header, subheader, children, actions, onClose, dismissLabel = 'Скрыть', style, size: sizeProp, ...restProps })=>{
    const platform = usePlatform();
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    const isSoftwareKeyboardOpened = useKeyboard().isOpened;
    const canShowCloseButtonIOS = platform === Platform.IOS && !isDesktop;
    const size = isDesktop ? sizeProp : undefined;
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: classNames('vkuiInternalModalCardBase', platform === Platform.IOS && styles['ModalCardBase--ios'], isDesktop && styles['ModalCardBase--desktop']),
        style: {
            ...style,
            maxWidth: size
        }
    }, /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['ModalCardBase__container'], isSoftwareKeyboardOpened && styles['ModalCardBase__container--softwareKeyboardOpened'])
    }, hasReactNode(icon) && /*#__PURE__*/ React.createElement("div", {
        className: styles['ModalCardBase__icon']
    }, icon), hasReactNode(header) && /*#__PURE__*/ React.createElement(Title, {
        level: "2",
        weight: "2",
        className: classNames(styles['ModalCardBase__header'], 'vkuiInternalModalCardBase__header')
    }, header), hasReactNode(subheader) && /*#__PURE__*/ React.createElement(AdaptivityContext.Provider, {
        value: {
            sizeY: SizeType.REGULAR
        }
    }, /*#__PURE__*/ React.createElement(Subhead, {
        className: classNames(styles['ModalCardBase__subheader'], 'vkuiInternalModalCardBase__subheader')
    }, subheader)), children, hasReactNode(actions) && /*#__PURE__*/ React.createElement("div", {
        className: styles['ModalCardBase__actions']
    }, actions), isDesktop && /*#__PURE__*/ React.createElement(ModalDismissButton, {
        onClick: onClose
    }), canShowCloseButtonIOS && /*#__PURE__*/ React.createElement(PanelHeaderButton, {
        "aria-label": dismissLabel,
        className: styles['ModalCardBase__dismiss'],
        onClick: onClose
    }, /*#__PURE__*/ React.createElement(Icon24Dismiss, null))));
};

//# sourceMappingURL=ModalCardBase.js.map