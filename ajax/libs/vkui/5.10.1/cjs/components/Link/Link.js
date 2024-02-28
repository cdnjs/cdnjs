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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Tappable = require("../Tappable/Tappable");
var Link = function(_param) {
    var hasVisited = _param.hasVisited, children = _param.children, className = _param.className, restProps = _object_without_properties._(_param, [
        "hasVisited",
        "children",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({
        Component: restProps.href ? "a" : "button"
    }, restProps), {
        className: (0, _vkjs.classNames)("vkuiLink", hasVisited && "vkuiLink--has-visited", className),
        hasHover: false,
        activeMode: "opacity",
        focusVisibleMode: "outside"
    }), children);
};

//# sourceMappingURL=Link.js.map