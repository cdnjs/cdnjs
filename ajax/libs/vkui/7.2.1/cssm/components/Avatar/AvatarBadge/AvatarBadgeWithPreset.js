'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useConfigDirection } from "../../../hooks/useConfigDirection.js";
import { getBadgeIconSizeByImageBaseSize, ImageBase, ImageBaseContext } from "../../ImageBase/ImageBase.js";
import { Icon12Circle, Icon12OnlineMobile } from "./icons.js";
import styles from "./AvatarBadge.module.css";
export const AvatarBadgeWithPreset = ({ preset = 'online', className, ...restProps })=>{
    const direction = useConfigDirection();
    const isRtl = direction === 'rtl';
    const { size } = React.useContext(ImageBaseContext);
    const badgeSize = getBadgeIconSizeByImageBaseSize(size);
    const isOnlinePreset = preset === 'online';
    const presetClassName = isOnlinePreset ? styles.presetOnline : styles.presetOnlineMobile;
    const Icon = isOnlinePreset ? Icon12Circle : Icon12OnlineMobile;
    return /*#__PURE__*/ _jsx(ImageBase.Badge, {
        background: "stroke",
        className: classNames(styles.host, isRtl && styles.rtl, presetClassName, className),
        ...restProps,
        children: /*#__PURE__*/ _jsx(Icon, {
            width: badgeSize,
            height: badgeSize
        })
    });
};
AvatarBadgeWithPreset.displayName = 'Avatar.BadgeWithPreset';

//# sourceMappingURL=AvatarBadgeWithPreset.js.map