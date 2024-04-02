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
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../../RootComponent/RootComponent");
const _context = require("../context");
const _validators = require("../validators");
const backgroundStyles = {
    stroke: "vkuiImageBaseBadge--background-stroke",
    shadow: "vkuiImageBaseBadge--background-shadow"
};
const ImageBaseBadge = (_param)=>{
    var { background = 'shadow' } = _param, restProps = _object_without_properties._(_param, [
        "background"
    ]);
    if (process.env.NODE_ENV === 'development') {
        if (restProps.children) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { size } = _react.useContext(_context.ImageBaseContext);
            (0, _validators.validateBadgeIcon)(size, {
                name: 'children',
                value: restProps.children
            });
        }
    }
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiImageBaseBadge", backgroundStyles[background])
    }));
};

//# sourceMappingURL=ImageBaseBadge.js.map