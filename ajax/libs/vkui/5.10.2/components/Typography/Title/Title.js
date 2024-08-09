import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Typography } from "../Typography";
var stylesLevel = {
    "1": "vkuiTitle--level-1",
    "2": "vkuiTitle--level-2",
    "3": "vkuiTitle--level-3"
};
/**
 * Используется для заголовков.
 *
 * @see https://vkcom.github.io/VKUI/#/Title
 */ export var Title = function(_param) {
    var className = _param.className, _param_level = _param.level, level = _param_level === void 0 ? "1" : _param_level, Component = _param.Component, _param_normalize = _param.normalize, normalize = _param_normalize === void 0 ? true : _param_normalize, restProps = _object_without_properties(_param, [
        "className",
        "level",
        "Component",
        "normalize"
    ]);
    if (!Component) {
        Component = "h" + level;
    }
    return /*#__PURE__*/ React.createElement(Typography, _object_spread({
        Component: Component,
        normalize: normalize,
        className: classNames(className, stylesLevel[level])
    }, restProps));
};

//# sourceMappingURL=Title.js.map