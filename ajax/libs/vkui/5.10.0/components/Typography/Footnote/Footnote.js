import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { Typography } from "../Typography";
/**
 * Используется для основных подписей.
 *
 * @see https://vkcom.github.io/VKUI/#/Footnote
 */ export var Footnote = function(_param) /*#__PURE__*/ {
    var className = _param.className, caps = _param.caps, _param_Component = _param.Component, Component = _param_Component === void 0 ? "span" : _param_Component, _param_normalize = _param.normalize, normalize = _param_normalize === void 0 ? true : _param_normalize, restProps = _object_without_properties(_param, [
        "className",
        "caps",
        "Component",
        "normalize"
    ]);
    return React.createElement(Typography, _object_spread({
        Component: Component,
        normalize: normalize,
        className: classNames(className, "vkuiFootnote", caps && "vkuiFootnote--caps")
    }, restProps));
};

//# sourceMappingURL=Footnote.js.map