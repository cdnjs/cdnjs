import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { ImageBase } from "../ImageBase/ImageBase";
import { ImageBadge } from "./ImageBadge/ImageBadge";
export var IMAGE_DEFAULT_SIZE = 48;
/**
 * @see https://vkcom.github.io/VKUI/#/Image
 */ export var Image = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? IMAGE_DEFAULT_SIZE : _param_size, tmp = _param.borderRadius, borderRadiusProp = tmp === void 0 ? "m" : tmp, style = _param.style, className = _param.className, restProps = _object_without_properties(_param, [
        "size",
        "borderRadius",
        "style",
        "className"
    ]);
    var borderRadius;
    switch(borderRadiusProp){
        case "s":
            {
                if (size <= 32) {
                    borderRadius = 2;
                } else if (size <= 56) {
                    borderRadius = 3;
                }
                borderRadius = 4;
                break;
            }
        case "m":
            {
                if (size <= 32) {
                    borderRadius = 3;
                } else if (size <= 48) {
                    borderRadius = 4;
                } else if (size <= 72) {
                    borderRadius = 6;
                } else if (size <= 80) {
                    borderRadius = 8;
                }
                borderRadius = 10;
                break;
            }
        case "l":
            {
                if (size <= 16) {
                    borderRadius = 4;
                } else if (size <= 20) {
                    borderRadius = 5;
                } else if (size <= 32) {
                    borderRadius = 6;
                } else if (size <= 40) {
                    borderRadius = 8;
                } else if (size <= 48) {
                    borderRadius = 10;
                } else if (size <= 56) {
                    borderRadius = 12;
                } else if (size <= 64) {
                    borderRadius = 14;
                }
                borderRadius = 16;
            }
    }
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