import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './AspectRatio.module.css';
/**
 * `AspectRatio` позволяет поддерживать постоянное соотношение ширины и высоты.
 * Его можно использовать для отображения изображений, карт, видео и других медиафайлов.

 * @since 5.5.0
 * @see https://vkcom.github.io/VKUI/#/AspectRatio
 */ export function AspectRatio({ ratio, mode = 'stretch', style: styleProp, ...props }) {
    const style = {
        ['--vkui_internal--aspect_ratio']: String(ratio)
    };
    return /*#__PURE__*/ React.createElement(RootComponent, {
        baseClassName: classNames(styles.AspectRatio, mode === 'stretch' && styles['AspectRatio--mode-stretch']),
        style: {
            ...styleProp,
            ...style
        },
        ...props
    });
}

//# sourceMappingURL=AspectRatio.js.map