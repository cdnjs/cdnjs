import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { ContentBadgeContext } from './ContentBadgeContext';
import styles from './ContentBadge.module.css';
const iconsClassNames = {
    m: null,
    l: styles['ContentBadge__icon-slot--size-l']
};
const singleIconClassNames = {
    m: styles['ContentBadge__singleIcon-slot--size-m'],
    l: styles['ContentBadge__singleIcon-slot--size-l']
};
export const ContentBadgeSlotIcon = ({ className, getRootRef, children, ...restProps })=>{
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
ContentBadgeSlotIcon.displayName = 'ContentBadgeSlotIcon';

//# sourceMappingURL=ContentBadgeSlotIcon.js.map