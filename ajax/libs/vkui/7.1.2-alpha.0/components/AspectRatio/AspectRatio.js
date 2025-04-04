import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
/**
 * `AspectRatio` позволяет поддерживать постоянное соотношение ширины и высоты.
 * Его можно использовать для отображения изображений, карт, видео и других медиафайлов.

 * @since 5.5.0
 * @see https://vkcom.github.io/VKUI/#/AspectRatio
 */ export function AspectRatio(_param) {
    var { ratio, mode = 'stretch' } = _param, props = _object_without_properties(_param, [
        "ratio",
        "mode"
    ]);
    const style = {
        '--vkui_internal--aspect_ratio': typeof ratio === 'number' ? String(ratio) : ratio
    };
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread({
        baseClassName: classNames("vkuiAspectRatio__host", mode === 'stretch' && "vkuiAspectRatio__modeStretch"),
        baseStyle: style
    }, props));
}

//# sourceMappingURL=AspectRatio.js.map