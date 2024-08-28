"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Footer", {
    enumerable: true,
    get: function() {
        return Footer;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Footnote = require("../Typography/Footnote/Footnote");
const Footer = (_param)=>{
    var { children, className, Component = 'footer', role: roleProp } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "className",
        "Component",
        "role"
    ]);
    const role = roleProp !== null && roleProp !== void 0 ? roleProp : Component === 'footer' ? 'contentinfo' : undefined;
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, _object_spread_props._(_object_spread._({
        Component: Component,
        role: role
    }, restProps), {
        className: (0, _vkjs.classNames)("vkuiFooter", className),
        children: children
    }));
};

//# sourceMappingURL=Footer.js.map