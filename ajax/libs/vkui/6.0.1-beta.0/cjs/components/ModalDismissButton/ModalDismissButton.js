"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ModalDismissButton", {
    enumerable: true,
    get: function() {
        return ModalDismissButton;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _icons = require("@vkontakte/icons");
const _vkjs = require("@vkontakte/vkjs");
const _Tappable = require("../Tappable/Tappable");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const ModalDismissButton = (_param)=>{
    var { children = 'Закрыть', className } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({
        className: (0, _vkjs.classNames)("vkuiModalDismissButton", className)
    }, restProps), {
        activeMode: "vkuiModalDismissButton--active",
        hoverMode: "vkuiModalDismissButton--hover"
    }), children && /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, children), /*#__PURE__*/ _react.createElement(_icons.Icon20Cancel, null));
};

//# sourceMappingURL=ModalDismissButton.js.map