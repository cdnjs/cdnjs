import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useOrientationChange } from '../../hooks/useOrientationChange';
import { usePlatform } from '../../hooks/usePlatform';
import { SizeType } from '../../lib/adaptivity';
import { getNavId } from '../../lib/getNavId';
import { Platform } from '../../lib/platform';
import { multiRef } from '../../lib/utils';
import { warnOnce } from '../../lib/warnOnce';
import { ModalDismissButton } from '../ModalDismissButton/ModalDismissButton';
import { ModalRootContext, useModalRegistry } from '../ModalRoot/ModalRootContext';
import { ModalType } from '../ModalRoot/types';
import styles from './ModalPage.module.css';
const sizeClassName = {
    s: styles['ModalPage--size-s'],
    m: styles['ModalPage--size-m'],
    l: styles['ModalPage--size-l']
};
const warn = warnOnce('ModalPage');
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPage
 */ export const ModalPage = ({ children , header , size: sizeProp = 's' , onOpen , onOpened , onClose , onClosed , settlingHeight , dynamicContentHeight , getModalContentRef , nav , id , hideCloseButton =false , className , ...restProps })=>{
    const { updateModalHeight  } = React.useContext(ModalRootContext);
    const platform = usePlatform();
    const orientation = useOrientationChange();
    const { sizeX , isDesktop  } = useAdaptivityWithJSMediaQueries();
    React.useEffect(updateModalHeight, [
        children,
        orientation,
        updateModalHeight
    ]);
    const isCloseButtonShown = !hideCloseButton && isDesktop;
    const size = isDesktop ? sizeProp : 's';
    const modalContext = React.useContext(ModalRootContext);
    const { refs  } = useModalRegistry(getNavId({
        nav,
        id
    }, warn), ModalType.PAGE);
    return /*#__PURE__*/ React.createElement("div", {
        ...restProps,
        id: id,
        className: classNames(styles['ModalPage'], platform === Platform.IOS && styles['ModalPage--ios'], isDesktop && styles['ModalPage--desktop'], sizeX === SizeType.REGULAR && 'vkuiInternalModalPage--sizeX-regular', typeof size === 'string' && sizeClassName[size], className)
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['ModalPage__in-wrap'],
        style: {
            maxWidth: typeof size === 'number' ? size : undefined
        },
        ref: refs.innerElement
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['ModalPage__in']
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['ModalPage__header'],
        ref: refs.headerElement
    }, header), /*#__PURE__*/ React.createElement("div", {
        className: styles['ModalPage__content-wrap']
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['ModalPage__content'],
        ref: multiRef(refs.contentElement, getModalContentRef)
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['ModalPage__content-in']
    }, children))), isCloseButtonShown && /*#__PURE__*/ React.createElement(ModalDismissButton, {
        onClick: onClose || modalContext.onClose
    }))));
};

//# sourceMappingURL=ModalPage.js.map