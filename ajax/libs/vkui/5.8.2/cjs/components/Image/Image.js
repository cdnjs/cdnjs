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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _ImageBase = require("../ImageBase/ImageBase");
var _ImageBadge = require("./ImageBadge/ImageBadge");
var IMAGE_DEFAULT_SIZE = 48;
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
var Image = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? IMAGE_DEFAULT_SIZE : _param_size, tmp = _param.borderRadius, borderRadiusProp = tmp === void 0 ? "m" : tmp, style = _param.style, className = _param.className, restProps = _object_without_properties._(_param, [
        "size",
        "borderRadius",
        "style",
        "className"
    ]);
    var borderRadius = _react.useMemo(function() {
        return getBorderRadiusBySize(size, borderRadiusProp);
    }, [
        size,
        borderRadiusProp
    ]);
    return /*#__PURE__*/ _react.createElement(_ImageBase.ImageBase, _object_spread_props._(_object_spread._({}, restProps), {
        size: size,
        style: _object_spread_props._(_object_spread._({}, style), {
            borderRadius: borderRadius
        }),
        className: className
    }));
};
Image.Badge = _ImageBadge.ImageBadge;
Image.Overlay = _ImageBase.ImageBase.Overlay;

//# sourceMappingURL=Image.js.map