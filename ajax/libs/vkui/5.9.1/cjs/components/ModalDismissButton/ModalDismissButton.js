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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _Tappable = require("../Tappable/Tappable");
var ModalDismissButton = function(_param) {
    var tmp = _param["aria-label"], ariaLabel = tmp === void 0 ? "Закрыть" : tmp, className = _param.className, restProps = _object_without_properties._(_param, [
        "aria-label",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({
        className: (0, _vkjs.classNames)("vkuiModalDismissButton", className)
    }, restProps), {
        "aria-label": ariaLabel,
        activeMode: "vkuiModalDismissButton--active",
        hoverMode: "vkuiModalDismissButton--hover"
    }), /*#__PURE__*/ _react.createElement(_icons.Icon20Cancel, null));
};

//# sourceMappingURL=ModalDismissButton.js.map