import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { Tappable } from '../Tappable/Tappable';
import styles from './Link.module.css';
/**
 * @see https://vkcom.github.io/VKUI/#/Link
 */ export const Link = ({ hasVisited, children, className, ...restProps })=>{
    return /*#__PURE__*/ _jsx(Tappable, {
        Component: restProps.href ? 'a' : 'button',
        ...restProps,
        className: classNames(styles['Link'], hasVisited && styles['Link--has-visited'], className),
        hasHover: false,
        activeMode: "opacity",
        hoverMode: "none",
        focusVisibleMode: "outside",
        children: children
    });
};

//# sourceMappingURL=Link.js.map