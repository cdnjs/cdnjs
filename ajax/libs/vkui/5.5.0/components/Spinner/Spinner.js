import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon16Spinner, Icon24Spinner, Icon32Spinner, Icon44Spinner } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
/**
 * @see https://vkcom.github.io/VKUI/#/Spinner
 */ export var Spinner = /*#__PURE__*/ React.memo(function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? "regular" : _param_size, tmp = _param["aria-label"], ariaLabel = tmp === void 0 ? "Загружается..." : tmp, className = _param.className, restProps = _object_without_properties(_param, [
        "size",
        "aria-label",
        "className"
    ]);
    var SpinnerIcon = {
        small: Icon16Spinner,
        regular: Icon24Spinner,
        medium: Icon32Spinner,
        large: Icon44Spinner
    }[size];
    return /*#__PURE__*/ React.createElement("span", _object_spread_props(_object_spread({
        role: "status",
        "aria-label": ariaLabel
    }, restProps), {
        className: classNames("vkuiSpinner", className)
    }), /*#__PURE__*/ React.createElement(SpinnerIcon, {
        className: "vkuiSpinner__self"
    }));
});
Spinner.displayName = "Spinner";

//# sourceMappingURL=Spinner.js.map