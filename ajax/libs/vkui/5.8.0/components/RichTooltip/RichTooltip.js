import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { HoverPopper } from "../HoverPopper/HoverPopper";
var stylesAppearance = {
    accent: "vkuiRichTooltip--appearance-accent",
    white: "vkuiRichTooltip--appearance-white",
    black: "vkuiRichTooltip--appearance-black",
    inversion: "vkuiRichTooltip--appearance-inversion"
};
/**
 * @see https://vkcom.github.io/VKUI/#/RichTooltip
 */ export var RichTooltip = function(_param) {
    var children = _param.children, _param_arrow = _param.arrow, arrow = _param_arrow === void 0 ? true : _param_arrow, _param_appearance = _param.appearance, appearance = _param_appearance === void 0 ? "neutral" : _param_appearance, className = _param.className, popperProps = _object_without_properties(_param, [
        "children",
        "arrow",
        "appearance",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement(HoverPopper, _object_spread({
        className: classNames("vkuiRichTooltip", appearance !== "neutral" && stylesAppearance[appearance], className),
        arrow: arrow,
        arrowClassName: "vkuiRichTooltip__arrow"
    }, popperProps), children);
};

//# sourceMappingURL=RichTooltip.js.map