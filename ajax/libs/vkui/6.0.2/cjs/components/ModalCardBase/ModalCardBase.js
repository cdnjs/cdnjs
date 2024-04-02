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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
const _useKeyboard = require("../../hooks/useKeyboard");
const _usePlatform = require("../../hooks/usePlatform");
const _AdaptivityContext = require("../AdaptivityProvider/AdaptivityContext");
const _RootComponent = require("../RootComponent/RootComponent");
const _Spacing = require("../Spacing/Spacing");
const _Subhead = require("../Typography/Subhead/Subhead");
const _Title = require("../Typography/Title/Title");
const _ModalCardBaseCloseButton = require("./ModalCardBaseCloseButton");
const ModalCardBase = (_param)=>{
    var { icon, header, headerComponent = 'span', subheader, subheaderComponent = 'span', children, actions, onClose, dismissLabel = 'Скрыть', style, size: sizeProp, modalDismissButtonTestId, dismissButtonMode = 'outside' } = _param, restProps = _object_without_properties._(_param, [
        "icon",
        "header",
        "headerComponent",
        "subheader",
        "subheaderComponent",
        "children",
        "actions",
        "onClose",
        "dismissLabel",
        "style",
        "size",
        "modalDismissButtonTestId",
        "dismissButtonMode"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const { isDesktop } = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)();
    const isSoftwareKeyboardOpened = (0, _useKeyboard.useKeyboard)().isOpened;
    const size = isDesktop ? sizeProp : undefined;
    const withSafeZone = !icon && (dismissButtonMode === 'inside' || platform === 'ios' && !isDesktop);
    const hasHeader = (0, _vkjs.hasReactNode)(header);
    const hasSubheader = (0, _vkjs.hasReactNode)(subheader);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)('vkuiInternalModalCardBase', platform === 'ios' && "vkuiModalCardBase--ios", isDesktop && "vkuiModalCardBase--desktop", withSafeZone && "vkuiModalCardBase--withSafeZone"),
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
        className: "vkuiModalCardBase__header",
        Component: headerComponent
    }, header), hasHeader && hasSubheader && /*#__PURE__*/ _react.createElement(_Spacing.Spacing, {
        size: 8
    }), hasSubheader && /*#__PURE__*/ _react.createElement(_AdaptivityContext.AdaptivityContext.Provider, {
        value: {
            sizeY: 'regular'
        }
    }, /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
        className: "vkuiModalCardBase__subheader",
        Component: subheaderComponent
    }, subheader)), children, (0, _vkjs.hasReactNode)(actions) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiModalCardBase__actions"
    }, actions), /*#__PURE__*/ _react.createElement(_ModalCardBaseCloseButton.ModalCardBaseCloseButton, {
        testId: modalDismissButtonTestId,
        onClose: onClose,
        mode: dismissButtonMode
    }, dismissLabel)));
};

//# sourceMappingURL=ModalCardBase.js.map