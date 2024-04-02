"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModalPage", {
    enumerable: true,
    get: function() {
        return ModalPage;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
const _useExternRef = require("../../hooks/useExternRef");
const _useOrientationChange = require("../../hooks/useOrientationChange");
const _usePlatform = require("../../hooks/usePlatform");
const _getNavId = require("../../lib/getNavId");
const _utils = require("../../lib/utils");
const _warnOnce = require("../../lib/warnOnce");
const _ModalDismissButton = require("../ModalDismissButton/ModalDismissButton");
const _ModalRootContext = require("../ModalRoot/ModalRootContext");
const _RootComponent = require("../RootComponent/RootComponent");
const _ModalPageContext = require("./ModalPageContext");
const sizeClassName = {
    s: "vkuiModalPage--size-s",
    m: "vkuiModalPage--size-m",
    l: "vkuiModalPage--size-l"
};
const warn = (0, _warnOnce.warnOnce)('ModalPage');
const ModalPage = (_param)=>{
    var { children, header, size: sizeProp = 's', onOpen, onOpened, onClose, onClosed, settlingHeight, dynamicContentHeight, getModalContentRef, nav, id: idProp, hideCloseButton = false, height, modalContentTestId, modalDismissButtonTestId, getRootRef } = _param, restProps = _object_without_properties._(_param, [
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
    const generatingId = _react.useId();
    const id = idProp || generatingId;
    const { updateModalHeight } = _react.useContext(_ModalRootContext.ModalRootContext);
    const platform = (0, _usePlatform.usePlatform)();
    const orientation = (0, _useOrientationChange.useOrientationChange)();
    const { sizeX, isDesktop } = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)();
    _react.useEffect(()=>{
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
    const modalContext = _react.useContext(_ModalRootContext.ModalRootContext);
    const { refs } = (0, _ModalRootContext.useModalRegistry)((0, _getNavId.getNavId)({
        nav,
        id
    }, warn), 'page');
    const rootRef = (0, _useExternRef.useExternRef)(getRootRef, refs.modalElement);
    const contextValue = _react.useMemo(()=>({
            labelId: `${id}-label`
        }), [
        id
    ]);
    return /*#__PURE__*/ _react.createElement(_ModalPageContext.ModalPageContext.Provider, {
        value: contextValue
    }, /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        getRootRef: rootRef,
        tabIndex: -1,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": contextValue.labelId,
        id: id,
        baseClassName: (0, _vkjs.classNames)("vkuiModalPage", platform === 'ios' && "vkuiModalPage--ios", isDesktop && "vkuiModalPage--desktop", sizeX === 'regular' && 'vkuiInternalModalPage--sizeX-regular', typeof size === 'string' && sizeClassName[size])
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalPage__in-wrap",
        style: {
            maxWidth: typeof size === 'number' ? size : undefined,
            height
        },
        ref: refs.innerElement
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalPage__in"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalPage__header",
        ref: refs.headerElement
    }, header), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalPage__content-wrap"
    }, /*#__PURE__*/ _react.createElement("div", _object_spread._({
        className: "vkuiModalPage__content",
        ref: (0, _utils.multiRef)(refs.contentElement, getModalContentRef)
    }, modalContentTestId && {
        'data-testid': modalContentTestId
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalPage__content-in"
    }, children)), /*#__PURE__*/ _react.createElement("div", {
        ref: refs.bottomInset,
        className: "vkuiModalPage__bottom-inset"
    })), isCloseButtonShown && /*#__PURE__*/ _react.createElement(_ModalDismissButton.ModalDismissButton, {
        "data-testid": modalDismissButtonTestId,
        onClick: onClose || modalContext.onClose
    })))));
};

//# sourceMappingURL=ModalPage.js.map