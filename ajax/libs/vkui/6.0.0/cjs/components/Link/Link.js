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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Tappable = require("../Tappable/Tappable");
const Link = (_param)=>{
    var { hasVisited, children, className, onClick = _vkjs.noop } = _param, restProps = _object_without_properties._(_param, [
        "hasVisited",
        "children",
        "className",
        "onClick"
    ]);
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({
        Component: restProps.href ? 'a' : 'button',
        onClick: onClick
    }, restProps), {
        className: (0, _vkjs.classNames)("vkuiLink", hasVisited && "vkuiLink--has-visited", className),
        hasHover: false,
        activeMode: "opacity",
        focusVisibleMode: "outside"
    }), children);
};

//# sourceMappingURL=Link.js.map