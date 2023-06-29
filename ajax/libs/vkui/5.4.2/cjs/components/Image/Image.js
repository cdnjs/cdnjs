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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _imageBase = require("../ImageBase/ImageBase");
var _imageBadge = require("./ImageBadge/ImageBadge");
var IMAGE_DEFAULT_SIZE = 48;
var Image = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? IMAGE_DEFAULT_SIZE : _param_size, tmp = _param.borderRadius, borderRadiusProp = tmp === void 0 ? "m" : tmp, style = _param.style, className = _param.className, restProps = _objectWithoutProperties(_param, [
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
    return /*#__PURE__*/ _react.createElement(_imageBase.ImageBase, _objectSpreadProps(_objectSpread({}, restProps), {
        size: size,
        style: _objectSpreadProps(_objectSpread({}, style), {
            borderRadius: borderRadius
        }),
        className: className
    }));
};
Image.Badge = _imageBadge.ImageBadge;
Image.Overlay = _imageBase.ImageBase.Overlay;

//# sourceMappingURL=Image.js.map