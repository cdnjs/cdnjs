import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Tappable } from "../Tappable/Tappable";
/**
 * @see https://vkcom.github.io/VKUI/#/Link
 */ export var Link = function(_param) {
    var hasVisited = _param.hasVisited, children = _param.children, className = _param.className, restProps = _object_without_properties(_param, [
        "hasVisited",
        "children",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({
        Component: restProps.href ? "a" : "button"
    }, restProps), {
        className: classNames("vkuiLink", hasVisited && "vkuiLink--has-visited", className),
        hasHover: false,
        activeMode: "opacity",
        focusVisibleMode: "outside"
    }), children);
};

//# sourceMappingURL=Link.js.map