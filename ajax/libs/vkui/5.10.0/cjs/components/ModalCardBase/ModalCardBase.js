"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModalCardBase", {
    enumerable: true,
    get: function() {
        return ModalCardBase;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _useKeyboard = require("../../hooks/useKeyboard");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _AdaptivityContext = require("../AdaptivityProvider/AdaptivityContext");
var _RootComponent = require("../RootComponent/RootComponent");
var _Subhead = require("../Typography/Subhead/Subhead");
var _Title = require("../Typography/Title/Title");
var _ModalCardBaseCloseButton = require("./ModalCardBaseCloseButton");
var ModalCardBase = function(_param) {
    var icon = _param.icon, header = _param.header, subheader = _param.subheader, children = _param.children, actions = _param.actions, onClose = _param.onClose, _param_dismissLabel = _param.dismissLabel, dismissLabel = _param_dismissLabel === void 0 ? "Скрыть" : _param_dismissLabel, style = _param.style, sizeProp = _param.size, modalDismissButtonTestId = _param.modalDismissButtonTestId, _param_dismissButtonMode = _param.dismissButtonMode, dismissButtonMode = _param_dismissButtonMode === void 0 ? "outside" : _param_dismissButtonMode, restProps = _object_without_properties._(_param, [
        "icon",
        "header",
        "subheader",
        "children",
        "actions",
        "onClose",
        "dismissLabel",
        "style",
        "size",
        "modalDismissButtonTestId",
        "dismissButtonMode"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var isDesktop = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().isDesktop;
    var isSoftwareKeyboardOpened = (0, _useKeyboard.useKeyboard)().isOpened;
    var size = isDesktop ? sizeProp : undefined;
    var withSafeZone = !icon && (dismissButtonMode === "inside" || platform === _platform.Platform.IOS && !isDesktop);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiInternalModalCardBase", platform === _platform.Platform.IOS && "vkuiModalCardBase--ios", isDesktop && "vkuiModalCardBase--desktop", withSafeZone && "vkuiModalCardBase--withSafeZone"),
        style: _object_spread_props._(_object_spread._({}, style), {
            maxWidth: size
        })
    }), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiModalCardBase__container", isSoftwareKeyboardOpened && "vkuiModalCardBase__container--softwareKeyboardOpened")
    }, (0, _vkjs.hasReactNode)(icon) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalCardBase__icon"
    }, icon), (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ _react.createElement(_Title.Title, {
        level: "2",
        weight: "2",
        className: (0, _vkjs.classNames)("vkuiModalCardBase__header", "vkuiInternalModalCardBase__header")
    }, header), (0, _vkjs.hasReactNode)(subheader) && /*#__PURE__*/ _react.createElement(_AdaptivityContext.AdaptivityContext.Provider, {
        value: {
            sizeY: _adaptivity.SizeType.REGULAR
        }
    }, /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
        className: (0, _vkjs.classNames)("vkuiModalCardBase__subheader", "vkuiInternalModalCardBase__subheader")
    }, subheader)), children, (0, _vkjs.hasReactNode)(actions) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalCardBase__actions"
    }, actions), /*#__PURE__*/ _react.createElement(_ModalCardBaseCloseButton.ModalCardBaseCloseButton, {
        "aria-label": dismissLabel,
        testId: modalDismissButtonTestId,
        onClose: onClose,
        mode: dismissButtonMode
    })));
};

//# sourceMappingURL=ModalCardBase.js.map