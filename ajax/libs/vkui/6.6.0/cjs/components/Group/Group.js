"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Group", {
    enumerable: true,
    get: function() {
        return Group;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _GroupContainer = require("./GroupContainer");
const _GroupDescription = require("./GroupDescription");
const _GroupExpandedContent = require("./GroupExpandedContent");
const _GroupHeader = require("./GroupHeader");
const Group = (_param)=>{
    var { header, description, children } = _param, restProps = _object_without_properties._(_param, [
        "header",
        "description",
        "children"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_GroupContainer.GroupContainer, _object_spread_props._(_object_spread._({}, restProps), {
        children: [
            (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_GroupHeader.GroupHeader, {
                children: header
            }),
            children,
            (0, _vkjs.hasReactNode)(description) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_GroupDescription.GroupDescription, {
                children: description
            })
        ]
    }));
};
Group.displayName = 'Group';
Group.Container = _GroupContainer.GroupContainer;
Group.Container.displayName = 'Group.Container';
Group.Header = _GroupHeader.GroupHeader;
Group.Header.displayName = 'Group.Header';
Group.Description = _GroupDescription.GroupDescription;
Group.Description.displayName = 'Group.Description';
Group.ExpandedContent = _GroupExpandedContent.GroupExpandedContent;
Group.ExpandedContent.displayName = 'Group.ExpandedContent';

//# sourceMappingURL=Group.js.map