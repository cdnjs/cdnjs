import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { getBadgeIconSizeByImageBaseSize, ImageBase, ImageBaseContext } from '../../ImageBase/ImageBase';
import { Icon12Circle, Icon12OnlineMobile } from './icons';
export const AvatarBadgeWithPreset = (_param)=>{
    var { preset = 'online', className } = _param, restProps = _object_without_properties(_param, [
        "preset",
        "className"
    ]);
    const { size } = React.useContext(ImageBaseContext);
    const badgeSize = getBadgeIconSizeByImageBaseSize(size);
    const isOnlinePreset = preset === 'online';
    const presetClassName = isOnlinePreset ? "vkuiAvatarBadge--preset-online" : "vkuiAvatarBadge--preset-onlineMobile";
    const Icon = isOnlinePreset ? Icon12Circle : Icon12OnlineMobile;
    return /*#__PURE__*/ React.createElement(ImageBase.Badge, _object_spread({
        background: "stroke",
        className: classNames("vkuiAvatarBadge", presetClassName, className)
    }, restProps), /*#__PURE__*/ React.createElement(Icon, {
        width: badgeSize,
        height: badgeSize
    }));
};

//# sourceMappingURL=AvatarBadgeWithPreset.js.map