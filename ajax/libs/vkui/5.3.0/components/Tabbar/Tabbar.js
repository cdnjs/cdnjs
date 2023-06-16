import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
var getItemsLayoutClassName = function(itemsLayout, children) {
    switch(itemsLayout){
        case "horizontal":
            return "vkuiInternalTabbar--layout-horizontal";
        case "vertical":
            return "vkuiInternalTabbar--layout-vertical";
        default:
            return React.Children.count(children) > 2 ? getItemsLayoutClassName("vertical", []) : getItemsLayoutClassName("horizontal", []);
    }
};
/**
 * @see https://vkcom.github.io/VKUI/#/Tabbar
 */ export var Tabbar = function(_param) {
    var children = _param.children, _param_shadow = _param.shadow, shadow = _param_shadow === void 0 ? true : _param_shadow, mode = _param.mode, className = _param.className, restProps = _object_without_properties(_param, [
        "children",
        "shadow",
        "mode",
        "className"
    ]);
    var platform = usePlatform();
    return /*#__PURE__*/ React.createElement("div", _object_spread({
        className: classNames("vkuiTabbar", platform === Platform.IOS && "vkuiTabbar--ios", getItemsLayoutClassName(mode, children), shadow && "vkuiTabbar--shadow", className)
    }, restProps), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiTabbar__in"
    }, children));
};

//# sourceMappingURL=Tabbar.js.map