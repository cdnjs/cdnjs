"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ToolButton: function() {
        return ToolButton;
    },
    getRoundedClassName: function() {
        return getRoundedClassName;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _AdaptiveIconRenderer = require("../AdaptiveIconRenderer/AdaptiveIconRenderer");
const _Tappable = require("../Tappable/Tappable");
const stylesMode = {
    primary: "vkuiToolButton--mode-primary",
    secondary: "vkuiToolButton--mode-secondary",
    tertiary: "vkuiToolButton--mode-tertiary",
    outline: "vkuiToolButton--mode-outline"
};
const stylesAppearance = {
    accent: "vkuiToolButton--appearance-accent",
    neutral: "vkuiToolButton--appearance-neutral"
};
const stylesDirection = {
    row: "vkuiToolButton--direction-row",
    column: "vkuiToolButton--direction-column"
};
const sizeYClassNames = {
    none: "vkuiToolButton--sizeY-none",
    regular: "vkuiToolButton--sizeY-regular"
};
const ToolButton = (_param)=>{
    var { mode = 'primary', appearance = 'accent', direction = 'row', className, children, IconCompact, IconRegular, rounded } = _param, restProps = _object_without_properties._(_param, [
        "mode",
        "appearance",
        "direction",
        "className",
        "children",
        "IconCompact",
        "IconRegular",
        "rounded"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const hasChildren = (0, _vkjs.hasReactNode)(children);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_Tappable.Tappable, _object_spread_props._(_object_spread._({
        hoverMode: "vkuiToolButton--hover",
        activeMode: "vkuiToolButton--active",
        Component: restProps.href ? 'a' : 'button',
        focusVisibleMode: "outside",
        className: (0, _vkjs.classNames)(className, "vkuiToolButton", rounded && getRoundedClassName(direction, hasChildren), hasChildren && direction === 'row' && "vkuiToolButton--withFakeEndIcon", stylesMode[mode], stylesAppearance[appearance], stylesDirection[direction], sizeY !== 'compact' && sizeYClassNames[sizeY])
    }, restProps), {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_AdaptiveIconRenderer.AdaptiveIconRenderer, {
                IconCompact: IconCompact,
                IconRegular: IconRegular
            }),
            hasChildren && /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                className: "vkuiToolButton__text",
                children: children
            })
        ]
    }));
};
function getRoundedClassName(direction, hasChildren) {
    switch(direction){
        case 'row':
            return "vkuiToolButton--rounded";
        case 'column':
            return hasChildren ? undefined : "vkuiToolButton--rounded";
    }
}

//# sourceMappingURL=ToolButton.js.map