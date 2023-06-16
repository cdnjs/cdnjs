import _object_spread from "@swc/helpers/src/_object_spread.mjs";
import _object_spread_props from "@swc/helpers/src/_object_spread_props.mjs";
import _object_without_properties from "@swc/helpers/src/_object_without_properties.mjs";
import * as React from "react";
import { Icon16Chevron, Icon16ChevronLeft, Icon24Chevron, Icon24ChevronCompactLeft } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { Tappable } from "../Tappable/Tappable";
export var HorizontalScrollArrow = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? "l" : _param_size, direction = _param.direction, onClick = _param.onClick, className = _param.className, restProps = _object_without_properties(_param, [
        "size",
        "direction",
        "onClick",
        "className"
    ]);
    var ArrowIcon;
    if (size === "m") {
        ArrowIcon = direction === "left" ? Icon16ChevronLeft : Icon16Chevron;
    } else {
        ArrowIcon = direction === "left" ? Icon24ChevronCompactLeft : Icon24Chevron;
    }
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({}, restProps), {
        Component: "button",
        hasHover: false,
        hasActive: false,
        className: classNames("vkuiHorizontalScrollArrow", {
            m: "vkuiHorizontalScrollArrow--size-m",
            l: "vkuiHorizontalScrollArrow--size-l"
        }[size], {
            left: "vkuiHorizontalScrollArrow--direction-left",
            right: "vkuiHorizontalScrollArrow--direction-right"
        }[direction], className),
        onClick: onClick
    }), /*#__PURE__*/ React.createElement("span", {
        className: "vkuiHorizontalScrollArrow__icon"
    }, /*#__PURE__*/ React.createElement(ArrowIcon, null)));
};

//# sourceMappingURL=HorizontalScrollArrow.js.map