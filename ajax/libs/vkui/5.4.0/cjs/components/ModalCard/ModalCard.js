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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _usePlatform = require("../../hooks/usePlatform");
var _getNavId = require("../../lib/getNavId");
var _warnOnce = require("../../lib/warnOnce");
var _modalCardBase = require("../ModalCardBase/ModalCardBase");
var _modalRootContext = require("../ModalRoot/ModalRootContext");
var _types = require("../ModalRoot/types");
var platformClassNames = {
    ios: "vkuiModalCard--ios",
    android: "vkuiModalCard--android",
    vkcom: "vkuiModalCard--vkcom"
};
var warn = (0, _warnOnce.warnOnce)("ModalCard");
var ModalCard = function(_param) {
    var icon = _param.icon, header = _param.header, subheader = _param.subheader, children = _param.children, actions = _param.actions, onClose = _param.onClose, nav = _param.nav, id = _param.id, className = _param.className, size = _param.size, restProps = _objectWithoutProperties(_param, [
        "icon",
        "header",
        "subheader",
        "children",
        "actions",
        "onClose",
        "nav",
        "id",
        "className",
        "size"
    ]);
    var isDesktop = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().isDesktop;
    var platform = (0, _usePlatform.usePlatform)();
    var modalContext = _react.useContext(_modalRootContext.ModalRootContext);
    var refs = (0, _modalRootContext.useModalRegistry)((0, _getNavId.getNavId)({
        nav: nav,
        id: id
    }, warn), _types.ModalType.CARD).refs;
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        id: id,
        className: (0, _vkjs.classNames)("vkuiModalCard", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, isDesktop && "vkuiModalCard--desktop", className)
    }), /*#__PURE__*/ _react.createElement(_modalCardBase.ModalCardBase, {
        className: "vkuiModalCard__in",
        getRootRef: refs.innerElement,
        icon: icon,
        header: header,
        subheader: subheader,
        actions: actions,
        onClose: onClose || modalContext.onClose,
        size: size
    }, children));
};

//# sourceMappingURL=ModalCard.js.map