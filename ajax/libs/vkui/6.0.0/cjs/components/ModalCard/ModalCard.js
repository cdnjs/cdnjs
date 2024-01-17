"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModalCard", {
    enumerable: true,
    get: function() {
        return ModalCard;
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
const _usePlatform = require("../../hooks/usePlatform");
const _getNavId = require("../../lib/getNavId");
const _warnOnce = require("../../lib/warnOnce");
const _ModalCardBase = require("../ModalCardBase/ModalCardBase");
const _ModalRootContext = require("../ModalRoot/ModalRootContext");
const _RootComponent = require("../RootComponent/RootComponent");
const platformClassNames = {
    ios: "vkuiModalCard--ios",
    android: "vkuiModalCard--android",
    vkcom: "vkuiModalCard--vkcom"
};
const warn = (0, _warnOnce.warnOnce)('ModalCard');
const ModalCard = (_param)=>{
    var { icon, header, headerComponent, subheader, subheaderComponent, children, actions, onClose, nav, id, size, modalDismissButtonTestId, getRootRef, dismissButtonMode, dismissLabel } = _param, restProps = _object_without_properties._(_param, [
        "icon",
        "header",
        "headerComponent",
        "subheader",
        "subheaderComponent",
        "children",
        "actions",
        "onClose",
        "nav",
        "id",
        "size",
        "modalDismissButtonTestId",
        "getRootRef",
        "dismissButtonMode",
        "dismissLabel"
    ]);
    const { isDesktop } = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)();
    const platform = (0, _usePlatform.usePlatform)();
    const modalContext = _react.useContext(_ModalRootContext.ModalRootContext);
    const { refs } = (0, _ModalRootContext.useModalRegistry)((0, _getNavId.getNavId)({
        nav,
        id
    }, warn), 'card');
    const rootRef = (0, _useExternRef.useExternRef)(getRootRef, refs.modalElement);
    const contextValue = _react.useMemo(()=>({
            labelId: `${id}-label`
        }), [
        id
    ]);
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        getRootRef: rootRef,
        tabIndex: -1,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": contextValue.labelId,
        id: id,
        baseClassName: (0, _vkjs.classNames)("vkuiModalCard", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, isDesktop && "vkuiModalCard--desktop")
    }), /*#__PURE__*/ _react.createElement(_ModalCardBase.ModalCardBase, {
        className: "vkuiModalCard__in",
        getRootRef: refs.innerElement,
        icon: icon,
        header: header,
        headerComponent: headerComponent,
        subheader: subheader,
        subheaderComponent: subheaderComponent,
        actions: actions,
        onClose: onClose || modalContext.onClose,
        size: size,
        modalDismissButtonTestId: modalDismissButtonTestId,
        dismissButtonMode: dismissButtonMode,
        dismissLabel: dismissLabel
    }, children));
};

//# sourceMappingURL=ModalCard.js.map