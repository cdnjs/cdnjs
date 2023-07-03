import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { getBadgeIconSizeByImageBaseSize, ImageBase, ImageBaseContext } from "../../ImageBase/ImageBase";
import { Icon12Circle, Icon12OnlineMobile } from "./icons";
export var AvatarBadgeWithPreset = function(_param) {
    var _param_preset = _param.preset, preset = _param_preset === void 0 ? "online" : _param_preset, className = _param.className, restProps = _object_without_properties(_param, [
        "preset",
        "className"
    ]);
    var size = React.useContext(ImageBaseContext).size;
    var badgeSize = getBadgeIconSizeByImageBaseSize(size);
    var isOnlinePreset = preset === "online";
    var presetClassName = isOnlinePreset ? "vkuiAvatarBadge--preset-online" : "vkuiAvatarBadge--preset-onlineMobile";
    var Icon = isOnlinePreset ? Icon12Circle : Icon12OnlineMobile;
    return /*#__PURE__*/ React.createElement(ImageBase.Badge, _object_spread({
        background: "stroke",
        className: classNames("vkuiAvatarBadge", presetClassName, className)
    }, restProps), /*#__PURE__*/ React.createElement(Icon, {
        width: badgeSize,
        height: badgeSize
    }));
};

//# sourceMappingURL=AvatarBadgeWithPreset.js.map