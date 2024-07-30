import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
 */ export const ModalPage = ({ children, header, size: sizeProp = 's', onOpen, onOpened, onClose, onClosed, settlingHeight, dynamicContentHeight, getModalContentRef, nav, id: idProp, hideCloseButton = false, height, modalContentTestId, modalDismissButtonTestId, getRootRef, preventClose, ...restProps })=>{
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
    return /*#__PURE__*/ _jsx(ModalPageContext.Provider, {
        value: contextValue,
        children: /*#__PURE__*/ _jsx(RootComponent, {
            ...restProps,
            getRootRef: rootRef,
            tabIndex: -1,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": contextValue.labelId,
            id: id,
            baseClassName: classNames(styles['ModalPage'], platform === 'ios' && styles['ModalPage--ios'], isDesktop && styles['ModalPage--desktop'], sizeX === 'regular' && 'vkuiInternalModalPage--sizeX-regular', typeof size === 'string' && sizeClassName[size]),
            children: /*#__PURE__*/ _jsx("div", {
                className: styles['ModalPage__in-wrap'],
                style: {
                    maxWidth: typeof size === 'number' ? size : undefined,
                    height
                },
                ref: refs.innerElement,
                children: /*#__PURE__*/ _jsxs("div", {
                    className: styles['ModalPage__in'],
                    children: [
                        /*#__PURE__*/ _jsx("div", {
                            className: styles['ModalPage__header'],
                            ref: refs.headerElement,
                            children: header
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            className: styles['ModalPage__content-wrap'],
                            children: [
                                /*#__PURE__*/ _jsx("div", {
                                    className: styles['ModalPage__content'],
                                    ref: multiRef(refs.contentElement, getModalContentRef),
                                    ...modalContentTestId && {
                                        'data-testid': modalContentTestId
                                    },
                                    children: /*#__PURE__*/ _jsx("div", {
                                        className: styles['ModalPage__content-in'],
                                        children: children
                                    })
                                }),
                                /*#__PURE__*/ _jsx("div", {
                                    ref: refs.bottomInset,
                                    className: styles['ModalPage__bottom-inset']
                                })
                            ]
                        }),
                        isCloseButtonShown && /*#__PURE__*/ _jsx(ModalDismissButton, {
                            "data-testid": modalDismissButtonTestId,
                            onClick: onClose || modalContext.onClose
                        })
                    ]
                })
            })
        })
    });
};

//# sourceMappingURL=ModalPage.js.map