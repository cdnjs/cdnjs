import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { hasReactNode } from "@vkontakte/vkjs";
import { GroupContainer } from "./GroupContainer.js";
import { GroupDescription } from "./GroupDescription.js";
import { GroupExpandedContent } from "./GroupExpandedContent.js";
import { GroupHeader } from "./GroupHeader.js";
/**
 * @see https://vkcom.github.io/VKUI/#/Group
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
Group.displayName = 'Group';
Group.Container = GroupContainer;
Group.Container.displayName = 'Group.Container';
Group.Header = GroupHeader;
Group.Header.displayName = 'Group.Header';
Group.Description = GroupDescription;
Group.Description.displayName = 'Group.Description';
Group.ExpandedContent = GroupExpandedContent;
Group.ExpandedContent.displayName = 'Group.ExpandedContent';

//# sourceMappingURL=Group.js.map