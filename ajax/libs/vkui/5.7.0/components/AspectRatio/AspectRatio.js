import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
/**
 * `AspectRatio` позволяет поддерживать постоянное соотношение ширины и высоты.
 * Его можно использовать для отображения изображений, карт, видео и других медиафайлов.
 
 * @since 5.5.0
 * @see https://vkcom.github.io/VKUI/#/AspectRatio
 */ export function AspectRatio(_param) {
    var ratio = _param.ratio, children = _param.children, _param_mode = _param.mode, mode = _param_mode === void 0 ? "stretch" : _param_mode, className = _param.className, getRootRef = _param.getRootRef, styleProp = _param.style, props = _object_without_properties(_param, [
        "ratio",
        "children",
        "mode",
        "className",
        "getRootRef",
        "style"
    ]);
    var style = _define_property({}, "--vkui_internal--aspect_ratio", String(ratio));
    return /*#__PURE__*/ React.createElement("div", _object_spread({
        className: classNames("vkuiAspectRatio", mode === "stretch" && "vkuiAspectRatio--mode-stretch", className),
        style: _object_spread({}, styleProp, style),
        ref: getRootRef
    }, props), children);
}

//# sourceMappingURL=AspectRatio.js.map