"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Image", {
    enumerable: true,
    get: function() {
        return Image;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
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
const getBorderRadiusBySizeInPx = (size, borderRadius)=>{
    if (!borderRadius) {
        return undefined;
    }
    return `${getBorderRadiusBySize(size, borderRadius)}px`;
};
const Image = (_param)=>{
    var { size = IMAGE_DEFAULT_SIZE, borderRadius = 'm', borderStartStartRadius, borderStartEndRadius, borderEndStartRadius, borderEndEndRadius, style, className, objectFit = 'cover' } = _param, restProps = _object_without_properties._(_param, [
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
    const borderStyles = _react.useMemo(()=>({
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
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_ImageBase.ImageBase, _object_spread_props._(_object_spread._({}, restProps), {
        objectFit: objectFit,
        size: size,
        style: _object_spread._({}, borderStyles, style),
        className: (0, _vkjs.classNames)(className, "vkuiImage", borderStartStartRadius && "vkuiImage--borderStartStartRadius", borderStartEndRadius && "vkuiImage--borderStartEndRadius", borderEndStartRadius && "vkuiImage--borderEndStartRadius", borderEndEndRadius && "vkuiImage--borderEndEndRadius")
    }));
};
Image.displayName = 'Image';
Image.Badge = _ImageBadge.ImageBadge;
Image.Badge.displayName = 'Image.Badge';
Image.Overlay = _ImageBase.ImageBase.Overlay;
Image.Overlay.displayName = 'Image.Overlay';

//# sourceMappingURL=Image.js.map