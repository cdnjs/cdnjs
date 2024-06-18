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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
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
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        Component: "span",
        baseClassName: (0, _vkjs.classNames)("vkuiBadge", stylesMode[mode])
    }, restProps), children && /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, children));
};

//# sourceMappingURL=Badge.js.map