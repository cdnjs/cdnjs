import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon20Cancel } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { Tappable } from "../Tappable/Tappable";
/**
 * @see https://vkcom.github.io/VKUI/#/ModalDismissButton
 */ export var ModalDismissButton = function(_param) {
    var tmp = _param["aria-label"], ariaLabel = tmp === void 0 ? "Закрыть" : tmp, className = _param.className, restProps = _object_without_properties(_param, [
        "aria-label",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({
        className: classNames("vkuiModalDismissButton", className)
    }, restProps), {
        "aria-label": ariaLabel,
        activeMode: "vkuiModalDismissButton--active",
        hoverMode: "vkuiModalDismissButton--hover"
    }), /*#__PURE__*/ React.createElement(Icon20Cancel, null));
};

//# sourceMappingURL=ModalDismissButton.js.map