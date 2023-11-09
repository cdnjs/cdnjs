import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { HoverPopper } from "../HoverPopper/HoverPopper";
import { Subhead } from "../Typography/Subhead/Subhead";
var stylesAppearance = {
    accent: "vkuiTextTooltip--appearance-accent",
    white: "vkuiTextTooltip--appearance-white",
    black: "vkuiTextTooltip--appearance-black",
    inversion: "vkuiTextTooltip--appearance-inversion"
};
/**
 * @see https://vkcom.github.io/VKUI/#/TextTooltip
 */ export var TextTooltip = function(_param) {
    var children = _param.children, text = _param.text, header = _param.header, _param_appearance = _param.appearance, appearance = _param_appearance === void 0 ? "neutral" : _param_appearance, className = _param.className, popperProps = _object_without_properties(_param, [
        "children",
        "text",
        "header",
        "appearance",
        "className"
    ]);
    return /*#__PURE__*/ React.createElement(HoverPopper, _object_spread({
        className: classNames("vkuiTextTooltip", appearance !== "neutral" && stylesAppearance[appearance], className),
        arrow: true,
        arrowClassName: "vkuiTextTooltip__arrow",
        content: /*#__PURE__*/ React.createElement(React.Fragment, null, hasReactNode(header) && /*#__PURE__*/ React.createElement(Subhead, {
            weight: "2"
        }, header), hasReactNode(text) && /*#__PURE__*/ React.createElement(Subhead, null, text))
    }, popperProps), children);
};

//# sourceMappingURL=TextTooltip.js.map