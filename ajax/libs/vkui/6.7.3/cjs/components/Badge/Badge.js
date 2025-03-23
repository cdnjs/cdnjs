"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Badge", {
    enumerable: true,
    get: function() {
        return Badge;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const stylesMode = {
    new: "vkuiBadge--mode-new",
    prominent: "vkuiBadge--mode-prominent"
};
const Badge = (_param)=>{
    var { mode = 'new', children } = _param, restProps = _object_without_properties._(_param, [
        "mode",
        "children"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        Component: "span",
        baseClassName: (0, _vkjs.classNames)("vkuiBadge", 'vkuiInternalBadge', stylesMode[mode])
    }, restProps), {
        children: children && /*#__PURE__*/ (0, _jsxruntime.jsx)(_VisuallyHidden.VisuallyHidden, {
            children: children
        })
    }));
};

//# sourceMappingURL=Badge.js.map