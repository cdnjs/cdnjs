import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityWithJSMediaQueries } from '../../hooks/useAdaptivityWithJSMediaQueries';
import { useExternRef } from '../../hooks/useExternRef';
import { useOrientationChange } from '../../hooks/useOrientationChange';
import { usePlatform } from '../../hooks/usePlatform';
import { getNavId } from '../../lib/getNavId';
import { multiRef } from '../../lib/utils';
import { warnOnce } from '../../lib/warnOnce';
import { ModalDismissButton } from '../ModalDismissButton/ModalDismissButton';
import { ModalRootContext, useModalRegistry } from '../ModalRoot/ModalRootContext';
import { RootComponent } from '../RootComponent/RootComponent';
import { ModalPageContext } from './ModalPageContext';
import styles from './ModalPage.module.css';
const sizeClassName = {
    s: styles['ModalPage--size-s'],
    m: styles['ModalPage--size-m'],
    l: styles['ModalPage--size-l']
};
const warn = warnOnce('ModalPage');
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPage
 */ export const ModalPage = ({ children, header, size: sizeProp = 's', onOpen, onOpened, onClose, onClosed, settlingHeight, dynamicContentHeight, getModalContentRef, nav, id: idProp, hideCloseButton = false, height, modalContentTestId, modalDismissButtonTestId, getRootRef, ...restProps })=>{
    const generatingId = React.useId();
    const id = idProp || generatingId;
    const { updateModalHeight } = React.useContext(ModalRootContext);
    const platform = usePlatform();
    const orientation = useOrientationChange();
    const { sizeX, isDesktop } = useAdaptivityWithJSMediaQueries();
    React.useEffect(()=>{
        if (dynamicContentHeight) {
            updateModalHeight();
        }
    }, [
        children,
        dynamicContentHeight,
        orientation,
        updateModalHeight
    ]);
    const isCloseButtonShown = !hideCloseButton && isDesktop;
    const size = isDesktop ? sizeProp : 's';
    const modalContext = React.useContext(ModalRootContext);
    const { refs } = useModalRegistry(getNavId({
        nav,
        id
    }, warn), 'page');
    const rootRef = useExternRef(getRootRef, refs.modalElement);
    const contextValue = React.useMemo(()=>({
            labelId: `${id}-label`
        }), [
        id
    ]);
    return /*#__PURE__*/ React.createElement(ModalPageContext.Provider, {
        value: contextValue
    }, /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        getRootRef: rootRef,
        tabIndex: -1,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": contextValue.labelId,
        id: id,
        baseClassName: classNames(styles['ModalPage'], platform === 'ios' && styles['ModalPage--ios'], isDesktop && styles['ModalPage--desktop'], sizeX === 'regular' && 'vkuiInternalModalPage--sizeX-regular', typeof size === 'string' && sizeClassName[size])
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['ModalPage__in-wrap'],
        style: {
            maxWidth: typeof size === 'number' ? size : undefined,
            height
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
        ref: multiRef(refs.contentElement, getModalContentRef),
        ...modalContentTestId && {
            'data-testid': modalContentTestId
        }
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['ModalPage__content-in']
    }, children)), /*#__PURE__*/ React.createElement("div", {
        ref: refs.bottomInset,
        className: styles['ModalPage__bottom-inset']
    })), isCloseButtonShown && /*#__PURE__*/ React.createElement(ModalDismissButton, {
        "data-testid": modalDismissButtonTestId,
        onClick: onClose || modalContext.onClose
    })))));
};

//# sourceMappingURL=ModalPage.js.map