"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ImageBaseBadge", {
    enumerable: true,
    get: function() {
        return ImageBaseBadge;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../../RootComponent/RootComponent");
const _context = require("../context");
const _validators = require("../validators");
function DevelopmentCheck({ children }) {
    const { size } = _react.useContext(_context.ImageBaseContext);
    if (children) {
        (0, _validators.validateBadgeIcon)(size, {
            name: 'children',
            value: children
        });
    }
    return null;
}
const backgroundStyles = {
    stroke: "vkuiImageBaseBadge--background-stroke",
    shadow: "vkuiImageBaseBadge--background-shadow"
};
const ImageBaseBadge = (_param)=>{
    var { background = 'shadow' } = _param, restProps = _object_without_properties._(_param, [
        "background"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_jsxruntime.Fragment, {
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
                baseClassName: (0, _vkjs.classNames)("vkuiImageBaseBadge", backgroundStyles[background])
            })),
            process.env.NODE_ENV === 'development' && /*#__PURE__*/ (0, _jsxruntime.jsx)(DevelopmentCheck, {
                children: restProps.children
            })
        ]
    });
};
ImageBaseBadge.displayName = 'ImageBaseBadge';

//# sourceMappingURL=ImageBaseBadge.js.map