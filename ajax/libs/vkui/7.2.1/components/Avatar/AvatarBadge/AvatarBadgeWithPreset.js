'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useConfigDirection } from "../../../hooks/useConfigDirection.js";
import { getBadgeIconSizeByImageBaseSize, ImageBase, ImageBaseContext } from "../../ImageBase/ImageBase.js";
import { Icon12Circle, Icon12OnlineMobile } from "./icons.js";
export const AvatarBadgeWithPreset = (_param)=>{
    var { preset = 'online', className } = _param, restProps = _object_without_properties(_param, [
        "preset",
        "className"
    ]);
    const direction = useConfigDirection();
    const isRtl = direction === 'rtl';
    const { size } = React.useContext(ImageBaseContext);
    const badgeSize = getBadgeIconSizeByImageBaseSize(size);
    const isOnlinePreset = preset === 'online';
    const presetClassName = isOnlinePreset ? "vkuiAvatarBadge__presetOnline" : "vkuiAvatarBadge__presetOnlineMobile";
    const Icon = isOnlinePreset ? Icon12Circle : Icon12OnlineMobile;
    return /*#__PURE__*/ _jsx(ImageBase.Badge, _object_spread_props(_object_spread({
        background: "stroke",
        className: classNames("vkuiAvatarBadge__host", isRtl && "vkuiAvatarBadge__rtl", presetClassName, className)
    }, restProps), {
        children: /*#__PURE__*/ _jsx(Icon, {
            width: badgeSize,
            height: badgeSize
        })
    }));
};
AvatarBadgeWithPreset.displayName = 'Avatar.BadgeWithPreset';

//# sourceMappingURL=AvatarBadgeWithPreset.js.map