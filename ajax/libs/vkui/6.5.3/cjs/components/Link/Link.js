"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Link", {
    enumerable: true,
    get: function() {
        return Link;
    }
});
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _vkjs = require("@vkontakte/vkjs");
const _Tappable = require("../Tappable/Tappable");
const Link = (_param)=>{
    var { hasVisited, children, className } = _param, restProps = _object_without_properties._(_param, [
        "hasVisited",
        "children",
        "className"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Tappable.Tappable, _object_spread_props._(_object_spread._({
        Component: restProps.href ? 'a' : 'button'
    }, restProps), {
        className: (0, _vkjs.classNames)("vkuiLink", hasVisited && "vkuiLink--has-visited", className),
        hasHover: false,
        activeMode: "opacity",
        hoverMode: "none",
        focusVisibleMode: "outside",
        children: children
    }));
};

//# sourceMappingURL=Link.js.map