import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
import { Platform } from "../../lib/platform";
import { FocusTrap } from "../FocusTrap/FocusTrap";
var stopPropagation = function(e) {
    return e.stopPropagation();
};
export var ActionSheetDropdownSheet = function(_param) {
    var children = _param.children, closing = _param.closing, // these 2 props are only omitted - ActionSheetDesktop compat
    toggleRef = _param.toggleRef, className = _param.className, restProps = _object_without_properties(_param, [
        "children",
        "closing",
        "toggleRef",
        "className"
    ]);
    var sizeY = useAdaptivityWithJSMediaQueries().sizeY;
    var platform = usePlatform();
    return /*#__PURE__*/ React.createElement(FocusTrap, _object_spread_props(_object_spread({}, restProps), {
        onClick: stopPropagation,
        className: classNames("vkuiActionSheet", platform === Platform.IOS && "vkuiActionSheet--ios", closing && "vkuiActionSheet--closing", sizeY === SizeType.COMPACT && "vkuiActionSheet--sizeY-compact", className)
    }), children);
};

//# sourceMappingURL=ActionSheetDropdownSheet.js.map