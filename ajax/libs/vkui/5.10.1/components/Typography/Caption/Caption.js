import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Typography } from "../Typography";
var stylesLevel = {
    "1": "vkuiCaption--level-1",
    "2": "vkuiCaption--level-2",
    "3": "vkuiCaption--level-3"
};
/**
 * Используется для мелких подписей.
 *
 * @see https://vkcom.github.io/VKUI/#/Caption
 */ export var Caption = function(_param) {
    var className = _param.className, _param_level = _param.level, level = _param_level === void 0 ? "1" : _param_level, caps = _param.caps, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, _param_normalize = _param.normalize, normalize = _param_normalize === void 0 ? true : _param_normalize, restProps = _object_without_properties(_param, [
        "className",
        "level",
        "caps",
        "Component",
        "normalize"
    ]);
    return /*#__PURE__*/ React.createElement(Typography, _object_spread({
        Component: Component,
        normalize: normalize,
        className: classNames(className, caps && "vkuiCaption--caps", stylesLevel[level])
    }, restProps));
};

//# sourceMappingURL=Caption.js.map