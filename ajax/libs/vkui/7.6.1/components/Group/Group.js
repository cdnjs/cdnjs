import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { hasReactNode } from "@vkontakte/vkjs";
import { defineComponentDisplayNames } from "../../lib/react/defineComponentDisplayNames.js";
import { GroupContainer } from "./GroupContainer.js";
import { GroupDescription } from "./GroupDescription.js";
import { GroupExpandedContent } from "./GroupExpandedContent.js";
import { GroupHeader } from "./GroupHeader.js";
/**
 * @see https://vkui.io/components/group
 */ export const Group = (_param)=>{
    var { header, description, children } = _param, restProps = _object_without_properties(_param, [
        "header",
        "description",
        "children"
    ]);
    return /*#__PURE__*/ _jsxs(GroupContainer, _object_spread_props(_object_spread({}, restProps), {
        children: [
            hasReactNode(header) && /*#__PURE__*/ _jsx(GroupHeader, {
                children: header
            }),
            children,
            hasReactNode(description) && /*#__PURE__*/ _jsx(GroupDescription, {
                children: description
            })
        ]
    }));
};
Group.Container = GroupContainer;
Group.Header = GroupHeader;
Group.Description = GroupDescription;
Group.ExpandedContent = GroupExpandedContent;
if (process.env.NODE_ENV !== 'production') {
    defineComponentDisplayNames(Group.Container, 'Group.Container');
    defineComponentDisplayNames(Group.Header, 'Group.Header');
    defineComponentDisplayNames(Group.Description, 'Group.Description');
    defineComponentDisplayNames(Group.ExpandedContent, 'Group.ExpandedContent');
}

//# sourceMappingURL=Group.js.map