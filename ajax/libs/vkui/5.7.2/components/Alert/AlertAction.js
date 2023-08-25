import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { Button } from "../Button/Button";
import { Tappable } from "../Tappable/Tappable";
var AlertActionIos = function(_param) {
    var mode = _param.mode, restProps = _object_without_properties(_param, [
        "mode"
    ]);
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread({
        Component: restProps.href ? "a" : "button",
        className: classNames("vkuiAlert__action", mode === "destructive" && "vkuiAlert__action--mode-destructive", mode === "cancel" && "vkuiAlert__action--mode-cancel")
    }, restProps));
};
var AlertActionBase = function(_param) {
    var mode = _param.mode, restProps = _object_without_properties(_param, [
        "mode"
    ]);
    var platform = usePlatform();
    var buttonMode = "tertiary";
    if (platform === Platform.VKCOM) {
        buttonMode = mode === "cancel" ? "secondary" : "primary";
    }
    return /*#__PURE__*/ React.createElement(Button, _object_spread({
        className: classNames("vkuiAlert__button", mode === "cancel" && "vkuiAlert__button--mode-cancel"),
        mode: buttonMode,
        size: "m"
    }, restProps));
};
export var AlertAction = function(props) {
    var platform = usePlatform();
    if (platform === Platform.IOS) {
        return /*#__PURE__*/ React.createElement(AlertActionIos, props);
    }
    return /*#__PURE__*/ React.createElement(AlertActionBase, props);
};

//# sourceMappingURL=AlertAction.js.map