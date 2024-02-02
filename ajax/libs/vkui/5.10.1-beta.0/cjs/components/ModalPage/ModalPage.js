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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _useExternRef = require("../../hooks/useExternRef");
var _useId = require("../../hooks/useId");
var _useOrientationChange = require("../../hooks/useOrientationChange");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _getNavId = require("../../lib/getNavId");
var _platform = require("../../lib/platform");
var _utils = require("../../lib/utils");
var _warnOnce = require("../../lib/warnOnce");
var _ModalDismissButton = require("../ModalDismissButton/ModalDismissButton");
var _ModalRootContext = require("../ModalRoot/ModalRootContext");
var _types = require("../ModalRoot/types");
var _RootComponent = require("../RootComponent/RootComponent");
var _ModalPageContext = require("./ModalPageContext");
var sizeClassName = {
    s: "vkuiModalPage--size-s",
    m: "vkuiModalPage--size-m",
    l: "vkuiModalPage--size-l"
};
var warn = (0, _warnOnce.warnOnce)("ModalPage");
var ModalPage = function(_param) {
    var children = _param.children, header = _param.header, tmp = _param.size, sizeProp = tmp === void 0 ? "s" : tmp, onOpen = _param.onOpen, onOpened = _param.onOpened, onClose = _param.onClose, onClosed = _param.onClosed, settlingHeight = _param.settlingHeight, dynamicContentHeight = _param.dynamicContentHeight, getModalContentRef = _param.getModalContentRef, nav = _param.nav, idProp = _param.id, _param_hideCloseButton = _param.hideCloseButton, hideCloseButton = _param_hideCloseButton === void 0 ? false : _param_hideCloseButton, height = _param.height, modalContentTestId = _param.modalContentTestId, modalDismissButtonTestId = _param.modalDismissButtonTestId, getRootRef = _param.getRootRef, restProps = _object_without_properties._(_param, [
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
    var generatingId = (0, _useId.useId)();
    var id = idProp || generatingId;
    var updateModalHeight = _react.useContext(_ModalRootContext.ModalRootContext).updateModalHeight;
    var platform = (0, _usePlatform.usePlatform)();
    var orientation = (0, _useOrientationChange.useOrientationChange)();
    var _useAdaptivityWithJSMediaQueries1 = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)(), sizeX = _useAdaptivityWithJSMediaQueries1.sizeX, isDesktop = _useAdaptivityWithJSMediaQueries1.isDesktop;
    _react.useEffect(function() {
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
    var modalContext = _react.useContext(_ModalRootContext.ModalRootContext);
    var refs = (0, _ModalRootContext.useModalRegistry)((0, _getNavId.getNavId)({
        nav: nav,
        id: id
    }, warn), _types.ModalType.PAGE).refs;
    var rootRef = (0, _useExternRef.useExternRef)(getRootRef, refs.modalElement);
    var contextValue = _react.useMemo(function() {
        return {
            labelId: "".concat(id, "-label")
        };
    }, [
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
        baseClassName: (0, _vkjs.classNames)("vkuiModalPage", platform === _platform.Platform.IOS && "vkuiModalPage--ios", isDesktop && "vkuiModalPage--desktop", sizeX === _adaptivity.SizeType.REGULAR && "vkuiInternalModalPage--sizeX-regular", typeof size === "string" && sizeClassName[size])
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalPage__in-wrap",
        style: {
            maxWidth: typeof size === "number" ? size : undefined,
            height: height
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
        "data-testid": modalContentTestId
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