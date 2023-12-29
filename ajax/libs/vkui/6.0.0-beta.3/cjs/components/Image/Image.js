"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    IMAGE_DEFAULT_SIZE: function() {
        return IMAGE_DEFAULT_SIZE;
    },
    Image: function() {
        return Image;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _ImageBase = require("../ImageBase/ImageBase");
const _ImageBadge = require("./ImageBadge/ImageBadge");
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
const Image = (_param)=>{
    var { size = IMAGE_DEFAULT_SIZE, borderRadius: borderRadiusProp = 'm', style, className } = _param, restProps = _object_without_properties._(_param, [
        "size",
        "borderRadius",
        "style",
        "className"
    ]);
    const borderRadius = _react.useMemo(()=>getBorderRadiusBySize(size, borderRadiusProp), [
        size,
        borderRadiusProp
    ]);
    return /*#__PURE__*/ _react.createElement(_ImageBase.ImageBase, _object_spread_props._(_object_spread._({}, restProps), {
        size: size,
        style: _object_spread_props._(_object_spread._({}, style), {
            borderRadius
        }),
        className: className
    }));
};
Image.Badge = _ImageBadge.ImageBadge;
Image.Overlay = _ImageBase.ImageBase.Overlay;

//# sourceMappingURL=Image.js.map