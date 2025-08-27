'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { ContentBadgeContext } from "./ContentBadgeContext.js";
import styles from "./ContentBadge.module.css";
const iconsClassNames = {
    m: null,
    l: styles.iconSlotSizeL
};
const singleIconClassNames = {
    m: styles.singleIconSlotSizeM,
    l: styles.singleIconSlotSizeL
};
export const ContentBadgeIconSlot = ({ className, getRootRef, children, ...restProps })=>{
    const { size, isSingleChild } = React.useContext(ContentBadgeContext);
    if (size === 's') {
        return null;
    }
    return /*#__PURE__*/ _jsx("div", {
        ref: getRootRef,
        className: classNames(className, isSingleChild ? singleIconClassNames[size] : iconsClassNames[size]),
        ...restProps,
        children: children
    });
};

//# sourceMappingURL=ContentBadgeIconSlot.js.map