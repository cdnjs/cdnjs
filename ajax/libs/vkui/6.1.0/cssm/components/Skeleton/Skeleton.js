import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
import styles from './Skeleton.module.css';
/**
 * > Старайтесь минимизировать количество заглушек на экране. Не каждый элемент
 * > на экране должен заменяться заглушкой.
 * >
 * > Текстовые блоки лучше сокращать до трёх строк. Ширина последней строки
 * > скелета вычисляется, как 75% от ширины текстового блока. Высота скелетона
 * > автоматически подстраивается под размер шрифта, поэтому идеально
 * > вписывается в слоты компонентов, которые обычно ожидают текст.
 *
 * @since 6.1.0
 */ export const Skeleton = ({ width, height, inlineSize, blockSize, maxWidth, maxInlineSize, borderRadius, style, children, colorFrom, colorTo, noAnimation, duration, margin, ...restProps })=>{
    const skeletonStyle = {
        width,
        height,
        inlineSize,
        blockSize,
        maxWidth,
        maxInlineSize,
        borderRadius,
        margin
    };
    if (colorFrom) {
        skeletonStyle['--vkui_internal--skeleton_color_from'] = colorFrom;
    }
    if (colorTo) {
        skeletonStyle['--vkui_internal--skeleton_color_to'] = colorTo;
    }
    if (Number.isFinite(duration)) {
        skeletonStyle['--vkui_internal--skeleton_animation_duration'] = `${duration}s`;
    }
    return /*#__PURE__*/ _jsx(RootComponent, {
        Component: "span",
        baseClassName: classNames(styles['Skeleton'], noAnimation && styles['Skeleton--disableAnimation']),
        style: {
            ...skeletonStyle,
            ...style
        },
        ...restProps,
        children: children || /*#__PURE__*/ _jsx(_Fragment, {
            children: "‌"
        })
    });
};

//# sourceMappingURL=Skeleton.js.map