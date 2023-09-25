import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { ImageBase } from "../ImageBase/ImageBase";
import { ImageBadge } from "./ImageBadge/ImageBadge";
export var IMAGE_DEFAULT_SIZE = 48;
var getBorderRadiusBySize = function(size, borderRadius) {
    switch(borderRadius){
        case "s":
            {
                if (size <= 32) {
                    return 2;
                }
                if (size <= 56) {
                    return 3;
                }
                return 4;
            }
        case "m":
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
        case "l":
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
/**
 * @see https://vkcom.github.io/VKUI/#/Image
 */ export var Image = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? IMAGE_DEFAULT_SIZE : _param_size, tmp = _param.borderRadius, borderRadiusProp = tmp === void 0 ? "m" : tmp, style = _param.style, className = _param.className, restProps = _object_without_properties(_param, [
        "size",
        "borderRadius",
        "style",
        "className"
    ]);
    var borderRadius = React.useMemo(function() {
        return getBorderRadiusBySize(size, borderRadiusProp);
    }, [
        size,
        borderRadiusProp
    ]);
    return /*#__PURE__*/ React.createElement(ImageBase, _object_spread_props(_object_spread({}, restProps), {
        size: size,
        style: _object_spread_props(_object_spread({}, style), {
            borderRadius: borderRadius
        }),
        className: className
    }));
};
Image.Badge = ImageBadge;
Image.Overlay = ImageBase.Overlay;

//# sourceMappingURL=Image.js.map