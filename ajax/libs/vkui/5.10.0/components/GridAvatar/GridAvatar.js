import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { warnOnce } from "../../lib/warnOnce";
import { ImageBase } from "../ImageBase/ImageBase";
import { GridAvatarBadge } from "./GridAvatarBadge/GridAvatarBadge";
export var GRID_AVATAR_DEFAULT_SIZE = 48;
export var MAX_GRID_LENGTH = 4;
var warn = warnOnce("GridAvatar");
/**
 * @see https://vkcom.github.io/VKUI/#/GridAvatar
 */ export var GridAvatar = function(_param) {
    var _param_src = _param.src, src = _param_src === void 0 ? [] : _param_src, _param_size = _param.size, size = _param_size === void 0 ? GRID_AVATAR_DEFAULT_SIZE : _param_size, className = _param.className, children = _param.children, restProps = _object_without_properties(_param, [
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
    return /*#__PURE__*/ React.createElement(ImageBase, _object_spread_props(_object_spread({}, restProps), {
        size: size,
        className: classNames("vkuiGridAvatar", className)
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiGridAvatar__in",
        "aria-hidden": true
    }, src.map(function(url, index) {
        return index < MAX_GRID_LENGTH ? /*#__PURE__*/ React.createElement("div", {
            key: url,
            className: "vkuiGridAvatar__item",
            style: {
                backgroundImage: "url(".concat(url, ")")
            }
        }) : null;
    })), children);
};
GridAvatar.Badge = GridAvatarBadge;

//# sourceMappingURL=GridAvatar.js.map