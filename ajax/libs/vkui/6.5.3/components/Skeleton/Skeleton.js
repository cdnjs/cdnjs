import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../RootComponent/RootComponent';
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
 */ export const Skeleton = (_param)=>{
    var { width, height, inlineSize, blockSize, maxWidth, maxInlineSize, borderRadius, style, children, colorFrom, colorTo, noAnimation, duration, margin } = _param, restProps = _object_without_properties(_param, [
        "width",
        "height",
        "inlineSize",
        "blockSize",
        "maxWidth",
        "maxInlineSize",
        "borderRadius",
        "style",
        "children",
        "colorFrom",
        "colorTo",
        "noAnimation",
        "duration",
        "margin"
    ]);
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
    return /*#__PURE__*/ _jsx(RootComponent, _object_spread_props(_object_spread({
        Component: "span",
        baseClassName: classNames("vkuiSkeleton", noAnimation && "vkuiSkeleton--disableAnimation"),
        style: _object_spread({}, skeletonStyle, style)
    }, restProps), {
        children: children || /*#__PURE__*/ _jsx(_Fragment, {
            children: "‌"
        })
    }));
};

//# sourceMappingURL=Skeleton.js.map