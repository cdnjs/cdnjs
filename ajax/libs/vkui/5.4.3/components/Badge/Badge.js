import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
/**
 * @see https://vkcom.github.io/VKUI/#/Badge
 */ export var Badge = function(_param) /*#__PURE__*/ {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "new" : _param_mode, className = _param.className, restProps = _object_without_properties(_param, [
        "mode",
        "className"
    ]);
    return React.createElement("span", _object_spread({
        className: classNames("vkuiBadge", {
            new: "vkuiBadge--mode-new",
            prominent: "vkuiBadge--mode-prominent"
        }[mode], className)
    }, restProps));
};

//# sourceMappingURL=Badge.js.map