import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
var sizeYClassNames = {
    none: "vkuiSelectTypography--sizeY-none",
    compact: "vkuiSelectTypography--sizeY-compact"
};
var platformClassNames = {
    vkcom: "vkuiSelectTypography--vkcom",
    android: "vkuiSelectTypography--android"
};
/**
 * @private
 */ export var SelectTypography = function(_param) {
    var _param_selectType = _param.selectType, selectType = _param_selectType === void 0 ? "default" : _param_selectType, children = _param.children, className = _param.className, restProps = _object_without_properties(_param, [
        "selectType",
        "children",
        "className"
    ]);
    var platform = usePlatform();
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ React.createElement("span", _object_spread({
        className: classNames("vkuiSelectTypography", platformClassNames.hasOwnProperty(platform) && platformClassNames[platform], sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], selectType === "accent" && "vkuiSelectTypography--selectType-accent", className)
    }, restProps), children);
};

//# sourceMappingURL=SelectTypography.js.map