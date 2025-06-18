import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Icon28ChevronRightCircle } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { Tappable } from "../../Tappable/Tappable.js";
import { Subhead } from "../../Typography/Subhead/Subhead.js";
import styles from "./HorizontalCellShowMore.module.css";
const sizeClassNames = {
    s: styles.sizeS,
    m: styles.sizeM
};
export const HorizontalCellShowMore = ({ className, style, getRef, getRootRef, height, size = 's', children = size === 's' ? 'Все' : 'Показать все', centered = false, ...restProps })=>{
    return /*#__PURE__*/ _jsx("div", {
        style: style,
        className: classNames(styles.host, centered && styles.centered, sizeClassNames[size], className),
        ref: getRootRef,
        children: /*#__PURE__*/ _jsxs(Tappable, {
            style: size === 's' ? undefined : {
                height
            },
            className: styles.body,
            getRootRef: getRef,
            activeMode: "opacity",
            hoverMode: "opacity",
            ...restProps,
            children: [
                /*#__PURE__*/ _jsx(Icon28ChevronRightCircle, {
                    className: styles.icon,
                    fill: "currentColor"
                }),
                /*#__PURE__*/ _jsx(Subhead, {
                    className: styles.text,
                    weight: "2",
                    children: children
                })
            ]
        })
    });
};

//# sourceMappingURL=HorizontalCellShowMore.js.map