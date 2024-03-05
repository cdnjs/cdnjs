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
    GridAvatar: function() {
        return GridAvatar;
    },
    MAX_GRID_LENGTH: function() {
        return MAX_GRID_LENGTH;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _warnOnce = require("../../lib/warnOnce");
const _ImageBase = require("../ImageBase/ImageBase");
const _GridAvatarBadge = require("./GridAvatarBadge/GridAvatarBadge");
const GRID_AVATAR_DEFAULT_SIZE = 48;
const MAX_GRID_LENGTH = 4;
const warn = (0, _warnOnce.warnOnce)('GridAvatar');
const GridAvatar = (_param)=>{
    var { src = [], size = GRID_AVATAR_DEFAULT_SIZE, className, children } = _param, restProps = _object_without_properties._(_param, [
        "src",
        "size",
        "className",
        "children"
    ]);
    if (process.env.NODE_ENV === 'development') {
        if (src.length > MAX_GRID_LENGTH) {
            warn(`Длина массива src (${src.length}) больше максимальной (${MAX_GRID_LENGTH})`, 'error');
        }
    }
    return /*#__PURE__*/ _react.createElement(_ImageBase.ImageBase, _object_spread_props._(_object_spread._({}, restProps), {
        size: size,
        className: (0, _vkjs.classNames)("vkuiGridAvatar", className)
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiGridAvatar__in",
        "aria-hidden": true
    }, src.map((url, index)=>index < MAX_GRID_LENGTH ? /*#__PURE__*/ _react.createElement("div", {
            key: url,
            className: "vkuiGridAvatar__item",
            style: {
                backgroundImage: `url(${url})`
            }
        }) : null)), children);
};
GridAvatar.Badge = _GridAvatarBadge.GridAvatarBadge;

//# sourceMappingURL=GridAvatar.js.map