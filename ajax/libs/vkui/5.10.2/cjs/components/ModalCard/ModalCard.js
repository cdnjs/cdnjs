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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _useExternRef = require("../../hooks/useExternRef");
var _usePlatform = require("../../hooks/usePlatform");
var _getNavId = require("../../lib/getNavId");
var _warnOnce = require("../../lib/warnOnce");
var _ModalCardBase = require("../ModalCardBase/ModalCardBase");
var _ModalRootContext = require("../ModalRoot/ModalRootContext");
var _types = require("../ModalRoot/types");
var _RootComponent = require("../RootComponent/RootComponent");
var platformClassNames = {
    ios: "vkuiModalCard--ios",
    android: "vkuiModalCard--android",
    vkcom: "vkuiModalCard--vkcom"
};
var warn = (0, _warnOnce.warnOnce)("ModalCard");
var ModalCard = function(_param) {
    var icon = _param.icon, header = _param.header, subheader = _param.subheader, children = _param.children, actions = _param.actions, onClose = _param.onClose, nav = _param.nav, id = _param.id, size = _param.size, modalDismissButtonTestId = _param.modalDismissButtonTestId, getRootRef = _param.getRootRef, dismissButtonMode = _param.dismissButtonMode, dismissLabel = _param.dismissLabel, restProps = _object_without_properties._(_param, [
        "icon",
        "header",
        "subheader",
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
    var isDesktop = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().isDesktop;
    var platform = (0, _usePlatform.usePlatform)();
    var modalContext = _react.useContext(_ModalRootContext.ModalRootContext);
    var refs = (0, _ModalRootContext.useModalRegistry)((0, _getNavId.getNavId)({
        nav: nav,
        id: id
    }, warn), _types.ModalType.CARD).refs;
    var rootRef = (0, _useExternRef.useExternRef)(getRootRef, refs.modalElement);
    var contextValue = _react.useMemo(function() {
        return {
            labelId: "".concat(id, "-label")
        };
    }, [
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
        subheader: subheader,
        actions: actions,
        onClose: onClose || modalContext.onClose,
        size: size,
        modalDismissButtonTestId: modalDismissButtonTestId,
        dismissButtonMode: dismissButtonMode,
        dismissLabel: dismissLabel
    }, children));
};

//# sourceMappingURL=ModalCard.js.map