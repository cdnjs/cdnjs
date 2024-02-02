import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries";
import { useExternRef } from "../../hooks/useExternRef";
import { useId } from "../../hooks/useId";
import { useOrientationChange } from "../../hooks/useOrientationChange";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
import { getNavId } from "../../lib/getNavId";
import { Platform } from "../../lib/platform";
import { multiRef } from "../../lib/utils";
import { warnOnce } from "../../lib/warnOnce";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton";
import { ModalRootContext, useModalRegistry } from "../ModalRoot/ModalRootContext";
import { ModalType } from "../ModalRoot/types";
import { RootComponent } from "../RootComponent/RootComponent";
import { ModalPageContext } from "./ModalPageContext";
var sizeClassName = {
    s: "vkuiModalPage--size-s",
    m: "vkuiModalPage--size-m",
    l: "vkuiModalPage--size-l"
};
var warn = warnOnce("ModalPage");
/**
 * @see https://vkcom.github.io/VKUI/#/ModalPage
 */ export var ModalPage = function(_param) {
    var children = _param.children, header = _param.header, tmp = _param.size, sizeProp = tmp === void 0 ? "s" : tmp, onOpen = _param.onOpen, onOpened = _param.onOpened, onClose = _param.onClose, onClosed = _param.onClosed, settlingHeight = _param.settlingHeight, dynamicContentHeight = _param.dynamicContentHeight, getModalContentRef = _param.getModalContentRef, nav = _param.nav, idProp = _param.id, _param_hideCloseButton = _param.hideCloseButton, hideCloseButton = _param_hideCloseButton === void 0 ? false : _param_hideCloseButton, height = _param.height, modalContentTestId = _param.modalContentTestId, modalDismissButtonTestId = _param.modalDismissButtonTestId, getRootRef = _param.getRootRef, restProps = _object_without_properties(_param, [
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
    var generatingId = useId();
    var id = idProp || generatingId;
    var updateModalHeight = React.useContext(ModalRootContext).updateModalHeight;
    var platform = usePlatform();
    var orientation = useOrientationChange();
    var _useAdaptivityWithJSMediaQueries = useAdaptivityWithJSMediaQueries(), sizeX = _useAdaptivityWithJSMediaQueries.sizeX, isDesktop = _useAdaptivityWithJSMediaQueries.isDesktop;
    React.useEffect(function() {
        if (dynamicContentHeight) {
            updateModalHeight();
        }
    }, [
        children,
        dynamicContentHeight,
        orientation,
        updateModalHeight
    ]);
    var isCloseButtonShown = !hideCloseButton && isDesktop;
    var size = isDesktop ? sizeProp : "s";
    var modalContext = React.useContext(ModalRootContext);
    var refs = useModalRegistry(getNavId({
        nav: nav,
        id: id
    }, warn), ModalType.PAGE).refs;
    var rootRef = useExternRef(getRootRef, refs.modalElement);
    var contextValue = React.useMemo(function() {
        return {
            labelId: "".concat(id, "-label")
        };
    }, [
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
        baseClassName: classNames("vkuiModalPage", platform === Platform.IOS && "vkuiModalPage--ios", isDesktop && "vkuiModalPage--desktop", sizeX === SizeType.REGULAR && "vkuiInternalModalPage--sizeX-regular", typeof size === "string" && sizeClassName[size])
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiModalPage__in-wrap",
        style: {
            maxWidth: typeof size === "number" ? size : undefined,
            height: height
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
        "data-testid": modalContentTestId
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