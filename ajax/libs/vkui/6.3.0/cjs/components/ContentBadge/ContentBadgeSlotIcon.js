"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ContentBadgeSlotIcon", {
    enumerable: true,
    get: function() {
        return ContentBadgeSlotIcon;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _ContentBadgeContext = require("./ContentBadgeContext");
const iconsClassNames = {
    m: null,
    l: "vkuiContentBadge__icon-slot--size-l"
};
const singleIconClassNames = {
    m: "vkuiContentBadge__singleIcon-slot--size-m",
    l: "vkuiContentBadge__singleIcon-slot--size-l"
};
const ContentBadgeSlotIcon = (_param)=>{
    var { className, getRootRef, children } = _param, restProps = _object_without_properties._(_param, [
        "className",
        "getRootRef",
        "children"
    ]);
    const { size, isSingleChild } = _react.useContext(_ContentBadgeContext.ContentBadgeContext);
    if (size === 's') {
        return null;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)("div", _object_spread_props._(_object_spread._({
        ref: getRootRef,
        className: (0, _vkjs.classNames)(className, isSingleChild ? singleIconClassNames[size] : iconsClassNames[size])
    }, restProps), {
        children: children
    }));
};
ContentBadgeSlotIcon.displayName = 'ContentBadgeSlotIcon';

//# sourceMappingURL=ContentBadgeSlotIcon.js.map