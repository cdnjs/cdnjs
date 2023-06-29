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
    GRID_AVATAR_DEFAULT_SIZE: function() {
        return GRID_AVATAR_DEFAULT_SIZE;
    },
    MAX_GRID_LENGTH: function() {
        return MAX_GRID_LENGTH;
    },
    GridAvatar: function() {
        return GridAvatar;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _warnOnce = require("../../lib/warnOnce");
var _imageBase = require("../ImageBase/ImageBase");
var _gridAvatarBadge = require("./GridAvatarBadge/GridAvatarBadge");
var GRID_AVATAR_DEFAULT_SIZE = 48;
var MAX_GRID_LENGTH = 4;
var warn = (0, _warnOnce.warnOnce)("GridAvatar");
var GridAvatar = function(_param) {
    var _param_src = _param.src, src = _param_src === void 0 ? [] : _param_src, _param_size = _param.size, size = _param_size === void 0 ? GRID_AVATAR_DEFAULT_SIZE : _param_size, className = _param.className, children = _param.children, restProps = _objectWithoutProperties(_param, [
        "src",
        "size",
        "className",
        "children"
    ]);
    if (process.env.NODE_ENV === "development") {
        if (src.length > MAX_GRID_LENGTH) {
            warn("Длина массива src (".concat(src.length, ") больше максимальной (").concat(MAX_GRID_LENGTH, ")"), "error");
        }
    }
    return /*#__PURE__*/ _react.createElement(_imageBase.ImageBase, _objectSpreadProps(_objectSpread({}, restProps), {
        size: size,
        className: (0, _vkjs.classNames)("vkuiGridAvatar", className)
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiGridAvatar__in",
        "aria-hidden": true
    }, src.map(function(url, index) {
        return index < MAX_GRID_LENGTH ? /*#__PURE__*/ _react.createElement("div", {
            key: url,
            className: "vkuiGridAvatar__item",
            style: {
                backgroundImage: "url(".concat(url, ")")
            }
        }) : null;
    })), children);
};
GridAvatar.Badge = _gridAvatarBadge.GridAvatarBadge;

//# sourceMappingURL=GridAvatar.js.map