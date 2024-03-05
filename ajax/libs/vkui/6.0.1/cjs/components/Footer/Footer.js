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
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _Footnote = require("../Typography/Footnote/Footnote");
const Footer = (_param)=>{
    var { children, className } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement(_Footnote.Footnote, _object_spread_props._(_object_spread._({
        Component: "footer"
    }, restProps), {
        className: (0, _vkjs.classNames)("vkuiFooter", className)
    }), children);
};

//# sourceMappingURL=Footer.js.map