'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Icon24ChevronDown, Icon24ChevronUp } from "@vkontakte/icons";
import { callMultiple } from "../../lib/callMultiple.js";
import { SimpleCell } from "../SimpleCell/SimpleCell.js";
import { AccordionContext } from "./AccordionContext.js";
import styles from "./Accordion.module.css";
export const AccordionSummary = ({ after, before, ExpandIcon = Icon24ChevronDown, CollapseIcon = Icon24ChevronUp, iconPosition = 'after', onClick, children, ...restProps })=>{
    const { expanded, labelId, contentId, onChange } = React.useContext(AccordionContext);
    const Icon = expanded ? CollapseIcon : ExpandIcon;
    const icon = // Обертка нужна для правильной работы с отступами в SimpleCell
    /*#__PURE__*/ _jsx("span", {
        className: "vkuiIcon",
        children: /*#__PURE__*/ _jsx(Icon, {
            className: styles.icon
        })
    });
    const toggle = ()=>onChange(!expanded);
    return /*#__PURE__*/ _jsx(SimpleCell, {
        id: labelId,
        "aria-expanded": expanded,
        "aria-controls": contentId,
        onClick: callMultiple(toggle, onClick),
        before: /*#__PURE__*/ _jsxs(_Fragment, {
            children: [
                iconPosition === 'before' && icon,
                before
            ]
        }),
        after: /*#__PURE__*/ _jsxs(_Fragment, {
            children: [
                after,
                iconPosition === 'after' && icon
            ]
        }),
        ...restProps,
        children: children
    });
};

//# sourceMappingURL=AccordionSummary.js.map