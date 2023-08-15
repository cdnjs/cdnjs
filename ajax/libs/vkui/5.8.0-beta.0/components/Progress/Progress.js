import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { clamp } from "../../helpers/math";
function progressCustomHeightStyle(height) {
    return height ? {
        height: height,
        borderRadius: height / 2
    } : undefined;
}
function progressStyle(height, styleProps) {
    var styleHeight = progressCustomHeightStyle(height);
    var style = styleHeight ? _object_spread({}, styleProps, styleHeight) : styleProps;
    return style;
}
var PROGRESS_MIN_VALUE = 0;
var PROGRESS_MAX_VALUE = 100;
/**
 * @see https://vkcom.github.io/VKUI/#/Progress
 */ export var Progress = function(_param) {
    var _param_value = _param.value, value = _param_value === void 0 ? 0 : _param_value, getRootRef = _param.getRootRef, className = _param.className, _param_appearance = _param.appearance, appearance = _param_appearance === void 0 ? "accent" : _param_appearance, height = _param.height, styleProps = _param.style, restProps = _object_without_properties(_param, [
        "value",
        "getRootRef",
        "className",
        "appearance",
        "height",
        "style"
    ]);
    var progress = clamp(value, PROGRESS_MIN_VALUE, PROGRESS_MAX_VALUE);
    var title = "".concat(progress, " / ").concat(PROGRESS_MAX_VALUE);
    var style = progressStyle(height, styleProps);
    return /*#__PURE__*/ React.createElement("div", _object_spread_props(_object_spread({
        "aria-valuenow": value,
        title: title,
        style: style
    }, restProps), {
        role: "progressbar",
        "aria-valuemin": PROGRESS_MIN_VALUE,
        "aria-valuemax": PROGRESS_MAX_VALUE,
        ref: getRootRef,
        className: classNames("vkuiProgress", {
            accent: "vkuiProgress--appearance-accent",
            positive: "vkuiProgress--appearance-positive",
            negative: "vkuiProgress--appearance-negative"
        }[appearance], className)
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiProgress__in",
        style: {
            width: "".concat(progress, "%")
        }
    }));
};

//# sourceMappingURL=Progress.js.map