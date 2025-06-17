'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { mergeStyle } from "../../helpers/mergeStyle.js";
import { ImageBase } from "../ImageBase/ImageBase.js";
import { ImageBadge } from "./ImageBadge/ImageBadge.js";
import styles from "./Image.module.css";
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
 */ export const Image = ({ size = IMAGE_DEFAULT_SIZE, borderRadius = 'm', borderStartStartRadius, borderStartEndRadius, borderEndStartRadius, borderEndEndRadius, style, className, objectFit = 'cover', ...restProps })=>{
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
    return /*#__PURE__*/ _jsx(ImageBase, {
        ...restProps,
        objectFit: objectFit,
        size: size,
        style: mergeStyle(borderStyles, style),
        className: classNames(className, styles.host, borderStartStartRadius && styles.borderStartStartRadius, borderStartEndRadius && styles.borderStartEndRadius, borderEndStartRadius && styles.borderEndStartRadius, borderEndEndRadius && styles.borderEndEndRadius)
    });
};
Image.displayName = 'Image';
Image.Badge = ImageBadge;
Image.Badge.displayName = 'Image.Badge';
Image.Overlay = ImageBase.Overlay;
Image.Overlay.displayName = 'Image.Overlay';
Image.FloatElement = ImageBase.FloatElement;
Image.FloatElement.displayName = 'Image.FloatElement';

//# sourceMappingURL=Image.js.map