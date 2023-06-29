"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AvatarBadgeWithPreset", {
    enumerable: true,
    get: function() {
        return AvatarBadgeWithPreset;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _imageBase = require("../../ImageBase/ImageBase");
var _icons = require("./icons");
var AvatarBadgeWithPreset = function(_param) {
    var _param_preset = _param.preset, preset = _param_preset === void 0 ? "online" : _param_preset, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "preset",
        "className"
    ]);
    var size = _react.useContext(_imageBase.ImageBaseContext).size;
    var badgeSize = (0, _imageBase.getBadgeIconSizeByImageBaseSize)(size);
    var isOnlinePreset = preset === "online";
    var presetClassName = isOnlinePreset ? "vkuiAvatarBadge--preset-online" : "vkuiAvatarBadge--preset-onlineMobile";
    var Icon = isOnlinePreset ? _icons.Icon12Circle : _icons.Icon12OnlineMobile;
    return /*#__PURE__*/ _react.createElement(_imageBase.ImageBase.Badge, _objectSpread({
        background: "stroke",
        className: (0, _vkjs.classNames)("vkuiAvatarBadge", presetClassName, className)
    }, restProps), /*#__PURE__*/ _react.createElement(Icon, {
        width: badgeSize,
        height: badgeSize
    }));
};

//# sourceMappingURL=AvatarBadgeWithPreset.js.map