import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon24Cancel } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { useScrollLock } from "../AppRoot/ScrollContext";
import { PopoutWrapper } from "../PopoutWrapper/PopoutWrapper";
import { Spinner } from "../Spinner/Spinner";
import { Icon48CancelCircle } from "./Icon48CancelCircle";
import { Icon48DoneOutline } from "./Icon48DoneOutline";
/**
 * @see https://vkcom.github.io/VKUI/#/ScreenSpinner
 */ export var ScreenSpinner = function(_param) {
    var style = _param.style, className = _param.className, _param_state = _param.state, state = _param_state === void 0 ? "loading" : _param_state, _param_size = _param.size, size = _param_size === void 0 ? "large" : _param_size, tmp = _param["aria-label"], ariaLabel = tmp === void 0 ? "Пожалуйста, подождите..." : tmp, onClick = _param.onClick, restProps = _object_without_properties(_param, [
        "style",
        "className",
        "state",
        "size",
        "aria-label",
        "onClick"
    ]);
    var hideSpinner = state === "done" || state === "error";
    var Icon = {
        loading: function() {
            return null;
        },
        cancelable: Icon24Cancel,
        done: Icon48DoneOutline,
        error: Icon48CancelCircle
    }[state];
    useScrollLock();
    return /*#__PURE__*/ React.createElement(PopoutWrapper, {
        hasMask: false,
        className: classNames("vkuiScreenSpinner", state === "cancelable" && "vkuiScreenSpinner--clickable", className),
        style: style
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiScreenSpinner__container",
        onClick: onClick
    }, /*#__PURE__*/ React.createElement(Spinner, _object_spread({
        className: classNames("vkuiScreenSpinner__spinner", hideSpinner && "vkuiScreenSpinner__spinner--hidden"),
        size: size,
        "aria-label": ariaLabel
    }, restProps)), /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiScreenSpinner__icon", state === "done" && "vkuiScreenSpinner__icon--state-done")
    }, /*#__PURE__*/ React.createElement(Icon, null))));
};

//# sourceMappingURL=ScreenSpinner.js.map