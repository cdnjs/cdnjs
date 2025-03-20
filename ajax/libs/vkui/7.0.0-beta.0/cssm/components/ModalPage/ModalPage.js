import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries.js";
import { useExternRef } from "../../hooks/useExternRef.js";
import { useOrientationChange } from "../../hooks/useOrientationChange.js";
import { usePlatform } from "../../hooks/usePlatform.js";
import { getNavId } from "../../lib/getNavId.js";
import { multiRef } from "../../lib/utils.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton.js";
import { ModalRootContext, useModalRegistry } from "../ModalRoot/ModalRootContext.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { ModalPageContext } from "./ModalPageContext.js";
import styles from "./ModalPage.module.css";
const sizeClassName = {
    s: styles.sizeS,
    m: styles.sizeM,
    l: styles.sizeL
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
            baseClassName: classNames(styles.host, platform === 'ios' && styles.ios, isDesktop && styles.desktop, sizeX === 'regular' && 'vkuiInternalModalPage--sizeX-regular', typeof size === 'string' && sizeClassName[size]),
            children: /*#__PURE__*/ _jsx("div", {
                className: styles.inWrap,
                style: {
                    maxWidth: typeof size === 'number' ? size : undefined,
                    height
                },
                ref: refs.innerElement,
                children: /*#__PURE__*/ _jsxs("div", {
                    className: styles.in,
                    children: [
                        /*#__PURE__*/ _jsx("div", {
                            className: styles.header,
                            ref: refs.headerElement,
                            children: header
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            className: styles.contentWrap,
                            children: [
                                /*#__PURE__*/ _jsx("div", {
                                    className: styles.content,
                                    ref: multiRef(refs.contentElement, getModalContentRef),
                                    ...modalContentTestId && {
                                        'data-testid': modalContentTestId
                                    },
                                    children: /*#__PURE__*/ _jsx("div", {
                                        className: styles.contentIn,
                                        children: children
                                    })
                                }),
                                /*#__PURE__*/ _jsx("div", {
                                    ref: refs.bottomInset,
                                    className: styles.bottomInset
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