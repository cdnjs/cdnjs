import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon16Chevron } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { Tappable } from "../Tappable/Tappable.js";
import { Paragraph } from "../Typography/Paragraph/Paragraph.js";
import styles from "./MiniInfoCell.module.css";
const stylesMode = {
    add: styles.modeAdd,
    accent: styles.modeAccent,
    more: styles.modeMore
};
const stylesTextWrap = {
    nowrap: styles.textWrapNowrap,
    full: styles.textWrapFull,
    short: styles.textWrapShort
};
/**
 * @see https://vkcom.github.io/VKUI/#/MiniInfoCell
 */ export const MiniInfoCell = ({ before, after, children, mode = 'base', textWrap = 'nowrap', expandable = false, className, ...restProps })=>{
    const cellClasses = classNames(styles.host, stylesTextWrap[textWrap], mode !== 'base' && stylesMode[mode], className);
    const cellContent = /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            hasReactNode(before) && /*#__PURE__*/ _jsx("span", {
                className: styles.before,
                children: before
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles.middle,
                children: [
                    /*#__PURE__*/ _jsx(Paragraph, {
                        className: styles.content,
                        weight: mode === 'more' ? '2' : undefined,
                        children: children
                    }),
                    expandable && /*#__PURE__*/ _jsx(Icon16Chevron, {})
                ]
            }),
            hasReactNode(after) && /*#__PURE__*/ _jsx("span", {
                className: styles.after,
                children: after
            })
        ]
    });
    return restProps.onClick ? /*#__PURE__*/ _jsx(Tappable, {
        Component: "div",
        role: "button",
        ...restProps,
        className: cellClasses,
        children: cellContent
    }) : /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        baseClassName: cellClasses,
        children: cellContent
    });
};

//# sourceMappingURL=MiniInfoCell.js.map