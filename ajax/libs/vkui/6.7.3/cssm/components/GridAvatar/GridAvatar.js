import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { warnOnce } from '../../lib/warnOnce';
import { ImageBase } from '../ImageBase/ImageBase';
import { GridAvatarBadge } from './GridAvatarBadge/GridAvatarBadge';
import styles from './GridAvatar.module.css';
const GRID_AVATAR_DEFAULT_SIZE = 48;
export const MAX_GRID_LENGTH = 4;
const warn = warnOnce('GridAvatar');
/**
 * @see https://vkcom.github.io/VKUI/#/GridAvatar
 */ export const GridAvatar = ({ src = [], size = GRID_AVATAR_DEFAULT_SIZE, className, children, ...restProps })=>{
    if (process.env.NODE_ENV === 'development') {
        if (src.length > MAX_GRID_LENGTH) {
            warn(`Длина массива src (${src.length}) больше максимальной (${MAX_GRID_LENGTH})`, 'error');
        }
    }
    return /*#__PURE__*/ _jsxs(ImageBase, {
        ...restProps,
        size: size,
        className: classNames(styles['GridAvatar'], className),
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: styles['GridAvatar__in'],
                "aria-hidden": true,
                children: src.map((url, index)=>index < MAX_GRID_LENGTH ? /*#__PURE__*/ _jsx("div", {
                        className: styles['GridAvatar__item'],
                        style: {
                            backgroundImage: `url(${url})`
                        }
                    }, index) : null)
            }),
            children
        ]
    });
};
GridAvatar.Badge = GridAvatarBadge;

//# sourceMappingURL=GridAvatar.js.map