'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { ContentBadgeContext } from "./ContentBadgeContext.js";
const iconsClassNames = {
    m: null,
    l: "vkuiContentBadge__iconSlotSizeL"
};
const singleIconClassNames = {
    m: "vkuiContentBadge__singleIconSlotSizeM",
    l: "vkuiContentBadge__singleIconSlotSizeL"
};
export const ContentBadgeSlotIcon = (_param)=>{
    var { className, getRootRef, children } = _param, restProps = _object_without_properties(_param, [
        "className",
        "getRootRef",
        "children"
    ]);
    const { size, isSingleChild } = React.useContext(ContentBadgeContext);
    if (size === 's') {
        return null;
    }
    return /*#__PURE__*/ _jsx("div", _object_spread_props(_object_spread({
        ref: getRootRef,
        className: classNames(className, isSingleChild ? singleIconClassNames[size] : iconsClassNames[size])
    }, restProps), {
        children: children
    }));
};
ContentBadgeSlotIcon.displayName = 'ContentBadgeSlotIcon';

//# sourceMappingURL=ContentBadgeSlotIcon.js.map