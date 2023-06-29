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
    AVATAR_DEFAULT_SIZE: function() {
        return AVATAR_DEFAULT_SIZE;
    },
    Avatar: function() {
        return Avatar;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _imageBase = require("../ImageBase/ImageBase");
var _avatarBadge = require("./AvatarBadge/AvatarBadge");
var _avatarBadgeWithPreset = require("./AvatarBadge/AvatarBadgeWithPreset");
var _helpers = require("./helpers");
var AVATAR_DEFAULT_SIZE = 48;
var COLORS_NUMBER_TO_TEXT_MAP = {
    1: "red",
    2: "orange",
    3: "yellow",
    4: "green",
    5: "l-blue",
    6: "violet"
};
var gradientStyles = {
    "red": "vkuiAvatar--gradient-red",
    "orange": "vkuiAvatar--gradient-orange",
    "yellow": "vkuiAvatar--gradient-yellow",
    "green": "vkuiAvatar--gradient-green",
    "blue": "vkuiAvatar--gradient-blue",
    "l-blue": "vkuiAvatar--gradient-l-blue",
    "violet": "vkuiAvatar--gradient-violet"
};
var Avatar = function(_param) {
    var _param_size = _param.size, size = _param_size === void 0 ? AVATAR_DEFAULT_SIZE : _param_size, className = _param.className, gradientColor = _param.gradientColor, initials = _param.initials, fallbackIcon = _param.fallbackIcon, children = _param.children, restProps = _objectWithoutProperties(_param, [
        "size",
        "className",
        "gradientColor",
        "initials",
        "fallbackIcon",
        "children"
    ]);
    var gradientName = typeof gradientColor === "number" ? COLORS_NUMBER_TO_TEXT_MAP[gradientColor] : gradientColor;
    var isGradientNotCustom = gradientName && gradientName !== "custom";
    var rewrittenFallbackIcon = initials ? undefined : fallbackIcon;
    return /*#__PURE__*/ _react.createElement(_imageBase.ImageBase, _objectSpreadProps(_objectSpread({}, restProps), {
        size: size,
        fallbackIcon: rewrittenFallbackIcon,
        className: (0, _vkjs.classNames)("vkuiAvatar", gradientName && "vkuiAvatar--has-gradient", isGradientNotCustom && gradientStyles[gradientName], className)
    }), initials && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiAvatar__initials",
        style: {
            fontSize: (0, _helpers.getInitialsFontSize)(size)
        }
    }, initials), children);
};
Avatar.Badge = _avatarBadge.AvatarBadge;
Avatar.BadgeWithPreset = _avatarBadgeWithPreset.AvatarBadgeWithPreset;
Avatar.Overlay = _imageBase.ImageBase.Overlay;

//# sourceMappingURL=Avatar.js.map