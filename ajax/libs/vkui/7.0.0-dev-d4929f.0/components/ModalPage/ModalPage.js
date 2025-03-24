'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
const sizeClassName = {
    s: "ModalPage__sizeS--QtJmf",
    m: "ModalPage__sizeM--HJVDy",
    l: "ModalPage__sizeL--M-R4g"
};
const warn = warnOnce('ModalPage');
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPage
 */ export const ModalPage = (_param)=>{
    var { children, header, size: sizeProp = 's', onOpen, onOpened, onClose, onClosed, settlingHeight, dynamicContentHeight, getModalContentRef, nav, id: idProp, hideCloseButton = false, height, modalContentTestId, modalDismissButtonTestId, getRootRef, preventClose } = _param, restProps = _object_without_properties(_param, [
        "children",
        "header",
        "size",
        "onOpen",
        "onOpened",
        "onClose",
        "onClosed",
        "settlingHeight",
        "dynamicContentHeight",
        "getModalContentRef",
        "nav",
        "id",
        "hideCloseButton",
        "height",
        "modalContentTestId",
        "modalDismissButtonTestId",
        "getRootRef",
        "preventClose"
    ]);
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
        children: /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({}, restProps), {
            getRootRef: rootRef,
            tabIndex: -1,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": contextValue.labelId,
            id: id,
            baseClassName: classNames("ModalPage__host--oK6Au", platform === 'ios' && "ModalPage__ios--QTaHR", isDesktop && "ModalPage__desktop--fhnJ-", sizeX === 'regular' && 'vkuiInternalModalPage--sizeX-regular', typeof size === 'string' && sizeClassName[size]),
            children: /*#__PURE__*/ _jsx("div", {
                className: "ModalPage__inWrap--veNNe",
                style: {
                    maxWidth: typeof size === 'number' ? size : undefined,
                    height
                },
                ref: refs.innerElement,
                children: /*#__PURE__*/ _jsxs("div", {
                    className: "ModalPage__in--EABBT",
                    children: [
                        /*#__PURE__*/ _jsx("div", {
                            className: "ModalPage__header--L-3MC",
                            ref: refs.headerElement,
                            children: header
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            className: "ModalPage__contentWrap--QlOrH",
                            children: [
                                /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({
                                    className: "ModalPage__content--EiNUs",
                                    ref: multiRef(refs.contentElement, getModalContentRef)
                                }, modalContentTestId && {
                                    'data-testid': modalContentTestId
                                }), {
                                    children: /*#__PURE__*/ _jsx("div", {
                                        className: "ModalPage__contentIn--tDJHF",
                                        children: children
                                    })
                                })),
                                /*#__PURE__*/ _jsx("div", {
                                    ref: refs.bottomInset,
                                    className: "ModalPage__bottomInset--ltnbU"
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
        }))
    });
};

//# sourceMappingURL=ModalPage.js.map