import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./AspectRatio.module.css";
/**
 * `AspectRatio` позволяет поддерживать постоянное соотношение ширины и высоты.
 * Его можно использовать для отображения изображений, карт, видео и других медиафайлов.

 * @since 5.5.0
 * @see https://vkui.io/components/aspect-ratio
 */ export function AspectRatio({ ratio, mode = 'stretch', ...props }) {
    const style = {
        '--vkui_internal--aspect_ratio': typeof ratio === 'number' ? String(ratio) : ratio
    };
    return /*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: classNames(styles.host, mode === 'stretch' && styles.modeStretch),
        baseStyle: style,
        ...props
    });
}

//# sourceMappingURL=AspectRatio.js.map