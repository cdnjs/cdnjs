import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useKeyboard } from '../../hooks/useKeyboard';
import { usePlatform } from '../../hooks/usePlatform';
import { AdaptivityContext } from '../AdaptivityProvider/AdaptivityContext';
import { RootComponent } from '../RootComponent/RootComponent';
import { Spacing } from '../Spacing/Spacing';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Title } from '../Typography/Title/Title';
import { ModalCardBaseCloseButton } from './ModalCardBaseCloseButton';
import styles from './ModalCardBase.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/ModalCardBase
 */ export const ModalCardBase = ({ icon, header, headerComponent = 'span', subheader, subheaderComponent = 'span', children, actions, onClose, dismissLabel = 'Скрыть', style, size: sizeProp, modalDismissButtonTestId, dismissButtonMode = 'outside', ...restProps })=>{
    const platform = usePlatform();
    const { isDesktop } = useAdaptivityWithJSMediaQueries();
    const isSoftwareKeyboardOpened = useKeyboard().isOpened;
    const size = isDesktop ? sizeProp : undefined;
    const withSafeZone = !icon && (dismissButtonMode === 'inside' || platform === 'ios' && !isDesktop);
    const hasHeader = hasReactNode(header);
    const hasSubheader = hasReactNode(subheader);
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: classNames('vkuiInternalModalCardBase', platform === 'ios' && styles['ModalCardBase--ios'], isDesktop && styles['ModalCardBase--desktop'], withSafeZone && styles['ModalCardBase--withSafeZone']),
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
        className: styles['ModalCardBase__header'],
        Component: headerComponent
    }, header), hasHeader && hasSubheader && /*#__PURE__*/ React.createElement(Spacing, {
        size: 8
    }), hasSubheader && /*#__PURE__*/ React.createElement(AdaptivityContext.Provider, {
        value: {
            sizeY: 'regular'
        }
    }, /*#__PURE__*/ React.createElement(Subhead, {
        className: styles['ModalCardBase__subheader'],
        Component: subheaderComponent
    }, subheader)), children, hasReactNode(actions) && /*#__PURE__*/ React.createElement("div", {
        className: styles['ModalCardBase__actions']
    }, actions), /*#__PURE__*/ React.createElement(ModalCardBaseCloseButton, {
        testId: modalDismissButtonTestId,
        onClose: onClose,
        mode: dismissButtonMode
    }, dismissLabel)));
};

//# sourceMappingURL=ModalCardBase.js.map