import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { hasReactNode } from '@vkontakte/vkjs';
import { GroupContainer } from './GroupContainer';
import { GroupDescription } from './GroupDescription';
import { GroupExpandedContent } from './GroupExpandedContent';
import { GroupHeader } from './GroupHeader';
/**
 * @see https://vkcom.github.io/VKUI/#/Group
 */ export const Group = ({ header, description, children, ...restProps })=>{
    return /*#__PURE__*/ _jsxs(GroupContainer, {
        ...restProps,
        children: [
            hasReactNode(header) && /*#__PURE__*/ _jsx(GroupHeader, {
                children: header
            }),
            children,
            hasReactNode(description) && /*#__PURE__*/ _jsx(GroupDescription, {
                children: description
            })
        ]
    });
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