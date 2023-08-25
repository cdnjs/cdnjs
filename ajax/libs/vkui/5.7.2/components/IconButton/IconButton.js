import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
import { Platform } from "../../lib/platform";
import { COMMON_WARNINGS, warnOnce } from "../../lib/warnOnce";
import { Tappable } from "../Tappable/Tappable";
var sizeYClassNames = _define_property({
    none: "vkuiIconButton--sizeY-none"
}, SizeType.COMPACT, "vkuiIconButton--sizeY-compact");
var warn = warnOnce("IconButton");
/**
 * @see https://vkcom.github.io/VKUI/#/IconButton
 */ export var IconButton = function(_param) {
    var children = _param.children, className = _param.className, restProps = _object_without_properties(_param, [
        "children",
        "className"
    ]);
    var platform = usePlatform();
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    if (process.env.NODE_ENV === "development") {
        var isAccessible = restProps["aria-label"] || restProps["aria-labelledby"];
        if (!isAccessible) {
            warn(COMMON_WARNINGS.a11y[restProps.href ? "link-name" : "button-name"], "error");
        }
    }
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({
        activeEffectDelay: 200,
        activeMode: "background",
        Component: restProps.href ? "a" : "button"
    }, restProps), {
        className: classNames("vkuiIconButton", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], platform === Platform.IOS && "vkuiIconButton--ios", className)
    }), children);
};

//# sourceMappingURL=IconButton.js.map