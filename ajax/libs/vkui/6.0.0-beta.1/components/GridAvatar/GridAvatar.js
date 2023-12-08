import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { warnOnce } from '../../lib/warnOnce';
import { ImageBase } from '../ImageBase/ImageBase';
import { GridAvatarBadge } from './GridAvatarBadge/GridAvatarBadge';
export const GRID_AVATAR_DEFAULT_SIZE = 48;
export const MAX_GRID_LENGTH = 4;
const warn = warnOnce('GridAvatar');
/**
 * @see https://vkcom.github.io/VKUI/#/GridAvatar
 */ export const GridAvatar = (_param)=>{
    var { src = [], size = GRID_AVATAR_DEFAULT_SIZE, className, children } = _param, restProps = _object_without_properties(_param, [
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
    return /*#__PURE__*/ React.createElement(ImageBase, _object_spread_props(_object_spread({}, restProps), {
        size: size,
        className: classNames("vkuiGridAvatar", className)
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiGridAvatar__in",
        "aria-hidden": true
    }, src.map((url, index)=>index < MAX_GRID_LENGTH ? /*#__PURE__*/ React.createElement("div", {
            key: url,
            className: "vkuiGridAvatar__item",
            style: {
                backgroundImage: `url(${url})`
            }
        }) : null)), children);
};
GridAvatar.Badge = GridAvatarBadge;

//# sourceMappingURL=GridAvatar.js.map