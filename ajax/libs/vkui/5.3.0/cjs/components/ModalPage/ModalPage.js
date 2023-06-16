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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _useOrientationChange = require("../../hooks/useOrientationChange");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _getNavId = require("../../lib/getNavId");
var _platform = require("../../lib/platform");
var _utils = require("../../lib/utils");
var _warnOnce = require("../../lib/warnOnce");
var _modalDismissButton = require("../ModalDismissButton/ModalDismissButton");
var _modalRootContext = require("../ModalRoot/ModalRootContext");
var _types = require("../ModalRoot/types");
var sizeClassName = {
    s: "vkuiModalPage--size-s",
    m: "vkuiModalPage--size-m",
    l: "vkuiModalPage--size-l"
};
var warn = (0, _warnOnce.warnOnce)("ModalPage");
var ModalPage = function(_param) {
    var children = _param.children, header = _param.header, tmp = _param.size, sizeProp = tmp === void 0 ? "s" : tmp, onOpen = _param.onOpen, onOpened = _param.onOpened, onClose = _param.onClose, onClosed = _param.onClosed, settlingHeight = _param.settlingHeight, dynamicContentHeight = _param.dynamicContentHeight, getModalContentRef = _param.getModalContentRef, nav = _param.nav, id = _param.id, _param_hideCloseButton = _param.hideCloseButton, hideCloseButton = _param_hideCloseButton === void 0 ? false : _param_hideCloseButton, className = _param.className, restProps = _objectWithoutProperties(_param, [
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
        "className"
    ]);
    var updateModalHeight = _react.useContext(_modalRootContext.ModalRootContext).updateModalHeight;
    var platform = (0, _usePlatform.usePlatform)();
    var orientation = (0, _useOrientationChange.useOrientationChange)();
    var _useAdaptivityWithJSMediaQueries1 = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)(), sizeX = _useAdaptivityWithJSMediaQueries1.sizeX, isDesktop = _useAdaptivityWithJSMediaQueries1.isDesktop;
    _react.useEffect(updateModalHeight, [
        children,
        orientation,
        updateModalHeight
    ]);
    var isCloseButtonShown = !hideCloseButton && isDesktop;
    var size = isDesktop ? sizeProp : "s";
    var modalContext = _react.useContext(_modalRootContext.ModalRootContext);
    var refs = (0, _modalRootContext.useModalRegistry)((0, _getNavId.getNavId)({
        nav: nav,
        id: id
    }, warn), _types.ModalType.PAGE).refs;
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        id: id,
        className: (0, _vkjs.classNames)("vkuiModalPage", platform === _platform.Platform.IOS && "vkuiModalPage--ios", isDesktop && "vkuiModalPage--desktop", sizeX === _adaptivity.SizeType.REGULAR && "vkuiInternalModalPage--sizeX-regular", typeof size === "string" && sizeClassName[size], className)
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalPage__in-wrap",
        style: {
            maxWidth: typeof size === "number" ? size : undefined
        },
        ref: refs.innerElement
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalPage__in"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalPage__header",
        ref: refs.headerElement
    }, header), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalPage__content-wrap"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalPage__content",
        ref: (0, _utils.multiRef)(refs.contentElement, getModalContentRef)
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalPage__content-in"
    }, children))), isCloseButtonShown && /*#__PURE__*/ _react.createElement(_modalDismissButton.ModalDismissButton, {
        onClick: onClose || modalContext.onClose
    }))));
};

//# sourceMappingURL=ModalPage.js.map