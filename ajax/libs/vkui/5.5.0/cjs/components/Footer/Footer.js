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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Footnote = require("../Typography/Footnote/Footnote");
var Footer = function(_param) {
    var children = _param.children, className = _param.className, restProps = _object_without_properties._(_param, [
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