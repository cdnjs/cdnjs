import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { usePlatform } from "../../hooks/usePlatform";
import { Platform } from "../../lib/platform";
import { RootComponent } from "../RootComponent/RootComponent";
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
    var _param_shadow = _param.shadow, shadow = _param_shadow === void 0 ? true : _param_shadow, mode = _param.mode, restProps = _object_without_properties(_param, [
        "shadow",
        "mode"
    ]);
    var platform = usePlatform();
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: classNames("vkuiInternalTabbar", "vkuiTabbar", platform === Platform.IOS && "vkuiTabbar--ios", getItemsLayoutClassName(mode, restProps.children), shadow && "vkuiTabbar--shadow")
    }, restProps));
};

//# sourceMappingURL=Tabbar.js.map