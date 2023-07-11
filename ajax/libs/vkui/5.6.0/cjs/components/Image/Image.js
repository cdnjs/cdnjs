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
var Image = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? IMAGE_DEFAULT_SIZE : _param_size, tmp = _param.borderRadius, borderRadiusProp = tmp === void 0 ? "m" : tmp, style = _param.style, className = _param.className, restProps = _object_without_properties._(_param, [
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