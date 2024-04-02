import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
/**
 * `AspectRatio` позволяет поддерживать постоянное соотношение ширины и высоты.
 * Его можно использовать для отображения изображений, карт, видео и других медиафайлов.

 * @since 5.5.0
 * @see https://vkcom.github.io/VKUI/#/AspectRatio
 */ export function AspectRatio(_param) {
    var { ratio, mode = 'stretch', style: styleProp } = _param, props = _object_without_properties(_param, [
        "ratio",
        "mode",
        "style"
    ]);
    const style = {
        ['--vkui_internal--aspect_ratio']: String(ratio)
    };
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread({
        baseClassName: classNames("vkuiAspectRatio", mode === 'stretch' && "vkuiAspectRatio--mode-stretch"),
        style: _object_spread({}, styleProp, style)
    }, props));
}

//# sourceMappingURL=AspectRatio.js.map