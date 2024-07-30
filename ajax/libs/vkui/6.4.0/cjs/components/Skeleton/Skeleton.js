"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Skeleton", {
    enumerable: true,
    get: function() {
        return Skeleton;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const Skeleton = (_param)=>{
    var { width, height, inlineSize, blockSize, maxWidth, maxInlineSize, borderRadius, style, children, colorFrom, colorTo, noAnimation, duration, margin } = _param, restProps = _object_without_properties._(_param, [
        "width",
        "height",
        "inlineSize",
        "blockSize",
        "maxWidth",
        "maxInlineSize",
        "borderRadius",
        "style",
        "children",
        "colorFrom",
        "colorTo",
        "noAnimation",
        "duration",
        "margin"
    ]);
    const skeletonStyle = {
        width,
        height,
        inlineSize,
        blockSize,
        maxWidth,
        maxInlineSize,
        borderRadius,
        margin
    };
    if (colorFrom) {
        skeletonStyle['--vkui_internal--skeleton_color_from'] = colorFrom;
    }
    if (colorTo) {
        skeletonStyle['--vkui_internal--skeleton_color_to'] = colorTo;
    }
    if (Number.isFinite(duration)) {
        skeletonStyle['--vkui_internal--skeleton_animation_duration'] = `${duration}s`;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        Component: "span",
        baseClassName: (0, _vkjs.classNames)("vkuiSkeleton", noAnimation && "vkuiSkeleton--disableAnimation"),
        style: _object_spread._({}, skeletonStyle, style)
    }, restProps), {
        children: children || /*#__PURE__*/ (0, _jsxruntime.jsx)(_jsxruntime.Fragment, {
            children: "‌"
        })
    }));
};

//# sourceMappingURL=Skeleton.js.map