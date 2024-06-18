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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _usePlatform = require("../../hooks/usePlatform");
const _Button = require("../Button/Button");
const _Tappable = require("../Tappable/Tappable");
const AlertActionIos = (_param)=>{
    var { mode } = _param, restProps = _object_without_properties._(_param, [
        "mode"
    ]);
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread._({
        Component: restProps.href ? 'a' : 'button',
        className: (0, _vkjs.classNames)("vkuiAlert__action", mode === 'destructive' && "vkuiAlert__action--mode-destructive", mode === 'cancel' && "vkuiAlert__action--mode-cancel")
    }, restProps));
};
const AlertActionBase = (_param)=>{
    var { mode } = _param, restProps = _object_without_properties._(_param, [
        "mode"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    let buttonMode = 'tertiary';
    if (platform === 'vkcom') {
        buttonMode = mode === 'cancel' ? 'secondary' : 'primary';
    }
    return /*#__PURE__*/ _react.createElement(_Button.Button, _object_spread._({
        className: (0, _vkjs.classNames)("vkuiAlert__button", mode === 'cancel' && "vkuiAlert__button--mode-cancel"),
        mode: buttonMode,
        size: "m"
    }, restProps));
};
const AlertAction = (props)=>{
    const platform = (0, _usePlatform.usePlatform)();
    if (platform === 'ios') {
        return /*#__PURE__*/ _react.createElement(AlertActionIos, props);
    }
    return /*#__PURE__*/ _react.createElement(AlertActionBase, props);
};

//# sourceMappingURL=AlertAction.js.map