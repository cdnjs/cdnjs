'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { mergeStyle } from "../../helpers/mergeStyle.js";
import { ImageBase } from "../ImageBase/ImageBase.js";
import { ImageBadge } from "./ImageBadge/ImageBadge.js";
const IMAGE_DEFAULT_SIZE = 48;
const getBorderRadiusBySize = (size, borderRadius)=>{
    switch(borderRadius){
        case 's':
            {
                if (size <= 32) {
                    return 2;
                }
                if (size <= 56) {
                    return 3;
                }
                return 4;
            }
        case 'm':
            {
                if (size <= 32) {
                    return 3;
                }
                if (size <= 48) {
                    return 4;
                }
                if (size <= 72) {
                    return 6;
                }
                if (size <= 80) {
                    return 8;
                }
                return 10;
            }
        case 'l':
            {
                if (size <= 16) {
                    return 4;
                }
                if (size <= 20) {
                    return 5;
                }
                if (size <= 32) {
                    return 6;
                }
                if (size <= 40) {
                    return 8;
                }
                if (size <= 48) {
                    return 10;
                }
                if (size <= 56) {
                    return 12;
                }
                if (size <= 64) {
                    return 14;
                }
                return 16;
            }
    }
};
const getBorderRadiusBySizeInPx = (size, borderRadius)=>{
    if (!borderRadius) {
        return undefined;
    }
    return `${getBorderRadiusBySize(size, borderRadius)}px`;
};
/**
 * @see https://vkcom.github.io/VKUI/#/Image
 */ export const Image = (_param)=>{
    var { size = IMAGE_DEFAULT_SIZE, borderRadius = 'm', borderStartStartRadius, borderStartEndRadius, borderEndStartRadius, borderEndEndRadius, style, className, objectFit = 'cover' } = _param, restProps = _object_without_properties(_param, [
        "size",
        "borderRadius",
        "borderStartStartRadius",
        "borderStartEndRadius",
        "borderEndStartRadius",
        "borderEndEndRadius",
        "style",
        "className",
        "objectFit"
    ]);
    const borderStyles = React.useMemo(()=>({
            '--vkui_internal--Image_border_radius': getBorderRadiusBySizeInPx(size, borderRadius),
            '--vkui_internal--Image_border_start_start_radius': getBorderRadiusBySizeInPx(size, borderStartStartRadius),
            '--vkui_internal--Image_border_start_end_radius': getBorderRadiusBySizeInPx(size, borderStartEndRadius),
            '--vkui_internal--Image_border_end_start_radius': getBorderRadiusBySizeInPx(size, borderEndStartRadius),
            '--vkui_internal--Image_border_end_end_radius': getBorderRadiusBySizeInPx(size, borderEndEndRadius)
        }), [
        borderRadius,
        borderStartStartRadius,
        borderStartEndRadius,
        borderEndStartRadius,
        borderEndEndRadius,
        size
    ]);
    return /*#__PURE__*/ _jsx(ImageBase, _object_spread_props(_object_spread({}, restProps), {
        objectFit: objectFit,
        size: size,
        style: mergeStyle(borderStyles, style),
        className: classNames(className, "vkuiImage__host", borderStartStartRadius && "vkuiImage__borderStartStartRadius", borderStartEndRadius && "vkuiImage__borderStartEndRadius", borderEndStartRadius && "vkuiImage__borderEndStartRadius", borderEndEndRadius && "vkuiImage__borderEndEndRadius")
    }));
};
Image.displayName = 'Image';
Image.Badge = ImageBadge;
Image.Badge.displayName = 'Image.Badge';
Image.Overlay = ImageBase.Overlay;
Image.Overlay.displayName = 'Image.Overlay';
Image.FloatElement = ImageBase.FloatElement;
Image.FloatElement.displayName = 'Image.FloatElement';

//# sourceMappingURL=Image.js.map