import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent";
var stylesMode = {
    vertical: "vkuiButtonGroup--mode-vertical",
    horizontal: "vkuiButtonGroup--mode-horizontal"
};
var stylesGap = {
    space: "vkuiButtonGroup--gap-space",
    s: "vkuiButtonGroup--gap-s",
    m: "vkuiButtonGroup--gap-m"
};
var stylesAlign = {
    left: "vkuiButtonGroup--align-left",
    center: "vkuiButtonGroup--align-center",
    right: "vkuiButtonGroup--align-right"
};
/**
 * @see https://vkcom.github.io/VKUI/#/ButtonGroup
 */ export var ButtonGroup = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "horizontal" : _param_mode, _param_gap = _param.gap, gap = _param_gap === void 0 ? "m" : _param_gap, _param_stretched = _param.stretched, stretched = _param_stretched === void 0 ? false : _param_stretched, _param_align = _param.align, align = _param_align === void 0 ? "left" /* NOTE: Чтобы блоки по-умолчанию не растягивались на всю ширину контейнера */  : _param_align, restProps = _object_without_properties(_param, [
        "mode",
        "gap",
        "stretched",
        "align"
    ]);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: classNames("vkuiButtonGroup", stylesMode[mode], gap !== "none" && stylesGap[gap], stretched && "vkuiButtonGroup--stretched", stylesAlign[align]),
        role: "group"
    }, restProps));
};

//# sourceMappingURL=ButtonGroup.js.map