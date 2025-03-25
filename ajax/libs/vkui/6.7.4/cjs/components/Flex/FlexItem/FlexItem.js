"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "FlexItem", {
    enumerable: true,
    get: function() {
        return FlexItem;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../../RootComponent/RootComponent");
const flexClassNames = {
    grow: "vkuiFlexItem--flex-grow",
    shrink: "vkuiFlexItem--flex-shrink",
    content: "vkuiFlexItem--flex-content",
    fixed: "vkuiFlexItem--flex-fixed"
};
const alignSelfClassNames = {
    start: "vkuiFlexItem--align-self-start",
    end: "vkuiFlexItem--align-self-end",
    center: "vkuiFlexItem--align-self-center",
    baseline: "vkuiFlexItem--align-self-baseline",
    stretch: "vkuiFlexItem--align-self-stretch"
};
const FlexItem = (_param)=>{
    var { children, alignSelf, flex, flexBasis, style } = _param, rest = _object_without_properties._(_param, [
        "children",
        "alignSelf",
        "flex",
        "flexBasis",
        "style"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, rest), {
        style: _object_spread._({
            flexBasis
        }, style),
        baseClassName: (0, _vkjs.classNames)("vkuiFlexItem", alignSelf && alignSelfClassNames[alignSelf], flex && flexClassNames[flex]),
        children: children
    }));
};

//# sourceMappingURL=FlexItem.js.map