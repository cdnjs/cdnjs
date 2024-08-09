"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AlertAction", {
    enumerable: true,
    get: function() {
        return AlertAction;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _Button = require("../Button/Button");
var _Tappable = require("../Tappable/Tappable");
var AlertActionIos = function(_param) {
    var mode = _param.mode, restProps = _object_without_properties._(_param, [
        "mode"
    ]);
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread._({
        Component: restProps.href ? "a" : "button",
        className: (0, _vkjs.classNames)("vkuiAlert__action", mode === "destructive" && "vkuiAlert__action--mode-destructive", mode === "cancel" && "vkuiAlert__action--mode-cancel")
    }, restProps));
};
var AlertActionBase = function(_param) {
    var mode = _param.mode, restProps = _object_without_properties._(_param, [
        "mode"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var buttonMode = "tertiary";
    if (platform === _platform.Platform.VKCOM) {
        buttonMode = mode === "cancel" ? "secondary" : "primary";
    }
    return /*#__PURE__*/ _react.createElement(_Button.Button, _object_spread._({
        className: (0, _vkjs.classNames)("vkuiAlert__button", mode === "cancel" && "vkuiAlert__button--mode-cancel"),
        mode: buttonMode,
        size: "m"
    }, restProps));
};
var AlertAction = function(props) {
    var platform = (0, _usePlatform.usePlatform)();
    if (platform === _platform.Platform.IOS) {
        return /*#__PURE__*/ _react.createElement(AlertActionIos, props);
    }
    return /*#__PURE__*/ _react.createElement(AlertActionBase, props);
};

//# sourceMappingURL=AlertAction.js.map