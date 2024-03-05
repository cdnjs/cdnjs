import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
const sizeClassName = {
    s: "vkuiModalPage--size-s",
    m: "vkuiModalPage--size-m",
    l: "vkuiModalPage--size-l"
};
const warn = warnOnce('ModalPage');
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPage
 */ export const ModalPage = (_param)=>{
    var { children, header, size: sizeProp = 's', onOpen, onOpened, onClose, onClosed, settlingHeight, dynamicContentHeight, getModalContentRef, nav, id: idProp, hideCloseButton = false, height, modalContentTestId, modalDismissButtonTestId, getRootRef } = _param, restProps = _object_without_properties(_param, [
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
        "getRootRef"
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
    return /*#__PURE__*/ React.createElement(ModalPageContext.Provider, {
        value: contextValue
    }, /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        getRootRef: rootRef,
        tabIndex: -1,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": contextValue.labelId,
        id: id,
        baseClassName: classNames("vkuiModalPage", platform === 'ios' && "vkuiModalPage--ios", isDesktop && "vkuiModalPage--desktop", sizeX === 'regular' && 'vkuiInternalModalPage--sizeX-regular', typeof size === 'string' && sizeClassName[size])
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiModalPage__in-wrap",
        style: {
            maxWidth: typeof size === 'number' ? size : undefined,
            height
        },
        ref: refs.innerElement
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiModalPage__in"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiModalPage__header",
        ref: refs.headerElement
    }, header), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiModalPage__content-wrap"
    }, /*#__PURE__*/ React.createElement("div", _object_spread({
        className: "vkuiModalPage__content",
        ref: multiRef(refs.contentElement, getModalContentRef)
    }, modalContentTestId && {
        'data-testid': modalContentTestId
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiModalPage__content-in"
    }, children)), /*#__PURE__*/ React.createElement("div", {
        ref: refs.bottomInset,
        className: "vkuiModalPage__bottom-inset"
    })), isCloseButtonShown && /*#__PURE__*/ React.createElement(ModalDismissButton, {
        "data-testid": modalDismissButtonTestId,
        onClick: onClose || modalContext.onClose
    })))));
};

//# sourceMappingURL=ModalPage.js.map